const test = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const vm = require("node:vm");

const app = readFileSync(require.resolve("../app.js"), "utf8");
const key = "deepConstraintsIncidents";

function session(raw, { denyRead = false, denyWrite = false } = {}) {
  const data = new Map(raw === undefined ? [] : [[key, raw]]);
  const storage = {
    getItem(k) {
      if (denyRead) throw new Error("storage unavailable");
      return data.get(k) ?? null;
    },
    setItem(k, v) {
      if (denyWrite) throw new Error("quota exceeded");
      data.set(k, v);
    }
  };
  const context = vm.createContext({
    localStorage: storage, window: { clearTimeout() {}, setTimeout() {} },
    document: { addEventListener() {}, createElement() { return {}; } }
  });
  const run = (s) => vm.runInContext(s, context);
  run(app);
  run(`ids.forEach(id => { elements[id] = {value: "", checked: false}; });
    elements.actionStatus = {}; elements.saveState = {}; elements.passdownNote = {};
    elements.logList = {appendChild(node) { this.item = node; }};
  `);
  return { run, data };
}

for (const raw of ["{", "{}", "null", "[null]"]) {
  test("saving preserves unreadable incident log: " + raw, () => {
    const { run, data } = session(raw);
    run("saveIncident()");
    assert.equal(data.get(key), raw);
    assert.match(run("elements.actionStatus.textContent"), /not saved/i);
    run("renderLog()");
    assert.match(run("elements.logList.item.textContent"), /cannot read/i);
  });
}

test("a failed read cannot be mistaken for a new log", () => {
  const { run, data } = session("[]", { denyRead: true });
  run("saveIncident()");
  assert.equal(data.get(key), "[]");
  assert.match(run("elements.actionStatus.textContent"), /not saved/i);
});

test("failed writes report unsaved state and preserve existing log", () => {
  const { run, data } = session("[]", { denyWrite: true });
  // Isolate draft persistence from unrelated UI rendering.
  run("renderMetrics = () => {}; renderSupport = () => {}; update()");
  assert.match(run("elements.saveState.textContent"), /not saved/i);
  run("saveIncident()");
  assert.equal(data.get(key), "[]");
  assert.match(run("elements.actionStatus.textContent"), /not saved/i);
});

test("a new log accepts incidents and retains the newest twelve", () => {
  const { run, data } = session();
  for (let i = 0; i < 13; i++) {
    run(`elements.line.value = "line ${i}"; saveIncident()`);
  }
  const rows = JSON.parse(data.get(key));
  assert.equal(rows.length, 12);
  assert.equal(rows[0].title, "line 12");
  assert.equal(rows[11].title, "line 1");
  assert.match(run("elements.actionStatus.textContent"), /saved to local log/i);
});
