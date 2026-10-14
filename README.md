# Deep Constraints Triage demo

Static browser tool for recording a production incident, exploring constraint
hypotheses, and exporting an incident record. Built from HTML, CSS, and JavaScript;
no backend or package installation is required.

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. `config.js` supplies the site name, public URL, optional
analytics, and feedback destination. `config.production.example.js` is a template;
its placeholder contact details must be replaced before use.

Drafts and recent incidents are stored in browser `localStorage`. The export action
downloads JSON. Clearing site data removes those local records. Feedback/analytics
can involve external services if enabled; the checked-in default disables analytics
and has no feedback destination configured.

This is a structured triage aid, not a validated root-cause diagnosis or scheduling
optimizer. Confirm suggested explanations against actual production evidence.
Reviewed 2026-10-13.
