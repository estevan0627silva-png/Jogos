// =============================================================================
// TELAS E MENUS DO JOGO: MENU PRINCIPAL, FORJA, MAGO, CONQUISTAS E OPÇÕES
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

// Função unificada de saída de submenus (usada tanto pela tecla ESC quanto pelo botão Voltar/Sair)
function exitSubMenu(scene) {
  if (!scene) return;
  sound.playButtonClick();
  showMainMenu(scene);
}

// -----------------------------------------------------------------------------
// MENU PRINCIPAL DE TELA COMPLETA (CAPA DE JOGO 800x600)
// -----------------------------------------------------------------------------
function showMainMenu(scene) {
  if (menuContainer) menuContainer.destroy();
  gameState = 'MENU';
  sound.startMenuBGM();

  menuContainer = scene.add.container(0, 0).setDepth(3000).setScrollFactor(0);
  menuContainer.isMainMenu = true;
  const art = scene.add.graphics();

  // 1. CÉU CREPUSCULAR DO REINO (Degradê em faixas de Pixel Art)
  const skyBands = [
    [0, 55, 0x090d1c],
    [55, 50, 0x121b36],
    [105, 45, 0x1f2247],
    [150, 45, 0x38234a],
    [195, 40, 0x5e2f3d],
    [235, 35, 0x8c492b],
    [270, 30, 0xb86b35]
  ];
  skyBands.forEach(([y, h, color]) => art.fillStyle(color, 1).fillRect(0, y, 800, h));

  const starCoords = [
    [55, 30], [115, 65], [180, 28], [260, 48], [340, 25], [440, 42], [510, 70],
    [690, 35], [750, 68], [85, 118], [155, 102], [295, 95], [480, 108], [735, 115]
  ];
  starCoords.forEach(([sx, sy], i) => {
    art.fillStyle(i % 3 === 0 ? 0xffeb3b : 0xffffff, 0.85).fillRect(sx, sy, i % 2 === 0 ? 3 : 2, i % 2 === 0 ? 3 : 2);
  });
  art.lineStyle(1, 0x7fe7ff, 0.22);
  art.lineBetween(55, 30, 115, 65);
  art.lineBetween(115, 65, 180, 28);
  art.lineBetween(180, 28, 260, 48);

  // Lua Cheia Dourada atrás do Castelo Real
  art.fillStyle(0xffca28, 0.12).fillCircle(610, 145, 76);
  art.fillStyle(0xffca28, 0.24).fillCircle(610, 145, 54);
  art.fillStyle(0xfff3c4, 0.96).fillCircle(610, 145, 36);
  art.fillStyle(0xf2c14e, 0.45).fillCircle(622, 136, 8).fillCircle(598, 154, 11);

  // 2. CORDILHEIRA DE MONTANHAS & CASTELO DO REINO AO HORIZONTE
  art.fillStyle(0x1b152b, 1);
  art.fillTriangle(-20, 285, 130, 155, 290, 285);
  art.fillTriangle(190, 285, 355, 170, 510, 285);
  art.fillTriangle(430, 285, 605, 140, 770, 285);
  art.fillTriangle(640, 285, 760, 180, 840, 285);

  art.fillStyle(0x2c2240, 1);
  art.fillTriangle(130, 155, 210, 285, 290, 285);
  art.fillTriangle(355, 170, 430, 285, 510, 285);

  const cx = 555, cy = 148;
  art.fillStyle(0x120d1d, 1);
  art.fillRect(cx, cy + 32, 110, 65);
  art.fillRect(cx - 12, cy + 16, 24, 80);
  art.fillRect(cx + 98, cy + 16, 24, 80);
  art.fillRect(cx + 35, cy - 12, 40, 108);
  art.fillRect(cx + 18, cy + 6, 18, 90);
  art.fillRect(cx + 74, cy + 6, 18, 90);

  art.fillStyle(0x2f6fd6, 1);
  art.fillTriangle(cx - 16, cy + 16, cx, cy - 6, cx + 16, cy + 16);
  art.fillTriangle(cx + 94, cy + 16, cx + 110, cy - 6, cx + 126, cy + 16);
  art.fillTriangle(cx + 30, cy - 12, cx + 55, cy - 44, cx + 80, cy - 12);

  art.lineStyle(2, 0xc5a059, 1);
  art.lineBetween(cx + 55, cy - 44, cx + 55, cy - 58);
  art.fillStyle(0xd83a3a, 1).fillTriangle(cx + 55, cy - 58, cx + 73, cy - 53, cx + 55, cy - 48);

  art.fillStyle(0xffeb3b, 0.95);
  art.fillRect(cx + 51, cy - 2, 8, 14);
  art.fillRect(cx + 46, cy + 20, 6, 10);
  art.fillRect(cx + 58, cy + 20, 6, 10);
  art.fillRect(cx - 3, cy + 28, 6, 10);
  art.fillRect(cx + 107, cy + 28, 6, 10);
  art.fillStyle(0x3a2414, 1).fillRect(cx + 45, cy + 58, 20, 32);
  art.fillStyle(0xffa726, 0.7).fillRect(cx + 49, cy + 64, 12, 24);

  // 3. COLINAS VERDES, FLORESTA E O CAMINHO REAL SINUOSO
  art.fillStyle(0x16331a, 1).fillRect(0, 265, 800, 335);
  art.fillStyle(0x1f4724, 1);
  art.fillEllipse(210, 340, 560, 150);
  art.fillEllipse(620, 355, 520, 140);
  art.fillStyle(0x2a5c2f, 1);
  art.fillEllipse(400, 495, 920, 270);

  const roadPolys = [
    { y1: 242, y2: 285, x1L: 602, x1R: 618, x2L: 520, x2R: 552 },
    { y1: 285, y2: 345, x1L: 520, x1R: 552, x2L: 370, x2R: 425 },
    { y1: 345, y2: 430, x1L: 370, x1R: 425, x2L: 285, x2R: 380 },
    { y1: 430, y2: 600, x1L: 285, x1R: 380, x2L: 160, x2R: 470 }
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

  art.fillStyle(0x4b4e58, 0.75).fillEllipse(370, 360, 210, 52);

  // Pedestal Rochoso Heróico no Primeiro Plano Esquerdo (onde está o Cavaleiro)
  art.fillStyle(0x1f2126, 1).fillEllipse(205, 470, 200, 58);
  art.fillStyle(0x373a42, 1).fillEllipse(205, 461, 184, 48);
  art.fillStyle(0x525763, 1).fillEllipse(205, 455, 158, 36);
  art.fillStyle(0x000000, 0.45).fillEllipse(205, 451, 88, 18);

  art.fillStyle(0x000000, 0.32).fillEllipse(310, 355, 84, 18);
  art.fillStyle(0x000000, 0.32).fillEllipse(418, 344, 46, 14);
  art.fillStyle(0x000000, 0.35).fillEllipse(68, 435, 62, 14);

  menuContainer.add(art);

  // 4. A VILA DE VALE DOURADO NO CAMINHO + O CAVALEIRO HERÓICO
  const treeFar = scene.add.image(492, 292, 'tree').setScale(0.72);
  const menuHouse = scene.add.image(235, 318, 'village_house').setScale(0.88);
  const menuBlacksmith = scene.add.image(312, 326, 'village_blacksmith').setScale(0.82);
  const menuGateTower = scene.add.image(416, 314, 'village_gate_tower').setScale(0.76);
  const treeLeft = scene.add.image(68, 395, 'tree').setScale(1.2);

  const heroSprite = scene.add.image(205, 392, 'knight_banner').setScale(2.2);
  scene.tweens.add({
    targets: heroSprite,
    y: 386,
    duration: 1300,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // 5. BRASÃO DE TÍTULO NO TOPO E BOTÕES RÁPIDOS DE ÁUDIO [M] E TELA CHEIA [F]
  const headerBanner = scene.add.graphics();
  headerBanner.fillStyle(0x14100c, 0.90).fillRoundedRect(82, 16, 580, 82, 10);
  headerBanner.lineStyle(2.5, 0x8d5524, 1).strokeRoundedRect(82, 16, 580, 82, 10);
  headerBanner.lineStyle(1.2, 0xc5a059, 0.9).strokeRoundedRect(87, 21, 570, 72, 8);

  const titleShadow = scene.add.text(374, 46, 'A JORNADA DO CAVALEIRO', {
    ...textStyle('#060403', 26), fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);
  const titleMain = scene.add.text(372, 44, 'A JORNADA DO CAVALEIRO', {
    ...textStyle('#ffca28', 26), fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);
  const subtitleTxt = scene.add.text(372, 75, '★ CRÔNICAS DO REINO & ROGUELITE DE AÇÃO ★', textStyle('#e0c088', 11)).setOrigin(0.5);

  // Botão rápido de Som [M] no canto superior direito da Capa
  const menuSoundBg = scene.add.graphics();
  const drawMenuSound = (hover = false) => {
    menuSoundBg.clear();
    menuSoundBg.fillStyle(hover ? 0x2e241c : 0x14100c, 0.92).fillRoundedRect(674, 22, 50, 50, 8);
    menuSoundBg.lineStyle(2, hover ? 0xffca28 : 0xc5a059).strokeRoundedRect(674, 22, 50, 50, 8);
  };
  drawMenuSound(false);
  const menuHorn = scene.add.image(699, 47, 'hud_horn', sound.isMuted() ? 1 : 0);
  const menuSoundHit = scene.add.rectangle(699, 47, 50, 50, 0x000000, 0).setInteractive({ useHandCursor: true });
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

  // Botão rápido de Tela Cheia [F] ao lado do botão de Som
  const menuFsBg = scene.add.graphics();
  const drawMenuFs = (hover = false) => {
    menuFsBg.clear();
    menuFsBg.fillStyle(hover ? 0x2e241c : 0x14100c, 0.92).fillRoundedRect(732, 22, 50, 50, 8);
    menuFsBg.lineStyle(2, hover ? 0xffca28 : 0xc5a059).strokeRoundedRect(732, 22, 50, 50, 8);
  };
  drawMenuFs(false);
  const menuFsIcon = scene.add.image(757, 47, 'hud_fullscreen', isGameFullscreen(scene) ? 1 : 0);
  const menuFsHit = scene.add.rectangle(757, 47, 50, 50, 0x000000, 0).setInteractive({ useHandCursor: true });
  menuContainer.updateMenuFullscreen = () => {
    if (menuFsIcon && menuFsIcon.active) menuFsIcon.setFrame(isGameFullscreen(scene) ? 1 : 0);
  };
  menuFsHit.on('pointerover', () => drawMenuFs(true));
  menuFsHit.on('pointerout', () => drawMenuFs(false));
  menuFsHit.on('pointerdown', () => {
    sound.playButtonClick();
    toggleFullscreen(scene);
  });

  // Painel de Ações à Direita (Com Indicador de Recorde + Tesouro de Ouro + Loja de Upgrades)
  const menuPanel = scene.add.graphics();
  menuPanel.fillStyle(0x14100c, 0.92).fillRoundedRect(442, 244, 326, 306, 12);
  menuPanel.lineStyle(2.5, 0x8d5524, 1).strokeRoundedRect(442, 244, 326, 306, 12);
  menuPanel.lineStyle(1.2, 0xc5a059, 0.85).strokeRoundedRect(447, 249, 316, 296, 9);

  const crownIcon = scene.add.image(474, 272, 'hud_crown').setScale(0.85);
  const bestBannerTxt = scene.add.text(490, 272, `RECORDE: ${getBestScore()}s`, textStyle('#ffca28', 12)).setOrigin(0, 0.5);

  const menuCoinIcon = scene.add.image(626, 272, 'gold_coin', 0).setScale(1.15);
  const menuGoldTxt = scene.add.text(642, 272, `OURO: ${getGold()}`, textStyle('#ffd740', 12)).setOrigin(0, 0.5);

  menuPanel.lineStyle(1, 0xc5a059, 0.4).lineBetween(464, 292, 746, 292);

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

  const startBtn = createButton(scene, 605, 320, '⚔ COMEÇAR JORNADA', launchGame, 276, 38);
  const blacksmithBtn = createButton(scene, 605, 362, 'FORJA DO FERREIRO', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showBlacksmithMenu(scene);
  }, 276, 36);
  const mageBtn = createButton(scene, 605, 404, 'SANTUÁRIO DO MAGO', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showMageShopMenu(scene);
  }, 276, 36);
  const achBtn = createButton(scene, 605, 446, 'CONQUISTAS DO REINO', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showAchievementsMenu(scene);
  }, 276, 36);
  const recordsBtn = createButton(scene, 532, 488, 'RECORDES', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showRecordsMenu(scene);
  }, 132, 34);
  const settingsBtn = createButton(scene, 678, 488, 'AJUSTES', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showSettingsMenu(scene);
  }, 132, 34);

  const startHint = scene.add.text(605, 524, '[ESPAÇO] ou [ENTER] para iniciar', textStyle('#c5a059', 11)).setOrigin(0.5);

  // Faixa de Rodapé Completa
  const footerBg = scene.add.rectangle(400, 578, 800, 32, 0x0c0907, 0.92);
  const footerLine = scene.add.graphics().lineStyle(1, 0x8d5524, 0.8).lineBetween(0, 562, 800, 562);
  const footerTxt = scene.add.text(370, 578, 'Mover: WASD/Setas  |  Pausar: ESC  |  Áudio: M  |  Tela Cheia: F', textStyle('#d6c8aa', 11)).setOrigin(0.5);
  const versionTxt = scene.add.text(750, 578, GAME_VERSION, textStyle('#c5a059', 11)).setOrigin(0.5);

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

// // -----------------------------------------------------------------------------
// A FORJA DO FERREIRO REAL (DESBLOQUEIO DE ARMAS & ARSENAL DE COMBATE)
// -----------------------------------------------------------------------------
function showBlacksmithMenu(scene) {
  if (!scene) return;
  gameState = 'MENU';
  scene.time.paused = false;
  scene.time.timeScale = 1;
  scene.tweens.resumeAll();

  if (menuContainer) menuContainer.destroy();
  sound.startMenuBGM();

  menuContainer = createModal(
    scene,
    'A FORJA DO FERREIRO REAL',
    564,
    'Comissione e desbloqueie armas de combate com o Ouro de suas expedições',
    740
  );
  menuContainer.isMainMenu = false;

  // Botão Rápido "✕ SAIR [ESC]" no canto superior direito do modal
  const closeQuickBtn = scene.add.rectangle(712, 46, 78, 28, 0x5c241b)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(712, 46, '✕ SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);
  closeQuickBtn.on('pointerover', () => closeQuickBtn.setFillStyle(0x8e2a1b));
  closeQuickBtn.on('pointerout', () => closeQuickBtn.setFillStyle(0x5c241b));
  closeQuickBtn.on('pointerdown', () => exitSubMenu(scene));
  menuContainer.add([closeQuickBtn, closeQuickTxt]);

  // 1. VINHETA VIVA DO MESTRE FERREIRO (com Sprite Animado 'blacksmith_master')
  const forgeBg = scene.add.graphics();
  forgeBg.fillStyle(0x221510, 0.96).fillRoundedRect(56, 92, 420, 54, 7);
  forgeBg.lineStyle(1.5, 0xd83a3a).strokeRoundedRect(56, 92, 420, 54, 7);

  const blacksmithSprite = scene.add.sprite(86, 119, 'blacksmith_master').play('blacksmith_master').setScale(1.2);
  const smithName = scene.add.text(118, 99, 'MESTRE ANVILGAR (FERREIRO REAL)', textStyle('#ffca28', 11));
  const smithSpeech = scene.add.text(118, 117, '“O fogo forja o aço! Armas compradas entram na floresta.”', {
    ...textStyle('#f5e6c8', 10, 'normal'),
    wordWrap: { width: 345, useAdvancedWrap: true }
  });
  fitTextToBox(smithSpeech, 345, 24, 9);

  // 2. PAINEL DE OURO DISPONÍVEL (x: 486..740)
  const goldBadge = scene.add.graphics();
  goldBadge.fillStyle(0x261c12, 0.98).fillRoundedRect(486, 92, 258, 54, 7);
  goldBadge.lineStyle(2, 0xffca28).strokeRoundedRect(486, 92, 258, 54, 7);
  const coinSprite = scene.add.sprite(514, 119, 'gold_coin').play('gold_coin').setScale(1.3);
  const goldValTxt = scene.add.text(536, 111, `OURO: ${getGold()}`, textStyle('#ffd740', 14)).setOrigin(0, 0.5);
  fitTextToBox(goldValTxt, 195, 22, 11);
  const goldHint = scene.add.text(536, 129, 'Ganho em expedições e conquistas', textStyle('#a8987b', 10)).setOrigin(0, 0.5);

  menuContainer.add([forgeBg, blacksmithSprite, smithName, smithSpeech, goldBadge, coinSprite, goldValTxt, goldHint]);

  // 3. CARTAS DE ARMAS DA FORJA (5 Armas: Arco, Espada, Escudo, Machado, Cajado de Fogo)
  const upgrades = getUpgrades();
  const weaponKeys = ['bow', 'sword', 'shield', 'axe', 'firestaff'];
  const weaponStyles = {
    bow: 'Disparos rápidos à distância (perfeito para eliminar arqueiros e magos).',
    sword: 'Corte frontal potente em arco com knockback e rastro dourado.',
    shield: 'Aura defensiva sagrada que bloqueia e reflete projéteis inimigos.',
    axe: 'Corte giratório pesado e devastador que acerta múltiplos inimigos ao redor.',
    firestaff: 'Projéteis arcanos explosivos com dano em área e alta potência de impacto.'
  };

  weaponKeys.forEach((key, idx) => {
    const cfg = WEAPON_CATALOG[key];
    if (!cfg) return;
    const isUnlocked = Boolean(upgrades[key]?.unlocked);
    const isStarter = upgrades.starterWeapon === key;
    const rowY = 178 + idx * 68;

    const rowBg = scene.add.graphics();
    rowBg.fillStyle(isUnlocked ? 0x221a13 : 0x17120e, 0.95).fillRoundedRect(56, rowY - 28, 688, 60, 7);
    rowBg.lineStyle(1.5, isStarter ? 0xffca28 : (isUnlocked ? 0x8d5524 : 0x4a3b2c)).strokeRoundedRect(56, rowY - 28, 688, 60, 7);

    const slotBg = scene.add.graphics();
    slotBg.fillStyle(0x120d0a, 1).fillRoundedRect(68, rowY - 20, 44, 44, 5);
    slotBg.lineStyle(1.5, isStarter ? 0xffca28 : (isUnlocked ? 0xc5a059 : 0x5c4938)).strokeRoundedRect(68, rowY - 20, 44, 44, 5);

    const icon = scene.add.image(90, rowY + 2, cfg.icon).setScale(1.3);
    if (!isUnlocked) icon.setTint(0x555555);

    const nameTxt = scene.add.text(124, rowY - 20, cfg.name, textStyle(isUnlocked ? '#ffca28' : '#8c7b6b', 13));
    const statusBadge = scene.add.text(
      330,
      rowY - 14,
      isStarter ? '★ ARMA INICIAL ATIVA' : (isUnlocked ? '✦ DESBLOQUEADA' : `BLOQUEADA (${cfg.unlockCost}G)`),
      textStyle(isStarter ? '#ffd740' : (isUnlocked ? '#7fe7ff' : '#ff8a80'), 10)
    ).setOrigin(0, 0.5);

    const descTxt = scene.add.text(124, rowY - 3, weaponStyles[key] || cfg.desc, {
      ...textStyle(isUnlocked ? '#e0d2b4' : '#9c8d73', 10, 'normal'),
      lineSpacing: 2,
      wordWrap: { width: 380, useAdvancedWrap: true }
    });
    fitTextToBox(descTxt, 380, 32, 9);

    menuContainer.add([rowBg, slotBg, icon, nameTxt, statusBadge, descTxt]);

    const btnX = 638, btnY = rowY + 2, btnW = 182, btnH = 40;
    if (!isUnlocked) {
      const cost = cfg.unlockCost || 25;
      const canAfford = getGold() >= cost;
      const buyBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, canAfford ? 0x246b3d : 0x3b2c22)
        .setStrokeStyle(2, canAfford ? 0xffca28 : 0x6e5846)
        .setInteractive({ useHandCursor: true });
      const buyTxt = scene.add.text(btnX, btnY, `DESBLOQUEAR (${cost}G)`, textStyle(canAfford ? '#ffffff' : '#8c7b6b', 11)).setOrigin(0.5);
      fitTextToBox(buyTxt, btnW - 12, btnH - 8, 9);

      buyBtn.on('pointerover', () => {
        if (canAfford) {
          buyBtn.setFillStyle(0x2f8a4f);
          buyBtn.setStrokeStyle(2, 0xffeb3b);
          buyTxt.setColor('#ffeb3b');
        }
      });
      buyBtn.on('pointerout', () => {
        buyBtn.setFillStyle(canAfford ? 0x246b3d : 0x3b2c22);
        buyBtn.setStrokeStyle(2, canAfford ? 0xffca28 : 0x6e5846);
        buyTxt.setColor(canAfford ? '#ffffff' : '#8c7b6b');
      });
      buyBtn.on('pointerdown', () => {
        if (getGold() < cost) {
          sound.playShieldBlock();
          floatText(scene, btnX, btnY - 18, 'OURO INSUFICIENTE!', '#ff5252');
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
        floatText(scene, btnX, btnY - 22, `${cfg.name} FORJADA!`, '#ffd740');
      });

      menuContainer.add([buyBtn, buyTxt]);
    } else {
      const equipBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, isStarter ? 0x1f4724 : 0x6e3d1b)
        .setStrokeStyle(2, isStarter ? 0xffca28 : 0xc5a059)
        .setInteractive({ useHandCursor: true });
      const equipTxt = scene.add.text(btnX, btnY, isStarter ? '★ ARMA ATIVA' : 'ESCOLHER INICIAL', textStyle(isStarter ? '#ffd740' : '#ffffff', 11)).setOrigin(0.5);
      fitTextToBox(equipTxt, btnW - 12, btnH - 8, 9);

      equipBtn.on('pointerover', () => {
        equipBtn.setFillStyle(isStarter ? 0x2a5c2f : 0x945324);
        equipTxt.setColor('#ffeb3b');
      });
      equipBtn.on('pointerout', () => {
        equipBtn.setFillStyle(isStarter ? 0x1f4724 : 0x6e3d1b);
        equipTxt.setColor(isStarter ? '#ffd740' : '#ffffff');
      });
      equipBtn.on('pointerdown', () => {
        sound.playButtonClick();
        const curr = getUpgrades();
        curr.starterWeapon = key;
        saveUpgrades(curr);
        showBlacksmithMenu(scene);
        floatText(scene, btnX, btnY - 22, `${cfg.name} SERÁ SUA INICIAL!`, '#7fe7ff');
      });

      menuContainer.add([equipBtn, equipTxt]);
    }
  });

  // 4. BOTÕES DE RODAPÉ
  const playNowBtn = createButton(scene, 185, 536, 'INICIAR JORNADA', () => {
    sound.ensureContext();
    if (menuContainer) {
      menuContainer.destroy();
      menuContainer = null;
    }
    startGameplay(scene);
  }, 195, 40);

  const mageShopBtn = createButton(scene, 400, 536, 'SANTUÁRIO DO MAGO', () => {
    sound.playButtonClick();
    showMageShopMenu(scene);
  }, 200, 40);

  const backMenuBtn = createButton(scene, 615, 536, 'VOLTAR / SAIR [ESC]', () => exitSubMenu(scene), 195, 40);
  menuContainer.add([...playNowBtn, ...mageShopBtn, ...backMenuBtn]);
}

// -----------------------------------------------------------------------------
// O SANTUÁRIO DO MAGO ALQUIMISTA (UPGRADES PERMANENTES DE STATUS COM POÇÕES E ERVAS)
// -----------------------------------------------------------------------------
function showMageShopMenu(scene) {
  if (!scene) return;
  gameState = 'MENU';
  scene.time.paused = false;
  scene.time.timeScale = 1;
  scene.tweens.resumeAll();

  if (menuContainer) menuContainer.destroy();
  sound.startMenuBGM();

  menuContainer = createModal(
    scene,
    'SANTUÁRIO DO MAGO ALQUIMISTA',
    564,
    'Elixires místicos, infusões de ervas e aprimoramento permanente de atributos',
    740
  );
  menuContainer.isMainMenu = false;

  // Botão Rápido "✕ SAIR [ESC]" no canto superior direito do modal
  const closeQuickBtn = scene.add.rectangle(712, 46, 78, 28, 0x5c241b)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(712, 46, '✕ SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);
  closeQuickBtn.on('pointerover', () => closeQuickBtn.setFillStyle(0x8e2a1b));
  closeQuickBtn.on('pointerout', () => closeQuickBtn.setFillStyle(0x5c241b));
  closeQuickBtn.on('pointerdown', () => exitSubMenu(scene));
  menuContainer.add([closeQuickBtn, closeQuickTxt]);

  // 1. VINHETA VIVA DO ARQUIMAGO ALQUIMISTA (com Sprite Animado 'mage_master')
  const sanctumBg = scene.add.graphics();
  sanctumBg.fillStyle(0x160f26, 0.96).fillRoundedRect(56, 92, 420, 54, 7);
  sanctumBg.lineStyle(1.5, 0x9c27b0).strokeRoundedRect(56, 92, 420, 54, 7);

  const mageSprite = scene.add.sprite(86, 119, 'mage_master').play('mage_master').setScale(1.2);
  const mageTitle = scene.add.text(118, 99, 'ARQUIMAGO ALQUIMISTA', textStyle('#c36bff', 11));
  const mageSpeech = scene.add.text(118, 117, '“Beba meus elixires e seu poder ecoará em cada batalha!”', {
    ...textStyle('#e1bee7', 10, 'normal'),
    wordWrap: { width: 345, useAdvancedWrap: true }
  });
  fitTextToBox(mageSpeech, 345, 24, 9);

  // 2. PAINEL DE OURO DISPONÍVEL (x: 486..740)
  const goldBadge = scene.add.graphics();
  goldBadge.fillStyle(0x261c12, 0.98).fillRoundedRect(486, 92, 258, 54, 7);
  goldBadge.lineStyle(2, 0xffca28).strokeRoundedRect(486, 92, 258, 54, 7);
  const coinSprite = scene.add.sprite(514, 119, 'gold_coin').play('gold_coin').setScale(1.3);
  const goldValTxt = scene.add.text(536, 111, `OURO: ${getGold()}`, textStyle('#ffd740', 14)).setOrigin(0, 0.5);
  fitTextToBox(goldValTxt, 195, 22, 11);
  const goldHint = scene.add.text(536, 129, 'Status valem para todas as partidas!', textStyle('#7fe7ff', 10)).setOrigin(0, 0.5);

  menuContainer.add([sanctumBg, mageSprite, mageTitle, mageSpeech, goldBadge, coinSprite, goldValTxt, goldHint]);

  // 3. CARTAS DE STATUS UPGRADES (maxHp, moveSpeed, magnet, wisdom)
  const statusUpgrades = getStatusUpgrades();
  const statusKeys = ['maxHp', 'moveSpeed', 'magnet', 'wisdom'];
  const currentGold = getGold();

  statusKeys.forEach((key, idx) => {
    const cfg = STATUS_CATALOG[key];
    if (!cfg) return;
    const maxLvl = cfg.maxLevel || 5;
    const lvl = Phaser.Math.Clamp(statusUpgrades[key] || 1, 1, maxLvl);
    const isMax = lvl >= maxLvl;

    const rowY = 188 + idx * 82;
    const rowBg = scene.add.graphics();
    rowBg.fillStyle(0x1a1326, 0.96).fillRoundedRect(56, rowY - 35, 688, 74, 8);
    rowBg.lineStyle(2, isMax ? 0xffca28 : 0x7b1fa2).strokeRoundedRect(56, rowY - 35, 688, 74, 8);

    const slotBg = scene.add.graphics();
    slotBg.fillStyle(0x100b1a, 1).fillRoundedRect(68, rowY - 26, 52, 52, 6);
    slotBg.lineStyle(1.5, isMax ? 0xffca28 : cfg.potionColor || 0xc5a059).strokeRoundedRect(68, rowY - 26, 52, 52, 6);

    const icon = scene.add.image(94, rowY, cfg.icon).setScale(1.4);
    const nameTxt = scene.add.text(132, rowY - 28, cfg.name, textStyle('#ffca28', 13));

    const pips = scene.add.graphics();
    for (let p = 0; p < maxLvl; p++) {
      const activePip = p < lvl;
      pips.fillStyle(activePip ? 0x7fe7ff : 0x2e1c3b, 1).fillRect(425 + p * 18, rowY - 26, 14, 10);
      pips.lineStyle(1, activePip ? 0xffffff : 0x5c3b70).strokeRect(425 + p * 18, rowY - 26, 14, 10);
    }
    const lvlBadgeTxt = scene.add.text(522, rowY - 21, isMax ? 'NÍVEL MÁXIMO ★' : `NV. ${lvl}/${maxLvl}`, textStyle(isMax ? '#ffca28' : '#7fe7ff', 11)).setOrigin(0, 0.5);

    const levelDescs = cfg.levels || [];
    const descStr = isMax
      ? `★ MÁXIMO: ${levelDescs[lvl - 1] || ''}`
      : `Atual: ${levelDescs[lvl - 1] || ''}\nPróximo (Nv.${lvl + 1}): ${levelDescs[lvl] || ''}`;
    const descTxt = scene.add.text(132, rowY - 6, descStr, {
      ...textStyle('#e8dcbe', 11, 'normal'),
      lineSpacing: 3,
      wordWrap: { width: 395, useAdvancedWrap: true }
    });
    fitTextToBox(descTxt, 395, 36, 9);

    menuContainer.add([rowBg, slotBg, icon, nameTxt, pips, lvlBadgeTxt, descTxt]);

    const btnX = 638, btnY = rowY + 1, btnW = 182, btnH = 42;
    if (isMax) {
      const maxBox = scene.add.rectangle(btnX, btnY, btnW, btnH, 0x2e2418).setStrokeStyle(1.5, 0xffca28);
      const maxTxt = scene.add.text(btnX, btnY, 'NÍVEL MÁXIMO ★', textStyle('#ffca28', 11)).setOrigin(0.5);
      menuContainer.add([maxBox, maxTxt]);
    } else {
      const cost = cfg.costs[lvl - 1] || 20;
      const canAfford = currentGold >= cost;
      const actionLabel = `APRIMORAR (${cost}G)`;

      const buyBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, canAfford ? 0x4a148c : 0x332338)
        .setStrokeStyle(2, canAfford ? 0xffca28 : 0x5c4263)
        .setInteractive({ useHandCursor: true });
      const buyTxt = scene.add.text(btnX, btnY, actionLabel, textStyle(canAfford ? '#ffffff' : '#8c7b6b', 11)).setOrigin(0.5);
      fitTextToBox(buyTxt, btnW - 12, btnH - 8, 9);

      buyBtn.on('pointerover', () => {
        if (canAfford) {
          buyBtn.setFillStyle(0x6a1b9a);
          buyBtn.setStrokeStyle(2, 0xffeb3b);
          buyTxt.setColor('#ffeb3b');
        }
      });
      buyBtn.on('pointerout', () => {
        buyBtn.setFillStyle(canAfford ? 0x4a148c : 0x332338);
        buyBtn.setStrokeStyle(2, canAfford ? 0xffca28 : 0x5c4263);
        buyTxt.setColor(canAfford ? '#ffffff' : '#8c7b6b');
      });
      buyBtn.on('pointerdown', () => {
        if (getGold() < cost) {
          sound.playShieldBlock();
          floatText(scene, btnX, btnY - 18, 'OURO INSUFICIENTE!', '#ff5252');
          return;
        }
        addGold(-cost);
        const curr = getStatusUpgrades();
        curr[key] = Math.min(maxLvl, (curr[key] || 1) + 1);
        saveStatusUpgrades(curr);
        playerMaxHp = getPlayerMaxHp();
        sound.playItemCollect();
        sound.playCoin();
        showMageShopMenu(scene);
        floatText(scene, btnX, btnY - 22, `${cfg.shortName || cfg.name} NV.${curr[key]}!`, '#c36bff');
      });

      menuContainer.add([buyBtn, buyTxt]);
    }
  });

  // 4. BOTÕES DE RODAPÉ
  const playNowBtn = createButton(scene, 185, 536, 'INICIAR JORNADA', () => {
    sound.ensureContext();
    if (menuContainer) {
      menuContainer.destroy();
      menuContainer = null;
    }
    startGameplay(scene);
  }, 195, 40);

  const blacksmithBtn = createButton(scene, 400, 536, 'FORJA DO FERREIRO', () => {
    sound.playButtonClick();
    showBlacksmithMenu(scene);
  }, 200, 40);

  const backMenuBtn = createButton(scene, 615, 536, 'VOLTAR / SAIR [ESC]', () => exitSubMenu(scene), 195, 40);
  menuContainer.add([...playNowBtn, ...blacksmithBtn, ...backMenuBtn]);
}

// ----------------------------------------------------------------------------
// TÁBULA DE CONQUISTAS DO REINO (PROGRESSO ACUMULATIVO & RECOMPENSAS EM OURO)
// -----------------------------------------------------------------------------
function showAchievementsMenu(scene) {
  if (!scene) return;
  gameState = 'MENU';
  scene.time.paused = false;
  scene.time.timeScale = 1;
  scene.tweens.resumeAll();

  if (menuContainer) menuContainer.destroy();
  sound.startMenuBGM();

  menuContainer = createModal(
    scene,
    'TÁBULA DE CONQUISTAS DO REINO',
    564,
    'Complete façanhas heróicas de combate para desbloquear Ouro e glória eterna',
    740
  );
  menuContainer.isMainMenu = false;

  // Botão Rápido "✕ SAIR [ESC]" no canto superior direito do modal
  const closeQuickBtn = scene.add.rectangle(712, 46, 78, 28, 0x5c241b)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(712, 46, '✕ SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);
  closeQuickBtn.on('pointerover', () => closeQuickBtn.setFillStyle(0x8e2a1b));
  closeQuickBtn.on('pointerout', () => closeQuickBtn.setFillStyle(0x5c241b));
  closeQuickBtn.on('pointerdown', () => exitSubMenu(scene));
  menuContainer.add([closeQuickBtn, closeQuickTxt]);

  const achData = getAchievementsData();
  const totalCount = ACHIEVEMENTS_CATALOG.length;
  const unlockedCount = ACHIEVEMENTS_CATALOG.filter(a => achData.unlocked[a.id]).length;

  // 1. BARRA DE RESUMO SUPERIOR (CONQUISTAS TOTAIS + OURO)
  const summaryBox = scene.add.graphics();
  summaryBox.fillStyle(0x221a13, 0.96).fillRoundedRect(56, 92, 420, 52, 7);
  summaryBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(56, 92, 420, 52, 7);

  const crownIcon = scene.add.image(86, 118, 'hud_crown').setScale(1.1);
  const progTxt = scene.add.text(112, 106, `CONQUISTAS: ${unlockedCount} / ${totalCount} DESBLOQUEADAS`, textStyle('#ffca28', 12));
  const subProg = scene.add.text(112, 126, 'Conquistas concedem Ouro Real instantaneamente!', textStyle('#c5a059', 10));

  const goldBadge = scene.add.graphics();
  goldBadge.fillStyle(0x261c12, 0.98).fillRoundedRect(486, 92, 258, 52, 7);
  goldBadge.lineStyle(2, 0xffca28).strokeRoundedRect(486, 92, 258, 52, 7);
  const coinSprite = scene.add.sprite(514, 118, 'gold_coin').play('gold_coin').setScale(1.25);
  const goldValTxt = scene.add.text(536, 118, `OURO ATUAL: ${getGold()}`, textStyle('#ffd740', 13)).setOrigin(0, 0.5);

  menuContainer.add([summaryBox, crownIcon, progTxt, subProg, goldBadge, coinSprite, goldValTxt]);

  // 2. GRADE DE 8 CONQUISTAS (2 Colunas x 4 Linhas)
  ACHIEVEMENTS_CATALOG.forEach((ach, idx) => {
    const col = idx % 2; // 0 ou 1
    const row = Math.floor(idx / 2); // 0, 1, 2, 3
    const cardLeft = col === 0 ? 56 : 406;
    const cardW = 338;
    const cardH = 78;
    const cardTop = 158 + row * 84;

    const isDone = Boolean(achData.unlocked[ach.id]);
    const currentVal = Math.min(ach.target, achData.stats[ach.stat] || 0);
    const pct = Phaser.Math.Clamp(currentVal / ach.target, 0, 1);

    const cardBg = scene.add.graphics();
    cardBg.fillStyle(isDone ? 0x241d14 : 0x18130e, 0.95).fillRoundedRect(cardLeft, cardTop, cardW, cardH, 7);
    cardBg.lineStyle(1.5, isDone ? 0xffca28 : 0x4a3b2c).strokeRoundedRect(cardLeft, cardTop, cardW, cardH, 7);

    const iconSlot = scene.add.graphics();
    iconSlot.fillStyle(0x100c08, 1).fillRoundedRect(cardLeft + 8, cardTop + 13, 50, 50, 5);
    iconSlot.lineStyle(1, isDone ? 0xffca28 : 0x5c4938).strokeRoundedRect(cardLeft + 8, cardTop + 13, 50, 50, 5);

    const icon = scene.add.image(cardLeft + 33, cardTop + 38, ach.icon).setScale(1.25);
    if (!isDone) icon.setTint(0x777777);

    const titleTxt = scene.add.text(cardLeft + 66, cardTop + 8, ach.title, textStyle(isDone ? '#ffca28' : '#e0d2b4', 11));
    fitTextToBox(titleTxt, cardW - 74, 18, 10);

    const descTxt = scene.add.text(cardLeft + 66, cardTop + 24, ach.desc, {
      ...textStyle('#a8987b', 10, 'normal'),
      wordWrap: { width: cardW - 74, useAdvancedWrap: true }
    });
    fitTextToBox(descTxt, cardW - 74, 26, 9);

    // Barra gráfica de progresso
    const barX = cardLeft + 66;
    const barY = cardTop + 52;
    const barW = cardW - 142;
    const barH = 12;

    const progBar = scene.add.graphics();
    progBar.fillStyle(0x0e0b08, 1).fillRect(barX, barY, barW, barH);
    progBar.lineStyle(1, isDone ? 0xffca28 : 0x3d3024).strokeRect(barX, barY, barW, barH);
    if (pct > 0) {
      progBar.fillStyle(isDone ? 0xffca28 : 0x7fe7ff, 1).fillRect(barX + 1, barY + 1, Math.round((barW - 2) * pct), barH - 2);
    }

    const countTxt = scene.add.text(barX + barW / 2, barY + barH / 2, `${currentVal}/${ach.target}`, textStyle('#ffffff', 9)).setOrigin(0.5);

    // Badge de Ouro / Recompensa
    const rewardBadge = scene.add.rectangle(cardLeft + cardW - 36, barY + barH / 2, 64, 22, isDone ? 0x246b3d : 0x261d14)
      .setStrokeStyle(1, isDone ? 0xffca28 : 0x6e5846);
    const rewardTxt = scene.add.text(cardLeft + cardW - 36, barY + barH / 2, isDone ? '★ CONCLUÍDO' : `+${ach.rewardGold}G`, textStyle(isDone ? '#ffeb3b' : '#ffd740', 9)).setOrigin(0.5);
    fitTextToBox(rewardTxt, 60, 18, 8);

    menuContainer.add([cardBg, iconSlot, icon, titleTxt, descTxt, progBar, countTxt, rewardBadge, rewardTxt]);
  });

  // 3. BOTÃO DE VOLTAR NO RODAPÉ
  const backMenuBtn = createButton(scene, 400, 536, 'VOLTAR / SAIR [ESC]', () => exitSubMenu(scene), 260, 40);
  menuContainer.add(backMenuBtn);
}

// Redirecionador para garantir compatibilidade com chamadas existentes
function showShopMenu(scene, target = 'mage') {
  if (target === 'blacksmith' || target === 'items') {
    showBlacksmithMenu(scene);
  } else if (target === 'achievements') {
    showAchievementsMenu(scene);
  } else {
    showMageShopMenu(scene);
  }
}

// -----------------------------------------------------------------------------
// TELA DE RECORDES (TÁBULA DOS CAMPEÕES)
// -----------------------------------------------------------------------------
function showRecordsMenu(scene) {
  if (menuContainer) menuContainer.destroy();
  menuContainer = createModal(scene, 'TÁBULA DOS CAMPEÕES', 520, 'Os maiores guerreiros imortalizados pelas eras', 520);
  menuContainer.isMainMenu = false;

  const scores = getHighScores();
  const ranks = ['1º LUGAR', '2º LUGAR', '3º LUGAR', '4º LUGAR', '5º LUGAR'];
  const colors = ['#ffca28', '#e8e8e8', '#cd7f32', '#d6c8aa', '#a8987b'];

  scores.forEach((entry, i) => {
    const rowY = 175 + i * 50;
    const rowBg = scene.add.graphics();
    rowBg.fillStyle(i === 0 ? 0x2e2314 : 0x1d1611, 0.9).fillRoundedRect(170, rowY - 18, 460, 38, 4);
    rowBg.lineStyle(1, i === 0 ? 0xc5a059 : 0x4a3b2c).strokeRoundedRect(170, rowY - 18, 460, 38, 4);

    const rankTxt = scene.add.text(190, rowY, ranks[i], textStyle(colors[i], 12)).setOrigin(0, 0.5);
    const nameTxt = scene.add.text(370, rowY, entry.name, textStyle('#ffffff', 18)).setOrigin(0.5);
    const scoreTxt = scene.add.text(595, rowY, `${entry.score}s de glória`, textStyle(colors[i], 14)).setOrigin(1, 0.5);

    menuContainer.add([rowBg, rankTxt, nameTxt, scoreTxt]);
  });

  menuContainer.add(createButton(scene, 400, 485, 'VOLTAR / SAIR [ESC]', () => exitSubMenu(scene), 260, 44));
}

// -----------------------------------------------------------------------------
// TELA DE CONFIGURAÇÕES (ÁUDIO, TELA CHEIA E PERGAMINHO DE COMBATE)
// -----------------------------------------------------------------------------
function showSettingsMenu(scene) {
  if (menuContainer) menuContainer.destroy();
  menuContainer = createModal(scene, 'CONFIGURAÇÕES DO REINO', 540, 'Ajustes de áudio, vídeo (Tela Cheia) e pergaminho de batalha', 540);
  menuContainer.isMainMenu = false;

  // Seção 1: Áudio & Tela Cheia
  const audioBox = scene.add.graphics();
  audioBox.fillStyle(0x221a13, 0.92).fillRoundedRect(160, 118, 480, 108, 6);
  audioBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(160, 118, 480, 108, 6);

  const audioTitle = scene.add.text(180, 130, 'ÁUDIO & TELA CHEIA (FULLSCREEN)', textStyle('#ffca28', 12));
  const audioHint = scene.add.text(180, 202, 'Atalhos rápidos: [M] Alternar Áudio   |   [F] Alternar Tela Cheia', textStyle('#a8987b', 11));

  const audioToggleBtn = scene.add.rectangle(285, 172, 210, 36, sound.isMuted() ? 0x8e1b1b : 0x247a46)
    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });
  const audioToggleTxt = scene.add.text(285, 172, sound.isMuted() ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]', textStyle('#ffffff', 12))
    .setOrigin(0.5);

  audioToggleBtn.on('pointerdown', () => {
    sound.toggleMute();
    sound.playButtonClick();
    audioToggleBtn.setFillStyle(sound.isMuted() ? 0x8e1b1b : 0x247a46);
    audioToggleTxt.setText(sound.isMuted() ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]');
    if (hudHornIcon) hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
  });

  const fsToggleBtn = scene.add.rectangle(515, 172, 210, 36, isGameFullscreen(scene) ? 0x247a46 : 0x6e3d1b)
    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });
  const fsToggleTxt = scene.add.text(515, 172, isGameFullscreen(scene) ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]', textStyle('#ffffff', 12))
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

  // Seção 2: Pergaminho de Dicas
  const guideBox = scene.add.graphics();
  guideBox.fillStyle(0x1d1611, 0.92).fillRoundedRect(160, 238, 480, 215, 6);
  guideBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(160, 238, 480, 215, 6);

  const guideTitle = scene.add.text(400, 256, 'PERGAMINHO DE COMBATE', textStyle('#ffca28', 13)).setOrigin(0.5);
  const guideLines = [
    '• Inimigos derrotados dropam Moedas de Prata durante a partida.',
    '• No fim da partida, suas Moedas de Prata são convertidas em Ouro!',
    '• Use Ouro na Loja para evoluir Armas (Aba 1) e Status (Aba 2).',
    '• O Escudo Sagrado reflete projéteis mantendo o disparo normal.',
    '• Evolua Magnetismo, Vida Máxima (Corações) e Velocidade na Loja!',
    '• Pressione ESC para pausar/voltar ou F para Tela Cheia.'
  ];
  const guideTexts = guideLines.map((txt, i) =>
    scene.add.text(176, 280 + i * 26, txt, { ...textStyle('#d6c8aa', 11, 'normal'), lineSpacing: 4 })
  );

  menuContainer.add([
    audioBox, audioTitle, audioHint, audioToggleBtn, audioToggleTxt, fsToggleBtn, fsToggleTxt,
    guideBox, guideTitle, ...guideTexts,
    ...createButton(scene, 400, 498, 'VOLTAR / SAIR [ESC]', () => exitSubMenu(scene), 260, 44)
  ]);
}

