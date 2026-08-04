#Requires -Version 5.1
<#
.SYNOPSIS
  Bootstraps the Constitutional Capitalism H:-only development environment.
.DESCRIPTION
  Verifies the repository path, creates local cache/temp directories,
  redirects TEMP/TMP and package caches to H:, and fails if any
  project-controlled path resolves to C:.
#>
[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"

$CanonicalRoot = "H:\Constitutional-Capitalism"
$Fail = $false

function Write-Ok([string]$Message) { Write-Host "[OK]  $Message" -ForegroundColor Green }
function Write-Fail([string]$Message) { Write-Host "[FAIL] $Message" -ForegroundColor Red; $script:Fail = $true }
function Write-Info([string]$Message) { Write-Host "[INFO] $Message" -ForegroundColor Cyan }

Write-Host ""
Write-Host "============================================" -ForegroundColor White
Write-Host " Constitutional Capitalism Environment" -ForegroundColor White
Write-Host " H:-ONLY PROTOCOL" -ForegroundColor White
Write-Host "============================================" -ForegroundColor White
Write-Host ""

# Resolve current path
$cwd = (Get-Location).Path
$resolvedCwd = (Resolve-Path -LiteralPath $cwd).Path

if (-not ($resolvedCwd -like "$CanonicalRoot*")) {
  Write-Fail "Current path must begin with $CanonicalRoot"
  Write-Fail "Resolved path: $resolvedCwd"
  exit 1
}
Write-Ok "Repository path verified: $resolvedCwd"

# Required local directories
$localDirs = @(
  ".local",
  ".local\tmp",
  ".local\cache",
  ".local\npm-cache",
  ".local\pnpm-store",
  ".local\pnpm-home",
  ".local\netlify",
  ".local\astro",
  ".local\vite",
  ".local\logs",
  ".local\downloads",
  ".local\backups"
)

foreach ($rel in $localDirs) {
  $full = Join-Path $CanonicalRoot $rel
  if (-not (Test-Path -LiteralPath $full)) {
    New-Item -ItemType Directory -Force -Path $full | Out-Null
    Write-Info "Created $full"
  }
}
Write-Ok "All .local directories present"

# Set environment variables
$env:TEMP = Join-Path $CanonicalRoot ".local\tmp"
$env:TMP = Join-Path $CanonicalRoot ".local\tmp"
$env:NPM_CONFIG_CACHE = Join-Path $CanonicalRoot ".local\npm-cache"
$env:PNPM_HOME = Join-Path $CanonicalRoot ".local\pnpm-home"
$env:PNPM_STORE_DIR = Join-Path $CanonicalRoot ".local\pnpm-store"
$env:NETLIFY_HOME = Join-Path $CanonicalRoot ".local\netlify"
$env:XDG_CACHE_HOME = Join-Path $CanonicalRoot ".local\cache"
$env:ASTRO_TELEMETRY_DISABLED = "1"
$env:npm_config_cache = $env:NPM_CONFIG_CACHE

# Persist for child processes in this session
[Environment]::SetEnvironmentVariable("TEMP", $env:TEMP, "Process")
[Environment]::SetEnvironmentVariable("TMP", $env:TMP, "Process")
[Environment]::SetEnvironmentVariable("NPM_CONFIG_CACHE", $env:NPM_CONFIG_CACHE, "Process")
[Environment]::SetEnvironmentVariable("PNPM_HOME", $env:PNPM_HOME, "Process")
[Environment]::SetEnvironmentVariable("PNPM_STORE_DIR", $env:PNPM_STORE_DIR, "Process")
[Environment]::SetEnvironmentVariable("NETLIFY_HOME", $env:NETLIFY_HOME, "Process")
[Environment]::SetEnvironmentVariable("XDG_CACHE_HOME", $env:XDG_CACHE_HOME, "Process")
[Environment]::SetEnvironmentVariable("ASTRO_TELEMETRY_DISABLED", "1", "Process")

function Assert-HDrivePath([string]$Name, [string]$Value) {
  if ([string]::IsNullOrWhiteSpace($Value)) {
    Write-Fail "$Name is empty"
    return
  }
  $normalized = $Value -replace "/", "\"
  if ($normalized -match '^[Cc]:') {
    Write-Fail "$Name resolves to C:: $Value"
    return
  }
  if ($normalized -notmatch '^[Hh]:') {
    Write-Fail "$Name does not resolve to H:: $Value"
    return
  }
  Write-Ok "$Name = $Value"
}

Write-Host ""
Write-Host "Resolved environment paths:" -ForegroundColor White
Assert-HDrivePath "TEMP" $env:TEMP
Assert-HDrivePath "TMP" $env:TMP
Assert-HDrivePath "NPM_CONFIG_CACHE" $env:NPM_CONFIG_CACHE
Assert-HDrivePath "PNPM_STORE_DIR" $env:PNPM_STORE_DIR
Assert-HDrivePath "PNPM_HOME" $env:PNPM_HOME
Assert-HDrivePath "NETLIFY_HOME" $env:NETLIFY_HOME
Assert-HDrivePath "XDG_CACHE_HOME" $env:XDG_CACHE_HOME

Set-Location -LiteralPath $CanonicalRoot
Write-Ok "Working directory set to $CanonicalRoot"

Write-Host ""
if ($Fail) {
  Write-Fail "Environment bootstrap FAILED. Do not proceed with installs or builds."
  Write-Host ""
  Write-Host "Note: Windows, Cursor, and Git may still use C: internally for system" -ForegroundColor Yellow
  Write-Host "operations outside project control. The enforceable requirement is that" -ForegroundColor Yellow
  Write-Host "all project-controlled caches, temps, artifacts, and outputs stay on H:." -ForegroundColor Yellow
  exit 1
}

Write-Ok "H:-only environment ready"
Write-Host ""
Write-Host "Distinction: This script redirects project-controlled paths only." -ForegroundColor DarkGray
Write-Host "It cannot prevent OS/editor internals from touching C:." -ForegroundColor DarkGray
Write-Host ""
