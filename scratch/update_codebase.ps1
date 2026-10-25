# 1. Update JS_Teste\src\main.js line 428
$mainPath = "JS_Teste\src\main.js"
$main = [System.IO.File]::ReadAllText((Resolve-Path $mainPath).Path)
$oldMainCall = "showShopMenu(scene, data.shopTab || 'mage');"
$newMainCall = "if (data.shopTab === 'blacksmith') showBlacksmithMenu(scene); else showMageShopMenu(scene);"
if ($main.Contains($oldMainCall)) {
    $main = $main.Replace($oldMainCall, $newMainCall)
    [System.IO.File]::WriteAllText((Resolve-Path $mainPath).Path, $main)
    Write-Host "main.js: replaced showShopMenu call with direct shop dispatch"
} else {
    Write-Host "main.js: oldMainCall not found, checking current state"
}

# 2. Add showShopMenu helper to JS_Teste\src\ui\menus.js
$menusPath = "JS_Teste\src\ui\menus.js"
$menus = [System.IO.File]::ReadAllText((Resolve-Path $menusPath).Path)

if (-not $menus.Contains("function showShopMenu(")) {
    $shopHelper = @"

function showShopMenu(scene, shopTab = 'mage') {
  if (shopTab === 'blacksmith') {
    showBlacksmithMenu(scene);
  } else {
    showMageShopMenu(scene);
  }
}
"@
    $menus = $menus + "`r`n" + $shopHelper
    Write-Host "menus.js: added showShopMenu helper"
}

# 3. Add padlock to locked weapons in Blacksmith shop (menus.js)
# Look for: if (!isUnlocked) icon.setTint(0x555555);
$oldSmithIcon = "    const icon = scene.add.image(cx, startY + 54, cfg.icon).setScale(1.4);`r`n    if (!isUnlocked) icon.setTint(0x555555);"
if (-not $menus.Contains($oldSmithIcon)) {
    # Try LF version
    $oldSmithIcon = "    const icon = scene.add.image(cx, startY + 54, cfg.icon).setScale(1.4);`n    if (!isUnlocked) icon.setTint(0x555555);"
}

$newSmithIcon = @"
    const icon = scene.add.image(cx, startY + 54, cfg.icon).setScale(1.4);
    let lockIcon = null;
    if (!isUnlocked) {
      icon.setTint(0x555555);
      lockIcon = scene.add.image(cx + 18, startY + 64, 'ui_padlock').setDisplaySize(16, 22).setDepth(cardGfx.depth + 2);
    }
"@

if ($menus.Contains("if (!isUnlocked) icon.setTint(0x555555);") -and -not $menus.Contains("'ui_padlock'")) {
    $smithRegex = 'const icon = scene\.add\.image\(cx, startY \+ 54, cfg\.icon\)\.setScale\(1\.4\);\s*if \(!isUnlocked\) icon\.setTint\(0x555555\);'
    $menus = [System.Text.RegularExpressions.Regex]::Replace($menus, $smithRegex, $newSmithIcon.Trim())
    # Add lockIcon to menuContainer.add for blacksmith
    $menus = $menus.Replace("menuContainer.add([cardGfx, cardHit, icon, nameTxt,", "menuContainer.add([cardGfx, cardHit, icon, ...(lockIcon ? [lockIcon] : []), nameTxt,")
    Write-Host "menus.js: added padlock icon to locked blacksmith weapons"
}

# 4. Add padlock to locked backpack in Mage shop (menus.js)
# Look for: const lockStr = unlocked ? 'OK' : (defeatedBoss ? 'MOCHILA' : 'BLOQ.');
if ($menus.Contains("const lockStr = unlocked ? 'OK' : (defeatedBoss ? 'MOCHILA' : 'BLOQ.');") -and -not $menus.Contains("padlockIcon")) {
    $oldMageLock = "const lockIcon = scene.add.text(cx, startY + 54, lockStr, textStyle(unlocked ? '#ffd740' : (defeatedBoss ? '#ba68c8' : '#8d5524'), 9.5)).setOrigin(0.5);"
    $newMageLock = @"
const lockIcon = scene.add.text(cx, startY + 54, lockStr, textStyle(unlocked ? '#ffd740' : (defeatedBoss ? '#ba68c8' : '#8d5524'), 9.5)).setOrigin(0.5);
  const padlockIcon = scene.add.image(cx, startY + 54, 'ui_padlock').setDisplaySize(18, 25).setVisible(!unlocked);
  if (!unlocked) lockIcon.setVisible(false);
"@
    $menus = $menus.Replace($oldMageLock, $newMageLock.Trim())
    $menus = $menus.Replace("menuContainer.add([cardGfx, cardHit, icon, lockIcon,", "menuContainer.add([cardGfx, cardHit, icon, lockIcon, padlockIcon,")
    Write-Host "menus.js: added padlock icon to locked backpack card in mage shop"
}

[System.IO.File]::WriteAllText((Resolve-Path $menusPath).Path, $menus)

# 5. Update hud.js: add padlock to backpack slot
$hudPath = "JS_Teste\src\ui\hud.js"
$hud = [System.IO.File]::ReadAllText((Resolve-Path $hudPath).Path)

$oldHudBackpack = 'hudBackpackLock = scene.add.text(364, 34, "BLOQ.", textStyle("#8d5524", 9)).setOrigin(0.5);'
$newHudBackpack = @"
hudBackpackLock = scene.add.text(364, 34, "BLOQ.", textStyle("#8d5524", 9)).setOrigin(0.5).setVisible(false);
  hudBackpackPadlock = scene.add.image(364, 34, "ui_padlock").setDisplaySize(14, 20).setVisible(true);
"@

if ($hud.Contains($oldHudBackpack) -and -not $hud.Contains("hudBackpackPadlock")) {
    $hud = $hud.Replace($oldHudBackpack, $newHudBackpack.Trim())
    $hud = $hud.Replace("hudBackpackIcon, hudBackpackLock,", "hudBackpackIcon, hudBackpackLock, hudBackpackPadlock,")
    
    # Update updateBackpackHUD
    $oldUpdateBackpack = @"
function updateBackpackHUD() {
  if (!hudBackpackSlot || !hudBackpackLock || !hudBackpackIcon) return;
  const unlocked = typeof hasBackpack === 'function' ? hasBackpack() : false;
  if (!unlocked) {
    hudBackpackLock.setVisible(true).setText('BLOQ.').setColor('#8d5524');
    hudBackpackIcon.setVisible(false);
  } else {
    hudBackpackLock.setVisible(!backpackWeapon).setText('VAZIO').setColor('#5c4a38');
    if (backpackWeapon) {
      const tex = backpackWeapon === 'shield' ? 'shield_worn' : 'item_' + backpackWeapon;
      hudBackpackIcon.setTexture(tex).setVisible(true);
    } else {
      hudBackpackIcon.setVisible(false);
    }
  }
}
"@
    $newUpdateBackpack = @"
function updateBackpackHUD() {
  if (!hudBackpackSlot || !hudBackpackIcon) return;
  const unlocked = typeof hasBackpack === 'function' ? hasBackpack() : false;
  if (!unlocked) {
    if (typeof hudBackpackPadlock !== 'undefined' && hudBackpackPadlock) hudBackpackPadlock.setVisible(true);
    if (hudBackpackLock) hudBackpackLock.setVisible(false);
    hudBackpackIcon.setVisible(false);
  } else {
    if (typeof hudBackpackPadlock !== 'undefined' && hudBackpackPadlock) hudBackpackPadlock.setVisible(false);
    if (!backpackWeapon) {
      if (hudBackpackLock) hudBackpackLock.setVisible(true).setText('VAZIO').setColor('#5c4a38');
      hudBackpackIcon.setVisible(false);
    } else {
      if (hudBackpackLock) hudBackpackLock.setVisible(false);
      const tex = backpackWeapon === 'shield' ? 'shield_worn' : 'item_' + backpackWeapon;
      hudBackpackIcon.setTexture(tex).setVisible(true);
    }
  }
}
"@
    $hud = $hud.Replace($oldUpdateBackpack.Trim(), $newUpdateBackpack.Trim())
    [System.IO.File]::WriteAllText((Resolve-Path $hudPath).Path, $hud)
    Write-Host "hud.js: added padlock to backpack slot in in-game HUD"
}

# 6. Update modals.js: createModal, showInitials, showPauseModal
$modPath = "JS_Teste\src\ui\modals.js"
$mod = [System.IO.File]::ReadAllText((Resolve-Path $modPath).Path)

# In createModal:
$oldFrameStyle = "frame.fillStyle(0x16100b, 0.85).fillRoundedRect(left + 14, top + 14, width - 28, height - 28, 8);"
$newFrameStyle = "frame.fillStyle(0x16100b, 0.95).fillRoundedRect(left + 22, top + 22, width - 44, height - 44, 8);"
if ($mod.Contains($oldFrameStyle)) {
    $mod = $mod.Replace($oldFrameStyle, $newFrameStyle)
    $mod = $mod.Replace("frame.lineStyle(2, 0x8d5524, 0.85).strokeRoundedRect(left + 14, top + 14, width - 28, height - 28, 8);", "frame.lineStyle(2, 0x8d5524, 0.9).strokeRoundedRect(left + 22, top + 22, width - 44, height - 44, 8);")
    $mod = $mod.Replace("frame.lineStyle(1, 0xc5a059, 0.75).strokeRoundedRect(left + 16, top + 16, width - 32, height - 32, 6);", "frame.lineStyle(1, 0xc5a059, 0.65).strokeRoundedRect(left + 24, top + 24, width - 48, height - 48, 6);")
    Write-Host "modals.js: refined createModal frame backing to 95% opacity with 22px border"
}

# In showInitials: adjust vertical spacing so subtitle never overlaps ribbon
# top + 80 -> top + 88, bravery top + 97 -> top + 104, coins top + 138 -> top + 144, breakdown top + 182 -> top + 188
if ($mod.Contains("summaryBox.fillStyle(0x1f1711, 0.96).fillRoundedRect(boxLeft, top + 80, boxW, 132, 8);")) {
    $mod = $mod.Replace("summaryBox.fillStyle(0x1f1711, 0.96).fillRoundedRect(boxLeft, top + 80, boxW, 132, 8);", "summaryBox.fillStyle(0x1f1711, 0.96).fillRoundedRect(boxLeft, top + 88, boxW, 132, 8);")
    $mod = $mod.Replace("summaryBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(boxLeft, top + 80, boxW, 132, 8);", "summaryBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(boxLeft, top + 88, boxW, 132, 8);")
    $mod = $mod.Replace("summaryBox.lineStyle(1, 0xc5a059, 0.35).lineBetween(boxLeft + 20, top + 114, boxLeft + boxW - 20, top + 114);", "summaryBox.lineStyle(1, 0xc5a059, 0.35).lineBetween(boxLeft + 20, top + 122, boxLeft + boxW - 20, top + 122);")
    $mod = $mod.Replace("scene.add.text(cx, top + 97,", "scene.add.text(cx, top + 105,")
    $mod = $mod.Replace("scene.add.sprite(cx - 165, top + 138,", "scene.add.sprite(cx - 165, top + 144,")
    $mod = $mod.Replace("scene.add.sprite(cx + 28, top + 138,", "scene.add.sprite(cx + 28, top + 144,")
    $mod = $mod.Replace("cx - 148,`r`n    top + 138,", "cx - 148,`r`n    top + 144,")
    $mod = $mod.Replace("cx - 148,`n    top + 138,", "cx - 148,`n    top + 144,")
    $mod = $mod.Replace("cx + 45,`r`n    top + 138,", "cx + 45,`r`n    top + 144,")
    $mod = $mod.Replace("cx + 45,`n    top + 138,", "cx + 45,`n    top + 144,")
    $mod = $mod.Replace("scene.add.text(cx, top + 182,", "scene.add.text(cx, top + 188,")
    Write-Host "modals.js: adjusted showInitials vertical spacing"
}

# In showPauseModal: replace stretched weapon panel with clean medieval stats plate
$oldStats = "const statsPanel = scene.add.image(cx, top + 102, 'ui_hud_panel_weapon').setDisplaySize(410, 48);"
$newStats = @"
const statsPlate = scene.add.graphics();
  statsPlate.fillStyle(0x0e0b08, 0.88).fillRoundedRect(cx - 200, top + 78, 400, 46, 6);
  statsPlate.lineStyle(1.5, 0x8d5524, 0.9).strokeRoundedRect(cx - 200, top + 78, 400, 46, 6);
  statsPlate.lineStyle(1, 0xc5a059, 0.45).strokeRoundedRect(cx - 198, top + 80, 396, 42, 4);
"@
if ($mod.Contains($oldStats)) {
    $mod = $mod.Replace($oldStats, $newStats.Trim())
    $mod = $mod.Replace("statsPanel, timeTxt, relicTxt,", "statsPlate, timeTxt, relicTxt,")
    Write-Host "modals.js: replaced stretched pause panel with clean graphics plate"
}

[System.IO.File]::WriteAllText((Resolve-Path $modPath).Path, $mod)
Write-Host "All codebase updates completed successfully."
