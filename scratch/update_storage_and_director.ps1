# 1. Update storage.js
$sPath = "JS_Teste/src/core/storage.js"
$sContent = [System.IO.File]::ReadAllText($sPath, [System.Text.Encoding]::UTF8)
$sOld = "            unlocked: Boolean(parsed[k]?.unlocked ?? defaults[k].unlocked),`r`n            level: 1"
$sNew = "            unlocked: Boolean(parsed[k]?.unlocked ?? defaults[k].unlocked),`r`n            level: Math.max(1, parseInt(parsed[k]?.level ?? 1, 10))"

if ($sContent.Contains($sOld)) {
    $sContent = $sContent.Replace($sOld, $sNew)
    [System.IO.File]::WriteAllText($sPath, $sContent, [System.Text.Encoding]::UTF8)
    Write-Output "storage.js: weapon level persistence fixed!"
} else {
    Write-Output "WARNING: sOld not found in storage.js"
}

# 2. Update director.js
$dPath = "JS_Teste/src/world/director.js"
$dContent = [System.IO.File]::ReadAllText($dPath, [System.Text.Encoding]::UTF8)
$dOld = @"
  runWeaponLevels = { bow: 1, sword: 1, shield: 1, axe: 1, firestaff: 1 };
  chosenScrolls = [];
  chosenScroll = null;
  scrollLevels = { multishot: 0, growth: 0, attackspeed: 0 };
"@.Replace("`r`n", "`n")

$dNew = @"
  const up = typeof StorageManager !== 'undefined' ? StorageManager.getUpgrades() : {};
  runWeaponLevels = {
    bow: up.bow?.level || 1,
    sword: up.sword?.level || 1,
    shield: up.shield?.level || 1,
    axe: up.axe?.level || 1,
    firestaff: up.firestaff?.level || 1
  };
  chosenScrolls = [];
  chosenScroll = null;
  scrollLevels = { multishot: 0, growth: 0, attackspeed: 0, duration: 0 };
"@.Replace("`r`n", "`n")

$dNorm = $dContent.Replace("`r`n", "`n")
if ($dNorm.Contains($dOld)) {
    $dNorm = $dNorm.Replace($dOld, $dNew)
    [System.IO.File]::WriteAllText($dPath, $dNorm.Replace("`n", "`r`n"), [System.Text.Encoding]::UTF8)
    Write-Output "director.js: runWeaponLevels and scrollLevels updated!"
} else {
    Write-Output "WARNING: dOld not found in director.js"
}
