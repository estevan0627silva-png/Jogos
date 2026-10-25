$hudPath = "JS_Teste/src/ui/hud.js"
$hudContent = [System.IO.File]::ReadAllText($hudPath, [System.Text.Encoding]::UTF8)

# 1. Replace createHUD panels
$oldHudPanels = @'
  // 1. PAINEL DE GLÓRIA & VIDA (Tempo + Corações) — Esquerda (x: 10..164)
  const gloryBg = scene.add.graphics();
  drawMedievalHudFrame(gloryBg, 10, 10, 154, 48, false);
  const hourglass = scene.add.image(24, 34, 'hud_hourglass');
  const gloryLabel = scene.add.text(38, 14, 'GLÓRIA & VIDA', textStyle('#a89260', 9));
  hudGloryText = scene.add.text(38, 25, '0s', textStyle('#f5e6c8', 14));
  hudContainer.add([gloryBg, hourglass, gloryLabel, hudGloryText]);

  hudHearts = [];
  for (let i = 0; i < 6; i++) {
    const heart = scene.add.image(74 + i * 14, 39, 'hud_heart', 0).setScale(1.0);
    hudHearts.push(heart);
    hudContainer.add(heart);
  }
  updateHeartsHUD();

  // 2. PAINEL DE PRATA DA PARTIDA — Centro-Esquerda (x: 170..274)
  const silverBg = scene.add.graphics();
  drawMedievalHudFrame(silverBg, 170, 10, 104, 48, false);
  const silverIcon = scene.add.image(188, 34, 'silver_coin', 0).setScale(1.2);
  const silverLabel = scene.add.text(202, 16, 'PRATA', textStyle('#b0bec5', 10));
  hudSilverText = scene.add.text(202, 28, '0', textStyle('#e0f7fa', 18));
  hudContainer.add([silverBg, silverIcon, silverLabel, hudSilverText]);

  // 3. PAINEL DE RELÍQUIA / EQUIPAMENTO ATIVO — Centro (x: 280..514)
  const itemBg = scene.add.graphics();
  drawMedievalHudFrame(itemBg, 280, 10, 248, 48, false);

  // Alvéolo circular / medalhão medieval de relíquia (UI Kit)
  const slotFrame = scene.add.image(304, 34, 'ui_wood_slots').setDisplaySize(42, 42);
  hudBackpackSlot = scene.add.image(348, 34, 'ui_wood_slots').setDisplaySize(42, 42);
  hudBackpackIcon = scene.add.image(348, 34, 'item_bow').setDisplaySize(24, 24).setVisible(false);
  hudBackpackLock = scene.add.text(348, 34, 'BLOQ.', textStyle('#8d5524', 9.5)).setOrigin(0.5);




  hudItemIcon = scene.add.image(304, 34, 'item_bow').setVisible(false);
  hudItemName = scene.add.text(376, 16, 'SEM ARMA', textStyle('#7a7265', 10.5));
  hudItemBarBase = scene.add.image(424, 35, 'ui_bar_small_base').setDisplaySize(84, 14);
  hudItemBar = scene.add.graphics();
  hudItemTime = scene.add.text(476, 35.5, '', textStyle('#ffca28', 10)).setOrigin(0.5, 0.5);
  const badge1 = scene.add.image(498, 27, 'scroll_multishot').setScale(0.80).setVisible(false);
  const txt1 = scene.add.text(498, 42, '', textStyle('#b388ff', 8.5)).setOrigin(0.5, 0.5).setVisible(false);
  const badge2 = scene.add.image(518, 27, 'scroll_growth').setScale(0.80).setVisible(false);
  const txt2 = scene.add.text(518, 42, '', textStyle('#b388ff', 8.5)).setOrigin(0.5, 0.5).setVisible(false);
  hudScrollBadges = [badge1, badge2];
  hudScrollTexts = [txt1, txt2];
  hudScrollBadge = badge1;
  hudScrollText = txt1;
  hudContainer.add([itemBg, slotFrame, hudItemIcon, hudBackpackSlot, hudBackpackIcon, hudBackpackLock, hudItemName, hudItemBarBase, hudItemBar, hudItemTime, badge1, txt1, badge2, txt2]);

  // 4. PAINEL DE RECORDE DO REINO (x: 520..628)
  const bestBg = scene.add.graphics();
  drawMedievalHudFrame(bestBg, 534, 10, 108, 48, false);
  const crown = scene.add.image(550, 34, 'hud_crown');
  const bestLabel = scene.add.text(566, 16, 'RECORDE', textStyle('#a89260', 10));
  hudBestText = scene.add.text(566, 28, `${getBestScore()}s`, textStyle('#ffca28', 17));
  hudContainer.add([bestBg, crown, bestLabel, hudBestText]);
'@

$newHudPanels = @'
  // 1. PAINEL DE GLÓRIA & VIDA (Tempo + Corações) — Esquerda (x: 14..202)
  const gloryBg = scene.add.image(14, 10, 'ui_hud_panel_time').setOrigin(0, 0).setDisplaySize(188, 48);
  const hourglass = scene.add.image(28, 34, 'hud_hourglass');
  const gloryLabel = scene.add.text(42, 19, 'GLÓRIA & VIDA', textStyle('#a89260', 9)).setOrigin(0, 0.5);
  hudGloryText = scene.add.text(42, 35, '0s', textStyle('#f5e6c8', 13)).setOrigin(0, 0.5);
  hudContainer.add([gloryBg, hourglass, gloryLabel, hudGloryText]);

  hudHearts = [];
  for (let i = 0; i < 6; i++) {
    const heart = scene.add.image(96 + i * 14, 34, 'hud_heart', 0).setScale(1.0);
    hudHearts.push(heart);
    hudContainer.add(heart);
  }
  updateHeartsHUD();

  // 2. PAINEL DE PRATA DA PARTIDA — Centro-Esquerda (x: 210..298)
  const silverBg = scene.add.image(210, 10, 'ui_hud_panel_silver').setOrigin(0, 0).setDisplaySize(88, 48);
  const silverIcon = scene.add.image(228, 34, 'silver_coin', 0).setScale(1.2);
  const silverLabel = scene.add.text(244, 19, 'PRATA', textStyle('#b0bec5', 9)).setOrigin(0, 0.5);
  hudSilverText = scene.add.text(244, 35, '0', textStyle('#e0f7fa', 16)).setOrigin(0, 0.5);
  hudContainer.add([silverBg, silverIcon, silverLabel, hudSilverText]);

  // 3. PAINEL DE RELÍQUIA / EQUIPAMENTO ATIVO — Centro (x: 306..532)
  const itemBg = scene.add.image(306, 10, 'ui_hud_panel_weapon').setOrigin(0, 0).setDisplaySize(226, 48);

  // Alvéolo circular / medalhão medieval de relíquia (UI Kit)
  const slotFrame = scene.add.image(328, 34, 'ui_wood_slots').setDisplaySize(36, 36);
  hudBackpackSlot = scene.add.image(368, 34, 'ui_wood_slots').setDisplaySize(36, 36);
  hudBackpackIcon = scene.add.image(368, 34, 'item_bow').setDisplaySize(24, 24).setVisible(false);
  hudBackpackLock = scene.add.text(368, 34, 'BLOQ.', textStyle('#8d5524', 9)).setOrigin(0.5);

  hudItemIcon = scene.add.image(328, 34, 'item_bow').setDisplaySize(24, 24).setVisible(false);
  hudItemName = scene.add.text(392, 20, 'SEM ARMA', textStyle('#7a7265', 10)).setOrigin(0, 0.5);
  hudItemBarBase = scene.add.image(392, 35, 'ui_bar_timer_base').setOrigin(0, 0.5).setDisplaySize(54, 12);
  hudItemBar = scene.add.graphics();
  hudItemTime = scene.add.text(450, 35, '', textStyle('#ffca28', 9.5)).setOrigin(0, 0.5);
  const badge1 = scene.add.image(494, 26, 'scroll_multishot').setScale(0.70).setVisible(false);
  const txt1 = scene.add.text(494, 40, '', textStyle('#b388ff', 8)).setOrigin(0.5, 0.5).setVisible(false);
  const badge2 = scene.add.image(518, 26, 'scroll_growth').setScale(0.70).setVisible(false);
  const txt2 = scene.add.text(518, 40, '', textStyle('#b388ff', 8)).setOrigin(0.5, 0.5).setVisible(false);
  hudScrollBadges = [badge1, badge2];
  hudScrollTexts = [txt1, txt2];
  hudScrollBadge = badge1;
  hudScrollText = txt1;
  hudContainer.add([itemBg, slotFrame, hudItemIcon, hudBackpackSlot, hudBackpackIcon, hudBackpackLock, hudItemName, hudItemBarBase, hudItemBar, hudItemTime, badge1, txt1, badge2, txt2]);

  // 4. PAINEL DE RECORDE DO REINO (x: 540..648)
  const bestBg = scene.add.image(540, 10, 'ui_hud_panel_record').setOrigin(0, 0).setDisplaySize(108, 48);
  const crown = scene.add.image(556, 34, 'hud_crown');
  const bestLabel = scene.add.text(570, 19, 'RECORDE', textStyle('#a89260', 9)).setOrigin(0, 0.5);
  hudBestText = scene.add.text(570, 35, `${getBestScore()}s`, textStyle('#ffca28', 15)).setOrigin(0, 0.5);
  hudContainer.add([bestBg, crown, bestLabel, hudBestText]);
'@

# Normalize line endings for replacement
$oldNorm = $oldHudPanels.Replace("`r`n", "`n")
$newNorm = $newHudPanels.Replace("`r`n", "`n")
$hudNorm = $hudContent.Replace("`r`n", "`n")

if ($hudNorm.Contains($oldNorm)) {
    $hudNorm = $hudNorm.Replace($oldNorm, $newNorm)
    Write-Output "Successfully replaced HUD panels!"
} else {
    Write-Output "WARNING: oldHudPanels not found in hud.js!"
}

# 2. Replace XP bar frame in hud.js
$oldXpFrame = @'
  // 8. BARRA DE EXPERIÊNCIA (XP) DA PARTIDA — Faixa Horizontal Nobre 16:9 (x: 14..946, y: 61..77)
  const xpFrame = scene.add.graphics();
  // Fundo e borda externa em ferro nobre
  xpFrame.fillStyle(0x120e0b, 0.95).fillRoundedRect(14, 61, 932, 16, 5);
  xpFrame.lineStyle(2, 0x3d2b1f).strokeRoundedRect(14, 61, 932, 16, 5);
  xpFrame.lineStyle(1, 0xc5a059, 0.85).strokeRoundedRect(16, 62, 928, 14, 4);

  // Cantoneiras ornamentais de metal nas extremidades da barra de XP (Image 1 UI Kit)
  [14, 938].forEach(ex => {
    xpFrame.fillStyle(0xc5a059, 1).fillRect(ex, 61, 8, 16);
    xpFrame.fillStyle(0x2a1a0e, 1).fillRect(ex + 2, 63, 4, 12);
  });
'@.Replace("`r`n", "`n")

$newXpFrame = @'
  // 8. BARRA DE EXPERIÊNCIA (XP) DA PARTIDA — Faixa Horizontal Nobre 16:9 (x: 14..946, y: 61..77)
  const xpFrame = scene.add.image(14, 61, 'ui_bar_xp_base').setOrigin(0, 0).setDisplaySize(932, 16);
'@.Replace("`r`n", "`n")

if ($hudNorm.Contains($oldXpFrame)) {
    $hudNorm = $hudNorm.Replace($oldXpFrame, $newXpFrame)
    Write-Output "Successfully replaced XP frame with ui_bar_xp_base!"
} else {
    Write-Output "WARNING: oldXpFrame not found in hud.js!"
}

# 3. Update hudItemBar in updateItemHUD()
$oldItemBar = @'
  const maxTime = buff.maxTime || BUFF_TIME[buff.type] || 10;
  const pct = Phaser.Math.Clamp(remaining / maxTime, 0, 1);
  const barW = 80;
  const barH = 6;
  const barX = 384;
  const barY = 32;
'@.Replace("`r`n", "`n")

$newItemBar = @'
  const maxTime = buff.maxTime || BUFF_TIME[buff.type] || 10;
  const pct = Phaser.Math.Clamp(remaining / maxTime, 0, 1);
  const barW = 50;
  const barH = 6;
  const barX = 394;
  const barY = 32;
'@.Replace("`r`n", "`n")

if ($hudNorm.Contains($oldItemBar)) {
    $hudNorm = $hudNorm.Replace($oldItemBar, $newItemBar)
    Write-Output "Successfully updated hudItemBar coordinates!"
} else {
    Write-Output "WARNING: oldItemBar not found in hud.js!"
}

# 4. Update scroll badge positions in updateScrollHUD()
$oldScrollHUD = @'
  // Se possuir exatamente 1 pergaminho, centraliza o badge (x: 495)
  if (activeScrolls.length === 1 && hudScrollBadges[0] && hudScrollTexts[0]) {
    hudScrollBadges[0].setX(495);
    hudScrollTexts[0].setX(495);
  } else if (activeScrolls.length >= 2) {
    if (hudScrollBadges[0] && hudScrollTexts[0]) {
      hudScrollBadges[0].setX(478);
      hudScrollTexts[0].setX(478);
    }
    if (hudScrollBadges[1] && hudScrollTexts[1]) {
      hudScrollBadges[1].setX(501);
      hudScrollTexts[1].setX(501);
    }
  }
'@.Replace("`r`n", "`n")

$newScrollHUD = @'
  // Se possuir exatamente 1 pergaminho, centraliza o badge (x: 506)
  if (activeScrolls.length === 1 && hudScrollBadges[0] && hudScrollTexts[0]) {
    hudScrollBadges[0].setX(506);
    hudScrollTexts[0].setX(506);
  } else if (activeScrolls.length >= 2) {
    if (hudScrollBadges[0] && hudScrollTexts[0]) {
      hudScrollBadges[0].setX(494);
      hudScrollTexts[0].setX(494);
    }
    if (hudScrollBadges[1] && hudScrollTexts[1]) {
      hudScrollBadges[1].setX(518);
      hudScrollTexts[1].setX(518);
    }
  }
'@.Replace("`r`n", "`n")

if ($hudNorm.Contains($oldScrollHUD)) {
    $hudNorm = $hudNorm.Replace($oldScrollHUD, $newScrollHUD)
    Write-Output "Successfully updated updateScrollHUD positions!"
} else {
    Write-Output "WARNING: oldScrollHUD not found in hud.js!"
}

[System.IO.File]::WriteAllText($hudPath, $hudNorm.Replace("`n", "`r`n"), [System.Text.Encoding]::UTF8)
Write-Output "hud.js updated successfully!"
