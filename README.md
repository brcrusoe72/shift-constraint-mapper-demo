# Shift Constraint Mapper Demo

Public static demo for **Shift Constraint Mapper**, a first-version manufacturing passdown and plant-memory prototype.

Expected GitHub Pages URL:

```text
https://brcrusoe72.github.io/shift-constraint-mapper-demo/
```

## What This Is

Shift Constraint Mapper turns a raw shift event into a practical plant-memory loop:

```text
raw shift event -> real passdown -> constraint map -> recurrence watchlist -> 7/30/90 verification
```

The demo runs entirely in the browser. It uses deterministic parsing and classification logic, bundled sample data, and local file upload.

## What This Is Not

This is not production deployed. It is not enterprise-ready. It is not a MES replacement. It does not use private plant data, backend APIs, OpenAI, Anthropic, or server-side secrets.

## How To Use The Demo

1. Open the GitHub Pages URL.
2. Click **Load Demo** to load the bundled sample shift.
3. Review **Overview**, **Passdown**, **Constraints**, and **Verify**.
4. Use **Download sample CSV** to inspect the input data.
5. Use **Open proof artifact** to see the raw-event-to-plant-memory example in Markdown.

You can also upload a local CSV, XLSX, XLS, XLSM, or ODS passdown file. The file is parsed in your browser.

## Sample Data

The bundled sample is:

```text
sample_data/shift_constraint_mapper_demo.csv
```

It contains one demo shift:

- Passdown id: `SCM-DEMO-2026-05-22-3RD`
- Line: `Line 2`
- Context: `Family B changeover`
- Total event downtime: `118` minutes
- Downtime events: wrapper stops, checker/drive-off labor coverage, temporary sensor bypass

The proof artifact is:

```text
artifacts/raw-event-to-plant-memory-demo.md
```

## GitHub Pages Setup

This repository is meant to be served from the repo root.

GitHub settings:

```text
Settings -> Pages -> Deploy from branch -> main -> /root -> Save
```

The static build files live at the repository root, not inside a nested `dist/` folder.

## Newsletter Link Text

```text
I built a small prototype around the loop in this essay: raw shift event -> real passdown -> constraint map -> recurrence watchlist -> 7/30/90 verification.
```

