"""Local ICDC loading-example POC. No database writes or external record uploads."""
from __future__ import annotations

import argparse
import contextlib
import csv
import hashlib
import io
import json
import math
import os
from pathlib import Path
import re
import sys
import warnings
import zipfile
from urllib.parse import urlsplit

MODEL_COMMIT = "e26839bf19507bac24e1d97e1efe30611bca8462"
MODEL_BASE = f"https://raw.githubusercontent.com/CBIIT/icdc-model-tool/{MODEL_COMMIT}/model-desc/"
OUTPUT = Path(__file__).resolve().parent / "output"
KEYS = {"program": "program_acronym", "study": "clinical_study_designation",
        "case": "case_id", "sample": "sample_id"}
REFERENCES = {"study": ("program", "program.program_acronym"),
              "case": ("study", "study.clinical_study_designation"),
              "sample": ("case", "case.case_id")}
# Study/case/sample order follows the published TCL01 examples, with whitespace fixed.
# Program order is derived from the model, not an existing program loading example.
HEADERS = {
    "program": ["type", "program_name", "program_acronym", "program_short_description",
                "program_full_description", "program_external_url", "program_sort_order"],
    "study": ["type", "program.program_acronym", "clinical_study_id",
              "clinical_study_designation", "clinical_study_name", "clinical_study_description",
              "clinical_study_type", "date_of_iacuc_approval", "dates_of_conduct",
              "accession_id", "study_disposition"],
    "case": ["type", "study.clinical_study_designation", "case_id", "patient_id",
             "patient_first_name"],
    "sample": ["type", "case.case_id", "sample_id", "physical_sample_type",
               "general_sample_pathology", "tumor_sample_origin", "summarized_sample_type",
               "sample_site", "sample_chronology", "specific_sample_pathology", "tumor_grade",
               "date_of_sample_collection", "sample_preservation", "necropsy_sample",
               "percentage_tumor"],
}


def required(spec):
    return spec.get("Req") is True or spec.get("Req") == "Yes"


def cell(value, spec=None):
    """Preserve strings; support only the demonstrated single-item list encoding."""
    if value is None or isinstance(value, float) and math.isnan(value):
        return ""
    kind = (spec or {}).get("Type")
    if isinstance(kind, dict) and kind.get("value_type") == "list":
        if isinstance(value, str) and value.lstrip().startswith("["):
            value = json.loads(value)
        if isinstance(value, (list, tuple)):
            if len(value) > 1:
                raise ValueError("Multi-value list encoding is not verified; refusing export")
            value = value[0] if value else ""
    if isinstance(value, (list, tuple, dict)):
        raise ValueError("Unsupported compound cell value")
    return str(value)


def validate(tables, model, definitions):
    """Bounded POC checks, not a replacement for the authoritative ICDC loader."""
    for node, rows in tables.items():
        if not rows:
            raise ValueError(f"Empty node table: {node}")
        fields = model["Nodes"][node]["Props"]
        needed = [p for p in fields if required(definitions[p])]
        if not set(needed).issubset(HEADERS[node]):
            raise ValueError(f"Export contract omits required fields for {node}")
        for row in rows:
            if set(row) != set(HEADERS[node]) or row["type"] != node:
                raise ValueError(f"Incorrect columns or type for {node}")
            for prop in fields:
                value = row.get(prop, "")
                spec = definitions[prop]
                if required(spec) and not value.strip():
                    raise ValueError(f"Missing required value: {node}.{prop}")
                if not value:
                    continue
                if spec.get("Enum") and value not in [str(x) for x in spec["Enum"]]:
                    raise ValueError(f"Invalid enum: {node}.{prop}")
                kind = spec.get("Type", "string")
                if isinstance(kind, dict):
                    if kind.get("pattern") and not re.fullmatch(kind["pattern"], value):
                        raise ValueError(f"Invalid pattern: {node}.{prop}")
                    kind = kind.get("value_type", "string")
                if kind == "integer" and not re.fullmatch(r"[+-]?\d+", value):
                    raise ValueError(f"Invalid integer: {node}.{prop}")
                if kind == "number" and not math.isfinite(float(value)):
                    raise ValueError(f"Invalid number: {node}.{prop}")
                if kind == "datetime":
                    from datetime import datetime
                    datetime.fromisoformat(value.replace("Z", "+00:00"))
        key = KEYS[node]
        ids = [row[key] for row in rows]
        if len(set(ids)) != len(ids):
            raise ValueError(f"Duplicate key: {node}.{key}")
    for child, (parent, column) in REFERENCES.items():
        parent_ids = {row[KEYS[parent]] for row in tables[parent]}
        if any(row[column] not in parent_ids for row in tables[child]):
            raise ValueError(f"Unresolved parent reference: {child}.{column}")


def assemble(program, study, samples, definitions, prefix):
    def template(node, source):
        return {h: node if h == "type" else cell(source.get(h), definitions.get(h))
                for h in HEADERS[node]}
    p = template("program", program)
    p.update(program_acronym=f"{prefix}-PROGRAM", program_name=f"Synthetic example {prefix}",
             program_short_description="Synthetic loading example; not an actual program.")
    p["program_full_description"] = "POC TEMPLATE METADATA: " + p["program_full_description"]
    s = template("study", study)
    s.update({"program.program_acronym": p["program_acronym"],
              "clinical_study_designation": prefix, "clinical_study_id": prefix,
              "clinical_study_name": f"Synthetic loading example {prefix}",
              "accession_id": f"{prefix}-ACCESSION"})
    s["clinical_study_description"] = "POC TEMPLATE METADATA: " + s["clinical_study_description"]
    cases, output_samples = [], []
    for index, values in enumerate(samples, 1):
        case_id = f"{prefix}-CASE-{index:03d}"
        cases.append({"type": "case", "study.clinical_study_designation": prefix,
                      "case_id": case_id, "patient_id": f"{prefix}-PATIENT-{index:03d}",
                      "patient_first_name": ""})
        row = template("sample", values)
        row.update({"sample_id": f"{prefix}-SAMPLE-{index:03d}", "case.case_id": case_id,
                    "date_of_sample_collection": ""})
        output_samples.append(row)
    return {"program": [p], "study": [s], "case": cases, "sample": output_samples}


def serialize(tables):
    files = {}
    for node, rows in tables.items():
        stream = io.StringIO(newline="")
        writer = csv.DictWriter(stream, fieldnames=HEADERS[node], delimiter="\t",
                                lineterminator="\n", extrasaction="raise")
        writer.writeheader()
        writer.writerows(rows)
        text = stream.getvalue()
        parsed = list(csv.DictReader(io.StringIO(text, newline=""), delimiter="\t"))
        if parsed != rows:
            raise ValueError(f"TSV round-trip failed: {node}")
        files[node] = text.encode("utf-8")
    return files


def write_zip(path, files, report, prefix):
    """Exclusive creation and fixed ZIP timestamps; never overwrite an existing artifact."""
    with path.open("xb") as handle:
        with zipfile.ZipFile(handle, "w", compression=zipfile.ZIP_DEFLATED) as archive:
            entries = {f"{prefix}-{node}.txt": content for node, content in files.items()}
            entries["poc-report.json"] = json.dumps(report, indent=2, sort_keys=True).encode()
            for name, content in sorted(entries.items()):
                info = zipfile.ZipInfo(name, date_time=(1980, 1, 1, 0, 0, 0))
                info.compress_type = zipfile.ZIP_DEFLATED
                info.external_attr = 0o600 << 16
                archive.writestr(info, content)


def load_models():
    import requests
    import yaml
    documents, hashes = {}, {}
    for filename in ("icdc-model.yml", "icdc-model-props.yml"):
        response = requests.get(MODEL_BASE + filename, timeout=30)
        response.raise_for_status()
        documents[filename] = yaml.safe_load(response.content)
        hashes[filename] = hashlib.sha256(response.content).hexdigest()
    return documents["icdc-model.yml"], documents["icdc-model-props.yml"]["PropDefinitions"], hashes


def read_seed(env_path, source_study, sample_properties):
    from dotenv import dotenv_values
    from neo4j import GraphDatabase, READ_ACCESS, unit_of_work
    cfg = dotenv_values(env_path)
    if any(not cfg.get(k) for k in ("NEO4J_URI", "NEO4J_USER", "NEO4J_PASSWORD")):
        raise ValueError("Missing Neo4j settings in local .env")
    uri = urlsplit(cfg["NEO4J_URI"])
    if uri.hostname not in {"localhost", "127.0.0.1", "::1"} or uri.scheme not in {"bolt", "bolt+s", "bolt+ssc"}:
        raise ValueError("This POC requires a loopback Bolt endpoint; routing is disabled")
    with GraphDatabase.driver(cfg["NEO4J_URI"], auth=(cfg["NEO4J_USER"], cfg["NEO4J_PASSWORD"]),
                              connection_timeout=5, max_transaction_retry_time=0) as driver:
        with driver.session(database=cfg.get("NEO4J_DATABASE") or "neo4j",
                            default_access_mode=READ_ACCESS) as session:
            @unit_of_work(timeout=20)
            def read(tx):
                parents = tx.run("MATCH (s:study {clinical_study_designation:$study}) "
                    "OPTIONAL MATCH (s)-[:member_of]->(p:program) "
                    "RETURN properties(s) AS study, properties(p) AS program",
                    study=source_study).data()
                if len(parents) != 1 or not parents[0]["program"]:
                    raise ValueError("Expected exactly one source study and one parent program")
                records = tx.run("MATCH (n:sample)-[:of_case]->(:case)-[:member_of]->"
                    "(:study {clinical_study_designation:$study}) WITH DISTINCT n "
                    "RETURN [p IN $fields | n[p]] AS values ORDER BY n.sample_id LIMIT 501",
                    study=source_study, fields=sample_properties).data()
                if not 2 <= len(records) <= 500:
                    raise ValueError("POC requires 2 to 500 source samples; no silent truncation")
                return parents[0], [dict(zip(sample_properties, r["values"])) for r in records]
            return session.execute_read(read)


def run(args):
    import pandas as pd
    repo = args.generator_repo.resolve()
    if not (repo / "generator.py").is_file():
        raise ValueError("Generator repository not found")
    if not re.fullmatch(r"POC-[A-Za-z0-9_-]{1,50}", args.prefix):
        raise ValueError("Prefix must start with POC- and contain only letters, digits, _ or -")
    if not 1 <= args.rows <= 100:
        raise ValueError("Row count must be between 1 and 100")
    target = OUTPUT / f"{args.prefix}-seed-{args.seed}.zip"
    if target.exists():
        raise ValueError("Output already exists; choose a different --prefix")
    model, definitions, hashes = load_models()
    parents, records = read_seed(repo / ".env", args.study, model["Nodes"]["sample"]["Props"])
    # Disable optional model downloads/telemetry; the active algorithm is entirely local.
    os.environ["HF_HUB_OFFLINE"] = "1"
    os.environ["TRANSFORMERS_OFFLINE"] = "1"
    os.environ["GRADIO_ANALYTICS_ENABLED"] = "False"
    sys.path.insert(0, str(repo))
    with contextlib.redirect_stdout(io.StringIO()), warnings.catch_warnings(record=True) as caught:
        from schema import build_node_schema_json, json_to_node_schema
        from analyze.intra_node import PairwiseRelationshipEvaluator
        from feature.weights import node_features_2_weight
        from generator import SyntheticDataGenerator
        schema = json_to_node_schema(build_node_schema_json("sample", model["Nodes"], definitions))
        frame = pd.DataFrame(records)
        relations = PairwiseRelationshipEvaluator(schema, node_features_2_weight).evaluate_all_pairs(frame)
        generator = SyntheticDataGenerator(frame, relations, schema, None, seed=args.seed)
        generated = generator.generate(args.rows)
        valid, invalid = generator.validate_rows(generated)
    if len(valid) != args.rows or not invalid.empty:
        raise ValueError("Generator did not return the requested number of valid rows; no export written")
    tables = assemble(parents["program"], parents["study"], valid.to_dict("records"), definitions, args.prefix)
    validate(tables, model, definitions)
    files = serialize(tables)
    comparison_fields = [p for p in HEADERS["sample"] if p in valid.columns and p != "date_of_sample_collection"]
    observed = {tuple(cell(r.get(p), definitions.get(p)) for p in comparison_fields) for r in records}
    matches = sum(tuple(row[p] for p in comparison_fields) in observed for row in tables["sample"])
    report = {
        "status": "passed_poc_checks_not_authoritative_loader_validation",
        "model_version": model.get("Version"), "model_commit": MODEL_COMMIT,
        "model_sha256": hashes, "source_study": args.study, "source_sample_count": len(records),
        "source_program_acronym": parents["program"].get("program_acronym"),
        "random_seed": args.seed, "counts": {k: len(v) for k, v in tables.items()},
        "checks": ["required_values", "enums", "supported_types", "unique_node_keys", "parent_references", "tsv_round_trip"],
        "file_sha256": {k: hashlib.sha256(v).hexdigest() for k, v in files.items()},
        "sample_rows_matching_source_exported_fields": matches,
        "generator_warning_count": len(caught), "weights": node_features_2_weight,
        "construction": "New POC IDs; one sample per constructed case; no source patient names",
        "copied_metadata": "Program and study descriptions and other non-ID template fields",
        "omitted_optional_sample_fields": ["date_of_sample_collection"],
        "limitations": ["No privacy guarantee; source values and combinations can recur",
                        "Program file contract is model-derived and requires loader verification",
                        "Only single-item list values supported; multi-item values fail closed",
                        "POC accession is a placeholder, not an assigned accession",
                        "Not validated by an authoritative ICDC ingestion tool",
                        "Reproducibility requires unchanged DB data, generator code, environment and seed"],
    }
    # Artifacts may contain source-derived values. Keep owner-only permissions on creation.
    previous_umask = os.umask(0o077)
    try:
        OUTPUT.mkdir(parents=True, exist_ok=True)
        write_zip(target, files, report, args.prefix)
    finally:
        os.umask(previous_umask)
    print(json.dumps({"zip": str(target), "counts": report["counts"],
                      "source_matches": matches, "validation": report["status"]}, indent=2))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--generator-repo", type=Path,
                        default=Path(__file__).resolve().parents[3] / "data-generator-mvp-hugging-face")
    parser.add_argument("--study", default="TCL01")
    parser.add_argument("--rows", type=int, default=5, help="Number of cases and samples (1 to 100)")
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--prefix", default="POC-TCL01", help="New synthetic namespace, starting with POC-")
    args = parser.parse_args()
    try:
        run(args)
    except Exception as exc:
        # Avoid leaking records or credentials from third-party exception messages.
        print(f"Export failed ({type(exc).__name__}). No validated artifact is available from this run.", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
