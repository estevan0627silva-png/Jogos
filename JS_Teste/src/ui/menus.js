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
    return 'JOYSTICK VIRTUAL: [PADRÃO: ATIVO SÓ NO CELULAR]';
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

// A FORJA DO MESTRE FERREIRO ANVILGAR (DESBLOQUEIO DE ARMAS & ARSENAL DE COMBATE)
// DESIGN: CENÁRIO COMPLETO COM FORNALHA DOOM FIRE EM TEMPO REAL, ANÃO ATRÁS DO BALCÃO,
// BIGORNA FRONTAL, MESA DE COURO PESPONTADO PARA AS CARTAS & ELEMENTOS DAS CONCEPTS (1 A 5)

// =============================================================================
// A FORJA DO MESTRE FERREIRO ANVILGAR (DESBLOQUEIO DE ARMAS & ARSENAL DE COMBATE)
// DESIGN: CENÁRIO COMPLETO COM FORNALHA DOOM FIRE EM TEMPO REAL, ANÃO ATRÁS DO BALCÃO,
// BIGORNA FRONTAL, MESA DE COURO PESPONTADO PARA AS CARTAS & ELEMENTOS DAS CONCEPTS (1 A 5)
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

  // ---------------------------------------------------------------------------
  // 1. MOTOR DE FOGO DO DOOM ARREDONDADO & PROFUNDO COM CORES VIBRANTES REAIS
  // PALETA 100% RUBI, VERMELHO VIVO, MAGMA LARANJA, OURO SOLAR E BRANCO INCANDESCENTE
  // (ZERO TONS MOSTARDA OU ESVERDEADOS — FOGO REAL DE FORJA ARDENTE)
  // ---------------------------------------------------------------------------
  const DOOM_FIRE_PALETTE = [
    [0, 0, 0, 0],           // 0: Transparente / Vazio (topo da fornalha)
    [30, 2, 2, 160],        // 1: Fumaça de brasa escura
    [55, 4, 4, 210],        // 2: Vermelho carmesim profundo
    [85, 6, 6, 255],        // 3
    [115, 8, 6, 255],       // 4
    [145, 12, 6, 255],      // 5: Vermelho escuro
    [175, 18, 6, 255],      // 6
    [200, 24, 6, 255],      // 7: Vermelho sangue vivo
    [220, 30, 6, 255],      // 8
    [235, 38, 8, 255],      // 9: Vermelho fogo ardente
    [245, 48, 8, 255],      // 10
    [255, 58, 10, 255],     // 11: Escarlate vivo
    [255, 70, 10, 255],     // 12
    [255, 82, 12, 255],     // 13: Vermelhão incandescente
    [255, 96, 14, 255],     // 14
    [255, 110, 16, 255],    // 15: Laranja magma elétrico
    [255, 124, 18, 255],    // 16
    [255, 138, 20, 255],    // 17: Laranja brasa pura
    [255, 152, 22, 255],    // 18
    [255, 166, 24, 255],    // 19: Laranja fogo brilhante
    [255, 178, 26, 255],    // 20
    [255, 190, 28, 255],    // 21: Ouro alaranjado
    [255, 202, 32, 255],    // 22
    [255, 214, 36, 255],    // 23: Ouro solar
    [255, 224, 42, 255],    // 24
    [255, 232, 50, 255],    // 25: Amarelo fogo puro
    [255, 240, 60, 255],    // 26
    [255, 245, 75, 255],    // 27: Amarelo brilhante
    [255, 248, 95, 255],    // 28
    [255, 250, 120, 255],   // 29: Amarelo-claro ardente
    [255, 252, 150, 255],   // 30
    [255, 253, 180, 255],   // 31: Núcleo esbranquiçado
    [255, 254, 205, 255],   // 32
    [255, 254, 225, 255],   // 33: Branco fogo
    [255, 255, 240, 255],   // 34
    [255, 255, 250, 255],   // 35
    [255, 255, 255, 255]    // 36: Branco puro (coração da fornalha)
  ];

  const fireW = 48;
  const fireH = 44;
  const firePixels = new Uint8Array(fireW * fireH);

  // Perfil arredondado do leito de brasas (curvatura da fornalha)
  const baseHeatProfile = new Uint8Array(fireW);
  for (let x = 0; x < fireW; x++) {
    const normX = Math.abs(x - (fireW - 1) / 2) / ((fireW - 1) / 2); // 0 no centro, 1 nas bordas
    const arch = Math.cos(normX * (Math.PI / 2.2));
    baseHeatProfile[x] = Math.round(36 * Math.max(0, arch));
  }

  // Inicializa o leito de brasas arredondado
  for (let x = 0; x < fireW; x++) {
    const maxH = baseHeatProfile[x];
    firePixels[(fireH - 1) * fireW + x] = maxH;
    firePixels[(fireH - 2) * fireW + x] = Math.max(0, maxH - 1);
  }

  let fireTex = scene.textures.get('doom_forge_fire');
  if (!fireTex || fireTex.key !== 'doom_forge_fire') {
    if (scene.textures.exists('doom_forge_fire')) scene.textures.remove('doom_forge_fire');
    fireTex = scene.textures.createCanvas('doom_forge_fire', fireW, fireH);
    if (fireTex && fireTex.setFilter) fireTex.setFilter(Phaser.Textures.FilterMode.NEAREST);
  }

  const fireCtx = fireTex.context;
  const fireImgData = fireCtx.createImageData(fireW, fireH);
  const fireData = fireImgData.data;

  const stepDoomFire = () => {
    // Alimenta o leito de brasas arredondado com pulsaÃ§Ãµes dinÃ¢micas de calor
    for (let x = 0; x < fireW; x++) {
      const maxH = baseHeatProfile[x];
      const jitter = Math.floor(Math.random() * 2);
      firePixels[(fireH - 1) * fireW + x] = Math.max(0, maxH - jitter);
      firePixels[(fireH - 2) * fireW + x] = Math.max(0, maxH - jitter - (Math.random() > 0.6 ? 1 : 0));
    }

    // PropagaÃ§Ã£o clÃ¡ssica do Doom: dispersÃ£o lateral e resfriamento para cima
    for (let x = 0; x < fireW; x++) {
      for (let y = 1; y < fireH; y++) {
        const src = y * fireW + x;
        const pixel = firePixels[src];
        if (pixel === 0) {
          firePixels[src - fireW] = 0;
        } else {
          const rand = Math.floor(Math.random() * 3);
          const decay = Math.floor(Math.random() * 2);
          const dstX = Math.min(fireW - 1, Math.max(0, x - rand + 1));
          const dst = (y - 1) * fireW + dstX;
          firePixels[dst] = pixel >= decay ? pixel - decay : 0;
        }
      }
    }

    // Converte os valores tÃ©rmicos em cores vivas de fogo real
    let p = 0;
    for (let i = 0; i < firePixels.length; i++) {
      const col = DOOM_FIRE_PALETTE[firePixels[i]];
      fireData[p++] = col[0];
      fireData[p++] = col[1];
      fireData[p++] = col[2];
      fireData[p++] = col[3];
    }
    fireCtx.putImageData(fireImgData, 0, 0);
    fireTex.refresh();
  };

  // PrÃ©-aquece a simulaÃ§Ã£o para as chamas comeÃ§arem jÃ¡ no auge
  for (let i = 0; i < 45; i++) stepDoomFire();

  // Sprite do Fogo do Doom ampliado para que suas 4 bordas retangulares fiquem
  // 100% ocultas atrÃ¡s da alvenaria frontal de pedra da fornalha (forgeFrontArt)
  const doomFireSprite = scene.add.image(105, 150, 'doom_forge_fire')
    .setScale(2.7)
    .setOrigin(0.5);

  const doomFireTimer = scene.time.addEvent({
    delay: 36, // ~28 fps - taxa de atualização perfeita do DOOM fire clássico
    loop: true,
    callback: () => {
      if (!menuContainer || !menuContainer.active) return;
      stepDoomFire();
    }
  });

  menuContainer.on('destroy', () => {
    if (doomFireTimer) doomFireTimer.remove();
  });

  // ---------------------------------------------------------------------------
  // 2. CENÁRIO DA FORJA: ALVENARIA DE PEDRA, FORNALHA COM PROFUNDIDADE & ARSENAL
  // ---------------------------------------------------------------------------
  const forgeBackdropArt = scene.add.graphics();

  // Parede de blocos de pedra rÃºstica escura com fuligem e rejunte de carvÃ£o
  forgeBackdropArt.fillStyle(0x0e0906, 1).fillRect(0, 0, 960, 240);
  for (let row = 0; row < 9; row++) {
    const by = row * 26;
    const offset = (row % 2 === 0) ? 0 : 45;
    forgeBackdropArt.fillStyle(0x19100a, 0.6).fillRect(0, by, 960, 2);
    for (let bx = offset; bx < 960; bx += 90) {
      forgeBackdropArt.fillStyle(0x19100a, 0.45).fillRect(bx, by, 2, 26);
      if ((bx + row) % 3 === 0) {
        forgeBackdropArt.fillStyle(0x22150e, 0.35).fillRect(bx + 6, by + 4, 38, 16);
      }
    }
  }

  // Vigas estruturais de carvalho pesado no teto
  forgeBackdropArt.fillStyle(0x221308, 1).fillRect(0, 0, 960, 14);
  forgeBackdropArt.fillStyle(0x381f12, 1).fillRect(0, 12, 960, 4);
  forgeBackdropArt.lineStyle(6, 0x1f1107, 0.95);
  forgeBackdropArt.strokeCircle(65, 0, 90);
  forgeBackdropArt.strokeCircle(895, 0, 90);

  // CAVIDADE PROFUNDA DA FORNALHA (FUNDO ESCURO ONDE ARDEM AS CHAMAS)
  forgeBackdropArt.fillStyle(0x060302, 1).fillRoundedRect(30, 48, 150, 162, 14);
  // Tijolos refratÃ¡rios internos da cÃ¢mara de combustÃ£o
  forgeBackdropArt.fillStyle(0x150a05, 0.85);
  for (let fy = 92; fy < 200; fy += 14) {
    forgeBackdropArt.fillRect(36, fy, 138, 1);
  }
  // Glow tÃ©rmico Ã¢mbar no fundo da cavidade
  forgeBackdropArt.fillStyle(0xd53205, 0.2).fillCircle(105, 152, 60);
  forgeBackdropArt.fillStyle(0xff8f00, 0.25).fillCircle(105, 162, 38);

  // ARSENAL DE PAREDE Ã€ DIREITA (x: 640..930, y: 64..190 â€” CONCEPTS 1, 2, 3, 5)
  forgeBackdropArt.fillStyle(0x24150c, 0.96).fillRoundedRect(638, 64, 290, 124, 8);
  forgeBackdropArt.lineStyle(2.5, 0x54321d).strokeRoundedRect(638, 64, 290, 124, 8);
  forgeBackdropArt.lineStyle(1.2, 0xc5a059, 0.6).strokeRoundedRect(642, 68, 282, 116, 6);
  forgeBackdropArt.fillStyle(0x190d07, 1).fillRect(644, 114, 278, 6);

  // Item 1 (Concept 1): ELMO CRUZADO DE AÃ‡O COM CRUZ DOURADA
  forgeBackdropArt.fillStyle(0x8a909c, 1).fillRoundedRect(658, 76, 26, 32, 4);
  forgeBackdropArt.lineStyle(1.5, 0x5a606e).strokeRoundedRect(658, 76, 26, 32, 4);
  forgeBackdropArt.fillStyle(0xffca28, 1).fillRect(669, 78, 4, 28).fillRect(663, 86, 16, 4);
  forgeBackdropArt.fillStyle(0x121216, 1).fillRect(663, 87, 5, 2).fillRect(673, 87, 5, 2);

  // Item 2 (Concept 1 & 2): ESCUDO AQUECEDOR DE CARVALHO (HEATER SHIELD)
  forgeBackdropArt.fillStyle(0x422616, 1).fillRect(700, 75, 26, 22);
  forgeBackdropArt.fillStyle(0x422616, 1).fillTriangle(700, 97, 726, 97, 713, 112);
  forgeBackdropArt.lineStyle(1.8, 0x8a909c).strokeRect(700, 75, 26, 22);
  forgeBackdropArt.lineStyle(1.8, 0x8a909c).lineBetween(700, 97, 713, 112).lineBetween(726, 97, 713, 112);
  forgeBackdropArt.lineStyle(1, 0x24140b).lineBetween(708, 76, 708, 102).lineBetween(718, 76, 718, 102);
  forgeBackdropArt.fillStyle(0xffca28, 1).fillCircle(713, 88, 2.5);

  // Item 3 (Concept 1 & 2): ESCUDO REDONDO VIKING COM UMBO DE FERRO
  forgeBackdropArt.fillStyle(0x2f4f4f, 0.95).fillCircle(758, 92, 17);
  forgeBackdropArt.lineStyle(2, 0xc5a059).strokeCircle(758, 92, 17);
  forgeBackdropArt.fillStyle(0x8a909c, 1).fillCircle(758, 92, 6);
  forgeBackdropArt.fillStyle(0xffffff, 0.8).fillCircle(757, 91, 1.5);

  // Item 4 (Concept 2 & 5): MACHADO DE GUERRA & ESPADA DE AÃ‡O CRUZADOS
  forgeBackdropArt.fillStyle(0x8d5c38, 1).fillRect(798, 72, 3.5, 42);
  forgeBackdropArt.fillStyle(0x8a909c, 1).fillTriangle(799, 74, 786, 84, 799, 94);
  forgeBackdropArt.fillStyle(0x8a909c, 1).fillTriangle(801, 74, 814, 84, 801, 94);
  forgeBackdropArt.fillStyle(0xffffff, 0.9).fillRect(786, 83, 28, 2);

  forgeBackdropArt.fillStyle(0x5a606e, 1).fillRect(828, 72, 4, 38);
  forgeBackdropArt.fillStyle(0xffca28, 1).fillRect(822, 80, 16, 3.5);
  forgeBackdropArt.fillStyle(0x8d5c38, 1).fillRect(828, 83, 4, 8);
  forgeBackdropArt.fillStyle(0xffca28, 1).fillCircle(830, 92, 2.5);

  // Item 5 (Concept 5): ALJAVA DE COURO COM FLECHAS & ARCO RECURVO
  forgeBackdropArt.fillStyle(0x4e342e, 1).fillRoundedRect(854, 75, 14, 34, 3);
  forgeBackdropArt.lineStyle(1.5, 0xc5a059).strokeRoundedRect(854, 75, 14, 34, 3);
  forgeBackdropArt.fillStyle(0xf5f5f5, 1).fillTriangle(856, 75, 858, 67, 860, 75);
  forgeBackdropArt.fillStyle(0xf5f5f5, 1).fillTriangle(862, 75, 864, 65, 866, 75);

  // Item 6 (Concept 5): LANTERNA DE TEMPESTADE EM GAIOLA DE FERRO
  forgeBackdropArt.lineStyle(1.5, 0x1f1610).lineBetween(900, 68, 900, 78);
  forgeBackdropArt.fillStyle(0x1f1610, 1).fillRoundedRect(892, 78, 16, 22, 3);
  forgeBackdropArt.fillStyle(0xffeb3b, 0.95).fillRoundedRect(894, 82, 12, 14, 2);
  forgeBackdropArt.fillStyle(0xff6f00, 1).fillRect(899, 87, 3, 5);
  forgeBackdropArt.lineStyle(1, 0xc5a059, 0.85).strokeRoundedRect(892, 78, 16, 22, 3);
  forgeBackdropArt.fillStyle(0xffa000, 0.12).fillCircle(900, 89, 32);

  // Item 7 (Concept 3): PEDRA DE AMOLAR RÃšNICA COM VEIOS EM BRASA
  forgeBackdropArt.fillStyle(0x23262d, 1).fillRoundedRect(655, 128, 48, 22, 3);
  forgeBackdropArt.lineStyle(1.5, 0x455a64).strokeRoundedRect(655, 128, 48, 22, 3);
  forgeBackdropArt.fillStyle(0xff5722, 0.95).fillRect(662, 137, 34, 2);
  forgeBackdropArt.fillStyle(0xffca28, 1).fillCircle(679, 138, 2);

  // Item 8 (Concept 1): ELMO BARBUTA / SALLET PONTUDO DE INFANTARIA
  forgeBackdropArt.fillStyle(0x78909c, 1).fillRoundedRect(722, 128, 24, 26, 4);
  forgeBackdropArt.fillStyle(0x101419, 1).fillRect(731, 135, 4, 14).fillRect(726, 139, 14, 3);

  // Item 9 (Concept 2): SACO DE MOEDAS DE OURO EM COURO CRU
  forgeBackdropArt.fillStyle(0x8d5c38, 1).fillCircle(776, 142, 9);
  forgeBackdropArt.fillStyle(0x5c3a1b, 1).fillRect(773, 131, 6, 4);
  forgeBackdropArt.fillStyle(0xffca28, 1).fillCircle(783, 146, 3).fillCircle(788, 146, 3);

  // Item 10 (Concept 5): ESPADÃƒO MONTANTE PESADO (BUSTER SWORD)
  forgeBackdropArt.fillStyle(0x5a606e, 1).fillRect(815, 126, 75, 12);
  forgeBackdropArt.fillStyle(0xffffff, 0.8).fillRect(815, 127, 75, 2);
  forgeBackdropArt.fillStyle(0x3e2723, 1).fillRect(805, 129, 10, 6);
  forgeBackdropArt.fillStyle(0xc5a059, 1).fillCircle(804, 132, 3);
  forgeBackdropArt.fillStyle(0x1a120c, 1).fillCircle(832, 132, 2).fillCircle(852, 132, 2);

  // ---------------------------------------------------------------------------
  // 3. FACHADA E ALVENARIA FRONTAL DA FORNALHA (LAYER 3: NA FRENTE DO FOGO!)
  // MASCARA COMPLETAMENTE AS 4 BORDAS RETANGULARES DO SPRITE DO DOOM FIRE
  // ---------------------------------------------------------------------------
  const forgeFrontArt = scene.add.graphics();

  // Pilar esquerdo maciÃ§o de pedras da fornalha (x: 28..70 â€” cobre a borda esquerda do fogo x: 40.2)
  forgeFrontArt.fillStyle(0x28170e, 1).fillRoundedRect(28, 46, 42, 172, 6);
  forgeFrontArt.lineStyle(2.5, 0x482917).strokeRoundedRect(28, 46, 42, 172, 6);
  for (let py = 56; py < 210; py += 24) {
    forgeFrontArt.fillStyle(0x180d07, 0.7).fillRect(28, py, 42, 2);
    forgeFrontArt.fillStyle(0x3e2417, 0.45).fillRect(32, py + 4, 34, 16);
  }

  // Pilar direito maciÃ§o de pedras da fornalha (x: 140..182 â€” cobre a borda direita do fogo x: 169.8)
  forgeFrontArt.fillStyle(0x28170e, 1).fillRoundedRect(140, 46, 42, 172, 6);
  forgeFrontArt.lineStyle(2.5, 0x482917).strokeRoundedRect(140, 46, 42, 172, 6);
  for (let py = 56; py < 210; py += 24) {
    forgeFrontArt.fillStyle(0x180d07, 0.7).fillRect(140, py, 42, 2);
    forgeFrontArt.fillStyle(0x3e2417, 0.45).fillRect(144, py + 4, 34, 16);
  }

  // Parede superior frontal e dintel de pedra (y: 46..104 â€” cobre a borda superior do fogo y: 90.6)
  forgeFrontArt.fillStyle(0x28170e, 1).fillRect(28, 46, 154, 58);
  forgeFrontArt.lineStyle(2.5, 0x482917).strokeRect(28, 46, 154, 58);

  // Moldura chanfrada do arco de pedra envolvente da fornalha
  forgeFrontArt.lineStyle(5, 0x3d2112, 1);
  forgeFrontArt.strokeRoundedRect(64, 98, 82, 100, 18);
  forgeFrontArt.lineStyle(1.8, 0x160c07, 0.95);
  forgeFrontArt.strokeRoundedRect(64, 98, 82, 100, 18);

  // Brilho quente do fogo iluminando a aresta interna do arco
  forgeFrontArt.lineStyle(1.5, 0xff7043, 0.65);
  forgeFrontArt.strokeRoundedRect(66, 100, 78, 96, 16);

  // Pedra angular superior da abÃ³bada (Keystone central entalhada)
  forgeFrontArt.fillStyle(0x56321e, 1).fillRect(93, 86, 24, 18);
  forgeFrontArt.lineStyle(2, 0x1f1109).strokeRect(93, 86, 24, 18);
  forgeFrontArt.fillStyle(0xffca28, 0.9).fillRect(104, 89, 2, 12).fillRect(99, 93, 12, 2); // runa de forja

  // Base da fornalha e grelha de ferro inferior (y: 194..218 â€” cobre a borda inferior do fogo y: 209.4)
  forgeFrontArt.fillStyle(0x1a0f08, 1).fillRect(28, 194, 154, 26);
  forgeFrontArt.lineStyle(2, 0x3d2315).strokeRect(28, 194, 154, 26);
  for (let gx = 68; gx < 144; gx += 10) {
    forgeFrontArt.fillStyle(0x454852, 1).fillRect(gx, 192, 3.5, 12);
    forgeFrontArt.fillStyle(0x8a909c, 0.8).fillRect(gx, 192, 1, 12);
  }

  // ChaminÃ© de ferro industrial subindo atÃ© o teto
  forgeFrontArt.fillStyle(0x181310, 1).fillRect(80, 0, 50, 48);
  forgeFrontArt.lineStyle(2, 0x36251a).strokeRect(80, 0, 50, 48);
  forgeFrontArt.fillStyle(0x261e16, 1).fillRect(78, 16, 54, 5).fillRect(78, 34, 54, 5); // anÃ©is de reforÃ§o
  for (let ry = 8; ry < 46; ry += 12) {
    forgeFrontArt.fillStyle(0x8a909c, 0.9).fillCircle(84, ry, 1.5).fillCircle(126, ry, 1.5);
  }

  // Ferramentas apoiadas na parede externa da fornalha (chÃ£o limpo)
  forgeFrontArt.lineStyle(2, 0x5a606e).lineBetween(22, 120, 18, 210); // atiÃ§ador longo
  forgeFrontArt.fillStyle(0x26272e, 1).fillRect(16, 205, 7, 7);
  forgeFrontArt.lineStyle(2, 0x3e2723).lineBetween(26, 130, 24, 212); // pÃ¡ de cinzas
  forgeFrontArt.fillStyle(0x455a64, 1).fillRect(22, 206, 9, 6);

  // Balde / tonel de tÃªmpera de Ã¡gua fria no chÃ£o
  forgeFrontArt.fillStyle(0x2b1810, 1).fillRoundedRect(8, 214, 20, 28, 3);
  forgeFrontArt.fillStyle(0x78909c, 1).fillRect(8, 220, 20, 2).fillRect(8, 234, 20, 2);
  forgeFrontArt.fillStyle(0x0288d1, 0.85).fillRoundedRect(10, 215, 16, 4, 1);

  // ---------------------------------------------------------------------------
  // 4. O MESTRE FERREIRO ANVILGAR ATRÃS DO BALCÃƒO (RENDERIZADO NO LAYER 4!)
  // ---------------------------------------------------------------------------
  const blacksmithSprite = scene.add.sprite(235, 168, 'blacksmith_master')
    .play('blacksmith_master')
    .setScale(2.3);

  scene.tweens.add({
    targets: blacksmithSprite,
    y: 164,
    duration: 1100,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // ---------------------------------------------------------------------------
  // 5. BALCÃO DE CARVALHO MACIÇO DA ARMOSA (RENDERIZADO NO LAYER 3: y: 194..248)
  // FRENTE DA FORNALHA 100% LIMPA E DESOBSTRUÍDA!
  // ---------------------------------------------------------------------------
  const counterArt = scene.add.graphics();
  // Viga maciça de carvalho envelhecido
  counterArt.fillStyle(0x2c180e, 1).fillRect(0, 194, 960, 54);
  // Chanfro polido no topo do balcão
  counterArt.fillStyle(0x5e331b, 1).fillRect(0, 194, 960, 6);
  counterArt.fillStyle(0x824927, 0.75).fillRect(0, 194, 960, 2); // friso reluzente
  counterArt.lineStyle(2, 0x160c07).strokeRect(0, 194, 960, 54);

  // Cintas de ferro forjado e junções verticais do balcão
  counterArt.fillStyle(0x180f08, 0.55);
  for (let sx = 80; sx < 960; sx += 140) {
    counterArt.fillRect(sx, 200, 2, 48);
  }

  // Friso metálico com rebites de latão ao longo do balcão
  counterArt.fillStyle(0xc5a059, 0.75).fillRect(0, 206, 960, 2);
  for (let rx = 25; rx < 960; rx += 70) {
    counterArt.fillStyle(0xffd700, 0.95).fillCircle(rx, 207, 2.5);
    counterArt.fillStyle(0x221105, 1).fillCircle(rx, 207, 1);
  }



  // C) Pilha de moedas de ouro sobre almofada de couro curtido à direita (x: 740..795)
  counterArt.fillStyle(0x4a2c1b, 0.95).fillRoundedRect(742, 188, 54, 8, 3);
  counterArt.lineStyle(1, 0x8d5c38).strokeRoundedRect(742, 188, 54, 8, 3);
  counterArt.fillStyle(0xffca28, 1).fillCircle(754, 187, 3.5).fillCircle(764, 187, 3.5).fillCircle(774, 187, 3.5);
  counterArt.fillStyle(0xffd54f, 1).fillCircle(759, 184, 3.5).fillCircle(769, 184, 3.5);

  // ---------------------------------------------------------------------------
  // 6. BALÃO DE DIÁLOGO DE PERGAMINHO (AO LADO DO FERREIRO: x: 315..630, y: 78..178)
  // ---------------------------------------------------------------------------
  const speechBubble = scene.add.graphics();
  const drawSpeechBubble = () => {
    speechBubble.clear();
    speechBubble.fillStyle(0xfbf4e6, 0.99).fillRoundedRect(315, 78, 318, 98, 14);
    speechBubble.lineStyle(2, 0x5c3722).strokeRoundedRect(315, 78, 318, 98, 14);
    speechBubble.lineStyle(1.2, 0xc5a059, 0.85).strokeRoundedRect(318, 81, 312, 92, 11);

    // Ponta do balão apontando diretamente para a boca do Ferreiro
    speechBubble.fillStyle(0xfbf4e6, 1).fillTriangle(315, 126, 290, 135, 315, 144);
    speechBubble.lineStyle(2, 0x5c3722).lineBetween(315, 126, 290, 135);
    speechBubble.lineStyle(2, 0x5c3722).lineBetween(290, 135, 315, 144);
  };
  drawSpeechBubble();

  const smithTitleTxt = scene.add.text(332, 90, 'MESTRE ANVILGAR (FERREIRO REAL)', textStyle('#5c3722', 11.5, 'bold'));
  const smithSpeechTxt = scene.add.text(332, 110, '“O fogo forja o aço! Escolha seu armamento para a batalha.”', {
    ...roundedTextStyle('#24150b', 11, 'normal'),
    lineSpacing: 3.5,
    wordWrap: { width: 290, useAdvancedWrap: true }
  });

  // ---------------------------------------------------------------------------
  // 7. PLACA DE MADEIRA PENDURADA NO TOPO (TÍTULO DA FORJA REAL)
  // ---------------------------------------------------------------------------
  const signGfx = scene.add.graphics();
  signGfx.lineStyle(1.8, 0x455a64, 0.95);
  for (let cy = 0; cy < 22; cy += 5) {
    signGfx.strokeCircle(380, cy, 2.5);
    signGfx.strokeCircle(580, cy, 2.5);
  }
  signGfx.fillStyle(0x28160c, 0.98).fillRoundedRect(340, 14, 280, 44, 8);
  signGfx.lineStyle(2.5, 0x6e3d22).strokeRoundedRect(340, 14, 280, 44, 8);
  signGfx.lineStyle(1.2, 0xc5a059).strokeRoundedRect(344, 18, 272, 36, 6);
  signGfx.fillStyle(0xffca28, 1).fillCircle(352, 24, 2.5).fillCircle(608, 24, 2.5);
  signGfx.fillStyle(0xffca28, 1).fillCircle(352, 48, 2.5).fillCircle(608, 48, 2.5);

  const signTitle = scene.add.text(480, 36, '⚔ A FORJA REAL ⚔', {
    ...textStyle('#ffd740', 16, 'bold'),
    fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);

  // ---------------------------------------------------------------------------
  // 8. ABAS DE NAVEGAÇÃO ENTRE LOJAS NO TOPO ESQUERDO
  // ---------------------------------------------------------------------------
  const forgeTabBtn = scene.add.rectangle(85, 28, 110, 28, 0x8d5c38)
    .setStrokeStyle(1.5, 0xffca28);
  const forgeTabTxt = scene.add.text(85, 28, '⚔ FORJA REAL', textStyle('#ffffff', 10.5, 'bold')).setOrigin(0.5);

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

  // ---------------------------------------------------------------------------
  // 9. PAINEL DE OURO DO JOGADOR NO TOPO DIREITO & BOTÃO SAIR
  // ---------------------------------------------------------------------------
  const goldPouchGfx = scene.add.graphics();
  goldPouchGfx.fillStyle(0x1e150f, 0.96).fillRoundedRect(720, 16, 130, 32, 6);
  goldPouchGfx.lineStyle(2, 0xffca28).strokeRoundedRect(720, 16, 130, 32, 6);
  const coinSprite = scene.add.sprite(738, 32, 'gold_coin').play('gold_coin').setScale(1.2);
  const goldValTxt = scene.add.text(758, 32, `${getGold()}G`, textStyle('#ffd740', 13, 'bold')).setOrigin(0, 0.5);

  const closeQuickBtn = scene.add.rectangle(905, 32, 70, 30, 0x5c241b)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(905, 32, '✕ SAIR', textStyle('#ffeb3b', 11, 'bold')).setOrigin(0.5);

  closeQuickBtn.on('pointerover', () => closeQuickBtn.setFillStyle(0x8e2a1b));
  closeQuickBtn.on('pointerout', () => closeQuickBtn.setFillStyle(0x5c241b));
  closeQuickBtn.on('pointerdown', () => exitSubMenu(scene));

  // ---------------------------------------------------------------------------
  // 10. BANCADA DA OFICINA DE ARMAS: ESTEIRA DE COURO PESPONTADO PARA AS CARTAS
  // ---------------------------------------------------------------------------
  const leatherMatArt = scene.add.graphics();
  leatherMatArt.fillStyle(0x1c1109, 1).fillRect(0, 248, 960, 292);
  for (let wy = 250; wy < 540; wy += 38) {
    leatherMatArt.fillStyle(0x140c06, 0.7).fillRect(0, wy, 960, 2);
  }

  leatherMatArt.fillStyle(0x3a2114, 0.98).fillRoundedRect(16, 248, 928, 276, 8);
  leatherMatArt.fillStyle(0x4a2c1b, 0.5).fillRoundedRect(20, 252, 920, 268, 6);
  leatherMatArt.lineStyle(2, 0x8d5c38, 0.85).strokeRoundedRect(22, 254, 916, 264, 6);
  leatherMatArt.lineStyle(1, 0x24140b, 0.9).strokeRoundedRect(18, 250, 924, 272, 8);

  const matCorners = [
    [24, 256], [936, 256],
    [24, 516], [936, 516]
  ];
  matCorners.forEach(([cx, cy]) => {
    leatherMatArt.fillStyle(0x1a120c, 1).fillCircle(cx, cy, 6);
    leatherMatArt.fillStyle(0xc5a059, 1).fillCircle(cx, cy, 3);
    leatherMatArt.fillStyle(0xffd700, 1).fillCircle(cx, cy, 1.2);
  });

  menuContainer.add([
    forgeBackdropArt,
    doomFireSprite,
    forgeFrontArt,
    blacksmithSprite,
    counterArt,
    speechBubble,
    smithTitleTxt,
    smithSpeechTxt,
    signGfx,
    signTitle,
    forgeTabBtn,
    forgeTabTxt,
    mageTabBtn,
    mageTabTxt,
    goldPouchGfx,
    coinSprite,
    goldValTxt,
    closeQuickBtn,
    closeQuickTxt,
    leatherMatArt
  ]);

  // ---------------------------------------------------------------------------
  // 11. SHOWCASE DAS 5 ARMAS: CARTAS DE PERGAMINHO DE ARMEIRO COM TEXTOS CENTRALIZADOS
  // ---------------------------------------------------------------------------
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
    bow: 'Disparos rápidos à distância (ideal para arqueiros e caçadores).',
    sword: 'Corte frontal potente em arco com alto knockback e rastro reluzente.',
    shield: 'Aura defensiva sagrada que bloqueia e reflete projéteis inimigos.',
    axe: 'Corte giratório duplo devastador que atinge múltiplos inimigos em 360°.',
    firestaff: 'Projéteis vulcânicos explosivos com dano em área e alta potência de impacto.'
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
      cardGfx.fillStyle(0x000000, 0.4).fillCircle(cx, startY + 5, 4);
      cardGfx.fillStyle(0xc5a059, 1).fillCircle(cx, startY + 4, 3);
      cardGfx.fillStyle(0x2a1a0e, 1).fillCircle(cx, startY + 4, 1.2);

      cardGfx.fillStyle(hover ? 0xfff8e7 : (isStarter ? 0xfff3cf : 0xf4ead2), 0.99)
        .fillRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
      cardGfx.lineStyle(2, hover ? 0xffca28 : (isStarter ? 0xffc107 : (isUnlocked ? 0x8d5524 : 0x5c4233)))
        .strokeRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
      cardGfx.lineStyle(1, hover ? 0xffd54f : (isStarter ? 0xffca28 : 0xb89569), 0.7)
        .strokeRoundedRect(left + 3, startY + 11, cardW - 6, cardH - 14, 6);

      const corners = [
        [left + 8, startY + 16],
        [left + cardW - 8, startY + 16],
        [left + 8, startY + cardH - 8],
        [left + cardW - 8, startY + cardH - 8]
      ];
      corners.forEach(([rx, ry]) => {
        cardGfx.fillStyle(0xc5a059, 0.85).fillCircle(rx, ry, 1.8);
      });

      const socketY = startY + 54;
      cardGfx.fillStyle(0x18120c, 1).fillCircle(cx, socketY, 26);
      cardGfx.lineStyle(2, hover ? 0xffeb3b : (isStarter ? 0xffd740 : (isUnlocked ? 0xc5a059 : 0x6e5233)))
        .strokeCircle(cx, socketY, 26);
      cardGfx.lineStyle(1, 0x8d5524, 0.6).strokeCircle(cx, socketY, 23);

      cardGfx.fillStyle(0xc5a059, 1);
      cardGfx.fillRect(cx - 1.5, socketY - 29, 3, 4);
      cardGfx.fillRect(cx - 1.5, socketY + 25, 3, 4);
      cardGfx.fillRect(cx - 29, socketY - 1.5, 4, 3);
      cardGfx.fillRect(cx + 25, socketY - 1.5, 4, 3);
    };
    drawCard(false);

    const icon = scene.add.image(cx, startY + 54, cfg.icon).setScale(1.4);
    if (!isUnlocked) icon.setTint(0x555555);

    const nameTxt = scene.add.text(cx, startY + 92, cfg.name, {
      ...textStyle(isStarter ? '#794b02' : (isUnlocked ? '#2c1b10' : '#6b5443'), 12, 'bold'),
      fontFamily: 'Georgia, serif',
      align: 'center'
    }).setOrigin(0.5);
    fitTextToBox(nameTxt, cardW - 16, 18, 9.5);

    const badgeBg = scene.add.rectangle(cx, startY + 114, cardW - 24, 18, isStarter ? 0x2e5c26 : (isUnlocked ? 0x3d2919 : 0x221a14))
      .setStrokeStyle(1, isStarter ? 0x76ff03 : (isUnlocked ? 0xc5a059 : 0x6e5233));
    const badgeTxt = scene.add.text(cx, startY + 114, weaponArchetypes[key] || 'ARMA REAL', {
      ...roundedTextStyle(isStarter ? '#b9f6ca' : (isUnlocked ? '#ffe082' : '#a8987b'), 9, 'bold'),
      align: 'center'
    }).setOrigin(0.5);

    const descStr = weaponStyles[key] || cfg.forgeLore || '';
    const descTxt = scene.add.text(cx, startY + 164, descStr, {
      ...roundedTextStyle('#3d2817', 10, 'normal'),
      align: 'center',
      lineSpacing: 2.5,
      wordWrap: { width: cardW - 20, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(descTxt, cardW - 18, 76, 8.5);

    const hitZoneH = cardH - 52;
    const cardHit = scene.add.rectangle(cx, startY + 8 + hitZoneH / 2, cardW, hitZoneH, 0x000000, 0)
      .setInteractive({ useHandCursor: true });

    cardHit.on('pointerover', () => {
      drawCard(true);
      smithSpeechTxt.setText(weaponDialogues[key] || '“Excelente escolha, guerreiro!”');
    });
    cardHit.on('pointerout', () => {
      drawCard(false);
      smithSpeechTxt.setText('“O fogo forja o aço! Escolha seu armamento para a batalha.”');
    });

    const btnX = cx, btnY = startY + cardH - 24, btnW = cardW - 24, btnH = 34;
    let actionBtn, actionTxt;

    if (!isUnlocked) {
      const cost = cfg.unlockCost || 25;
      const canAfford = getGold() >= cost;

      actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, canAfford ? 0x246b3d : 0x3b2c22)
        .setStrokeStyle(2, canAfford ? 0xffca28 : 0x6e5846)
        .setInteractive({ useHandCursor: canAfford });

      actionTxt = scene.add.text(btnX, btnY, `FORJAR (${cost}G)`, {
        ...roundedTextStyle(canAfford ? '#ffffff' : '#8c7b6b', 11, 'bold'),
        align: 'center'
      }).setOrigin(0.5);
      fitTextToBox(actionTxt, btnW - 8, btnH - 6, 8.5);

      actionBtn.on('pointerover', () => {
        if (getGold() >= cost) {
          actionBtn.setFillStyle(0x2e854b);
          actionBtn.setStrokeStyle(2, 0xffd740);
          actionTxt.setColor('#ffeb3b');
        } else {
          actionBtn.setFillStyle(0x4a372b);
        }
      });
      actionBtn.on('pointerout', () => {
        const stillAfford = getGold() >= cost;
        actionBtn.setFillStyle(stillAfford ? 0x246b3d : 0x3b2c22);
        actionBtn.setStrokeStyle(2, stillAfford ? 0xffca28 : 0x6e5846);
        actionTxt.setColor(stillAfford ? '#ffffff' : '#8c7b6b');
      });

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

      actionTxt = scene.add.text(btnX, btnY, isStarter ? '★ EM USO' : 'EQUIPAR', {
        ...roundedTextStyle(isStarter ? '#ffd740' : '#ffffff', 11, 'bold'),
        align: 'center'
      }).setOrigin(0.5);
      fitTextToBox(actionTxt, btnW - 8, btnH - 6, 8.5);

      actionBtn.on('pointerover', () => {
        actionBtn.setFillStyle(isStarter ? 0x27592e : 0x6d401e);
        if (!isStarter) actionTxt.setColor('#ffd740');
      });
      actionBtn.on('pointerout', () => {
        actionBtn.setFillStyle(isStarter ? 0x1f4724 : 0x543217);
        actionTxt.setColor(isStarter ? '#ffd740' : '#ffffff');
      });

      actionBtn.on('pointerdown', () => {
        sound.playButtonClick();
        const curr = getUpgrades();
        curr.starterWeapon = key;
        saveUpgrades(curr);
        showBlacksmithMenu(scene);
        floatText(scene, btnX, btnY - 24, `${cfg.name} SERÁ SUA INICIAL!`, '#7fe7ff');
      });
    }

    menuContainer.add([cardGfx, cardHit, icon, nameTxt, badgeBg, badgeTxt, descTxt, actionBtn, actionTxt]);
  });

  // ---------------------------------------------------------------------------
  // 12. TECLAS DE ATALHO ESC & TAB
  // ---------------------------------------------------------------------------
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
// DESIGN: CENÁRIO COMPLETO COM ARQUIMAGO ATRÁS DO BALCÃO, ITENS DAS REFERÊNCIAS
// E MESA DE MADEIRA FORRADA COM TECIDO ROXO E ENTALHES EM DOURADO PARA AS CARTAS
// INSPIRAÇÃO: CUPHEAD SHOP (IMG 5), PROPS FANTASIA & ITENS ALQUÍMICOS (IMG 1, 2, 3, 4)
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

  // ---------------------------------------------------------------------------
  // 1. CENÁRIO DE FUNDO: PAREDE DE ALVENARIA MÍSTICA, VIGAS EM ARCO (CUPHEAD) & PRATELEIRAS
  // ---------------------------------------------------------------------------
  const sanctumArt = scene.add.graphics();

  // Parede de alvenaria mística escura texturizada com blocos de pedra e argamassa
  sanctumArt.fillStyle(0x0c0817, 1).fillRect(0, 0, 960, 240);
  // Blocos de pedra intercalados com sutis variações de cor e linhas de rejunte
  for (let row = 0; row < 9; row++) {
    const by = row * 26;
    const offset = (row % 2 === 0) ? 0 : 45;
    sanctumArt.fillStyle(0x130d22, 0.45).fillRect(0, by, 960, 2);
    for (let bx = offset; bx < 960; bx += 90) {
      sanctumArt.fillStyle(0x130d22, 0.35).fillRect(bx, by, 2, 26);
      // Sutil textura interna no bloco de pedra
      if ((bx + row) % 3 === 0) {
        sanctumArt.fillStyle(0x19102b, 0.3).fillRect(bx + 6, by + 4, 38, 16);
      }
    }
  }

  // Vigas e arcos estruturais de teto no estilo Cuphead Shop (Imagem 5)
  sanctumArt.fillStyle(0x22130a, 1).fillRect(0, 0, 960, 14);
  sanctumArt.fillStyle(0x381f12, 1).fillRect(0, 12, 960, 4);
  // Arcos estruturais de madeira nas laterais
  sanctumArt.lineStyle(8, 0x24140c, 0.95);
  sanctumArt.strokeCircle(65, 0, 92);
  sanctumArt.strokeCircle(895, 0, 92);
  sanctumArt.lineStyle(2, 0x54321d, 0.85);
  sanctumArt.strokeCircle(65, 0, 94);
  sanctumArt.strokeCircle(895, 0, 94);

  // Lanterna de ferro fundido pendurada em corrente (Cuphead) - posicionada sem colidir
  sanctumArt.lineStyle(1.5, 0x1f1610, 0.9);
  for (let cy = 0; cy < 34; cy += 6) {
    sanctumArt.strokeCircle(345, cy, 2.5);
  }
  // Halo de iluminação quente âmbar que banha o Mago e o balcão
  sanctumArt.fillStyle(0xffa000, 0.12).fillCircle(345, 48, 56);
  sanctumArt.fillStyle(0xffd54f, 0.20).fillCircle(345, 48, 28);
  // Corpo da lanterna
  sanctumArt.fillStyle(0x1f1610, 1).fillRoundedRect(337, 36, 16, 22, 3);
  sanctumArt.fillStyle(0xffeb3b, 0.95).fillRoundedRect(339, 40, 12, 14, 2);
  sanctumArt.fillStyle(0xff6f00, 1).fillRect(344, 45, 3, 5); // chama
  sanctumArt.lineStyle(1, 0xc5a059, 0.85).strokeRoundedRect(337, 36, 16, 22, 3);

  // Runas arcanas gravadas no fundo da parede com aura de brilho sutil
  sanctumArt.lineStyle(1.5, 0x7c4dff, 0.3);
  sanctumArt.strokeCircle(235, 95, 24);
  sanctumArt.lineBetween(235, 71, 235, 119);
  sanctumArt.lineBetween(211, 95, 259, 95);

  // ---------------------------------------------------------------------------
  // PAREDE ESQUERDA: BOTICÁRIO COM PROPS DA IMAGEM 1 & 3 (SEM BAGUNÇA, POSIÇÃO LIMPA)
  // ---------------------------------------------------------------------------
  // Nicho em pedra entalhada (x: 20..160, y: 58..184)
  sanctumArt.fillStyle(0x140d1e, 0.95).fillRoundedRect(20, 58, 144, 126, 6);
  sanctumArt.lineStyle(2, 0x4a225e).strokeRoundedRect(20, 58, 144, 126, 6);
  sanctumArt.fillStyle(0x2d143c, 1).fillRect(24, 112, 136, 5); // prateleira superior
  sanctumArt.fillStyle(0x2d143c, 1).fillRect(24, 164, 136, 5); // prateleira inferior

  // Item 1 (Imagem 1): O FRASCO DE CONSERVA COM OLHO DE MONSTRO PRESERVADO
  sanctumArt.fillStyle(0x00e676, 0.2).fillCircle(45, 93, 14); // brilho etéreo
  sanctumArt.fillStyle(0x132918, 0.9).fillRoundedRect(34, 76, 22, 34, 4); // vidro
  sanctumArt.fillStyle(0x00e676, 0.75).fillRoundedRect(36, 82, 18, 26, 3); // líquido esmeralda
  sanctumArt.lineStyle(1.5, 0x81c784, 0.8).strokeRoundedRect(34, 76, 22, 34, 4);
  // Olho de monstro flutuando dentro
  sanctumArt.fillStyle(0xfff59d, 1).fillCircle(45, 95, 5.5); // esclera
  sanctumArt.fillStyle(0xd50000, 1).fillCircle(45, 95, 3); // íris vermelha
  sanctumArt.fillStyle(0x0a0505, 1).fillCircle(45, 95, 1.5); // pupila
  sanctumArt.fillStyle(0xffffff, 0.85).fillRect(37, 80, 2, 16); // reflexo do vidro
  sanctumArt.fillStyle(0x8d5524, 1).fillRect(38, 72, 14, 5); // rolha de cortiça

  // Item 2 (Imagem 1 & 3): CRÂNIO DE CRIATURA COM CHIFRES
  sanctumArt.fillStyle(0xd7ccc8, 0.95).fillCircle(92, 94, 8);
  sanctumArt.fillStyle(0xd7ccc8, 0.95).fillRect(87, 96, 10, 8);
  sanctumArt.fillStyle(0x24151a, 1).fillCircle(89, 93, 2).fillCircle(95, 93, 2); // órbitas
  sanctumArt.fillStyle(0x24151a, 1).fillRect(89, 101, 1.5, 3).fillRect(92, 101, 1.5, 3).fillRect(95, 101, 1.5, 3); // dentes
  sanctumArt.lineStyle(1.5, 0x8d6e63).lineBetween(86, 90, 78, 83); // chifre esquerdo
  sanctumArt.lineStyle(1.5, 0x8d6e63).lineBetween(98, 90, 106, 83); // chifre direito

  // Item 3 (Imagem 1): COGUMELO MÍSTICO LUMINOSO
  sanctumArt.fillStyle(0xffa726, 0.22).fillCircle(136, 92, 11);
  sanctumArt.fillStyle(0xefebe9, 1).fillRect(134, 93, 4, 14); // haste
  sanctumArt.fillStyle(0xd84315, 1).fillCircle(136, 90, 8); // chapéu
  sanctumArt.fillStyle(0xfff9c4, 1).fillCircle(133, 88, 1.2).fillCircle(138, 87, 1.2).fillCircle(136, 92, 1.2); // pintas

  // Prateleira inferior esquerda:
  // Item 4 (Imagem 1): ADAGA CERIMONIAL DE OBSIDIANA EM SUPORTE
  sanctumArt.fillStyle(0x3e2723, 1).fillRect(32, 156, 26, 4); // suporte
  sanctumArt.fillStyle(0x181822, 1).fillTriangle(34, 154, 54, 146, 38, 144); // lâmina
  sanctumArt.fillStyle(0x7c4dff, 0.7).fillRect(38, 147, 8, 1.5); // veio arcano
  sanctumArt.fillStyle(0x8d5524, 1).fillRect(28, 152, 6, 3); // empunhadura

  // Item 5 (Imagem 1): CHIFRE DE BEBER ORNAMENTADO COM ARO DOURADO
  sanctumArt.lineStyle(3, 0xf5ecd0).lineBetween(72, 154, 96, 144);
  sanctumArt.fillStyle(0xffca28, 1).fillCircle(72, 154, 3);
  sanctumArt.fillStyle(0xffca28, 1).fillCircle(96, 144, 2);

  // Item 6 (Imagem 1): COLAR DE DENTES & FEIXE DE PENAS MÍSTICAS PENDURADOS
  sanctumArt.lineStyle(1, 0x8d6e63, 0.8).lineBetween(112, 169, 126, 169);
  sanctumArt.fillStyle(0xf5ecd0, 1).fillTriangle(114, 169, 116, 177, 118, 169);
  sanctumArt.fillStyle(0xf5ecd0, 1).fillTriangle(120, 169, 122, 179, 124, 169);
  // Penas azuis e violetas
  sanctumArt.lineStyle(1.5, 0x00bcd4, 0.9).lineBetween(142, 166, 146, 180);
  sanctumArt.lineStyle(1.5, 0xab47bc, 0.9).lineBetween(140, 166, 141, 178);

  // ---------------------------------------------------------------------------
  // PAREDE DIREITA: BOTICÁRIO COM CRISTAIS, AMPULHETA E GRIMÓRIOS (IMG 2, 3, 4)
  // ---------------------------------------------------------------------------
  sanctumArt.fillStyle(0x140d1e, 0.96).fillRoundedRect(740, 58, 200, 126, 6);
  sanctumArt.lineStyle(2, 0x5a1888).strokeRoundedRect(740, 58, 200, 126, 6);
  sanctumArt.lineStyle(1, 0xba68c8, 0.45).strokeRoundedRect(743, 61, 194, 120, 5);
  sanctumArt.fillStyle(0x2d143c, 1).fillRect(746, 112, 188, 5); // prateleira 1
  sanctumArt.fillStyle(0x2d143c, 1).fillRect(746, 164, 188, 5); // prateleira 2

  // Item 7 (Imagem 2): AMPULHETA MÁGICA COM FUMAÇA VIOLETA
  sanctumArt.fillStyle(0xffca28, 1).fillRect(756, 78, 16, 2.5).fillRect(756, 99, 16, 2.5);
  sanctumArt.fillStyle(0xe1bee7, 0.5).fillTriangle(758, 81, 770, 81, 764, 89);
  sanctumArt.fillStyle(0xe1bee7, 0.5).fillTriangle(764, 89, 758, 97, 770, 97);
  sanctumArt.fillStyle(0xffd54f, 1).fillCircle(764, 94, 2.5); // areia
  // Névoa etérea violeta
  sanctumArt.fillStyle(0xba68c8, 0.35).fillCircle(764, 73, 3.5).fillCircle(762, 67, 4).fillCircle(766, 62, 3);

  // Item 8 (Imagem 2): CRISTAIS ELEMENTAIS (Ametista e Safira de Gelo)
  sanctumArt.fillStyle(0x9c27b0, 0.95).fillTriangle(784, 104, 789, 76, 794, 104);
  sanctumArt.fillStyle(0xe1bee7, 0.8).fillTriangle(787, 104, 789, 76, 791, 104);
  sanctumArt.fillStyle(0x00e5ff, 0.9).fillTriangle(800, 104, 804, 80, 808, 104);
  sanctumArt.fillStyle(0xffffff, 0.7).fillRect(803, 84, 1.5, 14);

  // Item 9 (Imagem 4): ÓCULOS DE ALQUIMISTA EM LATÃO COM LENTES CIANO
  sanctumArt.fillStyle(0xffca28, 1).fillCircle(828, 92, 6).fillCircle(842, 92, 6);
  sanctumArt.fillStyle(0x00e5ff, 0.85).fillCircle(828, 92, 4.5).fillCircle(842, 92, 4.5);
  sanctumArt.lineStyle(1.5, 0x8d5524).lineBetween(834, 92, 836, 92);
  sanctumArt.fillStyle(0xffffff, 0.9).fillRect(827, 90, 1.5, 1.5).fillRect(841, 90, 1.5, 1.5);

  // Item 10 (Imagem 4): FRASCOS DE POÇÃO ESFÉRICOS
  sanctumArt.fillStyle(0xe91e63, 0.9).fillCircle(865, 93, 7.5);
  sanctumArt.fillStyle(0x8d5524, 1).fillRect(863, 82, 4, 4);
  sanctumArt.fillStyle(0xffb300, 0.9).fillCircle(886, 93, 7);
  sanctumArt.fillStyle(0xffca28, 1).fillRect(884, 83, 4, 4);
  sanctumArt.fillStyle(0x7c4dff, 0.9).fillCircle(908, 93, 8);
  sanctumArt.fillStyle(0x37474f, 1).fillRect(906, 81, 4, 5);

  // Prateleira inferior direita:
  // Item 11 (Imagem 3): GRIMÓRIO NEGRO COM OLHO ARCANO CENTRAL E CANTOS DOURADOS
  sanctumArt.fillStyle(0x1d1222, 1).fillRect(756, 120, 28, 30);
  sanctumArt.lineStyle(1.5, 0xffca28).strokeRect(756, 120, 28, 30);
  sanctumArt.fillStyle(0x7c4dff, 1).fillCircle(770, 135, 4.5);
  sanctumArt.fillStyle(0x0a0505, 1).fillCircle(770, 135, 2);

  // Item 12 (Imagem 4): TOMOS ENCADERNADOS COM FECHO DE COURO
  sanctumArt.fillStyle(0x8d5524, 1).fillRect(794, 118, 12, 32);
  sanctumArt.fillStyle(0xffca28, 1).fillRect(792, 132, 16, 2.5); // fecho
  sanctumArt.fillStyle(0x006064, 1).fillRect(812, 120, 12, 30);
  sanctumArt.fillStyle(0xb71c1c, 1).fillRect(828, 122, 12, 28);

  // Item 13 (Imagem 2 & 4): PERGAMINHOS COM SELO DE CERA & CHAVES DE FERRO
  sanctumArt.fillStyle(0xf5ecd0, 1).fillRoundedRect(848, 124, 22, 8, 2);
  sanctumArt.fillStyle(0xd50000, 1).fillCircle(859, 128, 3); // sinete vermelho
  sanctumArt.fillStyle(0xf5ecd0, 1).fillRoundedRect(850, 135, 20, 8, 2);
  sanctumArt.fillStyle(0x00b0ff, 1).fillCircle(860, 139, 2.5); // sinete azul

  // Molho de chaves antigas
  sanctumArt.lineStyle(1.5, 0xb0bec5).strokeCircle(886, 126, 3.5);
  sanctumArt.lineStyle(1.5, 0xb0bec5).lineBetween(886, 130, 886, 144);
  sanctumArt.lineStyle(1, 0xb0bec5).lineBetween(886, 136, 889, 136).lineBetween(886, 140, 889, 140);



  // ---------------------------------------------------------------------------
  // 2. O ARQUIMAGO ALQUIMISTA ATRÁS DO BALCÃO (RENDERIZADO NO LAYER ATRÁS DO BALCÃO!)
  // ---------------------------------------------------------------------------
  // Posição: y: 168, scale: 2.3. A parte inferior do Mago (y: 194..227) fica oculta pelo balcão!
  const mageSprite = scene.add.sprite(235, 168, 'mage_master')
    .play('mage_master')
    .setScale(2.3);

  scene.tweens.add({
    targets: mageSprite,
    y: 164,
    duration: 1100,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // ---------------------------------------------------------------------------
  // 3. O BALCÃO DE MOGNO MÍSTICO (RENDERIZADO NA FRENTE DO MAGO: y: 194..248)
  // ---------------------------------------------------------------------------
  const counterArt = scene.add.graphics();
  // Viga maciça de mogno polido
  counterArt.fillStyle(0x2b1331, 1).fillRect(0, 194, 960, 54);
  // Brilho de madeira nobre polida na borda superior do balcão
  counterArt.fillStyle(0x562363, 1).fillRect(0, 194, 960, 6);
  counterArt.fillStyle(0x7b2f8e, 0.8).fillRect(0, 194, 960, 2); // friso reluzente
  counterArt.lineStyle(2, 0x15071a).strokeRect(0, 194, 960, 54);

  // Textura de madeira e junções verticais do balcão
  counterArt.fillStyle(0x1a091f, 0.5);
  for (let sx = 80; sx < 960; sx += 140) {
    counterArt.fillRect(sx, 200, 2, 48);
  }

  // Friso dourado com rebites de latão ao longo do balcão
  counterArt.fillStyle(0xc5a059, 0.7).fillRect(0, 206, 960, 2);
  for (let rx = 25; rx < 960; rx += 70) {
    counterArt.fillStyle(0xffd700, 0.95).fillCircle(rx, 207, 2.5);
    counterArt.fillStyle(0x221105, 1).fillCircle(rx, 207, 1);
  }

  // ITENS EM CIMA DO BALCÃO (DISPOSTOS SEM POLUIÇÃO):
  // A) GRIMÓRIO ABERTO COM RUNAS DOURADAS & MARCADOR DE SEDA (Imagem 4)
  counterArt.fillStyle(0x3e1818, 1).fillRect(74, 172, 54, 25);
  counterArt.fillStyle(0xf5ecd0, 1).fillRoundedRect(78, 170, 23, 23, 2);
  counterArt.fillStyle(0xf5ecd0, 1).fillRoundedRect(103, 170, 23, 23, 2);
  counterArt.fillStyle(0x7c4dff, 0.85);
  counterArt.fillRect(81, 174, 16, 2); counterArt.fillRect(81, 178, 14, 2); counterArt.fillRect(81, 182, 16, 2);
  counterArt.fillRect(106, 174, 16, 2); counterArt.fillRect(106, 178, 13, 2); counterArt.fillRect(106, 182, 15, 2);
  // Fita de seda vermelha caindo pela borda do balcão
  counterArt.lineStyle(2.5, 0xd50000, 0.95).lineBetween(102, 180, 102, 204);



  // ---------------------------------------------------------------------------
  // 4. BALÃO DE DIÁLOGO DE PERGAMINHO MÍSTICO (AO LADO DO MAGO: x: 315..635, y: 78..178)
  // ---------------------------------------------------------------------------
  const speechBubble = scene.add.graphics();
  const drawSpeechBubble = () => {
    speechBubble.clear();
    speechBubble.fillStyle(0xfbf4e6, 0.99).fillRoundedRect(315, 78, 318, 98, 14);
    speechBubble.lineStyle(2, 0x5e1d88).strokeRoundedRect(315, 78, 318, 98, 14);
    speechBubble.lineStyle(1.2, 0xc5a059, 0.85).strokeRoundedRect(318, 81, 312, 92, 11);

    // Ponta do balão apontando para o Mago
    speechBubble.fillStyle(0xfbf4e6, 1).fillTriangle(315, 126, 290, 135, 315, 144);
    speechBubble.lineStyle(2, 0x5e1d88).lineBetween(315, 126, 290, 135);
    speechBubble.lineStyle(2, 0x5e1d88).lineBetween(290, 135, 315, 144);
  };
  drawSpeechBubble();

  const mageTitleTxt = scene.add.text(332, 90, 'ARQUIMAGO ALQUIMISTA (MESTRE)', textStyle('#4a148c', 11.5, 'bold'));
  const mageSpeechTxt = scene.add.text(332, 110, '“Beba dos meus elixires e seu poder ecoará em cada batalha!”', {
    ...roundedTextStyle('#221226', 11.5, 'normal'),
    lineSpacing: 4,
    wordWrap: { width: 288, useAdvancedWrap: true }
  });

  // ---------------------------------------------------------------------------
  // 5. MESA DE MADEIRA FORRADA COM TECIDO ROXO E ENTALHES DOURADOS (FUNDO DAS CARTAS)
  // ---------------------------------------------------------------------------
  const tableClothArt = scene.add.graphics();

  // A) BASE DA MESA DE MADEIRA MACIÇA (y: 246..540)
  tableClothArt.fillStyle(0x23120b, 1).fillRect(0, 246, 960, 10);
  tableClothArt.fillStyle(0x462415, 1).fillRect(0, 246, 960, 2.5);
  tableClothArt.fillStyle(0x1b0e08, 1).fillRect(0, 256, 960, 284);
  // Sulcos de pranchas horizontais de madeira
  [326, 398, 470, 534].forEach(py => {
    tableClothArt.fillStyle(0x100805, 0.7).fillRect(0, py, 960, 2);
    tableClothArt.fillStyle(0x311a10, 0.35).fillRect(0, py + 2, 960, 1);
  });
  // Textura sutil de veios
  tableClothArt.lineStyle(1, 0x2e1910, 0.4);
  for (let gx = 15; gx < 960; gx += 50) {
    tableClothArt.lineBetween(gx, 256, gx + 20, 540);
  }

  // Cantoneiras de latão nas bordas extremas da mesa
  tableClothArt.fillStyle(0x8d5524, 0.9).fillRect(0, 256, 12, 280).fillRect(948, 256, 12, 280);
  tableClothArt.lineStyle(1.5, 0xc5a059).strokeRect(0, 256, 12, 280).strokeRect(948, 256, 12, 280);
  for (let ry = 275; ry < 530; ry += 35) {
    tableClothArt.fillStyle(0xffd700, 1).fillCircle(6, ry, 2.5).fillCircle(954, ry, 2.5);
  }

  // B) TECIDO DE VELUDO ROXO REAL (x: 16..944, y: 248..532)
  tableClothArt.fillStyle(0x060303, 0.75).fillRoundedRect(16, 251, 928, 283, 14); // sombra
  tableClothArt.fillStyle(0x2d0b3e, 1).fillRoundedRect(16, 248, 928, 283, 14); // veludo
  tableClothArt.fillStyle(0x3e1055, 0.85).fillRoundedRect(18, 250, 924, 279, 12);
  tableClothArt.fillStyle(0x4f156d, 0.45).fillRoundedRect(22, 254, 916, 271, 10);

  // Dobras verticais acetinadas do veludo
  for (let vx = 50; vx < 920; vx += 90) {
    tableClothArt.fillStyle(0x6a1f91, 0.16).fillRoundedRect(vx, 254, 42, 267, 6);
  }

  // C) ENTALHES E DETALHES EM DOURADO
  // Moldura dupla bordada a ouro
  tableClothArt.lineStyle(2.5, 0xc5a059, 0.95).strokeRoundedRect(23, 255, 914, 269, 10);
  tableClothArt.lineStyle(1.2, 0xffd700, 0.8).strokeRoundedRect(27, 259, 906, 261, 8);

  // Pontos de pesponto dourado ao redor do tecido
  for (let px = 38; px < 920; px += 18) {
    tableClothArt.fillStyle(0xffecb3, 0.9).fillCircle(px, 259, 1.2).fillCircle(px, 518, 1.2);
  }
  for (let py = 269; py < 515; py += 18) {
    tableClothArt.fillStyle(0xffecb3, 0.9).fillCircle(27, py, 1.2).fillCircle(933, py, 1.2);
  }

  // Arabescos dourados nos 4 cantos
  const drawCornerArabesque = (ox, oy, flipX = 1, flipY = 1) => {
    tableClothArt.lineStyle(2, 0xffca28, 0.95);
    tableClothArt.lineBetween(ox, oy, ox + 22 * flipX, oy);
    tableClothArt.lineBetween(ox, oy, ox, oy + 22 * flipY);
    tableClothArt.lineBetween(ox + 4 * flipX, oy + 4 * flipY, ox + 18 * flipX, oy + 4 * flipY);
    tableClothArt.lineBetween(ox + 4 * flipX, oy + 4 * flipY, ox + 4 * flipX, oy + 18 * flipY);
    tableClothArt.fillStyle(0xffd700, 1).fillCircle(ox + 9 * flipX, oy + 9 * flipY, 3);
    tableClothArt.fillStyle(0xffffff, 0.9).fillCircle(ox + 9 * flipX, oy + 9 * flipY, 1.2);
  };
  drawCornerArabesque(33, 265, 1, 1);
  drawCornerArabesque(927, 265, -1, 1);
  drawCornerArabesque(33, 512, 1, -1);
  drawCornerArabesque(927, 512, -1, -1);

  // Divisores verticais de ouro exatamente nos pontos médios entre as cartas (x: 250, 480, 710)
  [250, 480, 710].forEach(divX => {
    tableClothArt.lineStyle(1.5, 0xc5a059, 0.45).lineBetween(divX, 266, divX, 512);
    tableClothArt.fillStyle(0xffca28, 0.85).fillCircle(divX, 388, 3.5);
    tableClothArt.fillStyle(0xffd700, 1).fillCircle(divX, 388, 1.8);
    tableClothArt.lineStyle(1.5, 0xffca28, 0.8).lineBetween(divX - 6, 388, divX + 6, 388);
  });

  // Alvéolos / Esteiras para as cartas
  const cardW = 210;
  const cardH = 266;
  const startY = 252;
  const cardLefts = [30, 260, 490, 720];

  cardLefts.forEach(cLeft => {
    tableClothArt.fillStyle(0x0e0414, 0.8).fillRoundedRect(cLeft - 3, startY + 6, cardW + 6, cardH - 4, 10);
    tableClothArt.lineStyle(1.5, 0xc5a059, 0.55).strokeRoundedRect(cLeft - 3, startY + 5, cardW + 6, cardH - 4, 10);
    const cCorners = [
      [cLeft - 1, startY + 7],
      [cLeft + cardW + 1, startY + 7],
      [cLeft - 1, startY + cardH + 1],
      [cLeft + cardW + 1, startY + cardH + 1]
    ];
    cCorners.forEach(([cxp, cyp]) => {
      tableClothArt.fillStyle(0xffca28, 0.95).fillCircle(cxp, cyp, 3);
      tableClothArt.fillStyle(0xffffff, 0.8).fillCircle(cxp, cyp, 1.2);
    });
  });

  // Itens decorativos sobre o veludo (Imagem 2)
  // Moedas de ouro e safira no canto esquerdo
  tableClothArt.fillStyle(0xffd700, 1).fillCircle(38, 512, 4.5).fillCircle(45, 515, 4).fillCircle(42, 509, 4.5);
  tableClothArt.lineStyle(1, 0xc5a059).strokeCircle(38, 512, 4.5).strokeCircle(45, 515, 4).strokeCircle(42, 509, 4.5);
  tableClothArt.fillStyle(0x00e5ff, 1).fillTriangle(52, 517, 57, 509, 62, 517);
  tableClothArt.fillStyle(0xffffff, 0.8).fillRect(56, 511, 2, 2);

  // Cristal de ametista no canto direito
  tableClothArt.fillStyle(0xba68c8, 1).fillTriangle(912, 517, 917, 506, 922, 517);
  tableClothArt.fillStyle(0xe1bee7, 0.8).fillTriangle(915, 517, 917, 506, 919, 517);

  // ---------------------------------------------------------------------------
  // 6. BARRA DE NAVEGAÇÃO SUPERIOR (REORGANIZADA, LIMPA E SEM COLISÕES)
  // ---------------------------------------------------------------------------
  // Abas de lojas à esquerda
  const forgeTabBtn = scene.add.rectangle(85, 24, 110, 28, 0x3d2215)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const forgeTabTxt = scene.add.text(85, 24, '⚔ FORJA REAL', textStyle('#e0c088', 10.5)).setOrigin(0.5);

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

  const mageTabBtn = scene.add.rectangle(205, 24, 110, 28, 0x6a1b9a)
    .setStrokeStyle(1.5, 0xffca28);
  const mageTabTxt = scene.add.text(205, 24, '🔮 SANTUÁRIO', textStyle('#ffffff', 10.5)).setOrigin(0.5);

  // Placa central suspensa
  const signGfx = scene.add.graphics();
  signGfx.lineStyle(1.5, 0x7c4dff, 0.7);
  signGfx.lineBetween(390, 0, 390, 14);
  signGfx.lineBetween(570, 0, 570, 14);
  signGfx.fillStyle(0x1e0f2b, 0.96).fillRoundedRect(360, 10, 240, 30, 6);
  signGfx.lineStyle(2, 0x6a1b9a).strokeRoundedRect(360, 10, 240, 30, 6);
  signGfx.lineStyle(1, 0xba68c8, 0.6).strokeRoundedRect(363, 13, 234, 24, 5);
  const signTitle = scene.add.text(480, 25, '🔮 SANTUÁRIO DO ARQUIMAGO 🔮', {
    ...textStyle('#e1bee7', 12.5), fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);

  // Painel de ouro do jogador à direita
  const goldPouchGfx = scene.add.graphics();
  goldPouchGfx.fillStyle(0x1e150f, 0.96).fillRoundedRect(720, 10, 120, 30, 6);
  goldPouchGfx.lineStyle(2, 0xffca28).strokeRoundedRect(720, 10, 120, 30, 6);
  const coinSprite = scene.add.sprite(736, 25, 'gold_coin').play('gold_coin').setScale(1.1);
  const goldValTxt = scene.add.text(754, 25, `${getGold()}G`, textStyle('#ffd740', 13)).setOrigin(0, 0.5);

  // Botão Sair
  const closeQuickBtn = scene.add.rectangle(895, 25, 64, 28, 0x5c241b)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(895, 25, '✕ SAIR', textStyle('#ffeb3b', 10.5)).setOrigin(0.5);
  closeQuickBtn.on('pointerover', () => closeQuickBtn.setFillStyle(0x8e2a1b));
  closeQuickBtn.on('pointerout', () => closeQuickBtn.setFillStyle(0x5c241b));
  closeQuickBtn.on('pointerdown', () => exitSubMenu(scene));

  // ADICIONA AS CAMADAS EM ORDEM PRECISA (MAGO ATRÁS DO BALCÃO):
  menuContainer.add([
    sanctumArt,
    mageSprite,        // LAYER 2: O Mago (oculto parcialmente pelo balcão!)
    counterArt,        // LAYER 3: O Balcão (renderizado na frente do Mago!)
    tableClothArt,     // LAYER 4: A Mesa e Tecido Roxo (abaixo do balcão)
    speechBubble, mageTitleTxt, mageSpeechTxt,
    signGfx, signTitle,
    forgeTabBtn, forgeTabTxt, mageTabBtn, mageTabTxt,
    goldPouchGfx, coinSprite, goldValTxt,
    closeQuickBtn, closeQuickTxt
  ]);

  // ---------------------------------------------------------------------------
  // 7. SHOWCASE DOS 4 STATUS: CARTAS INTERATIVAS COM BOTÕES DE COMPRA 100% FUNCIONAIS
  // ---------------------------------------------------------------------------
  const statusUpgrades = getStatusUpgrades();
  const statusKeys = ['maxHp', 'moveSpeed', 'magnet', 'wisdom'];

  const statusDialogues = {
    maxHp: '“O Elixir da Vitalidade do Titã! Cada gota fortalece seu coração para aguentar os golpes mais rudes.”',
    moveSpeed: '“A Poção de Agilidade das Brisas! Seus passos ficarão velozes como o vento entre as árvores.”',
    magnet: '“O Fluido Magnético Arcano! Atrai as moedas de prata e relíquias distantes diretamente até você.”',
    wisdom: '“A Essência da Sabedoria Ancestral! Amplia seu aprendizado acelerando a obtenção de novos níveis!”'
  };

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
      cardGfx.fillStyle(0x000000, 0.45).fillCircle(cx, startY + 5, 5);
      cardGfx.fillStyle(isMax ? 0xffca28 : 0x7c4dff, 1).fillCircle(cx, startY + 4, 3.5);
      cardGfx.fillStyle(0xffffff, 0.85).fillCircle(cx, startY + 4, 1.2);

      // Corpo de pergaminho da carta (pergaminho nobre claro e nítido)
      cardGfx.fillStyle(hover ? 0xfffcf2 : (isMax ? 0xfff6dd : 0xf8efe0), 0.99)
        .fillRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
      // Moldura externa
      cardGfx.lineStyle(2, hover ? 0xffca28 : (isMax ? 0xffc107 : 0x6a1b9a))
        .strokeRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
      // Filete interno decorativo
      cardGfx.lineStyle(1, hover ? 0xffd54f : (isMax ? 0xffca28 : 0xba68c8), 0.65)
        .strokeRoundedRect(left + 3, startY + 11, cardW - 6, cardH - 14, 6);

      // Rebites nos 4 cantos da carta
      const corners = [
        [left + 8, startY + 16],
        [left + cardW - 8, startY + 16],
        [left + 8, startY + cardH - 8],
        [left + cardW - 8, startY + cardH - 8]
      ];
      corners.forEach(([rx, ry]) => {
        cardGfx.fillStyle(0x7c4dff, 0.85).fillCircle(rx, ry, 1.8);
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

      // Gemas / Pips de Nível (1 a 5) — CENTRALIZADOS COM PRECISÃO
      const pipW = 11;
      const pipGap = 5;
      const totalPipsW = maxLvl * pipW + (maxLvl - 1) * pipGap;
      const pipsStartX = cx - totalPipsW / 2;
      for (let p = 0; p < maxLvl; p++) {
        const px = pipsStartX + p * (pipW + pipGap);
        const activePip = p < lvl;
        cardGfx.fillStyle(activePip ? 0x00e5ff : 0x2e1c3b, 1).fillRect(px, startY + 114, pipW, 8);
        cardGfx.lineStyle(1, activePip ? 0xffffff : 0x5c3b70).strokeRect(px, startY + 114, pipW, 8);
      }
    };
    drawCard(false);

    // Ícone da Poção
    const icon = scene.add.image(cx, startY + 54, cfg.icon).setScale(1.4);

    // Nome do Status — 100% CENTRALIZADO
    const nameTxt = scene.add.text(cx, startY + 92, cfg.name, {
      ...textStyle(isMax ? '#794b02' : '#2c1b10', 11.5),
      fontFamily: 'Georgia, serif',
      align: 'center'
    }).setOrigin(0.5);
    fitTextToBox(nameTxt, cardW - 16, 18, 9);

    // Badge / Nível Textual — 100% CENTRALIZADO COM FUNDO ARREDONDADO
    const lvlBadgeBg = scene.add.rectangle(cx, startY + 132, cardW - 38, 18, isMax ? 0xfff3e0 : 0xf3e5f5)
      .setStrokeStyle(1, isMax ? 0xffb74d : 0xce93d8);
    const lvlBadgeTxt = scene.add.text(cx, startY + 132, isMax ? '★ PODER MÁXIMO ★' : `NÍVEL ${lvl} / ${maxLvl}`, {
      ...roundedTextStyle(isMax ? '#e65100' : '#4a148c', 9.5, 'bold'),
      align: 'center'
    }).setOrigin(0.5);

    // Descrições de Nível — FONTE ARREDONDADA & 100% CENTRALIZADA
    const levelDescs = cfg.levels || [];
    const descStr = isMax
      ? `★ Efeito Completo ★\n${levelDescs[lvl - 1] || ''}`
      : `Atual: ${levelDescs[lvl - 1] || ''}\nPróximo: ${levelDescs[lvl] || ''}`;
    const descTxt = scene.add.text(cx, startY + 172, descStr, {
      ...roundedTextStyle('#2e1a10', 10, 'normal'),
      align: 'center',
      lineSpacing: 3.5,
      wordWrap: { width: cardW - 20, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(descTxt, cardW - 18, 62, 8.5);

    // ZONA INTERATIVA DA CARTA (Hover para diálogo do mago — delimitada acima do botão!)
    // Altura calculada para cobrir apenas o corpo da carta, SEM invadir a área do botão de compra!
    const hitZoneH = cardH - 52;
    const cardHit = scene.add.rectangle(cx, startY + 8 + hitZoneH / 2, cardW, hitZoneH, 0x000000, 0)
      .setInteractive({ useHandCursor: true });

    cardHit.on('pointerover', () => {
      drawCard(true);
      mageSpeechTxt.setText(statusDialogues[key] || '“Um elixir de grande sabedoria!”');
    });
    cardHit.on('pointerout', () => {
      drawCard(false);
      mageSpeechTxt.setText('“Beba dos meus elixires e seu poder ecoará em cada batalha!”');
    });

    // BOTÃO DE COMPRA / AÇÃO NO RODAPÉ — 100% CENTRALIZADO E INTERATIVO
    const btnX = cx;
    const btnY = startY + cardH - 24;
    const btnW = cardW - 24;
    const btnH = 34;
    let actionBtn, actionTxt;

    if (isMax) {
      actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, 0x2e2314)
        .setStrokeStyle(1.5, 0xffca28);
      actionTxt = scene.add.text(btnX, btnY, 'COMPLETO ★', {
        ...roundedTextStyle('#ffd740', 11, 'bold'),
        align: 'center'
      }).setOrigin(0.5);
    } else {
      const cost = cfg.costs ? (cfg.costs[lvl - 1] || 15) : 15;
      const canAfford = getGold() >= cost;

      actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, canAfford ? 0x4a148c : 0x2e1c3b)
        .setStrokeStyle(2, canAfford ? 0xba68c8 : 0x4a2e5c)
        .setInteractive({ useHandCursor: canAfford });

      actionTxt = scene.add.text(btnX, btnY, `AUMENTAR (${cost}G)`, {
        ...roundedTextStyle(canAfford ? '#ffffff' : '#8c7b6b', 11, 'bold'),
        align: 'center'
      }).setOrigin(0.5);
      fitTextToBox(actionTxt, btnW - 8, btnH - 6, 8.5);

      // Feedback visual de hover do botão de compra
      actionBtn.on('pointerover', () => {
        if (getGold() >= cost) {
          actionBtn.setFillStyle(0x6a1b9a);
          actionBtn.setStrokeStyle(2, 0xffd740);
          actionTxt.setColor('#ffeb3b');
        } else {
          actionBtn.setFillStyle(0x3a2347);
        }
      });
      actionBtn.on('pointerout', () => {
        const stillAfford = getGold() >= cost;
        actionBtn.setFillStyle(stillAfford ? 0x4a148c : 0x2e1c3b);
        actionBtn.setStrokeStyle(2, stillAfford ? 0xba68c8 : 0x4a2e5c);
        actionTxt.setColor(stillAfford ? '#ffffff' : '#8c7b6b');
      });

      // Clique de compra desbugado com suporte direto ao ouro e persistência
      actionBtn.on('pointerdown', () => {
        const currentGold = getGold();
        if (currentGold < cost) {
          sound.playShieldBlock();
          floatText(scene, btnX, btnY - 20, 'OURO INSUFICIENTE!', '#ff5252');
          return;
        }

        // Debita o ouro corretamente
        addGold(-cost);

        // Atualiza e salva o status permanente
        const nextLvl = lvl + 1;
        const currentStats = getStatusUpgrades();
        currentStats[key] = nextLvl;
        saveStatusUpgrades(currentStats);

        // Feedback de áudio, floatText e atualização imediata da tela
        sound.playBuy();
        showMageShopMenu(scene);
        floatText(scene, btnX, btnY - 24, `${cfg.name} NÍVEL ${nextLvl}!`, '#7fe7ff');
      });
    }

    // Adiciona elementos da carta: actionBtn e actionTxt POR ÚLTIMO para garantir clique prioritário!
    menuContainer.add([cardGfx, cardHit, icon, nameTxt, lvlBadgeBg, lvlBadgeTxt, descTxt, actionBtn, actionTxt]);
  });

  // ---------------------------------------------------------------------------
  // 8. TECLAS DE ATALHO ESC & TAB
  // ---------------------------------------------------------------------------
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
