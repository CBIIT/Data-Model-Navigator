# Generating example loading files for Data Model Navigator

Date: October 6, 2026

Status: A local proof of concept is complete. Validation with the ICDC import software and integration into Navigator are pending.

## Summary

The investigation tested whether the existing synthetic data generator could help create example loading files for Data Model Navigator. These files show users how to organize records for import into the Integrated Canine Data Commons, or ICDC.

The local proof of concept produced a downloadable ZIP containing one program, one study, five cases, and five biological sample records. It used existing database records as input, selected sample characteristics through the generator, and assigned new identifiers to keep the output records linked.

The files passed the checks built for this trial, and all 12 automated tests passed. They have not yet passed the official ICDC import process. The ZIP exists locally, but users cannot download it through Navigator yet.

The generator also provides no privacy guarantee. All five output samples matched combinations of characteristics already present in the source data. Giving those records new identifiers does not make their contents new or anonymous.

The team can consider preparing examples before users download them, generating examples when users request them, or offering both. This investigation does not select an option.

## Investigation scope

The work covered the existing Navigator download, the generator, the local database, and the ICDC rules for record structure. It also included a small export tool and a test ZIP.

The trial uses four record types:

- A program groups studies.
- A study describes the research.
- A case identifies a subject or donor.
- A sample describes biological material associated with a case.

Each record needs an identifier. Records also need links to one another so that a sample points to the correct case, a case points to its study, and a study points to its program.

The investigation did not change database records, publish files, deploy a service, or change Navigator's interface. The export tool supports these four record types only.

## Findings

### Navigator currently packages existing examples

Navigator's Loading File Examples option downloads prepared files. It does not create records or check whether their values and links are valid.

The download has two modes. Static mode opens a prepared ZIP. Dynamic mode reads a list of file locations, downloads those files, and creates a ZIP in the browser. Here, "dynamic" describes how the ZIP is assembled, not how the data is generated.

Prepared synthetic examples could use this existing download feature. Generating data when a user requests it would require a new connection between Navigator and a service that runs the generator.

### The generator needs a separate export step

The generator examines existing records and looks for relationships between fields. It then selects values based on those observed patterns. For example, it can use relationships among sample characteristics rather than select every field independently.

The active process does not use a large language model. The local trial does not need Hugging Face hosting.

The generator alone does not create a complete set of loading files. Some identifiers are absent from its output, and it does not consistently construct links between generated record types. Its built-in checks also do not cover all ICDC import requirements.

A separate export tool assigns identifiers, creates the links, checks the output, and writes the files. The generator's source code is unchanged.

### The local database provides useful input records

The local database contains 20 studies. TCL01 was selected because it has both published loading examples and connected records in the database.

| Record type | TCL01 records available | Check results |
| --- | --- | --- |
| Program | 1 | Required fields contain values |
| Study | 1 | Required fields contain values |
| Case | 45 | Required identifiers are present and case identifiers are unique |
| Sample | 46 | All 12 required fields contain values and sample identifiers are unique |

The investigation also covered fields that allow only a defined set of values, such as sample preservation method. The checked required values matched the chosen ICDC model version. This does not prove that the records satisfy every import rule.

The cases mostly contain identifiers. Of the 45 first-name fields, 36 are blank. Sample records have more variation, including 20 sample-site values and 12 specific-pathology values. Including samples therefore exercises the generator more than creating case identifiers alone.

### Existing examples and database records are not interchangeable

The published loading files show the expected file format. The database records supply the values used by the generator. The ICDC data model defines the rules for fields and relationships.

These sources can differ. The database links TCL01 to program `CSU FACC`, while the supplied loading example references `CMCP`. The export tool records the database source and creates a new program identifier for the trial. It does not mix the two program references.

## What the proof of concept produced

The export tool created one ZIP with four data files and a report:

| Output | Contents |
| --- | --- |
| Program file | One example program |
| Study file | One example study linked to that program |
| Case file | Five cases linked to that study |
| Sample file | Five samples, with one linked to each case |
| Report | Source details, settings, check results, and known limitations |

The tool does not generate every field in the same way:

| Information | Treatment |
| --- | --- |
| Sample characteristics | The generator selects values using the source records |
| Program and study descriptions | The tool reuses source text as labeled template content |
| Record identifiers and links | The tool creates new identifiers and connects the records |
| Patient first names | The tool leaves them blank |
| Optional sample collection dates | The tool omits them |
| Study accession number | The tool uses a test placeholder, not an officially assigned number |

The tool checked required fields, allowed values, supported data formats, unique identifiers, and links between the output records. It also checked that saving and rereading the files preserved their values. Checks after export confirmed that the ZIP was intact and contained the expected records.

All 12 automated tests passed. Passing these tests means that the trial's checks worked. It does not mean that ICDC has accepted the files.

Database access was read-only. Records stayed on the local machine, although the tool downloaded public model definitions. Credentials and generated files are excluded from version control, and the local files have owner-only permissions. Approval is still needed before sharing output that contains source-derived values.

## What the results do not establish

### The data is not proven anonymous or new

All five exported samples matched existing combinations of the compared sample characteristics. The comparison excludes new identifiers, links, and the omitted collection date.

An earlier trial reported one source match because it included collection date in the comparison. The counts answer different questions. Neither establishes that the generated data is safe to publish.

The trial also does not prove that the output reflects the source population or that every combination is biologically appropriate. Those questions need separate review.

### ICDC import compatibility remains unverified

The trial used rules from a specific ICDC model version, but it did not run the official software that imports records into ICDC.

The program file needs format confirmation because the published example set contains no program file. The accepted representation of fields containing multiple values also needs confirmation. The tool rejects those values rather than guessing. The test accession number may need different treatment before an import test.

### Navigator integration remains unfinished

The ZIP is a local result. The trial did not add a download to Navigator or provide a service that can generate data for users.

It also did not test other record types, other models, production demand, or operating cost.

## Options for making examples available

Both options could use the same generation and export code.

| Question | Prepare examples in advance | Generate examples on request |
| --- | --- | --- |
| What does the user do? | Download an existing example | Choose supported options and request an example |
| Does the user wait for generation? | No | Yes |
| How much can users customize? | They choose among published examples | They could choose options such as record count |
| What changes in Navigator? | Configure the existing download to use the prepared files | Add request handling, progress, errors, and download controls |
| When can the team review the output? | Before each example is published | The service needs checks for each request |
| What must the team operate? | A publishing and update process | A running service with access controls, usage limits, and monitoring |
| What is the main risk? | Published examples become outdated | Requests fail, consume too many resources, or expose source-derived data |

Preparing examples in advance requires less change to Navigator. Generating them on request offers more flexibility but adds a service to build and maintain.

The team has not measured production response times or costs. Those measurements would be needed if they affect the decision.

## Recommended next steps and decisions

First, confirm the file requirements. Test the output in a validation-only process.

Also confirm whether the database records may be used for shared examples. New identifiers do not remove the need to review copied text and sampled characteristics.

Once the output is approved, demonstrate its download through Navigator's existing static option. That is a small integration test, not a commitment to prepare all examples in advance.

The team then needs to decide:

- Are the examples intended only to teach file structure, or must they also demonstrate realistic variation?
- Do users need to choose record counts or record types?
- Which models and record types must the feature support?
- What source data may be used, and who approves output for sharing?
- Who will maintain published examples or operate a generation service?
- If generation runs on request, how long can users wait and how much usage should the service support?

These answers should guide the delivery choice. The current result supports further integration work, but not a claim that the files are ready for ICDC import or safe to publish.

## Technical reference

This section provides details for developers who need to reproduce or extend the trial.

### Model and file format

The trial uses ICDC `v2.1.0` at commit `e26839bf19507bac24e1d97e1efe30611bca8462`. The commit fixes the model files to a specific revision. The model version used for the original database load remains unconfirmed.

The schema files define record types, properties, and relationships. See the [node model](https://raw.githubusercontent.com/CBIIT/icdc-model-tool/e26839bf19507bac24e1d97e1efe30611bca8462/model-desc/icdc-model.yml) and [property definitions](https://raw.githubusercontent.com/CBIIT/icdc-model-tool/e26839bf19507bac24e1d97e1efe30611bca8462/model-desc/icdc-model-props.yml).

A sample links to a case through `of_case`. Cases link to studies, and studies link to programs, through `member_of`. These relationships are many-to-one.

The files use tab-separated text, also called TSV, despite their `.txt` extensions. Their parent-reference columns are:

| File | Column |
| --- | --- |
| Study | `program.program_acronym` |
| Case | `study.clinical_study_designation` |
| Sample | `case.case_id` |

The study example contains a leading space before its program-reference header. The exporter removes it. The single study-type value `Genomics` is supported, but multi-item lists are not. See the [pinned example set](https://github.com/CBIIT/icdc-data-loading-example-sets/tree/9a5287e346d5d49251517486204973a3cf6124fc).

### Generation and safeguards

The exporter imports the sibling `data-generator-mvp-hugging-face` repository. It reuses single-node relationship analysis and conditional sampling. The existing cross-node code mainly joins or compares source records, so the exporter constructs output references itself.

The source contains four tumor-origin values and three preservation values in addition to the variation noted above. The completed run used 46 samples and random seed `42`, a setting that controls random choices. The final report recorded 18 generator warnings. Earlier analysis showed classification warnings for fields with many distinct values relative to the number of records.

The command defaults to five cases and five samples. It accepts 2 to 500 source samples and requests for 1 to 100 cases and samples. It rejects incomplete generation, failed checks, unsupported compound values, and attempts to overwrite an existing ZIP. These are trial limits, not measured production limits.

Credentials come from the generator repository's ignored `.env` file. The connection must use a loopback Bolt endpoint, which restricts it to the local machine. Optional model downloads and Gradio analytics are disabled during generation.

The output report records schema hashes, settings, checksums, and source-combination match counts. Repeatable runs still require unchanged database contents, generator code, dependencies, and settings. The schema is fixed, but the complete environment and database are not frozen together.

### Download implementation

Navigator's dynamic download uses a JSON manifest, a file that lists the example filenames and their URLs. It adds timestamps to filenames and can duplicate extensions. Integration work should confirm the desired filenames rather than assume that the current naming behavior is suitable.

See the [download dropdown](src/components/ModelNavigator/DataDictionary/Header/components/download-dropdown-menu.js) and [download helpers](src/components/ModelNavigator/DataDictionary/utils.js).

### Code and local output

- [Exporter](poc/loading-examples/export_examples.py).
- [Automated tests](poc/loading-examples/test_export_examples.py).
- [Run guide](poc/loading-examples/README.md).

The local archive is `poc/loading-examples/output/POC-TCL01-seed-42.zip`. It contains `POC-TCL01-program.txt`, `POC-TCL01-study.txt`, `POC-TCL01-case.txt`, `POC-TCL01-sample.txt`, and `poc-report.json`.

Git ignores the archive, so a repository checkout will not include it. The run guide contains the generation and test commands. This report contains no credentials or individual source records.
