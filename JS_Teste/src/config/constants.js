// =============================================================================
// CONTROLE DE VERSÃO & CONSTANTES GLOBAIS
// =============================================================================
const GAME_VERSION = 'v2.7.2';
const VERSION_TITLE = 'Caligrafia de Pergaminho: Títulos Diretos dos Itens e Balões de Fala Cristalinos';
const VERSION_DESC = 'Aplicação da renderização pura de pergaminho (parchmentTitleStyle e parchmentBodyStyle) nos títulos das cartas e balões de diálogo dos mestres na Forja do Ferreiro e no Santuário do Mago, removendo sombras que poluíam o fundo claro. Simplificação dos títulos das cartas da loja do mago para apresentar diretamente o nome do item (Elixir de Vida, Poção de Velocidade, Ímã Arcano e Sabedoria Arcana) com fonte ampliada e centralização perfeita.';
const MAX_CHOSEN_SCROLLS = 2;

const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;

// AJUSTES DO JOGO (Rebalanceamento v1.6.0: Progressão Infinita e Curva Suave)
// =============================================================================
const PLAYER_SPEED = 280;
const BUFF_TIME = { bow: 10.0, shield: 10.0, sword: 10.0, axe: 10.0, firestaff: 10.0 }; // duração base GDD v1.0: 10s cravados
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
const STORAGE_BACKPACK_KEY = 'knight_quest_backpack_v1';
const STORAGE_BOSS_DEFEATED_KEY = 'knight_quest_boss_defeated_v1';

// Catálogo do Ferreiro (Apenas Desbloqueio no Menu; os Níveis 1 a 5 evoluem IN-GAME via XP Level Up!)
