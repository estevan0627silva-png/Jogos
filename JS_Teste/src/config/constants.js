// =============================================================================
// CONTROLE DE VERSÃO & CONSTANTES GLOBAIS
// =============================================================================
const GAME_VERSION = 'v2.7.0';
const VERSION_TITLE = 'Ateliê do Reino: Interface Medieval Nobre, Cenários de Lojas Imersivas e Balcões dos Mestres';
const VERSION_DESC = 'Reformulação visual e estética completa da interface in-game, telas de menu e lojas temáticas com coesão artística dark fantasy inspirada nos kits medievais de pergaminho, ferro forjado e filigranas douradas. A Forja do Ferreiro e o Santuário do Mago agora contam com cenários imersivos completos de oficina e laboratório com balcões rústicos, vendedores animados atrás dos balcões e mostruário de armas e poções em cartas de pergaminho interativas.';
const MAX_CHOSEN_SCROLLS = 2;

const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;

// AJUSTES DO JOGO (Rebalanceamento v1.6.0: Progressão Infinita e Curva Suave)
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
  goblin:       { hp: 1, speed: 1.12, w: 16, h: 20, xp: 2 },
  goblin_scout: { hp: 1, speed: 1.48, w: 14, h: 16, xp: 2 }, // rastreador ágil e veloz com zigue-zague evasivo
  warrior:      { hp: 2, speed: 0.86, w: 20, h: 26, xp: 5 },
  elf:        { hp: 1, speed: 0.84, w: 16, h: 24, xp: 3 },
  dark_mage:  { hp: 2, speed: 0.76, w: 18, h: 26, xp: 5 },  // dispara 3 orbes sombrios em leque
  mini_golem: { hp: 1, speed: 0.42, w: 18, h: 20, xp: 2 },   // lento, perseguição contínua
  boss_golem: { hp: 120, speed: 0.35, w: 60, h: 72, xp: 60 }
};
const BOSS_TRIGGER_TIME = 60;                        // Boss Fight: Golem de Pedra desperta exatamente aos 60s!
const BOSS_MAX_HP = 120;                              // HP calibrado para a janela dinâmica de 60s (24-32s de luta justa)
const MAX_ENEMY_SPEED = 365;                         // teto máximo justo de velocidade
const MIN_SPAWN_DELAY = 180;                         // intervalo mínimo de spawn entre pulsos do Director (ms)
const MAX_WEAPON_LEVEL = Infinity;                   // Progressão infinita de armas dentro da partida (via XP)
const STORAGE_KEY = 'knight_quest_highscores';
const STORAGE_GOLD_KEY = 'knight_quest_gold_v1';
const STORAGE_UPGRADES_KEY = 'knight_quest_upgrades_v1';
const STORAGE_STATUS_KEY = 'knight_quest_status_v1';
const STORAGE_ACHIEVEMENTS_KEY = 'knight_quest_achievements_v1';
const STORAGE_JOYSTICK_KEY = 'knight_quest_joystick_mode_v1';

// Catálogo do Ferreiro (Apenas Desbloqueio no Menu; os Níveis 1 a 5 evoluem IN-GAME via XP Level Up!)
