
// --- BUNDLE FILE: JS_Teste/src/config/constants.js ---
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


// --- BUNDLE FILE: JS_Teste/src/config/palette.js ---
// PALETA DE CORES DA PIXEL ART (Padrão 16-bit com rampas de 3 a 4 sub-tons)
// Todas as chaves originais foram preservadas para garantir 100% de retrocompatibilidade.
// =============================================================================
const C = {
  // --- CONTORNOS, BASE & OSSO ---
  outline: 0x1a1410,
  outlineSoft: 0x2c221a,
  white: 0xffffff,
  bone: 0xe8dcc0,
  boneDark: 0xbdb094,

  // --- AÇO POLIDO & LÂMINAS ---
  steelHighlight: 0xffffff,
  steelLight: 0xf2f4f8,
  steel: 0xc9ced8,
  steelBase: 0xc9ced8,
  steelShadow: 0x8a909c,
  steelDark: 0x8a909c,
  steelDeep: 0x5a606e,

  // --- FERRO BRUTO & ARMADURA PESADA ---
  ironHighlight: 0x6e7382,
  iron: 0x454852,
  ironBase: 0x454852,
  ironShadow: 0x26272e,
  ironDark: 0x26272e,
  ironDeep: 0x15161a,

  // --- OURO REAL & BRONZE ---
  yellow: 0xffeb3b,
  goldHighlight: 0xfff9c4,
  goldLight: 0xffe082,
  gold: 0xf2c14e,
  goldBase: 0xf2c14e,
  goldShadow: 0xc49000,
  goldDark: 0x946500,
  goldDeep: 0x5a3c00,

  // --- PRATA & METAL BRUNIDO ---
  silverHighlight: 0xffffff,
  silverLight: 0xe2e8f0,
  silver: 0xb0bec5,
  silverBase: 0xb0bec5,
  silverShadow: 0x78909c,
  silverDark: 0x455a64,
  silverDeep: 0x263238,

  // --- TONS CARMESINS & RUBI ---
  redHighlight: 0xff7b7b,
  red: 0xd83a3a,
  redBase: 0xd83a3a,
  darkRed: 0x8e1b1b,
  redShadow: 0x8e1b1b,
  redDeep: 0x4a0e0e,
  eye: 0xff3030,
  rubyGlow: 0xff5252,
  rubyLight: 0xff1744,
  rubyBase: 0xd83a3a,
  rubyShadow: 0x8e1b1b,
  rubyDeep: 0x4a0e0e,
  deepBlood: 0x4a0e0e,

  // --- AZUL REAL & HERÁLDICA ---
  blueLight: 0x5b93f0,
  blue: 0x2f6fd6,
  blueBase: 0x2f6fd6,
  blueShadow: 0x1c4ba6,
  blueDeep: 0x0f2b69,

  // --- PELE & EXPRESSÃO ---
  skinHighlight: 0xffebd2,
  skinLight: 0xfde2b8,
  skin: 0xf1c27d,
  skinBase: 0xf1c27d,
  skinShadow: 0xc68b59,
  skinDark: 0x8c5731,
  skinDeep: 0x5c3619,

  // --- MADEIRA, COURO & VESTES ---
  woodHighlight: 0xba854d,
  woodLight: 0xba854d,
  wood: 0x9c6b3a,
  woodBase: 0x9c6b3a,
  woodShadow: 0x5c3a1b,
  woodDark: 0x5c3a1b,
  woodDeep: 0x331e0b,
  bark: 0x422610,
  rag: 0x7a5230,
  boot: 0x4e342e,
  leatherLight: 0x8d5c38,
  leatherBase: 0x6d4426,
  leatherShadow: 0x4e342e,
  leatherDark: 0x2e1e19,

  // --- GOBLIN & CRIATURAS TERRESTRES ---
  gobHighlight: 0xcddc39,
  gobLight: 0xaed581,
  gob: 0x9ccc65,
  gobBase: 0x9ccc65,
  gobShadow: 0x5f8f2f,
  gobDark: 0x5f8f2f,
  gobDeep: 0x33691e,

  // --- ELFO & FLORESTA PROFUNDA ---
  elfHairLight: 0xfff176,
  elfHair: 0xf7e27a,
  elfHairShadow: 0xc9a432,
  elfTunicLight: 0x4db6ac,
  elfTunic: 0x26a69a,
  elfTunicShadow: 0x00796b,
  elfCloakLight: 0x00796b,
  elfCloak: 0x00574b,
  elfCloakShadow: 0x003d33,
  elfCloakDark: 0x00261f,

  // --- MAGIA ARCANA & VAZIO ---
  arcanaLight: 0xda9bff,
  purple: 0xc36bff,
  arcanaBase: 0xc36bff,
  arcanaShadow: 0x8e24aa,
  arcanaDeep: 0x4a148c,
  voidDark: 0x240046,

  // --- MANA CELESTE & ELEMENTAL ---
  manaLight: 0xb2ebf2,
  cyan: 0x7fe7ff,
  manaBase: 0x7fe7ff,
  manaShadow: 0x00b4d8,
  manaDeep: 0x0077b6,

  // --- FOGO & BRASA ---
  fireHighlight: 0xfff9c4,
  fireLight: 0xffca28,
  fireBase: 0xff7043,
  fireShadow: 0xd83a3a,
  fireDeep: 0x8e1b1b,

  // --- NATUREZA, FOLHAGEM & MUSGO ---
  leafHighlight: 0x72c96b,
  leafLight: 0x47a04a,
  leaf: 0x2f6e35,
  leafBase: 0x2f6e35,
  leafShadow: 0x1d4a22,
  leafDark: 0x1d4a22,
  leafDeep: 0x0e2912,
  leafAmber: 0xd97724,
  leafRust: 0x9c3d18,
  mossGold: 0x827717,

  // --- TERRA, PEDRA & CAMINHO ---
  dirtLight: 0xb89a6c,
  dirtBase: 0x9b7b4f,
  dirtShadow: 0x6e5233,
  dirtDeep: 0x422f1c,
  stoneLight: 0x949ba6,
  stoneBase: 0x69707c,
  stoneShadow: 0x484e58,
  stoneDeep: 0x292d33
};

// =============================================================================


// --- BUNDLE FILE: JS_Teste/src/config/catalogs.js ---
// =============================================================================
// CATÁLOGOS DE EQUIPAMENTOS, STATUS E CONQUISTAS
// =============================================================================
const WEAPON_CATALOG = {
  bow: {
    name: 'ARCO REAL',
    category: 'DISPARO REAL',
    icon: 'item_bow',
    unlockedDefault: true,
    unlockCost: 0,
    maxLevel: Infinity,
    forgeLore: 'Arco nobre de teixo. Dispara flechas precisas com cadência exponencial acelerada.',
    levels: [
      { badge: 'DISPARO CERTEIRO', desc: 'Flechas velozes e perfurantes disparadas com ritmo cadenciado contra o avanço dos monstros.', toString() { return this.desc; } },
      { badge: 'CORDA TENSIONADA', desc: 'Reduz notavelmente o intervalo entre disparos, lançando flechas em sucessão rápida.', toString() { return this.desc; } },
      { badge: 'SARAIVADA VELOZ', desc: 'Disparos contínuos e ágeis que suprimem a vanguarda inimiga sem dar tempo de reação.', toString() { return this.desc; } },
      { badge: 'FUSILAMENTO REAL', desc: 'Cadência quase instantânea: rajadas de flechas de alta frequência cravam o campo sem cessar.', toString() { return this.desc; } },
      { badge: 'TEMPESTADE DE FLECHAS', desc: 'Cadência máxima supersônica! Uma torrente ininterrupta de flechas perfura as linhas inimigas!', toString() { return this.desc; } }
    ]
  },
  sword: {
    name: 'ESPADA VORPAL',
    category: 'HERANÇA DE AÇO',
    icon: 'item_sword',
    unlockedDefault: true,
    unlockCost: 0,
    maxLevel: Infinity,
    forgeLore: 'Lâmina nobre de aço temperado. Possui knockback ativo e área cortante colossal.',
    levels: [
      { badge: 'CORTE NOBRE', desc: 'Desfere golpes precisos de aço temperado com área de impacto equilibrada e repulsão frontal ativa.', toString() { return this.desc; } },
      { badge: 'FIO EXPANDIDO', desc: 'Amplia a lâmina com alcance acelerado, ceifando a primeira linha de monstros com facilidade.', toString() { return this.desc; } },
      { badge: 'CORTE COLOSSAL', desc: 'Golpes de enorme envergadura frontal que varrem formações inimigas inteiras em arco cortante.', toString() { return this.desc; } },
      { badge: 'FÚRIA VORPAL', desc: 'Lâmina descomunal que rasga o ar em semicírculo devastador, desestabilizando qualquer avanço.', toString() { return this.desc; } },
      { badge: 'COLOSSO SUPREMO', desc: 'Varredura colossal lendária! Uma muralha de lâmina titânica que aniquila todo o campo frontal!', toString() { return this.desc; } }
    ]
  },
  shield: {
    name: 'ESCUDO SAGRADO',
    category: 'BALUARTE SAGRADO',
    icon: 'item_shield',
    unlockedDefault: false,
    unlockCost: 30,
    maxLevel: Infinity,
    forgeLore: 'Égide abençoada. Reflete flechas em múltiplos ângulos e garante proteção prolongada.',
    levels: [
      { badge: 'ÉGIDE BÁSICA', desc: 'Envolve o herói em aura celestial por tempo equilibrado, refletindo flechas e detonando em choque se atingido.', toString() { return this.desc; } },
      { badge: 'ÉGIDE REFORÇADA', desc: 'Aumenta substancialmente o tempo de proteção ativa, mantendo a imunidade reativa por muito mais tempo.', toString() { return this.desc; } },
      { badge: 'ESPELHO DIVINO', desc: 'Duração prolongada vigorosa: reflete flechas em ângulos duplos e garante proteção duradoura na batalha.', toString() { return this.desc; } },
      { badge: 'BALUARTE REAL', desc: 'Fortaleza celestial duradoura, suportando a pressão do combate e detonando em choque sagrado ampliado.', toString() { return this.desc; } },
      { badge: 'ÉGIDE ETERNA', desc: 'Proteção celestial de duração colossal! O herói combate imperturbável envolto em graça divina suprema!', toString() { return this.desc; } }
    ]
  },
  axe: {
    name: 'MACHADO BUMERANGUE',
    category: 'FORÇA RÚNICA',
    icon: 'item_axe',
    unlockedDefault: false,
    unlockCost: 40,
    maxLevel: Infinity,
    forgeLore: 'Machado duplo pesado. Corta em arco de retorno com força de repulsão titânica.',
    levels: [
      { badge: 'GOLPE RÚNICO', desc: 'Lança machado duplo em arco circular de retorno, desferindo golpes de impacto na ida e na volta.', toString() { return this.desc; } },
      { badge: 'IMPACTO PESADO', desc: 'Aumenta consideravelmente a força de choque, arremessando monstros para trás na rota do bumerangue.', toString() { return this.desc; } },
      { badge: 'REPULSÃO SÍSMICA', desc: 'Ondas sísmicas violentas que estilhaçam o avanço inimigo e lançam tropas para a retaguarda.', toString() { return this.desc; } },
      { badge: 'CHOQUE ESMAGADOR', desc: 'Impacto rúnico massivo capaz de arremessar pelotões inteiros de volta para a floresta.', toString() { return this.desc; } },
      { badge: 'FÚRIA DOS TITÃS', desc: 'Força de repulsão titânica colossal! Monstros atingidos voam pelos ares com violência descomunal!', toString() { return this.desc; } }
    ]
  },
  firestaff: {
    name: 'CAJADO DE FOGO',
    category: 'CANALIZAÇÃO SOLAR',
    icon: 'item_firestaff',
    unlockedDefault: false,
    unlockCost: 20,
    maxLevel: Infinity,
    forgeLore: 'Cetro ardente. Lança orbes solares que explodem em ampla área e deixam poças de fogo contínuo.',
    levels: [
      { badge: 'ORBE SOLAR', desc: 'Dispara esfera ígnea concentrada que explode no impacto e cria uma poça de chamas ardentes no chão.', toString() { return this.desc; } },
      { badge: 'BRASA VIVA', desc: 'Amplia a área da explosão e o raio das chamas no solo, consumindo monstros com fogo contínuo.', toString() { return this.desc; } },
      { badge: 'LABAREDA INTENSA', desc: 'Detonação de fogo de grande alcance que queima ondas inteiras em uma barreira incandescente.', toString() { return this.desc; } },
      { badge: 'INFERNO VORAZ', desc: 'Explosão expansiva massiva que incendeia metade da estrada com chamas impiedosas.', toString() { return this.desc; } },
      { badge: 'CATACLISMO SOLAR', desc: 'Erupção solar titânica! O campo explode em um mar colossal de fogo e cinzas ardentes!', toString() { return this.desc; } }
    ]
  }
};

// Catálogo do Sistema de Pergaminhos Arcanos (Até 2 Escolhas por partida, até Nível 5 cada)
const SCROLL_CATALOG = {
  multishot: {
    id: 'multishot',
    name: 'DISPARO MÚLTIPLO',
    shortName: 'MULTI-SHOT',
    icon: 'scroll_multishot',
    maxLevel: 5,
    levels: [
      { badge: 'DISPARO DUPLO', desc: 'Adiciona uma lâmina de corte frontal e um projétil adicional a todas as armas empunhadas.', toString() { return this.desc; } },
      { badge: 'LEQUE DE DISPAROS', desc: 'Expande ainda mais o leque frontal, liberando ondas e projéteis extras em arco.', toString() { return this.desc; } },
      { badge: 'SARAIVADA ARCANA', desc: 'Dispara uma salva volumosa em leque que satura o corredor de combate com múltiplos golpes.', toString() { return this.desc; } },
      { badge: 'CHUVA DE ATAQUES', desc: 'Múltiplos disparos simultâneos que cobrem toda a área frontal com dano implacável.', toString() { return this.desc; } },
      { badge: 'ONIPRESENÇA MÁXIMA', desc: 'O poder supremo do Disparo Múltiplo! Uma avalanche de lâminas e disparos varre tudo à frente!', toString() { return this.desc; } }
    ]
  },
  growth: {
    id: 'growth',
    name: 'CRESCIMENTO',
    shortName: 'CRESCIMENTO',
    icon: 'scroll_growth',
    maxLevel: 5,
    levels: [
      { badge: 'EXPANSÃO MÍSTICA', desc: 'Amplia a área de impacto de todos os cortes, projéteis e poças de fogo ardentes no solo.', toString() { return this.desc; } },
      { badge: 'ALCANCE AMPLIADO', desc: 'Aumenta expressivamente o tamanho dos ataques, atingindo inimigos mais distantes com segurança.', toString() { return this.desc; } },
      { badge: 'ÁURA GIGANTE', desc: 'Golpes e chamas ganham dimensões formidáveis, devorando o espaço dos monstros na estrada.', toString() { return this.desc; } },
      { badge: 'MAGNITUDE TITÂNICA', desc: 'Tamanho monumental em cada arma, tornando impossível qualquer inimigo avançar ileso.', toString() { return this.desc; } },
      { badge: 'DIMENSÃO SUPREMA', desc: 'Crescimento absoluto! Todas as armas e chamas operam em escala colossal titânica!', toString() { return this.desc; } }
    ]
  },
  attackspeed: {
    id: 'attackspeed',
    name: 'VEL. DE ATAQUE',
    shortName: 'VEL. ATAQUE',
    icon: 'scroll_speed',
    maxLevel: 5,
    levels: [
      { badge: 'FÔLEGO ÁGIL', desc: 'Acelera a cadência de manuseio e ataque de todas as armas ativas na jornada.', toString() { return this.desc; } },
      { badge: 'CADÊNCIA FULMINANTE', desc: 'Golpes e disparos se sucedem com rapidez impressionante, pressionando as defesas inimigas.', toString() { return this.desc; } },
      { badge: 'REFLEXOS AURAIS', desc: 'Ritmo frenético de ataque que suprime hordas velozes sem dar espaço para aproximação.', toString() { return this.desc; } },
      { badge: 'VELOCIDADE FRENÉTICA', desc: 'Ataques desferidos em sucessão avassaladora com intervalo mínimo entre ativações.', toString() { return this.desc; } },
      { badge: 'TEMPESTADE TEMPORAL', desc: 'Velocidade de ataque suprema! O herói maneja suas relíquias em uma velocidade sobrenatural!', toString() { return this.desc; } }
    ]
  },
  duration: {
    id: 'duration',
    name: 'DURAÇÃO ESTENDIDA',
    shortName: 'DURAÇÃO',
    icon: 'hud_hourglass',
    maxLevel: 10,
    levels: [
      { badge: 'PERSISTÃŠNCIA ETERNA', desc: '+15.0s na duraÃ§Ã£o mÃ¡xima! Suas armas duram uma eternidade em campo!', toString() { return this.desc; } }
    ]
  }
};

// CatÃ¡logo Exclusivo do SantuÃ¡rio do Mago (Upgrades Permanentes de Status com PoÃ§Ãµes e Ervas)
const STATUS_CATALOG = {
  maxHp: {
    name: 'ELIXIR DO CORAO DE RUBI (VIDA)',
    shortName: 'VIDA MXIMA',
    potionColor: 0xff5252,
    icon: 'stat_health',
    maxLevel: 6,
    costs: [10, 20, 40, 80, 160, 0],
    values: [1, 2, 3, 4, 5, 6],
    levels: [
      '1 Corao de Vida (Aspecto hardcore inicial de sobrevivncia).',
      '2 Coraes de Vida (+1 Corao - 2 golpes suportados).',
      '3 Coraes de Vida (Vigor honrado do Cavaleiro - 3 golpes).',
      '4 Coraes de Vida (Baluarte de Ao - 4 golpes suportados).',
      '5 Coraes de Vida (Sangue de Drago - 5 golpes suportados).',
      '6 Coraes de Vida (Imortalidade Rubra - 6 Coraes supremos)!'
    ]
  },
  moveSpeed: {
    name: 'POÇÃO DOS VENTOS ALADOS (VELOCIDADE)',
    shortName: 'VELOCIDADE',
    potionColor: 0xffeb3b,
    icon: 'stat_speed',
    maxLevel: 5,
    costs: [10, 20, 40, 80, 160, 0],
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
    costs: [10, 20, 40, 80, 160, 0],
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
    costs: [10, 20, 40, 80, 160, 0],
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

// --- BUNDLE FILE: JS_Teste/src/core/events.js ---
// SISTEMA DE EVENTOS DESACOPLADO (Observer Pattern / EventBus)
// Permite que combate, áudio, interface, conquistas e drops reajam a eventos do jogo
// sem dependência cíclica ou chamadas diretas rígidas.
// =============================================================================
const GameEvents = {
  // Jogador
  PLAYER_HIT: 'player:hit',
  PLAYER_HEALED: 'player:healed',
  PLAYER_DIED: 'player:died',
  // Combate & Projéteis
  ENEMY_DAMAGED: 'enemy:damaged',
  ENEMY_KILLED: 'enemy:killed',
  SHIELD_REFLECT: 'shield:reflect',
  SHIELD_SHOCKWAVE: 'shield:shockwave',
  // Chefão
  BOSS_SPAWNED: 'boss:spawned',
  BOSS_DAMAGED: 'boss:damaged',
  BOSS_DEFEATED: 'boss:defeated',
  // Progressão, Drops & Inventário
  XP_GAINED: 'xp:gained',
  LEVEL_UP: 'player:levelup',
  COIN_COLLECTED: 'coin:collected',
  ITEM_COLLECTED: 'item:collected',
  BUFF_EQUIPPED: 'buff:equipped',
  BUFF_ENDED: 'buff:ended',
  // Conquistas
  ACHIEVEMENT_PROGRESS: 'achievement:progress'
};

class GameEventBus {
  constructor() {
    this.listeners = new Map();
  }
  on(event, fn) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(fn);
    return () => this.off(event, fn);
  }
  once(event, fn) {
    const wrapper = (payload) => {
      this.off(event, wrapper);
      fn(payload);
    };
    return this.on(event, wrapper);
  }
  off(event, fn) {
    const set = this.listeners.get(event);
    if (set) {
      set.delete(fn);
      if (set.size === 0) this.listeners.delete(event);
    }
  }
  emit(event, payload) {
    const set = this.listeners.get(event);
    if (set) {
      for (const fn of Array.from(set)) {
        try {
          fn(payload);
        } catch (err) {
          console.error('[EventBus] Erro ao disparar evento ' + event + ':', err);
        }
      }
    }
  }
  clear() {
    this.listeners.clear();
  }
}
const events = new GameEventBus();

// =============================================================================


// --- BUNDLE FILE: JS_Teste/src/core/state.js ---
// ESTADO (Inclui Estado de XP e Níveis Isolados por Partida)
// =============================================================================
let player, shieldSprite, shieldAura, swordBlade, cursors, keys;
let ground, road, forestTop, forestBottom, shadows, hitFx, dustFx, sparksFx, debrisFx, holyFx, emberFx, playerBuffBar, enemyHpBars, vignetteOverlay, sunRays, ambientMotes;
let enemies, obstacles, items, playerArrows, enemyArrows, slashes, xpOrbs;
let hudContainer, hudGloryText, hudSilverText, hudGoldText, hudBestText, hudHearts = [];
let hudItemIcon, hudItemName, hudItemTime, hudItemBar, hudItemBarBase, hudHornIcon, hudFullscreenIcon;
let hudBackpackSlot, hudBackpackIcon, hudBackpackLock, backpackWeapon = null;
let hudXpBar, hudXpText, hudLevelText;
let activeBoss, bossSpawned, bossDefeated, bossHudContainer, bossHpBar, bossHpText, bossFilterOverlay;
let villageDecor, coins, menuContainer, pauseModal, draftModal, activeModal = null;
let gameState, survivalTime, runSilver = 0, runGold = 0, lastRunSummary = null;
let playerHp = 1, playerMaxHp = 1, playerInvulnerable = false, isHitstopping = false, lastFullscreenExitTime = 0;
let runXp = 0, runLevel = 1, xpToNextLevel = 6, pendingLevelUps = 0;
let runWeaponLevels = { bow: 1, sword: 1, shield: 1, axe: 1, firestaff: 1 };
let runBonusDuration = 0;
let chosenScrolls = [];
let chosenScroll = null;
let scrollLevels = { multishot: 0, growth: 0, attackspeed: 0, duration: 0 };
let activeFirePools = [];
let hudScrollBadges = [], hudScrollTexts = [];
let hudScrollBadge = null, hudScrollText = null;
let enemySpeed, spawnDelay, worldSpeed = 117, buff, slashCounter = 0, entityIdCounter = 0;
let nextHordeTime = 45, hordeCycleCount = 0;
if (typeof window !== 'undefined') window.worldSpeed = 117;
let virtualJoystick = null;

// =============================================================================


// --- BUNDLE FILE: JS_Teste/src/core/storage.js ---
// GERENCIADOR DE PERSISTÊNCIA & UPGRADES (StorageManager / Facade Pattern)
// Encapsula acesso ao localStorage, validações e dados salvos de forma centralizada.
// =============================================================================
const StorageManager = {
  _mem: {},

  safeGet(key) {
    try {
      if (typeof localStorage !== 'undefined') {
        const val = localStorage.getItem(key);
        if (val !== null && val !== undefined) return val;
      }
    } catch (e) {}
    return this._mem[key] !== undefined ? this._mem[key] : null;
  },

  safeSet(key, val) {
    this._mem[key] = String(val);
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, String(val));
      }
    } catch (e) {}
  },
  getHighScores() {
    const defaults = [{ name: 'ART', score: 40 }, { name: 'LAN', score: 28 }, { name: 'GWE', score: 18 }];
    try {
      const data = this.safeGet(STORAGE_KEY);
      return data ? JSON.parse(data) : defaults;
    } catch {
      return defaults;
    }
  },

  saveHighScore(name, score) {
    const scores = this.getHighScores();
    scores.push({ name: name.toUpperCase().slice(0, 3) || '???', score });
    scores.sort((a, b) => b.score - a.score);
    const topScores = scores.slice(0, 5);
    try {
      this.safeSet(STORAGE_KEY, JSON.stringify(topScores));
    } catch {}
    return topScores;
  },

  getBestScore() {
    return this.getHighScores()[0]?.score ?? 0;
  },

  getGold() {
    try {
      const raw = this.safeGet(STORAGE_GOLD_KEY);
      return raw ? Math.max(0, parseInt(raw, 10) || 0) : 0;
    } catch {
      return 0;
    }
  },

  setGold(total) {
    const val = Math.max(0, Math.floor(total));
    try {
      this.safeSet(STORAGE_GOLD_KEY, String(val));
    } catch {}
    if (hudGoldText && hudGoldText.active) {
      hudGoldText.setText(`${val}`);
    }
    return val;
  },

  addGold(amount) {
    const current = this.getGold();
    return this.setGold(current + amount);
  },

  consolidateSilverToGold() {
    // GDD v1.0: 10 Moedas de Prata = 1 Moeda de Ouro
    const earnedGold = Math.floor(runSilver / 10);
    const savedSilver = runSilver;
    runGold = earnedGold;
    this.addGold(earnedGold);
    lastRunSummary = {
      survivalTime,
      silverCollected: savedSilver,
      runSilver: savedSilver,
      earnedGold,
      goldFromSilver: earnedGold,
      totalGoldEarned: earnedGold,
      totalGold: this.getGold(),
      newTotalGold: this.getGold()
    };
    runSilver = 0;
    return lastRunSummary;
  },

  getUpgrades() {
    const defaults = {
      bow: { unlocked: true, level: 1 },
      sword: { unlocked: true, level: 1 },
      shield: { unlocked: false, level: 1 },
      axe: { unlocked: false, level: 1 },
      firestaff: { unlocked: false, level: 1 },
      starterWeapon: 'bow'
    };
    try {
      const raw = this.safeGet(STORAGE_UPGRADES_KEY);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      const res = { ...defaults };
      Object.keys(defaults).forEach(k => {
        if (k === 'starterWeapon') {
          res[k] = parsed[k] && defaults[parsed[k]] ? parsed[k] : defaults[k];
        } else {
          res[k] = {
            unlocked: Boolean(parsed[k]?.unlocked ?? defaults[k].unlocked),
            level: Math.max(1, parseInt(parsed[k]?.level ?? 1, 10))
          };
        }
      });
      return res;
    } catch {
      return defaults;
    }
  },

  saveUpgrades(up) {
    try {
      this.safeSet(STORAGE_UPGRADES_KEY, JSON.stringify(up));
    } catch {}
    return up;
  },

  getWeaponLevel(type) {
    return runWeaponLevels[type] || 1;
  },

  getUnlockedWeaponPool() {
    const up = this.getUpgrades();
    const pool = [];
    ['bow', 'sword', 'shield', 'axe', 'firestaff'].forEach(k => {
      if (up[k]?.unlocked) pool.push(k);
    });
    return pool.length > 0 ? pool : ['bow'];
  },

  getStatusUpgrades() {
    const defaults = { maxHp: 1, moveSpeed: 1, magnet: 1, wisdom: 1 };
    try {
      const raw = this.safeGet(STORAGE_STATUS_KEY);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      return {
        maxHp: Phaser.Math.Clamp(parsed.maxHp ?? 1, 1, STATUS_CATALOG.maxHp.maxLevel),
        moveSpeed: Phaser.Math.Clamp(parsed.moveSpeed ?? 1, 1, STATUS_CATALOG.moveSpeed.maxLevel),
        magnet: Phaser.Math.Clamp(parsed.magnet ?? 1, 1, STATUS_CATALOG.magnet.maxLevel),
        wisdom: Phaser.Math.Clamp(parsed.wisdom ?? 1, 1, STATUS_CATALOG.wisdom.maxLevel)
      };
    } catch {
      return defaults;
    }
  },

  saveStatusUpgrades(st) {
    try {
      this.safeSet(STORAGE_STATUS_KEY, JSON.stringify(st));
    } catch {}
    return st;
  },

  getStatusLevel(key) {
    return this.getStatusUpgrades()[key] || 1;
  },

  getMagnetRadius() {
    const lvl = this.getStatusLevel('magnet');
    return STATUS_CATALOG.magnet.values[lvl - 1] || 90;
  },

  getPlayerMaxHp() {
    const lvl = this.getStatusLevel('maxHp');
    return STATUS_CATALOG.maxHp.values[lvl - 1] || 1;
  },

  getPlayerMoveSpeed() {
    const lvl = this.getStatusLevel('moveSpeed');
    return STATUS_CATALOG.moveSpeed.values[lvl - 1] || PLAYER_SPEED;
  },

  getWisdomMultiplier() {
    const lvl = this.getStatusLevel('wisdom');
    return STATUS_CATALOG.wisdom.values[lvl - 1] || 1.0;
  },

  getWisdomBonusDuration() {
    const lvl = this.getStatusLevel('wisdom');
    return [0, 0.6, 1.2, 1.8, 2.5][lvl - 1] || 0;
  },

  getXpRequiredForLevel(lvl) {
    const xpTable = [6, 12, 20, 32, 48, 68, 95, 130, 175, 230];
    if (lvl - 1 < xpTable.length) return xpTable[lvl - 1];
    return 230 + (lvl - xpTable.length) * 65;
  },

  getAchievementsData() {
    const defaults = {
      unlocked: {},
      stats: { goblins: 0, warriors: 0, mages: 0, reflected: 0 }
    };
    try {
      const raw = this.safeGet(STORAGE_ACHIEVEMENTS_KEY);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      return {
        unlocked: parsed.unlocked || {},
        stats: {
          goblins: parsed.stats?.goblins || 0,
          warriors: parsed.stats?.warriors || 0,
          mages: parsed.stats?.mages || 0,
          reflected: parsed.stats?.reflected || 0
        }
      };
    } catch {
      return defaults;
    }
  },

  saveAchievementsData(data) {
    try {
      this.safeSet(STORAGE_ACHIEVEMENTS_KEY, JSON.stringify(data));
    } catch {}
    return data;
  },

  recordAchievementProgress(scene, statKey, amount = 1) {
    const data = this.getAchievementsData();
    if (data.stats[statKey] === undefined) return;
    data.stats[statKey] += amount;

    const newlyUnlocked = [];
    ACHIEVEMENTS_CATALOG.forEach(ach => {
      if (ach.stat === statKey && !data.unlocked[ach.id] && data.stats[statKey] >= ach.target) {
        data.unlocked[ach.id] = true;
        newlyUnlocked.push(ach);
      }
    });

    this.saveAchievementsData(data);

    newlyUnlocked.forEach((ach, idx) => {
      this.addGold(ach.rewardGold || 0);
      if (scene) {
        scene.time.delayedCall(idx * 1800, () => showAchievementToast(scene, ach));
      }
    });
  },

  isGameFullscreen(scene) {
    return Boolean((scene && scene.scale && scene.scale.isFullscreen) || (typeof document !== 'undefined' && document.fullscreenElement));
  },

  updateFullscreenIcons(scene) {
    const fs = this.isGameFullscreen(scene);
    if (hudFullscreenIcon && hudFullscreenIcon.active) {
      hudFullscreenIcon.setFrame(fs ? 1 : 0);
    }
  },

  toggleFullscreen(scene) {
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
    });
  },

  getJoystickMode() {
    try {
      const mode = this.safeGet(STORAGE_JOYSTICK_KEY);
      if (mode === 'enabled' || mode === 'disabled') return mode;
      // No computador (desktop / laptop), o padrÃ£o Ã© SEMPRE desativado!
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        const ua = (navigator.userAgent || navigator.vendor || window.opera || '').toLowerCase();
        const isMobile = /android|iphone|ipod|blackberry|iemobile|opera mini|mobile/i.test(ua);
        const isIPad = /ipad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        if (isMobile || isIPad) return 'enabled';
      }
      return 'disabled';
    } catch {
      return 'disabled';
    }
  },

  setJoystickMode(mode) {
    try {
      this.safeSet(STORAGE_JOYSTICK_KEY, mode);
    } catch {}
  },

  hasBackpack() {
    return this.safeGet(STORAGE_BACKPACK_KEY) === 'true';
  },

  setBackpack(val) {
    this.safeSet(STORAGE_BACKPACK_KEY, val ? 'true' : 'false');
  },

  hasDefeatedBossOnce() {
    return this.safeGet(STORAGE_BOSS_DEFEATED_KEY) === 'true';
  },

  setBossDefeatedOnce(val) {
    this.safeSet(STORAGE_BOSS_DEFEATED_KEY, val ? 'true' : 'false');
  }
};

// Aliases para compatibilidade total com o restante do jogo
function getHighScores() { return StorageManager.getHighScores(); }
function saveHighScore(name, score) { return StorageManager.saveHighScore(name, score); }
const getBestScore = () => StorageManager.getBestScore();
function getGold() { return StorageManager.getGold(); }
function setGold(total) { return StorageManager.setGold(total); }
function addGold(amount) { return StorageManager.addGold(amount); }
function spendGold(amount) {
  if (getGold() < amount) return false;
  addGold(-amount);
  return true;
}
function consolidateSilverToGold() { return StorageManager.consolidateSilverToGold(); }
function getUpgrades() { return StorageManager.getUpgrades(); }
function saveUpgrades(up) { return StorageManager.saveUpgrades(up); }
function getWeaponLevel(type) { return StorageManager.getWeaponLevel(type); }
function getUnlockedWeaponPool() { return StorageManager.getUnlockedWeaponPool(); }
function getStatusUpgrades() { return StorageManager.getStatusUpgrades(); }
function saveStatusUpgrades(st) { return StorageManager.saveStatusUpgrades(st); }
function setStatusUpgradeLevel(key, lvl) {
  const current = StorageManager.getStatusUpgrades();
  current[key] = lvl;
  StorageManager.saveStatusUpgrades(current);
  return current;
}
function getStatusLevel(key) { return StorageManager.getStatusLevel(key); }
function getMagnetRadius() { return StorageManager.getMagnetRadius(); }
function getPlayerMaxHp() { return StorageManager.getPlayerMaxHp(); }
function getPlayerMoveSpeed() { return StorageManager.getPlayerMoveSpeed(); }
function getWisdomMultiplier() { return StorageManager.getWisdomMultiplier(); }
function getWisdomBonusDuration() { return StorageManager.getWisdomBonusDuration(); }
function getXpRequiredForLevel(lvl) { return StorageManager.getXpRequiredForLevel(lvl); }
function getAchievementsData() { return StorageManager.getAchievementsData(); }
function saveAchievementsData(data) { return StorageManager.saveAchievementsData(data); }
function recordAchievementProgress(scene, statKey, amount = 1) { return StorageManager.recordAchievementProgress(scene, statKey, amount); }
function isGameFullscreen(scene) { return StorageManager.isGameFullscreen(scene); }
function updateFullscreenIcons(scene) { return StorageManager.updateFullscreenIcons(scene); }
function toggleFullscreen(scene) { return StorageManager.toggleFullscreen(scene); }
function getJoystickMode() { return StorageManager.getJoystickMode(); }
function setJoystickMode(mode) { return StorageManager.setJoystickMode(mode); }
function hasBackpack() { return StorageManager.hasBackpack(); }
function setBackpack(val) { return StorageManager.setBackpack(val); }
function hasDefeatedBossOnce() { return StorageManager.hasDefeatedBossOnce(); }
function setBossDefeatedOnce(val) { return StorageManager.setBossDefeatedOnce(val); }

// Desacoplamento da tecla ESC com Tela Cheia nativa do navegador
if (typeof document !== 'undefined') {
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      lastFullscreenExitTime = Date.now();
    }
    if (typeof updateFullscreenIcons === 'function') {
      updateFullscreenIcons();
    }
  });
}

// =============================================================================


// --- BUNDLE FILE: JS_Teste/src/core/audio.js ---
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

const XP_SCALE = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51];

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

    this.xpComboIndex = 0;
    this.lastXpCollectTime = 0;

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

  // Silenciamento mandatório para anúncios (QA Compliant: Poki & CrazyGames)
  muteForAd() {
    this.wasMutedBeforeAd = this.muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
    if (this.ctx && this.ctx.state === 'running') {
      try { this.ctx.suspend(); } catch (e) {}
    }
  }

  // Restauração do áudio após anúncio respeitando a escolha original do jogador
  unmuteAfterAd() {
    if (this.ctx && this.ctx.state === 'suspended') {
      try { this.ctx.resume(); } catch (e) {}
    }
    const shouldBeMuted = Boolean(this.wasMutedBeforeAd || this.muted);
    this.muted = shouldBeMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(shouldBeMuted ? 0 : 0.7, this.ctx.currentTime);
    }
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

    this.xpComboIndex = 0;
    this.lastXpCollectTime = 0;
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

  // Disparo / Labareda do Cajado de Fogo ou despertar ardente dos olhos do Golem
  playFireStaff() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(320, now + 0.22);
    filter.Q.setValueAtTime(3, now);
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.42, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(this.sfxGain);
    noise.start(now);
    noise.stop(now + 0.22);

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(65, now + 0.2);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.2);
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

  // Coleta de Orbe de XP (cristal místico suave)
  playXpOrb() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const nowMs = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    if (nowMs - this.lastXpCollectTime < 450) {
      this.xpComboIndex = (this.xpComboIndex + 1) % XP_SCALE.length;
    } else {
      this.xpComboIndex = 0;
    }
    this.lastXpCollectTime = nowMs;
    const baseFreq = XP_SCALE[this.xpComboIndex];
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.25, now + 0.07);
    gain.gain.setValueAtTime(0.20, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.09);
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


// --- BUNDLE FILE: JS_Teste/src/core/platformBridge.js ---
// =============================================================================
// PLATFORM BRIDGE — ADAPTER UNIVERSAL DE PUBLICAÇÃO WEB
// Suporte unificado para:
// - Itch.io / GameJolt / Offline Local (Zero dependências, 100% autônomo)
// - CrazyGames (SDK v3: gameplayStart, gameplayStop, Midroll, Rewarded Ads)
// - Poki (SDK v2: gameplayStart, gameplayStop, commercialBreak, rewardedBreak)
// =============================================================================

class PlatformBridgeController {
  constructor() {
    this.platform = 'STANDALONE'; // 'STANDALONE', 'CRAZYGAMES', 'POKI'
    this.initialized = false;
    this.initPromise = null;
    this.lastMidrollTime = 0;
    this.gameLaunchTime = Date.now();
    this.minMidrollInterval = 150000; // Mínimo de 150s (2.5 min) entre midrolls (QA Compliant)
    this.initialBufferTime = 90000;   // Sem anúncios nos primeiros 90s de jogo
    this.rewardedUsedInRun = false;
    this.isShowingAd = false;
    this.loadingFinished = false;

    this.detectPlatform();
    this.init();
  }

  detectPlatform() {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search || '');
    const forced = urlParams.get('platform') || urlParams.get('sdk');
    const hostname = window.location.hostname || '';

    if (forced === 'poki' || hostname.includes('poki.com') || hostname.includes('poki-gdn.com')) {
      this.platform = 'POKI';
    } else if (
      forced === 'crazygames' ||
      hostname.includes('crazygames.com') ||
      hostname.includes('1001juegos.com') ||
      hostname.includes('gameflare.com')
    ) {
      this.platform = 'CRAZYGAMES';
    } else {
      this.platform = 'STANDALONE'; // Itch.io, Newgrounds, dev local
    }

    console.log(`[PlatformBridge] Plataforma detectada: ${this.platform}`);
  }

  // Inicializa o SDK específico de forma assíncrona e segura
  async init() {
    if (this.initialized) return true;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve) => {
      try {
        if (this.platform === 'POKI') {
          this.initPoki(resolve);
        } else if (this.platform === 'CRAZYGAMES') {
          this.initCrazyGames(resolve);
        } else {
          // Modo Standalone / Itch.io: pronto imediatamente
          this.initialized = true;
          resolve(true);
        }
      } catch (err) {
        console.warn('[PlatformBridge] Falha ao iniciar SDK da plataforma, usando fallback Standalone:', err);
        this.platform = 'STANDALONE';
        this.initialized = true;
        resolve(true);
      }
    });

    return this.initPromise;
  }

  initPoki(resolve) {
    const onPokiReady = () => {
      this.initialized = true;
      if (this.loadingFinished && typeof window.PokiSDK !== 'undefined') {
        try { window.PokiSDK.gameLoadingFinished(); } catch (e) {}
      }
      resolve(true);
    };

    if (typeof window.PokiSDK !== 'undefined') {
      window.PokiSDK.init()
        .then(() => {
          console.log('[PlatformBridge] PokiSDK inicializado com sucesso.');
          onPokiReady();
        })
        .catch(() => {
          console.warn('[PlatformBridge] PokiSDK inicializado com adblocker ou restrição.');
          onPokiReady();
        });
      return;
    }

    // Carregamento dinâmico do script Poki se estiver no domínio Poki
    const script = document.createElement('script');
    script.src = 'https://game-cdn.poki.com/scripts/v2/poki-sdk.js';
    script.onload = () => {
      if (typeof window.PokiSDK !== 'undefined') {
        window.PokiSDK.init()
          .then(() => onPokiReady())
          .catch(() => onPokiReady());
      } else {
        onPokiReady();
      }
    };
    script.onerror = () => {
      console.warn('[PlatformBridge] Não foi possível carregar PokiSDK, fallback ativado.');
      this.platform = 'STANDALONE';
      this.initialized = true;
      resolve(true);
    };
    document.head.appendChild(script);
  }

  initCrazyGames(resolve) {
    const onCrazyReady = () => {
      this.initialized = true;
      if (this.loadingFinished && window.CrazyGames?.SDK?.game?.loadingStop) {
        try { window.CrazyGames.SDK.game.loadingStop(); } catch (e) {}
      }
      resolve(true);
    };

    if (typeof window.CrazyGames !== 'undefined' && window.CrazyGames.SDK) {
      window.CrazyGames.SDK.init()
        .then(() => {
          console.log('[PlatformBridge] CrazyGames SDK v3 inicializado.');
          onCrazyReady();
        })
        .catch((err) => {
          console.warn('[PlatformBridge] CrazyGames SDK falhou ao inicializar:', err);
          onCrazyReady();
        });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.crazygames.com/crazygames-sdk-v3.js';
    script.onload = () => {
      if (typeof window.CrazyGames !== 'undefined' && window.CrazyGames.SDK) {
        window.CrazyGames.SDK.init()
          .then(() => onCrazyReady())
          .catch(() => onCrazyReady());
      } else {
        onCrazyReady();
      }
    };
    script.onerror = () => {
      console.warn('[PlatformBridge] Não foi possível carregar CrazyGames SDK, fallback ativado.');
      this.platform = 'STANDALONE';
      this.initialized = true;
      resolve(true);
    };
    document.head.appendChild(script);
  }

  // ---------------------------------------------------------------------------
  // SINAIS DE CARREGAMENTO (Loading Life Cycle - Poki & CrazyGames QA)
  // ---------------------------------------------------------------------------
  loadingStart() {
    try {
      if (this.platform === 'CRAZYGAMES' && window.CrazyGames?.SDK?.game?.loadingStart) {
        window.CrazyGames.SDK.game.loadingStart();
      }
    } catch (e) {
      console.warn('[PlatformBridge] loadingStart erro:', e);
    }
  }

  loadingStop() {
    this.loadingFinished = true;
    try {
      if (this.platform === 'POKI' && typeof window.PokiSDK !== 'undefined') {
        window.PokiSDK.gameLoadingFinished();
      } else if (this.platform === 'CRAZYGAMES' && window.CrazyGames?.SDK?.game?.loadingStop) {
        window.CrazyGames.SDK.game.loadingStop();
      }
    } catch (e) {
      console.warn('[PlatformBridge] loadingStop erro:', e);
    }
  }

  // ---------------------------------------------------------------------------
  // TELEMETRIA E CICLO DE JOGABILIDADE (Obrigatórios para Poki e CrazyGames)
  // ---------------------------------------------------------------------------
  gameplayStart() {
    try {
      if (this.platform === 'POKI' && typeof window.PokiSDK !== 'undefined') {
        window.PokiSDK.gameplayStart();
      } else if (this.platform === 'CRAZYGAMES' && window.CrazyGames?.SDK?.game) {
        window.CrazyGames.SDK.game.gameplayStart();
      }
    } catch (e) {
      console.warn('[PlatformBridge] gameplayStart erro:', e);
    }
  }

  gameplayStop() {
    try {
      if (this.platform === 'POKI' && typeof window.PokiSDK !== 'undefined') {
        window.PokiSDK.gameplayStop();
      } else if (this.platform === 'CRAZYGAMES' && window.CrazyGames?.SDK?.game) {
        window.CrazyGames.SDK.game.gameplayStop();
      }
    } catch (e) {
      console.warn('[PlatformBridge] gameplayStop erro:', e);
    }
  }

  // ---------------------------------------------------------------------------
  // ANÚNCIOS MIDROLL (INTERSTITIAL ENTRE PARTIDAS)
  // ---------------------------------------------------------------------------
  canShowMidroll() {
    if (this.platform === 'STANDALONE') return false;
    const now = Date.now();
    // Protege o jogador na primeira partida (90s de buffer) e impõe cooldown de 150s
    if (now - this.gameLaunchTime < this.initialBufferTime) return false;
    if (now - this.lastMidrollTime < this.minMidrollInterval) return false;
    return true;
  }

  showMidroll(scene, onComplete) {
    const finish = () => {
      this.isShowingAd = false;
      this.restoreAudioAndPhysics(scene);
      if (typeof onComplete === 'function') onComplete();
    };

    if (!this.canShowMidroll()) {
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    this.isShowingAd = true;
    this.pauseAudioAndPhysics(scene);
    this.lastMidrollTime = Date.now();

    try {
      if (this.platform === 'POKI' && typeof window.PokiSDK !== 'undefined') {
        window.PokiSDK.commercialBreak()
          .then(() => finish())
          .catch(() => finish());
      } else if (this.platform === 'CRAZYGAMES' && window.CrazyGames?.SDK?.ad) {
        window.CrazyGames.SDK.ad.requestAd('midroll', {
          adStarted: () => { /* Som e física já pausados */ },
          adFinished: () => finish(),
          adError: () => finish()
        });
      } else {
        finish();
      }
    } catch (err) {
      console.warn('[PlatformBridge] Erro ao exibir Midroll:', err);
      finish();
    }
  }

  // ---------------------------------------------------------------------------
  // ANÚNCIOS REWARDED (VÍDEOS COM RECOMPENSA VOLUNTÁRIA)
  // ---------------------------------------------------------------------------
  showRewarded(scene, { onReward, onDismiss, onError }) {
    const handleReward = () => {
      if (typeof onReward === 'function') onReward();
    };

    const finish = () => {
      this.isShowingAd = false;
      this.restoreAudioAndPhysics(scene);
      if (typeof onDismiss === 'function') onDismiss();
    };

    this.isShowingAd = true;
    this.pauseAudioAndPhysics(scene);

    // Em modo Standalone/Itch.io (onde não há rede de anúncios), concede a recompensa imediatamente para permitir testes completos
    if (this.platform === 'STANDALONE') {
      console.log('[PlatformBridge] Standalone: recompensa concedida diretamente.');
      handleReward();
      finish();
      return;
    }

    try {
      if (this.platform === 'POKI' && typeof window.PokiSDK !== 'undefined') {
        window.PokiSDK.rewardedBreak()
          .then((success) => {
            if (success) handleReward();
            finish();
          })
          .catch((err) => {
            console.warn('[PlatformBridge] Poki rewarded erro:', err);
            if (typeof onError === 'function') onError(err);
            finish();
          });
      } else if (this.platform === 'CRAZYGAMES' && window.CrazyGames?.SDK?.ad) {
        window.CrazyGames.SDK.ad.requestAd('rewarded', {
          adStarted: () => { /* Som e física já pausados */ },
          adFinished: () => {
            handleReward();
            finish();
          },
          adError: (err) => {
            console.warn('[PlatformBridge] CrazyGames rewarded erro:', err);
            if (typeof onError === 'function') onError(err);
            finish();
          }
        });
      } else {
        handleReward();
        finish();
      }
    } catch (err) {
      console.warn('[PlatformBridge] Erro ao invocar rewarded ad:', err);
      if (typeof onError === 'function') onError(err);
      finish();
    }
  }

  // ---------------------------------------------------------------------------
  // PAUSA DE FÍSICA E SILENCIAMENTO DE ÁUDIO (Exigência de QA de todas as plataformas)
  // ---------------------------------------------------------------------------
  pauseAudioAndPhysics(scene) {
    if (typeof sound !== 'undefined' && sound.muteForAd) {
      sound.muteForAd();
    }
    if (scene && scene.physics) {
      scene.physics.pause();
    }
    if (scene && scene.time) {
      scene.time.paused = true;
    }
  }

  restoreAudioAndPhysics(scene) {
    if (typeof sound !== 'undefined' && sound.unmuteAfterAd) {
      sound.unmuteAfterAd();
    }
    // Restaura a física e timers apenas se a partida ainda estiver em andamento
    if (typeof gameState !== 'undefined' && gameState === 'PLAYING') {
      if (scene && scene.physics) {
        scene.physics.resume();
      }
      if (scene && scene.time) {
        scene.time.paused = false;
      }
    }
  }
}

// Instância singleton global do PlatformBridge
const PlatformBridge = new PlatformBridgeController();
if (typeof window !== 'undefined') {
  window.PlatformBridge = PlatformBridge;
}


// --- BUNDLE FILE: JS_Teste/src/art/drawHelpers.js ---
// ARTE: FERRAMENTAS DE PIXEL ART & RENDERIZAÇÃO 64-BIT
// Cada "pixel" lógico opera em grade 2x2 com contornos com iluminação direcional (Luz zenital no topo/esquerda e oclusão de contato na base/direita).
// Utilitários de desenho: r.dither (gradiente sub-pixel), r.shine (especular), r.rim (luz de borda) e r.bevel (volume 3D).
// =============================================================================
function drawPixels(g, ox, oy, draw, frame = 0) {
  const pass = (dx, dy, outline, isLightEdge = false) => {
    const outlineColor = isLightEdge ? (C.outlineSoft || 0x2e241c) : (C.outline || 0x16100c);
    const r = (color, x, y, w = 1, h = 1) => {
      g.fillStyle(outline ? outlineColor : color).fillRect(
        ox + x * 2 + dx,
        oy + y * 2 + dy,
        w * 2,
        h * 2
      );
    };

    // Dithering 64-bit: padrão xadrez 1x1 sub-pixel para gradientes suaves de metal/tecido/terreno
    r.dither = (colorA, colorB, x, y, w = 1, h = 1, invert = false) => {
      if (outline) {
        g.fillStyle(outlineColor).fillRect(ox + x * 2 + dx, oy + y * 2 + dy, w * 2, h * 2);
      } else {
        for (let lx = 0; lx < w; lx++) {
          for (let ly = 0; ly < h; ly++) {
            const px = ox + (x + lx) * 2;
            const py = oy + (y + ly) * 2;
            const flip = ((lx + ly + (invert ? 1 : 0)) % 2 === 0);
            const c1 = flip ? colorA : colorB;
            const c2 = flip ? colorB : colorA;
            g.fillStyle(c1).fillRect(px, py, 1, 1).fillRect(px + 1, py + 1, 1, 1);
            g.fillStyle(c2).fillRect(px + 1, py, 1, 1).fillRect(px, py + 1, 1, 1);
          }
        }
      }
    };

    // Ponto especular (glint de 1 sub-pixel em joias, lâminas e bordas polidas)
    r.shine = (x, y, subX = 0, subY = 0, color = C.white) => {
      if (!outline) {
        g.fillStyle(color).fillRect(ox + x * 2 + subX, oy + y * 2 + subY, 1, 1);
      }
    };

    // Luz de borda / Rim light volumétrica de alta nitidez
    r.rim = (x, y, w = 1, h = 1, color = C.white) => {
      if (!outline) {
        g.fillStyle(color).fillRect(ox + x * 2, oy + y * 2, w * 2, 1);
      }
    };

    // Borda chanfrada 3D para moedas, botões e medalhões
    r.bevel = (highlightColor, shadowColor, x, y, w, h) => {
      if (outline) {
        g.fillStyle(outlineColor).fillRect(ox + x * 2 + dx, oy + y * 2 + dy, w * 2, h * 2);
      } else {
        g.fillStyle(highlightColor)
          .fillRect(ox + x * 2, oy + y * 2, w * 2, 2)
          .fillRect(ox + x * 2, oy + y * 2, 2, h * 2);
        g.fillStyle(shadowColor)
          .fillRect(ox + x * 2, oy + (y + h) * 2 - 2, w * 2, 2)
          .fillRect(ox + (x + w) * 2 - 2, oy + y * 2, 2, h * 2);
      }
    };

    draw(r, frame, r);
  };

  // Contorno Direcional 64-bit (Luz ambiente e Oclusão de Contato):
  // Topo e Esquerda recebem iluminação da copa (outlineSoft); Base e Direita recebem sombra de contato (outline)
  pass(-1, 0, true, true);  // Esquerda: luz suave
  pass(0, -1, true, true);  // Topo: luz suave
  pass(1, 0, true, false);  // Direita: sombra de contato
  pass(0, 1, true, false);  // Base: sombra de contato profunda
  pass(0, 0, false, false); // Cores e detalhes em alta nitidez
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


// --- BUNDLE FILE: JS_Teste/src/art/characterArt.js ---
// =============================================================================
// ARTE PROCEDURAL: PERSONAGENS, INIMIGOS, CHEFES E NPCS
// =============================================================================
// ARTE: DESENHOS (r = cor, x, y, largura, altura — em pixels do desenho)
// Todos olham para a direita; inimigos são espelhados com setFlipX.
// =============================================================================
function drawKnight(r, f) {
  // 1. Pluma Real Vermelha Vibrante Esvoaçante (balança suavemente conforme o ciclo de corrida)
  const plumeCycle = f % 4;
  if (plumeCycle === 1) {
    // Pluma sobe 1px no impulso
    r(C.rubyDeep, 6, 0, 3, 1); r(C.redBase, 5, 1, 4, 1); r(C.redHighlight, 5, 0, 2, 1);
  } else if (plumeCycle === 2) {
    // Pluma estende para trás no passo largo
    r(C.rubyDeep, 5, 1, 4, 1); r(C.redBase, 4, 2, 4, 1); r(C.redHighlight, 4, 1, 2, 1);
  } else {
    // Pluma na posição nobre padrão (frames 0 e 3)
    r(C.rubyDeep, 6, 1, 3, 1); r(C.redBase, 5, 2, 4, 1); r(C.redHighlight, 5, 1, 2, 1);
  }

  // 2. Elmo de Aço Polido com Viseira em T e Chanfro Metálico
  r(C.steelShadow, 4, 3, 6, 4);
  r(C.steelBase, 5, 3, 5, 4);
  r(C.steelHighlight, 5, 3, 3, 1);
  r.shine(5, 3, 0, 0, C.white);
  // Viseira profunda com fresta de olhar heróico
  r(C.outline, 7, 5, 3, 1);
  r(C.outline, 8, 6, 1, 1);
  r(C.steelHighlight, 8, 5, 1, 1);

  // 3. Ombreiras Torneadas de Aço
  r(C.steelShadow, 2, 7, 2, 3);
  r(C.steelHighlight, 2, 7, 1, 2);
  r(C.steelShadow, 10, 7, 2, 3);
  r(C.steelHighlight, 10, 7, 1, 2);

  // 4. Peitoral de Couraça de Aço com Tabardo Azul Real e Brasão da Cruz Dourada
  r(C.steelShadow, 3, 7, 8, 5);
  r(C.steelBase, 4, 7, 6, 5);
  r(C.blueBase, 5, 7, 4, 5);
  r(C.blueLight, 5, 7, 1, 4);
  // Cruz dourada heráldica em relevo
  r(C.goldBase, 7, 8, 1, 3);
  r(C.goldBase, 6, 9, 3, 1);
  r(C.goldHighlight, 7, 9, 1, 1);

  // 5. Cota de Malha sob o Tabardo e Braço com Manopla de Aço
  r(C.ironBase, 3, 10, 2, 2);
  r(C.steelShadow, 11, 8, 2, 3);
  r(C.steelHighlight, 11, 8, 1, 2);
  r.shine(11, 8, 0, 0, C.white);

  // 6. Cinto de Couro com Fivela Dourada Imperial
  r(C.leatherDark, 3, 11, 8, 1);
  r(C.goldHighlight, 6, 11, 2, 1);

  // 7. Ciclo de Corrida de 4 Quadros ('knight_run' fluida com passadas realistas)
  // Frame 0: Perna esquerda avança, perna direita atrás
  // Frame 1: Apoio central (bobbing de 1px)
  // Frame 2: Perna direita avança, perna esquerda atrás
  // Frame 3: Impulso central
  const legCycle = f % 4;
  if (legCycle === 0) {
    r(C.steelShadow, 3, 12, 3, 2); r(C.boot, 3, 14, 3, 1);
    r(C.steelDeep, 8, 12, 2, 1);   r(C.boot, 8, 13, 2, 1);
  } else if (legCycle === 1) {
    r(C.steelShadow, 4, 12, 2, 2); r(C.boot, 4, 14, 3, 1);
    r(C.steelDeep, 7, 12, 2, 2);   r(C.boot, 7, 14, 3, 1);
  } else if (legCycle === 2) {
    r(C.steelDeep, 4, 12, 2, 1);   r(C.boot, 4, 13, 2, 1);
    r(C.steelShadow, 8, 12, 3, 2); r(C.boot, 8, 14, 3, 1);
  } else {
    r(C.steelShadow, 5, 12, 2, 2); r(C.boot, 5, 13, 3, 1);
    r(C.steelDeep, 8, 12, 2, 2);   r(C.boot, 8, 13, 3, 1);
  }
}

function drawGoblin(r, f) {
  // 1. Orelhas Pontudas Destacadas com Sombra Interna
  r(C.gobShadow, 1, 1, 3, 3); r(C.gobLight, 2, 2, 2, 1);
  r(C.gobShadow, 10, 1, 3, 3); r(C.gobLight, 10, 2, 2, 1);

  // 2. Cabeça e Pele Esverdeada Texturizada
  r(C.gobShadow, 4, 2, 6, 5);
  r(C.gobBase, 4, 2, 5, 4);
  r(C.gobLight, 5, 2, 3, 2);

  // 3. Olhos Amarelos Maliciosos com Pupila Vermelha
  r(C.yellow, 5, 4, 2, 1); r(C.eye, 6, 4, 1, 1);
  r(C.yellow, 8, 4, 2, 1); r(C.eye, 8, 4, 1, 1);

  // 4. Nariz Adunco e Mandíbula com Presas Brancas Afiadas
  r(C.gobDeep, 9, 5, 2, 2);
  r(C.gobDeep, 4, 6, 6, 1);
  r(C.bone, 6, 6, 1, 1); r(C.bone, 8, 6, 1, 1);

  // 5. Trapos de Couro Rasgados e Cinto Rústico
  r(C.leatherDark, 4, 7, 6, 4);
  r(C.leatherBase, 4, 8, 5, 2);
  r(C.woodDark, 4, 9, 6, 1);

  // 6. Braço e Adaga Enferrujada com Fio de Corte Reluzente
  r(C.gobBase, 10, 8, 2, 2);
  r(C.boneDark, 11, 8, 1, 1);
  r(C.ironBase, 11, 5, 2, 3);
  r(C.dirtShadow, 11, 6, 1, 1);
  r(C.steelHighlight, 12, 5, 1, 3);
  r.shine(12, 5, 0, 0, C.white);

  // 7. Pernas Ágeis de Goblin com Passada Rápida
  const leg = (x, up) => {
    r(C.gobShadow, x, 11, 2, up ? 1 : 2);
    r(C.outline, x, up ? 12 : 13, 2, 1);
  };
  leg(5, f === 0); leg(8, f === 1);
}

// Goblin Scout / Rastreador Ágil (Silhueta compacta 22x22, bandana vermelha e adagas duplas)
function drawGoblinScout(r, f) {
  // 1. Bandana Carmesim Amarrada na Testa com Nó Esvoaçante
  r(C.redBase, 2, 1, 6, 2);
  r(C.redHighlight, 3, 1, 4, 1);
  r(C.deepBlood, 0, 2, 2, 2); // Ponta do nó da bandana esvoaçando para trás

  // 2. Orelhas Pontudas Inclinadas Aerodinâmicas
  r(C.gobShadow, 0, 3, 2, 2); r(C.gobLight, 1, 3, 1, 1);
  r(C.gobShadow, 8, 3, 2, 2); r(C.gobLight, 8, 3, 1, 1);

  // 3. Cabeça e Rosto Esverdeado Ágil
  r(C.gobShadow, 2, 3, 6, 3);
  r(C.gobBase, 3, 3, 4, 3);

  // 4. Olhos Amarelos Rápidos e Nariz Fino
  r(C.yellow, 3, 4, 1, 1); r(C.eye, 3, 4, 1, 1);
  r(C.yellow, 6, 4, 1, 1); r(C.eye, 6, 4, 1, 1);
  r(C.gobDeep, 7, 5, 2, 1);

  // 5. Colete de Couro Leve
  r(C.leatherDark, 2, 6, 6, 3);
  r(C.leatherBase, 3, 6, 4, 2);

  // 6. Adagas Duplas Ágeis com Gume Polido
  r(C.steelLight, 9, 3, 1, 4); r(C.white, 9, 3, 1, 1); // Adaga frontal
  r(C.steelLight, 0, 5, 1, 3); r(C.white, 0, 5, 1, 1); // Adaga traseira

  // 7. Pernas Pequenas com Passada Veloz
  const leg = (x, up) => {
    r(C.gobShadow, x, 9, 2, up ? 1 : 2);
    r(C.outline, x, up ? 10 : 11, 2, 1);
  };
  leg(3, f === 0); leg(6, f === 1);
}

function drawWarrior(r, f) {
  // 1. Capa Carmesim Rasgada Esvoaçante com Dobras de Sombra
  r(C.deepBlood, 2, 8, 3, 8);
  r(C.redBase, 3, 8, 2, 7);
  r(C.redHighlight, 3, 9, 1, 5);

  // 2. Chifres de Osso Pontiagudos Curvados para Frente
  r(C.boneDark, 2, 1, 2, 4); r(C.bone, 3, 1, 1, 3); r(C.bone, 4, 3, 1, 1);
  r(C.boneDark, 14, 1, 2, 4); r(C.bone, 14, 1, 1, 3); r(C.bone, 13, 3, 1, 1);

  // 3. Elmo Pesado de Ferro Negro com Viseira Oculta
  r(C.ironDeep, 5, 2, 8, 6);
  r(C.ironBase, 6, 2, 6, 5);
  r(C.ironHighlight, 6, 2, 5, 1);

  // 4. Olhos Vermelhos Sinistros Incandescentes
  r(C.outline, 6, 5, 6, 1);
  r(C.rubyLight, 7, 5, 2, 1); r(C.eye, 8, 5, 1, 1);
  r(C.rubyLight, 10, 5, 2, 1); r(C.eye, 10, 5, 1, 1);

  // 5. Armadura de Placas Pesadas e Ombreiras Pontiagudas Chanfradas
  r(C.ironDeep, 3, 8, 4, 3); r(C.ironHighlight, 4, 8, 2, 1);
  r(C.ironDeep, 11, 8, 4, 3); r(C.ironHighlight, 12, 8, 2, 1);
  r(C.ironBase, 5, 8, 8, 6);
  r(C.redBase, 8, 10, 2, 2); r(C.rubyGlow, 8, 10, 1, 1);
  r(C.ironDeep, 5, 13, 8, 1); r(C.goldBase, 8, 13, 2, 1);

  // 6. Espada Larga de Ferro (Claymore) com Runa na Lâmina
  r(C.steelHighlight, 15, 1, 1, 11);
  r(C.steelBase, 16, 2, 1, 10);
  r(C.rubyLight, 15, 6, 1, 2);
  r(C.goldBase, 14, 11, 4, 1);
  r(C.leatherDark, 15, 12, 1, 2);
  r(C.goldHighlight, 15, 14, 1, 1);
  r(C.ironDeep, 13, 10, 2, 2); // manopla

  // 7. Pernas Blindadas de Ferro com Passos Pesados
  const leg = (x, up) => {
    r(C.ironDeep, x, 14, 3, up ? 1 : 2);
    r(C.ironBase, x, 14, 2, up ? 1 : 2);
  };
  leg(6, f === 0); leg(10, f === 1);
}

function drawElf(r, f) {
  // 1. Capa Élfica Esvoaçante em Verde-Musgo com Sombra
  r(C.elfCloakDark, 2, 5, 3, 8);
  r(C.elfCloak, 3, 6, 2, 6);
  r(C.elfCloakLight, 3, 7, 1, 4);

  // 2. Cabelos Dourados Esvoaçantes Bem Definidos
  r(C.elfHairShadow, 4, 1, 6, 4);
  r(C.elfHair, 5, 1, 5, 3);
  r(C.elfHairLight, 6, 1, 3, 1);

  // 3. Rosto Delicado com Orelhas Pontudas Longas e Olhar Focado
  r(C.skinShadow, 6, 3, 4, 3);
  r(C.skinBase, 7, 3, 3, 3);
  r(C.skinLight, 7, 3, 2, 1);
  r(C.skinBase, 4, 3, 2, 2); r(C.skinLight, 3, 3, 1, 1); // orelha pontuda
  r(C.outline, 8, 4, 1, 1); r(C.leafLight, 9, 4, 1, 1);

  // 4. Túnica Élfica Esmeralda com Cinto de Ouro Nobre
  r(C.elfTunic, 5, 6, 5, 5);
  r(C.elfTunicLight, 6, 6, 3, 3);
  r(C.goldBase, 5, 9, 5, 1);
  r(C.goldHighlight, 7, 9, 1, 1);

  // 5. Braço e Arco Élfico Curvo de Alta Precisão com Corda Brilhante
  r(C.skinBase, 10, 7, 2, 1);
  r(C.woodHighlight, 12, 2, 1, 1);
  r(C.woodBase, 13, 3, 1, 7);
  r(C.woodHighlight, 12, 10, 1, 1);
  r(C.goldBase, 13, 6, 1, 2);
  r(C.manaLight, 12, 3, 1, 7); // corda celestial

  // 6. Botas Élficas de Camurça
  const leg = (x, up) => {
    r(C.elfCloakDark, x, 11, 2, up ? 2 : 3);
    r(C.boot, x, up ? 13 : 14, 2, 1);
  };
  leg(5, f === 0); leg(8, f === 1);
}

// Inimigo 5: Mago Sombrio Arcano (32x32 — Sobretudo longo estilizado, gola alta, caimento em A e cajado)
function drawDarkMage(r, f) {
  const sway = f === 0 ? 0 : 1;

  // 1. Capuz Arcano Pontiagudo com Gola Alta Estilizada
  r(C.voidDark, 4, 0, 6, 6);
  r(C.arcanaDeep, 5, 0, 4, 5);
  r(C.arcanaBase, 5, 1, 3, 2);
  // Interior abissal do capuz com sombras profundas e olhos espectrais ciano
  r(C.outline, 5, 3, 4, 3);
  r(C.manaLight, 6, 4, 1, 1); r(C.manaLight, 8, 4, 1, 1);
  r.shine(6, 4, 0, 0, C.white); r.shine(8, 4, 0, 0, C.white);

  // Gola alta levantada do sobretudo (estilo aristocrata arcano / trench coat)
  r(C.arcanaLight, 3, 4, 2, 3);
  r(C.arcanaBase, 4, 5, 1, 2);

  // 2. Tronco do Sobretudo: corte justo com abotoadura dupla e cinto
  r(C.voidDark, 4, 6, 6, 3);
  r(C.arcanaDeep, 5, 6, 5, 3);
  r(C.arcanaBase, 5, 7, 4, 2);
  // Fechos / broches de ouro no peito do casaco
  r(C.goldHighlight, 6, 6, 1, 1); r(C.goldHighlight, 8, 6, 1, 1);
  r(C.goldHighlight, 6, 7, 1, 1); r(C.goldHighlight, 8, 7, 1, 1);

  // Cinto de couro escuro com fivela dourada na cintura
  r(C.leatherDark, 4, 8, 6, 1);
  r(C.goldBase, 6, 8, 2, 1);

  // 3. Abas Longas do Sobretudo (Caimento em "A", fenda central e drapeado nobre)
  // Aba esquerda do casaco
  r(C.voidDark, 3, 9, 3, 5 + (sway ? -1 : 0));
  r(C.arcanaDeep, 4, 9, 2, 5 + (sway ? -1 : 0));
  r(C.arcanaBase, 4, 10, 2, 3);
  // Barra debruada dourada da aba esquerda
  r(C.goldBase, 3, 13 + (sway ? -1 : 0), 3, 1);

  // Fenda central do sobretudo / forro escuro interno
  r(C.outline, 6, 9, 2, 5);

  // Aba direita do casaco (ondulação suave na marcha)
  r(C.voidDark, 8, 9, 3 + sway, 5);
  r(C.arcanaDeep, 8, 9, 2 + sway, 5);
  r(C.arcanaBase, 8, 10, 2, 3);
  // Barra debruada dourada da aba direita
  r(C.goldBase, 8, 13, 2 + sway, 1);

  // 4. Botas de bico fino aparecendo sob a fenda frontal
  r(C.boot, 5, 14, 2, 1);
  r(C.boot, 7, 14, 2, 1);

  // 5. Cajado Rúnico com Cristal Arcano Flutuante
  const staffY = f === 0 ? 0 : 1;
  r(C.woodDeep, 12, 3 + staffY, 1, 11);
  r(C.woodHighlight, 12, 5 + staffY, 1, 5);
  r(C.goldBase, 11, 2 + staffY, 3, 1);
  // Cristal arcano flutuante e pulsante
  r(C.arcanaLight, 11, 0 + staffY, 3, 2);
  r(C.manaLight, 12, 0 + staffY, 1, 2);
  r.shine(12, 0 + staffY, 0, 0, C.white);
}

// Barreira Arcana Frontal do Mago Sombrio (16x36 — Escudo curvado/arredondado em Pixel Art 16-bit)
function drawMageBarrier(r, f) {
  // Matriz lógica: 8x18 pixels (16x36 no canvas). Convexo voltado para a esquerda (frente aos ataques).
  // Frame 0 e 1: Pulso e ondulação de energia mística
  const pulseShift = f === 1 ? 1 : 0;

  // 1. Camada de Fundo / Vórtice Interno Violeta Profundo (lado voltado para o mago à direita)
  r(C.voidDark, 4, 1, 2, 2);
  r(C.voidDark, 3, 3, 2, 2);
  r(C.voidDark, 2, 5, 2, 2);
  r(C.voidDark, 2, 7, 3, 4);
  r(C.voidDark, 2, 11, 2, 2);
  r(C.voidDark, 3, 13, 2, 2);
  r(C.voidDark, 4, 15, 2, 2);

  // 2. Corpo do Arco Arcano (Ametista e Púrpura Real)
  r(C.arcanaDeep, 4, 1, 2, 2);
  r(C.arcanaDeep, 3, 3, 2, 2);
  r(C.arcanaDeep, 2, 5, 2, 3);
  r(C.arcanaDeep, 1, 8, 3, 2);
  r(C.arcanaDeep, 2, 10, 2, 3);
  r(C.arcanaDeep, 3, 13, 2, 2);
  r(C.arcanaDeep, 4, 15, 2, 2);

  r(C.arcanaBase, 3, 2, 2, 2);
  r(C.arcanaBase, 2, 4, 2, 3);
  r(C.arcanaBase, 1, 7, 2, 4);
  r(C.arcanaBase, 2, 11, 2, 3);
  r(C.arcanaBase, 3, 14, 2, 2);

  r(C.arcanaLight, 4, 0, 2, 2);
  r(C.arcanaLight, 3, 2, 2, 2);
  r(C.arcanaLight, 2, 4, 2, 3);
  r(C.arcanaLight, 1, 7, 2, 4);
  r(C.arcanaLight, 2, 11, 2, 3);
  r(C.arcanaLight, 3, 14, 2, 2);
  r(C.arcanaLight, 4, 16, 2, 2);

  // 3. Borda Convexo-Luminosa de Impacto (face voltada para os projéteis à esquerda)
  // Pontas afiladas do crescente
  r(C.manaLight, 5, 0, 1, 1);
  r(C.manaLight, 4, 1, 1, 1);
  r(C.manaLight, 3, 2, 1, 2);
  r(C.manaLight, 2, 4, 1, 2);
  r(C.manaLight, 1, 6, 1, 2);
  r(C.manaLight, 0, 8, 1, 2); // ápice da curva
  r(C.manaLight, 1, 10, 1, 2);
  r(C.manaLight, 2, 12, 1, 2);
  r(C.manaLight, 3, 14, 1, 2);
  r(C.manaLight, 4, 16, 1, 1);
  r(C.manaLight, 5, 17, 1, 1);

  // Filamento de Luz Pura Branca (Reflexo e Cristalinidade na borda externa)
  r(C.white, 3, 2, 1, 1);
  r(C.white, 2, 4, 1, 1);
  r(C.white, 1, 7, 1, 1);
  r(C.white, 0, 8, 1, 2);
  r(C.white, 1, 10, 1, 1);
  r(C.white, 2, 13, 1, 1);
  r(C.white, 3, 15, 1, 1);

  // 4. Glifo Rúnico / Núcleo Central de Polarização (em x: 1..3, y: 8..9)
  if (pulseShift === 0) {
    r(C.manaLight, 1, 8, 2, 2);
    r(C.white, 2, 8, 1, 2);
    r.shine(2, 8, 0, 0, C.white);
    r.shine(5, 0, 0, 0, C.manaLight);
    r.shine(5, 17, 0, 0, C.manaLight);
  } else {
    r(C.arcanaLight, 1, 7, 3, 4);
    r(C.manaLight, 1, 8, 2, 2);
    r(C.white, 1, 8, 1, 2);
    r.shine(1, 8, 0, 0, C.white);
    r.shine(3, 3, 0, 0, C.white);
    r.shine(3, 14, 0, 0, C.white);
  }
}


function drawBossGolem(r, f) {
  // Grade 44x44 (margem de segurança 1..42 para nunca cortar o outline 4-pass)
  const armBob = f === 0 ? 0 : -2;
  const pulseCol = f === 0 ? C.rubyLight : C.fireLight;
  const pulseGlow = f === 0 ? C.rubyGlow : C.white;

  // 1. Placas Dorsais e Trapézio de Pedra Maciça
  r(C.ironDark, 4, 8, 36, 12);
  r(C.ironBase, 6, 7, 32, 10);
  r(C.steelShadow, 8, 6, 28, 8);
  r(C.steelBase, 10, 6, 24, 3);
  r.dither(C.ironBase, C.steelShadow, 9, 8, 26, 4);

  // 2. Ombreiras Tectônicas Nobres (Esquerda x=2..9, Direita x=34..41)
  r(C.ironDeep, 2, 6, 6, 8);
  r(C.ironBase, 3, 6, 4, 6);
  r(C.steelShadow, 3, 6, 3, 4);
  r(C.steelLight, 4, 6, 1, 3);
  r.shine(4, 6, 0, 0, C.white);

  r(C.ironDeep, 36, 6, 6, 8);
  r(C.ironBase, 37, 6, 4, 6);
  r(C.steelShadow, 38, 6, 3, 4);
  r(C.steelBase, 39, 6, 1, 3);
  r.shine(39, 6, 0, 0, C.white);

  // Runas Místicas esculpidas nos Ombros
  r(C.rubyDeep, 4, 9, 3, 3);
  r(pulseCol, 4, 10, 2, 1);
  r(pulseGlow, 5, 10, 1, 1);

  r(C.rubyDeep, 37, 9, 3, 3);
  r(pulseCol, 38, 10, 2, 1);
  r(pulseGlow, 38, 10, 1, 1);

  // 3. Cabeça de Monólito Ancestral e Chifres de Granito (x=13..30, y=2..15)
  r(C.ironDeep, 14, 3, 16, 13);
  r(C.ironBase, 15, 4, 14, 11);
  r(C.steelShadow, 16, 3, 12, 4);
  r(C.steelBase, 17, 3, 10, 2);
  r(C.steelLight, 18, 3, 8, 1);
  r.shine(18, 3, 0, 0, C.white);

  // Fissuras ancestrais no crânio
  r(C.outline, 22, 3, 1, 3);
  r(C.outline, 23, 5, 1, 2);
  r(C.outline, 18, 4, 1, 2);

  // Sobrancelha pesada de rocha projetando sombra profunda sobre os olhos
  r(C.ironDeep, 14, 6, 16, 2);
  r(C.outline, 15, 7, 14, 1);

  // 4. Olhos Incandescentes com Núcleo de Calor e Reflexos Especulares
  // Olho Esquerdo (x=15..19, y=8..9)
  r(C.rubyDeep, 15, 8, 5, 3);
  r(C.redBase, 16, 8, 4, 2);
  r(C.rubyLight, 16, 8, 3, 2);
  r(C.rubyGlow, 17, 8, 2, 1);
  r(pulseGlow, 17, 8, 1, 1);
  r.shine(17, 8, 0, 0, C.white);

  // Olho Direito (x=24..28, y=8..9)
  r(C.rubyDeep, 24, 8, 5, 3);
  r(C.redBase, 24, 8, 4, 2);
  r(C.rubyLight, 25, 8, 3, 2);
  r(C.rubyGlow, 25, 8, 2, 1);
  r(pulseGlow, 26, 8, 1, 1);
  r.shine(26, 8, 0, 0, C.white);

  // Frestas de calor irradiando das bochechas
  r(C.rubyDeep, 14, 10, 2, 1);
  r(C.rubyDeep, 28, 10, 2, 1);
  r(C.ironDark, 21, 8, 2, 3); // Ponte nasal de pedra escura

  // Mandíbula Ciclópica com Dentes de Pedra Bruta
  r(C.outline, 16, 12, 12, 3);
  r(C.rubyDeep, 18, 13, 8, 1); // Fresta interna avermelhada na boca
  r(C.steelBase, 17, 12, 1, 1);
  r(C.steelBase, 20, 12, 1, 1);
  r(C.steelBase, 23, 12, 1, 1);
  r(C.steelBase, 26, 12, 1, 1);
  r(C.ironDark, 15, 14, 14, 2);
  r(C.steelShadow, 17, 15, 10, 1);

  // 5. Musgo Ancestral Naturalmente Distribuído no Topo e Ombros
  // Musgo no crânio (dentro da margem y >= 1)
  r(C.leafDeep, 16, 1, 12, 3);
  r(C.leafDark, 17, 1, 10, 2);
  r(C.leafLight, 18, 1, 6, 1);
  r(C.mossGold, 20, 2, 3, 1);

  // Musgo no ombro esquerdo
  r(C.leafDeep, 4, 5, 7, 4);
  r(C.leafDark, 5, 4, 5, 3);
  r(C.leafLight, 5, 3, 4, 2);
  r(C.mossGold, 6, 4, 2, 1);
  r(C.leafDeep, 3, 9, 2, 3);

  // Musgo no ombro direito
  r(C.leafDeep, 33, 5, 7, 4);
  r(C.leafDark, 34, 4, 5, 3);
  r(C.leafLight, 35, 3, 4, 2);
  r(C.mossGold, 36, 4, 2, 1);
  r(C.leafDeep, 39, 9, 2, 3);

  // 6. Torso de Rocha Tectônica e Núcleo Rúnico Incandescente
  r(C.ironDark, 9, 16, 26, 13);
  r(C.ironBase, 11, 17, 22, 11);
  r.dither(C.ironBase, C.steelShadow, 12, 17, 20, 5);
  r(C.steelBase, 13, 17, 6, 2);
  r(C.steelBase, 25, 17, 6, 2);

  // Fraturas e canais de magma nas placas peitorais
  r(C.outline, 21, 16, 2, 12);
  r(C.outline, 11, 22, 7, 1);
  r(C.outline, 26, 22, 7, 1);

  // Núcleo Rúnico Magmático Central (x=18..25, y=19..26)
  r(C.rubyDeep, 18, 19, 8, 8);
  r(C.redBase, 19, 20, 6, 6);
  r(C.rubyLight, 20, 20, 4, 6);
  r(C.rubyLight, 19, 21, 6, 4);
  r(pulseCol, 20, 21, 4, 4);
  r(pulseGlow, 21, 22, 2, 2);
  r.shine(21, 22, 0, 0, C.white);

  // Ramificações rúnicas incandescentes irradiando para os lados do peito
  r(C.rubyDeep, 16, 19, 2, 1); r(pulseCol, 14, 18, 3, 1);
  r(C.rubyDeep, 26, 19, 2, 1); r(pulseCol, 27, 18, 3, 1);
  r(C.rubyDeep, 16, 25, 3, 1); r(pulseCol, 14, 26, 2, 1);
  r(C.rubyDeep, 25, 25, 3, 1); r(pulseCol, 28, 26, 2, 1);

  // Cinturão de Rochas do Baixo Ventre
  r(C.ironDark, 12, 28, 20, 5);
  r(C.ironBase, 14, 29, 16, 3);
  r(C.steelShadow, 16, 29, 4, 2);
  r(C.steelShadow, 24, 29, 4, 2);
  r(C.outline, 21, 28, 2, 4);

  // 7. Braços e Punhos de Granito Ciclópicos (bobbing sincronizado com a passada)
  // Braço e Punho Esquerdo (margem x >= 1)
  r(C.ironDark, 2, 16 + armBob, 9, 12);
  r(C.ironBase, 3, 17 + armBob, 7, 10);
  r(C.steelShadow, 4, 18 + armBob, 5, 8);
  r(C.steelBase, 4, 18 + armBob, 3, 3);
  r(C.leafDeep, 2, 20 + armBob, 3, 3);
  r(C.leafDark, 2, 21 + armBob, 2, 2);

  // Veio de mana no antebraço esquerdo
  r(C.rubyDeep, 5, 21 + armBob, 2, 5);
  r(pulseCol, 5, 22 + armBob, 1, 3);

  // Punho maciço esquerdo (x=2..11, y=28..37 + armBob)
  r(C.ironDark, 2, 28 + armBob, 10, 10);
  r(C.ironBase, 2, 29 + armBob, 9, 8);
  r(C.steelShadow, 3, 29 + armBob, 7, 5);
  r(C.steelLight, 3, 30 + armBob, 3, 2);
  r(C.outline, 2, 34 + armBob, 9, 1);
  // Falanges de rocha esculpidas
  r(C.steelBase, 2, 36 + armBob, 2, 2);
  r(C.steelBase, 5, 36 + armBob, 2, 2);
  r(C.steelBase, 8, 36 + armBob, 2, 2);
  r.shine(3, 36 + armBob, 0, 0, C.white);

  // Braço e Punho Direito (margem x + w <= 42)
  r(C.ironDark, 33, 16 - armBob, 9, 12);
  r(C.ironBase, 34, 17 - armBob, 7, 10);
  r(C.steelShadow, 35, 18 - armBob, 5, 8);
  r(C.leafDeep, 39, 20 - armBob, 3, 3);
  r(C.leafDark, 39, 21 - armBob, 2, 2);

  // Veio de mana no antebraço direito
  r(C.rubyDeep, 37, 21 - armBob, 2, 5);
  r(pulseCol, 37, 22 - armBob, 1, 3);

  // Punho maciço direito (x=32..41, y=28..37 - armBob)
  r(C.ironDark, 32, 28 - armBob, 10, 10);
  r(C.ironBase, 33, 29 - armBob, 9, 8);
  r(C.steelShadow, 34, 29 - armBob, 7, 5);
  r(C.steelLight, 37, 30 - armBob, 3, 2);
  r(C.outline, 33, 34 - armBob, 9, 1);
  // Falanges de rocha esculpidas
  r(C.steelBase, 34, 36 - armBob, 2, 2);
  r(C.steelBase, 37, 36 - armBob, 2, 2);
  r(C.steelBase, 40, 36 - armBob, 2, 2);
  r.shine(40, 36 - armBob, 0, 0, C.white);

  // 8. Pernas de Pilar e Pés Achatados de Sustentação
  const legStepL = f === 0 ? 0 : 1;
  const legStepR = f === 1 ? 0 : 1;

  r(C.ironDark, 13, 32, 7, 7 + legStepL);
  r(C.ironBase, 14, 33, 5, 5 + legStepL);
  r(C.steelShadow, 15, 34, 3, 4 + legStepL);
  r(C.ironDark, 11, 39 + legStepL, 9, 2);
  r(C.steelShadow, 12, 39 + legStepL, 7, 1);
  r(C.steelBase, 13, 40 + legStepL, 5, 1);

  r(C.ironDark, 24, 32, 7, 7 + legStepR);
  r(C.ironBase, 25, 33, 5, 5 + legStepR);
  r(C.steelShadow, 26, 34, 3, 4 + legStepR);
  r(C.ironDark, 24, 39 + legStepR, 9, 2);
  r(C.steelShadow, 25, 39 + legStepR, 7, 1);
  r(C.steelBase, 26, 40 + legStepR, 5, 1);
}

// Mini Golem de Pedra ("Filhotinhos" do Boss — 28x28, com runas incandescentes, musgo e margem limpa)
// Frames 0 e 1: Ativo/Perseguindo (olhos vermelhos incandescentes, passadas)
// Frame 2: Inconsciente/Pedra (olhos apagados/fechados, imóvel como rocha fria)
function drawMiniGolem(r, f) {
  const isDormant = (f === 2);

  // 1. Tufo de Musgo Ancestral no Topo da Cabeça
  r(C.leafDeep, 5, 1, 4, 2);
  r(C.leafDark, 6, 1, 3, 1);
  r(C.leafLight, 6, 2, 1, 1);
  r(C.mossGold, 7, 1, 1, 1);

  // 2. Cabeça e Corpo de Granito Rachado
  r(C.ironDeep, 3, 2, 8, 2);
  r(C.ironDark, 2, 4, 10, 6);
  r(C.ironBase, 3, 3, 8, 6);
  r(C.steelShadow, 4, 3, 6, 3);
  r(C.steelBase, 5, 3, 4, 1);

  if (isDormant) {
    // 3. Olhos apagados / fechados como fendas de rocha escura
    r(C.ironDeep, 3, 4, 3, 2);
    r(C.ironDeep, 8, 4, 3, 2);
    r(C.outline, 4, 5, 2, 1);
    r(C.outline, 8, 5, 2, 1);

    // Fissura inativa/fria de pedra no peito
    r(C.outline, 5, 7, 4, 1);
    r(C.ironDeep, 6, 8, 2, 1);

    // 4. Braços e Punhos de Pedra repousando imóveis
    r(C.ironDark, 1, 6, 2, 3);
    r(C.steelShadow, 1, 6, 1, 2);
    r(C.ironDark, 11, 6, 2, 3);
    r(C.steelShadow, 11, 6, 1, 2);

    // 5. Pernas de Pedra encolhidas
    r(C.ironDark, 3, 9, 3, 1);
    r(C.steelShadow, 3, 10, 3, 1);
    r(C.ironDark, 8, 9, 3, 1);
    r(C.steelShadow, 8, 10, 3, 1);
  } else {
    // 3. Olhos Vermelhos Incandescentes (Mini Núcleo Magmático)
    r(C.rubyDeep, 3, 4, 3, 2);
    r(C.rubyDeep, 8, 4, 3, 2);
    r(C.redBase, 4, 5, 2, 2);
    r(f === 0 ? C.rubyLight : C.rubyGlow, 4, 5, 1, 1);
    r.shine(4, 5, 0, 0, C.white);

    r(C.redBase, 8, 5, 2, 2);
    r(f === 0 ? C.rubyLight : C.rubyGlow, 9, 5, 1, 1);
    r.shine(9, 5, 0, 0, C.white);

    // Fissura de Magma no Peito
    r(C.outline, 5, 7, 4, 1);
    r(C.rubyDeep, 6, 8, 2, 1);
    r(f === 0 ? C.rubyLight : C.fireLight, 6, 7, 1, 1);

    // 4. Braços e Punhos de Pedra com Balanço de Corrida
    const armOff = f === 0 ? 0 : 1;
    r(C.ironDark, 1, 6 + armOff, 2, 3);
    r(C.steelShadow, 1, 6 + armOff, 1, 2);
    r(C.ironDark, 11, 7 - armOff, 2, 3);
    r(C.steelShadow, 11, 7 - armOff, 1, 2);

    // 5. Pernas de Pedra Curtas com Passos
    const legL = f === 0 ? 1 : 2;
    const legR = f === 1 ? 1 : 2;
    r(C.ironDark, 3, 9, 3, legL);
    r(C.steelShadow, 3, 9 + legL, 3, 1);
    r(C.ironDark, 8, 9, 3, legR);
    r(C.steelShadow, 8, 9 + legR, 3, 1);
  }
}


function drawVillageNpc(r, f) {
  // Gorro camponês de lã e rosto
  r(C.leatherBase, 4, 1, 4, 2);
  r(C.skinBase, 4, 3, 4, 3);
  r(C.skinShadow, 4, 5, 4, 1);
  r(C.outline, 7, 4, 1, 1);

  // Túnica e avental
  r(C.elfTunic, 3, 6, 6, 5);
  r(C.bone, 5, 7, 3, 4);
  r(C.leatherDark, 3, 9, 6, 1);

  // Braço esquerdo na cintura
  r(C.skinBase, 2, 6, 1, 3);

  // Braço direito acenando com lenço branco para o herói
  if (f === 0) {
    r(C.elfTunic, 9, 5, 1, 2);
    r(C.skinBase, 10, 3, 2, 2);
    r(C.white, 11, 2, 3, 3);
    r.shine(12, 2, 0, 0, C.goldHighlight);
  } else {
    r(C.elfTunic, 9, 4, 1, 2);
    r(C.skinBase, 9, 1, 2, 2);
    r(C.white, 9, 0, 3, 3);
    r.shine(10, 0, 0, 0, C.goldHighlight);
  }

  // Botas de couro
  r(C.boot, 4, 11, 2, 2);
  r(C.boot, 7, 11, 2, 2);
}


// =============================================================================
// MESTRE FERREIRO ANVILGAR (48x52 — 4 FRAMES COM ANIMAÇÃO DE GOLPE DE FORJA & FAÍSCAS)
// INSPIRAÇÃO: CONCEPT 4 (ANÃO FORJANDO NA BIGORNA COM MARTELO, TENAZ E FERRO EM BRASA)

// =============================================================================
// MESTRE FERREIRO ANVILGAR (48x52 — 4 FRAMES)
// DESIGN: ANÃO FORTE, CARECA (DOME REDONDO E DEFINIDO) COM BARBA RUIVA TEXTURIZADA
// POSTURA CARISMÁTICA ATRÁS DO BALCÃO COM MARTELO DE FORJA E AVENTAL DE COURO

// =============================================================================
// MESTRE FERREIRO ANVILGAR (48x52 — 4 FRAMES)
// GRID ESTRITO: 24 UNIDADES DE LARGURA (x: 0..23) E 26 UNIDADES DE ALTURA (y: 0..25)
// CADA UNIDADE É MULTIPLICADA POR 2 EM drawPixels (24 * 2 = 48px, 26 * 2 = 52px).
// ORDEM DE RENDERIZAÇÃO: OMBROS E AVENTAL PRIMEIRO, BRAÇOS, CABEÇA E POR FIM
// O BARBÃO RUIVO RENDERIZADO POR CIMA DO AVENTAL (EM PROPORÇÃO QUE MOSTRA AMBOS!)
// =============================================================================
function drawBlacksmithMaster(r, f) {
  const bob = (f === 1 || f === 2) ? 1 : 0;
  const glint = (f === 2) ? 1 : 0;

  // ===========================================================================
  // 1. OMBROS, TÚNICA E AVENTAL DE COURO DE FORJA (CAMADA DE BASE — ATRÁS DA BARBA)
  // ===========================================================================
  // Mangas e ombros da túnica de trabalho cinza-escura
  r(0x282b32, 1, 10 + bob, 4, 5);   // ombro esquerdo x: 1..4, y: 10..14
  r(0x3e424c, 2, 10 + bob, 3, 4);
  r(0x525864, 2, 10 + bob, 2, 3);
  r(0x282b32, 19, 10 + bob, 4, 5);  // ombro direito x: 19..22, y: 10..14
  r(0x3e424c, 19, 10 + bob, 3, 4);
  r(0x525864, 20, 10 + bob, 2, 3);

  // O Avental de Couro Grosso de Ferreiro (x: 4..19, y: 10..24 — VISÍVEL E TEXTURIZADO)
  r(0x2b1509, 4, 10 + bob, 16, 14); // base profunda de couro curtido
  r(0x482410, 5, 10 + bob, 14, 13); // corpo do avental
  r(0x613217, 5, 11 + bob, 14, 11); // luz quente no couro envelhecido

  // Alças largas de couro com pesponto e fivelas de latão forjado (x: 4..6 e x: 17..19)
  r(0x1e0e06, 4, 10 + bob, 2, 13);  // alça esquerda
  r(0x381b0c, 5, 10 + bob, 1, 13);
  r(0x1e0e06, 18, 10 + bob, 2, 13); // alça direita
  r(0x381b0c, 18, 10 + bob, 1, 13);
  // Fivelas de latão/bronze nas alças do avental (visíveis na altura dos ombros)
  r(0x8a6e30, 4, 12 + bob, 2, 2);   // fivela esquerda
  r(0xc5a059, 4, 12 + bob, 1, 1);
  r(0x8a6e30, 18, 12 + bob, 2, 2);  // fivela direita
  r(0xc5a059, 18, 12 + bob, 1, 1);

  // Cinto de ferramentas e grande fivela central de ferro (y: 21..22 — visível sob a ponta da barba)
  r(0x180b04, 4, 21 + bob, 16, 2);  // cinta de couro escura
  r(0x5a606e, 10, 21 + bob, 4, 2);  // fivela de ferro forjado
  r(0x8a909c, 11, 21 + bob, 2, 1);  // brilho do metal na fivela

  // Costura inferior do avental (y: 23..24)
  r(0x381b0c, 5, 23 + bob, 14, 1);
  r(0x1e0e06, 5, 24 + bob, 14, 1);

  // ===========================================================================
  // 2. BRAÇOS MUSCULOSOS APOIADOS NO BALCÃO COM MUNHEQUEIRAS
  // ===========================================================================
  // Braço esquerdo musculoso (x: 1..3, y: 14..21)
  r(0x8c5731, 1, 14 + bob, 3, 4);   // antebraço
  r(0xc68b59, 1, 15 + bob, 2, 3);
  r(0xf1c27d, 2, 15 + bob, 1, 2);   // reflexo muscular
  r(0x2b180d, 1, 18 + bob, 3, 2);   // munhequeira de couro
  r(0xffca28, 2, 18 + bob, 1, 1);   // rebite de latão
  r(0xc68b59, 1, 20 + bob, 3, 2);   // punho forte apoiado no balcão
  r(0x8c5731, 1, 20 + bob, 1, 2);

  // Braço direito musculoso (x: 20..22, y: 14..21 — simétrico!)
  r(0x8c5731, 20, 14 + bob, 3, 4);  // antebraço
  r(0xc68b59, 21, 15 + bob, 2, 3);
  r(0xf1c27d, 21, 15 + bob, 1, 2);  // reflexo muscular
  r(0x2b180d, 20, 18 + bob, 3, 2);  // munhequeira de couro
  r(0xffca28, 21, 18 + bob, 1, 1);  // rebite de latão
  r(0xc68b59, 20, 20 + bob, 3, 2);  // punho forte apoiado no balcão
  r(0x8c5731, 22, 20 + bob, 1, 2);

  // ===========================================================================
  // 3. CABEÇA CARECA ROBUSTA (DOME REDONDO, ROSTO SÓLIDO SEM FALHAS)
  // ===========================================================================
  // Topo e curvatura da calvície
  r(0x663318, 9, 2 + bob, 6, 1);    // x: 9..14, y: 2 (ápice do crânio)
  r(0x7a4522, 8, 3 + bob, 8, 1);    // x: 8..15, y: 3
  r(0x8c5731, 7, 4 + bob, 10, 1);   // x: 7..16, y: 4 (têmporas)

  // Preenchimento contínuo 100% sólido de pele facial
  r(0xc68b59, 7, 4 + bob, 10, 4);   // x: 7..16, y: 4..7 (pele sólida da testa e bochechas)

  // Volume luminoso e brilho especular na careca
  r(0xf1c27d, 9, 3 + bob, 6, 2);    // luz quente da fornalha
  r(0xffebd2, 11, 3 + bob, 2, 1);   // brilho especular no centro

  // Orelhas de anão nas laterais (y: 5..7)
  r(0x8c5731, 6, 5 + bob, 1, 3);    // orelha esquerda
  r(0xc68b59, 6, 6 + bob, 1, 1);
  r(0x8c5731, 17, 5 + bob, 1, 3);   // orelha direita
  r(0xc68b59, 17, 6 + bob, 1, 1);

  // Sobrancelhas ruivas grossas de anão ferreiro (y: 5)
  r(0x6a1a08, 8, 5 + bob, 3, 1);
  r(0xa83810, 8, 5 + bob, 2, 1);
  r(0xc44516, 9, 5 + bob, 1, 1);
  r(0x6a1a08, 13, 5 + bob, 3, 1);
  r(0xa83810, 14, 5 + bob, 2, 1);
  r(0xc44516, 14, 5 + bob, 1, 1);

  // Olhos expressivos e focados com brilho branco (y: 6)
  r(0x1a1410, 8, 6 + bob, 2, 1);
  r(0xffffff, 9, 6 + bob, 1, 1);
  r(0x1a1410, 14, 6 + bob, 2, 1);
  r(0xffffff, 14, 6 + bob, 1, 1);

  // Nariz largo de anão e bochechas coradas pela forja (y: 6..7)
  r(0xdf845d, 7, 7 + bob, 3, 1);    // bochecha esquerda corada (x: 7..9)
  r(0xdf845d, 14, 7 + bob, 3, 1);   // bochecha direita corada (x: 14..16)
  r(0x8c5731, 10, 7 + bob, 1, 1);
  r(0x8c5731, 13, 7 + bob, 1, 1);
  r(0xc68b59, 11, 6 + bob, 2, 2);   // nariz largo (x: 11..12, y: 6..7)
  r(0xf1c27d, 11, 6 + bob, 1, 1);

  // Costeletas ruivas nascendo junto às têmporas (y: 6..7)
  r(0x6a1a08, 6, 6 + bob, 1, 2);
  r(0xa83810, 6, 7 + bob, 1, 1);
  r(0x6a1a08, 17, 6 + bob, 1, 2);
  r(0xa83810, 17, 7 + bob, 1, 1);

  // ===========================================================================
  // 4. O "BARBÃO" RUIVO DE ANÃO (SOBREPOSTO AO AVENTAL — RENDERIZADO POR CIMA!)
  // Proporção harmoniosa: imponente e volumosa, permitindo ver o avental nas laterais e embaixo!
  // ===========================================================================
  // Bigode espesso e curvado sobre a boca (x: 6..17, y: 7..9)
  r(0x420c02, 7, 7 + bob, 10, 1);   // sombra sob o nariz
  r(0x6a1a08, 6, 8 + bob, 12, 2);   // base escura do bigode
  r(0x9e320c, 6, 8 + bob, 12, 1);
  r(0xc24414, 7, 8 + bob, 10, 1);
  r(0xe0561c, 9, 8 + bob, 6, 1);    // mecha central iluminada
  r(0x6a1a08, 5, 9 + bob, 2, 1);    // ponta esquerda curva do bigode
  r(0x9e320c, 5, 9 + bob, 1, 1);
  r(0x6a1a08, 17, 9 + bob, 2, 1);   // ponta direita curva do bigode
  r(0x9e320c, 18, 9 + bob, 1, 1);

  // Queixo e início do barbão (y: 9..10, x: 6..17)
  r(0x420c02, 6, 9 + bob, 12, 1);
  r(0x6a1a08, 7, 9 + bob, 10, 1);
  r(0x420c02, 5, 10 + bob, 14, 1);
  r(0x6a1a08, 6, 10 + bob, 12, 1);
  r(0x9e320c, 7, 10 + bob, 10, 1);
  r(0xc24414, 8, 10 + bob, 8, 1);

  // Corpo do barbão no peito sobre o avental (y: 11..14, x: 6..17 — largura 12)
  // Deixa as bordas do avental (x: 4..5 e x: 18..19 com alças e fivelas) 100% visíveis!
  r(0x420c02, 6, 11 + bob, 12, 1);
  r(0x6a1a08, 6, 11 + bob, 12, 1);
  r(0x9e320c, 7, 11 + bob, 10, 1);
  r(0xc24414, 8, 11 + bob, 8, 1);
  r(0xe0561c, 9, 11 + bob, 6, 1);   // brilho vivo do fogo

  r(0x420c02, 6, 12 + bob, 12, 1);
  r(0x6a1a08, 6, 12 + bob, 12, 1);
  r(0x9e320c, 7, 12 + bob, 10, 1);
  r(0xc24414, 8, 12 + bob, 8, 1);
  r(0xe0561c, 9, 12 + bob, 6, 1);

  r(0x420c02, 6, 13 + bob, 12, 2);
  r(0x6a1a08, 7, 13 + bob, 10, 2);
  r(0x9e320c, 7, 13 + bob, 10, 2);
  r(0xc24414, 8, 13 + bob, 8, 2);
  r(0xe0561c, 10, 13 + bob, 4, 2);

  // Tranças laterais gêmeas descendo sobre o avental (y: 15..16, x: 7..16)
  r(0x420c02, 7, 15 + bob, 10, 2);
  r(0x6a1a08, 7, 15 + bob, 10, 2);
  r(0x9e320c, 8, 15 + bob, 8, 2);
  r(0xc24414, 9, 15 + bob, 6, 2);

  // Anéis dourados nas tranças laterais (y: 16)
  r(0x785600, 7, 16 + bob, 3, 1);
  r(0xffd700, 7, 16 + bob, 2, 1);
  r(0xffeb3b, 8, 16 + bob, 1, 1);
  r(0x785600, 14, 16 + bob, 3, 1);
  r(0xffd700, 15, 16 + bob, 2, 1);
  r(0xffeb3b, 15, 16 + bob, 1, 1);

  // Fechamento central da barba (y: 17..18, x: 8..15)
  r(0x420c02, 8, 17 + bob, 8, 2);
  r(0x6a1a08, 8, 17 + bob, 8, 2);
  r(0x9e320c, 9, 17 + bob, 6, 2);
  r(0xc24414, 10, 17 + bob, 4, 2);

  // GRANDE ANEL DE FORJA DOURADO (y: 18..19, x: 8..15)
  r(0x785600, 8, 18 + bob, 8, 2);
  r(0xffd700, 9, 18 + bob, 6, 2);
  r(glint ? 0xffffff : 0xffeb3b, 10, 18 + bob, 4, 1); // brilho no fecho
  r(0xd32f2f, 11, 19 + bob, 2, 1);  // rubi no centro do anel

  // Ponta majestosa do barbão fluindo abaixo do anel sobre o avental (y: 20..21, x: 9..14)
  r(0x420c02, 9, 20 + bob, 6, 1);
  r(0x6a1a08, 9, 20 + bob, 6, 1);
  r(0x9e320c, 10, 20 + bob, 4, 1);
  r(0xc24414, 11, 20 + bob, 2, 1);

  r(0x420c02, 10, 21 + bob, 4, 1);
  r(0x6a1a08, 11, 21 + bob, 2, 1); // ponta final da barba
}

// Mestre Mago Alquimista (48x52 — 4 frames com manto estelar, barba prateada, olhos arcanos e frasco iluminado)
function drawMageMaster(r, f) {
  const bob = (f === 1 || f === 2) ? 1 : 0;
  const glint = (f === 2) ? 1 : 0;

  // Chapéu pontudo místico violeta com curvatura suave no topo e fivela dourada
  r(0x311b92, 14, 0 + bob, 3, 2);
  r(0x4a148c, 12, 2 + bob, 4, 2);
  r(0x4a148c, 10, 4 + bob, 6, 2);
  r(0x311b92, 9, 6 + bob, 8, 2);
  r(0x4a148c, 8, 8 + bob, 10, 2);
  r(0x280e54, 7, 10 + bob, 12, 2);

  // Aba larga do chapéu com borda chanfrada
  r(0x1e0b3d, 4, 12 + bob, 18, 2);
  r(0x4a148c, 5, 12 + bob, 16, 1);

  // Faixa do chapéu em ouro com gema safira/arcana
  r(C.gold, 7, 11 + bob, 12, 1);
  r(glint ? 0xffffff : 0x00e5ff, 12, 11 + bob, 2, 1);

  // Rosto sábio com PELE ESCURA marcante (tons ricos de ébano e bronze profundo)
  r(0x3d2110, 8, 13 + bob, 10, 2); // sombra superior sob a aba
  r(0x5c3619, 9, 14 + bob, 8, 2);  // tez facial escura profunda
  r(0x7a4823, 10, 14 + bob, 6, 1); // relevo suave nas maçãs do rosto

  // Sobrancelhas espessas prateadas
  r(C.steelLight, 8, 13 + bob, 3, 1);
  r(C.steelLight, 15, 13 + bob, 3, 1);

  // Olhos arcanos brilhantes com brilho especular vivo
  r(C.cyan, 9, 14 + bob, 2, 1);
  r(C.cyan, 15, 14 + bob, 2, 1);
  r(C.white, 10, 14 + bob, 1, 1);
  r(C.white, 16, 14 + bob, 1, 1);

  // Longa e imponente barba prateada com anéis de ouro entrelaçados
  r(C.steelLight, 7, 16 + bob, 12, 4);
  r(C.white, 8, 17 + bob, 10, 5);
  r(C.steelLight, 9, 21 + bob, 8, 3);
  r(C.white, 10, 23 + bob, 6, 2);
  // Anéis dourados que prendem as tranças da barba
  r(C.gold, 10, 21 + bob, 2, 1);
  r(C.gold, 14, 21 + bob, 2, 1);

  // Manto estelar de veludo violeta e azul meia-noite
  r(0x311b92, 4, 16 + bob, 4, 9);
  r(0x311b92, 18, 16 + bob, 4, 9);
  r(0x4a148c, 5, 17 + bob, 3, 8);
  r(0x4a148c, 18, 17 + bob, 3, 8);
  r(C.gold, 7, 18 + bob, 1, 7);
  r(C.gold, 18, 18 + bob, 1, 7);

  // Detalhes astrais/estrelas douradas na túnica
  r(C.goldLight, 6, 20 + bob, 1, 1);
  r(0x00e5ff, 19, 21 + bob, 1, 1);

  // Mão esquerda com pele escura segurando ramo de ervas místicas douradas/verdes
  r(0x5c3619, 4, 21 + bob, 3, 3);
  r(0x7a4823, 5, 21 + bob, 1, 1);
  r(C.gold, 5, 22 + bob, 1, 1); // anel
  r(C.leaf, 2, 19 + bob, 3, 2);
  r(C.leafLight, 1, 18 + bob, 2, 2);
  r(C.gold, 3, 18 + bob, 1, 1);

  // Mão direita com pele escura erguendo frasco de ensaio com poção de mana/rubi
  const vBob = (f === 1 || f === 3) ? -1 : 0;
  r(0x5c3619, 19, 19 + vBob, 3, 3);
  r(0x7a4823, 20, 19 + vBob, 1, 1);
  r(0xffffff, 20, 15 + vBob, 4, 5); // vidro translúcido
  r(f % 2 === 0 ? 0xff1744 : 0x00e5ff, 21, 16 + vBob, 2, 4); // líquido rubi/mana ciano brilhante
  r(C.gold, 21, 14 + vBob, 2, 1); // rolha de ouro/cortiça
  r(0xffffff, 20, 15 + vBob, 1, 2); // reflexo especular
}



// --- BUNDLE FILE: JS_Teste/src/art/itemArt.js ---
// =============================================================================
// ARTE PROCEDURAL: ÍCONES DE ARMAS, PROJÉTEIS, COLETÁVEIS E HUD
// =============================================================================
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
  // 1. Haste de carvalho reforçada com amarras e pomo de ouro
  r(C.woodDark, 5, 1, 2, 10);
  r(C.leatherBase, 5, 5, 2, 3);
  r(C.goldDark, 5, 10, 2, 2);
  r(C.goldLight, 5, 10, 2, 1);

  // 2. Lâmina Dupla Reluzente com chanfro e gume curvo afiado
  // Lâmina Esquerda (meia-lua agressiva)
  r(C.steelDark, 1, 2, 4, 7);
  r(C.steelBase, 1, 3, 3, 5);
  r(C.steelLight, 0, 3, 2, 5);
  r(C.white, 0, 4, 1, 3); // Gume afiado de alto contraste
  r.shine(0, 3, 0, 0, C.white);

  // Lâmina Direita (meia-lua agressiva)
  r(C.steelDark, 7, 2, 4, 7);
  r(C.steelBase, 8, 3, 3, 5);
  r(C.steelLight, 10, 3, 2, 5);
  r(C.white, 11, 4, 1, 3); // Gume afiado de alto contraste
  r.shine(11, 3, 0, 0, C.white);

  // 3. Olho de fixação central de ferro com Runa Ciano reluzente
  r(C.ironDeep, 4, 3, 4, 4);
  r(C.goldBase, 4, 3, 4, 1);
  r(C.cyan, 5, 4, 2, 2);
  r(C.white, 5, 4, 1, 1);
}

// Nova Arma 2: Ícone e Projétil do Cajado de Fogo Arcano
function drawFireStaffIcon(r) {
  r(C.woodDark, 4, 4, 1, 7); r(C.gold, 3, 3, 3, 2);                        // haste e garras de ouro
  r(C.red, 3, 1, 3, 3); r(C.yellow, 4, 1, 1, 2); r(C.white, 4, 2, 1, 1);   // orbe solar flamejante
}

// Projétil do Cajado de Fogo (Aerodinâmico, fluido e sem poluição visual)
function drawFireballProj(r) {
  // Cauda afilada fluida em chama decrescente
  r(C.fireDeep, 0, 3, 2, 2);
  r(C.fireShadow, 1, 2, 2, 4);
  r(C.fireBase, 2, 2, 3, 4);

  // Manto flamejante aerodinâmico
  r(C.fireBase, 4, 1, 4, 6);
  r(C.fireLight, 5, 2, 4, 4);
  r(C.fireHighlight, 7, 2, 3, 4);

  // Núcleo solar concentrado e brilhante
  r(C.white, 8, 3, 3, 2);
  r(C.white, 9, 2, 2, 4);
  r.shine(10, 3, 0, 0, C.white);
}

// Orbe Arcano do Mago Sombrio (Geometria 100% esférica, suave e orgânica)
function drawMageOrb(r) {
  // Corona externa esférica com cantos recortados (rasterização circular pura em 8x8)
  // Topo e base arredondados (x: 2..5, w: 4)
  r(C.arcanaDeep, 2, 0, 4, 1);
  r(C.arcanaDeep, 2, 7, 4, 1);

  // Anéis intermediários (x: 1..6, w: 6)
  r(C.arcanaShadow, 1, 1, 6, 1);
  r(C.arcanaDeep, 1, 6, 6, 1);

  // Equador e corpo volumétrico da esfera (x: 0..7, w: 8)
  r(C.arcanaShadow, 0, 2, 8, 4);

  // Gradiente esférico púrpura/magenta luminoso
  r(0xba68c8, 2, 1, 4, 1);
  r(0xab47bc, 1, 2, 6, 1);
  r(0x8e24aa, 1, 3, 6, 2);
  r(0x4a148c, 1, 5, 6, 1);
  r(0x311b92, 2, 6, 4, 1);

  // Núcleo abissal central arredondado (círculo interior, não-quadrado)
  r(0x100020, 3, 2, 2, 1);
  r(0x0a0014, 2, 3, 4, 2);
  r(0x100020, 3, 5, 2, 1);

  // Centelha mística interior de mana
  r(C.cyan, 3, 3, 2, 2);
  r(C.white, 3, 3, 1, 1);

  // Curva de brilho especular 3D no topo esquerdo (volume esférico realista)
  r(C.white, 2, 1, 2, 1);
  r(C.arcanaLight, 1, 2, 1, 2);
  r.shine(2, 1, 0, 0, C.white);
}

function drawBlade(r) {                                  // Espada Vorpal (lâmina usada no golpe)
  // 1. Lâmina de aço temperado com gume reluzente e canaleta de sangue
  r(C.steelShadow, 1, 1, 4, 12);
  r(C.steelBase, 2, 1, 2, 12);
  r(C.steelLight, 2, 1, 1, 12);
  r(C.white, 2, 0, 1, 2); // Ponta afiada
  r.shine(2, 1, 0, 0, C.white);

  // 2. Runa ciano luminosa entalhada na lâmina
  r(C.cyan, 2, 6, 1, 4);
  r(C.white, 2, 7, 1, 2);

  // 3. Guarda de ouro maciço com gavilhões chanfrados
  r(C.goldDark, 0, 13, 6, 2);
  r(C.goldBase, 0, 13, 6, 1);
  r(C.goldLight, 1, 13, 4, 1);
  r.shine(1, 13, 0, 0, C.white);

  // 4. Cabo de couro nobre trançado e pomo com rubi cravado
  r(C.woodDark, 2, 15, 2, 3);
  r(C.leatherBase, 2, 16, 2, 1);
  r(C.goldBase, 1, 18, 4, 2);
  r(C.rubyLight, 2, 18, 2, 1);
}

const arrowDrawer = (feather, tip, trailCol = C.manaLight) => (r) => {
  // 1. Rastro de velocidade / esteira de vento translúcida atrás da flecha
  r(trailCol, 0, 2, 2, 1);
  r(trailCol, 1, 1, 1, 1);
  r(trailCol, 1, 3, 1, 1);

  // 2. Empenamento / Penas do projétil
  r(feather, 2, 0, 2, 2);
  r(feather, 2, 3, 2, 2);
  r(C.white, 3, 1, 1, 1);
  r(C.white, 3, 3, 1, 1);

  // 3. Haste de madeira torneada com anel metálico de reforço
  r(C.woodDark, 4, 2, 6, 1);
  r(C.woodBase, 5, 2, 5, 1);
  r(C.goldBase, 7, 2, 1, 1);

  // 4. Ponta afiada perfurante de navalha com reflexo especular
  r(tip, 10, 1, 2, 3);
  r(tip, 11, 2, 1, 1);
  r(C.white, 11, 2, 1, 1);
  r.shine(11, 2, 0, 0, C.white);
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


function drawGoldCoin(r, f) {
  if (f === 0) {
    // Silhueta octagonal chanfrada (diâmetro 6 em grid 8x8)
    r(C.goldDark, 2, 1, 4, 1);
    r(C.goldDark, 1, 2, 6, 4);
    r(C.goldDark, 2, 6, 4, 1);

    // Borda superior e esquerda iluminada (luz solar incidente)
    r(C.goldLight, 2, 1, 3, 1);
    r(C.goldLight, 1, 2, 1, 3);

    // Borda inferior e direita sombreada (oclusão profunda)
    r(C.goldDeep, 5, 2, 1, 4);
    r(C.goldDeep, 2, 6, 4, 1);
    r(C.goldDeep, 4, 5, 2, 1);

    // Disco interior rebaixado com dithering de ouro suave
    r(C.goldBase, 2, 2, 4, 4);
    r.dither(C.goldLight, C.goldBase, 2, 2, 4, 2);

    // Emblema nobre cunhado no centro (cruz/selo imperial)
    r(C.goldDeep, 3, 3, 2, 2);
    r(C.goldHighlight, 3, 3, 1, 1);

    // Ponto de brilho especular no topo
    r.shine(2, 1, 1, 0, C.white);
  } else {
    // Frame 1: Perfil elíptico durante a rotação da moeda
    r(C.goldDark, 3, 1, 2, 1);
    r(C.goldDark, 2, 2, 4, 4);
    r(C.goldDark, 3, 6, 2, 1);

    // Face visível com brilho de giro
    r(C.goldBase, 2, 2, 3, 4);
    r(C.goldDeep, 5, 2, 1, 4); // espessura da moeda na lateral
    r(C.goldHighlight, 3, 2, 1, 4); // reflexo vertical de rotação

    // Ponto de brilho especular no vértice
    r.shine(3, 1, 1, 1, C.white);
  }
}

// 8. Moeda de Prata Brunida (16x16 — 2 frames com chanfro 3D e reflexo especular)
function drawSilverCoin(r, f) {
  if (f === 0) {
    // Silhueta octagonal chanfrada (diâmetro 6 em grid 8x8)
    r(C.silverShadow, 2, 1, 4, 1);
    r(C.silverShadow, 1, 2, 6, 4);
    r(C.silverShadow, 2, 6, 4, 1);

    // Borda superior e esquerda iluminada
    r(C.silverHighlight, 2, 1, 3, 1);
    r(C.silverHighlight, 1, 2, 1, 3);

    // Borda inferior e direita sombreada
    r(C.silverDeep, 5, 2, 1, 4);
    r(C.silverDeep, 2, 6, 4, 1);
    r(C.silverDeep, 4, 5, 2, 1);

    // Disco interior com textura de prata brunida
    r(C.silverBase, 2, 2, 4, 4);
    r.dither(C.silverLight, C.silverBase, 2, 2, 4, 2);

    // Emblema central de prata nobre
    r(C.silverDeep, 3, 3, 2, 2);
    r(C.silverHighlight, 3, 3, 1, 1);

    // Brilho especular no topo
    r.shine(2, 1, 1, 0, C.white);
  } else {
    // Frame 1: Perfil elíptico durante a rotação da moeda
    r(C.silverShadow, 3, 1, 2, 1);
    r(C.silverShadow, 2, 2, 4, 4);
    r(C.silverShadow, 3, 6, 2, 1);

    // Face e reflexo vertical
    r(C.silverBase, 2, 2, 3, 4);
    r(C.silverDeep, 5, 2, 1, 4);
    r(C.silverHighlight, 3, 2, 1, 4);

    // Ponto especular
    r.shine(3, 1, 1, 1, C.white);
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

// Ícones dos 3 Novos Pergaminhos de Bônus Global (Multi-Shot, Crescimento e Velocidade)
function drawScrollMultiShotIcon(r) {
  // Pergaminho aberto (pergaminho envelhecido com bordas de madeira)
  r(C.woodDark, 1, 1, 8, 1); r(C.woodDark, 1, 9, 8, 1);
  r(C.bone, 2, 2, 6, 7);
  r(C.wood, 1, 2, 1, 7); r(C.wood, 8, 2, 1, 7);
  // Glifo de Disparo Múltiplo: 3 setas de energia ciano irradiando
  r(C.cyan, 4, 3, 2, 3); r(C.cyan, 2, 4, 1, 2); r(C.cyan, 7, 4, 1, 2);
  r(C.gold, 4, 7, 2, 1);
}

function drawScrollGrowthIcon(r) {
  // Pergaminho aberto
  r(C.woodDark, 1, 1, 8, 1); r(C.woodDark, 1, 9, 8, 1);
  r(C.bone, 2, 2, 6, 7);
  r(C.wood, 1, 2, 1, 7); r(C.wood, 8, 2, 1, 7);
  // Glifo de Crescimento: anel rúnico em expansão com núcleo esmeralda
  r(C.leafLight, 3, 3, 4, 1); r(C.leafLight, 3, 7, 4, 1);
  r(C.leafLight, 3, 3, 1, 5); r(C.leafLight, 6, 3, 1, 5);
  r(C.goldLight, 4, 4, 2, 3);
}

function drawScrollSpeedIcon(r) {
  // Pergaminho aberto
  r(C.woodDark, 1, 1, 8, 1); r(C.woodDark, 1, 9, 8, 1);
  r(C.bone, 2, 2, 6, 7);
  r(C.wood, 1, 2, 1, 7); r(C.wood, 8, 2, 1, 7);
  // Glifo de Velocidade: raio dourado e branco veloz
  r(C.yellow, 5, 2, 2, 2);
  r(C.yellow, 4, 4, 3, 1);
  r(C.white, 3, 5, 3, 2);
  r(C.goldLight, 4, 7, 2, 2);
}

// =============================================================================
// FOLHAS DE SPRITES DE CORTE DE ESPADA (PIXEL ART - 9 QUADROS 64x47)
// Baseado na animação clássica de slash arc (glint -> ascensão -> flash branco -> rastro)
// slash_lr: golpe da esquerda para a direita (descendente)
// slash_rl: golpe da direita para a esquerda (ascendente invertido)
// =============================================================================
// RLE dos 9 quadros de corte (64x47 cada) em faixa horizontal (576x47)
const SLASH_STRIP_RLE = [
  663, 0, 14, 1, 50, 0, 14, 1, 50, 0, 5, 2, 3, 0, 6, 2, 51, 0, 2, 1,
  6, 0, 5, 1, 365, 0, 24, 1, 40, 0, 24, 1, 40, 0, 2, 2, 3, 0, 4, 2,
  5, 0, 10, 2, 40, 0, 1, 1, 3, 0, 2, 1, 11, 0, 2, 1, 1, 0, 2, 1,
  1, 0, 1, 1, 59, 0, 5, 1, 293, 0, 29, 1, 35, 0, 30, 1, 34, 0, 30, 2,
  38, 0, 2, 1, 10, 0, 3, 1, 2, 0, 2, 1, 1, 0, 2, 1, 1, 0, 3, 1,
  58, 0, 6, 1, 223, 0, 1, 1, 63, 0, 31, 1, 33, 0, 36, 1, 33, 0, 8, 2,
  1, 0, 22, 2, 28, 0, 1, 1, 9, 0, 1, 1, 6, 0, 2, 1, 5, 0, 3, 1,
  2, 0, 7, 1, 56, 0, 8, 1, 218, 0, 3, 1, 61, 0, 32, 1, 32, 0, 40, 1,
  24, 0, 1, 2, 1, 0, 10, 2, 4, 0, 24, 2, 25, 0, 1, 1, 4, 0, 1, 1,
  6, 0, 13, 1, 4, 0, 1, 1, 2, 0, 7, 1, 56, 0, 8, 1, 215, 0, 2, 1,
  62, 0, 32, 1, 32, 0, 42, 1, 22, 0, 11, 2, 4, 0, 27, 2, 23, 0, 1, 1,
  4, 0, 6, 1, 14, 0, 16, 1, 48, 0, 4, 1, 5, 0, 7, 1, 212, 0, 3, 1,
  61, 0, 7, 1, 20, 0, 5, 1, 32, 0, 7, 1, 20, 0, 19, 1, 18, 0, 2, 2,
  4, 0, 1, 2, 20, 0, 19, 2, 20, 0, 1, 1, 2, 0, 2, 1, 23, 0, 2, 1,
  1, 0, 13, 1, 49, 0, 4, 1, 4, 0, 6, 1, 210, 0, 2, 1, 62, 0, 5, 1,
  59, 0, 5, 1, 26, 0, 17, 1, 16, 0, 2, 2, 1, 0, 2, 2, 26, 0, 17, 2,
  20, 0, 1, 1, 30, 0, 13, 1, 50, 0, 5, 1, 3, 0, 5, 1, 208, 0, 1, 1,
  63, 0, 3, 1, 61, 0, 3, 1, 31, 0, 16, 1, 48, 0, 16, 2, 48, 0, 16, 1,
  50, 0, 6, 1, 2, 0, 4, 1, 1, 0, 1, 1, 205, 0, 1, 1, 63, 0, 3, 1,
  61, 0, 3, 1, 33, 0, 16, 1, 13, 0, 2, 2, 33, 0, 16, 2, 14, 0, 1, 1,
  33, 0, 16, 1, 51, 0, 5, 1, 3, 0, 3, 1, 63, 0, 1, 1, 141, 0, 1, 1,
  63, 0, 2, 1, 62, 0, 2, 1, 37, 0, 15, 1, 10, 0, 2, 2, 37, 0, 15, 2,
  49, 0, 15, 1, 52, 0, 5, 1, 2, 0, 2, 1, 2, 0, 1, 1, 59, 0, 2, 1,
  2, 0, 1, 1, 306, 0, 15, 1, 49, 0, 15, 2, 49, 0, 15, 1, 52, 0, 2, 1,
  1, 0, 2, 1, 1, 0, 3, 1, 2, 0, 1, 1, 53, 0, 1, 1, 4, 0, 3, 1,
  2, 0, 1, 1, 306, 0, 14, 1, 50, 0, 14, 2, 50, 0, 14, 1, 53, 0, 2, 1,
  1, 0, 2, 1, 1, 0, 2, 1, 2, 0, 1, 1, 53, 0, 2, 1, 4, 0, 2, 1,
  2, 0, 1, 1, 306, 0, 15, 1, 49, 0, 15, 2, 49, 0, 15, 1, 53, 0, 2, 1,
  1, 0, 5, 1, 1, 0, 2, 1, 53, 0, 2, 1, 3, 0, 3, 1, 1, 0, 2, 1,
  306, 0, 14, 1, 50, 0, 14, 2, 50, 0, 14, 1, 54, 0, 1, 1, 1, 0, 6, 1,
  1, 0, 1, 1, 54, 0, 1, 1, 2, 0, 4, 1, 2, 0, 1, 1, 306, 0, 15, 1,
  49, 0, 15, 2, 49, 0, 15, 1, 54, 0, 1, 1, 1, 0, 5, 1, 1, 0, 2, 1,
  54, 0, 1, 1, 1, 0, 5, 1, 1, 0, 2, 1, 306, 0, 14, 1, 50, 0, 14, 2,
  50, 0, 14, 1, 54, 0, 1, 1, 1, 0, 5, 1, 1, 0, 2, 1, 54, 0, 1, 1,
  2, 0, 4, 1, 1, 0, 2, 1, 306, 0, 14, 1, 50, 0, 14, 2, 50, 0, 14, 1,
  54, 0, 2, 1, 1, 0, 7, 1, 54, 0, 2, 1, 1, 0, 4, 1, 1, 0, 2, 1,
  57, 0, 1, 1, 248, 0, 14, 1, 50, 0, 14, 2, 50, 0, 14, 1, 55, 0, 1, 1,
  1, 0, 7, 1, 55, 0, 1, 1, 1, 0, 4, 1, 1, 0, 2, 1, 55, 0, 1, 1,
  1, 0, 1, 1, 248, 0, 14, 1, 50, 0, 14, 2, 50, 0, 14, 1, 55, 0, 9, 1,
  55, 0, 1, 1, 1, 0, 4, 1, 1, 0, 2, 1, 55, 0, 1, 1, 1, 0, 1, 1,
  248, 0, 14, 1, 50, 0, 14, 2, 50, 0, 14, 1, 55, 0, 9, 1, 55, 0, 1, 1,
  1, 0, 4, 1, 1, 0, 2, 1, 55, 0, 1, 1, 250, 0, 14, 1, 49, 0, 15, 2,
  49, 0, 15, 1, 55, 0, 9, 1, 55, 0, 1, 1, 1, 0, 3, 1, 2, 0, 2, 1,
  55, 0, 1, 1, 250, 0, 13, 1, 50, 0, 14, 2, 50, 0, 14, 1, 56, 0, 8, 1,
  56, 0, 1, 1, 1, 0, 3, 1, 1, 0, 2, 1, 56, 0, 1, 1, 6, 0, 1, 1,
  245, 0, 11, 1, 49, 0, 15, 2, 49, 0, 15, 1, 55, 0, 9, 1, 55, 0, 6, 1,
  1, 0, 2, 1, 55, 0, 1, 1, 6, 0, 2, 1, 247, 0, 9, 1, 49, 0, 15, 2,
  49, 0, 15, 1, 55, 0, 9, 1, 55, 0, 5, 1, 1, 0, 3, 1, 55, 0, 1, 1,
  5, 0, 3, 1, 248, 0, 7, 1, 49, 0, 15, 2, 49, 0, 15, 1, 56, 0, 8, 1,
  56, 0, 4, 1, 1, 0, 3, 1, 56, 0, 1, 1, 4, 0, 3, 1, 251, 0, 4, 1,
  49, 0, 15, 2, 49, 0, 15, 1, 56, 0, 8, 1, 56, 0, 4, 1, 1, 0, 3, 1,
  56, 0, 1, 1, 4, 0, 3, 1, 267, 0, 1, 2, 35, 0, 16, 2, 12, 0, 1, 1,
  35, 0, 16, 1, 12, 0, 1, 1, 43, 0, 8, 1, 12, 0, 1, 1, 43, 0, 8, 1,
  12, 0, 1, 1, 43, 0, 2, 1, 2, 0, 4, 1, 12, 0, 1, 1, 256, 0, 3, 2,
  31, 0, 17, 2, 13, 0, 3, 1, 31, 0, 17, 1, 13, 0, 3, 1, 39, 0, 9, 1,
  13, 0, 3, 1, 39, 0, 9, 1, 13, 0, 3, 1, 39, 0, 2, 1, 2, 0, 5, 1,
  13, 0, 3, 1, 256, 0, 5, 2, 24, 0, 18, 2, 17, 0, 5, 1, 24, 0, 18, 1,
  17, 0, 5, 1, 33, 0, 9, 1, 17, 0, 2, 1, 36, 0, 9, 1, 17, 0, 2, 1,
  36, 0, 2, 1, 3, 0, 4, 1, 17, 0, 2, 1, 256, 0, 6, 2, 18, 0, 20, 2,
  20, 0, 6, 1, 18, 0, 20, 1, 20, 0, 6, 1, 29, 0, 9, 1, 20, 0, 3, 1,
  32, 0, 9, 1, 20, 0, 3, 1, 32, 0, 1, 1, 4, 0, 4, 1, 20, 0, 3, 1,
  256, 0, 40, 2, 24, 0, 40, 1, 24, 0, 5, 1, 24, 0, 11, 1, 24, 0, 5, 1,
  24, 0, 11, 1, 24, 0, 5, 1, 24, 0, 2, 1, 3, 0, 6, 1, 24, 0, 5, 1,
  255, 0, 35, 2, 29, 0, 35, 1, 29, 0, 13, 1, 10, 0, 12, 1, 29, 0, 6, 1,
  17, 0, 12, 1, 29, 0, 6, 1, 17, 0, 3, 1, 2, 0, 7, 1, 29, 0, 6, 1,
  254, 0, 28, 2, 36, 0, 28, 1, 36, 0, 28, 1, 36, 0, 28, 1, 36, 0, 20, 1,
  2, 0, 6, 1, 36, 0, 8, 1, 251, 0, 22, 2, 42, 0, 22, 1, 42, 0, 22, 1,
  42, 0, 22, 1, 42, 0, 22, 1, 42, 0, 11, 1, 248, 0, 16, 2, 48, 0, 16, 1,
  48, 0, 16, 1, 48, 0, 16, 1, 48, 0, 16, 1, 48, 0, 13, 1, 247, 0, 8, 2,
  56, 0, 8, 1, 56, 0, 8, 1, 56, 0, 8, 1, 56, 0, 8, 1, 56, 0, 8, 1,
  5209, 0
];

function makeSlashTextures(scene) {
  ['slash_lr', 'slash_rl', 'slash_arc'].forEach(key => {
    if (scene.textures.exists(key)) scene.textures.remove(key);
  });

  const fw = 64;
  const fh = 47;
  const numFrames = 9;
  const totalW = fw * numFrames; // 576

  // 1. Textura de 9 quadros: slash_lr (Golpe da esquerda para a direita / Descendente)
  const canvasLR = scene.textures.createCanvas('slash_lr', totalW, fh);
  const ctxLR = canvasLR.context;
  const imgData = ctxLR.createImageData(totalW, fh);
  const data = imgData.data;

  let ptr = 0;
  for (let i = 0; i < SLASH_STRIP_RLE.length; i += 2) {
    const count = SLASH_STRIP_RLE[i];
    const sym = SLASH_STRIP_RLE[i + 1];
    if (sym === 0) {
      ptr += count * 4;
    } else if (sym === 1) {
      // Tom azul/aço metálico característico (#c0cbdc)
      for (let k = 0; k < count; k++) {
        data[ptr++] = 192;
        data[ptr++] = 203;
        data[ptr++] = 220;
        data[ptr++] = 255;
      }
    } else {
      // Branco puro incandescente do ápice de corte (#ffffff)
      for (let k = 0; k < count; k++) {
        data[ptr++] = 255;
        data[ptr++] = 255;
        data[ptr++] = 255;
        data[ptr++] = 255;
      }
    }
  }
  ctxLR.putImageData(imgData, 0, 0);
  canvasLR.refresh();

  // Registra cada quadro na textura slash_lr
  for (let f = 0; f < numFrames; f++) {
    canvasLR.add(f, 0, f * fw, 0, fw, fh);
  }

  // 2. Textura de 9 quadros: slash_rl (Golpe da direita para a esquerda / Ascendente Invertido)
  // Inversão vertical direta por buffer em memória: elimina bugs de translação do canvas e garante quadros 100% perfeitos
  const canvasRL = scene.textures.createCanvas('slash_rl', totalW, fh);
  const ctxRL = canvasRL.context;
  const imgDataRL = ctxRL.createImageData(totalW, fh);
  const dataRL = imgDataRL.data;

  for (let f = 0; f < numFrames; f++) {
    for (let y = 0; y < fh; y++) {
      const srcY = fh - 1 - y;
      for (let x = 0; x < fw; x++) {
        const srcIdx = (srcY * totalW + (f * fw + x)) * 4;
        const dstIdx = (y * totalW + (f * fw + x)) * 4;
        dataRL[dstIdx] = data[srcIdx];
        dataRL[dstIdx + 1] = data[srcIdx + 1];
        dataRL[dstIdx + 2] = data[srcIdx + 2];
        dataRL[dstIdx + 3] = data[srcIdx + 3];
      }
    }
  }
  ctxRL.putImageData(imgDataRL, 0, 0);
  canvasRL.refresh();

  // Registra cada quadro na textura slash_rl
  for (let f = 0; f < numFrames; f++) {
    canvasRL.add(f, 0, f * fw, 0, fw, fh);
  }

  // 3. Fallback/Alias retrocompatível: slash_arc (aponta para o frame 3 de pico de corte)
  const canvasArc = scene.textures.createCanvas('slash_arc', fw, fh);
  canvasArc.context.drawImage(canvasLR.canvas, 3 * fw, 0, fw, fh, 0, 0, fw, fh);
  canvasArc.refresh();

  // Garante filtro NEAREST cristalino em todas as texturas
  [canvasLR, canvasRL, canvasArc].forEach(tex => {
    if (tex && tex.setFilter) tex.setFilter(Phaser.Textures.FilterMode.NEAREST);
  });
}

function makeSlashTexture(scene) {
  makeSlashTextures(scene);
}


// --- BUNDLE FILE: JS_Teste/src/art/worldArt.js ---
// =============================================================================
// ARTE PROCEDURAL: CENÁRIO, TEXTURAS DO MUNDO E CONSTRUÇÕES DA VILA
// =============================================================================
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


// Cenário (chão, estrada, florestas das bordas, praça da vila) e efeitos
function makeWorldTextures(scene) {
  const g = scene.make.graphics({ add: false });

  // 1. Gramado Medieval da Floresta ('ground' 128x128 — suave, sutil e sem repetição pesada)
  g.fillStyle(0x568638).fillRect(0, 0, 128, 128);

  // Variação orgânica suave de relevo (dithering de tons harmônicos)
  for (let px = 0; px < 128; px += 4) {
    for (let py = 0; py < 128; py += 4) {
      const hash = (px * 7 + py * 13) % 11;
      if (hash === 0) {
        g.fillStyle(0x4e7b32).fillRect(px, py, 2, 2);
      } else if (hash === 3) {
        g.fillStyle(0x5f9140).fillRect(px + 1, py + 1, 2, 2);
      }
    }
  }

  // Tufos de grama sutis, delicados e assimétricos (reduzidos e com lâminas finas para quebrar repetição)
  const delicateGrass = [
    [18, 22], [76, 14], [112, 36], [42, 68],
    [94, 82], [26, 106], [80, 114]
  ];
  delicateGrass.forEach(([gx, gy], i) => {
    const isSmall = i % 2 === 0;
    // Base verde-musgo suave
    g.fillStyle(0x2f6e35).fillRect(gx + 1, gy + 2, isSmall ? 2 : 3, 2);
    // Lâminas finas e pontiagudas
    g.fillStyle(0x47a04a).fillRect(gx, gy, 1, 3).fillRect(gx + 2, gy - 1, 1, 4);
    if (!isSmall) g.fillStyle(0x47a04a).fillRect(gx + 3, gy + 1, 1, 2);
    // Pontinhas iluminadas
    g.fillStyle(0x72c96b).fillRect(gx, gy, 1, 1).fillRect(gx + 2, gy - 1, 1, 1);
  });

  // Margaridinhas minúsculas e esparsas (pétalas discretas de 2x2 com miolinho de 1px)
  const subtleFlowers = [
    [52, 28, 0xffffff, 0xffeb3b],
    [104, 60, 0xb2ebf2, 0xfff9c4],
    [34, 88, 0xffffff, 0xffeb3b],
    [70, 96, 0xff80ab, 0xffeb3b]
  ];
  subtleFlowers.forEach(([fx, fy, petCol, dotCol]) => {
    g.fillStyle(0x2f6e35).fillRect(fx + 1, fy + 2, 1, 1);
    g.fillStyle(petCol).fillRect(fx, fy, 3, 2);
    g.fillStyle(dotCol).fillRect(fx + 1, fy, 1, 1);
  });

  // Pedrinhas suaves de calcário (pequenas e integradas)
  [[88, 44], [16, 56], [62, 120]].forEach(([rx, ry]) => {
    g.fillStyle(0x69707c).fillRect(rx, ry + 1, 3, 1);
    g.fillStyle(0x949ba6).fillRect(rx, ry, 3, 1);
    g.fillStyle(0xffffff).fillRect(rx + 1, ry, 1, 1);
  });

  g.generateTexture('ground', 128, 128);

  // 2. Estrada Real de Terra Batida ('road' 64x80 — rolagem contínua sem quebra)
  g.clear();
  // Leito base de terra batida quente
  g.fillStyle(C.dirtBase).fillRect(0, 0, 64, 80);

  // Bordas orgânicas com dentes de grama (franja de transição relva-terra no topo e base)
  for (let bx = 0; bx < 64; bx += 4) {
    const topH = ((bx * 3) % 4) + 3;
    const botH = ((bx * 7) % 4) + 3;
    g.fillStyle(0x4a732f).fillRect(bx, 0, 4, topH).fillRect(bx, 80 - botH, 4, botH);
    g.fillStyle(C.leafDeep).fillRect(bx, topH - 1, 4, 1).fillRect(bx, 80 - botH, 4, 1);
  }

  // Sulco / Trilho de Roda de Carroça Norte (y: 19..26)
  g.fillStyle(C.dirtShadow).fillRect(0, 20, 64, 6);
  g.fillStyle(C.dirtDeep).fillRect(0, 22, 64, 3);
  g.fillStyle(C.dirtLight).fillRect(0, 26, 64, 1);

  // Sulco / Trilho de Roda de Carroça Sul (y: 53..60)
  g.fillStyle(C.dirtShadow).fillRect(0, 54, 64, 6);
  g.fillStyle(C.dirtDeep).fillRect(0, 56, 64, 3);
  g.fillStyle(C.dirtLight).fillRect(0, 60, 64, 1);

  // Faixa central de terra batida compactada (passagem de cavalos, y: 35..45)
  g.fillStyle(C.dirtShadow).fillRect(0, 36, 64, 8);
  for (let kx = 2; kx < 64; kx += 8) {
    g.fillStyle(C.dirtLight).fillRect(kx, 38, 4, 2);
    g.fillStyle(C.dirtDeep).fillRect(kx + 2, 40, 3, 1);
  }

  // Pedregulhos incrustados na estrada (com volume de luz e sombra)
  const roadStones = [
    [10, 14], [28, 30], [48, 12], [20, 48], [42, 66], [58, 34], [6, 68]
  ];
  roadStones.forEach(([sx, sy]) => {
    g.fillStyle(C.stoneDeep).fillRect(sx, sy + 2, 4, 2);
    g.fillStyle(C.stoneBase).fillRect(sx, sy, 4, 2);
    g.fillStyle(C.stoneHighlight).fillRect(sx + 1, sy, 2, 1);
  });
  g.generateTexture('road', 64, 80);

  // 3. Floresta Ancestral ao Fundo ('forest_top' 128x110 — Parallax Superior x0.9)
  // Encaixe 100% contínuo: elementos carimbados em [-128, 0, 128]
  g.clear();
  // Fundo denso da mata fechada
  g.fillStyle(0x0e2412).fillRect(0, 0, 128, 70);

  // Troncos de carvalhos e pinheiros com casca rugosa e musgo
  [-128, 0, 128].forEach(o => {
    // Troncos principais
    g.fillStyle(C.woodDeep).fillRect(o + 14, 52, 12, 58).fillRect(o + 58, 56, 12, 54).fillRect(o + 98, 50, 12, 60);
    g.fillStyle(C.woodDark).fillRect(o + 16, 52, 8, 58).fillRect(o + 60, 56, 8, 54).fillRect(o + 100, 50, 8, 60);
    g.fillStyle(C.woodHighlight).fillRect(o + 16, 52, 2, 58).fillRect(o + 60, 56, 2, 54).fillRect(o + 100, 50, 2, 60);
    // Musgo de tronco
    g.fillStyle(C.mossGold).fillRect(o + 17, 72, 3, 6).fillRect(o + 61, 78, 3, 5).fillRect(o + 101, 68, 3, 6);
  });

  // Copas volumosas multicamadas (esferas de folhagem com 4 níveis de iluminação)
  [-128, 0, 128].forEach(o => {
    // Camada 1: Sombra profunda da copa
    g.fillStyle(C.leafDeep)
      .fillCircle(o + 20, 60, 28)
      .fillCircle(o + 64, 66, 26)
      .fillCircle(o + 106, 58, 28);

    // Camada 2: Folhagem ambiente escura
    g.fillStyle(C.leafDark)
      .fillCircle(o + 18, 54, 24)
      .fillCircle(o + 62, 60, 22)
      .fillCircle(o + 104, 52, 24);

    // Camada 3: Copa verde vibrante
    g.fillStyle(C.leafBase)
      .fillCircle(o + 14, 46, 18)
      .fillCircle(o + 58, 52, 16)
      .fillCircle(o + 100, 44, 18);

    // Camada 4: Luz solar direta nas folhas superiores
    g.fillStyle(C.leafLight)
      .fillCircle(o + 11, 40, 11)
      .fillCircle(o + 55, 46, 10)
      .fillCircle(o + 97, 38, 11);

    // Brilho solar dourado nas pontas
    g.fillStyle(C.leafHighlight)
      .fillCircle(o + 9, 36, 5)
      .fillCircle(o + 53, 42, 5)
      .fillCircle(o + 95, 34, 5);

    // Toque outonal de folha dourada
    g.fillStyle(C.leafAmber)
      .fillCircle(o + 32, 48, 6)
      .fillCircle(o + 82, 52, 5);
  });
  g.generateTexture('forest_top', 128, 110);

  // 4. Arbustos Espinhosos em Primeiro Plano ('forest_bottom' 128x80 — Parallax Inferior x1.3)
  g.clear();
  g.fillStyle(C.leafDeep).fillRect(0, 46, 128, 34);

  [-128, 0, 128].forEach(o => {
    // Sombra das moitas
    g.fillStyle(C.leafDeep)
      .fillCircle(o + 22, 40, 26)
      .fillCircle(o + 66, 46, 26)
      .fillCircle(o + 108, 38, 26);

    // Corpo verde escuro dos arbustos
    g.fillStyle(C.leafDark)
      .fillCircle(o + 18, 34, 20)
      .fillCircle(o + 62, 40, 20)
      .fillCircle(o + 104, 32, 20);

    // Folhagem viva iluminada
    g.fillStyle(C.leafBase)
      .fillCircle(o + 14, 28, 14)
      .fillCircle(o + 58, 34, 13)
      .fillCircle(o + 100, 26, 14);

    // Luz no topo dos arbustos
    g.fillStyle(C.leafLight)
      .fillCircle(o + 12, 24, 7)
      .fillCircle(o + 56, 30, 7)
      .fillCircle(o + 98, 22, 7);

    // Bagas silvestres carmesins nos arbustos
    g.fillStyle(C.rubyLight)
      .fillRect(o + 8, 26, 2, 2)
      .fillRect(o + 24, 30, 2, 2)
      .fillRect(o + 52, 32, 2, 2)
      .fillRect(o + 72, 36, 2, 2)
      .fillRect(o + 94, 24, 2, 2)
      .fillRect(o + 112, 28, 2, 2);
    g.fillStyle(C.rubyGlow)
      .fillRect(o + 9, 26, 1, 1)
      .fillRect(o + 53, 32, 1, 1)
      .fillRect(o + 95, 24, 1, 1);
  });
  g.generateTexture('forest_bottom', 128, 80);

  // 5. Chão craquelado / rachado pelo impacto das rochas do Boss
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

  // 7. Piso e Praça da Vila ("village_plaza" 480x440 — tons claros, calçamento orgânico, sem grade)
  g.clear();
  // Gramado limpo de base da vila
  g.fillStyle(0x568638, 1).fillRect(0, 0, 480, 440);

  // Pátios calçados Norte e Sul (arenito e argamassa nobre clara acolhedora)
  g.fillStyle(0x9e886b, 0.95).fillRoundedRect(14, 18, 424, 148, 12);
  g.fillStyle(0x9e886b, 0.95).fillRoundedRect(14, 274, 424, 148, 12);
  g.fillStyle(0x737d8c, 0.92).fillRoundedRect(24, 26, 400, 132, 8);
  g.fillStyle(0x737d8c, 0.92).fillRoundedRect(24, 280, 400, 132, 8);

  // Calçamento de pedras de cantaria orgânicas (Cobblestone / Flagstone claro com padrão entrelaçado)
  const drawCourtyardPaving = (startY, endY) => {
    let row = 0;
    for (let py = startY; py < endY; py += 15) {
      row++;
      const shift = (row % 2 === 0) ? 9 : 0;
      for (let px = 28 + shift; px < 416; px += 19) {
        // Variação orgânica de tamanho e tom
        const salt = ((px * 13 + py * 17) % 7);
        const w = (salt === 0) ? 22 : (salt === 1 ? 15 : 18);
        const h = 12;
        const stoneCol = salt % 3 === 0 ? 0xb5bdc8 : (salt % 2 === 0 ? 0xa2abb7 : 0x8e97a3);

        // Fresta / argamassa suave
        g.fillStyle(0x565e69).fillRect(px, py, w + 1, h + 1);
        // Face da pedra clara
        g.fillStyle(stoneCol).fillRect(px, py, w, h);
        // Chanfro superior de luz (realce 3D suave)
        g.fillStyle(0xd5dbe3, 0.6).fillRect(px, py, w, 2).fillRect(px, py, 2, h);
        // Sombra inferior suave da pedra
        g.fillStyle(0x4a515c, 0.35).fillRect(px, py + h - 1, w, 1).fillRect(px + w - 1, py, 1, h);
      }
    }
  };

  drawCourtyardPaving(32, 150);
  drawCourtyardPaving(286, 404);

  // A Grande Alameda Central da Vila (y: 172..268 — Caminho de Cantaria Claro e Acolhedor)
  g.fillStyle(0x917f65, 1).fillRect(0, 172, 472, 96); // leito arenoso
  g.fillStyle(0x798391, 1).fillRect(0, 178, 470, 84); // base de pedras claras

  // Meio-fio de cantaria iluminado nas margens da alameda
  for (let cx = 0; cx < 466; cx += 16) {
    const curbCol = cx % 32 === 0 ? 0xc2cad4 : 0xa4acb8;
    g.fillStyle(curbCol, 1).fillRect(cx, 174, 15, 6).fillRect(cx, 260, 15, 6);
    g.fillStyle(0xffffff, 0.7).fillRect(cx, 174, 15, 2);
    g.fillStyle(0x515863, 0.4).fillRect(cx, 179, 15, 1).fillRect(cx, 265, 15, 1);
  }

  // Paralelepípedos claros entrelaçados na estrada central
  let rCount = 0;
  for (let ry = 184; ry < 252; ry += 13) {
    rCount++;
    const rShift = (rCount % 2 === 0) ? 7 : 0;
    for (let rx = 4 + rShift; rx < 462; rx += 15) {
      const pSalt = (rx * 11 + ry * 19) % 5;
      const roadStoneCol = pSalt === 0 ? 0xc0c8d2 : (pSalt === 1 ? 0xadb5bf : 0x98a0aa);
      g.fillStyle(0x525964, 1).fillRect(rx, ry, 14, 11);
      g.fillStyle(roadStoneCol, 1).fillRect(rx, ry, 13, 10);
      g.fillStyle(0xffffff, 0.55).fillRect(rx, ry, 13, 2).fillRect(rx, ry, 2, 10);
      g.fillStyle(0x424851, 0.35).fillRect(rx, ry + 8, 13, 2);
    }
  }

  // Passarelas conectando as oficinas e chalés
  [115, 295].forEach(wx => {
    g.fillStyle(C.stoneDeep, 1).fillRect(wx - 22, 152, 44, 24).fillRect(wx - 22, 264, 44, 24);
    g.fillStyle(C.stoneBase, 1).fillRect(wx - 20, 154, 40, 20).fillRect(wx - 20, 266, 40, 20);
  });

  // Jardineiras e canteiros reais com moldura de madeira e flores nobres
  [75, 225, 375].forEach(lx => {
    // Moldura de madeira da jardineira
    g.fillStyle(C.woodDark, 1).fillRoundedRect(lx - 20, 156, 40, 16, 4).fillRoundedRect(lx - 20, 268, 40, 16, 4);
    g.fillStyle(C.woodBase, 1).fillRoundedRect(lx - 18, 158, 36, 12, 3).fillRoundedRect(lx - 18, 270, 36, 12, 3);
    g.fillStyle(C.leafDark, 1).fillRect(lx - 16, 160, 32, 8).fillRect(lx - 16, 272, 32, 8);
    // Flores coloridas
    g.fillStyle(C.goldHighlight, 1).fillRect(lx - 12, 162, 4, 4).fillRect(lx + 4, 274, 4, 4);
    g.fillStyle(C.rubyLight, 1).fillRect(lx + 4, 161, 4, 4).fillRect(lx - 10, 273, 4, 4);
    g.fillStyle(C.manaLight, 1).fillRect(lx - 4, 162, 3, 3).fillRect(lx - 2, 274, 3, 3);
    // Luz ambiente dourada das tochas
    g.fillStyle(C.goldHighlight, 0.15).fillCircle(lx, 174, 28).fillCircle(lx, 266, 28);
  });

  // Soleira e Trilho do Grande Portão no extremo leste (x: 442..470)
  g.fillStyle(C.woodDeep, 1).fillRect(442, 4, 28, 170).fillRect(442, 266, 28, 170);
  g.fillStyle(C.ironDark, 1).fillRect(446, 6, 20, 166).fillRect(446, 268, 20, 166);
  g.fillStyle(C.ironHighlight, 0.6).fillRect(448, 8, 4, 162).fillRect(448, 270, 4, 162);
  g.fillStyle(0x2a1d17, 1).fillRect(440, 174, 34, 92);
  g.fillStyle(C.gold, 0.9).fillRect(444, 176, 4, 88).fillRect(466, 176, 4, 88);
  g.generateTexture('village_plaza', 480, 440);

  // Faísca usada nas explosões de partículas gerais
  g.clear().fillStyle(C.white).fillRect(0, 0, 4, 4);
  g.generateTexture('spark', 4, 4);

  // Estilhaço afiado para faíscas metálicas, lascas de madeira e pedriscos
  g.clear().fillStyle(C.white).fillRect(0, 0, 2, 4);
  g.generateTexture('spark_shard', 2, 4);

  // Estrela cintilante para efeitos sagrados, arcanos e críticos
  g.clear();
  g.fillStyle(C.white, 1).fillRect(2, 0, 1, 5).fillRect(0, 2, 5, 1);
  g.generateTexture('spark_star', 5, 5);

  // Aura rúnica protetora do Escudo Sagrado (48x48)
  g.clear();
  g.lineStyle(2, C.cyan, 0.45).strokeCircle(24, 24, 21);
  g.lineStyle(1, C.manaLight, 0.85).strokeCircle(24, 24, 19);
  g.fillStyle(C.white, 1);
  g.fillRect(23, 2, 3, 3).fillRect(23, 43, 3, 3);
  g.fillRect(2, 23, 3, 3).fillRect(43, 23, 3, 3);
  g.fillStyle(C.goldLight, 0.9);
  g.fillRect(9, 9, 2, 2).fillRect(37, 9, 2, 2);
  g.fillRect(9, 37, 2, 2).fillRect(37, 37, 2, 2);
  g.generateTexture('shield_aura', 48, 48);

  // 64-BIT: Vinheta Cinematográfica de Alta Nitidez (16:9 GAME_WIDTH x GAME_HEIGHT)
  if (!scene.textures.exists('vignette_64bit')) {
    const vCanvas = scene.textures.createCanvas('vignette_64bit', GAME_WIDTH, GAME_HEIGHT);
    const vCtx = vCanvas.context;
    const vGrad = vCtx.createRadialGradient(GAME_WIDTH / 2, GAME_HEIGHT / 2, 260, GAME_WIDTH / 2, GAME_HEIGHT / 2, 580);
    vGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vGrad.addColorStop(0.55, 'rgba(10, 7, 5, 0.08)');
    vGrad.addColorStop(0.85, 'rgba(8, 5, 4, 0.28)');
    vGrad.addColorStop(1, 'rgba(5, 3, 2, 0.58)');
    vCtx.fillStyle = vGrad;
    vCtx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    vCanvas.refresh();
  }

  // 64-BIT: Feixes de Luz Solar Volumétrica / Komorebi (400x260)
  if (!scene.textures.exists('sunbeam_rays')) {
    const sCanvas = scene.textures.createCanvas('sunbeam_rays', 400, 260);
    const sCtx = sCanvas.context;
    const sGrad = sCtx.createLinearGradient(0, 0, 160, 260);
    sGrad.addColorStop(0, 'rgba(255, 240, 190, 0.16)');
    sGrad.addColorStop(0.4, 'rgba(255, 220, 140, 0.07)');
    sGrad.addColorStop(1, 'rgba(255, 200, 100, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.beginPath();
    sCtx.moveTo(30, 0); sCtx.lineTo(120, 0); sCtx.lineTo(240, 260); sCtx.lineTo(140, 260); sCtx.closePath(); sCtx.fill();
    sCtx.beginPath();
    sCtx.moveTo(210, 0); sCtx.lineTo(290, 0); sCtx.lineTo(390, 260); sCtx.lineTo(300, 260); sCtx.closePath(); sCtx.fill();
    sCanvas.refresh();
  }

  g.destroy();
}

// 1. Casa do Ferreiro da Vila (112x84 pixels — matriz 56x42 a escala 2x: Telhado Sólido, Forja, Bigorna e Armas)
function drawVillageBlacksmith(r) {
  // Base de pedra sólida e paredes inteiriças (preenchimento total sem vãos)
  r(C.stoneDeep, 5, 17, 46, 23);
  r(C.stoneBase, 7, 18, 42, 21);
  r(C.stoneHighlight, 8, 19, 40, 2);
  r(C.stoneDeep, 4, 38, 48, 2);

  // Chaminé robusta de pedra à esquerda (integrada ao telhado com cinzas de forja)
  r(C.stoneDeep, 7, 2, 7, 15);
  r(C.stoneBase, 8, 3, 5, 13);
  r(C.stoneHighlight, 7, 2, 7, 2);
  r(C.steelHighlight, 9, 1, 3, 1);
  r(C.ironDark, 8, 4, 3, 3);

  // Telhado Cerâmico Sólido e Simétrico (telhas terracota sobrepostas, h=2 para zero frestas!)
  for (let row = 0; row <= 12; row++) {
    const y = 4 + row;
    const w = 24 + row * 2;
    const x = 28 - w / 2;
    r(C.woodDeep, x, y, w, 2);
    r(C.redDeep, x + 1, y, w - 2, 1);
    if (row % 2 === 0) {
      r(C.redBase, x + 2, y, w - 4, 1);
      r(C.redHighlight, x + 3, y, 4, 1);
    }
  }
  // Cumeeira e Beiral de Carvalho Contínuo
  r(C.woodBase, 16, 4, 24, 1);
  r(C.woodDeep, 3, 16, 50, 3);
  r(C.woodHighlight, 4, 17, 48, 1);
  r(C.mossGold, 6, 18, 14, 1);

  // Vigas verticais de carvalho na fachada com textura
  r(C.woodDeep, 5, 18, 3, 21);
  r(C.woodHighlight, 6, 18, 1, 21);
  r(C.woodDeep, 26, 18, 3, 21);
  r(C.woodHighlight, 27, 18, 1, 21);
  r(C.woodDeep, 48, 18, 3, 21);

  // Fornalha da Forja aberta com brasas vivas e degradê de calor incandescente
  r(C.stoneDeep, 10, 22, 14, 16);
  r(C.stoneHighlight, 11, 22, 12, 2);
  r(C.outline, 12, 24, 10, 13);
  r(C.deepBlood, 13, 26, 8, 11);
  r(C.redBase, 14, 28, 6, 9);
  r(C.fireBase, 14, 30, 6, 7);
  r(C.yellow, 15, 32, 4, 5);
  r(C.white, 16, 33, 2, 3);
  r.shine(13, 25, 0, 0, C.fireHighlight);
  r.shine(18, 27, 1, 0, C.yellow);

  // Mostruário de Armas na parede direita (Escudo Real e Espadas Afiadas)
  r(C.woodDeep, 31, 21, 15, 8);
  r(C.woodBase, 32, 22, 13, 6);
  r(C.blueBase, 33, 23, 4, 4);
  r(C.goldBase, 34, 23, 2, 4);
  r.shine(33, 23, 0, 0, C.goldHighlight);
  r(C.steelHighlight, 39, 21, 1, 7); r(C.goldBase, 38, 26, 3, 1);
  r(C.steelHighlight, 43, 21, 1, 7); r(C.goldBase, 42, 26, 3, 1);

  // Bigorna de Aço Pesada sobre cepo de carvalho no pátio frontal
  r(C.woodDeep, 34, 34, 8, 5);
  r(C.woodBase, 35, 34, 6, 4);
  r(C.ironDeep, 33, 32, 10, 3);
  r(C.steelShadow, 31, 30, 14, 3);
  r(C.steelBase, 32, 30, 12, 2);
  r(C.steelHighlight, 34, 30, 8, 1);
  r.shine(32, 30, 0, 0, C.white);
}

// 2. Casa do Cuidador de Cavalos / Estábulo Real (120x84 pixels — matriz 60x42 a escala 2x)
function drawVillageStable(r) {
  // Base e Paredes inteiriças de madeira do Celeiro (preenchimento 100% sólido sem falhas)
  r(C.woodDeep, 5, 17, 50, 23);
  r(C.woodDark, 7, 18, 46, 21);
  r(C.woodBase, 8, 19, 44, 19);
  r(C.ironDeep, 4, 38, 52, 2);

  // Telhado Simétrico de Madeira e Palha Dourada (cume em y=4, base larga em y=16)
  for (let row = 0; row <= 12; row++) {
    const y = 4 + row;
    const w = 28 + row * 2;
    const x = 30 - w / 2;
    r(C.woodDeep, x, y, w, 2);
    r(C.goldDark, x + 1, y, w - 2, 1);
    r(C.goldBase, x + 2, y, w - 4, 1);
  }
  r(C.woodBase, 16, 4, 28, 1);
  r(C.woodDeep, 3, 16, 54, 3);
  r(C.woodHighlight, 4, 17, 52, 1);

  // Sótão de Feno central no telhado com ferradura dourada e palha derramando
  r(C.woodDeep, 25, 7, 10, 9);
  r(C.woodBase, 26, 8, 8, 7);
  r(C.goldBase, 28, 9, 4, 5);
  r(C.goldHighlight, 29, 9, 2, 3);
  r.shine(28, 9, 0, 0, C.white);
  r(C.goldLight, 27, 13, 6, 3);

  // Colunas mestras de carvalho
  r(C.woodDeep, 5, 18, 3, 21);
  r(C.woodDeep, 28, 18, 3, 21);
  r(C.woodDeep, 52, 18, 3, 21);

  // Baia Esquerda com o Cavalo Alazão (crina, orelhas, estrela branca na testa e focinho)
  r(C.outline, 9, 20, 18, 17);
  r(C.leatherDark, 12, 24, 9, 7);
  r(C.leatherBase, 13, 25, 7, 5);
  r(C.leatherDark, 16, 20, 6, 5);
  r(C.leatherBase, 17, 21, 4, 4);
  r(C.skinLight, 20, 22, 3, 3);
  r(C.white, 19, 20, 1, 3);
  r(C.outline, 18, 21, 1, 1);
  r(C.woodDeep, 14, 19, 2, 6);
  r(C.leatherDark, 15, 18, 2, 2);
  r(C.leatherDark, 17, 21, 4, 1);
  r(C.goldBase, 18, 22, 1, 1);

  // Porteira de madeira da baia do cavalo
  r(C.woodDeep, 9, 29, 18, 8);
  r(C.woodBase, 10, 30, 16, 2);
  r(C.woodBase, 10, 34, 16, 2);

  // Lado Direito: Fardos de Feno Dourado + Cocho de Água Cristalina
  r(C.goldDark, 33, 22, 17, 10);
  r(C.goldBase, 34, 23, 15, 8);
  r(C.goldLight, 35, 24, 12, 3);
  r(C.woodDeep, 33, 26, 17, 1);
  r(C.woodDeep, 32, 32, 19, 6);
  r(C.woodBase, 33, 33, 17, 4);
  r(C.blueBase, 34, 33, 15, 3);
  r(C.manaBase, 35, 33, 10, 1);
  r.shine(36, 33, 1, 0, C.white);
}

// 3. Chalé Medieval da Vila (72x64 pixels — matriz 36x32 a escala 2x, 100% simétrico e sem cortes!)
function drawVillageHouse(r) {
  // Base de pedra e Paredes inteiriças de enxaimel (preenchimento sólido primeiro)
  r(C.stoneDeep, 3, 28, 30, 3);
  r(C.stoneBase, 5, 28, 26, 2);
  r(C.stoneHighlight, 6, 28, 12, 1);
  r(C.leafDark, 4, 24, 2, 6);
  r(C.leafBase, 5, 26, 2, 4);

  // Paredes de argamassa clara (Fachwerk)
  r(C.boneDark, 4, 16, 28, 13);
  r(C.bone, 6, 17, 24, 11);

  // Chaminé de pedra e tijolos à direita
  r(C.stoneDeep, 24, 2, 5, 11);
  r(C.stoneBase, 25, 3, 3, 9);
  r(C.stoneHighlight, 25, 2, 3, 1);

  // Telhado Simétrico de Madeira e Palha (centro exato x=18, de y=4 até y=15)
  for (let row = 0; row <= 11; row++) {
    const y = 4 + row;
    const w = 10 + row * 2;
    const x = 18 - w / 2;
    r(C.woodDeep, x, y, w, 2);
    r(C.woodDark, x + 1, y, w - 2, 1);
    if (row % 2 === 0) {
      r(C.woodBase, x + 2, y, w - 4, 1);
    }
  }
  // Cumeeira e Beiral de Carvalho Contínuo
  r(C.woodHighlight, 13, 4, 10, 1);
  r(C.woodDeep, 2, 15, 32, 3);
  r(C.woodHighlight, 3, 16, 30, 1);

  // Vigas de carvalho estilo enxaimel europeu
  r(C.woodDeep, 4, 16, 2, 13);
  r(C.woodDeep, 17, 16, 2, 13);
  r(C.woodDeep, 30, 16, 2, 13);
  r(C.woodDark, 6, 19, 3, 2);
  r(C.woodDark, 9, 21, 3, 2);
  r(C.woodDark, 12, 23, 3, 2);

  // Porta de carvalho com ferrolho dourado (Lado Esquerdo)
  r(C.woodDeep, 8, 20, 6, 9);
  r(C.woodBase, 9, 21, 4, 7);
  r(C.goldBase, 12, 24, 1, 1);

  // Janela iluminada com venezianas e brilho aconchegante (Lado Direito)
  r(C.woodDeep, 20, 20, 8, 6);
  r(C.yellow, 21, 21, 6, 4);
  r(C.goldHighlight, 22, 21, 4, 2);
  r(C.woodDeep, 24, 21, 1, 4);
  r(C.woodDeep, 21, 23, 6, 1);
  r.shine(22, 21, 0, 0, C.white);
}

// 4. Muralha / Paliçada Vertical Contínua da Vila (32x96 — fecha o perímetro até o Portão)
function drawVillageWallV(r) {
  r(C.woodDeep, 2, 1, 12, 46);
  r(C.woodDark, 3, 2, 10, 44);
  r(C.woodBase, 5, 2, 6, 44);
  r(C.woodHighlight, 6, 2, 2, 44);
  r(C.woodHighlight, 6, 1, 2, 2);
  for (let y = 5; y < 44; y += 10) {
    r(C.ironDeep, 2, y, 12, 3);
    r(C.ironBase, 3, y + 1, 10, 1);
    r(C.ironHighlight, 3, y, 10, 1);
    r(C.goldBase, 4, y + 1, 1, 1);
    r(C.goldBase, 11, y + 1, 1, 1);
  }
}

// 5. Torre e Pilar do Grande Portão da Vila (48x96 — matriz 24x48 a escala 2x)
function drawGateTower(r) {
  // Base de cantaria com musgo
  r(C.stoneDeep, 2, 35, 20, 11);
  r(C.stoneBase, 4, 37, 16, 8);
  r(C.stoneHighlight, 5, 37, 14, 2);
  r(C.leafDark, 2, 43, 4, 3);
  r(C.leafBase, 3, 43, 2, 2);

  // Superestrutura de carvalho
  r(C.woodDeep, 4, 12, 16, 24);
  r(C.woodBase, 6, 13, 12, 22);
  r(C.woodHighlight, 8, 14, 4, 20);

  // Abraçadeiras de ferro forjado
  [15, 24, 32].forEach(by => {
    r(C.ironDeep, 3, by, 18, 3);
    r(C.ironBase, 4, by + 1, 16, 1);
    r(C.ironHighlight, 4, by, 16, 1);
    r(C.goldBase, 6, by + 1, 1, 1);
    r(C.goldBase, 17, by + 1, 1, 1);
  });

  // Ameias defensivas no topo
  r(C.woodDeep, 2, 8, 20, 5);
  r(C.woodBase, 3, 9, 18, 3);
  r(C.woodDeep, 2, 5, 4, 4); r(C.woodBase, 3, 6, 2, 3);
  r(C.woodDeep, 10, 5, 4, 4); r(C.woodBase, 11, 6, 2, 3);
  r(C.woodDeep, 18, 5, 4, 4); r(C.woodBase, 19, 6, 2, 3);

  // Estandarte Real com cruz dourada
  r(C.blueBase, 7, 18, 6, 10);
  r(C.goldBase, 9, 20, 2, 4); r(C.goldBase, 8, 21, 4, 1);
  r(C.redBase, 7, 27, 6, 1);

  // Tocha acesa viva iluminando o portal
  r(C.ironDeep, 11, 3, 2, 3);
  r(C.deepBlood, 10, 1, 4, 3);
  r(C.fireBase, 11, 1, 2, 3);
  r(C.yellow, 11, 2, 2, 2);
  r.shine(11, 1, 0, 0, C.white);
}



// --- BUNDLE FILE: JS_Teste/src/art/uiAssets.js ---
// =============================================================================
// TINY SWORDS UI ASSETS - DICIONARIO BASE64 OFICIAL (GDD v1.0)
// Suporte universal 100% autossuficiente (Web Server, file://, Itch.io e Mobile)
// =============================================================================
const TINY_SWORDS_UI = {
  "ui_hud_panel_weapon": "data:image/png;base64,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",
  "ui_hud_panel_record": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAAwCAYAAAD0Kp9BAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAT3SURBVHhe7Zw9ruREFIV7FUSsgZSEBUw6moQMCQkIiBkRIJJJ2AJCmgQi2AASAQmsYYJJZxFkoOPRsa6/rl/bZVu8bumT7fo591adLv/0k9/tdrvdPvjwo39/ffvnzG9//TFtVa76x+fYj+ZdHtgHezH5QbOiaV9++93c8MFYfn719bzv+Y+Gvfvn3VQ3GaYD4Qo3kmFvfv9hwd+vX83btVDzqjDvNbmzP3Xisfc173HxyBOZp+3CMKHGL1//OKE6BmVCLTDZFOzTS9TStzVFLhbbsb4G+6/RsI7y8/yLaJq28ynRDnKpctka1u0FB35lmHsvLTo8692tMB1/8/z5HT99/mKGxy7rhRo9OrHPLy8/bWJLjFY80TUtlrO9dejNZFhcgjqWQGqgEU7GKBh3FIzbCnUI25f6xjqbSX+m20hdt3x+VwMKP3U4sb1QrwT7yg/54jv22TCdS3Xh8wpjMArtDRPfArWPhvmkcirVGa0yeeKFNBtmF1MrLCfOhEbAAeQGnILtR8LYtfixPtdW5TRs8XTtitQFkgFyQa4OJ3UUjNsCNYS88GNI1jAK5cTWJrYGxh3B0TFTMRhb+0nDdBANSwlFwVSbEXASS/FZfxbMq0SufdTzQ3XSMBFFmMzaxHLJPCVy88A5YX3yGhZXmO9GfLfofT7QbYGDEXxw7IUTkoJ9SjDnEZRixrLsCrNhaphyne4fDfPYC8bZAk0RbGNKecT+yRWmQj2L1YRywfaG8Y6EuaRgnxqt/VnnxSTuDMvddFCEdWfAgfZArTMp5aRye5M0jDcdD95Dw3uhXgn2rRrmi10qIMVGwoG0QI0r05K3bzqqhlGQULgG+18F5tkL9bZCXe1nDUs9h8WOUTDVZgScoJ74bD8Sxq7Fj/W5tirPrjB9fFufOiVSKBfk6nBSR8G4LVBDFJ/DeEpMsTWpUXCgV4Q5t+Su+uJtvU+JNcFUOfv1Qr2jYB4p2GcUjKXjJsNyQmcMQnACa/HZdjSM34r7Ui+WJ69hpZuOnCiDb4X6KXrbXwGOM+bfMo6sYTwl1iaGCewBY/xfaR1rvOnIGhZ/PaZAb8Crwy9MDfbfG8aRB/ZF26xhFKLgEcn3wsk9G+aXg/0icYUlDfNzWEmQAfeAMUbBuK1QZwSpWDrOXsNUUPrzShRNtTmCnvic9LNgXsyxlmvRsNZTIsvPhhNRg/3PpJRT8ZRow7QfBTjYHphADfY/C0+UYZ4tULMV6mTvEu1iKdgeCaW0Wlnb72w49p5xFA0TuQAMxPItMMkH70n++Ou3/eJ7ze7ACb3yJPNLcDbMLwf7RWQY/ZlWV3yf1oaxM5Ng3dXgxIyCcddATetqG/0RC8P4Ql9OZAu1RPeCkzI63hZSudkD+XG3wvw6pl/P9N2R4KCfCnEODCc1BXV6Ycz4uuzCML+W6X038EObL3wl3C6Ff0nJwfY12H8t1D2K3LzZj+jD3TvOurDFwvhObRwYt3uxZfJoQK8Z7LOVVl23ie219aqKZi3ecfZtffx3D37XeS/Wvn3Pfkfx/VefDSGOTccyieURexH/wc3CMG3lqhurzME4qAf7Ek2N/6MjLqD5wTmaRuj6g/H4bBd9WJgVP+rw4uNP7vji2bOJuN8CdXKwXw/UOgvm1Qv1hPygR4tPNIyCD46h2Sx/uEQJA6yBmobfsCNgDnuNsQZjEvqiz38IH3M9XNdzHQAAAABJRU5ErkJggg==",
  "ui_bar_timer_base": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAMCAYAAAAppE4WAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACUSURBVEhLY2BgYGBY3l/9fzhhkJ8YxGT0/oMwSOD9w9VDHoP8AfIP3GMwiRMrysAYXcNgxujuhXsMJgHzFMyzQwkjRwiIj+ExdA1DBeP1GEwQhqM9PAY9hrkVb1Ic1h6zMDAakhinx2CeQ9cwVDDMU7ByAuwx9AoOGcM8PRgxulthmKDH0A0ajBjdzXCPIbc+hhMGAEgMrIxn1S5EAAAAAElFTkSuQmCC",
  "ui_paper_regular": "data:image/png;base64,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",
  "ui_paper_special": "data:image/png;base64,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",
  "ui_bar_xp_base": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA6QAAAAQCAYAAAABDLIjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHbSURBVHhe7d3LTcNAFAVQqmBFDTSBxJIlC1as6IEtnVABJVEKyIkmPN+YfHDA2DmWjhBjyY7njY0uM0kuLmK7vLr+eLm/AwAAgJPpsmbmz9XW7ahB9P31aePt+XGjto9Vj/sX8vwA/G/5HF+avN6lyevlS/YV5yHHAfOTNWVtqI9avmxaew2mvXDaGrLT88DftTO9rA3TydowTvYv8LfynmR+sqYAQ/LZ8Zt6gTRTa3tBmWoBAADgJzL8tvZVIK0htO4EgLHyP7DMS9YTAH6q+7uyNUPaZkmHplA7D7c3AAAAcLSaLeuq3E0orWk1E2s7SHvzaf4OAAAAncyKGUqHMmfvPaS5PKcGUGEUAACAXXKGtAbSoVW5BwXSKk8IAAAAncyPQ4F055LdfYEUAAAADrVrEnQrkPpQIwAAAE6hZsvMmoPfQ5pregEAAGCMNjuaebMXSjt1prQu461qcM19S5NBnfnJmjKNrAuwbPkMgKXIsQ4My3un3T81e/a+h/QYeTJOJ4sG++QY+q/ydTM/WVOmkXXhfORYYC37CZhO5sZ9NoG0htLuk5Haz13y5MA08t5cmrxeYNnyGbBEec2chxwHjJd9zLSyPqlmza0w2rZMrAAAAHBKNYN+An3hMoCa4No+AAAAAElFTkSuQmCC",
  "ui_hud_panel_silver": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAAwCAYAAACVMr0DAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAS5SURBVHhe7Zs9jtRAEIXnFEScgZSEA5CuNiFDQgICYhABItmEKyAkEojgAkgEJHAGAlIOQQZ6lsoqf1PVP9O2F5Yd6ZM93V2vqp97eryr8eFwOBxu3Lz1+8OPLzMfv36ejmpX//Wr/JJP8sx8M+8m/2iuN/nR8xfzwGuWvLt4Mp+bX97gn79+Tn2TwXojrMMGyeDvn14t+Pb2Yj62Qo296a2H432Mf2/n8skvTnkos3VcGCw0+Nnb1xPqY0IWk8ECT9GgllYNoabvo07GKTEWp9zml/Am6zhvEeY4Pwr8WBjsOwWatTesp0ZLHHeBoxWs90/Pzo548+B8Jnrfgo+pxdmY98/uFenRqsG5+z62MYcZTC8ng/0S13sJRJPwcKKjUH8EapdgbCm+NM7Mp5/TbYb2XdvLNIDCVwGaU4PxGYyTf/LR7sBmg7W3aOO2FcxEFBqBRbZCnbUp5cvaPVrF8tAW6mywuR6t4EycxYzAQkv6HLcGNX3fXhpDgxd/jVgHN3eKlgq5DHgBRqB2CcYKeWe3jKnBFMrEegtqgfqnspVm1ObbdR4arDfe4EjIC0ZjRqDR1GffVrAuko3xGvZHSGiw8CIsoKeYFo2/nWgenBP7wz3Yr2D79rO7CTvnDXUPLJw36TV40TwcS1jLCCVt35auYDNYA6OrxKu1BczVC/V68IaxT5Ry+dhwBatR98I1oSzZqVB3TZirN2/LePbZYhVHBmdfchRh3xZwIjUYvxWlfGo3L0OD+SV3leAFqcH4DMZVDbbNOkpGsTVgwRmM25uWWuxLrmowBQmFIxizB6yhBuN7oY7OU4Oj+2Af6AWjMSNw4iV9jluDmr5vL41JV7BedpsWbREUypJcBrwAI1C7BGNF8T6YW0TEqcWMwEnsCWup1aP+4m2abRE1QbYzpgb11oS5tsxJXb1vMjgT2qPgkj5NWwvmybCxjPft4R5c+pLLRJm8B2pFumzfE9Zr9bTUlRrMLaI2URbQC/X+Zlrr9V9yqcH+v0UU6E24N7yIEYwZgZryzHzUMTWYQhRcu9AaNGlLmJtwvMev4NBguw8uCTJhL9QbhfoZjBsl0tX7dA9WQ+nflV40GrMWNX0atwXM6XPXaiga3LpFsH1LOMkMxm1FKV9xizCDde4FOJEWmDiCMVtgExbMn0GNGoxP7yLM9VKSNQvJ6Bm7JafWXzRYROJRIra3woKuEuE/e+zX2f65DAugKZdlFC/SljA34XiPDKaf0+r1zxeYwQxmcvbtBSc8CvVboIbp6Oj9FAuD+QPsTKSHWmG9tEx2a6K85pn8O1rB9nN3+/m7ffMKTuhfw8/Fb38RjG2B+v7xgYXB9rN3O7cBdtNsG3eGjfHYX4eE4yIY0wp11iKbq/nnfTt6RkMbs2/0zxj4wnk8hR4jaF5LLMf2UIq3Pp9HR1u13tzFMxp2m+Yf37JnNUboeZqHT/+sxcvH94exGnUuU30bMe/8A5wLg3XUVbDBarNELP5/x18A/4ycX6DzHxreZMKrdM0x9un3vi3M9S8FnN++c8TDu3cn/HkJxkdaLTB2K5i3BWoI+UdPFy9vMAWviWk21178CBAmaIEa2SdlFOZgHSNQm9BHvf4AD1TvOO9GfKgAAAAASUVORK5CYII=",
  "ui_ribbon_big_yellow": "data:image/png;base64,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ssdPxtqvhFojnpsePAM9GGMU65iFeUexL7Mwb8QaRzD22TizevE7U6jPnK0amPg9U08l9su9Mo73szVVm56k62oVbzIT179rUfHz3qEo921wwcZqYApqUb/PW+sWz8AzNAt/7H4RezKK39FR/J25EvayB8/61bD/Ixh78Tl+z+p956oGJr7j+fUsl3/dw8jedzzTV9CfbF5bRW8RC/AL6lqFxwJqA+taG7tnYso76m/F9LP3n4S9vjvWt3jFM3013M8ejDGCsXuxz4tn4D5fCc9uprm1Jpvn8Z7v+X4hu5eh7oJrWutaa6NWvcqfrqzYXnRg7xiYej82sD6zsZGWXu+5MW6IedT7BOz5t1HPE7DGHowxC78ri37s5eL5+D39NuqJtM5mfL91hrMZGe/5nu/H/OqS3preWVf+fdvAtAJtUf+rSxS2Z2C8HxtY19hY2dqgmiPbmK086noCHpoRjP1krH0U48/C78niGOzzLDw3PRhj8Yr9uhJqjbTOn+9m61qzccu8mKd1X3premdN/bxrYhz6W2K27mXPsjU+az23sS3ixpT34+dss3y+WCwWi8WdyGZknaGujfiOOM/jTN67F+/vzXfZWhP1F8/yv/wwGhrEfqD5AAAAAElFTkSuQmCC",
  "ui_hud_panel_time": "data:image/png;base64,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",
  "ui_wood_table": "data:image/png;base64,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",
  "ui_wood_slots": "data:image/png;base64,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",
  "ui_bar_big_base": "data:image/png;base64,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",
  "ui_bar_big_fill": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAIdJREFUeJzt1jENwmAURtGWdMMCIwYwUAfsWEAfAjCDgaZhLi64w3+Ogpsvb3jTBAAAAACMZH7fHkcdUVr2basbUqc6oLbcL9+6IeUCpue1bkgNfwHDDzAf6zr0HzD8BRigDqgZoA6oLa/PuW5IDX8BBqgDagaoA2oGqANqBqgDAAAAAAD+6QefyAtaYHGu5gAAAABJRU5ErkJggg==",
  "ui_bar_small_base": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAABACAYAAABr564eAAAAAXNSR0IArs4c6QAAAjlJREFUeJzt3LFqU2EUB/BP0QcQRFAE0aVLERdBcVWogw6CoJOPUEQHxVHcFPUhxEEoqIMBHyBDQEpxyVBEKFW6+AAOOoQk96ZtbK5Jvtxzf78pCQ2cfP+e03MhvSkBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQ3aHcBUzT25dP/kz6nrv3n4U6g0lVObNI5N/snjmcu4BpaXojw7xE6rUQk/zE6fODQF4/uJFWbl048HuPnbkd4gyq+vX9XZhf5irkf/D8W2vrafXFx8Hzna2N2p9dmA2wrzj8uu1O6rY7GauB+hrtn0kWi7oINQA/PF8ZPDb4YDqKvVTssQiO5C5gFoqB3XzYSim18hWz4JauPM1dAhn9K//+wOu2O2np8sV5lDRXoTbAUb3hB1QVvYdCboDDv1Sxw4N5iLj59YUcgPu5tnxq12tvtjYyVLI49jqTJpH/7vw/f93OUEkeoS+BAcYJPQDPHW/UggtTF72HYn+6VA5w8+dOxkoWkzNptr3yjz70isJtgL7/B7MRsbfCDcCUhkF9ev84cyVQb/0eijj8Ugp2Cfztx9Hh47X1lFJKq/eul37m7MnfpeeX7nyZfWEL7NWjq7lLyEr+5fyLPZRS7/9/e8qvRxFyA9zP6PADyprWI6EGYPFOFaOaFixUNa5XxvVYHdX+djZ9xVtiTSLCLX3+R9Vzi0L+ze6bMBtglEBg0ek1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABruLxpyjuStQ4HlAAAAAElFTkSuQmCC",
  "ui_bar_small_fill": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAADlJREFUeJzt0AENADAIBDE2Yfh3xWR8MloFl6sCAAAAAAAA4H9nuicdkXTTAWnrBwAAAAAAAADAAg9r4gKAQqsxeQAAAABJRU5ErkJggg==",
  "ui_btn_blue_regular": "data:image/png;base64,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",
  "ui_btn_blue_pressed": "data:image/png;base64,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",
  "ui_btn_red_regular": "data:image/png;base64,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",
  "ui_btn_red_pressed": "data:image/png;base64,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",
  "ui_btn_blue_sq_regular": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAABUVJREFUeJztnTFrFEEUx9+JRVLYWAghFilSCIpFSL5AqhAQArFJmwNbKwvzAc7CylaI7TURAoFlK7/AHRYSIYWFhUGwSJMidrGQSeYmM7N7u/PezO78f3BFbjczO+/9583b2Zk9IgAAAAAAAAAAAAAAAAAAAAAAAAAA0CsGUhVt7uxfS9WVOl+OPw2I/DZR53DDXgkc3w5uIbAWbjr/+ONbzuqSZ+fVu5m/XfYwz+MUAVvBuvP74PhJWRAR0cbWduMylGPr2kMXApcIWArtm/OJbgVA1E4E88ItguAF1nW+blDgFxWnCO6FLEzH5fxJWcD5Fnx24Yyi90MWVpXxqwbuHRyGrPaG9Rcv73x39WSZpS4iou/vPwQtbzwa0qQsvNFgc2f/OmQUCBpOlABsip2URSPH25yqYzp48ezcezw0Zn0m05Ojucscj4ZWEaihIKQAgkYAFzbnuxxrOuyqRb3czrfVYQri6ZvX3uMKXSh7B4c0JplkU0QAOlJhWsL5rnp9UUG/Lv08ZZcmEaMNbEmgjiv0Xz1ZDu4ojjK5rsF3HleeZBJcAKfTqfOY3vvNhj94eD3zMb/vInWFqJ/ny3l8tm1K0CGg6QW6HNxVx1eht+vyYr58LrQIRIYAE13xNidfXgx663wT1c5Yw5Z4Eqjjcn6d73JidW2XrWzxCKCUXuX8y4vBzadvuNpUJwr8+fWtG1PB89JHR/tIpb3JCCBH6ka4H18/s11DEgJIpTekjBLBo8fPg2bHogKwjXFw/izSdwPR7gLg+DRIYggA8YAAMgcCyBwIIHMggMyBADIHAsgcCCBzIIDMERNA1fJucIukrRABEqNqn0FoIICEkHY+EQSQDLrzJfcGiAgA47+fWM4nirwoFNwN+9KdBQKIjG0BiGQuIJoDLJ6dR0l0gBskgZkTbV8AcCNpI9EcAM730+t5ADg/TZADJESMTiImAGT/9ZAWASJA5kAAmSMiAOn57T4gZTNEgMwRnwoGaSEeASACP1msCIII7PR6JhD4idUpxJ4FTE+O7rw3F9yiTwCFfgu5D0SAzIEAMgcCyBwIIHMggMxhEcDq2i7r+21BOBABMieoAEK/yBjwgwiQOUEFoL/HlvMFxyAcLBEAzu8OGAIyBwLIHAggc0S3hi2enWe3Q0h/zu/61VD9WBYrghR93y7ualtKbU5iCEjJIFzE6uFV4A0hjFT9srjrPEmiRgDfmNg3Um1fUsvCUzVSW3w9P3YniL4sPLe7AkXd4YEbUQHo+91MEZi9IQW47lJ8zpfeRykiANezga6E/LbXqQu8bs+Xep4ifhegFK5eiJjj5JAiZs9XBF3AoR4Hu9QbY5mY2owiudmiLVX2C7nwhkUARETj0ZA2trat52G9oB2X4ydlQXsHhzd/hxQA6xAwKQurCLjHt0lZEBHNGK2raxRUW7hgSwKV8ds2oM3/j0fDVnVzMykLb/tsQg4N2xCgMJ3gGhZcKCPM838+o85bPwfm9enXZB6zOb8TOYBO6j0xVVw9v3MCUEAI9agK+Z0RwLP1dTqdTkNW4UT6hxak7tttNuzMXQDR/wYQUWshpPazM1XX01Ygym7cBN/Jo0eBqkYsLK00qsO2uEJ6NtFWd9Mp47+/f3qP650n9O4r1mcBTR3sw+boGFPJUtfBYUOd4ALQFTo9OWJvQJ9ZWFqZGUo49l6yRABOEdjCbIynitzXIeF8IoYcQMe8K0gtkUsVM4Hk3HXNvp27am7AhVQWLEXTuyDuLfdi+/lzFUKqjgcAAAAAAAAAAAAAAAAAAAAAAAAAAD3lH5tCNLOx0v5MAAAAAElFTkSuQmCC",
  "ui_btn_blue_sq_pressed": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAABMtJREFUeJzt3T9rFEEYx/FRLMwbEESLNIKgaHOvwNQBkTQhXXwXEVIEzLuIXbAREazjK9hGyUHgmi0MAd+AdrGQkbm929nZ+fPM3M73AxYml72dfX777N3t7J5SAAAAAAAAAAAAAAAAAAAAAAAAAABgk9xJsdBXrw9vUyx3qr59+fC/DrZtZz4ulqgLpPAyYgYh2oK6xX/35mWsRU/W+8/fV37Wt926j40VgigLMYtP4d3poo7ZZmYQYoQgeAEUX17MEAT9cW3FX8xbpZRST55tZ10PpeKF4G6Mlamh+CYdhJxibfN7vn/o84q/hA0XS8qxjO0wr14f3vp2geAO4JLExbydVPFTc91eMbqAdwdwpQdyfH6R9Hmez2YrP7v/cDvpcyqlVPP1U5LlnhzsqMW8Tf56I2kAFvPWu/DrCtrVLfCfm9bruULMdvecnveyaUYtV2+3k4OdpCFIFoB1xbcVNfbeKrH3256rG4rZ7p719yYzLMfnF0lDEBSAy6ZRyuE41Ff4VEWSLL5tHWxFtnUvvb1cusZl0zh1yz7eARhaub7WP6Y4v58+Wvr/1tW19fElFN6k18flEGF77PH5hfp4+rb3b8ceXkxRPgewMdO5rkC/nz5a+mf+fCpsweyO23xsyJ7tKvm7gD62Ak+p+DbdwA91ONP+0VmUdUjeATQz2X0F3rq6tv5u6vTYxx7Kfv38kfej4DF8ClxD8TXp7icSAJ1oir/MNrahLmB7UTiGeAcYYm6UKRdf27q69h6nDsGDxy+8Z2KJBWDM3h+yUTZVrvFmexegVB17+Bg5tkfyDlDahzObRGLbZXsNwN5fhiwBoPjlKO5dAGSJvQhkry8THaByBKByBKByBKByBKBwqSeFEICCScxyThoAiSlNUyU1xZ0OUCCz+CETPl0QgMJIFl+pzKeDsco8Azjb/XdtQcog0AEqRwAqRwAqRwAqRwAqRwAqRwAqRwAqlzwAOW7bAnciHYAQ+Nn4s4EmQjAOZwMrJrmzJD0ZdNk0K3fHwjDzhFCq+xBqdIDKEYDKEYDKEYDKEYDKEYDKEYDKBQdg/+gs2l0rIY8OUDnvAITcnhTloANUzjsA5t0pY922FPKCTwZRfHf6LJ/Ldx1J3V9R9NIwc6C13UCy7xRv7nkS2aaE5R64JN+xTmpG0Do1hWCdEsYvGgCXr1ebOpcvkpI8PBZxefifm3bSrwnGfMGl9HYQPwT0DbCWTlDaOJkWLmhozzd3jsnNCu6+BZxyyw81mVnBSi1/tWn3WL8JIej78CYW2+sDiXsEJesAfZ8QburhIMZ6685n/nN5jpSftoq8C9BJNjuBUpvRAaRI7/la0gB8PH27NFlkdWBpB6ovSol3cYVcYbTU51qSdwA9gByzhlJfVZOS1Em2aAFYzFv15Nl27++lBrSYt0qp5a+v54xlvyhzAvVGz81cj5ODnXwrImAxb6N01SI+Co5hXQinGoKYO1zQvD5zVpDe2LbDgAtzcK7LGtogoeskSY+lb53XHeJC5mdG6wDH5xfq5GDHq4CaT7JLOfyEGBpD9/dm8UMFz+ztfnP1VNtuKbrFD52dHT0AGkGIq2+vzx4ApcK+vx7+YlybEfXiDoIgg4tyAAAAAAAAAAAAAAAD/gLV3O+nHHRxZgAAAABJRU5ErkJggg==",
  "ui_btn_red_sq_regular": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAABTBJREFUeJztnbFr3DAUxt+V0ilwW7O0kCkhcOmcQLZAKHTrGPJXpIWstwba/hXlxmyBEsgWSOaeIeSmg3RJt0CmLNchqNHpJNln6z3J1veDDLF9lqXv05MsSzYRAAAAAAAAAAAAAAAAAAAAAAAAAADoFD2phL5//DqTSit1vvz61iPyl4k6hhv2RCB8M7iNwHpyU/yj0zvO5JLnx+f3c/+7ysM8jtMEbCfWxe+C8MWoT0REg4OH2udQwlYtD90IXCZgOWnXxCd6MQBRMxMsC7cJgp+wqvh6gQK/qThN8CrkyXRc4hejPsS34CsXziga1E1ltV9lcG94HTLZ//zcWl/YtrvC189du7oNer6L4TYR2aMBVxR4HepEOi7x6whvE1XHFPjyUe6uc7qzUZre4XhS+XyqfC5oe8EER6d3C3cHIWAxgIlNfJewIWssZ+13pWEaYrqz4d2v0I2yN7y2moADEQPoSIVpCfFd6fqign5d+nGqXJaJGCFg6wTquEL/7kovuFAc5+S6Bt9xXP0kk+AGOCnOnfv02m9m/M2nzbk/c3sbqWpE/Thfn8dXtnUJ2gTUvUCXwG0Vvgw9X09nN0v9NrQJRJoAE93xNpGfzm46K76JymesZku8E6jjEr/KtpxYXefLv7gBlNPLxO+y6K4IV3YHQUT098/vdgwFL0uXBbeRSn6jNgG5U9UE95NNtmYgiQiQSm1ImfvJc5Px9t2HoGPdogaw9XQh/jzSdwPRmgAInwZJNAEgHjBA5sAAmQMDZA4MkDkwQObAAJkDA2QODJA5YgYom94NXpAsK0SAxJBc10AEAySFtPhEMEAy6OJLrg0QMQDafz+xxCfCjKDomGFfurLAAJGxTQCR7AuI9gEuH2dROjrADTqBmSNugNgLN9uAZBmJ9gEgvp9OjwNA/DRBHyAhYlQSMQOg918NaRMgAmQODJA5IgaQHt/uAlJlhgiQOeJDwSAtxCMATOAnixlBMIGdTo8EAj+xKoXYs4DD8WThvbngBX0AKPRbyH0gAmQODJA5MEDmwACZAwNkDosBVtdvWN9vC8KBCJA5QQ0Q+kXGgB9EgMwJagD9Pbbq3bYgbVgiAMRvD2gCMgcGyBwYIHNEl4ZdPs6yWyGkP+d3fTVU35fFjCBF15eLu/KWUp6TaAJSKhAuYtXwMvCGEEaqfto+ZrMYNQL42sSukWr+kpoWnmohNcVX82NXgujTwnO7K1BUbR64ETWAvt7NNIFZG1KA6y7FJ770OkoRA7ieDbQl5De9Tt3gVWu+1PMU8bsA5XD1QsQcB4cUMWu+QswA5vdvpTKsFqNILrZoiuTTVLY5gcWov7D9frIp/qh47eq2NeK7yqcY9dnmWLJGgGLUp8HBw8J2bhMo8+0Nr8XS5MJWkULC1glUhd80A01+fzHcbpQ2N8Wo782fzcihCdr7sn3a3BTBFhF8qEJY5ne+Ql02fQ7M69OvydxnEz/k5Ft2AxClXxNTxVXzW2cABYxQjbKQ3xoDHA/26aQ4D5mEE+kPLUjdxtrKMKQB2McBjgf7RESNjZDaZ2fKrqepQVS5cRN8CE6PAmWZ2OpNa6Vhm1whPZpoS7vukPF4tubdr1ee0KuvWJ8F1BXYh03oGEPJUtfBUYY6wQ2gO/RwPGHPQJfZ6k3nmhKOtZcsEYDTBLYwG+OpIvd1SIhPxNAH0DHvClLryKWK2YHkXHXN3niWjQ24kOoFS1H3Loh7yb1Y7ylXI6QqPAAAAAAAAAAAAAAAAAAAAAAAAAAA6Cj/AEhvJ3R5d7SGAAAAAElFTkSuQmCC",
  "ui_btn_red_sq_pressed": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAABMFJREFUeJzt3bFy0zAcx/F/OUZgZGJgYgll7sDGXY8HoBtvAXcMXbp06B28RbfyAFzuunXwTOuFiYGJkXQPk0BxYlm2pL8U6/u560ASHEv/n+Uklm0RAAAAAAAAAAAAAAAAAAAAAAAAAACwTw5SLPTL24/rFMudqw/fPv+rg6vv7NfFEnWBFF5HzCBEW1C3+Mfv/sRa9Gwtvz7Zeqyv37qvjRWCKAuxi0/h/ZmijukzOwgxQhC8AIqvL2YIgv5zbcVv2pWIiBwtHmdek3gheBBjZWoovs0EIadYfT45OVO2/hI6bh/4jjAxRoHgEcCn+E27ovgj+PZXjFHgYfASBpiGnF61Sd/n08vjrccOD34mfU8Rkfe3P5Is9/xkIU27Sv55I2kAmnY1ufC7Ctq1WeCfcrt+Pum9QlwevvB634u75ajlmn47l0XSECQLwK7iu4q6vbV2/z2Oxtbveq9uKC4PXzift9lhOb1qk4YgKAAXd0s5fnc0+Lq+wqcqkmbxXevgKnJ3He3Xmv7yGTUu7pZeo2WfyQEYWrm+oX9McV4/2vxge3PvPtRQQuFtZn18dhGu155etXK96N/Qxu5ebFF+B3Cx07mrQK8fHWz82Y/PhSuY3Xbbrw3Zsn0l/xbQx1XgORXfpRv4oRHO9uasibIOyUcAw052X4Fv7tfO5+bOtH3sruz3r+95fwoeY0qBayi+oT36qQTAJJrib3K1bWgUuD4b/vblQ30EGGJ3ypyLb9zcrye304Tg6bNXkztKLQBjtv6QTtlXudqb7VuASB1b+Bg5+iP5CFDajzP7RKPvsn0GYOsvQ5YAUPxyFPctALrUPgSy1ZeJEaByBKByBKByBKByBKBwqSeFEICCacxyThoAjSlNc6U1xZ0RoEB28UMmfPogAIXRLL5I5sPB2GYfATRnHaUMAiNA5QhA5QhA5QhA5QhA5QhA5QhA5QhA5ZIHIMdlW+BPZQQgBNPs/dFAGyEYh6OBFdPcWJIeDLq4W25dHQvD7ANCqa5DaDACVI4AVI4AVI4AVI4AVI4AVI4AVC44AG/OmmhXrYQ+RoDKTQ5AyOVJUQ5GgMpNDoB9dcpYly2FvuCDQRTfnznK57pbiKF1fUXVU8PshtZ2Acm+Q7y550lkmxKWu+GaprZ1VjOCdqkpBLuU0H7VAPjcXm3ufG4kpbl7LOL08Nv181l/JvD50Nf32tTUdwF9DaxlJCitnUwLVzS05dsbx+xmBXe/As55yA81m1nBIpu3Nu3u6/chBH0/3sTi+nygcY2gZCNA3y+E+7o7iLHeZuSz/3zeI+WvrSrfAkyS7ZFAZD9GAC3aW76RNADXZ0cbk0U0Gyby/5btYSdXpD0xY+h9Uh9rST4CmAbkmDWU+qyalLQOskULQNOu5GjxuPd5rQY17UpENm9fzxHLflHmBJpOz81ej/OTRcY1Sa9pV1FG1SJ+Co5hVwjnGoKYG1zQvD57VpDpbNduwIfdON9lDXVI6DppMm3pW+ddu7iQ+ZnRRoDTq1bOTxaTCmhMSXYpu58QQ23oPm8XP1TwzN7unavnOuyWolv80NnZ0QNgEIS4+rb67AEQCbt/PaaLcW5G1JM7CIIOTsoBAAAAAAAAAAAAAAz4Cwg/8mH3+iGrAAAAAElFTkSuQmCC",
  "ui_btn_blue_round": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA7xJREFUeJztW79rFUEQnvcUU9oFhIB2dimEQIIpBf0LxFKwsFOwNlWsBe0sBEvxL1CwjLxAwCKdXYRAIJ2lQoiFTti3Nzvzze7e3T59Hzx43I/d+b6dmdud25vQQLj34MW55/qP759P+rIlRG+deAlb6EuQqo1apJ+8vQ218/rRF/V8TTGqNJQijhK2kBKkhhBFDUjEEdKzozPx+NaNS+a9khglQmTfGJPXiKcIW9AEiYXIFSHrppC8l/je5+9q29t3rneOoULkiOC6IWfULcIWWJC+vAG+0EOeDfq5dQ1tXsXK7ATuk4GKAF2Eunxt4jG8QiAimBcg5MNO+yLPYBFQeywR1JOtkWfUFGGKdNgS+biv1CQJnYQlBbCmtTnkr/zAfggQERgaF9E1LNf3kEcJpfDrqn7eCgcrFDoHapEvJR5DE6JEhGQItETeatMKBy0fzAmgxcqY5JG20ZwQcxQ9QFMsRd6TwEqg9aMNTIrThQDo6KeMGhpWn6gXdDzAO/pjkNf69nqBORGyRr9lILZPibACZmujr9mATMyY85wHxC6iKdgCeYZmS8wh5gitBYac59cCajMkQIyWRp+Ra9N0dW296guMRcLq2vr5hAV49+3V3MnUzK/F0Q8Rrhm0NcLDm0+JCAiBRYx/BmJ7Vg74l7AUYGwDxsZSgLENGBtLAfhP7hvcRUTI9bJ0InwRuTI7Wdi5QDgRIpIH+cID3tx9NnciVRixytRjImVbzCXkOj09PhxkN1aLOD0+nIhJ0MoHLXqBZVOKE/QUiGNpEYDaPCcAmgeI2vICzRYt/on+CiDlgdhlJEVbEEGyAcn+zNkMgVp7/cYAYntHgNBFWvcC7+jH7k8UCKA9Di0lxxDB6lOzOeQqhoDXC9igIYTQ+vGOPlEkAOoF2iOmTxFK9ggwYo7JJCh5wZgieMkjo0+U2CITlsoff3p5cZwXSa1vkUmRlzw86fIpEYj+CJG7SQoB6kEx+ThfWeSJlBDQ8sHs6Iw2djZFQzRwArN+CMI+N3Y21fWLxgVaC6RiKBZhiDVD3E9oQwgt7kOYS2EtFBgHu/udY7WLKJK4CHlruQ/VAhARiGQhGF5BNG9KESfykSdybJePX6LmClEClDgRRp7I+cGER4Swrpi7zSacd2hJLpc8UeYnM2hIIB9BIUDJ55T3suuBHm9goIIgJfqSUQ9RVBCVNlcgQpRAeryVFHarVIQlIW5t31eTlgcHu/v0de9D53iNivagn86iglhPkeY+nZXwX348raHVz+d/A8VcQRf/0Hr3AAAAAElFTkSuQmCC",
  "ui_btn_red_round": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA8JJREFUeJztW7FuFDEUnDsQDUhUBBDpkJCQIA1CSkVDQT6AiiINiO/IdyBoUlDxAUdBc1UkRBOQkJDoEiXkKiTSnBSFAnz4fPZ787zeXR+6qU67PvvNvLHX9noH6AifX788t5S//+LVoK1YfLTWiJWwhrYEKVqpRvres59UPV/eXhXvlxSjSEUp4ixhDSlBSgjRqIIYcYZ0ilDuf5sIkf3HkLwUvGbpFCx15oqQ9SefvJX47U8XxLq/PzhbuMa2kSOC6Q85WdcIa3CCtOUGuqCF/PvtKwCAR9cusdWLGE+mAIAnu7+SZXJFoAqxli9NPIRVCEYEtQBD3hEH2iPv4EQA0kJYRBBv1kbeoaQIQ6bBmsiHbfkx+GAnYUlltOznkD86PqXK3bxxmSqnOYFxQfRiSfIs6RQ0MZqKsHChFPmmxENIQjQRITkG1EReq1MbE6TxYE4AaTnbJ3mmbmZgBBY5Rh0gKZYif3R82ip5ph0pMSlOMwHY7KeC6hpam6wLFhxgzX4f5KW2rS5QJ0Ja9msGE/sQ4DYwa8u+FAMzMXOc5xwQWkRSsAbyDlIsIYeQI7UW6HKeXwpszJQAIWrKvkNuTMO19Y2iLzCWCWvrG+cDJ8CPb3fnbqZmfjVm34e/ZpDWCNfvfAVAdIFl7P8OTOxZY8D/hJUAfQfQN1YC9B1A31gJ4H7kvsFdRvhcL8Zu+AuG8WS6tHMBfyIExJM8c8Djnb25G6k3LuyefR9IxRZy8bkOTw72OzmNVSNODvYH0UFQGw9qdIEWU4oT9RQI+9IygI15TgB2HADqcoEUi9T/gb8CxMaB0DIxRWsQIRYDM/o7zmoXkFxQO5jYFwTwLVK7C6zZD+0PeAJIj0NNyT5E0NqUYva5RruA1QUuoC6EkNqxZh8IBGBdID1i2hShyRkBh5BjchCMuaBPEazkmewDiSMy/lb5h53N2XW3SKr9iEyKfMzhScunRAD+CFHjIalwvNLIA8o5QSdCKIDD4ejfweaul8w++Vtb8fPITgBpbKPWAqk+5Dc8nkw7WTOE7WjkNahLYakrOPhOcCjtiJi4DHltuU/tBTAiAHEhHKyCSG5KEQds5AHDcfnwJWquEE3AEgc48oDxgwmLCP6+Yu4xG3/eIW3S5JIHMj+ZYbtE21+NAXbLh8jeD7S4waHUd4NAs6z7aLQhGjtcwQjRBLHHW5ON3SI7wjEhdjcfioOWBYejM2zvfVy4XmJHu+iW+Ojpc/G4DSuI9hTZevemrk9nY9DEsKIkaR+dvRSxCtIW4RC/ATf+P6rsYUWuAAAAAElFTkSuQmCC",
  "ui_ribbon_big_blue": "data:image/png;base64,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",
  "ui_ribbon_big_red": "data:image/png;base64,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",
  "ui_ribbon_small_yellow": "data:image/png;base64,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",
  "ui_ribbon_small_blue": "data:image/png;base64,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",
  "ui_ribbon_small_red": "data:image/png;base64,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",
  "ui_icon_01": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABNxJREFUeJztWzFLHFsU/jYGnmCthc9IEqKkkK3SCKlCQMFiH4/3CwKSKmCTX5FGSBWE/IftEpBUARurxSIYiSLRIq8WtBBf4TuTM2fPuffce2eWLNkPhjizM7Pzfee755x7ZwNMMMFvjc4ovmRzff2G/t758KHD9/nxUTyLxMgFiGHUQtxp+ws219dveqvTSee3+DhDaFVtIsMF6O9dAgCeP/qjOjYz26mOE0blhFa+REZROuDi3+EgayIA7QvR6M0t+2pDQIowM3v7KDER5ha61YU/vg+Kn78xATTy0uYSOSJwAQglQhQLYEWdkwd0AYC6CPwcTYT+wXn19/vNh3ix863azxWhlSrgsbwGfk6ocrzffAgA+PzuGT6/ewZAd4YHjQnQW52uNsBnec89PSgRoUiAWM22bJ8CLmpvZR4AKusf7p8MnZ8qQrYAcwvdGz4mLUgRUl1AkG7gIhzun1TDgp7Ne9/WO8Em0VudrhHlSTAXSR7VlO2tzLvGqpXtraYohhh5b1UodoBnGITQRLIsQbYDuBUBYHA6he7idfB6IpaaF0KOkE5I7QeSHBC7+eB0KuV2JmZmO7UNuBVJE4oHIqcZyh4COQnIiqRnzJMYJASJQf/2VuazptJFOUATIdcFscQYOu/tXw+qY6kiNFIGJenB6VSWEB7LW5BzDy+SBUgZZyVukJYnhEQhEVJc0HojJEVIbY9THdE/OEf/4NzdDY5FJyirQkhEng88IjQqwPHZheu80kanv3eJ3aMr7B5dRc+NiVAswIudb9EGSEIb27mQrtg9urptz/+fOQK3OcHKC9nzVans1tpS5YAHf84MnS9FsuYGMWgrRV5oC6yNDgEifnx2MTQcQskwxw2vXz02j9MmMbfQvZGByxZAlsPtj1+HztFE4EJocwLZ6XHI6HOSFunqWmPSVrxkY02RNfChERoSEny1OEQyhqcvPwGoB6+VMmipzR2R0i329y6D5GlVKAeNvRfQnLC1tlTbPz67CCZIzQVU6jTykvTyk/u147QP/Iw+UHdAo2+GrJrLhUgRgdf5168e14h5Ik4CWOSBEXWCMkFqDRMNB17PCTL6ueQ13I3eqSVoTtBqPCfvjXwI5FJyQmMC5L6ZSYGXPB/79NIE0N3QSA7wkufdIjDcMdJnOZYncPIcVh4ozgEpkdeaJQ4tOaYiVhJlEixyQKz0WYR5oyRJ//P3PfWa1LHvqQBA4asxvr+1tjRU9+U+gRYtvDjcPzGtrcFLHsgUQCPfXbyuNvmZBS0HvHn7pXaMR94jQgp5IEMAi3wIlgh8iHgWU2LDQBMotoaZJEAO+RhiiXH5yf1g5EOfeRZw3X2Alzyf4HQXr10THhLBmkVaIPJWz++Bqwqkkuef0TEZaYqOvDeJkDPtleQ9DogOgRTbyyQYIx+CTIYWiPTTl5/w4/ugwzfP9UEBSsa8ZX35YN4H1gSR5F0PJmAKwMlrNd6CXOjg0Y89ZI4IpVAF8LS3WoTlsRTyEjwHxIiX/FAyWgW0yMfIx0pbCpY3tmv/v2B5Y7uWPEt/LqteLO2fAo18E7/pbQvRKpASzXEjDxgCWA+9/fGrKcg4kgcCjZBngZOQU+d/FZhDwEtinMkDjlY4ZcVn3MgDCStCMSHGkTzQwE9lgfElP8EEE0zwH1Z062tRNcJ1AAAAAElFTkSuQmCC",
  "ui_icon_02": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABVtJREFUeJztmj1rm1cUx/+qDVYQeHMMVSqiyg4diqYsgkzBYG8qpZ/AYDIFvPRTdAlkCoZ+ghDqLYGQKdAOmUSGksSWUew0sbaASAMW6qCex+cenXNf9GIr5PmBwHru83L+5+3e+8hATk5OTk7OV0vhsg0Yh52trYE8tvf48VhavggHaIJ9pDhjrh3Ahe+/fKee0/zxW/V4rBPm0gEy4pr433e+d77v//nvyDkxTpg7B4TES+ES6YiQE+bGAVqdh8TfuHnd+f7qxdHwugQnLCZZOQOsBlctl7BbXse9J68BuLUuhcvjTRypJaFxaRngE87hDmg2io54ijghHfPb/b+zv60s+Cba4kSuXqsP6CPHNPEba0vYWFtC7coZalfOnDGt00vxdIwf//XuD95nAjMoAU3w1Wv1welxq2AZsbG2NHKsXumj1VlwjoVSn8S/enFkniuZagZw8c8f3MbzB7fVMaLZKKriSyvDbK1X+sFncqFaeYSyYGoOkOK1v6mrV8slVMsl9LqjCUHiAajjGjz1YyNPTL0HcMEEn77ICTK6pZVCJr7XHWTirZWehtYXAH8WzKwJEmQUdwJ1do3YqPP7y9TXsoA7gTOxA3a2tgZabd268wwPH711jlmrOJ72Pvi0pommjxynczTGngWsjn7rzjPne6uz4KS7bymrRb/ZKEYtarTIP3z0Fr/8/N3IuTQrAWNmgCZ+d3N9nFt50TLDygJAjzLPwmajOLK8TnKAlu7U0QHbCXI+B4Dl2mr0c5uNojnmc4IWfUlU8fkWMAefzquofdID4G5iyCm8DEj8P3+9N6c9GX1ZBlZTk1AG0PO39w6zsdPjVsGbAVaD4wuYeqWPeqWfiQfcTKBxgsR/PPgQJYA/k8NLYRLMJmhFnRui1SgvBznXy7SP7f7AMDvI6U/ffAZw7oRquYR6pa82wRCqA6yoc2MkG2tLmWESKVyL/nJtFb3uewCjjuHP054xzL4SWh1dsG9J7TggJFwaIxlG6MwRwOudkAKXa6vOuPU8Lp5vm9snvawE5XY6tJ/IHBAjPhZuNEWV0MRb45azpUjXzvAGiqM2QdqbpxBTzyHxFk/ffDbLq33Sczo7p9VZcKZg3iNoIbQInEd//+U73P+pGmWURmmlENzhEVy8lv697sAUTfCZZ3vvUF2HRJeA9d7dR687GBEXygQZdas3pIgnaJOlrT1u3LyeLdMp+oAoARn91J1ZiFjxPG35SpO+S+SW+d6T19m0SB+5RyEWAX/0ZZRlmmtZINFqnaZCeW2rs2B29BS29w4BpTfw6AOehZB8OeETSQ4prRSCje3jwYfsfpp4Qk5zIXY3173vGSyC22GKOHeC1eyG5+nzubynZBLxsZkiow+IHnD3j7Z6oWZwyjLWd52cqlLh4q3d6Olxq6CJB5QM0CJOhPpBCF/Ka8jo+5qhlv6WaI5aAr7V2DhOyLbMHX28fdIbERST+sD4wonsRP5aW3ttJUXGlIAvwlZ0LeFanVtNL8UBagaQ4XwhkZLumvBQRH3jseJThBPeWUC+0ORYUyMXH5vGFrMUTjgX8jKQHbVe6QfLgMRflHBgMvFAwmtxvkIjqp+GhmrGab/ojLuym5V4QHkpamWB1rQ0w6b5enza6a6h3kz+kru7ue44wNo7xIiPKQ/r/tMWD3hei2s/Z1towlP7gG9DNgvhhPfGMU6Q4r8U4YS3CZ4etwopmRC7iAnt2i5COBGcBaQxlkM08SnCL1I0Z6yHqv/u8v+0lzKHA5cnnJjo4ZojeE+Yp1S3mNiAlB5BzINwYiqGxDhhnkRzpmaUzwnzKj4nJycnJ+cr5z8flvmTyD8ArQAAAABJRU5ErkJggg==",
  "ui_icon_03": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABSVJREFUeJztm79rI0cUx78Jwi6tSldY7owM8umqFNeeweLAlcFwhdOdyisOjuN8f4FjQkBFynOXdAdpTQJJ6yJV5DNEuMs1VrUqZQJKId5qdva9Nz929prsBwxC0s7u9ztv3rwZjYGGhob/M199iZu8PzlZxlx3/vFj7c9X2w1iRUvUZUbSRl2iX3/InG2MR23nd1KakaQhTbiPaA3JkFQmVGqEE97f3QQADM/uAQCdrd/yz2bzw+h71WVE9MW2eE04UcUAgjOiiglRF5riSTiwEs8JB4rif/3ukdg2GegilRHBF4SKJ+GaaAkfM2wjQk0I+rImHiiH/Wx+GCWcQzPDNKE2AzrdJ8uXT3sAePEckvj9wSJ/Pc82Cp99/kd+JB8TajFAE89leU54d2edM7faD4XPyATzfXrPNOT2bmUcN7XGRsHXri90uk+Cxrwtfn+wKPQ4R/90hv7pDNtHGbaPVuLIjO7OsmAe4C6WQqpQ1QAS//JpryCegxvvpnCudyW2jzI82i2+191ZYvhsfZ1tgh0V709Olj5GOCMAQEk8jcXZ/DD/s8XbvQYUTaDeph7n4PKBy4TQylMcK1Lvc4lIE2+PdxIsTZn//r0W9fsvm6X28nv+sW63Sk5wRoAr9Lmwt0UTmniitZflf8Ozexwc8/lDiwTAfw3iNQTymzoKEy7Z0Xh3iefKZIqG3je8oaYJGlouYA2g8P/h24HasFbkcFEQIt5GMoGIjQLvCHD1fndnKWZ3KdFRAuUwcwHBmeAbBRJBQ8DEp8SVcgGQZmVo47OZYlMywCx8fNFKW84El3iu92OhYSDlgZZ0oTn+fZeoLjThZu/RQ9tGtPYy4M9O6drhs43CtBhC9BCw0Sq90BXheNTGeNQuTImtvSzZytIkygDzQaQ631Xu2tgZu7+7WbiPr/jQPJAsAgA96fkIePWWv46u5SpCInY2qGyAlvRChgKN91dvy0ZwK8JUiAa8+WmSv3b1nhbu82wjHya3dwvvED04XuDgeFGbcKJkwOzzX/nCIdYEigJznW/OJJTkCG3ac1WAVUlSB3D0T2el9+xEZxsR0lYqKtcBW+2HvPfn2Qa22g/qGv/1h6wgmkt8XxLRgBBsE7Yd35cKnSrUWgjZ4394dp/nh0+T1X6BNgVWobUXtsPDDTMNNQm6MJMksDbh9udyuWqTsver4DUNckxuOvn3KAqAtJFAve+agWLDHwgohLSH4CLBp+jR8BVvom2ASPuCqgG+UQAAz99NS5+bZSwRIn48auc/hkhove8zxbIGSHnA1RumCeYiybcXadUHFB9eqgZJ/OX1NPogRuVpcHLTweDxulB5/m6Kq4vVz2j7g0WeH8gEs6Ywo+HH7wGg3GPSIscUz1F5W5yiwB4GXG+aQwGQI8HGXOtz2++S+BfnN7i8nubi7fuHkKQQooewIwEAri56uQmfJptsJBBkghTyL85v2PvahPxQ6pzzpS1yqTw2TTC5uugVpksObeUXIx5IaABQNOH2bqEmHskIri2AF8+JJqSwD/2Z3Pt8AL2mcwKEK/u6jAhFG+8xZwSCTojQa9sEoH4jXImOxF9eT4PK+aDjJK69At9sHGKGT5vjUTufEULEA5HH5DgjzKioejrUF9vIUPFAxZOi5hkCmxRzNIcUPTHigUQGELYRdpVWxQxt2MSKBxIclpbygmkGV676mOHKFVWEE8mOnafaTHWRQrRJ8n9CqMuI1MKJWv8lpaoZdYluaGhoaGhoaACA/wBPE6wkwcHfRQAAAABJRU5ErkJggg==",
  "ui_icon_04": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABYlJREFUeJztWr9rXEcQ/hSCisOBVzlC3BWubPChNCcOJHTgQuAqnRs3AkNwDoU4f4BBCITqJFhcTMBEtTtBQkCF4UQMxwkVQglJlUKHcFyEg8QqrlGKY57mzZvZ3ffjQiDvA8H7sW93vm9mZ2f3BFSoUKFChQoVKvxPMVdGJ19+/PQqpN0XBzuljOcbN8s4uQ0KJa2hqBBlCp7ZEN/g3fYYADDfrieef/X136m2WYXII7pvjGADrMGJsIQUYDIYAQB6gyjVNkQIF3luQ9b+gwTQBreIEy6Pk+9rrWvDNCMJmrF5xpdjWCJkVv7J5zfi6/Heme/zFEgIlwg+EHkuMvVLkTcZjBJj7J4c4O3oNMX3PddAFvnx3plJ/qerxdQfBxnt86AFjbx2P9+uB43xvvXCRR5Aitjq3IU5CLWlNpfHY0SbTTxpu3MDh0U8C27Wl65kFJgCcPjI07PVuQuszl2o7yXGe2eINpuYb9cxGYxyRwSBpsBkMEok4G577BRXFYB7P4S8RKgIhPl2XZ1SPHESKS0Cos2mMx/tnhzE1zIKUgJw8lOv3PAmOy38XVOCQFHgA/eo1l46Z/X4IiGeC0FTgKB5NYSoC5YItVaUqiXkdz7bQpAQIO396yTFYZGWqudJWLyP0GXWRb7R66ee8WmQKQIk8VorwotLtliw60e18Cp3MhgliBfJ9C5sb6xha/8o8SxIAGs+NXp9bG+sme8A4LzbcRKKNptxlJVB3IpOy05VgG57nKioNHDyn+48S7z75ulnsdqNXh+/LS+pfdRaUYo8D+fQ/KJFJtkI2OQBJgCf/zz5aDU9n1eSPD375YcdYH96f3t4ivNuRzWAL4F5E5mFV88fAAD6r9+YbTLlAInOygKAqcc5SJRXzx/g3uOX8XOtdrdgeZ+vGFp0Hg5rwBC49ckHHuunUAVwzUnyPqkryQPAh42P4vcWqBzm8IW8Rp7sedG6H78LJQ+wzRCvlrJga/8olVlnAUm+0etnJk92OivBvAgRodaKctcGPNy1tR2wyXdWFsw8kNgOyyiQ85TfU4daqLuST7TZjP/4MwvSBkmevO8Le8tBqQjYPTlAt32dsaUB591ObET/9Rt0VhZUETj5P7576DQOSItgLb8azu++wy3YAvBELKFOgd4gcm5PSYTtjTXnEkNtgbCylkSYDEbqiqGF/vndd84+JXl5HhDf3KwvJQ5A+LrN6wLumUQZLMBL4azzXuYKSwBZ4NCyDOhe147EzCTY6PXV4oVXiL56v0h1p9nDoVV3rlDXyAOBq4A8ZQEQn+RwQXibotVd6H6eYCU5izjBnAIEaypwuOZ3Hu/7Mr/0vkbeR5wQR8Db0emcJQJBZuaQuV30wCQPQskDAVPAygWcvBXmecjzlUCDy/tZiBOcvwsQrMoLcM9x67eB/xJMAaTSh8NaoYHyCsHFlwVXUe8DnggoWwQfZPhr4/G1vgyYApC6JMKj4x8T78nYspKcj7xre53X+4AQwOqIRwI3jIsQIoRso22MDoe1eAwSXZIvMwpShOVSyMlv7R/Fu6/15Uu18AmBtvv7/tmfiXuLPIFXfUUiINN5wPbGGvDz9PpwWMM6puE6364H7+ZkMSWJA1PyvhOlsqAqx6PA2nD8/u1f8bP15cvMA2sJLvQoqyzvAwECAEkR5PzjQgB+MYi4JLvYvBNfX5z9an7v295mhfmxJULZyxAnTrAEKJs84FgGZeeuM7/F5h2ViNaGt/N9wzEL8oCnEMoiAmAT0p5bbaX37z1+6dznF0WQitouUWZpIqSFrza/faGf53AjD4I7srbKZS5XPk+XSZyQuUPXmUFeMUJCfBbkgQL/K+w7PCkLsyJOKNz5rISYNXFC6YPkFeTfIlyhQoUKFSpUiPEPKoUIFMNg59IAAAAASUVORK5CYII=",
  "ui_icon_05": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABK1JREFUeJztm79rFEEUx7/R/A2pgkUgRRI4UtwVgRjCgaRKZ6kGhSCihIhlIEUgpSiiqAgRNaWdVZpDonBFrggHiUXAQlLlb4hoEd/m7bv3ZmZ3Z/cOvA8senvr7Hy/8978PIEhQ4YM+Y8Z6XcFLN60vv2JWd5JuwMAeLrxOKV5NOZLYvBk+1lU4cCleI2BMoCLP2l3cH9tBa2DI/P5ZmPGW+bbFx+c3w+MAVz8/bWV5H6zMdNjQohwwC8eAK6EVrBMLPEECW42ZnKJ18ok+h4BPvFEqHAAaB0cYXKuHvRsXw0IFe/C1UeE0LcUiCEeyBYZGn0xIJZ4oogJlRsQWzxQLA0q7QNii3/74kNwZ2dRiQFydhdLfAy8BoyN18yp6dlpN/NaIqb4oq0PGAa4RMvnfCaUEfZAHPGA0gn6xNeXb6K+fDP4eWIQxQOeUWB2YzO5iM6XzwCQy4QixMp5SSoFuBAuuudz9xjAhQlkiKSMZS0Qt/UBow/gYkf/iQWA89p08ie/LylDfGzhhHMUkCJHu8eJCRIePZ9evwcAfP/xtWj9Cue9b5aYeyao9QUcS3zr4Ch45hZLvKv/cBpgtTZhmUDiXWJ9JlQhHhCboq5OUPYFh9tbaoFcvFahkN2doktcS7zcEAUcESAFymiQBgG2eH7Pl5PzU4vO731Y5WviAWVb3BrT5chAhnCjXAb4KkjCtz6+Mv+tD142b31LPKBEgDW15UJ5NHBj8rZev8QDRgqcnXZH6OL3rbznzE8tBm9QzE8t9lU8EHgyJNNCy39pjm8OIKMliwGWwVnFAxmOxvKYEErW1t+881C9f/vBXQDh4oGMZ4NlmJAn9C0DgOx7FJk3NEJMcPHyVhPARQqQeNfZHUETomZjJpU+eTZlOJmnwnk6Ro084ssg11oglgkhcPGxWx8osCl6dtod4enATagvzCV/7+y3M6cJ4RIfi0LnArwF6gtzySVxRYgV3lK8691FiHYw0tlvo7Pf7rmvGQKke3JpAu/wqOVjhz5RqCDXXqAUfn79BoD0KADYwyC1ugz7mOKBAhEgxe+sTmBndSL5rEWDhjama+K1qXkMchnAxa8vTWJ9aTL5jptAcDMe7bYApKfKZAL/AURZIS/JbAAXr4nlWFFgmUC5XpV4oITT4e6vq6mIsNBMkJQtHiiwGFpfmkTt2m8AF6Ilz/dOeu7lWTv0NQLGxmt/6KJ7Wtg/3ztJLvqsoYnVTJGnTmWePKnuul64szqRavHatd/o/rpqitbwRQIZoJ06xY6IoD1BqvDh9lYSASFhzyubdSnNo0AaUepEyLU1DgBrZ7sAkLQ6dXgu8VrZVvmWCcClEaUZ4BNPFaQ00MLeVznLBOvYjZ9H8EiobC1wuL2VapXZjU3ce/cTAIKGO4lrKa0duJ7Xpr3HcEUIngfIyvFenwhtFe05av3R7nFycaxj+KJ4DZC/CAF60yPPPD3kedcRfCxSBrhapkzK3FHyEXQ2eF6bThkRq8LScGm2/FxGGgRNhHjIS/FFe2N6l2vUkVSyIRIy/YxREdfQa0VaZTtCsX8kmec9Zb4XGJD/NVZVtGkMhAGEZkQVewJDhvzH/AW/HZ87RQzVNwAAAABJRU5ErkJggg==",
  "ui_icon_06": "data:image/png;base64,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",
  "ui_icon_07": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAxJJREFUeJztmq+PE0EUx78QDLIVdwZ5gqQpqrkE7FoEshZVSPofoPkPSACFrTyBPcslpIrNJoiTmEPcycoiyCOzc29mZ978TJhPckl73e7u9zvf92Z2t0Cj0Wg0Go3/lQchX3758c3R9vnXt5+C9p8D8QlOiVep2QjRiXHiF8vb0fuhn7Pfrc0M75PRxevCdWo34mHIl1Xx3ekZutMzdhv6OwxHHIa//vmUUEq8RkE9aV28yuXNtXEf+91svO2Hz0WTEGwAN+qA3QSgHiNEJTBV9y6s1nej9912c+y2m+xl4Z2Aw3C8f/KGEuDSwSVDTwOQLxFRDOAwlYaKakYpE4JmgVBUk1brO7YsUp+Dt8N0UrFSQOilkatJJk3A1Eygoq8jcqUheQn4mADYyyKFCVl6wOXNdbQ0dNvN8eTJs2hGiA3guvYUoWlQiWWCqLFwUXRpiqN9CBvkfjdDf3E1+vz3rx/iBilKgN6RfcUD/mmwHSskDcEJkIgf7csxCbphX9Y/720jSUJQEwwVD7gnwcUoSRKKrgQJSTm83j1l/+9rQhUGSFm+es6+9qEaA6RNkcMnBUGzgGQtYN2vxQTbZzT6khRUkwCCE+p6D0HCoyh7iYxPOZy/e/Hv9ff337yPJU6AvhrLCY3+4wU/7fusB6orASmS0QcCDSiRgqnR9yU4AbFnAttxTOLV0fddDlfZBFV0g2OKByIY0F9cYbXml6UxIeHSWjdRfRN0veCS3hMI6iS05DRdmMSAe7pMKQi5EUJUnQDTo/WYVGtArtkl+iygjpr0Iep+NzPO81U1QapBuj2lR1YSYdvIh055HMnXAUM/d0qCKpwb/RTigUw9YOjn1jSUEg9kboKcCSXFAwVmAdUE/SEH/YCKSC0eiGCA2gh9uz53NUm/JMshHkjQBBfLW2u9k0k0c+j38WI+9nIhagmQKC4J9FtBdTud3OKBwGsBFfVWtOnaQBeujn4J8UAiAwjViBrFAxENANwfSNQiHohsADBtgkl8buFEkoP6PqAsJR5IZAAxZURJ4Y1Go9EA8AeGEphD++aitAAAAABJRU5ErkJggg==",
  "ui_icon_08": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA3tJREFUeJztmjtrG0EUhY9DTGArFcaVC7sWGGwcBInakDJFqlQqjCF/ILVw7T9gCC5UuXKR0rhVAsIhgoBqpUgVUqgShBROEe7m7mh25s5T63g/EF6Z1eycM3ceO3eAlpaWlpaWlofKRsrC371+cwcAo8ms8v8f378mfa4LSSpCwlW4EU0xIWoldMJPD5YAgOG0ANA8Ex7FKsgknl+/f/k01iOjEMUALr7fKXB6sKyIVyETtnf2tV0lJ8EGkPh+p0C/U+DF3s/ae02mrIugPvjh+LhsQZNwzs18q7w+ub4FsN6x4LHvD33E073cBBckXcbVTC8DTOKfPHu+cv+vTx8r38eLJfqdovy+vbN/RxUPHRd4WRKcQ69OvE44h5ugmxJjIzXBKQJ8xdcx6HXFJnx7u2e9Z/d8Xl5LI0EcAVw88M8AqXi1G1AUcGLMEtwEwB4JIgNCxQOrBqRiOC0wmswq0WUywboOiCE+N4Net/LXhNGAWOJztT6HZhmbCbUGxAr7dYgnyIS6t1NAuBR2WegQTRAuQWtA6HS3TvGueC+Fddwn4cSKAT5r/PsonHB6HVaFrnuQi4FzF2i6YJcBEIg8BuRCfZ32maUI5x2hzaNDbB4dej8wFN1egu/+AqAx4NXFRe26mQtfhwkhQuswRoDtgTlNkIj3MUhrQF0U/P78xfg9FSlanrAOgjfzrcogk0s0PTuE8cK+v9DIWSB2i59dXbrvB/BukDIE+TPokxPjIJjLhNCyk64DTNPi/4BoIUSDSaooCGlBQlc3yY6zyICzq8uNHCb4GBFqntMsQBkddWp0Qd22Vvf7ebk2s/m9araJsEWBU//mmWAfA1TxKpLkRx2UZyATKPEKmLfFnQe4EBNUA0w7tq5Jkt3zeaU86UkU74XQeLEEHLqCrvUpgaFDzRyZDLFFlgnn12G+qjq5vnUeFCXJCh3DaVF+OCHigYADEmoa29Z/TSHqY4pucNOVb8sNeh+RUQs2tYQuEcoZTWblR8qg110xzifdHrzKk0QCH6FpPSGprDQyTGVFyQ6b0J3o4Cao0xPwdwBVQ1RyMsRkSJ0JyQ0A9JU3nQeUzNE+hvgcyY32okMVlhyE9Dkd5nN2KKsBgNyEWMfjTKZIy47+qmszoQlnAzlJKsFbhhshXZ/nJFklYoRnDpJXRDWiSeJbWlpaWh46fwAndtSyvEmj0wAAAABJRU5ErkJggg==",
  "ui_icon_09": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABCpJREFUeJztWiFvWzEQ/rZOQYFTQRU6VSONwscGB4qD9gMKhoan4qGB/YCi4ILBsPAoI9VUWhVMg0GTpgxU114vZ/vu7Nem6vukqm38Yt/3+Xw+nx/Qo0ePHs8YL2o7+PTh40Z+9u3HWXW/D4WwoRpxjqciQshISf7r6/vtn//c/H4KIrgN5OQlcY6nIoLLuP3R0WY6ngDIkyd0LUKL+OMWAACu3k/M3+lChFL88YxnNorIAzEBPEalUFp+fCzreC8jhozmS/OzlqVigSX2yM8tnhISwAsyzGKQBo38+fV664e3W+EWgIKgxwsAYLZaYrZaukVIkc/BI0LIAyIiUNyYrezf8ZA/Phiqn/PYpSG8BEgED0iEklFAes0fHwy3yGrkyeNKCO0Ckrx33ZHn/L76qY5PY03Hk1AQlZ6ZGgdweIDWybu/N+4otx8rpCfsj442PNdotYPkEEqEAOD72zf32haDocvgXPzw5BmWfpt4gOzo5OLyXht5Qy1akJ+OJ+YYFcrMyBOkFwDpaKxBzlYNebkMeQBs5gGyQ+kFmiE5cMJR8ufX6+yYOfJAZUWIR2uJVDygfTzlKaV27VmOxWB4O/sl8kCDklhqe5ytlluzKg2WJEvtqec4yCst5IEGZ4HcQHyNa0bzz0rpLXCzvFLufnJx6SYPNDoM0YA88HjT5ZLLj+Z3md1icPcsJ85tsaL5aTCVflrcmT/D/+bbG2ExGG4FYS95oEEM4Ejl+DwWeA4z3HtkfOGIECc09YAaQyQegjzQwRKQBllmv9RGkMlNC8GbV2tTtUMLQeBuKeSCZ0tPa+oBteQ5UplhS/JAQw9oSV7bAYD25AHgVW0HVLmxZH67iM7q9DnyfIYt6W+pglSDTi5HAd9+bzkAdSWCqzMLcY5UlhfFaL7EdDxpes0WKooC8fM7D2qRPlrfNZo6id4LSqT29se6awQMAuTI750eAgD+fflVHKh0KnwsEbJftpAn5ETgp7ncZYVH4Fb5QTIT9JDP4fx6na3SWiq42njcJstNUwruVFgzRpshfmNrKZlPx5OtrbO0tFqI0Mn1eCoHyLk/iaSJQELsnR7e/hBqRTAJwNebnBX5v4U8X7OaKFof0vNSIngR8gCaFU6+VLAkEPmSCBZoy9HrBUUBSsVNTlxb67mCZS56W+MBiRD1ApMHcBFG8+UtaT7jOfK56k2rW6YokjOQu/WRkOS9ZerUrTOVv/mZI5V/RPOCpAdotX4NteRzz2nvH/CloJH3wpwJap7Qgrw2nuYFgH769L4PIJGNAaVITcbV3s5I8L64yDImRN4HkHCfBuVA1nt4K0pekELUjnA9QKJlpSYigudKnKPqJSlLWw20rVFDlDzQwcVIK5QCMNBm+e2sAED+5QuOGg/caQGA7mPPzgtAkEJ0FXd69OjxvPAfzDDZscrZPlMAAAAASUVORK5CYII=",
  "ui_icon_10": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABRBJREFUeJztWz1I21EQv5SCq1NcomsGMU5SRJduTp0CnQtxtkPBQdLB0KHgUGcDzkImp24uiohTFQdX61InV6d0sBfvf7m7d+/9P1IwPwiE/8fLu9+7r3f3AjDFFFO8ZtQm+eMH3a0hv7bZ2690ThMjQBKeowoyKieAC760OJO5f33zNPZOmUS8LWtgCVR4Lji//u7jdwAAmJtfLnVOb0odnaDeaAWFR6Dw0rtFoxDVkib4cH9V05758/sXXBxti2NR4enq8/GKQq5BuT3vHJ5k7uOkufAe9L9+zoz53xFgObMPX36q792edUffZxfa4jMoPIKTUG+0ht8+vR97L8VZJvmAUAg73tsQr1PhAQAe7wbweDfIXOPCU9QbraHlDzyhlSOaAO+PcBK48BScBA5ptZcWZ0aflPkhogjgg7c769DurAOAHL9VTTi/HH0QIRLomHzcPCQk5wEoOH4f9E/h+uZpzBFyUKG9CI0J8EwCXYSD7tbQ4xOSCKDC02vNtZ74PKq/JPzt+SU0V1cA4CXsocpzwTGCaCF0aXHGdMASorwmqpZEgAfa6iMBGoEALyTSyKERQUkIhc9CUmFJMBQqapyzrkgCdaCPd4MRCZg0aUR4kKQBAFktCK1sCpAILXpoOQTfO4Q0IDpxQBJ2Dk9M2wbIR0AISICUN1DfUTgBANnUViKBC+6x7bHrAbOaXWgHhQeowAc013oZIegkLcH5MyFtotDUn8Ozf4jOBLVUtLm6MhJ+dqHtnuTo/X9EeM3Gs/oeuAg46G4N8cPvcRVGwVMKGR6N8Y7t3T2aJqCllLGeOQbUpCS/IpGUsvIIlSUp76fgk6PCWyskrYxkVpwET7IU+h0JQScoZX0eR6WlsxIe7q9qlm9JQb3RGpbiBGOE59+tCfF73pWmv4MfRKh+ABBJgCY8VX+roBGCZ8W4/+FCS9csIiqrCucBrx9QEiwTk4jgz0QlQs3VlTEtKDPdlYDbZ0rCoH8qPuvxP0ECBv3TjCOUSKDwdHrygtYQAJ4dtRSCO7vhnEE1AVpNaa71Mk6JZn0hhJogqeCLIJXULo62xRIahekDNnv7NapG3DNXrf4cFglYIwhpYNAJSuGJE0F/mLe1KFJaXCk1RITH/FxR4OH+quYhQoOlgpNGVBi04nQRWiDVGSSgD5JMkDo9qW/AkaseMJavg74hOt7bGBUrvWkqQJqfmZtfzmidVSmOqghpK6RtjGixEu3RE5ul1efmxp/xmKNEem4CrNIVJig7hyeZjMwiwSN8LCxtcxPgWX2K2O0rHzczVsQYsW10lw/QHJcVonjKGlMYtQqsUqM0T0Ek2gla3nnsWVLM8LynEao1TCTEOFgARxi0QlOmAmyEJqkbLN3X7iG00yWSVngRZMobmzXkyeQQtNoMkL8ZQlFYPQAzQ2njVBQw2ers/hi7F9r3a4jaC2h2KF332qxlOhIsElKQOwyGBL0965bSO/S0xjym4I4CtHIrCe1NdBBW/9Dja7xHakKIbo5K9mXFZkkDPM3TEAn0Hcz7ec7v0YDc3eEQtAYHwmNCHJLwiJjTIQAFHJUNkWFua4kgViNFyyaP9zZGmyx+PsgbCks7ho7EeAhISW+LEB6g4uPyFJbqe4QHeCm4pgoPUIEGILTQaa2+dNjaQsqB6lL/MeKZOCfAiuPaeHlOkk/MBCSEkpgyjsxX8p+h2HJ4Wf8NkFD5n6Y8ZFRJwBRTTPG68RcJtRDEYqLWLAAAAABJRU5ErkJggg==",
  "ui_icon_11": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABF5JREFUeJztW69PY0EQHi6XYFEogq0g4BAEDA6F6j9AwukzuKaqwWFOH0n/gadQuBoIAgdB1DYoVC2KE5ch0+nMzszu9nHJvS9pAu/tr+/bmd3ZHw+gQ4cOHf5jrLVd4e/hz4/U+x+jX622aeWVWYRTaEOMlVWQIt4/P1p61lzfJctblRhVC42StiCJUluIaoVJ5HNIS+BC1BShuCBOvBZpCasQoqiACHne+N2d9aU0vYN9s87aImRnpuRLiXNEhSgRIStjDnmJ+OnFrZjv5uoEAGwhaogQzhQhr/W2RpwCRUBoYpSKEMrgIT99eEyWwclP74cL//cOR59/tyHCt0hihEa+ub6D55d3eH55X3h+enH7+aPg5PmzpfSKuCUzj1sAK6SVghaJNEIi73pnWFg09HYJYJk+Jz8YT5aIv70+rb29PiXNc2O7Dxvb/YVnkoDUTaR2RUQIuYBEnjdmMJ4s/K8R5/k4cQouws3ViSmCF6YAm1t7qpoe8tEGzWeNaOZeS0B4rcBtAZq6l2fHALBI3mPuvBfns0YkT8tBEZ5f3j/r9bZTQ9YsAKCrbxHH96cXt3BzdQLTh8eFH76jaSURrHZ4kRQAzd9SlZu+p0wA2ay1WYOK4K3P4wbfXSU5YfW+NJ54CNNntIzLs2NRjP75kbnBgnC5QGruxQZEB7zp/XDhFwUlXuIG7jHACkAisCLAFHJmlhSSAvDKNBE8jULTzY0ANWizAcIaB1yDII3va1pCKVKDoXc6VAWggw1WJC10auIrxBVnAUo+xyy18koWORR0NrCmROt9diBUE1oA1AaqCJBaL3jQO9h37QNG4QmYsgWo4RoA8hK4zbaYkWDvcFRUgWQdpYQ98AZH1cYAyw1QRIn8fNaEorlSl6NwCaA1rpYbUOSE1CXlffksMJ81ofQ1ex8gsS2OFdEVl6Y2tRCuuBVTcOtK9Rgnn9MejioWQBvi3ULrHY6K/N7jfh53cu0HoBV4Z4TNrb0PXjkecmDQQw89rABIExUHVOpG0aWxaQHe3RcuzObW3kcNf5XKmN4PxdkkZ19AFYD3Bi47U5WkrEPb+dF6XxOQk9cGUe9s4nKBwXhirrsRKIIklHUomrKYVByh1edBaEPEYwWIaIygkadbZpw89n4rW2KIqAi5wRLPG+n5SDDlSkhjAsRgPMkiFx1DtNA5VVYrAgDYImgmayG1WJLI02AtGkq7E2si7O6sq2v5yKpvPmvM9Jw8P5bL2UgJC0Ar5ldgJCE8IiAxq+d5rwMsn0malTGEMlAR+PUVRFQEr1vwXgcoJw+QcUnKIwKA76qbB9oRVw3yAJnX5LwiAMhC4HpAE4nuEPNt+Bp3ECiyM/PAxRIC4C9hSo4KoG2LUwFqkweocFc4Yg0cKIBFXlqQ1do6r1IIP3/zXIcFWLYIRBvEEa18L+AVBCC9YFrFgUn1Ar2Xk1CUlI8DrP6UaKWF534v1OaHU61V9K99LdahQ4cOAAB/AEjPz5h4WzhMAAAAAElFTkSuQmCC",
  "ui_icon_12": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA75JREFUeJztWi1vmlEUPixLaqtQpBbRFFfRUIObquIPkLR6po6gCG6meiT8AdRUHYYGgWOZwC4o1OwUU6e7XO7HOeeee993GU9CUsr7cZ/nfN4PgDPO+K/RqHoAEnwdfT6Y35/GL2Ie/4QANmEXpCJ8lNxUChTiqaidACVIm6iNABTi/cf7k//Np8uk91YqgIT0drUGAID23a3KGIoLILU0Eje/a4hQrArEiLtIA5wSN4ECYBhIKkFWD5CSRoTIa0FdAA0Xp7h2rXIAtXT5EpoPHJLD2YJ8rYmkHCC1NsIlgI90uzv+e9/byPn7frcplwN85GNxbaJ9dxt0fUxuVOs2W50DVwSVEOCQtuGyuN3cTAY9AJC7eQi16QRNT7i5vnj/+/uP3yfXtrtjZxhI8EHlKQnYrtbBZGiKQUGz1WHNJdSSICcMuPX94fn19BmeRAgArGRYJATMDI7xHLOsi7T9TI0wUBNgPl0eeYFJGkEhHyOujWJJEMn7ECO+320a1PjmlMMkAZ7GL41mq3Nwkdu+jZxeYCJE2kWAIwIVlVSBh+dXL/n9btOgWs8WWJITkqfDaBH0ArsaxLwAgJe1bQ+wSXMrgZoHSLs0butKvZ4aKskCSCYgeJ/0XhMUDwtBNQdQvECDuIZwCBUBzAGlWqQ0slcBrUlLrvdVPhmqGmoClAiDZqtzwA/1+tg1RTwgNQxipFMaouILIpw+3STtardTVqIQqgJo9uquNUcJ4Zjg2UIgxS1t8v3HexVru1BJFeB4SS7iiNosiiJMcSjkL6/673//+jn3PtMXBioe4CtPKWHAJR96bwgiD8AYTVmnD1llOFs4BfARTgHbA7jktZqiGHl0f+77WB5gZmffAkgMlKUyLlzkJ4MeyUhkD8hRmjjdnS/B+chTIcoBOUuT2UzZa/8+EbarNXz78gkA3FtpIZA8QHsllgNfuOCWmr3L5NpzCHWCbA8wrU+pwTZsQpS5Qbs7Ju8oIahJmpwD7AfaWVmzRJmCTAa9JPIxcVVb4cur/tEnBThwbq/B3VpjC4CHF6gub94nzdTD2YIkhE2eMu1mCWAPIlSazN/m0+XRvVTyNgGfdV07TdQ1B7UdGRuUM7woSmyw3CpU5HyAb38ey5KdsLj12QQSCgkh3SsQeYDLhSkZ2hSBav3cIOcA30Bvri/Y53hynPaSQlQGUwjUiTwAc3vcjsHJoEe2viuDV+3+AILzAb5EhJMRG6GDENx354BoEKmTo7qQB0g8IZKzPpeCyoBy1OczzjijCP4AYMwGlXyk410AAAAASUVORK5CYII="
};

// Aliases oficiais para integracao de interface (GDD v1.0)
TINY_SWORDS_UI["ui_btn_blue_reg"] = TINY_SWORDS_UI["ui_btn_blue_regular"];
TINY_SWORDS_UI["ui_btn_blue_press"] = TINY_SWORDS_UI["ui_btn_blue_pressed"];
TINY_SWORDS_UI["ui_btn_red_reg"] = TINY_SWORDS_UI["ui_btn_red_regular"];
TINY_SWORDS_UI["ui_btn_red_press"] = TINY_SWORDS_UI["ui_btn_red_pressed"];
TINY_SWORDS_UI["ui_btn_blue_sq"] = TINY_SWORDS_UI["ui_btn_blue_sq_regular"];
TINY_SWORDS_UI["ui_btn_blue_sq_press"] = TINY_SWORDS_UI["ui_btn_blue_sq_pressed"];
TINY_SWORDS_UI["ui_btn_red_sq"] = TINY_SWORDS_UI["ui_btn_red_sq_regular"];
TINY_SWORDS_UI["ui_btn_red_sq_press"] = TINY_SWORDS_UI["ui_btn_red_sq_pressed"];

function registerTinySwordsUI(scene) {
  if (!scene) return;
  // Registra aliases
  TINY_SWORDS_UI["ui_btn_blue_reg"] = TINY_SWORDS_UI["ui_btn_blue_regular"];
  TINY_SWORDS_UI["ui_btn_blue_press"] = TINY_SWORDS_UI["ui_btn_blue_pressed"];
  TINY_SWORDS_UI["ui_btn_red_reg"] = TINY_SWORDS_UI["ui_btn_red_regular"];
  TINY_SWORDS_UI["ui_btn_red_press"] = TINY_SWORDS_UI["ui_btn_red_pressed"];
  TINY_SWORDS_UI["ui_btn_blue_sq"] = TINY_SWORDS_UI["ui_btn_blue_sq_regular"];
  TINY_SWORDS_UI["ui_btn_blue_sq_press"] = TINY_SWORDS_UI["ui_btn_blue_sq_pressed"];
  TINY_SWORDS_UI["ui_btn_red_sq"] = TINY_SWORDS_UI["ui_btn_red_sq_regular"];
  TINY_SWORDS_UI["ui_btn_red_sq_press"] = TINY_SWORDS_UI["ui_btn_red_sq_pressed"];

  Object.keys(TINY_SWORDS_UI).forEach(key => {
    if (scene.textures && !scene.textures.exists(key)) {
      if (scene.load && typeof scene.load.image === 'function') {
        scene.load.image(key, TINY_SWORDS_UI[key]);
      } else if (scene.textures && typeof scene.textures.addBase64 === 'function') {
        scene.textures.addBase64(key, TINY_SWORDS_UI[key]);
      }
    }
  });
}


function makeUIButtonTextures(scene) {
  if (!scene || !scene.textures) return;

  const btnWidth = 330;
  const btnHeight = 46;

  const drawRounded = (ctx, x, y, w, h, r) => {
    if (typeof ctx.roundRect === 'function') {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }
  };

  const generateBtn = (key, baseCol, bevelCol, goldCol, rivetCol, yOff) => {
    if (scene.textures.exists(key)) return;
    const canvasTex = scene.textures.createCanvas(key, btnWidth, btnHeight);
    const ctx = canvasTex.context;
    const r = 6;
    const hw = btnWidth;
    const hh = btnHeight;

    // Fundo nobre
    drawRounded(ctx, 0, yOff, hw, hh - yOff, r);
    ctx.fillStyle = baseCol;
    ctx.fill();

    // Bevel de iluminacao interna
    drawRounded(ctx, 1.5, 1.5 + yOff, hw - 3, hh - 3 - yOff, r - 1);
    ctx.strokeStyle = bevelCol;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Moldura nobre de ouro
    drawRounded(ctx, 0.5, 0.5 + yOff, hw - 1, hh - 1 - yOff, r);
    ctx.strokeStyle = goldCol;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Rebites dourados nos 4 cantos
    const rx = 10;
    const ry = 10 + yOff;
    ctx.fillStyle = rivetCol;
    const rivets = [
      [rx, ry],
      [hw - rx, ry],
      [rx, hh - 10],
      [hw - rx, hh - 10]
    ];
    for (let i = 0; i < rivets.length; i++) {
      ctx.beginPath();
      ctx.arc(rivets[i][0], rivets[i][1], 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    canvasTex.refresh();
  };

  // Botoes Azuis Nobres
  generateBtn('ui_btn_blue_reg', '#1a3356', '#3663a0', '#c5a059', '#d4af37', 0);
  generateBtn('ui_btn_blue_hover', '#244270', '#4f83cc', '#ffd740', '#ffeb3b', 0);
  generateBtn('ui_btn_blue_press', '#12223a', '#223c60', '#a88238', '#b89430', 2);

  // Botoes Vermelhos Nobres
  generateBtn('ui_btn_red_reg', '#6b1b1b', '#9e3232', '#c5a059', '#d4af37', 0);
  generateBtn('ui_btn_red_hover', '#8a2525', '#bd3c3c', '#ffd740', '#ffeb3b', 0);
  generateBtn('ui_btn_red_press', '#4a1212', '#6b1c1c', '#a88238', '#b89430', 2);
}


// --- BUNDLE FILE: JS_Teste/src/art/vfxAssets.js ---
// =============================================================================
// SUPER PIXEL EFFECTS GIGAPACK - DICIONARIO BASE64 OFICIAL (GDD v1.0)
// Suporte universal 100% autossuficiente (Web Server, file://, Itch.io e Mobile)
// =============================================================================
const SUPER_PIXEL_VFX = {
  "vfx_explosion": "data:image/png;base64,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",
  "vfx_fire_loop": "data:image/png;base64,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",
  "vfx_lightning_aura": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAgAElEQVR4nO3dzW4Uybbo8ZV2UW7zYYO4d2+djUBqBkitPTg6uhPm8Cxb6uEZ8gQ8Qkv3Wcyc2RldtcSgW8LiHPWWENg0eNsuO+/AlUnkyhWRkV9V+fH/SQi7qlwuR2bGio8VkSIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBLtv0B0I33JyciIqk4x/TJ4WEn79fmfQAAw7TY9gdApxK5CdoiIsn7k5NCI2Ad1EWkXeMA/XOOFY0wAL2gATARTw4PCwFe1oFDNwICj+fU+6BDNRthadUL0I2j45X1cN6YFhF5+ZjqEtOys+0PgM650zqpyE3QMRoHVfLX0CCoLytzT9nlx8X3szGPoXNpxNfAZPTSpO1iPprh6vqMUQAR1YsRZ5ogNAqgfp5ckWby0RaR0nlcVa46AHEMGnr19qLw/evny9DL3bJ2p9Tk6HjFKAAmpc+zuTQfLRIXzPX8Zw+fbeoKFdeaLkuzbOlpdq50DUigEabK3zqOqMEJ/vlx+L//71KeHnw/9Z2gnpW31QigLsLk9DIFYAT57AIKDYtaP8MFV5NT9lbZlYJJaIgarZWmYxRfOVP+3XLrkvTTeZo9loqYPXvm/DELfecAuK1otyUd0wjIK096pfUYDTBfIKo6FhyDhjwNsdT5l6NsNyYRkeTzhaRvPlxnj5mNLYI/5qC3BoCqAN156MphzSeHh+7P0xtqLu/1yPey12olBCJeRUPMPTYiYg7/W1+jGfccTu4vJckaAZ/O09IqAGNVAMcAk9PrCEBgOLrOxcSF14BR9roRVlBjagb16WCe6MdV3ksJibCtlM73zxciP95LkjcfruXBXpKq1zIqgFnYSHDVqwKyyszK9Cf7v1tO2YuUj7eu+KzX5t9zPJrRx0Cd697ydr6n7FtYJwKWzvUf7yXy9CCxrg0zYZYGAKZmk2d01rK2gpDemIYEwIY8vXhfJnNMljmZ6N3wZf77Ms/RLbdBlYpIsl4JoMs/arUMMAW9bwQUmewXmxg4a+7mMhVlVUo0W8vLOjBFkNO9To5PvMBxyss5dAwo++68fr501/7nwVwt/xNxyl/39un9Y4p6PauNec1CS1ptXONrgTdirf+t2ABkLGL2ViisuDB+Nu+F1tghkJ5Qfe55753brwjunV0Tc6bqg0IjYJ3wRzkPhJqySUQqN29CQ5vYCriQge6ZyyxddB3NeRYqXXdHsFdvL0o7hI2EuaQy+1exD0BGB6M2SZqzdXS8yv95WKMrvrLt6xrAd/lxcAOKHgmwevuBY4wWdD1s1MlMP/aosxGAirXk3pa10wPqtPd/f3mT6fvi0Y6sl/ukIpKoE2xULX6VPGb18hN1HPQSTPM91fsVfhcqpSKSuAHi5eOFWa7/utpJfti9LpWt7xigc3n5vnp74WsE+H5mNPXEyPjq5bzuvr8sHy90o5MRADWM75t/9s7z615rbPBxe2C6hf75QtIXj3bkj7M0efGo9Gf6PuMoBHr5Vvmb88tuGUeUN5Wfn9sQy3eWOzpe5eX65XI3eXd6R37YvU6/XO5GXQMW8gCqZT1K95+I6ByAvBEQEpr3rxj5QT2l+tituz9fFJ8L1fuop5OK3VjO5Ftakz/WtofpHPjC+2YtxqwBICLJb6ep/P4lNQP+6+fL0QS3QAAINWbM5WWBJLPSsjP3+D45PEzen5zIL7/u6989y7k64zzMFM6ru4uV/LlapM8OvorUWNbnW0II26u3F1XTWyI1ztmKAJO+fLwYTf0xRMbxEpGbPRrWqzTSdZ2eZCO6a4VjSJJmM61HADy7l1k7/nmzzetSlW7hfX+8l+TB/9N5ml+cxiiA+5nGJNTL11+L8VpzJCYyd0BExAr++uvZMDLJM4Vy/3O1kMNbl4mIyLfVTt3e/BjP023RG12lxj/3ueBIgHN8rXOd49JeqQzduvrT+fdRgB/v5S8tdTYZCWimVQPA2r1MDS/7GgFdDGda66ZTZ2MPebCXyMvHC3l6kMhvp2nyl33vdriD5FlK5qvc3McSKVeEol5jNgL09IBmra6QDht3I2et48+P0dnVrrw7vSO3F9fpx/NbUW8YuJZgsJb7KfraiC3T0n4N9Do7l/xlX5LfTtPk6cFN3f1g7/thXNftuvHFddFC4wZAja1LrWmARuv+1ZyPvggLvf0/zr73/l8+Xsg//n5L/vPfKyuHoSlk+juqPr9udHmHQWscA+90TsXvmTQ1GmWVe14mF9c7qYjIu9M7tX6Hey05c9vpSFex9M7TCMiPxc8/nZUeC1F1DMG/H4mIyH/++1L+8fdbhfI18rjMup+cgPoancWe4B9cxuRkOWc/VyuzVg/7uyeIWssrIiJ/3U/Mi/T18+WYlv+Zmf7qOfexjFW+voaY3oWxxNivIX+/n386Y8WAcXyyc0+fl5mP5/VyJbIydtZIz66xVYdznZd67k3OVwJ+/6xcDKtuzx53/1+/Jl+Rw/GKU7uUQpv7VAUR5+ebVl7eiq/BAR9LBaqHuPTQeyjY+xL6Sg2xwKZCvs8kr58v5Wcy012l3mGfFdHcEi7r8jUCWFI2OMG6uMY1xJLNmprWTo0z+lv2FjsZfhvLxV+xPtz6PjF+rvSeImZDwHx95pdf92ed7Z/xDDH6GmJ9oIJrh/IbkK7qEd9IAcLaJAF2spyvhlRkfkNxNW+pnM/rVyX0Gcma0ReOe9HOcPjfm02OYalIWMXEeFZsIKBpAyDvkW5wc5LZXriBhMpE/csejz4ubkOhIpjnv3tEORR9sDL8ref6RAUXz71O9I2BME2zjRV1NSqobW1OordbnZvY5Esx5v7rsDZZWm+nnL+3yDynAao2/univFTTDIWkV50EOMdjAGhzjw1NtZ4CENn4FqWz7f1ULK2stZmPjyfApWoZzmyPgWfjnz6CfyHnwljiNNtjAHhwTdTUOFD0NQpg3RQi+x3ZF3Pv9YRGAtocB1/wcR978+G6kGk712Nh7UbZYQOg9J7Z4+vyz18z1/IH0F7tEQBjZ7o+uBnVesnamG/l20rEroCNjs37kxNv8Nc93hePdrLjQmv7u9ZlUbHJVf44AR9AV9ouAxTpPuHCWqZTagT08HsHyQjooWDTaImTszOdGfz1EpsXj3ZmfROUQB5AF++XWCMJVmNAGh5vABBp3gDI9LEU0Bxadjb0yMyp8qsKNF2Ug6/nL+73c19rWzFN0vb9ot4rYr97AKhUuwJpuhMgmlG5Fj6F41j3OBwdrwrHcn3L2kbvNXXOHL1IB3P/vjl/bIa7qoLple3LpnY9HUBXOqZbuQ9V7drG2J1uVkPyW2Jm/Xsea30cCPrRutx7nH3MtycRuQkyNAK2Lt+u2fNchnjTgUbLALtYboY4xiY91uY/7nNN6C2BEVbaeKmD98vfizuabY4T8PMEY2yV7liKlDuaxJ2OdNXV4IBsgNrHX6TbZYBk9kdQuRCdvJ+TV7Gp+wmgjKTK4bAa1ywD70GXtwPGBlQFf3fVQGxjwLO5DTxU8G9dZs8OvsrH81u1bxGMMqsHT8AYrtCul0J91LsubgecfV15X3m0U7UVsHqei6df+TFoOmefHa9vqx15uHeZPty7dJdkoobQBmLuc1ljwEoqE66ZVnyjYu714XkNeWRb0sU+AO5jNAJ6EnkfAC6knnXR+3cD/+3FdXp7cZ0H/ruLVfLniiTAhioTZD0NhcLNglBPxRbViRH0reM0qFUwTUZSx6hJaVsBKHX+J/h0LBD8vRdS7EmrNxqa8sneoS6W7RUC//7uVXJ2tSt/rhaDqQRHJiZD3LyBkwiBv6Wqzck08/gM8LzPO7WZqdWPTUrcOngkkPUkkG8RDP5VJ60K/JUjB9nrp3YBtNBm2V4qcrMDY9bjP7vaHWIFOEaxG4mJ9To0ouv/yk7gSM71yW8812gfAJe+KVD7j4RMRbKlHn2JygWoG/iVSV4EDRQy9rMhzphK7ea1NxstPTv4Ku9O76QP9y7yO/6NpGIcosIxydb067l+An5vrO3a3cdFZLiB3zcS6sS3SdZ7rf8oY6e6whB06OY09CbDPLsAWpsC1c0FqL18MPssTw4PJ3kh1OG5F0BwSsCaJ3V3XHx3ekce7l0k//GX2x1+0vkw5vaD1wkNge5F3K56cEP/vg6RFb+mGK+63AegkAfgKdjcx/NbtQJJnV7WhIQCuV6FofkaBaXXRAZ/rBlr90WMXkJF8lPy7vRO1ghInx18lS+Xu/184HlJ1f8ixmgZu/51L3C/EOuYZLbWoQhta5+ZYtB3NdoJ0GXsUJdJnX8iInJ+lSQiUnupU9d3XxuRvEzViVjn3gB6SK7wmhon+NzKPqhqrXJolCD73x0BEBG5d+uKxlY7Oqtf10nseLkBLx8v8n9rXe9c2qWs4Z7Xh1MP+q7WDQDF1/pORCQ5u9qVd6d3ZH/3Kond9KTJ3dKmwtgGWMRTtuqxUuNLMYP/+5OT/B+qWY2Ao+NV6Jy19g4ojeRwDBorLOczevjkKm2YGrGNnjLboMLWw3O77lqXfiBRrXCRfbnclfvLVfrPf+01yXimxf5d3ekAM1nQk8yZvY4KMpIzHSDyveysQFN4LFDREKQa8N097v5S5PNFOfDo17vTNQMISpPgyQnIz+ttl7Pnxnaz2sum1RGo2pzmyeGhHB2v5O5iJX+7fZ66y54sFRfh7CtE96SM2I7ZG3wCJ3fpvVSgmv0xCCj0JCRQ/i8fL0oJnu9O7+Sv11MDqMdJCEw/X4i8eLQjbz5ci1QHfxq/HQgkAw6l159TjQCRmZ0DXRyJUoFlASY7Ef5cLdJ3pwvZ27lKfBudxFyEQzpxtil21EW9prRMMGalhuf3wKGSAn0Kld+67PPlf2uprJMDOddbS0Vugv9vp2ny471Efv+SVgV/tFAV+EW2U4dXZfKrenA2wV+kmwaA2au0Lqzz611z8xQuwjgxa/jVJkCVUwO+xsSchsG6EGjUBnsUnumDWVVCfXnxaEc+nafJ04Ob4nx6kMgLZzWRUe9Q7g0F6vCoXv/R8Uoe7t2M3Dzcu+yj7qkc3veMsE66HmzVAIgoGPfC8i6XUq/NcV90U6myqjk1UPhZz2sJQt0p5AR4Nvsxz31GAZr58V4iD/Zuyv3BXuE0LhwH9ZiIfJ9+ISegEV035fPqIuX63G2E7e9eycfzZbou/77qnsIS9cj4NemcgL7PbCs7vSAiyBOMiszAr/jmofNjoLcLdl4fk1OACMbUQOFc9txYiFGAFiJWYOhzvJAk++70DjkBzcWOdImsG2F3Fyv5c7VIz652+859KeXouIHdMw06+WtxI3+YdUEFhuCsCzehFR6nQXa51WrXr0tFvu+OhXr0+a82TLGuCc75hpzyE7EbwKHv3Z8pJW4ijqcBVepY7O1cJefXu+mzg6/y+WKR7O9eyd5u2ktdo7b0ja0L3Z+Z5ChA1/sAhFhroN3HzfXSqMfdO8A5YatO+BCORTd8PQkrwEy2x7FBehhaRMp7N3gCeyh3BgFGp06vjMnP7Sz4f7ncTe4vV1nw71Oi/tfHOft8eoRosudA781aa5jTGPanwutBRXa/maUrak1sDx9rVpxzvTT0bwUfT3IsPdB6fMP8IlJZlr6RAMSrWp2UH5///raX/O32ee8fyJjyDNVz5pTdFHMBNjUCoFtaqX68xtaqiBDY57rQI8rMbQvMTQhkRtcJKgSgGnzbz6qtaXOeeqUydwllno6dVf55nWTsCdN3p0M3DAvTzqoe1Mnrk9Nrt6LiZiilYWnPrmr6a8TzJT65YsqVsq+pYh40WJ6e5EBEajBaUhotCNzYBmGxuRP583pTrJ47IlaeWWmO39glcJJ6awBU3Ayl8DjDm90yhv59c1pVyS2buiinSvce6myIUkgOxEaUypuyry3mHNfBfyOMoB6s/+awS2DfZ7d3Hi7wWPb4ZFtdfarYB6BU3p6Tn/JvIZTjUiOgTH4J0sDQ2Goppuwqki4TkX7n2o2N0oLX19R3CdxEDkBhHmjN2/sP3D0K8WKCv3ky09PvjJtV7J2DtlTlw6AfBP/N8oxUptlzPd+dtNa1NdUcqY1sBOS5sKoOQGi9JgyBzSxcdYf1Kfua1ud7q3IjGG1GF8cKrVjTk6X1+m1HBSqmRWert1qmogILDrepZMCY98N3pWkXY7er2MS/fNdAAOhRaI+SVOT7Fr6umLqp5s3TZmXjUbVmIGcuOpJnW1/rAqnc1cqzTTAAdCJwm3E98usm0pqraXRd5anbzHy0uXduZt8Cmgq11aWItDu53feb+0UCoFu6vqrYkz9mCXNputhzZ9TJbuvbBA0AAMBGxdxu1zN0b40CVCU9E/w9aAAAAAZHbxAk4TwBX8An+Ads8mZAAAA04duqN6ceJ/hHoAEAABgyc6te57nCvL/1HMEfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBZS7b9AQAAeH9yIiKSyjouPTk87PJ98/fu6n2nYLHtDwAAgCMVkeT9yYm3EeAEdRHxNxZU8Ieys+0PAADAWjYqnYqUA72SSiCwG8GfEW+FBgAAYOuMXnxMI8Dk6/kz/F9EiwgAsBFuMM+CsRHgda8+8bw+jXy+8D6h3z+3BgI5AABgqEpKC81Dx85Rz1Repp7HEikGbysnoPS8SHTwr/r9s8EUAACElYaiVaBJ3cet55oMY09dRM+/9FyoHCMT/grPzf24zK7FAwAxnBGAjNVrtJ5zh6bNYeq50kvynKesssxe43tOKh7Pftb3XOmzzO34MAIAYHaynnpED9AXpHRmeSrF0YDEeH72PU4VYKsaUNnXvuc0K/hH/665BX8RGgAA5ssc2q9oGISCfPa17k3SCCjz9eTF83hVIyB2pMZ6fLYj4bP9wwHMV2AoOntMpHr4OXlyeFiZ8BeaSphjr1PEWyZV5W79jO+xWu8/1+PAKgAAs6MCt2+e2BdYzOVkFdygkwei0G53Y5CVYQd/g9Xjt3ruvsez52Ieb70rYId/91bRAACA8khAZwl8TmND906nsPQsX6InUruMQsHcfT7fw98pR+9eAWp0oap8a5W/Gu0Z/fGjAQBs0dHxSmRdkbx8zOW4BWbPXP3fuqdn7BFQFfzGotBQCjUE9IY7KphW9viz0RKjMaWDf+Hxis9c+rmqzy7xjYvBo8YBBuLoeCU0AjYnFDA2MLRbK/iPZMg5ZmqjMGKgH5dwjz92JKbwWmNEwLcXgNmjn/INhahtgGFIRSShEdDcejQlZ5Wj+xrn+VLg6UtkD9X3+qEOOXt37hPx7vHv2/Uvpscf83liRgSCKws8vX7fe40SywCB4UhFikHq6HhVCmwIypfpBcotf36TPWpfT9O37NDYUXBwQcdY6pjx7YJYtfwve01hiD77F/N5jNdWlV1pSN+306P7uoGPxkShqwF0zAo8Fb16PQ+dqPcYZOU/UIXefFaORvk7z391f04Cw9dd8C07LAybj2nYuSI5zzfknz8n6pitn+vyfPft0uh+n6so+8kEfxEqFaBTTuA2l5AFhqVDW5uSIBipoixdqYjI3cUq+dvt88Jj0tM0QGDve71lrft83fnvralY2599r1+jX9fL3+m5g2DomrM+m8jE9gygVgG6p9eVFyo3zzy0OK+xhh0Rz7cNbKmC/9vt8/TL5W5y79ZVrx+oIvhbzyX6uZEEntJolvreem0pf6Cnz+Y7J6o+n/v9pJADAPTDrWDyikOPEHjmqb2bziBMJfZl/1uNMdnbuUrend6Re7eu0s8XCzm/Svoua99yw+xra65/8NM/Rg6DlWznG9rf5t/m+yylxpf7feQ9JEaBEQCge741zVaPyBfs89cx/F+tIuFPNwJERJLz6125u1gl707vpCKSPjv42stnC60hV3P+3mA4gt6/tYeCNa8fXOuf6TIPwxOsQyMv7vf6tZPZA0CEEQCgUy8fL+S301Q+naeh+c/E+VfolT47+Gr1YhHHO3WiyjTJHvtztRARSfZ3b0YDev5shd/vBjg3e915fPC9f4ceZfFNYRV6155VBH1Mf5WuRdXAsHr97s+WpvKmgK4F0LHfv6Ty+xdJXzxK5NN5Kg/28vqikAy47rUWGgpZEKLX34g1pxxMwMweOzpeycO9i+Tj+S15uHfZ5+er07MdfOKfiLnVsbkSwPNa7yqCLkYBjN6/L/hb94cwf9b4+dGaTEsGGIpXby9E1hXIi0c78ttpmojcNAxeP18WXmusGiDjvyFj6WQm2AjoW9U2s3VfN2Qxm+f4/jYrU7+jBkDUCoNA8J9c4M/QAJip0C1KM1M72Tdl3QAQcRoBbz5ci6zLuKIRQAOgpaqGwNDK19rtb+zXXtNgam2W1LQsYt+rTaNl7EbXANCVq6z/hp9/OpvsQepDxEYjo6+Etik7T+8vRT5flINQoBEwuAA1Vp6GwFZHAzTP+vRJ1GVNA6sO3C0bALHBfza9ftdYGwDmwdKVKsKMUQCRmZz4XXMapiLy/VxUjxcqec7XzQhtzrTNRsCUg78r0BDw1jVu8O6iAeB5/1qfaYrGuArAWl+dipQrYUQpLUOL3XcbJXkC2qu3F9b56EuSQk/UKEAp03wA91koLFOcwXWnj0EqUmupXpvfJ+p3eRNG52L7Y2D1WRs05OtNX729oGcVwbrgvlzuyt//191a7+OMyNCrtbPQs8dFjGFodM8I6r4G1xCW2bmZ76E76I1GYN9/n9Jx6OLvr3gP3z4dmdL9C8Z8THxG1wBwA8z7kxP55dd9ERoBtVjzXu9O78jDvcYjKFn5b7syHQKrLEqBn/Oze4Hkv8ygzs/A8rnCrnPu64cqsNWxz7aPhf791tLFwuvHcizqGF0DQHv9fJn1Qn1baaJMB/7k4d6FfDyvH5Sc8ocxx++cm5I9hm5VBP5CXTCExD9X5E6AqUjxboFDUZHo5xrMKiNPPkCdBsEkRmpEJtAAEKER0NS70ztyd7FKssDfsnKc+yiAmeCnkwF9yYJoLWouN3B74K2qSFIb8rU1iqAf4n4mp9xDOxNOJm9gWFdBTe6BoydaSyLrvc/X+6DL/u5V6N7piJdPQ3mec+WvoyHQStXwrZZYyX8DPO/1PvpDFOo5B4fRM9tqFARu6FOrUTNmgzvjm1IV7qQOUk+Sb6sdeXbwNRWRvCFwd7FKjo5XTSrDuWe2u8lcoX3QXfmoAQ2BVkK9Nd9NX0rv0fC879PgVwYYvec6DQKRDSbbNUhOFBnJKEZTkwiUanMgstEjZRfEt9WO3F5cZw0BkRq70emyn2u5e9b7i6hrzLM/QPYznLst+Jb0ueey5zWF6ZsuGgHr31MYth9Y46J3XfSwmwRbvVnczz+dxd5oyIyHUwr42pTOyPzAUoHGcROQPp7fSj6eL5v24ufe+9eB3Qz6vsdU/sokGuXbEBNg9WucGzKJdFD+nn0HUhnmCEOvAjvvxY4S1DoWgUZ47IjcpIO9ZRBnY5u90Bn6b6+j26BS9kLjc2xUXdPFOVyow9QdH2d/jXgCbOty8W0RLyLyy6/77MDpMaSdANv0Ihk+bci6G13T96LsWyFATINv2WEicnO9DWD3wanyBfrSjrGB6YlZGcQIgLQIPuuDTMXZTps5UAJXC07PhQbsBFjXjhoNmOV0wAYU6iF3Ga61RHy9gdzsDfIMnOKOSyPQKAHq9fMlwb+9WSdQzkw+HUAjoFPeBjT7xPgNohCclrFIRSBirXq3dP6FCGU7dW5PlGO9WW3ynVCf25l0ev2pCJ0XkWGNABRaZ7p1bGz3OfuD14WXjxckKs2Icx1xnBtyE87qBBHPbYnRI3cEmY3iygaRBPjs4Gv2ZSFZI7tg1IVDkOpYTKISyUvjpwMQvc9WatVDXSbbzllWDx0dr9KG9RHl7xhEA+DJ4WEpCEn5ft0cuB69fLxwj4Eu+8LjGDUa0C207EV2vuHQnFjTlQ1x/q9t/AwMb8eYjwRka9PNTSHqXDjr38dGEPUUEpXU4405xyJ/H8p7uEayX/42tGoI/3aayu9faEs3lBdcg4RlEYJ/Qa9Xc9OtIJ2NabpqMfu2ghz0zSq2QeUEiHSfrOTumR/cB9x3/szpePTAbNyppWquQiOcJNxco0Dy5sO1iEh6f8n9H+rosiOC7zotyKHfbGHon69rVgW/bc4xMG8MYjzmvbnLWI7DkBjJtCLhrVkts81ef/X2Ii+zOoH76Hglf5yl8tf9JBXJGwJyfynJ5/WsAg0BP31vhbmef11rXYpGUB3szRY899yuCjrBUYKhBSFPD24wLeYnh4ex5e4zmXtxb4OxRa1I3B303NcN6pzagtp/uzuy9uk8lRePdrKGALlNcRoP/cOvi5KsFfCHFDA7uFmF9dohGPR9xGuUu0bw74inIVB6PqOWiqIBXeZ/nN00BLJpAeGcjuIuEX9/cjKomDI2XTQAQrdaLFXYQ+w9N5gaGPqFms/z+uZ2h9aKdu9MqIyhwTVankBf2HCLlTgFrfbLODpeyW+nN8X49CDJgj+qBfeJQTOtS1BV3LGNAZGKBLA+dZELMJTGi2Yk8bnyCnwIyVw1k0SZ+++RLzegw6VXk/Pq7UXtefvfTtM88DsrASjXOKVGgLtyDPV1Vvsb2dtViUXb7tlNNvkvENT1nO8QWtLRIy1jKf+xCfTwrWuWYNViFODrKpU3H8qBnwTAMGPH0lTWK8aGmOw8Fr2UVkSyXWXw72KqoOI9rPnMyQacQPLXtit0fRwmewwGzhretxrxQzhntsa4xWy0V28v5J9nwfdEgK8RsH6a6akGtrEToK7sExFvRd9FwlHpPZzflf/+Dn/fYA1tS2V1HDKp8Tz6Z/b61Q6R+npBhFdvLwr3D3CemnR90wfPjrEE/4Z6LTA1x2v2tgMZ4dnPJC1HAPJAF/G7Sp/P96gGuH4AAB6FSURBVHNj4xvmHcKQmec8mVT5D4G7ja3udVo3qvl0niYP9m4OwxDOk7Fal3twN1JGAeK9PzmRHjaLm6XeRgBUYI3u9evg38FHyYeYK3b5s0YDvD83UlmZDupieXJ4aI0GFMp/Qsdg21KR8p72umf15sO1PNhL8mPAjaBaS9S/DKMANWX3jln/S9b/BlOfjUnnIwBNe/3qZ/NWXdven7oXQN3fnxl9bzQ2UWbbCTWB82f0x2DbVE/U7Hm6y9R+/5KmLx7lfYTZ7v4HTFVnDYCKwJ//LmcnOMm+Vz8fFawbfC7zffVnid2qdgxBqG4w10u+uqzwj45X8nDvptf5cO+ysvyqGmNjKP+hMeah80aAdZe7+0uRzxeSNQJoAAAT00kDoCJo+n5PPr/v+fnWvX/1+Uq9Sed3+6Ybgn/PkINQnWDuWwPedQNARNJnB1/l22onub242QBFNwjVY75laZ2dG1Om5/zfn5zIL7/ui/hXXVjJVOn9pSQP9hL5x99v9fZZAWxelw0As/IIPFb5eMcNgFq/Wz1uPjbkIKRvnqEZOwSWyqCPBoCIyLODm807vlzuJvduXenfX1X+IjLsxtdQOEP+1nI+K+vfXZKpjwPJasDEdDmm59v4x6pIqjYF6rSCt3qZYleMeoMPa73p4JeaBBK2rB3eCo9nX/c13LvcuU7+OFvKyeWt9NnB1/RfVzvJD7vX7vF3P0vhXCHox1ND+r6AL+I/57WtLxsF0K1OVgGoLG4RO8Cngee2xfdZ9MqFwmuNv3eIdIXtrgDwBVyRniv5i+ud9OTyltxdrJJ3p3dEBX83Q7p0zrASoLbgmnO9qY3q3bO+Gpi4Prp5viHF7Hv3NaWep/Rb2ejfYy1R1J8vMb4frMDtgEM5DoXnNpHs9edqIf+2/y/fcbd6q4Mv+4GyGlQ5z5A+m6wAM9DZPgAVN9gJ7SBmPt7V2u+K9wl9Jt+Q6Rh6oqUGi7Gjm9Uw6Hs0plDe6/n/QjkbewIUfmYEZT8UusFUOtetzP/Xz5d6ZCA/Bsz/A9PSSVcvZumcZx6+lN3tPNdljy80r1+a83Q+qy9fIRnJfahLyXyBuwX22sM2biubhMrZuMukzsVAWCFor4N99GgWwR6YvtYjABXrta1s/pghxULllPXiY3p/ntf6Epvc593PFuyFZq8baG+00LO3hvONXbPS0Ov7cnS88t0PIFdxHOChevKtbmIDYJq6qu3rbtYSGnYuBOGGWwMXeumB9whmP3t6oU0+zybVDeT539Rn8Hd6/6XefNVIyghGWkbB2fCnqkEMYAa6rvHzgFgV/I0pgVJCmC9w+3reqreYNwLUY6WliGoo2nxf9fxgK8+GQbzzhoxnKWKp3I6OV+zhvUG+Xf8AzE/riv/9yUkhOMf21mK33HWet3YNTPTXgV3kgr+rwecWEUmfHB4OcRQgirs5j3S4EsBz50HraxFhi1kA2IYuat5aAVSp6kmHRgSs14Z6/KHfER3EjWmBsTOXQ8b2zCM2HdJfu78TALAlrRsAHc7P+jao0UKBwxfMrSVRrQLQFOaljRUBwQxxHeydBoIeRfDtBWEeA6YBAGDzttKD9d2hT/xBue7ce933azOKMQmeYXu9fK/0vHpMK51fnnsQMA0AABu2zQZAVSAJzhtL9bBy1c/r3znom/tsgq8RoB5zWb37Ujn7gnvd2xUDALqz8QZAxZK8jE7uC23XG3rc3fHO9zsKn4VGQGUCn35eP156juAOAMPT2VbANYUCrjUfrZ8LsYKUmeluLBucPbVdsEj1xkL548bPAgAGalsNABEJBn9LZQ+9alc567m59/gtKpBbAb70nOdnAQADta2xWSs4hOabreBvDk0H9pfXu/7FfKbZCg3bVw3p0wgAgOEbXAWtEgRFPD1/nUjoeb70XvT4AQDY8hSA5rtbYJOg7ZsOGOgNfAAA2KhBNQDW6qzND94hzmgEkOgHAIBsLwegSp2Ev6DQPecBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJOWbPsD+Bwdrwrfv3y8iHpOPZ+KSKKfBwBg7na2/QEsKoCn2WMq8Bee8/wsAAAwDG4EwAjgifpaP68fLz3HCAAAAEWDioye4J/9n0q5V+8+nr021DDw/b7SNAIAAFM2mBEAX/B/+XhhDf3nz6vHtNLflwV68gQA9On9yYnIun55cnjY9n0yrd8PyGw96nmCu4h8D9YqaCfu8+rn9ShANjKQNxqM3zeYRhCAeXKDvBvcncetjg883MaXSLFM8d1WGwCBhD3zJA/00vXr3aDvvrc5VUDvH0Cf3p+ceIOQCvKJ5/EcwayWyk6er/E1B0OIfGbLNjYoW69zRgqsREIR/5QBALRmDdtX/EheJxk/m6H3H0GVX/6YFdx9jS/9PlNtGAyhASDizPd3wZkacA+olUjIBbUFr95eiKwvuNfPl1v+NNPVpgJj3rkTlR0NVc6VeU0cg2i+kd+q1zZpvI1W5w2AbFi/ZjDvvJA9mwMx/L9l6+CPzUlFJAkNQbs8vc/JVoCbFDgGOthbwZ9j0Ew++qvL32p8+aZdpqqP6JeKk2wXEWDzA3R0vOotIDujAqVKraqnpIeUaIU34wT/WVxcA5FdX9HzoGIcH8751oJDzOp1Gols7fmuAau8ZzNK3MdOgIWhdr1tb/aYkb3vfX1fXj5eVLb41PMErkiv3l4UevsE/80KDC2HXuvuqeHuwYEaYsreU+94Aw/Bv1tG4yuVch0/+YZX3+Pf+WiAb/2989qonkpT1nLBUPBnKLS1VEQSNeQf3bK2pgrIF6itzty9vvZYQtVOTEM3NNRPndOOmQSupgF8u83mx2Xq535fDQA3mBemBNZK6/PV/30pXHBfLnfl3q2rwmdgKLQzukFXKksroIcaDK/eXtAIqKfO9WQtpeV875hn2F/ETgDkGDTw5PAwNL2SeEZozPN/6jpvAFRszuNbr194rs9cgMzdxUr+5+yH9N6tr9lDwWAlMzkheqB7/YWydQO+E9ytkYJJZ+N2zZfslD1e8RhZ/91qvGU5x6A3pV6+s3lQ4fEp6zPK6h6g76Y++uLotaJf7lwn+7tXcnJ5K3128FX+dbWT/LB7bW0aVAo8czghOuY75iJSygvQ0wUxWz0jXn4eh9Y+ex5DMzHl6LuRmTUiSR3UnLU5nJkILjM6/3u5HXDFjn35mn/ndaVWcV/JgBfXO+lf9y/SZwdf5cvlbvLD7rX7+wufUVTgeX9ykv9DmBqq1+Xr0helL9jP5qLsU0Xw970WkSIDtm+IP5Sp7m0Eu/USx6zyGISmV2ZX3/edBJj36H2NAmPTntKUQJeeHXyVb6ud5PbiWu7dunLni/LfVzGHVHgtKiUiNw2C9ycn8suv+9njVlmaj91fSvJgL5F//P1Wv5902nRejoiYAaowahO7fwAKQiNWheeMusbXEC7VOSQqB1XGkMB57ctRm5zeGgCe3fi8rxUxt/Dt1MO9i+Tj+S15uHdZOPiBE4HdA1vQCXtO8M/kjYP18H+hbO8vRT5fiPyf/73DsHQLngZtqTyNxjDl3h1dr/lGwnw/6zuOkw9SbXjqdl9ZBacJXFO5lXyvn9wtmJgCq9NoaPNZQmL24aZH1ErhwsoaCdn/R8cr+e305iW/f0nTF496maWaq0KOTcV5bOUM5LgG4hmB2yr/YC6ASHDZMjlK8cyyyo6RygkrvNaYlh59A3nTTZfCkkArKG+zNeW5wAj83SsE/0x2Xjw9SNI3H67FCf6jvsi27dXbC/nlV5GffzoTWZflL7/up07SZZJN0axV7o7G1ECl6OFnzyoM/R7B3BiOxY2K+XpvWb0/OcmXhb87vSP/tv+vJJsiDtyyfvT10qajbWFeZRPL/WJUzaVxcXUqGPxlXf4vHu3Ip/M0ebB3cxiGcJ6MXGpMwYjYKwPyx43Hes3RmYCqZWRmuQXKv3JqQP089VXD/Vuy4H93sUr+5+wH+Z+z6lvWj71e2tinV8P7eSWy7UZAqNfPhdQt3yY+xkWWiIg82EusHSRFZPwX3hYEN2T6ubgGWgd/a9lu8B73MJn1SsS2wO7PV40O0DC7EV0O709O5NtqR24vruXw1mVycllINvbuCTOFOmijf4En439rJ2zVkD8V3EaZSTee4TcquRqyhpeTaBlaa24Gf99mQVwjcXxlFHH3OV+gD25WNuMRgdr7tqwTw9N3p3dkuXOdvYfW+x4127CxDCt1A6AhDSPqg506/2axFnQgrB5qqv65r0NNr58v5S9qFmCdFyBiLz+rqkjzawQFUedoRfB39yPxvcb8nTO/gVmj0dt3p3dE5GafGPVe1nFIRTZ747q+9NIAyIK9J2syC/xDGUZJjH8ZszGAbqkNofQ8s3tMCP4t3VkkbnJl+suv+7pxlVeg2T9DKTBxXRRVBaDA6KOug9zX+Oopb51lvNekBc5Zr4/nSxFPHPBsWCcykYZV5yeHvtvf2OZwA+tsMyQH9sg6T6wcgaGeP0PnLrPMVltkfv7pLGr//1DS7NyvifcnJ6mI/z4KdRKOnb3prXo6JlmQY9KhKdZDfX36/KQNLfkbkhp36Zply7ovvmE093zxJZBu4ONNjtug+uMsTV482skbAbGBQuUDcEyKYsqgzkojaxOgqlyAws+hU4VjN5aOrU+ftwPODK5iCAT7OsM6g/u7xiSwtlZESreP9r0ONWRl+uk8lQd7SfrX/UScEYDa57LaOZBjI9EBN2oU0XNHx6rVAfn7E/x75db/o12F0cvtgDN97erXRsSFpHmnAFBfZFZ/dMIT4hwdr+SPs1T+up+kD/a+B/77S0k+X1T8sEedGwvhRpOgXLFHg/t4/hzBvzduY2v0sWFjWwEPQcSFZLW6g69BPJ0fIk7ZGveDcF+bGd0FNiR/3f8+558F/s8X/v0ZIlVtfINuVOUCiBD8e2VMRbpGWTcNK0JvRuFCih2CQ2fy8q/aCtoaQRpao3JsXjzakd9O0+T3L2mrwD/X+6dvUVUuAMF/AzyNgKGsaKttfJ84wNnbXMS4OH75VeT18yWV1UiM8YIag6cHiTw9SOR1+7ei91/Dun7KG8CxDbCIXACC//aMNviLTKQBUBX4JTDkj42b5I5aI1HI2O9yG+4sMBGEojQ6/2N2LhXhGGzIJJJep3SvVXNDE/X9JA7aWOkNNaawk9ZYGJuZdHEtuO/FtRWnbfmHdi5l99LNG/WugFNpAJR2jXv9fFn4t0avc8ucQETA2DDPjmaNOL1MrqmAHoKxb7fAjN4JEP1wj8FoGwFcvMBMGKswGk0BsBNgWTYN6ZvXd6Yp8/Kqm4QZsUupFrWz49i9entRmlLRZVt1fJqYws6A4/q0AArcyi+ycmsV/NX7ZGYd/NdSEUmsQGMF/5a/J2SOnbrSRkgqLyzTWe6REfxHiQYAMG6FpEpr6201NNl11vKsg/+6bFMRSd58uM4D/Ku3F/L6+dIb/H/+6azpKgxz1z/XTI+FlY/SdxL46JPLaQAAE6GXmYn4b87VAZJqv0tEJH3xaCdrBBRGA0QFitfPl42Cv2fr5fx4zzTw56Mt6/IONQR6M7ah/8yoPrXb2h5rgQM9KeyuaGy53FclmIpI8v7kZJYBSN+tct0IEPHsFNdkDtqd+w81AuZ6DETM2LCJXnl+DLpcUrtJY1wFMNrhFqAnhS2VjZUWnQ37h+5IN/NlZ/kxePFop/C9tAj+DquMS1tmcww2Q11Lox0JG00wHctthdGO1XPlmIc5Q/+97nRZcSMtkZlknVt6nGrhZkA1bDJOdLWqZpvGNAIw2lYWqh0dr/QFxW6B9WyqrHSw8d24aVZie4TuvgCxvXVjzwW9+Q8jAUUbOQ/VvhqjPPfH1ABg97jpKyXujK1FPSPWTpuzarC5QbZmvVTatc/3/tm/io2XrN0BZ9cIcI7BRs7DKSwFHFvt2ske5jqpBoMx2pb0AGxqxKRwPwGuH3tDmIofKS1PC+zjn7rPOz/vW+pW+rkhH6Ou6mJrOL7mz4lIXIfDmKaUOr9zSMbWAPDeSMZqgVccTIaYB8S4zWbnN6yZIs+GJ7WEeopZpRwx/z9LOvg/O/gq707veF+vytM910XKgd59Tfa1fryw+kOKx2csdVzwc9ao25v+vXn5VuUQeHr9ox2tHMPJkfOdCNZBubtYJX+uFqWDoioyejAd0YGoKuNZH0uj4mQqIIJe+7/OQK9VXv/1z2/ycO/SCuwkmymeof78XH128DV6XX5FoypU9hbv1MCTw8PB1vPrMvCW2dHxSu4uVvLnamEG3AYdv9L7r3k3VzI21ZpE8BcZWQMg4675dB7OD4oTTJLsJHm4dyHLnWu5d+vKfS0NgA6ENjzxURdSVSLZqC+yTTo6XtXOSP6vf36Tj+fL9NnBVzm/SpK93dR3DArX3ByvnXX5inh2mVs3AEQi65aYlRXO11GNAGevAMm+HyqnASAikny53JWL6x35eL50A3xqdBB0uTReeRGYPihdS1a9NeZ6aUxJgJreCENEJHm4d5EfwP3dqzz4fzxfpvduXbnDbeiACv7ZUGRsGVtZzZZ8sw1UKmxOEuPj+VL2d6+Sd6d35OxqN3sPX4b/3K8f705zoUDgy/yPuKuiL9s/dIzkyeFh/m9E0nu3rtKP58v04d6FHB2vZH/3Kn9yXbfrhlfraY7ACo7CtdTzltpbMcoGgGf5RSIi8nDvUr6tdpJnB1/l7Gq3MCpgmHtl1gXf/GRwftpza9rE+Of+Ho5XvOiyevl4kQV+ub9cpV8ud92nrez+WWaZO0rnuqd+0cxy8zQCvOVufD3mVRil89Qty7Or3fTZwVf5ttpJHu5dZg+7jYAuA7GVR6HzNPLnxh78RcaXBJhTSWP5YyLFC+zuYiU3LcpL97UEku6UhvutPektRuJf/riIlI4vopVGYdzei6/iurtYJe9O76TPDr6m//1tL8+hcRLWRFTPa+hZ5l3zNFxdedl7ysa8LowtfkPJfaX3msgxyP/Wj+fLNMvjEhG5vbjO/0ZfvV8ldA34kpCdz1Ua8ZmCyfwhrvcnJ/JttSO3F9fpu9M7bouy1KIecoLMWOkGQI2EwK5b9LNk3TND581Y5Xt0vJK9nSs5v94tVHRWw3qNRFpFz2mrrP9CuRorLFyhYKMbA6NtBLw/ObEaRKmISFZ3f1vtJG4DoInYOiZ2OeFU6qdp/BWKmwSjg7+xDAf9KCWNuVMCbqPAWMnBcemPubwyK38n+Jde61bAXD/xfA0nNUIQyn/RyX3W1FhoL4Eh89XLaVZ3tw3+jqwszWvA+FytkgvHYJQ5ADUUKij3JBphgsxoWD1+vVLAbQxYyTXoRsWytdDjwemykSaZbZMuR7MXH/rZrMGgyt1NvB3d1KY+h4zzqXV9EHsNzHEr8sk2bSKya7F5hfnjV28v3MYCw//dKo3AaIEeUKL+Rz2hlTCF57Kg7owSWMfNDEhTHc1c/11d/z3WnL51DRTKeep10WROGgyHsTRQf1+Y31xvXlOa85z6xdenwF4ZpfL3TcFQ/s3ozW3WgvsHBF5XwIhLfTonxnfnxpg8mamZ+hQAtse7qYbzf/rjvfwl1vpqdCc4vD+V+5sPTEw5+qYCUpHiVAvBvxWrY2E1skKjN5PDCAA6564CeP186VsWmL54tCO/nabJ04PSaTirVngfjBEAq2fpmyKg/FswMv6revv6OXO1AOLFLHu1XqtN/fxnBACdCmz+U2hZ319K8ubDtTw9SNJP52aDezat8K4FKjQrqLt5Gb6NZtCRQE/eWmc+9w2X2qpzDptJmlPffZQGAPpQuJj0qoDXz5fyed1OePPhWh7sJTr4MDLVnhnMVfC3Mv29Gwihlphz2Df6Yo3coL5ExNzG1/da3QibfCOABgB6VzEqIG8+XMun83S0S5nGyBjatLaTnXwF2AfVw/cuo1xzy9uaBhARRgHqqpPTonICvFv/ThENAPTKuFOgqOV/iYgkn87zr7PXMgrQrdDWtaHHJl0BbpC5/W/M64SpgDai6pKXjxdWQyA31UbwtDMcsC16P+3UeKw0NdB0j28E+Yb/zeV/xj02aAB0JJDMpzPPrUx0GsXN1Epm9dyHZLJlTw2LTjlZ/5mqii1HwO9UKPs89FpuxtSdyiVlahMgc6ms+/q53XypjTb1iSdXZnKYAkBffHObk72YhsKq+HyVYWhNdDYsSsOsPhWkayUEGlv9ZhiNQaeojIEJmuOuZkPj7ghY1Wt35/eNmy5l7yPC3gDoEA0AAOhBnQZAxPtkWr8fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAUbLtD9CHo+NV9mW6/r/0d758vNjY5wEAYGh2tv0BepRGfA0AwCxNrhvs9P4ziXwP+sHg/+rtReH718+XnX0uAACGZHINgDU99J8YjxUaC7+dpvL7l7Tws6/eXtAIAABM0pSnAESkMNefuI+pPIH003kx+AtTBQCACZt8A0AkmPCXioi8+XAtny8klZvAP8nESAAAXFNtABSCuM4LODpeybrHL28+XMv9ZSnw0/sHAEza5BoAFb39PMg/2EvSNx+u5cd7SfL5wnw9IwEAgMmaXANAM1YF5F48Kv35qTi9fxIAAQBTNeUGgE7ks5YDJk8P8o6+mwBI7x8AMGmTbADoaQD1fWE5oHouEbnp+dP7BwBM2SQbAAHuvgBW8E9FyhsCAQAwNZNsAFjz/no/ADf4q94+KwAAAJM31Z0ARVTWv4h/hYDq8TP/DwCYvNE3ALLevi+4V931zwn+eYMhGxGwpgLIDQAATMHoGwCyDtyemwAFqeBvPV56LuZ9AQAYuik0ALKAnOqvQ71/T/APzf8T+AEAkzH6JECV3Jdt5BMbrPXaf9/PFaYGAAAYu9E3AERKjQBriZ9P/vqffzorPeZ8T/AHAEwKw9oOY1qA4A8AmCQaAGsEfwDAnExiCqBDbAIEAJgFGgBF7vw/2wIDACaLKQDF2AMgYRoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDS682Ajo5XIusb6mSPvXy86PNXAgCACJtoAIisb60rNAQAABiEnT7f3AnyWeBP5XtjAAAAbEmvDQCPXkcdAABAta1MATD8DwDAdvUWiUPz/+9PTuTd6Z3C66saBa/eXhS+f/182fYjAgAwW71MARjBP/s6FRE3+EflBDjBP3+9bhAAAIB4nTcAPMHflUox8MdOQ2TLCROhEQAAQCt9TAHowG8F+OicACfIu+/jriogqRAAgJr6aACUAnIW4J3Rgfx1kQmBqYgk7rz/umFA8AcAoIGNBVA1NRAV/NXcf0LiHwAA3dj0erx8ekAHf3c+XwV6hvkBAOjYpjcCygO5Ox2gevpmch+9fwAAurOxBoDaFjgfCdDBX9gqGACA3m1kaF0l/+UrAN58uC49JuUh//x7RgEAAOjGJqcASmv/f7yXiH5M1AiB8T0AAGip9waAsfSvMOrw4pH/I9DjBwCgH5saASj14D+dp/L0IEnffLiW+0t7yF9j5z8AALqxySmAQpB/sHcT/EVEPl+Ue/tG759pAAAAOrLpZYCpiKSfzlM3AZDePgAAG7apBoCbyJd8Os8fy7P7VcDnZj8AAPSo950AXz5eZImAeU//H3+/5Xu5tRyw7l0DAQBAhY1sBRx5w5+MTgjMsSoAAIBubDoHoIp1y1/9NQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE/D/AZUGpahD3ifNAAAAAElFTkSuQmCC",
  "vfx_alert_red": "data:image/png;base64,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",
  "vfx_warning_yellow": "data:image/png;base64,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",
  "vfx_levelup_text": "data:image/png;base64,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",
  "vfx_absorb": "data:image/png;base64,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",
  "vfx_haste": "data:image/png;base64,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",
  "vfx_impact_sword": "data:image/png;base64,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",
  "vfx_skull_burst": "data:image/png;base64,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"
};

function registerSuperPixelVFX(scene) {
  if (!scene || !scene.load) return;
  const vfxConfigs = [
    { key: 'vfx_explosion', frameWidth: 96, frameHeight: 96 },
    { key: 'vfx_fire_loop', frameWidth: 80, frameHeight: 128 },
    { key: 'vfx_lightning_aura', frameWidth: 96, frameHeight: 96 },
    { key: 'vfx_alert_red', frameWidth: 80, frameHeight: 80 },
    { key: 'vfx_warning_yellow', frameWidth: 80, frameHeight: 80 },
    { key: 'vfx_levelup_text', frameWidth: 320, frameHeight: 128 },
    { key: 'vfx_absorb', frameWidth: 128, frameHeight: 128 },
    { key: 'vfx_haste', frameWidth: 128, frameHeight: 128 },
    { key: 'vfx_impact_sword', frameWidth: 140, frameHeight: 50 },
    { key: 'vfx_skull_burst', frameWidth: 64, frameHeight: 64 }
  ];

  vfxConfigs.forEach(cfg => {
    if (scene.textures && !scene.textures.exists(cfg.key)) {
      if (typeof SUPER_PIXEL_VFX !== 'undefined' && SUPER_PIXEL_VFX[cfg.key]) {
        scene.load.spritesheet(cfg.key, SUPER_PIXEL_VFX[cfg.key], {
          frameWidth: cfg.frameWidth,
          frameHeight: cfg.frameHeight
        });
      } else {
        scene.load.spritesheet(cfg.key, 'assets/vfx/' + cfg.key + '.png', {
          frameWidth: cfg.frameWidth,
          frameHeight: cfg.frameHeight
        });
      }
    }
  });
}

function createVFXAnimations(scene) {
  if (!scene || !scene.anims) return;
  if (!scene.anims.exists('anim_vfx_explosion') && scene.textures.exists('vfx_explosion')) {
    scene.anims.create({
      key: 'anim_vfx_explosion',
      frames: scene.anims.generateFrameNumbers('vfx_explosion', { start: 0, end: 11 }),
      frameRate: 24,
      hideOnComplete: true
    });
  }
  if (!scene.anims.exists('anim_vfx_fire_loop') && scene.textures.exists('vfx_fire_loop')) {
    scene.anims.create({
      key: 'anim_vfx_fire_loop',
      frames: scene.anims.generateFrameNumbers('vfx_fire_loop', { start: 0, end: 4 }),
      frameRate: 12,
      repeat: -1
    });
  }
  if (!scene.anims.exists('anim_vfx_lightning_aura') && scene.textures.exists('vfx_lightning_aura')) {
    scene.anims.create({
      key: 'anim_vfx_lightning_aura',
      frames: scene.anims.generateFrameNumbers('vfx_lightning_aura', { start: 0, end: 15 }),
      frameRate: 20,
      repeat: -1
    });
  }
  if (!scene.anims.exists('anim_vfx_alert_red') && scene.textures.exists('vfx_alert_red')) {
    scene.anims.create({
      key: 'anim_vfx_alert_red',
      frames: scene.anims.generateFrameNumbers('vfx_alert_red', { start: 0, end: 13 }),
      frameRate: 18,
      repeat: -1
    });
  }
  if (!scene.anims.exists('anim_vfx_warning_yellow') && scene.textures.exists('vfx_warning_yellow')) {
    scene.anims.create({
      key: 'anim_vfx_warning_yellow',
      frames: scene.anims.generateFrameNumbers('vfx_warning_yellow', { start: 0, end: 59 }),
      frameRate: 30,
      repeat: -1
    });
  }
  if (!scene.anims.exists('anim_vfx_levelup_text') && scene.textures.exists('vfx_levelup_text')) {
    scene.anims.create({
      key: 'anim_vfx_levelup_text',
      frames: scene.anims.generateFrameNumbers('vfx_levelup_text', { start: 0, end: 43 }),
      frameRate: 24,
      hideOnComplete: true
    });
  }
  if (!scene.anims.exists('anim_vfx_absorb') && scene.textures.exists('vfx_absorb')) {
    scene.anims.create({
      key: 'anim_vfx_absorb',
      frames: scene.anims.generateFrameNumbers('vfx_absorb', { start: 0, end: 30 }),
      frameRate: 24,
      hideOnComplete: true
    });
  }
  if (!scene.anims.exists('anim_vfx_haste') && scene.textures.exists('vfx_haste')) {
    scene.anims.create({
      key: 'anim_vfx_haste',
      frames: scene.anims.generateFrameNumbers('vfx_haste', { start: 0, end: 28 }),
      frameRate: 24,
      hideOnComplete: true
    });
  }
  if (!scene.anims.exists('anim_vfx_impact_sword') && scene.textures.exists('vfx_impact_sword')) {
    scene.anims.create({
      key: 'anim_vfx_impact_sword',
      frames: scene.anims.generateFrameNumbers('vfx_impact_sword', { start: 0, end: 6 }),
      frameRate: 20,
      hideOnComplete: true
    });
  }
  if (!scene.anims.exists('anim_vfx_skull_burst') && scene.textures.exists('vfx_skull_burst')) {
    scene.anims.create({
      key: 'anim_vfx_skull_burst',
      frames: scene.anims.generateFrameNumbers('vfx_skull_burst', { start: 0, end: 11 }),
      frameRate: 20,
      hideOnComplete: true
    });
  }
}


// --- BUNDLE FILE: JS_Teste/src/combat/weapons.js ---
// =============================================================================

// Schema Unificado de Status de Armas:
// damage, area, attackRate, knockback, projectiles
const WEAPON_SCHEMAS = {
  sword: {
    damage: 1,
    area: 1.0,
    attackRate: 480,
    knockback: 28, // knockback ativo
    projectiles: 1
  },
  bow: {
    damage: 1,
    area: 1.0,
    attackRate: 500,
    knockback: 0, // estritamente 0 para projéteis
    projectiles: 1
  },
  axe: {
    damage: 1,
    area: 1.0,
    attackRate: 560,
    knockback: 28, // knockback ativo que escala com o nível
    projectiles: 1
  },
  firestaff: {
    damage: 1,
    area: 45, // raio de explosão e poça de fogo
    attackRate: 600,
    knockback: 0, // estritamente 0 para projéteis
    projectiles: 1
  },
  shield: {
    damage: 1,
    area: 1.0,
    attackRate: 0,
    knockback: 0,
    projectiles: 0
  }
};

function getWeaponStats(type, lvl = 1) {
  const base = WEAPON_SCHEMAS[type] || { damage: 1, area: 1.0, attackRate: 500, knockback: 0, projectiles: 1 };
  const stats = {
    damage: base.damage,
    area: base.area,
    attackRate: base.attackRate,
    knockback: base.knockback,
    projectiles: base.projectiles
  };

  const effectiveLvl = Math.max(1, lvl);
  const generalMult = 1 + (effectiveLvl - 1) * 0.22;
  stats.damage = Math.max(1, Math.round(base.damage * generalMult));

  // 1. Progressão Contínua e Infinita com Atributos Fortes e Guardrails de Engine
  if (type === 'sword') {
    // ATRIBUTO FORTE: Área / Tamanho (+26% por nível) e Dano (+22% geral)
    stats.area = Math.min(4.2, 1.0 + (effectiveLvl - 1) * 0.26);
    stats.damage = Math.max(2, Math.round(2 * generalMult));
  } else if (type === 'bow') {
    // ATRIBUTO FORTE: Cadência (-14% delay por nível com piso seguro de 90ms a 60 FPS)
    stats.attackRate = Math.max(90, Math.round(500 * Math.pow(0.86, effectiveLvl - 1)));
    stats.damage = Math.max(1, Math.round(1 * generalMult));
  } else if (type === 'axe') {
    // ATRIBUTO FORTE: Knockback (+35% de repulsão por nível até teto de 240px)
    stats.knockback = Math.min(240, Math.round(30 * (1 + (effectiveLvl - 1) * 0.35)));
    stats.damage = Math.max(2, Math.round(2 * generalMult));
  } else if (type === 'firestaff') {
    // ATRIBUTO FORTE: Raio de Explosão e Poça (+22% no raio por nível até teto de 180px)
    stats.area = Math.min(180, Math.round(45 * (1 + (effectiveLvl - 1) * 0.22)));
    stats.damage = Math.max(1, Math.round(1 * generalMult));
  } else if (type === 'shield') {
    stats.area = 1.0 + (effectiveLvl - 1) * 0.15;
    stats.damage = Math.max(1, Math.round(1 * generalMult));
  }

  // 2. Sistema de Pergaminhos: Aplica bônus de até 2 pergaminhos arcanos escolhidos por partida
  const hasScroll = (key) => (typeof chosenScrolls !== 'undefined' && Array.isArray(chosenScrolls)) ? chosenScrolls.includes(key) : (chosenScroll === key);
  const msLvl = hasScroll('multishot') ? (scrollLevels.multishot || 0) : 0;
  const grLvl = hasScroll('growth') ? (scrollLevels.growth || 0) : 0;
  const asLvl = hasScroll('attackspeed') ? (scrollLevels.attackspeed || 0) : 0;

  if (msLvl > 0) {
    stats.projectiles += msLvl;
  }

  if (grLvl > 0) {
    const growthMult = 1.0 + grLvl * 0.22;
    stats.area *= growthMult;
  }

  if (asLvl > 0) {
    const asMult = 1.0 + asLvl * 0.18;
    if (stats.attackRate > 0) {
      stats.attackRate = Math.max(90, Math.round(stats.attackRate / asMult));
    }
  }

  return stats;
}

const WeaponStrategies = {
  bow: {
    id: 'bow',
    name: BUFF_NAMES.bow,
    baseDuration: BUFF_TIME.bow,
    getDuration(lvl, bonusDur, wisdomDur) {
      const l = Math.max(1, lvl);
      const baseDur = Math.min(28.0, this.baseDuration * (1 + (l - 1) * 0.12));
      return Number(baseDur.toFixed(1)) + wisdomDur + bonusDur;
    },
    getAttackRate(lvl) {
      return getWeaponStats('bow', lvl).attackRate;
    },
    attack({ player, arrows, nextProjId }) {
      sound.playBow();
      const lvl = getWeaponLevel('bow');
      const stats = getWeaponStats('bow', lvl);

      const count = stats.projectiles;
      let spreads = [0];
      if (count === 2) spreads = [-0.10, 0.10];
      else if (count === 3) spreads = [-0.18, 0, 0.18];
      else if (count === 4) spreads = [-0.24, -0.08, 0.08, 0.24];
      else if (count >= 5) {
        spreads = [];
        const step = 0.56 / (count - 1);
        for (let i = 0; i < count; i++) {
          spreads.push(-0.28 + i * step);
        }
      }

      const spd = 620;
      const dmg = stats.damage;
      const pierce = 1;
      const arrowKey = 'arrow_player';
      const arrowScale = 0.95 * stats.area;

      spreads.forEach(ang => {
        const arrow = arrows.create(player.x + 20, player.y + 2, arrowKey);
        arrow.setScale(arrowScale);
        arrow.body.setSize(18, 6);
        arrow.dmg = dmg;
        arrow.knockback = 0; // Projéteis: 0 knockback
        arrow.pierceCount = pierce;
        arrow.projId = nextProjId();
        arrow.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
        arrow.rotation = ang;
      });
    }
  },
  sword: {
    id: 'sword',
    name: BUFF_NAMES.sword,
    baseDuration: BUFF_TIME.sword,
    getDuration(lvl, bonusDur, wisdomDur) {
      const l = Math.max(1, lvl);
      const baseDur = Math.min(28.0, this.baseDuration * (1 + (l - 1) * 0.12));
      return Number(baseDur.toFixed(1)) + wisdomDur + bonusDur;
    },
    getAttackRate(lvl) {
      return getWeaponStats('sword', lvl).attackRate;
    },
    onEquip({ swordBlade }) {
      if (swordBlade) {
        swordBlade.setVisible(true);
        swordBlade.setAngle(25);
      }
    },
    onUnequip({ swordBlade }) {
      if (swordBlade) {
        swordBlade.setVisible(false);
      }
    },
    attack({ scene, player, arrows, slashes, fx, nextProjId }) {
      if (!player || !player.active) return;
      slashes.getChildren().slice().forEach(old => old.destroy());

      const lvl = getWeaponLevel('sword');
      const stats = getWeaponStats('sword', lvl);

      // O tamanho/escala do corte e da lâmina escalam diretamente com o atributo de tamanho (stats.area)
      const baseScale = 1.25;
      const scale = baseScale * stats.area;
      const dmg = stats.damage;
      const knockback = stats.knockback;

      // Multiplicação de Slashes pelo Pergaminho Multi-Shot
      const numSlashes = Math.max(1, stats.projectiles || 1);

      // Alternância contínua entre golpes para ataques normais (esquerdo <-> direito)
      if (typeof scene._lastSwordSwingSide === 'undefined') {
        scene._lastSwordSwingSide = 'rl';
      }

      // Execução de cada corte sucessivo
      const executeSlash = (index, side, delay, isLast) => {
        scene.time.delayedCall(delay, () => {
          if (!player || !player.active || (typeof gameState !== 'undefined' && gameState !== 'PLAYING')) return;
          if (!buff || buff.type !== 'sword') return;

          sound.playSword();

          const swingId = nextProjId();
          const isLR = (side === 'lr');
          const texKey = isLR ? 'slash_lr' : 'slash_rl';
          const animKey = isLR ? 'slash_anim_lr' : 'slash_anim_rl';

          // Animação da lâmina persistente empunhada pelo cavaleiro:
          // Corte esquerdo->direito: swing descendente (-65° para 125°)
          // Corte direito->esquerdo: swing ascendente (125° para -65°)
          if (swordBlade && swordBlade.active) {
            scene.tweens.killTweensOf(swordBlade);
            if (isLR) {
              swordBlade.setAngle(-65);
              scene.tweens.add({
                targets: swordBlade,
                angle: 125,
                duration: 120,
                ease: 'Cubic.easeOut',
                onComplete: () => {
                  if (isLast && swordBlade && swordBlade.active && buff && buff.type === 'sword') {
                    scene.tweens.add({ targets: swordBlade, angle: 25, duration: 90, ease: 'Cubic.easeOut' });
                  }
                }
              });
            } else {
              swordBlade.setAngle(125);
              scene.tweens.add({
                targets: swordBlade,
                angle: -65,
                duration: 120,
                ease: 'Cubic.easeOut',
                onComplete: () => {
                  if (isLast && swordBlade && swordBlade.active && buff && buff.type === 'sword') {
                    scene.tweens.add({ targets: swordBlade, angle: 25, duration: 90, ease: 'Cubic.easeOut' });
                  }
                }
              });
            }
          }

          // Posicionamento e angulação do corte:
          // 1. Avança a animação à frente do cavaleiro e ancora na base da lâmina (origin 0.15, 0.5)
          // 2. Mantém o cone estritamente fechado (máximo 3.5° no combo) para não abraçar o jogador
          let offX = 38;
          let offY = 0;
          let deg = 0;

          if (numSlashes > 1) {
            // Em combos multi-shot, inclinação sutil de 3.5° para corte cruzado sem projetar as pontas para trás
            if (isLR) {
              offY = -4;
              deg = -3.5;
            } else {
              offY = 4;
              deg = 3.5;
            }
          }

          const posX = player.x + offX;
          const posY = player.y + offY;

          const slash = slashes.create(posX, posY, texKey);
          slash.setOrigin(0.15, 0.5);
          slash.setScale(scale);
          slash.rotation = Phaser.Math.DegToRad(deg);
          slash.offsetX = offX;
          slash.offsetY = offY;

          // A hitbox física (Arcade Physics Body):
          // No Phaser 3, setSize e setOffset operam em coordenadas base da textura;
          // o motor Arcade multiplica automaticamente sourceWidth/Height e offset por scaleX/scaleY.
          // Com base na lâmina ativa (48x34 em offset 8, 2), a colisão casa 1:1 com o sprite em qualquer nível!
          slash.body.setSize(48, 34);
          slash.body.setOffset(8, 2);

          slash.slashId = swingId;
          slash.dmg = dmg;
          slash.knockback = knockback;

          slash.play(animKey);

          slash.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            if (slash && slash.active) slash.destroy();
          });

          scene.time.delayedCall(220, () => {
            if (slash && slash.active) slash.destroy();
          });

          fx.sparks.explode(4, posX, posY);

          if (numSlashes > 1 && isLast) {
            fx.holy.explode(6, player.x + 32, player.y);
          }
        });
      };

      if (numSlashes === 1) {
        // Golpe único: alterna entre golpe esquerdo e direito a cada ataque
        scene._lastSwordSwingSide = (scene._lastSwordSwingSide === 'lr') ? 'rl' : 'lr';
        executeSlash(0, scene._lastSwordSwingSide, 0, true);
      } else {
        // Multi-Shot: executa sucessão ritmada alternando esquerdo e direito com curto período de delay
        const delayStep = 80;
        for (let i = 0; i < numSlashes; i++) {
          const side = (i % 2 === 0) ? 'lr' : 'rl';
          const delay = i * delayStep;
          const isLast = (i === numSlashes - 1);
          executeSlash(i, side, delay, isLast);
        }
      }
    }
  },
  shield: {
    id: 'shield',
    name: BUFF_NAMES.shield,
    baseDuration: BUFF_TIME.shield,
    getDuration(lvl, bonusDur, wisdomDur) {
      const l = Math.max(1, lvl);
      const baseDur = (l <= 5)
        ? 4.8 * Math.pow(1.35, l - 1)
        : Math.min(24.0, 4.8 * Math.pow(1.35, 4) + (l - 5) * 1.5);
      return Number(baseDur.toFixed(1)) + wisdomDur + bonusDur;
    },
    getAttackRate() { return 0; },
    attack() { /* O escudo é defensivo/reativo a impactos */ },
    onEquip({ shieldSprite, shieldAura, player, fx }) {
      shieldSprite.setVisible(true);
      if (shieldAura) {
        shieldAura.setVisible(true);
        if (player) {
          shieldAura.setPosition(Math.round(player.x), Math.round(player.y));
          fx.holy.explode(10, player.x, player.y);
        }
      }
    },
    onUnequip({ shieldSprite, shieldAura }) {
      shieldSprite.setVisible(false);
      if (shieldAura) shieldAura.setVisible(false);
    }
  },
  axe: {
    id: 'axe',
    name: BUFF_NAMES.axe,
    baseDuration: BUFF_TIME.axe,
    getDuration(lvl, bonusDur, wisdomDur) {
      const l = Math.max(1, lvl);
      const baseDur = Math.min(28.0, this.baseDuration * (1 + (l - 1) * 0.12));
      return Number(baseDur.toFixed(1)) + wisdomDur + bonusDur;
    },
    getAttackRate(lvl) {
      return getWeaponStats('axe', lvl).attackRate;
    },
    attack({ player, arrows, nextProjId }) {
      sound.playSword();
      const lvl = getWeaponLevel('axe');
      const stats = getWeaponStats('axe', lvl);

      const count = stats.projectiles;
      let angles = [0];
      if (count === 2) angles = [-0.15, 0.15];
      else if (count === 3) angles = [-0.24, 0, 0.24];
      else if (count === 4) angles = [-0.30, -0.10, 0.10, 0.30];
      else if (count >= 5) angles = [-0.36, -0.18, 0, 0.18, 0.36];

      const scale = 0.85 * stats.area;
      const dmg = stats.damage;
      const spd = 500;

      angles.forEach(ang => {
        const axe = arrows.create(player.x + 18, player.y, 'axe_proj');
        axe.setScale(scale);
        axe.body.setSize(20, 20);
        axe.isBoomerang = true;
        axe.pierceCount = 99;
        axe.returning = false;
        axe.hitEnemiesOut = new Set();
        axe.hitEnemiesBack = new Set();
        axe.dmg = dmg;
        axe.knockback = stats.knockback; // Machado: SOMENTE Knockback escala por nível
        axe.projId = nextProjId();

        axe.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
        axe.body.setAccelerationX(-680);
      });
    }
  },
  firestaff: {
    id: 'firestaff',
    name: BUFF_NAMES.firestaff,
    baseDuration: BUFF_TIME.firestaff,
    getDuration(lvl, bonusDur, wisdomDur) {
      const l = Math.max(1, lvl);
      const baseDur = Math.min(28.0, this.baseDuration * (1 + (l - 1) * 0.12));
      return Number(baseDur.toFixed(1)) + wisdomDur + bonusDur;
    },
    getAttackRate(lvl) {
      return getWeaponStats('firestaff', lvl).attackRate;
    },
    attack({ player, arrows, nextProjId }) {
      sound.playFireStaff();
      const lvl = getWeaponLevel('firestaff');
      const stats = getWeaponStats('firestaff', lvl);

      const count = stats.projectiles;
      let angles = [0];
      if (count === 2) angles = [-0.14, 0.14];
      else if (count === 3) angles = [-0.22, 0, 0.22];
      else if (count === 4) angles = [-0.28, -0.10, 0.10, 0.28];
      else if (count >= 5) angles = [-0.34, -0.17, 0, 0.17, 0.34];

      // REGRA CRÍTICA: Não aumenta o tamanho da bola de fogo voando, apenas a explosão e poça!
      const projScale = 0.85;
      const blastRadius = Math.round(stats.area);
      const dmg = stats.damage;
      const spd = 480;

      angles.forEach(ang => {
        const fb = arrows.create(player.x + 22, player.y, 'fireball_proj');
        fb.setScale(projScale);
        fb.body.setSize(18, 12);
        fb.isFireball = true;
        fb.blastRadius = blastRadius;
        fb.dmg = dmg;
        fb.knockback = 0; // Projéteis: knockback estritamente 0
        fb.projId = nextProjId();

        fb.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
        fb.rotation = ang;
      });
    }
  }
};

const WeaponSystem = {
  strategies: WeaponStrategies,
  get(type) {
    return this.strategies[type];
  },
  getDuration(type) {
    const s = this.get(type);
    const scrollBonus = (typeof scrollLevels !== 'undefined' && scrollLevels.duration) ? scrollLevels.duration * 1.5 : 0;
    if (!s) return (BUFF_TIME[type] || 10.0) + scrollBonus;
    return s.getDuration(getWeaponLevel(type), runBonusDuration + scrollBonus, getWisdomBonusDuration());
  },
  getAttackRate(type) {
    const s = this.get(type);
    if (!s) return ATTACK_RATE[type] || 0;
    return s.getAttackRate(getWeaponLevel(type));
  },
  equip(scene, type, announce = true) {
    const s = this.get(type);
    const sameType = buff.type === type;
    const dur = this.getDuration(type);
    const lvl = getWeaponLevel(type);

    buff = {
      type,
      timeLeft: dur,
      maxTime: dur,
      nextAttack: sameType ? buff.nextAttack : 0
    };

    if (s && s.onEquip) {
      s.onEquip({ shieldSprite, shieldAura, swordBlade, player, fx: { holy: holyFx } });
    } else {
      shieldSprite.setVisible(false);
      if (shieldAura) shieldAura.setVisible(false);
      if (swordBlade) swordBlade.setVisible(false);
    }
    if (type !== 'sword' && swordBlade) {
      swordBlade.setVisible(false);
    }

    if (announce && player) {
      floatText(scene, player.x, player.y - 24, `${BUFF_NAMES[type]} NV.${lvl}!`, '#ffca28');
    }
    events.emit(GameEvents.BUFF_EQUIPPED, { type, level: lvl, duration: dur });
    updateItemHUD();
  },
  end(scene) {
    const prevType = buff.type;
    const s = this.get(prevType);
    if (s && s.onUnequip) {
      s.onUnequip({ shieldSprite, shieldAura, swordBlade });
    } else {
      shieldSprite.setVisible(false);
      if (shieldAura) shieldAura.setVisible(false);
      if (swordBlade) swordBlade.setVisible(false);
    }
    buff = { type: null, timeLeft: 0, maxTime: 0, nextAttack: 0 };
    if (playerBuffBar) playerBuffBar.clear();
    events.emit(GameEvents.BUFF_ENDED, { type: prevType });

    if (backpackWeapon) {
      const nextW = backpackWeapon;
      backpackWeapon = null;
      if (typeof updateBackpackHUD === 'function') updateBackpackHUD();
      if (scene) {
        this.equip(scene, nextW, true);
      }
    } else {
      updateItemHUD();
    }
  },
  update(scene, time, dt) {
    if (!buff.type) return;
    buff.timeLeft -= dt;
    if (buff.timeLeft <= 0) {
      this.end(scene);
      return;
    }
    const s = this.get(buff.type);
    if (!s) return;
    const rate = s.getAttackRate(getWeaponLevel(buff.type));
    if (rate && time > buff.nextAttack) {
      s.attack({
        scene,
        player,
        arrows: playerArrows,
        slashes,
        fx: { sparks: sparksFx, holy: holyFx, ember: emberFx, hit: hitFx },
        getLevel: getWeaponLevel,
        nextProjId: () => ++slashCounter
      });
      buff.nextAttack = time + rate;
    }
  }
};

function getWeaponDuration(type) {
  return WeaponSystem.getDuration(type);
}

function equipWeaponBuff(scene, type, announce = true) {
  WeaponSystem.equip(scene, type, announce);
}

function collectItem(scene, item) {
  sound.playItemCollect();
  const newType = item.lootType;
  removeEntity(item);

  const hasPack = typeof hasBackpack === 'function' ? hasBackpack() : false;

  if (!hasPack) {
    equipWeaponBuff(scene, newType, true);
  } else {
    if (!buff.type) {
      equipWeaponBuff(scene, newType, true);
    } else if (!backpackWeapon) {
      backpackWeapon = newType;
      floatText(scene, player.x, player.y - 28, `${BUFF_NAMES[newType]} NA MOCHILA!`, '#7fe7ff');
      if (typeof updateBackpackHUD === 'function') updateBackpackHUD();
    } else {
      const fromBackpack = backpackWeapon;
      backpackWeapon = newType;
      floatText(scene, player.x, player.y - 28, `${BUFF_NAMES[newType]} NA MOCHILA!`, '#7fe7ff');
      if (typeof updateBackpackHUD === 'function') updateBackpackHUD();
      equipWeaponBuff(scene, fromBackpack, true);
    }
  }
}

function endBuff() {
  WeaponSystem.end();
}

function createFirePool(scene, x, y, radius, dmg) {
  const pool = {
    x,
    y,
    radius: Math.max(26, radius * 0.85),
    dmg: 1, // 1 de dano por pulso
    duration: 3.0, // 3 segundos no chão
    elapsed: 0,
    tickCooldown: 0.35, // pulso a cada 0.35s
    tickTimer: 0.1,
    graphics: scene.add.graphics().setDepth(-4),
    sprite: (scene.anims && scene.anims.exists('anim_vfx_fire_loop')) ? scene.add.sprite(x, y - 8, 'vfx_fire_loop').play('anim_vfx_fire_loop').setDepth(y - 1).setScale(0.65) : null
  };
  activeFirePools.push(pool);
}

function updateFirePools(scene, dt) {
  if (!activeFirePools.length) return;
  for (let i = activeFirePools.length - 1; i >= 0; i--) {
    const p = activeFirePools[i];
    p.elapsed += dt;
    const curWorldSpeed = typeof worldSpeed !== 'undefined' ? worldSpeed : ((enemySpeed || 195) * 0.6);
    p.x -= curWorldSpeed * dt;
    if (p.sprite && p.sprite.active) p.sprite.setPosition(p.x, p.y - 8);
    p.tickTimer -= dt;

    p.graphics.clear();

    const alpha = 0.88 + Math.sin(p.elapsed * 8) * 0.10;
    const pulse = 1 + Math.sin(p.elapsed * 12) * 0.08;
    const curRad = p.radius * pulse;

    // Círculo externo de brasas
    p.graphics.fillStyle(0xd84315, alpha * 0.35);
    p.graphics.fillCircle(p.x, p.y, curRad);

    // Círculo médio de fogo
    p.graphics.fillStyle(0xff7043, alpha * 0.55);
    p.graphics.fillCircle(p.x, p.y, curRad * 0.65);

    // Núcleo incandescente
    p.graphics.fillStyle(0xffeb3b, alpha * 0.75);
    p.graphics.fillCircle(p.x, p.y, curRad * 0.3);

    // Borda rúnica
    p.graphics.lineStyle(2, 0xffa000, alpha * 0.8);
    p.graphics.strokeCircle(p.x, p.y, curRad);

    if (Math.random() < 0.25) {
      emberFx.emitParticleAt(
        p.x + Phaser.Math.Between(-curRad * 0.7, curRad * 0.7),
        p.y + Phaser.Math.Between(-curRad * 0.5, curRad * 0.5),
        1
      );
    }

    // Aplica dano contínuo SOMENTE a inimigos que pisarem no fogo (NUNCA ao jogador!)
    if (p.tickTimer <= 0) {
      p.tickTimer = p.tickCooldown;
      enemies.getChildren().forEach(e => {
        if (e.active && Phaser.Math.Distance.Between(p.x, p.y, e.x, e.y) <= curRad) {
          damageEnemy(scene, e, p.dmg);
          hitFx.explode(2, e.x, e.y);
        }
      });
    }

    if (p.x < -100) {
      if (p.sprite && p.sprite.active) p.sprite.destroy();
      p.graphics.destroy();
      activeFirePools.splice(i, 1);
    }
  }
}

function clearFirePools() {
  activeFirePools.forEach(p => {
    if (p.graphics && p.graphics.destroy) p.graphics.destroy();
  });
  activeFirePools = [];
}

function explodeFireball(scene, x, y, radius, dmg) {
  sound.playEarthSmash();
  emberFx.explode(10, x, y);
  hitFx.explode(6, x, y);

  if (scene.anims && scene.anims.exists('anim_vfx_explosion')) {
    const explosionSprite = scene.add.sprite(x, y, 'vfx_explosion')
      .setDepth(1560)
      .setScale(Math.max(0.75, (radius * 1.8) / 96))
      .play('anim_vfx_explosion');
    explosionSprite.once('animationcomplete', () => { if (explosionSprite && explosionSprite.active) explosionSprite.destroy(); });
  }

  const blastOuter = scene.add.circle(x, y, 10, 0xff7043, 0.40)
    .setStrokeStyle(2, 0xffeb3b, 0.85).setDepth(1550);
  const blastInner = scene.add.circle(x, y, 6, 0xffffff, 0.65)
    .setStrokeStyle(1.5, 0xffca28, 0.9).setDepth(1551);

  scene.tweens.add({
    targets: blastOuter,
    radius,
    alpha: 0,
    duration: 220,
    ease: 'Cubic.easeOut',
    onComplete: () => blastOuter.destroy()
  });
  scene.tweens.add({
    targets: blastInner,
    radius: Math.round(radius * 0.60),
    alpha: 0,
    duration: 160,
    ease: 'Cubic.easeOut',
    onComplete: () => blastInner.destroy()
  });

  // Cria poça de fogo circular no solo que queima apenas inimigos
  createFirePool(scene, x, y, radius, dmg);

  enemies.getChildren().slice().forEach(e => {
    if (e.active && Phaser.Math.Distance.Between(x, y, e.x, e.y) <= radius) {
      if (e.enemyType === 'dark_mage' && e.isShieldActive) return;
      damageEnemy(scene, e, dmg);
    }
  });
  enemyArrows.getChildren().slice().forEach(a => {
    if (a.active && Phaser.Math.Distance.Between(x, y, a.x, a.y) <= radius * 0.9) {
      a.destroy();
    }
  });
}


function triggerPlayerAction(scene) {
  if (!player || !player.active || gameState !== 'PLAYING') return;
  if (!buff || !buff.type) return;
  const s = WeaponSystem.get(buff.type);
  if (s && s.attack) {
    s.attack({
      scene,
      player,
      arrows: playerArrows,
      slashes,
      fx: { sparks: sparksFx, holy: holyFx, ember: emberFx, hit: hitFx },
      getLevel: getWeaponLevel,
      nextProjId: () => ++slashCounter
    });
  }
}


// --- BUNDLE FILE: JS_Teste/src/combat/combatManager.js ---
// =============================================================================
// GERENCIADOR DE COMBATE, DANO, COLISÕES E EVENTOS DE COMBATE
// =============================================================================
// COMBATE, DROPS DE XP/PRATA, LEVEL UP & ARMAS REBALANCEADAS (NV. 1 A 5)


// --- BUNDLE FILE: JS_Teste/src/combat/combatManager.js ---
// =============================================================================
// GERENCIADOR DE COMBATE, DANO, COLISÕES E EVENTOS DE COMBATE
// =============================================================================
// COMBATE, DROPS DE XP/PRATA, LEVEL UP & ARMAS REBALANCEADAS (NV. 1 A 5)
// =============================================================================
function removeEntity(obj) {
  if (!obj || !obj.active) return;
  obj.scene.tweens.killTweensOf(obj);
  if (obj.shootTimer) obj.shootTimer.remove();
  if (obj.attackTimer) obj.attackTimer.remove();
  if (obj.dormantTimer) obj.dormantTimer.remove();
  if (obj.shieldTimer) obj.shieldTimer.remove();
  if (obj.shieldCooldownTimer) obj.shieldCooldownTimer.remove();
  if (obj.shieldVisual && obj.shieldVisual.active) obj.shieldVisual.destroy();
  if (obj.barrierSprite && obj.barrierSprite.active) obj.barrierSprite.destroy();
  if (obj.activeTelegraphs) clearBossTelegraphs(obj);
  if (obj.chargeRing && obj.chargeRing.active) obj.chargeRing.destroy();
  if (obj.crackDecal && obj.crackDecal.active) obj.crackDecal.destroy();
  if (obj.speechBubble && obj.speechBubble.active) obj.speechBubble.destroy();
  obj.destroy();
}

// HITSTOP MILIMÉTRICO (Micro-freeze tátil de impacto em golpes pesados)
function triggerHitstop(scene, durationMs = 45) {
  if (!scene || isHitstopping || gameState !== 'PLAYING') return;
  if (!scene.physics || !scene.physics.world) return;

  isHitstopping = true;
  scene.physics.world.isPaused = true;
  if (scene.anims && scene.anims.pauseAll) {
    scene.anims.pauseAll();
  }

  let resumed = false;
  const resume = () => {
    if (resumed) return;
    resumed = true;
    isHitstopping = false;
    if (gameState === 'PLAYING') {
      if (scene && scene.physics && scene.physics.world) {
        scene.physics.world.isPaused = false;
      }
      if (scene && scene.anims) {
        if (scene.anims.resumeAll) scene.anims.resumeAll();
        scene.anims.paused = false;
      }
    }
  };

  if (scene.time && scene.time.delayedCall) {
    scene.time.delayedCall(durationMs, resume);
  }
  setTimeout(resume, durationMs + 25);
}

function damageEnemy(scene, enemy, dmg = 1) {
  if (!enemy || !enemy.active) return;

  // Mini Golem: Na forma inconsciente/inanimada (EJECTING, DORMANT, AWAKENING), é invulnerável a qualquer dano
  if (enemy.enemyType === 'mini_golem' && enemy.golemState !== 'ACTIVE') {
    sound.playShieldBlock();
    if (debrisFx) debrisFx.explode(4, enemy.x, enemy.y);
    return;
  }

  enemy.hp = (enemy.hp ?? 1) - dmg;

  // Faíscas metálicas pontuais para alvos blindados (guerreiros e boss) ou hit normal
  if (enemy.isBoss || enemy.enemyType === 'warrior') {
    sparksFx.explode(8, enemy.x - 12, enemy.y);
  } else if (enemy.enemyType === 'mini_golem') {
    debrisFx.explode(6, enemy.x, enemy.y);
  } else if (enemy.enemyType === 'goblin_scout') {
    sparksFx.explode(6, enemy.x, enemy.y);
    hitFx.explode(6, enemy.x, enemy.y);
  } else {
    hitFx.explode(7, enemy.x, enemy.y);
  }

  // Flash branco estrito de impacto (65ms) sem interferir nos frames ou parar ciclo de animação
  if (enemy.setTintFill) {
    enemy.setTintFill(0xffffff);
  } else {
    enemy.setTint(0xffffff);
  }
  scene.time.delayedCall(65, () => {
    if (!enemy || !enemy.active) return;
    if (enemy.hp > 0) {
      if (enemy.setTintFill) enemy.setTintFill(0xffca28);
      else enemy.setTint(0xffca28);
      scene.time.delayedCall(65, () => {
        if (enemy && enemy.active) enemy.clearTint();
      });
    } else {
      enemy.clearTint();
    }
  });

  if (enemy.isBoss) {
    updateBossHUD();
    if (enemy.hp <= 0) {
      defeatBoss(scene, enemy);
    } else {
      sound.playShieldBlock();
    }
    return;
  }

  if (enemy.hp <= 0) {
    killEnemy(enemy);
  } else {
    sound.playShieldBlock();
    // Projéteis e dano geral não alteram a posição do inimigo (knockback exclusivo da espada)
  }
}

// Empurrão suave exclusivo da espada: interpola a posição X com desaceleração Cubic.easeOut
// e pausa temporariamente a velocidade para evitar conflitos de física ou marcha a ré involuntária
function applySmoothKnockback(scene, enemy, distance = 22, duration = 130) {
  if (!enemy || !enemy.active || enemy.isBoss || enemy.hp <= 0) return;
  if (enemy.enemyType === 'mini_golem' && enemy.golemState !== 'ACTIVE') return;

  const cfg = ENEMIES[enemy.enemyType] || { speed: 1 };
  const baseVx = -Math.max(60, (enemySpeed || 85) * (cfg.speed || 1));
  const currentX = enemy.x;
  const targetX = Math.min(780, currentX + distance);

  scene.tweens.killTweensOf(enemy, ['x']);

  if (enemy.body) {
    enemy.setVelocityX(0);
  }

  // Interpolação suave e orgânica que adapta o tempo à magnitude do impacto
  const safeDuration = (duration && duration !== 130) ? duration : Math.min(190, 115 + Math.round(distance * 0.35));

  scene.tweens.add({
    targets: enemy,
    x: targetX,
    duration: safeDuration,
    ease: 'Cubic.easeOut',
    onUpdate: () => {
      if (enemy && enemy.active && enemy.body) {
        enemy.body.updateFromGameObject();
      }
    },
    onComplete: () => {
      if (!enemy || !enemy.active || enemy.hp <= 0) return;
      if (enemy.enemyType === 'mini_golem' && enemy.golemState !== 'ACTIVE') return;
      if (enemy.body) {
        enemy.body.updateFromGameObject();
        enemy.setVelocityX(baseVx);
      }
    }
  });
}

// =============================================================================
// OUVINTES DE EVENTOS DESACOPLADOS (Observer / Listeners)
// Isola efeitos de áudio, partículas visuais, conquistas e drops da lógica central
// =============================================================================
function setupDecoupledEventListeners(scene) {
  events.clear();

  // 1. ÁUDIO REATIVO
  events.on(GameEvents.ENEMY_KILLED, () => sound.playEnemyHit());









  // 2. EFEITOS VISUAIS (VFX)
  events.on(GameEvents.ENEMY_KILLED, ({ scene, x, y, enemyType }) => {
    hitFx.explode(10, x, y);
    if (scene && scene.anims && scene.anims.exists('anim_vfx_skull_burst')) {
      const skull = scene.add.sprite(x, y, 'vfx_skull_burst').setScale(0.85).play('anim_vfx_skull_burst').setDepth(y + 2);
      skull.once('animationcomplete', () => { if (skull && skull.active) skull.destroy(); });
    }
    if (enemyType === 'warrior') {
      sparksFx.explode(8, x, y);
      debrisFx.explode(5, x, y);
    } else if (enemyType === 'mini_golem') {
      debrisFx.explode(8, x, y);
      sparksFx.explode(4, x, y);
    } else if (enemyType === 'dark_mage') {
      holyFx.explode(8, x, y);
    }
  });

  // 3. CONQUISTAS DESACOPLADAS
  events.on(GameEvents.ENEMY_KILLED, ({ scene, enemyType }) => {
    if (enemyType === 'goblin') recordAchievementProgress(scene, 'goblins', 1);
    else if (enemyType === 'warrior') recordAchievementProgress(scene, 'warriors', 1);
    else if (enemyType === 'dark_mage') recordAchievementProgress(scene, 'mages', 1);
  });



  // 4. SISTEMA DE LOOT & RECOMPENSAS
  events.on(GameEvents.ENEMY_KILLED, ({ scene, enemyType, x, y, xpValue }) => {
    const dropRates = { dark_mage: 0.32, warrior: 0.25, elf: 0.18, goblin: 0.12, goblin_scout: 0.14, mini_golem: 0.08 };
    const chance = dropRates[enemyType] ?? 0.12;

    if (Math.random() < 0.75) {
      spawnXpOrb(scene, x - 6, y, xpValue);
    }

    if (Math.random() < chance) {
      const count = (enemyType === 'dark_mage' || enemyType === 'warrior') && Math.random() < 0.42 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        spawnCoinDrop(scene, x + 8 + i * 10, y);
      }
    }
  });
}

function killEnemy(enemy) {
  if (!enemy || !enemy.active) return;
  const scene = enemy.scene;
  const ex = enemy.x, ey = enemy.y;
  const eType = enemy.enemyType;
  const xpValue = ENEMIES[eType]?.xp ?? 2;

  removeEntity(enemy);

  // Emite evento para que áudio, partículas, conquistas e drops respondam de forma modular
  events.emit(GameEvents.ENEMY_KILLED, {
    scene,
    enemy,
    enemyType: eType,
    x: ex,
    y: ey,
    xpValue
  });
}


function playerHit(scene, hazard) {
  if (gameState !== 'PLAYING' || !hazard.active) return;
  if (hazard.enemyType === 'mini_golem' && hazard.golemState !== 'ACTIVE') return;

  if (buff.type === 'shield') {
    const lvl = getWeaponLevel('shield');

    // 1. ESCUDO SAGRADO REFLETE PROJÉTEIS MANTENDO A COR/ASPECTO NORMAL + CONTABILIZA CONQUISTA!
    if (enemyArrows.contains(hazard)) {
      const hx = hazard.x, hy = hazard.y;
      hazard.destroy();

      sound.playShieldBlock();
      sparksFx.explode(10, hx, hy);
      holyFx.explode(8, hx, hy);
      floatText(scene, player.x, player.y - 28, 'FLECHA REFLETIDA!', '#7fe7ff');
      recordAchievementProgress(scene, 'reflected', 1);
      events.emit(GameEvents.SHIELD_REFLECT, { scene });
      const effectiveLvl = Math.max(1, lvl);
      let spreads = [-0.28, -0.14, 0, 0.14, 0.28];
      if (effectiveLvl === 1 || effectiveLvl === 2) spreads = [0];
      else if (effectiveLvl === 3) spreads = [-0.12, 0.12];
      else if (effectiveLvl === 4) spreads = [-0.20, 0, 0.20];

      spreads.forEach(ang => {
        const reflArrow = playerArrows.create(player.x + 20, player.y, 'arrow_player');
        reflArrow.body.setSize(18, 8);
        reflArrow.dmg = lvl >= 4 ? (lvl >= 6 ? Math.round(2 * (1 + 0.12 * (lvl - 5))) : 2) : 1;
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
    const bossDmg = lvl <= 5 ? [2, 3, 5, 7, 10][lvl - 1] : 10 + (lvl - 5) * 2;

    holyFx.explode(28, player.x, player.y);
    sparksFx.explode(16, player.x, player.y);

    const wave = scene.add.circle(player.x, player.y, 16, 0x7fe7ff, 0.40)
      .setStrokeStyle(3, 0xffffff).setDepth(1600);
    const innerWave = scene.add.circle(player.x, player.y, 10, 0xffe082, 0.60)
      .setStrokeStyle(2, 0xffffff).setDepth(1601);

    scene.tweens.add({
      targets: [wave, innerWave],
      radius: shockRadius,
      alpha: 0,
      duration: 320,
      ease: 'Cubic.easeOut',
      onComplete: () => {
        if (wave.active) wave.destroy();
        if (innerWave.active) innerWave.destroy();
      }
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
  triggerHitstop(scene, 55);

  if (playerHp > 0) {
    playerInvulnerable = true;
    if (enemyArrows.contains(hazard)) {
      hazard.destroy();
    } else if (hazard && hazard.active && !hazard.isBoss && !hazard.isBossAttack) {
      killEnemy(hazard);
    }

    sound.playPlayerHurt();
    events.emit(GameEvents.PLAYER_HIT, { scene, hp: playerHp });
    sparksFx.explode(8, player.x, player.y);
    hitFx.explode(14, player.x, player.y);
    if (player.setTintFill) player.setTintFill(0xffffff);
    else player.setTint(0xffffff);
    scene.time.delayedCall(75, () => {
      if (player && player.active) player.clearTint();
    });
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
  isHitstopping = false;
      }
    });
    return;
  }

  gameOver(scene);
}

function gameOver(scene) {
  if (gameState === 'GAMEOVER') return;
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.gameplayStop();
  gameState = 'GAMEOVER';
  playerInvulnerable = false;
  isHitstopping = false;
  pendingLevelUps = 0;

  consolidateSilverToGold();
  clearFirePools();

  if (shieldSprite) shieldSprite.setVisible(false);
  if (shieldAura) shieldAura.setVisible(false);
  if (swordBlade) swordBlade.setVisible(false);
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
  events.emit(GameEvents.PLAYER_DIED, { scene });
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



// --- BUNDLE FILE: JS_Teste/src/combat/lootManager.js ---
// =============================================================================
// GERENCIADOR DE DROPS, XP, MOEDAS E ATRAÇÃO MAGNÉTICA
// =============================================================================
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
  events.emit(GameEvents.XP_GAINED, { amount: gained, x: ox, y: oy });
  hitFx.explode(4, ox, oy);
  if (orb.magnetized && scene && scene.anims && scene.anims.exists('anim_vfx_absorb')) {
    const abs = scene.add.sprite(player.x, player.y, 'vfx_absorb').play('anim_vfx_absorb').setScale(0.6).setDepth(player.depth + 1);
    abs.once('animationcomplete', () => { if (abs && abs.active) abs.destroy(); });
  }
  removeEntity(orb);
  gainXp(scene, gained);
}

function gainXp(scene, amount) {
  runXp += amount;
  while (runXp >= xpToNextLevel) {
    runXp -= xpToNextLevel; // mantém todo o XP excedente!
    runLevel++;
    events.emit(GameEvents.LEVEL_UP, { level: runLevel });
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
  events.emit(GameEvents.COIN_COLLECTED, { amount: val, x: cx, y: cy });
  hitFx.explode(6, cx, cy);
  floatText(scene, cx, cy - 16, `+${val} PRATA`, '#e0f7fa');
  removeEntity(coin);
}



// --- BUNDLE FILE: JS_Teste/src/world/director.js ---
// =============================================================================
// DIRETOR DO MUNDO: ONDAS DE SPAWN, VILA INICIAL E ELEMENTOS AMBIENTAIS
// =============================================================================
// SPAWNS & BOSS FIGHT (60 SEGUNDOS)
// =============================================================================
function spawnStartingVillage(scene) {
  if (villageDecor) villageDecor.clear(true, true);

  // 1. Pátio Calçado Unificado da Vila (Conecta Ferreiro, Estábulo, Chalés, Caminho e Portão em 16:9)
  const plaza = villageDecor.create(235, 285, 'village_plaza');
  plaza.lockedY = 285;
  plaza.isGroundPlaza = true;
  plaza.setDepth(-8.5);

  // 2. Ala Norte da Vila: Chalés + Casa do Ferreiro (Forja Acesa, Bigorna e Armas)
  const hNorth1 = villageDecor.create(62, 140, 'village_house');
  hNorth1.lockedY = 140; hNorth1.groundY = 170;

  const blacksmith = villageDecor.create(186, 146, 'village_blacksmith');
  blacksmith.lockedY = 146; blacksmith.groundY = 186;

  const hNorth2 = villageDecor.create(306, 140, 'village_house');
  hNorth2.lockedY = 140; hNorth2.groundY = 170;

  // 3. Ala Sul da Vila: Chalés + Casa do Cuidador de Cavalos / Estábulo (com Cavalo e Feno)
  const hSouth1 = villageDecor.create(68, 430, 'village_house');
  hSouth1.lockedY = 430; hSouth1.groundY = 460;

  const stable = villageDecor.create(200, 428, 'village_stable');
  stable.lockedY = 428; stable.groundY = 468;

  const hSouth2 = villageDecor.create(316, 430, 'village_house');
  hSouth2.lockedY = 430; hSouth2.groundY = 460;

  // 4. Muralha de Paliçada Contínua + O Grande Portão de Saída da Vila (x = 415)
  const wallTop = villageDecor.create(415, 120, 'village_wall_v');
  wallTop.lockedY = 120; wallTop.groundY = 168;

  const gateTop = villageDecor.create(415, 195, 'village_gate_tower');
  gateTop.lockedY = 195; gateTop.groundY = 241;

  const gateBottom = villageDecor.create(415, 375, 'village_gate_tower');
  gateBottom.lockedY = 375; gateBottom.groundY = 421;

  const wallBottom = villageDecor.create(415, 450, 'village_wall_v');
  wallBottom.lockedY = 450; wallBottom.groundY = 498;

  // 5. Moradores (NPCs) paradinhos na beira do caminho dando tchau e desejando boa sorte!
  const npcSpecs = [
    { x: 186, y: 215, tint: 0xffd8b0, msg: 'Boa sorte!' },
    { x: 345, y: 218, tint: 0xb3e5fc, msg: 'Força, Herói!' },
    { x: 202, y: 355, tint: 0xc8e6c9, msg: 'Proteja o Reino!' },
    { x: 345, y: 352, tint: 0xfff59d, msg: 'Vá com luz!' }
  ];
  npcSpecs.forEach(spec => {
    const npc = villageDecor.create(spec.x, spec.y, 'village_npc');
    npc.lockedY = spec.y;
    npc.groundY = spec.y + 13;
    npc.setTint(spec.tint);
    npc.play('village_npc');
    npc.speechBubble = scene.add.text(spec.x, spec.y - 24, spec.msg, {
      ...roundedTextStyle('#fff8e1', 11, 'bold', '#16120e', 3)


    }).setOrigin(0.5).setDepth(spec.y + 30);
  });

  // Anúncio nobre de partida da jornada
  floatText(scene, GAME_WIDTH / 2, 130, 'SAINDO DA VILA DE VALE DOURADO', '#ffca28');
}

function startGameplay(scene) {
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.gameplayStart();
  gameState = 'PLAYING';
  isHitstopping = false;
  survivalTime = 0;
  runSilver = 0;
  runGold = 0;
  runXp = 0;
  runLevel = 1;
  xpToNextLevel = getXpRequiredForLevel(1);
  pendingLevelUps = 0;
  const up = typeof StorageManager !== 'undefined' ? StorageManager.getUpgrades() : {};
  runWeaponLevels = {
    bow: up.bow?.level || 1,
    sword: up.sword?.level || 1,
    shield: up.shield?.level || 1,
    axe: up.axe?.level || 1,
    firestaff: up.firestaff?.level || 1
  };
  chosenScrolls = [];
  chosenScroll = null;
  scrollLevels = { multishot: 0, growth: 0, attackspeed: 0, duration: 0 };
  if (typeof updateScrollHUD === 'function') updateScrollHUD();
  clearFirePools();
  enemySpeed = 195;
  worldSpeed = enemySpeed * 0.6;
  if (typeof window !== 'undefined') window.worldSpeed = worldSpeed;
  spawnDelay = 1150; // Início suave e cadenciado para acumular XP e upgrades
  nextHordeTime = 45;
  hordeCycleCount = 0;
  runBonusDuration = 0;
  lastRunSummary = null;
  playerMaxHp = getPlayerMaxHp();
  playerHp = playerMaxHp;
  playerInvulnerable = false;

  // Destrava e sincroniza física, tempo e ciclo de animação ao iniciar/reiniciar
  if (scene.physics && scene.physics.world) {
    scene.physics.resume();
    scene.physics.world.isPaused = false;
  }
  scene.time.paused = false;
  scene.time.timeScale = 1;
  if (scene.anims) {
    if (scene.anims.resumeAll) scene.anims.resumeAll();
    scene.anims.paused = false;
  }

  if (player) {
    scene.tweens.killTweensOf(player);
    player.setPosition(180, 285).setFlipX(false).setAngle(0).setAlpha(1).clearTint().setVisible(true);
    if (player.anims) player.anims.isPaused = false;
    player.play({ key: 'knight', repeat: -1 });
  }
  if (shieldSprite) shieldSprite.setVisible(false);
  if (shieldAura) shieldAura.setVisible(false);
  if (swordBlade) swordBlade.setVisible(false);
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
  // starter weapon check
  if (up.starterWeapon && up[up.starterWeapon]?.unlocked) {
    const starter = items.create(475, 285, 'item_' + up.starterWeapon);
    starter.lootType = up.starterWeapon;
    starter.groundY = 303;
  }

  const every = (delay, fn) => scene.time.addEvent({ delay, loop: true, callback: () => gameState === 'PLAYING' && fn() });
  every(1000, () => {
    survivalTime++;
    if (hudGloryText) hudGloryText.setText(`${survivalTime}s`);
    if (survivalTime > getBestScore() && hudBestText) {
      hudBestText.setText(`${survivalTime}s`);
    }
    if (survivalTime >= nextHordeTime && (!activeBoss || !activeBoss.active)) {
      hordeCycleCount++;
      nextHordeTime = survivalTime + 45;
      triggerSpecialHorde(scene, hordeCycleCount);
    }
    if (survivalTime === 52 && !bossSpawned) {
      floatText(scene, GAME_WIDTH / 2, 120, 'PREPARE-SE: ESTRONDO NAS PROFUNDEZAS!', '#ffca28');
    }
    if (survivalTime === BOSS_TRIGGER_TIME && !bossSpawned) {
      startBossFight(scene);
    }
  });

  // Director Dinâmico: ajusta velocidade e intervalo progressivamente ao longo da Run
  every(4000, () => {
    // GDD v1.0 Section 6: Durante o Boss, o aumento de dificuldade congela temporariamente
    if (activeBoss && activeBoss.active) return;
    if (survivalTime < 20) {
      enemySpeed = Math.min(205, enemySpeed + 2);
      spawnDelay = Math.max(950, spawnDelay - 30);
    } else if (survivalTime < 45) {
      enemySpeed = Math.min(265, enemySpeed + 8);
      spawnDelay = Math.max(650, spawnDelay - 45);
    } else {
      enemySpeed = Math.min(MAX_ENEMY_SPEED, enemySpeed + 12);
      spawnDelay = Math.max(220, spawnDelay - 40);
    }

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
      floatText(scene, GAME_WIDTH / 2, 120, 'ADENTRANDO A FLORESTA PROIBIDA...', '#7fe7ff');
      nextDirectorWave();
    }
  });
}

// Director Dinâmico: calcula quantos inimigos surgem por onda de acordo com o tempo da partida
function spawnDirectorWave(scene) {
  // Durante a Boss Fight, pausa completamente a geração de inimigos comuns!
  // Apenas Mini-Golems expelidos pelo corpo do Golem de Pedra atuam na arena.
  if (activeBoss && activeBoss.active) {
    return;
  }

  // Cap dinâmico de segurança de inimigos simultâneos na tela (preserva 60 FPS estáveis)
  const maxEnemiesOnScreen = survivalTime < 20 ? 10 : (survivalTime < 45 ? 22 : Math.min(55, 24 + Math.floor(survivalTime / 5)));
  const currentActiveEnemies = enemies.getChildren().filter(e => e.active && !e.isBoss).length;
  if (currentActiveEnemies >= maxEnemiesOnScreen) {
    return;
  }

  let waveCount = 1;
  const r = Math.random();
  if (bossDefeated || survivalTime >= 100) {
    waveCount = r < 0.45 ? 6 : (r < 0.80 ? 5 : 4);
  } else if (survivalTime >= 70) {
    waveCount = r < 0.45 ? 5 : (r < 0.80 ? 4 : 3);
  } else if (survivalTime >= 45) {
    waveCount = r < 0.50 ? 3 : 2;
  } else if (survivalTime >= 20) {
    waveCount = r < 0.65 ? 2 : 1;
  } else {
    // Comeco calmo e focado em farm de XP (0 - 20s): estritamente 1 monstro por vez!
    waveCount = 1;
  }

  for (let i = 0; i < waveCount; i++) {
    if (i === 0) {
      spawnEnemy(scene);
    } else {
      scene.time.delayedCall(i * 180, () => {
        if (gameState === 'PLAYING') spawnEnemy(scene);
      });
    }
  }
}


function spawnTree(x = GAME_WIDTH + 80) {
  for (let i = 0; i < 6; i++) {
    const y = Phaser.Math.Between(115, 455);
    const onRoad = y > 235 && y < 335;
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
  let y = Phaser.Math.Between(120, 450);
  const spawnX = GAME_WIDTH + 60;
  for (let i = 0; i < 6; i++) {
    const candidate = Phaser.Math.Between(120, 450);
    const nearObstacle = obstacles.getChildren().some(o => Math.abs(o.x - spawnX) < 90 && Math.abs(o.y - candidate) < 42);
    if (!nearObstacle) { y = candidate; break; }
  }
  const item = items.create(spawnX, y, 'item_' + type);
  item.lootType = type;
  item.groundY = y + 18;
  scene.tweens.add({ targets: item, y: y - 8, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
  scene.tweens.add({ targets: item, scale: 1.12, duration: 400, yoyo: true, repeat: -1 });
}


// =============================================================================
// EVENTOS RÃTMICOS DE HORDAS ESPECIAIS (45s+, A CADA 30 SEGUNDOS)
// =============================================================================
function triggerSpecialHorde(scene, cycle) {
  if (gameState !== 'PLAYING') return;

  const isDenseGoblin = (cycle % 2 === 1);
  sound.playEarthSmash();
  scene.cameras.main.shake(260, 0.008);

  if (scene.anims && scene.anims.exists('anim_vfx_warning_yellow')) {
    const warnSprite = scene.add.sprite(GAME_WIDTH / 2, 70, 'vfx_warning_yellow')
      .setDepth(2100)
      .setScale(0.85)
      .play('anim_vfx_warning_yellow');
    scene.time.delayedCall(1600, () => { if (warnSprite && warnSprite.active) warnSprite.destroy(); });
  }

  if (isDenseGoblin) {
    // Ciclo Ãmpar (1, 3, 5...): Horda Densa de Goblins simples
    const count = 9 + Math.floor((cycle - 1) * 2.5);
    floatText(scene, GAME_WIDTH / 2, 120, 'HORDA DENSA DE GOBLINS (' + count + ')!', '#ff5252');

    for (let i = 0; i < count; i++) {
      scene.time.delayedCall(i * 125, () => {
        if (gameState === 'PLAYING') {
          const spreadY = 120 + ((i * 43) % 330);
          spawnEnemy(scene, 'goblin', spreadY);
        }
      });
    }
  } else {
    // Ciclo Par (2, 4, 6...): Horda de Goblins Zigue-zague (Scouts) com Guerreiros Blindados
    const scoutCount = 5 + Math.floor(cycle * 1.5);
    const warriorCount = 3 + Math.floor(cycle * 1.0);
    const total = scoutCount + warriorCount;
    floatText(scene, GAME_WIDTH / 2, 120, 'HORDA: RASTREADORES E GUERREIROS (' + total + ')!', '#ffca28');

    const hordeList = [];
    for (let i = 0; i < scoutCount; i++) hordeList.push('goblin_scout');
    for (let i = 0; i < warriorCount; i++) hordeList.push('warrior');
    Phaser.Utils.Array.Shuffle(hordeList);

    hordeList.forEach((eType, i) => {
      scene.time.delayedCall(i * 135, () => {
        if (gameState === 'PLAYING') {
          const spreadY = 120 + ((i * 47) % 330);
          spawnEnemy(scene, eType, spreadY);
        }
      });
    });
  }
}

// --- BUNDLE FILE: JS_Teste/src/world/enemies.js ---
// =============================================================================
// INIMIGOS: SPAWN DE HORDAS E MECÂNICAS DE DISPARO (ELFO E MAGO SOMBRIO)
// =============================================================================
function spawnEnemy(scene, forcedType, customY) {
  const roll = Math.random();
  let type = forcedType;
  if (!type) {
    if (activeBoss && activeBoss.active) {
      // Regra 6: Durante a Boss Fight, gera exclusivamente Mini-Golems
      type = 'mini_golem';
    } else if (bossDefeated) {
      // Pós-Boss: O Mago aparece com taxa rara (8%), Rastreador Ágil (20%), Goblins, Guerreiros e Elfos
      type = roll < 0.08 ? 'dark_mage' : (roll < 0.36 ? 'goblin_scout' : (roll < 0.62 ? 'goblin' : (roll < 0.86 ? 'warrior' : 'elf')));
    } else if (survivalTime >= 40) {
      // Fase pré-boss avançada: Goblins Rastreadores ágeis (28%), Goblins comuns, guerreiros e elfos (SEM MAGO)
      type = roll < 0.35 ? 'goblin_scout' : (roll < 0.70 ? 'goblin' : (roll < 0.90 ? 'warrior' : 'elf'));
    } else if (survivalTime >= 20) {
      // Fase pré-boss intermediária (20s - 40s): Introduz Rastreadores ágeis (16%)
      type = roll < 0.55 ? 'goblin' : (roll < 0.80 ? 'goblin_scout' : (roll < 0.95 ? 'warrior' : 'elf'));
    } else {
      // Curva inicial: predominantemente goblins simples e guerreiros
      type = roll < 0.90 ? 'goblin' : 'warrior';
    }
  }
  const cfg = ENEMIES[type] || ENEMIES.goblin;

  // Evita nascer exatamente em cima de outro inimigo recém-gerado (calibrado para 16:9)
  let y = customY ?? Phaser.Math.Between(115, 455);
  if (customY === undefined) {
    for (let i = 0; i < 6; i++) {
      const candidate = Phaser.Math.Between(115, 455);
      const stacked = enemies.getChildren().some(e => !e.isBoss && e.x > (GAME_WIDTH - 40) && Math.abs(e.y - candidate) < 36);
      if (!stacked) { y = candidate; break; }
    }
  }

  const enemy = enemies.create(GAME_WIDTH + 60, y, type, 0);
  enemy.play({ key: type, repeat: -1, startFrame: Phaser.Math.Between(0, 1) }).setFlipX(true);
  enemy.body.setSize(cfg.w, cfg.h);
  enemy.setVelocityX(-enemySpeed * cfg.speed);
  enemy.phase = Math.random() * 10;
  enemy.baseY = y;
  enemy.enemyType = type;
  enemy.entityId = ++entityIdCounter;
  // Blindagem de Spawns Naturais: Mini-Golems gerados fora da ejeção do chefe nascem imediatamente no estado 'ACTIVE'
  if (type === 'mini_golem') {
    enemy.golemState = 'ACTIVE';
    enemy.play('mini_golem');
  }
  // Escalonamento suave de vida de guerreiros e magos em partidas longas (> 90s)
  const hpBonus = (survivalTime >= 95 && (type === 'warrior' || type === 'dark_mage')) ? 1 : 0;
  enemy.maxHp = cfg.hp + hpBonus;
  enemy.hp = enemy.maxHp;

  if (type === 'elf') {
    // GDD v1.0 Section 6: Atira imediatamente ao surgir em tela, recarrega a cada 3.0s
    enemy.shootTimer = scene.time.delayedCall(80, () => {
      if (!enemy.active || gameState !== 'PLAYING') return;
      elfShoot(scene, enemy, true);
      enemy.shootTimer = scene.time.addEvent({
        delay: 3000,
        loop: true,
        callback: () => elfShoot(scene, enemy, false)
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

    // Habilidade Periódica: ergue a Barreira Arcana frontal após 1.0s de entrada em campo
    enemy.shieldCooldownTimer = scene.time.delayedCall(350, () => {
      if (!enemy.active || gameState !== 'PLAYING') return;
      activateMageBarrier(scene, enemy);
    });
  }

  return enemy;
}

// =============================================================================
// PRIMEIRA BOSS FIGHT: GOLEM ANCESTRAL DE PEDRA (AOS 120 SEGUNDOS)
// =============================================================================

function elfShoot(scene, elf, isImmediate = false) {
  if (!elf.active || !player || !player.active || gameState !== 'PLAYING') return;

  elf.setTint(0xa7ffeb);
  if (sparksFx) sparksFx.explode(4, elf.x - 10, elf.y);

  const shotDelay = isImmediate ? 60 : 220;
  scene.time.delayedCall(shotDelay, () => {
    if (!elf.active || !player || !player.active || !player.body || gameState !== 'PLAYING') return;
    elf.clearTint();
    sound.playElfShot();
    const arrow = enemyArrows.create(elf.x - 14, elf.y, 'arrow_elf');
    arrow.body.setSize(8, 8);
    // GDD v1.0: Dispara flecha reta horizontal para a esquerda (Bullet-Hell)
    arrow.setVelocityX(-380);
    arrow.setVelocityY(0);
    arrow.rotation = Math.PI;
  });
}

function mageShoot(scene, mage) {
  if (!mage.active || !player || !player.active || gameState !== 'PLAYING') return;
  if (mage.x > (GAME_WIDTH - 10) || mage.x < player.x + 20) return;

  mage.setTint(0x7fe7ff);
  if (holyFx) holyFx.explode(6, mage.x - 10, mage.y - 4);

  scene.time.delayedCall(320, () => {
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

// BARREIRA ARCANA CURVADA DO MAGO SOMBRIO (Arcane Curved Frontal Barrier)
// Habilidade periódica: ergue uma barreira curvada frontal em pixel art que reflete projéteis de volta
// Duração: 1.0s | Cooldown de recarga: 2.0s
function activateMageBarrier(scene, mage) {
  if (!mage || !mage.active || mage.isShieldActive) return;

  mage.isShieldActive = true;

  if (mage.barrierSprite && mage.barrierSprite.active) {
    mage.barrierSprite.destroy();
  }

  // Cria a barreira em pixel art em frente ao mago (x: mage.x - 16, y: mage.y)
  const barrier = (scene.anims && scene.anims.exists('anim_vfx_lightning_aura'))
    ? scene.add.sprite(mage.x - 16, mage.y, 'vfx_lightning_aura').setDepth(mage.depth + 5).setScale(0.65).play('anim_vfx_lightning_aura')
    : scene.add.sprite(mage.x - 16, mage.y, 'mage_barrier', 0).setDepth(mage.depth + 5);
  if (!scene.anims || !scene.anims.exists('anim_vfx_lightning_aura')) barrier.play('mage_barrier');
  mage.barrierSprite = barrier;

  // Pulso místico sutil de energia
  scene.tweens.add({
    targets: barrier,
    scaleX: { from: 0.94, to: 1.08 },
    scaleY: { from: 0.96, to: 1.04 },
    alpha: { from: 0.88, to: 1.0 },
    yoyo: true,
    repeat: -1,
    duration: 250
  });

  sound.playShieldBlock();
  floatText(scene, mage.x, mage.y - 24, 'BARREIRA ARCANA!', '#d084ff');
  if (holyFx) holyFx.explode(8, mage.x - 16, mage.y);

  // A barreira permanece ativa por cerca de 1.0 segundo (duração calibrada)
  mage.shieldTimer = scene.time.delayedCall(1000, () => {
    if (!mage || !mage.active) return;
    if (mage.barrierSprite && mage.barrierSprite.active) {
      scene.tweens.add({
        targets: mage.barrierSprite,
        alpha: 0,
        scaleX: 0.5,
        duration: 150,
        onComplete: () => {
          if (mage && mage.barrierSprite) {
            mage.barrierSprite.destroy();
            mage.barrierSprite = null;
          }
        }
      });
    }
    mage.isShieldActive = false;
    mage.shieldCooldown = true;
    if (sparksFx) sparksFx.explode(6, mage.x - 16, mage.y);

    // Cooldown exato de 2.0 segundos até reativar a barreira periodicamente
    mage.shieldCooldownTimer = scene.time.delayedCall(2000, () => {
      if (mage && mage.active && gameState === 'PLAYING') {
        mage.shieldCooldown = false;
        activateMageBarrier(scene, mage);
      }
    });
  });
}
const activateMageShield = activateMageBarrier;

function reflectMageProjectile(scene, mage, proj) {
  if (!proj || !proj.active) return;

  sound.playShieldBlock();
  if (sparksFx) sparksFx.explode(8, proj.x, proj.y);
  floatText(scene, proj.x, proj.y - 14, 'REFLETIDO!', '#d084ff');

  // Cria orbe arcana refletida mirando no jogador (sem caixa/quadrado preto!)
  if (player && player.active && enemyArrows) {
    const dx = player.x - proj.x;
    const dy = player.y - proj.y;
    const ang = Math.atan2(dy, dx);
    const spd = 265;
    const ref = enemyArrows.create(proj.x, proj.y, 'orb_enemy');
    ref.body.setSize(12, 12);
    ref.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
  }

  proj.destroy();
}

function teleportMage(scene, mage) {
  if (!mage.isShieldActive && !mage.shieldCooldown) {
    activateMageShield(scene, mage);
  }
}


// --- BUNDLE FILE: JS_Teste/src/world/boss.js ---
// =============================================================================
// BOSS FIGHT: GOLEM ANCESTRAL DE PEDRA (ATAQUES, TELEGRAFIAS E CONTROLE)
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

  floatText(scene, GAME_WIDTH / 2, 134, 'CHEFÃO: GOLEM ANCESTRAL DE PEDRA!', '#ff5252');

  const boss = enemies.create(GAME_WIDTH + 80, 285, 'boss_golem', 0);
  boss.play('boss_golem').setFlipX(true);
  boss.body.setSize(62, 74).setOffset(13, 8);
  boss.setImmovable(true);
  boss.body.pushable = false;
  boss.isBoss = true;
  boss.enemyType = 'boss_golem';
  boss.entityId = ++entityIdCounter;
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
  ejectMiniGolemsFromBoss(scene, boss);

  boss.attackTimer = scene.time.addEvent({
    delay: 3400,
    loop: true,
    callback: () => {
      if (gameState !== 'PLAYING' || !boss.active || boss.entering || boss.isLunging) return;
      boss.attackCount++;

      // Ejeção física dinâmica de Mini-Golems diretamente do corpo do Boss
      ejectMiniGolemsFromBoss(scene, boss);

      if (boss.attackCount % 2 === 1) {
        bossThrowRocks(scene, boss);
      } else {
        bossColossalPunch(scene, boss);
      }
    }
  });
}

// EJEÇÃO DINÂMICA DE MINI-GOLEMS DO CORPO DO BOSS:
// Quanto menor a vida do Chefão, maior o número de Mini-Golems expelidos (teto máximo de 5 simultâneos).
// Saltam com física/arco do torso do Boss, caem como pedra inativa, tremem e despertam com olhos vermelhos.
function ejectMiniGolemsFromBoss(scene, boss) {
  if (!boss || !boss.active || gameState !== 'PLAYING') return;

  const currentMiniGolems = enemies.getChildren().filter(e => e.active && e.enemyType === 'mini_golem').length;
  if (currentMiniGolems >= 10) return;

  const hpRatio = (boss.hp ?? BOSS_MAX_HP) / (boss.maxHp || BOSS_MAX_HP);
  let count = 2;
  if (hpRatio <= 0.35) {
    count = Phaser.Math.Between(3, 5);
  } else if (hpRatio <= 0.70) {
    count = Phaser.Math.Between(2, 4);
  } else {
    count = 1;
  }
  count = Math.min(count, 10 - currentMiniGolems);
  if (count <= 0) return;

  sound.playEarthSmash();
  scene.cameras.main.shake(160, 0.006);

  // Recuo visual do torso do Boss ao desprender fragmentos
  scene.tweens.add({
    targets: boss,
    x: boss.x + 6,
    duration: 65,
    yoyo: true,
    repeat: 1
  });

  for (let i = 0; i < count; i++) {
    scene.time.delayedCall(i * 180, () => {
      if (!boss || !boss.active || gameState !== 'PLAYING') return;
      const activeCount = enemies.getChildren().filter(e => e.active && e.enemyType === 'mini_golem').length;
      if (activeCount >= 10) return;

      const originX = boss.x - 22;
      const originY = boss.y - 8;

      if (debrisFx) debrisFx.explode(10, originX, originY);
      if (sparksFx) sparksFx.explode(6, originX, originY);

      const golem = enemies.create(originX, originY, 'mini_golem', 2);
      const cfg = ENEMIES.mini_golem || { w: 18, h: 20, speed: 0.94, hp: 1 };
      golem.body.setSize(cfg.w, cfg.h);
      golem.enemyType = 'mini_golem';
      golem.entityId = ++entityIdCounter;
      golem.maxHp = cfg.hp;
      golem.hp = golem.maxHp;
      golem.setFlipX(true);
      golem.setFrame(2); // Frame 2: Rocha inerte, olhos apagados

      // ESTADO 'EJECTING' (Saindo do corpo do Boss em arco):
      // Física desligada para evitar conflito de velocidade; deslocamento 100% via tweens
      golem.golemState = 'EJECTING';
      if (golem.body) {
        golem.body.moves = false;
      }
      golem.setVelocity(0, 0);

      const targetX = Phaser.Math.Clamp(boss.x - Phaser.Math.Between(70, 320), 160, GAME_WIDTH - 120);
      const targetY = Phaser.Math.Clamp(boss.y + Phaser.Math.Between(-120, 120), 125, 455);

      // Trajetória em arco parabólico simulando desprendimento do corpo do Boss
      scene.tweens.add({
        targets: golem,
        x: targetX,
        duration: 440,
        ease: 'Linear'
      });

      scene.tweens.add({
        targets: golem,
        y: targetY - 45,
        duration: 210,
        ease: 'Quad.easeOut',
        onComplete: () => {
          if (!golem || !golem.active) return;
          scene.tweens.add({
            targets: golem,
            y: targetY,
            duration: 230,
            ease: 'Quad.easeIn',
            onComplete: () => {
              if (!golem || !golem.active) return;
              golem.y = targetY;
              golem.baseY = targetY;

              if (debrisFx) debrisFx.explode(7, golem.x, golem.y + 10);
              sound.playShieldBlock();

              // ESTADO 'DORMANT' (Caído no chão como pedra inerte):
              // Reativa física para ancorar estritamente ao solo da floresta (-worldSpeed); NENHUMA perseguição
              golem.golemState = 'DORMANT';
              golem.setFrame(2);
              if (golem.body) {
                golem.body.moves = true;
                const curWorldSpeed = typeof worldSpeed !== 'undefined' ? worldSpeed : ((enemySpeed || 195) * 0.6);
                golem.setVelocityX(-curWorldSpeed);
                golem.setVelocityY(0);
                golem.body.updateFromGameObject();
              }

              // Transição de despertar após breve momento (1.1s a 1.3s calibrado)
              const dormantTime = Phaser.Math.Between(1100, 1300);
              golem.dormantTimer = scene.time.delayedCall(dormantTime, () => {
                if (!golem || !golem.active || gameState !== 'PLAYING') return;

                // ESTADO 'AWAKENING' (Tremor pré-despertar):
                // Mantém velocidade X sincronizada ao solo e Y zerada. Proibido iniciar perseguição ou mover corpo em direção ao herói.
                golem.golemState = 'AWAKENING';
                golem.setFrame(2);
                if (golem.body) {
                  golem.body.moves = true;
                  const curWorldSpeed = typeof worldSpeed !== 'undefined' ? worldSpeed : ((enemySpeed || 195) * 0.6);
                  golem.setVelocityX(-curWorldSpeed);
                  golem.setVelocityY(0);
                }

                // Animação de tremor pré-despertar (vibração rápida de 3px).
                // Shakes displayOriginX para criar vibração visual sem deslocar a hitbox física em direção ao herói
                const baseOriginX = golem.width * golem.originX;
                scene.tweens.add({
                  targets: golem,
                  displayOriginX: baseOriginX + 3,
                  duration: 40,
                  yoyo: true,
                  repeat: 5,
                  onComplete: () => {
                    if (!golem || !golem.active || gameState !== 'PLAYING') return;
                    golem.setDisplayOrigin(baseOriginX, golem.height * golem.originY);

                    // ESTADO 'ACTIVE' (Desperto e Perseguindo):
                    // Somente agora inicia perseguição ao jogador com olhos vermelhos acesos
                    golem.golemState = 'ACTIVE';
                    golem.setFrame(0);
                    golem.play('mini_golem');
                    if (golem.body) { golem.body.pushable = true; golem.body.setBounce(0.35); }
                    if (debrisFx) debrisFx.explode(8, golem.x, golem.y);
                    if (dustFx) dustFx.explode(6, golem.x, golem.y + 10);
                    sound.playFireStaff();
                    floatText(scene, golem.x, golem.y - 18, 'DESPERTOU!', '#ff5252');

                    const curSpeed = (ENEMIES.mini_golem && ENEMIES.mini_golem.speed) ? (enemySpeed * ENEMIES.mini_golem.speed) : 60;
                    if (player && player.active) {
                      scene.physics.moveToObject(golem, player, curSpeed);
                    } else {
                      golem.setVelocityX(-curSpeed);
                    }
                  }
                });
              });
            }
          });
        }
      });
    });
  }
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
      const alertVfx = (scene.anims && scene.anims.exists('anim_vfx_alert_red'))
        ? registerBossTelegraph(boss, scene.add.sprite(tx, ty, 'vfx_alert_red').play('anim_vfx_alert_red').setDepth(ty + 1).setScale(0.75))
        : null;

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
            [alertRing, innerPulse, crossH, crossV, flyingRock, alertVfx].forEach(o => { if (o && o.active) o.destroy(); });
            if (gameState !== 'PLAYING' || !boss.active) return;

            if (scene.anims && scene.anims.exists('anim_vfx_explosion')) {
              const rockImpact = scene.add.sprite(tx, ty, 'vfx_explosion').play('anim_vfx_explosion').setDepth(1620).setScale(0.75);
              rockImpact.once('animationcomplete', () => { if (rockImpact && rockImpact.active) rockImpact.destroy(); });
            }

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
  const laneW = boss.x - 120;
  const laneCenterX = (boss.x + 120) / 2;

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

  const bx = 316, by = 96, bw = 328, bh = 9;
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
  if (typeof setBossDefeatedOnce === 'function') setBossDefeatedOnce(true);

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

  floatText(scene, GAME_WIDTH / 2, 150, 'GOLEM DERROTADO! CHUVA DE PRATA & XP!', '#ffca28');
  for (let i = 0; i < 10; i++) {
    spawnCoinDrop(scene, bx + Phaser.Math.Between(-52, 52), by + Phaser.Math.Between(-36, 36), 2);
    spawnXpOrb(scene, bx + Phaser.Math.Between(-56, 56), by + Phaser.Math.Between(-40, 40), 4);
  }
  spawnItem(scene);
}



// --- BUNDLE FILE: JS_Teste/src/ui/hud.js ---
// =============================================================================
// INTERFACE DE JOGO (HUD): VIDA, EXPERIÊNCIA, TEMPO, OURO E ITENS (16:9 WIDESCREEN)
// DESIGN: DARK FANTASY MEDIEVAL RPG UI KIT (INSPIRADO EM PERGAMINHO, FERRO & OURO NOBRE)
// =============================================================================
const ROUNDED_FONT = '"Nunito", "Quicksand", "Segoe UI", "Trebuchet MS", "Arial Rounded MT Bold", sans-serif';
const SERIF_TITLE_FONT = '"Cinzel", "Georgia", "Palatino Linotype", serif';

const textStyle = (color, size = 17, weight = 'bold', strokeThickness = 0, strokeColor = '#000000') => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: SERIF_TITLE_FONT,
  stroke: strokeThickness > 0 ? strokeColor : 'transparent',
  strokeThickness: strokeThickness,
  shadow: {
    offsetX: 1,
    offsetY: 1,
    color: '#000000',
    blur: 0,
    stroke: false,
    fill: true
  }
});

const buttonTextStyle = (color = '#ffffff', size = 13, weight = 'bold') => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: SERIF_TITLE_FONT,
  stroke: 'transparent',
  strokeThickness: 0,
  shadow: {
    offsetX: 1,
    offsetY: 1,
    color: '#000000',
    blur: 0,
    stroke: false,
    fill: true
  }
});

const titleTextStyle = (color = '#ffca28', size = 22) => ({
  fontSize: size + 'px',
  fontStyle: 'bold',
  color,
  fontFamily: SERIF_TITLE_FONT,
  stroke: 'transparent',
  strokeThickness: 0,
  shadow: {
    offsetX: 1,
    offsetY: 2,
    color: '#050302',
    blur: 0,
    stroke: false,
    fill: true
  }
});

const subtitleTextStyle = (color = '#d6c8aa', size = 11.5) => ({
  fontSize: size + 'px',
  fontStyle: 'normal',
  color,
  fontFamily: SERIF_TITLE_FONT,
  stroke: 'transparent',
  strokeThickness: 0,
  shadow: {
    offsetX: 1,
    offsetY: 1,
    color: '#000000',
    blur: 0,
    stroke: false,
    fill: true
  }
});

const parchmentTitleStyle = (color = '#2c1b10', size = 12.5, weight = 'bold') => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: SERIF_TITLE_FONT,
  stroke: 'transparent',
  strokeThickness: 0,
  shadow: null
});

const parchmentBodyStyle = (color = '#1f130b', size = 11, weight = 'normal') => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: ROUNDED_FONT,
  stroke: 'transparent',
  strokeThickness: 0,
  shadow: null
});

const roundedTextStyle = (color, size = 12, weight = 'normal', strokeColor = null, strokeThickness = 0) => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: ROUNDED_FONT,
  stroke: strokeColor || 'transparent',
  strokeThickness: strokeThickness
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
  const t = scene.add.text(Math.round(x), Math.round(y), msg, { fontSize: '15px', fontStyle: 'bold', color, fontFamily: SERIF_TITLE_FONT, stroke: 'transparent', strokeThickness: 0, shadow: { offsetX: 1, offsetY: 2, color: '#000000', blur: 0, fill: true } })
    .setOrigin(0.5).setDepth(1500);
  scene.tweens.add({ targets: t, y: y - 40, alpha: 0, duration: 900, onComplete: () => t.destroy() });
}

// -----------------------------------------------------------------------------
// AUXILIARES DE RENDERIZAÇÃO: MOLDURAS E BOTÕES MEDIEVAIS NOBRES (UI KIT)
// -----------------------------------------------------------------------------
function drawMedievalHudFrame(gfx, x, y, w, h, isHover = false) {
  gfx.clear();
  // Fundo em tom de couro curtido / pergaminho escuro
  gfx.fillStyle(isHover ? 0x221a14 : 0x14100c, 0.96).fillRoundedRect(x, y, w, h, 6);
  // Borda externa de ferro envelhecido
  gfx.lineStyle(2, isHover ? 0xffca28 : 0x3d2b1f).strokeRoundedRect(x, y, w, h, 6);
  // Filete interno de ouro antigo
  gfx.lineStyle(1, isHover ? 0xffeb3b : 0xc5a059, 0.85).strokeRoundedRect(x + 2, y + 2, w - 4, h - 4, 4);

  // Rebites de ouro com sombra nos 4 cantos
  const rOff = 5;
  const corners = [
    [x + rOff, y + rOff],
    [x + w - rOff, y + rOff],
    [x + rOff, y + h - rOff],
    [x + w - rOff, y + h - rOff]
  ];
  corners.forEach(([cx, cy]) => {
    gfx.fillStyle(0xc5a059, 1).fillCircle(cx, cy, 2);
    gfx.fillStyle(0x2a1a0e, 1).fillCircle(cx, cy, 0.9);
  });
}

function drawMedievalHudButton(gfx, x, y, w, h, isHover = false) {
  gfx.clear();
  // Ficha metálica chanfrada com acabamento em bronze e ouro
  gfx.fillStyle(isHover ? 0x36271c : 0x18120e, 0.96).fillRoundedRect(x, y, w, h, 7);
  gfx.lineStyle(2, isHover ? 0xffca28 : 0x8d5524).strokeRoundedRect(x, y, w, h, 7);
  gfx.lineStyle(1, isHover ? 0xfff59d : 0xc5a059, 0.85).strokeRoundedRect(x + 2, y + 2, w - 4, h - 4, 5);

  const corners = [
    [x + 5, y + 5],
    [x + w - 5, y + 5],
    [x + 5, y + h - 5],
    [x + w - 5, y + h - 5]
  ];
  corners.forEach(([cx, cy]) => {
    gfx.fillStyle(0xc5a059, 1).fillCircle(cx, cy, 2);
  });
}

// Toast animado de Conquista Desbloqueada em tempo real no topo da tela
function showAchievementToast(scene, ach) {
  if (!scene || !ach) return;
  sound.playAchievement();

  const toast = scene.add.container(GAME_WIDTH / 2, -50).setDepth(3600).setScrollFactor(0);
  const bg = scene.add.graphics();
  // Moldura de pergaminho real com detalhes dourados e rebites
  bg.fillStyle(0x16120e, 0.96).fillRoundedRect(-210, -24, 420, 48, 8);
  bg.lineStyle(2.5, 0xffca28).strokeRoundedRect(-210, -24, 420, 48, 8);
  bg.lineStyle(1, 0x8d5524).strokeRoundedRect(-206, -20, 412, 40, 6);

  // Rebites nos cantos do toast
  [[-202, -16], [202, -16], [-202, 16], [202, 16]].forEach(([rx, ry]) => {
    bg.fillStyle(0xc5a059, 1).fillCircle(rx, ry, 2.5);
  });

  const crown = scene.add.image(-180, 0, 'hud_crown').setScale(1.1);
  const title = scene.add.text(-156, -13, `CONQUISTA: ${ach.title}`, textStyle('#ffca28', 12));
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
// HUD MEDIEVAL EM PIXEL ART 16:9 (BARRA DE XP, CORAÇÕES, PRATA, RELÍQUIA & CHEFÃO)
// -----------------------------------------------------------------------------
function createHUD(scene) {
  hudContainer = scene.add.container(0, 0).setDepth(2000).setScrollFactor(0).setVisible(false);

  // 1. PAINEL DE GLÓRIA & VIDA (Tempo + Corações) — Esquerda (x: 14..202)
  const gloryBg = scene.add.image(14, 10, 'ui_hud_panel_time').setOrigin(0, 0).setDisplaySize(188, 48);
  const hourglass = scene.add.image(28, 34, 'hud_hourglass');
  const gloryLabel = scene.add.text(42, 22, "GL\u00d3RIA & VIDA", textStyle("#a89260", 9)).setOrigin(0, 0.5);
  hudGloryText = scene.add.text(42, 36, "0s", textStyle("#f5e6c8", 13)).setOrigin(0, 0.5);
  hudContainer.add([gloryBg, hourglass, gloryLabel, hudGloryText]);

  hudHearts = [];
  for (let i = 0; i < 6; i++) {
    const heart = scene.add.image(94 + i * 14, 34, "hud_heart", 0).setScale(1.0);
    hudHearts.push(heart);
    hudContainer.add(heart);
  }
  updateHeartsHUD();

  // 2. PAINEL DE PRATA DA PARTIDA — Centro-Esquerda (x: 210..298)
  const silverBg = scene.add.image(210, 10, 'ui_hud_panel_silver').setOrigin(0, 0).setDisplaySize(88, 48);
  const silverIcon = scene.add.image(226, 34, "silver_coin", 0).setScale(1.2);
  const silverLabel = scene.add.text(242, 22, "PRATA", textStyle("#b0bec5", 9)).setOrigin(0, 0.5);
  hudSilverText = scene.add.text(242, 36, "0", textStyle("#e0f7fa", 15)).setOrigin(0, 0.5);
  hudContainer.add([silverBg, silverIcon, silverLabel, hudSilverText]);

  // 3. PAINEL DE RELÍQUIA / EQUIPAMENTO ATIVO — Centro (x: 306..532)
  const itemBg = scene.add.image(306, 10, "ui_hud_panel_weapon").setOrigin(0, 0).setDisplaySize(260, 48);

  // Alvéolo circular / medalhão medieval de relíquia (UI Kit)
  const slotFrame = scene.add.image(326, 34, "ui_wood_slots").setDisplaySize(34, 34);
  hudBackpackSlot = scene.add.image(364, 34, "ui_wood_slots").setDisplaySize(34, 34);
  hudBackpackIcon = scene.add.image(364, 34, "item_bow").setDisplaySize(22, 22).setVisible(false);
  hudBackpackLock = scene.add.text(364, 34, "BLOQ.", textStyle("#8d5524", 9)).setOrigin(0.5);

  hudItemIcon = scene.add.image(326, 34, "item_bow").setDisplaySize(22, 22).setVisible(false);
  hudItemName = scene.add.text(388, 22, "SEM ARMA", textStyle("#7a7265", 10)).setOrigin(0, 0.5);
  hudItemBarBase = scene.add.image(388, 36, "ui_bar_timer_base").setOrigin(0, 0.5).setDisplaySize(54, 12);
  hudItemBar = scene.add.graphics();
  hudItemTime = scene.add.text(446, 36, "", textStyle("#ffca28", 9.5)).setOrigin(0, 0.5);
  const badge1 = scene.add.image(486, 25, "scroll_multishot").setScale(0.70).setVisible(false);
  const txt1 = scene.add.text(486, 39, "", textStyle("#b388ff", 8)).setOrigin(0.5, 0.5).setVisible(false);
  const badge2 = scene.add.image(512, 25, "scroll_growth").setScale(0.70).setVisible(false);
  const txt2 = scene.add.text(512, 39, "", textStyle("#b388ff", 8)).setOrigin(0.5, 0.5).setVisible(false);
  hudScrollBadges = [badge1, badge2];
  hudScrollTexts = [txt1, txt2];
  hudScrollBadge = badge1;
  hudScrollText = txt1;
  hudContainer.add([itemBg, slotFrame, hudItemIcon, hudBackpackSlot, hudBackpackIcon, hudBackpackLock, hudItemName, hudItemBarBase, hudItemBar, hudItemTime, badge1, txt1, badge2, txt2]);

  // 4. PAINEL DE RECORDE DO REINO (x: 540..648)
  const bestBg = scene.add.image(574, 10, "ui_hud_panel_record").setOrigin(0, 0).setDisplaySize(108, 48);
  const crown = scene.add.image(590, 34, "hud_crown");
  const bestLabel = scene.add.text(572, 22, "RECORDE", textStyle("#a89260", 9)).setOrigin(0, 0.5);
  hudBestText = scene.add.text(606, 36, `${getBestScore()}s`, textStyle("#ffca28", 15)).setOrigin(0, 0.5);
  hudContainer.add([bestBg, crown, bestLabel, hudBestText]);
  // 5. BOTÃO DE SOM RÁPIDO [M] — Superior Direito (x: 844..892 em 16:9)
  const soundBtnBg = scene.add.image(868, 34, 'ui_btn_blue_sq').setDisplaySize(44, 44);



  hudHornIcon = scene.add.image(868, 34, 'hud_horn', sound.isMuted() ? 1 : 0);
  const soundHitArea = scene.add.rectangle(868, 34, 48, 48, 0x000000, 0)
    .setInteractive({ useHandCursor: true });

  const toggleAudio = () => {
    sound.toggleMute();
    sound.playButtonClick();
    hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
    if (menuContainer && menuContainer.updateMenuHorn) menuContainer.updateMenuHorn();
  };

  soundHitArea.on('pointerdown', () => { soundBtnBg.setTexture('ui_btn_blue_sq_press'); toggleAudio(); });
  soundHitArea.on('pointerup', () => soundBtnBg.setTexture('ui_btn_blue_sq'));
  soundHitArea.on('pointerout', () => soundBtnBg.setTexture('ui_btn_blue_sq'));


  scene.input.keyboard.on('keydown-M', () => {
    if (gameState === 'GAMEOVER') return;
    sound.toggleMute();
    if (hudHornIcon) hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
    if (pauseModal && pauseModal.updateAudio) pauseModal.updateAudio();
    if (menuContainer && menuContainer.updateMenuHorn) menuContainer.updateMenuHorn();
  });

  // 6. BOTÃO DE TELA CHEIA RÁPIDO [F] — Extremo Superior Direito (x: 902..950 em 16:9)
  const fsBtnBg = scene.add.image(926, 34, 'ui_btn_blue_sq').setDisplaySize(44, 44);



  hudFullscreenIcon = scene.add.image(926, 34, 'hud_fullscreen', isGameFullscreen(scene) ? 1 : 0);
  const fsHitArea = scene.add.rectangle(926, 34, 44, 44, 0x000000, 0).setInteractive({ useHandCursor: true });
  fsHitArea.on('pointerdown', () => {
    fsBtnBg.setTexture('ui_btn_blue_sq_press');
    sound.playButtonClick();
    toggleFullscreen(scene);
  });
  fsHitArea.on('pointerup', () => fsBtnBg.setTexture('ui_btn_blue_sq'));
  fsHitArea.on('pointerout', () => fsBtnBg.setTexture('ui_btn_blue_sq'));

  // 7. BOTAO DE PAUSA RAPIDO [ESC] - (Tiny Swords Blue Button)
  const pauseBtnBg = scene.add.image(810, 34, 'ui_btn_blue_sq').setDisplaySize(44, 44);
  const pauseIcon = scene.add.text(810, 32, '||', { fontSize: '16px', fontStyle: 'bold', color: '#ffffff' }).setOrigin(0.5);
  const pauseHitArea = scene.add.rectangle(810, 34, 44, 44, 0x000000, 0).setInteractive({ useHandCursor: true });
  pauseHitArea.on('pointerdown', () => {
    pauseBtnBg.setTexture('ui_btn_blue_sq_press');
    sound.playButtonClick();
    if (typeof handleEscPress === 'function') handleEscPress(scene);
  });
  pauseHitArea.on('pointerup', () => pauseBtnBg.setTexture('ui_btn_blue_sq'));
  pauseHitArea.on('pointerout', () => pauseBtnBg.setTexture('ui_btn_blue_sq'));

  hudContainer.add([pauseBtnBg, pauseIcon, pauseHitArea, soundBtnBg, hudHornIcon, soundHitArea, fsBtnBg, hudFullscreenIcon, fsHitArea]);

  // 8. BARRA DE EXPERIÊNCIA (XP) DA PARTIDA — Faixa Horizontal Nobre 16:9 (x: 14..946, y: 61..77)
  const xpFrame = scene.add.image(14, 61, 'ui_bar_xp_base').setOrigin(0, 0).setDisplaySize(932, 16);
  hudXpBar = scene.add.graphics();
  const xpGemIcon = scene.add.image(28, 69, 'xp_orb', 0).setScale(1.05);
  hudLevelText = scene.add.text(42, 69, 'NÍVEL 1', textStyle('#ffca28', 10.5)).setOrigin(0, 0.5);
  hudXpText = scene.add.text(932, 69, 'XP: 0 / 6', textStyle('#7fe7ff', 10.5)).setOrigin(1, 0.5);
  hudContainer.add([xpFrame, hudXpBar, xpGemIcon, hudLevelText, hudXpText]);
  updateXpHUD();

  // 9. BARRA DE VIDA DO CHEFÃO (Gothic Iron Crest com Rubis Sangrentos)
  bossHudContainer = scene.add.container(0, 0).setVisible(false);
  const bossBg = scene.add.graphics();
  bossBg.fillStyle(0x160d0b, 0.96).fillRoundedRect(290, 80, 380, 32, 6);
  bossBg.lineStyle(2.5, 0xd83a3a).strokeRoundedRect(290, 80, 380, 32, 6);
  bossBg.lineStyle(1, 0xff8a80, 0.7).strokeRoundedRect(293, 83, 374, 26, 4);

  // Spikes ornamentais góticos nas bordas da barra do Boss
  bossBg.fillStyle(0xd83a3a, 1).fillTriangle(290, 96, 282, 96, 290, 88);
  bossBg.fillStyle(0xd83a3a, 1).fillTriangle(670, 96, 678, 96, 670, 88);

  const bossTitle = scene.add.text(310, 84, 'GOLEM ANCESTRAL DE PEDRA', textStyle('#ff8a80', 10.5));
  bossHpText = scene.add.text(654, 84, `${BOSS_MAX_HP}/${BOSS_MAX_HP}`, textStyle('#ffca28', 10.5)).setOrigin(1, 0);
  bossHpBar = scene.add.graphics();
  bossHudContainer.add([bossBg, bossTitle, bossHpBar, bossHpText]);
  hudContainer.add(bossHudContainer);
}

function updateXpHUD() {
  if (!hudXpBar || !hudLevelText || !hudXpText) return;
  hudXpBar.clear();
  const barX = 114;
  const barY = 64;
  const barW = 724;
  const barH = 10;

  // Canaleta escura da barra
  hudXpBar.fillStyle(0x090705, 1).fillRect(barX, barY, barW, barH);
  hudXpBar.lineStyle(1, 0x3a2e21).strokeRect(barX, barY, barW, barH);

  // Marcas de segmento / entalhes métricos sutis a cada 20%
  for (let s = 1; s <= 4; s++) {
    const sx = Math.round(barX + (barW * s) / 5);
    hudXpBar.fillStyle(0x221a14, 0.8).fillRect(sx, barY, 1, barH);
  }

  const pct = Phaser.Math.Clamp(xpToNextLevel > 0 ? runXp / xpToNextLevel : 0, 0, 1);
  const fillW = Math.max(0, Math.round((barW - 2) * pct));
  if (fillW > 0) {
    // Gradiente esmeralda com brilho de ciano místico (UI Kit)
    hudXpBar.fillStyle(0x00c853, 1).fillRect(barX + 1, barY + 1, fillW, barH - 2);
    hudXpBar.fillStyle(0x69f0ae, 0.85).fillRect(barX + 1, barY + 1, fillW, 2);
    hudXpBar.fillStyle(0x00e5ff, 0.6).fillRect(barX + fillW - 2, barY + 1, 2, barH - 2);
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
    hudItemName.setText('SEM ARMA').setColor('#7a7265');
  
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

  const maxTime = buff.maxTime || BUFF_TIME[buff.type] || 10;
  const pct = Phaser.Math.Clamp(remaining / maxTime, 0, 1);
  const barW = 50;
  const barH = 6;
  const barX = 389;
  const barY = 33;

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
  updateBackpackHUD();
}

function updateScrollHUD() {
  if (!hudScrollBadges || hudScrollBadges.length === 0) return;
  const activeScrolls = (typeof chosenScrolls !== 'undefined' && Array.isArray(chosenScrolls))
    ? chosenScrolls
    : (chosenScroll ? [chosenScroll] : []);

  for (let i = 0; i < 2; i++) {
    const badge = hudScrollBadges[i];
    const txt = hudScrollTexts[i];
    if (!badge || !txt) continue;

    const sKey = activeScrolls[i];
    if (sKey && SCROLL_CATALOG[sKey]) {
      const sCfg = SCROLL_CATALOG[sKey];
      const lvl = scrollLevels[sKey] || 1;
      badge.setTexture(sCfg.icon).setVisible(true);
      txt.setText(`NV.${lvl}`).setVisible(true);
    } else {
      badge.setVisible(false);
      txt.setVisible(false);
    }
  }

  // Se possuir exatamente 1 pergaminho, centraliza o badge (x: 506)
  if (activeScrolls.length === 1 && hudScrollBadges[0] && hudScrollTexts[0]) {
    hudScrollBadges[0].setX(518);
    hudScrollTexts[0].setX(518);
  } else if (activeScrolls.length >= 2) {
    if (hudScrollBadges[0] && hudScrollTexts[0]) {
    hudScrollBadges[0].setX(518);
    hudScrollTexts[0].setX(518);
    }
    if (hudScrollBadges[1] && hudScrollTexts[1]) {
      hudScrollBadges[1].setX(512);
      hudScrollTexts[1].setX(512);
    }
  }
}


function updateBackpackHUD() {
  if (!hudBackpackSlot || !hudBackpackLock || !hudBackpackIcon) return;
  const unlocked = typeof hasBackpack === 'function' ? hasBackpack() : false;
  if (!unlocked) {
    hudBackpackLock.setVisible(true).setText('BLOQ.').setColor('#8d5524');
    hudBackpackIcon.setVisible(false);
  } else {
    hudBackpackLock.setVisible(!backpackWeapon).setText('VAZIO').setColor('#5c4a38');
    if (backpackWeapon) {
      const tex = backpackWeapon === 'shield' ? 'shield_worn' : 'item_' + backpackWeapon;
      hudBackpackIcon.setTexture(tex).setVisible(true);
    } else {
      hudBackpackIcon.setVisible(false);
    }
  }
}


// --- BUNDLE FILE: JS_Teste/src/ui/modals.js ---
// =============================================================================
// COMPONENTES DE INTERFACE: BOTÕES, MODAIS, DRAFT DE LEVEL UP, PAUSA E RECORDES
// =============================================================================
// SISTEMA DE LEVEL UP & INTERFACE DE SELEÇÃO DE 3 CARTAS (RNG DRAFT SCREEN)
// -----------------------------------------------------------------------------
function rollLevelUpCards() {
  const unlockedKeys = getUnlockedWeaponPool();
  const weaponCards = [];

  unlockedKeys.forEach(key => {
    const cfg = WEAPON_CATALOG[key];
    const currLvl = getWeaponLevel(key);
    if (cfg) {
      const nextLvl = currLvl + 1;
      const isHeld = buff && buff.type === key;
      const mult = (1 + (nextLvl - 1) * 0.22).toFixed(2);
      const pct = Math.round((nextLvl - 1) * 22);

      weaponCards.push({
        id: `upg_${key}_${nextLvl}`,
        category: cfg.category || (isHeld ? 'ARMA EQUIPADA' : 'EVOLUÇÃO DE ARMA'),
        title: cfg.name,
        badge: `Nv. ${currLvl} -> Nv. ${nextLvl}`,
        badgeColor: '#ffd740',
        borderColor: 0xffca28,
        icon: cfg.icon,
        desc: `NÍVEL ATUAL: Nv. ${currLvl}\nNÍVEL FUTURO: Nv. ${nextLvl}\n\n MULTIPLICADOR DE STATUS:\nx${mult} (+${pct}% Geral)\n\n Equipa esta arma imediatamente!`,
        weight: isHeld ? 3 : 2,
        apply: (scene) => {
          runWeaponLevels[key] = nextLvl;
          equipWeaponBuff(scene, key, false);
          floatText(scene, player.x, player.y - 28, `${cfg.name} Nv. ${nextLvl}!`, '#ffca28');
        }
      });
    }
  });

  // Cartas de Pergaminhos Arcanos (Regra: até 2 pergaminhos por partida, até Nv. 5 cada)
  const scrollCards = [];
  const scrollKeys = ['multishot', 'growth', 'attackspeed', 'duration'];
  const maxChosenScrolls = 2;
  const activeChosen = (typeof chosenScrolls !== 'undefined' && Array.isArray(chosenScrolls)) ? chosenScrolls : (chosenScroll ? [chosenScroll] : []);
  const currentChosenCount = activeChosen.length;

  scrollKeys.forEach(sKey => {
    const isAlreadyChosen = activeChosen.includes(sKey);
    // Se o jogador já possui 2 pergaminhos distintos e este não é um deles, não oferece
    if (!isAlreadyChosen && currentChosenCount >= maxChosenScrolls) return;

    const currLvl = scrollLevels[sKey] || 0;
    if (currLvl >= 10) return;
    const nextLvl = currLvl + 1;
    const sCfg = SCROLL_CATALOG[sKey];
    if (!sCfg) return;
    const lvlData = (sCfg.levels && sCfg.levels[nextLvl - 1]) ? sCfg.levels[nextLvl - 1] : null;
    const badge = lvlData ? (typeof lvlData === 'object' ? lvlData.badge : 'PODER ARCANO') : 'TRANSCENDÊNCIA ';
    const desc = lvlData ? (typeof lvlData === 'object' ? lvlData.desc : lvlData) : 'Aumenta o poder arcano do pergaminho nesta partida.';

    const slotLabel = isAlreadyChosen
      ? 'PERGAMINHO EXCLUSIVO'
      : (currentChosenCount === 0 ? 'PERGAMINHO ARCANO (1/2)' : 'PERGAMINHO ARCANO (2/2)');

    const promptExtra = isAlreadyChosen
      ? ' Refina este pergaminho exclusivo nesta partida!'
      : (currentChosenCount === 0
          ? ' ESCOLHA ARCANO (1/2): Trava como o 1º de 2 pergaminhos desta run!'
          : ' ESCOLHA ARCANO (2/2): Trava como o 2º e último pergaminho desta run!');

    scrollCards.push({
      id: `scroll_${sKey}_${nextLvl}`,
      category: slotLabel,
      title: sCfg.name,
      badge: badge,
      badgeColor: nextLvl >= 5 ? '#ffd740' : '#b388ff',
      borderColor: nextLvl >= 5 ? 0xffca28 : 0xb388ff,
      icon: sCfg.icon,
      desc: `${desc}\n\n${promptExtra}`,
      weight: isAlreadyChosen ? 3 : 2,
      apply: (scene) => {
        if (typeof chosenScrolls !== 'undefined' && Array.isArray(chosenScrolls)) {
          if (!chosenScrolls.includes(sKey)) {
            chosenScrolls.push(sKey);
          }
          chosenScroll = chosenScrolls[0] || null;
        } else {
          chosenScroll = sKey;
        }
        scrollLevels[sKey] = nextLvl;
        sound.playLevelUp();
        floatText(scene, player.x, player.y - 32, `${sCfg.shortName} ARCANO!`, '#b388ff');
        updateScrollHUD();
      }
    });
  });

  // Cartas de Itens e Relíquias Táticas da Partida (garantem sempre 3 opções distintas!)
  const itemCards = [
    {
      id: 'item_duration_boost',
      category: 'RELÍQUIA TEMPORAL',
      title: 'AMPULHETA REAL',
      badge: 'EXTENSÃO TEMPORAL',
      badgeColor: '#ffca28',
      borderColor: 0xc5a059,
      icon: 'hud_hourglass',
      desc: 'Amplia substancialmente o tempo de atividade das relíquias em combate e recarrega sua arma ativa!',
      apply: (scene) => {
        runBonusDuration += 1.2;
        if (buff.type) {
          equipWeaponBuff(scene, buff.type, false);
        } else {
          const randW = Phaser.Utils.Array.GetRandom(unlockedKeys);
          equipWeaponBuff(scene, randW, false);
        }
        floatText(scene, player.x, player.y - 28, 'DURAÇÃO AMPLIADA!', '#ffca28');
      }
    },
    {
      id: 'item_random_relic',
      category: 'BAÚ DE ARMAS',
      title: 'ARSENAL DO REI',
      badge: 'ARSENAL REAL',
      badgeColor: '#e0f7fa',
      borderColor: 0x80deea,
      icon: 'silver_coin',
      desc: 'Invoca e equipa imediatamente uma Relíquia de Combate sobrecarregada com moedas de prata!',
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
      badge: playerHp < playerMaxHp ? 'RESTAURAÇÃO VITAL' : 'BÊNÇÃO DE PRATA',
      badgeColor: '#ff8a80',
      borderColor: 0xff5252,
      icon: 'stat_health',
      desc: 'Restaura a força vital do Cavaleiro e conjura uma expansão sagrada de repulsão!',
      apply: (scene) => {
        if (playerHp < playerMaxHp) {
          playerHp = Math.min(playerMaxHp, playerHp + 1);
          updateHeartsHUD();
          floatText(scene, player.x, player.y - 28, 'VIDA RESTAURADA!', '#ff5252');
        } else {
          runSilver += 5;
          if (hudSilverText && hudSilverText.active) hudSilverText.setText(`${runSilver}`);
          floatText(scene, player.x, player.y - 28, '+5 PRATAS REAIS!', '#e0f7fa');
        }
        explodeFireball(scene, player.x, player.y, 135, 3);
      }
    }
  ];

  // Se o jogador já avançou as armas para níveis altos, adiciona cartas de Mestria Suprema
  unlockedKeys.forEach(key => {
    if (getWeaponLevel(key) >= 5) {
      const cfg = WEAPON_CATALOG[key];
      itemCards.push({
        id: `mastery_${key}`,
        category: 'MESTRIA LENDÁRIA',
        title: `${cfg.name} SUPREMO`,
        badge: 'TRANSCENDÊNCIA ',
        badgeColor: '#ffd740',
        borderColor: 0xffca28,
        icon: cfg.icon,
        desc: `Equipa imediatamente ${cfg.name} em seu grau máximo de mestria com bônus de duração estendida!`,
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
  const shuffledScrolls = Phaser.Utils.Array.Shuffle(scrollCards.slice());

  const selected = [];
  const usedIds = new Set();

  // 1. Inclui 1 opção de Pergaminho Arcano se houver pergaminho elegível
  if (shuffledScrolls.length > 0) {
    const sCard = shuffledScrolls[0];
    selected.push(sCard);
    usedIds.add(sCard.id);
  }

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

  // Caso armas e itens tenham esgotado opções válidas, preenche com pergaminhos restantes
  shuffledScrolls.forEach(card => {
    if (selected.length < 3 && !usedIds.has(card.id)) {
      selected.push(card);
      usedIds.add(card.id);
    }
  });

  return selected.slice(0, 3);
}

function openLevelUpDraft(scene) {
  if (!scene || (gameState !== 'PLAYING' && gameState !== 'LEVEL_UP')) return;
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.gameplayStop();
  gameState = 'LEVEL_UP';
  isHitstopping = false;

  // Pausa o mundo de jogo com segurança enquanto o jogador escolhe sua carta
  scene.physics.pause();
  scene.time.paused = true;
  scene.tweens.pauseAll();
  if (scene.anims && scene.anims.pauseAll) {
    scene.anims.pauseAll();
  }
  if (player && player.body) player.setVelocity(0, 0);
  [player, ...enemies.getChildren()].forEach(s => {
    if (s && s.anims && s.anims.isPlaying) s.anims.pause();
  });
  sound.pauseBGM();
  sound.playLevelUp();

  if (draftModal) {
    draftModal.destroy();
    draftModal = null;
  }

  const cards = rollLevelUpCards();
  draftModal = scene.add.container(0, 0).setDepth(3300).setScrollFactor(0);

  const overlay = scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x06040a, 0.80);
  const bannerRibbon = scene.add.image(GAME_WIDTH / 2, 44, "ui_ribbon_big_yellow").setDisplaySize(560, 64);

  const titleTxt = scene.add.text(GAME_WIDTH / 2, 44, "\u2694 SUBIU PARA O N\u00cdVEL " + runLevel + "! \u2694", {
    ...textStyle("#2c1b10", 20),
    fontFamily: SERIF_TITLE_FONT, stroke: "transparent", strokeThickness: 0, shadow: null
  }).setOrigin(0.5);
  const subTxt = scene.add.text(GAME_WIDTH / 2, 86, "ESCOLHA 1 CARTA DE UPGRADE OU ITEM (CLIQUE OU TECLAS [1] [2] [3])", {
    ...subtitleTextStyle("#e8dcc4", 11.5, "bold"),
    shadow: { offsetX: 1, offsetY: 1, color: "#000000", blur: 0, fill: true }
  }).setOrigin(0.5);
  fitTextToBox(subTxt, 600, 20, 9);

  draftModal.add([overlay, bannerRibbon, titleTxt, subTxt]);
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
    if (scene && scene.anims && player && player.active) {
      if (scene.anims.exists('anim_vfx_haste')) {
        const haste = scene.add.sprite(player.x, player.y - 10, 'vfx_haste').play('anim_vfx_haste').setScale(0.8).setDepth(player.depth + 2);
        haste.once('animationcomplete', () => { if (haste && haste.active) haste.destroy(); });
      }
      if (scene.anims.exists('anim_vfx_levelup_text')) {
        const lvlText = scene.add.sprite(player.x, player.y - 48, 'vfx_levelup_text').play('anim_vfx_levelup_text').setScale(0.65).setDepth(2600);
        lvlText.once('animationcomplete', () => { if (lvlText && lvlText.active) lvlText.destroy(); });
      }
    }
    pendingLevelUps = Math.max(0, pendingLevelUps - 1);
    updateXpHUD();

    if (pendingLevelUps > 0) {
      openLevelUpDraft(scene);
      return;
    }

    // Retoma a partida com janela curta de invencibilidade (750ms) para transição justa
    gameState = 'PLAYING';
    if (typeof PlatformBridge !== 'undefined') PlatformBridge.gameplayStart();

    scene.physics.resume();
    scene.physics.world.isPaused = false;
    scene.time.paused = false;
    scene.tweens.resumeAll();
    if (scene.anims) {
      if (scene.anims.resumeAll) scene.anims.resumeAll();
      scene.anims.paused = false;
    }
    [player, ...enemies.getChildren()].forEach(s => {
      if (s && s.anims) {
        if (s.anims.isPaused) {
          s.anims.resume();
        } else if (!s.anims.isPlaying && s.anims.currentAnim) {
          s.anims.play({ key: s.anims.currentAnim.key, repeat: -1 });
        }
      }
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

  const cardPositions = [220, 480, 740];
  const cardW = 230;
  const cardH = 390;
  const cardY = 320;

  cards.forEach((card, idx) => {
    const cx = cardPositions[idx];
    const left = cx - cardW / 2;
    const top = cardY - cardH / 2;

    const paperKey = (card.id && card.id.startsWith('scroll_')) ? 'ui_paper_special' : 'ui_paper_regular';
    const cardPaper = scene.add.image(cx, cardY, paperKey).setDisplaySize(cardW, cardH);
    const cardHighlight = scene.add.graphics();
    const drawHighlight = (hover = false) => {
      cardHighlight.clear();
      if (hover) cardHighlight.lineStyle(3, 0xffeb3b, 0.95).strokeRoundedRect(left - 2, top - 2, cardW + 4, cardH + 4, 10);
    };
    drawHighlight(false);
    const slotImg = scene.add.image(cx, top + 74, 'ui_wood_slots').setDisplaySize(68, 68);
    const iconImg = scene.add.image(cx, top + 74, card.icon).setScale(1.55);
    const catTxt = scene.add.text(cx, top + 24, card.category, parchmentTitleStyle("#4a2c11", 11, "bold")).setOrigin(0.5);
    fitTextToBox(catTxt, cardW - 20, 16, 9);
    const nameTxt = scene.add.text(cx, top + 132, card.title, { ...parchmentTitleStyle('#22140a', 14, 'bold'), align: 'center', wordWrap: { width: cardW - 24, useAdvancedWrap: true } }).setOrigin(0.5);
    fitTextToBox(nameTxt, cardW - 24, 26, 9.5);
    const badgeBg = scene.add.rectangle(cx, top + 164, cardW - 40, 22, 0x22150a, 0.85);
    const badgeTxt = scene.add.text(cx, top + 164, card.badge, textStyle(card.badgeColor, 10.5)).setOrigin(0.5);
    fitTextToBox(badgeTxt, cardW - 46, 18, 8.5);
    const descTxt = scene.add.text(cx, top + 242, card.desc, { ...parchmentBodyStyle('#1f1208', 11, 'bold'), align: 'center', lineSpacing: 3, wordWrap: { width: cardW - 32, useAdvancedWrap: true } }).setOrigin(0.5);
    fitTextToBox(descTxt, cardW - 30, 116, 8.5);
    const pickBtn = scene.add.image(cx, top + cardH - 34, 'ui_btn_blue_reg').setDisplaySize(cardW - 32, 42);
    const pickTxt = scene.add.text(cx, top + cardH - 34, 'ESCOLHER [' + (idx + 1) + ']', buttonTextStyle('#ffffff', 12)).setOrigin(0.5);
    const hitZone = scene.add.rectangle(cx, cardY, cardW, cardH, 0x000000, 0).setInteractive({ useHandCursor: true });
    hitZone.on('pointerover', () => { drawHighlight(true); pickBtn.setTexture('ui_btn_blue_press'); pickTxt.setColor('#ffeb3b'); });
    hitZone.on('pointerout', () => { drawHighlight(false); pickBtn.setTexture('ui_btn_blue_reg'); pickTxt.setColor('#ffffff'); });
    hitZone.on('pointerdown', () => selectCard(card));
    draftModal.add([cardPaper, cardHighlight, slotImg, iconImg, catTxt, nameTxt, badgeBg, badgeTxt, descTxt, pickBtn, pickTxt, hitZone]);
  });
}

// -----------------------------------------------------------------------------
// BOTÕES NOBRES MEDIEVAIS EM CARVALHO & OURO
// -----------------------------------------------------------------------------
function createButton(scene, x, y, label, onClick, w = 260, h = 46, defaultTexture = 'ui_btn_blue_reg') {
  if (typeof makeUIButtonTextures === 'function') makeUIButtonTextures(scene);

  const btn = scene.add.image(x, y, defaultTexture).setDisplaySize(w, h).setInteractive({ useHandCursor: true });
  const txt = scene.add.text(x, y, label, buttonTextStyle('#ffffff', 13.5)).setOrigin(0.5);
  fitTextToBox(txt, w - 24, h - 10, 10);

  btn.baseTexture = defaultTexture;

  btn.on('pointerover', () => {
    const isRed = (btn.baseTexture || '').includes('red');
    btn.setTexture(isRed ? 'ui_btn_red_hover' : 'ui_btn_blue_hover');
    txt.setColor('#ffeb3b');
  });
  btn.on('pointerout', () => {
    btn.setTexture(btn.baseTexture || defaultTexture);
    txt.setColor('#ffffff');
    txt.setY(y);
  });
  btn.on('pointerdown', () => {
    const isRed = (btn.baseTexture || '').includes('red');
    btn.setTexture(isRed ? 'ui_btn_red_press' : 'ui_btn_blue_press');
    txt.setY(y + 1);
    sound.playButtonClick();
    if (onClick) onClick();
  });
  btn.on('pointerup', () => {
    btn.setTexture(btn.baseTexture || defaultTexture);
    txt.setY(y);
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
  const overlay = scene.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.78);
  const woodBg = scene.add.image(cx, cy, 'ui_wood_table').setDisplaySize(width + 16, height + 16).setAlpha(1.0);

  const frame = scene.add.graphics();
  // Fundo interno sutil em madeira escura acetinada (deixa as bordas da ui_wood_table 100% visíveis)
  frame.fillStyle(0x16100b, 0.85).fillRoundedRect(left + 14, top + 14, width - 28, height - 28, 8);
  // Moldura interna em couro nobre e filete dourado
  frame.lineStyle(2, 0x8d5524, 0.85).strokeRoundedRect(left + 14, top + 14, width - 28, height - 28, 8);
  frame.lineStyle(1, 0xc5a059, 0.75).strokeRoundedRect(left + 16, top + 16, width - 32, height - 32, 6);

  // Faixa de título com o ribbon amarelo autêntico do Tiny Swords
  const ribbonW = Math.min(width - 24, 460);
  const titleRibbon = scene.add.image(cx, top + 26, 'ui_ribbon_big_yellow').setDisplaySize(ribbonW, 52);
  const title = scene.add.text(cx, top + 24, titleText, titleTextStyle('#ffffff', 17, 'bold', '#2a1a0e', 2)).setOrigin(0.5);
  fitTextToBox(title, ribbonW - 70, 26, 13);

  const children = [overlay, woodBg, frame, titleRibbon, title];
  if (subtitleText) {
    const sub = scene.add.text(cx, top + 58, subtitleText, {
      ...subtitleTextStyle('#ffd740', 10.5, 'bold', '#000000', 2),
      align: 'center',
      wordWrap: { width: width - 60, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(sub, width - 60, 22, 9);
    frame.lineStyle(1, 0xc5a059, 0.45).lineBetween(left + 40, top + 72, left + width - 40, top + 72);
    children.push(sub);
  }

  const container = scene.add.container(0, 0, children).setDepth(3000).setScrollFactor(0);
  activeModal = container;
  container.on('destroy', () => {
    if (activeModal === container) activeModal = null;
  });
  return container;
}

// -----------------------------------------------------------------------------
// SISTEMA DE PAUSA (TECLA P & BOTÃO DO HUD)
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
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.gameplayStop();
  gameState = 'PAUSED';
  isHitstopping = false;

  scene.physics.pause();
  scene.time.paused = true;
  scene.tweens.pauseAll();
  if (scene.anims && scene.anims.pauseAll) {
    scene.anims.pauseAll();
  }
  [player, ...enemies.getChildren()].forEach(s => {
    if (s && s.anims && s.anims.isPlaying) s.anims.pause();
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
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.gameplayStart();

  scene.physics.resume();
  scene.physics.world.isPaused = false;
  scene.time.paused = false;
  scene.tweens.resumeAll();
  if (scene.anims) {
    if (scene.anims.resumeAll) scene.anims.resumeAll();
    scene.anims.paused = false;
  }
  [player, ...enemies.getChildren()].forEach(s => {
    if (s && s.anims) {
      if (s.anims.isPaused) {
        s.anims.resume();
      } else if (!s.anims.isPlaying && s.anims.currentAnim) {
        s.anims.play({ key: s.anims.currentAnim.key, repeat: -1 });
      }
    }
  });
  sound.resumeBGM();
  sound.playButtonClick();
}

function showPauseModal(scene) {
  if (pauseModal) pauseModal.destroy();

  const height = 440;
  const top = (GAME_HEIGHT - height) / 2;
  const cx = GAME_WIDTH / 2;
  pauseModal = createModal(scene, '\u2694 JOGO PAUSADO \u2694', height, 'JORNADA EM ESPERA', 480);

  // Status de sobrevivencia, prata e reliquia em painel de madeira Tiny Swords
  const statsPanel = scene.add.image(cx, top + 102, 'ui_hud_panel_weapon').setDisplaySize(410, 48);

  const timeTxt = scene.add.text(cx, top + 92, 'TEMPO: ' + survivalTime + 's  |  PRATA: ' + runSilver + '  |  OURO: ' + getGold(), textStyle('#ffca28', 11.5, 'bold')).setOrigin(0.5);
  fitTextToBox(timeTxt, 390, 18, 10);
  const relicName = buff.type ? ((BUFF_NAMES[buff.type] || buff.type) + ' NV.' + getWeaponLevel(buff.type) + ' (' + Math.max(0, buff.timeLeft).toFixed(1) + 's)') : 'Nenhuma';
  const relicColor = buff.type ? '#7fe7ff' : '#d6c8aa';
  const relicTxt = scene.add.text(cx, top + 112, 'REL\u00cdQUIA ATIVA: ' + relicName, textStyle(relicColor, 11, 'bold')).setOrigin(0.5);
  fitTextToBox(relicTxt, 390, 18, 10);

  // Botoes com a UI oficial do Tiny Swords (ui_btn_blue_reg / ui_btn_red_reg)
  const btnW = 310;
  const btnH = 38;
  const continueBtn = createButton(scene, cx, top + 152, 'CONTINUAR JORNADA [P]', () => resumeGame(scene), btnW, btnH);

  // Botao Audio: usa createButton e alterna textura ui_btn_red_reg / ui_btn_blue_reg
  const audioBtnGroup = createButton(scene, cx, top + 196, sound.isMuted() ? '\u00c1UDIO: MUTADO [M]' : '\u00c1UDIO: ATIVADO [M]', () => {
    sound.toggleMute();
    updateAudioUI();
  }, btnW, btnH, sound.isMuted() ? 'ui_btn_red_reg' : 'ui_btn_blue_reg');
  const audioBtn = audioBtnGroup[0];
  const audioTxt = audioBtnGroup[1];

  const updateAudioUI = () => {
    if (!audioBtn.active) return;
    const muted = sound.isMuted();
    audioBtn.baseTexture = muted ? 'ui_btn_red_reg' : 'ui_btn_blue_reg';
    audioBtn.setTexture(audioBtn.baseTexture);
    audioTxt.setText(muted ? '\u00c1UDIO: MUTADO [M]' : '\u00c1UDIO: ATIVADO [M]');
    if (hudHornIcon) hudHornIcon.setFrame(muted ? 1 : 0);
  };

  // Botao Tela Cheia: usa createButton
  const fsBtnGroup = createButton(scene, cx, top + 240, isGameFullscreen(scene) ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]', () => {
    toggleFullscreen(scene);
    scene.time.delayedCall(80, updateFsUI);
  }, btnW, btnH);
  const fsBtn = fsBtnGroup[0];
  const fsTxt = fsBtnGroup[1];

  const updateFsUI = () => {
    if (!fsBtn.active) return;
    const active = isGameFullscreen(scene);
    fsTxt.setText(active ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]');
  };

  pauseModal.updateAudio = updateAudioUI;
  pauseModal.updateFullscreen = updateFsUI;

  const restartBtn = createButton(scene, cx, top + 284, 'REINICIAR MISS\u00c3O', () => restartScene(scene, true, false), btnW, btnH);
  const menuBtn = createButton(scene, cx, top + 328, 'MENU PRINCIPAL', () => restartScene(scene, false, false), btnW, btnH);
  const footerHint = scene.add.text(cx, top + 372, 'Pausar / Retornar: Tecla [P] ou [ESC]', textStyle('#e0c088', 10.5)).setOrigin(0.5);

  pauseModal.add([
    statsPanel, timeTxt, relicTxt,
    ...continueBtn,
    ...audioBtnGroup,
    ...fsBtnGroup,
    ...restartBtn,
    ...menuBtn,
    footerHint
  ]);
}


// GAME OVER: CONVERSÃO PRATA -> OURO, BOUNDING BOX COM WORD WRAP & AUTO-SIZE
// -----------------------------------------------------------------------------
function showInitials(scene) {
  let name = '', done = false;
  const modalW = 560;
  const modalH = 480;
  const cx = GAME_WIDTH / 2;
  const top = (GAME_HEIGHT - modalH) / 2;
  const boxW = modalW - 56;
  const boxLeft = cx - boxW / 2;

  const summary = lastRunSummary || {
    silverCollected: runSilver,
    goldFromSilver: Math.floor(runSilver / 3),


    totalGoldEarned: runGold,
    newTotalGold: getGold()
  };

  const modal = createModal(scene, 'O CAVALEIRO TOMBOU', modalH, 'CONSOLIDAÇÃO DE FIM DE JORNADA', modalW);

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

  // Linha visual de Conversão: Moedas de Prata -> Moedas de Ouro
  const silverSprite = scene.add.sprite(cx - 165, top + 138, 'silver_coin').play('silver_coin').setScale(1.3);
  const goldSprite = scene.add.sprite(cx + 28, top + 138, 'gold_coin').play('gold_coin').setScale(1.3);

  const conversionLine = scene.add.text(
    cx - 148,
    top + 138,
    `${summary.silverCollected ?? summary.runSilver ?? 0} Pratas   ->`,
    textStyle('#e0f7fa', 14)
  ).setOrigin(0, 0.5);

  const goldEarnedLine = scene.add.text(
    cx + 45,
    top + 138,
    `+${summary.totalGoldEarned ?? summary.earnedGold ?? 0} OURO REAL`,
    textStyle('#ffd740', 14)
  ).setOrigin(0, 0.5);
  fitTextToBox(goldEarnedLine, 165, 24, 10);

  const bonusParts = [`Prata convertida (3:1): +${summary.goldFromSilver ?? summary.earnedGold ?? 0}G`, `Cofre Total: ${summary.newTotalGold ?? summary.totalGold ?? getGold()}G`];




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
  const modalW = 600;
  const modalH = 485;
  const cx = GAME_WIDTH / 2;
  const top = (GAME_HEIGHT - modalH) / 2;

  const summary = lastRunSummary || { silverCollected: runSilver, totalGoldEarned: runGold };
  const subtitle = `Prata Convertida: ${summary.silverCollected ?? summary.runSilver ?? 0} -> +${summary.totalGoldEarned ?? summary.earnedGold ?? 0} Ouro  |  Cofre Total: ${getGold()} Ouro`;

  const modal = createModal(scene, 'CAMPEÕES DO REINO', modalH, subtitle, modalW);
  let marked = false;

  topScores.forEach((entry, i) => {
    const isMine = !marked && entry.name === currentName && entry.score === survivalTime;
    if (isMine) marked = true;
    const rankLabel = ['1º', '2º', '3º', '4º', '5º'][i];
    const rowY = top + 88 + i * 32;

    const rowBg = scene.add.graphics();
    rowBg.fillStyle(isMine ? 0x2e2314 : 0x1d1611, 0.92).fillRoundedRect(cx - 230, rowY - 14, 460, 28, 4);
    rowBg.lineStyle(1, isMine ? 0xffca28 : 0x4a3b2c).strokeRoundedRect(cx - 230, rowY - 14, 460, 28, 4);

    const rowTxt = scene.add.text(cx, rowY, `${rankLabel}   ${entry.name}   —   ${entry.score}s de glória`, {
      ...textStyle(isMine ? '#ffca28' : '#e8dcbe', 15),
      fontStyle: isMine ? 'bold' : 'normal'
    }).setOrigin(0.5);
    fitTextToBox(rowTxt, 430, 24, 11);

    modal.add([rowBg, rowTxt]);
  });

  const goldToDouble = summary.totalGoldEarned ?? summary.earnedGold ?? 0;
  const hasRewardButton = goldToDouble > 0;

  if (hasRewardButton) {
    let rewardedUsed = false;
    const doubleGoldBtn = createButton(scene, cx, top + 266, `DOBRAR OURO DA EXPEDIÇÃO (+${goldToDouble}G)`, () => {
      if (rewardedUsed) return;
      sound.playButtonClick();
      if (typeof PlatformBridge !== 'undefined') {
        PlatformBridge.showRewarded(scene, {
          onReward: () => {
            rewardedUsed = true;
            addGold(goldToDouble);
            sound.playAchievement();
            doubleGoldBtn[1].setText(`OURO DOBRADO COM SUCESSO! (+${goldToDouble}G)`);
            doubleGoldBtn[0].setTexture('ui_btn_blue_press');
            doubleGoldBtn[0].setTint(0x81c784);
            doubleGoldBtn[1].setColor('#a5d6a7');
            floatText(scene, cx, top + 260, `+${goldToDouble} OURO EXTRA!`, '#ffd740');
          }
        });
      }
    }, 460, 36);
    doubleGoldBtn[0].setTint(0xffd54f);
    doubleGoldBtn[1].setColor('#ffe082');
    modal.add(doubleGoldBtn);
  }

  let restarting = false;
  const finishAndRestart = (autoStart, openShop = false, shopTab = 'mage') => {
    if (restarting) return;
    restarting = true;
    scene.input.keyboard.off('keydown-SPACE', onQuickRestart);
    scene.input.keyboard.off('keydown-ENTER', onQuickRestart);
    modal.destroy();
    if (typeof PlatformBridge !== 'undefined') {
      PlatformBridge.showMidroll(scene, () => {
        restartScene(scene, autoStart, openShop, shopTab);
      });
    } else {
      restartScene(scene, autoStart, openShop, shopTab);
    }
  };

  const onQuickRestart = () => {
    sound.playButtonClick();
    finishAndRestart(true, false);
  };

  // Layout Vertical Stack dinâmico e sem sobreposição em 16:9
  const actionRow1Y = hasRewardButton ? (top + 318) : (top + 276);
  const actionRow2Y = hasRewardButton ? (top + 364) : (top + 322);
  const hintY = hasRewardButton ? (top + 410) : (top + 368);

  const newRunBtn = createButton(scene, cx - 138, actionRow1Y, 'NOVA JORNADA', () => finishAndRestart(true, false), 254, 38);
  const forgeBtn = createButton(scene, cx + 138, actionRow1Y, 'FORJA DO FERREIRO', () => finishAndRestart(false, true, 'blacksmith'), 254, 38);
  const mageBtn = createButton(scene, cx - 138, actionRow2Y, 'SANTUÁRIO DO MAGO', () => finishAndRestart(false, true, 'mage'), 254, 38);
  const menuBtn = createButton(scene, cx + 138, actionRow2Y, 'MENU INICIAL', () => finishAndRestart(false, false), 254, 38);
  const isTouchDevice = (typeof virtualJoystick !== 'undefined' && virtualJoystick && virtualJoystick.isMobile);
  const hintTxt = scene.add.text(cx, hintY, isTouchDevice ? 'Toque em um dos botões para prosseguir' : '[ESPAÇO] ou [ENTER] para reiniciar imediatamente', textStyle('#c5a059', 11)).setOrigin(0.5);

  modal.add([...newRunBtn, ...forgeBtn, ...mageBtn, ...menuBtn, hintTxt]);

  scene.time.delayedCall(200, () => {
    if (!restarting) {
      scene.input.keyboard.once('keydown-SPACE', onQuickRestart);
      scene.input.keyboard.once('keydown-ENTER', onQuickRestart);
    }
  });
}




// --- BUNDLE FILE: JS_Teste/src/ui/menus.js ---
// =============================================================================
// TELAS E MENUS DO JOGO (16:9 WIDESCREEN — 960x540)
// DESIGN: CENÁRIOS IMERSIVOS, BALCÕES DOS MESTRES, PERGAMINHO, FERRO & OURO NOBRE
// INSPIRAÇÃO: UI KIT MEDIEVAL (IMG 1), BALCÃO DOS VENDEDORES (IMG 2 & 4) & FLOREIOS VITORIANOS (IMG 3)
// =============================================================================

// -----------------------------------------------------------------------------
// TELA DE CONFIGURAÇÕES (ÁUDIO, TELA CHEIA, JOYSTICK & PERGAMINHO DE COMBATE)
// -----------------------------------------------------------------------------
function showSettingsMenu(scene) {
  if (menuContainer) menuContainer.destroy();
  const cx = GAME_WIDTH / 2;
  const modalH = 490;
  const top = (GAME_HEIGHT - modalH) / 2;
  menuContainer = createModal(scene, 'CONFIGURA\u00c7\u00d5ES DO REINO', modalH, 'Ajustes de \u00e1udio, v\u00eddeo e joystick de batalha', 580);
  menuContainer.isMainMenu = false;

  // Seção 1: Áudio, Tela Cheia & Controles Mobile
  const audioBox = scene.add.graphics();
  audioBox.fillStyle(0x221a13, 0.94).fillRoundedRect(cx - 260, top + 78, 520, 116, 6);
  audioBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(cx - 260, top + 78, 520, 116, 6);
  audioBox.lineStyle(1, 0xc5a059, 0.6).strokeRoundedRect(cx - 258, top + 80, 516, 112, 4);

  const audioTitle = scene.add.text(cx - 240, top + 88, '\u00c1UDIO, TELA CHEIA & JOYSTICK VIRTUAL', textStyle('#ffca28', 11.5));

  // Botão 1: Áudio
  const audioBtnGroup = createButton(scene, cx - 130, top + 124, sound.isMuted() ? '\u00c1UDIO: MUTADO [M]' : '\u00c1UDIO: ATIVADO [M]', () => {
    sound.toggleMute();
    updateAudioUI();
  }, 240, 36, sound.isMuted() ? 'ui_btn_red_reg' : 'ui_btn_blue_reg');
  const audioToggleBtn = audioBtnGroup[0];
  const audioToggleTxt = audioBtnGroup[1];

  const updateAudioUI = () => {
    if (!audioToggleBtn.active) return;
    const muted = sound.isMuted();
    audioToggleBtn.baseTexture = muted ? 'ui_btn_red_reg' : 'ui_btn_blue_reg';
    audioToggleBtn.setTexture(audioToggleBtn.baseTexture);
    audioToggleTxt.setText(muted ? '\u00c1UDIO: MUTADO [M]' : '\u00c1UDIO: ATIVADO [M]');
    if (hudHornIcon) hudHornIcon.setFrame(muted ? 1 : 0);
  };

  // Botão 2: Tela Cheia
  const fsBtnGroup = createButton(scene, cx + 130, top + 124, isGameFullscreen(scene) ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]', () => {
    toggleFullscreen(scene);
    scene.time.delayedCall(80, refreshFsBtn);
  }, 240, 36);
  const fsToggleBtn = fsBtnGroup[0];
  const fsToggleTxt = fsBtnGroup[1];

  const refreshFsBtn = () => {
    if (!fsToggleBtn.active) return;
    const active = isGameFullscreen(scene);
    fsToggleTxt.setText(active ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]');
  };
  menuContainer.updateMenuFullscreen = refreshFsBtn;

  // Botão 3: Ativar Joystick Virtual (Mobile / PC)
  const getJoyLabel = () => {
    const m = typeof getJoystickMode === 'function' ? getJoystickMode() : 'disabled';
    return (m === 'enabled') ? 'JOYSTICK VIRTUAL: [ATIVADO]' : 'JOYSTICK VIRTUAL: [DESATIVADO]';
  };
  const isJoyActive = () => (typeof getJoystickMode === 'function' ? getJoystickMode() : 'disabled') === 'enabled';

  const joyBtnGroup = createButton(scene, cx, top + 166, getJoyLabel(), () => {
    const current = typeof getJoystickMode === 'function' ? getJoystickMode() : 'disabled';
    const next = current === 'enabled' ? 'disabled' : 'enabled';
    if (typeof setJoystickMode === 'function') setJoystickMode(next);
    const active = isJoyActive();
    joyToggleBtn.baseTexture = active ? 'ui_btn_blue_reg' : 'ui_btn_red_reg';
    joyToggleBtn.setTexture(joyToggleBtn.baseTexture);
    joyToggleTxt.setText(getJoyLabel());
    if (virtualJoystick) virtualJoystick.updateVisibility();
  }, 500, 32, isJoyActive() ? 'ui_btn_blue_reg' : 'ui_btn_red_reg');
  const joyToggleBtn = joyBtnGroup[0];
  const joyToggleTxt = joyBtnGroup[1];

  // Seção 2: Pergaminho de Dicas de Combate
  const guideBox = scene.add.graphics();
  guideBox.fillStyle(0x1d1611, 0.94).fillRoundedRect(cx - 260, top + 204, 520, 186, 6);
  guideBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(cx - 260, top + 204, 520, 186, 6);
  guideBox.lineStyle(1, 0xc5a059, 0.5).strokeRoundedRect(cx - 258, top + 206, 516, 182, 4);

  const guideTitle = scene.add.text(cx, top + 214, 'PERGAMINHO DE COMBATE', textStyle('#ffca28', 12)).setOrigin(0.5);
  const guideLines = [
    '\u2022 Mobile (Touch): Joystick Virtual anal\u00f3gico \u00e0 esquerda para movimenta\u00e7\u00e3o (ataque autom\u00e1tico).',
    '\u2022 Inimigos derrotados dropam Moedas de Prata durante a expedi\u00e7\u00e3o na floresta.',
    '\u2022 Ao encerrar a partida, suas Moedas de Prata s\u00e3o convertidas em Ouro Real!',
    '\u2022 Visite a Forja do Ferreiro para desbloquear novas armas de combate com seu Ouro.',
    '\u2022 Visite o Santu\u00e1rio do Mago para aprimorar seus atributos permanentes.',
    '\u2022 O Escudo Sagrado reflete proj\u00e9teis inimigos enquanto desfere seus ataques.'
  ];
  const guideTexts = guideLines.map((txt, i) =>
    scene.add.text(cx - 240, top + 232 + i * 23, txt, { ...textStyle('#d6c8aa', 10, 'normal'), lineSpacing: 3 })
  );

  menuContainer.add([
    audioBox, audioTitle, ...audioBtnGroup, ...fsBtnGroup, ...joyBtnGroup,
    guideBox, guideTitle, ...guideTexts,
    ...createButton(scene, cx, top + 424, 'VOLTAR', () => exitSubMenu(scene), 260, 38)
  ]);
}

// -----------------------------------------------------------------------------
// TÁBULA DOS CAMPEÕES (RECORDES DE SOBREVIVÊNCIA)
// -----------------------------------------------------------------------------
function showRecordsMenu(scene) {
  if (menuContainer) menuContainer.destroy();
  const cx = GAME_WIDTH / 2;
  menuContainer = createModal(scene, 'TÁBULA DOS CAMPEÕES', 470, 'Os maiores guerreiros imortalizados pelas eras', 560);
  menuContainer.isMainMenu = false;

  const scores = getHighScores();
  const ranks = ['1º LUGAR', '2º LUGAR', '3º LUGAR', '4º LUGAR', '5º LUGAR'];
  const colors = ['#ffca28', '#e8e8e8', '#cd7f32', '#d6c8aa', '#a8987b'];

  scores.forEach((entry, i) => {
    const rowY = 145 + i * 48;
    const rowBg = scene.add.graphics();
    rowBg.fillStyle(i === 0 ? 0x2e2314 : 0x1d1611, 0.94).fillRoundedRect(cx - 235, rowY - 18, 470, 38, 5);
    rowBg.lineStyle(1.5, i === 0 ? 0xc5a059 : 0x4a3b2c).strokeRoundedRect(cx - 235, rowY - 18, 470, 38, 5);

    // Medalha / Ícone do Rank
    const rankTxt = scene.add.text(cx - 215, rowY, ranks[i], textStyle(colors[i], 12)).setOrigin(0, 0.5);
    const nameTxt = scene.add.text(cx - 30, rowY, entry.name, textStyle('#ffffff', 17)).setOrigin(0.5);
    const scoreTxt = scene.add.text(cx + 215, rowY, `${entry.score}s de glória`, textStyle(colors[i], 13.5)).setOrigin(1, 0.5);

    menuContainer.add([rowBg, rankTxt, nameTxt, scoreTxt]);
  });

  menuContainer.add(createButton(scene, cx, 436, 'VOLTAR', () => exitSubMenu(scene), 260, 40));
}

// -----------------------------------------------------------------------------
// TÁBULA DE CONQUISTAS DO REINO (DESBLOQUEIO DE FEITOS & OURO)
// -----------------------------------------------------------------------------
function showAchievementsMenu(scene) {
  if (!scene) return;
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.gameplayStop();
  gameState = 'MENU';
  scene.time.paused = false;
  scene.time.timeScale = 1;
  scene.tweens.resumeAll();

  if (menuContainer) menuContainer.destroy();
  sound.startMenuBGM();

  menuContainer = createModal(
    scene,
    'TÁBULA DE CONQUISTAS DO REINO',
    490,
    'Complete façanhas heróicas de combate para desbloquear Ouro e glória eterna',
    820
  );
  menuContainer.isMainMenu = false;

  // Botão Rápido " SAIR [ESC]" no canto superior direito do modal
  const closeQuickBtn = scene.add.image(850, 48, 'ui_btn_red_reg').setDisplaySize(78, 28).setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(850, 48, 'SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);
  closeQuickBtn.on('pointerover', () => { closeQuickBtn.setTexture('ui_btn_red_press'); closeQuickTxt.setColor('#ffeb3b'); });
  closeQuickBtn.on('pointerout', () => { closeQuickBtn.setTexture('ui_btn_red_reg'); closeQuickTxt.setColor('#ffffff'); });
  closeQuickBtn.on('pointerdown', () => exitSubMenu(scene));
  menuContainer.add([closeQuickBtn, closeQuickTxt]);

  const achData = getAchievementsData();
  const totalCount = ACHIEVEMENTS_CATALOG.length;
  const unlockedCount = ACHIEVEMENTS_CATALOG.filter(a => achData.unlocked[a.id]).length;

  // 1. BARRA DE RESUMO SUPERIOR (CONQUISTAS TOTAIS + OURO)
  const summaryBox = scene.add.graphics();
  summaryBox.fillStyle(0x221a13, 0.96).fillRoundedRect(80, 84, 450, 46, 7);
  summaryBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(80, 84, 450, 46, 7);

  const crownIcon = scene.add.image(108, 107, 'hud_crown').setScale(1.1);
  const progTxt = scene.add.text(134, 98, `CONQUISTAS: ${unlockedCount} / ${totalCount} DESBLOQUEADAS`, textStyle('#ffca28', 11.5));
  const subProg = scene.add.text(134, 115, 'Conquistas concedem Ouro Real instantaneamente!', textStyle('#c5a059', 9.5));

  const goldBadge = scene.add.graphics();
  goldBadge.fillStyle(0x261c12, 0.98).fillRoundedRect(540, 84, 330, 46, 7);
  goldBadge.lineStyle(2, 0xffca28).strokeRoundedRect(540, 84, 330, 46, 7);
  const coinSprite = scene.add.sprite(568, 107, 'gold_coin').play('gold_coin').setScale(1.25);
  const goldValTxt = scene.add.text(592, 107, `OURO ATUAL: ${getGold()}`, textStyle('#ffd740', 13)).setOrigin(0, 0.5);

  menuContainer.add([summaryBox, crownIcon, progTxt, subProg, goldBadge, coinSprite, goldValTxt]);

  // 2. GRADE DE 8 CONQUISTAS (2 Colunas x 4 Linhas em 16:9)
  ACHIEVEMENTS_CATALOG.forEach((ach, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cardLeft = col === 0 ? 80 : 485;
    const cardW = 385;
    const cardH = 64;
    const cardTop = 138 + row * 70;

    const isDone = Boolean(achData.unlocked[ach.id]);
    const currentVal = Math.min(ach.target, achData.stats[ach.stat] || 0);
    const pct = Phaser.Math.Clamp(currentVal / ach.target, 0, 1);

    const cardBg = scene.add.graphics();
    cardBg.fillStyle(isDone ? 0x241d14 : 0x18130e, 0.95).fillRoundedRect(cardLeft, cardTop, cardW, cardH, 7);
    cardBg.lineStyle(1.5, isDone ? 0xffca28 : 0x4a3b2c).strokeRoundedRect(cardLeft, cardTop, cardW, cardH, 7);

    const iconSlot = scene.add.graphics();
    iconSlot.fillStyle(0x100c08, 1).fillRoundedRect(cardLeft + 6, cardTop + 8, 48, 48, 5);
    iconSlot.lineStyle(1, isDone ? 0xffca28 : 0x5c4938).strokeRoundedRect(cardLeft + 6, cardTop + 8, 48, 48, 5);

    const icon = scene.add.image(cardLeft + 30, cardTop + 32, ach.icon).setScale(1.18);
    if (!isDone) icon.setTint(0x777777);

    const titleTxt = scene.add.text(cardLeft + 62, cardTop + 6, ach.title, textStyle(isDone ? '#ffca28' : '#e0d2b4', 11));
    fitTextToBox(titleTxt, cardW - 74, 16, 10);

    const descTxt = scene.add.text(cardLeft + 62, cardTop + 20, ach.desc, {
      ...textStyle('#a8987b', 9.5, 'normal'),
      wordWrap: { width: cardW - 74, useAdvancedWrap: true }
    });
    fitTextToBox(descTxt, cardW - 74, 20, 8.5);

    const barX = cardLeft + 62;
    const barY = cardTop + 42;
    const barW = cardW - 146;
    const barH = 12;

    const progBar = scene.add.graphics();
    progBar.fillStyle(0x0e0b08, 1).fillRect(barX, barY, barW, barH);
    progBar.lineStyle(1, isDone ? 0xffca28 : 0x3d3024).strokeRect(barX, barY, barW, barH);
    if (pct > 0) {
      progBar.fillStyle(isDone ? 0xffca28 : 0x7fe7ff, 1).fillRect(barX + 1, barY + 1, Math.round((barW - 2) * pct), barH - 2);
    }

    const countTxt = scene.add.text(barX + barW / 2, barY + barH / 2, `${currentVal}/${ach.target}`, textStyle('#ffffff', 9)).setOrigin(0.5);

    const rewardBadge = scene.add.rectangle(cardLeft + cardW - 36, barY + barH / 2, 62, 20, isDone ? 0x246b3d : 0x261d14)
      .setStrokeStyle(1, isDone ? 0xffca28 : 0x6e5846);
    const rewardTxt = scene.add.text(cardLeft + cardW - 36, barY + barH / 2, isDone ? 'CONCLUÍDO' : `+${ach.rewardGold}G`, textStyle(isDone ? '#ffeb3b' : '#ffd740', 8.5)).setOrigin(0.5);
    fitTextToBox(rewardTxt, 58, 16, 8);

    menuContainer.add([cardBg, iconSlot, icon, titleTxt, descTxt, progBar, countTxt, rewardBadge, rewardTxt]);
  });

  // 3. BOTÃO DE VOLTAR NO RODAPÉ
  const backMenuBtn = createButton(scene, GAME_WIDTH / 2, 465, 'VOLTAR', () => exitSubMenu(scene), 260, 36);
  menuContainer.add([...backMenuBtn]);
}

// =============================================================================
// CONTROLE DE FLUXO DE CENAS E TRANSIÇÃO DE SUBMENUS
// =============================================================================
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

function exitSubMenu(scene) {
  if (!scene) return;
  sound.playButtonClick();
  showMainMenu(scene);
}

// -----------------------------------------------------------------------------
// MENU PRINCIPAL DE TELA COMPLETA (CAPA WIDESCREEN 16:9 — 960x540)
// -----------------------------------------------------------------------------
function showMainMenu(scene) {
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.gameplayStop();
  if (menuContainer) menuContainer.destroy();
  gameState = 'MENU';
  sound.startMenuBGM();

  menuContainer = scene.add.container(0, 0).setDepth(3000).setScrollFactor(0);
  menuContainer.isMainMenu = true;
  const art = scene.add.graphics();

  // 1. CÉU CREPUSCULAR DO REINO (Degradê de 960px em Faixas de Pixel Art Nobre)
  const skyBands = [
    [0, 50, 0x090d1c],
    [50, 45, 0x121b36],
    [95, 45, 0x1f2247],
    [140, 40, 0x38234a],
    [180, 35, 0x5e2f3d],
    [215, 30, 0x8c492b],
    [245, 30, 0xb86b35]
  ];
  skyBands.forEach(([y, h, color]) => art.fillStyle(color, 1).fillRect(0, y, 960, h));

  // Constelações e estrelas douradas
  const starCoords = [
    [65, 26], [130, 55], [195, 24], [285, 42], [370, 22], [475, 38], [560, 60],
    [750, 28], [830, 58], [910, 32], [95, 102], [175, 88], [320, 82], [520, 94], [805, 98]
  ];
  starCoords.forEach(([sx, sy], i) => {
    art.fillStyle(i % 3 === 0 ? 0xffeb3b : 0xffffff, 0.85).fillRect(sx, sy, i % 2 === 0 ? 3 : 2, i % 2 === 0 ? 3 : 2);
  });
  art.lineStyle(1, 0x7fe7ff, 0.22);
  art.lineBetween(65, 26, 130, 55);
  art.lineBetween(130, 55, 195, 24);
  art.lineBetween(195, 24, 285, 42);

  // Lua Cheia Dourada no Céu Noturno
  art.fillStyle(0xffca28, 0.10).fillCircle(710, 125, 78);
  art.fillStyle(0xffca28, 0.22).fillCircle(710, 125, 54);
  art.fillStyle(0xfff3c4, 0.96).fillCircle(710, 125, 36);
  art.fillStyle(0xf2c14e, 0.45).fillCircle(722, 116, 8).fillCircle(698, 134, 11);

  // 2. CORDILHEIRA DE MONTANHAS & CASTELO REAL AO HORIZONTE
  art.fillStyle(0x1b152b, 1);
  art.fillTriangle(-40, 265, 140, 145, 320, 265);
  art.fillTriangle(210, 265, 395, 158, 580, 265);
  art.fillTriangle(510, 265, 700, 130, 890, 265);
  art.fillTriangle(730, 265, 870, 165, 980, 265);

  art.fillStyle(0x2c2240, 1);
  art.fillTriangle(140, 145, 230, 265, 320, 265);
  art.fillTriangle(395, 158, 485, 265, 580, 265);

  // Silhueta do Castelo Real nas montanhas
  const castleX = 645, castleY = 135;
  art.fillStyle(0x120d1d, 1);
  art.fillRect(castleX, castleY + 32, 110, 65);
  art.fillRect(castleX - 12, castleY + 16, 24, 80);
  art.fillRect(castleX + 98, castleY + 16, 24, 80);
  art.fillRect(castleX + 35, castleY - 12, 40, 108);
  art.fillRect(castleX + 18, castleY + 6, 18, 90);
  art.fillRect(castleX + 74, castleY + 6, 18, 90);

  art.fillStyle(0x2f6fd6, 1);
  art.fillTriangle(castleX - 16, castleY + 16, castleX, castleY - 6, castleX + 16, castleY + 16);
  art.fillTriangle(castleX + 94, castleY + 16, castleX + 110, castleY - 6, castleX + 126, castleY + 16);
  art.fillTriangle(castleX + 30, castleY - 12, castleX + 55, castleY - 44, castleX + 80, castleY - 12);

  art.lineStyle(2, 0xc5a059, 1);
  art.lineBetween(castleX + 55, castleY - 44, castleX + 55, castleY - 58);
  art.fillStyle(0xd83a3a, 1).fillTriangle(castleX + 55, castleY - 58, castleX + 73, castleY - 53, castleX + 55, castleY - 48);

  art.fillStyle(0xffeb3b, 0.95);
  art.fillRect(castleX + 51, castleY - 2, 8, 14);
  art.fillRect(castleX + 46, castleY + 20, 6, 10);
  art.fillRect(castleX + 58, castleY + 20, 6, 10);
  art.fillRect(castleX - 3, castleY + 28, 6, 10);
  art.fillRect(castleX + 107, castleY + 28, 6, 10);
  art.fillStyle(0x3a2414, 1).fillRect(castleX + 45, castleY + 58, 20, 32);
  art.fillStyle(0xffa726, 0.7).fillRect(castleX + 49, castleY + 64, 12, 24);

  // 3. COLINAS VERDES, FLORESTA E O CAMINHO REAL SINUOSO
  art.fillStyle(0x16331a, 1).fillRect(0, 245, 960, 295);
  art.fillStyle(0x1f4724, 1);
  art.fillEllipse(240, 320, 640, 150);
  art.fillEllipse(720, 335, 600, 140);
  art.fillStyle(0x2a5c2f, 1);
  art.fillEllipse(480, 480, 1060, 270);

  // Caminho de pedra dourada sinuoso
  const roadPolys = [
    { y1: 225, y2: 268, x1L: 685, x1R: 701, x2L: 590, x2R: 622 },
    { y1: 268, y2: 328, x1L: 590, x1R: 622, x2L: 420, x2R: 475 },
    { y1: 328, y2: 412, x1L: 420, x1R: 475, x2L: 325, x2R: 420 },
    { y1: 412, y2: 540, x1L: 325, x1R: 420, x2L: 180, x2R: 510 }
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

  // Pedestal Rochoso Heróico (onde repousa o Cavaleiro)
  art.fillStyle(0x1f2126, 1).fillEllipse(220, 455, 210, 58);
  art.fillStyle(0x373a42, 1).fillEllipse(220, 446, 192, 48);
  art.fillStyle(0x525763, 1).fillEllipse(220, 440, 164, 36);
  art.fillStyle(0x000000, 0.45).fillEllipse(220, 436, 92, 18);

  menuContainer.add(art);

  // 4. ELEMENTOS DA VILA REAL E O CAVALEIRO HERÓICO
  const treeFar = scene.add.image(560, 275, 'tree').setScale(0.72);
  const menuHouse = scene.add.image(265, 302, 'village_house').setScale(0.88);
  const menuBlacksmith = scene.add.image(352, 310, 'village_blacksmith').setScale(0.82);
  const menuGateTower = scene.add.image(476, 298, 'village_gate_tower').setScale(0.76);
  const treeLeft = scene.add.image(72, 380, 'tree').setScale(1.2);

  const heroSprite = scene.add.image(220, 376, 'knight_banner').setScale(2.2);
  scene.tweens.add({
    targets: heroSprite,
    y: 370,
    duration: 1300,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // 5. BRASÃO DE TÍTULO NO TOPO (INSPIRAÇÃO NAS IMAGENS 1 & 3: FLOREIOS E RIBBON NOBRE)
  const headerBanner = scene.add.graphics();
  // Moldura principal com veludo real borgonha / ébano
  headerBanner.fillStyle(0x140e0a, 0.94).fillRoundedRect(130, 14, 700, 84, 12);
  headerBanner.lineStyle(3, 0x3d2b1f, 1).strokeRoundedRect(130, 14, 700, 84, 12);
  headerBanner.lineStyle(1.5, 0xc5a059, 0.95).strokeRoundedRect(134, 18, 692, 76, 10);
  headerBanner.lineStyle(1, 0x8d5524, 0.5).strokeRoundedRect(138, 22, 684, 68, 8);

  // Floreios de acanto vitoriano nas bordas do brasão (Imagem 3)
  [130, 830].forEach((fx, idx) => {
    const dir = idx === 0 ? 1 : -1;
    headerBanner.fillStyle(0xc5a059, 1);
    headerBanner.fillTriangle(fx + dir * 6, 56, fx + dir * 24, 46, fx + dir * 24, 66);
    headerBanner.fillCircle(fx + dir * 24, 56, 3);
  });

  // Rebites de ouro nos cantos do banner
  [[144, 28], [816, 28], [144, 84], [816, 84]].forEach(([rx, ry]) => {
    headerBanner.fillStyle(0xc5a059, 1).fillCircle(rx, ry, 3.5);
    headerBanner.fillStyle(0x2a1a0e, 1).fillCircle(rx, ry, 1.5);
  });

  const titleMain = scene.add.text(480, 43, 'A JORNADA DO CAVALEIRO', titleTextStyle('#ffca28', 28)).setOrigin(0.5);
  const subtitleTxt = scene.add.text(480, 74, 'CRÔNICAS DE ELDÓRIA - ROGUELITE DE AÇÃO', subtitleTextStyle('#e0c088', 11.5)).setOrigin(0.5);

  // Botões Rápidos no Canto Superior Direito: Áudio [M] e Tela Cheia [F]
  let menuSoundBg, menuFsBg;
  if (scene.textures && scene.textures.exists('ui_btn_blue_sq')) {
    menuSoundBg = scene.add.image(867, 41, 'ui_btn_blue_sq').setDisplaySize(44, 44);
    menuFsBg = scene.add.image(921, 41, 'ui_btn_blue_sq').setDisplaySize(44, 44);
  } else {
    menuSoundBg = scene.add.graphics();
    const drawMenuSound = (hover = false) => {
      menuSoundBg.clear();
      menuSoundBg.fillStyle(hover ? 0x2e241c : 0x14100c, 0.94).fillRoundedRect(844, 18, 46, 46, 8);
      menuSoundBg.lineStyle(2, hover ? 0xffca28 : 0xc5a059).strokeRoundedRect(844, 18, 46, 46, 8);
    };
    drawMenuSound(false);
    menuFsBg = scene.add.graphics();
    const drawMenuFs = (hover = false) => {
      menuFsBg.clear();
      menuFsBg.fillStyle(hover ? 0x2e241c : 0x14100c, 0.94).fillRoundedRect(898, 18, 46, 46, 8);
      menuFsBg.lineStyle(2, hover ? 0xffca28 : 0xc5a059).strokeRoundedRect(898, 18, 46, 46, 8);
    };
    drawMenuFs(false);
  }

  const menuHorn = scene.add.image(867, 41, 'hud_horn', sound.isMuted() ? 1 : 0);
  const menuSoundHit = scene.add.rectangle(867, 41, 46, 46, 0x000000, 0).setInteractive({ useHandCursor: true });
  menuContainer.updateMenuHorn = () => {
    if (menuHorn && menuHorn.active) menuHorn.setFrame(sound.isMuted() ? 1 : 0);
  };
  menuSoundHit.on('pointerdown', () => {
    if (menuSoundBg && menuSoundBg.setTexture && scene.textures.exists('ui_btn_blue_sq_press')) menuSoundBg.setTexture('ui_btn_blue_sq_press');
    sound.toggleMute();
    sound.playButtonClick();
    if (!sound.isMuted()) sound.startMenuBGM();
    menuContainer.updateMenuHorn();
    if (hudHornIcon) hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
  });
  menuSoundHit.on('pointerup', () => {
    if (menuSoundBg && menuSoundBg.setTexture && scene.textures.exists('ui_btn_blue_sq')) menuSoundBg.setTexture('ui_btn_blue_sq');
  });
  menuSoundHit.on('pointerout', () => {
    if (menuSoundBg && menuSoundBg.setTexture && scene.textures.exists('ui_btn_blue_sq')) menuSoundBg.setTexture('ui_btn_blue_sq');
  });

  const menuFsIcon = scene.add.image(921, 41, 'hud_fullscreen', isGameFullscreen(scene) ? 1 : 0);
  const menuFsHit = scene.add.rectangle(921, 41, 46, 46, 0x000000, 0).setInteractive({ useHandCursor: true });
  menuContainer.updateMenuFullscreen = () => {
    if (menuFsIcon && menuFsIcon.active) menuFsIcon.setFrame(isGameFullscreen(scene) ? 1 : 0);
  };
  menuFsHit.on('pointerdown', () => {
    if (menuFsBg && menuFsBg.setTexture && scene.textures.exists('ui_btn_blue_sq_press')) menuFsBg.setTexture('ui_btn_blue_sq_press');
    sound.playButtonClick();
    toggleFullscreen(scene);
  });
  menuFsHit.on('pointerup', () => {
    if (menuFsBg && menuFsBg.setTexture && scene.textures.exists('ui_btn_blue_sq')) menuFsBg.setTexture('ui_btn_blue_sq');
  });
  menuFsHit.on('pointerout', () => {
    if (menuFsBg && menuFsBg.setTexture && scene.textures.exists('ui_btn_blue_sq')) menuFsBg.setTexture('ui_btn_blue_sq');
  });

  // 6. PAINEL DE MISSÕES & AÇÕES DA CORTE (LADO DIREITO: x: 530..910, y: 120..495)
  const menuPanel = scene.add.graphics();
  menuPanel.fillStyle(0x14100c, 0.95).fillRoundedRect(530, 120, 380, 375, 12);
  menuPanel.lineStyle(3, 0x3d2b1f, 1).strokeRoundedRect(530, 120, 380, 375, 12);
  menuPanel.lineStyle(1.5, 0xc5a059, 0.9).strokeRoundedRect(534, 124, 372, 367, 10);
  menuPanel.lineStyle(1, 0x8d5524, 0.5).strokeRoundedRect(538, 128, 364, 359, 8);

  // Rebites nos 4 cantos do painel de ações
  [[546, 136], [894, 136], [546, 479], [894, 479]].forEach(([rx, ry]) => {
    menuPanel.fillStyle(0xc5a059, 1).fillCircle(rx, ry, 3);
  });

  // Faixa de Conquistas & Tesouro no topo do painel
  const crownIcon = scene.add.image(568, 150, 'hud_crown').setScale(0.95);
  const bestBannerTxt = scene.add.text(588, 150, `RECORDE: ${getBestScore()}s`, textStyle('#ffca28', 12)).setOrigin(0, 0.5);

  const menuCoinIcon = scene.add.image(772, 150, 'gold_coin', 0).setScale(1.2);
  const menuGoldTxt = scene.add.text(794, 150, `OURO: ${getGold()}`, textStyle('#ffd740', 12.5)).setOrigin(0, 0.5);

  menuPanel.lineStyle(1, 0xc5a059, 0.45).lineBetween(554, 172, 886, 172);

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

  // Botões do Painel de Ações
  const startBtn = createButton(scene, 720, 206, 'COMEÇAR JORNADA', launchGame, 330, 42);
  const blacksmithBtn = createButton(scene, 720, 256, 'FORJA DO FERREIRO', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showBlacksmithMenu(scene);
  }, 330, 38);
  const mageBtn = createButton(scene, 720, 304, 'SANTUÁRIO DO MAGO', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showMageShopMenu(scene);
  }, 330, 38);
  const achBtn = createButton(scene, 720, 352, 'CONQUISTAS DO REINO', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showAchievementsMenu(scene);
  }, 330, 38);

  const recordsBtn = createButton(scene, 634, 400, 'RECORDES', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showRecordsMenu(scene);
  }, 156, 36);
  const settingsBtn = createButton(scene, 806, 400, 'AJUSTES', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showSettingsMenu(scene);
  }, 156, 36);

  const startHint = scene.add.text(720, 448, 'Pressione [ESPAÇO] ou [ENTER] para iniciar', textStyle('#c5a059', 11)).setOrigin(0.5);

  // 7. FAIXA DE RODAPÉ (LARGURA TOTAL 960px)
  const footerBg = scene.add.rectangle(480, 526, 960, 28, 0x0c0907, 0.94);
  const footerLine = scene.add.graphics().lineStyle(1.5, 0x8d5524, 0.9).lineBetween(0, 512, 960, 512);
  const footerTxt = scene.add.text(320, 526, 'Mover: WASD/Setas  |  Pausar: P ou ESC  |  Áudio: M  |  Tela Cheia: F', textStyle('#d6c8aa', 10.5)).setOrigin(0.5);
  const versionTxt = scene.add.text(820, 526, `${GAME_VERSION} Ateliê do Reino`, textStyle('#c5a059', 10.5)).setOrigin(0.5);

  menuContainer.add([
    treeFar, menuHouse, menuBlacksmith, menuGateTower,
    treeLeft, heroSprite,
    headerBanner, titleMain, subtitleTxt,
    menuSoundBg, menuHorn, menuSoundHit,
    menuFsBg, menuFsIcon, menuFsHit,
    menuPanel, crownIcon, bestBannerTxt, menuCoinIcon, menuGoldTxt,
    ...startBtn, ...blacksmithBtn, ...mageBtn, ...achBtn, ...recordsBtn, ...settingsBtn, startHint,
    footerBg, footerLine, footerTxt, versionTxt
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

// A FORJA DO MESTRE FERREIRO ANVILGAR (DESBLOQUEIO DE ARMAS & ARSENAL DE COMBATE)
// DESIGN: CENÁRIO COMPLETO COM FORNALHA DOOM FIRE EM TEMPO REAL, ANÃO ATRÁS DO BALCÃO,
// BIGORNA FRONTAL, MESA DE COURO PESPONTADO PARA AS CARTAS & ELEMENTOS DAS CONCEPTS (1 A 5)

// =============================================================================
// A FORJA DO MESTRE FERREIRO ANVILGAR (DESBLOQUEIO DE ARMAS & ARSENAL DE COMBATE)
// DESIGN: CENÁRIO COMPLETO COM FORNALHA DOOM FIRE EM TEMPO REAL, ANÃO ATRÁS DO BALCÃO,
// BIGORNA FRONTAL, MESA DE COURO PESPONTADO PARA AS CARTAS & ELEMENTOS DAS CONCEPTS (1 A 5)
// =============================================================================
function showBlacksmithMenu(scene) {
  if (!scene) return;
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.gameplayStop();
  gameState = 'MENU';
  scene.time.paused = false;
  scene.time.timeScale = 1;
  scene.tweens.resumeAll();

  if (menuContainer) menuContainer.destroy();
  sound.startMenuBGM();

  menuContainer = scene.add.container(0, 0).setDepth(3000).setScrollFactor(0);
  menuContainer.isMainMenu = false;

  // ---------------------------------------------------------------------------
  // 1. MOTOR DE FOGO DO DOOM ARREDONDADO & PROFUNDO COM CORES VIBRANTES REAIS
  // PALETA 100% RUBI, VERMELHO VIVO, MAGMA LARANJA, OURO SOLAR E BRANCO INCANDESCENTE
  // (ZERO TONS MOSTARDA OU ESVERDEADOS — FOGO REAL DE FORJA ARDENTE)
  // ---------------------------------------------------------------------------
  const DOOM_FIRE_PALETTE = [
    [0, 0, 0, 0],           // 0: Transparente / Vazio (topo da fornalha)
    [30, 2, 2, 160],        // 1: Fumaça de brasa escura
    [55, 4, 4, 210],        // 2: Vermelho carmesim profundo
    [85, 6, 6, 255],        // 3
    [115, 8, 6, 255],       // 4
    [145, 12, 6, 255],      // 5: Vermelho escuro
    [175, 18, 6, 255],      // 6
    [200, 24, 6, 255],      // 7: Vermelho sangue vivo
    [220, 30, 6, 255],      // 8
    [235, 38, 8, 255],      // 9: Vermelho fogo ardente
    [245, 48, 8, 255],      // 10
    [255, 58, 10, 255],     // 11: Escarlate vivo
    [255, 70, 10, 255],     // 12
    [255, 82, 12, 255],     // 13: Vermelhão incandescente
    [255, 96, 14, 255],     // 14
    [255, 110, 16, 255],    // 15: Laranja magma elétrico
    [255, 124, 18, 255],    // 16
    [255, 138, 20, 255],    // 17: Laranja brasa pura
    [255, 152, 22, 255],    // 18
    [255, 166, 24, 255],    // 19: Laranja fogo brilhante
    [255, 178, 26, 255],    // 20
    [255, 190, 28, 255],    // 21: Ouro alaranjado
    [255, 202, 32, 255],    // 22
    [255, 214, 36, 255],    // 23: Ouro solar
    [255, 224, 42, 255],    // 24
    [255, 232, 50, 255],    // 25: Amarelo fogo puro
    [255, 240, 60, 255],    // 26
    [255, 245, 75, 255],    // 27: Amarelo brilhante
    [255, 248, 95, 255],    // 28
    [255, 250, 120, 255],   // 29: Amarelo-claro ardente
    [255, 252, 150, 255],   // 30
    [255, 253, 180, 255],   // 31: Núcleo esbranquiçado
    [255, 254, 205, 255],   // 32
    [255, 254, 225, 255],   // 33: Branco fogo
    [255, 255, 240, 255],   // 34
    [255, 255, 250, 255],   // 35
    [255, 255, 255, 255]    // 36: Branco puro (coração da fornalha)
  ];

  const fireW = 48;
  const fireH = 44;
  const firePixels = new Uint8Array(fireW * fireH);

  // Perfil arredondado do leito de brasas (curvatura da fornalha)
  const baseHeatProfile = new Uint8Array(fireW);
  for (let x = 0; x < fireW; x++) {
    const normX = Math.abs(x - (fireW - 1) / 2) / ((fireW - 1) / 2); // 0 no centro, 1 nas bordas
    const arch = Math.cos(normX * (Math.PI / 2.2));
    baseHeatProfile[x] = Math.round(36 * Math.max(0, arch));
  }

  // Inicializa o leito de brasas arredondado
  for (let x = 0; x < fireW; x++) {
    const maxH = baseHeatProfile[x];
    firePixels[(fireH - 1) * fireW + x] = maxH;
    firePixels[(fireH - 2) * fireW + x] = Math.max(0, maxH - 1);
  }

  let fireTex = scene.textures.get('doom_forge_fire');
  if (!fireTex || fireTex.key !== 'doom_forge_fire') {
    if (scene.textures.exists('doom_forge_fire')) scene.textures.remove('doom_forge_fire');
    fireTex = scene.textures.createCanvas('doom_forge_fire', fireW, fireH);
    if (fireTex && fireTex.setFilter) fireTex.setFilter(Phaser.Textures.FilterMode.NEAREST);
  }

  const fireCtx = fireTex.context;
  const fireImgData = fireCtx.createImageData(fireW, fireH);
  const fireData = fireImgData.data;

  const stepDoomFire = () => {
    // Alimenta o leito de brasas arredondado com pulsaÃ§Ãµes dinÃ¢micas de calor
    for (let x = 0; x < fireW; x++) {
      const maxH = baseHeatProfile[x];
      const jitter = Math.floor(Math.random() * 2);
      firePixels[(fireH - 1) * fireW + x] = Math.max(0, maxH - jitter);
      firePixels[(fireH - 2) * fireW + x] = Math.max(0, maxH - jitter - (Math.random() > 0.6 ? 1 : 0));
    }

    // PropagaÃ§Ã£o clÃ¡ssica do Doom: dispersÃ£o lateral e resfriamento para cima
    for (let x = 0; x < fireW; x++) {
      for (let y = 1; y < fireH; y++) {
        const src = y * fireW + x;
        const pixel = firePixels[src];
        if (pixel === 0) {
          firePixels[src - fireW] = 0;
        } else {
          const rand = Math.floor(Math.random() * 3);
          const decay = Math.floor(Math.random() * 2);
          const dstX = Math.min(fireW - 1, Math.max(0, x - rand + 1));
          const dst = (y - 1) * fireW + dstX;
          firePixels[dst] = pixel >= decay ? pixel - decay : 0;
        }
      }
    }

    // Converte os valores tÃ©rmicos em cores vivas de fogo real
    let p = 0;
    for (let i = 0; i < firePixels.length; i++) {
      const col = DOOM_FIRE_PALETTE[firePixels[i]];
      fireData[p++] = col[0];
      fireData[p++] = col[1];
      fireData[p++] = col[2];
      fireData[p++] = col[3];
    }
    fireCtx.putImageData(fireImgData, 0, 0);
    fireTex.refresh();
  };

  // PrÃ©-aquece a simulaÃ§Ã£o para as chamas comeÃ§arem jÃ¡ no auge
  for (let i = 0; i < 45; i++) stepDoomFire();

  // Sprite do Fogo do Doom com mÃ¡scara de geometria cÃ´ncava
  // O fogo fica fisicamente recortado dentro da cavidade e em layer atrÃ¡s da alvenaria frontal
  const doomFireSprite = scene.add.image(105, 150, 'doom_forge_fire')
    .setScale(2.7)
    .setOrigin(0.5);

  const hearthFireMaskGfx = scene.make.graphics();
  hearthFireMaskGfx.fillStyle(0xffffff);
  hearthFireMaskGfx.fillRoundedRect(64, 106, 82, 90, 18);
  const doomHearthMask = hearthFireMaskGfx.createGeometryMask();
  doomFireSprite.setMask(doomHearthMask);

  const doomFireTimer = scene.time.addEvent({
    delay: 36, // ~28 fps - taxa de atualização perfeita do DOOM fire clássico
    loop: true,
    callback: () => {
      if (!menuContainer || !menuContainer.active) return;
      stepDoomFire();
    }
  });

  menuContainer.on('destroy', () => {
    if (doomFireTimer) doomFireTimer.remove();
  });

  // ---------------------------------------------------------------------------
  // 2. CENÁRIO DA FORJA: ALVENARIA DE PEDRA, FORNALHA COM PROFUNDIDADE & ARSENAL
  // ---------------------------------------------------------------------------
  const forgeBackdropArt = scene.add.graphics();

  // Parede de blocos de pedra rÃºstica escura com fuligem e rejunte de carvÃ£o
  forgeBackdropArt.fillStyle(0x0e0906, 1).fillRect(0, 0, 960, 240);
  for (let row = 0; row < 9; row++) {
    const by = row * 26;
    const offset = (row % 2 === 0) ? 0 : 45;
    forgeBackdropArt.fillStyle(0x19100a, 0.6).fillRect(0, by, 960, 2);
    for (let bx = offset; bx < 960; bx += 90) {
      forgeBackdropArt.fillStyle(0x19100a, 0.45).fillRect(bx, by, 2, 26);
      if ((bx + row) % 3 === 0) {
        forgeBackdropArt.fillStyle(0x22150e, 0.35).fillRect(bx + 6, by + 4, 38, 16);
      }
    }
  }

  // Vigas estruturais de carvalho pesado no teto
  forgeBackdropArt.fillStyle(0x221308, 1).fillRect(0, 0, 960, 14);
  forgeBackdropArt.fillStyle(0x381f12, 1).fillRect(0, 12, 960, 4);
  forgeBackdropArt.lineStyle(6, 0x1f1107, 0.95);
  forgeBackdropArt.strokeCircle(65, 0, 90);
  forgeBackdropArt.strokeCircle(895, 0, 90);

  // CAVIDADE PROFUNDA DA FORNALHA (FUNDO ESCURO ONDE ARDEM AS CHAMAS)
  forgeBackdropArt.fillStyle(0x060302, 1).fillRoundedRect(30, 48, 150, 162, 14);
  // Tijolos refratÃ¡rios internos da cÃ¢mara de combustÃ£o
  forgeBackdropArt.fillStyle(0x150a05, 0.85);
  for (let fy = 92; fy < 200; fy += 14) {
    forgeBackdropArt.fillRect(36, fy, 138, 1);
  }
  // Glow tÃ©rmico Ã¢mbar no fundo da cavidade
  forgeBackdropArt.fillStyle(0xd53205, 0.2).fillCircle(105, 152, 60);
  forgeBackdropArt.fillStyle(0xff8f00, 0.25).fillCircle(105, 162, 38);

  // ARSENAL DE PAREDE Ã€ DIREITA (x: 640..930, y: 64..190 â€” CONCEPTS 1, 2, 3, 5)
  forgeBackdropArt.fillStyle(0x24150c, 0.96).fillRoundedRect(638, 64, 290, 124, 8);
  forgeBackdropArt.lineStyle(2.5, 0x54321d).strokeRoundedRect(638, 64, 290, 124, 8);
  forgeBackdropArt.lineStyle(1.2, 0xc5a059, 0.6).strokeRoundedRect(642, 68, 282, 116, 6);
  forgeBackdropArt.fillStyle(0x190d07, 1).fillRect(644, 114, 278, 6);

  // Item 1 (Concept 1): ELMO CRUZADO DE AÃ‡O COM CRUZ DOURADA
  forgeBackdropArt.fillStyle(0x8a909c, 1).fillRoundedRect(658, 76, 26, 32, 4);
  forgeBackdropArt.lineStyle(1.5, 0x5a606e).strokeRoundedRect(658, 76, 26, 32, 4);
  forgeBackdropArt.fillStyle(0xffca28, 1).fillRect(669, 78, 4, 28).fillRect(663, 86, 16, 4);
  forgeBackdropArt.fillStyle(0x121216, 1).fillRect(663, 87, 5, 2).fillRect(673, 87, 5, 2);

  // Item 2 (Concept 1 & 2): ESCUDO AQUECEDOR DE CARVALHO (HEATER SHIELD)
  forgeBackdropArt.fillStyle(0x422616, 1).fillRect(700, 75, 26, 22);
  forgeBackdropArt.fillStyle(0x422616, 1).fillTriangle(700, 97, 726, 97, 713, 112);
  forgeBackdropArt.lineStyle(1.8, 0x8a909c).strokeRect(700, 75, 26, 22);
  forgeBackdropArt.lineStyle(1.8, 0x8a909c).lineBetween(700, 97, 713, 112).lineBetween(726, 97, 713, 112);
  forgeBackdropArt.lineStyle(1, 0x24140b).lineBetween(708, 76, 708, 102).lineBetween(718, 76, 718, 102);
  forgeBackdropArt.fillStyle(0xffca28, 1).fillCircle(713, 88, 2.5);

  // Item 3 (Concept 1 & 2): ESCUDO REDONDO VIKING COM UMBO DE FERRO
  forgeBackdropArt.fillStyle(0x2f4f4f, 0.95).fillCircle(758, 92, 17);
  forgeBackdropArt.lineStyle(2, 0xc5a059).strokeCircle(758, 92, 17);
  forgeBackdropArt.fillStyle(0x8a909c, 1).fillCircle(758, 92, 6);
  forgeBackdropArt.fillStyle(0xffffff, 0.8).fillCircle(757, 91, 1.5);

  // Item 4 (Concept 2 & 5): MACHADO DE GUERRA & ESPADA DE AÃ‡O CRUZADOS
  forgeBackdropArt.fillStyle(0x8d5c38, 1).fillRect(798, 72, 3.5, 42);
  forgeBackdropArt.fillStyle(0x8a909c, 1).fillTriangle(799, 74, 786, 84, 799, 94);
  forgeBackdropArt.fillStyle(0x8a909c, 1).fillTriangle(801, 74, 814, 84, 801, 94);
  forgeBackdropArt.fillStyle(0xffffff, 0.9).fillRect(786, 83, 28, 2);

  forgeBackdropArt.fillStyle(0x5a606e, 1).fillRect(828, 72, 4, 38);
  forgeBackdropArt.fillStyle(0xffca28, 1).fillRect(822, 80, 16, 3.5);
  forgeBackdropArt.fillStyle(0x8d5c38, 1).fillRect(828, 83, 4, 8);
  forgeBackdropArt.fillStyle(0xffca28, 1).fillCircle(830, 92, 2.5);

  // Item 5 (Concept 5): ALJAVA DE COURO COM FLECHAS & ARCO RECURVO
  forgeBackdropArt.fillStyle(0x4e342e, 1).fillRoundedRect(854, 75, 14, 34, 3);
  forgeBackdropArt.lineStyle(1.5, 0xc5a059).strokeRoundedRect(854, 75, 14, 34, 3);
  forgeBackdropArt.fillStyle(0xf5f5f5, 1).fillTriangle(856, 75, 858, 67, 860, 75);
  forgeBackdropArt.fillStyle(0xf5f5f5, 1).fillTriangle(862, 75, 864, 65, 866, 75);

  // Item 6 (Concept 5): LANTERNA DE TEMPESTADE EM GAIOLA DE FERRO
  forgeBackdropArt.lineStyle(1.5, 0x1f1610).lineBetween(900, 68, 900, 78);
  forgeBackdropArt.fillStyle(0x1f1610, 1).fillRoundedRect(892, 78, 16, 22, 3);
  forgeBackdropArt.fillStyle(0xffeb3b, 0.95).fillRoundedRect(894, 82, 12, 14, 2);
  forgeBackdropArt.fillStyle(0xff6f00, 1).fillRect(899, 87, 3, 5);
  forgeBackdropArt.lineStyle(1, 0xc5a059, 0.85).strokeRoundedRect(892, 78, 16, 22, 3);
  forgeBackdropArt.fillStyle(0xffa000, 0.12).fillCircle(900, 89, 32);

  // Item 7 (Concept 3): PEDRA DE AMOLAR RÃšNICA COM VEIOS EM BRASA
  forgeBackdropArt.fillStyle(0x23262d, 1).fillRoundedRect(655, 128, 48, 22, 3);
  forgeBackdropArt.lineStyle(1.5, 0x455a64).strokeRoundedRect(655, 128, 48, 22, 3);
  forgeBackdropArt.fillStyle(0xff5722, 0.95).fillRect(662, 137, 34, 2);
  forgeBackdropArt.fillStyle(0xffca28, 1).fillCircle(679, 138, 2);

  // Item 8 (Concept 1): ELMO BARBUTA / SALLET PONTUDO DE INFANTARIA
  forgeBackdropArt.fillStyle(0x78909c, 1).fillRoundedRect(722, 128, 24, 26, 4);
  forgeBackdropArt.fillStyle(0x101419, 1).fillRect(731, 135, 4, 14).fillRect(726, 139, 14, 3);

  // Item 9 (Concept 2): SACO DE MOEDAS DE OURO EM COURO CRU
  forgeBackdropArt.fillStyle(0x8d5c38, 1).fillCircle(776, 142, 9);
  forgeBackdropArt.fillStyle(0x5c3a1b, 1).fillRect(773, 131, 6, 4);
  forgeBackdropArt.fillStyle(0xffca28, 1).fillCircle(783, 146, 3).fillCircle(788, 146, 3);

  // Item 10 (Concept 5): ESPADÃƒO MONTANTE PESADO (BUSTER SWORD)
  forgeBackdropArt.fillStyle(0x5a606e, 1).fillRect(815, 126, 75, 12);
  forgeBackdropArt.fillStyle(0xffffff, 0.8).fillRect(815, 127, 75, 2);
  forgeBackdropArt.fillStyle(0x3e2723, 1).fillRect(805, 129, 10, 6);
  forgeBackdropArt.fillStyle(0xc5a059, 1).fillCircle(804, 132, 3);
  forgeBackdropArt.fillStyle(0x1a120c, 1).fillCircle(832, 132, 2).fillCircle(852, 132, 2);

  // ---------------------------------------------------------------------------
  // 3. FACHADA E ALVENARIA FRONTAL DA FORNALHA (LAYER 3: NA FRENTE DO FOGO!)
  // MASCARA COMPLETAMENTE AS 4 BORDAS RETANGULARES DO SPRITE DO DOOM FIRE
  // ---------------------------------------------------------------------------
  const forgeFrontArt = scene.add.graphics();

  // Pilar esquerdo maciÃ§o de pedras da fornalha (x: 28..70 â€” cobre a borda esquerda do fogo x: 40.2)
  forgeFrontArt.fillStyle(0x28170e, 1).fillRoundedRect(28, 46, 42, 172, 6);
  forgeFrontArt.lineStyle(2.5, 0x482917).strokeRoundedRect(28, 46, 42, 172, 6);
  for (let py = 56; py < 210; py += 24) {
    forgeFrontArt.fillStyle(0x180d07, 0.7).fillRect(28, py, 42, 2);
    forgeFrontArt.fillStyle(0x3e2417, 0.45).fillRect(32, py + 4, 34, 16);
  }

  // Pilar direito maciÃ§o de pedras da fornalha (x: 140..182 â€” cobre a borda direita do fogo x: 169.8)
  forgeFrontArt.fillStyle(0x28170e, 1).fillRoundedRect(140, 46, 42, 172, 6);
  forgeFrontArt.lineStyle(2.5, 0x482917).strokeRoundedRect(140, 46, 42, 172, 6);
  for (let py = 56; py < 210; py += 24) {
    forgeFrontArt.fillStyle(0x180d07, 0.7).fillRect(140, py, 42, 2);
    forgeFrontArt.fillStyle(0x3e2417, 0.45).fillRect(144, py + 4, 34, 16);
  }

  // Parede superior frontal e dintel de pedra (y: 46..104 â€” cobre a borda superior do fogo y: 90.6)
  forgeFrontArt.fillStyle(0x28170e, 1).fillRect(28, 46, 154, 58);
  forgeFrontArt.lineStyle(2.5, 0x482917).strokeRect(28, 46, 154, 58);

  // Moldura chanfrada do arco de pedra envolvente da fornalha
  forgeFrontArt.lineStyle(5, 0x3d2112, 1);
  forgeFrontArt.strokeRoundedRect(64, 98, 82, 100, 18);
  forgeFrontArt.lineStyle(6, 0x070302, 0.85);
  forgeFrontArt.strokeRoundedRect(64, 104, 82, 92, 18); // sombra profunda de recuo da cÃ¢mara
  forgeFrontArt.lineStyle(1.8, 0x160c07, 0.95);
  forgeFrontArt.strokeRoundedRect(64, 98, 82, 100, 18);

  // Brilho quente do fogo iluminando a aresta interna do arco
  forgeFrontArt.lineStyle(1.5, 0xff7043, 0.65);
  forgeFrontArt.strokeRoundedRect(66, 100, 78, 96, 16);

  // Pedra angular superior da abÃ³bada (Keystone central entalhada)
  forgeFrontArt.fillStyle(0x56321e, 1).fillRect(93, 86, 24, 18);
  forgeFrontArt.lineStyle(2, 0x1f1109).strokeRect(93, 86, 24, 18);
  forgeFrontArt.fillStyle(0x5e3822, 1).fillRect(96, 89, 18, 12); // entalhe rÃºstico de pedra esculpida (sem cruz)

  // Base da fornalha e grelha de ferro inferior (y: 194..218 â€” cobre a borda inferior do fogo y: 209.4)
  forgeFrontArt.fillStyle(0x1a0f08, 1).fillRect(28, 194, 154, 26);
  forgeFrontArt.lineStyle(2, 0x3d2315).strokeRect(28, 194, 154, 26);
  for (let gx = 68; gx < 144; gx += 10) {
    forgeFrontArt.fillStyle(0x454852, 1).fillRect(gx, 192, 3.5, 12);
    forgeFrontArt.fillStyle(0x8a909c, 0.8).fillRect(gx, 192, 1, 12);
  }

  // ChaminÃ© de ferro industrial subindo atÃ© o teto
  forgeFrontArt.fillStyle(0x181310, 1).fillRect(80, 0, 50, 48);
  forgeFrontArt.lineStyle(2, 0x36251a).strokeRect(80, 0, 50, 48);
  forgeFrontArt.fillStyle(0x261e16, 1).fillRect(78, 16, 54, 5).fillRect(78, 34, 54, 5); // anÃ©is de reforÃ§o
  for (let ry = 8; ry < 46; ry += 12) {
    forgeFrontArt.fillStyle(0x8a909c, 0.9).fillCircle(84, ry, 1.5).fillCircle(126, ry, 1.5);
  }

  // Ferramentas apoiadas na parede externa da fornalha (chÃ£o limpo)
  forgeFrontArt.lineStyle(2, 0x5a606e).lineBetween(22, 120, 18, 210); // atiÃ§ador longo
  forgeFrontArt.fillStyle(0x26272e, 1).fillRect(16, 205, 7, 7);
  forgeFrontArt.lineStyle(2, 0x3e2723).lineBetween(26, 130, 24, 212); // pÃ¡ de cinzas
  forgeFrontArt.fillStyle(0x455a64, 1).fillRect(22, 206, 9, 6);

  // Balde / tonel de tÃªmpera de Ã¡gua fria no chÃ£o
  forgeFrontArt.fillStyle(0x2b1810, 1).fillRoundedRect(8, 214, 20, 28, 3);
  forgeFrontArt.fillStyle(0x78909c, 1).fillRect(8, 220, 20, 2).fillRect(8, 234, 20, 2);
  forgeFrontArt.fillStyle(0x0288d1, 0.85).fillRoundedRect(10, 215, 16, 4, 1);

  // ---------------------------------------------------------------------------
  // 4. O MESTRE FERREIRO ANVILGAR ATRÃS DO BALCÃƒO (RENDERIZADO NO LAYER 4!)
  // ---------------------------------------------------------------------------
  // O ferreiro Ã© posicionado a y = 144 para que o seu barbÃ£o massivo e anÃ©is fiquem 100% visÃ­veis acima do balcÃ£o!
  const blacksmithSprite = scene.add.sprite(235, 144, 'blacksmith_master')
    .play('blacksmith_master')
    .setScale(2.3);

  scene.tweens.add({
    targets: blacksmithSprite,
    y: 140,
    duration: 1100,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // ---------------------------------------------------------------------------
  // 5. BALCÃO DE CARVALHO MACIÇO DA ARMOSA (RENDERIZADO NO LAYER 3: y: 194..248)
  // FRENTE DA FORNALHA 100% LIMPA E DESOBSTRUÍDA!
  // ---------------------------------------------------------------------------
  const counterArt = scene.add.graphics();
  // Viga maciça de carvalho envelhecido
  counterArt.fillStyle(0x2c180e, 1).fillRect(0, 194, 960, 54);
  // Chanfro polido no topo do balcão
  counterArt.fillStyle(0x5e331b, 1).fillRect(0, 194, 960, 6);
  counterArt.fillStyle(0x824927, 0.75).fillRect(0, 194, 960, 2); // friso reluzente
  counterArt.lineStyle(2, 0x160c07).strokeRect(0, 194, 960, 54);

  // Cintas de ferro forjado e junções verticais do balcão
  counterArt.fillStyle(0x180f08, 0.55);
  for (let sx = 80; sx < 960; sx += 140) {
    counterArt.fillRect(sx, 200, 2, 48);
  }

  // Friso metálico com rebites de latão ao longo do balcão
  counterArt.fillStyle(0xc5a059, 0.75).fillRect(0, 206, 960, 2);
  for (let rx = 25; rx < 960; rx += 70) {
    counterArt.fillStyle(0xffd700, 0.95).fillCircle(rx, 207, 2.5);
    counterArt.fillStyle(0x221105, 1).fillCircle(rx, 207, 1);
  }



  // C) Pilha de moedas de ouro sobre almofada de couro curtido à direita (x: 740..795)
  counterArt.fillStyle(0x4a2c1b, 0.95).fillRoundedRect(742, 188, 54, 8, 3);
  counterArt.lineStyle(1, 0x8d5c38).strokeRoundedRect(742, 188, 54, 8, 3);
  counterArt.fillStyle(0xffca28, 1).fillCircle(754, 187, 3.5).fillCircle(764, 187, 3.5).fillCircle(774, 187, 3.5);
  counterArt.fillStyle(0xffd54f, 1).fillCircle(759, 184, 3.5).fillCircle(769, 184, 3.5);

  // ---------------------------------------------------------------------------
  // 6. BALÃO DE DIÁLOGO DE PERGAMINHO (AO LADO DO FERREIRO: x: 315..630, y: 78..178)
  // ---------------------------------------------------------------------------
  const speechBubble = scene.add.graphics();
  const drawSpeechBubble = () => {
    speechBubble.clear();
    speechBubble.fillStyle(0xfbf4e6, 0.99).fillRoundedRect(315, 78, 318, 98, 14);
    speechBubble.lineStyle(2, 0x5c3722).strokeRoundedRect(315, 78, 318, 98, 14);
    speechBubble.lineStyle(1.2, 0xc5a059, 0.85).strokeRoundedRect(318, 81, 312, 92, 11);

    // Ponta do balão apontando diretamente para a boca do Ferreiro
    speechBubble.fillStyle(0xfbf4e6, 1).fillTriangle(315, 126, 290, 135, 315, 144);
    speechBubble.lineStyle(2, 0x5c3722).lineBetween(315, 126, 290, 135);
    speechBubble.lineStyle(2, 0x5c3722).lineBetween(290, 135, 315, 144);
  };
  drawSpeechBubble();

  const smithTitleTxt = scene.add.text(332, 90, 'MESTRE ANVILGAR (FERREIRO REAL)', parchmentTitleStyle('#4e2814', 12, 'bold'));
  const smithSpeechTxt = scene.add.text(332, 110, '“O fogo forja o aço! Escolha seu armamento para a batalha.”', {
    ...parchmentBodyStyle('#1f130b', 11, 'normal'),
    lineSpacing: 3.5,
    wordWrap: { width: 290, useAdvancedWrap: true }
  });

  // ---------------------------------------------------------------------------
  // 7. PLACA DE MADEIRA PENDURADA NO TOPO (TÍTULO DA FORJA REAL)
  // ---------------------------------------------------------------------------
  const signGfx = scene.add.graphics();
  signGfx.lineStyle(1.8, 0x455a64, 0.95);
  for (let cy = 0; cy < 22; cy += 5) {
    signGfx.strokeCircle(380, cy, 2.5);
    signGfx.strokeCircle(580, cy, 2.5);
  }
  signGfx.fillStyle(0x28160c, 0.98).fillRoundedRect(340, 14, 280, 44, 8);
  signGfx.lineStyle(2.5, 0x6e3d22).strokeRoundedRect(340, 14, 280, 44, 8);
  signGfx.lineStyle(1.2, 0xc5a059).strokeRoundedRect(344, 18, 272, 36, 6);
  signGfx.fillStyle(0xffca28, 1).fillCircle(352, 24, 2.5).fillCircle(608, 24, 2.5);
  signGfx.fillStyle(0xffca28, 1).fillCircle(352, 48, 2.5).fillCircle(608, 48, 2.5);

  const signTitle = scene.add.text(480, 36, ' A FORJA REAL ', {
    ...textStyle('#ffd740', 16, 'bold'),
    fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);

  // ---------------------------------------------------------------------------
  // 8. ABAS DE NAVEGAÇÃO ENTRE LOJAS NO TOPO ESQUERDO
  // ---------------------------------------------------------------------------
  const forgeTabBtn = scene.add.rectangle(85, 28, 110, 28, 0x8d5c38)
    .setStrokeStyle(1.5, 0xffca28);
  const forgeTabTxt = scene.add.text(85, 28, 'FORJA REAL', textStyle('#ffffff', 10.5, 'bold')).setOrigin(0.5);

  const mageTabBtn = scene.add.rectangle(205, 28, 110, 28, 0x22132e)
    .setStrokeStyle(2, 0x7c4dff)
    .setInteractive({ useHandCursor: true });
  const mageTabTxt = scene.add.text(205, 28, 'SANTUÁRIO', buttonTextStyle('#ce93d8', 10.5)).setOrigin(0.5);

  mageTabBtn.on('pointerover', () => {
    mageTabBtn.setFillStyle(0x3e1f57);
    mageTabTxt.setColor('#ffeb3b');
  });
  mageTabBtn.on('pointerout', () => {
    mageTabBtn.setFillStyle(0x22132e);
    mageTabTxt.setColor('#ce93d8');
  });
  mageTabBtn.on('pointerdown', () => {
    sound.playButtonClick();
    showMageShopMenu(scene);
  });

  // ---------------------------------------------------------------------------
  // 9. PAINEL DE OURO DO JOGADOR NO TOPO DIREITO & BOTÃO SAIR
  // ---------------------------------------------------------------------------
  const goldPouchGfx = scene.add.graphics();
  goldPouchGfx.fillStyle(0x1e150f, 0.96).fillRoundedRect(720, 16, 130, 32, 6);
  goldPouchGfx.lineStyle(2, 0xffca28).strokeRoundedRect(720, 16, 130, 32, 6);
  const coinSprite = scene.add.sprite(738, 32, 'gold_coin').play('gold_coin').setScale(1.2);
  const goldValTxt = scene.add.text(758, 32, `${getGold()}G`, textStyle('#ffd740', 13, 'bold')).setOrigin(0, 0.5);

  const closeQuickBtn = scene.add.image(905, 32, 'ui_btn_red_reg').setDisplaySize(74, 32)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(905, 32, 'SAIR', buttonTextStyle('#ffffff', 11)).setOrigin(0.5);

  closeQuickBtn.on('pointerover', () => { closeQuickBtn.setTexture('ui_btn_red_press'); closeQuickTxt.setColor('#ffeb3b'); });
  closeQuickBtn.on('pointerout', () => { closeQuickBtn.setTexture('ui_btn_red_reg'); closeQuickTxt.setColor('#ffffff'); });
  closeQuickBtn.on('pointerdown', () => { sound.playButtonClick(); exitSubMenu(scene); });

  // ---------------------------------------------------------------------------
  // 10. BANCADA DA OFICINA DE ARMAS: ESTEIRA DE COURO PESPONTADO PARA AS CARTAS
  // ---------------------------------------------------------------------------
  const leatherMatArt = scene.add.graphics();
  leatherMatArt.fillStyle(0x1c1109, 1).fillRect(0, 248, 960, 292);
  for (let wy = 250; wy < 540; wy += 38) {
    leatherMatArt.fillStyle(0x140c06, 0.7).fillRect(0, wy, 960, 2);
  }

  leatherMatArt.fillStyle(0x3a2114, 0.98).fillRoundedRect(16, 248, 928, 276, 8);
  leatherMatArt.fillStyle(0x4a2c1b, 0.5).fillRoundedRect(20, 252, 920, 268, 6);
  leatherMatArt.lineStyle(2, 0x8d5c38, 0.85).strokeRoundedRect(22, 254, 916, 264, 6);
  leatherMatArt.lineStyle(1, 0x24140b, 0.9).strokeRoundedRect(18, 250, 924, 272, 8);

  const matCorners = [
    [24, 256], [936, 256],
    [24, 516], [936, 516]
  ];
  matCorners.forEach(([cx, cy]) => {
    leatherMatArt.fillStyle(0x1a120c, 1).fillCircle(cx, cy, 6);
    leatherMatArt.fillStyle(0xc5a059, 1).fillCircle(cx, cy, 3);
    leatherMatArt.fillStyle(0xffd700, 1).fillCircle(cx, cy, 1.2);
  });

  menuContainer.add([
    forgeBackdropArt,
    doomFireSprite,
    forgeFrontArt,
    blacksmithSprite,
    counterArt,
    speechBubble,
    smithTitleTxt,
    smithSpeechTxt,
    signGfx,
    signTitle,
    forgeTabBtn,
    forgeTabTxt,
    mageTabBtn,
    mageTabTxt,
    goldPouchGfx,
    coinSprite,
    goldValTxt,
    closeQuickBtn,
    closeQuickTxt,
    leatherMatArt
  ]);

  // ---------------------------------------------------------------------------
  // 11. SHOWCASE DAS 5 ARMAS: CARTAS DE PERGAMINHO DE ARMEIRO COM TEXTOS CENTRALIZADOS
  // ---------------------------------------------------------------------------
  const upgrades = getUpgrades();
  const weaponKeys = ['bow', 'sword', 'shield', 'axe', 'firestaff'];
  const weaponArchetypes = {
    bow: 'DISPARO LONGO',
    sword: 'CORTE FRONTAL',
    shield: 'DEFESA SAGRADA',
    axe: 'GIRO 360 GRAUS',
    firestaff: 'IMPACTO EM ÁREA'
  };
  const weaponStyles = {
    bow: 'Disparos rápidos à distância (ideal para arqueiros e caçadores).',
    sword: 'Corte frontal potente em arco com alto knockback e rastro reluzente.',
    shield: 'Aura defensiva sagrada que bloqueia e reflete projéteis inimigos.',
    axe: 'Corte giratório duplo devastador que atinge múltiplos inimigos em 360 graus.',
    firestaff: 'Projéteis vulcânicos explosivos com dano em área e alta potência de impacto.'
  };
  const weaponDialogues = {
    bow: '“O Arco Real dos patrulheiros! Disparos rápidos e certeiros para abater alvos à distância.”',
    sword: '“A lendária Espada de Aço! Corte frontal amplo com rastro reluzente que afasta qualquer monstro.”',
    shield: '“O Escudo Sagrado da guarda real! Uma barreira celestial que repele e reflete projéteis inimigos!”',
    axe: '“O Machado de Batalha de dois gumes! Um giro devastador em 360 graus que tritura hordas inteiras!”',
    firestaff: '“O Cajado das Chamas vulcânicas! Conjurado no coração do fogo, causa estrondos e dano em área!”'
  };

  const cardW = 168;
  const cardH = 266;
  const startY = 250;
  const cardLefts = [28, 212, 396, 580, 764];

  weaponKeys.forEach((key, idx) => {
    const cfg = WEAPON_CATALOG[key];
    if (!cfg) return;
    const isUnlocked = Boolean(upgrades[key]?.unlocked);
    const isStarter = upgrades.starterWeapon === key;

    const left = cardLefts[idx];
    const cx = left + cardW / 2;

    const cardGfx = scene.add.graphics();
    const drawCard = (hover = false) => {
      cardGfx.clear();
      cardGfx.fillStyle(0x000000, 0.4).fillCircle(cx, startY + 5, 4);
      cardGfx.fillStyle(0xc5a059, 1).fillCircle(cx, startY + 4, 3);
      cardGfx.fillStyle(0x2a1a0e, 1).fillCircle(cx, startY + 4, 1.2);

      cardGfx.fillStyle(hover ? 0xfff8e7 : (isStarter ? 0xfff3cf : 0xf4ead2), 0.99)
        .fillRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
      cardGfx.lineStyle(2, hover ? 0xffca28 : (isStarter ? 0xffc107 : (isUnlocked ? 0x8d5524 : 0x5c4233)))
        .strokeRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
      cardGfx.lineStyle(1, hover ? 0xffd54f : (isStarter ? 0xffca28 : 0xb89569), 0.7)
        .strokeRoundedRect(left + 3, startY + 11, cardW - 6, cardH - 14, 6);

      const corners = [
        [left + 8, startY + 16],
        [left + cardW - 8, startY + 16],
        [left + 8, startY + cardH - 8],
        [left + cardW - 8, startY + cardH - 8]
      ];
      corners.forEach(([rx, ry]) => {
        cardGfx.fillStyle(0xc5a059, 0.85).fillCircle(rx, ry, 1.8);
      });

      const socketY = startY + 54;
      cardGfx.fillStyle(0x18120c, 1).fillCircle(cx, socketY, 26);
      cardGfx.lineStyle(2, hover ? 0xffeb3b : (isStarter ? 0xffd740 : (isUnlocked ? 0xc5a059 : 0x6e5233)))
        .strokeCircle(cx, socketY, 26);
      cardGfx.lineStyle(1, 0x8d5524, 0.6).strokeCircle(cx, socketY, 23);

      cardGfx.fillStyle(0xc5a059, 1);
      cardGfx.fillRect(cx - 1.5, socketY - 29, 3, 4);
      cardGfx.fillRect(cx - 1.5, socketY + 25, 3, 4);
      cardGfx.fillRect(cx - 29, socketY - 1.5, 4, 3);
      cardGfx.fillRect(cx + 25, socketY - 1.5, 4, 3);
    };
    drawCard(false);

    const icon = scene.add.image(cx, startY + 54, cfg.icon).setScale(1.4);
    if (!isUnlocked) icon.setTint(0x555555);

                const nameTxt = scene.add.text(cx, startY + 90, cfg.name, {
      ...parchmentTitleStyle(isStarter ? '#8c4e03' : (isUnlocked ? '#2c1b10' : '#5c4938'), 12, 'bold'),
      align: 'center',
      wordWrap: { width: cardW - 14, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(nameTxt, cardW - 14, 28, 9.5);

    const badgeBg = scene.add.rectangle(cx, startY + 114, cardW - 24, 18, isStarter ? 0x2e5c26 : (isUnlocked ? 0x3d2919 : 0x221a14))
      .setStrokeStyle(1, isStarter ? 0x76ff03 : (isUnlocked ? 0xc5a059 : 0x6e5233));
    const badgeTxt = scene.add.text(cx, startY + 114, weaponArchetypes[key] || 'ARMA REAL', {
      ...roundedTextStyle(isStarter ? '#b9f6ca' : (isUnlocked ? '#ffe082' : '#a8987b'), 8.5, 'bold'),
      align: 'center'
    }).setOrigin(0.5);
    fitTextToBox(badgeTxt, cardW - 28, 16, 8.5);

    const descStr = weaponStyles[key] || cfg.forgeLore || '';
    const descTxt = scene.add.text(cx, startY + 164, descStr, {
      ...roundedTextStyle('#3d2817', 10, 'normal'),
      align: 'center',
      lineSpacing: 2.5,
      wordWrap: { width: cardW - 20, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(descTxt, cardW - 18, 76, 8.5);

    const hitZoneH = cardH - 52;
    const cardHit = scene.add.rectangle(cx, startY + 8 + hitZoneH / 2, cardW, hitZoneH, 0x000000, 0)
      .setInteractive({ useHandCursor: true });

    cardHit.on('pointerover', () => {
      drawCard(true);
      smithSpeechTxt.setText(weaponDialogues[key] || '"Excelente escolha, guerreiro!"');
    });
    cardHit.on('pointerout', () => {
      drawCard(false);
      smithSpeechTxt.setText('"O fogo forja o ao! Escolha seu armamento para a batalha."');
    });

    const btnX = cx, btnY = startY + cardH - 24, btnW = cardW - 24, btnH = 34;

    if (!isUnlocked) {
      const cost = cfg.unlockCost || 25;
      const canAfford = getGold() >= cost;

      const actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, canAfford ? 0x246b3d : 0x3b2c22)
        .setStrokeStyle(2, canAfford ? 0xffca28 : 0x6e5846)
        .setInteractive({ useHandCursor: canAfford });

      const actionTxt = scene.add.text(btnX, btnY, 'FORJAR (' + cost + 'G)', {
        ...roundedTextStyle(canAfford ? '#ffffff' : '#8c7b6b', 11, 'bold'),
        align: 'center'
      }).setOrigin(0.5);
      fitTextToBox(actionTxt, btnW - 8, btnH - 6, 8.5);

      actionBtn.on('pointerover', () => {
        if (getGold() >= cost) {
          actionBtn.setFillStyle(0x2e854b);
          actionBtn.setStrokeStyle(2, 0xffd740);
          actionTxt.setColor('#ffeb3b');
        } else {
          actionBtn.setFillStyle(0x4a372b);
        }
      });
      actionBtn.on('pointerout', () => {
        const stillAfford = getGold() >= cost;
        actionBtn.setFillStyle(stillAfford ? 0x246b3d : 0x3b2c22);
        actionBtn.setStrokeStyle(2, stillAfford ? 0xffca28 : 0x6e5846);
        actionTxt.setColor(stillAfford ? '#ffffff' : '#8c7b6b');
      });

      actionBtn.on('pointerdown', () => {
        if (getGold() < cost) {
          sound.playShieldBlock();
          floatText(scene, btnX, btnY - 20, 'OURO INSUFICIENTE!', '#ff5252');
          return;
        }
        addGold(-cost);
        const curr = getUpgrades();
        curr[key].unlocked = true;
        curr[key].level = 1;
        curr.starterWeapon = key;
        saveUpgrades(curr);
        sound.playItemCollect();
        sound.playCoin();
        showBlacksmithMenu(scene);
        floatText(scene, btnX, btnY - 24, cfg.name + ' FORJADA!', '#ffd740');
      });

      menuContainer.add([cardGfx, cardHit, icon, nameTxt, badgeBg, badgeTxt, descTxt, actionBtn, actionTxt]);
    } else {
      const actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, isStarter ? 0x1f4724 : 0x543217)
        .setStrokeStyle(2, isStarter ? 0xffca28 : 0xc5a059)
        .setInteractive({ useHandCursor: !isStarter });

      const actionTxt = scene.add.text(btnX, btnY, isStarter ? 'EM USO' : 'EQUIPAR', {
        ...roundedTextStyle(isStarter ? '#ffd740' : '#ffffff', 11, 'bold'),
        align: 'center'
      }).setOrigin(0.5);
      fitTextToBox(actionTxt, btnW - 8, btnH - 6, 8.5);

      if (!isStarter) {
        actionBtn.on('pointerover', () => {
          actionBtn.setFillStyle(0x6d401e);
          actionTxt.setColor('#ffd740');
        });
        actionBtn.on('pointerout', () => {
          actionBtn.setFillStyle(0x543217);
          actionTxt.setColor('#ffffff');
        });
        actionBtn.on('pointerdown', () => {
          sound.playButtonClick();
          const curr = getUpgrades();
          curr.starterWeapon = key;
          saveUpgrades(curr);
          showBlacksmithMenu(scene);
          floatText(scene, cx, startY + 114, cfg.name + ' SER\u00c1 SUA INICIAL!', '#7fe7ff');
        });
      }

      menuContainer.add([cardGfx, cardHit, icon, nameTxt, badgeBg, badgeTxt, descTxt, actionBtn, actionTxt]);
    }
  });

  // ---------------------------------------------------------------------------
  // 12. TECLAS DE ATALHO ESC & TAB
  // ---------------------------------------------------------------------------
  const onEsc = (e) => {
    if (e.key === 'Escape') {
      scene.input.keyboard.off('keydown', onEsc);
      exitSubMenu(scene);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      scene.input.keyboard.off('keydown', onEsc);
      showMageShopMenu(scene);
    }
  };
  scene.input.keyboard.on('keydown', onEsc);
  menuContainer.on('destroy', () => scene.input.keyboard.off('keydown', onEsc));
}

// =============================================================================
// O SANTUÁRIO DO MAGO ALQUIMISTA (UPGRADES PERMANENTES DE STATUS)
// DESIGN: CENÁRIO COMPLETO COM ARQUIMAGO ATRÁS DO BALCÃO, ITENS DAS REFERÊNCIAS
// E MESA DE MADEIRA FORRADA COM TECIDO ROXO E ENTALHES EM DOURADO PARA AS CARTAS
// INSPIRAÇÃO: CUPHEAD SHOP (IMG 5), PROPS FANTASIA & ITENS ALQUÍMICOS (IMG 1, 2, 3, 4)
// =============================================================================
function showMageShopMenu(scene) {
  if (!scene) return;
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.gameplayStop();
  gameState = 'MENU';
  scene.time.paused = false;
  scene.time.timeScale = 1;
  scene.tweens.resumeAll();

  if (menuContainer) menuContainer.destroy();
  sound.startMenuBGM();

  menuContainer = scene.add.container(0, 0).setDepth(3000).setScrollFactor(0);
  menuContainer.isMainMenu = false;

  // ---------------------------------------------------------------------------
  // 1. CENÁRIO DE FUNDO: PAREDE DE ALVENARIA MÍSTICA, VIGAS EM ARCO (CUPHEAD) & PRATELEIRAS
  // ---------------------------------------------------------------------------
  const sanctumArt = scene.add.graphics();

  // Parede de alvenaria mística escura texturizada com blocos de pedra e argamassa
  sanctumArt.fillStyle(0x0c0817, 1).fillRect(0, 0, 960, 240);
  // Blocos de pedra intercalados com sutis variações de cor e linhas de rejunte
  for (let row = 0; row < 9; row++) {
    const by = row * 26;
    const offset = (row % 2 === 0) ? 0 : 45;
    sanctumArt.fillStyle(0x130d22, 0.45).fillRect(0, by, 960, 2);
    for (let bx = offset; bx < 960; bx += 90) {
      sanctumArt.fillStyle(0x130d22, 0.35).fillRect(bx, by, 2, 26);
      // Sutil textura interna no bloco de pedra
      if ((bx + row) % 3 === 0) {
        sanctumArt.fillStyle(0x19102b, 0.3).fillRect(bx + 6, by + 4, 38, 16);
      }
    }
  }

  // Vigas e arcos estruturais de teto no estilo Cuphead Shop (Imagem 5)
  sanctumArt.fillStyle(0x22130a, 1).fillRect(0, 0, 960, 14);
  sanctumArt.fillStyle(0x381f12, 1).fillRect(0, 12, 960, 4);
  // Arcos estruturais de madeira nas laterais
  sanctumArt.lineStyle(8, 0x24140c, 0.95);
  sanctumArt.strokeCircle(65, 0, 92);
  sanctumArt.strokeCircle(895, 0, 92);
  sanctumArt.lineStyle(2, 0x54321d, 0.85);
  sanctumArt.strokeCircle(65, 0, 94);
  sanctumArt.strokeCircle(895, 0, 94);

  // Lanterna de ferro fundido pendurada em corrente (Cuphead) - posicionada sem colidir
  sanctumArt.lineStyle(1.5, 0x1f1610, 0.9);
  for (let cy = 0; cy < 34; cy += 6) {
    sanctumArt.strokeCircle(345, cy, 2.5);
  }
  // Halo de iluminação quente âmbar que banha o Mago e o balcão
  sanctumArt.fillStyle(0xffa000, 0.12).fillCircle(345, 48, 56);
  sanctumArt.fillStyle(0xffd54f, 0.20).fillCircle(345, 48, 28);
  // Corpo da lanterna
  sanctumArt.fillStyle(0x1f1610, 1).fillRoundedRect(337, 36, 16, 22, 3);
  sanctumArt.fillStyle(0xffeb3b, 0.95).fillRoundedRect(339, 40, 12, 14, 2);
  sanctumArt.fillStyle(0xff6f00, 1).fillRect(344, 45, 3, 5); // chama
  sanctumArt.lineStyle(1, 0xc5a059, 0.85).strokeRoundedRect(337, 36, 16, 22, 3);

  // Runas arcanas gravadas no fundo da parede com aura de brilho sutil
  sanctumArt.lineStyle(1.5, 0x7c4dff, 0.3);
  sanctumArt.strokeCircle(235, 95, 24);
  sanctumArt.lineBetween(235, 71, 235, 119);
  sanctumArt.lineBetween(211, 95, 259, 95);

  // ---------------------------------------------------------------------------
  // PAREDE ESQUERDA: BOTICÁRIO COM PROPS DA IMAGEM 1 & 3 (SEM BAGUNÇA, POSIÇÃO LIMPA)
  // ---------------------------------------------------------------------------
  // Nicho em pedra entalhada (x: 20..160, y: 58..184)
  sanctumArt.fillStyle(0x140d1e, 0.95).fillRoundedRect(20, 58, 144, 126, 6);
  sanctumArt.lineStyle(2, 0x4a225e).strokeRoundedRect(20, 58, 144, 126, 6);
  sanctumArt.fillStyle(0x2d143c, 1).fillRect(24, 112, 136, 5); // prateleira superior
  sanctumArt.fillStyle(0x2d143c, 1).fillRect(24, 164, 136, 5); // prateleira inferior

  // Item 1 (Imagem 1): O FRASCO DE CONSERVA COM OLHO DE MONSTRO PRESERVADO
  sanctumArt.fillStyle(0x00e676, 0.2).fillCircle(45, 93, 14); // brilho etéreo
  sanctumArt.fillStyle(0x132918, 0.9).fillRoundedRect(34, 76, 22, 34, 4); // vidro
  sanctumArt.fillStyle(0x00e676, 0.75).fillRoundedRect(36, 82, 18, 26, 3); // líquido esmeralda
  sanctumArt.lineStyle(1.5, 0x81c784, 0.8).strokeRoundedRect(34, 76, 22, 34, 4);
  // Olho de monstro flutuando dentro
  sanctumArt.fillStyle(0xfff59d, 1).fillCircle(45, 95, 5.5); // esclera
  sanctumArt.fillStyle(0xd50000, 1).fillCircle(45, 95, 3); // íris vermelha
  sanctumArt.fillStyle(0x0a0505, 1).fillCircle(45, 95, 1.5); // pupila
  sanctumArt.fillStyle(0xffffff, 0.85).fillRect(37, 80, 2, 16); // reflexo do vidro
  sanctumArt.fillStyle(0x8d5524, 1).fillRect(38, 72, 14, 5); // rolha de cortiça

  // Item 2 (Imagem 1 & 3): CRÂNIO DE CRIATURA COM CHIFRES
  sanctumArt.fillStyle(0xd7ccc8, 0.95).fillCircle(92, 94, 8);
  sanctumArt.fillStyle(0xd7ccc8, 0.95).fillRect(87, 96, 10, 8);
  sanctumArt.fillStyle(0x24151a, 1).fillCircle(89, 93, 2).fillCircle(95, 93, 2); // órbitas
  sanctumArt.fillStyle(0x24151a, 1).fillRect(89, 101, 1.5, 3).fillRect(92, 101, 1.5, 3).fillRect(95, 101, 1.5, 3); // dentes
  sanctumArt.lineStyle(1.5, 0x8d6e63).lineBetween(86, 90, 78, 83); // chifre esquerdo
  sanctumArt.lineStyle(1.5, 0x8d6e63).lineBetween(98, 90, 106, 83); // chifre direito

  // Item 3 (Imagem 1): COGUMELO MÍSTICO LUMINOSO
  sanctumArt.fillStyle(0xffa726, 0.22).fillCircle(136, 92, 11);
  sanctumArt.fillStyle(0xefebe9, 1).fillRect(134, 93, 4, 14); // haste
  sanctumArt.fillStyle(0xd84315, 1).fillCircle(136, 90, 8); // chapéu
  sanctumArt.fillStyle(0xfff9c4, 1).fillCircle(133, 88, 1.2).fillCircle(138, 87, 1.2).fillCircle(136, 92, 1.2); // pintas

  // Prateleira inferior esquerda:
  // Item 4 (Imagem 1): ADAGA CERIMONIAL DE OBSIDIANA EM SUPORTE
  sanctumArt.fillStyle(0x3e2723, 1).fillRect(32, 156, 26, 4); // suporte
  sanctumArt.fillStyle(0x181822, 1).fillTriangle(34, 154, 54, 146, 38, 144); // lâmina
  sanctumArt.fillStyle(0x7c4dff, 0.7).fillRect(38, 147, 8, 1.5); // veio arcano
  sanctumArt.fillStyle(0x8d5524, 1).fillRect(28, 152, 6, 3); // empunhadura

  // Item 5 (Imagem 1): CHIFRE DE BEBER ORNAMENTADO COM ARO DOURADO
  sanctumArt.lineStyle(3, 0xf5ecd0).lineBetween(72, 154, 96, 144);
  sanctumArt.fillStyle(0xffca28, 1).fillCircle(72, 154, 3);
  sanctumArt.fillStyle(0xffca28, 1).fillCircle(96, 144, 2);

  // Item 6 (Imagem 1): COLAR DE DENTES & FEIXE DE PENAS MÍSTICAS PENDURADOS
  sanctumArt.lineStyle(1, 0x8d6e63, 0.8).lineBetween(112, 169, 126, 169);
  sanctumArt.fillStyle(0xf5ecd0, 1).fillTriangle(114, 169, 116, 177, 118, 169);
  sanctumArt.fillStyle(0xf5ecd0, 1).fillTriangle(120, 169, 122, 179, 124, 169);
  // Penas azuis e violetas
  sanctumArt.lineStyle(1.5, 0x00bcd4, 0.9).lineBetween(142, 166, 146, 180);
  sanctumArt.lineStyle(1.5, 0xab47bc, 0.9).lineBetween(140, 166, 141, 178);

  // ---------------------------------------------------------------------------
  // PAREDE DIREITA: BOTICÁRIO COM CRISTAIS, AMPULHETA E GRIMÓRIOS (IMG 2, 3, 4)
  // ---------------------------------------------------------------------------
  sanctumArt.fillStyle(0x140d1e, 0.96).fillRoundedRect(740, 58, 200, 126, 6);
  sanctumArt.lineStyle(2, 0x5a1888).strokeRoundedRect(740, 58, 200, 126, 6);
  sanctumArt.lineStyle(1, 0xba68c8, 0.45).strokeRoundedRect(743, 61, 194, 120, 5);
  sanctumArt.fillStyle(0x2d143c, 1).fillRect(746, 112, 188, 5); // prateleira 1
  sanctumArt.fillStyle(0x2d143c, 1).fillRect(746, 164, 188, 5); // prateleira 2

  // Item 7 (Imagem 2): AMPULHETA MÁGICA COM FUMAÇA VIOLETA
  sanctumArt.fillStyle(0xffca28, 1).fillRect(756, 78, 16, 2.5).fillRect(756, 99, 16, 2.5);
  sanctumArt.fillStyle(0xe1bee7, 0.5).fillTriangle(758, 81, 770, 81, 764, 89);
  sanctumArt.fillStyle(0xe1bee7, 0.5).fillTriangle(764, 89, 758, 97, 770, 97);
  sanctumArt.fillStyle(0xffd54f, 1).fillCircle(764, 94, 2.5); // areia
  // Névoa etérea violeta
  sanctumArt.fillStyle(0xba68c8, 0.35).fillCircle(764, 73, 3.5).fillCircle(762, 67, 4).fillCircle(766, 62, 3);

  // Item 8 (Imagem 2): CRISTAIS ELEMENTAIS (Ametista e Safira de Gelo)
  sanctumArt.fillStyle(0x9c27b0, 0.95).fillTriangle(784, 104, 789, 76, 794, 104);
  sanctumArt.fillStyle(0xe1bee7, 0.8).fillTriangle(787, 104, 789, 76, 791, 104);
  sanctumArt.fillStyle(0x00e5ff, 0.9).fillTriangle(800, 104, 804, 80, 808, 104);
  sanctumArt.fillStyle(0xffffff, 0.7).fillRect(803, 84, 1.5, 14);

  // Item 9 (Imagem 4): ÓCULOS DE ALQUIMISTA EM LATÃO COM LENTES CIANO
  sanctumArt.fillStyle(0xffca28, 1).fillCircle(828, 92, 6).fillCircle(842, 92, 6);
  sanctumArt.fillStyle(0x00e5ff, 0.85).fillCircle(828, 92, 4.5).fillCircle(842, 92, 4.5);
  sanctumArt.lineStyle(1.5, 0x8d5524).lineBetween(834, 92, 836, 92);
  sanctumArt.fillStyle(0xffffff, 0.9).fillRect(827, 90, 1.5, 1.5).fillRect(841, 90, 1.5, 1.5);

  // Item 10 (Imagem 4): FRASCOS DE POÇÃO ESFÉRICOS
  sanctumArt.fillStyle(0xe91e63, 0.9).fillCircle(865, 93, 7.5);
  sanctumArt.fillStyle(0x8d5524, 1).fillRect(863, 82, 4, 4);
  sanctumArt.fillStyle(0xffb300, 0.9).fillCircle(886, 93, 7);
  sanctumArt.fillStyle(0xffca28, 1).fillRect(884, 83, 4, 4);
  sanctumArt.fillStyle(0x7c4dff, 0.9).fillCircle(908, 93, 8);
  sanctumArt.fillStyle(0x37474f, 1).fillRect(906, 81, 4, 5);

  // Prateleira inferior direita:
  // Item 11 (Imagem 3): GRIMÓRIO NEGRO COM OLHO ARCANO CENTRAL E CANTOS DOURADOS
  sanctumArt.fillStyle(0x1d1222, 1).fillRect(756, 120, 28, 30);
  sanctumArt.lineStyle(1.5, 0xffca28).strokeRect(756, 120, 28, 30);
  sanctumArt.fillStyle(0x7c4dff, 1).fillCircle(770, 135, 4.5);
  sanctumArt.fillStyle(0x0a0505, 1).fillCircle(770, 135, 2);

  // Item 12 (Imagem 4): TOMOS ENCADERNADOS COM FECHO DE COURO
  sanctumArt.fillStyle(0x8d5524, 1).fillRect(794, 118, 12, 32);
  sanctumArt.fillStyle(0xffca28, 1).fillRect(792, 132, 16, 2.5); // fecho
  sanctumArt.fillStyle(0x006064, 1).fillRect(812, 120, 12, 30);
  sanctumArt.fillStyle(0xb71c1c, 1).fillRect(828, 122, 12, 28);

  // Item 13 (Imagem 2 & 4): PERGAMINHOS COM SELO DE CERA & CHAVES DE FERRO
  sanctumArt.fillStyle(0xf5ecd0, 1).fillRoundedRect(848, 124, 22, 8, 2);
  sanctumArt.fillStyle(0xd50000, 1).fillCircle(859, 128, 3); // sinete vermelho
  sanctumArt.fillStyle(0xf5ecd0, 1).fillRoundedRect(850, 135, 20, 8, 2);
  sanctumArt.fillStyle(0x00b0ff, 1).fillCircle(860, 139, 2.5); // sinete azul

  // Molho de chaves antigas
  sanctumArt.lineStyle(1.5, 0xb0bec5).strokeCircle(886, 126, 3.5);
  sanctumArt.lineStyle(1.5, 0xb0bec5).lineBetween(886, 130, 886, 144);
  sanctumArt.lineStyle(1, 0xb0bec5).lineBetween(886, 136, 889, 136).lineBetween(886, 140, 889, 140);



  // ---------------------------------------------------------------------------
  // 2. O ARQUIMAGO ALQUIMISTA ATRÁS DO BALCÃO (RENDERIZADO NO LAYER ATRÁS DO BALCÃO!)
  // ---------------------------------------------------------------------------
  // Posição: y: 168, scale: 2.3. A parte inferior do Mago (y: 194..227) fica oculta pelo balcão!
  const mageSprite = scene.add.sprite(235, 168, 'mage_master')
    .play('mage_master')
    .setScale(2.3);

  scene.tweens.add({
    targets: mageSprite,
    y: 164,
    duration: 1100,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // ---------------------------------------------------------------------------
  // 3. O BALCÃO DE MOGNO MÍSTICO (RENDERIZADO NA FRENTE DO MAGO: y: 194..248)
  // ---------------------------------------------------------------------------
  const counterArt = scene.add.graphics();
  // Viga maciça de mogno polido
  counterArt.fillStyle(0x2b1331, 1).fillRect(0, 194, 960, 54);
  // Brilho de madeira nobre polida na borda superior do balcão
  counterArt.fillStyle(0x562363, 1).fillRect(0, 194, 960, 6);
  counterArt.fillStyle(0x7b2f8e, 0.8).fillRect(0, 194, 960, 2); // friso reluzente
  counterArt.lineStyle(2, 0x15071a).strokeRect(0, 194, 960, 54);

  // Textura de madeira e junções verticais do balcão
  counterArt.fillStyle(0x1a091f, 0.5);
  for (let sx = 80; sx < 960; sx += 140) {
    counterArt.fillRect(sx, 200, 2, 48);
  }

  // Friso dourado com rebites de latão ao longo do balcão
  counterArt.fillStyle(0xc5a059, 0.7).fillRect(0, 206, 960, 2);
  for (let rx = 25; rx < 960; rx += 70) {
    counterArt.fillStyle(0xffd700, 0.95).fillCircle(rx, 207, 2.5);
    counterArt.fillStyle(0x221105, 1).fillCircle(rx, 207, 1);
  }

  // ITENS EM CIMA DO BALCÃO (DISPOSTOS SEM POLUIÇÃO):
  // A) GRIMÓRIO ABERTO COM RUNAS DOURADAS & MARCADOR DE SEDA (Imagem 4)
  counterArt.fillStyle(0x3e1818, 1).fillRect(74, 172, 54, 25);
  counterArt.fillStyle(0xf5ecd0, 1).fillRoundedRect(78, 170, 23, 23, 2);
  counterArt.fillStyle(0xf5ecd0, 1).fillRoundedRect(103, 170, 23, 23, 2);
  counterArt.fillStyle(0x7c4dff, 0.85);
  counterArt.fillRect(81, 174, 16, 2); counterArt.fillRect(81, 178, 14, 2); counterArt.fillRect(81, 182, 16, 2);
  counterArt.fillRect(106, 174, 16, 2); counterArt.fillRect(106, 178, 13, 2); counterArt.fillRect(106, 182, 15, 2);
  // Fita de seda vermelha caindo pela borda do balcão
  counterArt.lineStyle(2.5, 0xd50000, 0.95).lineBetween(102, 180, 102, 204);



  // ---------------------------------------------------------------------------
  // 4. BALÃO DE DIÁLOGO DE PERGAMINHO MÍSTICO (AO LADO DO MAGO: x: 315..635, y: 78..178)
  // ---------------------------------------------------------------------------
  const speechBubble = scene.add.graphics();
  const drawSpeechBubble = () => {
    speechBubble.clear();
    speechBubble.fillStyle(0xfbf4e6, 0.99).fillRoundedRect(315, 78, 318, 98, 14);
    speechBubble.lineStyle(2, 0x5e1d88).strokeRoundedRect(315, 78, 318, 98, 14);
    speechBubble.lineStyle(1.2, 0xc5a059, 0.85).strokeRoundedRect(318, 81, 312, 92, 11);

    // Ponta do balão apontando para o Mago
    speechBubble.fillStyle(0xfbf4e6, 1).fillTriangle(315, 126, 290, 135, 315, 144);
    speechBubble.lineStyle(2, 0x5e1d88).lineBetween(315, 126, 290, 135);
    speechBubble.lineStyle(2, 0x5e1d88).lineBetween(290, 135, 315, 144);
  };
  drawSpeechBubble();

  const mageTitleTxt = scene.add.text(332, 90, 'ARQUIMAGO ALQUIMISTA (MESTRE)', parchmentTitleStyle('#3a115c', 12, 'bold'));
  const mageSpeechTxt = scene.add.text(332, 110, '“Beba dos meus elixires e seu poder ecoará em cada batalha!”', {
    ...parchmentBodyStyle('#180d21', 11, 'normal'),
    lineSpacing: 4,
    wordWrap: { width: 288, useAdvancedWrap: true }
  });

  // ---------------------------------------------------------------------------
  // 5. MESA DE MADEIRA FORRADA COM TECIDO ROXO E ENTALHES DOURADOS (FUNDO DAS CARTAS)
  // ---------------------------------------------------------------------------
  const tableClothArt = scene.add.graphics();

  // A) BASE DA MESA DE MADEIRA MACIÇA (y: 246..540)
  tableClothArt.fillStyle(0x23120b, 1).fillRect(0, 246, 960, 10);
  tableClothArt.fillStyle(0x462415, 1).fillRect(0, 246, 960, 2.5);
  tableClothArt.fillStyle(0x1b0e08, 1).fillRect(0, 256, 960, 284);
  // Sulcos de pranchas horizontais de madeira
  [326, 398, 470, 534].forEach(py => {
    tableClothArt.fillStyle(0x100805, 0.7).fillRect(0, py, 960, 2);
    tableClothArt.fillStyle(0x311a10, 0.35).fillRect(0, py + 2, 960, 1);
  });
  // Textura sutil de veios
  tableClothArt.lineStyle(1, 0x2e1910, 0.4);
  for (let gx = 15; gx < 960; gx += 50) {
    tableClothArt.lineBetween(gx, 256, gx + 20, 540);
  }

  // Cantoneiras de latão nas bordas extremas da mesa
  tableClothArt.fillStyle(0x8d5524, 0.9).fillRect(0, 256, 12, 280).fillRect(948, 256, 12, 280);
  tableClothArt.lineStyle(1.5, 0xc5a059).strokeRect(0, 256, 12, 280).strokeRect(948, 256, 12, 280);
  for (let ry = 275; ry < 530; ry += 35) {
    tableClothArt.fillStyle(0xffd700, 1).fillCircle(6, ry, 2.5).fillCircle(954, ry, 2.5);
  }

  // B) TECIDO DE VELUDO ROXO REAL (x: 16..944, y: 248..532)
  tableClothArt.fillStyle(0x060303, 0.75).fillRoundedRect(16, 251, 928, 283, 14); // sombra
  tableClothArt.fillStyle(0x2d0b3e, 1).fillRoundedRect(16, 248, 928, 283, 14); // veludo
  tableClothArt.fillStyle(0x3e1055, 0.85).fillRoundedRect(18, 250, 924, 279, 12);
  tableClothArt.fillStyle(0x4f156d, 0.45).fillRoundedRect(22, 254, 916, 271, 10);

  // Dobras verticais acetinadas do veludo
  for (let vx = 50; vx < 920; vx += 90) {
    tableClothArt.fillStyle(0x6a1f91, 0.16).fillRoundedRect(vx, 254, 42, 267, 6);
  }

  // C) ENTALHES E DETALHES EM DOURADO
  // Moldura dupla bordada a ouro
  tableClothArt.lineStyle(2.5, 0xc5a059, 0.95).strokeRoundedRect(23, 255, 914, 269, 10);
  tableClothArt.lineStyle(1.2, 0xffd700, 0.8).strokeRoundedRect(27, 259, 906, 261, 8);

  // Pontos de pesponto dourado ao redor do tecido
  for (let px = 38; px < 920; px += 18) {
    tableClothArt.fillStyle(0xffecb3, 0.9).fillCircle(px, 259, 1.2).fillCircle(px, 518, 1.2);
  }
  for (let py = 269; py < 515; py += 18) {
    tableClothArt.fillStyle(0xffecb3, 0.9).fillCircle(27, py, 1.2).fillCircle(933, py, 1.2);
  }

  // Arabescos dourados nos 4 cantos
  const drawCornerArabesque = (ox, oy, flipX = 1, flipY = 1) => {
    tableClothArt.lineStyle(2, 0xffca28, 0.95);
    tableClothArt.lineBetween(ox, oy, ox + 22 * flipX, oy);
    tableClothArt.lineBetween(ox, oy, ox, oy + 22 * flipY);
    tableClothArt.lineBetween(ox + 4 * flipX, oy + 4 * flipY, ox + 18 * flipX, oy + 4 * flipY);
    tableClothArt.lineBetween(ox + 4 * flipX, oy + 4 * flipY, ox + 4 * flipX, oy + 18 * flipY);
    tableClothArt.fillStyle(0xffd700, 1).fillCircle(ox + 9 * flipX, oy + 9 * flipY, 3);
    tableClothArt.fillStyle(0xffffff, 0.9).fillCircle(ox + 9 * flipX, oy + 9 * flipY, 1.2);
  };
  drawCornerArabesque(33, 265, 1, 1);
  drawCornerArabesque(927, 265, -1, 1);
  drawCornerArabesque(33, 512, 1, -1);
  drawCornerArabesque(927, 512, -1, -1);

  // Divisores verticais de ouro exatamente nos pontos médios entre as cartas (x: 250, 480, 710)
  [204, 388, 572, 756].forEach(divX => {
    tableClothArt.lineStyle(1.5, 0xc5a059, 0.45).lineBetween(divX, 266, divX, 512);
    tableClothArt.fillStyle(0xffca28, 0.85).fillCircle(divX, 388, 3.5);
    tableClothArt.fillStyle(0xffd700, 1).fillCircle(divX, 388, 1.8);
    tableClothArt.lineStyle(1.5, 0xffca28, 0.8).lineBetween(divX - 6, 388, divX + 6, 388);
  });

  // Alveolos / Esteiras para as 5 cartas
  const cardW = 168;
  const cardH = 266;
  const startY = 250;
  const cardLefts = [28, 212, 396, 580, 764];

  cardLefts.forEach(cLeft => {
    tableClothArt.fillStyle(0x0e0414, 0.8).fillRoundedRect(cLeft - 3, startY + 6, cardW + 6, cardH - 4, 10);
    tableClothArt.lineStyle(1.5, 0xc5a059, 0.55).strokeRoundedRect(cLeft - 3, startY + 5, cardW + 6, cardH - 4, 10);
    const cCorners = [
      [cLeft - 1, startY + 7],
      [cLeft + cardW + 1, startY + 7],
      [cLeft - 1, startY + cardH + 1],
      [cLeft + cardW + 1, startY + cardH + 1]
    ];
    cCorners.forEach(([cxp, cyp]) => {
      tableClothArt.fillStyle(0xffca28, 0.95).fillCircle(cxp, cyp, 3);
      tableClothArt.fillStyle(0xffffff, 0.8).fillCircle(cxp, cyp, 1.2);
    });
  });

  // Itens decorativos sobre o veludo (Imagem 2)
  // Moedas de ouro e safira no canto esquerdo
  tableClothArt.fillStyle(0xffd700, 1).fillCircle(38, 512, 4.5).fillCircle(45, 515, 4).fillCircle(42, 509, 4.5);
  tableClothArt.lineStyle(1, 0xc5a059).strokeCircle(38, 512, 4.5).strokeCircle(45, 515, 4).strokeCircle(42, 509, 4.5);
  tableClothArt.fillStyle(0x00e5ff, 1).fillTriangle(52, 517, 57, 509, 62, 517);
  tableClothArt.fillStyle(0xffffff, 0.8).fillRect(56, 511, 2, 2);

  // Cristal de ametista no canto direito
  tableClothArt.fillStyle(0xba68c8, 1).fillTriangle(912, 517, 917, 506, 922, 517);
  tableClothArt.fillStyle(0xe1bee7, 0.8).fillTriangle(915, 517, 917, 506, 919, 517);

  // ---------------------------------------------------------------------------
  // 6. BARRA DE NAVEGAÇÃO SUPERIOR (REORGANIZADA, LIMPA E SEM COLISÕES)
  // ---------------------------------------------------------------------------
  // Abas de lojas à esquerda
  const forgeTabBtn = scene.add.rectangle(85, 24, 110, 28, 0x3d2215)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const forgeTabTxt = scene.add.text(85, 24, 'FORJA REAL', textStyle('#e0c088', 10.5)).setOrigin(0.5);

  forgeTabBtn.on('pointerover', () => {
    forgeTabBtn.setFillStyle(0x6e3d1b);
    forgeTabTxt.setColor('#ffeb3b');
  });
  forgeTabBtn.on('pointerout', () => {
    forgeTabBtn.setFillStyle(0x3d2215);
    forgeTabTxt.setColor('#e0c088');
  });
  forgeTabBtn.on('pointerdown', () => {
    sound.playButtonClick();
    showBlacksmithMenu(scene);
  });

  const mageTabBtn = scene.add.rectangle(205, 24, 110, 28, 0x6a1b9a)
    .setStrokeStyle(1.5, 0xffca28);
  const mageTabTxt = scene.add.text(205, 24, 'SANTUÁRIO', textStyle('#ffffff', 10.5)).setOrigin(0.5);

  // Placa central suspensa
  const signGfx = scene.add.graphics();
  signGfx.lineStyle(1.5, 0x7c4dff, 0.7);
  signGfx.lineBetween(390, 0, 390, 14);
  signGfx.lineBetween(570, 0, 570, 14);
  signGfx.fillStyle(0x1e0f2b, 0.96).fillRoundedRect(360, 10, 240, 30, 6);
  signGfx.lineStyle(2, 0x6a1b9a).strokeRoundedRect(360, 10, 240, 30, 6);
  signGfx.lineStyle(1, 0xba68c8, 0.6).strokeRoundedRect(363, 13, 234, 24, 5);
  const signTitle = scene.add.text(480, 25, ' SANTUÁRIO DO ARQUIMAGO ', {
    ...textStyle('#e1bee7', 12.5), fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);

  // Painel de ouro do jogador à direita
  const goldPouchGfx = scene.add.graphics();
  goldPouchGfx.fillStyle(0x1e150f, 0.96).fillRoundedRect(720, 10, 120, 30, 6);
  goldPouchGfx.lineStyle(2, 0xffca28).strokeRoundedRect(720, 10, 120, 30, 6);
  const coinSprite = scene.add.sprite(736, 25, 'gold_coin').play('gold_coin').setScale(1.1);
  const goldValTxt = scene.add.text(754, 25, `${getGold()}G`, textStyle('#ffd740', 13)).setOrigin(0, 0.5);

  // Botão Sair
  const closeQuickBtn = scene.add.image(895, 25, 'ui_btn_red_reg').setDisplaySize(70, 30)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(895, 25, 'SAIR', buttonTextStyle('#ffffff', 10.5)).setOrigin(0.5);
  closeQuickBtn.on('pointerover', () => { closeQuickBtn.setTexture('ui_btn_red_press'); closeQuickTxt.setColor('#ffeb3b'); });
  closeQuickBtn.on('pointerout', () => { closeQuickBtn.setTexture('ui_btn_red_reg'); closeQuickTxt.setColor('#ffffff'); });
  closeQuickBtn.on('pointerdown', () => { sound.playButtonClick(); exitSubMenu(scene); });

  // ADICIONA AS CAMADAS EM ORDEM PRECISA (MAGO ATRÁS DO BALCÃO):
  menuContainer.add([
    sanctumArt,
    mageSprite,        // LAYER 2: O Mago (oculto parcialmente pelo balcão!)
    counterArt,        // LAYER 3: O Balcão (renderizado na frente do Mago!)
    tableClothArt,     // LAYER 4: A Mesa e Tecido Roxo (abaixo do balcão)
    speechBubble, mageTitleTxt, mageSpeechTxt,
    signGfx, signTitle,
    forgeTabBtn, forgeTabTxt, mageTabBtn, mageTabTxt,
    goldPouchGfx, coinSprite, goldValTxt,
    closeQuickBtn, closeQuickTxt
  ]);

  // ---------------------------------------------------------------------------
  // 7. SHOWCASE DOS 4 STATUS: CARTAS INTERATIVAS COM BOTÕES DE COMPRA 100% FUNCIONAIS
  // ---------------------------------------------------------------------------
  const statusUpgrades = getStatusUpgrades();
  const statusKeys = ['maxHp', 'moveSpeed', 'magnet', 'wisdom', 'backpack'];

  const statusDialogues = {
    maxHp: '“O Elixir da Vitalidade do Titã! Cada gota fortalece seu coração para aguentar os golpes mais rudes.”',
    moveSpeed: '“A Poção de Agilidade das Brisas! Seus passos ficarão velozes como o vento entre as árvores.”',
    magnet: '“O Fluido Magnético Arcano! Atrai as moedas de prata e relíquias distantes diretamente até você.”',
    wisdom: '“A Essência da Sabedoria Ancestral! Amplia seu aprendizado acelerando a obtenção de novos níveis!”'
  };

  const mageItemNames = {
    maxHp: 'ELIXIR DE VIDA',
    moveSpeed: 'POÇÃO DE VELOCIDADE',
    magnet: 'ÍMÃ ARCANO',
    wisdom: 'SABEDORIA ARCANA'
  };

  statusKeys.forEach((key, idx) => {
    if (key === 'backpack') {
      renderMageBackpackCard(scene, idx, cardLefts[idx], cardW, cardH, startY, mageSpeechTxt);
      return;
    }
    const cfg = STATUS_CATALOG[key];
    if (!cfg) return;
    const maxLvl = cfg.maxLevel || 5;
    const lvl = Phaser.Math.Clamp(statusUpgrades[key] || 1, 1, maxLvl);
    const isMax = lvl >= maxLvl;

    const left = cardLefts[idx];
    const cx = left + cardW / 2;

    const cardGfx = scene.add.graphics();
    const drawCard = (hover = false) => {
      cardGfx.clear();
      // Selo de cera arcano no topo da carta
      cardGfx.fillStyle(0x000000, 0.45).fillCircle(cx, startY + 5, 5);
      cardGfx.fillStyle(isMax ? 0xffca28 : 0x7c4dff, 1).fillCircle(cx, startY + 4, 3.5);
      cardGfx.fillStyle(0xffffff, 0.85).fillCircle(cx, startY + 4, 1.2);

      // Corpo de pergaminho da carta (pergaminho nobre claro e nítido)
      cardGfx.fillStyle(hover ? 0xfffcf2 : (isMax ? 0xfff6dd : 0xf8efe0), 0.99)
        .fillRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
      // Moldura externa
      cardGfx.lineStyle(2, hover ? 0xffca28 : (isMax ? 0xffc107 : 0x6a1b9a))
        .strokeRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
      // Filete interno decorativo
      cardGfx.lineStyle(1, hover ? 0xffd54f : (isMax ? 0xffca28 : 0xba68c8), 0.65)
        .strokeRoundedRect(left + 3, startY + 11, cardW - 6, cardH - 14, 6);

      // Rebites nos 4 cantos da carta
      const corners = [
        [left + 8, startY + 16],
        [left + cardW - 8, startY + 16],
        [left + 8, startY + cardH - 8],
        [left + cardW - 8, startY + cardH - 8]
      ];
      corners.forEach(([rx, ry]) => {
        cardGfx.fillStyle(0x7c4dff, 0.85).fillCircle(rx, ry, 1.8);
      });

      // Alvéolo circular da Poção Mística
      const socketY = startY + 54;
      cardGfx.fillStyle(0x160f26, 1).fillCircle(cx, socketY, 26);
      cardGfx.lineStyle(2, hover ? 0xffeb3b : (isMax ? 0xffd740 : (cfg.potionColor || 0xba68c8)))
        .strokeCircle(cx, socketY, 26);
      cardGfx.lineStyle(1, 0x7c4dff, 0.6).strokeCircle(cx, socketY, 23);

      // 4 Entalhes arcanos nas bordas do círculo
      cardGfx.fillStyle(0xba68c8, 1);
      cardGfx.fillRect(cx - 1.5, socketY - 29, 3, 4);
      cardGfx.fillRect(cx - 1.5, socketY + 25, 3, 4);
      cardGfx.fillRect(cx - 29, socketY - 1.5, 4, 3);
      cardGfx.fillRect(cx + 25, socketY - 1.5, 4, 3);

      // Gemas / Pips de Nível (1 a 5) — CENTRALIZADOS COM PRECISÃO
      const pipW = 11;
      const pipGap = 5;
      const totalPipsW = maxLvl * pipW + (maxLvl - 1) * pipGap;
      const pipsStartX = cx - totalPipsW / 2;
      for (let p = 0; p < maxLvl; p++) {
        const px = pipsStartX + p * (pipW + pipGap);
        const activePip = p < lvl;
        cardGfx.fillStyle(activePip ? 0x00e5ff : 0x2e1c3b, 1).fillRect(px, startY + 114, pipW, 8);
        cardGfx.lineStyle(1, activePip ? 0xffffff : 0x5c3b70).strokeRect(px, startY + 114, pipW, 8);
      }
    };
    drawCard(false);

    // Ícone da Poção
    const icon = scene.add.image(cx, startY + 54, cfg.icon).setScale(1.4);

    // Nome do Item — APENAS O NOME DO ITEM (100% CENTRALIZADO E NÍTIDO)
    const itemTitle = mageItemNames[key] || cfg.shortName || cfg.name;
    const nameTxt = scene.add.text(cx, startY + 92, itemTitle, {
      ...parchmentTitleStyle(isMax ? '#8c4e03' : '#221226', 13, 'bold'),
      align: 'center'
    }).setOrigin(0.5);
    fitTextToBox(nameTxt, cardW - 16, 18, 9);

    // Badge / Nível Textual — 100% CENTRALIZADO COM FUNDO ARREDONDADO
    const lvlBadgeBg = scene.add.rectangle(cx, startY + 132, cardW - 38, 18, isMax ? 0xfff3e0 : 0xf3e5f5)
      .setStrokeStyle(1, isMax ? 0xffb74d : 0xce93d8);
    const lvlBadgeTxt = scene.add.text(cx, startY + 132, isMax ? 'PODER MÁXIMO' : `NÍVEL ${lvl} / ${maxLvl}`, {
      ...roundedTextStyle(isMax ? '#e65100' : '#4a148c', 9.5, 'bold'),
      align: 'center'
    }).setOrigin(0.5);

    // Descrições de Nível — FONTE ARREDONDADA & 100% CENTRALIZADA
    const levelDescs = cfg.levels || [];
    const descStr = isMax
      ? `Efeito Completo:\n${levelDescs[lvl - 1] || ''}`
      : `Atual: ${levelDescs[lvl - 1] || ''}\nPróximo: ${levelDescs[lvl] || ''}`;
    const descTxt = scene.add.text(cx, startY + 172, descStr, {
      ...roundedTextStyle('#2e1a10', 10, 'normal'),
      align: 'center',
      lineSpacing: 3.5,
      wordWrap: { width: cardW - 20, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(descTxt, cardW - 18, 62, 8.5);

    // ZONA INTERATIVA DA CARTA (Hover para diálogo do mago — delimitada acima do botão!)
    // Altura calculada para cobrir apenas o corpo da carta, SEM invadir a área do botão de compra!
    const hitZoneH = cardH - 52;
    const cardHit = scene.add.rectangle(cx, startY + 8 + hitZoneH / 2, cardW, hitZoneH, 0x000000, 0)
      .setInteractive({ useHandCursor: true });

    cardHit.on('pointerover', () => {
      drawCard(true);
      mageSpeechTxt.setText(statusDialogues[key] || '“Um elixir de grande sabedoria!”');
    });
    cardHit.on('pointerout', () => {
      drawCard(false);
      mageSpeechTxt.setText('“Beba dos meus elixires e seu poder ecoará em cada batalha!”');
    });

    // BOTÃO DE COMPRA / AÇÃO NO RODAPÉ — 100% CENTRALIZADO E INTERATIVO
    const btnX = cx;
    const btnY = startY + cardH - 24;
    const btnW = cardW - 24;
    const btnH = 34;
    let actionBtn, actionTxt;

    if (isMax) {
      actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, 0x2e2314)
        .setStrokeStyle(1.5, 0xffca28);
      actionTxt = scene.add.text(btnX, btnY, 'COMPLETO ', {
        ...roundedTextStyle('#ffd740', 11, 'bold'),
        align: 'center'
      }).setOrigin(0.5);
    } else {
      const cost = cfg.costs ? (cfg.costs[lvl - 1] || 15) : 15;
      const canAfford = getGold() >= cost;

      actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, canAfford ? 0x4a148c : 0x2e1c3b)
        .setStrokeStyle(2, canAfford ? 0xba68c8 : 0x4a2e5c)
        .setInteractive({ useHandCursor: canAfford });

      actionTxt = scene.add.text(btnX, btnY, `AUMENTAR (${cost}G)`, {
        ...roundedTextStyle(canAfford ? '#ffffff' : '#8c7b6b', 11, 'bold'),
        align: 'center'
      }).setOrigin(0.5);
      fitTextToBox(actionTxt, btnW - 8, btnH - 6, 8.5);

      // Feedback visual de hover do botão de compra
      actionBtn.on('pointerover', () => {
        if (getGold() >= cost) {
          actionBtn.setFillStyle(0x6a1b9a);
          actionBtn.setStrokeStyle(2, 0xffd740);
          actionTxt.setColor('#ffeb3b');
        } else {
          actionBtn.setFillStyle(0x3a2347);
        }
      });
      actionBtn.on('pointerout', () => {
        const stillAfford = getGold() >= cost;
        actionBtn.setFillStyle(stillAfford ? 0x4a148c : 0x2e1c3b);
        actionBtn.setStrokeStyle(2, stillAfford ? 0xba68c8 : 0x4a2e5c);
        actionTxt.setColor(stillAfford ? '#ffffff' : '#8c7b6b');
      });

      // Clique de compra desbugado com suporte direto ao ouro e persistência
      actionBtn.on('pointerdown', () => {
        const currentGold = getGold();
        if (currentGold < cost) {
          sound.playShieldBlock();
          floatText(scene, btnX, btnY - 20, 'OURO INSUFICIENTE!', '#ff5252');
          return;
        }

        // Debita o ouro corretamente
        addGold(-cost);

        // Atualiza e salva o status permanente
        const nextLvl = lvl + 1;
        const currentStats = getStatusUpgrades();
        currentStats[key] = nextLvl;
        saveStatusUpgrades(currentStats);

        // Feedback de áudio, floatText e atualização imediata da tela
        sound.playBuy();
        showMageShopMenu(scene);
        floatText(scene, btnX, btnY - 24, `${cfg.name} NÍVEL ${nextLvl}!`, '#7fe7ff');
      });
    }

    // Adiciona elementos da carta: actionBtn e actionTxt POR ÚLTIMO para garantir clique prioritário!
    menuContainer.add([cardGfx, cardHit, icon, nameTxt, lvlBadgeBg, lvlBadgeTxt, descTxt, actionBtn, actionTxt]);
  });

  // ---------------------------------------------------------------------------
  // 8. TECLAS DE ATALHO ESC & TAB
  // ---------------------------------------------------------------------------
  const onEsc = (e) => {
    if (e.key === 'Escape') {
      scene.input.keyboard.off('keydown', onEsc);
      exitSubMenu(scene);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      scene.input.keyboard.off('keydown', onEsc);
      showBlacksmithMenu(scene);
    }
  };
  scene.input.keyboard.on('keydown', onEsc);
  menuContainer.on('destroy', () => scene.input.keyboard.off('keydown', onEsc));
}


function renderMageBackpackCard(scene, idx, left, cardW, cardH, startY, speechTxt) {
  const cx = left + cardW / 2;
  const defeatedBoss = typeof hasDefeatedBossOnce === 'function' ? hasDefeatedBossOnce() : false;
  const unlocked = typeof hasBackpack === 'function' ? hasBackpack() : false;

  const cardGfx = scene.add.graphics();
  const drawCard = (hover = false) => {
    cardGfx.clear();
    cardGfx.fillStyle(0x000000, 0.45).fillCircle(cx, startY + 5, 5);
    cardGfx.fillStyle(unlocked ? 0xffca28 : (defeatedBoss ? 0x7c4dff : 0x4a148c), 1).fillCircle(cx, startY + 4, 3.5);

    cardGfx.fillStyle(hover ? 0xfffcf2 : (unlocked ? 0xfff6dd : (defeatedBoss ? 0xf8efe0 : 0x1f142b)), 0.99)
      .fillRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
    cardGfx.lineStyle(2, hover ? 0xffca28 : (unlocked ? 0xffc107 : (defeatedBoss ? 0x7c4dff : 0x4a2e5c)))
      .strokeRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
    cardGfx.lineStyle(1, hover ? 0xffd54f : (unlocked ? 0xffca28 : 0xba68c8), 0.65)
      .strokeRoundedRect(left + 3, startY + 11, cardW - 6, cardH - 14, 6);

    cardGfx.fillStyle(0x130a1c, 1).fillCircle(cx, startY + 54, 25);
    cardGfx.lineStyle(1.5, unlocked ? 0xffca28 : (defeatedBoss ? 0xba68c8 : 0x4a2e5c)).strokeCircle(cx, startY + 54, 25);
  };
  drawCard(false);

  const icon = scene.add.image(cx, startY + 54, 'ui_wood_slots').setDisplaySize(42, 42);
  const lockStr = unlocked ? 'OK' : (defeatedBoss ? 'MOCHILA' : 'BLOQ.');
  const lockIcon = scene.add.text(cx, startY + 54, lockStr, textStyle(unlocked ? '#ffd740' : (defeatedBoss ? '#ba68c8' : '#8d5524'), 9.5)).setOrigin(0.5);

  const titleTxt = scene.add.text(cx, startY + 92, 'MOCHILA DE ARMAS', {
    ...parchmentTitleStyle(unlocked ? '#8c4e03' : (defeatedBoss ? '#221226' : '#ce93d8'), 11.5, 'bold'),
    align: 'center'
  }).setOrigin(0.5);
  fitTextToBox(titleTxt, cardW - 16, 18, 9);

  const badgeBg = scene.add.rectangle(cx, startY + 132, cardW - 38, 18, unlocked ? 0xfff3e0 : (defeatedBoss ? 0xf3e5f5 : 0x2e1c3b))
    .setStrokeStyle(1, unlocked ? 0xffb74d : (defeatedBoss ? 0xce93d8 : 0x7c4dff));
  const badgeTxt = scene.add.text(cx, startY + 132, unlocked ? 'DESBLOQUEADO' : (defeatedBoss ? 'ITEM ESPECIAL' : 'BLOQUEADO'), {
    ...roundedTextStyle(unlocked ? '#e65100' : (defeatedBoss ? '#6a1b9a' : '#b388ff'), 9.5, 'bold'),
    align: 'center'
  }).setOrigin(0.5);

  const descString = unlocked
    ? 'Slot de reserva ativo em todas as suas expedicoes! Armas extras ficam congeladas.'
    : (defeatedBoss
        ? 'Adiciona 1 slot de reserva! A 2a arma fica congelada ate a arma da mao quebrar.'
        : 'Derrote o Golem Ancestral de Pedra para revelar esta reliquia especial!');

  const descTxt = scene.add.text(cx, startY + 174, descString, {
    ...parchmentBodyStyle(defeatedBoss ? '#321b38' : '#b388ff', 10, 'normal'),
    align: 'center',
    lineSpacing: 2,
    wordWrap: { width: cardW - 20, useAdvancedWrap: true }
  }).setOrigin(0.5);
  fitTextToBox(descTxt, cardW - 18, 62, 8);

  const cardHit = scene.add.rectangle(cx, startY + 8 + (cardH - 52) / 2, cardW, cardH - 52, 0x000000, 0)
    .setInteractive({ useHandCursor: true });
  cardHit.on('pointerover', () => {
    drawCard(true);
    speechTxt.setText(unlocked
      ? 'Sua Mochila de Armas esta ativa! Um verdadeiro mestre do combate nunca fica desarmado!'
      : (defeatedBoss
          ? 'A lendaria Mochila de Armas! Permite guardar uma arma congelada na reserva enquanto luta!'
          : 'Apenas guerreiros que domaram o Golem de Pedra sao dignos de tocar nesta reliquia!'));
  });
  cardHit.on('pointerout', () => {
    drawCard(false);
    speechTxt.setText('Beba dos meus elixires e seu poder ecoara em cada batalha!');
  });

  const btnX = cx;
  const btnY = startY + cardH - 24;
  const btnW = cardW - 24;
  const btnH = 34;

  let actionBtn, actionTxt;
  if (unlocked) {
    actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, 0x2e2314).setStrokeStyle(1.5, 0xffca28);
    actionTxt = scene.add.text(btnX, btnY, 'ADQUIRIDO', { ...roundedTextStyle('#ffd740', 11, 'bold'), align: 'center' }).setOrigin(0.5);
  } else if (!defeatedBoss) {
    actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, 0x1f142b).setStrokeStyle(1.5, 0x4a2e5c);
    actionTxt = scene.add.text(btnX, btnY, 'BLOQUEADO', { ...roundedTextStyle('#7a638a', 10, 'bold'), align: 'center' }).setOrigin(0.5);
  } else {
    const cost = 75; // GDD v1.0: Mochila de Armas custa 75 Ouros cravados
    const canAfford = getGold() >= cost;
    actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, canAfford ? 0x4a148c : 0x2e1c3b)
      .setStrokeStyle(2, canAfford ? 0xba68c8 : 0x4a2e5c)
      .setInteractive({ useHandCursor: canAfford });
    actionTxt = scene.add.text(btnX, btnY, 'COMPRAR (75G)', {
      ...roundedTextStyle(canAfford ? '#ffffff' : '#8c7b6b', 10.5, 'bold'),
      align: 'center'
    }).setOrigin(0.5);
    fitTextToBox(actionTxt, btnW - 8, btnH - 6, 8.5);

    actionBtn.on('pointerover', () => {
      if (getGold() >= cost) { actionBtn.setFillStyle(0x6a1b9a); actionTxt.setColor('#ffeb3b'); }
    });
    actionBtn.on('pointerout', () => {
      const still = getGold() >= cost;
      actionBtn.setFillStyle(still ? 0x4a148c : 0x2e1c3b);
      actionTxt.setColor(still ? '#ffffff' : '#8c7b6b');
    });
    actionBtn.on('pointerdown', () => {
      if (getGold() < cost) {
        sound.playShieldBlock();
        floatText(scene, btnX, btnY - 20, 'OURO INSUFICIENTE!', '#ff5252');
        return;
      }
      addGold(-cost);
      if (typeof setBackpack === 'function') setBackpack(true);
      sound.playBuy();
      showMageShopMenu(scene);
      floatText(scene, btnX, btnY - 24, 'MOCHILA DE ARMAS DESBLOQUEADA!', '#ffd740');
    });
  }

  menuContainer.add([cardGfx, cardHit, icon, lockIcon, titleTxt, badgeBg, badgeTxt, descTxt, actionBtn, actionTxt]);
}


// --- BUNDLE FILE: JS_Teste/src/ui/virtualJoystick.js ---
// =============================================================================
// SISTEMA DE CONTROLE POR JOYSTICK VIRTUAL MOBILE (FIXO E ANCORADO NA UI)
// =============================================================================

class VirtualJoystick {
  constructor(scene) {
    this.scene = scene;
    this.touchId = null;

    // Posição padrão fixa e ancorada na interface em 16:9 (canto inferior esquerdo)
    this.baseX = 110;
    this.baseY = 445;
    this.knobX = 110;
    this.knobY = 445;

    this.maxRadius = 54;
    this.deadzone = 6;

    // Vetor de direção normalizado (-1 a 1)
    this.vector = { x: 0, y: 0 };
    this.force = 0;
    this.active = false;

    // Detecção inicial de dispositivo móvel ou touch
    this.isMobile = this.detectMobile();
    this.visible = false;

    // Containers e gráficos do Phaser
    this.container = null;
    this.baseGraphics = null;
    this.lineGraphics = null;
    this.knobGraphics = null;

    this.init();
  }

  detectMobile() {
    // Respeita a preferência do usuário salva nas Configurações
    if (typeof getJoystickMode === 'function') {
      const mode = getJoystickMode();
      if (mode === 'enabled') return true;
      if (mode === 'disabled') return false;
    }

    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;

    // Detecção estrita de telefone ou aparelho móvel real (smartphone / tablet)
    const ua = (navigator.userAgent || navigator.vendor || window.opera || '').toLowerCase();
    const isMobileDevice = /android|iphone|ipod|blackberry|iemobile|opera mini|mobile/i.test(ua);
    const isIPad = /ipad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // No computador (desktop / laptop), o joystick fica SEMPRE desativado por padrão!
    // Para ativar no computador, o usuário precisa ligar nos ajustes.
    return Boolean(isMobileDevice || isIPad);
  }

  init() {
    if (!this.scene) return;

    // Container principal fixado na câmera (setScrollFactor 0) e sob profundidade de HUD
    this.container = this.scene.add.container(0, 0).setDepth(2400).setScrollFactor(0);
    this.container.setVisible(false);

    // Gráficos do Joystick: Linha de tensão, Base Rúnica Fixa e Pino Central Nobre
    this.lineGraphics = this.scene.add.graphics();
    this.baseGraphics = this.scene.add.graphics();
    this.knobGraphics = this.scene.add.graphics();

    this.container.add([this.lineGraphics, this.baseGraphics, this.knobGraphics]);

    this.drawBase(false);
    this.drawKnob(false);

    // Ouvintes de Toque com suporte a Multi-Touch
    this.setupTouchListeners();



    this.updateVisibility();
  }

  drawBase(isActive = false) {
    const g = this.baseGraphics;
    g.clear();
    const bx = this.baseX;
    const by = this.baseY;
    const r = this.maxRadius;

    // Sombra da base ancorada
    g.fillStyle(0x000000, 0.35);
    g.fillCircle(bx, by + 3, r + 4);

    // Placa de obsidiana rúnica com translucidez agradável
    g.fillStyle(0x120d09, isActive ? 0.62 : 0.42);
    g.fillCircle(bx, by, r);

    // Borda externa de ferro forjado
    g.lineStyle(3, 0x2b221a, isActive ? 0.88 : 0.65);
    g.strokeCircle(bx, by, r);

    // Moldura chanfrada em ouro envelhecido
    g.lineStyle(2, isActive ? 0xffca28 : 0xc5a059, isActive ? 0.95 : 0.70);
    g.strokeCircle(bx, by, r - 2);

    // Aro rúnico interno
    g.lineStyle(1, 0x8a6e30, isActive ? 0.50 : 0.28);
    g.strokeCircle(bx, by, r * 0.55);

    // 4 Marcadores Cardeais de Orientação (Norte, Sul, Leste, Oeste)
    const arrowSize = 6;
    const dist = r - 7;
    const arrowCol = isActive ? 0xffe082 : 0xc5a059;
    const arrowAlpha = isActive ? 0.85 : 0.52;
    g.fillStyle(arrowCol, arrowAlpha);

    g.fillTriangle(bx, by - dist, bx - arrowSize, by - dist + arrowSize, bx + arrowSize, by - dist + arrowSize);
    g.fillTriangle(bx, by + dist, bx - arrowSize, by + dist - arrowSize, bx + arrowSize, by + dist - arrowSize);
    g.fillTriangle(bx - dist, by, bx - dist + arrowSize, by - arrowSize, bx - dist + arrowSize, by + arrowSize);
    g.fillTriangle(bx + dist, by, bx + dist - arrowSize, by - arrowSize, bx + dist - arrowSize, by + arrowSize);

    // Mira cruzada central
    g.lineStyle(1, 0xc5a059, isActive ? 0.30 : 0.16);
    g.lineBetween(bx - 10, by, bx + 10, by);
    g.lineBetween(bx, by - 10, bx, by + 10);
  }

  drawKnob(isActive = false) {
    const g = this.knobGraphics;
    g.clear();
    const kx = this.knobX;
    const ky = this.knobY;
    const kr = 24;

    // Sombra do pino central
    g.fillStyle(0x000000, 0.45);
    g.fillCircle(kx, ky + 2, kr + 2);

    // Broquel de aço e madeira nobre
    g.fillStyle(isActive ? 0x3d3023 : 0x271e16, 0.95);
    g.fillCircle(kx, ky, kr);

    // Borda chanfrada de ouro nobre
    g.lineStyle(2.5, isActive ? 0xffca28 : 0xc5a059, 1);
    g.strokeCircle(kx, ky, kr);

    g.lineStyle(1, isActive ? 0xfff59d : 0x8a6e30, 0.85);
    g.strokeCircle(kx, ky, kr - 2);

    // Cabochão central de Rubi Real
    const gemR = 9;
    const gemColor = isActive ? 0xff3d00 : 0xd32f2f;
    g.fillStyle(gemColor, 1);
    g.fillCircle(kx, ky, gemR);

    // Reflexo especular branco
    g.fillStyle(0xffffff, isActive ? 0.95 : 0.70);
    g.fillCircle(kx - 3, ky - 3, 2.5);

    // Cruz rúnica de ouro
    g.lineStyle(1.5, isActive ? 0xffea00 : 0xffca28, 0.9);
    g.lineBetween(kx - 5, ky, kx + 5, ky);
    g.lineBetween(kx, ky - 5, kx, ky + 5);
  }

  drawConnectorLine() {
    const g = this.lineGraphics;
    g.clear();
    if (!this.active || this.force <= 0.05) return;

    // Arco de energia dourada conectando a base fixa ao pino
    g.lineStyle(2, 0xffca28, Math.min(0.7, this.force * 0.8));
    g.lineBetween(this.baseX, this.baseY, this.knobX, this.knobY);

    g.lineStyle(4, 0xff9800, Math.min(0.4, this.force * 0.45));
    g.lineBetween(this.baseX, this.baseY, this.knobX, this.knobY);
  }

  setupTouchListeners() {
    const scene = this.scene;

    this.onPointerDownHandler = (pointer) => {
      if (!this.visible || !this.detectMobile()) return;
      if (typeof gameState !== 'undefined' && gameState !== 'PLAYING') return;
      if (typeof pauseModal !== 'undefined' && pauseModal) return;
      if (typeof draftModal !== 'undefined' && draftModal) return;


      const px = pointer.x;
      const py = pointer.y;

      // Área de ativação: toque próximo à base fixa ancorada (raio de 115px ou canto inferior esquerdo)
      const distFromBase = Phaser.Math.Distance.Between(px, py, this.baseX, this.baseY);
      const inZone = distFromBase <= 115 || (px <= 250 && py >= 350);

      if (inZone && this.touchId === null) {
        this.touchId = pointer.id;
        this.active = true;

        this.processPointerMove(px, py);
        this.drawBase(true);
        this.drawKnob(true);
        this.drawConnectorLine();

        scene.tweens.killTweensOf(this.knobGraphics);
        this.knobGraphics.setScale(1.10);
      }
    };

    this.onPointerMoveHandler = (pointer) => {
      if (this.touchId !== null && pointer.id === this.touchId) {
        this.processPointerMove(pointer.x, pointer.y);
        this.drawKnob(true);
        this.drawConnectorLine();
      }
    };

    this.onPointerUpHandler = (pointer) => {
      if (this.touchId !== null && pointer.id === this.touchId) {
        this.touchId = null;
        this.active = false;
        this.vector.x = 0;
        this.vector.y = 0;
        this.force = 0;

        // Retorna o pino suavemente ao centro da base fixa
        scene.tweens.killTweensOf(this.knobGraphics);
        scene.tweens.add({
          targets: this,
          knobX: this.baseX,
          knobY: this.baseY,
          duration: 120,
          ease: 'Sine.easeOut',
          onUpdate: () => {
            this.drawKnob(false);
            this.drawConnectorLine();
          },
          onComplete: () => {
            this.knobGraphics.setScale(1.0);
            this.drawBase(false);
            this.drawKnob(false);
            this.drawConnectorLine();
          }
        });
      }
    };

    scene.input.on('pointerdown', this.onPointerDownHandler);
    scene.input.on('pointermove', this.onPointerMoveHandler);
    scene.input.on('pointerup', this.onPointerUpHandler);
    scene.input.on('pointerupoutside', this.onPointerUpHandler);
  }

  processPointerMove(px, py) {
    const dx = px - this.baseX;
    const dy = py - this.baseY;
    const dist = Math.hypot(dx, dy);

    if (dist < this.deadzone) {
      this.vector.x = 0;
      this.vector.y = 0;
      this.force = 0;
      this.knobX = this.baseX;
      this.knobY = this.baseY;
      return;
    }

    const clampedDist = Math.min(dist, this.maxRadius);
    const angle = Math.atan2(dy, dx);

    this.knobX = this.baseX + Math.cos(angle) * clampedDist;
    this.knobY = this.baseY + Math.sin(angle) * clampedDist;

    const normalizedPower = (clampedDist - this.deadzone) / (this.maxRadius - this.deadzone);
    this.force = Phaser.Math.Clamp(normalizedPower, 0, 1);
    this.vector.x = Math.cos(angle) * this.force;
    this.vector.y = Math.sin(angle) * this.force;
  }

  updateVisibility() {
    this.isMobile = this.detectMobile();
    const inGame = typeof gameState !== 'undefined' && gameState === 'PLAYING';
    const isPausedNow = typeof gameState !== 'undefined' && (gameState === 'PAUSED' || gameState === 'LEVEL_UP');
    const hasModal = (typeof pauseModal !== 'undefined' && !!pauseModal) || (typeof draftModal !== 'undefined' && !!draftModal);
    const shouldShow = this.isMobile && inGame && !isPausedNow && !hasModal;

    this.setVisible(shouldShow);
  }

  setVisible(show) {
    const isShow = Boolean(show);
    this.visible = isShow;
    if (this.container) {
      this.container.setVisible(isShow);
    }
  }

  update(dt) {
    this.updateVisibility();
  }

  getVector() {
    return this.active ? this.vector : { x: 0, y: 0 };
  }

  destroy() {
    if (this.scene && this.scene.input) {
      if (this.onPointerDownHandler) this.scene.input.off('pointerdown', this.onPointerDownHandler);
      if (this.onPointerMoveHandler) this.scene.input.off('pointermove', this.onPointerMoveHandler);
      if (this.onPointerUpHandler) {
        this.scene.input.off('pointerup', this.onPointerUpHandler);
        this.scene.input.off('pointerupoutside', this.onPointerUpHandler);
      }
    }
    if (this.container) {
      this.container.destroy();
      this.container = null;
    }
  }
}

// Suporte para módulo ou escopo global
if (typeof window !== 'undefined') {
  window.VirtualJoystick = VirtualJoystick;
}


// --- BUNDLE FILE: JS_Teste/src/main.js ---
// =============================================================================
// CICLO DE VIDA DO JOGO (PHASER 3): PRELOAD, CREATE, UPDATE & INICIALIZAÇÃO
// =============================================================================

// CENA: PRELOAD — cria todas as texturas com filtro NEAREST (zero serrilhado/esfarelado)
// =============================================================================
function preload() {
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.loadingStart();
  if (this.textures.exists('knight')) return;
  makeSheet(this, 'knight', 32, 32, 4, drawKnight);
  makeSheet(this, 'goblin', 28, 28, 2, drawGoblin);
  makeSheet(this, 'goblin_scout', 22, 22, 2, drawGoblinScout);
  makeSheet(this, 'warrior', 36, 36, 2, drawWarrior);
  makeSheet(this, 'elf', 32, 32, 2, drawElf);

  makeSheet(this, 'dark_mage', 32, 32, 2, drawDarkMage);
  makeSheet(this, 'mage_barrier', 16, 36, 2, drawMageBarrier);
  makeSheet(this, 'mini_golem', 28, 28, 3, drawMiniGolem);
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
  makeSheet(this, 'blacksmith_master', 48, 52, 4, drawBlacksmithMaster);
  makeSheet(this, 'mage_master', 48, 52, 4, drawMageMaster);
  makeSheet(this, 'tree', 48, 64, 1, drawTree);
  makeSheet(this, 'rock', 32, 26, 2, drawRock);
  makeSheet(this, 'shield_worn', 18, 22, 1, drawShieldIcon);
  makeSheet(this, 'sword_blade', 12, 40, 1, drawBlade);
  makeSheet(this, 'arrow_player', 26, 10, 1, arrowDrawer(C.blueBase, C.steelLight, C.manaLight));
  makeSheet(this, 'arrow_gold', 26, 10, 1, arrowDrawer(C.goldDark, C.goldHighlight, C.goldLight));
  makeSheet(this, 'arrow_elf', 26, 10, 1, arrowDrawer(0x00c853, 0x69f0ae, 0x00e676));
  makeSheet(this, 'arrow_enemy', 26, 10, 1, arrowDrawer(C.arcanaDeep, C.arcanaLight, C.manaLight));
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
  makeItem(this, 'scroll_multishot', 0xb388ff, drawScrollMultiShotIcon);
  makeItem(this, 'scroll_growth', 0x81c784, drawScrollGrowthIcon);
  makeItem(this, 'scroll_speed', 0xffb74d, drawScrollSpeedIcon);
    makeWorldTextures(this);
  makeSlashTexture(this);
  if (typeof makeUIButtonTextures === 'function') makeUIButtonTextures(this);
  if (typeof registerTinySwordsUI === 'function') registerTinySwordsUI(this);
  if (typeof registerSuperPixelVFX === 'function') registerSuperPixelVFX(this);

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
  if (typeof createVFXAnimations === 'function') createVFXAnimations(scene);
  Object.values(scene.textures.list).forEach(tex => { if (tex && tex.setFilter) tex.setFilter(Phaser.Textures.FilterMode.NEAREST); });

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
  worldSpeed = enemySpeed * 0.6;
  if (typeof window !== 'undefined') window.worldSpeed = worldSpeed;
  spawnDelay = 1300;
  buff = { type: null, timeLeft: 0, nextAttack: 0 };
  activeBoss = null;
  bossSpawned = false;
  bossDefeated = false;
  draftModal = null;
  entityIdCounter = 0;

  // Limpa todos os listeners de teclado e escala ao encerrar/reiniciar a cena
  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
    events.clear();
    scene.input.keyboard.removeAllListeners();
    scene.scale.off('enterfullscreen', onScaleChange);
    scene.scale.off('leavefullscreen', onScaleChange);
    scene.scale.off('resize', onScaleChange);
  });

  // Registra Listeners de Eventos Desacoplados (Observer Pattern)
  setupDecoupledEventListeners(scene);

  const onScaleChange = () => {
    scene.cameras.main.setViewport(0, 0, GAME_WIDTH, GAME_HEIGHT);
    scene.cameras.main.centerOn(GAME_WIDTH / 2, GAME_HEIGHT / 2);
    scene.cameras.main.setRoundPixels(true);
    updateFullscreenIcons(scene);
  };
  scene.scale.on('enterfullscreen', onScaleChange);
  scene.scale.on('leavefullscreen', onScaleChange);
  scene.scale.on('resize', onScaleChange);

  // Animações com cadência fluida — criadas uma única vez
  const animSpecs = {
    knight: { fps: 12, frames: 4 },
    goblin: { fps: 12, frames: 2 },
    goblin_scout: { fps: 14, frames: 2 },
    warrior: { fps: 8, frames: 2 },
    elf: { fps: 9, frames: 2 },

    dark_mage: { fps: 8, frames: 2 },
    mage_barrier: { fps: 6, frames: 2 },
    mini_golem: { fps: 10, frames: 2 },
    boss_golem: { fps: 6, frames: 2 },
    village_npc: { fps: 4, frames: 2 },
    gold_coin: { fps: 8, frames: 2 },
    silver_coin: { fps: 8, frames: 2 },
    xp_orb: { fps: 8, frames: 2 },
    blacksmith_master: { fps: 4, frames: 4 },
    mage_master: { fps: 4, frames: 4 }
  };
  Object.entries(animSpecs).forEach(([key, spec]) => {
    if (!scene.anims.exists(key)) {
      const frames = [];
      for (let i = 0; i < spec.frames; i++) frames.push({ key, frame: i });
      scene.anims.create({ key, frameRate: spec.fps, repeat: -1, frames });
    }
  });
  if (!scene.anims.exists('knight_run')) {
    const frames = [];
    for (let i = 0; i < 4; i++) frames.push({ key: 'knight', frame: i });
    scene.anims.create({ key: 'knight_run', frameRate: 12, repeat: -1, frames });
  }

  // Animações dos cortes de espada (9 quadros baseados na spritesheet enviada)
  if (!scene.anims.exists('slash_anim_lr')) {
    const frames = [];
    for (let i = 0; i < 9; i++) frames.push({ key: 'slash_lr', frame: i });
    scene.anims.create({ key: 'slash_anim_lr', frameRate: 48, repeat: 0, frames });
  }
  if (!scene.anims.exists('slash_anim_rl')) {
    const frames = [];
    for (let i = 0; i < 9; i++) frames.push({ key: 'slash_rl', frame: i });
    scene.anims.create({ key: 'slash_anim_rl', frameRate: 48, repeat: 0, frames });
  }

  // Camadas do cenário, de trás para frente (Proporção 16:9 Nativa 960x540)
  ground = scene.add.tileSprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 'ground').setDepth(-10);
  road = scene.add.tileSprite(GAME_WIDTH / 2, 285, GAME_WIDTH, 84, 'road').setDepth(-9);
  forestTop = scene.add.tileSprite(GAME_WIDTH / 2, 48, GAME_WIDTH, 96, 'forest_top').setDepth(-5);
  sunRays = scene.add.tileSprite(GAME_WIDTH / 2, 130, GAME_WIDTH, 260, 'sunbeam_rays').setDepth(-4).setAlpha(0.06).setBlendMode(Phaser.BlendModes.ADD);
  scene.tweens.add({ targets: sunRays, alpha: { from: 0.04, to: 0.08 }, duration: 4200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
  shadows = scene.add.graphics().setDepth(-2);
  forestBottom = scene.add.tileSprite(GAME_WIDTH / 2, 505, GAME_WIDTH, 70, 'forest_bottom').setDepth(1000);
  vignetteOverlay = scene.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'vignette_64bit').setDepth(1590).setScrollFactor(0);
  bossFilterOverlay = scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x240b06, 0).setDepth(1800);

  // Grupos físicos
  villageDecor = scene.physics.add.group({ immovable: true });
  coins = scene.physics.add.group();
  xpOrbs = scene.physics.add.group();
  enemies = scene.physics.add.group();
  obstacles = scene.physics.add.group({ immovable: true });
  items = scene.physics.add.group();
  playerArrows = scene.physics.add.group();
  enemyArrows = scene.physics.add.group();
  slashes = scene.physics.add.group();

  // Árvores nas bordas a partir de além dos portões da vila (expandido para 16:9)
  for (let x = 620; x <= 1180; x += 120) spawnTree(x);

  // Jogador (limitado à área entre as florestas na proporção 16:9)
  scene.physics.world.setBounds(0, 85, GAME_WIDTH, 390);
  player = scene.physics.add.sprite(180, 285, 'knight', 0);
  player.body.setSize(16, 22).setOffset(8, 8);
  player.setCollideWorldBounds(true);
  player.setVisible(false); // Oculto enquanto estiver nos menus
  shieldSprite = scene.add.image(0, 0, 'shield_worn').setVisible(false);
  shieldAura = scene.add.image(0, 0, 'shield_aura').setVisible(false).setAlpha(0.85);
  swordBlade = scene.add.image(0, 0, 'sword_blade').setOrigin(0.5, 0.82).setVisible(false).setDepth(10);

  // Controles Desktop & Suporte Multi-Touch Mobile
  cursors = scene.input.keyboard.createCursorKeys();
  keys = scene.input.keyboard.addKeys('W,A,S,D');

  // Suporte a multi-touch para até 4 toques simultâneos (joystick + ataque + botões)
  scene.input.addPointer(3);

  // Inicialização do Joystick Virtual Modular
  if (virtualJoystick) {
    virtualJoystick.destroy();
    virtualJoystick = null;
  }
  if (typeof VirtualJoystick === 'function') {
    virtualJoystick = new VirtualJoystick(scene);
  }

 

  pauseModal = null;
  enemyHpBars = scene.add.graphics().setDepth(2400);
  playerBuffBar = scene.add.graphics().setDepth(2500);

  // Tecla P: Atalho exclusivo de teclado para pausar/despausar o jogo (junto ao botão do HUD)
  scene.input.keyboard.on('keydown-P', () => handleEscPress(scene));

  // Tecla F: Atalho exclusivo de teclado para alternar Tela Cheia (junto ao botão do HUD)
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

  // Partículas para impactos gerais e mortes de monstros
  hitFx = scene.add.particles(0, 0, 'spark', {
    lifespan: 340, speed: { min: 70, max: 190 }, scale: { start: 1.4, end: 0 },
    tint: [0xffffff, 0xffca28, 0xff7043], emitting: false
  }).setDepth(1500);

  // Faíscas metálicas pontuais para acertos em armaduras, espadas e bloqueios
  sparksFx = scene.add.particles(0, 0, 'spark_shard', {
    lifespan: 220, speed: { min: 120, max: 280 }, scale: { start: 1.2, end: 0 },
    tint: [0xffffff, 0xfff59d, 0x80deea], emitting: false
  }).setDepth(1510);

  // Estilhaços físicos de madeira (árvores) e lascas de pedra (rochas) com gravidade
  debrisFx = scene.add.particles(0, 0, 'spark_shard', {
    lifespan: 420, speed: { min: 50, max: 150 }, gravityY: 260, scale: { start: 1.5, end: 0.2 },
    tint: [0x8d5c38, 0x5c3a1b, 0x78909c, 0x455a64], emitting: false
  }).setDepth(1490);

  // Partículas sagradas cintilantes para Escudo Sagrado e bênçãos divinas
  holyFx = scene.add.particles(0, 0, 'spark_star', {
    lifespan: 480, speed: { min: 45, max: 160 }, scale: { start: 1.6, end: 0 },
    tint: [0xffffff, 0x7fe7ff, 0xffe082, 0x80deea], emitting: false
  }).setDepth(1620);

  // Brasas e fagulhas sutis para o Cajado de Fogo e impactos (leves e legíveis)
  emberFx = scene.add.particles(0, 0, 'spark', {
    lifespan: 220, speed: { min: 40, max: 120 }, scale: { start: 0.95, end: 0 },
    tint: [0xffeb3b, 0xffca28, 0xff7043], emitting: false
  }).setDepth(1560);

  createHUD(scene);

  // Colisões do jogador (separação suave nos obstáculos + coleta de Relíquias, Moedas de Prata e Orbes de XP)
  scene.physics.add.overlap(player, obstacles, (p, o) => separatePlayerFromObstacle(p, o));
  scene.physics.add.overlap(player, enemies, (p, e) => playerHit(scene, e));
  scene.physics.add.overlap(player, enemyArrows, (p, a) => playerHit(scene, a));
  scene.physics.add.overlap(player, items, (p, i) => collectItem(scene, i));
  scene.physics.add.overlap(player, coins, (p, c) => collectCoin(scene, c));
  scene.physics.add.overlap(player, xpOrbs, (p, orb) => collectXpOrb(scene, orb));

  // Separação física entre Mini-Golems despertos (evita que se sobreponham na arena)
  scene.physics.add.collider(enemies, enemies, null, (e1, e2) => {
    return Boolean(
      e1 && e2 && e1.active && e2.active &&
      e1.enemyType === 'mini_golem' && e2.enemyType === 'mini_golem' &&
      e1.golemState === 'ACTIVE' && e2.golemState === 'ACTIVE'
    );
  });

  // Combate: suporta flechas, machados bumerangue perfurantes e bolas de fogo explosivas
  scene.physics.add.overlap(playerArrows, enemies, (a, e) => {
    if (e.x >= GAME_WIDTH || !a.active || !e.active) return;

    // Identificador único da entidade para rastreamento seguro de hits por projétil
    if (!e.entityId) e.entityId = ++entityIdCounter;

    // Regra do Machado/Martelo Bumerangue: no máximo 2 instâncias de dano (1 na ida e 1 na volta)
    if (a.isBoomerang) {
      if (!a.hitEnemiesOut) a.hitEnemiesOut = new Set();
      if (!a.hitEnemiesBack) a.hitEnemiesBack = new Set();

      const isReturning = Boolean(a.returning || (a.body && a.body.velocity.x < 0));
      if (!isReturning) {
        // Fase de IDA: apenas 1 hit neste inimigo
        if (a.hitEnemiesOut.has(e.entityId)) return;
        a.hitEnemiesOut.add(e.entityId);
      } else {
        // Fase de VOLTA: apenas 1 hit neste inimigo
        if (a.hitEnemiesBack.has(e.entityId)) return;
        a.hitEnemiesBack.add(e.entityId);
      }
    } else {
      // Projéteis perfurantes comuns (flechas com multi-shot/pierce): no máximo 1 hit por inimigo
      if (!a.hitEnemies) a.hitEnemies = new Set();
      if (a.hitEnemies.has(e.entityId)) return;
      a.hitEnemies.add(e.entityId);
    }

    // Mago Sombrio: Barreira Arcana Frontal (reflete projéteis durante a ativação periódica)
    if (e.enemyType === 'dark_mage') {
      if (e.isShieldActive) {
        reflectMageProjectile(scene, e, a);
        return;
      }
      // Fora de ativação periódica (em recarga/janela vulnerável): sofre dano normalmente!
    }

    if (a.isFireball) {
      const fx = a.x, fy = a.y, rad = a.blastRadius || 42, dmg = a.dmg || 1;
      a.destroy();
      explodeFireball(scene, fx, fy, rad, dmg);
      return;
    }

    damageEnemy(scene, e, a.dmg || 1);
    if (!e.isBoss && e.active && e.hp > 0 && a.knockback && a.knockback > 0) {
      applySmoothKnockback(scene, e, a.knockback, 130);
    }
    if (a.pierceCount && a.pierceCount > 1) {
      a.pierceCount--;
    } else if (!a.isBoomerang) {
      a.destroy();
    }
  });
  scene.physics.add.overlap(slashes, enemies, (s, e) => {
    // Trava monotônica (< s.slashId) evita que dois golpes simultâneos alternem dano a cada frame!
    if (e.x < GAME_WIDTH && s.active && e.active && (e.lastSlashId ?? 0) < s.slashId) {
      e.lastSlashId = s.slashId;
      damageEnemy(scene, e, s.dmg || 1);
      if (scene.anims && scene.anims.exists('anim_vfx_impact_sword')) {
        const imp = scene.add.sprite(e.x, e.y, 'vfx_impact_sword').play('anim_vfx_impact_sword').setDepth(e.y + 3).setScale(0.85);
        imp.once('animationcomplete', () => { if (imp && imp.active) imp.destroy(); });
      }
      // Regra 22: Espada aplica empurrão suave (knockback) exclusivo se o inimigo sobreviver
      if (!e.isBoss && e.active && e.hp > 0) {
        const kbDist = Math.min(34, s.knockback ? Math.round(s.knockback * 0.65) : 22);
        applySmoothKnockback(scene, e, kbDist, 130);
      }
      if (e.enemyType === 'warrior' || e.isBoss) {
        triggerHitstop(scene, 40);
      }
    }
  });
  scene.physics.add.overlap(slashes, enemyArrows, (s, a) => {
    sound.playShieldBlock();
    sparksFx.explode(7, a.x, a.y);
    a.destroy();
  });
  scene.physics.add.overlap(playerArrows, enemyArrows, (a, b) => {
    if (!a.active || !b.active) return;
    sound.playShieldBlock();
    sparksFx.explode(6, b.x, b.y);
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
    if (arrow.x > 0 && arrow.x < GAME_WIDTH && obs.x < GAME_WIDTH + 10) {
      if (obs.obstacleType === 'rock') {
        sound.playShieldBlock();
        sparksFx.explode(6, arrow.x, arrow.y);
        debrisFx.explode(6, arrow.x, arrow.y);
      } else {
        sound.playWoodHit();
        debrisFx.explode(7, arrow.x, arrow.y);
      }
    }
    arrow.destroy();
  };
  scene.physics.add.overlap(playerArrows, obstacles, hitObstacle);
  scene.physics.add.overlap(enemyArrows, obstacles, hitObstacle);

  if (typeof PlatformBridge !== 'undefined') PlatformBridge.loadingStop();

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
  if (virtualJoystick) virtualJoystick.update(dt);
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
  if (sunRays) sunRays.tilePositionX += scrollSpeed * 0.45 * dt;
  obstacles.setVelocityX(-scrollSpeed);
}

function updateGameplay(scene, time, dt) {
  // 1. Mundo rolando: chão, estrada e obstáculos andam JUNTOS (nada desliza)
  worldSpeed = enemySpeed * 0.6;
  if (typeof window !== 'undefined') window.worldSpeed = worldSpeed;
  ground.tilePositionX += worldSpeed * dt;
  road.tilePositionX += worldSpeed * dt;
  forestTop.tilePositionX += worldSpeed * 0.9 * dt;    // fundo: um pouco mais lento
  forestBottom.tilePositionX += worldSpeed * 1.3 * dt; // frente: mais rápido (parallax)
  if (sunRays) sunRays.tilePositionX += worldSpeed * 0.5 * dt;
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

  // 2. Cavaleiro: 8 direções e analógico 360° com pixels 100% nítidos (sem rotação sub-pixel setAngle que esfarela a Pixel Art!)
  const moveSpd = getPlayerMoveSpeed();
  let dirX = 0, dirY = 0;
  if (cursors.left.isDown || keys.A.isDown) dirX -= 1;
  if (cursors.right.isDown || keys.D.isDown) dirX += 1;
  if (cursors.up.isDown || keys.W.isDown) dirY -= 1;
  if (cursors.down.isDown || keys.S.isDown) dirY += 1;

  if (virtualJoystick && virtualJoystick.active) {
    const joyVec = virtualJoystick.getVector();
    dirX += joyVec.x;
    dirY += joyVec.y;
  }

  const inputLen = Math.hypot(dirX, dirY);
  if (inputLen > 0) {
    const clampedScale = Math.min(inputLen, 1.0) * moveSpd;
    player.setVelocity((dirX / inputLen) * clampedScale, (dirY / inputLen) * clampedScale);
  } else {
    player.setVelocity(0, 0);
  }
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
      if (e.barrierSprite && e.barrierSprite.active) {
        e.barrierSprite.setPosition(Math.round(e.x - 16), Math.round(e.y));
        e.barrierSprite.setDepth(e.depth + 5);
      }
      if (e.enemyType === 'goblin_scout') {
        if (e.phase === undefined) e.phase = Math.random() * 6.28;
        // Goblin Rastreador: avanco continuo para a esquerda em alta velocidade com perseguicao senoidal no eixo Y
        const scoutSpeed = (enemySpeed || 195) * (ENEMIES.goblin_scout ? ENEMIES.goblin_scout.speed : 1.48);
        let trackVy = 0;
        if (player && player.active) {
          const dy = player.y - e.y;
          trackVy = Phaser.Math.Clamp(dy * 1.6, -110, 110);
        }
        const osc = Math.sin(time * 0.008 + e.phase) * 80;
        e.setVelocityX(-scoutSpeed);
        e.setVelocityY(trackVy + osc);
        if (e.y < 135 && e.body && e.body.velocity.y < 0) e.setVelocityY(Math.abs(e.body.velocity.y));
        else if (e.y > 515 && e.body && e.body.velocity.y > 0) e.setVelocityY(-Math.abs(e.body.velocity.y));
      } else if (e.enemyType === 'goblin') {
        if (e.phase === undefined) e.phase = Math.random() * 6.28;
        // Goblin Comum: marcha continua para a esquerda com oscilacao senoidal em Y
        const gobSpeed = (enemySpeed || 195) * (ENEMIES.goblin ? ENEMIES.goblin.speed : 1.12);
        const zigZagSpeed = Math.sin(time * 0.007 + e.phase) * 75;
        e.setVelocityX(-gobSpeed);
        e.setVelocityY(zigZagSpeed);
        if (e.y < 135 && e.body && e.body.velocity.y < 0) e.setVelocityY(Math.abs(zigZagSpeed));
        else if (e.y > 515 && e.body && e.body.velocity.y > 0) e.setVelocityY(-Math.abs(zigZagSpeed));
      } else if (e.enemyType === 'mini_golem') {
        // Máquina de Estados Estrita do Mini-Golem: EJECTING, DORMANT, AWAKENING, ACTIVE
        if (e.golemState === 'EJECTING') {
          // Estado a: Ejetando em arco parabólico. Física desativada, velocidade zerada
          if (e.body && e.body.moves) {
            e.body.moves = false;
          }
          e.setVelocity(0, 0);
          e.setFrame(2);
        } else if (e.golemState === 'DORMANT' || e.golemState === 'AWAKENING') {
          // Estados b e c: Caído inerte ou em tremor pré-despertar. Sincronizado ao solo (-worldSpeed), Y zerado, NENHUMA perseguição
          if (e.body && !e.body.moves) {
            e.body.moves = true;
          }
          e.setVelocityX(-worldSpeed);
          e.setVelocityY(0);
          e.setFrame(2);
        } else if (e.golemState === 'ACTIVE') {
          // Estado d: Apenas quando comprovadamente ACTIVE pode perseguir o jogador
          if (e.body && !e.body.moves) {
            e.body.moves = true;
          }
          const slowSpeed = (ENEMIES.mini_golem && ENEMIES.mini_golem.speed) ? (enemySpeed * ENEMIES.mini_golem.speed) : 60;
          if (player && player.active) {
            scene.physics.moveToObject(e, player, slowSpeed);
          }
        }
      }
    }
  });

  // Rotação fluida dos Machados Bumerangue e rastros de projéteis
  playerArrows.getChildren().forEach(p => {
    if ((p.isBoomerang || p.texture.key === 'axe_proj') && p.active) {
      p.spinAccum = (p.spinAccum || 0) + 820 * dt;
      p.setAngle(Math.round(p.spinAccum / 30) * 30);
      if (p.isBoomerang && !p.returning && p.body && p.body.velocity.x < 0) {
        p.returning = true;
      }
    }
    // Rastro sutil e fluido da Bola de Fogo (baixa densidade para máxima legibilidade)
    if (p.isFireball && p.active && Math.random() < 0.16) {
      emberFx.emitParticleAt(p.x - 6, p.y + Phaser.Math.Between(-1, 1), 1);
    }
  });

  // Flechas élficas: rastro limpo e direto sem estrelas ofuscantes
  enemyArrows.getChildren().forEach(a => {
    if (a.texture.key === 'arrow_elf' && a.active && Math.random() < 0.08) {
      dustFx.emitParticleAt(a.x + 6, a.y, 1);
    }
  });

  if (activeBoss && activeBoss.active) {
    if (!activeBoss.isLunging) {
      activeBoss.setAngle(0);
      if (activeBoss.entering) {
        if (activeBoss.x <= 820) {
          activeBoss.x = 820;
          activeBoss.setVelocityX(0);
          activeBoss.entering = false;
          activeBoss.setVelocityY(68);
        }
      } else {
        activeBoss.x = 820;
        activeBoss.setVelocityX(0);
        if (activeBoss.y <= 150) activeBoss.setVelocityY(72);
        else if (activeBoss.y >= 430) activeBoss.setVelocityY(-72);
      }
    }
  }

  // 4. Sistema Modular de Armas: cadência e tempo processados pela estratégia ativa
  WeaponSystem.update(scene, time, dt);
  updateFirePools(scene, dt);
  updateItemHUD();

  // 5. Limpeza do que saiu da tela (.slice() evita pular itens ao destruir; Boss nunca some!)
  const cull = (group, isOut) => group.getChildren().slice().forEach(s => { if (isOut(s)) removeEntity(s); });
  cull(villageDecor, s => s.x < -300);
  cull(enemies, s => !s.isBoss && s.x < -60);
  cull(obstacles, s => s.x < -60);
  cull(items, s => s.x < -60);
  cull(coins, s => s.x < -60);
  cull(xpOrbs, s => s.x < -60);
  cull(playerArrows, s => s.x < -40 || s.x > GAME_WIDTH + 40 || s.y < 0 || s.y > GAME_HEIGHT + 20);
  cull(enemyArrows, s => s.x < -40 || s.x > GAME_WIDTH + 40 || s.y < 0 || s.y > GAME_HEIGHT + 20);
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

  // Direção do desvio: respeita a intenção do jogador (W/S/Joystick) ou desvia pelo lado mais próximo do centro
  const joyVec = (virtualJoystick && virtualJoystick.active) ? virtualJoystick.getVector() : { x: 0, y: 0 };
  let slideDir = (keys.W.isDown || cursors.up.isDown || joyVec.y < -0.25) ? -1 :
                 (keys.S.isDown || cursors.down.isDown || joyVec.y > 0.25) ? 1 :
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
  shadows.clear();
  enemyHpBars.clear();

  const shadeEntity = (s) => {
    if (!s || !s.active || !s.visible) return;
    const feet = Math.round(s.groundY ?? s.y + s.displayHeight / 2);
    s.setDepth(feet);

    // Determina dimensões da sombra proporcionalmente ao tamanho e tipo da criatura
    let pw = 22, ph = 7, cw = 15, ch = 4; // Penumbra e Core padrão (Cavaleiro)
    let pAlpha = 0.20, cAlpha = 0.34;
    let groundY = feet - 2;

    if (s.isBoss) {
      pw = 74; ph = 20; cw = 56; ch = 12;
      pAlpha = 0.26; cAlpha = 0.44;
      groundY = feet - 3;
    } else if (s.enemyType === 'goblin_scout') {
      pw = 14; ph = 5; cw = 10; ch = 3;
      pAlpha = 0.18; cAlpha = 0.30;
    } else if (s.enemyType === 'goblin') {
      pw = 18; ph = 6; cw = 12; ch = 3;
    } else if (s.enemyType === 'warrior') {
      pw = 26; ph = 8; cw = 18; ch = 5;
      cAlpha = 0.38;
    } else if (s.enemyType === 'elf') {
      pw = 18; ph = 6; cw = 12; ch = 4;
    } else if (s.enemyType === 'dark_mage') {
      // Mago sombrio flutua/levita suavemente no ar
      pw = 22; ph = 6; cw = 14; ch = 3;
      pAlpha = 0.16; cAlpha = 0.22;
      groundY = feet + 4;
    } else if (s.enemyType === 'mini_golem') {
      pw = 20; ph = 7; cw = 14; ch = 4;
      cAlpha = 0.36;
    } else if (s.obstacleType === 'rock') {
      pw = 32; ph = 10; cw = 24; ch = 6;
      pAlpha = 0.24; cAlpha = 0.40;
      groundY = feet - 3;
    } else if (s.obstacleType === 'tree' || s.isTree) {
      pw = 36; ph = 12; cw = 26; ch = 7;
      pAlpha = 0.24; cAlpha = 0.40;
      groundY = feet - 4;
    } else if (s.displayWidth && s.displayWidth >= 60) {
      pw = Math.round(s.displayWidth * 0.82);
      ph = 14; cw = Math.round(s.displayWidth * 0.62); ch = 8;
      pAlpha = 0.25; cAlpha = 0.38;
      groundY = feet - 4;
    } else if (s.isCoin || s.isXpOrb || s.isItem) {
      pw = 12; ph = 4; cw = 8; ch = 2;
      pAlpha = 0.18; cAlpha = 0.28;
      groundY = feet - 1;
    }

    const sx = Math.round(s.x);
    const altitude = Math.max(0, groundY - Math.round(s.y + (s.displayHeight ? s.displayHeight / 2 : 14)));
    const altFactor = Math.max(0.40, 1.0 - altitude * 0.015);
    const curPw = Math.round(pw * altFactor);
    const curPh = Math.round(ph * altFactor);
    const curCw = Math.round(cw * altFactor);
    const curCh = Math.round(ch * altFactor);

    // 1. Halo difuso ambiente 64-bit
    shadows.fillStyle(0x1e150c, pAlpha * 0.45 * altFactor).fillEllipse(sx, groundY, Math.round(curPw * 1.35), Math.round(curPh * 1.35));
    // 2. Penumbra suave intermediaria
    shadows.fillStyle(0x120c08, pAlpha * altFactor).fillEllipse(sx, groundY, curPw, curPh);
    // 3. Oclusao nitida de contato com o solo
    if (altitude < 16) {
      shadows.fillStyle(0x050302, cAlpha * 1.15).fillEllipse(sx, groundY, curCw, Math.max(2, Math.round(curCh * 0.85)));
    }
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
      if (e.shieldVisual && e.shieldVisual.active) {
        e.shieldVisual.setPosition(Math.round(e.x), Math.round(e.y));
      }
      // Renderização Universal de Barra de Vida Overhead em Pixel Art para TODOS os monstros da floresta
      if (e.active && !e.isBoss) {
        // Mini-Golems inconscientes/em repouso não exibem barra overhead até despertarem
        if (e.enemyType === 'mini_golem' && e.golemState !== 'ACTIVE') return;

        const bw = 24, bh = 5;
        const bx = Math.round(e.x - bw / 2 + 3);
        const by = Math.round(e.y - (e.displayHeight ? e.displayHeight / 2 : 14) - 9);

        // 1. Moldura chanfrada de ferro forjado com cantos chanfrados (16-bit bevelled plate)
        enemyHpBars.fillStyle(0x16120e, 0.95);
        enemyHpBars.fillRect(bx, by - 1, bw, 1);
        enemyHpBars.fillRect(bx, by + bh, bw, 1);
        enemyHpBars.fillRect(bx - 1, by, 1, bh);
        enemyHpBars.fillRect(bx + bw, by, 1, bh);
        // Cavidade escura de pedra obsidiana
        enemyHpBars.fillStyle(0x1a120c, 0.95).fillRect(bx, by, bw, bh);

        // 2. Sangue Drenante e Flash de Dano Interpolado (Ghost Bar em Ouro Âmbar)
        const pct = Phaser.Math.Clamp(e.hp / e.maxHp, 0, 1);
        e.displayHpPct = e.displayHpPct ?? pct;
        e.displayHpPct = Phaser.Math.Linear(e.displayHpPct, pct, 0.16);
        if (Math.abs(e.displayHpPct - pct) < 0.005) e.displayHpPct = pct;

        // Barra fantasma âmbar/dourada de dano sofrido
        if (e.displayHpPct > pct) {
          const ghostW = Math.round(bw * e.displayHpPct);
          enemyHpBars.fillStyle(0xffca28, 1).fillRect(bx, by, ghostW, bh);
        }

        // Barra de sangue carmesim viva com brilho no topo
        const bloodW = Math.round(bw * pct);
        if (bloodW > 0) {
          enemyHpBars.fillStyle(0xd32f2f, 1).fillRect(bx, by, bloodW, bh);
          enemyHpBars.fillStyle(0xff7961, 0.75).fillRect(bx, by, bloodW, 1);
          enemyHpBars.fillStyle(0x8e1b1b, 0.55).fillRect(bx, by + bh - 1, bloodW, 1);
        }

        // 3. Mini-Coração Rubi em Pixel Art (7x6 pixels) no fecho esquerdo da barra
        const hx = bx - 8;
        const hy = by - 1;
        // Contorno escuro chanfrado do mini-coração (0x140e0a)
        enemyHpBars.fillStyle(0x140e0a, 1);
        enemyHpBars.fillRect(hx + 1, hy, 2, 1);
        enemyHpBars.fillRect(hx + 4, hy, 2, 1);
        enemyHpBars.fillRect(hx, hy + 1, 7, 1);
        enemyHpBars.fillRect(hx, hy + 2, 7, 1);
        enemyHpBars.fillRect(hx + 1, hy + 3, 5, 1);
        enemyHpBars.fillRect(hx + 2, hy + 4, 3, 1);
        enemyHpBars.fillRect(hx + 3, hy + 5, 1, 1);

        // Preenchimento de Joia Rubi Esculpida
        if (e.hp > 0) {
          enemyHpBars.fillStyle(0xd83a3a, 1);
          enemyHpBars.fillRect(hx + 1, hy + 1, 2, 1);
          enemyHpBars.fillRect(hx + 4, hy + 1, 2, 1);
          enemyHpBars.fillRect(hx + 1, hy + 2, 4, 1);
          enemyHpBars.fillRect(hx + 2, hy + 3, 2, 1);

          // Sombra da faceta direita do rubi
          enemyHpBars.fillStyle(0x8e1b1b, 1);
          enemyHpBars.fillRect(hx + 5, hy + 2, 1, 1);
          enemyHpBars.fillRect(hx + 4, hy + 3, 1, 1);
          enemyHpBars.fillRect(hx + 3, hy + 4, 1, 1);

          // Brilho especular puro (glint de 1 sub-pixel)
          enemyHpBars.fillStyle(0xffffff, 1).fillRect(hx + 1, hy + 1, 1, 1);
          enemyHpBars.fillStyle(0xff8a80, 0.85).fillRect(hx + 2, hy + 1, 1, 1);
        } else {
          enemyHpBars.fillStyle(0x421d1d, 1);
          enemyHpBars.fillRect(hx + 1, hy + 1, 2, 1);
          enemyHpBars.fillRect(hx + 4, hy + 1, 2, 1);
          enemyHpBars.fillRect(hx + 1, hy + 2, 5, 1);
          enemyHpBars.fillRect(hx + 2, hy + 3, 3, 1);
          enemyHpBars.fillRect(hx + 3, hy + 4, 1, 1);
        }
      }
    });
  }

  playerArrows.getChildren().forEach(a => a.setDepth(a.y + 16));
  enemyArrows.getChildren().forEach(a => a.setDepth(a.y + 16));

  // Escudo, aura rúnica e lâmina da espada acompanham o cavaleiro (sempre voltados para a frente)
  if (player && player.visible) {
    shieldSprite.setPosition(Math.round(player.x + 12), Math.round(player.y + 4)).setDepth(player.depth + 1);
    if (shieldAura && shieldAura.visible) {
      shieldAura.setPosition(Math.round(player.x), Math.round(player.y)).setDepth(player.depth - 1);
      shieldAura.rotation += 0.02;
    }
    if (swordBlade) {
      if (buff && buff.type === 'sword') {
        swordBlade.setVisible(true);
        swordBlade.setPosition(Math.round(player.x + 10), Math.round(player.y + 2)).setDepth(player.depth + 2);
        const swordLvl = (typeof getWeaponLevel === 'function') ? getWeaponLevel('sword') : 1;
        const swordStats = (typeof getWeaponStats === 'function') ? getWeaponStats('sword', swordLvl) : { area: 1.0 };
        const bladeScale = Phaser.Math.Clamp(1.0 * (swordStats.area || 1.0), 1.0, 2.5);
        swordBlade.setScale(bladeScale);
        if (swordBlade.scene && !swordBlade.scene.tweens.isTweening(swordBlade)) {
          swordBlade.setAngle(25);
        }
      } else {
        swordBlade.setVisible(false);
      }
    }
  } else if (swordBlade) {
    swordBlade.setVisible(false);
  }
  slashes.getChildren().forEach(s => {
    s.setPosition(Math.round(player.x + (s.offsetX || 38)), Math.round(player.y + (s.offsetY || 0))).setDepth(player.depth + 3);
  });
}

// =============================================================================

// =============================================================================
// CONFIGURAÇÃO E INSTANCIAÇÃO DO PHASER
// =============================================================================
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
    expandParent: false,
    fullscreenTarget: 'game-container'
  },
  physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
  scene: { preload, create, update }
};

const game = new Phaser.Game(config);
window.game = game;



