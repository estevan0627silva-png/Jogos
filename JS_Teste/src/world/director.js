// =============================================================================
// DIRETOR DO MUNDO: ONDAS DE SPAWN, VILA INICIAL E ELEMENTOS AMBIENTAIS
// =============================================================================
// SPAWNS & BOSS FIGHT (60 SEGUNDOS)
// =============================================================================
function spawnStartingVillage(scene) {
  if (villageDecor) villageDecor.clear(true, true);

  // 1. Pátio Calçado Unificado da Vila (Conecta Ferreiro, Estábulo, Chalés, Caminho e Portão em 16:9)
  const plaza = villageDecor.create(235, 285, 'village_plaza');
  plaza.lockedY = 285;
  plaza.isGroundPlaza = true;
  plaza.setDepth(-8.5);

  // 2. Ala Norte da Vila: Chalés + Casa do Ferreiro (Forja Acesa, Bigorna e Armas)
  const hNorth1 = villageDecor.create(62, 140, 'village_house');
  hNorth1.lockedY = 140; hNorth1.groundY = 170;

  const blacksmith = villageDecor.create(186, 146, 'village_blacksmith');
  blacksmith.lockedY = 146; blacksmith.groundY = 186;

  const hNorth2 = villageDecor.create(306, 140, 'village_house');
  hNorth2.lockedY = 140; hNorth2.groundY = 170;

  // 3. Ala Sul da Vila: Chalés + Casa do Cuidador de Cavalos / Estábulo (com Cavalo e Feno)
  const hSouth1 = villageDecor.create(68, 430, 'village_house');
  hSouth1.lockedY = 430; hSouth1.groundY = 460;

  const stable = villageDecor.create(200, 428, 'village_stable');
  stable.lockedY = 428; stable.groundY = 468;

  const hSouth2 = villageDecor.create(316, 430, 'village_house');
  hSouth2.lockedY = 430; hSouth2.groundY = 460;

  // 4. Muralha de Paliçada Contínua + O Grande Portão de Saída da Vila (x = 415)
  const wallTop = villageDecor.create(415, 120, 'village_wall_v');
  wallTop.lockedY = 120; wallTop.groundY = 168;

  const gateTop = villageDecor.create(415, 195, 'village_gate_tower');
  gateTop.lockedY = 195; gateTop.groundY = 241;

  const gateBottom = villageDecor.create(415, 375, 'village_gate_tower');
  gateBottom.lockedY = 375; gateBottom.groundY = 421;

  const wallBottom = villageDecor.create(415, 450, 'village_wall_v');
  wallBottom.lockedY = 450; wallBottom.groundY = 498;

  // 5. Moradores (NPCs) paradinhos na beira do caminho dando tchau e desejando boa sorte!
  const npcSpecs = [
    { x: 186, y: 215, tint: 0xffd8b0, msg: 'Boa sorte!' },
    { x: 345, y: 218, tint: 0xb3e5fc, msg: 'Força, Herói!' },
    { x: 202, y: 355, tint: 0xc8e6c9, msg: 'Proteja o Reino!' },
    { x: 345, y: 352, tint: 0xfff59d, msg: 'Vá com luz!' }
  ];
  npcSpecs.forEach(spec => {
    const npc = villageDecor.create(spec.x, spec.y, 'village_npc');
    npc.lockedY = spec.y;
    npc.groundY = spec.y + 13;
    npc.setTint(spec.tint);
    npc.play('village_npc');
    npc.speechBubble = scene.add.text(spec.x, spec.y - 24, spec.msg, {
      ...roundedTextStyle('#fff8e1', 11, 'bold', '#16120e', 3)


    }).setOrigin(0.5).setDepth(spec.y + 30);
  });

  // Anúncio nobre de partida da jornada
  floatText(scene, GAME_WIDTH / 2, 130, 'SAINDO DA VILA DE VALE DOURADO', '#ffca28');
}

function startGameplay(scene) {
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.gameplayStart();
  gameState = 'PLAYING';
  isHitstopping = false;
  survivalTime = 0;
  runSilver = 0;
  runGold = 0;
  runXp = 0;
  runLevel = 1;
  xpToNextLevel = getXpRequiredForLevel(1);
  pendingLevelUps = 0;
  const up = typeof StorageManager !== 'undefined' ? StorageManager.getUpgrades() : {};
  runWeaponLevels = {
    bow: up.bow?.level || 1,
    sword: up.sword?.level || 1,
    shield: up.shield?.level || 1,
    axe: up.axe?.level || 1,
    firestaff: up.firestaff?.level || 1
  };
  chosenScrolls = [];
  chosenScroll = null;
  scrollLevels = { multishot: 0, growth: 0, attackspeed: 0, duration: 0 };
  if (typeof updateScrollHUD === 'function') updateScrollHUD();
  clearFirePools();
  enemySpeed = 195;
  worldSpeed = enemySpeed * 0.6;
  if (typeof window !== 'undefined') window.worldSpeed = worldSpeed;
  spawnDelay = 1150; // Início suave e cadenciado para acumular XP e upgrades
  nextHordeTime = 45;
  hordeCycleCount = 0;
  runBonusDuration = 0;
  lastRunSummary = null;
  playerMaxHp = getPlayerMaxHp();
  playerHp = playerMaxHp;
  playerInvulnerable = false;

  // Destrava e sincroniza física, tempo e ciclo de animação ao iniciar/reiniciar
  if (scene.physics && scene.physics.world) {
    scene.physics.resume();
    scene.physics.world.isPaused = false;
  }
  scene.time.paused = false;
  scene.time.timeScale = 1;
  if (scene.anims) {
    if (scene.anims.resumeAll) scene.anims.resumeAll();
    scene.anims.paused = false;
  }

  if (player) {
    scene.tweens.killTweensOf(player);
    player.setPosition(180, 285).setFlipX(false).setAngle(0).setAlpha(1).clearTint().setVisible(true);
    if (player.anims) player.anims.isPaused = false;
    player.play({ key: 'knight', repeat: -1 });
  }
  if (shieldSprite) shieldSprite.setVisible(false);
  if (shieldAura) shieldAura.setVisible(false);
  if (swordBlade) swordBlade.setVisible(false);
  if (playerBuffBar) playerBuffBar.clear();
  if (enemyHpBars) enemyHpBars.clear();
  if (hudContainer) hudContainer.setVisible(true);
  if (hudSilverText && hudSilverText.active) hudSilverText.setText('0');
  updateHeartsHUD();
  updateXpHUD();
  sound.startBGM('normal');

  // Constrói a vila inicial com o Grande Portão
  spawnStartingVillage(scene);

  // Se o jogador selecionou uma Relíquia Favorita na Forja do Ferreiro, ela aguarda no portão!
  // starter weapon check
  if (up.starterWeapon && up[up.starterWeapon]?.unlocked) {
    const starter = items.create(475, 285, 'item_' + up.starterWeapon);
    starter.lootType = up.starterWeapon;
    starter.groundY = 303;
  }

  const every = (delay, fn) => scene.time.addEvent({ delay, loop: true, callback: () => gameState === 'PLAYING' && fn() });
  every(1000, () => {
    survivalTime++;
    if (hudGloryText) hudGloryText.setText(`${survivalTime}s`);
    if (survivalTime > getBestScore() && hudBestText) {
      hudBestText.setText(`${survivalTime}s`);
    }
    if (survivalTime >= nextHordeTime && (!activeBoss || !activeBoss.active)) {
      hordeCycleCount++;
      nextHordeTime = survivalTime + 45;
      triggerSpecialHorde(scene, hordeCycleCount);
    }
    if (survivalTime === 52 && !bossSpawned) {
      floatText(scene, GAME_WIDTH / 2, 120, 'PREPARE-SE: ESTRONDO NAS PROFUNDEZAS!', '#ffca28');
    }
    if (survivalTime === BOSS_TRIGGER_TIME && !bossSpawned) {
      startBossFight(scene);
    }
  });

  // Director Dinâmico: ajusta velocidade e intervalo progressivamente ao longo da Run
  every(4000, () => {
    // GDD v1.0 Section 6: Durante o Boss, o aumento de dificuldade congela temporariamente
    if (activeBoss && activeBoss.active) return;
    if (survivalTime < 20) {
      enemySpeed = Math.min(205, enemySpeed + 2);
      spawnDelay = Math.max(950, spawnDelay - 30);
    } else if (survivalTime < 45) {
      enemySpeed = Math.min(265, enemySpeed + 8);
      spawnDelay = Math.max(650, spawnDelay - 45);
    } else {
      enemySpeed = Math.min(MAX_ENEMY_SPEED, enemySpeed + 12);
      spawnDelay = Math.max(220, spawnDelay - 40);
    }

    enemies.getChildren().forEach(e => {
      if (e.active && !e.isBoss && e.enemyType && ENEMIES[e.enemyType]) {
        e.setVelocityX(-enemySpeed * ENEMIES[e.enemyType].speed);
      }
    });
  });

  // Relíquias e árvores das bordas
  every(4300, () => spawnItem(scene));
  every(900, () => spawnTree());

  // Director de Spawns Progressivo: aumenta a quantidade de inimigos gerados conforme o tempo avança!
  const nextDirectorWave = () => {
    if (gameState !== 'PLAYING') {
      scene.time.delayedCall(250, nextDirectorWave);
      return;
    }
    spawnDirectorWave(scene);
    const currentDelay = (activeBoss && activeBoss.active) ? Math.max(1050, spawnDelay + 260) : spawnDelay;
    scene.time.delayedCall(currentDelay, nextDirectorWave);
  };

  // O jogador atravessa os portões da vila primeiro (3.5 segundos de largada antes dos monstros surgirem)
  scene.time.delayedCall(3500, () => {
    if (gameState === 'PLAYING' || gameState === 'LEVEL_UP' || gameState === 'PAUSED') {
      floatText(scene, GAME_WIDTH / 2, 120, 'ADENTRANDO A FLORESTA PROIBIDA...', '#7fe7ff');
      nextDirectorWave();
    }
  });
}

// Director Dinâmico: calcula quantos inimigos surgem por onda de acordo com o tempo da partida
function spawnDirectorWave(scene) {
  // Durante a Boss Fight, pausa completamente a geração de inimigos comuns!
  // Apenas Mini-Golems expelidos pelo corpo do Golem de Pedra atuam na arena.
  if (activeBoss && activeBoss.active) {
    return;
  }

  // Cap dinâmico de segurança de inimigos simultâneos na tela (preserva 60 FPS estáveis)
  const maxEnemiesOnScreen = survivalTime < 20 ? 10 : (survivalTime < 45 ? 22 : Math.min(55, 24 + Math.floor(survivalTime / 5)));
  const currentActiveEnemies = enemies.getChildren().filter(e => e.active && !e.isBoss).length;
  if (currentActiveEnemies >= maxEnemiesOnScreen) {
    return;
  }

  let waveCount = 1;
  const r = Math.random();
  if (bossDefeated || survivalTime >= 100) {
    waveCount = r < 0.45 ? 6 : (r < 0.80 ? 5 : 4);
  } else if (survivalTime >= 70) {
    waveCount = r < 0.45 ? 5 : (r < 0.80 ? 4 : 3);
  } else if (survivalTime >= 45) {
    waveCount = r < 0.50 ? 3 : 2;
  } else if (survivalTime >= 20) {
    waveCount = r < 0.65 ? 2 : 1;
  } else {
    // Comeco calmo e focado em farm de XP (0 - 20s): estritamente 1 monstro por vez!
    waveCount = 1;
  }

  for (let i = 0; i < waveCount; i++) {
    if (i === 0) {
      spawnEnemy(scene);
    } else {
      scene.time.delayedCall(i * 180, () => {
        if (gameState === 'PLAYING') spawnEnemy(scene);
      });
    }
  }
}


function spawnTree(x = GAME_WIDTH + 80) {
  for (let i = 0; i < 6; i++) {
    const y = Phaser.Math.Between(115, 455);
    const onRoad = y > 235 && y < 335;
    const crowded = obstacles.getChildren().some(o => Math.abs(o.x - x) < 110 && Math.abs(o.y - y) < 90);
    if (onRoad || crowded) continue;
    const tree = obstacles.create(x, y, 'tree');
    tree.setImmovable(true);
    tree.body.pushable = false;
    tree.lockedY = y;
    tree.obstacleType = 'tree';
    tree.body.setSize(12, 14).setOffset(18, 46);
    return;
  }
}

function spawnItem(scene) {
  const pool = getUnlockedWeaponPool();
  const type = Phaser.Utils.Array.GetRandom(pool);
  let y = Phaser.Math.Between(120, 450);
  const spawnX = GAME_WIDTH + 60;
  for (let i = 0; i < 6; i++) {
    const candidate = Phaser.Math.Between(120, 450);
    const nearObstacle = obstacles.getChildren().some(o => Math.abs(o.x - spawnX) < 90 && Math.abs(o.y - candidate) < 42);
    if (!nearObstacle) { y = candidate; break; }
  }
  const item = items.create(spawnX, y, 'item_' + type);
  item.lootType = type;
  item.groundY = y + 18;
  scene.tweens.add({ targets: item, y: y - 8, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
  scene.tweens.add({ targets: item, scale: 1.12, duration: 400, yoyo: true, repeat: -1 });
}


// =============================================================================
// EVENTOS RÃTMICOS DE HORDAS ESPECIAIS (45s+, A CADA 30 SEGUNDOS)
// =============================================================================
function triggerSpecialHorde(scene, cycle) {
  if (gameState !== 'PLAYING') return;

  const isDenseGoblin = (cycle % 2 === 1);
  sound.playEarthSmash();
  scene.cameras.main.shake(260, 0.008);

  const wx = (player && player.active) ? player.x : (GAME_WIDTH / 2);
  const wy = (player && player.active) ? (player.y - 48) : 70;
  if (scene.anims && scene.anims.exists('anim_vfx_warning_yellow')) {
    const warnSprite = scene.add.sprite(wx, wy, 'vfx_warning_yellow')
      .setDepth(2600)
      .setScale(0.7)
      .play('anim_vfx_warning_yellow');
    scene.tweens.add({
      targets: warnSprite,
      y: wy - 28,
      alpha: { from: 1, to: 0.8 },
      duration: 1600,
      ease: 'Quad.easeOut',
      onComplete: () => { if (warnSprite && warnSprite.active) warnSprite.destroy(); }
    });
  }

  if (isDenseGoblin) {
    // Ciclo Ãmpar (1, 3, 5...): Horda Densa de Goblins simples
    const count = 9 + Math.floor((cycle - 1) * 2.5);
    floatText(scene, wx, wy - 24, 'HORDA DENSA DE GOBLINS (' + count + ')!', '#ff5252');

    for (let i = 0; i < count; i++) {
      scene.time.delayedCall(i * 125, () => {
        if (gameState === 'PLAYING') {
          const spreadY = 120 + ((i * 43) % 330);
          spawnEnemy(scene, 'goblin', spreadY);
        }
      });
    }
  } else {
    // Ciclo Par (2, 4, 6...): Horda de Goblins Zigue-zague (Scouts) com Guerreiros Blindados
    const scoutCount = 5 + Math.floor(cycle * 1.5);
    const warriorCount = 3 + Math.floor(cycle * 1.0);
    const total = scoutCount + warriorCount;
    floatText(scene, GAME_WIDTH / 2, 120, 'HORDA: RASTREADORES E GUERREIROS (' + total + ')!', '#ffca28');

    const hordeList = [];
    for (let i = 0; i < scoutCount; i++) hordeList.push('goblin_scout');
    for (let i = 0; i < warriorCount; i++) hordeList.push('warrior');
    Phaser.Utils.Array.Shuffle(hordeList);

    hordeList.forEach((eType, i) => {
      scene.time.delayedCall(i * 135, () => {
        if (gameState === 'PLAYING') {
          const spreadY = 120 + ((i * 47) % 330);
          spawnEnemy(scene, eType, spreadY);
        }
      });
    });
  }
}