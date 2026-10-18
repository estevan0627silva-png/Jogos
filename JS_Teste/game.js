// =============================================================================
// A JORNADA DO CAVALEIRO — Pixel Art Edition (Phaser 3)
// Ordem: Config → Ajustes → Estado → Recordes → Arte → Cena → Spawns →
//        Combate → Interface
// =============================================================================

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  backgroundColor: '#5b8a3c',
  physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
  scene: { preload, create, update }
};

const game = new Phaser.Game(config);

// =============================================================================
// AJUSTES DO JOGO (mude aqui para balancear)
// =============================================================================
const PLAYER_SPEED = 280;
const BUFF_TIME = { bow: 6, shield: 8, sword: 6 };   // duração de cada item (s)
const ATTACK_RATE = { bow: 320, sword: 300 };        // intervalo entre ataques (ms)
const BUFF_NAMES = { bow: '🏹 ARCO', shield: '🛡️ ESCUDO', sword: '🗡️ ESPADA' };
const ENEMIES = {                                    // velocidade relativa e hitbox
  goblin:  { speed: 1.15, w: 16, h: 20 },
  warrior: { speed: 0.9,  w: 20, h: 26 },
  elf:     { speed: 0.85, w: 16, h: 24 }
};
const STORAGE_KEY = 'knight_quest_highscores';

// Paleta de cores da pixel art
const C = {
  outline: 0x1a1410, white: 0xffffff, yellow: 0xffeb3b, bone: 0xe8dcc0,
  steel: 0xc9ced8, steelDark: 0x8a909c, steelLight: 0xf2f4f8,
  iron: 0x454852, ironDark: 0x26272e,
  red: 0xd83a3a, darkRed: 0x8e1b1b, eye: 0xff3030,
  blue: 0x2f6fd6, gold: 0xf2c14e, skin: 0xf1c27d,
  wood: 0x9c6b3a, woodDark: 0x5c3a1b, rag: 0x7a5230, boot: 0x4e342e,
  gob: 0x9ccc65, gobDark: 0x5f8f2f,
  elfHair: 0xf7e27a, elfTunic: 0x26a69a, elfCloak: 0x00574b,
  purple: 0xc36bff, cyan: 0x7fe7ff,
  leaf: 0x2f6e35, leafLight: 0x47a04a, leafDark: 0x1d4a22
};

// =============================================================================
// ESTADO
// =============================================================================
let player, shieldSprite, cursors, keys;
let ground, road, forestTop, forestBottom, shadows, hitFx;
let enemies, trees, items, playerArrows, enemyArrows, slashes;
let hudScore, hudStatus;
let gameState, survivalTime, enemySpeed, spawnDelay, buff;

// =============================================================================
// RECORDES (salvos no navegador com localStorage)
// =============================================================================
function getHighScores() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [{ name: 'ART', score: 40 }, { name: 'LAN', score: 28 }, { name: 'GWE', score: 18 }];
}

function saveHighScore(name, score) {
  const scores = getHighScores();
  scores.push({ name, score });
  scores.sort((a, b) => b.score - a.score);
  const top = scores.slice(0, 5);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(top)); } catch (e) {}
  return top;
}

const getBestScore = () => getHighScores()[0]?.score ?? 0;

// =============================================================================
// ARTE: FERRAMENTAS DE PIXEL ART
// Cada "pixel" do desenho vira um bloco 2x2. Antes das cores, o desenho é
// carimbado 4 vezes deslocado em cor escura — isso cria o contorno de 1px.
// =============================================================================
function drawPixels(g, ox, oy, draw, frame = 0) {
  const pass = (dx, dy, outline) => draw((color, x, y, w, h) =>
    g.fillStyle(outline ? C.outline : color).fillRect(ox + x * 2 + dx, oy + y * 2 + dy, w * 2, h * 2), frame);
  pass(-1, 0, true); pass(1, 0, true); pass(0, -1, true); pass(0, 1, true); // contorno
  pass(0, 0, false);                                                         // cores
}

// Gera uma folha de sprites (quadros lado a lado) e registra cada quadro
function makeSheet(scene, key, w, h, frames, draw) {
  const g = scene.make.graphics({ add: false });
  for (let f = 0; f < frames; f++) drawPixels(g, f * w, 0, draw, f);
  g.generateTexture(key, w * frames, h);
  g.destroy();
  const tex = scene.textures.get(key);
  for (let f = 0; f < frames; f++) tex.add(f, 0, f * w, 0, w, h);
}

// Item coletável: aura brilhante + disco escuro + borda dourada + ícone
function makeItem(scene, key, glow, drawIcon) {
  const g = scene.make.graphics({ add: false });
  g.fillStyle(glow, 0.2).fillCircle(16, 16, 16);
  g.fillStyle(glow, 0.35).fillCircle(16, 16, 13);
  g.fillStyle(0x2a1d12).fillCircle(16, 16, 11);
  g.lineStyle(2, C.gold).strokeCircle(16, 16, 11);
  drawPixels(g, 7, 5, drawIcon);
  g.fillStyle(C.white).fillRect(24, 5, 2, 2); // brilho
  g.generateTexture(key, 32, 32);
  g.destroy();
}

// =============================================================================
// ARTE: DESENHOS (r = cor, x, y, largura, altura — em pixels do desenho)
// Todos olham para a direita; inimigos são espelhados com setFlipX.
// =============================================================================
function drawKnight(r, f) {
  r(C.red, 6, 1, 3, 1); r(C.red, 5, 2, 4, 1);             // pluma
  r(C.steel, 4, 3, 6, 4); r(C.steelLight, 5, 3, 2, 1);   // elmo
  r(C.outline, 7, 5, 3, 1);                              // viseira
  r(C.steel, 3, 7, 8, 5);                                // armadura
  r(C.blue, 5, 7, 5, 5);                                 // tabardo azul
  r(C.gold, 7, 8, 1, 3); r(C.gold, 6, 9, 3, 1);          // cruz dourada
  r(C.woodDark, 3, 11, 8, 1);                            // cinto
  r(C.steelDark, 11, 8, 2, 3);                           // braço
  const leg = (x, up) => { r(C.steelDark, x, 12, 2, up ? 1 : 2); r(C.woodDark, x, up ? 13 : 14, 3, 1); };
  leg(4, f === 0); leg(8, f === 1);                      // pernas alternam
}

function drawGoblin(r, f) {
  r(C.gob, 2, 2, 2, 2); r(C.gob, 10, 2, 2, 2);           // orelhas pontudas
  r(C.gob, 4, 2, 6, 5); r(C.gobDark, 4, 6, 6, 1);        // cabeça
  r(C.yellow, 6, 4, 1, 1); r(C.yellow, 8, 4, 1, 1);      // olhos
  r(C.gobDark, 10, 5, 1, 1);                             // nariz
  r(C.white, 7, 6, 2, 1);                                // dentes
  r(C.rag, 4, 7, 6, 4); r(C.woodDark, 4, 9, 6, 1);       // trapos e cinto
  r(C.gob, 10, 8, 1, 2);                                 // braço
  r(C.steelLight, 11, 5, 1, 3); r(C.woodDark, 11, 8, 1, 1); // adaga
  const leg = (x, up) => r(C.gobDark, x, 11, 2, up ? 1 : 2);
  leg(5, f === 0); leg(8, f === 1);
}

function drawWarrior(r, f) {
  r(C.darkRed, 3, 8, 2, 7);                              // capa
  r(C.bone, 3, 1, 1, 3); r(C.bone, 4, 3, 1, 1);          // chifre esquerdo
  r(C.bone, 13, 1, 1, 3); r(C.bone, 12, 3, 1, 1);        // chifre direito
  r(C.iron, 5, 2, 7, 6); r(C.steelDark, 6, 2, 3, 1);     // elmo
  r(C.outline, 7, 5, 5, 1); r(C.eye, 9, 5, 1, 1); r(C.eye, 11, 5, 1, 1); // olhos vermelhos
  r(C.iron, 5, 8, 8, 6);                                 // armadura
  r(C.steelDark, 4, 8, 3, 2); r(C.steelDark, 11, 8, 3, 2); // ombreiras
  r(C.red, 8, 10, 2, 2); r(C.ironDark, 5, 13, 8, 1);     // brasão e cinto
  r(C.steel, 15, 2, 1, 9); r(C.darkRed, 14, 11, 3, 1); r(C.woodDark, 15, 12, 1, 2); // espada
  r(C.ironDark, 13, 11, 2, 2);                           // mão
  const leg = (x, up) => r(C.ironDark, x, 14, 2, up ? 2 : 3);
  leg(6, f === 0); leg(10, f === 1);
}

function drawElf(r, f) {
  r(C.elfCloak, 3, 6, 2, 6);                             // capa
  r(C.elfHair, 4, 1, 6, 3); r(C.elfHair, 3, 3, 2, 4);    // cabelo
  r(C.skin, 6, 3, 4, 3);                                 // rosto
  r(C.skin, 5, 4, 1, 1); r(C.skin, 4, 3, 1, 1);          // orelha pontuda
  r(C.outline, 8, 4, 1, 1);                              // olho
  r(C.elfTunic, 5, 6, 5, 5); r(C.gold, 5, 9, 5, 1);      // túnica e cinto
  r(C.skin, 10, 7, 2, 1);                                // braço
  r(C.wood, 12, 2, 1, 1); r(C.wood, 13, 3, 1, 7); r(C.wood, 12, 10, 1, 1); // arco
  r(C.white, 12, 3, 1, 7);                               // corda
  const leg = (x, up) => r(C.boot, x, 11, 2, up ? 2 : 3);
  leg(5, f === 0); leg(8, f === 1);
}

function drawTree(r) {
  r(C.woodDark, 10, 19, 4, 11); r(C.wood, 10, 19, 1, 11); r(C.woodDark, 8, 29, 8, 1); // tronco
  r(C.leafDark, 5, 2, 14, 3); r(C.leafDark, 3, 5, 18, 16); r(C.leafDark, 2, 8, 20, 10); // copa
  r(C.leaf, 6, 3, 12, 13); r(C.leaf, 4, 6, 16, 10); r(C.leaf, 3, 9, 18, 6);
  r(C.leafLight, 7, 4, 5, 2); r(C.leafLight, 5, 7, 3, 2); r(C.leafLight, 14, 6, 3, 2); // brilhos
}

function drawShieldIcon(r) {
  r(C.gold, 1, 1, 7, 6); r(C.gold, 2, 7, 5, 2); r(C.gold, 3, 9, 3, 1);
  r(C.blue, 2, 2, 5, 5); r(C.blue, 3, 7, 3, 1);
  r(C.white, 4, 2, 1, 6); r(C.white, 2, 4, 5, 1);
}

function drawBowIcon(r) {
  r(C.wood, 3, 1, 2, 1); r(C.wood, 5, 2, 1, 1); r(C.wood, 6, 3, 1, 5); r(C.wood, 5, 8, 1, 1); r(C.wood, 3, 9, 2, 1);
  r(C.white, 3, 2, 1, 7);                                // corda
  r(C.bone, 1, 5, 6, 1); r(C.steelLight, 7, 4, 1, 3);    // flecha
  r(C.red, 1, 4, 1, 1); r(C.red, 1, 6, 1, 1);            // penas
}

function drawSwordIcon(r) {
  r(C.steelLight, 4, 1, 1, 6); r(C.steel, 5, 2, 1, 5);   // lâmina
  r(C.gold, 2, 7, 5, 1);                                 // guarda
  r(C.woodDark, 4, 8, 2, 2); r(C.gold, 4, 10, 2, 1);     // cabo e pomo
}

function drawBlade(r) {                                  // espada usada no golpe
  r(C.steelLight, 2, 1, 1, 12); r(C.steel, 3, 2, 1, 11);
  r(C.gold, 1, 13, 4, 1); r(C.woodDark, 2, 14, 2, 3); r(C.gold, 2, 17, 2, 1);
}

const arrowDrawer = (feather, tip) => (r) => {
  r(feather, 1, 1, 2, 1); r(feather, 1, 3, 2, 1); r(feather, 2, 2, 1, 1); // penas
  r(C.wood, 3, 2, 7, 1);                                                   // haste
  r(tip, 10, 1, 1, 3); r(tip, 11, 2, 1, 1);                                // ponta
};

// Cenário (chão, estrada, florestas das bordas) e efeitos
function makeWorldTextures(scene) {
  const g = scene.make.graphics({ add: false });
  const rnd = Phaser.Math.Between;
  const pick = Phaser.Utils.Array.GetRandom;

  // Grama com tufos e flores (repete infinitamente)
  g.fillStyle(0x5b8a3c).fillRect(0, 0, 128, 128);
  for (let i = 0; i < 50; i++) {
    const x = rnd(2, 122), y = rnd(2, 120);
    g.fillStyle(pick([0x4c7a33, 0x6d9e48])).fillRect(x, y, 2, 4).fillRect(x + 2, y + 2, 2, 2);
  }
  for (let i = 0; i < 6; i++) g.fillStyle(pick([0xf5e663, 0xffffff, 0xe57373])).fillRect(rnd(4, 122), rnd(4, 122), 2, 2);
  g.generateTexture('ground', 128, 128);

  // Estrada de terra com pedrinhas
  g.clear().fillStyle(0x9b7b4f).fillRect(0, 0, 64, 80);
  g.fillStyle(0x7a5f3b).fillRect(0, 0, 64, 4).fillRect(0, 76, 64, 4);
  for (let i = 0; i < 12; i++) g.fillStyle(pick([0xb89a6c, 0x6e5434])).fillRect(rnd(0, 60), rnd(8, 70), 3, 2);
  g.generateTexture('road', 64, 80);

  // Floresta ao fundo (topo da tela). Copas repetidas em -128/0/128 para emendar sem corte
  g.clear().fillStyle(0x16331a).fillRect(0, 0, 128, 70);
  g.fillStyle(C.woodDark).fillRect(16, 60, 8, 50).fillRect(60, 60, 8, 46).fillRect(100, 60, 8, 50);
  [-128, 0, 128].forEach(o => {
    g.fillStyle(C.leafDark).fillCircle(o + 20, 62, 26).fillCircle(o + 64, 70, 24).fillCircle(o + 104, 60, 26);
    g.fillStyle(C.leaf).fillCircle(o + 14, 54, 14).fillCircle(o + 58, 62, 12).fillCircle(o + 98, 52, 14);
  });
  g.generateTexture('forest_top', 128, 110);

  // Arbustos em primeiro plano (base da tela)
  g.clear().fillStyle(C.leafDark).fillRect(0, 44, 128, 36);
  [-128, 0, 128].forEach(o => {
    g.fillStyle(C.leafDark).fillCircle(o + 20, 36, 26).fillCircle(o + 66, 44, 26).fillCircle(o + 108, 34, 26);
    g.fillStyle(C.leaf).fillCircle(o + 16, 30, 12).fillCircle(o + 62, 38, 12).fillCircle(o + 104, 28, 12);
  });
  g.generateTexture('forest_bottom', 128, 80);

  // Rastro do golpe de espada (meia-lua)
  g.clear();
  g.lineStyle(12, C.cyan, 0.35).beginPath().arc(4, 36, 32, -1.15, 1.15).strokePath();
  g.lineStyle(5, C.white, 1).beginPath().arc(4, 36, 32, -0.95, 0.95).strokePath();
  g.generateTexture('slash_arc', 48, 72);

  // Faísca usada nas explosões de partículas
  g.clear().fillStyle(C.white).fillRect(0, 0, 4, 4);
  g.generateTexture('spark', 4, 4);
  g.destroy();
}

// =============================================================================
// CENA: PRELOAD — cria todas as texturas (só na primeira vez)
// =============================================================================
function preload() {
  if (this.textures.exists('knight')) return;
  makeSheet(this, 'knight', 32, 32, 2, drawKnight);
  makeSheet(this, 'goblin', 28, 28, 2, drawGoblin);
  makeSheet(this, 'warrior', 36, 36, 2, drawWarrior);
  makeSheet(this, 'elf', 32, 32, 2, drawElf);
  makeSheet(this, 'tree', 48, 64, 1, drawTree);
  makeSheet(this, 'shield_worn', 18, 22, 1, drawShieldIcon);
  makeSheet(this, 'sword_blade', 12, 40, 1, drawBlade);
  makeSheet(this, 'arrow_player', 26, 10, 1, arrowDrawer(C.blue, C.steelLight));
  makeSheet(this, 'arrow_elf', 26, 10, 1, arrowDrawer(C.elfCloak, C.purple));
  makeItem(this, 'item_bow', 0xffe082, drawBowIcon);
  makeItem(this, 'item_shield', 0x80deea, drawShieldIcon);
  makeItem(this, 'item_sword', 0xffffff, drawSwordIcon);
  makeWorldTextures(this);
}

// =============================================================================
// CENA: CREATE — monta camadas, grupos, jogador, colisões e HUD
// =============================================================================
function create() {
  const scene = this;
  gameState = 'START';
  survivalTime = 0;
  enemySpeed = 220;
  spawnDelay = 1300;
  buff = { type: null, timeLeft: 0, nextAttack: 0 };

  // Animações de caminhada (2 quadros) — criadas uma única vez
  const fps = { knight: 10, goblin: 12, warrior: 6, elf: 8 };
  Object.entries(fps).forEach(([key, frameRate]) => {
    if (!scene.anims.exists(key)) {
      scene.anims.create({ key, frameRate, repeat: -1, frames: [{ key, frame: 0 }, { key, frame: 1 }] });
    }
  });

  // Camadas do cenário, de trás para frente
  ground = scene.add.tileSprite(400, 300, 800, 600, 'ground').setDepth(-10);
  road = scene.add.tileSprite(400, 330, 800, 80, 'road').setDepth(-9);
  forestTop = scene.add.tileSprite(400, 55, 800, 110, 'forest_top').setDepth(-5);
  shadows = scene.add.graphics().setDepth(-2);
  forestBottom = scene.add.tileSprite(400, 560, 800, 80, 'forest_bottom').setDepth(1000);

  // Grupos físicos
  enemies = scene.physics.add.group();
  trees = scene.physics.add.group({ immovable: true });
  items = scene.physics.add.group();
  playerArrows = scene.physics.add.group();
  enemyArrows = scene.physics.add.group();
  slashes = scene.physics.add.group();

  // Árvores iniciais espalhadas
  for (let x = 320; x <= 800; x += 120) spawnTree(x);

  // Jogador (limitado à área entre as florestas)
  scene.physics.world.setBounds(0, 95, 800, 455);
  player = scene.physics.add.sprite(160, 330, 'knight', 0);
  player.body.setSize(16, 22).setOffset(8, 8);
  player.setCollideWorldBounds(true);
  shieldSprite = scene.add.image(0, 0, 'shield_worn').setVisible(false);

  // Controles
  cursors = scene.input.keyboard.createCursorKeys();
  keys = scene.input.keyboard.addKeys('W,A,S,D');

  // Partículas para impactos e mortes
  hitFx = scene.add.particles(0, 0, 'spark', {
    lifespan: 400, speed: { min: 60, max: 180 }, scale: { start: 1.5, end: 0 },
    tint: [0xffffff, 0xffca28, 0xff7043], emitting: false
  }).setDepth(1500);

  createHUD(scene);

  // Colisões do jogador
  scene.physics.add.collider(player, trees);
  scene.physics.add.overlap(player, enemies, (p, e) => playerHit(scene, e));
  scene.physics.add.overlap(player, enemyArrows, (p, a) => playerHit(scene, a));
  scene.physics.add.overlap(player, items, (p, i) => collectItem(scene, i));

  // Combate (só mata inimigos já visíveis na tela)
  scene.physics.add.overlap(playerArrows, enemies, (a, e) => { if (e.x < 800) { a.destroy(); killEnemy(e); } });
  scene.physics.add.overlap(slashes, enemies, (s, e) => { if (e.x < 800) killEnemy(e); });
  scene.physics.add.overlap(slashes, enemyArrows, (s, a) => a.destroy());
  scene.physics.add.overlap(playerArrows, enemyArrows, (a, b) => { a.destroy(); b.destroy(); });

  // Árvores servem de cobertura: bloqueiam flechas
  scene.physics.add.overlap(playerArrows, trees, (a) => a.destroy());
  scene.physics.add.overlap(enemyArrows, trees, (a) => a.destroy());

  showStartScreen(scene);
}

// =============================================================================
// CENA: UPDATE — roda a cada frame
// =============================================================================
function update(time, delta) {
  if (gameState === 'PLAYING') updateGameplay(this, time, delta / 1000);
  sortAndShade();
}

function updateGameplay(scene, time, dt) {
  // 1. Mundo rolando: chão, estrada e árvores andam JUNTOS (nada desliza)
  const worldSpeed = enemySpeed * 0.6;
  ground.tilePositionX += worldSpeed * dt;
  road.tilePositionX += worldSpeed * dt;
  forestTop.tilePositionX += worldSpeed * 0.9 * dt;    // fundo: um pouco mais lento
  forestBottom.tilePositionX += worldSpeed * 1.3 * dt; // frente: mais rápido (parallax)
  trees.setVelocityX(-worldSpeed);
  items.setVelocityX(-worldSpeed);

  // 2. Cavaleiro: 8 direções com velocidade normalizada
  let dirX = 0, dirY = 0;
  if (cursors.left.isDown || keys.A.isDown) dirX -= 1;
  if (cursors.right.isDown || keys.D.isDown) dirX += 1;
  if (cursors.up.isDown || keys.W.isDown) dirY -= 1;
  if (cursors.down.isDown || keys.S.isDown) dirY += 1;
  player.setVelocity(dirX, dirY).body.velocity.normalize().scale(PLAYER_SPEED);
  if (dirX !== 0) player.setFlipX(dirX < 0);
  player.anims.timeScale = dirX > 0 ? 1.6 : 1;         // corre mais rápido indo para frente
  player.setAngle(Math.sin(time * 0.02) * 3);          // balanço dos passos

  // 3. Inimigos balançando enquanto andam
  enemies.getChildren().forEach(e => e.setAngle(Math.sin(time * 0.015 + e.phase) * 5));

  // 4. Item ativo: conta o tempo e ataca na cadência certa
  if (buff.type) {
    buff.timeLeft -= dt;
    if (buff.timeLeft <= 0) endBuff();
    else if (time > buff.nextAttack && ATTACK_RATE[buff.type]) {
      if (buff.type === 'bow') shootArrow();
      if (buff.type === 'sword') swingSword(scene);
      buff.nextAttack = time + ATTACK_RATE[buff.type];
    }
  }
  hudStatus.setText(buff.type ? `${BUFF_NAMES[buff.type]} (${Math.ceil(buff.timeLeft)}s)` : '');

  // 5. Limpeza do que saiu da tela (.slice() evita pular itens ao destruir)
  const cull = (group, isOut) => group.getChildren().slice().forEach(s => { if (isOut(s)) removeEntity(s); });
  cull(enemies, s => s.x < -60);
  cull(trees, s => s.x < -60);
  cull(items, s => s.x < -60);
  cull(playerArrows, s => s.x < 0 || s.x > 800);
  cull(enemyArrows, s => s.x < -40 || s.y < 0 || s.y > 620);
}

// Profundidade por altura (quem está mais embaixo fica na frente) + sombras
function sortAndShade() {
  shadows.clear().fillStyle(0x000000, 0.28);
  [player, ...enemies.getChildren(), ...trees.getChildren(), ...items.getChildren()].forEach(s => {
    const feet = s.groundY ?? s.y + s.displayHeight / 2;
    s.setDepth(feet);
    shadows.fillEllipse(s.x, feet - 2, s.displayWidth * 0.7, 8);
  });
  [...playerArrows.getChildren(), ...enemyArrows.getChildren()].forEach(a => a.setDepth(a.y + 16));

  // Escudo e golpe de espada acompanham o cavaleiro
  shieldSprite.setPosition(player.x + (player.flipX ? -12 : 12), player.y + 4).setDepth(player.depth + 1);
  slashes.getChildren().forEach(s => {
    s.setPosition(player.x + s.dir * 30, player.y).setDepth(player.depth + 3);
    s.blade.setPosition(player.x + s.dir * 8, player.y + 4).setDepth(player.depth + 2);
  });
}

// =============================================================================
// SPAWNS
// =============================================================================
function startGameplay(scene) {
  gameState = 'PLAYING';
  player.play('knight');

  const every = (delay, fn) => scene.time.addEvent({ delay, loop: true, callback: () => gameState === 'PLAYING' && fn() });
  every(1000, () => { survivalTime++; hudScore.setText(`⚔️ GLÓRIA: ${survivalTime}s`); });
  every(3000, () => { enemySpeed += 25; spawnDelay = Math.max(380, spawnDelay - 70); });
  every(5000, () => spawnItem(scene));
  every(900, () => spawnTree());

  const nextEnemy = () => {
    if (gameState !== 'PLAYING') return;
    spawnEnemy(scene);
    scene.time.delayedCall(spawnDelay, nextEnemy);
  };
  nextEnemy();
}

function spawnEnemy(scene) {
  const roll = Math.random();
  const type = roll < 0.45 ? 'goblin' : roll < 0.75 ? 'warrior' : 'elf';
  const enemy = enemies.create(860, Phaser.Math.Between(130, 520), type, 0);
  enemy.play({ key: type, startFrame: Phaser.Math.Between(0, 1) }).setFlipX(true);
  enemy.body.setSize(ENEMIES[type].w, ENEMIES[type].h);
  enemy.setVelocityX(-enemySpeed * ENEMIES[type].speed);
  enemy.phase = Math.random() * 10; // cada um balança num ritmo diferente

  if (type === 'elf') {
    enemy.shootTimer = scene.time.addEvent({ delay: 1700, loop: true, callback: () => elfShoot(scene, enemy) });
  }
}

// Elfo pisca em rosa (aviso) e atira mirando no cavaleiro
function elfShoot(scene, elf) {
  if (!elf.active || gameState !== 'PLAYING' || elf.x > 780 || elf.x < player.x + 60) return;
  elf.setTint(0xff9cff);
  scene.time.delayedCall(180, () => {
    if (!elf.active || gameState !== 'PLAYING') return;
    elf.clearTint();
    const arrow = enemyArrows.create(elf.x - 14, elf.y, 'arrow_elf');
    arrow.body.setSize(8, 8);
    arrow.rotation = scene.physics.moveToObject(arrow, player, 380);
  });
}

// Árvores nascem fora da estrada e sem encostar umas nas outras
function spawnTree(x = 880) {
  for (let i = 0; i < 6; i++) {
    const y = Phaser.Math.Between(150, 510);
    const onRoad = y > 255 && y < 365;
    const crowded = trees.getChildren().some(t => Math.abs(t.x - x) < 110 && Math.abs(t.y - y) < 100);
    if (onRoad || crowded) continue;
    trees.create(x, y, 'tree').body.setSize(12, 8).setOffset(18, 52); // colisão só no tronco
    return;
  }
}

// Item flutua e pulsa para chamar atenção
function spawnItem(scene) {
  const type = Phaser.Utils.Array.GetRandom(['bow', 'shield', 'sword']);
  const y = Phaser.Math.Between(140, 510);
  const item = items.create(860, y, 'item_' + type);
  item.lootType = type;
  item.groundY = y + 18; // sombra fica no chão enquanto o item flutua
  scene.tweens.add({ targets: item, y: y - 8, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
  scene.tweens.add({ targets: item, scale: 1.12, duration: 400, yoyo: true, repeat: -1 });
}

// =============================================================================
// COMBATE
// =============================================================================
function removeEntity(obj) {
  if (!obj.active) return;
  obj.scene.tweens.killTweensOf(obj);
  if (obj.shootTimer) obj.shootTimer.remove();
  obj.destroy();
}

function killEnemy(enemy) {
  if (!enemy.active) return;
  hitFx.explode(12, enemy.x, enemy.y);
  removeEntity(enemy);
}

function collectItem(scene, item) {
  buff = { type: item.lootType, timeLeft: BUFF_TIME[item.lootType], nextAttack: 0 };
  shieldSprite.setVisible(buff.type === 'shield');
  floatText(scene, item.x, item.y - 20, BUFF_NAMES[buff.type] + '!', '#ffca28');
  removeEntity(item);
}

function endBuff() {
  buff = { type: null, timeLeft: 0, nextAttack: 0 };
  shieldSprite.setVisible(false);
}

function shootArrow() {
  const dir = player.flipX ? -1 : 1;
  const arrow = playerArrows.create(player.x + dir * 20, player.y + 2, 'arrow_player').setFlipX(dir < 0);
  arrow.body.setSize(18, 6);
  arrow.setVelocityX(750 * dir);
}

// Espada gira no punho do cavaleiro + rastro em meia-lua (a hitbox)
function swingSword(scene) {
  const dir = player.flipX ? -1 : 1;
  const slash = slashes.create(player.x + dir * 30, player.y, 'slash_arc').setFlipX(dir < 0);
  slash.body.setSize(36, 60);
  slash.dir = dir;
  slash.blade = scene.add.image(player.x, player.y, 'sword_blade').setOrigin(0.5, 0.78).setFlipX(dir < 0);

  scene.tweens.add({ targets: slash.blade, angle: { from: -60 * dir, to: 120 * dir }, duration: 150, ease: 'Cubic.easeOut' });
  scene.tweens.add({
    targets: slash, alpha: { from: 1, to: 0 }, duration: 200,
    onComplete: () => { slash.blade.destroy(); slash.destroy(); }
  });
}

function playerHit(scene, hazard) {
  if (gameState !== 'PLAYING' || !hazard.active) return;

  if (buff.type === 'shield') {                        // escudo absorve 1 golpe
    endBuff();
    scene.cameras.main.flash(150, 120, 220, 255);
    floatText(scene, player.x, player.y - 30, 'ESCUDO QUEBROU!', '#7fe7ff');
    enemies.contains(hazard) ? killEnemy(hazard) : hazard.destroy();
    return;
  }
  gameOver(scene);
}

function gameOver(scene) {
  gameState = 'GAMEOVER';
  scene.physics.pause();
  scene.time.removeAllEvents();
  scene.tweens.pauseAll();
  [player, ...enemies.getChildren()].forEach(s => s.anims.pause());
  player.setTint(0xff5555);
  hitFx.explode(20, player.x, player.y);
  scene.cameras.main.shake(300, 0.012);
  scene.time.delayedCall(700, () => showInitials(scene)); // pausa curta para ver o que te acertou
}

// =============================================================================
// INTERFACE (HUD, textos flutuantes, modais e botões)
// =============================================================================
const textStyle = (color, size = 17) => ({ fontSize: size + 'px', fontStyle: 'bold', color, fontFamily: 'Courier New, monospace' });

function floatText(scene, x, y, msg, color) {
  const t = scene.add.text(x, y, msg, { ...textStyle(color, 15), stroke: '#000000', strokeThickness: 4 })
    .setOrigin(0.5).setDepth(1500);
  scene.tweens.add({ targets: t, y: y - 40, alpha: 0, duration: 900, onComplete: () => t.destroy() });
}

function createHUD(scene) {
  const bg = scene.add.graphics().setDepth(2000);
  bg.fillStyle(0x12100d, 0.9).fillRoundedRect(10, 10, 780, 42, 6);
  bg.lineStyle(2, 0xc5a059).strokeRoundedRect(10, 10, 780, 42, 6);
  hudScore = scene.add.text(25, 20, '⚔️ GLÓRIA: 0s', textStyle('#e8dcbe')).setDepth(2001);
  scene.add.text(230, 20, `👑 RECORDE: ${getBestScore()}s`, textStyle('#ffca28')).setDepth(2001);
  hudStatus = scene.add.text(775, 20, '', textStyle('#7fe7ff', 16)).setOrigin(1, 0).setDepth(2001);
}

function createModal(scene, title, height) {
  const top = (600 - height) / 2;
  const card = scene.add.graphics();
  card.fillStyle(0x1a1510, 0.98).fillRoundedRect(160, top, 480, height, 14);
  card.lineStyle(3, 0xc5a059).strokeRoundedRect(160, top, 480, height, 14);
  return scene.add.container(0, 0, [
    scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.75),
    card,
    scene.add.text(400, top + 40, title, { ...textStyle('#ffca28', 26), fontFamily: 'Georgia, serif' }).setOrigin(0.5)
  ]).setDepth(3000);
}

function createButton(scene, x, y, label, onClick) {
  const btn = scene.add.rectangle(x, y, 260, 46, 0x8d5524).setStrokeStyle(2, 0xc5a059).setInteractive({ useHandCursor: true });
  const txt = scene.add.text(x, y, label, { ...textStyle('#ffffff'), fontFamily: 'Georgia, serif' }).setOrigin(0.5);
  btn.on('pointerover', () => btn.setFillStyle(0xb06c2e));
  btn.on('pointerout', () => btn.setFillStyle(0x8d5524));
  btn.once('pointerdown', onClick);
  return [btn, txt];
}

function showStartScreen(scene) {
  const modal = createModal(scene, 'A JORNADA DO CAVALEIRO', 500);
  const info = scene.add.text(400, 265,
    `★ RECORDE: ${getBestScore()}s ★\n\n` +
    'INIMIGOS: Goblins, Guerreiros Sombrios e Elfos\n' +
    'Elfos brilham em rosa antes de atirar!\n\n' +
    'ITENS: círculos brilhantes no chão\n' +
    '🏹 Arco  |  🛡️ Escudo  |  🗡️ Espada\n\n' +
    'Árvores bloqueiam o caminho e as flechas.\n' +
    'Mover: WASD ou Setas',
    { ...textStyle('#d6c8aa', 14), fontStyle: 'normal', align: 'center', lineSpacing: 5 }
  ).setOrigin(0.5);

  let started = false; // evita iniciar 2x (clique no botão também é clique na tela)
  const start = () => {
    if (started) return;
    started = true;
    modal.destroy();
    startGameplay(scene);
  };

  const hint = scene.add.text(400, 495, 'ESPAÇO, ENTER ou CLIQUE para começar', textStyle('#a8987b', 12)).setOrigin(0.5);
  modal.add([info, ...createButton(scene, 400, 440, 'INICIAR MISSÃO', start), hint]);
  scene.input.once('pointerdown', start);
  scene.input.keyboard.once('keydown-SPACE', start);
  scene.input.keyboard.once('keydown-ENTER', start);
}

function showInitials(scene) {
  let name = '', done = false;
  const modal = createModal(scene, 'O CAVALEIRO TOMBOU', 400);
  const info = scene.add.text(400, 190, `Tempo em combate: ${survivalTime}s\n\nDigite suas 3 iniciais:`,
    { ...textStyle('#e8dcbe'), align: 'center' }).setOrigin(0.5);
  const display = scene.add.text(400, 265, '_ _ _', textStyle('#ffca28', 34)).setOrigin(0.5);

  const onKey = (e) => {
    if (e.key === 'Backspace') name = name.slice(0, -1);
    else if (e.key === 'Enter') return submit();
    else if (/^[a-zA-Z]$/.test(e.key) && name.length < 3) name += e.key.toUpperCase();
    display.setText(name.padEnd(3, '_').split('').join(' '));
  };

  const submit = () => {
    if (done) return;
    done = true;
    scene.input.keyboard.off('keydown', onKey);
    modal.destroy();
    const finalName = name.padEnd(3, 'A');
    showLeaderboard(scene, saveHighScore(finalName, survivalTime), finalName);
  };

  modal.add([info, display, ...createButton(scene, 400, 345, 'CONFIRMAR HONRA', submit)]);
  scene.input.keyboard.on('keydown', onKey);
}

function showLeaderboard(scene, topScores, currentName) {
  const modal = createModal(scene, '⚔️ CAMPEÕES DO REINO ⚔️', 450);
  let marked = false;

  topScores.forEach((entry, i) => {
    const isMine = !marked && entry.name === currentName && entry.score === survivalTime;
    if (isMine) marked = true;
    const medal = ['👑', '🥈', '🥉', '4º', '5º'][i];
    modal.add(scene.add.text(400, 170 + i * 42, `${medal}   ${entry.name}   -   ${entry.score}s`,
      { ...textStyle(isMine ? '#ffca28' : '#e8dcbe', 18), fontStyle: isMine ? 'bold' : 'normal' }).setOrigin(0.5));
  });

  let restarting = false;
  const restart = () => {
    if (restarting) return;
    restarting = true;
    scene.scene.restart();
  };

  modal.add(createButton(scene, 400, 430, 'NOVA JORNADA', restart));
  scene.time.delayedCall(200, () => {
    scene.input.keyboard.once('keydown-SPACE', restart);
    scene.input.keyboard.once('keydown-ENTER', restart);
  });
}