// =============================================================================
// INTERFACE DE JOGO (HUD): VIDA, EXPERIÊNCIA, TEMPO, OURO E ITENS
// =============================================================================
// INTERFACE (HUD COM BARRA DE XP, DRAFT DE LEVEL UP, FERREIRO, MAGO & CONQUISTAS)
// =============================================================================
const textStyle = (color, size = 17, weight = 'bold') => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: 'Courier New, monospace'
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
  const t = scene.add.text(Math.round(x), Math.round(y), msg, { ...textStyle(color, 15), stroke: '#000000', strokeThickness: 4 })
    .setOrigin(0.5).setDepth(1500);
  scene.tweens.add({ targets: t, y: y - 40, alpha: 0, duration: 900, onComplete: () => t.destroy() });
}

// Toast animado de Conquista Desbloqueada em tempo real no topo da tela
function showAchievementToast(scene, ach) {
  if (!scene || !ach) return;
  sound.playAchievement();

  const toast = scene.add.container(400, -50).setDepth(3600).setScrollFactor(0);
  const bg = scene.add.graphics();
  bg.fillStyle(0x16120e, 0.96).fillRoundedRect(-210, -24, 420, 48, 8);
  bg.lineStyle(2.5, 0xffca28).strokeRoundedRect(-210, -24, 420, 48, 8);
  bg.lineStyle(1, 0x8d5524).strokeRoundedRect(-206, -20, 412, 40, 6);

  const crown = scene.add.image(-180, 0, 'hud_crown').setScale(1.1);
  const title = scene.add.text(-156, -13, `🏆 CONQUISTA: ${ach.title}`, textStyle('#ffca28', 12));
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
// HUD MEDIEVAL EM PIXEL ART (INCLUI BARRA DE XP IN-GAME, CORAÇÕES, PRATA E RELÍQUIA)
// -----------------------------------------------------------------------------
function createHUD(scene) {
  hudContainer = scene.add.container(0, 0).setDepth(2000).setScrollFactor(0).setVisible(false);

  // 1. PAINEL DE GLÓRIA & VIDA (Tempo + Corações) — Esquerda (x: 10..154)
  const gloryBg = scene.add.graphics();
  gloryBg.fillStyle(0x16120e, 0.94).fillRoundedRect(10, 10, 144, 48, 6);
  gloryBg.lineStyle(2, 0xc5a059).strokeRoundedRect(10, 10, 144, 48, 6);
  const hourglass = scene.add.image(26, 34, 'hud_hourglass');
  const gloryLabel = scene.add.text(42, 14, 'GLÓRIA & VIDA', textStyle('#a89260', 9));
  hudGloryText = scene.add.text(42, 26, '0s', textStyle('#f5e6c8', 15));
  hudContainer.add([gloryBg, hourglass, gloryLabel, hudGloryText]);

  hudHearts = [];
  for (let i = 0; i < 4; i++) {
    const heart = scene.add.image(92 + i * 15, 39, 'hud_heart', 0).setScale(1.0);
    hudHearts.push(heart);
    hudContainer.add(heart);
  }
  updateHeartsHUD();

  // 2. PAINEL DE PRATA DA PARTIDA — Centro-Esquerda (x: 160..274)
  const silverBg = scene.add.graphics();
  silverBg.fillStyle(0x16120e, 0.94).fillRoundedRect(160, 10, 114, 48, 6);
  silverBg.lineStyle(2, 0xc5a059).strokeRoundedRect(160, 10, 114, 48, 6);
  const silverIcon = scene.add.image(178, 34, 'silver_coin', 0).setScale(1.2);
  const silverLabel = scene.add.text(194, 16, 'PRATA', textStyle('#b0bec5', 10));
  hudSilverText = scene.add.text(194, 28, '0', textStyle('#e0f7fa', 18));
  hudContainer.add([silverBg, silverIcon, silverLabel, hudSilverText]);

  // 3. PAINEL DE RELÍQUIA / EQUIPAMENTO ATIVO — Centro (x: 280..514)
  const itemBg = scene.add.graphics();
  itemBg.fillStyle(0x16120e, 0.94).fillRoundedRect(280, 10, 234, 48, 6);
  itemBg.lineStyle(2, 0xc5a059).strokeRoundedRect(280, 10, 234, 48, 6);

  const slotFrame = scene.add.graphics();
  slotFrame.fillStyle(0x221a14, 1).fillRoundedRect(288, 16, 36, 36, 4);
  slotFrame.lineStyle(1, 0x8d5524).strokeRoundedRect(288, 16, 36, 36, 4);

  hudItemIcon = scene.add.image(306, 34, 'item_bow').setVisible(false);
  hudItemName = scene.add.text(330, 16, 'SEM RELÍQUIA', textStyle('#7a7265', 11));
  hudItemBar = scene.add.graphics();
  hudItemTime = scene.add.text(478, 35.5, '', textStyle('#ffca28', 11)).setOrigin(0.5, 0.5);
  hudContainer.add([itemBg, slotFrame, hudItemIcon, hudItemName, hudItemBar, hudItemTime]);

  // 4. PAINEL DE RECORDE DO REINO — Direita (x: 520..682)
  const bestBg = scene.add.graphics();
  bestBg.fillStyle(0x16120e, 0.94).fillRoundedRect(520, 10, 162, 48, 6);
  bestBg.lineStyle(2, 0xc5a059).strokeRoundedRect(520, 10, 162, 48, 6);
  const crown = scene.add.image(540, 34, 'hud_crown');
  const bestLabel = scene.add.text(562, 16, 'RECORDE', textStyle('#a89260', 10));
  hudBestText = scene.add.text(562, 28, `${getBestScore()}s`, textStyle('#ffca28', 17));
  hudContainer.add([bestBg, crown, bestLabel, hudBestText]);

  // 5. BOTÃO DE SOM RÁPIDO [M] — Superior Direito (x: 688..736)
  const soundBtnBg = scene.add.graphics();
  const drawSoundBtn = (hover = false) => {
    soundBtnBg.clear();
    soundBtnBg.fillStyle(hover ? 0x2e241c : 0x16120e, 0.94).fillRoundedRect(688, 10, 48, 48, 6);
    soundBtnBg.lineStyle(2, hover ? 0xffca28 : 0xc5a059).strokeRoundedRect(688, 10, 48, 48, 6);
  };
  drawSoundBtn(false);

  hudHornIcon = scene.add.image(712, 34, 'hud_horn', sound.isMuted() ? 1 : 0);
  const soundHitArea = scene.add.rectangle(712, 34, 48, 48, 0x000000, 0)
    .setInteractive({ useHandCursor: true });

  const toggleAudio = () => {
    sound.toggleMute();
    sound.playButtonClick();
    hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
    if (menuContainer && menuContainer.updateMenuHorn) menuContainer.updateMenuHorn();
  };

  soundHitArea.on('pointerover', () => drawSoundBtn(true));
  soundHitArea.on('pointerout', () => drawSoundBtn(false));
  soundHitArea.on('pointerdown', toggleAudio);

  scene.input.keyboard.on('keydown-M', () => {
    if (gameState === 'GAMEOVER') return;
    sound.toggleMute();
    if (hudHornIcon) hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
    if (pauseModal && pauseModal.updateAudio) pauseModal.updateAudio();
    if (menuContainer && menuContainer.updateMenuHorn) menuContainer.updateMenuHorn();
  });

  // 6. BOTÃO DE TELA CHEIA RÁPIDO [F] — Extremo Superior Direito (x: 742..790)
  const fsBtnBg = scene.add.graphics();
  const drawFsBtn = (hover = false) => {
    fsBtnBg.clear();
    fsBtnBg.fillStyle(hover ? 0x2e241c : 0x16120e, 0.94).fillRoundedRect(742, 10, 48, 48, 6);
    fsBtnBg.lineStyle(2, hover ? 0xffca28 : 0xc5a059).strokeRoundedRect(742, 10, 48, 48, 6);
  };
  drawFsBtn(false);

  hudFullscreenIcon = scene.add.image(766, 34, 'hud_fullscreen', isGameFullscreen(scene) ? 1 : 0);
  const fsHitArea = scene.add.rectangle(766, 34, 48, 48, 0x000000, 0)
    .setInteractive({ useHandCursor: true });

  fsHitArea.on('pointerover', () => drawFsBtn(true));
  fsHitArea.on('pointerout', () => drawFsBtn(false));
  fsHitArea.on('pointerdown', () => {
    sound.playButtonClick();
    toggleFullscreen(scene);
  });

  // 6. BOTÃO DE PAUSA RÁPIDO [ESC] — (x: 634..682) — Essencial para Mobile & Atalho de PC
  const pauseBtnBg = scene.add.graphics();
  const drawPauseBtn = (hover = false) => {
    pauseBtnBg.clear();
    pauseBtnBg.fillStyle(hover ? 0x2e241c : 0x16120e, 0.94).fillRoundedRect(634, 10, 48, 48, 6);
    pauseBtnBg.lineStyle(2, hover ? 0xffca28 : 0xc5a059).strokeRoundedRect(634, 10, 48, 48, 6);
    pauseBtnBg.fillStyle(hover ? 0xffe082 : 0xc5a059, 1);
    pauseBtnBg.fillRect(651, 22, 4, 24);
    pauseBtnBg.fillRect(661, 22, 4, 24);
  };
  drawPauseBtn(false);

  const pauseHitArea = scene.add.rectangle(658, 34, 48, 48, 0x000000, 0)
    .setInteractive({ useHandCursor: true });
  pauseHitArea.on('pointerover', () => drawPauseBtn(true));
  pauseHitArea.on('pointerout', () => drawPauseBtn(false));
  pauseHitArea.on('pointerdown', () => {
    sound.playButtonClick();
    if (typeof handleEscPress === 'function') {
      handleEscPress(scene);
    }
  });

  hudContainer.add([pauseBtnBg, pauseHitArea, soundBtnBg, hudHornIcon, soundHitArea, fsBtnBg, hudFullscreenIcon, fsHitArea]);

  // 7. BARRA DE EXPERIÊNCIA (XP) DA PARTIDA — Faixa Horizontal Nobre (x: 10..790, y: 61..77)
  const xpFrame = scene.add.graphics();
  xpFrame.fillStyle(0x120e0b, 0.94).fillRoundedRect(10, 61, 780, 16, 4);
  xpFrame.lineStyle(1.5, 0xc5a059).strokeRoundedRect(10, 61, 780, 16, 4);
  hudXpBar = scene.add.graphics();
  const xpGemIcon = scene.add.image(22, 69, 'xp_orb', 0).setScale(0.95);
  hudLevelText = scene.add.text(34, 69, 'NÍVEL 1', textStyle('#ffca28', 10)).setOrigin(0, 0.5);
  hudXpText = scene.add.text(780, 69, 'XP: 0 / 6', textStyle('#7fe7ff', 10)).setOrigin(1, 0.5);
  hudContainer.add([xpFrame, hudXpBar, xpGemIcon, hudLevelText, hudXpText]);
  updateXpHUD();

  // 8. BARRA DE VIDA DO CHEFÃO (Oculta até os 120s da Boss Fight; posicionada abaixo da Barra de XP)
  bossHudContainer = scene.add.container(0, 0).setVisible(false);
  const bossBg = scene.add.graphics();
  bossBg.fillStyle(0x160d0b, 0.94).fillRoundedRect(236, 80, 328, 30, 5);
  bossBg.lineStyle(2, 0xd83a3a).strokeRoundedRect(236, 80, 328, 30, 5);
  const bossTitle = scene.add.text(252, 83, 'GOLEM ANCESTRAL DE PEDRA', textStyle('#ff8a80', 10));
  bossHpText = scene.add.text(548, 83, `${BOSS_MAX_HP}/${BOSS_MAX_HP}`, textStyle('#ffca28', 10)).setOrigin(1, 0);
  bossHpBar = scene.add.graphics();
  bossHudContainer.add([bossBg, bossTitle, bossHpBar, bossHpText]);
  hudContainer.add(bossHudContainer);
}

function updateXpHUD() {
  if (!hudXpBar || !hudLevelText || !hudXpText) return;
  hudXpBar.clear();
  const barX = 110;
  const barY = 64;
  const barW = 575;
  const barH = 10;

  hudXpBar.fillStyle(0x090705, 1).fillRect(barX, barY, barW, barH);
  hudXpBar.lineStyle(1, 0x3a2e21).strokeRect(barX, barY, barW, barH);

  const pct = Phaser.Math.Clamp(xpToNextLevel > 0 ? runXp / xpToNextLevel : 0, 0, 1);
  const fillW = Math.max(0, Math.round((barW - 2) * pct));
  if (fillW > 0) {
    hudXpBar.fillStyle(0x00c853, 1).fillRect(barX + 1, barY + 1, fillW, barH - 2);
    hudXpBar.fillStyle(0x7fe7ff, 0.7).fillRect(barX + 1, barY + 1, fillW, 3);
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
    hudItemName.setText('SEM RELÍQUIA').setColor('#7a7265');
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

  const maxTime = buff.maxTime || BUFF_TIME[buff.type] || 6;
  const pct = Phaser.Math.Clamp(remaining / maxTime, 0, 1);
  const barW = 114;
  const barH = 7;
  const barX = 330;
  const barY = 32;

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
}

