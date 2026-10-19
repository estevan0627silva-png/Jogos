// =============================================================================
// CICLO DE VIDA DO JOGO (PHASER 3): PRELOAD, CREATE, UPDATE & INICIALIZAÇÃO
// =============================================================================

// CENA: PRELOAD — cria todas as texturas com filtro NEAREST (zero serrilhado/esfarelado)
// =============================================================================
function preload() {
  if (this.textures.exists('knight')) return;
  makeSheet(this, 'knight', 32, 32, 4, drawKnight);
  makeSheet(this, 'goblin', 28, 28, 2, drawGoblin);
  makeSheet(this, 'warrior', 36, 36, 2, drawWarrior);
  makeSheet(this, 'elf', 32, 32, 2, drawElf);
  makeSheet(this, 'gargoyle', 32, 32, 2, drawGargoyle);
  makeSheet(this, 'dark_mage', 32, 32, 2, drawDarkMage);
  makeSheet(this, 'mini_golem', 28, 28, 2, drawMiniGolem);
  makeSheet(this, 'boss_golem', 88, 88, 2, drawBossGolem);
  makeSheet(this, 'village_blacksmith', 112, 84, 1, drawVillageBlacksmith);
  makeSheet(this, 'village_stable', 120, 84, 1, drawVillageStable);
  makeSheet(this, 'village_house', 72, 64, 1, drawVillageHouse);
  makeSheet(this, 'village_wall_v', 32, 96, 1, drawVillageWallV);
  makeSheet(this, 'village_gate_tower', 48, 96, 1, drawGateTower);
  makeSheet(this, 'village_npc', 24, 28, 2, drawVillageNpc);
  makeSheet(this, 'gold_coin', 16, 16, 2, drawGoldCoin);
  makeSheet(this, 'silver_coin', 16, 16, 2, drawSilverCoin);
  makeSheet(this, 'xp_orb', 14, 14, 2, drawXpOrb);
  makeSheet(this, 'blacksmith_master', 44, 44, 2, drawBlacksmithMaster);
  makeSheet(this, 'mage_master', 44, 44, 2, drawMageMaster);
  makeSheet(this, 'tree', 48, 64, 1, drawTree);
  makeSheet(this, 'rock', 32, 26, 2, drawRock);
  makeSheet(this, 'shield_worn', 18, 22, 1, drawShieldIcon);
  makeSheet(this, 'sword_blade', 12, 40, 1, drawBlade);
  makeSheet(this, 'arrow_player', 26, 10, 1, arrowDrawer(C.blueBase, C.steelLight, C.manaLight));
  makeSheet(this, 'arrow_gold', 26, 10, 1, arrowDrawer(C.goldDark, C.goldHighlight, C.goldLight));
  makeSheet(this, 'arrow_elf', 26, 10, 1, arrowDrawer(0x00c853, 0x69f0ae, 0x00e676));
  makeSheet(this, 'orb_enemy', 16, 16, 1, drawMageOrb);
  makeSheet(this, 'axe_proj', 24, 24, 1, drawAxeProj);
  makeSheet(this, 'fireball_proj', 24, 16, 1, drawFireballProj);
  makeSheet(this, 'hud_hourglass', 22, 26, 1, drawHourglass);
  makeSheet(this, 'hud_crown', 24, 22, 1, drawCrown);
  makeSheet(this, 'hud_horn', 30, 20, 2, drawHorn);
  makeSheet(this, 'hud_fullscreen', 20, 20, 2, drawFullscreenIcon);
  makeSheet(this, 'hud_heart', 14, 14, 2, drawHeartHUD);
  makeSheet(this, 'knight_banner', 48, 56, 1, drawKnightBanner);
  makeItem(this, 'item_bow', 0xffe082, drawBowIcon);
  makeItem(this, 'item_shield', 0x80deea, drawShieldIcon);
  makeItem(this, 'item_sword', 0xffffff, drawSwordIcon);
  makeItem(this, 'item_axe', 0x7fe7ff, drawAxeIcon);
  makeItem(this, 'item_firestaff', 0xff7043, drawFireStaffIcon);
  makeItem(this, 'stat_magnet', 0x7fe7ff, drawMagnetIcon);
  makeItem(this, 'stat_health', 0xff5252, drawHealthIcon);
  makeItem(this, 'stat_speed', 0xffeb3b, drawSpeedIcon);
  makeItem(this, 'stat_wisdom', 0xc36bff, drawWisdomIcon);
  makeWorldTextures(this);

  // Garante filtro NEAREST puro em todas as texturas geradas (sem aspecto borrado ou esfarelado)
  Object.values(this.textures.list).forEach(tex => {
    if (tex && tex.setFilter) tex.setFilter(Phaser.Textures.FilterMode.NEAREST);
  });
}

// =============================================================================
// CENA: CREATE — monta camadas, grupos, jogador, colisões e HUD

// =============================================================================
function create(data) {
  const scene = this;
  sound.stopBGM();

  // Garante que tempo, tweens e física nunca venham congelados após Game Over ou Level Up
  scene.time.paused = false;
  scene.time.timeScale = 1;
  scene.tweens.resumeAll();
  scene.physics.resume();

  // Centraliza e trava câmera em pixels inteiros para nitidez máxima em Tela Cheia e Janela
  scene.cameras.main.setViewport(0, 0, GAME_WIDTH, GAME_HEIGHT);
  scene.cameras.main.centerOn(GAME_WIDTH / 2, GAME_HEIGHT / 2);
  scene.cameras.main.setRoundPixels(true);

  gameState = 'MENU';
  survivalTime = 0;
  runSilver = 0;
  runGold = 0;
  runXp = 0;
  runLevel = 1;
  xpToNextLevel = getXpRequiredForLevel(1);
  pendingLevelUps = 0;
  runWeaponLevels = { bow: 1, sword: 1, shield: 1, axe: 1, firestaff: 1 };
  runBonusDuration = 0;
  playerMaxHp = getPlayerMaxHp();
  playerHp = playerMaxHp;
  playerInvulnerable = false;
  enemySpeed = 195;
  spawnDelay = 1300;
  buff = { type: null, timeLeft: 0, nextAttack: 0 };
  activeBoss = null;
  bossSpawned = false;
  bossDefeated = false;
  draftModal = null;

  // Limpa todos os listeners de teclado e escala ao encerrar/reiniciar a cena
  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
    events.clear();
    scene.input.keyboard.removeAllListeners();
    scene.scale.off('enterfullscreen', onScaleChange);
    scene.scale.off('leavefullscreen', onScaleChange);
    scene.scale.off('resize', onScaleChange);
  });

  // Registra Listeners de Eventos Desacoplados (Observer Pattern)
  setupDecoupledEventListeners(scene);

  const onScaleChange = () => {
    scene.cameras.main.setViewport(0, 0, GAME_WIDTH, GAME_HEIGHT);
    scene.cameras.main.centerOn(GAME_WIDTH / 2, GAME_HEIGHT / 2);
    scene.cameras.main.setRoundPixels(true);
    updateFullscreenIcons(scene);
  };
  scene.scale.on('enterfullscreen', onScaleChange);
  scene.scale.on('leavefullscreen', onScaleChange);
  scene.scale.on('resize', onScaleChange);

  // Animações com cadência fluida — criadas uma única vez
  const animSpecs = {
    knight: { fps: 12, frames: 4 },
    goblin: { fps: 12, frames: 2 },
    warrior: { fps: 8, frames: 2 },
    elf: { fps: 9, frames: 2 },
    gargoyle: { fps: 10, frames: 2 },
    dark_mage: { fps: 8, frames: 2 },
    mini_golem: { fps: 10, frames: 2 },
    boss_golem: { fps: 6, frames: 2 },
    village_npc: { fps: 4, frames: 2 },
    gold_coin: { fps: 8, frames: 2 },
    silver_coin: { fps: 8, frames: 2 },
    xp_orb: { fps: 8, frames: 2 },
    blacksmith_master: { fps: 3, frames: 2 },
    mage_master: { fps: 3, frames: 2 }
  };
  Object.entries(animSpecs).forEach(([key, spec]) => {
    if (!scene.anims.exists(key)) {
      const frames = [];
      for (let i = 0; i < spec.frames; i++) frames.push({ key, frame: i });
      scene.anims.create({ key, frameRate: spec.fps, repeat: -1, frames });
    }
  });
  if (!scene.anims.exists('knight_run')) {
    const frames = [];
    for (let i = 0; i < 4; i++) frames.push({ key: 'knight', frame: i });
    scene.anims.create({ key: 'knight_run', frameRate: 12, repeat: -1, frames });
  }

  // Camadas do cenário, de trás para frente
  ground = scene.add.tileSprite(400, 300, 800, 600, 'ground').setDepth(-10);
  road = scene.add.tileSprite(400, 330, 800, 80, 'road').setDepth(-9);
  forestTop = scene.add.tileSprite(400, 55, 800, 110, 'forest_top').setDepth(-5);
  shadows = scene.add.graphics().setDepth(-2);
  forestBottom = scene.add.tileSprite(400, 560, 800, 80, 'forest_bottom').setDepth(1000);
  bossFilterOverlay = scene.add.rectangle(400, 300, 800, 600, 0x240b06, 0).setDepth(1800);

  // Grupos físicos
  villageDecor = scene.physics.add.group({ immovable: true });
  coins = scene.physics.add.group();
  xpOrbs = scene.physics.add.group();
  enemies = scene.physics.add.group();
  obstacles = scene.physics.add.group({ immovable: true });
  items = scene.physics.add.group();
  playerArrows = scene.physics.add.group();
  enemyArrows = scene.physics.add.group();
  slashes = scene.physics.add.group();

  // Árvores nas bordas a partir de além dos portões da vila
  for (let x = 620; x <= 980; x += 120) spawnTree(x);

  // Jogador (limitado à área entre as florestas)
  scene.physics.world.setBounds(0, 95, 800, 455);
  player = scene.physics.add.sprite(160, 330, 'knight', 0);
  player.body.setSize(16, 22).setOffset(8, 8);
  player.setCollideWorldBounds(true);
  player.setVisible(false); // Oculto enquanto estiver nos menus
  shieldSprite = scene.add.image(0, 0, 'shield_worn').setVisible(false);
  shieldAura = scene.add.image(0, 0, 'shield_aura').setVisible(false).setAlpha(0.85);

  // Controles
  cursors = scene.input.keyboard.createCursorKeys();
  keys = scene.input.keyboard.addKeys('W,A,S,D');

  pauseModal = null;
  enemyHpBars = scene.add.graphics().setDepth(2400);
  playerBuffBar = scene.add.graphics().setDepth(2500);

  // Tecla ESC para pausar/despausar ou sair de submenus (bloqueada durante escolha de cartas de Level Up!)
  scene.input.keyboard.on('keydown-ESC', () => handleEscPress(scene));

  // Tecla F para ativar/desativar Tela Cheia (com trava durante digitação no Game Over)
  scene.input.keyboard.on('keydown-F', () => {
    if (gameState === 'GAMEOVER') return;
    sound.playButtonClick();
    toggleFullscreen(scene);
  });

  // Partículas de poeira nos passos do cavaleiro
  dustFx = scene.add.particles(0, 0, 'spark', {
    lifespan: 300,
    speedX: { min: -70, max: -20 },
    speedY: { min: -16, max: 6 },
    scale: { start: 1.0, end: 0 },
    alpha: { start: 0.42, end: 0 },
    tint: [0xd6c8aa, 0xb89a6c, 0x9b7b4f],
    emitting: false
  }).setDepth(5);

  // Partículas para impactos gerais e mortes de monstros
  hitFx = scene.add.particles(0, 0, 'spark', {
    lifespan: 340, speed: { min: 70, max: 190 }, scale: { start: 1.4, end: 0 },
    tint: [0xffffff, 0xffca28, 0xff7043], emitting: false
  }).setDepth(1500);

  // Faíscas metálicas pontuais para acertos em armaduras, espadas e bloqueios
  sparksFx = scene.add.particles(0, 0, 'spark_shard', {
    lifespan: 220, speed: { min: 120, max: 280 }, scale: { start: 1.2, end: 0 },
    tint: [0xffffff, 0xfff59d, 0x80deea], emitting: false
  }).setDepth(1510);

  // Estilhaços físicos de madeira (árvores) e lascas de pedra (rochas) com gravidade
  debrisFx = scene.add.particles(0, 0, 'spark_shard', {
    lifespan: 420, speed: { min: 50, max: 150 }, gravityY: 260, scale: { start: 1.5, end: 0.2 },
    tint: [0x8d5c38, 0x5c3a1b, 0x78909c, 0x455a64], emitting: false
  }).setDepth(1490);

  // Partículas sagradas cintilantes para Escudo Sagrado e bênçãos divinas
  holyFx = scene.add.particles(0, 0, 'spark_star', {
    lifespan: 480, speed: { min: 45, max: 160 }, scale: { start: 1.6, end: 0 },
    tint: [0xffffff, 0x7fe7ff, 0xffe082, 0x80deea], emitting: false
  }).setDepth(1620);

  // Brasas e fagulhas sutis para o Cajado de Fogo e impactos (leves e legíveis)
  emberFx = scene.add.particles(0, 0, 'spark', {
    lifespan: 220, speed: { min: 40, max: 120 }, scale: { start: 0.95, end: 0 },
    tint: [0xffeb3b, 0xffca28, 0xff7043], emitting: false
  }).setDepth(1560);

  createHUD(scene);

  // Colisões do jogador (separação suave nos obstáculos + coleta de Relíquias, Moedas de Prata e Orbes de XP)
  scene.physics.add.overlap(player, obstacles, (p, o) => separatePlayerFromObstacle(p, o));
  scene.physics.add.overlap(player, enemies, (p, e) => playerHit(scene, e));
  scene.physics.add.overlap(player, enemyArrows, (p, a) => playerHit(scene, a));
  scene.physics.add.overlap(player, items, (p, i) => collectItem(scene, i));
  scene.physics.add.overlap(player, coins, (p, c) => collectCoin(scene, c));
  scene.physics.add.overlap(player, xpOrbs, (p, orb) => collectXpOrb(scene, orb));

  // Combate: suporta flechas, machados bumerangue perfurantes e bolas de fogo explosivas
  scene.physics.add.overlap(playerArrows, enemies, (a, e) => {
    if (e.x >= 800 || !a.active || !e.active) return;
    if (a.projId && e.lastProjId === a.projId) return;
    if (a.projId) e.lastProjId = a.projId;

    if (a.isFireball) {
      const fx = a.x, fy = a.y, rad = a.blastRadius || 42, dmg = a.dmg || 1;
      a.destroy();
      explodeFireball(scene, fx, fy, rad, dmg);
      return;
    }

    damageEnemy(scene, e, a.dmg || 1);
    if (a.pierceCount && a.pierceCount > 1) {
      a.pierceCount--;
    } else if (!a.isBoomerang) {
      a.destroy();
    }
  });
  scene.physics.add.overlap(slashes, enemies, (s, e) => {
    // Trava monotônica (< s.slashId) evita que dois golpes simultâneos alternem dano a cada frame!
    if (e.x < 800 && s.active && e.active && (e.lastSlashId ?? 0) < s.slashId) {
      e.lastSlashId = s.slashId;
      damageEnemy(scene, e, s.dmg || 1);
    }
  });
  scene.physics.add.overlap(slashes, enemyArrows, (s, a) => {
    sound.playShieldBlock();
    sparksFx.explode(7, a.x, a.y);
    a.destroy();
  });
  scene.physics.add.overlap(playerArrows, enemyArrows, (a, b) => {
    if (!a.active || !b.active) return;
    sound.playShieldBlock();
    sparksFx.explode(6, b.x, b.y);
    b.destroy();
    if (!a.isBoomerang && !a.isFireball && (!a.pierceCount || a.pierceCount <= 1)) {
      a.destroy();
    }
  });

  // Obstáculos (árvores e rochas) servem de cobertura: bloqueiam flechas (machado bumerangue sobrevoa)
  const hitObstacle = (arrow, obs) => {
    if (!arrow.active || arrow.isBoomerang) return;
    if (arrow.isFireball) {
      const fx = arrow.x, fy = arrow.y, rad = arrow.blastRadius || 42, dmg = arrow.dmg || 1;
      arrow.destroy();
      explodeFireball(scene, fx, fy, rad, dmg);
      return;
    }
    if (arrow.x > 0 && arrow.x < 800 && obs.x < 810) {
      if (obs.obstacleType === 'rock') {
        sound.playShieldBlock();
        sparksFx.explode(6, arrow.x, arrow.y);
        debrisFx.explode(6, arrow.x, arrow.y);
      } else {
        sound.playWoodHit();
        debrisFx.explode(7, arrow.x, arrow.y);
      }
    }
    arrow.destroy();
  };
  scene.physics.add.overlap(playerArrows, obstacles, hitObstacle);
  scene.physics.add.overlap(enemyArrows, obstacles, hitObstacle);

  if (data && data.autoStart) {
    startGameplay(scene);
  } else if (data && data.openShop) {
    showShopMenu(scene, data.shopTab || 'mage');
  } else {
    showMainMenu(scene);
  }
}

// =============================================================================
// CENA: UPDATE — roda a cada frame

// =============================================================================
function update(time, delta) {
  const dt = Math.min(delta / 1000, 0.05); // clamp dt para evitar saltos bruscos de frame
  if (gameState === 'PLAYING') updateGameplay(this, time, dt);
  else if (gameState === 'MENU') updateMenuBackground(dt);
  sortAndShade();
}

// Fundo rolando suavemente no menu inicial (efeito vivo de viagem)
function updateMenuBackground(dt) {
  const scrollSpeed = 35;
  ground.tilePositionX += scrollSpeed * dt;
  road.tilePositionX += scrollSpeed * dt;
  forestTop.tilePositionX += scrollSpeed * 0.85 * dt;
  forestBottom.tilePositionX += scrollSpeed * 1.25 * dt;
  obstacles.setVelocityX(-scrollSpeed);
}

function updateGameplay(scene, time, dt) {
  // 1. Mundo rolando: chão, estrada e obstáculos andam JUNTOS (nada desliza)
  const worldSpeed = enemySpeed * 0.6;
  ground.tilePositionX += worldSpeed * dt;
  road.tilePositionX += worldSpeed * dt;
  forestTop.tilePositionX += worldSpeed * 0.9 * dt;    // fundo: um pouco mais lento
  forestBottom.tilePositionX += worldSpeed * 1.3 * dt; // frente: mais rápido (parallax)
  obstacles.setVelocityX(-worldSpeed);
  villageDecor.setVelocityX(-worldSpeed);
  items.setVelocityX(-worldSpeed);

  // Física de Coleta e Magnetismo de Moedas de Prata e Orbes de XP (fluida e responsiva)
  const magnetRadius = getMagnetRadius();
  const pullCollectibles = (group, onCollect) => {
    group.getChildren().slice().forEach(c => {
      if (!c || !c.active) return;
      const dist = Phaser.Math.Distance.Between(player.x, player.y, c.x, c.y);
      if (dist <= 28) {
        onCollect(scene, c);
        return;
      }
      if (c.magnetized || dist <= magnetRadius) {
        if (!c.magnetized) {
          c.magnetized = true;
          scene.tweens.killTweensOf(c);
        }
        const pullSpeed = Math.max(420, enemySpeed + 240 + Math.max(0, magnetRadius - dist) * 1.6);
        scene.physics.moveToObject(c, player, pullSpeed);
        c.groundY = c.y + 8;
      } else if (!c.isDropping) {
        c.setVelocity(-worldSpeed, 0);
        c.groundY = c.y + 8;
      } else {
        c.setVelocityX(-worldSpeed);
      }
    });
  };
  pullCollectibles(coins, collectCoin);
  pullCollectibles(xpOrbs, collectXpOrb);

  // 2. Cavaleiro: 8 direções com pixels 100% nítidos (sem rotação sub-pixel setAngle que esfarela a Pixel Art!)
  const moveSpd = getPlayerMoveSpeed();
  let dirX = 0, dirY = 0;
  if (cursors.left.isDown || keys.A.isDown) dirX -= 1;
  if (cursors.right.isDown || keys.D.isDown) dirX += 1;
  if (cursors.up.isDown || keys.W.isDown) dirY -= 1;
  if (cursors.down.isDown || keys.S.isDown) dirY += 1;
  player.setVelocity(dirX, dirY).body.velocity.normalize().scale(moveSpd);
  player.setFlipX(false);
  player.setAngle(0); // ângulo zero mantém linhas e cores perfeitamente nítidas!
  const isMoving = dirX !== 0 || dirY !== 0;
  player.anims.timeScale = dirX > 0 ? 1.35 : (dirX < 0 ? 0.9 : (isMoving ? 1.15 : 1.0));

  // Poeira sutil nos passos do cavaleiro
  if (Math.random() < 0.25) {
    dustFx.emitParticleAt(Math.round(player.x - 6), Math.round(player.y + 14), 1);
  }

  // 3. Inimigos: movimento suave com pixels inteiros (sem rotação sub-pixel que esfarela os contornos)
  enemies.getChildren().forEach(e => {
    if (!e.isBoss) {
      e.setAngle(0);
      if (e.enemyType === 'gargoyle' && e.baseY !== undefined) {
        e.y = Math.round(Phaser.Math.Clamp(e.baseY + Math.sin(time * 0.0055 + e.phase) * 46, 125, 520));
        if (e.body) e.body.updateFromGameObject();
      }
    }
  });

  // Rotação fluida dos Machados Bumerangue e rastros de projéteis
  playerArrows.getChildren().forEach(p => {
    if ((p.isBoomerang || p.texture.key === 'axe_proj') && p.active) {
      p.spinAccum = (p.spinAccum || 0) + 820 * dt;
      p.setAngle(Math.round(p.spinAccum / 30) * 30);
      if (p.isBoomerang && !p.returning && p.body.velocity.x < 0) {
        p.returning = true;
        p.projId = ++slashCounter;
      }
    }
    // Rastro sutil e fluido da Bola de Fogo (baixa densidade para máxima legibilidade)
    if (p.isFireball && p.active && Math.random() < 0.16) {
      emberFx.emitParticleAt(p.x - 6, p.y + Phaser.Math.Between(-1, 1), 1);
    }
  });

  // Flechas élficas: rastro limpo e direto sem estrelas ofuscantes
  enemyArrows.getChildren().forEach(a => {
    if (a.texture.key === 'arrow_elf' && a.active && Math.random() < 0.08) {
      dustFx.emitParticleAt(a.x + 6, a.y, 1);
    }
  });

  if (activeBoss && activeBoss.active) {
    if (!activeBoss.isLunging) {
      activeBoss.setAngle(0);
      if (activeBoss.entering) {
        if (activeBoss.x <= 685) {
          activeBoss.x = 685;
          activeBoss.setVelocityX(0);
          activeBoss.entering = false;
          activeBoss.setVelocityY(68);
        }
      } else {
        activeBoss.x = 685;
        activeBoss.setVelocityX(0);
        if (activeBoss.y <= 170) activeBoss.setVelocityY(72);
        else if (activeBoss.y >= 480) activeBoss.setVelocityY(-72);
      }
    }
  }

  // 4. Sistema Modular de Armas: cadência e tempo processados pela estratégia ativa
  WeaponSystem.update(scene, time, dt);
  updateItemHUD();

  // 5. Limpeza do que saiu da tela (.slice() evita pular itens ao destruir; Boss nunca some!)
  const cull = (group, isOut) => group.getChildren().slice().forEach(s => { if (isOut(s)) removeEntity(s); });
  cull(villageDecor, s => s.x < -300);
  cull(enemies, s => !s.isBoss && s.x < -60);
  cull(obstacles, s => s.x < -60);
  cull(items, s => s.x < -60);
  cull(coins, s => s.x < -60);
  cull(xpOrbs, s => s.x < -60);
  cull(playerArrows, s => s.x < -40 || s.x > 830 || s.y < 0 || s.y > 620);
  cull(enemyArrows, s => s.x < -40 || s.x > 840 || s.y < 0 || s.y > 620);
}

// Impede o jogador de atravessar obstáculos e resolve prensamento de forma suave (sem trancos ou cuspidas)
function separatePlayerFromObstacle(p, obs) {
  if (!p.active || !obs.active) return;
  if (obs.lockedY !== undefined) obs.y = obs.lockedY;
  obs.body.velocity.y = 0;

  const pb = p.body, ob = obs.body;
  const ox = Math.min(pb.right, ob.right) - Math.max(pb.left, ob.left);
  const oy = Math.min(pb.bottom, ob.bottom) - Math.max(pb.top, ob.top);
  if (ox <= 0 || oy <= 0) return;

  // Direção do desvio: respeita a intenção do jogador (W/S) ou desvia pelo lado mais próximo do centro
  let slideDir = (keys.W.isDown || cursors.up.isDown) ? -1 :
                 (keys.S.isDown || cursors.down.isDown) ? 1 :
                 (pb.center.y < ob.center.y ? -1 : 1);
  if (p.y <= 112) slideDir = 1;
  else if (p.y >= 533) slideDir = -1;

  // 1. Jogador espremido contra a borda esquerda pelo obstáculo que avança
  if (pb.left <= 18 && pb.center.x <= ob.center.x) {
    const squeezeStep = Math.min(oy, 2.4);
    p.y = Phaser.Math.Clamp(p.y + slideDir * squeezeStep, 106, 539);
    p.x = Math.max(16, pb.width / 2);
  } else if (ox < oy) {
    // 2. Colisão horizontal padrão
    if (pb.center.x < ob.center.x) {
      p.x = Phaser.Math.Clamp(p.x - ox, 16, 792);
      if (oy > 2) p.y = Phaser.Math.Clamp(p.y + slideDir * Math.min(oy, 1.4), 106, 539);
    } else {
      p.x = Phaser.Math.Clamp(p.x + ox, 16, 792);
    }
  } else {
    // 3. Colisão vertical padrão
    p.y = Phaser.Math.Clamp(p.y + (pb.center.y < ob.center.y ? -oy : oy), 106, 539);
  }
  pb.updateFromGameObject();
}

// Profundidade por altura (quem está mais embaixo fica na frente) + sombras + barras de HP
function sortAndShade() {
  shadows.clear();
  enemyHpBars.clear();

  const shadeEntity = (s) => {
    if (!s || !s.active || !s.visible) return;
    const feet = Math.round(s.groundY ?? s.y + s.displayHeight / 2);
    s.setDepth(feet);

    // Determina dimensões da sombra proporcionalmente ao tamanho e tipo da criatura
    let pw = 22, ph = 7, cw = 15, ch = 4; // Penumbra e Core padrão (Cavaleiro)
    let pAlpha = 0.20, cAlpha = 0.34;
    let groundY = feet - 2;

    if (s.isBoss) {
      pw = 74; ph = 20; cw = 56; ch = 12;
      pAlpha = 0.26; cAlpha = 0.44;
      groundY = feet - 3;
    } else if (s.enemyType === 'goblin') {
      pw = 18; ph = 6; cw = 12; ch = 3;
    } else if (s.enemyType === 'warrior') {
      pw = 26; ph = 8; cw = 18; ch = 5;
      cAlpha = 0.38;
    } else if (s.enemyType === 'elf') {
      pw = 18; ph = 6; cw = 12; ch = 4;
    } else if (s.enemyType === 'dark_mage') {
      // Mago sombrio flutua/levita suavemente no ar
      pw = 22; ph = 6; cw = 14; ch = 3;
      pAlpha = 0.16; cAlpha = 0.22;
      groundY = feet + 4;
    } else if (s.enemyType === 'gargoyle') {
      // Gárgula projeta sombra no chão enquanto bate asas no ar
      pw = 22; ph = 6; cw = 12; ch = 3;
      pAlpha = 0.16; cAlpha = 0.20;
      groundY = Math.round((s.baseY || s.y) + 16);
    } else if (s.enemyType === 'mini_golem') {
      pw = 20; ph = 7; cw = 14; ch = 4;
      cAlpha = 0.36;
    } else if (s.obstacleType === 'rock') {
      pw = 32; ph = 10; cw = 24; ch = 6;
      pAlpha = 0.24; cAlpha = 0.40;
      groundY = feet - 3;
    } else if (s.obstacleType === 'tree' || s.isTree) {
      pw = 36; ph = 12; cw = 26; ch = 7;
      pAlpha = 0.24; cAlpha = 0.40;
      groundY = feet - 4;
    } else if (s.displayWidth && s.displayWidth >= 60) {
      pw = Math.round(s.displayWidth * 0.82);
      ph = 14; cw = Math.round(s.displayWidth * 0.62); ch = 8;
      pAlpha = 0.25; cAlpha = 0.38;
      groundY = feet - 4;
    } else if (s.isCoin || s.isXpOrb || s.isItem) {
      pw = 12; ph = 4; cw = 8; ch = 2;
      pAlpha = 0.18; cAlpha = 0.28;
      groundY = feet - 1;
    }

    const sx = Math.round(s.x);
    // 1. Penumbra suave externa (dissipa suavemente no solo)
    shadows.fillStyle(0x161009, pAlpha).fillEllipse(sx, groundY, pw, ph);
    // 2. Núcleo escuro de contato (assenta os pés firmemente na terra)
    shadows.fillStyle(0x0a0604, cAlpha).fillEllipse(sx, groundY, cw, ch);
  };

  obstacles.getChildren().forEach(o => {
    if (o.lockedY !== undefined) o.y = o.lockedY;
    if (o.crackDecal && o.crackDecal.active) {
      o.crackDecal.setPosition(Math.round(o.x), Math.round(o.y + 6));
    }
    shadeEntity(o);
  });

  if (villageDecor) {
    villageDecor.getChildren().forEach(v => {
      if (v.lockedY !== undefined) v.y = v.lockedY;
      if (v.speechBubble && v.speechBubble.active) {
        v.speechBubble.setPosition(Math.round(v.x), Math.round(v.y - 24)).setDepth(v.y + 30);
      }
      if (v.isGroundPlaza) {
        v.setDepth(-8.5);
      } else {
        shadeEntity(v);
      }
    });
  }

  if (gameState === 'PLAYING' || gameState === 'PAUSED' || gameState === 'LEVEL_UP') {
    shadeEntity(player);
    items.getChildren().forEach(shadeEntity);
    coins.getChildren().forEach(shadeEntity);
    if (xpOrbs) xpOrbs.getChildren().forEach(shadeEntity);
    enemies.getChildren().forEach(e => {
      shadeEntity(e);
      if (e.chargeRing && e.chargeRing.active) {
        e.chargeRing.setPosition(Math.round(e.x - 12), Math.round(e.y)).setDepth(e.depth + 2);
      }
      // Desenha barra de vida/armadura para inimigos comuns com mais de 1 HP (Boss usa o HUD dedicado)
      if (e.active && !e.isBoss && e.maxHp > 1) {
        const bw = 22, bh = 4;
        const bx = Math.round(e.x - bw / 2);
        const by = Math.round(e.y - e.displayHeight / 2 - 8);
        enemyHpBars.fillStyle(0x0e0b08, 0.9).fillRect(bx - 1, by - 1, bw + 2, bh + 2);
        enemyHpBars.fillStyle(0x2a1d17, 0.9).fillRect(bx, by, bw, bh);
        const pct = Phaser.Math.Clamp(e.hp / e.maxHp, 0, 1);
        const hpColor = e.hp < e.maxHp ? 0xff5252 : 0xffca28;
        enemyHpBars.fillStyle(hpColor, 1).fillRect(bx, by, Math.round(bw * pct), bh);
      }
    });
  }

  playerArrows.getChildren().forEach(a => a.setDepth(a.y + 16));
  enemyArrows.getChildren().forEach(a => a.setDepth(a.y + 16));

  // Escudo, aura rúnica e golpe de espada acompanham o cavaleiro (sempre voltados para a frente)
  if (player && player.visible) {
    shieldSprite.setPosition(Math.round(player.x + 12), Math.round(player.y + 4)).setDepth(player.depth + 1);
    if (shieldAura && shieldAura.visible) {
      shieldAura.setPosition(Math.round(player.x), Math.round(player.y)).setDepth(player.depth - 1);
      shieldAura.rotation += 0.02;
    }
  }
  slashes.getChildren().forEach(s => {
    s.setPosition(Math.round(player.x + (s.offsetX || 30)), Math.round(player.y)).setDepth(player.depth + 3);
    if (s.blade && s.blade.active) {
      s.blade.setPosition(Math.round(player.x + 8), Math.round(player.y + 4)).setDepth(player.depth + 2);
    }
  });
}

// =============================================================================

// =============================================================================
// CONFIGURAÇÃO E INSTANCIAÇÃO DO PHASER
// =============================================================================
const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  pixelArt: true,
  roundPixels: true,
  backgroundColor: '#5b8a3c',
  render: {
    pixelArt: true,
    antialias: false,
    antialiasGL: false,
    roundPixels: true,
    powerPreference: 'high-performance'
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    expandParent: false,
    fullscreenTarget: 'game-container'
  },
  physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
  scene: { preload, create, update }
};

const game = new Phaser.Game(config);

