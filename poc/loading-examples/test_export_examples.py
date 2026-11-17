import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import MagicMock, patch
import zipfile

from export_examples import HEADERS, KEYS, assemble, cell, read_seed, serialize, validate, write_zip


class ExportTests(unittest.TestCase):
    def setUp(self):
        self.model = {"Nodes": {node: {"Props": [h for h in headers if h != "type" and "." not in h]}
                                for node, headers in HEADERS.items()}}
        self.definitions = {p: {"Type": "string", "Req": "No"}
                            for node in self.model["Nodes"].values() for p in node["Props"]}
        for p in KEYS.values():
            self.definitions[p]["Req"] = "Yes"
        self.definitions["patient_id"]["Req"] = "Yes"
        self.definitions["physical_sample_type"] = {"Req": "Yes", "Enum": ["Tissue", "Cell Line"]}
        self.definitions["clinical_study_type"]["Type"] = {"value_type": "list", "item_type": "string"}
        self.tables = assemble(
            {"program_full_description": 'Text with\ttab and "quote"\nnewline'},
            {"clinical_study_type": ["Genomics"], "dates_of_conduct": "000008"},
            [{"physical_sample_type": "Tissue"}, {"physical_sample_type": "Cell Line"}],
            self.definitions, "POC-TEST")

    def test_valid_connected_tables(self):
        validate(self.tables, self.model, self.definitions)
        self.assertEqual(len(self.tables["sample"]), 2)

    def test_round_trip_preserves_quotes_tabs_newlines_and_zeros(self):
        files = serialize(self.tables)
        self.assertIn(b"000008", files["study"])
        self.assertIn(b'""quote""', files["program"])

    def test_missing_required(self):
        self.tables["case"][0]["patient_id"] = ""
        with self.assertRaisesRegex(ValueError, "Missing required"):
            validate(self.tables, self.model, self.definitions)

    def test_enum_rejected(self):
        self.tables["sample"][0]["physical_sample_type"] = "invalid"
        with self.assertRaisesRegex(ValueError, "Invalid enum"):
            validate(self.tables, self.model, self.definitions)

    def test_duplicate_ids_rejected(self):
        self.tables["sample"][1]["sample_id"] = self.tables["sample"][0]["sample_id"]
        with self.assertRaisesRegex(ValueError, "Duplicate key"):
            validate(self.tables, self.model, self.definitions)

    def test_dangling_reference_rejected(self):
        self.tables["sample"][0]["case.case_id"] = "missing"
        with self.assertRaisesRegex(ValueError, "Unresolved parent"):
            validate(self.tables, self.model, self.definitions)

    def test_changed_required_schema_rejected(self):
        self.model["Nodes"]["sample"]["Props"].append("new_required_field")
        self.definitions["new_required_field"] = {"Req": "Yes", "Type": "string"}
        with self.assertRaisesRegex(ValueError, "omits required"):
            validate(self.tables, self.model, self.definitions)

    def test_single_item_list_and_multi_item_rejection(self):
        spec = self.definitions["clinical_study_type"]
        self.assertEqual(cell('["Genomics"]', spec), "Genomics")
        with self.assertRaisesRegex(ValueError, "Multi-value"):
            cell(["Genomics", "Other"], spec)

    def test_invalid_numeric_value(self):
        self.definitions["program_sort_order"]["Type"] = "integer"
        self.tables["program"][0]["program_sort_order"] = "1.5"
        with self.assertRaisesRegex(ValueError, "Invalid integer"):
            validate(self.tables, self.model, self.definitions)

    def test_no_source_ids_names_or_optional_sample_dates(self):
        tables = assemble({"program_acronym": "ORIGINAL"}, {"clinical_study_designation": "ORIGINAL"},
                          [{"sample_id": "ORIGINAL", "date_of_sample_collection": "2020-01-01"}],
                          self.definitions, "POC-NEW")
        self.assertEqual(tables["sample"][0]["date_of_sample_collection"], "")
        self.assertEqual(tables["case"][0]["patient_first_name"], "")
        self.assertNotIn("ORIGINAL", json.dumps(tables))

    def test_deterministic_zip_and_no_overwrite(self):
        files = serialize(self.tables)
        with tempfile.TemporaryDirectory() as directory:
            a, b = Path(directory) / "a.zip", Path(directory) / "b.zip"
            write_zip(a, files, {"status": "test"}, "POC-TEST")
            write_zip(b, files, {"status": "test"}, "POC-TEST")
            self.assertEqual(a.read_bytes(), b.read_bytes())
            with zipfile.ZipFile(a) as archive:
                self.assertEqual(len(archive.namelist()), 5)
                self.assertIsNone(archive.testzip())
            with self.assertRaises(FileExistsError):
                write_zip(a, files, {}, "POC-TEST")

    def test_managed_transaction_uses_strings_and_read_access(self):
        neo4j = MagicMock()
        dotenv = MagicMock()
        dotenv.dotenv_values.return_value = {
            "NEO4J_URI": "bolt://localhost:7687", "NEO4J_USER": "test",
            "NEO4J_PASSWORD": "test-fixture-only"}
        neo4j.unit_of_work.side_effect = lambda **kwargs: lambda fn: fn
        session = neo4j.GraphDatabase.driver.return_value.__enter__.return_value.session.return_value.__enter__.return_value
        tx = MagicMock()
        results = [[{"study": {}, "program": {"program_acronym": "TEST"}}],
                   [{"values": ["Tissue"]}, {"values": ["Cell Line"]}]]
        def run_query(query, **kwargs):
            self.assertIsInstance(query, str, "Managed transaction rejects Query objects")
            result = MagicMock()
            result.data.return_value = results.pop(0)
            return result
        tx.run.side_effect = run_query
        session.execute_read.side_effect = lambda fn: fn(tx)
        with patch.dict("sys.modules", {"neo4j": neo4j, "dotenv": dotenv}):
            _, rows = read_seed(Path("unused.env"), "TEST", ["physical_sample_type"])
        self.assertEqual(len(rows), 2)
        neo4j.unit_of_work.assert_called_once_with(timeout=20)
        driver = neo4j.GraphDatabase.driver.return_value.__enter__.return_value
        self.assertEqual(driver.session.call_args.kwargs["default_access_mode"], neo4j.READ_ACCESS)


if __name__ == "__main__":
    unittest.main()
