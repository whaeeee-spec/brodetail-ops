param([string]$Root = 'E:\BRODETAIL\autopilot')
$ErrorActionPreference = 'Stop'
$ts = Get-Date -Format 'yyyyMMdd-HHmmss'
$report = Join-Path $Root "issue39-runtime-ready-v3-result-$ts.txt"
$backup = Join-Path $Root "backups\issue39-runtime-ready-v3-$ts"
$lines = New-Object System.Collections.Generic.List[string]
function Add-Line([string]$s){ $lines.Add($s) | Out-Null }
function Save-Report(){ $lines | Set-Content -Path $report -Encoding UTF8 }
function Fail([string]$msg){ Add-Line "RESULT=FAIL"; Add-Line "ERROR=$msg"; Save-Report; Write-Host "RESULT=FAIL"; Write-Host "REPORT=$report"; exit 2 }
function Redact([string]$s){
  if(-not $s){ return '' }
  $x = $s
  $x = [regex]::Replace($x, '(?i)(--?(?:token|secret|api[-_]?key|password)\s*[=:]?\s*)\S+', '$1[REDACTED]')
  $x = [regex]::Replace($x, '(?i)((?:TOKEN|SECRET|API_KEY|PASSWORD)\s*=\s*)\S+', '$1[REDACTED]')
  return $x
}
if(-not (Test-Path $Root)){ Fail 'ROOT_NOT_FOUND' }
$configPath = Join-Path $Root 'config.json'
if(-not (Test-Path $configPath)){ Fail 'CONFIG_NOT_FOUND' }
$configHash0 = (Get-FileHash $configPath -Algorithm SHA256).Hash
$config = Get-Content $configPath -Raw | ConvertFrom-Json
Add-Line 'BRODETAIL ISSUE39 RUNTIME READY V3'
Add-Line "timestamp=$ts"
Add-Line "root=$Root"
Add-Line "phase=$($config.eventDriven.phase)"
Add-Line "workerEnabled=$([bool]$config.eventDriven.workerEnabled)"
Add-Line "sendEnabled=$([bool]$config.eventDriven.sendEnabled)"
Add-Line "crmReadEnabled=$([bool]$config.eventDriven.crmReadEnabled)"
Add-Line "crmWriteEnabled=$([bool]$config.eventDriven.crmWriteEnabled)"
Add-Line "canonicalIntakeEnabled=$([bool]$config.crm.canonicalIntake.enabled)"
if($config.eventDriven.sendEnabled -eq $true -or $config.eventDriven.crmWriteEnabled -eq $true){ Fail 'LIVE_GATE_OPEN_ABORT' }

$targets = @(
  'watcher\daemon.js',
  'browser-extension\content-script.js',
  'browser-extension\manifest.json',
  'browser-extension\service-worker.js',
  'browser-extension\adapters\vk-adapter.js',
  'browser-extension\adapters\avito-adapter.js',
  'tests\watcher.test.js'
)
New-Item -ItemType Directory -Path $backup -Force | Out-Null
$existing = @{}
foreach($rel in $targets){
  $src = Join-Path $Root $rel
  $existing[$rel] = Test-Path $src
  if(Test-Path $src){
    $dst = Join-Path $backup $rel
    New-Item -ItemType Directory -Path (Split-Path $dst -Parent) -Force | Out-Null
    Copy-Item $src $dst -Force
  }
}
Add-Line "BACKUP=$backup"

try {
  foreach($rel in $targets){
    $p = Join-Path $Root $rel
    if(-not (Test-Path $p)){ Add-Line "VERSION_SKIP_MISSING=$rel"; continue }
    $txt = Get-Content $p -Raw
    $before = ([regex]::Matches($txt, '0\.9\.5')).Count
    if($before -gt 0){
      $txt = $txt -replace '0\.9\.5','0.9.6'
      Set-Content -Path $p -Value $txt -Encoding UTF8 -NoNewline
      Add-Line "VERSION_BUMP=$rel:$before"
    } elseif($txt -match '0\.9\.6') {
      Add-Line "VERSION_ALREADY_096=$rel"
    } else {
      Add-Line "VERSION_NO_MARKER=$rel"
    }
  }

  $manifestPath = Join-Path $Root 'browser-extension\manifest.json'
  $manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
  Add-Line "MANIFEST_VERSION=$($manifest.version)"
  if($manifest.version -ne '0.9.6'){ throw 'MANIFEST_VERSION_NOT_096' }

  $daemonText = Get-Content (Join-Path $Root 'watcher\daemon.js') -Raw
  $contentText = Get-Content (Join-Path $Root 'browser-extension\content-script.js') -Raw
  if($daemonText -notmatch 'EXPECTED_BROWSER_CONTENT_BUILD\s*=\s*"0\.9\.6"'){ throw 'DAEMON_EXPECTED_BUILD_NOT_096' }
  if($contentText -notmatch 'CONTENT_SCRIPT_BUILD\s*=\s*"0\.9\.6"'){ throw 'CONTENT_SCRIPT_BUILD_NOT_096' }
  Add-Line 'BUILD_MARKERS=PASS'

  $jsChecks = @(
    'watcher\daemon.js',
    'watcher\lib\validation.js',
    'watcher\lib\crm-eligibility.js',
    'worker\yan-worker.js',
    'browser-extension\content-script.js',
    'browser-extension\service-worker.js',
    'browser-extension\adapters\vk-adapter.js',
    'browser-extension\adapters\avito-adapter.js',
    'tests\crm-eligibility.test.js'
  )
  foreach($rel in $jsChecks){
    $p = Join-Path $Root $rel
    if(-not (Test-Path $p)){ continue }
    & node --check $p 2>&1 | Out-Null
    if($LASTEXITCODE -ne 0){ throw "NODE_CHECK_FAIL:$rel" }
    Add-Line "NODE_CHECK=$rel:PASS"
  }

  Push-Location $Root
  try {
    & node --test tests/watcher.test.js tests/crm-eligibility.test.js *> (Join-Path $Root ".issue39-v3-tests-$ts.log")
    $testExit = $LASTEXITCODE
  } finally { Pop-Location }
  Add-Line "TEST_EXIT=$testExit"
  if($testExit -ne 0){ throw 'TESTS_FAILED' }
  Remove-Item (Join-Path $Root ".issue39-v3-tests-$ts.log") -Force -ErrorAction SilentlyContinue

  $configHash1 = (Get-FileHash $configPath -Algorithm SHA256).Hash
  $config1 = Get-Content $configPath -Raw | ConvertFrom-Json
  Add-Line "CONFIG_HASH_UNCHANGED=$($configHash0 -eq $configHash1)"
  Add-Line "POST_sendEnabled=$([bool]$config1.eventDriven.sendEnabled)"
  Add-Line "POST_crmWriteEnabled=$([bool]$config1.eventDriven.crmWriteEnabled)"
  if($configHash0 -ne $configHash1 -or $config1.eventDriven.sendEnabled -eq $true -or $config1.eventDriven.crmWriteEnabled -eq $true){ throw 'SAFETY_FLAGS_CHANGED' }

  Add-Line '=== RUNTIME AUDIT ==='
  $watchers = @(Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -and $_.CommandLine -match '(?i)watcher[\\/]daemon\.js' })
  Add-Line "WATCHER_PROCESS_COUNT=$($watchers.Count)"
  foreach($w in $watchers){
    Add-Line "WATCHER_PID=$($w.ProcessId)"
    Add-Line "WATCHER_PPID=$($w.ParentProcessId)"
    Add-Line "WATCHER_EXE=$($w.ExecutablePath)"
    Add-Line "WATCHER_CMD=$(Redact $w.CommandLine)"
    $parent = Get-CimInstance Win32_Process -Filter "ProcessId=$($w.ParentProcessId)" -ErrorAction SilentlyContinue
    if($parent){
      Add-Line "PARENT_NAME=$($parent.Name)"
      Add-Line "PARENT_PID=$($parent.ProcessId)"
      Add-Line "PARENT_CMD=$(Redact $parent.CommandLine)"
    }
  }

  try {
    $listeners = @(Get-NetTCPConnection -LocalPort 17877 -State Listen -ErrorAction Stop)
    Add-Line "PORT17877_LISTENER_COUNT=$($listeners.Count)"
    foreach($l in $listeners){ Add-Line "PORT17877_PID=$($l.OwningProcess)" }
  } catch { Add-Line 'PORT17877_AUDIT=UNAVAILABLE' }

  $taskHits = @()
  try {
    foreach($t in Get-ScheduledTask -ErrorAction Stop){
      foreach($a in @($t.Actions)){
        $combined = "$($a.Execute) $($a.Arguments)"
        if($combined -match '(?i)brodetail|autopilot|watcher[\\/]daemon\.js'){
          $taskHits += [pscustomobject]@{ TaskName=$t.TaskName; State=$t.State; Execute=$a.Execute; Arguments=(Redact $a.Arguments) }
        }
      }
    }
  } catch {}
  Add-Line "SCHEDULED_LAUNCHER_COUNT=$($taskHits.Count)"
  foreach($t in $taskHits){ Add-Line "SCHEDULED_LAUNCHER=$($t.TaskName)|$($t.State)|$($t.Execute)|$($t.Arguments)" }

  $startupHits = @()
  try {
    $startupHits = @(Get-CimInstance Win32_StartupCommand | Where-Object { $_.Command -match '(?i)brodetail|autopilot|watcher[\\/]daemon\.js' })
  } catch {}
  Add-Line "STARTUP_LAUNCHER_COUNT=$($startupHits.Count)"
  foreach($s in $startupHits){ Add-Line "STARTUP_LAUNCHER=$($s.Name)|$(Redact $s.Command)" }

  $launcherFiles = @(Get-ChildItem $Root -File -Include *.ps1,*.cmd,*.bat -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Name)
  Add-Line "ROOT_LAUNCHER_FILES=$($launcherFiles -join ',')"
  Add-Line 'WATCHER_RESTARTED=NO'
  Add-Line 'EXTENSION_RELOADED=NO'
  Add-Line 'PRODUCTION_DEPLOY=NO'
  Add-Line 'CRM_WRITE_CHANGED=NO'
  Add-Line 'SEND_CHANGED=NO'
  Add-Line 'RESULT=PASS'
  Save-Report
  Write-Host 'RESULT=PASS'
  Write-Host 'BUILD=0.9.6'
  Write-Host 'WATCHER_RESTARTED=NO'
  Write-Host "REPORT=$report"
} catch {
  foreach($rel in $targets){
    $dst = Join-Path $Root $rel
    $src = Join-Path $backup $rel
    if(Test-Path $src){ Copy-Item $src $dst -Force }
  }
  Add-Line "ERROR=$($_.Exception.Message)"
  Add-Line 'ROLLBACK=PASS'
  Add-Line 'WATCHER_RESTARTED=NO'
  Add-Line 'EXTENSION_RELOADED=NO'
  Add-Line 'PRODUCTION_DEPLOY=NO'
  Add-Line 'RESULT=ROLLED_BACK'
  Save-Report
  Write-Host 'RESULT=ROLLED_BACK'
  Write-Host "REPORT=$report"
  exit 3
}
