// =============================================================================
// A JORNADA DO CAVALEIRO: PIXEL ART EDITION (PHASER 3)
// =============================================================================

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,              // Ativa renderização estrita de Pixel Art (sem interpolação borrada)
  backgroundColor: '#1b381e',  // Verde floresta escuro da clareira
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
// VARIÁVEIS DE ESTADO DO JOGO
// =============================================================================
let player;
let cursors, wasdKeys;
let obstaclesGroup, playerProjectilesGroup, enemyProjectilesGroup, itemsGroup, slashGroup;
let sceneryGroup;

// Estado do Jogo: 'START' | 'PLAYING' | 'GAMEOVER'
let gameState = 'START';

// Dificuldade e Spawners
let obstacleSpeed = 220;
let spawnDelay = 1300;
let spawnTimerEvent = null;
let difficultyEvent = null;
let itemSpawnEvent = null;
let scenerySpawnEvent = null;

// Pontuação e Sobrevivência
let survivalTime = 0;
let scoreTimerEvent = null;

// Power-up 1: Escudo Medieval (8 segundos)
let hasShield = false;
let shieldTimeRemaining = 0;
let shieldSprite = null;
let shieldCountdownEvent = null;
let shieldExpireEvent = null;

// Power-up 2: Arco e Flecha (6 segundos)
let hasBow = false;
let bowTimeRemaining = 0;
let bowShooterEvent = null;
let bowCountdownEvent = null;
let bowExpireEvent = null;

// Power-up 3: Espada & Golpe Slash (6 segundos)
let hasSword = false;
let swordTimeRemaining = 0;
let swordAttackEvent = null;
let swordCountdownEvent = null;
let swordExpireEvent = null;

// HUD
let hudScoreText;
let hudHighScoreText;
let hudStatusText;

const STORAGE_KEY = 'knight_quest_highscores';

// =============================================================================
// SISTEMA DE RECORDES (LOCALSTORAGE)
// =============================================================================
function getHighScores() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [
    { name: 'ARTH', score: 40 },
    { name: 'LANC', score: 28 },
    { name: 'GWEN', score: 18 }
  ];
}

function saveHighScore(name, score) {
  const scores = getHighScores();
  const cleanName = (name || 'HER').toUpperCase().slice(0, 3);
  scores.push({ name: cleanName, score: score });
  scores.sort((a, b) => b.score - a.score);
  const topScores = scores.slice(0, 5);
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
// 1. PRELOAD: GERAÇÃO PROCEDURAL DAS TEXTURAS PIXEL ART
// =============================================================================
function preload() {
  const scene = this;
  generatePixelArtTextures(scene);
}

// Cria texturas nativas em Pixel Art sem depender de arquivos de imagem externos
function generatePixelArtTextures(scene) {
  // Paleta de cores em formato retro 16-bit
  const P = {
    '.': null,      // Transparência
    'K': '#111116', // Contorno escuro / metal negro
    'S': '#c4c8d4', // Armadura de aço / prata
    'W': '#ffffff', // Brilho puro / lâmina
    'D': '#6e7484', // Sombra de metal
    'R': '#d32f2f', // Pluma rubra do elmo / sangue
    'B': '#1976d2', // Túnica azul real
    'F': '#ffcc80', // Tom de pele
    'G': '#4caf50', // Pele de Goblin
    'g': '#2e7d32', // Sombra de Goblin
    'Y': '#fbc02d', // Cabelo loiro élfico / Ouro nobre
    'O': '#8d5524', // Madeira de carvalho / couro
    'L': '#5d3a1a', // Madeira escura / tronco
    'E': '#2e7d32', // Túnica élfica verde
    'e': '#1b5e20', // Capa élfica escura
    'V': '#ba68c8', // Magia púrpura / veneno
    'C': '#00e5ff', // Magia ciana / brilho arcano
    'T': '#2d6a33', // Folhagem de árvore
    't': '#1b4320'  // Folhagem escura
  };

  // Função auxiliar para desenhar matrizes de caracteres no Canvas do Phaser
  function makeSprite(key, map, pixelSize = 2) {
    const h = map.length;
    const w = map[0].length;
    const canvasTex = scene.textures.createCanvas(key, w * pixelSize, h * pixelSize);
    const ctx = canvasTex.getContext();

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const color = P[map[y][x]];
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    }
    canvasTex.refresh();
  }

  // 1. Cavaleiro Protagonista (16x16 -> 32x32)
  makeSprite('knight', [
    '.....RRRR.......',
    '....RRRRRR......',
    '.....SSSS.......',
    '....SKKKKS......',
    '....SSSSSS......',
    '.....SSSF.......',
    '....SSSSSS......',
    '...SSSSSSSS.....',
    '...SBBBBBBS.....',
    '...SBBBBBBS.....',
    '...SSSSSSSS.....',
    '....SS..SS......',
    '....OO..OO......',
    '....SS..SS......',
    '....SS..SS......',
    '................'
  ], 2);

  // 2. Inimigo 1: Goblin das Florestas (14x14)
  makeSprite('goblin', [
    '....G....G....',
    '...GGg..gGG...',
    '..GGGGGGGGGG..',
    '..GGYGGGGYGG..',
    '..GGKGGGGKGG..',
    '..GGGGGGGGGG..',
    '...GGWGGWGG...',
    '....GGGGGG....',
    '...LLLLLLLL...',
    '...LLLLLLLL...',
    '....Gg..gG....',
    '....LL..LL....',
    '....LL..LL....',
    '..............'
  ], 2);

  // 3. Inimigo 2: Guerreiro Sombrio (16x16)
  makeSprite('dark_warrior', [
    '..KK......KK..',
    '...KK....KK...',
    '....KK..KK....',
    '...DDDDDDDD...',
    '..DDKKKKKKDD..',
    '..DDDDDDDDDD..',
    '..DDRRRRRRDD..',
    '..DDRRRRRRDD..',
    '..DDKKKKKKDD..',
    '...DDDDDDDD...',
    '....DD..DD....',
    '....DD..DD....',
    '....KK..KK....',
    '....KK..KK....',
    '..............',
    '..............'
  ], 2);

  // 4. Inimigo 3: Elfo Arqueiro (16x16)
  makeSprite('elf_archer', [
    '.....YYYY.....O.',
    '....YYYYYY....O.',
    '.....FFFF.....O.',
    '....FKYFFK....O.',
    '.....FFFF.....O.',
    '....EEEEEE...OO.',
    '...EeEEEEeE..O..',
    '...EEEEEEEE..O..',
    '....EEEEEE..OO..',
    '.....EeEe...O...',
    '.....EeEe...O...',
    '.....LLLL...O...',
    '.....LLLL.......',
    '................',
    '................',
    '................'
  ], 2);

  // 5. Flecha do Cavaleiro (16x6)
  makeSprite('arrow_player', [
    '..BB............',
    'BBBOOOOOOOOOOOWW',
    'BBBOOOOOOOOOOOWW',
    '..BB............',
    '................',
    '................'
  ], 2);

  // 6. Flecha do Elfo Inimigo (16x6)
  makeSprite('arrow_elf', [
    '..ee............',
    'eeeLLLLLLLLLLLVV',
    'eeeLLLLLLLLLLLVV',
    '..ee............',
    '................',
    '................'
  ], 2);

  // 7. Golpe Cortante da Espada (Slash em Arco) (16x20)
  makeSprite('slash_effect', [
    '......WWWW......',
    '....WWCCCCWW....',
    '...WCCCCCCCCW...',
    '..WCCCCCCCCCCW..',
    '.WCCCCCCCCCCCCW.',
    'WCCCCCCCCCCCCCCW',
    'WCCCCCCCCCCCCCCW',
    'WCCCCCCCCCCCCCCW',
    '.WCCCCCCCCCCCCW.',
    '..WCCCCCCCCCCW..',
    '...WWWWWWWWWW...',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................'
  ], 2);

  // 8. Item Coletável: Arco e Flecha (14x14)
  makeSprite('item_bow', [
    '....OOOOOO....',
    '...O......W...',
    '..O........W..',
    '.O..........W.',
    '.O..........W.',
    'O...YYYYYY...W',
    'O...YYYYYY...W',
    '.O..........W.',
    '.O..........W.',
    '..O........W..',
    '...O......W...',
    '....OOOOOO....',
    '..............',
    '..............'
  ], 2);

  // 9. Item Coletável: Escudo Medieval com Brasão (14x14)
  makeSprite('item_shield', [
    '.YYYYYYYYYYYY.',
    'YSSSSSSSSSSSSY',
    'YSBBBBSSBBBBYS',
    'YSBBBBSSBBBBYS',
    'YSSSSSSSSSSSSY',
    'YSSSSSSSSSSSSY',
    'YSBBBBSSBBBBYS',
    'YSBBBBSSBBBBYS',
    '.YSSSSSSSSSSY.',
    '..YSSSSSSSSY..',
    '...YSSSSSSY...',
    '....YSSSSY....',
    '.....YSSY.....',
    '......YY......'
  ], 2);

  // 10. Item Coletável: Espada de Cavaleiro (14x14)
  makeSprite('item_sword', [
    '...........WW.',
    '..........WWS.',
    '.........WWSS.',
    '........WWSS..',
    '.......WWSS...',
    '......WWSS....',
    '..YY.WWSS.....',
    '.YYYYYYSS.....',
    '.YYYYYY.......',
    '..YY.OO.......',
    '.....OO.......',
    '......RR......',
    '..............',
    '..............'
  ], 2);

  // 11. Árvore Medieval da Floresta (20x28)
  makeSprite('scenery_tree', [
    '........TTTT........',
    '......TTTTTTTT......',
    '.....TTTTTTTTTT.....',
    '....TTTtTTTTtTTT....',
    '...TTTTTTTTTTTTTT...',
    '...TTtTTTTTTTTtTT...',
    '..TTTTTTTTTTTTTTTT..',
    '..TTtTTTtTTtTTTtTT..',
    '.TTTTTTTTTTTTTTTTTT.',
    '.TTTTtTTTTTTTTtTTTT.',
    '..TTTTTTTTTTTTTTTT..',
    '...TTTTTTTTTTTTTT...',
    '.....TTtTTTTtTT.....',
    '.......TTTTTT.......',
    '.........LL.........',
    '.........LL.........',
    '.........LL.........',
    '.........LL.........',
    '........LLLL........',
    '.......LLLLLL.......',
    '....................',
    '....................',
    '....................',
    '....................',
    '....................',
    '....................',
    '....................',
    '....................'
  ], 2);

  // 12. Arbusto do Cenário (14x10)
  makeSprite('scenery_bush', [
    '....TTTTTT....',
    '..TTTTtTTTTT..',
    '.TTTTTTTTTTTT.',
    'TTTtTTTTTTtTTT',
    'TTTTTTTTTTTTTT',
    '.TTtTTTTTtTTT.',
    '..TTTTTTTTTT..',
    '....LL..LL....',
    '..............',
    '..............'
  ], 2);
}

// =============================================================================
// 2. CREATE: MONTAGEM DO MUNDO MEDIEVAL
// =============================================================================
function create() {
  const scene = this;

  // --- Limpeza de Eventos Prévios ---
  if (spawnTimerEvent) spawnTimerEvent.remove();
  if (difficultyEvent) difficultyEvent.remove();
  if (itemSpawnEvent) itemSpawnEvent.remove();
  if (scenerySpawnEvent) scenerySpawnEvent.remove();
  if (scoreTimerEvent) scoreTimerEvent.remove();
  if (bowShooterEvent) bowShooterEvent.remove();
  if (bowCountdownEvent) bowCountdownEvent.remove();
  if (bowExpireEvent) bowExpireEvent.remove();
  if (shieldCountdownEvent) shieldCountdownEvent.remove();
  if (shieldExpireEvent) shieldExpireEvent.remove();
  if (swordAttackEvent) swordAttackEvent.remove();
  if (swordCountdownEvent) swordCountdownEvent.remove();
  if (swordExpireEvent) swordExpireEvent.remove();

  // --- Reset de Estado ---
  gameState = 'START';
  survivalTime = 0;
  obstacleSpeed = 220;
  spawnDelay = 1300;
  hasShield = false;
  shieldTimeRemaining = 0;
  shieldSprite = null;
  hasBow = false;
  bowTimeRemaining = 0;
  hasSword = false;
  swordTimeRemaining = 0;

  scene.physics.resume();

  // --- Desenho da Clareira / Gramado ---
  drawForestGround(scene);

  // --- Grupos de Entidades ---
  sceneryGroup = scene.add.group();
  obstaclesGroup = scene.physics.add.group();
  playerProjectilesGroup = scene.physics.add.group();
  enemyProjectilesGroup = scene.physics.add.group();
  itemsGroup = scene.physics.add.group();
  slashGroup = scene.physics.add.group();

  // Cria algumas árvores iniciais de fundo espalhadas
  for (let i = 0; i < 5; i++) {
    const rx = Phaser.Math.Between(50, 750);
    const ry = Phaser.Math.Between(60, 540);
    const tree = scene.add.sprite(rx, ry, 'scenery_tree').setDepth(1);
    tree.speedFactor = 0.5;
    sceneryGroup.add(tree);
  }

  // --- Criação do Cavaleiro ---
  player = scene.physics.add.sprite(200, 300, 'knight');
  player.setDepth(10);
  player.body.setSize(22, 28);
  player.body.setOffset(5, 2);
  player.body.setCollideWorldBounds(true);

  // --- Controles de Teclado ---
  cursors = scene.input.keyboard.createCursorKeys();
  wasdKeys = scene.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });

  // --- Interface Superior (HUD Medieval) ---
  createMedievalHUD();

  // --- Colisões e Interações ---
  // Cavaleiro vs Inimigo corpo a corpo
  scene.physics.add.overlap(player, obstaclesGroup, onPlayerHitObstacle, null, scene);

  // Cavaleiro vs Flecha do Elfo Inimigo
  scene.physics.add.overlap(player, enemyProjectilesGroup, onPlayerHitProjectile, null, scene);

  // Cavaleiro vs Itens Coletáveis
  scene.physics.add.overlap(player, itemsGroup, onCollectItem, null, scene);

  // Flecha do Jogador vs Inimigos
  scene.physics.add.overlap(playerProjectilesGroup, obstaclesGroup, (arrow, enemy) => {
    if (enemy.x > 800) return;
    arrow.destroy();
    enemy.destroy();
  });

  // Flecha do Jogador vs Flechas dos Elfos (colisão aérea de projéteis)
  scene.physics.add.overlap(playerProjectilesGroup, enemyProjectilesGroup, (pArrow, eArrow) => {
    pArrow.destroy();
    eArrow.destroy();
  });

  // Golpe de Espada (Slash) vs Inimigos (corta instantaneamente)
  scene.physics.add.overlap(slashGroup, obstaclesGroup, (slash, enemy) => {
    if (enemy.x > 800) return;
    enemy.destroy();
  });

  // Golpe de Espada (Slash) vs Flechas Inimigas (rebate/destrói o projétil)
  scene.physics.add.overlap(slashGroup, enemyProjectilesGroup, (slash, eArrow) => {
    eArrow.destroy();
  });

  // --- Apresenta Tela de Início Temática ---
  showMedievalStartScreen();

  // ===========================================================================
  // FUNÇÕES DE CENÁRIO E INTERFACE MEDIEVAL
  // ===========================================================================

  function drawForestGround(s) {
    const bg = s.add.graphics();
    bg.fillStyle(0x1a331c, 1);
    bg.fillRect(0, 0, 800, 600);

    // Faixas decorativas de relva pixelada
    bg.fillStyle(0x224424, 1);
    for (let i = 0; i < 20; i++) {
      const rx = Phaser.Math.Between(0, 780);
      const ry = Phaser.Math.Between(50, 590);
      bg.fillRect(rx, ry, Phaser.Math.Between(10, 40), 4);
    }
  }

  function createMedievalHUD() {
    const hudBg = scene.add.graphics().setDepth(50);
    // Moldura estilo pergaminho e ferro forjado
    hudBg.fillStyle(0x12100d, 0.92);
    hudBg.fillRoundedRect(10, 10, 780, 42, 6);
    hudBg.lineStyle(2, 0xc5a059, 0.85); // Dourado envelhecido
    hudBg.strokeRoundedRect(10, 10, 780, 42, 6);

    hudScoreText = scene.add.text(25, 20, '⚔️ GLÓRIA: 0s', {
      fontSize: '17px',
      fontStyle: 'bold',
      color: '#e8dcbe',
      fontFamily: 'Courier New, monospace'
    }).setDepth(51);

    hudHighScoreText = scene.add.text(220, 20, `👑 RECORDE: ${getBestScore()}s`, {
      fontSize: '17px',
      fontStyle: 'bold',
      color: '#ffca28',
      fontFamily: 'Courier New, monospace'
    }).setDepth(51);

    hudStatusText = scene.add.text(770, 20, '', {
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#00e5ff',
      fontFamily: 'Courier New, monospace'
    }).setOrigin(1, 0).setDepth(51);
  }

  function showMedievalStartScreen() {
    const uiElements = [];

    const overlay = scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.78).setDepth(100);
    uiElements.push(overlay);

    const card = scene.add.graphics().setDepth(101);
    card.fillStyle(0x1a1510, 0.97); // Fundo madeira de taverna
    card.fillRoundedRect(160, 60, 480, 480, 14);
    card.lineStyle(3, 0xc5a059, 1);
    card.strokeRoundedRect(160, 60, 480, 480, 14);
    uiElements.push(card);

    const title = scene.add.text(400, 110, 'A JORNADA DO CAVALEIRO', {
      fontSize: '28px',
      fontStyle: 'bold',
      color: '#ffca28',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5).setDepth(102);
    uiElements.push(title);

    const recordInfo = scene.add.text(400, 150, `★ MAIOR HEROÍSMO REGISTRADO: ${getBestScore()}s ★`, {
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#c5a059',
      fontFamily: 'Courier New, monospace'
    }).setOrigin(0.5).setDepth(102);
    uiElements.push(recordInfo);

    const loreText = scene.add.text(400, 255, 
      'INIMIGOS NA FLORESTA:\n' +
      '• Goblins: Rápidos e sorrateiros\n' +
      '• Guerreiros Sombrios: Blindados e pesados\n' +
      '• Elfos Arqueiros: Atiram flechas à distância!\n\n' +
      'ARSENAL MEDIEVAL COLETÁVEL:\n' +
      '• 🏹 Arco e Flecha: Disparos à distância (6s)\n' +
      '• 🛡️ Escudo de Aço: Defende 1 golpe fatal (8s)\n' +
      '• ⚔️ Espada Vorpal: Golpe Slash em arco (6s)', {
      fontSize: '14px',
      color: '#d6c8aa',
      align: 'center',
      fontFamily: 'Courier New, monospace',
      lineSpacing: 4
    }).setOrigin(0.5).setDepth(102);
    uiElements.push(loreText);

    // Botão Iniciar Aventura
    const btnBg = scene.add.rectangle(400, 430, 280, 50, 0x8d5524).setInteractive({ useHandCursor: true }).setDepth(102);
    btnBg.setStrokeStyle(2, 0xc5a059);
    const btnText = scene.add.text(400, 430, 'INICIAR MISSÃO', {
      fontSize: '19px',
      fontStyle: 'bold',
      color: '#ffffff',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5).setDepth(103);
    uiElements.push(btnBg, btnText);

    const hint = scene.add.text(400, 495, 'Pressione ESPAÇO, ENTER ou CLIQUE para cavalgar', {
      fontSize: '12px',
      color: '#a8987b',
      fontFamily: 'Courier New, monospace'
    }).setOrigin(0.5).setDepth(102);
    uiElements.push(hint);

    btnBg.on('pointerover', () => btnBg.setFillStyle(0xb06c2e));
    btnBg.on('pointerout', () => btnBg.setFillStyle(0x8d5524));

    let started = false;
    const triggerStart = () => {
      if (started) return;
      started = true;
      uiElements.forEach(el => el.destroy());
      startKnightGameplay();
    };

    btnBg.once('pointerdown', triggerStart);
    scene.input.once('pointerdown', triggerStart);
    scene.input.keyboard.once('keydown-SPACE', triggerStart);
    scene.input.keyboard.once('keydown-ENTER', triggerStart);
  }

  function startKnightGameplay() {
    gameState = 'PLAYING';

    // Cronômetro de tempo de sobrevivência / glória
    scoreTimerEvent = scene.time.addEvent({
      delay: 1000,
      callback: () => {
        if (gameState !== 'PLAYING') return;
        survivalTime += 1;
        hudScoreText.setText(`⚔️ GLÓRIA: ${survivalTime}s`);
      },
      loop: true
    });

    // Primeiro obstáculo e loop contínuo
    spawnEnemy();
    scheduleNextSpawn();

    // Aceleração da marcha inimiga a cada 3s
    difficultyEvent = scene.time.addEvent({
      delay: 3000,
      callback: () => {
        if (gameState !== 'PLAYING') return;
        obstacleSpeed += 25;
        spawnDelay = Math.max(380, spawnDelay - 70);
      },
      loop: true
    });

    // Primeiro item aos 3s, e depois a cada 5s
    scene.time.delayedCall(3000, () => {
      if (gameState !== 'PLAYING') return;
      spawnLootItem();
      itemSpawnEvent = scene.time.addEvent({
        delay: 5500,
        callback: spawnLootItem,
        loop: true
      });
    });

    // Spawner de vegetação da floresta (rolagem suave)
    scenerySpawnEvent = scene.time.addEvent({
      delay: 1800,
      callback: spawnSceneryDecor,
      loop: true
    });
  }

  // Gera árvores e arbustos que rolam pelo fundo
  function spawnSceneryDecor() {
    if (gameState !== 'PLAYING') return;
    const isTree = Phaser.Math.Between(0, 1) === 0;
    const key = isTree ? 'scenery_tree' : 'scenery_bush';
    const ry = Phaser.Math.Between(50, 550);

    const dec = scene.add.sprite(860, ry, key).setDepth(2);
    dec.speedFactor = isTree ? 0.6 : 0.8;
    sceneryGroup.add(dec);
  }

  // Agenda próximo inimigo
  function scheduleNextSpawn() {
    if (gameState !== 'PLAYING') return;
    spawnTimerEvent = scene.time.delayedCall(spawnDelay, () => {
      spawnEnemy();
      scheduleNextSpawn();
    });
  }

  // Instancia Goblins, Guerreiros Sombrios ou Elfos Arqueiros
  function spawnEnemy() {
    if (gameState !== 'PLAYING') return;
    const randomY = Phaser.Math.Between(70, 540);
    const roll = Phaser.Math.Between(1, 100);

    let enemyType, spriteKey, speedModifier;

    if (roll <= 45) {
      // 45% de chance: Goblin (rápido e ágil)
      enemyType = 'goblin';
      spriteKey = 'goblin';
      speedModifier = 1.15;
    } else if (roll <= 75) {
      // 30% de chance: Guerreiro Sombrio (firme e resistente)
      enemyType = 'dark_warrior';
      spriteKey = 'dark_warrior';
      speedModifier = 0.95;
    } else {
      // 25% de chance: Elfo Arqueiro (dispara flechas à distância)
      enemyType = 'elf';
      spriteKey = 'elf_archer';
      speedModifier = 0.85;
    }

    const enemy = scene.physics.add.sprite(850, randomY, spriteKey);
    enemy.setDepth(10);
    enemy.enemyType = enemyType;
    obstaclesGroup.add(enemy);
    enemy.body.setVelocityX(-obstacleSpeed * speedModifier);
    enemy.body.setAllowGravity(false);

    // Lógica especial do Elfo Arqueiro: atira flechas se estiver em campo
    if (enemyType === 'elf') {
      enemy.shootTimer = scene.time.addEvent({
        delay: 1600,
        callback: () => {
          if (enemy.active && enemy.x > 80 && enemy.x < 780 && gameState === 'PLAYING') {
            shootElfArrow(enemy.x, enemy.y);
          }
        },
        loop: true
      });
    }
  }

  // Disparo da flecha mágica do Elfo Arqueiro
  function shootElfArrow(x, y) {
    const arrow = scene.physics.add.sprite(x - 20, y, 'arrow_elf');
    arrow.setDepth(9);
    arrow.body.setSize(18, 8);
    enemyProjectilesGroup.add(arrow);
    arrow.body.setVelocityX(-380);
    arrow.body.setAllowGravity(false);
  }

  // Gera um dos 3 itens medievais: Arco, Escudo ou Espada
  function spawnLootItem() {
    if (gameState !== 'PLAYING') return;
    const randomY = Phaser.Math.Between(80, 530);
    const types = ['bow', 'shield', 'sword'];
    const chosenType = types[Phaser.Math.Between(0, types.length - 1)];

    let spriteKey = 'item_bow';
    if (chosenType === 'shield') spriteKey = 'item_shield';
    if (chosenType === 'sword') spriteKey = 'item_sword';

    const item = scene.physics.add.sprite(850, randomY, spriteKey);
    item.setDepth(11);
    itemsGroup.add(item);
    item.lootType = chosenType;
    item.body.setVelocityX(-150);
    item.body.setAllowGravity(false);
  }

  // ===========================================================================
  // SISTEMA DE COMBATE & POWER-UPS
  // ===========================================================================

  function onCollectItem(playerRef, item) {
    if (item.lootType === 'bow') activateBow();
    else if (item.lootType === 'shield') activateShield();
    else if (item.lootType === 'sword') activateSword();

    item.destroy();
    updateHUDStatus();
  }

  // Power-up 1: Arco e Flecha (Disparos automáticos por 6s)
  function activateBow() {
    hasBow = true;
    bowTimeRemaining = 6;
    if (bowShooterEvent) bowShooterEvent.remove();
    if (bowExpireEvent) bowExpireEvent.remove();
    if (bowCountdownEvent) bowCountdownEvent.remove();

    bowShooterEvent = scene.time.addEvent({
      delay: 320,
      callback: () => {
        if (gameState !== 'PLAYING' || !hasBow) return;
        const arrow = scene.physics.add.sprite(player.x + 28, player.y, 'arrow_player');
        arrow.setDepth(9);
        arrow.body.setSize(20, 8);
        playerProjectilesGroup.add(arrow);
        arrow.body.setVelocityX(640);
      },
      loop: true
    });

    bowCountdownEvent = scene.time.addEvent({
      delay: 1000,
      callback: () => {
        bowTimeRemaining = Math.max(0, bowTimeRemaining - 1);
        updateHUDStatus();
      },
      loop: true
    });

    bowExpireEvent = scene.time.delayedCall(6000, () => {
      hasBow = false;
      if (bowShooterEvent) bowShooterEvent.remove();
      if (bowCountdownEvent) bowCountdownEvent.remove();
      updateHUDStatus();
    });
  }

  // Power-up 2: Escudo Medieval (Defende 1 impacto por até 8s)
  function activateShield() {
    hasShield = true;
    shieldTimeRemaining = 8;
    if (shieldCountdownEvent) shieldCountdownEvent.remove();
    if (shieldExpireEvent) shieldExpireEvent.remove();

    if (!shieldSprite) {
      shieldSprite = scene.add.sprite(player.x + 16, player.y, 'item_shield').setDepth(12);
    }

    shieldCountdownEvent = scene.time.addEvent({
      delay: 1000,
      callback: () => {
        shieldTimeRemaining = Math.max(0, shieldTimeRemaining - 1);
        updateHUDStatus();
      },
      loop: true
    });

    shieldExpireEvent = scene.time.delayedCall(8000, () => {
      deactivateShield();
    });

    updateHUDStatus();
  }

  function deactivateShield() {
    hasShield = false;
    shieldTimeRemaining = 0;
    if (shieldSprite) {
      shieldSprite.destroy();
      shieldSprite = null;
    }
    if (shieldCountdownEvent) shieldCountdownEvent.remove();
    if (shieldExpireEvent) shieldExpireEvent.remove();
    updateHUDStatus();
  }

  // Power-up 3: Espada Vorpal (Golpes Slash em arco à queima-roupa por 6s)
  function activateSword() {
    hasSword = true;
    swordTimeRemaining = 6;
    if (swordAttackEvent) swordAttackEvent.remove();
    if (swordCountdownEvent) swordCountdownEvent.remove();
    if (swordExpireEvent) swordExpireEvent.remove();

    // Desfere um golpe de espada contínuo em arco na frente do cavaleiro a cada 240ms
    swordAttackEvent = scene.time.addEvent({
      delay: 240,
      callback: () => {
        if (gameState !== 'PLAYING' || !hasSword) return;
        executeSwordSlash();
      },
      loop: true
    });

    swordCountdownEvent = scene.time.addEvent({
      delay: 1000,
      callback: () => {
        swordTimeRemaining = Math.max(0, swordTimeRemaining - 1);
        updateHUDStatus();
      },
      loop: true
    });

    swordExpireEvent = scene.time.delayedCall(6000, () => {
      hasSword = false;
      if (swordAttackEvent) swordAttackEvent.remove();
      if (swordCountdownEvent) swordCountdownEvent.remove();
      updateHUDStatus();
    });
  }

  function executeSwordSlash() {
    const slash = scene.physics.add.sprite(player.x + 34, player.y, 'slash_effect');
    slash.setDepth(15);
    slashGroup.add(slash);
    slash.body.setAllowGravity(false);

    // O golpe dura 140ms e some
    scene.time.delayedCall(140, () => {
      if (slash.active) slash.destroy();
    });
  }

  function updateHUDStatus() {
    const statusParts = [];
    if (hasShield) statusParts.push(`🛡️ ESCUDO (${shieldTimeRemaining}s)`);
    if (hasBow) statusParts.push(`🏹 ARCO (${bowTimeRemaining}s)`);
    if (hasSword) statusParts.push(`⚔️ ESPADA (${swordTimeRemaining}s)`);
    hudStatusText.setText(statusParts.join('  |  '));
  }

  // ===========================================================================
  // DANO, MORTE E LIVRO DOS RECORDES MEDIEVAIS
  // ===========================================================================

  function onPlayerHitObstacle(playerRef, enemy) {
    if (gameState !== 'PLAYING') return;

    if (hasShield) {
      deactivateShield();
      if (enemy.shootTimer) enemy.shootTimer.remove();
      enemy.destroy();
      return;
    }

    triggerGameOver(playerRef);
  }

  function onPlayerHitProjectile(playerRef, projectile) {
    if (gameState !== 'PLAYING') return;

    if (hasShield) {
      deactivateShield();
      projectile.destroy();
      return;
    }

    triggerGameOver(playerRef);
  }

  function triggerGameOver(playerRef) {
    gameState = 'GAMEOVER';

    // Interrompe todos os temporizadores
    if (spawnTimerEvent) spawnTimerEvent.remove();
    if (difficultyEvent) difficultyEvent.remove();
    if (itemSpawnEvent) itemSpawnEvent.remove();
    if (scenerySpawnEvent) scenerySpawnEvent.remove();
    if (scoreTimerEvent) scoreTimerEvent.remove();
    if (bowShooterEvent) bowShooterEvent.remove();
    if (bowCountdownEvent) bowCountdownEvent.remove();
    if (bowExpireEvent) bowExpireEvent.remove();
    if (shieldCountdownEvent) shieldCountdownEvent.remove();
    if (shieldExpireEvent) shieldExpireEvent.remove();
    if (swordAttackEvent) swordAttackEvent.remove();
    if (swordCountdownEvent) swordCountdownEvent.remove();
    if (swordExpireEvent) swordExpireEvent.remove();

    scene.physics.pause();
    playerRef.setTint(0xff5555); // Feedback de dano fatal

    showArcadeInitialsModal();
  }

  // Modal com estética medieval para gravar as 3 iniciais
  function showArcadeInitialsModal() {
    const modalElements = [];
    let enteredLetters = '';

    const bgOverlay = scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.85).setDepth(200);
    modalElements.push(bgOverlay);

    const card = scene.add.graphics().setDepth(201);
    card.fillStyle(0x1a1510, 0.98);
    card.fillRoundedRect(160, 100, 480, 400, 14);
    card.lineStyle(3, 0xc5a059, 1);
    card.strokeRoundedRect(160, 100, 480, 400, 14);
    modalElements.push(card);

    const title = scene.add.text(400, 150, 'O CAVALEIRO TOMBOU', {
      fontSize: '28px',
      fontStyle: 'bold',
      color: '#ff4444',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5).setDepth(202);

    const resultText = scene.add.text(400, 195, `Tempo de Glória em Combate: ${survivalTime}s`, {
      fontSize: '18px',
      color: '#e8dcbe',
      fontFamily: 'Courier New, monospace'
    }).setOrigin(0.5).setDepth(202);

    const promptText = scene.add.text(400, 245, 'GRAVE SUAS INICIAIS NO LIVRO DOS HERÓIS:', {
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#ffca28',
      fontFamily: 'Courier New, monospace'
    }).setOrigin(0.5).setDepth(202);

    // Três brasões / caixas de iniciais
    const letterTexts = [];
    for (let i = 0; i < 3; i++) {
      const x = 320 + i * 80;
      const box = scene.add.rectangle(x, 310, 60, 60, 0x2a221b).setDepth(202);
      box.setStrokeStyle(2, 0xc5a059);
      const txt = scene.add.text(x, 310, '_', {
        fontSize: '32px',
        fontStyle: 'bold',
        color: '#ffca28',
        fontFamily: 'Courier New, monospace'
      }).setOrigin(0.5).setDepth(203);
      letterTexts.push(txt);
      modalElements.push(box, txt);
    }

    const confirmBtn = scene.add.rectangle(400, 410, 260, 46, 0x8d5524)
      .setInteractive({ useHandCursor: true }).setDepth(202);
    confirmBtn.setStrokeStyle(2, 0xc5a059);
    const confirmBtnText = scene.add.text(400, 410, 'CONFIRMAR HONRA', {
      fontSize: '17px',
      fontStyle: 'bold',
      color: '#ffffff',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5).setDepth(203);

    confirmBtn.on('pointerover', () => confirmBtn.setFillStyle(0xb06c2e));
    confirmBtn.on('pointerout', () => confirmBtn.setFillStyle(0x8d5524));

    modalElements.push(title, resultText, promptText, confirmBtn, confirmBtnText);

    const updateDisplay = () => {
      for (let i = 0; i < 3; i++) {
        letterTexts[i].setText(enteredLetters[i] || '_');
      }
    };

    const submitInitials = () => {
      const finalName = enteredLetters.padEnd(3, 'A');
      scene.input.keyboard.off('keydown', handleKeyInput);
      modalElements.forEach(el => el.destroy());

      const { topScores, currentName } = saveHighScore(finalName, survivalTime);
      showScoreboardModal(topScores, currentName, survivalTime);
    };

    confirmBtn.on('pointerdown', submitInitials);

    const handleKeyInput = (event) => {
      if (event.key === 'Backspace') {
        enteredLetters = enteredLetters.slice(0, -1);
        updateDisplay();
      } else if (event.key === 'Enter') {
        submitInitials();
      } else if (event.key.length === 1 && /[a-zA-Z]/.test(event.key)) {
        if (enteredLetters.length < 3) {
          enteredLetters += event.key.toUpperCase();
          updateDisplay();
        }
      }
    };

    scene.input.keyboard.on('keydown', handleKeyInput);
  }

  // Tabela dos Maiores Heróis do Reino
  function showScoreboardModal(topScores, currentName, finalScore) {
    const scoreboardElements = [];

    const bgOverlay = scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.85).setDepth(200);
    scoreboardElements.push(bgOverlay);

    const card = scene.add.graphics().setDepth(201);
    card.fillStyle(0x1a1510, 0.98);
    card.fillRoundedRect(160, 70, 480, 460, 14);
    card.lineStyle(3, 0xc5a059, 1);
    card.strokeRoundedRect(160, 70, 480, 460, 14);
    scoreboardElements.push(card);

    const header = scene.add.text(400, 115, '⚔️ CAMPEÕES DO REINO ⚔️', {
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#ffca28',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5).setDepth(202);
    scoreboardElements.push(header);

    let highlightedOne = false;
    topScores.forEach((item, index) => {
      const y = 175 + index * 44;
      const isCurrentRun = !highlightedOne && item.name === currentName && item.score === finalScore;
      if (isCurrentRun) highlightedOne = true;

      const rowColor = isCurrentRun ? '#ffca28' : '#e8dcbe';
      const medal = index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}º`;

      if (isCurrentRun) {
        const rowBg = scene.add.rectangle(400, y, 400, 34, 0x3d3023).setDepth(202);
        rowBg.setStrokeStyle(1, 0xffca28);
        scoreboardElements.push(rowBg);
      }

      const rankText = scene.add.text(220, y, medal, {
        fontSize: '18px',
        color: rowColor,
        fontFamily: 'Courier New, monospace'
      }).setOrigin(0, 0.5).setDepth(203);

      const nameText = scene.add.text(370, y, item.name, {
        fontSize: '20px',
        fontStyle: 'bold',
        color: rowColor,
        fontFamily: 'Courier New, monospace'
      }).setOrigin(0.5, 0.5).setDepth(203);

      const scoreText = scene.add.text(570, y, `${item.score}s`, {
        fontSize: '18px',
        fontStyle: 'bold',
        color: rowColor,
        fontFamily: 'Courier New, monospace'
      }).setOrigin(1, 0.5).setDepth(203);

      scoreboardElements.push(rankText, nameText, scoreText);
    });

    const restartBtn = scene.add.rectangle(400, 450, 260, 48, 0x8d5524)
      .setInteractive({ useHandCursor: true }).setDepth(202);
    restartBtn.setStrokeStyle(2, 0xc5a059);
    const restartBtnText = scene.add.text(400, 450, 'NOVA JORNADA', {
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffffff',
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5).setDepth(203);

    restartBtn.on('pointerover', () => restartBtn.setFillStyle(0xb06c2e));
    restartBtn.on('pointerout', () => restartBtn.setFillStyle(0x8d5524));

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
// 3. UPDATE: CICLO DE ANIMAÇÃO E MOVIMENTO
// =============================================================================
function update() {
  if (gameState !== 'PLAYING') return;

  // --- Movimentação do Cavaleiro com Normalização Diagonal ---
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

  // Espelhamento horizontal do sprite dependendo da direção
  if (dirX < 0) player.setFlipX(true);
  else if (dirX > 0) player.setFlipX(false);

  // O Escudo segue o cavaleiro
  if (shieldSprite && shieldSprite.active) {
    const offsetX = player.flipX ? -16 : 16;
    shieldSprite.setPosition(player.x + offsetX, player.y);
  }

  // --- Movimento Parallax dos Elementos do Cenário (Árvores e Arbustos) ---
  sceneryGroup.getChildren().forEach((sc) => {
    sc.x -= (obstacleSpeed * 0.35 * (sc.speedFactor || 0.5)) * 0.016;
    if (sc.x < -80) sc.destroy();
  });

  // --- Limpeza de Memória (Garbage Collection) ---
  // Inimigos fora pela esquerda
  obstaclesGroup.getChildren().forEach((enemy) => {
    if (enemy.x < -50) {
      if (enemy.shootTimer) enemy.shootTimer.remove();
      enemy.destroy();
    }
  });

  // Itens fora pela esquerda
  itemsGroup.getChildren().forEach((item) => {
    if (item.x < -50) item.destroy();
  });

  // Flechas do jogador fora pela direita
  playerProjectilesGroup.getChildren().forEach((arrow) => {
    if (arrow.x >= 800) arrow.destroy();
  });

  // Flechas dos elfos fora pela esquerda
  enemyProjectilesGroup.getChildren().forEach((arrow) => {
    if (arrow.x < -40) arrow.destroy();
  });
}