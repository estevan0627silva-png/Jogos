// =============================================================================
// COMPONENTES DE INTERFACE: BOTÕES, MODAIS, DRAFT DE LEVEL UP, PAUSA E RECORDES
// =============================================================================
// SISTEMA DE LEVEL UP & INTERFACE DE SELEÇÃO DE 3 CARTAS (RNG DRAFT SCREEN)
// -----------------------------------------------------------------------------
function rollLevelUpCards() {
  const unlockedKeys = getUnlockedWeaponPool();
  const weaponCards = [];

  unlockedKeys.forEach(key => {
    const cfg = WEAPON_CATALOG[key];
    const currLvl = getWeaponLevel(key);
    if (cfg) {
      const nextLvl = currLvl + 1;
      const isHeld = buff && buff.type === key;
      const lvlDesc = (cfg.levels && cfg.levels[nextLvl - 1])
        ? cfg.levels[nextLvl - 1]
        : `✦ PODER TRANSCENDENTAL (NV. ${nextLvl})!\n+15% Cadência de disparo, +Dano e escala contínua de combate.`;

      weaponCards.push({
        id: `upg_${key}_${nextLvl}`,
        category: isHeld ? 'ARMA EQUIPADA' : 'EVOLUÇÃO DE ARMA',
        title: cfg.name,
        badge: `NV. ${currLvl} ➔ NV. ${nextLvl}`,
        badgeColor: nextLvl >= 5 ? '#ffca28' : '#7fe7ff',
        borderColor: nextLvl >= 5 ? 0xffca28 : 0x7fe7ff,
        icon: cfg.icon,
        desc: `${lvlDesc}\n\n✦ Equipa esta arma imediatamente!`,
        weight: isHeld ? 3 : 2,
        apply: (scene) => {
          runWeaponLevels[key] = nextLvl;
          equipWeaponBuff(scene, key, false);
          floatText(scene, player.x, player.y - 28, `${cfg.name} NV.${nextLvl}!`, '#ffca28');
        }
      });
    }
  });

  // Cartas de Pergaminhos Arcanos (Regra: apenas 1 pergaminho por partida, até Nv. 5)
  const scrollCards = [];
  const scrollKeys = ['multishot', 'growth', 'attackspeed'];
  scrollKeys.forEach(sKey => {
    if (chosenScroll !== null && chosenScroll !== sKey) return;
    const currLvl = scrollLevels[sKey] || 0;
    if (currLvl >= 5) return;
    const nextLvl = currLvl + 1;
    const sCfg = SCROLL_CATALOG[sKey];
    if (!sCfg) return;
    const lvlDesc = sCfg.levels[nextLvl - 1] || `+Poder arcano NV. ${nextLvl}`;
    scrollCards.push({
      id: `scroll_${sKey}_${nextLvl}`,
      category: chosenScroll === sKey ? 'PERGAMINHO ATIVO' : 'PERGAMINHO ARCANO',
      title: sCfg.name,
      badge: currLvl === 0 ? 'NOVO! NV. 1' : `NV. ${currLvl} ➔ NV. ${nextLvl}`,
      badgeColor: '#b388ff',
      borderColor: 0xb388ff,
      icon: sCfg.icon,
      desc: `${lvlDesc}\n\n✦ ${chosenScroll === null ? 'ESCOLHA EXCLUSIVA: Trava este pergaminho para toda a partida (Nv. Máx 5)!' : 'Aprimora seu pergaminho exclusivo nesta partida!'}`,
      weight: chosenScroll === sKey ? 3 : 2,
      apply: (scene) => {
        chosenScroll = sKey;
        scrollLevels[sKey] = nextLvl;
        sound.playLevelUp();
        floatText(scene, player.x, player.y - 32, `${sCfg.shortName} NV.${nextLvl}!`, '#b388ff');
        updateScrollHUD();
      }
    });
  });

  // Cartas de Itens e Relíquias Táticas da Partida (garantem sempre 3 opções distintas!)
  const itemCards = [
    {
      id: 'item_duration_boost',
      category: 'RELÍQUIA TEMPORAL',
      title: 'AMPULHETA REAL',
      badge: '+1.2s DURAÇÃO',
      badgeColor: '#ffca28',
      borderColor: 0xc5a059,
      icon: 'hud_hourglass',
      desc: 'Aumenta em +1.2s a duração de todas as armas nesta partida e recarrega sua arma ativa!',
      apply: (scene) => {
        runBonusDuration += 1.2;
        if (buff.type) {
          equipWeaponBuff(scene, buff.type, false);
        } else {
          const randW = Phaser.Utils.Array.GetRandom(unlockedKeys);
          equipWeaponBuff(scene, randW, false);
        }
        floatText(scene, player.x, player.y - 28, '+1.2s DURAÇÃO DE ARMAS!', '#ffca28');
      }
    },
    {
      id: 'item_random_relic',
      category: 'BAÚ DE ARMAS',
      title: 'ARSENAL DO REI',
      badge: 'ARMA + 4 PRATAS',
      badgeColor: '#e0f7fa',
      borderColor: 0x80deea,
      icon: 'silver_coin',
      desc: 'Invoca e equipa imediatamente uma Relíquia de Combate com +3s extras e concede +4 Moedas de Prata!',
      apply: (scene) => {
        const chosen = Phaser.Utils.Array.GetRandom(unlockedKeys);
        equipWeaponBuff(scene, chosen, false);
        buff.timeLeft += 3.0;
        buff.maxTime += 3.0;
        runSilver += 4;
        if (hudSilverText && hudSilverText.active) hudSilverText.setText(`${runSilver}`);
        floatText(scene, player.x, player.y - 28, `${BUFF_NAMES[chosen]} SOBRECARREGADO!`, '#7fe7ff');
      }
    },
    {
      id: 'item_holy_chalice',
      category: 'ITEM SAGRADO',
      title: 'BÊNÇÃO DO ESCUDO',
      badge: playerHp < playerMaxHp ? '+1 CORAÇÃO + ONDA' : 'ONDA + ESCUDO',
      badgeColor: '#ff8a80',
      borderColor: 0xff5252,
      icon: 'stat_health',
      desc: 'Restaura 1 Coração de Vida (ou concede +5 Pratas se cheio) e libera uma Onda Sagrada ao redor do herói!',
      apply: (scene) => {
        if (playerHp < playerMaxHp) {
          playerHp = Math.min(playerMaxHp, playerHp + 1);
          updateHeartsHUD();
          floatText(scene, player.x, player.y - 28, '+1 CORAÇÃO RESTAURADO!', '#ff5252');
        } else {
          runSilver += 5;
          if (hudSilverText && hudSilverText.active) hudSilverText.setText(`${runSilver}`);
          floatText(scene, player.x, player.y - 28, '+5 PRATAS REAIS!', '#e0f7fa');
        }
        explodeFireball(scene, player.x, player.y, 135, 3);
      }
    }
  ];

  // Se o jogador já maximizou várias armas, adiciona cartas de Mestria para as armas Nv. 5
  unlockedKeys.forEach(key => {
    if (getWeaponLevel(key) >= MAX_WEAPON_LEVEL) {
      const cfg = WEAPON_CATALOG[key];
      itemCards.push({
        id: `mastery_${key}`,
        category: 'MESTRIA MÁXIMA',
        title: `${cfg.name} SUPREMO`,
        badge: 'EQUIPAR NV. 5 ★',
        badgeColor: '#ffd740',
        borderColor: 0xffca28,
        icon: cfg.icon,
        desc: `Equipa imediatamente ${cfg.name} no Nível 5 Máximo com +4s de duração bônus!`,
        apply: (scene) => {
          equipWeaponBuff(scene, key, false);
          buff.timeLeft += 4.0;
          buff.maxTime += 4.0;
          floatText(scene, player.x, player.y - 28, `${cfg.name} SUPREMO!`, '#ffd740');
        }
      });
    }
  });

  // Sorteio RNG sem repetição: prioriza Cartas de Armas e completa até ter exatamente 3 cartas distintas
  const shuffledWeapons = Phaser.Utils.Array.Shuffle(weaponCards.slice());
  const shuffledItems = Phaser.Utils.Array.Shuffle(itemCards.slice());
  const shuffledScrolls = Phaser.Utils.Array.Shuffle(scrollCards.slice());

  const selected = [];
  const usedIds = new Set();

  // 1. Inclui 1 opção de Pergaminho Arcano se houver pergaminho elegível
  if (shuffledScrolls.length > 0) {
    const sCard = shuffledScrolls[0];
    selected.push(sCard);
    usedIds.add(sCard.id);
  }

  // Garante pelo menos 2 cartas de evolução de armas (se disponíveis) e 1 carta versátil/arma
  shuffledWeapons.forEach(card => {
    if (selected.length < 3 && !usedIds.has(card.id)) {
      selected.push(card);
      usedIds.add(card.id);
    }
  });

  shuffledItems.forEach(card => {
    if (selected.length < 3 && !usedIds.has(card.id)) {
      selected.push(card);
      usedIds.add(card.id);
    }
  });

  return selected.slice(0, 3);
}

function openLevelUpDraft(scene) {
  if (!scene || (gameState !== 'PLAYING' && gameState !== 'LEVEL_UP')) return;
  gameState = 'LEVEL_UP';

  // Pausa o mundo de jogo com segurança enquanto o jogador escolhe sua carta
  scene.physics.pause();
  scene.time.paused = true;
  if (player && player.body) player.setVelocity(0, 0);
  [player, ...enemies.getChildren()].forEach(s => {
    if (s && s.anims) s.anims.pause();
  });
  sound.pauseBGM();
  sound.playLevelUp();

  if (draftModal) {
    draftModal.destroy();
    draftModal = null;
  }

  const cards = rollLevelUpCards();
  draftModal = scene.add.container(0, 0).setDepth(3300).setScrollFactor(0);

  const overlay = scene.add.rectangle(400, 300, 800, 600, 0x06040a, 0.80);
  const bannerBg = scene.add.graphics();
  bannerBg.fillStyle(0x16110c, 0.98).fillRoundedRect(120, 28, 560, 74, 10);
  bannerBg.lineStyle(3, 0xffca28).strokeRoundedRect(120, 28, 560, 74, 10);
  bannerBg.lineStyle(1, 0x8d5524).strokeRoundedRect(125, 33, 550, 64, 8);

  const titleTxt = scene.add.text(400, 52, `✦ SUBIU PARA O NÍVEL ${runLevel}! ✦`, {
    ...textStyle('#ffca28', 22),
    fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);
  const subTxt = scene.add.text(400, 80, 'ESCOLHA 1 CARTA DE UPGRADE DE ARMA OU ITEM (CLIQUE OU TECLAS [1] [2] [3])', textStyle('#7fe7ff', 11)).setOrigin(0.5);
  fitTextToBox(subTxt, 520, 20, 9);

  draftModal.add([overlay, bannerBg, titleTxt, subTxt]);

  let chosen = false;
  const selectCard = (card) => {
    if (chosen) return;
    chosen = true;
    scene.input.keyboard.off('keydown-ONE', onKey1);
    scene.input.keyboard.off('keydown-TWO', onKey2);
    scene.input.keyboard.off('keydown-THREE', onKey3);

    sound.playItemCollect();
    if (draftModal) {
      draftModal.destroy();
      draftModal = null;
    }

    card.apply(scene);
    pendingLevelUps = Math.max(0, pendingLevelUps - 1);
    updateXpHUD();

    if (pendingLevelUps > 0) {
      openLevelUpDraft(scene);
      return;
    }

    // Retoma a partida com janela curta de invencibilidade (750ms) para transição justa
    gameState = 'PLAYING';

    scene.physics.resume();
    scene.time.paused = false;
    scene.tweens.resumeAll();
    [player, ...enemies.getChildren()].forEach(s => {
      if (s && s.anims) s.anims.resume();
    });
    sound.resumeBGM();

    playerInvulnerable = true;
    scene.time.delayedCall(750, () => {
      playerInvulnerable = false;
    });
  };

  const onKey1 = () => cards[0] && selectCard(cards[0]);
  const onKey2 = () => cards[1] && selectCard(cards[1]);
  const onKey3 = () => cards[2] && selectCard(cards[2]);
  scene.input.keyboard.once('keydown-ONE', onKey1);
  scene.input.keyboard.once('keydown-TWO', onKey2);
  scene.input.keyboard.once('keydown-THREE', onKey3);

  const cardPositions = [155, 400, 645];
  const cardW = 224;
  const cardH = 380;
  const cardY = 315;

  cards.forEach((card, idx) => {
    const cx = cardPositions[idx];
    const left = cx - cardW / 2;
    const top = cardY - cardH / 2;

    const cardBg = scene.add.graphics();
    const drawCardFrame = (hover = false) => {
      cardBg.clear();
      cardBg.fillStyle(hover ? 0x2b2016 : 0x1b140e, 0.98).fillRoundedRect(left, top, cardW, cardH, 10);
      cardBg.lineStyle(hover ? 3 : 2, hover ? 0xffeb3b : card.borderColor).strokeRoundedRect(left, top, cardW, cardH, 10);
      cardBg.lineStyle(1, 0x6e5233).strokeRoundedRect(left + 5, top + 5, cardW - 10, cardH - 10, 7);
      cardBg.fillStyle(0x110c08, 1).fillRoundedRect(cx - 34, top + 46, 68, 68, 8);
      cardBg.lineStyle(1.5, card.borderColor).strokeRoundedRect(cx - 34, top + 46, 68, 68, 8);
    };
    drawCardFrame(false);

    const catTxt = scene.add.text(cx, top + 24, card.category, textStyle('#c5a059', 10)).setOrigin(0.5);
    const iconImg = scene.add.image(cx, top + 80, card.icon).setScale(1.65);
    const nameTxt = scene.add.text(cx, top + 136, card.title, {
      ...textStyle('#ffca28', 14),
      fontFamily: 'Georgia, serif',
      align: 'center',
      wordWrap: { width: cardW - 24, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(nameTxt, cardW - 24, 26, 9);

    const badgeBg = scene.add.rectangle(cx, top + 166, cardW - 36, 24, 0x100c09).setStrokeStyle(1, card.borderColor);
    const badgeTxt = scene.add.text(cx, top + 166, card.badge, textStyle(card.badgeColor, 11)).setOrigin(0.5);
    fitTextToBox(badgeTxt, cardW - 44, 20, 9);

    const descTxt = scene.add.text(cx, top + 246, card.desc, {
      ...textStyle('#e8dcbe', 11, 'normal'),
      align: 'center',

      lineSpacing: 4,
      wordWrap: { width: cardW - 28, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(descTxt, cardW - 26, 120, 9);

    const pickBtn = scene.add.rectangle(cx, top + cardH - 34, cardW - 32, 36, 0x246b3d)
      .setStrokeStyle(2, 0xffca28);
    const pickTxt = scene.add.text(cx, top + cardH - 34, `ESCOLHER [${idx + 1}]`, textStyle('#ffffff', 12)).setOrigin(0.5);

    const hitZone = scene.add.rectangle(cx, cardY, cardW, cardH, 0x000000, 0)
      .setInteractive({ useHandCursor: true });

    hitZone.on('pointerover', () => {
      drawCardFrame(true);
      pickBtn.setFillStyle(0x2f8a4f);
      pickTxt.setColor('#ffeb3b');
    });
    hitZone.on('pointerout', () => {
      drawCardFrame(false);
      pickBtn.setFillStyle(0x246b3d);
      pickTxt.setColor('#ffffff');
    });
    hitZone.on('pointerdown', () => selectCard(card));

    draftModal.add([cardBg, catTxt, iconImg, nameTxt, badgeBg, badgeTxt, descTxt, pickBtn, pickTxt, hitZone]);
  });
}

// -----------------------------------------------------------------------------
// BOTÕES NOBRES MEDIEVAIS EM CARVALHO & OURO
// -----------------------------------------------------------------------------
function createButton(scene, x, y, label, onClick, w = 260, h = 46) {
  const btn = scene.add.rectangle(x, y, w, h, 0x6e3d1b).setStrokeStyle(2, 0xc5a059).setInteractive({ useHandCursor: true });
  const txt = scene.add.text(x, y, label, { ...textStyle('#ffffff', 14), fontFamily: 'Georgia, serif' }).setOrigin(0.5);
  fitTextToBox(txt, w - 16, h - 8, 10);

  btn.on('pointerover', () => {
    btn.setFillStyle(0x945324);
    btn.setStrokeStyle(2, 0xffeb3b);
    txt.setColor('#ffeb3b');
  });
  btn.on('pointerout', () => {
    btn.setFillStyle(0x6e3d1b);
    btn.setStrokeStyle(2, 0xc5a059);
    txt.setColor('#ffffff');
  });
  btn.once('pointerdown', () => {
    sound.playButtonClick();
    onClick();
  });
  return [btn, txt];
}

// -----------------------------------------------------------------------------
// FÁBRICA UNIFICADA DE JANELAS E MODAIS MEDIEVAIS (COM ANCORAGEM DINÂMICA)
// -----------------------------------------------------------------------------
function createModal(scene, titleText, height, subtitleText = '', width = 520) {
  const cx = GAME_WIDTH / 2;
  const cy = GAME_HEIGHT / 2;
  const left = cx - width / 2;
  const top = cy - height / 2;
  const overlay = scene.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.74);

  const frame = scene.add.graphics();
  frame.fillStyle(0x16120e, 0.97).fillRoundedRect(left, top, width, height, 14);
  frame.lineStyle(3, 0x8d5524).strokeRoundedRect(left, top, width, height, 14);
  frame.lineStyle(1.5, 0xc5a059).strokeRoundedRect(left + 4, top + 4, width - 8, height - 8, 11);

  // Rebites ornamentais nos 4 cantos
  const rOff = 14;
  [
    [left + rOff, top + rOff],
    [left + width - rOff, top + rOff],
    [left + rOff, top + height - rOff],
    [left + width - rOff, top + height - rOff]
  ].forEach(([rx, ry]) => {
    frame.fillStyle(0xc5a059, 1).fillCircle(rx, ry, 3.5);
    frame.fillStyle(0x3a2818, 1).fillCircle(rx, ry, 1.5);
  });

  const titleShadow = scene.add.text(cx + 2, top + 30, titleText, { ...textStyle('#080604', 22), fontFamily: 'Georgia, serif' }).setOrigin(0.5);
  const title = scene.add.text(cx, top + 28, titleText, { ...textStyle('#ffca28', 22), fontFamily: 'Georgia, serif' }).setOrigin(0.5);
  fitTextToBox(title, width - 80, 32, 14);
  titleShadow.setFontSize(title.style.fontSize);

  const children = [overlay, frame, titleShadow, title];
  if (subtitleText) {
    const sub = scene.add.text(cx, top + 54, subtitleText, {
      ...textStyle('#c5a059', 11),
      align: 'center',

      wordWrap: { width: width - 60, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(sub, width - 60, 26, 9);
    frame.lineStyle(1, 0xc5a059, 0.45).lineBetween(left + 40, top + 68, left + width - 40, top + 68);
    children.push(sub);
  }

  return scene.add.container(0, 0, children).setDepth(3000).setScrollFactor(0);
}


// SISTEMA DE PAUSA (ESC)
// -----------------------------------------------------------------------------
function handleEscPress(scene) {
  if (gameState === 'PLAYING') {
    pauseGame(scene);
  } else if (gameState === 'PAUSED') {
    resumeGame(scene);
  } else if (gameState === 'MENU' && menuContainer && !menuContainer.isMainMenu) {
    exitSubMenu(scene);
  }
}

function pauseGame(scene) {
  if (gameState !== 'PLAYING') return;
  gameState = 'PAUSED';

  scene.physics.pause();
  scene.time.paused = true;
  scene.tweens.pauseAll();
  [player, ...enemies.getChildren()].forEach(s => {
    if (s && s.anims) s.anims.pause();
  });
  if (player && player.body) {
    player.setVelocity(0, 0);
  }
  sound.pauseBGM();
  sound.playButtonClick();
  showPauseModal(scene);
}

function resumeGame(scene) {
  if (gameState !== 'PAUSED') return;
  if (pauseModal) {
    pauseModal.destroy();
    pauseModal = null;
  }
  gameState = 'PLAYING';

  scene.physics.resume();
  scene.time.paused = false;
  scene.tweens.resumeAll();
  [player, ...enemies.getChildren()].forEach(s => {
    if (s && s.anims) s.anims.resume();
  });
  sound.resumeBGM();
  sound.playButtonClick();
}

function showPauseModal(scene) {
  if (pauseModal) pauseModal.destroy();

  const height = 470;
  const top = (GAME_HEIGHT - height) / 2;
  pauseModal = createModal(scene, 'JOGO PAUSADO', height, '★ JORNADA EM ESPERA ★', 480);

  // Status de sobrevivência, prata e relíquia
  const statsBox = scene.add.graphics();
  statsBox.fillStyle(0x221a13, 0.92).fillRoundedRect(190, top + 84, 420, 62, 6);
  statsBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(190, top + 84, 420, 62, 6);

  const timeTxt = scene.add.text(208, top + 98, `TEMPO: ${survivalTime}s  |  PRATA: ${runSilver}  |  OURO: ${getGold()}`, textStyle('#ffca28', 12));
  fitTextToBox(timeTxt, 384, 22, 10);
  const relicName = buff.type ? `${BUFF_NAMES[buff.type]} NV.${getWeaponLevel(buff.type)} (${Math.max(0, buff.timeLeft).toFixed(1)}s)` : 'Nenhuma';
  const relicColor = buff.type ? '#7fe7ff' : '#8c8272';
  const relicTxt = scene.add.text(208, top + 122, `RELÍQUIA ATIVA: ${relicName}`, textStyle(relicColor, 12));
  fitTextToBox(relicTxt, 384, 22, 10);

  const continueBtn = createButton(scene, 400, top + 174, 'CONTINUAR JORNADA [ESC]', () => resumeGame(scene), 290, 38);

  const audioBtn = scene.add.rectangle(400, top + 220, 290, 38, sound.isMuted() ? 0x8e1b1b : 0x247a46)
    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });
  const audioTxt = scene.add.text(400, top + 220, sound.isMuted() ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]', textStyle('#ffffff', 12))
    .setOrigin(0.5);

  const updateAudioUI = () => {
    if (!audioBtn.active) return;
    audioBtn.setFillStyle(sound.isMuted() ? 0x8e1b1b : 0x247a46);
    audioTxt.setText(sound.isMuted() ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]');
    if (hudHornIcon) hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
  };

  audioBtn.on('pointerdown', () => {
    sound.toggleMute();
    sound.playButtonClick();
    updateAudioUI();
  });

  const fsBtn = scene.add.rectangle(400, top + 266, 290, 38, isGameFullscreen(scene) ? 0x247a46 : 0x6e3d1b)
    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });
  const fsTxt = scene.add.text(400, top + 266, isGameFullscreen(scene) ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]', textStyle('#ffffff', 12))
    .setOrigin(0.5);

  const updateFsUI = () => {
    if (!fsBtn.active) return;
    const active = isGameFullscreen(scene);
    fsBtn.setFillStyle(active ? 0x247a46 : 0x6e3d1b);
    fsTxt.setText(active ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]');
  };

  fsBtn.on('pointerdown', () => {
    sound.playButtonClick();
    toggleFullscreen(scene);
    scene.time.delayedCall(80, updateFsUI);
  });

  pauseModal.updateAudio = updateAudioUI;
  pauseModal.updateFullscreen = updateFsUI;

  const restartBtn = createButton(scene, 400, top + 312, 'REINICIAR MISSÃO', () => restartScene(scene, true, false), 290, 38);
  const menuBtn = createButton(scene, 400, top + 358, 'MENU PRINCIPAL', () => restartScene(scene, false, false), 290, 38);
  const footerHint = scene.add.text(400, top + 412, 'Pressione ESC para retornar à aventura', textStyle('#a8987b', 11)).setOrigin(0.5);

  pauseModal.add([
    statsBox, timeTxt, relicTxt,
    ...continueBtn,
    audioBtn, audioTxt,
    fsBtn, fsTxt,
    ...restartBtn,
    ...menuBtn,
    footerHint
  ]);
}


// GAME OVER: CONVERSÃO PRATA -> OURO, BOUNDING BOX COM WORD WRAP & AUTO-SIZE
// -----------------------------------------------------------------------------
function showInitials(scene) {
  let name = '', done = false;
  const modalW = 540;
  const modalH = 510;
  const cx = GAME_WIDTH / 2;
  const top = (GAME_HEIGHT - modalH) / 2;
  const boxW = modalW - 56;
  const boxLeft = cx - boxW / 2;

  const summary = lastRunSummary || {
    silverCollected: runSilver,
    goldFromSilver: Math.floor(runSilver / 3),


    totalGoldEarned: runGold,
    newTotalGold: getGold()
  };

  const modal = createModal(scene, 'O CAVALEIRO TOMBOU', modalH, '★ CONSOLIDAÇÃO DE FIM DE JORNADA ★', modalW);

  // Bounding Box interna com limites estritos para o resumo e conversão Prata -> Ouro
  const summaryBox = scene.add.graphics();
  summaryBox.fillStyle(0x1f1711, 0.96).fillRoundedRect(boxLeft, top + 80, boxW, 132, 8);
  summaryBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(boxLeft, top + 80, boxW, 132, 8);
  summaryBox.lineStyle(1, 0xc5a059, 0.35).lineBetween(boxLeft + 20, top + 114, boxLeft + boxW - 20, top + 114);

  const braveryTxt = scene.add.text(cx, top + 97, `Tempo de bravura em combate: ${survivalTime}s`, {
    ...textStyle('#f5e6c8', 14),
    align: 'center',
    wordWrap: { width: boxW - 28, useAdvancedWrap: true }
  }).setOrigin(0.5);
  fitTextToBox(braveryTxt, boxW - 28, 26, 11);

  // Linha visual de Conversão: Moedas de Prata ➔ Moedas de Ouro
  const silverSprite = scene.add.sprite(cx - 165, top + 138, 'silver_coin').play('silver_coin').setScale(1.3);
  const goldSprite = scene.add.sprite(cx + 28, top + 138, 'gold_coin').play('gold_coin').setScale(1.3);

  const conversionLine = scene.add.text(
    cx - 148,
    top + 138,
    `${summary.silverCollected ?? summary.runSilver ?? 0} Pratas   ➔`,
    textStyle('#e0f7fa', 14)
  ).setOrigin(0, 0.5);

  const goldEarnedLine = scene.add.text(
    cx + 45,
    top + 138,
    `+${summary.totalGoldEarned ?? summary.earnedGold ?? 0} OURO REAL`,
    textStyle('#ffd740', 14)
  ).setOrigin(0, 0.5);
  fitTextToBox(goldEarnedLine, 165, 24, 10);

  const bonusParts = [`Prata convertida (3:1): +${summary.goldFromSilver ?? summary.earnedGold ?? 0}G`, `Cofre Total: ${summary.newTotalGold ?? summary.totalGold ?? getGold()}G`];




  const breakdownTxt = scene.add.text(cx, top + 182, bonusParts.join('  •  '), {
    ...textStyle('#c5a059', 11, 'normal'),
    align: 'center',
    wordWrap: { width: boxW - 24, useAdvancedWrap: true }
  }).setOrigin(0.5);
  fitTextToBox(breakdownTxt, boxW - 24, 38, 9);

  // Seção de Registro de Iniciais ancorada abaixo da Bounding Box
  const promptTxt = scene.add.text(cx, top + 234, 'Digite suas 3 iniciais de honra para a Tábula:', {
    ...textStyle('#e8dcbe', 13),
    align: 'center',
    wordWrap: { width: boxW - 20, useAdvancedWrap: true }
  }).setOrigin(0.5);
  fitTextToBox(promptTxt, boxW - 20, 24, 10);

  const inputBg = scene.add.graphics();
  inputBg.fillStyle(0x0e0b08, 0.95).fillRoundedRect(cx - 140, top + 256, 280, 54, 6);
  inputBg.lineStyle(2, 0xc5a059).strokeRoundedRect(cx - 140, top + 256, 280, 54, 6);
  inputBg.lineStyle(1, 0x4a3b2c).strokeRoundedRect(cx - 137, top + 259, 274, 48, 4);

  const placeholder = scene.add.text(cx, top + 283, 'EX: ART', {
    ...textStyle('#736148', 23),
    fontStyle: 'bold',
    fontFamily: 'Courier New, monospace'
  }).setOrigin(0.5);

  const display = scene.add.text(cx, top + 283, '', {
    ...textStyle('#ffca28', 28),
    fontStyle: 'bold',
    fontFamily: 'Courier New, monospace'
  }).setOrigin(0.5);

  const cursor = scene.add.text(cx + 65, top + 283, '|', { ...textStyle('#ffca28', 25) }).setOrigin(0.5);
  const cursorTween = scene.tweens.add({
    targets: cursor,
    alpha: { from: 1, to: 0 },
    duration: 500,
    yoyo: true,
    repeat: -1
  });

  const inputHint = scene.add.text(cx, top + 328, 'Digite 3 letras no teclado e confirme abaixo', {
    ...textStyle('#a8987b', 11),
    align: 'center',
    wordWrap: { width: boxW - 20, useAdvancedWrap: true }
  }).setOrigin(0.5);

  const updateDisplay = () => {
    if (name.length === 0) {
      placeholder.setVisible(true);
      display.setText('');
      cursor.setVisible(true).setX(cx + 65);
    } else {
      placeholder.setVisible(false);
      display.setText(name.padEnd(3, '_').split('').join(' '));
      cursor.setVisible(name.length < 3).setX(cx + (name.length - 1) * 22 + 16);
    }
  };
  updateDisplay();

  const onKey = (e) => {
    if (e.key === 'Backspace') {
      name = name.slice(0, -1);
      sound.playButtonClick();
    } else if (e.key === 'Enter') {
      return submit(false);
    } else if (/^[a-zA-Z]$/.test(e.key) && name.length < 3) {
      name += e.key.toUpperCase();
      sound.playButtonClick();
    }
    updateDisplay();
  };

  const submit = (goDirectlyToShop = false) => {
    if (done) return;
    done = true;
    sound.playButtonClick();
    cursorTween.stop();
    scene.input.keyboard.off('keydown', onKey);
    modal.destroy();
    const finalName = name.padEnd(3, 'A');
    const scores = saveHighScore(finalName, survivalTime);
    if (goDirectlyToShop) {
      restartScene(scene, false, true, 'mage');
    } else {
      showLeaderboard(scene, scores, finalName);
    }
  };

  modal.add([
    summaryBox, braveryTxt, silverSprite, conversionLine, goldSprite, goldEarnedLine, breakdownTxt,
    promptTxt, inputBg, placeholder, display, cursor, inputHint,
    ...createButton(scene, cx - 118, top + 392, 'CONFIRMAR HONRA', () => submit(false), 216, 44),
    ...createButton(scene, cx + 118, top + 392, 'SANTUÁRIO DO MAGO', () => submit(true), 216, 44)
  ]);
  scene.input.keyboard.on('keydown', onKey);
}

function showLeaderboard(scene, topScores, currentName) {
  const modalW = 580;
  const modalH = 500;
  const cx = GAME_WIDTH / 2;
  const top = (GAME_HEIGHT - modalH) / 2;

  const summary = lastRunSummary || { silverCollected: runSilver, totalGoldEarned: runGold };
  const subtitle = `Prata Convertida: ${summary.silverCollected ?? summary.runSilver ?? 0} ➔ +${summary.totalGoldEarned ?? summary.earnedGold ?? 0} Ouro  |  Cofre Total: ${getGold()} Ouro`;

  const modal = createModal(scene, 'CAMPEÕES DO REINO', modalH, subtitle, modalW);
  let marked = false;

  topScores.forEach((entry, i) => {
    const isMine = !marked && entry.name === currentName && entry.score === survivalTime;
    if (isMine) marked = true;
    const rankLabel = ['1º', '2º', '3º', '4º', '5º'][i];
    const rowY = top + 118 + i * 44;

    const rowBg = scene.add.graphics();
    rowBg.fillStyle(isMine ? 0x2e2314 : 0x1d1611, 0.92).fillRoundedRect(cx - 230, rowY - 17, 460, 34, 4);
    rowBg.lineStyle(1, isMine ? 0xffca28 : 0x4a3b2c).strokeRoundedRect(cx - 230, rowY - 17, 460, 34, 4);

    const rowTxt = scene.add.text(cx, rowY, `${rankLabel}   ${entry.name}   —   ${entry.score}s de glória`, {
      ...textStyle(isMine ? '#ffca28' : '#e8dcbe', 16),
      fontStyle: isMine ? 'bold' : 'normal'
    }).setOrigin(0.5);
    fitTextToBox(rowTxt, 430, 28, 12);

    modal.add([rowBg, rowTxt]);
  });

  let restarting = false;
  const finishAndRestart = (autoStart, openShop = false, shopTab = 'mage') => {
    if (restarting) return;
    restarting = true;
    scene.input.keyboard.off('keydown-SPACE', onQuickRestart);
    scene.input.keyboard.off('keydown-ENTER', onQuickRestart);
    modal.destroy();
    restartScene(scene, autoStart, openShop, shopTab);
  };

  const onQuickRestart = () => {
    sound.playButtonClick();
    finishAndRestart(true, false);
  };

  const newRunBtn = createButton(scene, cx - 138, top + 368, '⚔ NOVA JORNADA', () => finishAndRestart(true, false), 254, 36);
  const forgeBtn = createButton(scene, cx + 138, top + 368, 'FORJA DO FERREIRO', () => finishAndRestart(false, true, 'blacksmith'), 254, 36);
  const mageBtn = createButton(scene, cx - 138, top + 412, 'SANTUÁRIO DO MAGO', () => finishAndRestart(false, true, 'mage'), 254, 36);
  const menuBtn = createButton(scene, cx + 138, top + 412, 'MENU INICIAL', () => finishAndRestart(false, false), 254, 36);
  const hintTxt = scene.add.text(cx, top + 452, '[ESPAÇO] ou [ENTER] para reiniciar imediatamente', textStyle('#c5a059', 11)).setOrigin(0.5);

  modal.add([...newRunBtn, ...forgeBtn, ...mageBtn, ...menuBtn, hintTxt]);

  scene.time.delayedCall(200, () => {
    if (!restarting) {
      scene.input.keyboard.once('keydown-SPACE', onQuickRestart);
      scene.input.keyboard.once('keydown-ENTER', onQuickRestart);
    }
  });
}


