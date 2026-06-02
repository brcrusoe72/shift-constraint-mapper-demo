# Shift Constraint Mapper Demo

Static local-first demo for **Shift Constraint Mapper**, a manufacturing passdown and plant-memory prototype.

## What This Is

This demo opens directly on bundled sample data and shows the loop:

```text
raw shift event -> real passdown -> constraint map -> recurrence watchlist -> 7/30/90 verification
```

It is a static browser demo. No backend, no API keys, no shared-path loader, and no file upload intake.

## How To Use It

1. Open the demo.
2. Use the view tabs: **Overview**, **Passdown**, **Constraints**, and **Verify**.
3. Click **Reset demo** if you want to reload the bundled sample.
4. Use **Download sample CSV** to inspect the local sample data.
5. Use **Open proof artifact** to inspect the Markdown proof output.

## Sample Data

Bundled sample:

```text
sample_data/shift_constraint_mapper_demo.csv
```

Proof artifact:

```text
artifacts/raw-event-to-plant-memory-demo.md
```

## Newsletter Link Text

```text
I built a small prototype around the loop in this essay: raw shift event -> real passdown -> constraint map -> recurrence watchlist -> 7/30/90 verification.
```
