// =============================================================================
// A JORNADA DO CAVALEIRO — Pixel Art Edition (Phaser 3)
// Ordem: Config → Ajustes → Estado → Recordes/Conquistas → Arte → Cena →
//        Spawns/Director → Combate/XP → Interface (Ferreiro, Mago, Draft)
// =============================================================================

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

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
    expandParent: true,
    fullscreenTarget: 'game-container'
  },
  physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
  scene: { preload, create, update }
};

const game = new Phaser.Game(config);

// =============================================================================
// AJUSTES DO JOGO (Rebalanceamento v1.2.0: Nível 1 fraco -> Nível 5 muito forte)
// =============================================================================
const PLAYER_SPEED = 280;
const BUFF_TIME = { bow: 6.0, shield: 4.8, sword: 6.0, axe: 6.2, firestaff: 6.0 }; // duração base Nv.1 (s)
const ATTACK_RATE = { bow: 520, sword: 480, axe: 600, firestaff: 650 };            // cadência base Nv.1 reduzida (ms)
const BUFF_NAMES = {
  bow: 'ARCO REAL',
  shield: 'ESCUDO SAGRADO',
  sword: 'ESPADA VORPAL',
  axe: 'MACHADO BUMERANGUE',
  firestaff: 'CAJADO DE FOGO'
};
const ENEMIES = {                                    // vida, velocidade relativa, hitbox e XP dropado
  goblin:     { hp: 1, speed: 1.12, w: 16, h: 20, xp: 2 },
  warrior:    { hp: 2, speed: 0.86, w: 20, h: 26, xp: 5 },
  elf:        { hp: 1, speed: 0.84, w: 16, h: 24, xp: 3 },
  gargoyle:   { hp: 1, speed: 1.16, w: 18, h: 20, xp: 3 },  // voo senoidal estilo Bullet-Hell
  dark_mage:  { hp: 2, speed: 0.76, w: 18, h: 26, xp: 5 },  // dispara 3 orbes sombrios em leque
  mini_golem: { hp: 1, speed: 0.94, w: 18, h: 20, xp: 2 }
};
const BOSS_TRIGGER_TIME = 120;                       // Run estendida: Golem desperta aos 120 segundos!
const BOSS_MAX_HP = 75;                              // HP calibrado para armas evoluídas via Level Up
const MAX_ENEMY_SPEED = 365;                         // teto máximo justo de velocidade
const MIN_SPAWN_DELAY = 480;                         // intervalo mínimo de spawn entre pulsos do Director (ms)
const MAX_WEAPON_LEVEL = 5;                          // nível máximo das armas DENTRO da partida (via XP)
const STORAGE_KEY = 'knight_quest_highscores';
const STORAGE_GOLD_KEY = 'knight_quest_gold_v1';
const STORAGE_UPGRADES_KEY = 'knight_quest_upgrades_v1';
const STORAGE_STATUS_KEY = 'knight_quest_status_v1';
const STORAGE_ACHIEVEMENTS_KEY = 'knight_quest_achievements_v1';

// Catálogo do Ferreiro (Apenas Desbloqueio no Menu; os Níveis 1 a 5 evoluem IN-GAME via XP Level Up!)
const WEAPON_CATALOG = {
  bow: {
    name: 'ARCO REAL',
    icon: 'item_bow',
    unlockedDefault: true,
    unlockCost: 0,
    maxLevel: 5,
    forgeLore: 'Arco de teixo real. Começa simples (Nv.1) e evolui na partida até a Tempestade de 5 Flechas (Nv.5).',
    levels: [
      'Nv.1 (Base): 1 flecha simples e cadência lenta (520ms, 1 dano).',
      'Nv.2: Corda Tensionada — Disparo mais veloz (420ms, 1 dano).',
      'Nv.3: Tiro Duplo — Dispara 2 flechas em V (350ms, 1 dano).',
      'Nv.4: Saraivada Real — 3 flechas perfurantes em leque (280ms, 2 dano).',
      'Nv.5 (MÁX): Tempestade Imperial — 5 flechas perfurantes a cada 220ms (2 dano)!'
    ]
  },
  sword: {
    name: 'ESPADA VORPAL',
    icon: 'item_sword',
    unlockedDefault: true,
    unlockCost: 0,
    maxLevel: 5,
    forgeLore: 'Lâmina de aço encantado. Começa curta (Nv.1) e evolui na partida até lançar Ondas Vorpais (Nv.5).',
    levels: [
      'Nv.1 (Base): Corte curto e estreito (480ms, 1 dano).',
      'Nv.2: Fio Temperado — Alcance normal e golpe mais ágil (400ms, 1 dano).',
      'Nv.3: Lâmina Larga — +25% área de corte e 2 de dano (330ms).',
      'Nv.4: Fúria Vorpal — Grande arco cortante, 3 de dano e alta velocidade (265ms).',
      'Nv.5 (MÁX): Colosso Vorpal — Corte gigante (4 dano, 210ms) + Onda de Vento Perfurante!'
    ]
  },
  shield: {
    name: 'ESCUDO SAGRADO',
    icon: 'item_shield',
    unlockedDefault: true,
    unlockCost: 0,
    maxLevel: 5,
    forgeLore: 'Égide abençoada. Reflete flechas mantendo o aspecto normal e explode ao bloquear golpes.',
    levels: [
      'Nv.1 (Base): Dura 4.8s, reflete 1 flecha simples (1 dano) e onda curta.',
      'Nv.2: Borda Reforçada — Dura 6.2s, reflete 1 flecha veloz e onda média.',
      'Nv.3: Espelho Duplo — Dura 7.6s, reflete 2 flechas em V e onda forte.',
      'Nv.4: Baluarte Real — Dura 9.2s, reflete 3 flechas perfurantes (2 dano).',
      'Nv.5 (MÁX): Égide Divina — Dura 11.5s, reflete 5 flechas perfurantes + Onda Titânica!'
    ]
  },
  axe: {
    name: 'MACHADO BUMERANGUE',
    icon: 'item_axe',
    unlockedDefault: false,
    unlockCost: 25,
    maxLevel: 5,
    forgeLore: 'Machado duplo rúnico forjado pelo Mestre Ferreiro. Vai e volta cortando fileiras inteiras.',
    levels: [
      'Nv.1 (Base): 1 machado lento que perfura até 2 inimigos (600ms, 1 dano).',
      'Nv.2: Giro Contínuo — Perfuração ilimitada na ida e na volta (500ms, 1 dano).',
      'Nv.3: Machados Gêmeos — Lança 2 machados em ângulos opostos (420ms, 2 dano).',
      'Nv.4: Tríade Bárbara — Lança 3 machados largos e velozes (340ms, 2 dano).',
      'Nv.5 (MÁX): Turbilhão Ancestral — 4 machados gigantes (270ms, 3 dano na ida e volta)!'
    ]
  },
  firestaff: {
    name: 'CAJADO DE FOGO',
    icon: 'item_firestaff',
    unlockedDefault: false,
    unlockCost: 45,
    maxLevel: 5,
    forgeLore: 'Cetro engastado na brasa da forja. Dispara orbes solares que explodem em área.',
    levels: [
      'Nv.1 (Base): 1 fagulha lenta com explosão pequena (650ms, raio 42px, 1 dano).',
      'Nv.2: Brasa Viva — Explosão ampliada (540ms, raio 58px, 1 dano).',
      'Nv.3: Chama Dupla — 2 orbes explosivos em V (450ms, raio 74px, 2 dano).',
      'Nv.4: Sol Ardente — 2 grandes orbes solares (360ms, raio 92px, 3 dano).',
      'Nv.5 (MÁX): Cataclismo Solar — 3 mega meteoros limpa-tela (285ms, raio 115px, 4 dano)!'
    ]
  }
};

// Catálogo Exclusivo do Santuário do Mago (Upgrades Permanentes de Status com Poções e Ervas)
const STATUS_CATALOG = {
  maxHp: {
    name: 'ELIXIR DO CORAÇÃO DE RUBI (VIDA)',
    shortName: 'VIDA MÁXIMA',
    potionColor: 0xff5252,
    icon: 'stat_health',
    maxLevel: 4,
    costs: [22, 48, 85, 0],
    values: [1, 2, 3, 4],
    levels: [
      '1 Coração de Vida (Vigor inicial do Cavaleiro).',
      '2 Corações de Vida (+1 golpe suportado com invencibilidade).',
      '3 Corações de Vida (Sangue de Dragão — alta resistência).',
      '4 Corações de Vida (Imortalidade Rubra do Campeão)!'
    ]
  },
  moveSpeed: {
    name: 'POÇÃO DOS VENTOS ALADOS (VELOCIDADE)',
    shortName: 'VELOCIDADE',
    potionColor: 0xffeb3b,
    icon: 'stat_speed',
    maxLevel: 5,
    costs: [12, 24, 42, 70, 0],
    values: [280, 304, 328, 352, 380],
    levels: [
      'Passos ágeis base (280 px/s).',
      'Essência da Brisa (304 px/s, +9% velocidade).',
      'Fôlego do Falcão (328 px/s, +17% velocidade).',
      'Passos de Mercúrio (352 px/s, +26% velocidade).',
      'Velocidade Astral (380 px/s, +36% esquiva suprema)!'
    ]
  },
  magnet: {
    name: 'EXTRATO DE ÍMÃ ASTRAL (RANGE DE COLETA)',
    shortName: 'RANGE / ÍMÃ',
    potionColor: 0x7fe7ff,
    icon: 'stat_magnet',
    maxLevel: 5,
    costs: [12, 24, 42, 70, 0],
    values: [90, 135, 185, 240, 310],
    levels: [
      'Aura curta (90 px) para atrair Orbes de XP e Moedas de Prata.',
      'Atração Mística (135 px) + puxada mais rápida.',
      'Vórtice Esmeralda (185 px) — atrai metade da estrada.',
      'Pulso Gravitacional (240 px) — puxa orbes de longe.',
      'Onipresença Astral (310 px) — domina toda a floresta!'
    ]
  },
  wisdom: {
    name: 'INFUSÃO DE ERVAS ARCANAS (XP & DURAÇÃO)',
    shortName: 'SABEDORIA XP',
    potionColor: 0xc36bff,
    icon: 'stat_wisdom',
    maxLevel: 5,
    costs: [15, 30, 52, 80, 0],
    values: [1.0, 1.15, 1.30, 1.45, 1.65],
    levels: [
      'Ganho de XP padrão (100%) e duração base das relíquias.',
      '+15% de XP ganho e +0.6s na duração de todas as armas.',
      '+30% de XP ganho e +1.2s na duração de todas as armas.',
      '+45% de XP ganho e +1.8s na duração de todas as armas.',
      '+65% de XP ganho e +2.5s na duração de todas as armas!'
    ]
  }
};

// Catálogo do Sistema de Conquistas (Achievements Acumulativos)
const ACHIEVEMENTS_CATALOG = [
  {
    id: 'goblin_1',
    stat: 'goblins',
    target: 15,
    rewardGold: 10,
    title: 'CAÇADOR DE GOBLINS I',
    desc: 'Derrote 15 Goblins nas trilhas da floresta.',
    icon: 'goblin'
  },
  {
    id: 'goblin_2',
    stat: 'goblins',
    target: 60,
    rewardGold: 25,
    title: 'FLAGELO DOS GOBLINS II',
    desc: 'Derrote 60 Goblins acumulando vitórias.',
    icon: 'goblin'
  },
  {
    id: 'warrior_1',
    stat: 'warriors',
    target: 10,
    rewardGold: 12,
    title: 'QUEBRADOR DE FERRO I',
    desc: 'Derrote 10 Guerreiros de Armadura.',
    icon: 'warrior'
  },
  {
    id: 'warrior_2',
    stat: 'warriors',
    target: 40,
    rewardGold: 30,
    title: 'TERROR DA INFANTARIA II',
    desc: 'Derrote 40 Guerreiros de Armadura.',
    icon: 'warrior'
  },
  {
    id: 'mage_1',
    stat: 'mages',
    target: 8,
    rewardGold: 15,
    title: 'CAÇADOR DO OCULTO I',
    desc: 'Derrote 8 Magos Sombrios.',
    icon: 'dark_mage'
  },
  {
    id: 'mage_2',
    stat: 'mages',
    target: 30,
    rewardGold: 35,
    title: 'INQUISIDOR ARCANO II',
    desc: 'Derrote 30 Magos Sombrios.',
    icon: 'dark_mage'
  },
  {
    id: 'reflect_1',
    stat: 'reflected',
    target: 10,
    rewardGold: 15,
    title: 'ESCUDO ESPELHADO I',
    desc: 'Reflita 10 Flechas ou Orbes com o Escudo Sagrado.',
    icon: 'item_shield'
  },
  {
    id: 'reflect_2',
    stat: 'reflected',
    target: 35,
    rewardGold: 35,
    title: 'MESTRE DO REFLEXO II',
    desc: 'Reflita 35 Flechas ou Orbes com o Escudo Sagrado.',
    icon: 'item_shield'
  }
];

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
// ESTADO (Inclui Estado de XP e Níveis Isolados por Partida)
// =============================================================================
let player, shieldSprite, cursors, keys;
let ground, road, forestTop, forestBottom, shadows, hitFx, dustFx, playerBuffBar, enemyHpBars;
let enemies, obstacles, trees, items, playerArrows, enemyArrows, slashes, xpOrbs;
let hudContainer, hudGloryText, hudSilverText, hudGoldText, hudBestText, hudHearts = [];
let hudItemIcon, hudItemName, hudItemTime, hudItemBar, hudHornIcon, hudFullscreenIcon;
let hudXpBar, hudXpText, hudLevelText;
let activeBoss, bossSpawned, bossDefeated, bossHudContainer, bossHpBar, bossHpText, bossFilterOverlay;
let villageDecor, coins, menuContainer, pauseModal, draftModal, currentShopTab = 'mage';
let gameState, survivalTime, runSilver = 0, runGold = 0, lastRunSummary = null;
let playerHp = 1, playerMaxHp = 1, playerInvulnerable = false;
let runXp = 0, runLevel = 1, xpToNextLevel = 6, pendingLevelUps = 0;
let runWeaponLevels = { bow: 1, sword: 1, shield: 1, axe: 1, firestaff: 1 };
let runBonusDuration = 0;
let enemySpeed, spawnDelay, buff, slashCounter = 0;

// =============================================================================
// RECORDES, OURO PERSISTENTE, CONQUISTAS & UPGRADES (salvos com localStorage)
// =============================================================================
function getHighScores() {
  const defaults = [{ name: 'ART', score: 40 }, { name: 'LAN', score: 28 }, { name: 'GWE', score: 18 }];
  if (typeof localStorage === 'undefined') return defaults;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return defaults;
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : defaults;
  } catch (err) {
    console.warn('Dados de recordes corrompidos, restaurando padrão:', err);
    return defaults;
  }
}

function saveHighScore(name, score) {
  const scores = getHighScores();
  scores.push({ name, score });
  scores.sort((a, b) => b.score - a.score);
  const top = scores.slice(0, 5);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(top));
  }
  return top;
}

const getBestScore = () => getHighScores()[0]?.score ?? 0;

function getGold() {
  if (typeof localStorage === 'undefined') return 0;
  const val = parseInt(localStorage.getItem(STORAGE_GOLD_KEY) || '0', 10);
  return Number.isFinite(val) && val >= 0 ? val : 0;
}

function setGold(total) {
  const clean = Math.max(0, Math.floor(total));
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_GOLD_KEY, String(clean));
  }
  if (hudGoldText && hudGoldText.active) {
    hudGoldText.setText(`${clean}`);
  }
  return clean;
}

function addGold(amount) {
  return setGold(getGold() + amount);
}

// Consolida e converte as Moedas de Prata da partida em Ouro Persistente (Meta-currency)
function consolidateSilverToGold() {
  const silverCollected = Math.max(0, Math.floor(runSilver));
  const goldFromSilver = silverCollected; // 1 Moeda de Prata consolidada = 1 Ouro Real
  const timeBonusGold = Math.floor(survivalTime / 15);
  const bossBonusGold = bossDefeated ? 20 : 0;
  const totalGoldEarned = goldFromSilver + timeBonusGold + bossBonusGold;
  const newTotalGold = addGold(totalGoldEarned);
  runGold = totalGoldEarned;
  lastRunSummary = {
    silverCollected,
    goldFromSilver,
    timeBonusGold,
    bossBonusGold,
    totalGoldEarned,
    newTotalGold,
    reachedLevel: runLevel
  };
  return lastRunSummary;
}

// Desbloqueio de Armas na Forja do Ferreiro (Níveis de armas são isolados por partida!)
function getUpgrades() {
  const defaults = {
    bow:       { unlocked: true },
    sword:     { unlocked: true },
    shield:    { unlocked: true },
    axe:       { unlocked: false },
    firestaff: { unlocked: false },
    starterWeapon: null
  };
  if (typeof localStorage === 'undefined') return defaults;
  const saved = localStorage.getItem(STORAGE_UPGRADES_KEY);
  if (!saved) return defaults;
  try {
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== 'object') return defaults;
    ['bow', 'sword', 'shield', 'axe', 'firestaff'].forEach(k => {
      if (parsed[k] && typeof parsed[k] === 'object') {
        defaults[k].unlocked = Boolean(parsed[k].unlocked ?? defaults[k].unlocked);
      }
    });
    if (parsed.starterWeapon && defaults[parsed.starterWeapon]?.unlocked) {
      defaults.starterWeapon = parsed.starterWeapon;
    }
    return defaults;
  } catch (e) {
    return defaults;
  }
}

function saveUpgrades(up) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_UPGRADES_KEY, JSON.stringify(up));
  }
}

// Nível da arma é ISOLADO POR PARTIDA (sobe via XP e Cartas de Level Up de 1 até 5!)
function getWeaponLevel(type) {
  return Phaser.Math.Clamp(runWeaponLevels[type] || 1, 1, MAX_WEAPON_LEVEL);
}

function getUnlockedWeaponPool() {
  const up = getUpgrades();
  return Object.keys(WEAPON_CATALOG).filter(k => up[k]?.unlocked);
}

// Status Permanentes no Santuário do Mago Alquimista
function getStatusUpgrades() {
  const defaults = { magnet: 1, maxHp: 1, moveSpeed: 1, wisdom: 1 };
  if (typeof localStorage === 'undefined') return defaults;
  const saved = localStorage.getItem(STORAGE_STATUS_KEY);
  if (!saved) return defaults;
  try {
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== 'object') return defaults;
    Object.keys(defaults).forEach(k => {
      if (STATUS_CATALOG[k]) {
        defaults[k] = Phaser.Math.Clamp(parseInt(parsed[k] || 1, 10), 1, STATUS_CATALOG[k].maxLevel);
      }
    });
    return defaults;
  } catch (e) {
    return defaults;
  }
}

function saveStatusUpgrades(st) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_STATUS_KEY, JSON.stringify(st));
  }
}

function getStatusLevel(key) {
  const st = getStatusUpgrades();
  return st[key] ?? 1;
}

function getMagnetRadius() {
  const lvl = getStatusLevel('magnet');
  return STATUS_CATALOG.magnet.values[lvl - 1] ?? 90;
}

function getPlayerMaxHp() {
  const lvl = getStatusLevel('maxHp');
  return STATUS_CATALOG.maxHp.values[lvl - 1] ?? 1;
}

function getPlayerMoveSpeed() {
  const lvl = getStatusLevel('moveSpeed');
  return STATUS_CATALOG.moveSpeed.values[lvl - 1] ?? PLAYER_SPEED;
}

function getWisdomMultiplier() {
  const lvl = getStatusLevel('wisdom');
  return STATUS_CATALOG.wisdom.values[lvl - 1] ?? 1.0;
}

function getWisdomBonusDuration() {
  const lvl = getStatusLevel('wisdom');
  return (lvl - 1) * 0.6;
}

// Curva de XP por nível na partida
function getXpRequiredForLevel(lvl) {
  return Math.round(6 + (lvl - 1) * 5 + Math.pow(lvl - 1, 1.35) * 2);
}

// Infraestrutura do Sistema de Conquistas (Achievements Acumulativos)
function getAchievementsData() {
  const defaults = {
    stats: { goblins: 0, warriors: 0, mages: 0, reflected: 0 },
    unlocked: {}
  };
  if (typeof localStorage === 'undefined') return defaults;
  const saved = localStorage.getItem(STORAGE_ACHIEVEMENTS_KEY);
  if (!saved) return defaults;
  try {
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== 'object') return defaults;
    if (parsed.stats && typeof parsed.stats === 'object') {
      ['goblins', 'warriors', 'mages', 'reflected'].forEach(k => {
        const v = parseInt(parsed.stats[k] || 0, 10);
        defaults.stats[k] = Number.isFinite(v) && v >= 0 ? v : 0;
      });
    }
    if (parsed.unlocked && typeof parsed.unlocked === 'object') {
      defaults.unlocked = { ...parsed.unlocked };
    }
    return defaults;
  } catch (e) {
    return defaults;
  }
}

function saveAchievementsData(data) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_ACHIEVEMENTS_KEY, JSON.stringify(data));
  }
}

function recordAchievementProgress(scene, statKey, amount = 1) {
  const data = getAchievementsData();
  if (data.stats[statKey] === undefined) return;
  data.stats[statKey] += amount;

  const newlyUnlocked = [];
  ACHIEVEMENTS_CATALOG.forEach(ach => {
    if (ach.stat === statKey && !data.unlocked[ach.id] && data.stats[statKey] >= ach.target) {
      data.unlocked[ach.id] = true;
      newlyUnlocked.push(ach);
    }
  });

  saveAchievementsData(data);

  newlyUnlocked.forEach((ach, idx) => {
    addGold(ach.rewardGold || 0);
    if (scene) {
      scene.time.delayedCall(idx * 1800, () => showAchievementToast(scene, ach));
    }
  });
}

function isGameFullscreen(scene) {
  return Boolean((scene && scene.scale && scene.scale.isFullscreen) || (typeof document !== 'undefined' && document.fullscreenElement));
}

function updateFullscreenIcons(scene) {
  const frame = isGameFullscreen(scene) ? 1 : 0;
  if (hudFullscreenIcon && hudFullscreenIcon.active) hudFullscreenIcon.setFrame(frame);
  if (menuContainer && menuContainer.updateMenuFullscreen) menuContainer.updateMenuFullscreen();
  if (pauseModal && pauseModal.updateFullscreen) pauseModal.updateFullscreen();
}

function toggleFullscreen(scene) {
  if (!scene || !scene.scale) return;
  try {
    if (scene.scale.isFullscreen) {
      scene.scale.stopFullscreen();
    } else {
      scene.scale.startFullscreen();
    }
  } catch (err) {
    const targetEl = (typeof document !== 'undefined' && document.getElementById('game-container')) || document.documentElement;
    if (typeof document !== 'undefined') {
      if (!document.fullscreenElement && targetEl && targetEl.requestFullscreen) {
        targetEl.requestFullscreen().catch(() => {});
      } else if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }
  scene.time.delayedCall(60, () => {
    if (scene.scale) scene.scale.refresh();
    if (scene.cameras && scene.cameras.main) {
      scene.cameras.main.setViewport(0, 0, GAME_WIDTH, GAME_HEIGHT);
      scene.cameras.main.setRoundPixels(true);
    }
    updateFullscreenIcons(scene);
  });
}

// =============================================================================
// SISTEMA DE ÁUDIO CHIPTUNE (Web Audio API nativa — 100% sintetizado, sem arquivos)
// =============================================================================
const BGM_MELODY = [
  // Compasso 1 (Am) - Marcha heroica do cavaleiro
  440.00, 0, 523.25, 587.33, 659.25, 0, 523.25, 440.00,
  // Compasso 2 (F) - Perigos da floresta
  349.23, 392.00, 440.00, 493.88, 523.25, 0, 493.88, 440.00,
  // Compasso 3 (Dm) - Embate com os inimigos
  587.33, 0, 698.46, 659.25, 587.33, 523.25, 493.88, 392.00,
  // Compasso 4 (E / Am) - Vitória e bravura
  440.00, 493.88, 523.25, 493.88, 415.30, 0, 440.00, 0
];

const BGM_BASS = [
  // Am
  110.00, 110.00, 164.81, 110.00, 110.00, 110.00, 164.81, 110.00,
  // F
  87.31, 87.31, 130.81, 87.31, 87.31, 87.31, 130.81, 87.31,
  // Dm
  73.42, 73.42, 110.00, 73.42, 73.42, 73.42, 110.00, 73.42,
  // E / Am
  82.41, 82.41, 123.47, 82.41, 82.41, 103.83, 110.00, 164.81
];

// Tema Medieval do Menu Principal (Harpa & Alaúde Real em Lá Dórico/Menor)
const MENU_MELODY = [
  // Compasso 1 (Am) - O Reino ao Horizonte
  329.63, 440.00, 523.25, 659.25, 587.33, 523.25, 493.88, 0,
  // Compasso 2 (G / Em) - Brisa nas Montanhas
  392.00, 493.88, 587.33, 493.88, 440.00, 392.00, 329.63, 0,
  // Compasso 3 (F / Dm) - As Três Relíquias Sagradas
  349.23, 440.00, 523.25, 698.46, 659.25, 587.33, 523.25, 493.88,
  // Compasso 4 (E / Am) - O Juramento do Cavaleiro
  440.00, 329.63, 415.30, 493.88, 440.00, 0, 440.00, 0
];

const MENU_BASS = [
  110.00, 0, 164.81, 0, 110.00, 0, 164.81, 0,
  98.00,  0, 146.83, 0, 82.41,  0, 123.47, 0,
  87.31,  0, 130.81, 0, 73.42,  0, 110.00, 0,
  82.41,  0, 123.47, 0, 110.00, 0, 110.00, 0
];

// Tema Tenso da Boss Fight (Golem Ancestral de Pedra — Ré Menor Harmônico / Frígio)
const BOSS_MELODY = [
  // Compasso 1 (Dm) - O Despertar do Colosso
  293.66, 311.13, 293.66, 0, 440.00, 466.16, 440.00, 0,
  // Compasso 2 (Gm / Bb) - Fúria da Terra
  392.00, 440.00, 466.16, 554.37, 587.33, 0, 554.37, 466.16,
  // Compasso 3 (A7) - Ameaça Implacável
  440.00, 349.23, 329.63, 293.66, 329.63, 349.23, 440.00, 554.37,
  // Compasso 4 (Dm) - Esmagamento Sísmico
  587.33, 0, 466.16, 440.00, 349.23, 329.63, 293.66, 0
];

const BOSS_BASS = [
  73.42, 73.42, 110.00, 73.42, 73.42, 77.78, 73.42, 110.00,
  98.00, 98.00, 116.54, 98.00, 98.00, 98.00, 116.54, 98.00,
  82.41, 82.41, 110.00, 82.41, 82.41, 87.31, 110.00, 138.59,
  73.42, 110.00, 73.42, 77.78, 73.42, 65.41, 73.42, 110.00
];

class SoundSystem {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.bgmGain = null;
    this.muted = false;
    this.noiseBuffer = null;
    this.bgmTimer = null;
    this.bgmPlaying = false;
    this.bgmMode = 'battle';
    this.nextStepTime = 0;
    this.currentStep = 0;

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          if (this.ctx && this.ctx.state === 'running') this.ctx.suspend();
        } else {
          if (this.ctx && this.ctx.state === 'suspended' && this.bgmPlaying) this.ctx.resume();
        }
      });

      // Destrava o AudioContext do navegador no primeiro clique ou tecla na tela de menu
      const unlockAudio = () => {
        if (gameState === 'MENU' && !this.bgmPlaying) {
          this.startMenuBGM();
        } else if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      };
      window.addEventListener('pointerdown', unlockAudio);
      window.addEventListener('keydown', unlockAudio);
    }
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return true;
  }

  isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.7, this.ctx.currentTime);
    }
    return this.muted;
  }

  getNoiseBuffer() {
    if (!this.ctx) return null;
    if (!this.noiseBuffer) {
      const len = Math.floor(this.ctx.sampleRate * 0.4);
      const buffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      this.noiseBuffer = buffer;
    }
    return this.noiseBuffer;
  }

  // --- TRILHA SONORA (BGM DE BATALHA, MENU & BOSS FIGHT) ---
  startBGM(mode = 'battle') {
    if (this.bgmPlaying && this.bgmMode === mode) return;
    if (!this.ensureContext()) return;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
    this.bgmMode = mode;
    this.bgmPlaying = true;
    this.currentStep = 0;
    if (this.bgmGain && !this.muted) {
      const vol = mode === 'menu' ? 0.12 : (mode === 'boss' ? 0.16 : 0.14);
      this.bgmGain.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
    this.nextStepTime = this.ctx.currentTime + 0.05;
    this.scheduleBGM();
  }

  startMenuBGM() {
    this.startBGM('menu');
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmGain && this.ctx && !this.muted) {
      this.bgmGain.gain.setValueAtTime(0.14, this.ctx.currentTime);
    }
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  pauseBGM() {
    if (this.bgmGain && this.ctx && !this.muted) {
      this.bgmGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    }
  }

  resumeBGM() {
    if (this.bgmGain && this.ctx && !this.muted) {
      const vol = this.bgmMode === 'boss' ? 0.16 : 0.14;
      this.bgmGain.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  scheduleBGM() {
    if (!this.bgmPlaying || !this.ctx) return;
    if (this.nextStepTime < this.ctx.currentTime) {
      this.nextStepTime = this.ctx.currentTime + 0.05;
    }
    const lookahead = 0.25;
    const stepDur = this.bgmMode === 'menu' ? 0.34 : (this.bgmMode === 'boss' ? 0.175 : 0.23);

    while (this.nextStepTime < this.ctx.currentTime + lookahead) {
      this.playBGMStep(this.currentStep, this.nextStepTime, stepDur);
      this.nextStepTime += stepDur;
      this.currentStep = (this.currentStep + 1) % 32;
    }

    this.bgmTimer = setTimeout(() => this.scheduleBGM(), 50);
  }

  playBGMStep(step, time, dur) {
    if (this.muted) return;
    const isMenu = this.bgmMode === 'menu';
    const isBoss = this.bgmMode === 'boss';
    const melodyArr = isMenu ? MENU_MELODY : (isBoss ? BOSS_MELODY : BGM_MELODY);
    const bassArr = isMenu ? MENU_BASS : (isBoss ? BOSS_BASS : BGM_BASS);

    // 1. Melodia (harpa no menu; square agressivo no Boss; triangle heróico na batalha)
    const note = melodyArr[step];
    if (note > 0) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      osc.type = isBoss ? 'square' : 'triangle';
      osc.frequency.setValueAtTime(note, time);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isMenu ? 1700 : (isBoss ? 1900 : 2200), time);
      const noteDur = isMenu ? dur * 1.45 : dur * 0.9;
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(isMenu ? 0.28 : (isBoss ? 0.24 : 0.32), time + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, time + noteDur);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.bgmGain);
      osc.start(time);
      osc.stop(time + noteDur + 0.02);
    }

    // 2. Baixo (bordão de alaúde no menu; sawtooth pesado no combate e Boss)
    const bass = bassArr[step];
    if (bass > 0) {
      const bOsc = this.ctx.createOscillator();
      const bGain = this.ctx.createGain();
      const bFilter = this.ctx.createBiquadFilter();
      bOsc.type = isMenu ? 'sine' : 'sawtooth';
      bOsc.frequency.setValueAtTime(bass, time);
      bFilter.type = 'lowpass';
      bFilter.frequency.setValueAtTime(isMenu ? 320 : (isBoss ? 520 : 400), time);
      const bassDur = isMenu ? dur * 1.7 : dur * 0.85;
      bGain.gain.setValueAtTime(0.001, time);
      bGain.gain.linearRampToValueAtTime(isMenu ? 0.30 : (isBoss ? 0.34 : 0.28), time + 0.012);
      bGain.gain.exponentialRampToValueAtTime(0.001, time + bassDur);
      bOsc.connect(bFilter);
      bFilter.connect(bGain);
      bGain.connect(this.bgmGain);
      bOsc.start(time);
      bOsc.stop(time + bassDur + 0.02);
    }

    // 3. Percussão retrô (intensa na Boss Fight; marcha durante o combate normal)
    if (!isMenu) {
      if (step % 4 === 0 || (isBoss && step % 4 === 1)) {
        const kick = this.ctx.createOscillator();
        const kGain = this.ctx.createGain();
        kick.type = 'sine';
        kick.frequency.setValueAtTime(isBoss ? 125 : 110, time);
        kick.frequency.exponentialRampToValueAtTime(28, time + 0.075);
        kGain.gain.setValueAtTime(isBoss ? 0.36 : 0.3, time);
        kGain.gain.exponentialRampToValueAtTime(0.001, time + 0.075);
        kick.connect(kGain);
        kGain.connect(this.bgmGain);
        kick.start(time);
        kick.stop(time + 0.075);
      } else if (step % 4 === 2) {
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.getNoiseBuffer();
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(isBoss ? 1100 : 1400, time);
        filter.Q.setValueAtTime(1.8, time);
        const sGain = this.ctx.createGain();
        sGain.gain.setValueAtTime(isBoss ? 0.22 : 0.16, time);
        sGain.gain.exponentialRampToValueAtTime(0.001, time + 0.065);
        noise.connect(filter);
        filter.connect(sGain);
        sGain.connect(this.bgmGain);
        noise.start(time);
        noise.stop(time + 0.065);
      }
    }
  }

  // --- EFEITOS SONOROS (SFX) ---

  // Estrondo sísmico de impacto do Golem de Pedra (rocha batendo no chão / Soco Colossal)
  playEarthSmash() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(24, now + 0.32);
    gain.gain.setValueAtTime(0.48, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.32);

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(520, now);
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.45, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(this.sfxGain);
    noise.start(now);
    noise.stop(now + 0.28);
  }

  // Disparo de flecha pelo jogador (corda do arco vibrando + silvo)
  playBow() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.1);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.1);

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.Q.setValueAtTime(3, now);
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.25, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(this.sfxGain);
    noise.start(now);
    noise.stop(now + 0.08);
  }

  // Flecha mágica dos elfos (assobio místico)
  playElfShot() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.14);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  // Golpe de espada (corte sibilante + ressonância metálica da lâmina)
  playSword() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2600, now);
    filter.frequency.exponentialRampToValueAtTime(450, now + 0.12);
    filter.Q.setValueAtTime(2, now);
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.5, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(this.sfxGain);
    noise.start(now);
    noise.stop(now + 0.12);

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(780, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.11);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.11);
  }

  // Morte/acerto em inimigo (impacto retrô com crunch)
  playEnemyHit() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.12);

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, now);
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.35, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(this.sfxGain);
    noise.start(now);
    noise.stop(now + 0.08);
  }

  // Bloqueio do escudo / desvio de golpe (impacto metálico ressonante "CLANG!")
  playShieldBlock() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    [520, 1080].forEach(f => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.32);
    });

    const click = this.ctx.createOscillator();
    const cGain = this.ctx.createGain();
    click.type = 'square';
    click.frequency.setValueAtTime(1400, now);
    click.frequency.exponentialRampToValueAtTime(180, now + 0.04);
    cGain.gain.setValueAtTime(0.4, now);
    cGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    click.connect(cGain);
    cGain.connect(this.sfxGain);
    click.start(now);
    click.stop(now + 0.04);
  }

  // Coleta de item (arpeggio ascendente brilhante de conquista)
  playItemCollect() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const notes = [659.25, 830.61, 987.77, 1318.51]; // Mi5, Sol#5, Si5, Mi6
    notes.forEach((freq, i) => {
      const t = now + i * 0.045;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.14);
    });
  }

  // Flecha bate em tronco de árvore (som sordo de madeira)
  playWoodHit() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.06);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  // O Cavaleiro tombou (Game Over dramático com notas menores descendentes e baque)
  playGameOver() {
    if (this.muted || !this.ensureContext()) return;
    this.stopBGM();
    const now = this.ctx.currentTime;
    const notes = [293.66, 261.63, 233.08, 220.00]; // Ré4, Dó4, Sib3, Lá3
    notes.forEach((freq, i) => {
      const t = now + i * 0.16;
      const dur = i === notes.length - 1 ? 0.6 : 0.18;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, t);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);
    });

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, now);
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.45, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(this.sfxGain);
    noise.start(now);
    noise.stop(now + 0.5);
  }

  // Clique de confirmação na interface
  playButtonClick() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1050, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.04);
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Tilintar cristalino de moeda (Si5 -> Mi6)
  playCoin() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    [987.77, 1318.51].forEach((freq, i) => {
      const t = now + i * 0.055;
      const dur = i === 0 ? 0.06 : 0.18;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.24, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);
    });
  }

  // Upgrade forjado na Loja (acorde triunfante)
  playPowerup() {
    this.playItemCollect();
  }

  // Coleta de Orbe de XP (cristal místico suave)
  playXpOrb() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(740, now);
    osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.07);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Fanfarra de Level Up (harpa ascendente em Ré Maior / Lá Maior)
  playLevelUp() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const notes = [587.33, 739.99, 880.00, 1174.66]; // Ré5, Fá#5, Lá5, Ré6
    notes.forEach((freq, i) => {
      const t = now + i * 0.06;
      const dur = i === notes.length - 1 ? 0.28 : 0.14;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.30, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);
    });
  }

  // Trombeta Real de Conquista Desbloqueada (Achievement)
  playAchievement() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // Dó5, Mi5, Sol5, Dó6
    notes.forEach((freq, i) => {
      const t = now + i * 0.075;
      const dur = i === notes.length - 1 ? 0.36 : 0.14;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);
    });
  }

  // Impacto de dano quando o Cavaleiro perde 1 Coração (mas ainda sobrevive!)
  playPlayerHurt() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(95, now + 0.18);
    gain.gain.setValueAtTime(0.32, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.18);
  }
}

const sound = new SoundSystem();

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
  r(C.red, 6, 1, 3, 1); r(C.red, 5, 2, 4, 1);             // pluma real
  r(C.steel, 4, 3, 6, 4); r(C.steelLight, 5, 3, 2, 1);   // elmo polido
  r(C.outline, 7, 5, 3, 1);                              // viseira
  r(C.steel, 3, 7, 8, 5);                                // peitoral de aço
  r(C.blue, 5, 7, 5, 5);                                 // tabardo azul real
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
  r(C.darkRed, 3, 8, 2, 7);                              // capa carmesim
  r(C.bone, 3, 1, 1, 3); r(C.bone, 4, 3, 1, 1);          // chifre esquerdo
  r(C.bone, 13, 1, 1, 3); r(C.bone, 12, 3, 1, 1);        // chifre direito
  r(C.iron, 5, 2, 7, 6); r(C.steelDark, 6, 2, 4, 1);     // elmo pesado
  r(C.outline, 7, 5, 5, 1); r(C.eye, 8, 5, 1, 1); r(C.eye, 10, 5, 1, 1); // olhos vermelhos
  r(C.iron, 5, 8, 8, 6);                                 // armadura
  r(C.steelDark, 4, 8, 3, 2); r(C.steelDark, 11, 8, 3, 2); // ombreiras
  r(C.red, 8, 10, 2, 2); r(C.ironDark, 5, 13, 8, 1);     // brasão e cinto
  r(C.steelLight, 14, 2, 1, 9); r(C.gold, 13, 11, 3, 1); r(C.woodDark, 14, 12, 1, 2); // espada larga
  r(C.ironDark, 12, 10, 2, 2);                           // manopla
  const leg = (x, up) => r(C.ironDark, x, 14, 2, up ? 1 : 2);
  leg(6, f === 0); leg(10, f === 1);
}

function drawElf(r, f) {
  r(C.elfCloak, 3, 6, 2, 6);                             // capa florestal
  r(C.elfHair, 4, 1, 6, 3); r(C.elfHair, 3, 3, 2, 4);    // cabelo dourado
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

// Novo Inimigo Bullet-Hell 1: Gárgula Alada de Sangue (32x32 — 2 frames batendo asas, voo senoidal)
function drawGargoyle(r, f) {
  // Asas de morcego/gárgula batendo (Frame 0: erguidas, Frame 1: abertas para baixo)
  if (f === 0) {
    r(C.ironDark, 2, 2, 4, 6); r(C.darkRed, 3, 3, 3, 4);
    r(C.ironDark, 10, 2, 4, 6); r(C.darkRed, 10, 3, 3, 4);
  } else {
    r(C.ironDark, 1, 6, 5, 5); r(C.darkRed, 2, 7, 3, 3);
    r(C.ironDark, 10, 6, 5, 5); r(C.darkRed, 11, 7, 3, 3);
  }
  // Chifres e cabeça pétrea demoníaca
  r(C.bone, 5, 1, 1, 2); r(C.bone, 10, 1, 1, 2);
  r(C.iron, 5, 3, 6, 4);
  r(C.yellow, 6, 4, 1, 1); r(C.yellow, 9, 4, 1, 1);
  r(C.red, 7, 6, 2, 1);
  // Torso blindado e garras
  r(C.ironDark, 5, 7, 6, 4);
  r(C.red, 6, 8, 4, 2);
  r(C.iron, 5, 11, 2, 2); r(C.iron, 9, 11, 2, 2);
  r(C.bone, 5, 13, 1, 1); r(C.bone, 10, 13, 1, 1);
}

// Novo Inimigo Bullet-Hell 2: Mago Sombrio / Necromante (32x32 — dispara 3 orbes em leque)
function drawDarkMage(r, f) {
  // Capuz e manto arcano púrpura-abissal
  r(0x4a148c, 5, 1, 5, 3);
  r(0x4a148c, 4, 3, 7, 4);
  r(C.outline, 6, 4, 4, 3); // rosto oculto na sombra do capuz
  r(C.cyan, 7, 5, 1, 1); r(C.cyan, 9, 5, 1, 1); // olhos arcanos brilhantes

  // Túnica longa com runas douradas
  r(0x311b92, 4, 7, 7, 6);
  r(C.purple, 5, 8, 5, 4);
  r(C.gold, 4, 10, 7, 1);
  r(C.gold, 7, 8, 1, 5);

  // Cajado rúnico com cristal pulsante na ponta
  const staffY = f === 0 ? 0 : 1;
  r(C.woodDark, 12, 4 + staffY, 1, 10);
  r(C.gold, 11, 3 + staffY, 3, 1);
  r(C.purple, 11, 1 + staffY, 3, 2);
  r(C.cyan, 12, 1 + staffY, 1, 1);

  // Pés sob o manto
  r(C.boot, 5, 13, 2, 2);
  r(C.boot, 8, 13, 2, 2);
}

function drawTree(r) {
  r(C.woodDark, 10, 19, 4, 11); r(C.wood, 10, 19, 1, 11); r(C.woodDark, 8, 29, 8, 1); // tronco
  r(C.leafDark, 5, 2, 14, 3); r(C.leafDark, 3, 5, 18, 16); r(C.leafDark, 2, 8, 20, 10); // copa
  r(C.leaf, 6, 3, 12, 13); r(C.leaf, 4, 6, 16, 10); r(C.leaf, 3, 9, 18, 6);
  r(C.leafLight, 7, 4, 5, 2); r(C.leafLight, 5, 7, 3, 2); r(C.leafLight, 14, 6, 3, 2); // brilhos
}

function drawRock(r, f) {
  r(C.ironDark, 4, 10, 8, 1);
  r(C.ironDark, 3, 9, 10, 1);
  r(C.ironDark, 2, 7, 12, 2);
  r(C.iron, 2, 4, 12, 3);
  r(C.iron, 1, 5, 1, 3);
  r(C.iron, 14, 5, 1, 3);
  r(C.steelDark, 3, 2, 10, 3);
  r(C.steelDark, 2, 3, 1, 2);
  r(C.steelDark, 13, 3, 1, 2);
  r(C.steel, 4, 1, 8, 2);
  r(C.steelLight, 6, 1, 4, 1);
  r(C.white, 7, 2, 2, 1);
  r(C.ironDark, 6, 4, 1, 3);
  r(C.ironDark, 7, 6, 2, 1);
  r(C.ironDark, 11, 6, 1, 2);

  if (f === 1) {
    r(C.leafDark, 2, 3, 3, 2);
    r(C.leaf, 3, 3, 2, 2);
    r(C.leafLight, 3, 2, 1, 1);
    r(C.leafDark, 9, 2, 4, 2);
    r(C.leaf, 10, 2, 3, 1);
    r(C.leafLight, 11, 1, 2, 1);
    r(C.leafDark, 1, 6, 2, 2);
    r(C.leaf, 1, 7, 1, 1);
    r(C.leafDark, 13, 6, 2, 2);
    r(C.leaf, 13, 7, 1, 1);
  }
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

// Nova Arma 1: Ícone e Projétil do Machado Bumerangue
function drawAxeIcon(r) {
  r(C.woodDark, 4, 2, 1, 8); r(C.gold, 4, 1, 1, 1); r(C.gold, 4, 9, 1, 1); // cabo
  r(C.steelLight, 1, 2, 3, 5); r(C.steel, 2, 3, 2, 3);                     // lâmina esquerda
  r(C.steelLight, 5, 2, 3, 5); r(C.steel, 5, 3, 2, 3);                     // lâmina direita
  r(C.cyan, 4, 4, 1, 2);                                                   // runa central
}

function drawAxeProj(r) {
  r(C.woodDark, 5, 2, 2, 8); r(C.gold, 5, 5, 2, 2);
  r(C.steelLight, 1, 2, 4, 6); r(C.steel, 2, 3, 3, 4);
  r(C.steelLight, 7, 2, 4, 6); r(C.steel, 7, 3, 3, 4);
  r(C.cyan, 5, 4, 2, 3);
}

// Nova Arma 2: Ícone e Projétil do Cajado de Fogo Arcano
function drawFireStaffIcon(r) {
  r(C.woodDark, 4, 4, 1, 7); r(C.gold, 3, 3, 3, 2);                        // haste e garras de ouro
  r(C.red, 3, 1, 3, 3); r(C.yellow, 4, 1, 1, 2); r(C.white, 4, 2, 1, 1);   // orbe solar flamejante
}

function drawFireballProj(r) {
  r(C.darkRed, 1, 2, 4, 3);
  r(C.red, 3, 1, 6, 5);
  r(C.gold, 5, 2, 4, 3);
  r(C.yellow, 7, 2, 3, 3);
  r(C.white, 8, 3, 2, 1);
}

// Orbe Arcano do Mago Sombrio (Bullet-Hell)
function drawMageOrb(r) {
  r(0x4a148c, 1, 1, 6, 6);
  r(C.purple, 2, 2, 4, 4);
  r(C.cyan, 3, 2, 2, 4);
  r(C.white, 3, 3, 2, 2);
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

// Ícones de Pixel Art para o HUD
function drawHourglass(r) {
  r(C.woodDark, 1, 1, 8, 1); r(C.wood, 2, 2, 6, 1);
  r(C.woodDark, 1, 11, 8, 1); r(C.wood, 2, 10, 6, 1);
  r(C.cyan, 2, 3, 6, 2);
  r(C.cyan, 3, 5, 4, 2);
  r(C.cyan, 2, 7, 6, 3);
  r(C.gold, 3, 3, 4, 1);
  r(C.yellow, 4, 4, 2, 3);
  r(C.gold, 3, 8, 4, 2);
  r(C.white, 2, 3, 1, 1); r(C.white, 2, 9, 1, 1);
}

function drawCrown(r) {
  r(C.gold, 1, 6, 9, 2);
  r(C.woodDark, 1, 8, 9, 1);
  r(C.gold, 1, 3, 1, 3);
  r(C.gold, 3, 2, 1, 4);
  r(C.gold, 5, 1, 1, 5);
  r(C.gold, 7, 2, 1, 4);
  r(C.gold, 9, 3, 1, 3);
  r(C.gold, 2, 5, 7, 1);
  r(C.red, 5, 3, 1, 1);
  r(C.blue, 3, 4, 1, 1);
  r(C.blue, 7, 4, 1, 1);
  r(C.white, 5, 1, 1, 1);
}

function drawHorn(r, f) {
  r(C.gold, 1, 3, 2, 2);
  r(C.gold, 3, 2, 3, 4);
  r(C.gold, 6, 1, 3, 6);
  r(C.gold, 9, 1, 2, 7);
  r(C.woodDark, 10, 2, 1, 5);
  if (f === 0) {
    r(C.cyan, 12, 1, 1, 2);
    r(C.cyan, 13, 3, 1, 2);
    r(C.cyan, 12, 5, 1, 2);
  } else {
    r(C.red, 2, 1, 2, 2); r(C.red, 4, 3, 2, 2);
    r(C.red, 6, 5, 2, 2); r(C.red, 8, 6, 2, 2);
  }
}

// Cavaleiro Heróico para a Capa (equipado com Arco Real nas costas, Escudo de Aço e Espada Vorpal)
function drawKnightBanner(r) {
  r(C.wood, 4, 3, 2, 1); r(C.wood, 3, 4, 1, 5); r(C.gold, 4, 2, 1, 1);
  r(C.white, 5, 4, 1, 5);
  r(C.woodDark, 6, 5, 2, 4); r(C.red, 6, 3, 1, 2); r(C.red, 8, 4, 1, 1);

  r(C.red, 10, 1, 5, 2); r(C.red, 9, 2, 6, 2); r(C.darkRed, 14, 3, 3, 2);
  r(C.steel, 9, 4, 7, 6); r(C.steelLight, 10, 4, 3, 2);
  r(C.steelDark, 9, 9, 7, 1);
  r(C.outline, 11, 7, 4, 1); r(C.outline, 12, 8, 2, 2);

  r(C.darkRed, 4, 10, 5, 14); r(C.red, 5, 12, 4, 10);
  r(C.steel, 6, 10, 4, 3); r(C.steelLight, 7, 10, 2, 1);
  r(C.steel, 15, 10, 4, 3); r(C.steelLight, 16, 10, 2, 1);
  r(C.steel, 9, 10, 7, 8);
  r(C.blue, 10, 10, 5, 8);
  r(C.gold, 12, 11, 1, 6); r(C.gold, 11, 13, 3, 1);
  r(C.woodDark, 9, 17, 7, 2); r(C.gold, 12, 17, 1, 2);

  r(C.steelDark, 6, 13, 3, 4); r(C.steel, 6, 17, 3, 2);
  r(C.steelDark, 16, 13, 3, 4); r(C.steel, 16, 17, 3, 2);

  r(C.gold, 2, 12, 6, 6); r(C.gold, 3, 18, 4, 2);
  r(C.blue, 3, 13, 4, 5); r(C.blue, 4, 18, 2, 1);
  r(C.white, 4, 13, 2, 5); r(C.cyan, 3, 15, 4, 1);

  r(C.steelLight, 19, 3, 2, 16); r(C.cyan, 19, 3, 1, 14); r(C.steel, 20, 4, 1, 15);
  r(C.gold, 17, 10, 6, 2);
  r(C.woodDark, 19, 8, 2, 2);
  r(C.gold, 19, 7, 2, 1);

  r(C.steelDark, 9, 19, 3, 6); r(C.steelLight, 9, 20, 1, 3);
  r(C.steelDark, 13, 19, 3, 6); r(C.steelLight, 13, 20, 1, 3);
  r(C.woodDark, 8, 24, 4, 2); r(C.woodDark, 13, 24, 4, 2);
}

// Boss 1: Golem Ancestral de Pedra (88x88 — Colosso Titânico em Pixel Art 16-bit com olhos vermelhos)
function drawBossGolem(r, f) {
  // Grade 44x44 (margem de segurança 1..42 para nunca cortar o outline)
  r(C.outline, 3, 7, 38, 13);
  r(C.ironDark, 4, 8, 36, 12);
  r(C.iron, 6, 7, 32, 10);
  r(C.steelDark, 8, 6, 28, 8);
  r(C.steel, 10, 6, 24, 3);

  r(C.outline, 2, 6, 5, 7);
  r(C.ironDark, 2, 7, 5, 6);
  r(C.steelDark, 3, 6, 3, 4);
  r(C.steelLight, 4, 6, 1, 3);

  r(C.outline, 37, 6, 5, 7);
  r(C.ironDark, 37, 7, 5, 6);
  r(C.steelDark, 38, 6, 3, 4);
  r(C.steel, 39, 6, 1, 3);

  r(C.outline, 9, 9, 1, 4); r(C.outline, 10, 12, 2, 1);
  r(C.outline, 34, 9, 1, 4); r(C.outline, 32, 12, 2, 1);

  r(C.outline, 13, 2, 18, 14);
  r(C.ironDark, 14, 3, 16, 13);
  r(C.iron, 15, 4, 14, 11);
  r(C.steelDark, 16, 3, 12, 3);
  r(C.steelLight, 17, 3, 8, 1);

  r(C.outline, 22, 3, 1, 3); r(C.outline, 23, 5, 1, 2);

  r(C.outline, 15, 6, 6, 3);
  r(C.ironDark, 14, 5, 6, 2);
  r(C.ironDark, 19, 7, 2, 2);

  r(C.outline, 23, 6, 6, 3);
  r(C.ironDark, 24, 5, 6, 2);
  r(C.ironDark, 23, 7, 2, 2);

  // Olhos vermelhos incandescentes
  r(C.darkRed, 16, 9, 4, 2);
  r(C.red, 16, 8, 4, 2);
  r(0xff1744, 17, 8, 3, 2);
  r(0xff5252, 18, 8, 2, 1);
  r(0xff8a80, 18, 8, 1, 1);

  r(C.darkRed, 24, 9, 4, 2);
  r(C.red, 24, 8, 4, 2);
  r(0xff1744, 24, 8, 3, 2);
  r(0xff5252, 24, 8, 2, 1);
  r(0xff8a80, 25, 8, 1, 1);

  r(C.ironDark, 21, 8, 2, 3);
  r(C.steelDark, 15, 10, 2, 2);
  r(C.steelDark, 27, 10, 2, 2);

  r(C.outline, 16, 12, 12, 3);
  r(C.darkRed, 18, 13, 8, 1);
  r(C.steel, 17, 12, 1, 1);
  r(C.steel, 20, 12, 1, 1);
  r(C.steel, 23, 12, 1, 1);
  r(C.steel, 26, 12, 1, 1);
  r(C.ironDark, 15, 14, 14, 2);
  r(C.steelDark, 17, 15, 10, 1);

  // Musgo ancestral (dentro da margem y >= 1)
  r(C.leafDark, 16, 1, 12, 3);
  r(C.leaf, 17, 1, 9, 2);
  r(C.leafLight, 19, 1, 5, 1);

  r(C.leafDark, 4, 5, 8, 4);
  r(C.leaf, 5, 4, 6, 3);
  r(C.leafLight, 6, 3, 4, 2);
  r(C.leafDark, 3, 9, 3, 3);
  r(C.leaf, 4, 9, 2, 2);
  r(C.leafDark, 8, 9, 2, 3);

  r(C.leafDark, 32, 5, 8, 4);
  r(C.leaf, 33, 4, 6, 3);
  r(C.leafLight, 34, 3, 4, 2);
  r(C.leafDark, 38, 9, 3, 3);
  r(C.leaf, 38, 9, 2, 2);
  r(C.leafDark, 34, 9, 2, 3);

  // Torso blindado e núcleo rúnico vermelho
  r(C.outline, 8, 16, 28, 14);
  r(C.ironDark, 9, 16, 26, 13);
  r(C.iron, 11, 17, 22, 11);
  r(C.steelDark, 12, 17, 20, 5);
  r(C.steel, 13, 17, 7, 2);
  r(C.steel, 24, 17, 7, 2);

  r(C.outline, 21, 16, 2, 12);
  r(C.outline, 11, 22, 7, 1);
  r(C.outline, 26, 22, 7, 1);

  r(C.outline, 18, 19, 8, 8);
  r(C.darkRed, 19, 20, 6, 6);
  r(C.red, 20, 20, 4, 6);
  r(C.red, 19, 21, 6, 4);
  r(0xff1744, 20, 21, 4, 4);
  r(0xff5252, 21, 22, 2, 2);
  r(0xff8a80, 21, 22, 1, 1);

  r(C.darkRed, 17, 19, 2, 1); r(C.red, 15, 18, 2, 1);
  r(C.darkRed, 25, 19, 2, 1); r(C.red, 27, 18, 2, 1);
  r(C.darkRed, 17, 25, 2, 1); r(C.darkRed, 25, 25, 2, 1);

  r(C.outline, 11, 28, 22, 5);
  r(C.ironDark, 12, 28, 20, 5);
  r(C.iron, 14, 29, 16, 3);
  r(C.steelDark, 16, 29, 4, 2); r(C.steelDark, 24, 29, 4, 2);
  r(C.outline, 21, 28, 2, 4);

  const armBob = f === 0 ? 0 : -2;

  // Braço e Punho Esquerdo (dentro da margem x >= 1)
  r(C.outline, 2, 15 + armBob, 9, 13);
  r(C.ironDark, 2, 16 + armBob, 9, 12);
  r(C.iron, 3, 17 + armBob, 7, 10);
  r(C.steelDark, 4, 18 + armBob, 5, 8);
  r(C.steel, 4, 18 + armBob, 3, 3);
  r(C.leafDark, 2, 20 + armBob, 3, 3);
  r(C.leaf, 2, 21 + armBob, 3, 2);

  r(C.outline, 1, 27 + armBob, 12, 12);
  r(C.ironDark, 2, 28 + armBob, 10, 10);
  r(C.iron, 2, 29 + armBob, 9, 8);
  r(C.steelDark, 3, 29 + armBob, 7, 5);
  r(C.steelLight, 3, 30 + armBob, 3, 2);
  r(C.outline, 2, 34 + armBob, 9, 1);
  r(C.steel, 2, 36 + armBob, 2, 2);
  r(C.steel, 5, 36 + armBob, 2, 2);
  r(C.steel, 8, 36 + armBob, 2, 2);

  // Braço e Punho Direito (dentro da margem x + w <= 43)
  r(C.outline, 33, 15 - armBob, 9, 13);
  r(C.ironDark, 33, 16 - armBob, 9, 12);
  r(C.iron, 34, 17 - armBob, 7, 10);
  r(C.steelDark, 35, 18 - armBob, 5, 8);
  r(C.leafDark, 39, 20 - armBob, 3, 3);
  r(C.leaf, 39, 21 - armBob, 3, 2);

  r(C.outline, 31, 27 - armBob, 12, 12);
  r(C.ironDark, 32, 28 - armBob, 10, 10);
  r(C.iron, 33, 29 - armBob, 9, 8);
  r(C.steelDark, 34, 29 - armBob, 7, 5);
  r(C.outline, 33, 34 - armBob, 9, 1);
  r(C.steel, 34, 36 - armBob, 2, 2);
  r(C.steel, 37, 36 - armBob, 2, 2);
  r(C.steel, 40, 36 - armBob, 2, 2);

  const legStepL = f === 0 ? 0 : 2;
  const legStepR = f === 1 ? 0 : 2;

  r(C.outline, 12, 32, 9, 8 + legStepL);
  r(C.ironDark, 13, 32, 7, 8 + legStepL);
  r(C.iron, 14, 33, 5, 6 + legStepL);
  r(C.steelDark, 15, 34, 3, 4 + legStepL);
  r(C.outline, 10, 38 + legStepL, 11, 3);
  r(C.ironDark, 11, 39 + legStepL, 9, 2);
  r(C.steelDark, 12, 39 + legStepL, 7, 1);

  r(C.outline, 23, 32, 9, 8 + legStepR);
  r(C.ironDark, 24, 32, 7, 8 + legStepR);
  r(C.iron, 25, 33, 5, 6 + legStepR);
  r(C.steelDark, 26, 34, 3, 4 + legStepR);
  r(C.outline, 23, 38 + legStepR, 11, 3);
  r(C.ironDark, 24, 39 + legStepR, 9, 2);
  r(C.steelDark, 25, 39 + legStepR, 7, 1);
}

// Mini Golem de Pedra ("Filhotinhos" do Boss — 28x28, com olhos vermelhos e margem limpa)
function drawMiniGolem(r, f) {
  r(C.leafDark, 5, 1, 4, 2); r(C.leaf, 6, 1, 2, 1); r(C.leafLight, 6, 2, 1, 1);
  r(C.ironDark, 3, 2, 8, 2);
  r(C.ironDark, 2, 4, 10, 6);
  r(C.iron, 3, 3, 8, 7);
  r(C.steelDark, 4, 3, 6, 3);

  r(C.outline, 3, 4, 3, 1); r(C.outline, 8, 4, 3, 1);
  r(C.red, 4, 5, 2, 2); r(0xff5252, 4, 5, 1, 1);
  r(C.red, 8, 5, 2, 2); r(0xff5252, 9, 5, 1, 1);
  r(C.outline, 5, 8, 4, 1);
  r(C.darkRed, 6, 9, 2, 1);

  const armOff = f === 0 ? 0 : 1;
  r(C.steelDark, 1, 6 + armOff, 2, 3);
  r(C.steelDark, 11, 7 - armOff, 2, 3);

  const legL = f === 0 ? 1 : 2;
  const legR = f === 1 ? 1 : 2;
  r(C.ironDark, 3, 10, 3, legL); r(C.steelDark, 3, 10 + legL, 3, 1);
  r(C.ironDark, 8, 10, 3, legR); r(C.steelDark, 8, 10 + legR, 3, 1);
}

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

  // Chão craquelado / rachado pelo impacto das rochas arremessadas pelo Boss Golem
  g.clear();
  g.fillStyle(0x3a2818, 0.78).fillEllipse(28, 20, 52, 26);
  g.fillStyle(0x22160d, 0.92).fillEllipse(28, 20, 40, 18);
  g.fillStyle(0x140d07, 1);
  g.fillRect(26, 18, 3, 3).fillRect(22, 14, 4, 2).fillRect(17, 11, 5, 2).fillRect(12, 9, 5, 1);
  g.fillRect(29, 17, 4, 3).fillRect(33, 13, 5, 2).fillRect(38, 11, 4, 2).fillRect(42, 8, 5, 1);
  g.fillRect(25, 21, 3, 4).fillRect(20, 24, 5, 2).fillRect(14, 26, 6, 2).fillRect(9, 27, 5, 1);
  g.fillRect(30, 21, 4, 3).fillRect(34, 23, 6, 2).fillRect(40, 25, 5, 2).fillRect(45, 26, 4, 1);
  g.fillStyle(C.ironDark).fillRect(10, 15, 3, 2).fillRect(42, 17, 3, 2).fillRect(24, 7, 2, 2).fillRect(32, 29, 3, 2);
  g.fillStyle(C.steelDark).fillRect(11, 15, 1, 1).fillRect(43, 17, 1, 1).fillRect(33, 29, 1, 1);
  g.generateTexture('cracked_ground', 56, 40);

  // Piso e Praça Unificada da Vila ("village_plaza" 480x440 — conecta pátios, caminho calçado e muralha)
  g.clear();
  g.fillStyle(0x4a7331, 1).fillRect(0, 0, 468, 440);
  g.fillStyle(0x7d6340, 0.95).fillRoundedRect(14, 18, 424, 148, 12);
  g.fillStyle(0x7d6340, 0.95).fillRoundedRect(14, 274, 424, 148, 12);
  g.fillStyle(0x525763, 0.92).fillRoundedRect(26, 28, 396, 130, 8);
  g.fillStyle(0x525763, 0.92).fillRoundedRect(26, 282, 396, 130, 8);
  for (let px = 34; px < 410; px += 22) {
    for (let py = 36; py < 150; py += 16) {
      g.fillStyle((px + py) % 4 === 0 ? 0x676d7a : 0x3f444f, 0.9).fillRect(px, py, 18, 12);
    }
    for (let py = 290; py < 404; py += 16) {
      g.fillStyle((px + py) % 4 === 0 ? 0x676d7a : 0x3f444f, 0.9).fillRect(px, py, 18, 12);
    }
  }
  g.fillStyle(0x3a2818, 1).fillRect(0, 172, 472, 96);
  g.fillStyle(0x525763, 1).fillRect(0, 178, 470, 84);
  for (let cx = 0; cx < 466; cx += 18) {
    g.fillStyle(cx % 36 === 0 ? C.steel : C.iron, 1).fillRect(cx, 174, 16, 6).fillRect(cx, 260, 16, 6);
  }
  for (let rx = 4; rx < 462; rx += 16) {
    for (let ry = 184; ry < 252; ry += 14) {
      const off = (ry % 28 === 0) ? 6 : 0;
      g.fillStyle((rx + ry) % 3 === 0 ? 0x7b8291 : 0x626875, 1).fillRoundedRect(rx + off, ry, 13, 10, 3);
      g.fillStyle(0x8e96a6, 0.6).fillRect(rx + off + 2, ry + 2, 7, 2);
    }
  }
  [115, 295].forEach(wx => {
    g.fillStyle(0x676d7a, 1).fillRect(wx - 22, 152, 44, 24).fillRect(wx - 22, 264, 44, 24);
  });
  [75, 225, 375].forEach(lx => {
    g.fillStyle(0x2f6e35, 1).fillRoundedRect(lx - 18, 158, 36, 12, 4).fillRoundedRect(lx - 18, 270, 36, 12, 4);
    g.fillStyle(0xffca28, 0.95).fillRect(lx - 10, 162, 4, 4).fillRect(lx + 6, 274, 4, 4);
    g.fillStyle(0xff5252, 0.95).fillRect(lx + 4, 161, 4, 4).fillRect(lx - 8, 273, 4, 4);
    g.fillStyle(0xffca28, 0.16).fillCircle(lx, 174, 28).fillCircle(lx, 266, 28);
  });
  g.fillStyle(C.woodDark, 1).fillRect(442, 4, 28, 170).fillRect(442, 266, 28, 170);
  g.fillStyle(C.ironDark, 1).fillRect(446, 6, 20, 166).fillRect(446, 268, 20, 166);
  g.fillStyle(0x2a1d17, 1).fillRect(440, 174, 34, 92);
  g.fillStyle(C.gold, 0.85).fillRect(444, 176, 4, 88).fillRect(466, 176, 4, 88);
  g.generateTexture('village_plaza', 480, 440);

  // Faísca usada nas explosões de partículas
  g.clear().fillStyle(C.white).fillRect(0, 0, 4, 4);
  g.generateTexture('spark', 4, 4);
  g.destroy();
}

// 1. Casa do Ferreiro da Vila (112x84 pixels — matriz 56x42 a escala 2x: Telhado Sólido, Forja, Bigorna e Armas)
function drawVillageBlacksmith(r) {
  // Base de pedra sólida e paredes inteiriças (preenchimento total sem vãos)
  r(C.ironDark, 5, 17, 46, 23);
  r(C.iron, 7, 18, 42, 21);
  r(C.steelDark, 8, 19, 40, 3);
  r(C.ironDark, 4, 38, 48, 2);

  // Chaminé robusta de pedra à esquerda (integrada ao telhado)
  r(C.ironDark, 7, 2, 7, 15);
  r(C.iron, 8, 3, 5, 13);
  r(C.steelDark, 7, 2, 7, 2);
  r(C.steelLight, 9, 1, 3, 1);

  // Telhado Cerâmico Sólido e Simétrico (cume estreito em y=4, base larga em y=16, h=2 para zero frestas!)
  for (let row = 0; row <= 12; row++) {
    const y = 4 + row;
    const w = 24 + row * 2;
    const x = 28 - w / 2;
    r(C.woodDark, x, y, w, 2);
    r(C.darkRed, x + 1, y, w - 2, 1);
    if (row % 2 === 0) {
      r(C.red, x + 2, y, w - 4, 1);
    }
  }
  // Cumeeira e Beiral de Carvalho Contínuo
  r(C.wood, 16, 4, 24, 1);
  r(C.woodDark, 3, 16, 50, 3);
  r(C.wood, 4, 17, 48, 1);
  r(C.gold, 6, 18, 44, 1);

  // Vigas verticais de carvalho na fachada
  r(C.woodDark, 5, 18, 3, 21);
  r(C.woodDark, 26, 18, 3, 21);
  r(C.woodDark, 48, 18, 3, 21);

  // Fornalha da Forja aberta com brasas vivas (Lado Esquerdo)
  r(C.ironDark, 10, 22, 14, 16);
  r(C.steelDark, 11, 22, 12, 2);
  r(C.outline, 12, 24, 10, 13);
  r(C.darkRed, 13, 26, 8, 11);
  r(C.red, 14, 28, 6, 9);
  r(C.yellow, 15, 31, 4, 5);
  r(C.white, 16, 33, 2, 2);

  // Mostruário de Armas na parede direita (Escudo Real e Espadas)
  r(C.woodDark, 31, 21, 15, 8);
  r(C.wood, 32, 22, 13, 6);
  r(C.blue, 33, 23, 4, 4);
  r(C.gold, 34, 23, 2, 4);
  r(C.steelLight, 39, 21, 1, 7); r(C.gold, 38, 26, 3, 1);
  r(C.steelLight, 43, 21, 1, 7); r(C.gold, 42, 26, 3, 1);

  // Bigorna de Aço Pesada sobre cepo no pátio frontal
  r(C.woodDark, 34, 34, 8, 5);
  r(C.ironDark, 33, 32, 10, 3);
  r(C.steelDark, 31, 30, 14, 3);
  r(C.steel, 32, 30, 12, 2);
  r(C.steelLight, 34, 30, 8, 1);
}

// 2. Casa do Cuidador de Cavalos / Estábulo Real (120x84 pixels — matriz 60x42 a escala 2x)
function drawVillageStable(r) {
  // Base e Paredes inteiriças de madeira do Celeiro (preenchimento 100% sólido sem falhas)
  r(C.woodDark, 5, 17, 50, 23);
  r(C.wood, 7, 18, 46, 21);
  r(C.ironDark, 4, 38, 52, 2);

  // Telhado Simétrico de Madeira e Palha Dourada (cume em y=4, base larga em y=16, h=2 contínuo)
  for (let row = 0; row <= 12; row++) {
    const y = 4 + row;
    const w = 28 + row * 2;
    const x = 30 - w / 2;
    r(C.woodDark, x, y, w, 2);
    r(C.wood, x + 1, y, w - 2, 1);
    r(C.rag, x + 2, y, w - 4, 1);
  }
  r(C.wood, 16, 4, 28, 1);
  r(C.woodDark, 3, 16, 54, 3);
  r(C.wood, 4, 17, 52, 1);

  // Sótão de Feno central no telhado com ferradura dourada
  r(C.woodDark, 25, 7, 10, 9);
  r(C.wood, 26, 8, 8, 7);
  r(C.gold, 28, 9, 4, 5);
  r(C.yellow, 29, 10, 2, 3);

  // Colunas mestras de carvalho
  r(C.woodDark, 5, 18, 3, 21);
  r(C.woodDark, 28, 18, 3, 21);
  r(C.woodDark, 52, 18, 3, 21);

  // Baia Esquerda com o Cavalo Marrom (crina, orelhas, estrela branca na testa e focinho)
  r(C.outline, 9, 20, 18, 17);
  r(C.boot, 12, 24, 9, 7);
  r(C.wood, 13, 25, 7, 5);
  r(C.boot, 16, 20, 6, 5);
  r(C.rag, 20, 22, 3, 3);
  r(C.white, 19, 20, 1, 2);
  r(C.outline, 18, 21, 1, 1);
  r(C.woodDark, 14, 19, 2, 6);
  r(C.boot, 15, 18, 2, 2);

  // Porteira de madeira da baia do cavalo
  r(C.woodDark, 9, 29, 18, 8);
  r(C.rag, 10, 30, 16, 2);
  r(C.rag, 10, 34, 16, 2);

  // Lado Direito: Fardos de Feno Dourado + Cocho de Água Cristalina
  r(C.gold, 33, 22, 17, 10);
  r(C.yellow, 34, 23, 15, 8);
  r(C.woodDark, 33, 26, 17, 1);
  r(C.woodDark, 32, 32, 19, 6);
  r(C.blue, 34, 33, 15, 3);
  r(C.cyan, 35, 33, 10, 1);
}

// 3. Chalé Medieval da Vila (72x64 pixels — matriz 36x32 a escala 2x, 100% simétrico e sem cortes!)
function drawVillageHouse(r) {
  // Base de pedra e Paredes inteiriças de enxaimel (preenchimento sólido primeiro)
  r(C.woodDark, 4, 16, 28, 14);
  r(C.bone, 6, 18, 24, 10);
  r(C.ironDark, 3, 28, 30, 2);
  r(C.iron, 5, 28, 26, 1);

  // Chaminé de pedra e tijolos à direita (dentro da margem segura)
  r(C.ironDark, 24, 2, 5, 11);
  r(C.iron, 25, 3, 3, 9);
  r(C.steelDark, 24, 2, 5, 1);
  r(C.steelLight, 25, 1, 3, 1);

  // Telhado Simétrico de Madeira e Palha (centro exato x=18, de y=4 até y=15, h=2 para zero buracos!)
  for (let row = 0; row <= 11; row++) {
    const y = 4 + row;
    const w = 10 + row * 2;
    const x = 18 - w / 2;
    r(C.woodDark, x, y, w, 2);
    r(C.wood, x + 1, y, w - 2, 1);
    if (row % 2 === 0) {
      r(C.rag, x + 2, y, w - 4, 1);
    }
  }
  // Cumeeira e Beiral de Carvalho Contínuo (dentro de x=2..34)
  r(C.wood, 13, 4, 10, 1);
  r(C.woodDark, 2, 15, 32, 3);
  r(C.wood, 3, 16, 30, 1);

  // Vigas de carvalho estilo enxaimel europeu
  r(C.woodDark, 4, 17, 2, 12);
  r(C.woodDark, 17, 17, 2, 12);
  r(C.woodDark, 30, 17, 2, 12);

  // Porta de carvalho com ferrolho dourado (Lado Esquerdo)
  r(C.woodDark, 8, 20, 6, 9);
  r(C.wood, 9, 21, 4, 7);
  r(C.gold, 12, 24, 1, 1);

  // Janela iluminada com venezianas (Lado Direito)
  r(C.woodDark, 20, 20, 8, 6);
  r(C.yellow, 21, 21, 6, 4);
  r(C.white, 22, 21, 2, 2);
  r(C.woodDark, 24, 21, 1, 4);
  r(C.woodDark, 21, 23, 6, 1);
}

// 4. Muralha / Paliçada Vertical Contínua da Vila (32x96 — fecha o perímetro até o Portão)
function drawVillageWallV(r) {
  r(C.ironDark, 2, 1, 12, 46);
  r(C.woodDark, 3, 2, 10, 44);
  r(C.wood, 5, 2, 6, 44);
  r(C.rag, 6, 2, 2, 44);
  for (let y = 5; y < 44; y += 10) {
    r(C.ironDark, 2, y, 12, 3);
    r(C.steelDark, 3, y + 1, 10, 1);
    r(C.gold, 4, y + 1, 1, 1);
    r(C.gold, 11, y + 1, 1, 1);
  }
}

// 5. Torre e Pilar do Grande Portão da Vila (48x96 — matriz 24x48 a escala 2x)
function drawGateTower(r) {
  r(C.ironDark, 2, 35, 20, 11);
  r(C.iron, 4, 37, 16, 8);
  r(C.steelDark, 5, 37, 14, 3);
  r(C.leafDark, 2, 43, 4, 3);
  r(C.leaf, 3, 43, 2, 2);

  r(C.woodDark, 4, 12, 16, 24);
  r(C.wood, 6, 13, 12, 22);
  r(C.rag, 8, 14, 4, 20);

  [15, 24, 32].forEach(by => {
    r(C.ironDark, 3, by, 18, 3);
    r(C.steelDark, 4, by + 1, 16, 1);
    r(C.gold, 6, by + 1, 1, 1);
    r(C.gold, 17, by + 1, 1, 1);
  });

  r(C.woodDark, 2, 8, 20, 5);
  r(C.wood, 3, 9, 18, 3);
  r(C.woodDark, 2, 5, 4, 4); r(C.wood, 3, 6, 2, 3);
  r(C.woodDark, 10, 5, 4, 4); r(C.wood, 11, 6, 2, 3);
  r(C.woodDark, 18, 5, 4, 4); r(C.wood, 19, 6, 2, 3);

  r(C.blue, 7, 18, 6, 10);
  r(C.gold, 9, 20, 2, 4); r(C.gold, 8, 21, 4, 1);
  r(C.darkRed, 7, 27, 6, 1);

  r(C.ironDark, 11, 3, 2, 3);
  r(C.darkRed, 10, 1, 4, 3);
  r(C.red, 11, 1, 2, 3);
  r(C.yellow, 11, 2, 2, 2);
}

// 6. Moradores NPCs da Vila dando Tchau (24x28 — 2 frames acenando para o Cavaleiro)
function drawVillageNpc(r, f) {
  r(C.woodDark, 4, 1, 4, 2);
  r(C.skin, 4, 3, 4, 3);
  r(C.eye, 7, 4, 1, 1);

  r(C.elfTunic, 3, 6, 6, 5);
  r(C.bone, 5, 7, 3, 4);
  r(C.woodDark, 3, 9, 6, 1);

  r(C.skin, 2, 6, 1, 3);
  if (f === 0) {
    r(C.elfTunic, 9, 5, 1, 2);
    r(C.skin, 10, 3, 2, 2);
  } else {
    r(C.elfTunic, 9, 4, 1, 2);
    r(C.skin, 9, 1, 2, 2);
  }

  r(C.boot, 4, 11, 2, 2);
  r(C.boot, 7, 11, 2, 2);
}

// 7. Peça de Ouro / Meta-Moeda Reluzente (16x16 — 2 frames girando e brilhando)
function drawGoldCoin(r, f) {
  if (f === 0) {
    r(C.gold, 1, 1, 6, 6);
    r(C.yellow, 2, 2, 4, 4);
    r(C.woodDark, 3, 3, 2, 2);
    r(C.white, 2, 1, 2, 1);
  } else {
    r(C.gold, 2, 1, 4, 6);
    r(C.yellow, 3, 2, 2, 4);
    r(C.white, 3, 1, 1, 2);
  }
}

// 8. Moeda de Prata (Drop dos Inimigos durante a partida — 16x16, 2 frames)
function drawSilverCoin(r, f) {
  if (f === 0) {
    r(C.steelDark, 1, 1, 6, 6);
    r(C.steel, 2, 2, 4, 4);
    r(C.steelLight, 2, 1, 4, 2);
    r(C.iron, 3, 3, 2, 2);
    r(C.white, 2, 2, 2, 1);
  } else {
    r(C.steelDark, 2, 1, 4, 6);
    r(C.steel, 3, 2, 2, 4);
    r(C.white, 3, 1, 1, 3);
  }
}

// 9. Ícones de Upgrades de Status (Magnetismo, Vida, Velocidade, Sabedoria/Ervas) + Orbe XP + Mestres (Ferreiro & Mago)
function drawMagnetIcon(r) {
  r(C.red, 1, 2, 2, 3); r(C.red, 6, 2, 2, 3);
  r(C.steelDark, 1, 5, 2, 3); r(C.steelDark, 6, 5, 2, 3);
  r(C.steelDark, 2, 7, 5, 2);
  r(C.steelLight, 1, 1, 2, 1); r(C.steelLight, 6, 1, 2, 1);
  r(C.cyan, 4, 2, 1, 2);
}

function drawHealthIcon(r) {
  r(C.red, 1, 2, 3, 3); r(C.red, 5, 2, 3, 3);
  r(C.red, 2, 5, 5, 2);
  r(C.red, 3, 7, 3, 1);
  r(C.darkRed, 4, 8, 1, 1);
  r(C.white, 2, 2, 1, 1);
}

function drawSpeedIcon(r) {
  r(C.wood, 2, 3, 3, 4);
  r(C.boot, 2, 7, 6, 2);
  r(C.gold, 2, 3, 3, 1);
  r(C.cyan, 5, 2, 3, 1);
  r(C.white, 6, 1, 2, 1);
}

function drawWisdomIcon(r) {
  // Frasco alquímico roxo/ciano com folha de erva dourada
  r(C.gold, 3, 1, 3, 1);
  r(C.steelLight, 4, 2, 1, 2);
  r(C.purple, 2, 4, 5, 4);
  r(C.cyan, 3, 5, 3, 2);
  r(C.white, 3, 4, 1, 1);
  r(C.leafLight, 6, 2, 2, 2);
  r(C.leaf, 5, 3, 2, 1);
}

// Orbe / Cristal de XP (14x14 — 2 frames cintilando em esmeralda e ciano)
function drawXpOrb(r, f) {
  if (f === 0) {
    r(0x00c853, 2, 1, 3, 5);
    r(0x00c853, 1, 2, 5, 3);
    r(C.cyan, 2, 2, 3, 3);
    r(C.white, 3, 2, 1, 2);
  } else {
    r(C.cyan, 2, 1, 3, 5);
    r(0x69f0ae, 1, 2, 5, 3);
    r(C.white, 2, 2, 3, 3);
    r(C.yellow, 3, 3, 1, 1);
  }
}

// Mestre Ferreiro da Forja Real (44x44 — 2 frames martelando / respirando junto à bigorna)
function drawBlacksmithMaster(r, f) {
  const bob = f === 0 ? 0 : 1;
  // Cabeça, bandana de couro e barba espessa de mestre anão/ferreiro
  r(C.darkRed, 7, 2 + bob, 8, 2);
  r(C.skin, 7, 4 + bob, 8, 4);
  r(C.outline, 9, 5 + bob, 1, 1); r(C.outline, 13, 5 + bob, 1, 1);
  r(C.woodDark, 6, 7 + bob, 10, 5);
  r(C.wood, 7, 8 + bob, 8, 3);
  r(C.gold, 10, 9 + bob, 2, 2); // fivela da barba

  // Ombros largos, camisa de linho e avental de couro pesado de forja
  r(C.bone, 4, 11 + bob, 14, 6);
  r(C.boot, 6, 11 + bob, 10, 9);
  r(C.wood, 7, 12 + bob, 8, 7);
  r(C.gold, 6, 15 + bob, 10, 1);

  // Braço esquerdo segurando tenaz com lâmina em brasa
  r(C.skin, 3, 12 + bob, 2, 4);
  r(C.ironDark, 2, 15 + bob, 3, 2);
  r(C.red, 1, 14 + bob, 2, 2); r(C.yellow, 1, 14 + bob, 1, 1);

  // Braço direito erguendo/descendo o Martelo de Forja
  const hY = f === 0 ? 0 : 3;
  r(C.skin, 16, 11 + hY, 3, 4);
  r(C.ironDark, 16, 14 + hY, 3, 2); // munhequeira
  r(C.woodDark, 18, 6 + hY, 1, 9);  // cabo do martelo
  r(C.steelDark, 16, 4 + hY, 5, 3); // cabeça do martelo
  r(C.steelLight, 17, 4 + hY, 3, 1);
}

// Mestre Mago Alquimista (44x44 — 2 frames com chapéu místico, poção borbulhante e ervas)
function drawMageMaster(r, f) {
  const bob = f === 0 ? 0 : 1;
  // Chapéu pontudo místico violeta com aba larga e fivela dourada
  r(0x4a148c, 9, 1 + bob, 4, 2);
  r(0x4a148c, 7, 3 + bob, 8, 2);
  r(0x311b92, 4, 5 + bob, 14, 2);
  r(C.gold, 8, 4 + bob, 6, 1);
  r(C.cyan, 10, 4 + bob, 2, 1);

  // Rosto sábio, olhos arcanos brilhantes e longa barba prateada
  r(0x26173e, 7, 7 + bob, 8, 3);
  r(C.cyan, 8, 8 + bob, 2, 1); r(C.cyan, 12, 8 + bob, 2, 1);
  r(C.steelLight, 7, 10 + bob, 8, 5);
  r(C.white, 8, 10 + bob, 6, 3);
  r(C.steel, 9, 15 + bob, 4, 2);

  // Manto estrelado de alquimista
  r(0x311b92, 4, 12 + bob, 14, 8);
  r(C.purple, 6, 13 + bob, 10, 7);
  r(C.gold, 5, 12 + bob, 2, 7); r(C.gold, 15, 12 + bob, 2, 7);
  r(C.yellow, 8, 17 + bob, 1, 1); r(C.cyan, 13, 16 + bob, 1, 1);

  // Mão esquerda segurando ramo de ervas místicas douradas/verdes
  r(C.skin, 3, 14 + bob, 2, 2);
  r(C.leaf, 2, 11 + bob, 3, 3);
  r(C.leafLight, 1, 10 + bob, 2, 2);
  r(C.yellow, 3, 10 + bob, 1, 1);

  // Mão direita erguendo frasco de poção rubi/ciano borbulhante
  const pY = f === 0 ? 0 : -1;
  r(C.skin, 17, 14 + pY, 2, 2);
  r(C.white, 17, 10 + pY, 4, 4);
  r(f === 0 ? C.red : C.cyan, 18, 11 + pY, 2, 3);
  r(C.gold, 18, 9 + pY, 2, 1);
}

function drawHeartHUD(r, f) {
  const main = f === 0 ? C.red : C.iron;
  const shade = f === 0 ? C.darkRed : C.ironDark;
  r(main, 1, 1, 2, 2); r(main, 4, 1, 2, 2);
  r(main, 1, 3, 5, 2);
  r(shade, 2, 5, 3, 1);
  r(shade, 3, 6, 1, 1);
  if (f === 0) r(C.white, 1, 1, 1, 1);
}

function drawFullscreenIcon(r, f) {
  if (f === 0) {
    // Expandir para Tela Cheia
    r(C.gold, 1, 1, 3, 1); r(C.gold, 1, 1, 1, 3);
    r(C.gold, 6, 1, 3, 1); r(C.gold, 8, 1, 1, 3);
    r(C.gold, 1, 8, 3, 1); r(C.gold, 1, 6, 1, 3);
    r(C.gold, 6, 8, 3, 1); r(C.gold, 8, 6, 1, 3);
    r(C.yellow, 4, 4, 2, 2);
  } else {
    // Sair da Tela Cheia
    r(C.gold, 2, 3, 2, 1); r(C.gold, 3, 2, 1, 2);
    r(C.gold, 6, 3, 2, 1); r(C.gold, 6, 2, 1, 2);
    r(C.gold, 2, 6, 2, 1); r(C.gold, 3, 6, 1, 2);
    r(C.gold, 6, 6, 2, 1); r(C.gold, 6, 6, 1, 2);
    r(C.cyan, 4, 4, 2, 2);
  }
}

// =============================================================================
// CENA: PRELOAD — cria todas as texturas com filtro NEAREST (zero serrilhado/esfarelado)
// =============================================================================
function preload() {
  if (this.textures.exists('knight')) return;
  makeSheet(this, 'knight', 32, 32, 2, drawKnight);
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
  makeSheet(this, 'arrow_player', 26, 10, 1, arrowDrawer(C.blue, C.steelLight));
  makeSheet(this, 'arrow_gold', 26, 10, 1, arrowDrawer(C.yellow, C.gold));
  makeSheet(this, 'arrow_elf', 26, 10, 1, arrowDrawer(C.elfCloak, C.purple));
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
    scene.input.keyboard.removeAllListeners();
    scene.scale.off('enterfullscreen', onScaleChange);
    scene.scale.off('leavefullscreen', onScaleChange);
    scene.scale.off('resize', onScaleChange);
  });

  const onScaleChange = () => {
    if (scene.scale) scene.scale.refresh();
    scene.cameras.main.setViewport(0, 0, GAME_WIDTH, GAME_HEIGHT);
    scene.cameras.main.centerOn(GAME_WIDTH / 2, GAME_HEIGHT / 2);
    scene.cameras.main.setRoundPixels(true);
    updateFullscreenIcons(scene);
  };
  scene.scale.on('enterfullscreen', onScaleChange);
  scene.scale.on('leavefullscreen', onScaleChange);
  scene.scale.on('resize', onScaleChange);

  // Animações de 2 quadros com cadência fluida — criadas uma única vez
  const fps = {
    knight: 12, goblin: 12, warrior: 8, elf: 9,
    gargoyle: 10, dark_mage: 8, mini_golem: 10, boss_golem: 6,
    village_npc: 4, gold_coin: 8, silver_coin: 8, xp_orb: 8,
    blacksmith_master: 3, mage_master: 3
  };
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
  bossFilterOverlay = scene.add.rectangle(400, 300, 800, 600, 0x240b06, 0).setDepth(1800);

  // Grupos físicos
  villageDecor = scene.physics.add.group({ immovable: true });
  coins = scene.physics.add.group();
  xpOrbs = scene.physics.add.group();
  enemies = scene.physics.add.group();
  obstacles = trees = scene.physics.add.group({ immovable: true });
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

  // Partículas para impactos e mortes
  hitFx = scene.add.particles(0, 0, 'spark', {
    lifespan: 380, speed: { min: 60, max: 180 }, scale: { start: 1.5, end: 0 },
    tint: [0xffffff, 0xffca28, 0xff7043], emitting: false
  }).setDepth(1500);

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
  scene.physics.add.overlap(slashes, enemyArrows, (s, a) => { sound.playShieldBlock(); a.destroy(); });
  scene.physics.add.overlap(playerArrows, enemyArrows, (a, b) => {
    if (!a.active || !b.active) return;
    sound.playShieldBlock();
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
        hitFx.explode(6, arrow.x, arrow.y);
      } else {
        sound.playWoodHit();
        hitFx.explode(4, arrow.x, arrow.y);
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

  // Rotação discreta dos Machados Bumerangue (em passos de 45 graus para preservar nitidez)
  playerArrows.getChildren().forEach(p => {
    if (p.isBoomerang && p.active) {
      p.spinAccum = (p.spinAccum || 0) + 760 * dt;
      p.setAngle(Math.round(p.spinAccum / 45) * 45);
      if (!p.returning && p.body.velocity.x < 0) {
        p.returning = true;
        p.projId = ++slashCounter;
      }
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

  // 4. Arma ativa: conta o tempo e ataca na cadência escalada pelo nível de Upgrade In-Game!
  if (buff.type) {
    buff.timeLeft -= dt;
    if (buff.timeLeft <= 0) endBuff();
    else {
      const rate = getWeaponAttackRate(buff.type);
      if (rate && time > buff.nextAttack) {
        if (buff.type === 'bow') shootArrow(scene);
        else if (buff.type === 'sword') swingSword(scene);
        else if (buff.type === 'axe') throwAxe(scene);
        else if (buff.type === 'firestaff') shootFireball(scene);
        buff.nextAttack = time + rate;
      }
    }
  }
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
  shadows.clear().fillStyle(0x000000, 0.28);
  enemyHpBars.clear();

  const shadeEntity = (s) => {
    if (!s || !s.active || !s.visible) return;
    const feet = Math.round(s.groundY ?? s.y + s.displayHeight / 2);
    s.setDepth(feet);
    shadows.fillEllipse(Math.round(s.x), feet - 2, Math.round(s.displayWidth * 0.7), s.isBoss ? 14 : 8);
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

  // Escudo e golpe de espada acompanham o cavaleiro (sempre voltados para a frente)
  if (player && player.visible) {
    shieldSprite.setPosition(Math.round(player.x + 12), Math.round(player.y + 4)).setDepth(player.depth + 1);
  }
  slashes.getChildren().forEach(s => {
    s.setPosition(Math.round(player.x + (s.offsetX || 30)), Math.round(player.y)).setDepth(player.depth + 3);
    if (s.blade && s.blade.active) {
      s.blade.setPosition(Math.round(player.x + 8), Math.round(player.y + 4)).setDepth(player.depth + 2);
    }
  });
}

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
  gameState = 'PLAYING';
  survivalTime = 0;
  runSilver = 0;
  runGold = 0;
  runXp = 0;
  runLevel = 1;
  xpToNextLevel = getXpRequiredForLevel(1);
  pendingLevelUps = 0;
  runWeaponLevels = { bow: 1, sword: 1, shield: 1, axe: 1, firestaff: 1 };
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
    if (survivalTime === 60 && !bossSpawned) {
      floatText(scene, 400, 132, '⚔ HORDA INTENSIFICADA! CONTINUE EVOLUINDO! ⚔', '#ffca28');
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
  if (activeBoss && activeBoss.active) {
    spawnEnemy(scene);
    if (Math.random() < 0.35) {
      scene.time.delayedCall(220, () => gameState === 'PLAYING' && spawnEnemy(scene, 'mini_golem'));
    }
    return;
  }

  let waveCount = 1;
  const r = Math.random();
  if (survivalTime >= 130) {
    waveCount = r < 0.35 ? 4 : (r < 0.80 ? 3 : 2);
  } else if (survivalTime >= 85) {
    waveCount = r < 0.45 ? 3 : 2;
  } else if (survivalTime >= 45) {
    waveCount = r < 0.20 ? 3 : (r < 0.72 ? 2 : 1);
  } else if (survivalTime >= 18) {
    waveCount = r < 0.42 ? 2 : 1;
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

function spawnEnemy(scene, forcedType, customY) {
  const roll = Math.random();
  let type = forcedType;
  if (!type) {
    if (activeBoss && activeBoss.active) {
      type = roll < 0.40 ? 'mini_golem' : roll < 0.62 ? 'goblin' : roll < 0.78 ? 'gargoyle' : roll < 0.90 ? 'elf' : 'dark_mage';
    } else if (survivalTime >= 32) {
      type = roll < 0.28 ? 'goblin' : roll < 0.48 ? 'warrior' : roll < 0.68 ? 'elf' : roll < 0.84 ? 'gargoyle' : 'dark_mage';
    } else if (survivalTime >= 15) {
      type = roll < 0.38 ? 'goblin' : roll < 0.62 ? 'warrior' : roll < 0.82 ? 'elf' : 'gargoyle';
    } else {
      type = roll < 0.50 ? 'goblin' : roll < 0.78 ? 'warrior' : 'elf';
    }
  }
  const cfg = ENEMIES[type];

  // Evita nascer exatamente em cima de outro inimigo recém-gerado
  let y = customY ?? Phaser.Math.Between(130, 520);
  if (customY === undefined) {
    for (let i = 0; i < 6; i++) {
      const candidate = Phaser.Math.Between(130, 520);
      const stacked = enemies.getChildren().some(e => !e.isBoss && e.x > 760 && Math.abs(e.y - candidate) < 36);
      if (!stacked) { y = candidate; break; }
    }
  }
  if (type === 'gargoyle') {
    y = Phaser.Math.Clamp(y, 175, 470);
  }

  const enemy = enemies.create(860, y, type, 0);
  enemy.play({ key: type, startFrame: Phaser.Math.Between(0, 1) }).setFlipX(true);
  enemy.body.setSize(cfg.w, cfg.h);
  enemy.setVelocityX(-enemySpeed * cfg.speed);
  enemy.phase = Math.random() * 10;
  enemy.baseY = y;
  enemy.enemyType = type;
  // Escalonamento suave de vida de guerreiros e magos em partidas longas (> 90s)
  const hpBonus = (survivalTime >= 95 && (type === 'warrior' || type === 'dark_mage')) ? 1 : 0;
  enemy.maxHp = cfg.hp + hpBonus;
  enemy.hp = enemy.maxHp;

  if (type === 'elf') {
    enemy.shootTimer = scene.time.delayedCall(650, () => {
      if (!enemy.active || gameState !== 'PLAYING') return;
      elfShoot(scene, enemy);
      enemy.shootTimer = scene.time.addEvent({
        delay: 1700,
        loop: true,
        callback: () => elfShoot(scene, enemy)
      });
    });
  } else if (type === 'dark_mage') {
    enemy.shootTimer = scene.time.delayedCall(750, () => {
      if (!enemy.active || gameState !== 'PLAYING') return;
      mageShoot(scene, enemy);
      enemy.shootTimer = scene.time.addEvent({
        delay: 2200,
        loop: true,
        callback: () => mageShoot(scene, enemy)
      });
    });
  }
}

// =============================================================================
// PRIMEIRA BOSS FIGHT: GOLEM ANCESTRAL DE PEDRA (AOS 120 SEGUNDOS)
// =============================================================================
function registerBossTelegraph(boss, obj) {
  if (!boss || !obj) return obj;
  if (!boss.activeTelegraphs) boss.activeTelegraphs = [];
  boss.activeTelegraphs.push(obj);
  return obj;
}

function clearBossTelegraphs(boss) {
  if (!boss || !boss.activeTelegraphs) return;
  boss.activeTelegraphs.forEach(t => {
    if (t && t.active) {
      if (t.scene && t.scene.tweens) t.scene.tweens.killTweensOf(t);
      t.destroy();
    }
  });
  boss.activeTelegraphs = [];
}

function startBossFight(scene) {
  bossSpawned = true;
  sound.startBGM('boss');
  sound.playEarthSmash();
  scene.cameras.main.shake(480, 0.011);

  if (bossFilterOverlay) {
    scene.tweens.add({ targets: bossFilterOverlay, alpha: 0.24, duration: 1000 });
  }
  ground.setTint(0xd0a28c);
  road.setTint(0xd8ae98);
  forestTop.setTint(0x9e8278);
  forestBottom.setTint(0x9e8278);

  floatText(scene, 400, 134, '⚠ CHEFÃO: GOLEM ANCESTRAL DE PEDRA! ⚠', '#ff5252');

  const boss = enemies.create(875, 325, 'boss_golem', 0);
  boss.play('boss_golem').setFlipX(true);
  boss.body.setSize(62, 74).setOffset(13, 8);
  boss.setImmovable(true);
  boss.body.pushable = false;
  boss.isBoss = true;
  boss.enemyType = 'boss_golem';
  boss.maxHp = BOSS_MAX_HP;
  boss.hp = BOSS_MAX_HP;
  boss.entering = true;
  boss.isLunging = false;
  boss.attackCount = 0;
  boss.activeTelegraphs = [];
  boss.setVelocityX(-115);
  activeBoss = boss;

  if (bossHudContainer) {
    bossHudContainer.setVisible(true).setAlpha(0);
    scene.tweens.add({ targets: bossHudContainer, alpha: 1, duration: 550 });
  }
  updateBossHUD();

  if (!buff.type) spawnItem(scene);
  spawnEnemy(scene, 'mini_golem', 220);
  spawnEnemy(scene, 'mini_golem', 430);

  boss.attackTimer = scene.time.addEvent({
    delay: 2800,
    loop: true,
    callback: () => {
      if (gameState !== 'PLAYING' || !boss.active || boss.entering || boss.isLunging) return;
      boss.attackCount++;
      spawnEnemy(scene, 'mini_golem', Phaser.Math.Clamp(boss.y + Phaser.Math.Between(-90, 90), 140, 510));

      if (boss.attackCount % 2 === 1) {
        bossThrowRocks(scene, boss);
      } else {
        bossColossalPunch(scene, boss);
      }
    }
  });
}

// GOLPE 1: Arremesso de Rochas com Alerta Vermelho -> Chão Craquelado + Rocha como Escudo/Obstáculo
function bossThrowRocks(scene, boss) {
  if (!boss || !boss.active || gameState !== 'PLAYING') return;
  const rockCount = boss.hp <= boss.maxHp * 0.5 ? 3 : 2;

  for (let i = 0; i < rockCount; i++) {
    scene.time.delayedCall(i * 260, () => {
      if (!boss || !boss.active || !player || !player.active || gameState !== 'PLAYING') return;

      const tx = i === 0
        ? Phaser.Math.Clamp(player.x + Phaser.Math.Between(-25, 65), 145, 555)
        : Phaser.Math.Clamp(player.x + Phaser.Math.Between(-85, 110), 145, 555);
      const ty = i === 0
        ? Phaser.Math.Clamp(player.y + Phaser.Math.Between(-35, 35), 140, 505)
        : Phaser.Math.Clamp(player.y + Phaser.Math.Between(-105, 105), 140, 505);
      const variant = Math.random() < 0.55 ? 1 : 0;

      const alertRing = registerBossTelegraph(
        boss,
        scene.add.circle(tx, ty, 30, 0xff1744, 0.20).setStrokeStyle(2.5, 0xff5252, 0.95).setDepth(ty - 1)
      );
      const innerPulse = registerBossTelegraph(
        boss,
        scene.add.circle(tx, ty, 8, 0xff5252, 0.48).setDepth(ty)
      );
      const crossH = registerBossTelegraph(
        boss,
        scene.add.rectangle(tx, ty, 44, 2, 0xff8a80, 0.85).setDepth(ty)
      );
      const crossV = registerBossTelegraph(
        boss,
        scene.add.rectangle(tx, ty, 2, 32, 0xff8a80, 0.85).setDepth(ty)
      );

      scene.tweens.add({
        targets: innerPulse,
        radius: 30,
        alpha: { from: 0.55, to: 0.85 },
        duration: 950,
        ease: 'Quad.easeIn'
      });
      scene.tweens.add({
        targets: alertRing,
        alpha: { from: 0.25, to: 0.7 },
        duration: 190,
        yoyo: true,
        repeat: 4
      });

      boss.setTint(0xffab91);
      scene.time.delayedCall(220, () => {
        if (!boss || !boss.active || gameState !== 'PLAYING') return;
        boss.clearTint();

        const flyingRock = registerBossTelegraph(
          boss,
          scene.add.image(boss.x - 28, boss.y - 22, 'rock', variant).setDepth(1600).setScale(1.18)
        );

        scene.tweens.add({
          targets: flyingRock,
          x: tx,
          y: ty,
          scale: { from: 1.38, to: 1.0 },
          duration: 730,
          ease: 'Sine.easeIn',
          onComplete: () => {
            [alertRing, innerPulse, crossH, crossV, flyingRock].forEach(o => { if (o && o.active) o.destroy(); });
            if (gameState !== 'PLAYING' || !boss.active) return;

            sound.playEarthSmash();
            scene.cameras.main.shake(170, 0.006);
            hitFx.explode(10, tx, ty);

            if (player && player.active && Phaser.Math.Distance.Between(player.x, player.y, tx, ty) <= 30) {
              playerHit(scene, { active: true, isBossAttack: true, x: tx, y: ty, destroy: () => {} });
            }

            spawnBossRockAt(scene, tx, ty, variant);
          }
        });
      });
    });
  }
}

// GOLPE 2: Investida / Soco Colossal Linear com Alerta Vermelho Limpo
function bossColossalPunch(scene, boss) {
  if (!boss || !boss.active || gameState !== 'PLAYING') return;
  boss.isLunging = true;
  boss.setVelocity(0, 0);

  const laneY = boss.y;
  const laneH = 76;
  const laneW = 560;
  const laneCenterX = 390;

  const warnZone = registerBossTelegraph(
    boss,
    scene.add.rectangle(laneCenterX, laneY, laneW, laneH, 0xff1744, 0.22)
      .setStrokeStyle(2.5, 0xff5252, 0.95)
      .setDepth(laneY - 2)
  );
  const warnCore = registerBossTelegraph(
    boss,
    scene.add.rectangle(laneCenterX, laneY, laneW, 14, 0xff5252, 0.42)
      .setDepth(laneY - 1)
  );

  boss.setTint(0xff7043);
  scene.tweens.add({
    targets: [warnZone, warnCore],
    alpha: { from: 0.18, to: 0.65 },
    duration: 160,
    yoyo: true,
    repeat: 4
  });

  const startX = boss.x;
  scene.tweens.add({
    targets: boss,
    x: startX + 18,
    duration: 800,
    ease: 'Sine.easeOut',
    onUpdate: () => { if (boss && boss.body) boss.body.updateFromGameObject(); }
  });

  scene.time.delayedCall(800, () => {
    [warnZone, warnCore].forEach(o => { if (o && o.active) o.destroy(); });
    if (!boss || !boss.active || gameState !== 'PLAYING') return;

    boss.clearTint();
    sound.playEarthSmash();
    scene.cameras.main.shake(260, 0.012);

    const fistWave = registerBossTelegraph(
      boss,
      scene.add.rectangle(boss.x - 36, laneY, 72, laneH - 10, 0xffab91, 0.72)
        .setStrokeStyle(3, 0xffca28, 1)
        .setDepth(laneY + 4)
    );
    scene.tweens.add({
      targets: fistWave,
      x: 155,
      scaleX: 1.4,
      alpha: { from: 0.85, to: 0 },
      duration: 360,
      ease: 'Sine.easeOut',
      onComplete: () => { if (fistWave && fistWave.active) fistWave.destroy(); }
    });

    scene.tweens.add({
      targets: boss,
      x: 210,
      duration: 380,
      ease: 'Quad.easeIn',
      onUpdate: () => {
        if (!boss || !boss.active) return;
        if (boss.body) boss.body.updateFromGameObject();
        if (gameState === 'PLAYING' && Math.random() < 0.55) {
          hitFx.explode(3, boss.x - 26, boss.y + 20);
        }
      },
      onComplete: () => {
        if (!boss || !boss.active) return;
        hitFx.explode(16, boss.x - 24, boss.y);

        scene.tweens.add({
          targets: boss,
          x: 685,
          duration: 460,
          ease: 'Sine.easeOut',
          onUpdate: () => { if (boss && boss.body) boss.body.updateFromGameObject(); },
          onComplete: () => {
            if (!boss || !boss.active) return;
            boss.isLunging = false;
            boss.setVelocityY(Math.random() < 0.5 ? 72 : -72);
          }
        });
      }
    });
  });
}

function spawnBossRockAt(scene, x, y, variant = 1) {
  const crack = scene.add.image(x, y + 6, 'cracked_ground').setDepth(-8).setAlpha(0.95);
  const rock = obstacles.create(x, y, 'rock', variant);
  rock.setImmovable(true);
  rock.body.pushable = false;
  rock.lockedY = y;
  rock.groundY = y + 7;
  rock.obstacleType = 'rock';
  rock.crackDecal = crack;
  rock.body.setSize(20, 14).setOffset(6, 8);
  rock.setVelocityX(-150);
}

function updateBossHUD() {
  if (!bossHpBar || !bossHpText) return;
  bossHpBar.clear();
  if (!activeBoss || !activeBoss.active) return;

  const hp = Math.max(0, activeBoss.hp);
  const maxHp = activeBoss.maxHp || BOSS_MAX_HP;
  const pct = Phaser.Math.Clamp(hp / maxHp, 0, 1);

  const bx = 252, by = 96, bw = 296, bh = 9;
  bossHpBar.fillStyle(0x0c0907, 1).fillRect(bx, by, bw, bh);
  bossHpBar.lineStyle(1, 0x5c3a21).strokeRect(bx, by, bw, bh);

  const fillColor = pct <= 0.35 ? 0xff1744 : pct <= 0.65 ? 0xff5252 : 0xd83a3a;
  const fillW = Math.max(0, Math.round((bw - 2) * pct));
  if (fillW > 0) {
    bossHpBar.fillStyle(fillColor, 1).fillRect(bx + 1, by + 1, fillW, bh - 2);
    bossHpBar.fillStyle(0xff8a80, 0.55).fillRect(bx + 1, by + 1, fillW, 2);
  }
  bossHpText.setText(`${hp}/${maxHp}`);
}

function defeatBoss(scene, boss) {
  if (!boss) return;
  if (boss.attackTimer) boss.attackTimer.remove();
  clearBossTelegraphs(boss);

  const bx = boss.x, by = boss.y;
  activeBoss = null;
  bossDefeated = true;

  sound.playEarthSmash();
  sound.playEnemyHit();
  sound.playCoin();
  scene.cameras.main.flash(260, 255, 215, 110);
  scene.cameras.main.shake(450, 0.014);
  hitFx.explode(36, bx, by);
  removeEntity(boss);

  enemies.getChildren().slice().forEach(e => {
    if (e.active && e.enemyType === 'mini_golem') killEnemy(e);
  });

  if (bossHudContainer) {
    scene.tweens.add({
      targets: bossHudContainer,
      alpha: 0,
      duration: 500,
      onComplete: () => bossHudContainer.setVisible(false)
    });
  }

  if (bossFilterOverlay) {
    scene.tweens.add({ targets: bossFilterOverlay, alpha: 0, duration: 900 });
  }
  ground.clearTint();
  road.clearTint();
  forestTop.clearTint();
  forestBottom.clearTint();
  sound.startBGM('normal');

  floatText(scene, 400, 150, '★ GOLEM DERROTADO! CHUVA DE PRATA & XP! ★', '#ffca28');
  for (let i = 0; i < 10; i++) {
    spawnCoinDrop(scene, bx + Phaser.Math.Between(-52, 52), by + Phaser.Math.Between(-36, 36), 2);
    spawnXpOrb(scene, bx + Phaser.Math.Between(-56, 56), by + Phaser.Math.Between(-40, 40), 4);
  }
  spawnItem(scene);
}

function elfShoot(scene, elf) {
  if (!elf.active || !player || !player.active || gameState !== 'PLAYING') return;
  if (elf.x > 790 || elf.x < player.x + 25) return;

  elf.setTint(0xff80ff);
  if (elf.chargeRing && elf.chargeRing.active) elf.chargeRing.destroy();
  const chargeRing = scene.add.circle(elf.x - 12, elf.y, 12, 0xc36bff, 0.35)
    .setStrokeStyle(1.5, 0xffeb3b).setDepth(elf.depth + 2);
  elf.chargeRing = chargeRing;

  scene.tweens.add({
    targets: chargeRing,
    scale: { from: 1.3, to: 0.2 },
    alpha: { from: 0.9, to: 0 },
    duration: 360,
    onComplete: () => { if (chargeRing.active) chargeRing.destroy(); }
  });

  scene.time.delayedCall(360, () => {
    if (!elf.active || !player || !player.active || !player.body || gameState !== 'PLAYING') return;
    elf.clearTint();
    sound.playElfShot();
    const arrow = enemyArrows.create(elf.x - 14, elf.y, 'arrow_elf');
    arrow.body.setSize(8, 8);
    arrow.rotation = scene.physics.moveToObject(arrow, player, 360);
  });
}

function mageShoot(scene, mage) {
  if (!mage.active || !player || !player.active || gameState !== 'PLAYING') return;
  if (mage.x > 790 || mage.x < player.x + 20) return;

  mage.setTint(0x7fe7ff);
  if (mage.chargeRing && mage.chargeRing.active) mage.chargeRing.destroy();
  const chargeRing = scene.add.circle(mage.x - 10, mage.y - 4, 15, 0x7fe7ff, 0.32)
    .setStrokeStyle(2, 0xc36bff).setDepth(mage.depth + 2);
  mage.chargeRing = chargeRing;

  scene.tweens.add({
    targets: chargeRing,
    scale: { from: 1.4, to: 0.25 },
    alpha: { from: 0.95, to: 0 },
    duration: 380,
    onComplete: () => { if (chargeRing.active) chargeRing.destroy(); }
  });

  scene.time.delayedCall(380, () => {
    if (!mage.active || !player || !player.active || gameState !== 'PLAYING') return;
    mage.clearTint();
    sound.playElfShot();
    const baseAngle = Phaser.Math.Angle.Between(mage.x - 12, mage.y, player.x, player.y);
    [-0.30, 0, 0.30].forEach(spread => {
      const orb = enemyArrows.create(mage.x - 12, mage.y, 'orb_enemy');
      orb.body.setSize(10, 10);
      const ang = baseAngle + spread;
      const spd = 255;
      orb.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
    });
  });
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

// =============================================================================
// COMBATE, DROPS DE XP/PRATA, LEVEL UP & ARMAS REBALANCEADAS (NV. 1 A 5)
// =============================================================================
function removeEntity(obj) {
  if (!obj || !obj.active) return;
  obj.scene.tweens.killTweensOf(obj);
  if (obj.shootTimer) obj.shootTimer.remove();
  if (obj.attackTimer) obj.attackTimer.remove();
  if (obj.activeTelegraphs) clearBossTelegraphs(obj);
  if (obj.chargeRing && obj.chargeRing.active) obj.chargeRing.destroy();
  if (obj.crackDecal && obj.crackDecal.active) obj.crackDecal.destroy();
  if (obj.speechBubble && obj.speechBubble.active) obj.speechBubble.destroy();
  obj.destroy();
}

function damageEnemy(scene, enemy, dmg = 1) {
  if (!enemy || !enemy.active) return;
  enemy.hp = (enemy.hp ?? 1) - dmg;

  if (enemy.isBoss) {
    updateBossHUD();
    if (enemy.hp <= 0) {
      defeatBoss(scene, enemy);
    } else {
      sound.playShieldBlock();
      hitFx.explode(8, enemy.x - 16, enemy.y);
      enemy.setTint(0xffca28);
      scene.time.delayedCall(120, () => {
        if (enemy && enemy.active) enemy.clearTint();
      });
    }
    return;
  }

  if (enemy.hp <= 0) {
    killEnemy(enemy);
  } else {
    sound.playShieldBlock();
    hitFx.explode(7, enemy.x, enemy.y);
    enemy.x = Math.min(785, enemy.x + 22);
    enemy.setTint(0xffca28);
    scene.time.delayedCall(140, () => {
      if (enemy && enemy.active) enemy.clearTint();
    });
  }
}

function killEnemy(enemy) {
  if (!enemy || !enemy.active) return;
  const scene = enemy.scene;
  const ex = enemy.x, ey = enemy.y;
  const eType = enemy.enemyType;
  const dropRates = { dark_mage: 0.72, warrior: 0.62, elf: 0.48, gargoyle: 0.45, goblin: 0.38, mini_golem: 0.32 };
  const chance = dropRates[eType] ?? 0.40;
  const xpValue = ENEMIES[eType]?.xp ?? 2;

  sound.playEnemyHit();
  hitFx.explode(12, ex, ey);
  removeEntity(enemy);

  // 1. Contabiliza Conquistas Acumulativas (Goblins, Guerreiros, Magos)
  if (eType === 'goblin') recordAchievementProgress(scene, 'goblins', 1);
  else if (eType === 'warrior') recordAchievementProgress(scene, 'warriors', 1);
  else if (eType === 'dark_mage') recordAchievementProgress(scene, 'mages', 1);

  // 2. Todo inimigo derrotado deixa cair Orbe(s) de XP pelo mapa!
  spawnXpOrb(scene, ex - 6, ey, xpValue);

  // 3. Chance de dropar Moeda(s) de Prata
  if (Math.random() < chance) {
    const count = (eType === 'dark_mage' || eType === 'warrior') && Math.random() < 0.42 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      spawnCoinDrop(scene, ex + 8 + i * 10, ey);
    }
  }
}

// Orbe de XP: gema esmeralda/ciano que salta no mapa e é atraída pelo herói
function spawnXpOrb(scene, x, y, xpValue = 2) {
  if (!scene || !xpOrbs) return;
  const targetY = Phaser.Math.Clamp(y + Phaser.Math.Between(-12, 12), 130, 520);
  const orb = xpOrbs.create(x, targetY, 'xp_orb');
  orb.play('xp_orb');
  orb.setScale(xpValue >= 4 ? 1.25 : 1.0);
  orb.body.setSize(28, 28).setOffset(-7, -7);
  orb.groundY = targetY + 7;
  orb.xpValue = xpValue;
  orb.magnetized = false;
  orb.isDropping = true;

  scene.tweens.add({
    targets: orb,
    y: { from: targetY - 12, to: targetY },
    duration: 190,
    ease: 'Quad.easeOut',
    onComplete: () => {
      if (orb && orb.active) orb.isDropping = false;
    }
  });
}

function collectXpOrb(scene, orb) {
  if (!orb || !orb.active) return;
  const ox = orb.x, oy = orb.y;
  const baseXp = orb.xpValue || 2;
  const gained = Math.max(1, Math.round(baseXp * getWisdomMultiplier()));
  sound.playXpOrb();
  hitFx.explode(4, ox, oy);
  removeEntity(orb);
  gainXp(scene, gained);
}

function gainXp(scene, amount) {
  runXp += amount;
  while (runXp >= xpToNextLevel) {
    runXp -= xpToNextLevel; // mantém todo o XP excedente!
    runLevel++;
    xpToNextLevel = getXpRequiredForLevel(runLevel);
    pendingLevelUps++;
  }
  updateXpHUD();

  if (pendingLevelUps > 0 && gameState === 'PLAYING') {
    openLevelUpDraft(scene);
  }
}

// Moeda de Prata: salta do monstro derrotado com física limpa e sem conflito de tween!
function spawnCoinDrop(scene, x, y, silverValue = 1) {
  if (!scene || !coins) return;
  const targetY = Phaser.Math.Clamp(y + Phaser.Math.Between(-10, 14), 130, 520);
  const coin = coins.create(x, targetY, 'silver_coin');
  coin.play('silver_coin');
  coin.body.setSize(28, 28).setOffset(-6, -6);
  coin.groundY = targetY + 8;
  coin.silverValue = silverValue;
  coin.magnetized = false;
  coin.isDropping = true;

  scene.tweens.add({
    targets: coin,
    y: { from: targetY - 14, to: targetY },
    scale: { from: 1.22, to: 1 },
    duration: 210,
    ease: 'Quad.easeOut',
    onComplete: () => {
      if (coin && coin.active) coin.isDropping = false;
    }
  });
}

function collectCoin(scene, coin) {
  if (!coin || !coin.active) return;
  const cx = coin.x, cy = coin.y;
  const val = coin.silverValue || 1;
  runSilver += val;
  if (hudSilverText && hudSilverText.active) {
    hudSilverText.setText(`${runSilver}`);
  }
  sound.playCoin();
  hitFx.explode(6, cx, cy);
  floatText(scene, cx, cy - 16, `+${val} PRATA`, '#e0f7fa');
  removeEntity(coin);
}

function getWeaponDuration(type) {
  const base = BUFF_TIME[type] || 6.0;
  const wisdomAdd = getWisdomBonusDuration();
  const lvl = getWeaponLevel(type);
  if (type === 'shield') {
    return base + (lvl - 1) * 1.65 + wisdomAdd + runBonusDuration;
  }
  return base + (lvl - 1) * 0.75 + wisdomAdd + runBonusDuration;
}

// Cadência rebalanceada: Nv.1 é lento/básico, acelerando drasticamente até o Nv.5!
function getWeaponAttackRate(type) {
  const lvl = getWeaponLevel(type);
  if (type === 'bow') return [520, 420, 350, 280, 220][lvl - 1] || 520;
  if (type === 'sword') return [480, 400, 330, 265, 210][lvl - 1] || 480;
  if (type === 'axe') return [600, 500, 420, 340, 270][lvl - 1] || 600;
  if (type === 'firestaff') return [650, 540, 450, 360, 285][lvl - 1] || 650;
  return ATTACK_RATE[type] || 0;
}

function equipWeaponBuff(scene, type, announce = true) {
  const sameType = buff.type === type;
  const dur = getWeaponDuration(type);
  const lvl = getWeaponLevel(type);
  buff = {
    type,
    timeLeft: dur,
    maxTime: dur,
    nextAttack: sameType ? buff.nextAttack : 0
  };
  shieldSprite.setVisible(buff.type === 'shield');
  if (announce && player) {
    floatText(scene, player.x, player.y - 24, `${BUFF_NAMES[type]} NV.${lvl}!`, '#ffca28');
  }
  updateItemHUD();
}

function collectItem(scene, item) {
  sound.playItemCollect();
  equipWeaponBuff(scene, item.lootType, true);
  removeEntity(item);
}

function endBuff() {
  buff = { type: null, timeLeft: 0, maxTime: 0, nextAttack: 0 };
  shieldSprite.setVisible(false);
  if (playerBuffBar) playerBuffBar.clear();
}

// ARMA 1: Arco Real (Nv.1 fraco com 1 flecha lenta -> Nv.5 Tempestade Imperial com 5 flechas perfurantes!)
function shootArrow() {
  sound.playBow();
  const lvl = getWeaponLevel('bow');
  const spreads = {
    1: [0],
    2: [0],
    3: [-0.09, 0.09],
    4: [-0.18, 0, 0.18],
    5: [-0.28, -0.14, 0, 0.14, 0.28]
  }[lvl] || [0];

  const spd = lvl === 1 ? 560 : (lvl === 2 ? 670 : 760);
  const dmg = lvl >= 4 ? 2 : 1;
  const pierce = lvl >= 5 ? 3 : (lvl >= 4 ? 2 : 1);

  spreads.forEach(ang => {
    const arrow = playerArrows.create(player.x + 20, player.y + 2, 'arrow_player');
    arrow.body.setSize(18, 6);
    arrow.dmg = dmg;
    arrow.pierceCount = pierce;
    arrow.projId = ++slashCounter;
    arrow.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
    arrow.rotation = ang;
  });
}

// ARMA 2: Espada Vorpal (Nv.1 corte curto e 1 dano -> Nv.5 Colosso Vorpal 4 dano + Onda Perfurante!)
function swingSword(scene) {
  slashes.getChildren().slice().forEach(old => old.destroy());
  sound.playSword();
  const lvl = getWeaponLevel('sword');
  const scales = [0.72, 0.96, 1.20, 1.45, 1.72];
  const damages = [1, 1, 2, 3, 4];
  const scale = scales[lvl - 1] || 0.72;
  const offsetX = Math.round(24 + (lvl - 1) * 7);

  const slash = slashes.create(player.x + offsetX, player.y, 'slash_arc');
  slash.setScale(scale);
  slash.offsetX = offsetX;
  slash.body.setSize(Math.round(36 * scale), Math.round(58 * scale));
  slash.slashId = ++slashCounter;
  slash.dmg = damages[lvl - 1] || 1;
  slash.blade = scene.add.image(player.x, player.y, 'sword_blade')
    .setOrigin(0.5, 0.78)
    .setScale(0.82 + (lvl - 1) * 0.18);

  slash.on('destroy', () => {
    if (slash.blade && slash.blade.active) slash.blade.destroy();
  });

  scene.tweens.add({ targets: slash.blade, angle: { from: -65, to: 125 }, duration: 150, ease: 'Cubic.easeOut' });
  scene.tweens.add({
    targets: slash, alpha: { from: 1, to: 0 }, duration: 190,
    onComplete: () => slash.destroy()
  });

  // Nv 5 (Máximo): Dispara Onda de Vento Cortante Perfurante!
  if (lvl >= 5) {
    const waveProj = playerArrows.create(player.x + 34, player.y, 'arrow_player');
    waveProj.setTint(0x7fe7ff);
    waveProj.setScale(1.45);
    waveProj.body.setSize(22, 14);
    waveProj.dmg = 3;
    waveProj.pierceCount = 4;
    waveProj.projId = ++slashCounter;
    waveProj.setVelocityX(720);
  }
}

// ARMA 4 (Desbloqueável no Ferreiro): Machado Bumerangue (Nv.1 1 machado lento -> Nv.5 4 machados gigantes!)
function throwAxe(scene) {
  sound.playSword();
  const lvl = getWeaponLevel('axe');
  const angles = {
    1: [0],
    2: [0],
    3: [-0.16, 0.16],
    4: [-0.24, 0, 0.24],
    5: [-0.32, -0.11, 0.11, 0.32]
  }[lvl] || [0];

  const scales = [0.82, 0.96, 1.05, 1.18, 1.32];
  const damages = [1, 1, 2, 2, 3];

  angles.forEach(ang => {
    const axe = playerArrows.create(player.x + 18, player.y, 'axe_proj');
    axe.setScale(scales[lvl - 1] || 0.82);
    axe.body.setSize(20, 20);
    axe.isBoomerang = lvl >= 2; // Nv.1 perfura até 2; Nv.2+ perfura ilimitado na ida e volta!
    axe.pierceCount = lvl === 1 ? 2 : 99;
    axe.returning = false;
    axe.dmg = damages[lvl - 1] || 1;
    axe.projId = ++slashCounter;

    const spd = 460 + (lvl - 1) * 40;
    axe.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
    axe.body.setAccelerationX(-680);
  });
}

// ARMA 5 (Desbloqueável no Ferreiro): Cajado de Fogo (Nv.1 explosão curta 1 dano -> Nv.5 Cataclismo Solar!)
function shootFireball(scene) {
  sound.playBow();
  const lvl = getWeaponLevel('firestaff');
  const angles = {
    1: [0],
    2: [0],
    3: [-0.13, 0.13],
    4: [-0.15, 0.15],
    5: [-0.24, 0, 0.24]
  }[lvl] || [0];

  const radii = [42, 58, 74, 92, 115];
  const damages = [1, 1, 2, 3, 4];
  const scales = [0.85, 1.0, 1.12, 1.25, 1.40];

  angles.forEach(ang => {
    const fb = playerArrows.create(player.x + 22, player.y, 'fireball_proj');
    fb.setScale(scales[lvl - 1] || 0.85);
    fb.body.setSize(18, 12);
    fb.isFireball = true;
    fb.blastRadius = radii[lvl - 1] || 42;
    fb.dmg = damages[lvl - 1] || 1;
    fb.projId = ++slashCounter;

    const spd = 440 + (lvl - 1) * 35;
    fb.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
    fb.rotation = ang;
  });
}

function explodeFireball(scene, x, y, radius, dmg) {
  sound.playEarthSmash();
  hitFx.explode(14, x, y);
  const blast = scene.add.circle(x, y, 12, 0xff7043, 0.55)
    .setStrokeStyle(3, 0xffeb3b, 0.95).setDepth(1550);
  scene.tweens.add({
    targets: blast,
    radius,
    alpha: 0,
    duration: 250,
    ease: 'Cubic.easeOut',
    onComplete: () => blast.destroy()
  });

  enemies.getChildren().slice().forEach(e => {
    if (e.active && Phaser.Math.Distance.Between(x, y, e.x, e.y) <= radius) {
      damageEnemy(scene, e, dmg);
    }
  });
  enemyArrows.getChildren().slice().forEach(a => {
    if (a.active && Phaser.Math.Distance.Between(x, y, a.x, a.y) <= radius * 0.9) {
      a.destroy();
    }
  });
}

function playerHit(scene, hazard) {
  if (gameState !== 'PLAYING' || !hazard.active) return;

  if (buff.type === 'shield') {
    const lvl = getWeaponLevel('shield');

    // 1. ESCUDO SAGRADO REFLETE PROJÉTEIS MANTENDO A COR/ASPECTO NORMAL + CONTABILIZA CONQUISTA!
    if (enemyArrows.contains(hazard)) {
      const hx = hazard.x, hy = hazard.y;
      hazard.destroy();

      sound.playShieldBlock();
      hitFx.explode(8, hx, hy);
      floatText(scene, player.x, player.y - 28, 'FLECHA REFLETIDA!', '#7fe7ff');
      recordAchievementProgress(scene, 'reflected', 1);

      const spreads = {
        1: [0],
        2: [0],
        3: [-0.12, 0.12],
        4: [-0.20, 0, 0.20],
        5: [-0.28, -0.14, 0, 0.14, 0.28]
      }[lvl] || [0];

      spreads.forEach(ang => {
        const reflArrow = playerArrows.create(player.x + 20, player.y, 'arrow_player');
        reflArrow.body.setSize(18, 8);
        reflArrow.dmg = lvl >= 4 ? 2 : 1;
        reflArrow.pierceCount = lvl >= 4 ? 2 : 1;
        reflArrow.projId = ++slashCounter;
        const spd = lvl === 1 ? 620 : 760;
        reflArrow.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
        reflArrow.rotation = ang;
      });
      return;
    }

    // 2. Impacto corpo a corpo ou golpe do Boss quebra o escudo em uma Onda de Choque Sagrada!
    endBuff();
    sound.playShieldBlock();
    scene.cameras.main.flash(160, 120, 220, 255);
    scene.cameras.main.shake(180, 0.008);
    floatText(scene, player.x, player.y - 32, 'ONDA DE CHOQUE!', '#7fe7ff');

    const shockRadius = 95 + (lvl - 1) * 30;
    const bossDmg = [2, 3, 5, 7, 10][lvl - 1] || 2;

    const wave = scene.add.circle(player.x, player.y, 16, 0x7fe7ff, 0.35)
      .setStrokeStyle(3, 0xffffff).setDepth(1600);
    scene.tweens.add({
      targets: wave,
      radius: shockRadius,
      alpha: 0,
      duration: 320,
      ease: 'Cubic.easeOut',
      onComplete: () => wave.destroy()
    });

    enemies.getChildren().slice().forEach(e => {
      if (e.active && Phaser.Math.Distance.Between(player.x, player.y, e.x, e.y) <= shockRadius + 10) {
        if (e.isBoss) {
          damageEnemy(scene, e, bossDmg);
        } else {
          killEnemy(e);
        }
      }
    });
    enemyArrows.getChildren().slice().forEach(a => {
      if (a.active && Phaser.Math.Distance.Between(player.x, player.y, a.x, a.y) <= shockRadius) {
        a.destroy();
      }
    });
    return;
  }

  if (playerInvulnerable) {
    if (enemyArrows.contains(hazard)) hazard.destroy();
    return;
  }

  playerHp = Math.max(0, playerHp - 1);
  updateHeartsHUD();

  if (playerHp > 0) {
    playerInvulnerable = true;
    if (enemyArrows.contains(hazard)) {
      hazard.destroy();
    } else if (hazard && hazard.active && !hazard.isBoss && !hazard.isBossAttack) {
      killEnemy(hazard);
    }

    sound.playPlayerHurt();
    hitFx.explode(14, player.x, player.y);
    scene.cameras.main.flash(140, 255, 80, 80);
    scene.cameras.main.shake(180, 0.009);
    floatText(scene, player.x, player.y - 30, `-1 CORAÇÃO! (${playerHp}/${playerMaxHp})`, '#ff5252');

    enemyArrows.getChildren().slice().forEach(a => {
      if (a.active && Phaser.Math.Distance.Between(player.x, player.y, a.x, a.y) <= 95) {
        a.destroy();
      }
    });

    scene.tweens.add({
      targets: player,
      alpha: { from: 0.25, to: 1 },
      duration: 110,
      yoyo: true,
      repeat: 5,
      onComplete: () => {
        if (player && player.active) player.setAlpha(1);
        playerInvulnerable = false;
      }
    });
    return;
  }

  gameOver(scene);
}

function gameOver(scene) {
  if (gameState === 'GAMEOVER') return;
  gameState = 'GAMEOVER';
  playerInvulnerable = false;
  pendingLevelUps = 0;

  consolidateSilverToGold();

  if (playerBuffBar) playerBuffBar.clear();
  if (enemyHpBars) enemyHpBars.clear();
  if (activeBoss) clearBossTelegraphs(activeBoss);
  if (pauseModal) {
    pauseModal.destroy();
    pauseModal = null;
  }
  if (draftModal) {
    draftModal.destroy();
    draftModal = null;
  }
  sound.stopBGM();
  sound.playGameOver();
  if (hudContainer) hudContainer.setVisible(false);

  scene.physics.pause();
  scene.time.removeAllEvents();
  scene.time.paused = false;
  scene.time.timeScale = 1;

  if (player) {
    scene.tweens.killTweensOf(player);
    player.setAlpha(1).setTint(0xff5555);
    if (player.anims) player.anims.pause();
  }
  enemies.getChildren().forEach(s => {
    scene.tweens.killTweensOf(s);
    if (s.anims) s.anims.pause();
  });
  items.getChildren().forEach(i => scene.tweens.killTweensOf(i));
  coins.getChildren().forEach(c => scene.tweens.killTweensOf(c));
  if (xpOrbs) xpOrbs.getChildren().forEach(o => scene.tweens.killTweensOf(o));

  hitFx.explode(20, player.x, player.y);
  scene.cameras.main.shake(300, 0.012);
  scene.time.delayedCall(700, () => showInitials(scene));
}

// =============================================================================
// INTERFACE (HUD COM BARRA DE XP, DRAFT DE LEVEL UP, FERREIRO, MAGO & CONQUISTAS)
// =============================================================================
const textStyle = (color, size = 17, weight = 'bold') => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: 'Courier New, monospace'
});

function fitTextToBox(textObj, maxWidth, maxHeight = 999, minFontSize = 10) {
  if (!textObj || !textObj.active) return textObj;
  let currentSize = parseInt(String(textObj.style.fontSize).replace('px', ''), 10) || 14;
  while (currentSize > minFontSize && (textObj.width > maxWidth || textObj.height > maxHeight)) {
    currentSize--;
    textObj.setFontSize(currentSize);
  }
  return textObj;
}

function floatText(scene, x, y, msg, color) {
  const t = scene.add.text(Math.round(x), Math.round(y), msg, { ...textStyle(color, 15), stroke: '#000000', strokeThickness: 4 })
    .setOrigin(0.5).setDepth(1500);
  scene.tweens.add({ targets: t, y: y - 40, alpha: 0, duration: 900, onComplete: () => t.destroy() });
}

// Toast animado de Conquista Desbloqueada em tempo real no topo da tela
function showAchievementToast(scene, ach) {
  if (!scene || !ach) return;
  sound.playAchievement();

  const toast = scene.add.container(400, -50).setDepth(3600).setScrollFactor(0);
  const bg = scene.add.graphics();
  bg.fillStyle(0x16120e, 0.96).fillRoundedRect(-210, -24, 420, 48, 8);
  bg.lineStyle(2.5, 0xffca28).strokeRoundedRect(-210, -24, 420, 48, 8);
  bg.lineStyle(1, 0x8d5524).strokeRoundedRect(-206, -20, 412, 40, 6);

  const crown = scene.add.image(-180, 0, 'hud_crown').setScale(1.1);
  const title = scene.add.text(-156, -13, `🏆 CONQUISTA: ${ach.title}`, textStyle('#ffca28', 12));
  const sub = scene.add.text(-156, 4, `${ach.desc} (+${ach.rewardGold} OURO!)`, textStyle('#7fe7ff', 10));
  fitTextToBox(title, 345, 18, 9);
  fitTextToBox(sub, 345, 16, 8);

  toast.add([bg, crown, title, sub]);

  scene.tweens.add({
    targets: toast,
    y: 42,
    duration: 380,
    ease: 'Back.easeOut',
    onComplete: () => {
      scene.time.delayedCall(2500, () => {
        if (!toast.active) return;
        scene.tweens.add({
          targets: toast,
          y: -60,
          alpha: 0,
          duration: 320,
          onComplete: () => toast.destroy()
        });
      });
    }
  });
}

// -----------------------------------------------------------------------------
// HUD MEDIEVAL EM PIXEL ART (INCLUI BARRA DE XP IN-GAME, CORAÇÕES, PRATA E RELÍQUIA)
// -----------------------------------------------------------------------------
function createHUD(scene) {
  hudContainer = scene.add.container(0, 0).setDepth(2000).setScrollFactor(0).setVisible(false);

  // 1. PAINEL DE GLÓRIA & VIDA (Tempo + Corações) — Esquerda (x: 10..154)
  const gloryBg = scene.add.graphics();
  gloryBg.fillStyle(0x16120e, 0.94).fillRoundedRect(10, 10, 144, 48, 6);
  gloryBg.lineStyle(2, 0xc5a059).strokeRoundedRect(10, 10, 144, 48, 6);
  const hourglass = scene.add.image(26, 34, 'hud_hourglass');
  const gloryLabel = scene.add.text(42, 14, 'GLÓRIA & VIDA', textStyle('#a89260', 9));
  hudGloryText = scene.add.text(42, 26, '0s', textStyle('#f5e6c8', 15));
  hudContainer.add([gloryBg, hourglass, gloryLabel, hudGloryText]);

  hudHearts = [];
  for (let i = 0; i < 4; i++) {
    const heart = scene.add.image(92 + i * 15, 39, 'hud_heart', 0).setScale(1.0);
    hudHearts.push(heart);
    hudContainer.add(heart);
  }
  updateHeartsHUD();

  // 2. PAINEL DE PRATA DA PARTIDA — Centro-Esquerda (x: 160..274)
  const silverBg = scene.add.graphics();
  silverBg.fillStyle(0x16120e, 0.94).fillRoundedRect(160, 10, 114, 48, 6);
  silverBg.lineStyle(2, 0xc5a059).strokeRoundedRect(160, 10, 114, 48, 6);
  const silverIcon = scene.add.image(178, 34, 'silver_coin', 0).setScale(1.2);
  const silverLabel = scene.add.text(194, 16, 'PRATA', textStyle('#b0bec5', 10));
  hudSilverText = scene.add.text(194, 28, '0', textStyle('#e0f7fa', 18));
  hudContainer.add([silverBg, silverIcon, silverLabel, hudSilverText]);

  // 3. PAINEL DE RELÍQUIA / EQUIPAMENTO ATIVO — Centro (x: 280..514)
  const itemBg = scene.add.graphics();
  itemBg.fillStyle(0x16120e, 0.94).fillRoundedRect(280, 10, 234, 48, 6);
  itemBg.lineStyle(2, 0xc5a059).strokeRoundedRect(280, 10, 234, 48, 6);

  const slotFrame = scene.add.graphics();
  slotFrame.fillStyle(0x221a14, 1).fillRoundedRect(288, 16, 36, 36, 4);
  slotFrame.lineStyle(1, 0x8d5524).strokeRoundedRect(288, 16, 36, 36, 4);

  hudItemIcon = scene.add.image(306, 34, 'item_bow').setVisible(false);
  hudItemName = scene.add.text(330, 16, 'SEM RELÍQUIA', textStyle('#7a7265', 11));
  hudItemBar = scene.add.graphics();
  hudItemTime = scene.add.text(478, 35.5, '', textStyle('#ffca28', 11)).setOrigin(0.5, 0.5);
  hudContainer.add([itemBg, slotFrame, hudItemIcon, hudItemName, hudItemBar, hudItemTime]);

  // 4. PAINEL DE RECORDE DO REINO — Direita (x: 520..682)
  const bestBg = scene.add.graphics();
  bestBg.fillStyle(0x16120e, 0.94).fillRoundedRect(520, 10, 162, 48, 6);
  bestBg.lineStyle(2, 0xc5a059).strokeRoundedRect(520, 10, 162, 48, 6);
  const crown = scene.add.image(540, 34, 'hud_crown');
  const bestLabel = scene.add.text(562, 16, 'RECORDE', textStyle('#a89260', 10));
  hudBestText = scene.add.text(562, 28, `${getBestScore()}s`, textStyle('#ffca28', 17));
  hudContainer.add([bestBg, crown, bestLabel, hudBestText]);

  // 5. BOTÃO DE SOM RÁPIDO [M] — Superior Direito (x: 688..736)
  const soundBtnBg = scene.add.graphics();
  const drawSoundBtn = (hover = false) => {
    soundBtnBg.clear();
    soundBtnBg.fillStyle(hover ? 0x2e241c : 0x16120e, 0.94).fillRoundedRect(688, 10, 48, 48, 6);
    soundBtnBg.lineStyle(2, hover ? 0xffca28 : 0xc5a059).strokeRoundedRect(688, 10, 48, 48, 6);
  };
  drawSoundBtn(false);

  hudHornIcon = scene.add.image(712, 34, 'hud_horn', sound.isMuted() ? 1 : 0);
  const soundHitArea = scene.add.rectangle(712, 34, 48, 48, 0x000000, 0)
    .setInteractive({ useHandCursor: true });

  const toggleAudio = () => {
    sound.toggleMute();
    sound.playButtonClick();
    hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
    if (menuContainer && menuContainer.updateMenuHorn) menuContainer.updateMenuHorn();
  };

  soundHitArea.on('pointerover', () => drawSoundBtn(true));
  soundHitArea.on('pointerout', () => drawSoundBtn(false));
  soundHitArea.on('pointerdown', toggleAudio);

  scene.input.keyboard.on('keydown-M', () => {
    if (gameState === 'GAMEOVER') return;
    sound.toggleMute();
    if (hudHornIcon) hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
    if (pauseModal && pauseModal.updateAudio) pauseModal.updateAudio();
    if (menuContainer && menuContainer.updateMenuHorn) menuContainer.updateMenuHorn();
  });

  // 6. BOTÃO DE TELA CHEIA RÁPIDO [F] — Extremo Superior Direito (x: 742..790)
  const fsBtnBg = scene.add.graphics();
  const drawFsBtn = (hover = false) => {
    fsBtnBg.clear();
    fsBtnBg.fillStyle(hover ? 0x2e241c : 0x16120e, 0.94).fillRoundedRect(742, 10, 48, 48, 6);
    fsBtnBg.lineStyle(2, hover ? 0xffca28 : 0xc5a059).strokeRoundedRect(742, 10, 48, 48, 6);
  };
  drawFsBtn(false);

  hudFullscreenIcon = scene.add.image(766, 34, 'hud_fullscreen', isGameFullscreen(scene) ? 1 : 0);
  const fsHitArea = scene.add.rectangle(766, 34, 48, 48, 0x000000, 0)
    .setInteractive({ useHandCursor: true });

  fsHitArea.on('pointerover', () => drawFsBtn(true));
  fsHitArea.on('pointerout', () => drawFsBtn(false));
  fsHitArea.on('pointerdown', () => {
    sound.playButtonClick();
    toggleFullscreen(scene);
  });

  hudContainer.add([soundBtnBg, hudHornIcon, soundHitArea, fsBtnBg, hudFullscreenIcon, fsHitArea]);

  // 7. BARRA DE EXPERIÊNCIA (XP) DA PARTIDA — Faixa Horizontal Nobre (x: 10..790, y: 61..77)
  const xpFrame = scene.add.graphics();
  xpFrame.fillStyle(0x120e0b, 0.94).fillRoundedRect(10, 61, 780, 16, 4);
  xpFrame.lineStyle(1.5, 0xc5a059).strokeRoundedRect(10, 61, 780, 16, 4);
  hudXpBar = scene.add.graphics();
  const xpGemIcon = scene.add.image(22, 69, 'xp_orb', 0).setScale(0.95);
  hudLevelText = scene.add.text(34, 69, 'NÍVEL 1', textStyle('#ffca28', 10)).setOrigin(0, 0.5);
  hudXpText = scene.add.text(780, 69, 'XP: 0 / 6', textStyle('#7fe7ff', 10)).setOrigin(1, 0.5);
  hudContainer.add([xpFrame, hudXpBar, xpGemIcon, hudLevelText, hudXpText]);
  updateXpHUD();

  // 8. BARRA DE VIDA DO CHEFÃO (Oculta até os 120s da Boss Fight; posicionada abaixo da Barra de XP)
  bossHudContainer = scene.add.container(0, 0).setVisible(false);
  const bossBg = scene.add.graphics();
  bossBg.fillStyle(0x160d0b, 0.94).fillRoundedRect(236, 80, 328, 30, 5);
  bossBg.lineStyle(2, 0xd83a3a).strokeRoundedRect(236, 80, 328, 30, 5);
  const bossTitle = scene.add.text(252, 83, 'GOLEM ANCESTRAL DE PEDRA', textStyle('#ff8a80', 10));
  bossHpText = scene.add.text(548, 83, `${BOSS_MAX_HP}/${BOSS_MAX_HP}`, textStyle('#ffca28', 10)).setOrigin(1, 0);
  bossHpBar = scene.add.graphics();
  bossHudContainer.add([bossBg, bossTitle, bossHpBar, bossHpText]);
  hudContainer.add(bossHudContainer);
}

function updateXpHUD() {
  if (!hudXpBar || !hudLevelText || !hudXpText) return;
  hudXpBar.clear();
  const barX = 110;
  const barY = 64;
  const barW = 575;
  const barH = 10;

  hudXpBar.fillStyle(0x090705, 1).fillRect(barX, barY, barW, barH);
  hudXpBar.lineStyle(1, 0x3a2e21).strokeRect(barX, barY, barW, barH);

  const pct = Phaser.Math.Clamp(xpToNextLevel > 0 ? runXp / xpToNextLevel : 0, 0, 1);
  const fillW = Math.max(0, Math.round((barW - 2) * pct));
  if (fillW > 0) {
    hudXpBar.fillStyle(0x00c853, 1).fillRect(barX + 1, barY + 1, fillW, barH - 2);
    hudXpBar.fillStyle(0x7fe7ff, 0.7).fillRect(barX + 1, barY + 1, fillW, 3);
  }

  hudLevelText.setText(`NÍVEL ${runLevel}`);
  hudXpText.setText(`XP: ${runXp} / ${xpToNextLevel}`);
}

function updateHeartsHUD() {
  if (!hudHearts || !hudHearts.length) return;
  const maxH = playerMaxHp || getPlayerMaxHp();
  hudHearts.forEach((h, idx) => {
    if (!h || !h.active) return;
    if (idx < maxH) {
      h.setVisible(true);
      h.setFrame(idx < playerHp ? 0 : 1);
    } else {
      h.setVisible(false);
    }
  });
}

// Atualiza o slot e a barra de duração gráfica do item ativo
function updateItemHUD() {
  if (!buff.type) {
    hudItemIcon.setVisible(false);
    hudItemName.setText('SEM RELÍQUIA').setColor('#7a7265');
    hudItemTime.setText('');
    hudItemBar.clear();
    if (playerBuffBar) playerBuffBar.clear();
    return;
  }

  const texKey = buff.type === 'shield' ? 'shield_worn' : 'item_' + buff.type;
  hudItemIcon.setTexture(texKey).setVisible(true);

  const lvl = getWeaponLevel(buff.type);
  const label = BUFF_NAMES[buff.type] || 'RELÍQUIA';
  hudItemName.setText(`${label} NV.${lvl}`).setColor('#7fe7ff');
  fitTextToBox(hudItemName, 174, 18, 9);

  const remaining = Math.max(0, buff.timeLeft);
  hudItemTime.setText(`${remaining.toFixed(1)}s`);

  const maxTime = buff.maxTime || BUFF_TIME[buff.type] || 6;
  const pct = Phaser.Math.Clamp(remaining / maxTime, 0, 1);
  const barW = 114;
  const barH = 7;
  const barX = 330;
  const barY = 32;

  hudItemBar.clear();
  hudItemBar.fillStyle(0x100e0b, 1).fillRect(barX, barY, barW, barH);
  hudItemBar.lineStyle(1, 0x4a3b2c).strokeRect(barX, barY, barW, barH);

  const barColor = remaining <= 2 ? 0xd83a3a : (
    buff.type === 'shield' ? 0x26a69a :
    buff.type === 'firestaff' ? 0xff7043 :
    buff.type === 'axe' ? 0xab47bc : 0xf2c14e
  );
  hudItemBar.fillStyle(barColor, 1).fillRect(barX + 1, barY + 1, Math.max(0, (barW - 2) * pct), barH - 2);

  if (playerBuffBar && player && player.visible && (gameState === 'PLAYING' || gameState === 'PAUSED' || gameState === 'LEVEL_UP')) {
    playerBuffBar.clear();
    const pW = 32;
    const pH = 5;
    const pX = Math.round(player.x - pW / 2);
    const pY = Math.round(player.y - 25);

    playerBuffBar.fillStyle(0x0e0b08, 0.95).fillRect(pX - 1, pY - 1, pW + 2, pH + 2);
    playerBuffBar.fillStyle(0x221a14, 0.95).fillRect(pX, pY, pW, pH);

    const overheadColor = remaining <= 1.8 ? 0xff3030 : (
      buff.type === 'shield' ? 0x7fe7ff :
      buff.type === 'firestaff' ? 0xff7043 :
      buff.type === 'axe' ? 0xce93d8 :
      buff.type === 'bow' ? 0xffeb3b : 0xffffff
    );
    const fillW = Math.max(0, Math.round(pW * pct));
    playerBuffBar.fillStyle(overheadColor, 1).fillRect(pX, pY, fillW, pH);
  }
}

// -----------------------------------------------------------------------------
// SISTEMA DE LEVEL UP & INTERFACE DE SELEÇÃO DE 3 CARTAS (RNG DRAFT SCREEN)
// -----------------------------------------------------------------------------
function rollLevelUpCards() {
  const unlockedKeys = getUnlockedWeaponPool();
  const weaponCards = [];

  unlockedKeys.forEach(key => {
    const cfg = WEAPON_CATALOG[key];
    const currLvl = getWeaponLevel(key);
    if (cfg && currLvl < MAX_WEAPON_LEVEL) {
      const nextLvl = currLvl + 1;
      const isHeld = buff.type === key;
      weaponCards.push({
        id: `upg_${key}_${nextLvl}`,
        category: isHeld ? 'ARMA EQUIPADA' : 'EVOLUÇÃO DE ARMA',
        title: cfg.name,
        badge: `NV. ${currLvl} ➔ NV. ${nextLvl}`,
        badgeColor: nextLvl === MAX_WEAPON_LEVEL ? '#ffca28' : '#7fe7ff',
        borderColor: nextLvl === MAX_WEAPON_LEVEL ? 0xffca28 : 0x7fe7ff,
        icon: cfg.icon,
        desc: `${cfg.levels[nextLvl - 1]}\n\n✦ Equipa esta arma imediatamente!`,
        weight: isHeld ? 3 : 2,
        apply: (scene) => {
          runWeaponLevels[key] = nextLvl;
          equipWeaponBuff(scene, key, false);
          floatText(scene, player.x, player.y - 28, `${cfg.name} NV.${nextLvl}!`, '#ffca28');
        }
      });
    }
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

  // Se o jogador já maximizou várias armas, adiciona cartas de Mestria para as armas Nv.5
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

  const selected = [];
  const usedIds = new Set();

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
      ...textStyle('#ffca28', 15),
      fontFamily: 'Georgia, serif',
      align: 'center'
    }).setOrigin(0.5);
    fitTextToBox(nameTxt, cardW - 22, 24, 11);

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

function restartScene(scene, autoStart = false, openShop = false, shopTab = 'mage') {
  if (pauseModal) {
    pauseModal.destroy();
    pauseModal = null;
  }
  if (menuContainer) {
    menuContainer.destroy();
    menuContainer = null;
  }
  sound.stopBGM();
  scene.physics.resume();
  scene.time.paused = false;
  scene.time.timeScale = 1;
  scene.tweens.resumeAll();
  scene.scene.restart({ autoStart, openShop, shopTab });
}

// Função unificada de saída de submenus (usada tanto pela tecla ESC quanto pelo botão Voltar/Sair)
function exitSubMenu(scene) {
  if (!scene) return;
  sound.playButtonClick();
  showMainMenu(scene);
}

// -----------------------------------------------------------------------------
// MENU PRINCIPAL DE TELA COMPLETA (CAPA DE JOGO 800x600)
// -----------------------------------------------------------------------------
function showMainMenu(scene) {
  if (menuContainer) menuContainer.destroy();
  gameState = 'MENU';
  sound.startMenuBGM();

  menuContainer = scene.add.container(0, 0).setDepth(3000).setScrollFactor(0);
  menuContainer.isMainMenu = true;
  const art = scene.add.graphics();

  // 1. CÉU CREPUSCULAR DO REINO (Degradê em faixas de Pixel Art)
  const skyBands = [
    [0, 55, 0x090d1c],
    [55, 50, 0x121b36],
    [105, 45, 0x1f2247],
    [150, 45, 0x38234a],
    [195, 40, 0x5e2f3d],
    [235, 35, 0x8c492b],
    [270, 30, 0xb86b35]
  ];
  skyBands.forEach(([y, h, color]) => art.fillStyle(color, 1).fillRect(0, y, 800, h));

  const starCoords = [
    [55, 30], [115, 65], [180, 28], [260, 48], [340, 25], [440, 42], [510, 70],
    [690, 35], [750, 68], [85, 118], [155, 102], [295, 95], [480, 108], [735, 115]
  ];
  starCoords.forEach(([sx, sy], i) => {
    art.fillStyle(i % 3 === 0 ? 0xffeb3b : 0xffffff, 0.85).fillRect(sx, sy, i % 2 === 0 ? 3 : 2, i % 2 === 0 ? 3 : 2);
  });
  art.lineStyle(1, 0x7fe7ff, 0.22);
  art.lineBetween(55, 30, 115, 65);
  art.lineBetween(115, 65, 180, 28);
  art.lineBetween(180, 28, 260, 48);

  // Lua Cheia Dourada atrás do Castelo Real
  art.fillStyle(0xffca28, 0.12).fillCircle(610, 145, 76);
  art.fillStyle(0xffca28, 0.24).fillCircle(610, 145, 54);
  art.fillStyle(0xfff3c4, 0.96).fillCircle(610, 145, 36);
  art.fillStyle(0xf2c14e, 0.45).fillCircle(622, 136, 8).fillCircle(598, 154, 11);

  // 2. CORDILHEIRA DE MONTANHAS & CASTELO DO REINO AO HORIZONTE
  art.fillStyle(0x1b152b, 1);
  art.fillTriangle(-20, 285, 130, 155, 290, 285);
  art.fillTriangle(190, 285, 355, 170, 510, 285);
  art.fillTriangle(430, 285, 605, 140, 770, 285);
  art.fillTriangle(640, 285, 760, 180, 840, 285);

  art.fillStyle(0x2c2240, 1);
  art.fillTriangle(130, 155, 210, 285, 290, 285);
  art.fillTriangle(355, 170, 430, 285, 510, 285);

  const cx = 555, cy = 148;
  art.fillStyle(0x120d1d, 1);
  art.fillRect(cx, cy + 32, 110, 65);
  art.fillRect(cx - 12, cy + 16, 24, 80);
  art.fillRect(cx + 98, cy + 16, 24, 80);
  art.fillRect(cx + 35, cy - 12, 40, 108);
  art.fillRect(cx + 18, cy + 6, 18, 90);
  art.fillRect(cx + 74, cy + 6, 18, 90);

  art.fillStyle(0x2f6fd6, 1);
  art.fillTriangle(cx - 16, cy + 16, cx, cy - 6, cx + 16, cy + 16);
  art.fillTriangle(cx + 94, cy + 16, cx + 110, cy - 6, cx + 126, cy + 16);
  art.fillTriangle(cx + 30, cy - 12, cx + 55, cy - 44, cx + 80, cy - 12);

  art.lineStyle(2, 0xc5a059, 1);
  art.lineBetween(cx + 55, cy - 44, cx + 55, cy - 58);
  art.fillStyle(0xd83a3a, 1).fillTriangle(cx + 55, cy - 58, cx + 73, cy - 53, cx + 55, cy - 48);

  art.fillStyle(0xffeb3b, 0.95);
  art.fillRect(cx + 51, cy - 2, 8, 14);
  art.fillRect(cx + 46, cy + 20, 6, 10);
  art.fillRect(cx + 58, cy + 20, 6, 10);
  art.fillRect(cx - 3, cy + 28, 6, 10);
  art.fillRect(cx + 107, cy + 28, 6, 10);
  art.fillStyle(0x3a2414, 1).fillRect(cx + 45, cy + 58, 20, 32);
  art.fillStyle(0xffa726, 0.7).fillRect(cx + 49, cy + 64, 12, 24);

  // 3. COLINAS VERDES, FLORESTA E O CAMINHO REAL SINUOSO
  art.fillStyle(0x16331a, 1).fillRect(0, 265, 800, 335);
  art.fillStyle(0x1f4724, 1);
  art.fillEllipse(210, 340, 560, 150);
  art.fillEllipse(620, 355, 520, 140);
  art.fillStyle(0x2a5c2f, 1);
  art.fillEllipse(400, 495, 920, 270);

  const roadPolys = [
    { y1: 242, y2: 285, x1L: 602, x1R: 618, x2L: 520, x2R: 552 },
    { y1: 285, y2: 345, x1L: 520, x1R: 552, x2L: 370, x2R: 425 },
    { y1: 345, y2: 430, x1L: 370, x1R: 425, x2L: 285, x2R: 380 },
    { y1: 430, y2: 600, x1L: 285, x1R: 380, x2L: 160, x2R: 470 }
  ];
  roadPolys.forEach(s => {
    art.fillStyle(0x6e5233, 1).fillPoints([
      { x: s.x1L - 5, y: s.y1 }, { x: s.x1R + 5, y: s.y1 },
      { x: s.x2R + 7, y: s.y2 }, { x: s.x2L - 7, y: s.y2 }
    ], true);
    art.fillStyle(0x9b7b4f, 1).fillPoints([
      { x: s.x1L, y: s.y1 }, { x: s.x1R, y: s.y1 },
      { x: s.x2R, y: s.y2 }, { x: s.x2L, y: s.y2 }
    ], true);
  });

  art.fillStyle(0x4b4e58, 0.75).fillEllipse(370, 360, 210, 52);

  // Pedestal Rochoso Heróico no Primeiro Plano Esquerdo (onde está o Cavaleiro)
  art.fillStyle(0x1f2126, 1).fillEllipse(205, 470, 200, 58);
  art.fillStyle(0x373a42, 1).fillEllipse(205, 461, 184, 48);
  art.fillStyle(0x525763, 1).fillEllipse(205, 455, 158, 36);
  art.fillStyle(0x000000, 0.45).fillEllipse(205, 451, 88, 18);

  art.fillStyle(0x000000, 0.32).fillEllipse(310, 355, 84, 18);
  art.fillStyle(0x000000, 0.32).fillEllipse(418, 344, 46, 14);
  art.fillStyle(0x000000, 0.35).fillEllipse(68, 435, 62, 14);

  menuContainer.add(art);

  // 4. A VILA DE VALE DOURADO NO CAMINHO + O CAVALEIRO HERÓICO
  const treeFar = scene.add.image(492, 292, 'tree').setScale(0.72);
  const menuHouse = scene.add.image(235, 318, 'village_house').setScale(0.88);
  const menuBlacksmith = scene.add.image(312, 326, 'village_blacksmith').setScale(0.82);
  const menuGateTower = scene.add.image(416, 314, 'village_gate_tower').setScale(0.76);
  const treeLeft = scene.add.image(68, 395, 'tree').setScale(1.2);

  const heroSprite = scene.add.image(205, 392, 'knight_banner').setScale(2.2);
  scene.tweens.add({
    targets: heroSprite,
    y: 386,
    duration: 1300,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // 5. BRASÃO DE TÍTULO NO TOPO E BOTÕES RÁPIDOS DE ÁUDIO [M] E TELA CHEIA [F]
  const headerBanner = scene.add.graphics();
  headerBanner.fillStyle(0x14100c, 0.90).fillRoundedRect(82, 16, 580, 82, 10);
  headerBanner.lineStyle(2.5, 0x8d5524, 1).strokeRoundedRect(82, 16, 580, 82, 10);
  headerBanner.lineStyle(1.2, 0xc5a059, 0.9).strokeRoundedRect(87, 21, 570, 72, 8);

  const titleShadow = scene.add.text(374, 46, 'A JORNADA DO CAVALEIRO', {
    ...textStyle('#060403', 26), fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);
  const titleMain = scene.add.text(372, 44, 'A JORNADA DO CAVALEIRO', {
    ...textStyle('#ffca28', 26), fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);
  const subtitleTxt = scene.add.text(372, 75, '★ CRÔNICAS DO REINO & ROGUELITE DE AÇÃO ★', textStyle('#e0c088', 11)).setOrigin(0.5);

  // Botão rápido de Som [M] no canto superior direito da Capa
  const menuSoundBg = scene.add.graphics();
  const drawMenuSound = (hover = false) => {
    menuSoundBg.clear();
    menuSoundBg.fillStyle(hover ? 0x2e241c : 0x14100c, 0.92).fillRoundedRect(674, 22, 50, 50, 8);
    menuSoundBg.lineStyle(2, hover ? 0xffca28 : 0xc5a059).strokeRoundedRect(674, 22, 50, 50, 8);
  };
  drawMenuSound(false);
  const menuHorn = scene.add.image(699, 47, 'hud_horn', sound.isMuted() ? 1 : 0);
  const menuSoundHit = scene.add.rectangle(699, 47, 50, 50, 0x000000, 0).setInteractive({ useHandCursor: true });
  menuContainer.updateMenuHorn = () => {
    if (menuHorn && menuHorn.active) menuHorn.setFrame(sound.isMuted() ? 1 : 0);
  };
  menuSoundHit.on('pointerover', () => drawMenuSound(true));
  menuSoundHit.on('pointerout', () => drawMenuSound(false));
  menuSoundHit.on('pointerdown', () => {
    sound.toggleMute();
    sound.playButtonClick();
    if (!sound.isMuted()) sound.startMenuBGM();
    menuContainer.updateMenuHorn();
    if (hudHornIcon) hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
  });

  // Botão rápido de Tela Cheia [F] ao lado do botão de Som
  const menuFsBg = scene.add.graphics();
  const drawMenuFs = (hover = false) => {
    menuFsBg.clear();
    menuFsBg.fillStyle(hover ? 0x2e241c : 0x14100c, 0.92).fillRoundedRect(732, 22, 50, 50, 8);
    menuFsBg.lineStyle(2, hover ? 0xffca28 : 0xc5a059).strokeRoundedRect(732, 22, 50, 50, 8);
  };
  drawMenuFs(false);
  const menuFsIcon = scene.add.image(757, 47, 'hud_fullscreen', isGameFullscreen(scene) ? 1 : 0);
  const menuFsHit = scene.add.rectangle(757, 47, 50, 50, 0x000000, 0).setInteractive({ useHandCursor: true });
  menuContainer.updateMenuFullscreen = () => {
    if (menuFsIcon && menuFsIcon.active) menuFsIcon.setFrame(isGameFullscreen(scene) ? 1 : 0);
  };
  menuFsHit.on('pointerover', () => drawMenuFs(true));
  menuFsHit.on('pointerout', () => drawMenuFs(false));
  menuFsHit.on('pointerdown', () => {
    sound.playButtonClick();
    toggleFullscreen(scene);
  });

  // Painel de Ações à Direita (Com Indicador de Recorde + Tesouro de Ouro + Loja de Upgrades)
  const menuPanel = scene.add.graphics();
  menuPanel.fillStyle(0x14100c, 0.92).fillRoundedRect(442, 244, 326, 306, 12);
  menuPanel.lineStyle(2.5, 0x8d5524, 1).strokeRoundedRect(442, 244, 326, 306, 12);
  menuPanel.lineStyle(1.2, 0xc5a059, 0.85).strokeRoundedRect(447, 249, 316, 296, 9);

  const crownIcon = scene.add.image(474, 272, 'hud_crown').setScale(0.85);
  const bestBannerTxt = scene.add.text(490, 272, `RECORDE: ${getBestScore()}s`, textStyle('#ffca28', 12)).setOrigin(0, 0.5);

  const menuCoinIcon = scene.add.image(626, 272, 'gold_coin', 0).setScale(1.15);
  const menuGoldTxt = scene.add.text(642, 272, `OURO: ${getGold()}`, textStyle('#ffd740', 12)).setOrigin(0, 0.5);

  menuPanel.lineStyle(1, 0xc5a059, 0.4).lineBetween(464, 292, 746, 292);

  const clearMenuKeys = () => {
    scene.input.keyboard.off('keydown-SPACE', onKeyStart);
    scene.input.keyboard.off('keydown-ENTER', onKeyStart);
  };

  const launchGame = () => {
    clearMenuKeys();
    sound.ensureContext();
    menuContainer.destroy();
    menuContainer = null;
    startGameplay(scene);
  };

  const startBtn = createButton(scene, 605, 320, '⚔ COMEÇAR JORNADA', launchGame, 276, 38);
  const blacksmithBtn = createButton(scene, 605, 362, 'FORJA DO FERREIRO', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showBlacksmithMenu(scene);
  }, 276, 36);
  const mageBtn = createButton(scene, 605, 404, 'SANTUÁRIO DO MAGO', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showMageShopMenu(scene);
  }, 276, 36);
  const achBtn = createButton(scene, 605, 446, 'CONQUISTAS DO REINO', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showAchievementsMenu(scene);
  }, 276, 36);
  const recordsBtn = createButton(scene, 532, 488, 'RECORDES', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showRecordsMenu(scene);
  }, 132, 34);
  const settingsBtn = createButton(scene, 678, 488, 'AJUSTES', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showSettingsMenu(scene);
  }, 132, 34);

  const startHint = scene.add.text(605, 524, '[ESPAÇO] ou [ENTER] para iniciar', textStyle('#c5a059', 11)).setOrigin(0.5);

  // Faixa de Rodapé Completa
  const footerBg = scene.add.rectangle(400, 578, 800, 32, 0x0c0907, 0.92);
  const footerLine = scene.add.graphics().lineStyle(1, 0x8d5524, 0.8).lineBetween(0, 562, 800, 562);
  const footerTxt = scene.add.text(400, 578, 'Mover: WASD/Setas  |  Pausar: ESC  |  Áudio: M  |  Tela Cheia: F', textStyle('#d6c8aa', 11)).setOrigin(0.5);

  menuContainer.add([
    treeFar, menuHouse, menuBlacksmith, menuGateTower,
    treeLeft, heroSprite,
    headerBanner, titleShadow, titleMain, subtitleTxt,
    menuSoundBg, menuHorn, menuSoundHit,
    menuFsBg, menuFsIcon, menuFsHit,
    menuPanel, crownIcon, bestBannerTxt, menuCoinIcon, menuGoldTxt,
    ...startBtn, ...blacksmithBtn, ...mageBtn, ...achBtn, ...recordsBtn, ...settingsBtn, startHint,
    footerBg, footerLine, footerTxt
  ]);

  function onKeyStart(e) {
    if (gameState !== 'MENU') return;
    if (e.code === 'Space' || e.code === 'Enter') {
      sound.playButtonClick();
      launchGame();
    }
  }
  scene.input.keyboard.once('keydown-SPACE', onKeyStart);
  scene.input.keyboard.once('keydown-ENTER', onKeyStart);
}

// // -----------------------------------------------------------------------------
// A FORJA DO FERREIRO REAL (DESBLOQUEIO DE ARMAS & ARSENAL DE COMBATE)
// -----------------------------------------------------------------------------
function showBlacksmithMenu(scene) {
  if (!scene) return;
  gameState = 'MENU';
  scene.time.paused = false;
  scene.time.timeScale = 1;
  scene.tweens.resumeAll();

  if (menuContainer) menuContainer.destroy();
  sound.startMenuBGM();

  menuContainer = createModal(
    scene,
    'A FORJA DO FERREIRO REAL',
    564,
    'Comissione e desbloqueie armas de combate com o Ouro de suas expedições',
    740
  );
  menuContainer.isMainMenu = false;

  // Botão Rápido "✕ SAIR [ESC]" no canto superior direito do modal
  const closeQuickBtn = scene.add.rectangle(712, 46, 78, 28, 0x5c241b)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(712, 46, '✕ SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);
  closeQuickBtn.on('pointerover', () => closeQuickBtn.setFillStyle(0x8e2a1b));
  closeQuickBtn.on('pointerout', () => closeQuickBtn.setFillStyle(0x5c241b));
  closeQuickBtn.on('pointerdown', () => exitSubMenu(scene));
  menuContainer.add([closeQuickBtn, closeQuickTxt]);

  // 1. VINHETA VIVA DO MESTRE FERREIRO (com Sprite Animado 'blacksmith_master')
  const forgeBg = scene.add.graphics();
  forgeBg.fillStyle(0x221510, 0.96).fillRoundedRect(56, 92, 420, 54, 7);
  forgeBg.lineStyle(1.5, 0xd83a3a).strokeRoundedRect(56, 92, 420, 54, 7);

  const blacksmithSprite = scene.add.sprite(86, 119, 'blacksmith_master').play('blacksmith_master').setScale(1.2);
  const smithName = scene.add.text(118, 99, 'MESTRE ANVILGAR (FERREIRO REAL)', textStyle('#ffca28', 11));
  const smithSpeech = scene.add.text(118, 117, '“O fogo forja o aço! Armas compradas entram na floresta.”', {
    ...textStyle('#f5e6c8', 10, 'normal'),
    wordWrap: { width: 345, useAdvancedWrap: true }
  });
  fitTextToBox(smithSpeech, 345, 24, 9);

  // 2. PAINEL DE OURO DISPONÍVEL (x: 486..740)
  const goldBadge = scene.add.graphics();
  goldBadge.fillStyle(0x261c12, 0.98).fillRoundedRect(486, 92, 258, 54, 7);
  goldBadge.lineStyle(2, 0xffca28).strokeRoundedRect(486, 92, 258, 54, 7);
  const coinSprite = scene.add.sprite(514, 119, 'gold_coin').play('gold_coin').setScale(1.3);
  const goldValTxt = scene.add.text(536, 111, `OURO: ${getGold()}`, textStyle('#ffd740', 14)).setOrigin(0, 0.5);
  fitTextToBox(goldValTxt, 195, 22, 11);
  const goldHint = scene.add.text(536, 129, 'Ganho em expedições e conquistas', textStyle('#a8987b', 10)).setOrigin(0, 0.5);

  menuContainer.add([forgeBg, blacksmithSprite, smithName, smithSpeech, goldBadge, coinSprite, goldValTxt, goldHint]);

  // 3. CARTAS DE ARMAS DA FORJA (5 Armas: Arco, Espada, Escudo, Machado, Cajado de Fogo)
  const upgrades = getUpgrades();
  const weaponKeys = ['bow', 'sword', 'shield', 'axe', 'firestaff'];
  const weaponStyles = {
    bow: 'Disparos rápidos à distância (perfeito para eliminar arqueiros e magos).',
    sword: 'Corte frontal potente em arco com knockback e rastro dourado.',
    shield: 'Aura defensiva sagrada que bloqueia e reflete projéteis inimigos.',
    axe: 'Corte giratório pesado e devastador que acerta múltiplos inimigos ao redor.',
    firestaff: 'Projéteis arcanos explosivos com dano em área e alta potência de impacto.'
  };

  weaponKeys.forEach((key, idx) => {
    const cfg = WEAPON_CATALOG[key];
    if (!cfg) return;
    const isUnlocked = Boolean(upgrades[key]?.unlocked);
    const isStarter = upgrades.starterWeapon === key;
    const rowY = 178 + idx * 68;

    const rowBg = scene.add.graphics();
    rowBg.fillStyle(isUnlocked ? 0x221a13 : 0x17120e, 0.95).fillRoundedRect(56, rowY - 28, 688, 60, 7);
    rowBg.lineStyle(1.5, isStarter ? 0xffca28 : (isUnlocked ? 0x8d5524 : 0x4a3b2c)).strokeRoundedRect(56, rowY - 28, 688, 60, 7);

    const slotBg = scene.add.graphics();
    slotBg.fillStyle(0x120d0a, 1).fillRoundedRect(68, rowY - 20, 44, 44, 5);
    slotBg.lineStyle(1.5, isStarter ? 0xffca28 : (isUnlocked ? 0xc5a059 : 0x5c4938)).strokeRoundedRect(68, rowY - 20, 44, 44, 5);

    const icon = scene.add.image(90, rowY + 2, cfg.icon).setScale(1.3);
    if (!isUnlocked) icon.setTint(0x555555);

    const nameTxt = scene.add.text(124, rowY - 20, cfg.name, textStyle(isUnlocked ? '#ffca28' : '#8c7b6b', 13));
    const statusBadge = scene.add.text(
      330,
      rowY - 14,
      isStarter ? '★ ARMA INICIAL ATIVA' : (isUnlocked ? '✦ DESBLOQUEADA' : `BLOQUEADA (${cfg.unlockCost}G)`),
      textStyle(isStarter ? '#ffd740' : (isUnlocked ? '#7fe7ff' : '#ff8a80'), 10)
    ).setOrigin(0, 0.5);

    const descTxt = scene.add.text(124, rowY - 3, weaponStyles[key] || cfg.desc, {
      ...textStyle(isUnlocked ? '#e0d2b4' : '#9c8d73', 10, 'normal'),
      lineSpacing: 2,
      wordWrap: { width: 380, useAdvancedWrap: true }
    });
    fitTextToBox(descTxt, 380, 32, 9);

    menuContainer.add([rowBg, slotBg, icon, nameTxt, statusBadge, descTxt]);

    const btnX = 638, btnY = rowY + 2, btnW = 182, btnH = 40;
    if (!isUnlocked) {
      const cost = cfg.unlockCost || 25;
      const canAfford = getGold() >= cost;
      const buyBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, canAfford ? 0x246b3d : 0x3b2c22)
        .setStrokeStyle(2, canAfford ? 0xffca28 : 0x6e5846)
        .setInteractive({ useHandCursor: true });
      const buyTxt = scene.add.text(btnX, btnY, `DESBLOQUEAR (${cost}G)`, textStyle(canAfford ? '#ffffff' : '#8c7b6b', 11)).setOrigin(0.5);
      fitTextToBox(buyTxt, btnW - 12, btnH - 8, 9);

      buyBtn.on('pointerover', () => {
        if (canAfford) {
          buyBtn.setFillStyle(0x2f8a4f);
          buyBtn.setStrokeStyle(2, 0xffeb3b);
          buyTxt.setColor('#ffeb3b');
        }
      });
      buyBtn.on('pointerout', () => {
        buyBtn.setFillStyle(canAfford ? 0x246b3d : 0x3b2c22);
        buyBtn.setStrokeStyle(2, canAfford ? 0xffca28 : 0x6e5846);
        buyTxt.setColor(canAfford ? '#ffffff' : '#8c7b6b');
      });
      buyBtn.on('pointerdown', () => {
        if (getGold() < cost) {
          sound.playShieldBlock();
          floatText(scene, btnX, btnY - 18, 'OURO INSUFICIENTE!', '#ff5252');
          return;
        }
        addGold(-cost);
        const curr = getUpgrades();
        curr[key].unlocked = true;
        curr.starterWeapon = key;
        saveUpgrades(curr);
        sound.playItemCollect();
        sound.playCoin();
        showBlacksmithMenu(scene);
        floatText(scene, btnX, btnY - 22, `${cfg.name} FORJADA!`, '#ffd740');
      });

      menuContainer.add([buyBtn, buyTxt]);
    } else {
      const equipBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, isStarter ? 0x1f4724 : 0x6e3d1b)
        .setStrokeStyle(2, isStarter ? 0xffca28 : 0xc5a059)
        .setInteractive({ useHandCursor: true });
      const equipTxt = scene.add.text(btnX, btnY, isStarter ? '★ ARMA ATIVA' : 'ESCOLHER INICIAL', textStyle(isStarter ? '#ffd740' : '#ffffff', 11)).setOrigin(0.5);
      fitTextToBox(equipTxt, btnW - 12, btnH - 8, 9);

      equipBtn.on('pointerover', () => {
        equipBtn.setFillStyle(isStarter ? 0x2a5c2f : 0x945324);
        equipTxt.setColor('#ffeb3b');
      });
      equipBtn.on('pointerout', () => {
        equipBtn.setFillStyle(isStarter ? 0x1f4724 : 0x6e3d1b);
        equipTxt.setColor(isStarter ? '#ffd740' : '#ffffff');
      });
      equipBtn.on('pointerdown', () => {
        sound.playButtonClick();
        const curr = getUpgrades();
        curr.starterWeapon = key;
        saveUpgrades(curr);
        showBlacksmithMenu(scene);
        floatText(scene, btnX, btnY - 22, `${cfg.name} SERÁ SUA INICIAL!`, '#7fe7ff');
      });

      menuContainer.add([equipBtn, equipTxt]);
    }
  });

  // 4. BOTÕES DE RODAPÉ
  const playNowBtn = createButton(scene, 185, 536, 'INICIAR JORNADA', () => {
    sound.ensureContext();
    if (menuContainer) {
      menuContainer.destroy();
      menuContainer = null;
    }
    startGameplay(scene);
  }, 195, 40);

  const mageShopBtn = createButton(scene, 400, 536, 'SANTUÁRIO DO MAGO', () => {
    sound.playButtonClick();
    showMageShopMenu(scene);
  }, 200, 40);

  const backMenuBtn = createButton(scene, 615, 536, 'VOLTAR / SAIR [ESC]', () => exitSubMenu(scene), 195, 40);
  menuContainer.add([...playNowBtn, ...mageShopBtn, ...backMenuBtn]);
}

// -----------------------------------------------------------------------------
// O SANTUÁRIO DO MAGO ALQUIMISTA (UPGRADES PERMANENTES DE STATUS COM POÇÕES E ERVAS)
// -----------------------------------------------------------------------------
function showMageShopMenu(scene) {
  if (!scene) return;
  gameState = 'MENU';
  scene.time.paused = false;
  scene.time.timeScale = 1;
  scene.tweens.resumeAll();

  if (menuContainer) menuContainer.destroy();
  sound.startMenuBGM();

  menuContainer = createModal(
    scene,
    'SANTUÁRIO DO MAGO ALQUIMISTA',
    564,
    'Elixires místicos, infusões de ervas e aprimoramento permanente de atributos',
    740
  );
  menuContainer.isMainMenu = false;

  // Botão Rápido "✕ SAIR [ESC]" no canto superior direito do modal
  const closeQuickBtn = scene.add.rectangle(712, 46, 78, 28, 0x5c241b)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(712, 46, '✕ SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);
  closeQuickBtn.on('pointerover', () => closeQuickBtn.setFillStyle(0x8e2a1b));
  closeQuickBtn.on('pointerout', () => closeQuickBtn.setFillStyle(0x5c241b));
  closeQuickBtn.on('pointerdown', () => exitSubMenu(scene));
  menuContainer.add([closeQuickBtn, closeQuickTxt]);

  // 1. VINHETA VIVA DO ARQUIMAGO ALQUIMISTA (com Sprite Animado 'mage_master')
  const sanctumBg = scene.add.graphics();
  sanctumBg.fillStyle(0x160f26, 0.96).fillRoundedRect(56, 92, 420, 54, 7);
  sanctumBg.lineStyle(1.5, 0x9c27b0).strokeRoundedRect(56, 92, 420, 54, 7);

  const mageSprite = scene.add.sprite(86, 119, 'mage_master').play('mage_master').setScale(1.2);
  const mageTitle = scene.add.text(118, 99, 'ARQUIMAGO ALQUIMISTA', textStyle('#c36bff', 11));
  const mageSpeech = scene.add.text(118, 117, '“Beba meus elixires e seu poder ecoará em cada batalha!”', {
    ...textStyle('#e1bee7', 10, 'normal'),
    wordWrap: { width: 345, useAdvancedWrap: true }
  });
  fitTextToBox(mageSpeech, 345, 24, 9);

  // 2. PAINEL DE OURO DISPONÍVEL (x: 486..740)
  const goldBadge = scene.add.graphics();
  goldBadge.fillStyle(0x261c12, 0.98).fillRoundedRect(486, 92, 258, 54, 7);
  goldBadge.lineStyle(2, 0xffca28).strokeRoundedRect(486, 92, 258, 54, 7);
  const coinSprite = scene.add.sprite(514, 119, 'gold_coin').play('gold_coin').setScale(1.3);
  const goldValTxt = scene.add.text(536, 111, `OURO: ${getGold()}`, textStyle('#ffd740', 14)).setOrigin(0, 0.5);
  fitTextToBox(goldValTxt, 195, 22, 11);
  const goldHint = scene.add.text(536, 129, 'Status valem para todas as partidas!', textStyle('#7fe7ff', 10)).setOrigin(0, 0.5);

  menuContainer.add([sanctumBg, mageSprite, mageTitle, mageSpeech, goldBadge, coinSprite, goldValTxt, goldHint]);

  // 3. CARTAS DE STATUS UPGRADES (maxHp, moveSpeed, magnet, wisdom)
  const statusUpgrades = getStatusUpgrades();
  const statusKeys = ['maxHp', 'moveSpeed', 'magnet', 'wisdom'];
  const currentGold = getGold();

  statusKeys.forEach((key, idx) => {
    const cfg = STATUS_CATALOG[key];
    if (!cfg) return;
    const maxLvl = cfg.maxLevel || 5;
    const lvl = Phaser.Math.Clamp(statusUpgrades[key] || 1, 1, maxLvl);
    const isMax = lvl >= maxLvl;

    const rowY = 188 + idx * 82;
    const rowBg = scene.add.graphics();
    rowBg.fillStyle(0x1a1326, 0.96).fillRoundedRect(56, rowY - 35, 688, 74, 8);
    rowBg.lineStyle(2, isMax ? 0xffca28 : 0x7b1fa2).strokeRoundedRect(56, rowY - 35, 688, 74, 8);

    const slotBg = scene.add.graphics();
    slotBg.fillStyle(0x100b1a, 1).fillRoundedRect(68, rowY - 26, 52, 52, 6);
    slotBg.lineStyle(1.5, isMax ? 0xffca28 : cfg.potionColor || 0xc5a059).strokeRoundedRect(68, rowY - 26, 52, 52, 6);

    const icon = scene.add.image(94, rowY, cfg.icon).setScale(1.4);
    const nameTxt = scene.add.text(132, rowY - 28, cfg.name, textStyle('#ffca28', 13));

    const pips = scene.add.graphics();
    for (let p = 0; p < maxLvl; p++) {
      const activePip = p < lvl;
      pips.fillStyle(activePip ? 0x7fe7ff : 0x2e1c3b, 1).fillRect(425 + p * 18, rowY - 26, 14, 10);
      pips.lineStyle(1, activePip ? 0xffffff : 0x5c3b70).strokeRect(425 + p * 18, rowY - 26, 14, 10);
    }
    const lvlBadgeTxt = scene.add.text(522, rowY - 21, isMax ? 'NÍVEL MÁXIMO ★' : `NV. ${lvl}/${maxLvl}`, textStyle(isMax ? '#ffca28' : '#7fe7ff', 11)).setOrigin(0, 0.5);

    const levelDescs = cfg.levels || [];
    const descStr = isMax
      ? `★ MÁXIMO: ${levelDescs[lvl - 1] || ''}`
      : `Atual: ${levelDescs[lvl - 1] || ''}\nPróximo (Nv.${lvl + 1}): ${levelDescs[lvl] || ''}`;
    const descTxt = scene.add.text(132, rowY - 6, descStr, {
      ...textStyle('#e8dcbe', 11, 'normal'),
      lineSpacing: 3,
      wordWrap: { width: 395, useAdvancedWrap: true }
    });
    fitTextToBox(descTxt, 395, 36, 9);

    menuContainer.add([rowBg, slotBg, icon, nameTxt, pips, lvlBadgeTxt, descTxt]);

    const btnX = 638, btnY = rowY + 1, btnW = 182, btnH = 42;
    if (isMax) {
      const maxBox = scene.add.rectangle(btnX, btnY, btnW, btnH, 0x2e2418).setStrokeStyle(1.5, 0xffca28);
      const maxTxt = scene.add.text(btnX, btnY, 'NÍVEL MÁXIMO ★', textStyle('#ffca28', 11)).setOrigin(0.5);
      menuContainer.add([maxBox, maxTxt]);
    } else {
      const cost = cfg.costs[lvl - 1] || 20;
      const canAfford = currentGold >= cost;
      const actionLabel = `APRIMORAR (${cost}G)`;

      const buyBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, canAfford ? 0x4a148c : 0x332338)
        .setStrokeStyle(2, canAfford ? 0xffca28 : 0x5c4263)
        .setInteractive({ useHandCursor: true });
      const buyTxt = scene.add.text(btnX, btnY, actionLabel, textStyle(canAfford ? '#ffffff' : '#8c7b6b', 11)).setOrigin(0.5);
      fitTextToBox(buyTxt, btnW - 12, btnH - 8, 9);

      buyBtn.on('pointerover', () => {
        if (canAfford) {
          buyBtn.setFillStyle(0x6a1b9a);
          buyBtn.setStrokeStyle(2, 0xffeb3b);
          buyTxt.setColor('#ffeb3b');
        }
      });
      buyBtn.on('pointerout', () => {
        buyBtn.setFillStyle(canAfford ? 0x4a148c : 0x332338);
        buyBtn.setStrokeStyle(2, canAfford ? 0xffca28 : 0x5c4263);
        buyTxt.setColor(canAfford ? '#ffffff' : '#8c7b6b');
      });
      buyBtn.on('pointerdown', () => {
        if (getGold() < cost) {
          sound.playShieldBlock();
          floatText(scene, btnX, btnY - 18, 'OURO INSUFICIENTE!', '#ff5252');
          return;
        }
        addGold(-cost);
        const curr = getStatusUpgrades();
        curr[key] = Math.min(maxLvl, (curr[key] || 1) + 1);
        saveStatusUpgrades(curr);
        playerMaxHp = getPlayerMaxHp();
        sound.playItemCollect();
        sound.playCoin();
        showMageShopMenu(scene);
        floatText(scene, btnX, btnY - 22, `${cfg.shortName || cfg.name} NV.${curr[key]}!`, '#c36bff');
      });

      menuContainer.add([buyBtn, buyTxt]);
    }
  });

  // 4. BOTÕES DE RODAPÉ
  const playNowBtn = createButton(scene, 185, 536, 'INICIAR JORNADA', () => {
    sound.ensureContext();
    if (menuContainer) {
      menuContainer.destroy();
      menuContainer = null;
    }
    startGameplay(scene);
  }, 195, 40);

  const blacksmithBtn = createButton(scene, 400, 536, 'FORJA DO FERREIRO', () => {
    sound.playButtonClick();
    showBlacksmithMenu(scene);
  }, 200, 40);

  const backMenuBtn = createButton(scene, 615, 536, 'VOLTAR / SAIR [ESC]', () => exitSubMenu(scene), 195, 40);
  menuContainer.add([...playNowBtn, ...blacksmithBtn, ...backMenuBtn]);
}

// -----------------------------------------------------------------------------
// TÁBULA DE CONQUISTAS DO REINO (PROGRESSO ACUMULATIVO & RECOMPENSAS EM OURO)
// -----------------------------------------------------------------------------
function showAchievementsMenu(scene) {
  if (!scene) return;
  gameState = 'MENU';
  scene.time.paused = false;
  scene.time.timeScale = 1;
  scene.tweens.resumeAll();

  if (menuContainer) menuContainer.destroy();
  sound.startMenuBGM();

  menuContainer = createModal(
    scene,
    'TÁBULA DE CONQUISTAS DO REINO',
    564,
    'Complete façanhas heróicas de combate para desbloquear Ouro e glória eterna',
    740
  );
  menuContainer.isMainMenu = false;

  // Botão Rápido "✕ SAIR [ESC]" no canto superior direito do modal
  const closeQuickBtn = scene.add.rectangle(712, 46, 78, 28, 0x5c241b)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(712, 46, '✕ SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);
  closeQuickBtn.on('pointerover', () => closeQuickBtn.setFillStyle(0x8e2a1b));
  closeQuickBtn.on('pointerout', () => closeQuickBtn.setFillStyle(0x5c241b));
  closeQuickBtn.on('pointerdown', () => exitSubMenu(scene));
  menuContainer.add([closeQuickBtn, closeQuickTxt]);

  const achData = getAchievementsData();
  const totalCount = ACHIEVEMENTS_CATALOG.length;
  const unlockedCount = ACHIEVEMENTS_CATALOG.filter(a => achData.unlocked[a.id]).length;

  // 1. BARRA DE RESUMO SUPERIOR (CONQUISTAS TOTAIS + OURO)
  const summaryBox = scene.add.graphics();
  summaryBox.fillStyle(0x221a13, 0.96).fillRoundedRect(56, 92, 420, 52, 7);
  summaryBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(56, 92, 420, 52, 7);

  const crownIcon = scene.add.image(86, 118, 'hud_crown').setScale(1.1);
  const progTxt = scene.add.text(112, 106, `CONQUISTAS: ${unlockedCount} / ${totalCount} DESBLOQUEADAS`, textStyle('#ffca28', 12));
  const subProg = scene.add.text(112, 126, 'Conquistas concedem Ouro Real instantaneamente!', textStyle('#c5a059', 10));

  const goldBadge = scene.add.graphics();
  goldBadge.fillStyle(0x261c12, 0.98).fillRoundedRect(486, 92, 258, 52, 7);
  goldBadge.lineStyle(2, 0xffca28).strokeRoundedRect(486, 92, 258, 52, 7);
  const coinSprite = scene.add.sprite(514, 118, 'gold_coin').play('gold_coin').setScale(1.25);
  const goldValTxt = scene.add.text(536, 118, `OURO ATUAL: ${getGold()}`, textStyle('#ffd740', 13)).setOrigin(0, 0.5);

  menuContainer.add([summaryBox, crownIcon, progTxt, subProg, goldBadge, coinSprite, goldValTxt]);

  // 2. GRADE DE 8 CONQUISTAS (2 Colunas x 4 Linhas)
  ACHIEVEMENTS_CATALOG.forEach((ach, idx) => {
    const col = idx % 2; // 0 ou 1
    const row = Math.floor(idx / 2); // 0, 1, 2, 3
    const cardLeft = col === 0 ? 56 : 406;
    const cardW = 338;
    const cardH = 78;
    const cardTop = 158 + row * 84;

    const isDone = Boolean(achData.unlocked[ach.id]);
    const currentVal = Math.min(ach.target, achData.stats[ach.stat] || 0);
    const pct = Phaser.Math.Clamp(currentVal / ach.target, 0, 1);

    const cardBg = scene.add.graphics();
    cardBg.fillStyle(isDone ? 0x241d14 : 0x18130e, 0.95).fillRoundedRect(cardLeft, cardTop, cardW, cardH, 7);
    cardBg.lineStyle(1.5, isDone ? 0xffca28 : 0x4a3b2c).strokeRoundedRect(cardLeft, cardTop, cardW, cardH, 7);

    const iconSlot = scene.add.graphics();
    iconSlot.fillStyle(0x100c08, 1).fillRoundedRect(cardLeft + 8, cardTop + 13, 50, 50, 5);
    iconSlot.lineStyle(1, isDone ? 0xffca28 : 0x5c4938).strokeRoundedRect(cardLeft + 8, cardTop + 13, 50, 50, 5);

    const icon = scene.add.image(cardLeft + 33, cardTop + 38, ach.icon).setScale(1.25);
    if (!isDone) icon.setTint(0x777777);

    const titleTxt = scene.add.text(cardLeft + 66, cardTop + 8, ach.title, textStyle(isDone ? '#ffca28' : '#e0d2b4', 11));
    fitTextToBox(titleTxt, cardW - 74, 18, 10);

    const descTxt = scene.add.text(cardLeft + 66, cardTop + 24, ach.desc, {
      ...textStyle('#a8987b', 10, 'normal'),
      wordWrap: { width: cardW - 74, useAdvancedWrap: true }
    });
    fitTextToBox(descTxt, cardW - 74, 26, 9);

    // Barra gráfica de progresso
    const barX = cardLeft + 66;
    const barY = cardTop + 52;
    const barW = cardW - 142;
    const barH = 12;

    const progBar = scene.add.graphics();
    progBar.fillStyle(0x0e0b08, 1).fillRect(barX, barY, barW, barH);
    progBar.lineStyle(1, isDone ? 0xffca28 : 0x3d3024).strokeRect(barX, barY, barW, barH);
    if (pct > 0) {
      progBar.fillStyle(isDone ? 0xffca28 : 0x7fe7ff, 1).fillRect(barX + 1, barY + 1, Math.round((barW - 2) * pct), barH - 2);
    }

    const countTxt = scene.add.text(barX + barW / 2, barY + barH / 2, `${currentVal}/${ach.target}`, textStyle('#ffffff', 9)).setOrigin(0.5);

    // Badge de Ouro / Recompensa
    const rewardBadge = scene.add.rectangle(cardLeft + cardW - 36, barY + barH / 2, 64, 22, isDone ? 0x246b3d : 0x261d14)
      .setStrokeStyle(1, isDone ? 0xffca28 : 0x6e5846);
    const rewardTxt = scene.add.text(cardLeft + cardW - 36, barY + barH / 2, isDone ? '★ CONCLUÍDO' : `+${ach.rewardGold}G`, textStyle(isDone ? '#ffeb3b' : '#ffd740', 9)).setOrigin(0.5);
    fitTextToBox(rewardTxt, 60, 18, 8);

    menuContainer.add([cardBg, iconSlot, icon, titleTxt, descTxt, progBar, countTxt, rewardBadge, rewardTxt]);
  });

  // 3. BOTÃO DE VOLTAR NO RODAPÉ
  const backMenuBtn = createButton(scene, 400, 536, 'VOLTAR / SAIR [ESC]', () => exitSubMenu(scene), 260, 40);
  menuContainer.add(backMenuBtn);
}

// Redirecionador para garantir compatibilidade com chamadas existentes
function showShopMenu(scene, target = 'mage') {
  if (target === 'blacksmith' || target === 'items') {
    showBlacksmithMenu(scene);
  } else if (target === 'achievements') {
    showAchievementsMenu(scene);
  } else {
    showMageShopMenu(scene);
  }
}

// -----------------------------------------------------------------------------
// TELA DE RECORDES (TÁBULA DOS CAMPEÕES)
// -----------------------------------------------------------------------------
function showRecordsMenu(scene) {
  if (menuContainer) menuContainer.destroy();
  menuContainer = createModal(scene, 'TÁBULA DOS CAMPEÕES', 520, 'Os maiores guerreiros imortalizados pelas eras', 520);
  menuContainer.isMainMenu = false;

  const scores = getHighScores();
  const ranks = ['1º LUGAR', '2º LUGAR', '3º LUGAR', '4º LUGAR', '5º LUGAR'];
  const colors = ['#ffca28', '#e8e8e8', '#cd7f32', '#d6c8aa', '#a8987b'];

  scores.forEach((entry, i) => {
    const rowY = 175 + i * 50;
    const rowBg = scene.add.graphics();
    rowBg.fillStyle(i === 0 ? 0x2e2314 : 0x1d1611, 0.9).fillRoundedRect(170, rowY - 18, 460, 38, 4);
    rowBg.lineStyle(1, i === 0 ? 0xc5a059 : 0x4a3b2c).strokeRoundedRect(170, rowY - 18, 460, 38, 4);

    const rankTxt = scene.add.text(190, rowY, ranks[i], textStyle(colors[i], 12)).setOrigin(0, 0.5);
    const nameTxt = scene.add.text(370, rowY, entry.name, textStyle('#ffffff', 18)).setOrigin(0.5);
    const scoreTxt = scene.add.text(595, rowY, `${entry.score}s de glória`, textStyle(colors[i], 14)).setOrigin(1, 0.5);

    menuContainer.add([rowBg, rankTxt, nameTxt, scoreTxt]);
  });

  menuContainer.add(createButton(scene, 400, 485, 'VOLTAR / SAIR [ESC]', () => exitSubMenu(scene), 260, 44));
}

// -----------------------------------------------------------------------------
// TELA DE CONFIGURAÇÕES (ÁUDIO, TELA CHEIA E PERGAMINHO DE COMBATE)
// -----------------------------------------------------------------------------
function showSettingsMenu(scene) {
  if (menuContainer) menuContainer.destroy();
  menuContainer = createModal(scene, 'CONFIGURAÇÕES DO REINO', 540, 'Ajustes de áudio, vídeo (Tela Cheia) e pergaminho de batalha', 540);
  menuContainer.isMainMenu = false;

  // Seção 1: Áudio & Tela Cheia
  const audioBox = scene.add.graphics();
  audioBox.fillStyle(0x221a13, 0.92).fillRoundedRect(160, 118, 480, 108, 6);
  audioBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(160, 118, 480, 108, 6);

  const audioTitle = scene.add.text(180, 130, 'ÁUDIO & TELA CHEIA (FULLSCREEN)', textStyle('#ffca28', 12));
  const audioHint = scene.add.text(180, 202, 'Atalhos rápidos: [M] Alternar Áudio   |   [F] Alternar Tela Cheia', textStyle('#a8987b', 11));

  const audioToggleBtn = scene.add.rectangle(285, 172, 210, 36, sound.isMuted() ? 0x8e1b1b : 0x247a46)
    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });
  const audioToggleTxt = scene.add.text(285, 172, sound.isMuted() ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]', textStyle('#ffffff', 12))
    .setOrigin(0.5);

  audioToggleBtn.on('pointerdown', () => {
    sound.toggleMute();
    sound.playButtonClick();
    audioToggleBtn.setFillStyle(sound.isMuted() ? 0x8e1b1b : 0x247a46);
    audioToggleTxt.setText(sound.isMuted() ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]');
    if (hudHornIcon) hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
  });

  const fsToggleBtn = scene.add.rectangle(515, 172, 210, 36, isGameFullscreen(scene) ? 0x247a46 : 0x6e3d1b)
    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });
  const fsToggleTxt = scene.add.text(515, 172, isGameFullscreen(scene) ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]', textStyle('#ffffff', 12))
    .setOrigin(0.5);

  const refreshFsBtn = () => {
    if (!fsToggleBtn.active) return;
    const active = isGameFullscreen(scene);
    fsToggleBtn.setFillStyle(active ? 0x247a46 : 0x6e3d1b);
    fsToggleTxt.setText(active ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]');
  };
  menuContainer.updateMenuFullscreen = refreshFsBtn;

  fsToggleBtn.on('pointerdown', () => {
    sound.playButtonClick();
    toggleFullscreen(scene);
    scene.time.delayedCall(80, refreshFsBtn);
  });

  // Seção 2: Pergaminho de Dicas
  const guideBox = scene.add.graphics();
  guideBox.fillStyle(0x1d1611, 0.92).fillRoundedRect(160, 238, 480, 215, 6);
  guideBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(160, 238, 480, 215, 6);

  const guideTitle = scene.add.text(400, 256, 'PERGAMINHO DE COMBATE', textStyle('#ffca28', 13)).setOrigin(0.5);
  const guideLines = [
    '• Inimigos derrotados dropam Moedas de Prata durante a partida.',
    '• No fim da partida, suas Moedas de Prata são convertidas em Ouro!',
    '• Use Ouro na Loja para evoluir Armas (Aba 1) e Status (Aba 2).',
    '• O Escudo Sagrado reflete projéteis mantendo o disparo normal.',
    '• Evolua Magnetismo, Vida Máxima (Corações) e Velocidade na Loja!',
    '• Pressione ESC para pausar/voltar ou F para Tela Cheia.'
  ];
  const guideTexts = guideLines.map((txt, i) =>
    scene.add.text(176, 280 + i * 26, txt, { ...textStyle('#d6c8aa', 11, 'normal'), lineSpacing: 4 })
  );

  menuContainer.add([
    audioBox, audioTitle, audioHint, audioToggleBtn, audioToggleTxt, fsToggleBtn, fsToggleTxt,
    guideBox, guideTitle, ...guideTexts,
    ...createButton(scene, 400, 498, 'VOLTAR / SAIR [ESC]', () => exitSubMenu(scene), 260, 44)
  ]);
}

// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
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
    goldFromSilver: runSilver,
    timeBonusGold: Math.floor(survivalTime / 15),
    bossBonusGold: bossDefeated ? 15 : 0,
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
    `${summary.silverCollected} Pratas   ➔`,
    textStyle('#e0f7fa', 14)
  ).setOrigin(0, 0.5);

  const goldEarnedLine = scene.add.text(
    cx + 45,
    top + 138,
    `+${summary.totalGoldEarned} OURO REAL`,
    textStyle('#ffd740', 14)
  ).setOrigin(0, 0.5);
  fitTextToBox(goldEarnedLine, 165, 24, 10);

  const bonusParts = [`Prata convertida: +${summary.goldFromSilver}G`];
  if (summary.timeBonusGold > 0) bonusParts.push(`Glória (${survivalTime}s): +${summary.timeBonusGold}G`);
  if (summary.bossBonusGold > 0) bonusParts.push(`Golem: +${summary.bossBonusGold}G`);
  bonusParts.push(`Cofre Total: ${summary.newTotalGold}G`);

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
  const subtitle = `Prata Convertida: ${summary.silverCollected} ➔ +${summary.totalGoldEarned} Ouro  |  Cofre Total: ${getGold()} Ouro`;

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