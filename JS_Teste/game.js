// =============================================================================
// CONFIGURAÇÕES GLOBAIS DO JOGO
// =============================================================================
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#16161a',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

// =============================================================================
// VARIÁVEIS GLOBAIS
// =============================================================================
let player;
let cursors, wasdKeys;
let obstaclesGroup, lasersGroup, itemsGroup;

// Estado do Jogo: 'START' | 'PLAYING' | 'GAMEOVER'
let gameState = 'START';

// Dificuldade e Spawns
let obstacleSpeed = 220;
let spawnDelay = 1200;
let spawnTimerEvent = null;
let difficultyEvent = null;
let itemSpawnEvent = null;

// Pontuação e Tempo
let survivalTime = 0;
let scoreTimerEvent = null;

// Power-ups
let hasShield = false;
let shieldGraphic = null;
let hasGun = false;
let gunShooterEvent = null;
let gunExpireEvent = null;
let gunTimeRemaining = 0;
let gunCountdownEvent = null;

// HUD
let hudScoreText;
let hudStatusText;

// =============================================================================
// 1. PRELOAD
// =============================================================================
function preload() {
  // Elementos desenhados com formas geométricas nativas do Phaser
}

// =============================================================================
// 2. CREATE
// =============================================================================
function create() {
  // Salva referência segura da cena para evitar perda de contexto do 'this'
  const scene = this;

  // --- Limpeza de Timers e Reset de Estado ---
  if (spawnTimerEvent) spawnTimerEvent.remove();
  if (difficultyEvent) difficultyEvent.remove();
  if (itemSpawnEvent) itemSpawnEvent.remove();
  if (scoreTimerEvent) scoreTimerEvent.remove();
  if (gunShooterEvent) gunShooterEvent.remove();
  if (gunCountdownEvent) gunCountdownEvent.remove();
  if (gunExpireEvent) gunExpireEvent.remove();

  gameState = 'START';
  survivalTime = 0;
  obstacleSpeed = 220;
  spawnDelay = 1200;
  hasShield = false;
  shieldGraphic = null;
  hasGun = false;
  gunTimeRemaining = 0;

  scene.physics.resume();

  // --- Jogador ---
  const rect = scene.add.rectangle(400, 320, 40, 40, 0x4caf50);
  player = scene.physics.add.existing(rect);
  player.body.setCollideWorldBounds(true);

  // --- Controles ---
  cursors = scene.input.keyboard.createCursorKeys();
  wasdKeys = scene.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });

  // --- Grupos Físicos ---
  obstaclesGroup = scene.physics.add.group();
  lasersGroup = scene.physics.add.group();
  itemsGroup = scene.physics.add.group();

  // --- Construção do HUD ---
  createHUD();

  // --- Colisões e Interações ---
  scene.physics.add.overlap(player, obstaclesGroup, onPlayerHitObstacle, null, scene);
  scene.physics.add.overlap(player, itemsGroup, onCollectItem, null, scene);

  // Laser vs Obstáculo (só destrói se o obstáculo já estiver visível na tela)
  scene.physics.add.overlap(lasersGroup, obstaclesGroup, (laser, obstacle) => {
    if (obstacle.x > 800) return;
    laser.destroy();
    obstacle.destroy();
  });

  // --- Tela Inicial ---
  showStartScreen();

  // ===========================================================================
  // FUNÇÕES INTERNAS (UTILIZAM A REFERÊNCIA 'scene')
  // ===========================================================================

  // Barra de status superior
  function createHUD() {
    scene.add.rectangle(400, 25, 800, 50, 0x0f0f14, 0.85);

    hudScoreText = scene.add.text(25, 14, 'TEMPO: 0s', {
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#ffffff',
      fontFamily: 'Segoe UI, sans-serif'
    });

    hudStatusText = scene.add.text(775, 14, '', {
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#00e5ff',
      fontFamily: 'Segoe UI, sans-serif'
    }).setOrigin(1, 0);
  }

  // Painel inicial de abertura
  function showStartScreen() {
    const uiElements = [];

    // Fundo escuro semi-transparente
    const bgOverlay = scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.75);
    uiElements.push(bgOverlay);

    // Card centralizado
    const card = scene.add.graphics();
    card.fillStyle(0x1a1a24, 0.95);
    card.fillRoundedRect(175, 90, 450, 420, 16);
    card.lineStyle(2, 0x4caf50, 0.8);
    card.strokeRoundedRect(175, 90, 450, 420, 16);
    uiElements.push(card);

    // Título
    const title = scene.add.text(400, 140, 'GEOMETRIC SURVIVAL', {
      fontSize: '32px',
      fontStyle: 'bold',
      color: '#4caf50',
      fontFamily: 'Segoe UI, sans-serif'
    }).setOrigin(0.5);
    uiElements.push(title);

    // Instruções
    const infoText = scene.add.text(400, 240, 
      'CONTROLES:\n• Mover: WASD ou Setas do Teclado\n\n' +
      'ITENS COLETÁVEIS:\n' +
      '• Amarelo: Arma (disparo balanceado)\n' +
      '• Ciano: Escudo (ignora 1 colisão fatal)', {
      fontSize: '16px',
      color: '#cccccc',
      align: 'center',
      fontFamily: 'Segoe UI, sans-serif',
      lineSpacing: 4
    }).setOrigin(0.5);
    uiElements.push(infoText);

    // Botão Iniciar
    const btnBg = scene.add.rectangle(400, 395, 260, 50, 0x4caf50)
      .setInteractive({ useHandCursor: true });
    const btnText = scene.add.text(400, 395, 'INICIAR JOGO', {
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#ffffff',
      fontFamily: 'Segoe UI, sans-serif'
    }).setOrigin(0.5);
    uiElements.push(btnBg, btnText);

    const hintText = scene.add.text(400, 460, 'Pressione ESPAÇO, ENTER ou CLIQUE para começar', {
      fontSize: '13px',
      color: '#888888',
      fontFamily: 'Segoe UI, sans-serif'
    }).setOrigin(0.5);
    uiElements.push(hintText);

    btnBg.on('pointerover', () => btnBg.setFillStyle(0x66bb6a));
    btnBg.on('pointerout', () => btnBg.setFillStyle(0x4caf50));

    // Ação de início
    let started = false;
    const triggerStart = () => {
      if (started) return;
      started = true;

      // Destrói todos os elementos da tela inicial
      uiElements.forEach(el => el.destroy());

      // Inicia o jogo pra valer
      startGameplay();
    };

    btnBg.once('pointerdown', triggerStart);
    scene.input.once('pointerdown', triggerStart);
    scene.input.keyboard.once('keydown-SPACE', triggerStart);
    scene.input.keyboard.once('keydown-ENTER', triggerStart);
  }

  // Ativa o loop do jogo, cronômetro e geração de entidades
  function startGameplay() {
    gameState = 'PLAYING';

    // 1. Cronômetro de Sobrevivência (a cada 1 segundo)
    scoreTimerEvent = scene.time.addEvent({
      delay: 1000,
      callback: () => {
        if (gameState !== 'PLAYING') return;
        survivalTime += 1;
        hudScoreText.setText(`TEMPO: ${survivalTime}s`);
      },
      loop: true
    });

    // 2. Primeiro obstáculo imediato e fluxo contínuo
    spawnObstacle();
    scheduleNextSpawn();

    // 3. Aceleração progressiva dos obstáculos a cada 3s
    difficultyEvent = scene.time.addEvent({
      delay: 3000,
      callback: () => {
        if (gameState !== 'PLAYING') return;
        obstacleSpeed += 25;
        spawnDelay = Math.max(350, spawnDelay - 80);
      },
      loop: true
    });

    // 4. Primeiro item aos 3 segundos, e depois a cada 6s
    scene.time.delayedCall(3000, () => {
      if (gameState !== 'PLAYING') return;
      spawnItem();
      itemSpawnEvent = scene.time.addEvent({
        delay: 6000,
        callback: spawnItem,
        loop: true
      });
    });
  }

  // Agenda o próximo obstáculo com base no spawnDelay atual
  function scheduleNextSpawn() {
    if (gameState !== 'PLAYING') return;

    spawnTimerEvent = scene.time.delayedCall(spawnDelay, () => {
      spawnObstacle();
      scheduleNextSpawn();
    });
  }

  // Gera triângulo vermelho que se desloca para a esquerda
  function spawnObstacle() {
    if (gameState !== 'PLAYING') return;
    const randomY = Phaser.Math.Between(70, 560);
    const triangle = scene.add.triangle(850, randomY, 0, 15, 30, 0, 30, 30, 0xff3333);
    obstaclesGroup.add(triangle);
    triangle.body.setVelocityX(-obstacleSpeed);
    triangle.body.setAllowGravity(false);
  }

  // Gera item coletável (Arma = amarelo, Escudo = ciano)
  function spawnItem() {
    if (gameState !== 'PLAYING') return;
    const randomY = Phaser.Math.Between(80, 540);
    const type = Phaser.Math.Between(0, 1) === 0 ? 'gun' : 'shield';
    const color = type === 'gun' ? 0xffeb3b : 0x00e5ff;

    const item = scene.add.circle(850, randomY, 13, color);
    itemsGroup.add(item);
    item.itemType = type;
    item.body.setVelocityX(-160);
    item.body.setAllowGravity(false);
  }

  // Coleta de itens
  function onCollectItem(playerRef, item) {
    if (item.itemType === 'gun') activateGun();
    else if (item.itemType === 'shield') activateShield();
    item.destroy();
    updateHUDStatus();
  }

  // Ativa arma por 6 segundos com cadência balanceada (320ms)
  function activateGun() {
    hasGun = true;
    gunTimeRemaining = 6;
    if (gunShooterEvent) gunShooterEvent.remove();
    if (gunExpireEvent) gunExpireEvent.remove();
    if (gunCountdownEvent) gunCountdownEvent.remove();

    gunShooterEvent = scene.time.addEvent({
      delay: 320,
      callback: () => {
        if (gameState !== 'PLAYING' || !hasGun) return;
        const laser = scene.add.rectangle(player.x + 24, player.y, 14, 5, 0xffeb3b);
        lasersGroup.add(laser);
        laser.body.setVelocityX(620);
      },
      loop: true
    });

    gunCountdownEvent = scene.time.addEvent({
      delay: 1000,
      callback: () => {
        gunTimeRemaining = Math.max(0, gunTimeRemaining - 1);
        updateHUDStatus();
      },
      loop: true
    });

    gunExpireEvent = scene.time.delayedCall(6000, () => {
      hasGun = false;
      if (gunShooterEvent) gunShooterEvent.remove();
      if (gunCountdownEvent) gunCountdownEvent.remove();
      updateHUDStatus();
    });
  }

  // Ativa escudo com halo ciano
  function activateShield() {
    hasShield = true;
    if (!shieldGraphic) {
      shieldGraphic = scene.add.circle(player.x, player.y, 28);
      shieldGraphic.setStrokeStyle(3, 0x00e5ff);
    }
    updateHUDStatus();
  }

  // Atualiza indicadores de power-ups no HUD
  function updateHUDStatus() {
    const statusParts = [];
    if (hasShield) statusParts.push('🛡️ ESCUDO');
    if (hasGun) statusParts.push(`⚡ ARMA (${gunTimeRemaining}s)`);
    hudStatusText.setText(statusParts.join('  |  '));
  }

  // Colisão com obstáculo
  function onPlayerHitObstacle(playerRef, obstacle) {
    if (gameState !== 'PLAYING') return;

    if (hasShield) {
      hasShield = false;
      if (shieldGraphic) {
        shieldGraphic.destroy();
        shieldGraphic = null;
      }
      obstacle.destroy();
      updateHUDStatus();
      return;
    }

    triggerGameOver(playerRef);
  }

  // Tela de Game Over estilizada
  function triggerGameOver(playerRef) {
    gameState = 'GAMEOVER';

    if (spawnTimerEvent) spawnTimerEvent.remove();
    if (difficultyEvent) difficultyEvent.remove();
    if (itemSpawnEvent) itemSpawnEvent.remove();
    if (scoreTimerEvent) scoreTimerEvent.remove();
    if (gunShooterEvent) gunShooterEvent.remove();
    if (gunCountdownEvent) gunCountdownEvent.remove();
    if (gunExpireEvent) gunExpireEvent.remove();

    scene.physics.pause();
    playerRef.fillColor = 0xd32f2f;

    // Overlay escuro
    scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.75);

    // Card Game Over
    const card = scene.add.graphics();
    card.fillStyle(0x1a1a24, 0.95);
    card.fillRoundedRect(200, 140, 400, 320, 16);
    card.lineStyle(2, 0xff4444, 0.8);
    card.strokeRoundedRect(200, 140, 400, 320, 16);

    scene.add.text(400, 195, 'FIM DE JOGO', {
      fontSize: '36px',
      fontStyle: 'bold',
      color: '#ff4444',
      fontFamily: 'Segoe UI, sans-serif'
    }).setOrigin(0.5);

    scene.add.text(400, 260, `Você sobreviveu por:\n${survivalTime} segundos`, {
      fontSize: '20px',
      color: '#ffffff',
      align: 'center',
      fontFamily: 'Segoe UI, sans-serif',
      lineSpacing: 6
    }).setOrigin(0.5);

    // Botão Jogar Novamente
    const restartBtn = scene.add.rectangle(400, 374, 240, 48, 0xff4444)
      .setInteractive({ useHandCursor: true });
    scene.add.text(400, 374, 'JOGAR NOVAMENTE', {
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffffff',
      fontFamily: 'Segoe UI, sans-serif'
    }).setOrigin(0.5);

    restartBtn.on('pointerover', () => restartBtn.setFillStyle(0xff6666));
    restartBtn.on('pointerout', () => restartBtn.setFillStyle(0xff4444));

    const restartGame = () => scene.scene.restart();

    scene.time.delayedCall(250, () => {
      restartBtn.once('pointerdown', restartGame);
      scene.input.once('pointerdown', restartGame);
      scene.input.keyboard.once('keydown-SPACE', restartGame);
    });
  }
}

// =============================================================================
// 3. UPDATE
// =============================================================================
function update() {
  if (gameState !== 'PLAYING') return;

  // --- Movimentação e Normalização Diagonal ---
  const speed = 280;
  player.body.setVelocity(0);
  let dirX = 0;
  let dirY = 0;

  if (cursors.left.isDown || wasdKeys.left.isDown) dirX -= 1;
  if (cursors.right.isDown || wasdKeys.right.isDown) dirX += 1;
  if (cursors.up.isDown || wasdKeys.up.isDown) dirY -= 1;
  if (cursors.down.isDown || wasdKeys.down.isDown) dirY += 1;

  player.body.setVelocity(dirX * speed, dirY * speed);
  player.body.velocity.normalize().scale(speed);

  // --- Seguir Halo do Escudo ---
  if (shieldGraphic && shieldGraphic.active) {
    shieldGraphic.setPosition(player.x, player.y);
  }

  // --- Limpeza de Memória (Garbage Collection) ---
  obstaclesGroup.getChildren().forEach((obs) => {
    if (obs.x < -50) obs.destroy();
  });

  itemsGroup.getChildren().forEach((item) => {
    if (item.x < -50) item.destroy();
  });

  lasersGroup.getChildren().forEach((laser) => {
    if (laser.x >= 800) laser.destroy();
  });
}