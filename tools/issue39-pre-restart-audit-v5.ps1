param([string]$Root = 'E:\BRODETAIL\autopilot')
$ErrorActionPreference = 'Stop'
$ts = Get-Date -Format 'yyyyMMdd-HHmmss'
$report = Join-Path $Root ("issue39-pre-restart-audit-v5-result-{0}.txt" -f $ts)
$lines = New-Object System.Collections.Generic.List[string]
function Add-Line([string]$s){ $lines.Add($s) | Out-Null }
function Redact([string]$s){
  if(-not $s){ return '' }
  $x = $s
  $x = [regex]::Replace($x, '(?i)(--?(?:token|secret|api[-_]?key|password)\s*[=:]?\s*)\S+', '$1[REDACTED]')
  $x = [regex]::Replace($x, '(?i)((?:TOKEN|SECRET|API_KEY|PASSWORD)\s*=\s*)\S+', '$1[REDACTED]')
  return $x
}
function Present([string]$name){
  $p = [Environment]::GetEnvironmentVariable($name,'Process')
  $u = [Environment]::GetEnvironmentVariable($name,'User')
  $m = [Environment]::GetEnvironmentVariable($name,'Machine')
  return [pscustomobject]@{ Process = -not [string]::IsNullOrEmpty($p); User = -not [string]::IsNullOrEmpty($u); Machine = -not [string]::IsNullOrEmpty($m) }
}
try {
  if(-not (Test-Path $Root)){ throw 'ROOT_NOT_FOUND' }
  $configPath = Join-Path $Root 'config.json'
  if(-not (Test-Path $configPath)){ throw 'CONFIG_NOT_FOUND' }
  $config = Get-Content $configPath -Raw | ConvertFrom-Json
  Add-Line 'BRODETAIL ISSUE39 PRE-RESTART AUDIT V5'
  Add-Line ("timestamp={0}" -f $ts)
  Add-Line ("root={0}" -f $Root)
  Add-Line ("phase={0}" -f $config.eventDriven.phase)
  Add-Line ("workerEnabled={0}" -f [bool]$config.eventDriven.workerEnabled)
  Add-Line ("sendEnabled={0}" -f [bool]$config.eventDriven.sendEnabled)
  Add-Line ("crmReadEnabled={0}" -f [bool]$config.eventDriven.crmReadEnabled)
  Add-Line ("crmWriteEnabled={0}" -f [bool]$config.eventDriven.crmWriteEnabled)
  Add-Line ("canonicalIntakeEnabled={0}" -f [bool]$config.crm.canonicalIntake.enabled)
  if($config.eventDriven.sendEnabled -eq $true -or $config.eventDriven.crmWriteEnabled -eq $true){ throw 'LIVE_GATE_OPEN_ABORT' }

  $daemon = Join-Path $Root 'watcher\daemon.js'
  $content = Join-Path $Root 'browser-extension\content-script.js'
  $manifestPath = Join-Path $Root 'browser-extension\manifest.json'
  $daemonText = Get-Content $daemon -Raw
  $contentText = Get-Content $content -Raw
  $manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
  Add-Line ("DAEMON_EXPECTED_096={0}" -f ($daemonText -match 'EXPECTED_BROWSER_CONTENT_BUILD\s*=\s*"0\.9\.6"'))
  Add-Line ("CONTENT_BUILD_096={0}" -f ($contentText -match 'CONTENT_SCRIPT_BUILD\s*=\s*"0\.9\.6"'))
  Add-Line ("MANIFEST_VERSION={0}" -f $manifest.version)

  $vars = @('CRM_CANONICAL_INTAKE_SECRET','CRM_CANONICAL_INTAKE_KEY_ID','OPENAI_API_KEY','YANDEX_API_KEY','YANDEX_FOLDER_ID','YAN_AI_PROVIDER')
  foreach($name in $vars){
    $v = Present $name
    Add-Line ("ENV_PRESENT={0}|PROCESS={1}|USER={2}|MACHINE={3}" -f $name,$v.Process,$v.User,$v.Machine)
  }

  $watchers = @(Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -and $_.CommandLine -match '(?i)watcher[\\/]daemon\.js' })
  Add-Line ("WATCHER_PROCESS_COUNT={0}" -f $watchers.Count)
  foreach($w in $watchers){
    Add-Line ("WATCHER_PID={0}" -f $w.ProcessId)
    Add-Line ("WATCHER_PPID={0}" -f $w.ParentProcessId)
    Add-Line ("WATCHER_EXE={0}" -f $w.ExecutablePath)
    Add-Line ("WATCHER_CMD={0}" -f (Redact $w.CommandLine))
    $parent = Get-CimInstance Win32_Process -Filter ("ProcessId={0}" -f $w.ParentProcessId) -ErrorAction SilentlyContinue
    if($parent){
      Add-Line ("PARENT_NAME={0}" -f $parent.Name)
      Add-Line ("PARENT_PID={0}" -f $parent.ProcessId)
      Add-Line ("PARENT_CMD={0}" -f (Redact $parent.CommandLine))
    }
  }

  try {
    $listeners = @(Get-NetTCPConnection -LocalPort 17877 -State Listen -ErrorAction Stop)
    Add-Line ("PORT17877_LISTENER_COUNT={0}" -f $listeners.Count)
    foreach($l in $listeners){ Add-Line ("PORT17877_PID={0}" -f $l.OwningProcess) }
  } catch { Add-Line 'PORT17877_AUDIT=UNAVAILABLE' }

  $tasks = @()
  try {
    foreach($t in Get-ScheduledTask -ErrorAction Stop){
      foreach($a in @($t.Actions)){
        $combined = ("{0} {1}" -f $a.Execute,$a.Arguments)
        if($combined -match '(?i)brodetail|autopilot|watcher[\\/]daemon\.js'){
          $tasks += [pscustomobject]@{ Name=$t.TaskName; State=$t.State; Execute=$a.Execute; Arguments=(Redact $a.Arguments) }
        }
      }
    }
  } catch {}
  Add-Line ("SCHEDULED_LAUNCHER_COUNT={0}" -f $tasks.Count)
  foreach($t in $tasks){ Add-Line ("SCHEDULED_LAUNCHER={0}|{1}|{2}|{3}" -f $t.Name,$t.State,$t.Execute,$t.Arguments) }

  $startup = @()
  try { $startup = @(Get-CimInstance Win32_StartupCommand | Where-Object { $_.Command -match '(?i)brodetail|autopilot|watcher[\\/]daemon\.js' }) } catch {}
  Add-Line ("STARTUP_LAUNCHER_COUNT={0}" -f $startup.Count)
  foreach($s in $startup){ Add-Line ("STARTUP_LAUNCHER={0}|{1}" -f $s.Name,(Redact $s.Command)) }

  foreach($name in @('install-watcher-autostart.ps1','uninstall-watcher-autostart.ps1')){
    $p = Join-Path $Root $name
    if(Test-Path $p){
      Add-Line ("LAUNCHER_FILE={0}|SHA256={1}" -f $name,(Get-FileHash $p -Algorithm SHA256).Hash)
      $matches = Select-String -Path $p -Pattern 'ScheduledTask|TaskName|daemon\.js|node\.exe|Start-Process|Register-ScheduledTask|schtasks' -ErrorAction SilentlyContinue
      foreach($m in $matches){ Add-Line ("LAUNCHER_HINT={0}:{1}:{2}" -f $name,$m.LineNumber,(Redact $m.Line.Trim())) }
    }
  }

  Add-Line 'WATCHER_RESTARTED=NO'
  Add-Line 'EXTENSION_RELOADED=NO'
  Add-Line 'PRODUCTION_DEPLOY=NO'
  Add-Line 'CRM_WRITE_CHANGED=NO'
  Add-Line 'SEND_CHANGED=NO'
  Add-Line 'RESULT=PASS'
  $lines | Set-Content -Path $report -Encoding UTF8
  Write-Host 'RESULT=PASS'
  Write-Host ("REPORT={0}" -f $report)
} catch {
  Add-Line ("RESULT=FAIL")
  Add-Line ("ERROR={0}" -f $_.Exception.Message)
  try { $lines | Set-Content -Path $report -Encoding UTF8 } catch {}
  Write-Host 'RESULT=FAIL'
  Write-Host ("REPORT={0}" -f $report)
  exit 2
}
