// =============================================================================
// CONTROLE DE VERSÃO & CONSTANTES GLOBAIS
// =============================================================================
const GAME_VERSION = 'v1.6.0';
const VERSION_TITLE = 'Combat Overhaul, Stone Golem & Refined Touch Controls';
const VERSION_DESC = 'Boss Golem aos 60s com ejeção física e despertar de Mini-Golems conforme o HP, defesa do Mago com esquiva/teletransporte contra projéteis, movimentação em zigue-zague dos Goblins, sistema de vida padronizado em Corações/Hits, progressão infinita de armas com balanceamento, escalonamento de tamanho e Knockback da Espada, joystick virtual ancorado com toggle nas configurações e remoção do botão de ação.';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

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
  goblin:     { hp: 1, speed: 1.12, w: 16, h: 20, xp: 2 },
  warrior:    { hp: 2, speed: 0.86, w: 20, h: 26, xp: 5 },
  elf:        { hp: 1, speed: 0.84, w: 16, h: 24, xp: 3 },
  dark_mage:  { hp: 2, speed: 0.76, w: 18, h: 26, xp: 5 },  // dispara 3 orbes sombrios em leque
  mini_golem: { hp: 1, speed: 1.18, w: 18, h: 20, xp: 2 },   // ágil e veloz, perseguição em zigue-zague
  boss_golem: { hp: 50, speed: 0.35, w: 60, h: 72, xp: 50 }
};
const BOSS_TRIGGER_TIME = 60;                        // Boss Fight: Golem de Pedra desperta exatamente aos 60s!
const BOSS_MAX_HP = 50;                              // HP calibrado para a janela dinâmica de 60s (24-32s de luta justa)
const MAX_ENEMY_SPEED = 365;                         // teto máximo justo de velocidade
const MIN_SPAWN_DELAY = 450;                         // intervalo mínimo de spawn entre pulsos do Director (ms)
const MAX_WEAPON_LEVEL = Infinity;                   // Progressão infinita de armas dentro da partida (via XP)
const STORAGE_KEY = 'knight_quest_highscores';
const STORAGE_GOLD_KEY = 'knight_quest_gold_v1';
const STORAGE_UPGRADES_KEY = 'knight_quest_upgrades_v1';
const STORAGE_STATUS_KEY = 'knight_quest_status_v1';
const STORAGE_ACHIEVEMENTS_KEY = 'knight_quest_achievements_v1';
const STORAGE_JOYSTICK_KEY = 'knight_quest_joystick_mode_v1';

// Catálogo do Ferreiro (Apenas Desbloqueio no Menu; os Níveis 1 a 5 evoluem IN-GAME via XP Level Up!)
