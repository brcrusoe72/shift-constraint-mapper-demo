const test = require("node:test");
const assert = require("node:assert/strict");

const {
  analyzeIncident,
  normalizeNonnegativeNumber,
  normalizeValues
} = require("../app.js");

test("normalizes invalid and negative numeric input to zero", () => {
  assert.equal(normalizeNonnegativeNumber("1e309"), 0);
  assert.equal(normalizeNonnegativeNumber(-1), 0);
  assert.equal(normalizeNonnegativeNumber("12.5"), 12.5);
});

test("normalizes every numeric incident field", () => {
  const values = normalizeValues({
    minutesDown: Infinity,
    repairMinutes: -10,
    ratePerHour: "60",
    costPerHour: NaN
  });

  assert.equal(values.minutesDown, 0);
  assert.equal(values.repairMinutes, 0);
  assert.equal(values.ratePerHour, 60);
  assert.equal(values.costPerHour, 0);
  assert.equal(values.peopleReassigned, 0);
});

test("keeps analysis and JSON exports finite for hostile numeric values", () => {
  const analysis = analyzeIncident({
    issue: "Conveyor stopped",
    priority: "high",
    minutesDown: "1e309",
    repairMinutes: 30,
    ratePerHour: "1e309",
    costPerHour: -500,
    maintenanceTechs: 2,
    productionStaff: 10,
    peopleReassigned: 4
  });

  assert.equal(analysis.projectedDowntime, 30);
  assert.equal(analysis.lostUnits, 0);
  assert.equal(analysis.downtimeCost, 0);
  assert.ok(Number.isFinite(analysis.riskScore));
  assert.doesNotMatch(JSON.stringify(analysis), /null/);
});

test("preserves valid downtime calculations", () => {
  const analysis = analyzeIncident({
    issue: "Conveyor stopped",
    priority: "normal",
    minutesDown: 30,
    repairMinutes: 30,
    ratePerHour: 120,
    costPerHour: 600,
    maintenanceTechs: 3,
    productionStaff: 20,
    peopleReassigned: 0
  });

  assert.equal(analysis.projectedDowntime, 60);
  assert.equal(analysis.lostUnits, 120);
  assert.equal(analysis.downtimeCost, 600);
});
