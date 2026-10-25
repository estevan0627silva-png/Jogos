$ErrorActionPreference = "Stop"

# 1. Update modals.js
$mPath = 'JS_Teste\src\ui\modals.js'
$mLines = [System.IO.File]::ReadAllLines($mPath, [System.Text.Encoding]::UTF8)

# Verify start and end of createButton/showPauseModal
Write-Output "modals line 364: $($mLines[364])"
Write-Output "modals line 367: $($mLines[367])"
Write-Output "modals line 606: $($mLines[606])"

if (-not $mLines[367].Contains("function createButton")) {
  throw "Line 367 is not createButton!"
}
if ($mLines[606].Trim() -ne "}") {
  throw "Line 606 is not closing brace of showPauseModal!"
}

$part1Lines = [System.IO.File]::ReadAllLines("scratch\replacement_modals_part1.txt", [System.Text.Encoding]::UTF8)

# Slice array: 0..363 + part1Lines + 607..end
$newMLines = New-Object System.Collections.Generic.List[string]
for ($i=0; $i -lt 364; $i++) { $newMLines.Add($mLines[$i]) }
foreach ($l in $part1Lines) { $newMLines.Add($l) }
for ($i=607; $i -lt $mLines.Length; $i++) {
  $line = $mLines[$i]
  # Replace doubleGoldBtn.setFillStyle
  if ($line.Contains("doubleGoldBtn[0].setFillStyle(0x233e18);")) {
    $newMLines.Add("            doubleGoldBtn[0].setTexture('ui_btn_blue_press');")
    $newMLines.Add("            doubleGoldBtn[0].setTint(0x81c784);")
    continue
  }
  if ($line.Contains("doubleGoldBtn[0].setStrokeStyle(2, 0x81c784);")) {
    # Skip
    continue
  }
  if ($line.Contains("doubleGoldBtn[0].setFillStyle(0x4a2e12);")) {
    $newMLines.Add("    doubleGoldBtn[0].setTint(0xffd54f);")
    continue
  }
  if ($line.Contains("doubleGoldBtn[0].setStrokeStyle(2, 0xffd54f);")) {
    # Skip
    continue
  }
  $newMLines.Add($line)
}

[System.IO.File]::WriteAllLines($mPath, $newMLines.ToArray(), [System.Text.Encoding]::UTF8)
Write-Output "Updated modals.js successfully!"

# 2. Update menus.js
$menuPath = 'JS_Teste\src\ui\menus.js'
$menuLines = [System.IO.File]::ReadAllLines($menuPath, [System.Text.Encoding]::UTF8)

Write-Output "menus line 9: $($menuLines[9])"
Write-Output "menus line 107: $($menuLines[107])"

if (-not $menuLines[9].Contains("function showSettingsMenu")) {
  throw "Line 9 is not showSettingsMenu!"
}
if ($menuLines[107].Trim() -ne "}") {
  throw "Line 107 is not closing brace of showSettingsMenu!"
}

$settingsLines = [System.IO.File]::ReadAllLines("scratch\replacement_settings.txt", [System.Text.Encoding]::UTF8)

$newMenuLines = New-Object System.Collections.Generic.List[string]
for ($i=0; $i -lt 9; $i++) { $newMenuLines.Add($menuLines[$i]) }
foreach ($l in $settingsLines) { $newMenuLines.Add($l) }
for ($i=108; $i -lt $menuLines.Length; $i++) {
  if ($i -ge 163 -and $i -le 170) {
    if ($i -eq 163) {
      $newMenuLines.Add("  const closeQuickBtn = scene.add.image(850, 48, 'ui_btn_red_reg').setDisplaySize(78, 28).setInteractive({ useHandCursor: true });")
      $newMenuLines.Add("  const closeQuickTxt = scene.add.text(850, 48, 'SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);")
      $newMenuLines.Add("  closeQuickBtn.on('pointerover', () => { closeQuickBtn.setTexture('ui_btn_red_press'); closeQuickTxt.setColor('#ffeb3b'); });")
      $newMenuLines.Add("  closeQuickBtn.on('pointerout', () => { closeQuickBtn.setTexture('ui_btn_red_reg'); closeQuickTxt.setColor('#ffffff'); });")
      $newMenuLines.Add("  closeQuickBtn.on('pointerdown', () => exitSubMenu(scene));")
      $newMenuLines.Add("  menuContainer.add([closeQuickBtn, closeQuickTxt]);")
    }
    continue
  }
  $newMenuLines.Add($menuLines[$i])
}

[System.IO.File]::WriteAllLines($menuPath, $newMenuLines.ToArray(), [System.Text.Encoding]::UTF8)
Write-Output "Updated menus.js successfully!"
