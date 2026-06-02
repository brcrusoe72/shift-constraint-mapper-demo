# Build Prompt - Shift Constraint Mapper GitHub Pages Demo

You are an AI coding agent. Build a polished, public, static GitHub Pages demo for **Shift Constraint Mapper**, a manufacturing passdown and plant-memory prototype.

The end result should be simple enough to link in a LinkedIn newsletter, credible enough for manufacturing operations leaders, and static enough to run on GitHub Pages without a backend.

## Context Efficiency Rules

1. Do not read the whole workspace. Read only the files listed in each stage.
2. Check file size before opening anything over 500 lines.
3. Use `rg` for locating functions/classes before reading large files.
4. Do not include server-only or secret-backed features in the public Pages build.
5. Preserve the current prototype logic unless the prompt explicitly says to change it.
6. Verify after every major stage with the listed command.

## Current Local State

Primary source project:

```text
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca
```

Static Pages package already started here:

```text
/home/brcru/.openclaw/workspace/shift-constraint-mapper-demo
```

Current static package contains:

```text
/home/brcru/.openclaw/workspace/shift-constraint-mapper-demo/index.html
/home/brcru/.openclaw/workspace/shift-constraint-mapper-demo/assets/
/home/brcru/.openclaw/workspace/shift-constraint-mapper-demo/favicon.svg
/home/brcru/.openclaw/workspace/shift-constraint-mapper-demo/.nojekyll
/home/brcru/.openclaw/workspace/shift-constraint-mapper-demo/README.md
/home/brcru/.openclaw/workspace/shift-constraint-mapper-demo/sample_data/shift_constraint_mapper_demo.csv
/home/brcru/.openclaw/workspace/shift-constraint-mapper-demo/artifacts/raw-event-to-plant-memory-demo.md
```

The static package has a local git commit:

```text
2145c67 Publish static Shift Constraint Mapper demo
```

Do not rely on the existing remote credentials. The local machine currently lacks `gh`, and a stale token in the parent workspace remote returned `401 Bad credentials`.

## Product Context

Shift Constraint Mapper turns messy shift events into plant memory:

- real passdown
- top constraints
- constraint matrix
- RCA starter
- follow-up actions
- recurrence watchlist
- 7/30/90 verification checks

The newsletter narrative is about passdown as plant memory. The public demo should support this claim:

```text
I built the first version of Shift Constraint Mapper around a narrow loop: raw shift event -> real passdown -> constraint map -> recurrence watchlist -> 7/30/90 verification.
```

Guardrails:

- Do not claim this is production deployed.
- Do not claim enterprise readiness.
- Do not imply MES replacement.
- Use "prototype", "first version", and "public demo" language.
- No private plant data, no real employer names, no API keys, no backend secrets.

## Key Files To Read

Read these source files first:

```text
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/README.md
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/package.json
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/vite.config.ts
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/src/App.tsx
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/src/types/passdown.ts
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/src/data/demo.ts
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/src/services/parser.ts
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/src/services/constraintMapper.ts
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/src/components/PassdownUpload.tsx
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/src/components/PlantMemoryOutput.tsx
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/src/index.css
```

Read these data/artifact files:

```text
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/sample_data/shift_constraint_mapper_demo.csv
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/artifacts/raw-event-to-plant-memory-demo.md
```

## Real Data Reference

Demo CSV:

```text
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/sample_data/shift_constraint_mapper_demo.csv
```

Row count:

```text
2 lines total: 1 header row, 1 data row
```

CSV columns, in order:

```text
1. passdown_id
2. date
3. shift
4. shift_lead
5. line
6. sku
7. oee
8. target_oee
9. availability
10. target_availability
11. performance
12. target_performance
13. quality
14. target_quality
15. units_produced
16. target_units_produced
17. scrap_pct
18. target_scrap_pct
19. event_1_description
20. event_1_duration
21. event_1_category
22. event_1_root_cause
23. event_1_corrective_action
24. event_1_recurring
25. event_2_description
26. event_2_duration
27. event_2_category
28. event_2_root_cause
29. event_2_corrective_action
30. event_2_recurring
31. event_3_description
32. event_3_duration
33. event_3_category
34. event_3_root_cause
35. event_3_corrective_action
36. event_3_recurring
37. safety_incidents
38. safety_near_miss_count
39. safety_near_miss_description
40. safety_observation
41. quality_holds
42. quality_held_details
43. quality_events
44. handoff_notes
45. ongoing_issues
46. maintenance_requests
```

Validation numbers from the demo data:

```text
Passdown id: SCM-DEMO-2026-05-22-3RD
Date: 2026-05-22
Shift: 3rd
Line: Line 2
SKU/context: Family B changeover
OEE: 71.4
Target OEE: 80
Availability: 82.1
Performance: 90.2
Quality: 96.5
Units produced: 16,340
Target units: 18,000
Scrap %: 2.1
Target scrap %: 1.5
Downtime events: 3
Event durations: 52, 31, 35 minutes
Total event downtime: 118 minutes
Recurring events: 2
Top event by score: Repeated wrapper stops after changeover
```

Expected top constraint themes:

```text
1. Post-changeover stability not verified under sustained run conditions.
2. Critical labor coverage not protected before startup/recovery.
3. Equipment recovery treated as fixed before repair is proven under normal speed.
```

## Existing Type Contracts

Keep or improve these TypeScript contracts. Do not remove fields unless you update all consumers.

```ts
export type ShiftName = "1st" | "2nd" | "3rd";

export interface KpiMetric {
  label: string;
  value: number;
  target: number;
  unit: "%" | "count";
}

export interface DowntimeEvent {
  id: string;
  description: string;
  durationMinutes: number;
  category: string;
  rootCause: string;
  correctiveAction: string;
  recurring: boolean;
}

export interface EvidenceAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  dataUrl: string;
  note: string;
}

export interface SafetySection {
  incidents: boolean;
  nearMissCount: number;
  nearMissDescription: string;
  observation: string;
}

export interface QualitySection {
  holds: boolean;
  heldProductDetails: string;
  qualityEvents: string;
}

export interface ShiftPassdown {
  id: string;
  date: string;
  shift: ShiftName;
  shiftLead: string;
  line: string;
  sku: string;
  kpis: KpiMetric[];
  downtimeEvents: DowntimeEvent[];
  safety: SafetySection;
  quality: QualitySection;
  handoffNotes: string;
  ongoingIssues: string;
  maintenanceRequests: string;
}

export interface ConstraintMatrixRow {
  event: string;
  statedIssue: string;
  constraint: string;
  dependency: string;
  mismatch: string;
  trigger: string;
  verification: string;
  priority: "High" | "Medium" | "Low";
}

export interface FollowUpAction {
  action: string;
  owner: string;
  due: string;
  priority: "High" | "Medium" | "Low";
  verificationMethod: string;
}

export interface VerificationCheck {
  issue: string;
  sevenDay: string;
  thirtyDay: string;
  ninetyDay: string;
  status: "Open" | "Monitoring" | "Improved" | "Closed";
}

export interface PlantMemoryOutput {
  shiftBrief: string;
  realPassdown: string[];
  topConstraints: string[];
  constraintMatrix: ConstraintMatrixRow[];
  rcaStarter: string[];
  followUpActions: FollowUpAction[];
  recurrenceWatchlist: string[];
  verificationChecks: VerificationCheck[];
}
```

## Architecture Decision

Build a **static browser-only GitHub Pages demo**.

Allowed:

- React + TypeScript + Vite
- deterministic browser-side parsing and classification
- local demo data bundled in code
- user file upload for CSV, XLSX, XLS, ODS, XLSM where currently supported
- downloadable sample CSV
- downloadable markdown artifact
- newsletter CTA copy

Not allowed:

- Express backend in public Pages build
- API routes
- API keys
- Anthropic/OpenAI calls
- server-side shared path loading
- claims of production deployment

## Build Order

### Stage 1 - Static Safety Cleanup

Goal: remove or hide backend-only features from the public demo.

Key files:

```text
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/src/App.tsx
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/src/components/PassdownUpload.tsx
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/vite.config.ts
```

Requirements:

- `vite.config.ts` must use `base: "./"` so GitHub Pages nested URLs load assets.
- The public UI must not offer "shared export path" or any backend path loader.
- The demo must still support:
  - Load Demo button
  - local CSV upload
  - local workbook upload if the existing parser supports it
- If `loadLatestFromSharedPath` remains imported, remove it from the public build path.
- No fetch to `/api/*` should happen on initial load in the public build.

Verification:

```bash
cd /home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web
npm run build
grep -R '"/api\\|/api\\|Load Shared Export\\|shared export path' dist src || true
```

Acceptable result:

- Build passes.
- No public UI string says "Load Shared Export".
- No initial-load API call remains in the static demo path.

### Stage 2 - Public Demo UX Polish

Goal: make the first screen newsletter-ready and self-explanatory without becoming a marketing page.

Key files:

```text
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/src/App.tsx
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/src/components/KPIStrip.tsx
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/src/components/PlantMemoryOutput.tsx
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/src/index.css
```

Requirements:

- Keep the app as the first screen. Do not build a generic landing page.
- Header should say clearly:

```text
Shift Constraint Mapper
Raw shift event -> real passdown -> constraint map -> verification
```

- Add small public-demo language:

```text
Static prototype. Demo data only. Runs in your browser.
```

- Keep five views:
  - Intake
  - Overview
  - Passdown
  - Constraints
  - Verify
- Ensure button labels fit on mobile.
- Add links or buttons for:
  - Load Demo
  - Download sample CSV
  - Open proof artifact
- Do not use giant hero cards, decorative blobs, or heavy marketing copy.
- Design should feel like a quiet operations dashboard.
- Use restrained colors, high contrast, and stable dimensions.

Verification:

```bash
cd /home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web
npm run build
```

Manual check:

- Header is understandable in under 5 seconds.
- User can click Load Demo and see output without uploading anything.
- User can reach constraint and verify views without broken state.

### Stage 3 - Deterministic Plant-Memory Logic

Goal: make the public demo’s output sharper and more defensible.

Key files:

```text
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/src/services/constraintMapper.ts
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web/src/types/passdown.ts
```

Existing logic already classifies:

- labor
- changeover/startup
- maintenance/equipment
- material
- generic unresolved issues

Improve only if needed. Preserve these outputs:

- shift brief
- real passdown
- top constraints
- constraint matrix
- RCA starter
- follow-up actions
- recurrence watchlist
- 7/30/90 verification checks

Required behavior against demo:

- Total downtime should remain 118 minutes.
- Wrapper issue should be the top concern.
- Wrapper issue should map to post-changeover stability.
- Checker/drive-off issue should map to labor coverage.
- Sensor bypass issue should map to equipment recovery / temporary fix.
- Verification language must include 7-day, 30-day, and 90-day checks.

Do not add AI narrative generation in this stage.

Verification:

Add lightweight tests if the project already has a test setup. If no test setup exists, add a tiny deterministic Node/TypeScript validation script or document manual validation in `README.md`.

Minimum validation command can be:

```bash
cd /home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/web
npm run build
```

Better validation:

```bash
npm run validate:demo
```

If adding `validate:demo`, it should assert the hard numbers above.

### Stage 4 - Static Package Generation

Goal: produce a clean GitHub Pages repo from the Vite build.

Output repo path:

```text
/home/brcru/.openclaw/workspace/shift-constraint-mapper-demo
```

Package contents:

```text
index.html
assets/
favicon.svg
.nojekyll
README.md
sample_data/shift_constraint_mapper_demo.csv
artifacts/raw-event-to-plant-memory-demo.md
BUILD_PROMPT_FULL_GITHUB_PAGES_DEMO.md
```

Build/copy command:

```bash
cd /home/brcru/.openclaw/workspace
npm --prefix projects/specout/passdown_shift_rca/web run build
rsync -a --delete projects/specout/passdown_shift_rca/web/dist/ shift-constraint-mapper-demo/
mkdir -p shift-constraint-mapper-demo/sample_data shift-constraint-mapper-demo/artifacts
cp projects/specout/passdown_shift_rca/sample_data/shift_constraint_mapper_demo.csv shift-constraint-mapper-demo/sample_data/
cp projects/specout/passdown_shift_rca/artifacts/raw-event-to-plant-memory-demo.md shift-constraint-mapper-demo/artifacts/
touch shift-constraint-mapper-demo/.nojekyll
```

Do not copy:

- `node_modules`
- `.env`
- server files
- API keys
- parent workspace git metadata

Verification:

```bash
cd /home/brcru/.openclaw/workspace/shift-constraint-mapper-demo
python3 -m http.server 8087
```

In another shell:

```bash
curl -sSI http://localhost:8087/ | head
curl -sSI http://localhost:8087/assets/$(ls assets/*.js | xargs -n1 basename) | head
curl -sSI http://localhost:8087/assets/$(ls assets/*.css | xargs -n1 basename) | head
curl -sSI http://localhost:8087/sample_data/shift_constraint_mapper_demo.csv | head
```

All should return `200 OK`.

### Stage 5 - README And Newsletter Copy

Goal: make the repo usable by someone who clicks from the newsletter.

Key file:

```text
/home/brcru/.openclaw/workspace/shift-constraint-mapper-demo/README.md
```

README must include:

- What this is.
- What this is not.
- How to use the demo.
- How to open the sample data.
- GitHub Pages setup.
- Suggested newsletter link text.

Recommended newsletter link text:

```text
I built a small prototype around the loop in this essay: raw shift event -> real passdown -> constraint map -> recurrence watchlist -> 7/30/90 verification.
```

Expected URL after publish:

```text
https://brcrusoe72.github.io/shift-constraint-mapper-demo/
```

### Stage 6 - GitHub Publishing

Goal: publish as a standalone public GitHub Pages repo.

Repository:

```text
brcrusoe72/shift-constraint-mapper-demo
```

If GitHub CLI is installed and authenticated:

```bash
cd /home/brcru/.openclaw/workspace/shift-constraint-mapper-demo
gh repo create brcrusoe72/shift-constraint-mapper-demo --public --source=. --remote=origin --push
```

If GitHub CLI is not installed:

1. Create a public GitHub repo manually named:

```text
shift-constraint-mapper-demo
```

2. Push:

```bash
cd /home/brcru/.openclaw/workspace/shift-constraint-mapper-demo
git remote add origin https://github.com/brcrusoe72/shift-constraint-mapper-demo.git
git push -u origin main
```

3. Enable Pages:

```text
Settings -> Pages -> Deploy from branch -> main -> /root -> Save
```

If using GitHub API/connector instead of CLI, create the repo first, upload the static package root, then enable Pages from `main` root.

Do not push the entire parent workspace.

## File Structure Target

Source app remains:

```text
/home/brcru/.openclaw/workspace/projects/specout/passdown_shift_rca/
  README.md
  artifacts/raw-event-to-plant-memory-demo.md
  sample_data/shift_constraint_mapper_demo.csv
  web/
    package.json
    vite.config.ts
    src/
      App.tsx
      index.css
      components/
      data/demo.ts
      services/parser.ts
      services/constraintMapper.ts
      types/passdown.ts
```

Publish repo should be:

```text
/home/brcru/.openclaw/workspace/shift-constraint-mapper-demo/
  .git/
  .nojekyll
  README.md
  BUILD_PROMPT_FULL_GITHUB_PAGES_DEMO.md
  index.html
  favicon.svg
  assets/
    index-*.js
    index-*.css
  sample_data/
    shift_constraint_mapper_demo.csv
  artifacts/
    raw-event-to-plant-memory-demo.md
```

## Design Principles

1. **Operations dashboard, not SaaS landing page.** First screen should be useful immediately.
2. **Plant-floor credibility over AI theatrics.** The demo should feel like it came from someone who has worked shifts.
3. **Narrow loop.** Raw event -> passdown -> constraint -> recurrence -> verification.
4. **Static and safe.** No backend, no secrets, no external API calls.
5. **Story supports the tool.** The newsletter explains the why; the demo proves the shape.
6. **No inflated claims.** Prototype language only.
7. **Verification beats vibes.** Every build step has a command or concrete browser check.

## Acceptance Criteria

### Static Hosting

- [ ] `npm run build` passes in the source web project.
- [ ] Built `index.html` uses relative paths like `./assets/...`, not `/assets/...`.
- [ ] `.nojekyll` exists in the static repo root.
- [ ] Local static server returns `200 OK` for HTML, JS, CSS, sample CSV, and proof artifact.
- [ ] No `.env`, API key, or server-only file exists in the static repo.

### Demo Behavior

- [ ] User can click **Load Demo** and immediately see output.
- [ ] Demo output includes 118 minutes total downtime.
- [ ] Demo output includes wrapper, labor coverage, and sensor bypass issues.
- [ ] Constraints view clearly distinguishes event vs constraint.
- [ ] Verify view includes 7-day, 30-day, and 90-day checks.
- [ ] CSV upload still works with the sample CSV.

### Public Positioning

- [ ] Header explains the product in one glance.
- [ ] Public language says static prototype / first version / browser demo.
- [ ] No production deployment or enterprise-ready claim appears.
- [ ] Newsletter CTA text is present in README.
- [ ] README includes expected Pages URL.

### Publishing

- [ ] Standalone repo exists at `brcrusoe72/shift-constraint-mapper-demo`.
- [ ] Repo root contains static build files, not a nested `dist/` folder.
- [ ] GitHub Pages is enabled from `main` `/root`.
- [ ] Published URL loads:

```text
https://brcrusoe72.github.io/shift-constraint-mapper-demo/
```

## Known Current Blockers

- `gh` CLI was not installed on the local machine during initial packaging.
- Existing parent workspace GitHub token returned `401 Bad credentials`.
- Browser automation was blocked, so the initial package was verified by `curl` instead of screenshot.

If these blockers remain, do not spend time on them. Finish the local package and provide manual publish instructions.

## Final Deliverable

Return:

1. Summary of files changed.
2. Verification commands run and results.
3. Local demo path.
4. GitHub Pages URL if published.
5. Exact next step if publishing is blocked.
