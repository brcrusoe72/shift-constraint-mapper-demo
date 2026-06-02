# Shift Constraint Mapper Demo

Static GitHub Pages demo for the Shift Constraint Mapper newsletter CTA.

## What This Is

Shift Constraint Mapper turns raw shift events into plant memory:

- real passdown
- top constraints
- recurrence watchlist
- RCA starter
- 7/30/90 verification checks

This public version runs entirely in the browser. It does not include the Express backend, shared-path loading, or API-backed AI narrative generation.

## Use It Locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/
```

Click **Load Demo** or upload:

```text
sample_data/shift_constraint_mapper_demo.csv
```

## GitHub Pages Setup

Create a public repository named:

```text
shift-constraint-mapper-demo
```

Push this folder as the repository root.

In GitHub:

1. Go to **Settings -> Pages**.
2. Source: **Deploy from a branch**.
3. Branch: **main**.
4. Folder: **/root**.
5. Save.

The expected URL is:

```text
https://brcrusoe72.github.io/shift-constraint-mapper-demo/
```

## Newsletter Link Text

Use:

```text
I built a small prototype around the loop in this essay: raw shift event -> real passdown -> constraint map -> recurrence watchlist -> 7/30/90 verification.
```

Then link to the GitHub Pages URL.

## Files

- `index.html` - static demo app
- `assets/` - built JS/CSS bundle
- `sample_data/shift_constraint_mapper_demo.csv` - demo input file
- `artifacts/raw-event-to-plant-memory-demo.md` - screenshot-ready proof artifact
