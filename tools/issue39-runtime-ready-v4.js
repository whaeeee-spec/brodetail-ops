"use strict";

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { spawnSync } = require("node:child_process");

const rootArgIndex = process.argv.indexOf("--root");
const ROOT = rootArgIndex >= 0 ? process.argv[rootArgIndex + 1] : "E:\\BRODETAIL\\autopilot";
const ts = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
const reportPath = path.join(ROOT, `issue39-runtime-ready-v4-result-${ts}.txt`);
const backupRoot = path.join(ROOT, "backups", `issue39-runtime-ready-v4-${ts}`);
const lines = [];

function add(line) { lines.push(String(line)); }
function save() { fs.writeFileSync(reportPath, `${lines.join("\n")}\n`, "utf8"); }
function exists(p) { try { fs.accessSync(p); return true; } catch { return false; } }
function sha256File(p) { return crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex"); }
function redact(s) {
  return String(s || "")
    .replace(/(--?(?:token|secret|api[-_]?key|password)\s*[=:]?\s*)\S+/gi, "$1[REDACTED]")
    .replace(/((?:TOKEN|SECRET|API_KEY|PASSWORD)\s*=\s*)\S+/gi, "$1[REDACTED]");
}
function run(exe, args, cwd = ROOT) {
  const r = spawnSync(exe, args, { cwd, encoding: "utf8", windowsHide: true });
  return { code: r.status ?? 1, out: `${r.stdout || ""}${r.stderr || ""}` };
}
function ps(script) {
  return run("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", script], ROOT);
}
function fail(msg) {
  add(`RESULT=FAIL`); add(`ERROR=${msg}`); save();
  console.log(`RESULT=FAIL\nREPORT=${reportPath}`);
  process.exit(2);
}

if (!exists(ROOT)) fail("ROOT_NOT_FOUND");
const configPath = path.join(ROOT, "config.json");
if (!exists(configPath)) fail("CONFIG_NOT_FOUND");

const configHash0 = sha256File(configPath);
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
add("BRODETAIL ISSUE39 RUNTIME READY V4");
add(`timestamp=${ts}`);
add(`root=${ROOT}`);
add(`phase=${config.eventDriven?.phase || ""}`);
add(`workerEnabled=${config.eventDriven?.workerEnabled === true}`);
add(`sendEnabled=${config.eventDriven?.sendEnabled === true}`);
add(`crmReadEnabled=${config.eventDriven?.crmReadEnabled === true}`);
add(`crmWriteEnabled=${config.eventDriven?.crmWriteEnabled === true}`);
add(`canonicalIntakeEnabled=${config.crm?.canonicalIntake?.enabled === true}`);
if (config.eventDriven?.sendEnabled === true || config.eventDriven?.crmWriteEnabled === true) fail("LIVE_GATE_OPEN_ABORT");

const targets = [
  "watcher/daemon.js",
  "browser-extension/content-script.js",
  "browser-extension/manifest.json",
  "browser-extension/service-worker.js",
  "browser-extension/adapters/vk-adapter.js",
  "browser-extension/adapters/avito-adapter.js",
  "tests/watcher.test.js"
];

fs.mkdirSync(backupRoot, { recursive: true });
const existed = new Map();
for (const rel of targets) {
  const src = path.join(ROOT, rel);
  existed.set(rel, exists(src));
  if (!exists(src)) continue;
  const dst = path.join(backupRoot, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
}
add(`BACKUP=${backupRoot}`);

function rollback() {
  for (const rel of targets) {
    const src = path.join(backupRoot, rel);
    const dst = path.join(ROOT, rel);
    if (existed.get(rel) && exists(src)) {
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      fs.copyFileSync(src, dst);
    }
  }
}

try {
  for (const rel of targets) {
    const p = path.join(ROOT, rel);
    if (!exists(p)) { add(`VERSION_SKIP_MISSING=${rel}`); continue; }
    let txt = fs.readFileSync(p, "utf8");
    const beforePlain = (txt.match(/0\.9\.5/g) || []).length;
    const beforeEscaped = (txt.match(/0\\\.9\\\.5/g) || []).length;
    txt = txt.replace(/0\.9\.5/g, "0.9.6").replace(/0\\\.9\\\.5/g, "0\\.9\\.6");
    fs.writeFileSync(p, txt, "utf8");
    if (beforePlain || beforeEscaped) add(`VERSION_BUMP=${rel}:plain=${beforePlain}:escaped=${beforeEscaped}`);
    else if (txt.includes("0.9.6") || txt.includes("0\\.9\\.6")) add(`VERSION_ALREADY_096=${rel}`);
    else add(`VERSION_NO_MARKER=${rel}`);
  }

  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "browser-extension/manifest.json"), "utf8"));
  add(`MANIFEST_VERSION=${manifest.version}`);
  if (manifest.version !== "0.9.6") throw new Error("MANIFEST_VERSION_NOT_096");
  const daemonText = fs.readFileSync(path.join(ROOT, "watcher/daemon.js"), "utf8");
  const contentText = fs.readFileSync(path.join(ROOT, "browser-extension/content-script.js"), "utf8");
  if (!/EXPECTED_BROWSER_CONTENT_BUILD\s*=\s*"0\.9\.6"/.test(daemonText)) throw new Error("DAEMON_EXPECTED_BUILD_NOT_096");
  if (!/CONTENT_SCRIPT_BUILD\s*=\s*"0\.9\.6"/.test(contentText)) throw new Error("CONTENT_SCRIPT_BUILD_NOT_096");
  add("BUILD_MARKERS=PASS");

  const checks = [
    "watcher/daemon.js",
    "watcher/lib/validation.js",
    "watcher/lib/crm-eligibility.js",
    "worker/yan-worker.js",
    "browser-extension/content-script.js",
    "browser-extension/service-worker.js",
    "browser-extension/adapters/vk-adapter.js",
    "browser-extension/adapters/avito-adapter.js",
    "tests/crm-eligibility.test.js",
    "tests/watcher.test.js"
  ];
  for (const rel of checks) {
    const p = path.join(ROOT, rel);
    if (!exists(p) || !rel.endsWith(".js")) continue;
    const r = run(process.execPath, ["--check", rel]);
    add(`NODE_CHECK=${rel}:${r.code === 0 ? "PASS" : "FAIL"}`);
    if (r.code !== 0) { add(redact(r.out).slice(-4000)); throw new Error(`NODE_CHECK_FAIL:${rel}`); }
  }

  const test = run(process.execPath, ["--test", "tests/watcher.test.js", "tests/crm-eligibility.test.js"]);
  add(`TEST_EXIT=${test.code}`);
  if (test.code !== 0) { add(redact(test.out).slice(-12000)); throw new Error("TESTS_FAILED"); }

  const configHash1 = sha256File(configPath);
  const config1 = JSON.parse(fs.readFileSync(configPath, "utf8"));
  add(`CONFIG_HASH_UNCHANGED=${configHash0 === configHash1}`);
  add(`POST_sendEnabled=${config1.eventDriven?.sendEnabled === true}`);
  add(`POST_crmWriteEnabled=${config1.eventDriven?.crmWriteEnabled === true}`);
  if (configHash0 !== configHash1 || config1.eventDriven?.sendEnabled === true || config1.eventDriven?.crmWriteEnabled === true) throw new Error("SAFETY_FLAGS_CHANGED");

  add("=== RUNTIME AUDIT ===");
  const watcherAudit = ps(`$x=@(Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -and $_.CommandLine -match '(?i)watcher[\\\\/]daemon\\.js' } | Select-Object ProcessId,ParentProcessId,Name,ExecutablePath,CommandLine); $x | ConvertTo-Json -Compress`);
  if (watcherAudit.code === 0) {
    const raw = watcherAudit.out.trim();
    if (!raw) add("WATCHER_PROCESS_COUNT=0");
    else {
      let parsed; try { parsed = JSON.parse(raw); } catch { parsed = null; }
      const arr = Array.isArray(parsed) ? parsed : (parsed ? [parsed] : []);
      add(`WATCHER_PROCESS_COUNT=${arr.length}`);
      for (const w of arr) {
        add(`WATCHER_PID=${w.ProcessId}`);
        add(`WATCHER_PPID=${w.ParentProcessId}`);
        add(`WATCHER_EXE=${redact(w.ExecutablePath)}`);
        add(`WATCHER_CMD=${redact(w.CommandLine)}`);
        const parentAudit = ps(`Get-CimInstance Win32_Process -Filter \"ProcessId=${Number(w.ParentProcessId) || 0}\" | Select-Object ProcessId,Name,ExecutablePath,CommandLine | ConvertTo-Json -Compress`);
        if (parentAudit.code === 0 && parentAudit.out.trim()) add(`WATCHER_PARENT=${redact(parentAudit.out.trim())}`);
      }
    }
  } else add("WATCHER_AUDIT=UNAVAILABLE");

  const portAudit = ps(`$x=@(Get-NetTCPConnection -LocalPort 17877 -State Listen -ErrorAction SilentlyContinue | Select-Object OwningProcess,LocalAddress,LocalPort); $x | ConvertTo-Json -Compress`);
  if (portAudit.code === 0) add(`PORT17877=${redact(portAudit.out.trim() || "[]")}`); else add("PORT17877_AUDIT=UNAVAILABLE");

  const launcherFiles = fs.readdirSync(ROOT, { withFileTypes: true }).filter(d => d.isFile() && /\.(ps1|cmd|bat)$/i.test(d.name)).map(d => d.name);
  add(`ROOT_LAUNCHER_FILES=${launcherFiles.join(",")}`);
  add("WATCHER_RESTARTED=NO");
  add("EXTENSION_RELOADED=NO");
  add("PRODUCTION_DEPLOY=NO");
  add("CRM_WRITE_CHANGED=NO");
  add("SEND_CHANGED=NO");
  add("RESULT=PASS");
  save();
  console.log(`RESULT=PASS\nBUILD=0.9.6\nWATCHER_RESTARTED=NO\nREPORT=${reportPath}`);
} catch (error) {
  rollback();
  add(`ERROR=${redact(error?.message || error)}`);
  add("ROLLBACK=PASS");
  add("WATCHER_RESTARTED=NO");
  add("EXTENSION_RELOADED=NO");
  add("PRODUCTION_DEPLOY=NO");
  add("RESULT=ROLLED_BACK");
  save();
  console.log(`RESULT=ROLLED_BACK\nREPORT=${reportPath}`);
  process.exit(3);
}
