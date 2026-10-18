// =============================================================================
// A JORNADA DO CAVALEIRO: PIXEL ART EDITION (PHASER 3)
// =============================================================================

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  backgroundColor: '#162b18',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: { preload, create, update }
};

const game = new Phaser.Game(config);

// --- ESTADO PRINCIPAL ---
let player;
let cursors, wasdKeys;
let obstaclesGroup, playerProjectilesGroup, enemyProjectilesGroup, itemsGroup, slashGroup, sceneryGroup;
let groundTile;
let shieldSprite;

let gameState = 'START'; // 'START' | 'PLAYING' | 'GAMEOVER'
let survivalTime = 0;
let obstacleSpeed = 220;
let spawnDelay = 1300;

// Gerenciador Unificado de Buffs
let activeBuff = {
  type: null,        // 'bow' | 'shield' | 'sword' | null
  timeLeft: 0,
  nextAttackTime: 0
};

let hudScoreText, hudHighScoreText, hudStatusText;
const STORAGE_KEY = 'knight_quest_highscores';

// =============================================================================
// RECORDES LOCAIS
// =============================================================================
function getHighScores() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [{ name: 'ARTH', score: 40 }, { name: 'LANC', score: 28 }, { name: 'GWEN', score: 18 }];
}

function saveHighScore(name, score) {
  const scores = getHighScores();
  const cleanName = (name || 'HER').toUpperCase().slice(0, 3);
  scores.push({ name: cleanName, score });
  scores.sort((a, b) => b.score - a.score);
  const topScores = scores.slice(0, 5);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(topScores)); } catch (e) {}
  return { topScores, currentName: cleanName };
}

function getBestScore() {
  const scores = getHighScores();
  return scores.length > 0 ? scores[0].score : 0;
}

// =============================================================================
// 1. PRELOAD: CRIAÇÃO PROCEDURAL DE TEXTURAS PIXEL ART
// =============================================================================
function preload() {
  if (this.textures.exists('knight')) return;
  const g = this.make.graphics({ x: 0, y: 0, add: false });

  // 1. Chão Texturizado Repetível (64x64 TileSprite)
  g.clear();
  g.fillStyle(0x1a331c).fillRect(0, 0, 64, 64);
  g.fillStyle(0x244727); // Relva em tons variados
  g.fillRect(8, 10, 8, 3).fillRect(10, 8, 3, 7);
  g.fillRect(40, 36, 8, 3).fillRect(42, 34, 3, 7);
  g.fillRect(48, 14, 6, 2).fillRect(18, 48, 6, 2);
  g.fillStyle(0x142916); // Pontos de terra batida
  g.fillRect(24, 26, 4, 3).fillRect(54, 52, 4, 3);
  g.generateTexture('ground_tile', 64, 64);

  // 2. Cavaleiro (32x32)
  g.clear();
  g.fillStyle(0xd32f2f).fillRect(10, 2, 8, 6);                        // Pluma vermelha
  g.fillStyle(0xc4c8d4).fillRect(8, 8, 14, 10).fillRect(6, 18, 18, 10); // Armadura prateada
  g.fillStyle(0x111116).fillRect(14, 10, 8, 4);                       // Viseira
  g.fillStyle(0x1976d2).fillRect(10, 20, 10, 8);                      // Túnica azul
  g.fillStyle(0x5d3a1a).fillRect(8, 28, 5, 4).fillRect(17, 28, 5, 4); // Botas
  g.generateTexture('knight', 32, 32);

  // 3. Goblin das Florestas (28x28)
  g.clear();
  g.fillStyle(0x4caf50).fillRect(4, 4, 4, 6).fillRect(20, 4, 4, 6).fillRect(8, 6, 12, 10);
  g.fillStyle(0xfbc02d).fillRect(10, 9, 3, 3).fillRect(16, 9, 3, 3); // Olhos amarelos
  g.fillStyle(0x111116).fillRect(12, 9, 2, 3).fillRect(18, 9, 2, 3);
  g.fillStyle(0x4caf50).fillRect(10, 16, 8, 8);
  g.fillStyle(0x8d5524).fillRect(8, 20, 12, 5);                       // Trapos
  g.generateTexture('goblin', 28, 28);

  // 4. Guerreiro Sombrio Imponente (34x34)
  g.clear();
  g.fillStyle(0x111116); // Chifres curvos pontiagudos
  g.fillRect(2, 2, 4, 10).fillRect(6, 6, 4, 4).fillRect(28, 2, 4, 10).fillRect(24, 6, 4, 4);
  g.fillStyle(0x2a2b33).fillRect(8, 8, 18, 12);                       // Elmo de ferro negro
  g.fillStyle(0xd32f2f).fillRect(12, 12, 4, 3).fillRect(18, 12, 4, 3); // Olhos vermelhos ferozes
  g.fillStyle(0xb71c1c).fillRect(4, 16, 4, 14);                       // Capa rubra rasgada
  g.fillStyle(0x3a3c46).fillRect(8, 18, 18, 10);                      // Peitoral com ombreiras
  g.fillStyle(0xd32f2f).fillRect(14, 20, 6, 6);                       // Brasão de caveira/sangue
  g.fillStyle(0x111116).fillRect(8, 28, 6, 6).fillRect(20, 28, 6, 6); // Botas pesadas
  g.fillStyle(0xc4c8d4).fillRect(26, 14, 4, 18).fillRect(24, 18, 8, 3); // Espada negra empunhada
  g.generateTexture('dark_warrior', 34, 34);

  // 5. Elfo Arqueiro (28x32)
  g.clear();
  g.fillStyle(0xfbc02d).fillRect(8, 4, 12, 8);                        // Cabelo dourado
  g.fillStyle(0xffcc80).fillRect(10, 8, 8, 6);                        // Rosto
  g.fillStyle(0x2e7d32).fillRect(8, 14, 12, 14);                      // Manto verde
  g.fillStyle(0x8d5524).fillRect(22, 6, 3, 20);                       // Arco de madeira
  g.generateTexture('elf_archer', 28, 32);

  // 6. Flecha do Jogador (22x6)
  g.clear();
  g.fillStyle(0x1976d2).fillRect(0, 1, 4, 4);                         // Penas azuis
  g.fillStyle(0x8d5524).fillRect(4, 2, 12, 2);                        // Haste
  g.fillStyle(0xc4c8d4).fillRect(16, 0, 6, 6).fillRect(18, 1, 4, 4);  // Ponta de ferro triangular
  g.generateTexture('arrow_player', 22, 6);

  // 7. Flecha do Elfo (22x6)
  g.clear();
  g.fillStyle(0x1b5e20).fillRect(0, 1, 4, 4);                         // Penas verdes
  g.fillStyle(0x422915).fillRect(4, 2, 12, 2);                        // Madeira escura
  g.fillStyle(0xba68c8).fillRect(16, 0, 6, 6).fillRect(18, 1, 4, 4);  // Ponta envenenada
  g.generateTexture('arrow_elf', 22, 6);

  // 8. Golpe Cortante da Espada (Slash em Meia-Lua Curvada) (32x40)
  g.clear();
  g.fillStyle(0x00e5ff, 0.45); // Brilho de energia externa
  g.fillCircle(16, 20, 16);
  g.fillStyle(0xffffff, 1);    // Lâmina cortante em meia-lua
  g.beginPath();
  g.arc(14, 20, 14, -Phaser.Math.PI2 / 4, Phaser.Math.PI2 / 4, false);
  g.lineTo(10, 20);
  g.closePath();
  g.fillPath();
  g.generateTexture('slash_effect', 32, 40);

  // 9. Itens Coletáveis
  g.clear().fillStyle(0x8d5524).fillRect(4, 2, 4, 18).fillRect(8, 2, 8, 3).fillRect(8, 17, 8, 3).fillStyle(0xffffff).fillRect(16, 4, 2, 14);
  g.generateTexture('item_bow', 22, 22);

  g.clear().fillStyle(0xc5a059).fillRect(2, 2, 18, 18).fillStyle(0x1976d2).fillRect(4, 4, 14, 14).fillStyle(0xffffff).fillRect(10, 4, 2, 14).fillRect(4, 10, 14, 2);
  g.generateTexture('item_shield', 22, 22);

  g.clear().fillStyle(0xc4c8d4).fillRect(10, 2, 4, 12).fillStyle(0xc5a059).fillRect(6, 14, 12, 3).fillStyle(0x5d3a1a).fillRect(10, 17, 4, 4);
  g.generateTexture('item_sword', 22, 22);

  // 10. Vegetação
  g.clear().fillStyle(0x2d6a33).fillRect(4, 4, 28, 28).fillRect(8, 0, 20, 32).fillStyle(0x5d3a1a).fillRect(14, 32, 8, 18);
  g.generateTexture('scenery_tree', 36, 50);

  g.clear().fillStyle(0x2d6a33).fillRect(2, 2, 20, 12).fillRect(6, 0, 12, 16);
  g.generateTexture('scenery_bush', 24, 16);

  g.destroy();
}

// =============================================================================
// 2. CREATE: MONTAGEM DO CENÁRIO E ELEMENTOS
// =============================================================================
function create() {
  const scene = this;
  scene.time.removeAllEvents();

  // Reset de Variáveis
  gameState = 'START';
  survivalTime = 0;
  obstacleSpeed = 220;
  spawnDelay = 1300;
  activeBuff = { type: null, timeLeft: 0, nextAttackTime: 0 };
  scene.physics.resume();

  // Chão com rolagem contínua (TileSprite que dá a sensação real de corrida)
  groundTile = scene.add.tileSprite(400, 300, 800, 600, 'ground_tile').setDepth(0);

  // Grupos Físicos
  sceneryGroup = scene.add.group();
  obstaclesGroup = scene.physics.add.group();
  playerProjectilesGroup = scene.physics.add.group();
  enemyProjectilesGroup = scene.physics.add.group();
  itemsGroup = scene.physics.add.group();
  slashGroup = scene.physics.add.group();

  // Árvores de fundo
  for (let i = 0; i < 6; i++) {
    const tree = scene.add.sprite(Phaser.Math.Between(50, 750), Phaser.Math.Between(60, 540), 'scenery_tree').setDepth(1);
    tree.speedFactor = 0.55;
    sceneryGroup.add(tree);
  }

  // Cavaleiro
  player = scene.physics.add.sprite(200, 300, 'knight').setDepth(10);
  player.body.setSize(22, 28).setOffset(5, 2).setCollideWorldBounds(true);

  // Escudo visual
  shieldSprite = scene.add.sprite(player.x + 16, player.y, 'item_shield').setDepth(12).setVisible(false);

  // Controles
  cursors = scene.input.keyboard.createCursorKeys();
  wasdKeys = scene.input.keyboard.addKeys('W,S,A,D');

  // HUD
  createHUD(scene);

  // Colisões do Jogador
  scene.physics.add.overlap(player, obstaclesGroup, (_, enemy) => handlePlayerHit(scene, enemy));
  scene.physics.add.overlap(player, enemyProjectilesGroup, (_, arrow) => handlePlayerHit(scene, arrow));
  scene.physics.add.overlap(player, itemsGroup, (_, item) => collectItem(item));

  // Combate de Projéteis e Espada
  scene.physics.add.overlap(playerProjectilesGroup, obstaclesGroup, (arrow, enemy) => destroyCombatOverlap(arrow, enemy));
  scene.physics.add.overlap(playerProjectilesGroup, enemyProjectilesGroup, (pA, eA) => { pA.destroy(); eA.destroy(); });
  scene.physics.add.overlap(slashGroup, obstaclesGroup, (_, enemy) => {
    if (enemy.x <= 800) {
      if (enemy.shootTimer) enemy.shootTimer.remove();
      enemy.destroy();
    }
  });
  scene.physics.add.overlap(slashGroup, enemyProjectilesGroup, (_, arrow) => arrow.destroy());

  // Tela Inicial
  showStartScreen(scene);
}

// =============================================================================
// INTERFACES (HUD E MODAIS)
// =============================================================================

function createHUD(scene) {
  const hudBg = scene.add.graphics().setDepth(50);
  hudBg.fillStyle(0x12100d, 0.92).fillRoundedRect(10, 10, 780, 42, 6);
  hudBg.lineStyle(2, 0xc5a059, 0.85).strokeRoundedRect(10, 10, 780, 42, 6);

  hudScoreText = scene.add.text(25, 20, '⚔️ GLÓRIA: 0s', { fontSize: '17px', fontStyle: 'bold', color: '#e8dcbe', fontFamily: 'Courier New, monospace' }).setDepth(51);
  hudHighScoreText = scene.add.text(220, 20, `👑 RECORDE: ${getBestScore()}s`, { fontSize: '17px', fontStyle: 'bold', color: '#ffca28', fontFamily: 'Courier New, monospace' }).setDepth(51);
  hudStatusText = scene.add.text(770, 20, '', { fontSize: '16px', fontStyle: 'bold', color: '#00e5ff', fontFamily: 'Courier New, monospace' }).setOrigin(1, 0).setDepth(51);
}

function updateHUDStatus() {
  if (!activeBuff.type || activeBuff.timeLeft <= 0) {
    hudStatusText.setText('');
    return;
  }
  const icons = { bow: '🏹 ARCO', shield: '🛡️ ESCUDO', sword: '⚔️ ESPADA' };
  hudStatusText.setText(`${icons[activeBuff.type]} (${Math.ceil(activeBuff.timeLeft)}s)`);
}

function createModal(scene, title, height = 450) {
  const container = scene.add.container(0, 0).setDepth(100);
  const overlay = scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.82);
  const card = scene.add.graphics();
  const y = (600 - height) / 2;

  card.fillStyle(0x1a1510, 0.98).fillRoundedRect(160, y, 480, height, 14);
  card.lineStyle(3, 0xc5a059, 1).strokeRoundedRect(160, y, 480, height, 14);

  const titleText = scene.add.text(400, y + 40, title, { fontSize: '26px', fontStyle: 'bold', color: '#ffca28', fontFamily: 'Georgia, serif' }).setOrigin(0.5);
  container.add([overlay, card, titleText]);
  return container;
}

function createButton(scene, x, y, label, onClick) {
  const btn = scene.add.rectangle(x, y, 260, 46, 0x8d5524).setInteractive({ useHandCursor: true });
  btn.setStrokeStyle(2, 0xc5a059);
  const txt = scene.add.text(x, y, label, { fontSize: '17px', fontStyle: 'bold', color: '#ffffff', fontFamily: 'Georgia, serif' }).setOrigin(0.5);

  btn.on('pointerover', () => btn.setFillStyle(0xb06c2e));
  btn.on('pointerout', () => btn.setFillStyle(0x8d5524));
  btn.once('pointerdown', onClick);
  return [btn, txt];
}

function showStartScreen(scene) {
  const modal = createModal(scene, 'A JORNADA DO CAVALEIRO', 480);
  const info = scene.add.text(400, 240,
    `★ RECORDE ATUAL: ${getBestScore()}s ★\n\n` +
    'INIMIGOS: Goblins, Guerreiros Sombrios e Elfos Arqueiros\n' +
    'ARSENAL: 🏹 Arco | 🛡️ Escudo de Aço | ⚔️ Espada Vorpal\n\n' +
    'Controles: WASD ou Setas do Teclado',
    { fontSize: '14px', color: '#d6c8aa', align: 'center', fontFamily: 'Courier New, monospace', lineSpacing: 5 }
  ).setOrigin(0.5);

  const startFn = () => {
    modal.destroy();
    startGameplay(scene);
  };

  const btn = createButton(scene, 400, 390, 'INICIAR MISSÃO', startFn);
  const hint = scene.add.text(400, 445, 'Pressione ESPAÇO, ENTER ou CLIQUE', { fontSize: '12px', color: '#a8987b', fontFamily: 'Courier New, monospace' }).setOrigin(0.5);

  modal.add([info, btn[0], btn[1], hint]);
  scene.input.once('pointerdown', startFn);
  scene.input.keyboard.once('keydown-SPACE', startFn);
  scene.input.keyboard.once('keydown-ENTER', startFn);
}

function startGameplay(scene) {
  gameState = 'PLAYING';

  scene.time.addEvent({
    delay: 1000,
    callback: () => {
      if (gameState !== 'PLAYING') return;
      survivalTime++;
      hudScoreText.setText(`⚔️ GLÓRIA: ${survivalTime}s`);
    },
    loop: true
  });

  const scheduleSpawn = () => {
    if (gameState !== 'PLAYING') return;
    spawnEnemy(scene);
    scene.time.delayedCall(spawnDelay, scheduleSpawn);
  };
  scheduleSpawn();

  scene.time.addEvent({
    delay: 3000,
    callback: () => {
      if (gameState !== 'PLAYING') return;
      obstacleSpeed += 25;
      spawnDelay = Math.max(380, spawnDelay - 70);
    },
    loop: true
  });

  scene.time.addEvent({ delay: 5000, callback: () => spawnLootItem(scene), loop: true });
  scene.time.addEvent({ delay: 1800, callback: () => spawnScenery(scene), loop: true });
}

// =============================================================================
// GERAÇÃO DE INIMIGOS E ITENS
// =============================================================================

function spawnEnemy(scene) {
  const y = Phaser.Math.Between(70, 540);
  const roll = Phaser.Math.Between(1, 100);

  let key = 'goblin', speedMod = 1.15, type = 'goblin';
  if (roll > 75) { key = 'elf_archer'; speedMod = 0.85; type = 'elf'; }
  else if (roll > 45) { key = 'dark_warrior'; speedMod = 0.95; type = 'warrior'; }

  const enemy = obstaclesGroup.create(850, y, key).setDepth(10);
  enemy.enemyType = type;
  enemy.body.setAllowGravity(false);
  enemy.setVelocityX(-obstacleSpeed * speedMod);

  if (type === 'elf') {
    enemy.shootTimer = scene.time.addEvent({
      delay: 1600,
      callback: () => {
        if (enemy.active && enemy.x > 80 && enemy.x < 780 && gameState === 'PLAYING') {
          shootElfArrow(scene, enemy.x, enemy.y);
        }
      },
      loop: true
    });
  }
}

function shootElfArrow(scene, x, y) {
  // Cria diretamente no grupo físico com velocidade imediata garantida
  const arrow = enemyProjectilesGroup.create(x - 20, y, 'arrow_elf').setDepth(9);
  arrow.body.setSize(18, 8);
  arrow.body.setAllowGravity(false);
  arrow.setVelocityX(-420);
}

function shootPlayerArrow(scene) {
  // Cria diretamente no grupo físico com velocidade imediata garantida
  const arrow = playerProjectilesGroup.create(player.x + 28, player.y, 'arrow_player').setDepth(9);
  arrow.body.setSize(20, 8);
  arrow.body.setAllowGravity(false);
  arrow.setVelocityX(750);
}

function executeSwordSlash(scene) {
  const slash = slashGroup.create(player.x + 32, player.y, 'slash_effect').setDepth(15);
  slash.body.setAllowGravity(false);
  slash.setScale(0.85);

  scene.tweens.add({
    targets: slash,
    scaleX: 1.25,
    scaleY: 1.25,
    alpha: { from: 1, to: 0 },
    duration: 150,
    onComplete: () => { if (slash.active) slash.destroy(); }
  });
}

function spawnLootItem(scene) {
  if (gameState !== 'PLAYING') return;
  const types = ['bow', 'shield', 'sword'];
  const type = types[Phaser.Math.Between(0, 2)];
  const item = itemsGroup.create(850, Phaser.Math.Between(80, 530), `item_${type}`).setDepth(11);
  item.lootType = type;
  item.body.setAllowGravity(false);
  item.setVelocityX(-150);
}

function spawnScenery(scene) {
  if (gameState !== 'PLAYING') return;
  const isTree = Phaser.Math.Between(0, 1) === 0;
  const dec = scene.add.sprite(860, Phaser.Math.Between(50, 550), isTree ? 'scenery_tree' : 'scenery_bush').setDepth(2);
  dec.speedFactor = isTree ? 0.6 : 0.85;
  sceneryGroup.add(dec);
}

// =============================================================================
// COMBATE E MORTE
// =============================================================================

function collectItem(item) {
  activeBuff.type = item.lootType;
  activeBuff.timeLeft = item.lootType === 'shield' ? 8 : 6;
  activeBuff.nextAttackTime = 0;
  shieldSprite.setVisible(item.lootType === 'shield');
  item.destroy();
  updateHUDStatus();
}

function handlePlayerHit(scene, hazard) {
  if (gameState !== 'PLAYING') return;

  if (activeBuff.type === 'shield') {
    activeBuff.type = null;
    activeBuff.timeLeft = 0;
    shieldSprite.setVisible(false);
    updateHUDStatus();
    if (hazard.shootTimer) hazard.shootTimer.remove();
    hazard.destroy();
    return;
  }

  triggerGameOver(scene);
}

function destroyCombatOverlap(arrow, enemy) {
  if (enemy.x > 800) return;
  arrow.destroy();
  if (enemy.shootTimer) enemy.shootTimer.remove();
  enemy.destroy();
}

function triggerGameOver(scene) {
  gameState = 'GAMEOVER';
  scene.physics.pause();
  scene.time.removeAllEvents();
  player.setTint(0xff5555);

  showInitialsModal(scene);
}

function showInitialsModal(scene) {
  let name = '';
  const modal = createModal(scene, 'O CAVALEIRO TOMBOU', 400);

  const info = scene.add.text(400, 180, `Tempo em Combate: ${survivalTime}s\n\nDigite suas 3 iniciais:`, {
    fontSize: '17px', color: '#e8dcbe', align: 'center', fontFamily: 'Courier New, monospace'
  }).setOrigin(0.5);

  const display = scene.add.text(400, 260, '_ _ _', {
    fontSize: '34px', fontStyle: 'bold', color: '#ffca28', fontFamily: 'Courier New, monospace'
  }).setOrigin(0.5);

  const submit = () => {
    scene.input.keyboard.off('keydown', onKey);
    modal.destroy();
    const { topScores, currentName } = saveHighScore(name.padEnd(3, 'A'), survivalTime);
    showLeaderboardModal(scene, topScores, currentName);
  };

  const btn = createButton(scene, 400, 340, 'CONFIRMAR HONRA', submit);
  modal.add([info, display, btn[0], btn[1]]);

  const onKey = (e) => {
    if (e.key === 'Backspace') name = name.slice(0, -1);
    else if (e.key === 'Enter') submit();
    else if (e.key.length === 1 && /[a-zA-Z]/.test(e.key) && name.length < 3) name += e.key.toUpperCase();
    display.setText(name.padEnd(3, '_').split('').join(' '));
  };
  scene.input.keyboard.on('keydown', onKey);
}

function showLeaderboardModal(scene, topScores, currentName) {
  const modal = createModal(scene, '⚔️ CAMPEÕES DO REINO ⚔️', 450);
  const rows = [];

  topScores.forEach((item, i) => {
    const y = 160 + i * 40;
    const isCurrent = item.name === currentName && item.score === survivalTime;
    const color = isCurrent ? '#ffca28' : '#e8dcbe';
    const medal = ['👑', '🥈', '🥉', '4º', '5º'][i];

    const row = scene.add.text(400, y, `${medal}   ${item.name}   -   ${item.score}s`, {
      fontSize: '18px', fontStyle: isCurrent ? 'bold' : 'normal', color, fontFamily: 'Courier New, monospace'
    }).setOrigin(0.5);
    rows.push(row);
  });

  const restartFn = () => {
    modal.destroy();
    scene.scene.restart();
  };

  const btn = createButton(scene, 400, 400, 'NOVA JORNADA', restartFn);
  modal.add([...rows, btn[0], btn[1]]);

  scene.time.delayedCall(200, () => {
    scene.input.keyboard.once('keydown-SPACE', restartFn);
    scene.input.keyboard.once('keydown-ENTER', restartFn);
  });
}

// =============================================================================
// 3. UPDATE: MOVIMENTO CONTÍNUO E FLUXO DO MUNDO
// =============================================================================
function update(time, delta) {
  if (gameState !== 'PLAYING') return;

  // 1. Movimento Contínuo do Cenário (Sensação Real de Corrida na Floresta)
  const worldSpeed = obstacleSpeed * 0.9;
  groundTile.tilePositionX += (worldSpeed * (delta / 1000));

  // 2. Movimento do Cavaleiro
  const speed = 280;
  player.body.setVelocity(0);
  let dirX = 0, dirY = 0;

  if (cursors.left.isDown || wasdKeys.A.isDown) dirX -= 1;
  if (cursors.right.isDown || wasdKeys.D.isDown) dirX += 1;
  if (cursors.up.isDown || wasdKeys.W.isDown) dirY -= 1;
  if (cursors.down.isDown || wasdKeys.S.isDown) dirY += 1;

  player.body.setVelocity(dirX * speed, dirY * speed);
  player.body.velocity.normalize().scale(speed);

  // Espelhamento horizontal de acordo com o movimento
  if (dirX < 0) player.setFlipX(true);
  else if (dirX > 0) player.setFlipX(false);

  // Leve oscilação de passos ao correr
  player.setAngle(Math.sin(time * 0.018) * 3);

  // Escudo acompanha o jogador
  if (shieldSprite.visible) {
    shieldSprite.setPosition(player.x + (player.flipX ? -16 : 16), player.y);
  }

  // 3. Gerenciador de Buff Ativo
  if (activeBuff.type) {
    activeBuff.timeLeft -= delta / 1000;
    if (activeBuff.timeLeft <= 0) {
      if (activeBuff.type === 'shield') shieldSprite.setVisible(false);
      activeBuff.type = null;
      activeBuff.timeLeft = 0;
      updateHUDStatus();
    } else {
      updateHUDStatus();
      if (activeBuff.type === 'bow' && time > activeBuff.nextAttackTime) {
        shootPlayerArrow(this);
        activeBuff.nextAttackTime = time + 320;
      } else if (activeBuff.type === 'sword' && time > activeBuff.nextAttackTime) {
        executeSwordSlash(this);
        activeBuff.nextAttackTime = time + 240;
      }
    }
  }

  // 4. Parallax de Árvores e Arbustos
  sceneryGroup.getChildren().forEach(sc => {
    sc.x -= (worldSpeed * (sc.speedFactor || 0.6)) * (delta / 1000);
  });

  // 5. Limpeza de Memória (Garbage Collection)
  const cleanGroup = (grp, minX, maxX) => {
    grp.getChildren().forEach(ent => {
      if ((minX !== undefined && ent.x < minX) || (maxX !== undefined && ent.x > maxX)) {
        if (ent.shootTimer) ent.shootTimer.remove();
        ent.destroy();
      }
    });
  };

  cleanGroup(sceneryGroup, -80);
  cleanGroup(obstaclesGroup, -50);
  cleanGroup(itemsGroup, -50);
  cleanGroup(enemyProjectilesGroup, -40);
  cleanGroup(playerProjectilesGroup, undefined, 800);
}