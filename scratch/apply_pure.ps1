$ErrorActionPreference = "Stop"

# 1. Update modals.js with pure_pause.txt
$mPath = 'JS_Teste\src\ui\modals.js'
$mText = [System.IO.File]::ReadAllText($mPath, [System.Text.Encoding]::UTF8)

$pauseStart = "function showPauseModal(scene) {"
$pauseEnd = "pauseModal.add(["
$pauseEndMarker = "footerHint`r`n  ]);`r`n}"
if (-not $mText.Contains($pauseEndMarker)) {
  $pauseEndMarker = "footerHint`n  ]);`n}"
}

$pIdx = $mText.IndexOf($pauseStart)
$pEndIdx = $mText.IndexOf($pauseEndMarker, $pIdx) + $pauseEndMarker.Length

$newPause = [System.IO.File]::ReadAllText("scratch\pure_pause.txt", [System.Text.Encoding]::UTF8)
$mText = $mText.Substring(0, $pIdx) + $newPause + $mText.Substring($pEndIdx)
[System.IO.File]::WriteAllText($mPath, $mText, [System.Text.Encoding]::UTF8)
Write-Output "Updated modals.js with pure pause!"

# 2. Update menus.js with pure_settings.txt
$menuPath = 'JS_Teste\src\ui\menus.js'
$menuText = [System.IO.File]::ReadAllText($menuPath, [System.Text.Encoding]::UTF8)

$settingsStart = "function showSettingsMenu(scene) {"
$settingsEndMarker = "...createButton(scene, cx, top + 424, 'VOLTAR', () => exitSubMenu(scene), 260, 38)`r`n  ]);`r`n}"
if (-not $menuText.Contains($settingsEndMarker)) {
  $settingsEndMarker = "...createButton(scene, cx, top + 424, 'VOLTAR', () => exitSubMenu(scene), 260, 38)`n  ]);`n}"
}

$sIdx = $menuText.IndexOf($settingsStart)
$sEndIdx = $menuText.IndexOf($settingsEndMarker, $sIdx) + $settingsEndMarker.Length

$newSettings = [System.IO.File]::ReadAllText("scratch\pure_settings.txt", [System.Text.Encoding]::UTF8)
$menuText = $menuText.Substring(0, $sIdx) + $newSettings + $menuText.Substring($sEndIdx)
[System.IO.File]::WriteAllText($menuPath, $menuText, [System.Text.Encoding]::UTF8)
Write-Output "Updated menus.js with pure settings!"
