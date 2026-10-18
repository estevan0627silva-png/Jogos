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

// Estados do Jogo: 'START' | 'PLAYING' | 'GAMEOVER'
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

// Power-up: Escudo (com duração de 8s)
let hasShield = false;
let shieldTimeRemaining = 0;
let shieldGraphic = null;
let shieldCountdownEvent = null;
let shieldExpireEvent = null;

// Power-up: Arma (com duração de 6s e cadência de 320ms)
let hasGun = false;
let gunTimeRemaining = 0;
let gunShooterEvent = null;
let gunCountdownEvent = null;
let gunExpireEvent = null;

// HUD
let hudScoreText;
let hudHighScoreText;
let hudStatusText;

// Chave do LocalStorage para salvar recordes arcade
const STORAGE_KEY = 'geom_survival_highscores';

// =============================================================================
// FUNÇÕES AUXILIARES DE RECORDES (LOCALSTORAGE)
// =============================================================================
function getHighScores() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  // Recordes padrão clássicos de arcade caso nunca tenha jogado
  return [
    { name: 'ACE', score: 35 },
    { name: 'NEO', score: 25 },
    { name: 'BOT', score: 15 }
  ];
}

function saveHighScore(name, score) {
  const scores = getHighScores();
  const cleanName = (name || 'AAA').toUpperCase().slice(0, 3);
  scores.push({ name: cleanName, score: score });
  scores.sort((a, b) => b.score - a.score);
  const topScores = scores.slice(0, 5); // Mantém o Top 5
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(topScores));
  } catch (e) {}
  return { topScores, currentName: cleanName };
}

function getBestScore() {
  const scores = getHighScores();
  return scores.length > 0 ? scores[0].score : 0;
}

// =============================================================================
// 1. PRELOAD
// =============================================================================
function preload() {
  // Recursos gráficos são gerados proceduralmente
}

// =============================================================================
// 2. CREATE
// =============================================================================
function create() {
  const scene = this;

  // --- Limpeza de Timers Anteriores ---
  if (spawnTimerEvent) spawnTimerEvent.remove();
  if (difficultyEvent) difficultyEvent.remove();
  if (itemSpawnEvent) itemSpawnEvent.remove();
  if (scoreTimerEvent) scoreTimerEvent.remove();
  if (gunShooterEvent) gunShooterEvent.remove();
  if (gunCountdownEvent) gunCountdownEvent.remove();
  if (gunExpireEvent) gunExpireEvent.remove();
  if (shieldCountdownEvent) shieldCountdownEvent.remove();
  if (shieldExpireEvent) shieldExpireEvent.remove();

  // --- Reset de Estado ---
  gameState = 'START';
  survivalTime = 0;
  obstacleSpeed = 220;
  spawnDelay = 1200;
  hasShield = false;
  shieldTimeRemaining = 0;
  shieldGraphic = null;
  hasGun = false;
  gunTimeRemaining = 0;

  scene.physics.resume();

  // --- Criação do Jogador ---
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

  // Projéteis só destroem obstáculos que já estejam dentro da tela visível
  scene.physics.add.overlap(lasersGroup, obstaclesGroup, (laser, obstacle) => {
    if (obstacle.x > 800) return;
    laser.destroy();
    obstacle.destroy();
  });

  // --- Exibe Tela Inicial ---
  showStartScreen();

  // ===========================================================================
  // INTERFACES & TELAS
  // ===========================================================================

  function createHUD() {
    scene.add.rectangle(400, 25, 800, 50, 0x0f0f14, 0.85);

    hudScoreText = scene.add.text(20, 14, 'TEMPO: 0s', {
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffffff',
      fontFamily: 'Segoe UI, sans-serif'
    });

    hudHighScoreText = scene.add.text(180, 14, `RECORDE: ${getBestScore()}s`, {
      fontSize: '18px',
      color: '#ffca28',
      fontFamily: 'Segoe UI, sans-serif'
    });

    hudStatusText = scene.add.text(780, 14, '', {
      fontSize: '17px',
      fontStyle: 'bold',
      color: '#00e5ff',
      fontFamily: 'Segoe UI, sans-serif'
    }).setOrigin(1, 0);
  }

  function showStartScreen() {
    const uiElements = [];

    const bgOverlay = scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.75);
    uiElements.push(bgOverlay);

    const card = scene.add.graphics();
    card.fillStyle(0x1a1a24, 0.95);
    card.fillRoundedRect(175, 80, 450, 440, 16);
    card.lineStyle(2, 0x4caf50, 0.8);
    card.strokeRoundedRect(175, 80, 450, 440, 16);
    uiElements.push(card);

    const title = scene.add.text(400, 130, 'GEOMETRIC SURVIVAL', {
      fontSize: '32px',
      fontStyle: 'bold',
      color: '#4caf50',
      fontFamily: 'Segoe UI, sans-serif'
    }).setOrigin(0.5);
    uiElements.push(title);

    const recordBadge = scene.add.text(400, 175, `👑 RECORDE ATUAL: ${getBestScore()}s`, {
      fontSize: '16px',
      color: '#ffca28',
      fontStyle: 'bold',
      fontFamily: 'Segoe UI, sans-serif'
    }).setOrigin(0.5);
    uiElements.push(recordBadge);

    const infoText = scene.add.text(400, 260, 
      'CONTROLES:\n• Mover: WASD ou Setas do Teclado\n\n' +
      'ITENS COLETÁVEIS:\n' +
      '• Amarelo: Arma temporária (6s de disparos)\n' +
      '• Ciano: Escudo temporário (8s ou 1 impacto)', {
      fontSize: '15px',
      color: '#cccccc',
      align: 'center',
      fontFamily: 'Segoe UI, sans-serif',
      lineSpacing: 4
    }).setOrigin(0.5);
    uiElements.push(infoText);

    const btnBg = scene.add.rectangle(400, 395, 260, 50, 0x4caf50)
      .setInteractive({ useHandCursor: true });
    const btnText = scene.add.text(400, 395, 'INICIAR JOGO', {
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#ffffff',
      fontFamily: 'Segoe UI, sans-serif'
    }).setOrigin(0.5);
    uiElements.push(btnBg, btnText);

    const hintText = scene.add.text(400, 470, 'Pressione ESPAÇO, ENTER ou CLIQUE para começar', {
      fontSize: '13px',
      color: '#888888',
      fontFamily: 'Segoe UI, sans-serif'
    }).setOrigin(0.5);
    uiElements.push(hintText);

    btnBg.on('pointerover', () => btnBg.setFillStyle(0x66bb6a));
    btnBg.on('pointerout', () => btnBg.setFillStyle(0x4caf50));

    let started = false;
    const triggerStart = () => {
      if (started) return;
      started = true;
      uiElements.forEach(el => el.destroy());
      startGameplay();
    };

    btnBg.once('pointerdown', triggerStart);
    scene.input.once('pointerdown', triggerStart);
    scene.input.keyboard.once('keydown-SPACE', triggerStart);
    scene.input.keyboard.once('keydown-ENTER', triggerStart);
  }

  function startGameplay() {
    gameState = 'PLAYING';

    scoreTimerEvent = scene.time.addEvent({
      delay: 1000,
      callback: () => {
        if (gameState !== 'PLAYING') return;
        survivalTime += 1;
        hudScoreText.setText(`TEMPO: ${survivalTime}s`);
      },
      loop: true
    });

    spawnObstacle();
    scheduleNextSpawn();

    difficultyEvent = scene.time.addEvent({
      delay: 3000,
      callback: () => {
        if (gameState !== 'PLAYING') return;
        obstacleSpeed += 25;
        spawnDelay = Math.max(350, spawnDelay - 80);
      },
      loop: true
    });

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

  function scheduleNextSpawn() {
    if (gameState !== 'PLAYING') return;
    spawnTimerEvent = scene.time.delayedCall(spawnDelay, () => {
      spawnObstacle();
      scheduleNextSpawn();
    });
  }

  function spawnObstacle() {
    if (gameState !== 'PLAYING') return;
    const randomY = Phaser.Math.Between(70, 560);
    const triangle = scene.add.triangle(850, randomY, 0, 15, 30, 0, 30, 30, 0xff3333);
    obstaclesGroup.add(triangle);
    triangle.body.setVelocityX(-obstacleSpeed);
    triangle.body.setAllowGravity(false);
  }

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

  // ===========================================================================
  // POWER-UPS: ARMA E ESCUDO
  // ===========================================================================

  function onCollectItem(playerRef, item) {
    if (item.itemType === 'gun') activateGun();
    else if (item.itemType === 'shield') activateShield();
    item.destroy();
    updateHUDStatus();
  }

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

  function activateShield() {
    hasShield = true;
    shieldTimeRemaining = 8; // Duração máxima de 8 segundos
    if (shieldCountdownEvent) shieldCountdownEvent.remove();
    if (shieldExpireEvent) shieldExpireEvent.remove();

    if (!shieldGraphic) {
      shieldGraphic = scene.add.circle(player.x, player.y, 28);
      shieldGraphic.setStrokeStyle(3, 0x00e5ff);
    }

    // Contagem regressiva do escudo
    shieldCountdownEvent = scene.time.addEvent({
      delay: 1000,
      callback: () => {
        shieldTimeRemaining = Math.max(0, shieldTimeRemaining - 1);
        updateHUDStatus();
      },
      loop: true
    });

    // Desativa o escudo quando o tempo expira
    shieldExpireEvent = scene.time.delayedCall(8000, () => {
      deactivateShield();
    });

    updateHUDStatus();
  }

  function deactivateShield() {
    hasShield = false;
    shieldTimeRemaining = 0;
    if (shieldGraphic) {
      shieldGraphic.destroy();
      shieldGraphic = null;
    }
    if (shieldCountdownEvent) shieldCountdownEvent.remove();
    if (shieldExpireEvent) shieldExpireEvent.remove();
    updateHUDStatus();
  }

  function updateHUDStatus() {
    const statusParts = [];
    if (hasShield) statusParts.push(`🛡️ ESCUDO (${shieldTimeRemaining}s)`);
    if (hasGun) statusParts.push(`⚡ ARMA (${gunTimeRemaining}s)`);
    hudStatusText.setText(statusParts.join('  |  '));
  }

  // ===========================================================================
  // GAME OVER E SISTEMA DE RECORDE ARCADE
  // ===========================================================================

  function onPlayerHitObstacle(playerRef, obstacle) {
    if (gameState !== 'PLAYING') return;

    if (hasShield) {
      deactivateShield();
      obstacle.destroy();
      return;
    }

    triggerGameOver(playerRef);
  }

  function triggerGameOver(playerRef) {
    gameState = 'GAMEOVER';

    if (spawnTimerEvent) spawnTimerEvent.remove();
    if (difficultyEvent) difficultyEvent.remove();
    if (itemSpawnEvent) itemSpawnEvent.remove();
    if (scoreTimerEvent) scoreTimerEvent.remove();
    if (gunShooterEvent) gunShooterEvent.remove();
    if (gunCountdownEvent) gunCountdownEvent.remove();
    if (gunExpireEvent) gunExpireEvent.remove();
    if (shieldCountdownEvent) shieldCountdownEvent.remove();
    if (shieldExpireEvent) shieldExpireEvent.remove();

    scene.physics.pause();
    playerRef.fillColor = 0xd32f2f;

    // Etapa 1: Solicitar as 3 letras do jogador estilo fliperama
    showArcadeInitialsModal();
  }

  // Modal estilo Arcade para registrar as 3 iniciais maiúsculas
  function showArcadeInitialsModal() {
    const modalElements = [];
    let enteredLetters = '';

    const bgOverlay = scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.85);
    modalElements.push(bgOverlay);

    const card = scene.add.graphics();
    card.fillStyle(0x1a1a24, 0.98);
    card.fillRoundedRect(175, 110, 450, 380, 16);
    card.lineStyle(2, 0xffca28, 0.9);
    card.strokeRoundedRect(175, 110, 450, 380, 16);
    modalElements.push(card);

    const title = scene.add.text(400, 155, 'FIM DE JOGO', {
      fontSize: '32px',
      fontStyle: 'bold',
      color: '#ff4444',
      fontFamily: 'Segoe UI, sans-serif'
    }).setOrigin(0.5);

    const resultText = scene.add.text(400, 205, `Você sobreviveu por: ${survivalTime}s`, {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Segoe UI, sans-serif'
    }).setOrigin(0.5);

    const promptText = scene.add.text(400, 255, 'REGISTRE SEU RECORDE (3 LETRAS):', {
      fontSize: '15px',
      fontStyle: 'bold',
      color: '#ffca28',
      fontFamily: 'Segoe UI, sans-serif'
    }).setOrigin(0.5);

    // Três caixas de letras arcade
    const letterBoxes = [];
    const letterTexts = [];
    for (let i = 0; i < 3; i++) {
      const x = 320 + i * 80;
      const box = scene.add.rectangle(x, 320, 60, 60, 0x242436);
      box.setStrokeStyle(2, 0xffca28);
      const txt = scene.add.text(x, 320, '_', {
        fontSize: '32px',
        fontStyle: 'bold',
        color: '#ffffff',
        fontFamily: 'Segoe UI, sans-serif'
      }).setOrigin(0.5);
      letterBoxes.push(box);
      letterTexts.push(txt);
      modalElements.push(box, txt);
    }

    // Botão Confirmar
    const confirmBtn = scene.add.rectangle(400, 420, 240, 46, 0x4caf50)
      .setInteractive({ useHandCursor: true });
    const confirmBtnText = scene.add.text(400, 420, 'CONFIRMAR', {
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffffff',
      fontFamily: 'Segoe UI, sans-serif'
    }).setOrigin(0.5);

    confirmBtn.on('pointerover', () => confirmBtn.setFillStyle(0x66bb6a));
    confirmBtn.on('pointerout', () => confirmBtn.setFillStyle(0x4caf50));

    modalElements.push(title, resultText, promptText, confirmBtn, confirmBtnText);

    // Atualiza visualização das letras
    const updateLettersDisplay = () => {
      for (let i = 0; i < 3; i++) {
        letterTexts[i].setText(enteredLetters[i] || '_');
      }
    };

    // Submete o nome e vai para a tabela
    const submitInitials = () => {
      const finalName = enteredLetters.padEnd(3, 'A');
      scene.input.keyboard.off('keydown', handleKeyInput);
      modalElements.forEach(el => el.destroy());

      // Salva no LocalStorage
      const { topScores, currentName } = saveHighScore(finalName, survivalTime);
      showScoreboardModal(topScores, currentName, survivalTime);
    };

    confirmBtn.on('pointerdown', submitInitials);

    // Captura digitação do teclado
    const handleKeyInput = (event) => {
      if (event.key === 'Backspace') {
        enteredLetters = enteredLetters.slice(0, -1);
        updateLettersDisplay();
      } else if (event.key === 'Enter') {
        submitInitials();
      } else if (event.key.length === 1 && /[a-zA-Z]/.test(event.key)) {
        if (enteredLetters.length < 3) {
          enteredLetters += event.key.toUpperCase();
          updateLettersDisplay();
        }
      }
    };

    scene.input.keyboard.on('keydown', handleKeyInput);
  }

  // Modal com a Tabela de Recordes estilo Arcade (Top 5)
  function showScoreboardModal(topScores, currentName, finalScore) {
    const scoreboardElements = [];

    const bgOverlay = scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.85);
    scoreboardElements.push(bgOverlay);

    const card = scene.add.graphics();
    card.fillStyle(0x1a1a24, 0.98);
    card.fillRoundedRect(175, 80, 450, 440, 16);
    card.lineStyle(2, 0x00e5ff, 0.9);
    card.strokeRoundedRect(175, 80, 450, 440, 16);
    scoreboardElements.push(card);

    const header = scene.add.text(400, 125, '★ RECORDES ARCADE ★', {
      fontSize: '28px',
      fontStyle: 'bold',
      color: '#00e5ff',
      fontFamily: 'Segoe UI, sans-serif'
    }).setOrigin(0.5);
    scoreboardElements.push(header);

    // Linhas da Tabela Top 5
    let highlightedOne = false;
    topScores.forEach((item, index) => {
      const y = 180 + index * 42;
      const isCurrentRun = !highlightedOne && item.name === currentName && item.score === finalScore;
      if (isCurrentRun) highlightedOne = true;

      const rowColor = isCurrentRun ? '#ffca28' : '#ffffff';
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}º`;

      // Fundo destacado para o recorde atual
      if (isCurrentRun) {
        const rowBg = scene.add.rectangle(400, y, 380, 34, 0x2e2e42);
        rowBg.setStrokeStyle(1, 0xffca28);
        scoreboardElements.push(rowBg);
      }

      const rankText = scene.add.text(230, y, `${medal}`, {
        fontSize: '18px',
        color: rowColor,
        fontFamily: 'Segoe UI, sans-serif'
      }).setOrigin(0, 0.5);

      const nameText = scene.add.text(370, y, item.name, {
        fontSize: '20px',
        fontStyle: 'bold',
        color: rowColor,
        fontFamily: 'Courier New, monospace'
      }).setOrigin(0.5, 0.5);

      const scoreText = scene.add.text(560, y, `${item.score}s`, {
        fontSize: '18px',
        fontStyle: 'bold',
        color: rowColor,
        fontFamily: 'Segoe UI, sans-serif'
      }).setOrigin(1, 0.5);

      scoreboardElements.push(rankText, nameText, scoreText);
    });

    // Botão Jogar Novamente
    const restartBtn = scene.add.rectangle(400, 440, 240, 48, 0x4caf50)
      .setInteractive({ useHandCursor: true });
    const restartBtnText = scene.add.text(400, 440, 'JOGAR NOVAMENTE', {
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffffff',
      fontFamily: 'Segoe UI, sans-serif'
    }).setOrigin(0.5);

    restartBtn.on('pointerover', () => restartBtn.setFillStyle(0x66bb6a));
    restartBtn.on('pointerout', () => restartBtn.setFillStyle(0x4caf50));

    scoreboardElements.push(restartBtn, restartBtnText);

    const restartGame = () => {
      scoreboardElements.forEach(el => el.destroy());
      scene.scene.restart();
    };

    scene.time.delayedCall(200, () => {
      restartBtn.once('pointerdown', restartGame);
      scene.input.keyboard.once('keydown-SPACE', restartGame);
      scene.input.keyboard.once('keydown-ENTER', restartGame);
    });
  }
}

// =============================================================================
// 3. UPDATE
// =============================================================================
function update() {
  if (gameState !== 'PLAYING') return;

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

  // O halo do escudo segue a posição do jogador
  if (shieldGraphic && shieldGraphic.active) {
    shieldGraphic.setPosition(player.x, player.y);
  }

  // Limpeza de memória
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