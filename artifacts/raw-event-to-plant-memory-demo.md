# Shift Constraint Mapper - Demo Output

**Purpose:** screenshot-ready proof artifact for the newsletter narrative.  
**Demo scenario:** Line 2 wrapper instability after changeover, labor coverage gap, and temporary maintenance fix.  
**Product frame:** raw shift events become plant memory: passdown, constraint map, recurrence watchlist, and 7/30/90 verification.

---

## 1. Raw Shift Events

### Event A - Wrapper After Changeover

- **Line:** Line 2
- **Event:** Repeated wrapper stops after changeover
- **Downtime:** 52 minutes
- **Category:** Equipment / Changeover
- **Suspected cause:** Wrapper would run in manual but faulted at normal speed after changeover.
- **Action taken:** Maintenance adjusted settings and restarted line.
- **Carryover:** Yes. Sustained-run verification was not completed before shift end.

### Event B - Labor Coverage

- **Line:** Line 2 / startup support
- **Event:** Checker and drive-off coverage gap during startup
- **Downtime:** 31 minutes
- **Category:** Labor
- **Suspected cause:** Critical coverage was short while the line was trying to recover from break overlap.
- **Action taken:** Supervisor borrowed utility operator and restarted with delayed quality checks.
- **Carryover:** Yes. Coverage is still a startup risk.

### Event C - Temporary Maintenance Fix

- **Line:** Line 4
- **Event:** Temporary sensor bypass used to keep line running
- **Downtime:** 35 minutes
- **Category:** Maintenance
- **Suspected cause:** Intermittent sensor fault returned after reset; spare was not available at line.
- **Action taken:** Temporary bypass used to complete run.
- **Carryover:** Yes. Maintenance follow-up needed before next normal-speed startup.

---

## 2. Real Passdown

Line 2 had repeated wrapper stops after changeover, causing 52 minutes of downtime. Maintenance adjusted settings and restarted the line, but no sustained-run verification was completed before shift end. Next shift should monitor the first hour of startup, confirm wrapper settings, and escalate if the same fault repeats.

Checker and drive-off coverage were short during startup recovery, adding 31 minutes of loss and delaying quality checks. Coverage needs to be locked before next startup; do not assume normal rate if those roles are uncovered.

Line 4 ran with a temporary sensor bypass after an intermittent fault returned. Treat running status as provisional. Maintenance needs to inspect the sensor and close the temporary repair before the next normal-speed startup.

Main carryover: wrapper stability after changeover, critical labor coverage before startup, and sensor bypass verification.

---

## 3. Constraint Map

| Event | Stated Issue | Actual Constraint | Dependency | Mismatch | Next-Shift Trigger | Verification |
|---|---|---|---|---|---|---|
| Line 2 wrapper stops | Wrapper faulted after changeover | Post-changeover stability is not verified under sustained run conditions | Centerline accuracy, trained recovery behavior, maintenance availability | Schedule assumes normal speed immediately after unstable setup | Watch first-hour stops, repeated adjustments, and slow recovery | Confirm no repeat wrapper stops within 7 days after similar changeovers |
| Checker / drive-off gap | Short labor coverage | Critical labor coverage is not protected before startup | Shift staffing, supervisor coverage decisions, trained backups | Schedule assumes normal rate while a control role is thin | Watch quality checks, startup rate, and supervisor intervention load | Verify critical roles are covered before startup and compare rate/quality |
| Sensor bypass | Temporary fix kept line running | Equipment recovery is treated as fixed before repair is proven | Maintenance response, spare parts, fault history | Line status says running, but repair has not been verified | Watch same fault, temporary bypasses, repeated resets | Confirm no repeat fault within 7 days and close bypass at 30-day check |

---

## 4. RCA Starter

**Problem statement:** Line 2 had repeated wrapper stops after changeover, causing 52 minutes of downtime and an unstable carryover condition.

**Initial suspected cause:** Wrapper settings or recovery standard were not stable under normal-speed operation after changeover.

**Constraint category:** Equipment / changeover / maintenance verification.

**Evidence needed:**

- Fault history
- Maintenance notes
- Operator comments
- Settings before and after adjustment
- First-hour startup behavior on next run
- Whether the same issue repeats on similar changeovers

**Immediate containment:** Monitor first hour of startup, confirm wrapper settings, and escalate as recurrence if same fault repeats.

**Permanent fix candidate:** Create a standard post-changeover verification check and documented wrapper settings baseline.

---

## 5. Follow-Up Actions

| Action | Owner | Due | Priority | Verification Method |
|---|---|---|---|---|
| Verify Line 2 wrapper stability under normal speed | Maintenance + Supervisor | Next shift | High | No repeated wrapper stops in first hour |
| Lock checker and drive-off coverage before startup | Supervisor | Pre-shift | High | Critical roles covered before startup and quality checks on time |
| Inspect bypassed sensor and close temporary repair | Maintenance | Next normal-speed startup | High | Fault does not recur within 7 days |
| Add wrapper issue to recurrence watchlist | Supervisor / CI | Same day | High | Review repeat events after similar changeovers |

---

## 6. Recurrence Watchlist

- **Line 2 wrapper after changeover:** active. Trigger if same fault repeats within 7 days or after similar SKU family changeover.
- **Checker / drive-off coverage:** active. Trigger if startup depends on borrowed labor or quality checks are delayed.
- **Temporary sensor bypass:** monitoring. Trigger if bypass remains open or same fault returns after reset.

---

## 7. 7/30/90 Verification Tracker

| Issue | 7-Day Check | 30-Day Check | 90-Day Check | Status |
|---|---|---|---|---|
| Line 2 wrapper after changeover | Did wrapper stops recur within 7 days? | Did post-changeover verification reduce recurrence across similar runs? | Did the line sustain recovery without relying on one experienced operator? | Open |
| Checker / drive-off coverage | Were critical roles covered before startup this week? | Did startup rate and quality checks improve when roles were protected? | Did coverage protection become normal pre-shift behavior? | Open |
| Temporary sensor bypass | Did the same fault return within 7 days? | Was the bypass closed and permanent repair verified? | Did the issue remain closed without workaround behavior? | Monitoring |

---

## 8. Screenshot Line

> The passdown is the visible part. The constraint map is the point.

---

## 9. Newsletter-Safe Product Claim

Use this publicly:

> I built the first version of Shift Constraint Mapper around a narrow loop: raw shift event, real passdown, constraint map, recurrence watchlist, and 7/30/90 verification.

Avoid:

> Fully deployed.
> Production validated.
> Enterprise-ready.
> Replacing MES.

