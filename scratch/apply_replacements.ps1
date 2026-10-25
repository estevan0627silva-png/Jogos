$ErrorActionPreference = "Stop"

# 1. Update modals.js
$modalsPath = "JS_Teste\src\ui\modals.js"
$modalsText = [System.IO.File]::ReadAllText($modalsPath, [System.Text.Encoding]::UTF8)

# Find start of createButton section
$startMarker = "// -----------------------------------------------------------------------------" + [Environment]::NewLine + "// BOTÕES NOBRES MEDIEVAIS EM CARVALHO & OURO"
if (-not $modalsText.Contains($startMarker)) {
  # Try with \n only
  $startMarker = "// -----------------------------------------------------------------------------\n// BOTÕES NOBRES MEDIEVAIS EM CARVALHO & OURO"
}

$startIndex = $modalsText.IndexOf($startMarker)
if ($startIndex -lt 0) {
  throw "Could not find startMarker in modals.js"
}

# Find end of showPauseModal
$endMarker = "footerHint" + [Environment]::NewLine + "  ]);" + [Environment]::NewLine + "}"
if (-not $modalsText.Contains($endMarker)) {
  $endMarker = "footerHint\n  ]);\n}"
}

$endIndex = $modalsText.IndexOf($endMarker, $startIndex)
if ($endIndex -lt 0) {
  throw "Could not find endMarker in modals.js"
}
$endIndex += $endMarker.Length

$newModalsPart1 = [System.IO.File]::ReadAllText("scratch\replacement_modals_part1.txt", [System.Text.Encoding]::UTF8)

$modalsText = $modalsText.Substring(0, $startIndex) + $newModalsPart1 + $modalsText.Substring($endIndex)

# Fix doubleGoldBtn.setFillStyle crash in showLeaderboard
$badDouble1 = "doubleGoldBtn[0].setFillStyle(0x233e18);"
$badDouble2 = "doubleGoldBtn[0].setStrokeStyle(2, 0x81c784);"
$newDouble12 = "doubleGoldBtn[0].setTexture('ui_btn_blue_press');" + [Environment]::NewLine + "            doubleGoldBtn[0].setTint(0x81c784);"

if ($modalsText.Contains($badDouble1)) {
  $modalsText = $modalsText.Replace($badDouble1 + [Environment]::NewLine + "            " + $badDouble2, $newDouble12)
  if ($modalsText.Contains($badDouble1)) {
    # If CRLF didn't match, try with \n
    $modalsText = $modalsText.Replace($badDouble1 + "`n            " + $badDouble2, "doubleGoldBtn[0].setTexture('ui_btn_blue_press');`n            doubleGoldBtn[0].setTint(0x81c784);")
  }
}

$badDouble3 = "doubleGoldBtn[0].setFillStyle(0x4a2e12);"
$badDouble4 = "doubleGoldBtn[0].setStrokeStyle(2, 0xffd54f);"
$newDouble34 = "doubleGoldBtn[0].setTint(0xffd54f);"

if ($modalsText.Contains($badDouble3)) {
  $modalsText = $modalsText.Replace($badDouble3 + [Environment]::NewLine + "    " + $badDouble4, $newDouble34)
  if ($modalsText.Contains($badDouble3)) {
    $modalsText = $modalsText.Replace($badDouble3 + "`n    " + $badDouble4, "doubleGoldBtn[0].setTint(0xffd54f);")
  }
}

[System.IO.File]::WriteAllText($modalsPath, $modalsText, [System.Text.Encoding]::UTF8)
Write-Output "Successfully updated modals.js!"

# 2. Update menus.js
$menusPath = "JS_Teste\src\ui\menus.js"
$menusText = [System.IO.File]::ReadAllText($menusPath, [System.Text.Encoding]::UTF8)

$settingsStart = "function showSettingsMenu(scene) {"
$settingsEnd = "...createButton(scene, cx, 442, 'VOLTAR', () => exitSubMenu(scene), 260, 38)" + [Environment]::NewLine + "  ]);" + [Environment]::NewLine + "}"
if (-not $menusText.Contains($settingsEnd)) {
  $settingsEnd = "...createButton(scene, cx, 442, 'VOLTAR', () => exitSubMenu(scene), 260, 38)\n  ]);\n}"
}

$sIndex = $menusText.IndexOf($settingsStart)
$eIndex = $menusText.IndexOf($settingsEnd, $sIndex) + $settingsEnd.Length

if ($sIndex -ge 0 -and $eIndex -gt $sIndex) {
  $newSettings = [System.IO.File]::ReadAllText("scratch\replacement_settings.txt", [System.Text.Encoding]::UTF8)
  $menusText = $menusText.Substring(0, $sIndex) + $newSettings + $menusText.Substring($eIndex)
  Write-Output "Replaced showSettingsMenu in menus.js!"
} else {
  Write-Warning "Could not find showSettingsMenu in menus.js ($sIndex, $eIndex)"
}

# Replace closeQuickBtn in achievements
$oldClose = "  const closeQuickBtn = scene.add.rectangle(850, 48, 78, 28, 0x5c241b)"
$newClose = @"
  const closeQuickBtn = scene.add.image(850, 48, 'ui_btn_red_reg').setDisplaySize(78, 28)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(850, 48, 'SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);
  closeQuickBtn.on('pointerover', () => { closeQuickBtn.setTexture('ui_btn_red_press'); closeQuickTxt.setColor('#ffeb3b'); });
  closeQuickBtn.on('pointerout', () => { closeQuickBtn.setTexture('ui_btn_red_reg'); closeQuickTxt.setColor('#ffffff'); });
  closeQuickBtn.on('pointerdown', () => exitSubMenu(scene));
  menuContainer.add([closeQuickBtn, closeQuickTxt]);
"@

$oldCloseBlock = @"
  const closeQuickBtn = scene.add.rectangle(850, 48, 78, 28, 0x5c241b)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(850, 48, 'SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);
  closeQuickBtn.on('pointerover', () => closeQuickBtn.setFillStyle(0x8e2a1b));
  closeQuickBtn.on('pointerout', () => closeQuickBtn.setFillStyle(0x5c241b));
  closeQuickBtn.on('pointerdown', () => exitSubMenu(scene));
  menuContainer.add([closeQuickBtn, closeQuickTxt]);
"@

if ($menusText.Contains($oldClose)) {
  # Normalize newlines for replacement
  $menusText = $menusText.Replace($oldCloseBlock.Replace("`r`n", "`n"), $newClose.Replace("`r`n", "`n"))
  $menusText = $menusText.Replace($oldCloseBlock, $newClose)
  Write-Output "Replaced closeQuickBtn in achievements!"
}

[System.IO.File]::WriteAllText($menusPath, $menusText, [System.Text.Encoding]::UTF8)
Write-Output "Successfully updated menus.js!"
