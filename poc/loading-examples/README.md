# Synthetic loading example POC

This local command reuses the sibling Python generator to produce a small connected ICDC example dataset: one program, one study, and five cases with one sampled specimen each by default. It exports four tab-delimited text files and a provenance and validation report in a ZIP. Navigator UI integration and a generation service are outside this POC.

## Run locally

From the Navigator repository root, use the existing generator virtual environment:

```sh
../data-generator-mvp-hugging-face/.venv/bin/python -B poc/loading-examples/export_examples.py
```

The generator repository must contain an ignored `.env` with `NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD`, and optionally `NEO4J_DATABASE` (default `neo4j`). Restrict that file to owner access. This command reads only that file for database credentials; it does not use the tracked `data_files/environment.txt`. The URI must be a loopback Bolt endpoint. Never commit credentials or upload the `.env` through Gradio.

Options include `--generator-repo`, `--study` (default `TCL01`), `--rows` (1–100; default 5), `--seed` (default 42), and `--prefix` (default `POC-TCL01`). A new prefix is necessary if the corresponding ZIP already exists. Existing output is never overwritten.

Output is written under the Git-ignored `poc/loading-examples/output/` directory with owner-only permissions on creation. The output contains source-derived values: keep it local until its contents have been reviewed for sharing.

## Generation and validation

The command fetches public ICDC v2.1.0 model definitions pinned to commit `e26839bf19507bac24e1d97e1efe30611bca8462`, then reads the selected study, its program, and at most 500 samples from Neo4j using read-only transactions. Larger inputs fail rather than being silently truncated. Database records are not sent to external services. Optional Hugging Face downloads and Gradio analytics are disabled for generation.

The existing generator samples sample-node properties. The exporter constructs new program, study, patient, case, and sample identifiers and explicitly links the four tables. Program and study metadata are templates, not newly inferred study descriptions; their descriptions are labeled accordingly. The study accession is an explicit POC placeholder, not a registered accession. Patient names are blank, and optional sample collection dates are omitted.

Before export, the command checks requested row counts, the generator's relationship validation, required properties, enums, supported primitive types and patterns, unique node keys, parent references, and lossless TSV serialization. TSV quoting preserves embedded tabs, quotes, newlines, and leading zeros. Multi-item list values fail closed because their loading syntax has not been verified; a single study type is serialized as `Genomics`, following the existing example.

The archive's `poc-report.json` records model hashes, seed, weights, source study and sample count, output checksums, source-combination match count, construction rules, and limitations. It contains no credentials or raw source records. Reproducibility depends on unchanged source data, generator code, dependencies, and seed; the ZIP uses fixed timestamps but is not a frozen database snapshot.

## Boundaries

This is a structurally checked POC, not an ingestion-certified submission. Study, case, and sample headers follow the published TCL01 examples with the study reference header's leading space removed. The program file is model-derived and still requires verification against the authoritative loader. Relationship references are checked, but the entire ICDC graph and its submission rules are not validated.

Synthetic sampling can reproduce source combinations and offers no formal privacy guarantee. The report counts matches across exported sampled fields; generated identifiers alone do not make a dataset private. The current generator's learned relationships are heuristic rather than guarantees of biological consistency.

The same exporter can later run during artifact publishing or behind an on-demand service. Neither publishing, a backend endpoint, nor the Navigator dropdown has been changed.

## Tests

The isolated serializer and validation tests require only Python's standard library and do not contact Neo4j or GitHub:

```sh
../data-generator-mvp-hugging-face/.venv/bin/python -B -m unittest discover -s poc/loading-examples -p 'test_*.py' -v
```

## Format references

- [Pinned node model](https://raw.githubusercontent.com/CBIIT/icdc-model-tool/e26839bf19507bac24e1d97e1efe30611bca8462/model-desc/icdc-model.yml)
- [Pinned property model](https://raw.githubusercontent.com/CBIIT/icdc-model-tool/e26839bf19507bac24e1d97e1efe30611bca8462/model-desc/icdc-model-props.yml)
- [Pinned loading examples](https://github.com/CBIIT/icdc-data-loading-example-sets/tree/9a5287e346d5d49251517486204973a3cf6124fc)
