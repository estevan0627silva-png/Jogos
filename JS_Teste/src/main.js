// =============================================================================
// CICLO DE VIDA DO JOGO (PHASER 3): PRELOAD, CREATE, UPDATE & INICIALIZAÇÃO
// =============================================================================

// CENA: PRELOAD — cria todas as texturas com filtro NEAREST (zero serrilhado/esfarelado)
// =============================================================================
function preload() {
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.loadingStart();
  if (this.textures.exists('knight')) return;
  makeSheet(this, 'knight', 32, 32, 4, drawKnight);
  makeSheet(this, 'goblin', 28, 28, 2, drawGoblin);
  makeSheet(this, 'goblin_scout', 22, 22, 2, drawGoblinScout);
  makeSheet(this, 'warrior', 36, 36, 2, drawWarrior);
  makeSheet(this, 'elf', 32, 32, 2, drawElf);

  makeSheet(this, 'dark_mage', 32, 32, 2, drawDarkMage);
  makeSheet(this, 'mage_barrier', 16, 36, 2, drawMageBarrier);
  makeSheet(this, 'mini_golem', 28, 28, 3, drawMiniGolem);
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
  makeSheet(this, 'blacksmith_master', 48, 52, 4, drawBlacksmithMaster);
  makeSheet(this, 'mage_master', 48, 52, 4, drawMageMaster);
  makeSheet(this, 'tree', 48, 64, 1, drawTree);
  makeSheet(this, 'rock', 32, 26, 2, drawRock);
  makeSheet(this, 'shield_worn', 18, 22, 1, drawShieldIcon);
  makeSheet(this, 'sword_blade', 12, 40, 1, drawBlade);
  makeSheet(this, 'arrow_player', 26, 10, 1, arrowDrawer(C.blueBase, C.steelLight, C.manaLight));
  makeSheet(this, 'arrow_gold', 26, 10, 1, arrowDrawer(C.goldDark, C.goldHighlight, C.goldLight));
  makeSheet(this, 'arrow_elf', 26, 10, 1, arrowDrawer(0x00c853, 0x69f0ae, 0x00e676));
  makeSheet(this, 'arrow_enemy', 26, 10, 1, arrowDrawer(C.arcanaDeep, C.arcanaLight, C.manaLight));
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
  makeItem(this, 'scroll_multishot', 0xb388ff, drawScrollMultiShotIcon);
  makeItem(this, 'scroll_growth', 0x81c784, drawScrollGrowthIcon);
  makeItem(this, 'scroll_speed', 0xffb74d, drawScrollSpeedIcon);
    makeWorldTextures(this);
  makeSlashTexture(this);
  if (typeof makeUIButtonTextures === 'function') makeUIButtonTextures(this);
  if (typeof registerTinySwordsUI === 'function') registerTinySwordsUI(this);
  if (typeof registerSuperPixelVFX === 'function') registerSuperPixelVFX(this);

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
  if (typeof createVFXAnimations === 'function') createVFXAnimations(scene);
  Object.values(scene.textures.list).forEach(tex => { if (tex && tex.setFilter) tex.setFilter(Phaser.Textures.FilterMode.NEAREST); });

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
  worldSpeed = enemySpeed * 0.6;
  if (typeof window !== 'undefined') window.worldSpeed = worldSpeed;
  spawnDelay = 1300;
  buff = { type: null, timeLeft: 0, nextAttack: 0 };
  activeBoss = null;
  bossSpawned = false;
  bossDefeated = false;
  draftModal = null;
  entityIdCounter = 0;

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
    goblin_scout: { fps: 14, frames: 2 },
    warrior: { fps: 8, frames: 2 },
    elf: { fps: 9, frames: 2 },

    dark_mage: { fps: 8, frames: 2 },
    mage_barrier: { fps: 6, frames: 2 },
    mini_golem: { fps: 10, frames: 2 },
    boss_golem: { fps: 6, frames: 2 },
    village_npc: { fps: 4, frames: 2 },
    gold_coin: { fps: 8, frames: 2 },
    silver_coin: { fps: 8, frames: 2 },
    xp_orb: { fps: 8, frames: 2 },
    blacksmith_master: { fps: 4, frames: 4 },
    mage_master: { fps: 4, frames: 4 }
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

  // Animações dos cortes de espada (9 quadros baseados na spritesheet enviada)
  if (!scene.anims.exists('slash_anim_lr')) {
    const frames = [];
    for (let i = 0; i < 9; i++) frames.push({ key: 'slash_lr', frame: i });
    scene.anims.create({ key: 'slash_anim_lr', frameRate: 48, repeat: 0, frames });
  }
  if (!scene.anims.exists('slash_anim_rl')) {
    const frames = [];
    for (let i = 0; i < 9; i++) frames.push({ key: 'slash_rl', frame: i });
    scene.anims.create({ key: 'slash_anim_rl', frameRate: 48, repeat: 0, frames });
  }

  // Camadas do cenário, de trás para frente (Proporção 16:9 Nativa 960x540)
  ground = scene.add.tileSprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 'ground').setDepth(-10);
  road = scene.add.tileSprite(GAME_WIDTH / 2, 285, GAME_WIDTH, 84, 'road').setDepth(-9);
  forestTop = scene.add.tileSprite(GAME_WIDTH / 2, 48, GAME_WIDTH, 96, 'forest_top').setDepth(-5);
  sunRays = scene.add.tileSprite(GAME_WIDTH / 2, 130, GAME_WIDTH, 260, 'sunbeam_rays').setDepth(-4).setAlpha(0.06).setBlendMode(Phaser.BlendModes.ADD);
  scene.tweens.add({ targets: sunRays, alpha: { from: 0.04, to: 0.08 }, duration: 4200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
  shadows = scene.add.graphics().setDepth(-2);
  forestBottom = scene.add.tileSprite(GAME_WIDTH / 2, 505, GAME_WIDTH, 70, 'forest_bottom').setDepth(1000);
  vignetteOverlay = scene.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'vignette_64bit').setDepth(1590).setScrollFactor(0);
  bossFilterOverlay = scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x240b06, 0).setDepth(1800);

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

  // Árvores nas bordas a partir de além dos portões da vila (expandido para 16:9)
  for (let x = 620; x <= 1180; x += 120) spawnTree(x);

  // Jogador (limitado à área entre as florestas na proporção 16:9)
  scene.physics.world.setBounds(0, 85, GAME_WIDTH, 390);
  player = scene.physics.add.sprite(180, 285, 'knight', 0);
  player.body.setSize(16, 22).setOffset(8, 8);
  player.setCollideWorldBounds(true);
  player.setVisible(false); // Oculto enquanto estiver nos menus
  shieldSprite = scene.add.image(0, 0, 'shield_worn').setVisible(false);
  shieldAura = scene.add.image(0, 0, 'shield_aura').setVisible(false).setAlpha(0.85);
  swordBlade = scene.add.image(0, 0, 'sword_blade').setOrigin(0.5, 0.82).setVisible(false).setDepth(10);

  // Controles Desktop & Suporte Multi-Touch Mobile
  cursors = scene.input.keyboard.createCursorKeys();
  keys = scene.input.keyboard.addKeys('W,A,S,D');

  // Suporte a multi-touch para até 4 toques simultâneos (joystick + ataque + botões)
  scene.input.addPointer(3);

  // Inicialização do Joystick Virtual Modular
  if (virtualJoystick) {
    virtualJoystick.destroy();
    virtualJoystick = null;
  }
  if (typeof VirtualJoystick === 'function') {
    virtualJoystick = new VirtualJoystick(scene);
  }

 

  pauseModal = null;
  enemyHpBars = scene.add.graphics().setDepth(2400);
  playerBuffBar = scene.add.graphics().setDepth(2500);

  // Tecla P: Atalho exclusivo de teclado para pausar/despausar o jogo (junto ao botão do HUD)
  scene.input.keyboard.on('keydown-P', () => handleEscPress(scene));

  // Tecla F: Atalho exclusivo de teclado para alternar Tela Cheia (junto ao botão do HUD)
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

  // Separação física entre Mini-Golems despertos (evita que se sobreponham na arena)
  scene.physics.add.collider(enemies, enemies, null, (e1, e2) => {
    return Boolean(
      e1 && e2 && e1.active && e2.active &&
      e1.enemyType === 'mini_golem' && e2.enemyType === 'mini_golem' &&
      e1.golemState === 'ACTIVE' && e2.golemState === 'ACTIVE'
    );
  });

  // Combate: suporta flechas, machados bumerangue perfurantes e bolas de fogo explosivas
  scene.physics.add.overlap(playerArrows, enemies, (a, e) => {
    if (e.x >= GAME_WIDTH || !a.active || !e.active) return;

    // Identificador único da entidade para rastreamento seguro de hits por projétil
    if (!e.entityId) e.entityId = ++entityIdCounter;

    // Regra do Machado/Martelo Bumerangue: no máximo 2 instâncias de dano (1 na ida e 1 na volta)
    if (a.isBoomerang) {
      if (!a.hitEnemiesOut) a.hitEnemiesOut = new Set();
      if (!a.hitEnemiesBack) a.hitEnemiesBack = new Set();

      const isReturning = Boolean(a.returning || (a.body && a.body.velocity.x < 0));
      if (!isReturning) {
        // Fase de IDA: apenas 1 hit neste inimigo
        if (a.hitEnemiesOut.has(e.entityId)) return;
        a.hitEnemiesOut.add(e.entityId);
      } else {
        // Fase de VOLTA: apenas 1 hit neste inimigo
        if (a.hitEnemiesBack.has(e.entityId)) return;
        a.hitEnemiesBack.add(e.entityId);
      }
    } else {
      // Projéteis perfurantes comuns (flechas com multi-shot/pierce): no máximo 1 hit por inimigo
      if (!a.hitEnemies) a.hitEnemies = new Set();
      if (a.hitEnemies.has(e.entityId)) return;
      a.hitEnemies.add(e.entityId);
    }

    // Mago Sombrio: Barreira Arcana Frontal (reflete projéteis durante a ativação periódica)
    if (e.enemyType === 'dark_mage') {
      if (e.isShieldActive) {
        reflectMageProjectile(scene, e, a);
        return;
      }
      // Fora de ativação periódica (em recarga/janela vulnerável): sofre dano normalmente!
    }

    if (a.isFireball) {
      const fx = a.x, fy = a.y, rad = a.blastRadius || 42, dmg = a.dmg || 1;
      a.destroy();
      explodeFireball(scene, fx, fy, rad, dmg);
      return;
    }

    damageEnemy(scene, e, a.dmg || 1);
    if (!e.isBoss && e.active && e.hp > 0 && a.knockback && a.knockback > 0) {
      applySmoothKnockback(scene, e, a.knockback, 130);
    }
    if (a.pierceCount && a.pierceCount > 1) {
      a.pierceCount--;
    } else if (!a.isBoomerang) {
      a.destroy();
    }
  });
  scene.physics.add.overlap(slashes, enemies, (s, e) => {
    // Trava monotônica (< s.slashId) evita que dois golpes simultâneos alternem dano a cada frame!
    if (e.x < GAME_WIDTH && s.active && e.active && (e.lastSlashId ?? 0) < s.slashId) {
      e.lastSlashId = s.slashId;
      damageEnemy(scene, e, s.dmg || 1);
      // Regra 22: Espada aplica empurrão suave (knockback) exclusivo se o inimigo sobreviver
      if (!e.isBoss && e.active && e.hp > 0) {
        const kbDist = Math.min(34, s.knockback ? Math.round(s.knockback * 0.65) : 22);
        applySmoothKnockback(scene, e, kbDist, 130);
      }
      if (e.enemyType === 'warrior' || e.isBoss) {
        triggerHitstop(scene, 40);
      }
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
    if (arrow.x > 0 && arrow.x < GAME_WIDTH && obs.x < GAME_WIDTH + 10) {
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

  if (typeof PlatformBridge !== 'undefined') PlatformBridge.loadingStop();

  if (data && data.autoStart) {
    startGameplay(scene);
  } else if (data && data.openShop) {
    if (data.shopTab === 'blacksmith') showBlacksmithMenu(scene); else showMageShopMenu(scene);
  } else {
    showMainMenu(scene);
  }
}

// =============================================================================
// CENA: UPDATE — roda a cada frame

// =============================================================================
function update(time, delta) {
  const dt = Math.min(delta / 1000, 0.05); // clamp dt para evitar saltos bruscos de frame
  if (virtualJoystick) virtualJoystick.update(dt);
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
  if (sunRays) sunRays.tilePositionX += scrollSpeed * 0.45 * dt;
  obstacles.setVelocityX(-scrollSpeed);
}

function updateGameplay(scene, time, dt) {
  // 1. Mundo rolando: chão, estrada e obstáculos andam JUNTOS (nada desliza)
  worldSpeed = enemySpeed * 0.6;
  if (typeof window !== 'undefined') window.worldSpeed = worldSpeed;
  ground.tilePositionX += worldSpeed * dt;
  road.tilePositionX += worldSpeed * dt;
  forestTop.tilePositionX += worldSpeed * 0.9 * dt;    // fundo: um pouco mais lento
  forestBottom.tilePositionX += worldSpeed * 1.3 * dt; // frente: mais rápido (parallax)
  if (sunRays) sunRays.tilePositionX += worldSpeed * 0.5 * dt;
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

  // 2. Cavaleiro: 8 direções e analógico 360° com pixels 100% nítidos (sem rotação sub-pixel setAngle que esfarela a Pixel Art!)
  const moveSpd = getPlayerMoveSpeed();
  let dirX = 0, dirY = 0;
  if (cursors.left.isDown || keys.A.isDown) dirX -= 1;
  if (cursors.right.isDown || keys.D.isDown) dirX += 1;
  if (cursors.up.isDown || keys.W.isDown) dirY -= 1;
  if (cursors.down.isDown || keys.S.isDown) dirY += 1;

  if (virtualJoystick && virtualJoystick.active) {
    const joyVec = virtualJoystick.getVector();
    dirX += joyVec.x;
    dirY += joyVec.y;
  }

  const inputLen = Math.hypot(dirX, dirY);
  if (inputLen > 0) {
    const clampedScale = Math.min(inputLen, 1.0) * moveSpd;
    player.setVelocity((dirX / inputLen) * clampedScale, (dirY / inputLen) * clampedScale);
  } else {
    player.setVelocity(0, 0);
  }
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
      if (e.barrierSprite && e.barrierSprite.active) {
        e.barrierSprite.setPosition(Math.round(e.x - 16), Math.round(e.y));
        e.barrierSprite.setDepth(e.depth + 5);
      }
      if (e.enemyType === 'goblin_scout') {
        if (e.phase === undefined) e.phase = Math.random() * 6.28;
        // Goblin Rastreador: avanco continuo para a esquerda em alta velocidade com perseguicao senoidal no eixo Y
        const scoutSpeed = (enemySpeed || 195) * (ENEMIES.goblin_scout ? ENEMIES.goblin_scout.speed : 1.48);
        let trackVy = 0;
        if (player && player.active) {
          const dy = player.y - e.y;
          trackVy = Phaser.Math.Clamp(dy * 1.6, -110, 110);
        }
        const osc = Math.sin(time * 0.008 + e.phase) * 80;
        e.setVelocityX(-scoutSpeed);
        e.setVelocityY(trackVy + osc);
        if (e.y < 135 && e.body && e.body.velocity.y < 0) e.setVelocityY(Math.abs(e.body.velocity.y));
        else if (e.y > 515 && e.body && e.body.velocity.y > 0) e.setVelocityY(-Math.abs(e.body.velocity.y));
      } else if (e.enemyType === 'goblin') {
        if (e.phase === undefined) e.phase = Math.random() * 6.28;
        // Goblin Comum: marcha continua para a esquerda com oscilacao senoidal em Y
        const gobSpeed = (enemySpeed || 195) * (ENEMIES.goblin ? ENEMIES.goblin.speed : 1.12);
        const zigZagSpeed = Math.sin(time * 0.007 + e.phase) * 75;
        e.setVelocityX(-gobSpeed);
        e.setVelocityY(zigZagSpeed);
        if (e.y < 135 && e.body && e.body.velocity.y < 0) e.setVelocityY(Math.abs(zigZagSpeed));
        else if (e.y > 515 && e.body && e.body.velocity.y > 0) e.setVelocityY(-Math.abs(zigZagSpeed));
      } else if (e.enemyType === 'mini_golem') {
        // Máquina de Estados Estrita do Mini-Golem: EJECTING, DORMANT, AWAKENING, ACTIVE
        if (e.golemState === 'EJECTING') {
          // Estado a: Ejetando em arco parabólico. Física desativada, velocidade zerada
          if (e.body && e.body.moves) {
            e.body.moves = false;
          }
          e.setVelocity(0, 0);
          e.setFrame(2);
        } else if (e.golemState === 'DORMANT' || e.golemState === 'AWAKENING') {
          // Estados b e c: Caído inerte ou em tremor pré-despertar. Sincronizado ao solo (-worldSpeed), Y zerado, NENHUMA perseguição
          if (e.body && !e.body.moves) {
            e.body.moves = true;
          }
          e.setVelocityX(-worldSpeed);
          e.setVelocityY(0);
          e.setFrame(2);
        } else if (e.golemState === 'ACTIVE') {
          // Estado d: Apenas quando comprovadamente ACTIVE pode perseguir o jogador
          if (e.body && !e.body.moves) {
            e.body.moves = true;
          }
          const slowSpeed = (ENEMIES.mini_golem && ENEMIES.mini_golem.speed) ? (enemySpeed * ENEMIES.mini_golem.speed) : 60;
          if (player && player.active) {
            scene.physics.moveToObject(e, player, slowSpeed);
          }
        }
      }
    }
  });

  // Rotação fluida dos Machados Bumerangue e rastros de projéteis
  playerArrows.getChildren().forEach(p => {
    if ((p.isBoomerang || p.texture.key === 'axe_proj') && p.active) {
      p.spinAccum = (p.spinAccum || 0) + 820 * dt;
      p.setAngle(Math.round(p.spinAccum / 30) * 30);
      if (p.isBoomerang && !p.returning && p.body && p.body.velocity.x < 0) {
        p.returning = true;
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
        if (activeBoss.x <= 820) {
          activeBoss.x = 820;
          activeBoss.setVelocityX(0);
          activeBoss.entering = false;
          activeBoss.setVelocityY(68);
        }
      } else {
        activeBoss.x = 820;
        activeBoss.setVelocityX(0);
        if (activeBoss.y <= 150) activeBoss.setVelocityY(72);
        else if (activeBoss.y >= 430) activeBoss.setVelocityY(-72);
      }
    }
  }

  // 4. Sistema Modular de Armas: cadência e tempo processados pela estratégia ativa
  WeaponSystem.update(scene, time, dt);
  updateFirePools(scene, dt);
  updateItemHUD();

  // 5. Limpeza do que saiu da tela (.slice() evita pular itens ao destruir; Boss nunca some!)
  const cull = (group, isOut) => group.getChildren().slice().forEach(s => { if (isOut(s)) removeEntity(s); });
  cull(villageDecor, s => s.x < -300);
  cull(enemies, s => !s.isBoss && s.x < -60);
  cull(obstacles, s => s.x < -60);
  cull(items, s => s.x < -60);
  cull(coins, s => s.x < -60);
  cull(xpOrbs, s => s.x < -60);
  cull(playerArrows, s => s.x < -40 || s.x > GAME_WIDTH + 40 || s.y < 0 || s.y > GAME_HEIGHT + 20);
  cull(enemyArrows, s => s.x < -40 || s.x > GAME_WIDTH + 40 || s.y < 0 || s.y > GAME_HEIGHT + 20);
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

  // Direção do desvio: respeita a intenção do jogador (W/S/Joystick) ou desvia pelo lado mais próximo do centro
  const joyVec = (virtualJoystick && virtualJoystick.active) ? virtualJoystick.getVector() : { x: 0, y: 0 };
  let slideDir = (keys.W.isDown || cursors.up.isDown || joyVec.y < -0.25) ? -1 :
                 (keys.S.isDown || cursors.down.isDown || joyVec.y > 0.25) ? 1 :
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
    } else if (s.enemyType === 'goblin_scout') {
      pw = 14; ph = 5; cw = 10; ch = 3;
      pAlpha = 0.18; cAlpha = 0.30;
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
    const altitude = Math.max(0, groundY - Math.round(s.y + (s.displayHeight ? s.displayHeight / 2 : 14)));
    const altFactor = Math.max(0.40, 1.0 - altitude * 0.015);
    const curPw = Math.round(pw * altFactor);
    const curPh = Math.round(ph * altFactor);
    const curCw = Math.round(cw * altFactor);
    const curCh = Math.round(ch * altFactor);

    // 1. Halo difuso ambiente 64-bit
    shadows.fillStyle(0x1e150c, pAlpha * 0.45 * altFactor).fillEllipse(sx, groundY, Math.round(curPw * 1.35), Math.round(curPh * 1.35));
    // 2. Penumbra suave intermediaria
    shadows.fillStyle(0x120c08, pAlpha * altFactor).fillEllipse(sx, groundY, curPw, curPh);
    // 3. Oclusao nitida de contato com o solo
    if (altitude < 16) {
      shadows.fillStyle(0x050302, cAlpha * 1.15).fillEllipse(sx, groundY, curCw, Math.max(2, Math.round(curCh * 0.85)));
    }
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
      if (e.shieldVisual && e.shieldVisual.active) {
        e.shieldVisual.setPosition(Math.round(e.x), Math.round(e.y));
      }
      // Renderização Universal de Barra de Vida Overhead em Pixel Art para TODOS os monstros da floresta
      if (e.active && !e.isBoss) {
        // Mini-Golems inconscientes/em repouso não exibem barra overhead até despertarem
        if (e.enemyType === 'mini_golem' && e.golemState !== 'ACTIVE') return;

        const bw = 24, bh = 5;
        const bx = Math.round(e.x - bw / 2 + 3);
        const by = Math.round(e.y - (e.displayHeight ? e.displayHeight / 2 : 14) - 9);

        // 1. Moldura chanfrada de ferro forjado com cantos chanfrados (16-bit bevelled plate)
        enemyHpBars.fillStyle(0x16120e, 0.95);
        enemyHpBars.fillRect(bx, by - 1, bw, 1);
        enemyHpBars.fillRect(bx, by + bh, bw, 1);
        enemyHpBars.fillRect(bx - 1, by, 1, bh);
        enemyHpBars.fillRect(bx + bw, by, 1, bh);
        // Cavidade escura de pedra obsidiana
        enemyHpBars.fillStyle(0x1a120c, 0.95).fillRect(bx, by, bw, bh);

        // 2. Sangue Drenante e Flash de Dano Interpolado (Ghost Bar em Ouro Âmbar)
        const pct = Phaser.Math.Clamp(e.hp / e.maxHp, 0, 1);
        e.displayHpPct = e.displayHpPct ?? pct;
        e.displayHpPct = Phaser.Math.Linear(e.displayHpPct, pct, 0.16);
        if (Math.abs(e.displayHpPct - pct) < 0.005) e.displayHpPct = pct;

        // Barra fantasma âmbar/dourada de dano sofrido
        if (e.displayHpPct > pct) {
          const ghostW = Math.round(bw * e.displayHpPct);
          enemyHpBars.fillStyle(0xffca28, 1).fillRect(bx, by, ghostW, bh);
        }

        // Barra de sangue carmesim viva com brilho no topo
        const bloodW = Math.round(bw * pct);
        if (bloodW > 0) {
          enemyHpBars.fillStyle(0xd32f2f, 1).fillRect(bx, by, bloodW, bh);
          enemyHpBars.fillStyle(0xff7961, 0.75).fillRect(bx, by, bloodW, 1);
          enemyHpBars.fillStyle(0x8e1b1b, 0.55).fillRect(bx, by + bh - 1, bloodW, 1);
        }

        // 3. Mini-Coração Rubi em Pixel Art (7x6 pixels) no fecho esquerdo da barra
        const hx = bx - 8;
        const hy = by - 1;
        // Contorno escuro chanfrado do mini-coração (0x140e0a)
        enemyHpBars.fillStyle(0x140e0a, 1);
        enemyHpBars.fillRect(hx + 1, hy, 2, 1);
        enemyHpBars.fillRect(hx + 4, hy, 2, 1);
        enemyHpBars.fillRect(hx, hy + 1, 7, 1);
        enemyHpBars.fillRect(hx, hy + 2, 7, 1);
        enemyHpBars.fillRect(hx + 1, hy + 3, 5, 1);
        enemyHpBars.fillRect(hx + 2, hy + 4, 3, 1);
        enemyHpBars.fillRect(hx + 3, hy + 5, 1, 1);

        // Preenchimento de Joia Rubi Esculpida
        if (e.hp > 0) {
          enemyHpBars.fillStyle(0xd83a3a, 1);
          enemyHpBars.fillRect(hx + 1, hy + 1, 2, 1);
          enemyHpBars.fillRect(hx + 4, hy + 1, 2, 1);
          enemyHpBars.fillRect(hx + 1, hy + 2, 4, 1);
          enemyHpBars.fillRect(hx + 2, hy + 3, 2, 1);

          // Sombra da faceta direita do rubi
          enemyHpBars.fillStyle(0x8e1b1b, 1);
          enemyHpBars.fillRect(hx + 5, hy + 2, 1, 1);
          enemyHpBars.fillRect(hx + 4, hy + 3, 1, 1);
          enemyHpBars.fillRect(hx + 3, hy + 4, 1, 1);

          // Brilho especular puro (glint de 1 sub-pixel)
          enemyHpBars.fillStyle(0xffffff, 1).fillRect(hx + 1, hy + 1, 1, 1);
          enemyHpBars.fillStyle(0xff8a80, 0.85).fillRect(hx + 2, hy + 1, 1, 1);
        } else {
          enemyHpBars.fillStyle(0x421d1d, 1);
          enemyHpBars.fillRect(hx + 1, hy + 1, 2, 1);
          enemyHpBars.fillRect(hx + 4, hy + 1, 2, 1);
          enemyHpBars.fillRect(hx + 1, hy + 2, 5, 1);
          enemyHpBars.fillRect(hx + 2, hy + 3, 3, 1);
          enemyHpBars.fillRect(hx + 3, hy + 4, 1, 1);
        }
      }
    });
  }

  playerArrows.getChildren().forEach(a => a.setDepth(a.y + 16));
  enemyArrows.getChildren().forEach(a => a.setDepth(a.y + 16));

  // Escudo, aura rúnica e lâmina da espada acompanham o cavaleiro (sempre voltados para a frente)
  if (player && player.visible) {
    shieldSprite.setPosition(Math.round(player.x + 12), Math.round(player.y + 4)).setDepth(player.depth + 1);
    if (shieldAura && shieldAura.visible) {
      shieldAura.setPosition(Math.round(player.x), Math.round(player.y)).setDepth(player.depth - 1);
      shieldAura.rotation += 0.02;
    }
    if (swordBlade) {
      if (buff && buff.type === 'sword') {
        swordBlade.setVisible(true);
        swordBlade.setPosition(Math.round(player.x + 10), Math.round(player.y + 2)).setDepth(player.depth + 2);
        const swordLvl = (typeof getWeaponLevel === 'function') ? getWeaponLevel('sword') : 1;
        const swordStats = (typeof getWeaponStats === 'function') ? getWeaponStats('sword', swordLvl) : { area: 1.0 };
        const bladeScale = Phaser.Math.Clamp(1.0 * (swordStats.area || 1.0), 1.0, 2.5);
        swordBlade.setScale(bladeScale);
        if (swordBlade.scene && !swordBlade.scene.tweens.isTweening(swordBlade)) {
          swordBlade.setAngle(25);
        }
      } else {
        swordBlade.setVisible(false);
      }
    }
  } else if (swordBlade) {
    swordBlade.setVisible(false);
  }
  slashes.getChildren().forEach(s => {
    s.setPosition(Math.round(player.x + (s.offsetX || 38)), Math.round(player.y + (s.offsetY || 0))).setDepth(player.depth + 3);
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
window.game = game;


