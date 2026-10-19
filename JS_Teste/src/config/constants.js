// =============================================================================
// CONTROLE DE VERSÃO & CONSTANTES GLOBAIS
// =============================================================================
const GAME_VERSION = 'v1.5.0';
const VERSION_TITLE = 'Mobile Web Touch & Virtual Joystick System';
const VERSION_DESC = 'Suporte completo a dispositivos móveis no navegador web com Joystick Virtual analógico dinâmico de temática medieval, isolamento Multi-Touch por pointerId, botão dedicado de Ação/Ataque, botão de Pausa rápida no HUD e prevenção nativa de gestos indesejados no navegador.';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

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
