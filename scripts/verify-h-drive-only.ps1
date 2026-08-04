#Requires -Version 5.1
<#
.SYNOPSIS
  Verifies that project-controlled paths resolve to H: and not C:.
.DESCRIPTION
  Inspects cwd, TEMP/TMP, package caches, Netlify home, Git worktree,
  and common project output paths. Returns nonzero exit code on failure.
#>
[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
$CanonicalRoot = "H:\Constitutional-Capitalism"
$failures = @()

function Write-Ok([string]$Message) { Write-Host "[OK]  $Message" -ForegroundColor Green }
function Write-Fail([string]$Message) {
  Write-Host "[FAIL] $Message" -ForegroundColor Red
  $script:failures += $Message
}
function Write-Warn([string]$Message) { Write-Host "[WARN] $Message" -ForegroundColor Yellow }
function Write-Info([string]$Message) { Write-Host "[INFO] $Message" -ForegroundColor Cyan }

Write-Host ""
Write-Host "============================================" -ForegroundColor White
Write-Host " H:-ONLY VERIFICATION" -ForegroundColor White
Write-Host "============================================" -ForegroundColor White
Write-Host ""

function Test-HPath([string]$Name, [string]$Value, [switch]$Required) {
  if ([string]::IsNullOrWhiteSpace($Value)) {
    if ($Required) { Write-Fail "$Name is empty" }
    else { Write-Warn "$Name is empty (optional)" }
    return
  }
  $normalized = ($Value -replace "/", "\").TrimEnd("\")
  if ($normalized -match '^[Cc]:') {
    Write-Fail "$Name points to C:: $Value"
    return
  }
  if ($normalized -match '^[Hh]:') {
    Write-Ok "$Name = $Value"
    return
  }
  Write-Fail "$Name is not on H:: $Value"
}

# Current working directory
$cwd = (Get-Location).Path
$resolvedCwd = (Resolve-Path -LiteralPath $cwd).Path
Write-Info "Current working directory: $resolvedCwd"
if ($resolvedCwd -like "$CanonicalRoot*") {
  Write-Ok "CWD is under $CanonicalRoot"
} else {
  Write-Fail "CWD is not under ${CanonicalRoot}: $resolvedCwd"
}

# Environment paths
Test-HPath "TEMP" $env:TEMP -Required
Test-HPath "TMP" $env:TMP -Required
Test-HPath "NPM_CONFIG_CACHE" $env:NPM_CONFIG_CACHE -Required
Test-HPath "PNPM_STORE_DIR" $env:PNPM_STORE_DIR -Required
Test-HPath "NETLIFY_HOME" $env:NETLIFY_HOME -Required
Test-HPath "PNPM_HOME" $env:PNPM_HOME
Test-HPath "XDG_CACHE_HOME" $env:XDG_CACHE_HOME

# npm/pnpm resolved config if available
try {
  $npmCache = & npm config get cache 2>$null
  if ($LASTEXITCODE -eq 0 -and $npmCache) {
    Test-HPath "npm config cache" $npmCache.Trim()
  }
} catch {
  Write-Warn "npm config get cache unavailable"
}

try {
  if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    $pnpmStore = & pnpm store path 2>$null
    if ($LASTEXITCODE -eq 0 -and $pnpmStore) {
      Test-HPath "pnpm store path" $pnpmStore.Trim()
    }
  }
} catch {
  Write-Warn "pnpm store path unavailable"
}

# Package manager config files
$npmrc = Join-Path $CanonicalRoot ".npmrc"
if (Test-Path -LiteralPath $npmrc) {
  Write-Ok ".npmrc present at $npmrc"
  $npmrcContent = Get-Content -LiteralPath $npmrc -Raw
  if ($npmrcContent -match 'store-dir\s*=\s*(.+)') {
    Test-HPath ".npmrc store-dir" $Matches[1].Trim()
  }
  if ($npmrcContent -match 'cache\s*=\s*(.+)') {
    Test-HPath ".npmrc cache" $Matches[1].Trim()
  }
} else {
  Write-Warn ".npmrc not found yet"
}

# Git worktree root
try {
  Push-Location $CanonicalRoot
  $gitRoot = & git rev-parse --show-toplevel 2>$null
  if ($LASTEXITCODE -eq 0 -and $gitRoot) {
    $gitRootNorm = ($gitRoot.Trim() -replace "/", "\")
    Test-HPath "Git worktree root" $gitRootNorm -Required
  } else {
    Write-Warn "Git not initialized yet"
  }
} finally {
  Pop-Location
}

# Project output paths
$outputPaths = @(
  "apps\book-site\dist",
  "apps\book-site\node_modules",
  "apps\book-site\.astro",
  "apps\build-board\dist",
  "apps\build-board\node_modules",
  "apps\build-board\.astro",
  "node_modules",
  ".local\tmp",
  ".local\npm-cache",
  ".local\pnpm-store",
  "reports"
)

foreach ($rel in $outputPaths) {
  $full = Join-Path $CanonicalRoot $rel
  if (Test-Path -LiteralPath $full) {
    Test-HPath "Project path $rel" $full
  } else {
    Write-Info "Not present yet (ok): $full"
  }
}

# Scan for accidental C: references in .npmrc / env files under project
$sensitiveFiles = Get-ChildItem -LiteralPath $CanonicalRoot -Recurse -File -ErrorAction SilentlyContinue |
  Where-Object {
    $_.FullName -notmatch '\\node_modules\\' -and
    $_.FullName -notmatch '\\\.git\\' -and
    $_.FullName -notmatch '\\\.local\\' -and
    ($_.Name -in @(".npmrc", ".env", ".env.local") -or $_.Extension -in @(".toml"))
  }

foreach ($f in $sensitiveFiles) {
  $content = Get-Content -LiteralPath $f.FullName -Raw -ErrorAction SilentlyContinue
  if ($content -and $content -match '(?i)[Cc]:\\Users|[Cc]:\\Temp|%LOCALAPPDATA%|%APPDATA%') {
    Write-Fail "Possible C: path reference in $($f.FullName)"
  }
}

Write-Host ""
Write-Host "Honest scope note:" -ForegroundColor DarkGray
Write-Host "Verification covers project-controlled paths only." -ForegroundColor DarkGray
Write-Host "Windows/Cursor/Git system internals may still touch C:." -ForegroundColor DarkGray
Write-Host ""

if ($failures.Count -gt 0) {
  Write-Host "VERIFICATION FAILED ($($failures.Count) issue(s))" -ForegroundColor Red
  foreach ($f in $failures) { Write-Host " - $f" -ForegroundColor Red }
  exit 1
}

Write-Host "VERIFICATION PASSED" -ForegroundColor Green
Write-Host ""
exit 0
