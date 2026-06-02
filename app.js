const manualLibrary = [
  {
    match: ["conveyor", "sprocket", "chain", "belt"],
    title: "Conveyor drive and sprocket checks",
    hints: [
      "Verify chain pitch, bore size, keyway or set screw, tooth count, hub width, and guard clearance before using any approximate sprocket.",
      "Check for chain stretch, misalignment, missing master links, cracked guards, and seized rollers that may have contributed to the failure.",
      "If the exact part is missing and a similar part exists, the supervisor review should focus on fit, load rating, safety guarding, and restart risk."
    ]
  },
  {
    match: ["motor", "gearbox", "drive", "vfd"],
    title: "Motor, gearbox, or drive checks",
    hints: [
      "Capture motor frame, voltage, horsepower, RPM, rotation, gearbox ratio, and overload history before swapping components.",
      "Confirm lockout, thermal overload status, fault codes, and coupling condition before assuming the drive component is the root cause.",
      "Escalate when the spare differs by horsepower, frame size, voltage, phase, ratio, or mounting pattern."
    ]
  },
  {
    match: ["sensor", "photoeye", "prox", "proximity", "limit switch"],
    title: "Sensor and controls checks",
    hints: [
      "Record sensor type, part number, voltage, output type, connector style, and normal indicator status.",
      "Before replacing, inspect brackets, product buildup, target distance, cable damage, and recent changeover adjustments.",
      "Escalate if bypassing or jumping the signal would affect guarding, jam detection, or quality controls."
    ]
  },
  {
    match: ["bearing", "shaft", "roller", "pulley"],
    title: "Rotating component checks",
    hints: [
      "Check shaft size, bearing bore, mounting style, seal type, lubrication needs, and whether adjacent components show heat or wear.",
      "Document any abnormal noise, vibration, heat, belt tracking issue, or product contamination before restart.",
      "Escalate if a substitute changes load capacity, material compatibility, sanitation exposure, or machine guarding."
    ]
  }
];

const sampleIncident = {
  issue: "Case conveyor stopped during normal running. Maintenance found the plastic sprocket broken into two pieces.",
  line: "Line 3",
  equipment: "Discharge conveyor",
  shift: "Third shift",
  priority: "critical",
  minutesDown: 55,
  repairMinutes: 90,
  ratePerHour: 2400,
  costPerHour: 1800,
  peopleReassigned: 6,
  maintenanceTechs: 2,
  productionStaff: 19,
  finding: "Exact sprocket was not found in the crib. A similar sprocket appears to be available, but it has not been fully compared against the failed part.",
  exactPart: "CONV-SPR-40B18-1",
  exactPartStatus: "missing",
  approxPart: "40B18 plastic sprocket from auxiliary conveyor kit",
  approxLocation: "Maintenance crib shelf C-14",
  manualNote: "Manual calls out chain pitch, bore, keyway, and guard clearance as critical checks before restart.",
  fitPitch: true,
  fitBore: false,
  fitTeeth: true,
  fitWidth: true,
  fitKeyway: false,
  fitMaterial: true,
  fitGuarding: false,
  fitSupervisor: false,
  decisionStatus: "escalated",
  decisionOwner: "Third shift supervisor and maintenance supervisor",
  nextActionDue: "Call maintenance supervisor now; verify bore, keyway, and guarding before any restart decision."
};

const ids = [
  "issue",
  "line",
  "equipment",
  "shift",
  "priority",
  "minutesDown",
  "repairMinutes",
  "ratePerHour",
  "costPerHour",
  "peopleReassigned",
  "maintenanceTechs",
  "productionStaff",
  "finding",
  "exactPart",
  "exactPartStatus",
  "approxPart",
  "approxLocation",
  "manualNote",
  "fitPitch",
  "fitBore",
  "fitTeeth",
  "fitWidth",
  "fitKeyway",
  "fitMaterial",
  "fitGuarding",
  "fitSupervisor",
  "decisionStatus",
  "decisionOwner",
  "nextActionDue"
];

const numberFields = new Set([
  "minutesDown",
  "repairMinutes",
  "ratePerHour",
  "costPerHour",
  "peopleReassigned",
  "maintenanceTechs",
  "productionStaff"
]);

const checkboxFields = new Set([
  "fitPitch",
  "fitBore",
  "fitTeeth",
  "fitWidth",
  "fitKeyway",
  "fitMaterial",
  "fitGuarding",
  "fitSupervisor"
]);

const elements = {};
const appConfig = {
  siteName: "Crusoe Advisory",
  toolName: "Deep Constraints Triage",
  publicUrl: "https://crusoeadvisory.com/tools/deep-constraints-triage/",
  analyticsEnabled: false,
  plausibleDomain: "",
  feedbackUrl: "",
  feedbackEmail: "",
  shareCampaign: "deep_constraints_triage_public_trial",
  ...((typeof window !== "undefined" && window.DEEP_CONSTRAINTS_CONFIG) ? window.DEEP_CONSTRAINTS_CONFIG : {})
};
let hasTrackedToolStart = false;

document.addEventListener("DOMContentLoaded", () => {
  setupPublicTrial();

  ids.forEach((id) => {
    elements[id] = document.getElementById(id);
  });

  elements.riskBadge = document.getElementById("riskBadge");
  elements.projectedDowntime = document.getElementById("projectedDowntime");
  elements.lostUnits = document.getElementById("lostUnits");
  elements.downtimeCost = document.getElementById("downtimeCost");
  elements.fitConfidence = document.getElementById("fitConfidence");
  elements.escalationNeed = document.getElementById("escalationNeed");
  elements.recommendation = document.getElementById("recommendation");
  elements.manualHints = document.getElementById("manualHints");
  elements.escalationQuestions = document.getElementById("escalationQuestions");
  elements.passdownNote = document.getElementById("passdownNote");
  elements.actionStatus = document.getElementById("actionStatus");
  elements.logList = document.getElementById("logList");
  elements.constraintStation = document.getElementById("constraintStation");
  elements.saveState = document.getElementById("saveState");

  ids.forEach((id) => {
    const eventName = checkboxFields.has(id) ? "change" : "input";
    elements[id].addEventListener(eventName, () => {
      update();
      trackToolStart();
    });
  });

  document.getElementById("loadSample").addEventListener("click", () => {
    setForm(sampleIncident);
    setStatus("Sample loaded");
    update();
    const analysis = analyzeIncident(collectForm());
    trackEvent("Sample Loaded", eventProps(analysis));
  });

  document.getElementById("clearForm").addEventListener("click", () => {
    document.getElementById("triageForm").reset();
    setStatus("Draft cleared");
    update();
    hasTrackedToolStart = false;
    trackEvent("Draft Cleared");
  });

  document.getElementById("copyNote").addEventListener("click", copyPassdown);
  document.getElementById("addToLog").addEventListener("click", saveIncident);
  document.getElementById("exportJson").addEventListener("click", exportIncident);
  document.getElementById("shareTool").addEventListener("click", shareTool);
  document.getElementById("clearLog").addEventListener("click", clearLocalLog);

  restoreDraft();
  update();
  renderLog();
});

function setupPublicTrial() {
  setupAnalytics();
  setupFeedbackLink();
}

function setupAnalytics() {
  if (!appConfig.analyticsEnabled || !appConfig.plausibleDomain || document.getElementById("plausible-script")) {
    return;
  }

  window.plausible = window.plausible || function () {
    (window.plausible.q = window.plausible.q || []).push(arguments);
  };

  const script = document.createElement("script");
  script.id = "plausible-script";
  script.defer = true;
  script.dataset.domain = appConfig.plausibleDomain;
  script.src = "https://plausible.io/js/script.js";
  document.head.appendChild(script);
}

function setupFeedbackLink() {
  const link = document.getElementById("feedbackLink");

  if (!link) {
    return;
  }

  if (appConfig.feedbackUrl) {
    link.href = appConfig.feedbackUrl;
    link.classList.remove("is-hidden");
    return;
  }

  if (appConfig.feedbackEmail) {
    const params = new URLSearchParams({
      subject: `${appConfig.toolName} feedback`,
      body: `Tool: ${buildPublicUrl("feedback_link")}\n\nWhat happened?\n\nWhat should be clearer?\n`
    });
    link.href = `mailto:${appConfig.feedbackEmail}?${params.toString()}`;
    link.removeAttribute("target");
    link.removeAttribute("rel");
    link.classList.remove("is-hidden");
  }
}

function collectForm() {
  return ids.reduce((values, id) => {
    const element = elements[id];
    if (checkboxFields.has(id)) {
      values[id] = element.checked;
    } else if (numberFields.has(id)) {
      values[id] = Number(element.value || 0);
    } else {
      values[id] = element.value.trim();
    }

    return values;
  }, {});
}

function setForm(values) {
  ids.forEach((id) => {
    const element = elements[id];
    if (checkboxFields.has(id)) {
      element.checked = Boolean(values[id]);
    } else if (values[id] !== undefined) {
      element.value = values[id];
    }
  });
}

function update() {
  const values = collectForm();
  const analysis = analyzeIncident(values);

  renderMetrics(analysis);
  renderSupport(values, analysis);
  elements.passdownNote.value = buildPassdown(values, analysis);
  localStorage.setItem("deepConstraintsDraft", JSON.stringify(values));
  elements.saveState.textContent = "Draft saved";
}

function trackToolStart() {
  if (hasTrackedToolStart) {
    return;
  }

  const values = collectForm();
  const hasMeaningfulInput = Boolean(
    values.issue ||
    values.finding ||
    values.equipment ||
    values.exactPart ||
    values.approxPart ||
    values.manualNote ||
    values.minutesDown ||
    values.repairMinutes
  );

  if (!hasMeaningfulInput) {
    return;
  }

  hasTrackedToolStart = true;
  trackEvent("Tool Started", eventProps(analyzeIncident(values)));
}

function analyzeIncident(values) {
  const hasIncident = Boolean(
    values.issue ||
    values.finding ||
    values.line ||
    values.equipment ||
    values.exactPart ||
    values.approxPart ||
    values.manualNote
  );
  const partFit = scorePartFit(values);
  const projectedDowntime = values.minutesDown + values.repairMinutes;
  const lostUnits = Math.round((projectedDowntime / 60) * values.ratePerHour);
  const downtimeCost = Math.round((projectedDowntime / 60) * values.costPerHour);

  if (!hasIncident) {
    return {
      partFit,
      projectedDowntime,
      lostUnits,
      downtimeCost,
      riskScore: 0,
      riskLevel: "pending",
      escalation: ["Enter the issue, finding, part status, and staffing constraints to generate escalation questions."],
      manualMatches: matchManualHints(values)
    };
  }

  const priorityWeight = {
    critical: 35,
    high: 24,
    normal: 14,
    low: 6
  }[values.priority] || 14;

  let riskScore = priorityWeight;
  riskScore += Math.min(35, Math.round(projectedDowntime / 4));
  riskScore += values.exactPartStatus === "missing" ? 16 : 0;
  riskScore += values.approxPart && partFit.percent < 75 ? 14 : 0;
  riskScore += values.maintenanceTechs <= 2 ? 8 : 0;
  riskScore += values.productionStaff > 0 && values.productionStaff < 20 ? 6 : 0;
  riskScore += values.peopleReassigned >= 4 ? 6 : 0;
  riskScore += downtimeCost >= 5000 ? 5 : 0;

  const riskLevel = riskScore >= 72 ? "high" : riskScore >= 42 ? "medium" : "low";
  const escalation = getEscalation(values, partFit, riskLevel, projectedDowntime);
  const manualMatches = matchManualHints(values);

  return {
    partFit,
    projectedDowntime,
    lostUnits,
    downtimeCost,
    riskScore,
    riskLevel,
    escalation,
    manualMatches
  };
}

function scorePartFit(values) {
  const checks = [
    { id: "fitPitch", label: "chain pitch or belt profile", critical: true },
    { id: "fitBore", label: "bore or shaft size", critical: true },
    { id: "fitTeeth", label: "tooth count or diameter", critical: false },
    { id: "fitWidth", label: "width and hub clearance", critical: false },
    { id: "fitKeyway", label: "keyway or fastening method", critical: true },
    { id: "fitMaterial", label: "material and load rating", critical: false },
    { id: "fitGuarding", label: "guarding and pinch-point clearance", critical: true },
    { id: "fitSupervisor", label: "maintenance supervisor review", critical: true }
  ];

  const passed = checks.filter((check) => values[check.id]);
  const failedCritical = checks.filter((check) => check.critical && !values[check.id]);
  const percent = Math.round((passed.length / checks.length) * 100);
  let verdict = "No alternate part decision yet";

  if (values.exactPartStatus === "available") {
    verdict = "Use exact part if condition and quantity are confirmed.";
  } else if (!values.approxPart) {
    verdict = "No approximate part entered. Find exact spare, alternate source, or escalation path.";
  } else if (failedCritical.length > 0) {
    verdict = "Do not install without escalation. Critical fit or safety checks are still open.";
  } else if (percent >= 88) {
    verdict = "Approximate part may be viable after documented supervisor approval and controlled restart.";
  } else {
    verdict = "Approximate part needs more comparison before a restart decision.";
  }

  return {
    percent,
    verdict,
    passed,
    failedCritical,
    openChecks: checks.filter((check) => !values[check.id])
  };
}

function getEscalation(values, partFit, riskLevel, projectedDowntime) {
  const questions = [];

  if (values.exactPartStatus === "missing" && values.approxPart) {
    questions.push("Which supervisor or reliability owner can approve or reject the approximate part before the shift absorbs the full downtime loss?");
  }

  if (partFit.failedCritical.length > 0) {
    const open = partFit.failedCritical.map((check) => check.label).join(", ");
    questions.push(`Which critical checks must be closed before restart: ${open}?`);
  }

  if (projectedDowntime >= 120 || riskLevel === "high") {
    questions.push("At what downtime threshold should operations escalate to maintenance leadership, planning, or plant leadership?");
  }

  if (values.peopleReassigned > 0) {
    questions.push("Where were the displaced people moved, and what lower-priority work is now being protected or delayed?");
  }

  if (values.maintenanceTechs <= 2) {
    questions.push("Do the available maintenance techs have enough bandwidth to troubleshoot while still covering the rest of the floor?");
  }

  if (!values.manualNote) {
    questions.push("What manual page, PM note, photo, or part drawing should be attached to keep first shift from repeating the same search?");
  }

  if (questions.length === 0) {
    questions.push("What would make this decision easier for the next supervisor who inherits the issue?");
  }

  return questions;
}

function matchManualHints(values) {
  const haystack = [
    values.issue,
    values.equipment,
    values.finding,
    values.exactPart,
    values.approxPart,
    values.manualNote
  ].join(" ").toLowerCase();

  const matches = manualLibrary.filter((entry) => {
    return entry.match.some((keyword) => haystack.includes(keyword));
  });

  if (matches.length > 0) {
    return matches;
  }

  return [
    {
      title: "General troubleshooting capture",
      hints: [
        "Capture symptoms, failed component, exact spare status, approximate spare status, open safety checks, escalation owner, and next action.",
        "Photograph the failed part, nearby nameplate, storeroom label, and any manual reference that helped the decision."
      ]
    }
  ];
}

function renderMetrics(analysis) {
  elements.projectedDowntime.textContent = `${analysis.projectedDowntime} min`;
  elements.lostUnits.textContent = formatNumber(analysis.lostUnits);
  elements.downtimeCost.textContent = formatCurrency(analysis.downtimeCost);
  elements.fitConfidence.textContent = `${analysis.partFit.percent}%`;
  elements.escalationNeed.textContent = analysis.riskLevel === "pending" ? "Pending" : analysis.riskLevel === "high" ? "Escalate now" : analysis.riskLevel === "medium" ? "Supervisor review" : "Monitor";

  elements.riskBadge.className = `risk-badge ${analysis.riskLevel}`;
  elements.riskBadge.textContent = analysis.riskLevel === "pending" ? "Risk pending" : `${capitalize(analysis.riskLevel)} risk`;

  elements.constraintStation.classList.toggle("pulse", analysis.riskLevel === "medium" || analysis.riskLevel === "high");
}

function renderSupport(values, analysis) {
  elements.recommendation.textContent = buildRecommendation(values, analysis);

  elements.manualHints.innerHTML = "";
  analysis.manualMatches.forEach((entry) => {
    const title = document.createElement("li");
    title.innerHTML = `<strong>${escapeHtml(entry.title)}</strong>`;
    elements.manualHints.appendChild(title);

    entry.hints.forEach((hint) => {
      const item = document.createElement("li");
      item.textContent = hint;
      elements.manualHints.appendChild(item);
    });
  });

  elements.escalationQuestions.innerHTML = "";
  analysis.escalation.forEach((question) => {
    const item = document.createElement("li");
    item.textContent = question;
    elements.escalationQuestions.appendChild(item);
  });
}

function buildRecommendation(values, analysis) {
  if (!values.issue && !values.finding) {
    return "Enter the issue and what maintenance found. The tool will separate mechanical facts from deeper labor, documentation, part, and escalation constraints.";
  }

  const riskLine = analysis.riskLevel === "high"
    ? "Escalate now and document the decision owner."
    : analysis.riskLevel === "medium"
      ? "Get supervisor review before allowing the issue to sit through the shift."
      : "Keep troubleshooting locally, but capture the next decision trigger.";

  const costLine = analysis.downtimeCost > 0 ? ` and an estimated downtime cost of ${formatCurrency(analysis.downtimeCost)}` : "";
  return `${riskLine} ${analysis.partFit.verdict} Projected downtime is ${analysis.projectedDowntime} minutes with about ${formatNumber(analysis.lostUnits)} units at risk${costLine}.`;
}

function buildPassdown(values, analysis) {
  const missing = "(not entered)";
  const openChecks = analysis.partFit.openChecks.map((check) => check.label).join(", ") || "none";
  const criticalOpen = analysis.partFit.failedCritical.map((check) => check.label).join(", ") || "none";

  return [
    "SHIFT PASSDOWN",
    `Generated: ${new Date().toLocaleString()}`,
    "",
    `Line / equipment: ${values.line || missing} / ${values.equipment || missing}`,
    `Shift: ${values.shift || missing}`,
    `Priority: ${readablePriority(values.priority)}`,
    "",
    "Issue:",
    values.issue || missing,
    "",
    "Maintenance finding:",
    values.finding || missing,
    "",
    "Parts:",
    `Exact part: ${values.exactPart || missing}`,
    `Exact part status: ${values.exactPartStatus || missing}`,
    `Approximate part: ${values.approxPart || missing}`,
    `Approximate part location: ${values.approxLocation || missing}`,
    `Part-fit confidence: ${analysis.partFit.percent}%`,
    `Open checks: ${openChecks}`,
    `Critical open checks: ${criticalOpen}`,
    "",
    "Downtime and staffing:",
    `Minutes down so far: ${values.minutesDown}`,
    `Repair estimate: ${values.repairMinutes} minutes`,
    `Projected total downtime: ${analysis.projectedDowntime} minutes`,
    `Estimated units at risk: ${formatNumber(analysis.lostUnits)}`,
    `Estimated downtime cost: ${formatCurrency(analysis.downtimeCost)}`,
    `Maintenance techs available: ${values.maintenanceTechs}`,
    `Total shift production staff: ${values.productionStaff}`,
    `People reassigned from down line: ${values.peopleReassigned}`,
    "",
    "Decision capture:",
    `Current decision status: ${readableDecisionStatus(values.decisionStatus)}`,
    `Decision owner: ${values.decisionOwner || missing}`,
    `Next action due: ${values.nextActionDue || missing}`,
    "",
    "Recommendation:",
    buildRecommendation(values, analysis),
    "",
    "Escalation questions:",
    ...analysis.escalation.map((question, index) => `${index + 1}. ${question}`),
    "",
    "Manual note / reference:",
    values.manualNote || missing,
    "",
    "Next action owner:",
    "(assign owner, time, and decision needed)"
  ].join("\n");
}

function copyPassdown() {
  const note = elements.passdownNote.value;

  if (!note) {
    setStatus("No passdown note to copy");
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(note).then(() => {
      setStatus("Passdown copied");
      trackEvent("Passdown Copied", eventProps(analyzeIncident(collectForm())));
    }).catch(() => {
      fallbackCopy(note);
    });
    return;
  }

  fallbackCopy(note);
}

function fallbackCopy(note) {
  elements.passdownNote.focus();
  elements.passdownNote.select();
  document.execCommand("copy");
  setStatus("Passdown copied");
  trackEvent("Passdown Copied", eventProps(analyzeIncident(collectForm())));
}

function saveIncident() {
  const values = collectForm();
  const analysis = analyzeIncident(values);
  const incidents = readIncidents();
  const title = values.line || values.equipment || "Unlabeled incident";

  incidents.unshift({
    id: window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : String(Date.now()),
    createdAt: new Date().toISOString(),
    title,
    values,
    analysis: {
      projectedDowntime: analysis.projectedDowntime,
      lostUnits: analysis.lostUnits,
      downtimeCost: analysis.downtimeCost,
      riskLevel: analysis.riskLevel,
      fitPercent: analysis.partFit.percent
    },
    passdown: buildPassdown(values, analysis)
  });

  localStorage.setItem("deepConstraintsIncidents", JSON.stringify(incidents.slice(0, 12)));
  renderLog();
  setStatus("Incident saved to local log");
  trackEvent("Incident Saved", eventProps(analysis));
}

function exportIncident() {
  const values = collectForm();
  const analysis = analyzeIncident(values);
  const payload = {
    exportedAt: new Date().toISOString(),
    values,
    analysis: {
      projectedDowntime: analysis.projectedDowntime,
      lostUnits: analysis.lostUnits,
      downtimeCost: analysis.downtimeCost,
      riskLevel: analysis.riskLevel,
      riskScore: analysis.riskScore,
      partFitPercent: analysis.partFit.percent,
      partFitVerdict: analysis.partFit.verdict,
      escalationQuestions: analysis.escalation,
      manualHints: analysis.manualMatches
    },
    passdown: buildPassdown(values, analysis)
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `deep-constraints-incident-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStatus("Incident JSON exported");
  trackEvent("Incident Exported", eventProps(analysis));
}

function renderLog() {
  const incidents = readIncidents();
  elements.logList.innerHTML = "";

  if (incidents.length === 0) {
    const empty = document.createElement("p");
    empty.className = "log-empty";
    empty.textContent = "No saved incidents yet.";
    elements.logList.appendChild(empty);
    return;
  }

  incidents.forEach((incident) => {
    const item = document.createElement("article");
    item.className = "log-item";
    item.innerHTML = `
      <div class="log-top">
        <p class="log-title">${escapeHtml(incident.title)}</p>
        <span class="risk-badge ${escapeHtml(incident.analysis.riskLevel)}">${capitalize(incident.analysis.riskLevel)}</span>
      </div>
      <p class="log-meta">${new Date(incident.createdAt).toLocaleString()} | ${incident.analysis.projectedDowntime} min projected | ${formatNumber(incident.analysis.lostUnits)} units at risk | ${formatCurrency(incident.analysis.downtimeCost || 0)} cost | ${incident.analysis.fitPercent}% fit</p>
    `;
    elements.logList.appendChild(item);
  });
}

function clearLocalLog() {
  localStorage.removeItem("deepConstraintsIncidents");
  renderLog();
  setStatus("Local issue log cleared");
  trackEvent("Local Log Cleared");
}

function readIncidents() {
  try {
    return JSON.parse(localStorage.getItem("deepConstraintsIncidents")) || [];
  } catch (error) {
    return [];
  }
}

function restoreDraft() {
  try {
    const draft = JSON.parse(localStorage.getItem("deepConstraintsDraft"));
    if (draft) {
      setForm(draft);
      elements.saveState.textContent = "Draft restored";
    }
  } catch (error) {
    elements.saveState.textContent = "New draft";
  }
}

function setStatus(message) {
  elements.actionStatus.textContent = message;
  window.clearTimeout(setStatus.timer);
  setStatus.timer = window.setTimeout(() => {
    elements.actionStatus.textContent = "";
  }, 2800);
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value || 0);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value || 0);
}

function capitalize(value) {
  if (!value) {
    return "";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function readablePriority(value) {
  return {
    critical: "Critical customer or startup line",
    high: "High priority line",
    normal: "Normal priority line",
    low: "Lower priority line"
  }[value] || value || "(not entered)";
}

function readableDecisionStatus(value) {
  return {
    open: "Open / troubleshooting",
    escalated: "Escalated for review",
    approved: "Repair path approved",
    waiting: "Waiting on part or support",
    contained: "Contained on alternate line"
  }[value] || "(not entered)";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[character];
  });
}

function trackEvent(name, props = {}) {
  if (!appConfig.analyticsEnabled && typeof window.gtag !== "function" && typeof window.plausible !== "function") {
    return;
  }

  const cleanProps = {
    ...campaignProps(),
    ...props
  };

  if (typeof window.plausible === "function") {
    window.plausible(name, { props: cleanProps });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", name.toLowerCase().replace(/\s+/g, "_"), cleanProps);
  }
}

function eventProps(analysis) {
  return {
    risk: analysis.riskLevel,
    fitBand: bandFit(analysis.partFit.percent),
    downtimeBand: bandDowntime(analysis.projectedDowntime),
    costBand: bandCost(analysis.downtimeCost)
  };
}

function campaignProps() {
  const params = new URLSearchParams(window.location.search);

  return {
    source: params.get("utm_source") || "direct",
    medium: params.get("utm_medium") || "none",
    campaign: params.get("utm_campaign") || "none",
    content: params.get("utm_content") || "none"
  };
}

function bandFit(percent) {
  if (percent >= 75) {
    return "high";
  }

  if (percent >= 40) {
    return "medium";
  }

  return "low";
}

function bandDowntime(minutes) {
  if (minutes >= 240) {
    return "over_4h";
  }

  if (minutes >= 120) {
    return "2_to_4h";
  }

  if (minutes >= 60) {
    return "1_to_2h";
  }

  return "under_1h";
}

function bandCost(value) {
  if (value >= 10000) {
    return "over_10k";
  }

  if (value >= 5000) {
    return "5k_to_10k";
  }

  if (value > 0) {
    return "under_5k";
  }

  return "none";
}

function buildPublicUrl(content) {
  const fallback = window.location.href.split("#")[0];
  const url = new URL(appConfig.publicUrl || fallback, fallback);

  url.searchParams.set("utm_source", "linkedin");
  url.searchParams.set("utm_medium", "share");
  url.searchParams.set("utm_campaign", appConfig.shareCampaign || "deep_constraints_triage_public_trial");
  url.searchParams.set("utm_content", content);

  return url.toString();
}

function shareTool() {
  const url = buildPublicUrl("tool_share_button");
  const title = appConfig.toolName;
  const text = "A shift-floor troubleshooting workflow for equipment issues, missing parts, downtime risk, escalation decisions, and passdown quality.";

  if (navigator.share) {
    navigator.share({ title, text, url }).then(() => {
      setStatus("Share sheet opened");
      trackEvent("Tool Shared", { method: "native" });
    }).catch(() => {
      copyShareUrl(url);
    });
    return;
  }

  copyShareUrl(url);
}

function copyShareUrl(url) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      setStatus("Tool link copied");
      trackEvent("Tool Shared", { method: "copy" });
    }).catch(() => {
      setStatus(url);
    });
    return;
  }

  setStatus(url);
}
