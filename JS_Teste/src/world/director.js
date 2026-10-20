// =============================================================================
// DIRETOR DO MUNDO: ONDAS DE SPAWN, VILA INICIAL E ELEMENTOS AMBIENTAIS
// =============================================================================
// SPAWNS & BOSS FIGHT (60 SEGUNDOS)
// =============================================================================
function spawnStartingVillage(scene) {
  if (villageDecor) villageDecor.clear(true, true);

  // 1. Pátio Calçado Unificado da Vila (Conecta Ferreiro, Estábulo, Chalés, Caminho e Portão)
  const plaza = villageDecor.create(235, 325, 'village_plaza');
  plaza.lockedY = 325;
  plaza.isGroundPlaza = true;
  plaza.setDepth(-8.5);

  // 2. Ala Norte da Vila: Chalés + Casa do Ferreiro (Forja Acesa, Bigorna e Armas)
  const hNorth1 = villageDecor.create(62, 168, 'village_house');
  hNorth1.lockedY = 168; hNorth1.groundY = 198;

  const blacksmith = villageDecor.create(186, 174, 'village_blacksmith');
  blacksmith.lockedY = 174; blacksmith.groundY = 214;

  const hNorth2 = villageDecor.create(306, 168, 'village_house');
  hNorth2.lockedY = 168; hNorth2.groundY = 198;

  // 3. Ala Sul da Vila: Chalés + Casa do Cuidador de Cavalos / Estábulo (com Cavalo e Feno)
  const hSouth1 = villageDecor.create(68, 482, 'village_house');
  hSouth1.lockedY = 482; hSouth1.groundY = 512;

  const stable = villageDecor.create(200, 480, 'village_stable');
  stable.lockedY = 480; stable.groundY = 520;

  const hSouth2 = villageDecor.create(316, 482, 'village_house');
  hSouth2.lockedY = 482; hSouth2.groundY = 512;

  // 4. Muralha de Paliçada Contínua + O Grande Portão de Saída da Vila (x = 415)
  const wallTop = villageDecor.create(415, 148, 'village_wall_v');
  wallTop.lockedY = 148; wallTop.groundY = 196;

  const gateTop = villageDecor.create(415, 224, 'village_gate_tower');
  gateTop.lockedY = 224; gateTop.groundY = 270;

  const gateBottom = villageDecor.create(415, 428, 'village_gate_tower');
  gateBottom.lockedY = 428; gateBottom.groundY = 474;

  const wallBottom = villageDecor.create(415, 504, 'village_wall_v');
  wallBottom.lockedY = 504; wallBottom.groundY = 552;

  // 5. Moradores (NPCs) paradinhos na beira do caminho dando tchau e desejando boa sorte!
  const npcSpecs = [
    { x: 186, y: 248, tint: 0xffd8b0, msg: 'Boa sorte!' },
    { x: 345, y: 252, tint: 0xb3e5fc, msg: 'Força, Herói!' },
    { x: 202, y: 412, tint: 0xc8e6c9, msg: 'Proteja o Reino!' },
    { x: 345, y: 408, tint: 0xfff59d, msg: 'Vá com luz!' }
  ];
  npcSpecs.forEach(spec => {
    const npc = villageDecor.create(spec.x, spec.y, 'village_npc');
    npc.lockedY = spec.y;
    npc.groundY = spec.y + 13;
    npc.setTint(spec.tint);
    npc.play('village_npc');
    npc.speechBubble = scene.add.text(spec.x, spec.y - 24, spec.msg, {
      ...textStyle('#fff8e1', 10),
      stroke: '#16120e',
      strokeThickness: 3
    }).setOrigin(0.5).setDepth(spec.y + 30);
  });

  // Anúncio nobre de partida da jornada
  floatText(scene, 400, 150, '★ SAINDO DA VILA DE VALE DOURADO ★', '#ffca28');
}

function startGameplay(scene) {
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.gameplayStart();
  gameState = 'PLAYING';
  survivalTime = 0;
  runSilver = 0;
  runGold = 0;
  runXp = 0;
  runLevel = 1;
  xpToNextLevel = getXpRequiredForLevel(1);
  pendingLevelUps = 0;
  runWeaponLevels = { bow: 1, sword: 1, shield: 1, axe: 1, firestaff: 1 };
  chosenScroll = null;
  scrollLevels = { multishot: 0, growth: 0, attackspeed: 0 };
  clearFirePools();
  enemySpeed = 195;
  worldSpeed = enemySpeed * 0.6;
  if (typeof window !== 'undefined') window.worldSpeed = worldSpeed;
  spawnDelay = 1300;
  runBonusDuration = 0;
  lastRunSummary = null;
  playerMaxHp = getPlayerMaxHp();
  playerHp = playerMaxHp;
  playerInvulnerable = false;

  if (player) {
    scene.tweens.killTweensOf(player);
    player.setPosition(160, 330).setFlipX(false).setAngle(0).setAlpha(1).clearTint().setVisible(true);
    player.play('knight');
  }
  if (shieldSprite) shieldSprite.setVisible(false);
  if (shieldAura) shieldAura.setVisible(false);
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
  const up = getUpgrades();
  if (up.starterWeapon && up[up.starterWeapon]?.unlocked) {
    const starter = items.create(475, 330, 'item_' + up.starterWeapon);
    starter.lootType = up.starterWeapon;
    starter.groundY = 348;
  }

  const every = (delay, fn) => scene.time.addEvent({ delay, loop: true, callback: () => gameState === 'PLAYING' && fn() });
  every(1000, () => {
    survivalTime++;
    if (hudGloryText) hudGloryText.setText(`${survivalTime}s`);
    if (survivalTime > getBestScore() && hudBestText) {
      hudBestText.setText(`${survivalTime}s`);
    }
    if (survivalTime === 35 && !bossSpawned) {
      floatText(scene, 400, 132, '⚔ PREPARE-SE: ESTRONDO NAS PROFUNDEZAS! ⚔', '#ffca28');
    }
    if (survivalTime === BOSS_TRIGGER_TIME && !bossSpawned) {
      startBossFight(scene);
    }
  });

  // Director Dinâmico: ajusta velocidade e intervalo gradualmente ao longo da Run estendida (120s+ até o Boss)
  every(4500, () => {
    enemySpeed = Math.min(MAX_ENEMY_SPEED, enemySpeed + 10);
    spawnDelay = Math.max(MIN_SPAWN_DELAY, spawnDelay - 38);
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
      floatText(scene, 400, 130, 'ADENTRANDO A FLORESTA PROIBIDA...', '#7fe7ff');
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

  let waveCount = 1;
  const r = Math.random();
  if (bossDefeated || survivalTime >= 100) {
    // Pós-Boss: escalonamento agressivo com hordas densas
    waveCount = r < 0.38 ? 4 : (r < 0.78 ? 3 : 2);
  } else if (survivalTime >= 70) {
    waveCount = r < 0.45 ? 3 : 2;
  } else if (survivalTime >= 40) {
    waveCount = r < 0.25 ? 3 : (r < 0.75 ? 2 : 1);
  } else if (survivalTime >= 20) {
    // Intermediário (20s - 40s)
    waveCount = r < 0.40 ? 2 : 1;
  } else {
    // Curva inicial suave (0 - 20s): 1 inimigo por pulso para aquecimento gradual
    waveCount = 1;
  }

  for (let i = 0; i < waveCount; i++) {
    if (i === 0) {
      spawnEnemy(scene);
    } else {
      scene.time.delayedCall(i * 190, () => {
        if (gameState === 'PLAYING') spawnEnemy(scene);
      });
    }
  }
}


function spawnTree(x = 880) {
  for (let i = 0; i < 6; i++) {
    const y = Phaser.Math.Between(150, 510);
    const onRoad = y > 265 && y < 395;
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
  let y = Phaser.Math.Between(140, 510);
  for (let i = 0; i < 6; i++) {
    const candidate = Phaser.Math.Between(140, 510);
    const nearObstacle = obstacles.getChildren().some(o => Math.abs(o.x - 860) < 90 && Math.abs(o.y - candidate) < 42);
    if (!nearObstacle) { y = candidate; break; }
  }
  const item = items.create(860, y, 'item_' + type);
  item.lootType = type;
  item.groundY = y + 18;
  scene.tweens.add({ targets: item, y: y - 8, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
  scene.tweens.add({ targets: item, scale: 1.12, duration: 400, yoyo: true, repeat: -1 });
}

