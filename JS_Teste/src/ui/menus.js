// =============================================================================
// TELAS E MENUS DO JOGO (16:9 WIDESCREEN — 960x540)
// DESIGN: CENÁRIOS IMERSIVOS, BALCÕES DOS MESTRES, PERGAMINHO, FERRO & OURO NOBRE
// INSPIRAÇÃO: UI KIT MEDIEVAL (IMG 1), BALCÃO DOS VENDEDORES (IMG 2 & 4) & FLOREIOS VITORIANOS (IMG 3)
// =============================================================================

// -----------------------------------------------------------------------------
// TELA DE CONFIGURAÇÕES (ÁUDIO, TELA CHEIA, JOYSTICK & PERGAMINHO DE COMBATE)
// -----------------------------------------------------------------------------
function showSettingsMenu(scene) {
  if (menuContainer) menuContainer.destroy();
  const cx = GAME_WIDTH / 2;
  menuContainer = createModal(scene, 'CONFIGURAÇÕES DO REINO', 480, 'Ajustes de áudio, vídeo (Tela Cheia) e pergaminho de batalha', 580);
  menuContainer.isMainMenu = false;

  // Seção 1: Áudio, Tela Cheia & Controles Mobile
  const audioBox = scene.add.graphics();
  audioBox.fillStyle(0x221a13, 0.94).fillRoundedRect(cx - 260, 84, 520, 118, 6);
  audioBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(cx - 260, 84, 520, 118, 6);
  audioBox.lineStyle(1, 0xc5a059, 0.6).strokeRoundedRect(cx - 258, 86, 516, 114, 4);

  const audioTitle = scene.add.text(cx - 240, 94, 'ÁUDIO, TELA CHEIA & JOYSTICK VIRTUAL', textStyle('#ffca28', 12));

  // Botão 1: Áudio
  const audioToggleBtn = scene.add.rectangle(cx - 125, 128, 230, 32, sound.isMuted() ? 0x8e1b1b : 0x247a46)
    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });
  const audioToggleTxt = scene.add.text(cx - 125, 128, sound.isMuted() ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]', textStyle('#ffffff', 11))
    .setOrigin(0.5);

  audioToggleBtn.on('pointerdown', () => {
    sound.toggleMute();
    sound.playButtonClick();
    audioToggleBtn.setFillStyle(sound.isMuted() ? 0x8e1b1b : 0x247a46);
    audioToggleTxt.setText(sound.isMuted() ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]');
    if (hudHornIcon) hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
  });

  // Botão 2: Tela Cheia
  const fsToggleBtn = scene.add.rectangle(cx + 125, 128, 230, 32, isGameFullscreen(scene) ? 0x247a46 : 0x6e3d1b)
    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });
  const fsToggleTxt = scene.add.text(cx + 125, 128, isGameFullscreen(scene) ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]', textStyle('#ffffff', 11))
    .setOrigin(0.5);

  const refreshFsBtn = () => {
    if (!fsToggleBtn.active) return;
    const active = isGameFullscreen(scene);
    fsToggleBtn.setFillStyle(active ? 0x247a46 : 0x6e3d1b);
    fsToggleTxt.setText(active ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]');
  };
  menuContainer.updateMenuFullscreen = refreshFsBtn;

  fsToggleBtn.on('pointerdown', () => {
    sound.playButtonClick();
    toggleFullscreen(scene);
    scene.time.delayedCall(80, refreshFsBtn);
  });

  // Botão 3: Ativar Joystick Virtual (Mobile / PC)
  const getJoyLabel = () => {
    const m = typeof getJoystickMode === 'function' ? getJoystickMode() : 'auto';
    if (m === 'enabled') return 'JOYSTICK VIRTUAL: [SEMPRE ATIVADO]';
    if (m === 'disabled') return 'JOYSTICK VIRTUAL: [DESATIVADO]';
    return 'JOYSTICK VIRTUAL: [DETECÇÃO AUTOMÁTICA]';
  };
  const getJoyColor = () => {
    const m = typeof getJoystickMode === 'function' ? getJoystickMode() : 'auto';
    if (m === 'enabled') return 0x247a46;
    if (m === 'disabled') return 0x8e1b1b;
    return 0x2d3a4f;
  };

  const joyToggleBtn = scene.add.rectangle(cx, 168, 480, 30, getJoyColor())
    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });
  const joyToggleTxt = scene.add.text(cx, 168, getJoyLabel(), textStyle('#ffffff', 11))
    .setOrigin(0.5);

  joyToggleBtn.on('pointerdown', () => {
    sound.playButtonClick();
    const current = typeof getJoystickMode === 'function' ? getJoystickMode() : 'auto';
    const next = current === 'auto' ? 'enabled' : (current === 'enabled' ? 'disabled' : 'auto');
    if (typeof setJoystickMode === 'function') setJoystickMode(next);
    joyToggleBtn.setFillStyle(getJoyColor());
    joyToggleTxt.setText(getJoyLabel());
    if (virtualJoystick) virtualJoystick.updateVisibility();
  });

  // Seção 2: Pergaminho de Dicas de Combate
  const guideBox = scene.add.graphics();
  guideBox.fillStyle(0x1d1611, 0.94).fillRoundedRect(cx - 260, 210, 520, 192, 6);
  guideBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(cx - 260, 210, 520, 192, 6);
  guideBox.lineStyle(1, 0xc5a059, 0.5).strokeRoundedRect(cx - 258, 212, 516, 188, 4);

  const guideTitle = scene.add.text(cx, 220, 'PERGAMINHO DE COMBATE', textStyle('#ffca28', 12.5)).setOrigin(0.5);
  const guideLines = [
    '• Mobile (Touch): Joystick Virtual analógico à esquerda para movimentação (ataque automático).',
    '• Inimigos derrotados dropam Moedas de Prata durante a expedição na floresta.',
    '• Ao encerrar a partida, suas Moedas de Prata são convertidas em Ouro Real!',
    '• Visite a Forja do Ferreiro para desbloquear e equipar novas armas de combate.',
    '• Visite o Santuário do Mago para aprimorar seus atributos permanentes.',
    '• O Escudo Sagrado reflete projéteis inimigos enquanto desfere seus ataques.'
  ];
  const guideTexts = guideLines.map((txt, i) =>
    scene.add.text(cx - 240, 240 + i * 24, txt, { ...textStyle('#d6c8aa', 10.5, 'normal'), lineSpacing: 3 })
  );

  menuContainer.add([
    audioBox, audioTitle, audioToggleBtn, audioToggleTxt, fsToggleBtn, fsToggleTxt, joyToggleBtn, joyToggleTxt,
    guideBox, guideTitle, ...guideTexts,
    ...createButton(scene, cx, 442, 'VOLTAR', () => exitSubMenu(scene), 260, 38)
  ]);
}

// -----------------------------------------------------------------------------
// TÁBULA DOS CAMPEÕES (RECORDES DE SOBREVIVÊNCIA)
// -----------------------------------------------------------------------------
function showRecordsMenu(scene) {
  if (menuContainer) menuContainer.destroy();
  const cx = GAME_WIDTH / 2;
  menuContainer = createModal(scene, 'TÁBULA DOS CAMPEÕES', 470, 'Os maiores guerreiros imortalizados pelas eras', 560);
  menuContainer.isMainMenu = false;

  const scores = getHighScores();
  const ranks = ['1º LUGAR', '2º LUGAR', '3º LUGAR', '4º LUGAR', '5º LUGAR'];
  const colors = ['#ffca28', '#e8e8e8', '#cd7f32', '#d6c8aa', '#a8987b'];

  scores.forEach((entry, i) => {
    const rowY = 145 + i * 48;
    const rowBg = scene.add.graphics();
    rowBg.fillStyle(i === 0 ? 0x2e2314 : 0x1d1611, 0.94).fillRoundedRect(cx - 235, rowY - 18, 470, 38, 5);
    rowBg.lineStyle(1.5, i === 0 ? 0xc5a059 : 0x4a3b2c).strokeRoundedRect(cx - 235, rowY - 18, 470, 38, 5);

    // Medalha / Ícone do Rank
    const rankTxt = scene.add.text(cx - 215, rowY, ranks[i], textStyle(colors[i], 12)).setOrigin(0, 0.5);
    const nameTxt = scene.add.text(cx - 30, rowY, entry.name, textStyle('#ffffff', 17)).setOrigin(0.5);
    const scoreTxt = scene.add.text(cx + 215, rowY, `${entry.score}s de glória`, textStyle(colors[i], 13.5)).setOrigin(1, 0.5);

    menuContainer.add([rowBg, rankTxt, nameTxt, scoreTxt]);
  });

  menuContainer.add(createButton(scene, cx, 436, 'VOLTAR', () => exitSubMenu(scene), 260, 40));
}

// -----------------------------------------------------------------------------
// TÁBULA DE CONQUISTAS DO REINO (DESBLOQUEIO DE FEITOS & OURO)
// -----------------------------------------------------------------------------
function showAchievementsMenu(scene) {
  if (!scene) return;
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.gameplayStop();
  gameState = 'MENU';
  scene.time.paused = false;
  scene.time.timeScale = 1;
  scene.tweens.resumeAll();

  if (menuContainer) menuContainer.destroy();
  sound.startMenuBGM();

  menuContainer = createModal(
    scene,
    'TÁBULA DE CONQUISTAS DO REINO',
    490,
    'Complete façanhas heróicas de combate para desbloquear Ouro e glória eterna',
    820
  );
  menuContainer.isMainMenu = false;

  // Botão Rápido "✕ SAIR [ESC]" no canto superior direito do modal
  const closeQuickBtn = scene.add.rectangle(850, 48, 78, 28, 0x5c241b)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(850, 48, '✕ SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);
  closeQuickBtn.on('pointerover', () => closeQuickBtn.setFillStyle(0x8e2a1b));
  closeQuickBtn.on('pointerout', () => closeQuickBtn.setFillStyle(0x5c241b));
  closeQuickBtn.on('pointerdown', () => exitSubMenu(scene));
  menuContainer.add([closeQuickBtn, closeQuickTxt]);

  const achData = getAchievementsData();
  const totalCount = ACHIEVEMENTS_CATALOG.length;
  const unlockedCount = ACHIEVEMENTS_CATALOG.filter(a => achData.unlocked[a.id]).length;

  // 1. BARRA DE RESUMO SUPERIOR (CONQUISTAS TOTAIS + OURO)
  const summaryBox = scene.add.graphics();
  summaryBox.fillStyle(0x221a13, 0.96).fillRoundedRect(80, 84, 450, 46, 7);
  summaryBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(80, 84, 450, 46, 7);

  const crownIcon = scene.add.image(108, 107, 'hud_crown').setScale(1.1);
  const progTxt = scene.add.text(134, 98, `CONQUISTAS: ${unlockedCount} / ${totalCount} DESBLOQUEADAS`, textStyle('#ffca28', 11.5));
  const subProg = scene.add.text(134, 115, 'Conquistas concedem Ouro Real instantaneamente!', textStyle('#c5a059', 9.5));

  const goldBadge = scene.add.graphics();
  goldBadge.fillStyle(0x261c12, 0.98).fillRoundedRect(540, 84, 330, 46, 7);
  goldBadge.lineStyle(2, 0xffca28).strokeRoundedRect(540, 84, 330, 46, 7);
  const coinSprite = scene.add.sprite(568, 107, 'gold_coin').play('gold_coin').setScale(1.25);
  const goldValTxt = scene.add.text(592, 107, `OURO ATUAL: ${getGold()}`, textStyle('#ffd740', 13)).setOrigin(0, 0.5);

  menuContainer.add([summaryBox, crownIcon, progTxt, subProg, goldBadge, coinSprite, goldValTxt]);

  // 2. GRADE DE 8 CONQUISTAS (2 Colunas x 4 Linhas em 16:9)
  ACHIEVEMENTS_CATALOG.forEach((ach, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cardLeft = col === 0 ? 80 : 485;
    const cardW = 385;
    const cardH = 64;
    const cardTop = 138 + row * 70;

    const isDone = Boolean(achData.unlocked[ach.id]);
    const currentVal = Math.min(ach.target, achData.stats[ach.stat] || 0);
    const pct = Phaser.Math.Clamp(currentVal / ach.target, 0, 1);

    const cardBg = scene.add.graphics();
    cardBg.fillStyle(isDone ? 0x241d14 : 0x18130e, 0.95).fillRoundedRect(cardLeft, cardTop, cardW, cardH, 7);
    cardBg.lineStyle(1.5, isDone ? 0xffca28 : 0x4a3b2c).strokeRoundedRect(cardLeft, cardTop, cardW, cardH, 7);

    const iconSlot = scene.add.graphics();
    iconSlot.fillStyle(0x100c08, 1).fillRoundedRect(cardLeft + 6, cardTop + 8, 48, 48, 5);
    iconSlot.lineStyle(1, isDone ? 0xffca28 : 0x5c4938).strokeRoundedRect(cardLeft + 6, cardTop + 8, 48, 48, 5);

    const icon = scene.add.image(cardLeft + 30, cardTop + 32, ach.icon).setScale(1.18);
    if (!isDone) icon.setTint(0x777777);

    const titleTxt = scene.add.text(cardLeft + 62, cardTop + 6, ach.title, textStyle(isDone ? '#ffca28' : '#e0d2b4', 11));
    fitTextToBox(titleTxt, cardW - 74, 16, 10);

    const descTxt = scene.add.text(cardLeft + 62, cardTop + 20, ach.desc, {
      ...textStyle('#a8987b', 9.5, 'normal'),
      wordWrap: { width: cardW - 74, useAdvancedWrap: true }
    });
    fitTextToBox(descTxt, cardW - 74, 20, 8.5);

    const barX = cardLeft + 62;
    const barY = cardTop + 42;
    const barW = cardW - 146;
    const barH = 12;

    const progBar = scene.add.graphics();
    progBar.fillStyle(0x0e0b08, 1).fillRect(barX, barY, barW, barH);
    progBar.lineStyle(1, isDone ? 0xffca28 : 0x3d3024).strokeRect(barX, barY, barW, barH);
    if (pct > 0) {
      progBar.fillStyle(isDone ? 0xffca28 : 0x7fe7ff, 1).fillRect(barX + 1, barY + 1, Math.round((barW - 2) * pct), barH - 2);
    }

    const countTxt = scene.add.text(barX + barW / 2, barY + barH / 2, `${currentVal}/${ach.target}`, textStyle('#ffffff', 9)).setOrigin(0.5);

    const rewardBadge = scene.add.rectangle(cardLeft + cardW - 36, barY + barH / 2, 62, 20, isDone ? 0x246b3d : 0x261d14)
      .setStrokeStyle(1, isDone ? 0xffca28 : 0x6e5846);
    const rewardTxt = scene.add.text(cardLeft + cardW - 36, barY + barH / 2, isDone ? '★ CONCLUÍDO' : `+${ach.rewardGold}G`, textStyle(isDone ? '#ffeb3b' : '#ffd740', 8.5)).setOrigin(0.5);
    fitTextToBox(rewardTxt, 58, 16, 8);

    menuContainer.add([cardBg, iconSlot, icon, titleTxt, descTxt, progBar, countTxt, rewardBadge, rewardTxt]);
  });

  // 3. BOTÃO DE VOLTAR NO RODAPÉ
  const backMenuBtn = createButton(scene, GAME_WIDTH / 2, 465, 'VOLTAR', () => exitSubMenu(scene), 260, 36);
  menuContainer.add([...backMenuBtn]);
}

// =============================================================================
// CONTROLE DE FLUXO DE CENAS E TRANSIÇÃO DE SUBMENUS
// =============================================================================
function restartScene(scene, autoStart = false, openShop = false, shopTab = 'mage') {
  if (pauseModal) {
    pauseModal.destroy();
    pauseModal = null;
  }
  if (menuContainer) {
    menuContainer.destroy();
    menuContainer = null;
  }
  sound.stopBGM();
  scene.physics.resume();
  scene.time.paused = false;
  scene.time.timeScale = 1;
  scene.tweens.resumeAll();
  scene.scene.restart({ autoStart, openShop, shopTab });
}

function exitSubMenu(scene) {
  if (!scene) return;
  sound.playButtonClick();
  showMainMenu(scene);
}

// -----------------------------------------------------------------------------
// MENU PRINCIPAL DE TELA COMPLETA (CAPA WIDESCREEN 16:9 — 960x540)
// -----------------------------------------------------------------------------
function showMainMenu(scene) {
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.gameplayStop();
  if (menuContainer) menuContainer.destroy();
  gameState = 'MENU';
  sound.startMenuBGM();

  menuContainer = scene.add.container(0, 0).setDepth(3000).setScrollFactor(0);
  menuContainer.isMainMenu = true;
  const art = scene.add.graphics();

  // 1. CÉU CREPUSCULAR DO REINO (Degradê de 960px em Faixas de Pixel Art Nobre)
  const skyBands = [
    [0, 50, 0x090d1c],
    [50, 45, 0x121b36],
    [95, 45, 0x1f2247],
    [140, 40, 0x38234a],
    [180, 35, 0x5e2f3d],
    [215, 30, 0x8c492b],
    [245, 30, 0xb86b35]
  ];
  skyBands.forEach(([y, h, color]) => art.fillStyle(color, 1).fillRect(0, y, 960, h));

  // Constelações e estrelas douradas
  const starCoords = [
    [65, 26], [130, 55], [195, 24], [285, 42], [370, 22], [475, 38], [560, 60],
    [750, 28], [830, 58], [910, 32], [95, 102], [175, 88], [320, 82], [520, 94], [805, 98]
  ];
  starCoords.forEach(([sx, sy], i) => {
    art.fillStyle(i % 3 === 0 ? 0xffeb3b : 0xffffff, 0.85).fillRect(sx, sy, i % 2 === 0 ? 3 : 2, i % 2 === 0 ? 3 : 2);
  });
  art.lineStyle(1, 0x7fe7ff, 0.22);
  art.lineBetween(65, 26, 130, 55);
  art.lineBetween(130, 55, 195, 24);
  art.lineBetween(195, 24, 285, 42);

  // Lua Cheia Dourada no Céu Noturno
  art.fillStyle(0xffca28, 0.10).fillCircle(710, 125, 78);
  art.fillStyle(0xffca28, 0.22).fillCircle(710, 125, 54);
  art.fillStyle(0xfff3c4, 0.96).fillCircle(710, 125, 36);
  art.fillStyle(0xf2c14e, 0.45).fillCircle(722, 116, 8).fillCircle(698, 134, 11);

  // 2. CORDILHEIRA DE MONTANHAS & CASTELO REAL AO HORIZONTE
  art.fillStyle(0x1b152b, 1);
  art.fillTriangle(-40, 265, 140, 145, 320, 265);
  art.fillTriangle(210, 265, 395, 158, 580, 265);
  art.fillTriangle(510, 265, 700, 130, 890, 265);
  art.fillTriangle(730, 265, 870, 165, 980, 265);

  art.fillStyle(0x2c2240, 1);
  art.fillTriangle(140, 145, 230, 265, 320, 265);
  art.fillTriangle(395, 158, 485, 265, 580, 265);

  // Silhueta do Castelo Real nas montanhas
  const castleX = 645, castleY = 135;
  art.fillStyle(0x120d1d, 1);
  art.fillRect(castleX, castleY + 32, 110, 65);
  art.fillRect(castleX - 12, castleY + 16, 24, 80);
  art.fillRect(castleX + 98, castleY + 16, 24, 80);
  art.fillRect(castleX + 35, castleY - 12, 40, 108);
  art.fillRect(castleX + 18, castleY + 6, 18, 90);
  art.fillRect(castleX + 74, castleY + 6, 18, 90);

  art.fillStyle(0x2f6fd6, 1);
  art.fillTriangle(castleX - 16, castleY + 16, castleX, castleY - 6, castleX + 16, castleY + 16);
  art.fillTriangle(castleX + 94, castleY + 16, castleX + 110, castleY - 6, castleX + 126, castleY + 16);
  art.fillTriangle(castleX + 30, castleY - 12, castleX + 55, castleY - 44, castleX + 80, castleY - 12);

  art.lineStyle(2, 0xc5a059, 1);
  art.lineBetween(castleX + 55, castleY - 44, castleX + 55, castleY - 58);
  art.fillStyle(0xd83a3a, 1).fillTriangle(castleX + 55, castleY - 58, castleX + 73, castleY - 53, castleX + 55, castleY - 48);

  art.fillStyle(0xffeb3b, 0.95);
  art.fillRect(castleX + 51, castleY - 2, 8, 14);
  art.fillRect(castleX + 46, castleY + 20, 6, 10);
  art.fillRect(castleX + 58, castleY + 20, 6, 10);
  art.fillRect(castleX - 3, castleY + 28, 6, 10);
  art.fillRect(castleX + 107, castleY + 28, 6, 10);
  art.fillStyle(0x3a2414, 1).fillRect(castleX + 45, castleY + 58, 20, 32);
  art.fillStyle(0xffa726, 0.7).fillRect(castleX + 49, castleY + 64, 12, 24);

  // 3. COLINAS VERDES, FLORESTA E O CAMINHO REAL SINUOSO
  art.fillStyle(0x16331a, 1).fillRect(0, 245, 960, 295);
  art.fillStyle(0x1f4724, 1);
  art.fillEllipse(240, 320, 640, 150);
  art.fillEllipse(720, 335, 600, 140);
  art.fillStyle(0x2a5c2f, 1);
  art.fillEllipse(480, 480, 1060, 270);

  // Caminho de pedra dourada sinuoso
  const roadPolys = [
    { y1: 225, y2: 268, x1L: 685, x1R: 701, x2L: 590, x2R: 622 },
    { y1: 268, y2: 328, x1L: 590, x1R: 622, x2L: 420, x2R: 475 },
    { y1: 328, y2: 412, x1L: 420, x1R: 475, x2L: 325, x2R: 420 },
    { y1: 412, y2: 540, x1L: 325, x1R: 420, x2L: 180, x2R: 510 }
  ];
  roadPolys.forEach(s => {
    art.fillStyle(0x6e5233, 1).fillPoints([
      { x: s.x1L - 5, y: s.y1 }, { x: s.x1R + 5, y: s.y1 },
      { x: s.x2R + 7, y: s.y2 }, { x: s.x2L - 7, y: s.y2 }
    ], true);
    art.fillStyle(0x9b7b4f, 1).fillPoints([
      { x: s.x1L, y: s.y1 }, { x: s.x1R, y: s.y1 },
      { x: s.x2R, y: s.y2 }, { x: s.x2L, y: s.y2 }
    ], true);
  });

  // Pedestal Rochoso Heróico (onde repousa o Cavaleiro)
  art.fillStyle(0x1f2126, 1).fillEllipse(220, 455, 210, 58);
  art.fillStyle(0x373a42, 1).fillEllipse(220, 446, 192, 48);
  art.fillStyle(0x525763, 1).fillEllipse(220, 440, 164, 36);
  art.fillStyle(0x000000, 0.45).fillEllipse(220, 436, 92, 18);

  menuContainer.add(art);

  // 4. ELEMENTOS DA VILA REAL E O CAVALEIRO HERÓICO
  const treeFar = scene.add.image(560, 275, 'tree').setScale(0.72);
  const menuHouse = scene.add.image(265, 302, 'village_house').setScale(0.88);
  const menuBlacksmith = scene.add.image(352, 310, 'village_blacksmith').setScale(0.82);
  const menuGateTower = scene.add.image(476, 298, 'village_gate_tower').setScale(0.76);
  const treeLeft = scene.add.image(72, 380, 'tree').setScale(1.2);

  const heroSprite = scene.add.image(220, 376, 'knight_banner').setScale(2.2);
  scene.tweens.add({
    targets: heroSprite,
    y: 370,
    duration: 1300,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // 5. BRASÃO DE TÍTULO NO TOPO (INSPIRAÇÃO NAS IMAGENS 1 & 3: FLOREIOS E RIBBON NOBRE)
  const headerBanner = scene.add.graphics();
  // Moldura principal com veludo real borgonha / ébano
  headerBanner.fillStyle(0x140e0a, 0.94).fillRoundedRect(130, 14, 700, 84, 12);
  headerBanner.lineStyle(3, 0x3d2b1f, 1).strokeRoundedRect(130, 14, 700, 84, 12);
  headerBanner.lineStyle(1.5, 0xc5a059, 0.95).strokeRoundedRect(134, 18, 692, 76, 10);
  headerBanner.lineStyle(1, 0x8d5524, 0.5).strokeRoundedRect(138, 22, 684, 68, 8);

  // Floreios de acanto vitoriano nas bordas do brasão (Imagem 3)
  [130, 830].forEach((fx, idx) => {
    const dir = idx === 0 ? 1 : -1;
    headerBanner.fillStyle(0xc5a059, 1);
    headerBanner.fillTriangle(fx + dir * 6, 56, fx + dir * 24, 46, fx + dir * 24, 66);
    headerBanner.fillCircle(fx + dir * 24, 56, 3);
  });

  // Rebites de ouro nos cantos do banner
  [[144, 28], [816, 28], [144, 84], [816, 84]].forEach(([rx, ry]) => {
    headerBanner.fillStyle(0xc5a059, 1).fillCircle(rx, ry, 3.5);
    headerBanner.fillStyle(0x2a1a0e, 1).fillCircle(rx, ry, 1.5);
  });

  const titleShadow = scene.add.text(482, 44, 'A JORNADA DO CAVALEIRO', {
    ...textStyle('#060403', 28), fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);
  const titleMain = scene.add.text(480, 42, 'A JORNADA DO CAVALEIRO', {
    ...textStyle('#ffca28', 28), fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);
  const subtitleTxt = scene.add.text(480, 75, '★ CRÔNICAS DE ELDÓRIA • ROGUELITE DE AÇÃO ★', textStyle('#e0c088', 11.5)).setOrigin(0.5);

  // Botões Rápidos no Canto Superior Direito: Áudio [M] e Tela Cheia [F]
  const menuSoundBg = scene.add.graphics();
  const drawMenuSound = (hover = false) => {
    menuSoundBg.clear();
    menuSoundBg.fillStyle(hover ? 0x2e241c : 0x14100c, 0.94).fillRoundedRect(844, 18, 46, 46, 8);
    menuSoundBg.lineStyle(2, hover ? 0xffca28 : 0xc5a059).strokeRoundedRect(844, 18, 46, 46, 8);
  };
  drawMenuSound(false);
  const menuHorn = scene.add.image(867, 41, 'hud_horn', sound.isMuted() ? 1 : 0);
  const menuSoundHit = scene.add.rectangle(867, 41, 46, 46, 0x000000, 0).setInteractive({ useHandCursor: true });
  menuContainer.updateMenuHorn = () => {
    if (menuHorn && menuHorn.active) menuHorn.setFrame(sound.isMuted() ? 1 : 0);
  };
  menuSoundHit.on('pointerover', () => drawMenuSound(true));
  menuSoundHit.on('pointerout', () => drawMenuSound(false));
  menuSoundHit.on('pointerdown', () => {
    sound.toggleMute();
    sound.playButtonClick();
    if (!sound.isMuted()) sound.startMenuBGM();
    menuContainer.updateMenuHorn();
    if (hudHornIcon) hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
  });

  const menuFsBg = scene.add.graphics();
  const drawMenuFs = (hover = false) => {
    menuFsBg.clear();
    menuFsBg.fillStyle(hover ? 0x2e241c : 0x14100c, 0.94).fillRoundedRect(898, 18, 46, 46, 8);
    menuFsBg.lineStyle(2, hover ? 0xffca28 : 0xc5a059).strokeRoundedRect(898, 18, 46, 46, 8);
  };
  drawMenuFs(false);
  const menuFsIcon = scene.add.image(921, 41, 'hud_fullscreen', isGameFullscreen(scene) ? 1 : 0);
  const menuFsHit = scene.add.rectangle(921, 41, 46, 46, 0x000000, 0).setInteractive({ useHandCursor: true });
  menuContainer.updateMenuFullscreen = () => {
    if (menuFsIcon && menuFsIcon.active) menuFsIcon.setFrame(isGameFullscreen(scene) ? 1 : 0);
  };
  menuFsHit.on('pointerover', () => drawMenuFs(true));
  menuFsHit.on('pointerout', () => drawMenuFs(false));
  menuFsHit.on('pointerdown', () => {
    sound.playButtonClick();
    toggleFullscreen(scene);
  });

  // 6. PAINEL DE MISSÕES & AÇÕES DA CORTE (LADO DIREITO: x: 530..910, y: 120..495)
  const menuPanel = scene.add.graphics();
  menuPanel.fillStyle(0x14100c, 0.95).fillRoundedRect(530, 120, 380, 375, 12);
  menuPanel.lineStyle(3, 0x3d2b1f, 1).strokeRoundedRect(530, 120, 380, 375, 12);
  menuPanel.lineStyle(1.5, 0xc5a059, 0.9).strokeRoundedRect(534, 124, 372, 367, 10);
  menuPanel.lineStyle(1, 0x8d5524, 0.5).strokeRoundedRect(538, 128, 364, 359, 8);

  // Rebites nos 4 cantos do painel de ações
  [[546, 136], [894, 136], [546, 479], [894, 479]].forEach(([rx, ry]) => {
    menuPanel.fillStyle(0xc5a059, 1).fillCircle(rx, ry, 3);
  });

  // Faixa de Conquistas & Tesouro no topo do painel
  const crownIcon = scene.add.image(568, 150, 'hud_crown').setScale(0.95);
  const bestBannerTxt = scene.add.text(588, 150, `RECORDE: ${getBestScore()}s`, textStyle('#ffca28', 12)).setOrigin(0, 0.5);

  const menuCoinIcon = scene.add.image(772, 150, 'gold_coin', 0).setScale(1.2);
  const menuGoldTxt = scene.add.text(794, 150, `OURO: ${getGold()}`, textStyle('#ffd740', 12.5)).setOrigin(0, 0.5);

  menuPanel.lineStyle(1, 0xc5a059, 0.45).lineBetween(554, 172, 886, 172);

  const clearMenuKeys = () => {
    scene.input.keyboard.off('keydown-SPACE', onKeyStart);
    scene.input.keyboard.off('keydown-ENTER', onKeyStart);
  };

  const launchGame = () => {
    clearMenuKeys();
    sound.ensureContext();
    menuContainer.destroy();
    menuContainer = null;
    startGameplay(scene);
  };

  // Botões do Painel de Ações
  const startBtn = createButton(scene, 720, 206, '⚔ COMEÇAR JORNADA', launchGame, 330, 42);
  const blacksmithBtn = createButton(scene, 720, 256, '⚒ FORJA DO FERREIRO', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showBlacksmithMenu(scene);
  }, 330, 38);
  const mageBtn = createButton(scene, 720, 304, '🔮 SANTUÁRIO DO MAGO', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showMageShopMenu(scene);
  }, 330, 38);
  const achBtn = createButton(scene, 720, 352, '🏆 CONQUISTAS DO REINO', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showAchievementsMenu(scene);
  }, 330, 38);

  const recordsBtn = createButton(scene, 634, 400, 'RECORDES', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showRecordsMenu(scene);
  }, 156, 36);
  const settingsBtn = createButton(scene, 806, 400, 'AJUSTES', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showSettingsMenu(scene);
  }, 156, 36);

  const startHint = scene.add.text(720, 448, 'Pressione [ESPAÇO] ou [ENTER] para iniciar', textStyle('#c5a059', 11)).setOrigin(0.5);

  // 7. FAIXA DE RODAPÉ (LARGURA TOTAL 960px)
  const footerBg = scene.add.rectangle(480, 526, 960, 28, 0x0c0907, 0.94);
  const footerLine = scene.add.graphics().lineStyle(1.5, 0x8d5524, 0.9).lineBetween(0, 512, 960, 512);
  const footerTxt = scene.add.text(320, 526, 'Mover: WASD/Setas  |  Pausar: P ou ESC  |  Áudio: M  |  Tela Cheia: F', textStyle('#d6c8aa', 10.5)).setOrigin(0.5);
  const versionTxt = scene.add.text(820, 526, `${GAME_VERSION} Ateliê do Reino`, textStyle('#c5a059', 10.5)).setOrigin(0.5);

  menuContainer.add([
    treeFar, menuHouse, menuBlacksmith, menuGateTower,
    treeLeft, heroSprite,
    headerBanner, titleShadow, titleMain, subtitleTxt,
    menuSoundBg, menuHorn, menuSoundHit,
    menuFsBg, menuFsIcon, menuFsHit,
    menuPanel, crownIcon, bestBannerTxt, menuCoinIcon, menuGoldTxt,
    ...startBtn, ...blacksmithBtn, ...mageBtn, ...achBtn, ...recordsBtn, ...settingsBtn, startHint,
    footerBg, footerLine, footerTxt, versionTxt
  ]);

  function onKeyStart(e) {
    if (gameState !== 'MENU') return;
    if (e.code === 'Space' || e.code === 'Enter') {
      sound.playButtonClick();
      launchGame();
    }
  }
  scene.input.keyboard.once('keydown-SPACE', onKeyStart);
  scene.input.keyboard.once('keydown-ENTER', onKeyStart);
}

// =============================================================================
// A FORJA DO FERREIRO REAL (DESBLOQUEIO DE ARMAS & ARSENAL DE COMBATE)
// DESIGN: CENÁRIO COMPLETO COM MESTRE ANVILGAR ATRÁS DO BALCÃO, LAREIRA E 5 CARTAS
// INSPIRAÇÃO: CUPHEAD SHOP (IMG 2), UI KIT (IMG 1 & 3) & WITCH/CAT SHOP (IMG 4)
// =============================================================================
function showBlacksmithMenu(scene) {
  if (!scene) return;
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.gameplayStop();
  gameState = 'MENU';
  scene.time.paused = false;
  scene.time.timeScale = 1;
  scene.tweens.resumeAll();

  if (menuContainer) menuContainer.destroy();
  sound.startMenuBGM();

  menuContainer = scene.add.container(0, 0).setDepth(3000).setScrollFactor(0);
  menuContainer.isMainMenu = false;

  // 1. CENÁRIO DA FORJA: PAREDE DE PEDRA, LAREIRA FLAMEJANTE E SUPORTES DE ARMAS
  const forgeArt = scene.add.graphics();

  // Parede de alvenaria e fuligem
  forgeArt.fillStyle(0x1a120c, 1).fillRect(0, 0, 960, 240);
  for (let by = 0; by < 240; by += 28) {
    forgeArt.fillStyle(0x241810, 0.4).fillRect(0, by, 960, 2);
  }

  // Lareira / Fornalha de pedra à esquerda (x: 40..170, y: 55..205)
  forgeArt.fillStyle(0x2a1a12, 1).fillRoundedRect(40, 55, 130, 150, 10);
  forgeArt.lineStyle(2, 0x4a2c1b).strokeRoundedRect(40, 55, 130, 150, 10);
  // Boca da fornalha em brasa
  forgeArt.fillStyle(0x0e0604, 1).fillRoundedRect(55, 100, 100, 100, 8);
  forgeArt.fillStyle(0xd84315, 0.9).fillCircle(105, 160, 36);
  forgeArt.fillStyle(0xff6d00, 0.95).fillCircle(105, 168, 25);
  forgeArt.fillStyle(0xffd54f, 1).fillCircle(105, 174, 14);

  // Chaminé de ferro subindo
  forgeArt.fillStyle(0x1a1512, 1).fillRect(85, 0, 40, 55);
  forgeArt.lineStyle(1.5, 0x3d2b1f).strokeRect(85, 0, 40, 55);

  // Racks de armas na parede traseira à direita (x: 640..920, y: 65..185)
  forgeArt.fillStyle(0x2e1c14, 0.95).fillRoundedRect(640, 68, 280, 115, 8);
  forgeArt.lineStyle(2, 0x5c3722).strokeRoundedRect(640, 68, 280, 115, 8);
  forgeArt.lineStyle(1, 0xc5a059, 0.5).strokeRoundedRect(644, 72, 272, 107, 6);

  // Silhuetas de espadas, machados e escudos pendurados no suporte
  forgeArt.fillStyle(0x78909c, 0.85);
  forgeArt.fillRect(665, 82, 6, 75); // Lâmina de espada
  forgeArt.fillRect(655, 120, 26, 6); // Guarda
  forgeArt.fillStyle(0x5c3722, 1).fillRect(666, 126, 4, 18); // Empunhadura

  // Escudo redondo viking hung
  forgeArt.fillStyle(0x546e7a, 0.9).fillCircle(755, 125, 28);
  forgeArt.lineStyle(2, 0xc5a059).strokeCircle(755, 125, 28);
  forgeArt.fillStyle(0xffca28, 1).fillCircle(755, 125, 8);

  // Machado duplo de batalha
  forgeArt.fillStyle(0x455a64, 0.9);
  forgeArt.fillTriangle(840, 85, 815, 115, 840, 115);
  forgeArt.fillTriangle(840, 85, 865, 115, 840, 115);
  forgeArt.fillStyle(0x5c3722, 1).fillRect(838, 95, 4, 70);

  // Correntes de ferro penduradas no teto
  forgeArt.lineStyle(2, 0x455a64, 0.7);
  forgeArt.lineBetween(400, 0, 400, 40);
  forgeArt.lineBetween(560, 0, 560, 40);

  // 2. O MESTRE FERREIRO ANVILGAR ATRÁS DO BALCÃO
  const blacksmithSprite = scene.add.sprite(225, 142, 'blacksmith_master')
    .play('blacksmith_master')
    .setScale(2.2);

  scene.tweens.add({
    targets: blacksmithSprite,
    y: 138,
    duration: 900,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // Balão de Diálogo de Pergaminho do Vendedor (Imagem 1 & 4)
  const speechBubble = scene.add.graphics();
  const drawSpeechBubble = () => {
    speechBubble.clear();
    // Corpo do balão de pergaminho nobre
    speechBubble.fillStyle(0xf5ebd6, 0.98).fillRoundedRect(310, 82, 310, 96, 10);
    speechBubble.lineStyle(2, 0x6d4c2a).strokeRoundedRect(310, 82, 310, 96, 10);
    speechBubble.lineStyle(1, 0xc5a059, 0.7).strokeRoundedRect(313, 85, 304, 90, 8);

    // Ponta do balão apontando para o Ferreiro
    speechBubble.fillStyle(0xf5ebd6, 1).fillTriangle(310, 130, 286, 138, 310, 146);
    speechBubble.lineStyle(2, 0x6d4c2a).lineBetween(310, 130, 286, 138);
    speechBubble.lineStyle(2, 0x6d4c2a).lineBetween(286, 138, 310, 146);
  };
  drawSpeechBubble();

  const smithTitleTxt = scene.add.text(326, 92, 'MESTRE ANVILGAR (FERREIRO REAL)', textStyle('#5c3722', 11, 'bold'));
  const smithSpeechTxt = scene.add.text(326, 110, '“O fogo forja o aço! Escolha seu armamento para a batalha.”', {
    ...textStyle('#2c1b10', 10.5, 'normal'),
    lineSpacing: 3,
    wordWrap: { width: 280, useAdvancedWrap: true }
  });

  // 3. O BALCÃO DE CARVALHO PESADO (ATRAVESSA DE PONTA A PONTA: y: 195..248)
  const counterArt = scene.add.graphics();
  // Viga maciça de carvalho envelhecido
  counterArt.fillStyle(0x3a2215, 1).fillRect(0, 196, 960, 52);
  // Brilho de madeira polida no topo do balcão
  counterArt.fillStyle(0x6e3d22, 1).fillRect(0, 196, 960, 6);
  counterArt.lineStyle(2, 0x1f1109).strokeRect(0, 196, 960, 52);

  // Textura de veios e emendas de madeira
  counterArt.fillStyle(0x28160c, 0.6);
  [160, 340, 520, 700, 880].forEach(sx => counterArt.fillRect(sx, 202, 2, 46));

  // Rebites e cantoneiras de ferro na borda do balcão
  for (let rx = 20; rx < 960; rx += 70) {
    counterArt.fillStyle(0x1a120c, 1).fillCircle(rx, 204, 3.5);
    counterArt.fillStyle(0xc5a059, 1).fillCircle(rx, 204, 2);
  }

  // Itens em cima do Balcão: Bigorna pesada com ferro em brasa à esquerda
  counterArt.fillStyle(0x263238, 1).fillRect(72, 178, 38, 20); // Base da bigorna
  counterArt.fillRect(64, 168, 54, 12); // Tampo
  counterArt.fillTriangle(64, 168, 50, 172, 64, 176); // Chifre da bigorna
  // Peça de ferro quente saindo da brasa com tenaz
  counterArt.fillStyle(0xff5722, 1).fillRect(78, 164, 16, 5);
  counterArt.fillStyle(0xffeb3b, 1).fillRect(80, 165, 8, 3);
  counterArt.fillStyle(0x455a64, 1).fillRect(94, 162, 22, 3); // Tenaz

  // Pilha de moedas de ouro sobre um veludo bordô à direita
  counterArt.fillStyle(0x5c1818, 0.95).fillRoundedRect(720, 190, 55, 8, 3);
  counterArt.fillStyle(0xffca28, 1).fillCircle(732, 189, 4).fillCircle(742, 189, 4).fillCircle(737, 186, 4);

  // 4. PLACA DE MADEIRA PENDURADA NO TOPO (TÍTULO DA LOJA — IMAGEM 4)
  const signGfx = scene.add.graphics();
  // Correntes de suspensão
  signGfx.lineStyle(2, 0x455a64, 1);
  signGfx.lineBetween(380, 0, 380, 24);
  signGfx.lineBetween(580, 0, 580, 24);
  // Placa esculpida
  signGfx.fillStyle(0x2a170e, 0.96).fillRoundedRect(340, 16, 280, 44, 8);
  signGfx.lineStyle(2.5, 0x8d5524).strokeRoundedRect(340, 16, 280, 44, 8);
  signGfx.lineStyle(1.2, 0xc5a059).strokeRoundedRect(344, 20, 272, 36, 6);
  // Rebites
  signGfx.fillStyle(0xc5a059, 1).fillCircle(352, 28, 2.5).fillCircle(608, 28, 2.5);

  const signTitle = scene.add.text(480, 38, '⚔ A FORJA REAL ⚔', {
    ...textStyle('#ffca28', 16), fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);

  // 5. ABAS DE NAVEGAÇÃO ENTRE LOJAS NO TOPO ESQUERDO (IMAGEM 4)
  const forgeTabBtn = scene.add.rectangle(85, 28, 110, 28, 0x8d5524)
    .setStrokeStyle(1.5, 0xffca28);
  const forgeTabTxt = scene.add.text(85, 28, '⚔ FORJA REAL', textStyle('#ffffff', 10.5)).setOrigin(0.5);

  const mageTabBtn = scene.add.rectangle(205, 28, 110, 28, 0x22132e)
    .setStrokeStyle(1.5, 0x7c4dff)
    .setInteractive({ useHandCursor: true });
  const mageTabTxt = scene.add.text(205, 28, '🔮 SANTUÁRIO', textStyle('#ce93d8', 10.5)).setOrigin(0.5);

  mageTabBtn.on('pointerover', () => {
    mageTabBtn.setFillStyle(0x3e1f57);
    mageTabTxt.setColor('#ffeb3b');
  });
  mageTabBtn.on('pointerout', () => {
    mageTabBtn.setFillStyle(0x22132e);
    mageTabTxt.setColor('#ce93d8');
  });
  mageTabBtn.on('pointerdown', () => {
    sound.playButtonClick();
    showMageShopMenu(scene);
  });

  // 6. PAINEL DE OURO DO JOGADOR NO TOPO DIREITO
  const goldPouchGfx = scene.add.graphics();
  goldPouchGfx.fillStyle(0x1e150f, 0.96).fillRoundedRect(720, 16, 130, 32, 6);
  goldPouchGfx.lineStyle(2, 0xffca28).strokeRoundedRect(720, 16, 130, 32, 6);
  const coinSprite = scene.add.sprite(738, 32, 'gold_coin').play('gold_coin').setScale(1.2);
  const goldValTxt = scene.add.text(758, 32, `${getGold()}G`, textStyle('#ffd740', 13)).setOrigin(0, 0.5);

  // Botão Sair [ESC]
  const closeQuickBtn = scene.add.rectangle(905, 32, 70, 30, 0x5c241b)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(905, 32, '✕ SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);
  closeQuickBtn.on('pointerover', () => closeQuickBtn.setFillStyle(0x8e2a1b));
  closeQuickBtn.on('pointerout', () => closeQuickBtn.setFillStyle(0x5c241b));
  closeQuickBtn.on('pointerdown', () => exitSubMenu(scene));

  menuContainer.add([
    forgeArt, blacksmithSprite, speechBubble, smithTitleTxt, smithSpeechTxt,
    counterArt, signGfx, signTitle,
    forgeTabBtn, forgeTabTxt, mageTabBtn, mageTabTxt,
    goldPouchGfx, coinSprite, goldValTxt,
    closeQuickBtn, closeQuickTxt
  ]);

  // 7. SHOWCASE DAS 5 ARMAS: CARTAS DE PERGAMINHO PREGADAS NA FRENTE DO BALCÃO
  const upgrades = getUpgrades();
  const weaponKeys = ['bow', 'sword', 'shield', 'axe', 'firestaff'];
  const weaponArchetypes = {
    bow: 'DISPARO LONGO',
    sword: 'CORTE FRONTAL',
    shield: 'DEFESA SAGRADA',
    axe: 'GIRO 360°',
    firestaff: 'IMPACTO EM ÁREA'
  };
  const weaponStyles = {
    bow: 'Disparos rápidos à distância (ideal para arqueiros e magos).',
    sword: 'Corte frontal potente em arco com alto knockback e rastro reluzente.',
    shield: 'Aura defensiva sagrada que bloqueia e reflete projéteis inimigos.',
    axe: 'Corte giratório duplo devastador que atinge múltiplos inimigos em 360°.',
    firestaff: 'Projéteis arcanos explosivos com dano em área e alta potência de impacto.'
  };
  const weaponDialogues = {
    bow: '“O Arco Real dos patrulheiros! Disparos rápidos e certeiros para abater alvos à distância.”',
    sword: '“A lendária Espada de Aço! Corte frontal amplo com rastro reluzente que afasta qualquer monstro.”',
    shield: '“O Escudo Sagrado da guarda real! Uma barreira celestial que repele e reflete projéteis inimigos!”',
    axe: '“O Machado de Batalha de dois gumes! Um giro devastador em 360 graus que tritura hordas inteiras!”',
    firestaff: '“O Cajado das Chamas vulcânicas! Conjurado no coração do fogo, causa estrondos e dano em área!”'
  };

  const cardW = 168;
  const cardH = 266;
  const startY = 250;
  const cardLefts = [28, 212, 396, 580, 764];

  weaponKeys.forEach((key, idx) => {
    const cfg = WEAPON_CATALOG[key];
    if (!cfg) return;
    const isUnlocked = Boolean(upgrades[key]?.unlocked);
    const isStarter = upgrades.starterWeapon === key;

    const left = cardLefts[idx];
    const cx = left + cardW / 2;

    const cardGfx = scene.add.graphics();
    const drawCard = (hover = false) => {
      cardGfx.clear();
      // Prego / rebite de ferro no topo da carta prendendo-a ao balcão
      cardGfx.fillStyle(0x000000, 0.4).fillCircle(cx, startY + 5, 4);
      cardGfx.fillStyle(0xc5a059, 1).fillCircle(cx, startY + 4, 3);
      cardGfx.fillStyle(0x2a1a0e, 1).fillCircle(cx, startY + 4, 1.2);

      // Corpo de pergaminho da carta (Imagem 1 & 4)
      cardGfx.fillStyle(hover ? 0xfff8e7 : (isStarter ? 0xfff3cf : 0xf2e4c9), 0.98)
        .fillRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
      // Moldura externa
      cardGfx.lineStyle(2, hover ? 0xffca28 : (isStarter ? 0xffc107 : (isUnlocked ? 0x8d5524 : 0x5c4233)))
        .strokeRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
      // Filete interno decorativo
      cardGfx.lineStyle(1, hover ? 0xffd54f : (isStarter ? 0xffca28 : 0xb89569), 0.7)
        .strokeRoundedRect(left + 3, startY + 11, cardW - 6, cardH - 14, 6);

      // Rebites nos 4 cantos da carta
      const corners = [
        [left + 8, startY + 16],
        [left + cardW - 8, startY + 16],
        [left + 8, startY + cardH - 8],
        [left + cardW - 8, startY + cardH - 8]
      ];
      corners.forEach(([rx, ry]) => {
        cardGfx.fillStyle(0xc5a059, 0.8).fillCircle(rx, ry, 1.8);
      });

      // Alvéolo circular de relíquia / arma (Medalhão Image 1)
      const socketY = startY + 54;
      cardGfx.fillStyle(0x18120c, 1).fillCircle(cx, socketY, 26);
      cardGfx.lineStyle(2, hover ? 0xffeb3b : (isStarter ? 0xffd740 : (isUnlocked ? 0xc5a059 : 0x6e5233)))
        .strokeCircle(cx, socketY, 26);
      cardGfx.lineStyle(1, 0x8d5524, 0.6).strokeCircle(cx, socketY, 23);

      // 4 Entalhes ornamentais nas bordas do círculo
      cardGfx.fillStyle(0xc5a059, 1);
      cardGfx.fillRect(cx - 1.5, socketY - 29, 3, 4);
      cardGfx.fillRect(cx - 1.5, socketY + 25, 3, 4);
      cardGfx.fillRect(cx - 29, socketY - 1.5, 4, 3);
      cardGfx.fillRect(cx + 25, socketY - 1.5, 4, 3);
    };
    drawCard(false);

    // Ícone da Arma no centro do alvéolo circular
    const icon = scene.add.image(cx, startY + 54, cfg.icon).setScale(1.4);
    if (!isUnlocked) icon.setTint(0x555555);

    // Nome da Arma em tipografia nobre
    const nameTxt = scene.add.text(cx, startY + 92, cfg.name, {
      ...textStyle(isStarter ? '#794b02' : (isUnlocked ? '#2c1b10' : '#6b5443'), 12),
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);
    fitTextToBox(nameTxt, cardW - 16, 18, 9.5);

    // Badge do Arquétipo de Combate
    const badgeBg = scene.add.rectangle(cx, startY + 114, cardW - 24, 18, isStarter ? 0x2e5c26 : (isUnlocked ? 0x3d2919 : 0x221a14))
      .setStrokeStyle(1, isStarter ? 0x76ff03 : (isUnlocked ? 0xc5a059 : 0x6e5233));
    const badgeTxt = scene.add.text(cx, startY + 114, weaponArchetypes[key] || 'ARMA REAL', textStyle(isStarter ? '#b9f6ca' : (isUnlocked ? '#ffe082' : '#a8987b'), 9)).setOrigin(0.5);

    // Descrição e lore de combate
    const descStr = weaponStyles[key] || cfg.forgeLore || '';
    const descTxt = scene.add.text(cx, startY + 164, descStr, {
      ...textStyle('#3d2817', 9.5, 'normal'),
      align: 'center',
      lineSpacing: 2.5,
      wordWrap: { width: cardW - 20, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(descTxt, cardW - 18, 76, 8.5);

    // Botão de Ação no Rodapé da Carta
    const btnX = cx, btnY = startY + cardH - 26, btnW = cardW - 20, btnH = 34;
    let actionBtn, actionTxt;

    if (!isUnlocked) {
      const cost = cfg.unlockCost || 25;
      const canAfford = getGold() >= cost;

      actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, canAfford ? 0x246b3d : 0x3b2c22)
        .setStrokeStyle(2, canAfford ? 0xffca28 : 0x6e5846)
        .setInteractive({ useHandCursor: true });
      actionTxt = scene.add.text(btnX, btnY, `FORJAR (${cost}G)`, textStyle(canAfford ? '#ffffff' : '#8c7b6b', 10.5)).setOrigin(0.5);
      fitTextToBox(actionTxt, btnW - 8, btnH - 6, 8.5);

      actionBtn.on('pointerdown', () => {
        if (getGold() < cost) {
          sound.playShieldBlock();
          floatText(scene, btnX, btnY - 20, 'OURO INSUFICIENTE!', '#ff5252');
          return;
        }
        addGold(-cost);
        const curr = getUpgrades();
        curr[key].unlocked = true;
        curr.starterWeapon = key;
        saveUpgrades(curr);
        sound.playItemCollect();
        sound.playCoin();
        showBlacksmithMenu(scene);
        floatText(scene, btnX, btnY - 24, `${cfg.name} FORJADA!`, '#ffd740');
      });
    } else {
      actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, isStarter ? 0x1f4724 : 0x543217)
        .setStrokeStyle(2, isStarter ? 0xffca28 : 0xc5a059)
        .setInteractive({ useHandCursor: true });
      actionTxt = scene.add.text(btnX, btnY, isStarter ? '★ EM USO' : 'EQUIPAR', textStyle(isStarter ? '#ffd740' : '#ffffff', 10.5)).setOrigin(0.5);
      fitTextToBox(actionTxt, btnW - 8, btnH - 6, 8.5);

      actionBtn.on('pointerdown', () => {
        sound.playButtonClick();
        const curr = getUpgrades();
        curr.starterWeapon = key;
        saveUpgrades(curr);
        showBlacksmithMenu(scene);
        floatText(scene, btnX, btnY - 24, `${cfg.name} SERÁ SUA INICIAL!`, '#7fe7ff');
      });
    }

    // Zona Interativa da Carta Inteira (Atualiza o Diálogo do Ferreiro ao passar o mouse!)
    const cardHit = scene.add.rectangle(cx, startY + cardH / 2, cardW, cardH, 0x000000, 0)
      .setInteractive({ useHandCursor: true });

    cardHit.on('pointerover', () => {
      drawCard(true);
      smithSpeechTxt.setText(weaponDialogues[key] || '“Excelente escolha, guerreiro!”');
    });
    cardHit.on('pointerout', () => {
      drawCard(false);
      smithSpeechTxt.setText('“O fogo forja o aço! Escolha seu armamento para a batalha.”');
    });

    menuContainer.add([cardGfx, icon, nameTxt, badgeBg, badgeTxt, descTxt, actionBtn, actionTxt, cardHit]);
  });

  // 8. TECLA DE ATALHO ESC PARA SAÍDA RÁPIDA
  const onEsc = (e) => {
    if (e.key === 'Escape') {
      scene.input.keyboard.off('keydown', onEsc);
      exitSubMenu(scene);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      scene.input.keyboard.off('keydown', onEsc);
      showMageShopMenu(scene);
    }
  };
  scene.input.keyboard.on('keydown', onEsc);
  menuContainer.on('destroy', () => scene.input.keyboard.off('keydown', onEsc));
}

// =============================================================================
// O SANTUÁRIO DO MAGO ALQUIMISTA (UPGRADES PERMANENTES DE STATUS)
// DESIGN: CENÁRIO COMPLETO COM ARQUIMAGO ATRÁS DO BALCÃO, GRIMÓRIO ABERTO E 4 POÇÕES
// INSPIRAÇÃO: WITCH SHOP (IMG 4), UI KIT (IMG 1 & 3) & CUPHEAD (IMG 2)
// =============================================================================
function showMageShopMenu(scene) {
  if (!scene) return;
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.gameplayStop();
  gameState = 'MENU';
  scene.time.paused = false;
  scene.time.timeScale = 1;
  scene.tweens.resumeAll();

  if (menuContainer) menuContainer.destroy();
  sound.startMenuBGM();

  menuContainer = scene.add.container(0, 0).setDepth(3000).setScrollFactor(0);
  menuContainer.isMainMenu = false;

  // 1. CENÁRIO DO SANTUÁRIO: PAREDE OBSIDIANA, RUNAS MÍSTICAS & PRATELEIRAS ALQUÍMICAS
  const sanctumArt = scene.add.graphics();
  // Parede de pedra mística escura
  sanctumArt.fillStyle(0x0f0c1c, 1).fillRect(0, 0, 960, 240);
  for (let by = 0; by < 240; by += 28) {
    sanctumArt.fillStyle(0x1a152e, 0.45).fillRect(0, by, 960, 2);
  }

  // Runas arcanas gravadas na parede com aura de brilho (ciano & violeta)
  sanctumArt.lineStyle(2, 0x7c4dff, 0.45);
  sanctumArt.strokeCircle(105, 120, 32);
  sanctumArt.lineBetween(105, 88, 105, 152);
  sanctumArt.lineBetween(73, 120, 137, 120);
  sanctumArt.strokeRect(93, 108, 24, 24);

  // Prateleiras de boticário na parede à direita (x: 640..920, y: 55..185)
  sanctumArt.fillStyle(0x22132e, 0.96).fillRoundedRect(640, 58, 280, 125, 8);
  sanctumArt.lineStyle(2, 0x6a1b9a).strokeRoundedRect(640, 58, 280, 125, 8);
  sanctumArt.lineStyle(1, 0xba68c8, 0.5).strokeRoundedRect(644, 62, 272, 117, 6);

  // Prateleiras horizontais com frascos e grimórios coloridos
  sanctumArt.fillStyle(0x3e1f57, 1).fillRect(650, 105, 260, 6);
  sanctumArt.fillRect(650, 150, 260, 6);

  // Frascos de poção rubi, esmeralda e safira nas prateleiras
  const bottleColors = [0xe91e63, 0x00e676, 0x00e5ff, 0xffd600, 0x9c27b0, 0xff5722];
  bottleColors.forEach((col, bIdx) => {
    const bx = 665 + bIdx * 42;
    sanctumArt.fillStyle(col, 0.9).fillCircle(bx, 95, 8);
    sanctumArt.fillStyle(0xffffff, 0.6).fillRect(bx - 2, 82, 4, 7);
  });
  // Livros encadernados na prateleira inferior
  sanctumArt.fillStyle(0x4a148c, 1).fillRect(665, 120, 12, 30);
  sanctumArt.fillStyle(0x006064, 1).fillRect(682, 116, 14, 34);
  sanctumArt.fillStyle(0xb71c1c, 1).fillRect(701, 122, 12, 28);
  sanctumArt.fillStyle(0xe65100, 1).fillRect(718, 118, 14, 32);

  // Esferas de mana flutuando no ar com brilho
  sanctumArt.fillStyle(0x00e5ff, 0.25).fillCircle(500, 100, 14);
  sanctumArt.fillStyle(0x00e5ff, 0.85).fillCircle(500, 100, 5);
  sanctumArt.fillStyle(0xe040fb, 0.25).fillCircle(430, 70, 12);
  sanctumArt.fillStyle(0xe040fb, 0.85).fillCircle(430, 70, 4);

  // 2. O ARQUIMAGO ALQUIMISTA ATRÁS DO BALCÃO
  const mageSprite = scene.add.sprite(225, 142, 'mage_master')
    .play('mage_master')
    .setScale(2.2);

  scene.tweens.add({
    targets: mageSprite,
    y: 138,
    duration: 1100,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // Balão de Diálogo de Pergaminho Místico (Imagem 1 & 4)
  const speechBubble = scene.add.graphics();
  const drawSpeechBubble = () => {
    speechBubble.clear();
    // Pergaminho místico com borda violeta / ouro
    speechBubble.fillStyle(0xf5ebd6, 0.98).fillRoundedRect(310, 82, 310, 96, 10);
    speechBubble.lineStyle(2, 0x6a1b9a).strokeRoundedRect(310, 82, 310, 96, 10);
    speechBubble.lineStyle(1, 0xc5a059, 0.7).strokeRoundedRect(313, 85, 304, 90, 8);

    // Ponta do balão apontando para o Mago
    speechBubble.fillStyle(0xf5ebd6, 1).fillTriangle(310, 130, 286, 138, 310, 146);
    speechBubble.lineStyle(2, 0x6a1b9a).lineBetween(310, 130, 286, 138);
    speechBubble.lineStyle(2, 0x6a1b9a).lineBetween(286, 138, 310, 146);
  };
  drawSpeechBubble();

  const mageTitleTxt = scene.add.text(326, 92, 'ARQUIMAGO ALQUIMISTA (MESTRE)', textStyle('#4a148c', 11, 'bold'));
  const mageSpeechTxt = scene.add.text(326, 110, '“Beba dos meus elixires e seu poder ecoará em cada batalha!”', {
    ...textStyle('#2c1b10', 10.5, 'normal'),
    lineSpacing: 3,
    wordWrap: { width: 280, useAdvancedWrap: true }
  });

  // 3. O BALCÃO DE MOGNO MÍSTICO (y: 195..248)
  const counterArt = scene.add.graphics();
  counterArt.fillStyle(0x28122e, 1).fillRect(0, 196, 960, 52);
  counterArt.fillStyle(0x562363, 1).fillRect(0, 196, 960, 6); // Brilho de mogno polido
  counterArt.lineStyle(2, 0x15071a).strokeRect(0, 196, 960, 52);

  // Runas arcanas gravadas no topo do balcão
  counterArt.lineStyle(1, 0xba68c8, 0.4);
  for (let rx = 30; rx < 960; rx += 80) {
    counterArt.fillStyle(0x7c4dff, 0.8).fillCircle(rx, 204, 2.5);
  }

  // Itens em cima do Balcão:
  // A) O GRIMÓRIO ABERTO COM RUNAS DOURADAS (Referência direta à Imagem 4!)
  counterArt.fillStyle(0x3e1818, 1).fillRect(76, 172, 48, 26); // Capa de couro
  counterArt.fillStyle(0xf5ecd0, 1).fillRoundedRect(80, 170, 20, 24, 2); // Página esquerda
  counterArt.fillStyle(0xf5ecd0, 1).fillRoundedRect(102, 170, 20, 24, 2); // Página direita
  // Runas desenhadas nas páginas
  counterArt.fillStyle(0x7c4dff, 0.8);
  counterArt.fillRect(83, 174, 14, 2); counterArt.fillRect(83, 178, 12, 2); counterArt.fillRect(83, 182, 14, 2);
  counterArt.fillRect(105, 174, 14, 2); counterArt.fillRect(105, 178, 11, 2); counterArt.fillRect(105, 182, 13, 2);

  // B) Frasco de ensaio com poção verde borbulhante e vapores
  counterArt.fillStyle(0x00e676, 0.9).fillCircle(740, 182, 10);
  counterArt.fillStyle(0xffffff, 0.7).fillRect(738, 166, 4, 10);

  // C) Almofariz e pilão com ervas trituradas
  counterArt.fillStyle(0x37474f, 1).fillCircle(805, 184, 10);
  counterArt.fillStyle(0x76ff03, 1).fillCircle(805, 183, 6);
  counterArt.fillStyle(0xb0bec5, 1).fillRect(809, 172, 4, 16);

  // 4. PLACA DE MADEIRA PENDURADA NO TOPO (TÍTULO DO SANTUÁRIO — IMAGEM 4)
  const signGfx = scene.add.graphics();
  signGfx.lineStyle(2, 0x7c4dff, 0.8);
  signGfx.lineBetween(380, 0, 380, 24);
  signGfx.lineBetween(580, 0, 580, 24);

  signGfx.fillStyle(0x22132e, 0.96).fillRoundedRect(330, 16, 300, 44, 8);
  signGfx.lineStyle(2.5, 0x6a1b9a).strokeRoundedRect(330, 16, 300, 44, 8);
  signGfx.lineStyle(1.2, 0xba68c8).strokeRoundedRect(334, 20, 292, 36, 6);
  signGfx.fillStyle(0x00e5ff, 1).fillCircle(342, 28, 2.5).fillCircle(618, 28, 2.5);

  const signTitle = scene.add.text(480, 38, '🔮 SANTUÁRIO ALQUIMISTA 🔮', {
    ...textStyle('#e1bee7', 15), fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);

  // 5. ABAS DE NAVEGAÇÃO ENTRE LOJAS NO TOPO ESQUERDO
  const forgeTabBtn = scene.add.rectangle(85, 28, 110, 28, 0x3d2215)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const forgeTabTxt = scene.add.text(85, 28, '⚔ FORJA REAL', textStyle('#e0c088', 10.5)).setOrigin(0.5);

  forgeTabBtn.on('pointerover', () => {
    forgeTabBtn.setFillStyle(0x6e3d1b);
    forgeTabTxt.setColor('#ffeb3b');
  });
  forgeTabBtn.on('pointerout', () => {
    forgeTabBtn.setFillStyle(0x3d2215);
    forgeTabTxt.setColor('#e0c088');
  });
  forgeTabBtn.on('pointerdown', () => {
    sound.playButtonClick();
    showBlacksmithMenu(scene);
  });

  const mageTabBtn = scene.add.rectangle(205, 28, 110, 28, 0x6a1b9a)
    .setStrokeStyle(1.5, 0xffca28);
  const mageTabTxt = scene.add.text(205, 28, '🔮 SANTUÁRIO', textStyle('#ffffff', 10.5)).setOrigin(0.5);

  // 6. PAINEL DE OURO DO JOGADOR NO TOPO DIREITO
  const goldPouchGfx = scene.add.graphics();
  goldPouchGfx.fillStyle(0x1e150f, 0.96).fillRoundedRect(720, 16, 130, 32, 6);
  goldPouchGfx.lineStyle(2, 0xffca28).strokeRoundedRect(720, 16, 130, 32, 6);
  const coinSprite = scene.add.sprite(738, 32, 'gold_coin').play('gold_coin').setScale(1.2);
  const goldValTxt = scene.add.text(758, 32, `${getGold()}G`, textStyle('#ffd740', 13)).setOrigin(0, 0.5);

  // Botão Sair [ESC]
  const closeQuickBtn = scene.add.rectangle(905, 32, 70, 30, 0x5c241b)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(905, 32, '✕ SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);
  closeQuickBtn.on('pointerover', () => closeQuickBtn.setFillStyle(0x8e2a1b));
  closeQuickBtn.on('pointerout', () => closeQuickBtn.setFillStyle(0x5c241b));
  closeQuickBtn.on('pointerdown', () => exitSubMenu(scene));

  menuContainer.add([
    sanctumArt, mageSprite, speechBubble, mageTitleTxt, mageSpeechTxt,
    counterArt, signGfx, signTitle,
    forgeTabBtn, forgeTabTxt, mageTabBtn, mageTabTxt,
    goldPouchGfx, coinSprite, goldValTxt,
    closeQuickBtn, closeQuickTxt
  ]);

  // 7. SHOWCASE DOS 4 STATUS: CARTAS DE PERGAMINHO MÍSTICO (x: 30, 260, 490, 720)
  const statusUpgrades = getStatusUpgrades();
  const statusKeys = ['maxHp', 'moveSpeed', 'magnet', 'wisdom'];
  const currentGold = getGold();

  const statusDialogues = {
    maxHp: '“O Elixir da Vitalidade do Titã! Cada gota fortalece seu coração para aguentar os golpes mais rudes.”',
    moveSpeed: '“A Poção de Agilidade das Brisas! Seus passos ficarão velozes como o vento entre as árvores.”',
    magnet: '“O Fluido Magnético Arcano! Atrai as moedas de prata e relíquias distantes diretamente até você.”',
    wisdom: '“A Essência da Sabedoria Ancestral! Amplia seu aprendizado acelerando a obtenção de novos níveis!”'
  };

  const cardW = 210;
  const cardH = 266;
  const startY = 250;
  const cardLefts = [30, 260, 490, 720];

  statusKeys.forEach((key, idx) => {
    const cfg = STATUS_CATALOG[key];
    if (!cfg) return;
    const maxLvl = cfg.maxLevel || 5;
    const lvl = Phaser.Math.Clamp(statusUpgrades[key] || 1, 1, maxLvl);
    const isMax = lvl >= maxLvl;

    const left = cardLefts[idx];
    const cx = left + cardW / 2;

    const cardGfx = scene.add.graphics();
    const drawCard = (hover = false) => {
      cardGfx.clear();
      // Selo de cera arcano no topo da carta
      cardGfx.fillStyle(0x000000, 0.4).fillCircle(cx, startY + 5, 5);
      cardGfx.fillStyle(isMax ? 0xffca28 : 0x7c4dff, 1).fillCircle(cx, startY + 4, 3.5);
      cardGfx.fillStyle(0xffffff, 0.8).fillCircle(cx, startY + 4, 1.2);

      // Corpo de pergaminho da carta
      cardGfx.fillStyle(hover ? 0xfff8e7 : (isMax ? 0xfff3cf : 0xf2e4c9), 0.98)
        .fillRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
      // Moldura externa mística
      cardGfx.lineStyle(2, hover ? 0xffca28 : (isMax ? 0xffc107 : 0x6a1b9a))
        .strokeRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
      // Filete interno decorativo
      cardGfx.lineStyle(1, hover ? 0xffd54f : (isMax ? 0xffca28 : 0xba68c8), 0.6)
        .strokeRoundedRect(left + 3, startY + 11, cardW - 6, cardH - 14, 6);

      // Rebites nos 4 cantos da carta
      const corners = [
        [left + 8, startY + 16],
        [left + cardW - 8, startY + 16],
        [left + 8, startY + cardH - 8],
        [left + cardW - 8, startY + cardH - 8]
      ];
      corners.forEach(([rx, ry]) => {
        cardGfx.fillStyle(0x7c4dff, 0.8).fillCircle(rx, ry, 1.8);
      });

      // Alvéolo circular da Poção Mística
      const socketY = startY + 54;
      cardGfx.fillStyle(0x160f26, 1).fillCircle(cx, socketY, 26);
      cardGfx.lineStyle(2, hover ? 0xffeb3b : (isMax ? 0xffd740 : (cfg.potionColor || 0xba68c8)))
        .strokeCircle(cx, socketY, 26);
      cardGfx.lineStyle(1, 0x7c4dff, 0.6).strokeCircle(cx, socketY, 23);

      // 4 Entalhes arcanos nas bordas do círculo
      cardGfx.fillStyle(0xba68c8, 1);
      cardGfx.fillRect(cx - 1.5, socketY - 29, 3, 4);
      cardGfx.fillRect(cx - 1.5, socketY + 25, 3, 4);
      cardGfx.fillRect(cx - 29, socketY - 1.5, 4, 3);
      cardGfx.fillRect(cx + 25, socketY - 1.5, 4, 3);

      // Gemas / Pips de Nível (1 a 5)
      const pipsW = maxLvl * 16;
      const pipsStartX = cx - pipsW / 2 + 4;
      for (let p = 0; p < maxLvl; p++) {
        const px = pipsStartX + p * 16;
        const activePip = p < lvl;
        cardGfx.fillStyle(activePip ? 0x00e5ff : 0x2e1c3b, 1).fillRect(px, startY + 114, 11, 8);
        cardGfx.lineStyle(1, activePip ? 0xffffff : 0x5c3b70).strokeRect(px, startY + 114, 11, 8);
      }
    };
    drawCard(false);

    // Ícone da Poção
    const icon = scene.add.image(cx, startY + 54, cfg.icon).setScale(1.4);

    // Nome do Status
    const nameTxt = scene.add.text(cx, startY + 92, cfg.name, {
      ...textStyle(isMax ? '#794b02' : '#2c1b10', 12),
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);
    fitTextToBox(nameTxt, cardW - 16, 18, 9.5);

    // Nível Textual
    const lvlBadgeTxt = scene.add.text(cx, startY + 132, isMax ? 'PODER MÁXIMO ★' : `NÍVEL ${lvl} / ${maxLvl}`, textStyle(isMax ? '#e65100' : '#4a148c', 9.5)).setOrigin(0.5);

    // Descrições de Nível
    const levelDescs = cfg.levels || [];
    const descStr = isMax
      ? `★ Efeito Completo:
${levelDescs[lvl - 1] || ''}`
      : `Atual: ${levelDescs[lvl - 1] || ''}
Próximo: ${levelDescs[lvl] || ''}`;
    const descTxt = scene.add.text(cx, startY + 172, descStr, {
      ...textStyle('#3d2817', 9.5, 'normal'),
      align: 'center',
      lineSpacing: 3,
      wordWrap: { width: cardW - 20, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(descTxt, cardW - 18, 64, 8.5);

    // Botão de Ação no Rodapé
    const btnX = cx, btnY = startY + cardH - 26, btnW = cardW - 24, btnH = 34;
    let actionBtn, actionTxt;

    if (isMax) {
      actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, 0x2e2314).setStrokeStyle(1.5, 0xffca28);
      actionTxt = scene.add.text(btnX, btnY, 'COMPLETO ★', textStyle('#ffd740', 10.5)).setOrigin(0.5);
    } else {
      const cost = cfg.costs ? (cfg.costs[lvl - 1] || 15) : 15;
      const canAfford = currentGold >= cost;

      actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, canAfford ? 0x4a148c : 0x2e1c3b)
        .setStrokeStyle(2, canAfford ? 0xba68c8 : 0x4a2e5c)
        .setInteractive({ useHandCursor: true });
      actionTxt = scene.add.text(btnX, btnY, `AUMENTAR (${cost}G)`, textStyle(canAfford ? '#ffffff' : '#8c7b6b', 10.5)).setOrigin(0.5);
      fitTextToBox(actionTxt, btnW - 8, btnH - 6, 8.5);

      actionBtn.on('pointerdown', () => {
        if (!canAfford) {
          sound.playShieldBlock();
          floatText(scene, btnX, btnY - 20, 'OURO INSUFICIENTE!', '#ff5252');
          return;
        }
        if (spendGold(cost)) {
          const nextLvl = lvl + 1;
          setStatusUpgradeLevel(key, nextLvl);
          sound.playBuy();
          showMageShopMenu(scene);
          floatText(scene, btnX, btnY - 24, `${cfg.name} NÍVEL ${nextLvl}!`, '#7fe7ff');
        }
      });
    }

    // Zona Interativa da Carta (Atualiza Diálogo do Arquimago!)
    const cardHit = scene.add.rectangle(cx, startY + cardH / 2, cardW, cardH, 0x000000, 0)
      .setInteractive({ useHandCursor: true });

    cardHit.on('pointerover', () => {
      drawCard(true);
      mageSpeechTxt.setText(statusDialogues[key] || '“Um elixir de grande sabedoria!”');
    });
    cardHit.on('pointerout', () => {
      drawCard(false);
      mageSpeechTxt.setText('“Beba dos meus elixires e seu poder ecoará em cada batalha!”');
    });

    menuContainer.add([cardGfx, icon, nameTxt, lvlBadgeTxt, descTxt, actionBtn, actionTxt, cardHit]);
  });

  // 8. TECLA DE ATALHO ESC & TAB
  const onEsc = (e) => {
    if (e.key === 'Escape') {
      scene.input.keyboard.off('keydown', onEsc);
      exitSubMenu(scene);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      scene.input.keyboard.off('keydown', onEsc);
      showBlacksmithMenu(scene);
    }
  };
  scene.input.keyboard.on('keydown', onEsc);
  menuContainer.on('destroy', () => scene.input.keyboard.off('keydown', onEsc));
}
