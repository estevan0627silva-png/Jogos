// =============================================================================
// INTERFACE DE JOGO (HUD): VIDA, EXPERIÊNCIA, TEMPO, OURO E ITENS (16:9 WIDESCREEN)
// DESIGN: DARK FANTASY MEDIEVAL RPG UI KIT (INSPIRADO EM PERGAMINHO, FERRO & OURO NOBRE)
// =============================================================================
const ROUNDED_FONT = '"Nunito", "Quicksand", "Segoe UI", "Trebuchet MS", "Arial Rounded MT Bold", sans-serif';
const SERIF_TITLE_FONT = '"Cinzel", "Georgia", "Palatino Linotype", serif';

const textStyle = (color, size = 17, weight = 'bold', strokeThickness = 0, strokeColor = '#000000') => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: SERIF_TITLE_FONT,
  stroke: strokeThickness > 0 ? strokeColor : 'transparent',
  strokeThickness: strokeThickness,
  shadow: {
    offsetX: 1,
    offsetY: 1,
    color: '#000000',
    blur: 0,
    stroke: false,
    fill: true
  }
});

const buttonTextStyle = (color = '#ffffff', size = 13, weight = 'bold') => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: SERIF_TITLE_FONT,
  stroke: 'transparent',
  strokeThickness: 0,
  shadow: {
    offsetX: 1,
    offsetY: 1,
    color: '#000000',
    blur: 0,
    stroke: false,
    fill: true
  }
});

const titleTextStyle = (color = '#ffca28', size = 22) => ({
  fontSize: size + 'px',
  fontStyle: 'bold',
  color,
  fontFamily: SERIF_TITLE_FONT,
  stroke: 'transparent',
  strokeThickness: 0,
  shadow: {
    offsetX: 1,
    offsetY: 2,
    color: '#050302',
    blur: 0,
    stroke: false,
    fill: true
  }
});

const subtitleTextStyle = (color = '#d6c8aa', size = 11.5) => ({
  fontSize: size + 'px',
  fontStyle: 'normal',
  color,
  fontFamily: SERIF_TITLE_FONT,
  stroke: 'transparent',
  strokeThickness: 0,
  shadow: {
    offsetX: 1,
    offsetY: 1,
    color: '#000000',
    blur: 0,
    stroke: false,
    fill: true
  }
});

const parchmentTitleStyle = (color = '#2c1b10', size = 12.5, weight = 'bold') => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: SERIF_TITLE_FONT,
  stroke: 'transparent',
  strokeThickness: 0,
  shadow: null
});

const parchmentBodyStyle = (color = '#1f130b', size = 11, weight = 'normal') => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: ROUNDED_FONT,
  stroke: 'transparent',
  strokeThickness: 0,
  shadow: null
});

const roundedTextStyle = (color, size = 12, weight = 'normal', strokeColor = null, strokeThickness = 0) => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: ROUNDED_FONT,
  stroke: strokeColor || 'transparent',
  strokeThickness: strokeThickness
});

function fitTextToBox(textObj, maxWidth, maxHeight = 999, minFontSize = 10) {
  if (!textObj || !textObj.active) return textObj;
  let currentSize = parseInt(String(textObj.style.fontSize).replace('px', ''), 10) || 14;
  while (currentSize > minFontSize && (textObj.width > maxWidth || textObj.height > maxHeight)) {
    currentSize--;
    textObj.setFontSize(currentSize);
  }
  return textObj;
}

function floatText(scene, x, y, msg, color) {
  const upperMsg = String(msg != null ? msg : '').toUpperCase();
  const t = scene.add.text(Math.round(x), Math.round(y), upperMsg, { fontSize: '15px', fontStyle: 'bold', color, fontFamily: SERIF_TITLE_FONT, stroke: 'transparent', strokeThickness: 0, shadow: { offsetX: 1, offsetY: 2, color: '#000000', blur: 0, fill: true } })
    .setOrigin(0.5).setDepth(1500);
  scene.tweens.add({ targets: t, y: y - 40, alpha: 0, duration: 900, onComplete: () => t.destroy() });
}

// -----------------------------------------------------------------------------
// AUXILIARES DE RENDERIZAÇÃO: MOLDURAS E BOTÕES MEDIEVAIS NOBRES (UI KIT)
// -----------------------------------------------------------------------------
function drawMedievalHudFrame(gfx, x, y, w, h, isHover = false) {
  gfx.clear();
  // Fundo em tom de couro curtido / pergaminho escuro
  gfx.fillStyle(isHover ? 0x221a14 : 0x14100c, 0.96).fillRoundedRect(x, y, w, h, 6);
  // Borda externa de ferro envelhecido
  gfx.lineStyle(2, isHover ? 0xffca28 : 0x3d2b1f).strokeRoundedRect(x, y, w, h, 6);
  // Filete interno de ouro antigo
  gfx.lineStyle(1, isHover ? 0xffeb3b : 0xc5a059, 0.85).strokeRoundedRect(x + 2, y + 2, w - 4, h - 4, 4);

  // Rebites de ouro com sombra nos 4 cantos
  const rOff = 5;
  const corners = [
    [x + rOff, y + rOff],
    [x + w - rOff, y + rOff],
    [x + rOff, y + h - rOff],
    [x + w - rOff, y + h - rOff]
  ];
  corners.forEach(([cx, cy]) => {
    gfx.fillStyle(0xc5a059, 1).fillCircle(cx, cy, 2);
    gfx.fillStyle(0x2a1a0e, 1).fillCircle(cx, cy, 0.9);
  });
}

function drawMedievalHudButton(gfx, x, y, w, h, isHover = false) {
  gfx.clear();
  // Ficha metálica chanfrada com acabamento em bronze e ouro
  gfx.fillStyle(isHover ? 0x36271c : 0x18120e, 0.96).fillRoundedRect(x, y, w, h, 7);
  gfx.lineStyle(2, isHover ? 0xffca28 : 0x8d5524).strokeRoundedRect(x, y, w, h, 7);
  gfx.lineStyle(1, isHover ? 0xfff59d : 0xc5a059, 0.85).strokeRoundedRect(x + 2, y + 2, w - 4, h - 4, 5);

  const corners = [
    [x + 5, y + 5],
    [x + w - 5, y + 5],
    [x + 5, y + h - 5],
    [x + w - 5, y + h - 5]
  ];
  corners.forEach(([cx, cy]) => {
    gfx.fillStyle(0xc5a059, 1).fillCircle(cx, cy, 2);
  });
}

// Toast animado de Conquista Desbloqueada em tempo real no topo da tela
function showAchievementToast(scene, ach) {
  if (!scene || !ach) return;
  sound.playAchievement();

  const toast = scene.add.container(GAME_WIDTH / 2, -50).setDepth(3600).setScrollFactor(0);
  const bg = scene.add.graphics();
  // Moldura de pergaminho real com detalhes dourados e rebites
  bg.fillStyle(0x16120e, 0.96).fillRoundedRect(-210, -24, 420, 48, 8);
  bg.lineStyle(2.5, 0xffca28).strokeRoundedRect(-210, -24, 420, 48, 8);
  bg.lineStyle(1, 0x8d5524).strokeRoundedRect(-206, -20, 412, 40, 6);

  // Rebites nos cantos do toast
  [[-202, -16], [202, -16], [-202, 16], [202, 16]].forEach(([rx, ry]) => {
    bg.fillStyle(0xc5a059, 1).fillCircle(rx, ry, 2.5);
  });

  const crown = scene.add.image(-180, 0, 'hud_crown').setScale(1.1);
  const title = scene.add.text(-156, -13, `CONQUISTA: ${ach.title}`, textStyle('#ffca28', 12));
  const sub = scene.add.text(-156, 4, `${ach.desc} (+${ach.rewardGold} OURO!)`, textStyle('#7fe7ff', 10));
  fitTextToBox(title, 345, 18, 9);
  fitTextToBox(sub, 345, 16, 8);

  toast.add([bg, crown, title, sub]);

  scene.tweens.add({
    targets: toast,
    y: 42,
    duration: 380,
    ease: 'Back.easeOut',
    onComplete: () => {
      scene.time.delayedCall(2500, () => {
        if (!toast.active) return;
        scene.tweens.add({
          targets: toast,
          y: -60,
          alpha: 0,
          duration: 320,
          onComplete: () => toast.destroy()
        });
      });
    }
  });
}

// -----------------------------------------------------------------------------
// HUD MEDIEVAL EM PIXEL ART 16:9 (BARRA DE XP, CORAÇÕES, PRATA, RELÍQUIA & CHEFÃO)
// -----------------------------------------------------------------------------
function createHUD(scene) {
  hudContainer = scene.add.container(0, 0).setDepth(2000).setScrollFactor(0).setVisible(false);

  // 1. PAINEL DE GLÓRIA & VIDA (Tempo + Corações) — Esquerda (x: 14..202)
  const gloryBg = scene.add.image(14, 10, 'ui_hud_panel_time').setOrigin(0, 0).setDisplaySize(188, 48);
  const hourglass = scene.add.image(28, 34, 'hud_hourglass');
  const gloryLabel = scene.add.text(42, 22, "GL\u00d3RIA & VIDA", textStyle("#a89260", 9)).setOrigin(0, 0.5);
  hudGloryText = scene.add.text(42, 36, "0s", textStyle("#f5e6c8", 13)).setOrigin(0, 0.5);
  hudContainer.add([gloryBg, hourglass, gloryLabel, hudGloryText]);

  hudHearts = [];
  for (let i = 0; i < 6; i++) {
    const heart = scene.add.image(94 + i * 14, 34, "hud_heart", 0).setScale(1.0);
    hudHearts.push(heart);
    hudContainer.add(heart);
  }
  updateHeartsHUD();

  // 2. PAINEL DE PRATA DA PARTIDA — Centro-Esquerda (x: 210..298)
  const silverBg = scene.add.image(210, 10, 'ui_hud_panel_silver').setOrigin(0, 0).setDisplaySize(88, 48);
  const silverIcon = scene.add.image(226, 34, "silver_coin", 0).setScale(1.2);
  const silverLabel = scene.add.text(242, 22, "PRATA", textStyle("#b0bec5", 9)).setOrigin(0, 0.5);
  hudSilverText = scene.add.text(242, 36, "0", textStyle("#e0f7fa", 15)).setOrigin(0, 0.5);
  hudContainer.add([silverBg, silverIcon, silverLabel, hudSilverText]);

  // 3. PAINEL DE RELÍQUIA / EQUIPAMENTO ATIVO — Centro (x: 306..532)
  const itemBg = scene.add.image(306, 10, "ui_hud_panel_weapon").setOrigin(0, 0).setDisplaySize(260, 48);

  // Alvéolo circular / medalhão medieval de relíquia (UI Kit)
  const slotFrame = scene.add.image(326, 34, "ui_wood_slots").setDisplaySize(34, 34);
  hudBackpackSlot = scene.add.image(364, 34, "ui_wood_slots").setDisplaySize(34, 34);
  hudBackpackIcon = scene.add.image(364, 34, "item_bow").setDisplaySize(22, 22).setVisible(false);
  hudBackpackPadlock = scene.add.image(364, 34, "ui_padlock").setDisplaySize(14, 20).setVisible(true);

  hudItemIcon = scene.add.image(326, 34, "item_bow").setDisplaySize(22, 22).setVisible(false);
  hudItemName = scene.add.text(388, 22, "SEM ARMA", textStyle("#7a7265", 10)).setOrigin(0, 0.5);
  hudItemBarBase = scene.add.image(388, 36, "ui_bar_timer_base").setOrigin(0, 0.5).setDisplaySize(54, 12);
  hudItemBar = scene.add.graphics();
  hudItemTime = scene.add.text(446, 36, "", textStyle("#ffca28", 9.5)).setOrigin(0, 0.5);
  const badge1 = scene.add.image(486, 25, "scroll_multishot").setScale(0.70).setVisible(false);
  const txt1 = scene.add.text(486, 39, "", textStyle("#b388ff", 8)).setOrigin(0.5, 0.5).setVisible(false);
  const badge2 = scene.add.image(512, 25, "scroll_growth").setScale(0.70).setVisible(false);
  const txt2 = scene.add.text(512, 39, "", textStyle("#b388ff", 8)).setOrigin(0.5, 0.5).setVisible(false);
  hudScrollBadges = [badge1, badge2];
  hudScrollTexts = [txt1, txt2];
  hudScrollBadge = badge1;
  hudScrollText = txt1;
  hudContainer.add([itemBg, slotFrame, hudItemIcon, hudBackpackSlot, hudBackpackIcon, hudBackpackPadlock, hudItemName, hudItemBarBase, hudItemBar, hudItemTime, badge1, txt1, badge2, txt2]);

  // 4. PAINEL DE RECORDE DO REINO (x: 540..648)
  const bestBg = scene.add.image(574, 10, "ui_hud_panel_record").setOrigin(0, 0).setDisplaySize(108, 48);
  const crown = scene.add.image(590, 34, "hud_crown");
  const bestLabel = scene.add.text(572, 22, "RECORDE", textStyle("#a89260", 9)).setOrigin(0, 0.5);
  hudBestText = scene.add.text(606, 36, `${getBestScore()}s`, textStyle("#ffca28", 15)).setOrigin(0, 0.5);
  hudContainer.add([bestBg, crown, bestLabel, hudBestText]);
  // 5. BOTÃO DE SOM RÁPIDO [M] — Superior Direito (x: 844..892 em 16:9)
  const soundBtnBg = scene.add.image(868, 34, 'ui_btn_blue_sq').setDisplaySize(44, 44);



  hudHornIcon = scene.add.image(868, 34, 'hud_horn', sound.isMuted() ? 1 : 0);
  const soundHitArea = scene.add.rectangle(868, 34, 48, 48, 0x000000, 0)
    .setInteractive({ useHandCursor: true });

  const toggleAudio = () => {
    sound.toggleMute();
    sound.playButtonClick();
    hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
    if (menuContainer && menuContainer.updateMenuHorn) menuContainer.updateMenuHorn();
  };

  soundHitArea.on('pointerdown', () => { soundBtnBg.setTexture('ui_btn_blue_sq_press'); toggleAudio(); });
  soundHitArea.on('pointerup', () => soundBtnBg.setTexture('ui_btn_blue_sq'));
  soundHitArea.on('pointerout', () => soundBtnBg.setTexture('ui_btn_blue_sq'));


  scene.input.keyboard.on('keydown-M', () => {
    if (gameState === 'GAMEOVER') return;
    sound.toggleMute();
    if (hudHornIcon) hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
    if (pauseModal && pauseModal.updateAudio) pauseModal.updateAudio();
    if (menuContainer && menuContainer.updateMenuHorn) menuContainer.updateMenuHorn();
  });

  // 6. BOTÃO DE TELA CHEIA RÁPIDO [F] — Extremo Superior Direito (x: 902..950 em 16:9)
  const fsBtnBg = scene.add.image(926, 34, 'ui_btn_blue_sq').setDisplaySize(44, 44);



  hudFullscreenIcon = scene.add.image(926, 34, 'hud_fullscreen', isGameFullscreen(scene) ? 1 : 0);
  const fsHitArea = scene.add.rectangle(926, 34, 44, 44, 0x000000, 0).setInteractive({ useHandCursor: true });
  fsHitArea.on('pointerdown', () => {
    fsBtnBg.setTexture('ui_btn_blue_sq_press');
    sound.playButtonClick();
    toggleFullscreen(scene);
  });
  fsHitArea.on('pointerup', () => fsBtnBg.setTexture('ui_btn_blue_sq'));
  fsHitArea.on('pointerout', () => fsBtnBg.setTexture('ui_btn_blue_sq'));

  // 7. BOTAO DE PAUSA RAPIDO [ESC] - (Tiny Swords Blue Button)
  const pauseBtnBg = scene.add.image(810, 34, 'ui_btn_blue_sq').setDisplaySize(44, 44);
  const pauseIcon = scene.add.text(810, 32, '||', { fontSize: '16px', fontStyle: 'bold', color: '#ffffff' }).setOrigin(0.5);
  const pauseHitArea = scene.add.rectangle(810, 34, 44, 44, 0x000000, 0).setInteractive({ useHandCursor: true });
  pauseHitArea.on('pointerdown', () => {
    pauseBtnBg.setTexture('ui_btn_blue_sq_press');
    sound.playButtonClick();
    if (typeof handleEscPress === 'function') handleEscPress(scene);
  });
  pauseHitArea.on('pointerup', () => pauseBtnBg.setTexture('ui_btn_blue_sq'));
  pauseHitArea.on('pointerout', () => pauseBtnBg.setTexture('ui_btn_blue_sq'));

  hudContainer.add([pauseBtnBg, pauseIcon, pauseHitArea, soundBtnBg, hudHornIcon, soundHitArea, fsBtnBg, hudFullscreenIcon, fsHitArea]);

  // 8. BARRA DE EXPERIÊNCIA (XP) DA PARTIDA — Faixa Horizontal Nobre 16:9 (x: 14..946, y: 61..77)
  const xpFrame = scene.add.image(14, 61, 'ui_bar_xp_base').setOrigin(0, 0).setDisplaySize(932, 16);
  hudXpBar = scene.add.graphics();
  const xpGemIcon = scene.add.image(28, 69, 'xp_orb', 0).setScale(1.05);
  hudLevelText = scene.add.text(42, 69, 'NÍVEL 1', textStyle('#ffca28', 10.5)).setOrigin(0, 0.5);
  hudXpText = scene.add.text(932, 69, 'XP: 0 / 6', textStyle('#7fe7ff', 10.5)).setOrigin(1, 0.5);
  hudContainer.add([xpFrame, hudXpBar, xpGemIcon, hudLevelText, hudXpText]);
  updateXpHUD();

  // 9. BARRA DE VIDA DO CHEFÃO (Gothic Iron Crest com Rubis Sangrentos)
  bossHudContainer = scene.add.container(0, 0).setVisible(false);
  const bossBg = scene.add.graphics();
  bossBg.fillStyle(0x160d0b, 0.96).fillRoundedRect(290, 80, 380, 32, 6);
  bossBg.lineStyle(2.5, 0xd83a3a).strokeRoundedRect(290, 80, 380, 32, 6);
  bossBg.lineStyle(1, 0xff8a80, 0.7).strokeRoundedRect(293, 83, 374, 26, 4);

  // Spikes ornamentais góticos nas bordas da barra do Boss
  bossBg.fillStyle(0xd83a3a, 1).fillTriangle(290, 96, 282, 96, 290, 88);
  bossBg.fillStyle(0xd83a3a, 1).fillTriangle(670, 96, 678, 96, 670, 88);

  const bossTitle = scene.add.text(310, 84, 'GOLEM ANCESTRAL DE PEDRA', textStyle('#ff8a80', 10.5));
  bossHpText = scene.add.text(654, 84, `${BOSS_MAX_HP}/${BOSS_MAX_HP}`, textStyle('#ffca28', 10.5)).setOrigin(1, 0);
  bossHpBar = scene.add.graphics();
  bossHudContainer.add([bossBg, bossTitle, bossHpBar, bossHpText]);
  hudContainer.add(bossHudContainer);
}

function updateXpHUD() {
  if (!hudXpBar || !hudLevelText || !hudXpText) return;
  hudXpBar.clear();
  const barX = 114;
  const barY = 64;
  const barW = 724;
  const barH = 10;

  // Canaleta escura da barra
  hudXpBar.fillStyle(0x090705, 1).fillRect(barX, barY, barW, barH);
  hudXpBar.lineStyle(1, 0x3a2e21).strokeRect(barX, barY, barW, barH);

  // Marcas de segmento / entalhes métricos sutis a cada 20%
  for (let s = 1; s <= 4; s++) {
    const sx = Math.round(barX + (barW * s) / 5);
    hudXpBar.fillStyle(0x221a14, 0.8).fillRect(sx, barY, 1, barH);
  }

  const pct = Phaser.Math.Clamp(xpToNextLevel > 0 ? runXp / xpToNextLevel : 0, 0, 1);
  const fillW = Math.max(0, Math.round((barW - 2) * pct));
  if (fillW > 0) {
    // Gradiente esmeralda com brilho de ciano místico (UI Kit)
    hudXpBar.fillStyle(0x00c853, 1).fillRect(barX + 1, barY + 1, fillW, barH - 2);
    hudXpBar.fillStyle(0x69f0ae, 0.85).fillRect(barX + 1, barY + 1, fillW, 2);
    hudXpBar.fillStyle(0x00e5ff, 0.6).fillRect(barX + fillW - 2, barY + 1, 2, barH - 2);
  }

  hudLevelText.setText(`NÍVEL ${runLevel}`);
  hudXpText.setText(`XP: ${runXp} / ${xpToNextLevel}`);
}

function updateHeartsHUD() {
  if (!hudHearts || !hudHearts.length) return;
  const maxH = playerMaxHp || getPlayerMaxHp();
  hudHearts.forEach((h, idx) => {
    if (!h || !h.active) return;
    if (idx < maxH) {
      h.setVisible(true);
      h.setFrame(idx < playerHp ? 0 : 1);
    } else {
      h.setVisible(false);
    }
  });
}

// Atualiza o slot e a barra de duração gráfica do item ativo
function updateItemHUD() {
  if (!buff.type) {
    hudItemIcon.setVisible(false);
    hudItemName.setText('SEM ARMA').setColor('#7a7265');
  
    hudItemTime.setText('');
    hudItemBar.clear();
    if (playerBuffBar) playerBuffBar.clear();
    return;
  }

  const texKey = buff.type === 'shield' ? 'shield_worn' : 'item_' + buff.type;
  hudItemIcon.setTexture(texKey).setVisible(true);

  const lvl = getWeaponLevel(buff.type);
  const label = BUFF_NAMES[buff.type] || 'RELÍQUIA';
  hudItemName.setText(`${label} NV.${lvl}`).setColor('#7fe7ff');
  fitTextToBox(hudItemName, 174, 18, 9);

  const remaining = Math.max(0, buff.timeLeft);
  hudItemTime.setText(`${remaining.toFixed(1)}s`);

  const maxTime = buff.maxTime || BUFF_TIME[buff.type] || 10;
  const pct = Phaser.Math.Clamp(remaining / maxTime, 0, 1);
  const barW = 50;
  const barH = 6;
  const barX = 389;
  const barY = 33;

  hudItemBar.clear();
  hudItemBar.fillStyle(0x100e0b, 1).fillRect(barX, barY, barW, barH);
  hudItemBar.lineStyle(1, 0x4a3b2c).strokeRect(barX, barY, barW, barH);

  const barColor = remaining <= 2 ? 0xd83a3a : (
    buff.type === 'shield' ? 0x26a69a :
    buff.type === 'firestaff' ? 0xff7043 :
    buff.type === 'axe' ? 0xab47bc : 0xf2c14e
  );
  hudItemBar.fillStyle(barColor, 1).fillRect(barX + 1, barY + 1, Math.max(0, (barW - 2) * pct), barH - 2);

  if (playerBuffBar && player && player.visible && (gameState === 'PLAYING' || gameState === 'PAUSED' || gameState === 'LEVEL_UP')) {
    playerBuffBar.clear();
    const pW = 32;
    const pH = 5;
    const pX = Math.round(player.x - pW / 2);
    const pY = Math.round(player.y - 25);

    playerBuffBar.fillStyle(0x0e0b08, 0.95).fillRect(pX - 1, pY - 1, pW + 2, pH + 2);
    playerBuffBar.fillStyle(0x221a14, 0.95).fillRect(pX, pY, pW, pH);

    const overheadColor = remaining <= 1.8 ? 0xff3030 : (
      buff.type === 'shield' ? 0x7fe7ff :
      buff.type === 'firestaff' ? 0xff7043 :
      buff.type === 'axe' ? 0xce93d8 :
      buff.type === 'bow' ? 0xffeb3b : 0xffffff
    );
    const fillW = Math.max(0, Math.round(pW * pct));
    playerBuffBar.fillStyle(overheadColor, 1).fillRect(pX, pY, fillW, pH);
  }
  updateBackpackHUD();
}

function updateScrollHUD() {
  if (!hudScrollBadges || hudScrollBadges.length === 0) return;
  const activeScrolls = (typeof chosenScrolls !== 'undefined' && Array.isArray(chosenScrolls))
    ? chosenScrolls
    : (chosenScroll ? [chosenScroll] : []);

  for (let i = 0; i < 2; i++) {
    const badge = hudScrollBadges[i];
    const txt = hudScrollTexts[i];
    if (!badge || !txt) continue;

    const sKey = activeScrolls[i];
    if (sKey && SCROLL_CATALOG[sKey]) {
      const sCfg = SCROLL_CATALOG[sKey];
      const lvl = scrollLevels[sKey] || 1;
      badge.setTexture(sCfg.icon).setVisible(true);
      txt.setText(`NV.${lvl}`).setVisible(true);
    } else {
      badge.setVisible(false);
      txt.setVisible(false);
    }
  }

  // Se possuir exatamente 1 pergaminho, centraliza o badge (x: 506)
  if (activeScrolls.length === 1 && hudScrollBadges[0] && hudScrollTexts[0]) {
    hudScrollBadges[0].setX(518);
    hudScrollTexts[0].setX(518);
  } else if (activeScrolls.length >= 2) {
    if (hudScrollBadges[0] && hudScrollTexts[0]) {
    hudScrollBadges[0].setX(518);
    hudScrollTexts[0].setX(518);
    }
    if (hudScrollBadges[1] && hudScrollTexts[1]) {
      hudScrollBadges[1].setX(512);
      hudScrollTexts[1].setX(512);
    }
  }
}


function updateBackpackHUD() {
  if (!hudBackpackSlot || !hudBackpackIcon) return;
  const unlocked = typeof hasBackpack === 'function' ? hasBackpack() : false;
  if (!unlocked) {
    if (typeof hudBackpackPadlock !== 'undefined' && hudBackpackPadlock) hudBackpackPadlock.setVisible(true);
    hudBackpackIcon.setVisible(false);
  } else {
    if (typeof hudBackpackPadlock !== 'undefined' && hudBackpackPadlock) hudBackpackPadlock.setVisible(false);
    if (backpackWeapon) {
      const tex = backpackWeapon === 'shield' ? 'shield_worn' : 'item_' + backpackWeapon;
      hudBackpackIcon.setTexture(tex).setVisible(true);
    } else {
      hudBackpackIcon.setVisible(false);
    }
  }
}
