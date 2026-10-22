
// --- BUNDLE FILE: JS_Teste/src/config/constants.js ---
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
      { badge: 'TEMPESTADE DE FLECHAS ★', desc: 'Cadência máxima supersônica! Uma torrente ininterrupta de flechas perfura as linhas inimigas!', toString() { return this.desc; } }
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
      { badge: 'COLOSSO SUPREMO ★', desc: 'Varredura colossal lendária! Uma muralha de lâmina titânica que aniquila todo o campo frontal!', toString() { return this.desc; } }
    ]
  },
  shield: {
    name: 'ESCUDO SAGRADO',
    category: 'BALUARTE SAGRADO',
    icon: 'item_shield',
    unlockedDefault: true,
    unlockCost: 0,
    maxLevel: Infinity,
    forgeLore: 'Égide abençoada. Reflete flechas em múltiplos ângulos e garante proteção prolongada.',
    levels: [
      { badge: 'ÉGIDE BÁSICA', desc: 'Envolve o herói em aura celestial por tempo equilibrado, refletindo flechas e detonando em choque se atingido.', toString() { return this.desc; } },
      { badge: 'ÉGIDE REFORÇADA', desc: 'Aumenta substancialmente o tempo de proteção ativa, mantendo a imunidade reativa por muito mais tempo.', toString() { return this.desc; } },
      { badge: 'ESPELHO DIVINO', desc: 'Duração prolongada vigorosa: reflete flechas em ângulos duplos e garante proteção duradoura na batalha.', toString() { return this.desc; } },
      { badge: 'BALUARTE REAL', desc: 'Fortaleza celestial duradoura, suportando a pressão do combate e detonando em choque sagrado ampliado.', toString() { return this.desc; } },
      { badge: 'ÉGIDE ETERNA ★', desc: 'Proteção celestial de duração colossal! O herói combate imperturbável envolto em graça divina suprema!', toString() { return this.desc; } }
    ]
  },
  axe: {
    name: 'MACHADO BUMERANGUE',
    category: 'FORÇA RÚNICA',
    icon: 'item_axe',
    unlockedDefault: false,
    unlockCost: 25,
    maxLevel: Infinity,
    forgeLore: 'Machado duplo pesado. Corta em arco de retorno com força de repulsão titânica.',
    levels: [
      { badge: 'GOLPE RÚNICO', desc: 'Lança machado duplo em arco circular de retorno, desferindo golpes de impacto na ida e na volta.', toString() { return this.desc; } },
      { badge: 'IMPACTO PESADO', desc: 'Aumenta consideravelmente a força de choque, arremessando monstros para trás na rota do bumerangue.', toString() { return this.desc; } },
      { badge: 'REPULSÃO SÍSMICA', desc: 'Ondas sísmicas violentas que estilhaçam o avanço inimigo e lançam tropas para a retaguarda.', toString() { return this.desc; } },
      { badge: 'CHOQUE ESMAGADOR', desc: 'Impacto rúnico massivo capaz de arremessar pelotões inteiros de volta para a floresta.', toString() { return this.desc; } },
      { badge: 'FÚRIA DOS TITÃS ★', desc: 'Força de repulsão titânica colossal! Monstros atingidos voam pelos ares com violência descomunal!', toString() { return this.desc; } }
    ]
  },
  firestaff: {
    name: 'CAJADO DE FOGO',
    category: 'CANALIZAÇÃO SOLAR',
    icon: 'item_firestaff',
    unlockedDefault: false,
    unlockCost: 45,
    maxLevel: Infinity,
    forgeLore: 'Cetro ardente. Lança orbes solares que explodem em ampla área e deixam poças de fogo contínuo.',
    levels: [
      { badge: 'ORBE SOLAR', desc: 'Dispara esfera ígnea concentrada que explode no impacto e cria uma poça de chamas ardentes no chão.', toString() { return this.desc; } },
      { badge: 'BRASA VIVA', desc: 'Amplia a área da explosão e o raio das chamas no solo, consumindo monstros com fogo contínuo.', toString() { return this.desc; } },
      { badge: 'LABAREDA INTENSA', desc: 'Detonação de fogo de grande alcance que queima ondas inteiras em uma barreira incandescente.', toString() { return this.desc; } },
      { badge: 'INFERNO VORAZ', desc: 'Explosão expansiva massiva que incendeia metade da estrada com chamas impiedosas.', toString() { return this.desc; } },
      { badge: 'CATACLISMO SOLAR ★', desc: 'Erupção solar titânica! O campo explode em um mar colossal de fogo e cinzas ardentes!', toString() { return this.desc; } }
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
      { badge: 'ONIPRESENÇA MÁXIMA ★', desc: 'O poder supremo do Disparo Múltiplo! Uma avalanche de lâminas e disparos varre tudo à frente!', toString() { return this.desc; } }
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
      { badge: 'DIMENSÃO SUPREMA ★', desc: 'Crescimento absoluto! Todas as armas e chamas operam em escala colossal titânica!', toString() { return this.desc; } }
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
      { badge: 'TEMPESTADE TEMPORAL ★', desc: 'Velocidade de ataque suprema! O herói maneja suas relíquias em uma velocidade sobrenatural!', toString() { return this.desc; } }
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
    costs: [25, 50, 90, 0],
    values: [3, 4, 5, 6],
    levels: [
      '3 Corações de Vida (Vigor inicial honrado do Cavaleiro).',
      '4 Corações de Vida (+1 Coração — 4 golpes suportados).',
      '5 Corações de Vida (Sangue de Dragão — 5 Corações).',
      '6 Corações de Vida (Imortalidade Rubra — 6 Corações supremos)!'
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
let hudItemIcon, hudItemName, hudItemTime, hudItemBar, hudHornIcon, hudFullscreenIcon;
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
let scrollLevels = { multishot: 0, growth: 0, attackspeed: 0 };
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
    const earnedGold = Math.floor(runSilver / 3);
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
      shield: { unlocked: true, level: 1 },
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
            level: 1
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
      return mode || 'auto';
    } catch {
      return 'auto';
    }
  },

  setJoystickMode(mode) {
    try {
      this.safeSet(STORAGE_JOYSTICK_KEY, mode);
    } catch {}
  }
};

// Aliases para compatibilidade total com o restante do jogo
function getHighScores() { return StorageManager.getHighScores(); }
function saveHighScore(name, score) { return StorageManager.saveHighScore(name, score); }
const getBestScore = () => StorageManager.getBestScore();
function getGold() { return StorageManager.getGold(); }
function setGold(total) { return StorageManager.setGold(total); }
function addGold(amount) { return StorageManager.addGold(amount); }
function consolidateSilverToGold() { return StorageManager.consolidateSilverToGold(); }
function getUpgrades() { return StorageManager.getUpgrades(); }
function saveUpgrades(up) { return StorageManager.saveUpgrades(up); }
function getWeaponLevel(type) { return StorageManager.getWeaponLevel(type); }
function getUnlockedWeaponPool() { return StorageManager.getUnlockedWeaponPool(); }
function getStatusUpgrades() { return StorageManager.getStatusUpgrades(); }
function saveStatusUpgrades(st) { return StorageManager.saveStatusUpgrades(st); }
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
    if (!s) return BUFF_TIME[type] || 6.0;
    return s.getDuration(getWeaponLevel(type), runBonusDuration, getWisdomBonusDuration());
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
  end() {
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
  },
  update(scene, time, dt) {
    if (!buff.type) return;
    buff.timeLeft -= dt;
    if (buff.timeLeft <= 0) {
      this.end();
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
  equipWeaponBuff(scene, item.lootType, true);
  removeEntity(item);
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
    graphics: scene.add.graphics().setDepth(-4) // Desenha no chão (abaixo dos personagens, acima da estrada)
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
    p.tickTimer -= dt;

    p.graphics.clear();
    const progress = p.elapsed / p.duration;
    const alpha = Math.max(0, 1 - progress);
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

    if (p.elapsed >= p.duration || p.x < -100) {
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
  events.on(GameEvents.ENEMY_KILLED, ({ x, y, enemyType }) => {
    hitFx.explode(10, x, y);
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
      ...textStyle('#fff8e1', 10),
      stroke: '#16120e',
      strokeThickness: 3
    }).setOrigin(0.5).setDepth(spec.y + 30);
  });

  // Anúncio nobre de partida da jornada
  floatText(scene, GAME_WIDTH / 2, 130, '★ SAINDO DA VILA DE VALE DOURADO ★', '#ffca28');
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
  runWeaponLevels = { bow: 1, sword: 1, shield: 1, axe: 1, firestaff: 1 };
  chosenScrolls = [];
  chosenScroll = null;
  scrollLevels = { multishot: 0, growth: 0, attackspeed: 0 };
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
  const up = getUpgrades();
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
      nextHordeTime = survivalTime + 30;
      triggerSpecialHorde(scene, hordeCycleCount);
    }
    if (survivalTime === 52 && !bossSpawned) {
      floatText(scene, GAME_WIDTH / 2, 120, '⚔ PREPARE-SE: ESTRONDO NAS PROFUNDEZAS! ⚔', '#ffca28');
    }
    if (survivalTime === BOSS_TRIGGER_TIME && !bossSpawned) {
      startBossFight(scene);
    }
  });

  // Director Dinâmico: ajusta velocidade e intervalo progressivamente ao longo da Run
  every(4000, () => {
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

    // Habilidade Periódica: ergue a Barreira Arcana frontal após 1.0s de entrada em campo
    enemy.shieldCooldownTimer = scene.time.delayedCall(1000, () => {
      if (!enemy.active || gameState !== 'PLAYING') return;
      activateMageBarrier(scene, enemy);
    });
  }

  return enemy;
}

// =============================================================================
// PRIMEIRA BOSS FIGHT: GOLEM ANCESTRAL DE PEDRA (AOS 120 SEGUNDOS)
// =============================================================================

function elfShoot(scene, elf) {
  if (!elf.active || !player || !player.active || gameState !== 'PLAYING') return;
  if (elf.x > (GAME_WIDTH - 10) || elf.x < player.x + 25) return;

  elf.setTint(0xa7ffeb);
  if (sparksFx) sparksFx.explode(4, elf.x - 10, elf.y);

  scene.time.delayedCall(280, () => {
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
  const barrier = scene.add.sprite(mage.x - 16, mage.y, 'mage_barrier', 0)
    .setDepth(mage.depth + 5);
  barrier.play('mage_barrier');
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

  floatText(scene, GAME_WIDTH / 2, 134, '⚠ CHEFÃO: GOLEM ANCESTRAL DE PEDRA! ⚠', '#ff5252');

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

  floatText(scene, GAME_WIDTH / 2, 150, '★ GOLEM DERROTADO! CHUVA DE PRATA & XP! ★', '#ffca28');
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
const textStyle = (color, size = 17, weight = 'bold') => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: '"Cinzel", "Georgia", "Palatino Linotype", serif',
  stroke: '#0e0b08',
  strokeThickness: Math.max(2, Math.round(size * 0.16))
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
// HUD MEDIEVAL EM PIXEL ART 16:9 (BARRA DE XP, CORAÇÕES, PRATA, RELÍQUIA & CHEFÃO)
// -----------------------------------------------------------------------------
function createHUD(scene) {
  hudContainer = scene.add.container(0, 0).setDepth(2000).setScrollFactor(0).setVisible(false);

  // 1. PAINEL DE GLÓRIA & VIDA (Tempo + Corações) — Esquerda (x: 10..164)
  const gloryBg = scene.add.graphics();
  drawMedievalHudFrame(gloryBg, 10, 10, 154, 48, false);
  const hourglass = scene.add.image(24, 34, 'hud_hourglass');
  const gloryLabel = scene.add.text(38, 14, 'GLÓRIA & VIDA', textStyle('#a89260', 9));
  hudGloryText = scene.add.text(38, 25, '0s', textStyle('#f5e6c8', 14));
  hudContainer.add([gloryBg, hourglass, gloryLabel, hudGloryText]);

  hudHearts = [];
  for (let i = 0; i < 6; i++) {
    const heart = scene.add.image(74 + i * 14, 39, 'hud_heart', 0).setScale(1.0);
    hudHearts.push(heart);
    hudContainer.add(heart);
  }
  updateHeartsHUD();

  // 2. PAINEL DE PRATA DA PARTIDA — Centro-Esquerda (x: 170..274)
  const silverBg = scene.add.graphics();
  drawMedievalHudFrame(silverBg, 170, 10, 104, 48, false);
  const silverIcon = scene.add.image(188, 34, 'silver_coin', 0).setScale(1.2);
  const silverLabel = scene.add.text(202, 16, 'PRATA', textStyle('#b0bec5', 10));
  hudSilverText = scene.add.text(202, 28, '0', textStyle('#e0f7fa', 18));
  hudContainer.add([silverBg, silverIcon, silverLabel, hudSilverText]);

  // 3. PAINEL DE RELÍQUIA / EQUIPAMENTO ATIVO — Centro (x: 280..514)
  const itemBg = scene.add.graphics();
  drawMedievalHudFrame(itemBg, 280, 10, 234, 48, false);

  // Alvéolo circular / medalhão medieval de relíquia (UI Kit)
  const slotFrame = scene.add.graphics();
  slotFrame.fillStyle(0x120d0a, 1).fillRoundedRect(288, 16, 36, 36, 6);
  slotFrame.lineStyle(1.5, 0xc5a059).strokeRoundedRect(288, 16, 36, 36, 6);
  slotFrame.fillStyle(0xc5a059, 1).fillCircle(291, 19, 1.5).fillCircle(321, 19, 1.5).fillCircle(291, 49, 1.5).fillCircle(321, 49, 1.5);

  hudItemIcon = scene.add.image(306, 34, 'item_bow').setVisible(false);
  hudItemName = scene.add.text(330, 16, 'SEM RELÍQUIA', textStyle('#7a7265', 11));
  hudItemBar = scene.add.graphics();
  hudItemTime = scene.add.text(450, 35.5, '', textStyle('#ffca28', 11)).setOrigin(0.5, 0.5);
  const badge1 = scene.add.image(478, 27, 'scroll_multishot').setScale(0.85).setVisible(false);
  const txt1 = scene.add.text(478, 43, '', textStyle('#b388ff', 8.5)).setOrigin(0.5, 0.5).setVisible(false);
  const badge2 = scene.add.image(501, 27, 'scroll_growth').setScale(0.85).setVisible(false);
  const txt2 = scene.add.text(501, 43, '', textStyle('#b388ff', 8.5)).setOrigin(0.5, 0.5).setVisible(false);
  hudScrollBadges = [badge1, badge2];
  hudScrollTexts = [txt1, txt2];
  hudScrollBadge = badge1;
  hudScrollText = txt1;
  hudContainer.add([itemBg, slotFrame, hudItemIcon, hudItemName, hudItemBar, hudItemTime, badge1, txt1, badge2, txt2]);

  // 4. PAINEL DE RECORDE DO REINO (x: 520..628)
  const bestBg = scene.add.graphics();
  drawMedievalHudFrame(bestBg, 520, 10, 108, 48, false);
  const crown = scene.add.image(536, 34, 'hud_crown');
  const bestLabel = scene.add.text(552, 16, 'RECORDE', textStyle('#a89260', 10));
  hudBestText = scene.add.text(552, 28, `${getBestScore()}s`, textStyle('#ffca28', 17));
  hudContainer.add([bestBg, crown, bestLabel, hudBestText]);

  // 5. BOTÃO DE SOM RÁPIDO [M] — Superior Direito (x: 844..892 em 16:9)
  const soundBtnBg = scene.add.graphics();
  const drawSoundBtn = (hover = false) => drawMedievalHudButton(soundBtnBg, 844, 10, 48, 48, hover);
  drawSoundBtn(false);

  hudHornIcon = scene.add.image(868, 34, 'hud_horn', sound.isMuted() ? 1 : 0);
  const soundHitArea = scene.add.rectangle(868, 34, 48, 48, 0x000000, 0)
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

  // 6. BOTÃO DE TELA CHEIA RÁPIDO [F] — Extremo Superior Direito (x: 902..950 em 16:9)
  const fsBtnBg = scene.add.graphics();
  const drawFsBtn = (hover = false) => drawMedievalHudButton(fsBtnBg, 902, 10, 48, 48, hover);
  drawFsBtn(false);

  hudFullscreenIcon = scene.add.image(926, 34, 'hud_fullscreen', isGameFullscreen(scene) ? 1 : 0);
  const fsHitArea = scene.add.rectangle(926, 34, 48, 48, 0x000000, 0)
    .setInteractive({ useHandCursor: true });

  fsHitArea.on('pointerover', () => drawFsBtn(true));
  fsHitArea.on('pointerout', () => drawFsBtn(false));
  fsHitArea.on('pointerdown', () => {
    sound.playButtonClick();
    toggleFullscreen(scene);
  });

  // 7. BOTÃO DE PAUSA RÁPIDO [ESC] — (x: 786..834 em 16:9)
  const pauseBtnBg = scene.add.graphics();
  const drawPauseBtn = (hover = false) => {
    drawMedievalHudButton(pauseBtnBg, 786, 10, 48, 48, hover);
    pauseBtnBg.fillStyle(hover ? 0xffeb3b : 0xc5a059, 1);
    pauseBtnBg.fillRect(803, 22, 4, 24);
    pauseBtnBg.fillRect(813, 22, 4, 24);
  };
  drawPauseBtn(false);

  const pauseHitArea = scene.add.rectangle(810, 34, 48, 48, 0x000000, 0)
    .setInteractive({ useHandCursor: true });
  pauseHitArea.on('pointerover', () => drawPauseBtn(true));
  pauseHitArea.on('pointerout', () => drawPauseBtn(false));
  pauseHitArea.on('pointerdown', () => {
    sound.playButtonClick();
    if (typeof handleEscPress === 'function') {
      handleEscPress(scene);
    }
  });

  hudContainer.add([pauseBtnBg, pauseHitArea, soundBtnBg, hudHornIcon, soundHitArea, fsBtnBg, hudFullscreenIcon, fsHitArea]);

  // 8. BARRA DE EXPERIÊNCIA (XP) DA PARTIDA — Faixa Horizontal Nobre 16:9 (x: 14..946, y: 61..77)
  const xpFrame = scene.add.graphics();
  // Fundo e borda externa em ferro nobre
  xpFrame.fillStyle(0x120e0b, 0.95).fillRoundedRect(14, 61, 932, 16, 5);
  xpFrame.lineStyle(2, 0x3d2b1f).strokeRoundedRect(14, 61, 932, 16, 5);
  xpFrame.lineStyle(1, 0xc5a059, 0.85).strokeRoundedRect(16, 62, 928, 14, 4);

  // Cantoneiras ornamentais de metal nas extremidades da barra de XP (Image 1 UI Kit)
  [14, 938].forEach(ex => {
    xpFrame.fillStyle(0xc5a059, 1).fillRect(ex, 61, 8, 16);
    xpFrame.fillStyle(0x2a1a0e, 1).fillRect(ex + 2, 63, 4, 12);
  });

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
  const barW = 100;
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

  // Se possuir exatamente 1 pergaminho, centraliza o badge (x: 495)
  if (activeScrolls.length === 1 && hudScrollBadges[0] && hudScrollTexts[0]) {
    hudScrollBadges[0].setX(495);
    hudScrollTexts[0].setX(495);
  } else if (activeScrolls.length >= 2) {
    if (hudScrollBadges[0] && hudScrollTexts[0]) {
      hudScrollBadges[0].setX(478);
      hudScrollTexts[0].setX(478);
    }
    if (hudScrollBadges[1] && hudScrollTexts[1]) {
      hudScrollBadges[1].setX(501);
      hudScrollTexts[1].setX(501);
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
        badge: `Nv. ${currLvl} ➔ Nv. ${nextLvl}`,
        badgeColor: '#ffd740',
        borderColor: 0xffca28,
        icon: cfg.icon,
        desc: `NÍVEL ATUAL: Nv. ${currLvl}\nNÍVEL FUTURO: Nv. ${nextLvl}\n\n✦ MULTIPLICADOR DE STATUS:\nx${mult} (+${pct}% Geral)\n\n✦ Equipa esta arma imediatamente!`,
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
  const scrollKeys = ['multishot', 'growth', 'attackspeed'];
  const maxChosenScrolls = 2;
  const activeChosen = (typeof chosenScrolls !== 'undefined' && Array.isArray(chosenScrolls)) ? chosenScrolls : (chosenScroll ? [chosenScroll] : []);
  const currentChosenCount = activeChosen.length;

  scrollKeys.forEach(sKey => {
    const isAlreadyChosen = activeChosen.includes(sKey);
    // Se o jogador já possui 2 pergaminhos distintos e este não é um deles, não oferece
    if (!isAlreadyChosen && currentChosenCount >= maxChosenScrolls) return;

    const currLvl = scrollLevels[sKey] || 0;
    if (currLvl >= 5) return;
    const nextLvl = currLvl + 1;
    const sCfg = SCROLL_CATALOG[sKey];
    if (!sCfg) return;
    const lvlData = (sCfg.levels && sCfg.levels[nextLvl - 1]) ? sCfg.levels[nextLvl - 1] : null;
    const badge = lvlData ? (typeof lvlData === 'object' ? lvlData.badge : 'PODER ARCANO') : 'TRANSCENDÊNCIA ★';
    const desc = lvlData ? (typeof lvlData === 'object' ? lvlData.desc : lvlData) : 'Aumenta o poder arcano do pergaminho nesta partida.';

    const slotLabel = isAlreadyChosen
      ? 'PERGAMINHO EXCLUSIVO'
      : (currentChosenCount === 0 ? 'PERGAMINHO ARCANO (1/2)' : 'PERGAMINHO ARCANO (2/2)');

    const promptExtra = isAlreadyChosen
      ? '✦ Refina este pergaminho exclusivo nesta partida!'
      : (currentChosenCount === 0
          ? '✦ ESCOLHA ARCANO (1/2): Trava como o 1º de 2 pergaminhos desta run!'
          : '✦ ESCOLHA ARCANO (2/2): Trava como o 2º e último pergaminho desta run!');

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
        badge: 'TRANSCENDÊNCIA ★',
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
  const bannerBg = scene.add.graphics();
  const bannerW = 640, bannerH = 68;
  const bannerLeft = GAME_WIDTH / 2 - bannerW / 2;
  bannerBg.fillStyle(0x16110c, 0.98).fillRoundedRect(bannerLeft, 16, bannerW, bannerH, 10);
  bannerBg.lineStyle(3, 0xffca28).strokeRoundedRect(bannerLeft, 16, bannerW, bannerH, 10);
  bannerBg.lineStyle(1, 0x8d5524).strokeRoundedRect(bannerLeft + 5, 21, bannerW - 10, bannerH - 10, 8);

  const titleTxt = scene.add.text(GAME_WIDTH / 2, 38, `✦ SUBIU PARA O NÍVEL ${runLevel}! ✦`, {
    ...textStyle('#ffca28', 22),
    fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);
  const subTxt = scene.add.text(GAME_WIDTH / 2, 64, 'ESCOLHA 1 CARTA DE UPGRADE DE ARMA OU ITEM (CLIQUE OU TECLAS [1] [2] [3])', textStyle('#7fe7ff', 11)).setOrigin(0.5);
  fitTextToBox(subTxt, 600, 20, 9);

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
  const cardY = 308;

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
      ...textStyle('#ffca28', 14),
      fontFamily: 'Georgia, serif',
      align: 'center',
      wordWrap: { width: cardW - 24, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(nameTxt, cardW - 24, 26, 9);

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
  const overlay = scene.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.76);

  const frame = scene.add.graphics();
  // Fundo em couro / madeira nobre
  frame.fillStyle(0x14100c, 0.98).fillRoundedRect(left, top, width, height, 12);
  // Moldura externa em ferro forjado
  frame.lineStyle(3, 0x3d2b1f).strokeRoundedRect(left, top, width, height, 12);
  // Moldura secundária em ouro nobre
  frame.lineStyle(1.5, 0xc5a059, 0.9).strokeRoundedRect(left + 4, top + 4, width - 8, height - 8, 9);
  // Filete interno delicado
  frame.lineStyle(1, 0x8d5524, 0.5).strokeRoundedRect(left + 8, top + 8, width - 16, height - 16, 7);

  // Rebites de ouro com sombra nos 4 cantos (Image 1 UI Kit)
  const rOff = 14;
  [
    [left + rOff, top + rOff],
    [left + width - rOff, top + rOff],
    [left + rOff, top + height - rOff],
    [left + width - rOff, top + height - rOff]
  ].forEach(([rx, ry]) => {
    frame.fillStyle(0xc5a059, 1).fillCircle(rx, ry, 3.5);
    frame.fillStyle(0x2a1a0e, 1).fillCircle(rx, ry, 1.5);
  });

  // Brasão ornamental / floreio central no topo (Inspirado nas Imagens 1 e 3)
  frame.fillStyle(0xc5a059, 1);
  frame.fillTriangle(cx, top - 8, cx - 18, top + 4, cx + 18, top + 4);
  frame.fillCircle(cx, top - 8, 3.5);
  frame.fillStyle(0x14100c, 1);
  frame.fillCircle(cx, top - 8, 1.5);
  // Asas / floreios laterais do brasão
  frame.lineStyle(2, 0xc5a059, 0.9);
  frame.lineBetween(cx - 22, top + 3, cx - 48, top + 3);
  frame.lineBetween(cx + 22, top + 3, cx + 48, top + 3);
  frame.fillStyle(0xc5a059, 1).fillCircle(cx - 48, top + 3, 2.5).fillCircle(cx + 48, top + 3, 2.5);

  const titleShadow = scene.add.text(cx + 2, top + 32, titleText, { ...textStyle('#080604', 22), fontFamily: 'Georgia, serif' }).setOrigin(0.5);
  const title = scene.add.text(cx, top + 30, titleText, { ...textStyle('#ffca28', 22), fontFamily: 'Georgia, serif' }).setOrigin(0.5);
  fitTextToBox(title, width - 80, 32, 14);
  titleShadow.setFontSize(title.style.fontSize);

  const children = [overlay, frame, titleShadow, title];
  if (subtitleText) {
    const sub = scene.add.text(cx, top + 56, subtitleText, {
      ...textStyle('#c5a059', 11),
      align: 'center',
      wordWrap: { width: width - 60, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(sub, width - 60, 26, 9);
    frame.lineStyle(1, 0xc5a059, 0.45).lineBetween(left + 40, top + 70, left + width - 40, top + 70);
    children.push(sub);
  }

  const container = scene.add.container(0, 0, children).setDepth(3000).setScrollFactor(0);
  activeModal = container;
  container.on('destroy', () => {
    if (activeModal === container) activeModal = null;
  });
  return container;
}

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

  const height = 430;
  const top = (GAME_HEIGHT - height) / 2;
  const cx = GAME_WIDTH / 2;
  pauseModal = createModal(scene, 'JOGO PAUSADO', height, '★ JORNADA EM ESPERA ★', 480);

  // Status de sobrevivência, prata e relíquia
  const statsBox = scene.add.graphics();
  statsBox.fillStyle(0x221a13, 0.92).fillRoundedRect(cx - 210, top + 74, 420, 58, 6);
  statsBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(cx - 210, top + 74, 420, 58, 6);

  const timeTxt = scene.add.text(cx - 192, top + 88, `TEMPO: ${survivalTime}s  |  PRATA: ${runSilver}  |  OURO: ${getGold()}`, textStyle('#ffca28', 12));
  fitTextToBox(timeTxt, 384, 22, 10);
  const relicName = buff.type ? `${BUFF_NAMES[buff.type]} NV.${getWeaponLevel(buff.type)} (${Math.max(0, buff.timeLeft).toFixed(1)}s)` : 'Nenhuma';
  const relicColor = buff.type ? '#7fe7ff' : '#8c8272';
  const relicTxt = scene.add.text(cx - 192, top + 110, `RELÍQUIA ATIVA: ${relicName}`, textStyle(relicColor, 12));
  fitTextToBox(relicTxt, 384, 22, 10);

  const continueBtn = createButton(scene, cx, top + 154, 'CONTINUAR JORNADA [P]', () => resumeGame(scene), 290, 36);

  const audioBtn = scene.add.rectangle(cx, top + 196, 290, 36, sound.isMuted() ? 0x8e1b1b : 0x247a46)
    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });
  const audioTxt = scene.add.text(cx, top + 196, sound.isMuted() ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]', textStyle('#ffffff', 12))
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

  const fsBtn = scene.add.rectangle(cx, top + 238, 290, 36, isGameFullscreen(scene) ? 0x247a46 : 0x6e3d1b)
    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });
  const fsTxt = scene.add.text(cx, top + 238, isGameFullscreen(scene) ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]', textStyle('#ffffff', 12))
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

  const restartBtn = createButton(scene, cx, top + 280, 'REINICIAR MISSÃO', () => restartScene(scene, true, false), 290, 36);
  const menuBtn = createButton(scene, cx, top + 322, 'MENU PRINCIPAL', () => restartScene(scene, false, false), 290, 36);
  const footerHint = scene.add.text(cx, top + 368, 'Pausar / Retornar: Tecla P', textStyle('#a8987b', 11)).setOrigin(0.5);

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
    `${summary.silverCollected ?? summary.runSilver ?? 0} Pratas   ➔`,
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
  const subtitle = `Prata Convertida: ${summary.silverCollected ?? summary.runSilver ?? 0} ➔ +${summary.totalGoldEarned ?? summary.earnedGold ?? 0} Ouro  |  Cofre Total: ${getGold()} Ouro`;

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
    const doubleGoldBtn = createButton(scene, cx, top + 266, `✦ DOBRAR OURO DA EXPEDIÇÃO (+${goldToDouble}G) ✦`, () => {
      if (rewardedUsed) return;
      sound.playButtonClick();
      if (typeof PlatformBridge !== 'undefined') {
        PlatformBridge.showRewarded(scene, {
          onReward: () => {
            rewardedUsed = true;
            addGold(goldToDouble);
            sound.playAchievement();
            doubleGoldBtn[1].setText(`✓ OURO DOBRADO COM SUCESSO! (+${goldToDouble}G)`);
            doubleGoldBtn[0].setFillStyle(0x233e18);
            doubleGoldBtn[0].setStrokeStyle(2, 0x81c784);
            doubleGoldBtn[1].setColor('#a5d6a7');
            floatText(scene, cx, top + 260, `+${goldToDouble} OURO EXTRA!`, '#ffd740');
          }
        });
      }
    }, 460, 36);
    doubleGoldBtn[0].setFillStyle(0x4a2e12);
    doubleGoldBtn[0].setStrokeStyle(2, 0xffd54f);
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

  const newRunBtn = createButton(scene, cx - 138, actionRow1Y, '⚔ NOVA JORNADA', () => finishAndRestart(true, false), 254, 38);
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
  menuContainer = createModal(scene, 'CONFIGURAÇÕES DO REINO', 480, 'Ajustes de áudio, vídeo (Tela Cheia) e pergaminho de batalha', 580);
  menuContainer.isMainMenu = false;

  // Seção 1: Áudio, Tela Cheia & Controles Mobile
  const audioBox = scene.add.graphics();
  audioBox.fillStyle(0x221a13, 0.94).fillRoundedRect(cx - 260, 84, 520, 118, 6);
  audioBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(cx - 260, 84, 520, 118, 6);
  audioBox.lineStyle(1, 0xc5a059, 0.6).strokeRoundedRect(cx - 258, 86, 516, 114, 4);

  const audioTitle = scene.add.text(cx - 240, 94, 'ÁUDIO, TELA CHEIA & JOYSTICK VIRTUAL', textStyle('#ffca28', 12));

  // Botão 1: Áudio
  const audioToggleBtn = scene.add.rectangle(cx - 125, 128, 230, 32, sound.isMuted() ? 0x8e1b1b : 0x247a46)
    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });
  const audioToggleTxt = scene.add.text(cx - 125, 128, sound.isMuted() ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]', textStyle('#ffffff', 11))
    .setOrigin(0.5);

  audioToggleBtn.on('pointerdown', () => {
    sound.toggleMute();
    sound.playButtonClick();
    audioToggleBtn.setFillStyle(sound.isMuted() ? 0x8e1b1b : 0x247a46);
    audioToggleTxt.setText(sound.isMuted() ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]');
    if (hudHornIcon) hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
  });

  // Botão 2: Tela Cheia
  const fsToggleBtn = scene.add.rectangle(cx + 125, 128, 230, 32, isGameFullscreen(scene) ? 0x247a46 : 0x6e3d1b)
    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });
  const fsToggleTxt = scene.add.text(cx + 125, 128, isGameFullscreen(scene) ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]', textStyle('#ffffff', 11))
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

  // Botão 3: Ativar Joystick Virtual (Mobile / PC)
  const getJoyLabel = () => {
    const m = typeof getJoystickMode === 'function' ? getJoystickMode() : 'auto';
    if (m === 'enabled') return 'JOYSTICK VIRTUAL: [SEMPRE ATIVADO]';
    if (m === 'disabled') return 'JOYSTICK VIRTUAL: [DESATIVADO]';
    return 'JOYSTICK VIRTUAL: [DETECÇÃO AUTOMÁTICA]';
  };
  const getJoyColor = () => {
    const m = typeof getJoystickMode === 'function' ? getJoystickMode() : 'auto';
    if (m === 'enabled') return 0x247a46;
    if (m === 'disabled') return 0x8e1b1b;
    return 0x2d3a4f;
  };

  const joyToggleBtn = scene.add.rectangle(cx, 168, 480, 30, getJoyColor())
    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });
  const joyToggleTxt = scene.add.text(cx, 168, getJoyLabel(), textStyle('#ffffff', 11))
    .setOrigin(0.5);

  joyToggleBtn.on('pointerdown', () => {
    sound.playButtonClick();
    const current = typeof getJoystickMode === 'function' ? getJoystickMode() : 'auto';
    const next = current === 'auto' ? 'enabled' : (current === 'enabled' ? 'disabled' : 'auto');
    if (typeof setJoystickMode === 'function') setJoystickMode(next);
    joyToggleBtn.setFillStyle(getJoyColor());
    joyToggleTxt.setText(getJoyLabel());
    if (virtualJoystick) virtualJoystick.updateVisibility();
  });

  // Seção 2: Pergaminho de Dicas de Combate
  const guideBox = scene.add.graphics();
  guideBox.fillStyle(0x1d1611, 0.94).fillRoundedRect(cx - 260, 210, 520, 192, 6);
  guideBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(cx - 260, 210, 520, 192, 6);
  guideBox.lineStyle(1, 0xc5a059, 0.5).strokeRoundedRect(cx - 258, 212, 516, 188, 4);

  const guideTitle = scene.add.text(cx, 220, 'PERGAMINHO DE COMBATE', textStyle('#ffca28', 12.5)).setOrigin(0.5);
  const guideLines = [
    '• Mobile (Touch): Joystick Virtual analógico à esquerda para movimentação (ataque automático).',
    '• Inimigos derrotados dropam Moedas de Prata durante a expedição na floresta.',
    '• Ao encerrar a partida, suas Moedas de Prata são convertidas em Ouro Real!',
    '• Visite a Forja do Ferreiro para desbloquear e equipar novas armas de combate.',
    '• Visite o Santuário do Mago para aprimorar seus atributos permanentes.',
    '• O Escudo Sagrado reflete projéteis inimigos enquanto desfere seus ataques.'
  ];
  const guideTexts = guideLines.map((txt, i) =>
    scene.add.text(cx - 240, 240 + i * 24, txt, { ...textStyle('#d6c8aa', 10.5, 'normal'), lineSpacing: 3 })
  );

  menuContainer.add([
    audioBox, audioTitle, audioToggleBtn, audioToggleTxt, fsToggleBtn, fsToggleTxt, joyToggleBtn, joyToggleTxt,
    guideBox, guideTitle, ...guideTexts,
    ...createButton(scene, cx, 442, 'VOLTAR', () => exitSubMenu(scene), 260, 38)
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

  // Botão Rápido "✕ SAIR [ESC]" no canto superior direito do modal
  const closeQuickBtn = scene.add.rectangle(850, 48, 78, 28, 0x5c241b)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(850, 48, '✕ SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);
  closeQuickBtn.on('pointerover', () => closeQuickBtn.setFillStyle(0x8e2a1b));
  closeQuickBtn.on('pointerout', () => closeQuickBtn.setFillStyle(0x5c241b));
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
    const rewardTxt = scene.add.text(cardLeft + cardW - 36, barY + barH / 2, isDone ? '★ CONCLUÍDO' : `+${ach.rewardGold}G`, textStyle(isDone ? '#ffeb3b' : '#ffd740', 8.5)).setOrigin(0.5);
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

  const titleShadow = scene.add.text(482, 44, 'A JORNADA DO CAVALEIRO', {
    ...textStyle('#060403', 28), fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);
  const titleMain = scene.add.text(480, 42, 'A JORNADA DO CAVALEIRO', {
    ...textStyle('#ffca28', 28), fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);
  const subtitleTxt = scene.add.text(480, 75, '★ CRÔNICAS DE ELDÓRIA • ROGUELITE DE AÇÃO ★', textStyle('#e0c088', 11.5)).setOrigin(0.5);

  // Botões Rápidos no Canto Superior Direito: Áudio [M] e Tela Cheia [F]
  const menuSoundBg = scene.add.graphics();
  const drawMenuSound = (hover = false) => {
    menuSoundBg.clear();
    menuSoundBg.fillStyle(hover ? 0x2e241c : 0x14100c, 0.94).fillRoundedRect(844, 18, 46, 46, 8);
    menuSoundBg.lineStyle(2, hover ? 0xffca28 : 0xc5a059).strokeRoundedRect(844, 18, 46, 46, 8);
  };
  drawMenuSound(false);
  const menuHorn = scene.add.image(867, 41, 'hud_horn', sound.isMuted() ? 1 : 0);
  const menuSoundHit = scene.add.rectangle(867, 41, 46, 46, 0x000000, 0).setInteractive({ useHandCursor: true });
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

  const menuFsBg = scene.add.graphics();
  const drawMenuFs = (hover = false) => {
    menuFsBg.clear();
    menuFsBg.fillStyle(hover ? 0x2e241c : 0x14100c, 0.94).fillRoundedRect(898, 18, 46, 46, 8);
    menuFsBg.lineStyle(2, hover ? 0xffca28 : 0xc5a059).strokeRoundedRect(898, 18, 46, 46, 8);
  };
  drawMenuFs(false);
  const menuFsIcon = scene.add.image(921, 41, 'hud_fullscreen', isGameFullscreen(scene) ? 1 : 0);
  const menuFsHit = scene.add.rectangle(921, 41, 46, 46, 0x000000, 0).setInteractive({ useHandCursor: true });
  menuContainer.updateMenuFullscreen = () => {
    if (menuFsIcon && menuFsIcon.active) menuFsIcon.setFrame(isGameFullscreen(scene) ? 1 : 0);
  };
  menuFsHit.on('pointerover', () => drawMenuFs(true));
  menuFsHit.on('pointerout', () => drawMenuFs(false));
  menuFsHit.on('pointerdown', () => {
    sound.playButtonClick();
    toggleFullscreen(scene);
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
  const startBtn = createButton(scene, 720, 206, '⚔ COMEÇAR JORNADA', launchGame, 330, 42);
  const blacksmithBtn = createButton(scene, 720, 256, '⚒ FORJA DO FERREIRO', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showBlacksmithMenu(scene);
  }, 330, 38);
  const mageBtn = createButton(scene, 720, 304, '🔮 SANTUÁRIO DO MAGO', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showMageShopMenu(scene);
  }, 330, 38);
  const achBtn = createButton(scene, 720, 352, '🏆 CONQUISTAS DO REINO', () => {
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
    headerBanner, titleShadow, titleMain, subtitleTxt,
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

// =============================================================================
// A FORJA DO FERREIRO REAL (DESBLOQUEIO DE ARMAS & ARSENAL DE COMBATE)
// DESIGN: CENÁRIO COMPLETO COM MESTRE ANVILGAR ATRÁS DO BALCÃO, LAREIRA E 5 CARTAS
// INSPIRAÇÃO: CUPHEAD SHOP (IMG 2), UI KIT (IMG 1 & 3) & WITCH/CAT SHOP (IMG 4)
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

  // 1. CENÁRIO DA FORJA: PAREDE DE PEDRA, LAREIRA FLAMEJANTE E SUPORTES DE ARMAS
  const forgeArt = scene.add.graphics();

  // Parede de alvenaria e fuligem
  forgeArt.fillStyle(0x1a120c, 1).fillRect(0, 0, 960, 240);
  for (let by = 0; by < 240; by += 28) {
    forgeArt.fillStyle(0x241810, 0.4).fillRect(0, by, 960, 2);
  }

  // Lareira / Fornalha de pedra à esquerda (x: 40..170, y: 55..205)
  forgeArt.fillStyle(0x2a1a12, 1).fillRoundedRect(40, 55, 130, 150, 10);
  forgeArt.lineStyle(2, 0x4a2c1b).strokeRoundedRect(40, 55, 130, 150, 10);
  // Boca da fornalha em brasa
  forgeArt.fillStyle(0x0e0604, 1).fillRoundedRect(55, 100, 100, 100, 8);
  forgeArt.fillStyle(0xd84315, 0.9).fillCircle(105, 160, 36);
  forgeArt.fillStyle(0xff6d00, 0.95).fillCircle(105, 168, 25);
  forgeArt.fillStyle(0xffd54f, 1).fillCircle(105, 174, 14);

  // Chaminé de ferro subindo
  forgeArt.fillStyle(0x1a1512, 1).fillRect(85, 0, 40, 55);
  forgeArt.lineStyle(1.5, 0x3d2b1f).strokeRect(85, 0, 40, 55);

  // Racks de armas na parede traseira à direita (x: 640..920, y: 65..185)
  forgeArt.fillStyle(0x2e1c14, 0.95).fillRoundedRect(640, 68, 280, 115, 8);
  forgeArt.lineStyle(2, 0x5c3722).strokeRoundedRect(640, 68, 280, 115, 8);
  forgeArt.lineStyle(1, 0xc5a059, 0.5).strokeRoundedRect(644, 72, 272, 107, 6);

  // Silhuetas de espadas, machados e escudos pendurados no suporte
  forgeArt.fillStyle(0x78909c, 0.85);
  forgeArt.fillRect(665, 82, 6, 75); // Lâmina de espada
  forgeArt.fillRect(655, 120, 26, 6); // Guarda
  forgeArt.fillStyle(0x5c3722, 1).fillRect(666, 126, 4, 18); // Empunhadura

  // Escudo redondo viking hung
  forgeArt.fillStyle(0x546e7a, 0.9).fillCircle(755, 125, 28);
  forgeArt.lineStyle(2, 0xc5a059).strokeCircle(755, 125, 28);
  forgeArt.fillStyle(0xffca28, 1).fillCircle(755, 125, 8);

  // Machado duplo de batalha
  forgeArt.fillStyle(0x455a64, 0.9);
  forgeArt.fillTriangle(840, 85, 815, 115, 840, 115);
  forgeArt.fillTriangle(840, 85, 865, 115, 840, 115);
  forgeArt.fillStyle(0x5c3722, 1).fillRect(838, 95, 4, 70);

  // Correntes de ferro penduradas no teto
  forgeArt.lineStyle(2, 0x455a64, 0.7);
  forgeArt.lineBetween(400, 0, 400, 40);
  forgeArt.lineBetween(560, 0, 560, 40);

  // 2. O MESTRE FERREIRO ANVILGAR ATRÁS DO BALCÃO
  const blacksmithSprite = scene.add.sprite(225, 142, 'blacksmith_master')
    .play('blacksmith_master')
    .setScale(2.2);

  scene.tweens.add({
    targets: blacksmithSprite,
    y: 138,
    duration: 900,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // Balão de Diálogo de Pergaminho do Vendedor (Imagem 1 & 4)
  const speechBubble = scene.add.graphics();
  const drawSpeechBubble = () => {
    speechBubble.clear();
    // Corpo do balão de pergaminho nobre
    speechBubble.fillStyle(0xf5ebd6, 0.98).fillRoundedRect(310, 82, 310, 96, 10);
    speechBubble.lineStyle(2, 0x6d4c2a).strokeRoundedRect(310, 82, 310, 96, 10);
    speechBubble.lineStyle(1, 0xc5a059, 0.7).strokeRoundedRect(313, 85, 304, 90, 8);

    // Ponta do balão apontando para o Ferreiro
    speechBubble.fillStyle(0xf5ebd6, 1).fillTriangle(310, 130, 286, 138, 310, 146);
    speechBubble.lineStyle(2, 0x6d4c2a).lineBetween(310, 130, 286, 138);
    speechBubble.lineStyle(2, 0x6d4c2a).lineBetween(286, 138, 310, 146);
  };
  drawSpeechBubble();

  const smithTitleTxt = scene.add.text(326, 92, 'MESTRE ANVILGAR (FERREIRO REAL)', textStyle('#5c3722', 11, 'bold'));
  const smithSpeechTxt = scene.add.text(326, 110, '“O fogo forja o aço! Escolha seu armamento para a batalha.”', {
    ...textStyle('#2c1b10', 10.5, 'normal'),
    lineSpacing: 3,
    wordWrap: { width: 280, useAdvancedWrap: true }
  });

  // 3. O BALCÃO DE CARVALHO PESADO (ATRAVESSA DE PONTA A PONTA: y: 195..248)
  const counterArt = scene.add.graphics();
  // Viga maciça de carvalho envelhecido
  counterArt.fillStyle(0x3a2215, 1).fillRect(0, 196, 960, 52);
  // Brilho de madeira polida no topo do balcão
  counterArt.fillStyle(0x6e3d22, 1).fillRect(0, 196, 960, 6);
  counterArt.lineStyle(2, 0x1f1109).strokeRect(0, 196, 960, 52);

  // Textura de veios e emendas de madeira
  counterArt.fillStyle(0x28160c, 0.6);
  [160, 340, 520, 700, 880].forEach(sx => counterArt.fillRect(sx, 202, 2, 46));

  // Rebites e cantoneiras de ferro na borda do balcão
  for (let rx = 20; rx < 960; rx += 70) {
    counterArt.fillStyle(0x1a120c, 1).fillCircle(rx, 204, 3.5);
    counterArt.fillStyle(0xc5a059, 1).fillCircle(rx, 204, 2);
  }

  // Itens em cima do Balcão: Bigorna pesada com ferro em brasa à esquerda
  counterArt.fillStyle(0x263238, 1).fillRect(72, 178, 38, 20); // Base da bigorna
  counterArt.fillRect(64, 168, 54, 12); // Tampo
  counterArt.fillTriangle(64, 168, 50, 172, 64, 176); // Chifre da bigorna
  // Peça de ferro quente saindo da brasa com tenaz
  counterArt.fillStyle(0xff5722, 1).fillRect(78, 164, 16, 5);
  counterArt.fillStyle(0xffeb3b, 1).fillRect(80, 165, 8, 3);
  counterArt.fillStyle(0x455a64, 1).fillRect(94, 162, 22, 3); // Tenaz

  // Pilha de moedas de ouro sobre um veludo bordô à direita
  counterArt.fillStyle(0x5c1818, 0.95).fillRoundedRect(720, 190, 55, 8, 3);
  counterArt.fillStyle(0xffca28, 1).fillCircle(732, 189, 4).fillCircle(742, 189, 4).fillCircle(737, 186, 4);

  // 4. PLACA DE MADEIRA PENDURADA NO TOPO (TÍTULO DA LOJA — IMAGEM 4)
  const signGfx = scene.add.graphics();
  // Correntes de suspensão
  signGfx.lineStyle(2, 0x455a64, 1);
  signGfx.lineBetween(380, 0, 380, 24);
  signGfx.lineBetween(580, 0, 580, 24);
  // Placa esculpida
  signGfx.fillStyle(0x2a170e, 0.96).fillRoundedRect(340, 16, 280, 44, 8);
  signGfx.lineStyle(2.5, 0x8d5524).strokeRoundedRect(340, 16, 280, 44, 8);
  signGfx.lineStyle(1.2, 0xc5a059).strokeRoundedRect(344, 20, 272, 36, 6);
  // Rebites
  signGfx.fillStyle(0xc5a059, 1).fillCircle(352, 28, 2.5).fillCircle(608, 28, 2.5);

  const signTitle = scene.add.text(480, 38, '⚔ A FORJA REAL ⚔', {
    ...textStyle('#ffca28', 16), fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);

  // 5. ABAS DE NAVEGAÇÃO ENTRE LOJAS NO TOPO ESQUERDO (IMAGEM 4)
  const forgeTabBtn = scene.add.rectangle(85, 28, 110, 28, 0x8d5524)
    .setStrokeStyle(1.5, 0xffca28);
  const forgeTabTxt = scene.add.text(85, 28, '⚔ FORJA REAL', textStyle('#ffffff', 10.5)).setOrigin(0.5);

  const mageTabBtn = scene.add.rectangle(205, 28, 110, 28, 0x22132e)
    .setStrokeStyle(1.5, 0x7c4dff)
    .setInteractive({ useHandCursor: true });
  const mageTabTxt = scene.add.text(205, 28, '🔮 SANTUÁRIO', textStyle('#ce93d8', 10.5)).setOrigin(0.5);

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

  // 6. PAINEL DE OURO DO JOGADOR NO TOPO DIREITO
  const goldPouchGfx = scene.add.graphics();
  goldPouchGfx.fillStyle(0x1e150f, 0.96).fillRoundedRect(720, 16, 130, 32, 6);
  goldPouchGfx.lineStyle(2, 0xffca28).strokeRoundedRect(720, 16, 130, 32, 6);
  const coinSprite = scene.add.sprite(738, 32, 'gold_coin').play('gold_coin').setScale(1.2);
  const goldValTxt = scene.add.text(758, 32, `${getGold()}G`, textStyle('#ffd740', 13)).setOrigin(0, 0.5);

  // Botão Sair [ESC]
  const closeQuickBtn = scene.add.rectangle(905, 32, 70, 30, 0x5c241b)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(905, 32, '✕ SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);
  closeQuickBtn.on('pointerover', () => closeQuickBtn.setFillStyle(0x8e2a1b));
  closeQuickBtn.on('pointerout', () => closeQuickBtn.setFillStyle(0x5c241b));
  closeQuickBtn.on('pointerdown', () => exitSubMenu(scene));

  menuContainer.add([
    forgeArt, blacksmithSprite, speechBubble, smithTitleTxt, smithSpeechTxt,
    counterArt, signGfx, signTitle,
    forgeTabBtn, forgeTabTxt, mageTabBtn, mageTabTxt,
    goldPouchGfx, coinSprite, goldValTxt,
    closeQuickBtn, closeQuickTxt
  ]);

  // 7. SHOWCASE DAS 5 ARMAS: CARTAS DE PERGAMINHO PREGADAS NA FRENTE DO BALCÃO
  const upgrades = getUpgrades();
  const weaponKeys = ['bow', 'sword', 'shield', 'axe', 'firestaff'];
  const weaponArchetypes = {
    bow: 'DISPARO LONGO',
    sword: 'CORTE FRONTAL',
    shield: 'DEFESA SAGRADA',
    axe: 'GIRO 360°',
    firestaff: 'IMPACTO EM ÁREA'
  };
  const weaponStyles = {
    bow: 'Disparos rápidos à distância (ideal para arqueiros e magos).',
    sword: 'Corte frontal potente em arco com alto knockback e rastro reluzente.',
    shield: 'Aura defensiva sagrada que bloqueia e reflete projéteis inimigos.',
    axe: 'Corte giratório duplo devastador que atinge múltiplos inimigos em 360°.',
    firestaff: 'Projéteis arcanos explosivos com dano em área e alta potência de impacto.'
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
      // Prego / rebite de ferro no topo da carta prendendo-a ao balcão
      cardGfx.fillStyle(0x000000, 0.4).fillCircle(cx, startY + 5, 4);
      cardGfx.fillStyle(0xc5a059, 1).fillCircle(cx, startY + 4, 3);
      cardGfx.fillStyle(0x2a1a0e, 1).fillCircle(cx, startY + 4, 1.2);

      // Corpo de pergaminho da carta (Imagem 1 & 4)
      cardGfx.fillStyle(hover ? 0xfff8e7 : (isStarter ? 0xfff3cf : 0xf2e4c9), 0.98)
        .fillRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
      // Moldura externa
      cardGfx.lineStyle(2, hover ? 0xffca28 : (isStarter ? 0xffc107 : (isUnlocked ? 0x8d5524 : 0x5c4233)))
        .strokeRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
      // Filete interno decorativo
      cardGfx.lineStyle(1, hover ? 0xffd54f : (isStarter ? 0xffca28 : 0xb89569), 0.7)
        .strokeRoundedRect(left + 3, startY + 11, cardW - 6, cardH - 14, 6);

      // Rebites nos 4 cantos da carta
      const corners = [
        [left + 8, startY + 16],
        [left + cardW - 8, startY + 16],
        [left + 8, startY + cardH - 8],
        [left + cardW - 8, startY + cardH - 8]
      ];
      corners.forEach(([rx, ry]) => {
        cardGfx.fillStyle(0xc5a059, 0.8).fillCircle(rx, ry, 1.8);
      });

      // Alvéolo circular de relíquia / arma (Medalhão Image 1)
      const socketY = startY + 54;
      cardGfx.fillStyle(0x18120c, 1).fillCircle(cx, socketY, 26);
      cardGfx.lineStyle(2, hover ? 0xffeb3b : (isStarter ? 0xffd740 : (isUnlocked ? 0xc5a059 : 0x6e5233)))
        .strokeCircle(cx, socketY, 26);
      cardGfx.lineStyle(1, 0x8d5524, 0.6).strokeCircle(cx, socketY, 23);

      // 4 Entalhes ornamentais nas bordas do círculo
      cardGfx.fillStyle(0xc5a059, 1);
      cardGfx.fillRect(cx - 1.5, socketY - 29, 3, 4);
      cardGfx.fillRect(cx - 1.5, socketY + 25, 3, 4);
      cardGfx.fillRect(cx - 29, socketY - 1.5, 4, 3);
      cardGfx.fillRect(cx + 25, socketY - 1.5, 4, 3);
    };
    drawCard(false);

    // Ícone da Arma no centro do alvéolo circular
    const icon = scene.add.image(cx, startY + 54, cfg.icon).setScale(1.4);
    if (!isUnlocked) icon.setTint(0x555555);

    // Nome da Arma em tipografia nobre
    const nameTxt = scene.add.text(cx, startY + 92, cfg.name, {
      ...textStyle(isStarter ? '#794b02' : (isUnlocked ? '#2c1b10' : '#6b5443'), 12),
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);
    fitTextToBox(nameTxt, cardW - 16, 18, 9.5);

    // Badge do Arquétipo de Combate
    const badgeBg = scene.add.rectangle(cx, startY + 114, cardW - 24, 18, isStarter ? 0x2e5c26 : (isUnlocked ? 0x3d2919 : 0x221a14))
      .setStrokeStyle(1, isStarter ? 0x76ff03 : (isUnlocked ? 0xc5a059 : 0x6e5233));
    const badgeTxt = scene.add.text(cx, startY + 114, weaponArchetypes[key] || 'ARMA REAL', textStyle(isStarter ? '#b9f6ca' : (isUnlocked ? '#ffe082' : '#a8987b'), 9)).setOrigin(0.5);

    // Descrição e lore de combate
    const descStr = weaponStyles[key] || cfg.forgeLore || '';
    const descTxt = scene.add.text(cx, startY + 164, descStr, {
      ...textStyle('#3d2817', 9.5, 'normal'),
      align: 'center',
      lineSpacing: 2.5,
      wordWrap: { width: cardW - 20, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(descTxt, cardW - 18, 76, 8.5);

    // Botão de Ação no Rodapé da Carta
    const btnX = cx, btnY = startY + cardH - 26, btnW = cardW - 20, btnH = 34;
    let actionBtn, actionTxt;

    if (!isUnlocked) {
      const cost = cfg.unlockCost || 25;
      const canAfford = getGold() >= cost;

      actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, canAfford ? 0x246b3d : 0x3b2c22)
        .setStrokeStyle(2, canAfford ? 0xffca28 : 0x6e5846)
        .setInteractive({ useHandCursor: true });
      actionTxt = scene.add.text(btnX, btnY, `FORJAR (${cost}G)`, textStyle(canAfford ? '#ffffff' : '#8c7b6b', 10.5)).setOrigin(0.5);
      fitTextToBox(actionTxt, btnW - 8, btnH - 6, 8.5);

      actionBtn.on('pointerdown', () => {
        if (getGold() < cost) {
          sound.playShieldBlock();
          floatText(scene, btnX, btnY - 20, 'OURO INSUFICIENTE!', '#ff5252');
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
        floatText(scene, btnX, btnY - 24, `${cfg.name} FORJADA!`, '#ffd740');
      });
    } else {
      actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, isStarter ? 0x1f4724 : 0x543217)
        .setStrokeStyle(2, isStarter ? 0xffca28 : 0xc5a059)
        .setInteractive({ useHandCursor: true });
      actionTxt = scene.add.text(btnX, btnY, isStarter ? '★ EM USO' : 'EQUIPAR', textStyle(isStarter ? '#ffd740' : '#ffffff', 10.5)).setOrigin(0.5);
      fitTextToBox(actionTxt, btnW - 8, btnH - 6, 8.5);

      actionBtn.on('pointerdown', () => {
        sound.playButtonClick();
        const curr = getUpgrades();
        curr.starterWeapon = key;
        saveUpgrades(curr);
        showBlacksmithMenu(scene);
        floatText(scene, btnX, btnY - 24, `${cfg.name} SERÁ SUA INICIAL!`, '#7fe7ff');
      });
    }

    // Zona Interativa da Carta Inteira (Atualiza o Diálogo do Ferreiro ao passar o mouse!)
    const cardHit = scene.add.rectangle(cx, startY + cardH / 2, cardW, cardH, 0x000000, 0)
      .setInteractive({ useHandCursor: true });

    cardHit.on('pointerover', () => {
      drawCard(true);
      smithSpeechTxt.setText(weaponDialogues[key] || '“Excelente escolha, guerreiro!”');
    });
    cardHit.on('pointerout', () => {
      drawCard(false);
      smithSpeechTxt.setText('“O fogo forja o aço! Escolha seu armamento para a batalha.”');
    });

    menuContainer.add([cardGfx, icon, nameTxt, badgeBg, badgeTxt, descTxt, actionBtn, actionTxt, cardHit]);
  });

  // 8. TECLA DE ATALHO ESC PARA SAÍDA RÁPIDA
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
// DESIGN: CENÁRIO COMPLETO COM ARQUIMAGO ATRÁS DO BALCÃO, GRIMÓRIO ABERTO E 4 POÇÕES
// INSPIRAÇÃO: WITCH SHOP (IMG 4), UI KIT (IMG 1 & 3) & CUPHEAD (IMG 2)
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

  // 1. CENÁRIO DO SANTUÁRIO: PAREDE OBSIDIANA, RUNAS MÍSTICAS & PRATELEIRAS ALQUÍMICAS
  const sanctumArt = scene.add.graphics();
  // Parede de pedra mística escura
  sanctumArt.fillStyle(0x0f0c1c, 1).fillRect(0, 0, 960, 240);
  for (let by = 0; by < 240; by += 28) {
    sanctumArt.fillStyle(0x1a152e, 0.45).fillRect(0, by, 960, 2);
  }

  // Runas arcanas gravadas na parede com aura de brilho (ciano & violeta)
  sanctumArt.lineStyle(2, 0x7c4dff, 0.45);
  sanctumArt.strokeCircle(105, 120, 32);
  sanctumArt.lineBetween(105, 88, 105, 152);
  sanctumArt.lineBetween(73, 120, 137, 120);
  sanctumArt.strokeRect(93, 108, 24, 24);

  // Prateleiras de boticário na parede à direita (x: 640..920, y: 55..185)
  sanctumArt.fillStyle(0x22132e, 0.96).fillRoundedRect(640, 58, 280, 125, 8);
  sanctumArt.lineStyle(2, 0x6a1b9a).strokeRoundedRect(640, 58, 280, 125, 8);
  sanctumArt.lineStyle(1, 0xba68c8, 0.5).strokeRoundedRect(644, 62, 272, 117, 6);

  // Prateleiras horizontais com frascos e grimórios coloridos
  sanctumArt.fillStyle(0x3e1f57, 1).fillRect(650, 105, 260, 6);
  sanctumArt.fillRect(650, 150, 260, 6);

  // Frascos de poção rubi, esmeralda e safira nas prateleiras
  const bottleColors = [0xe91e63, 0x00e676, 0x00e5ff, 0xffd600, 0x9c27b0, 0xff5722];
  bottleColors.forEach((col, bIdx) => {
    const bx = 665 + bIdx * 42;
    sanctumArt.fillStyle(col, 0.9).fillCircle(bx, 95, 8);
    sanctumArt.fillStyle(0xffffff, 0.6).fillRect(bx - 2, 82, 4, 7);
  });
  // Livros encadernados na prateleira inferior
  sanctumArt.fillStyle(0x4a148c, 1).fillRect(665, 120, 12, 30);
  sanctumArt.fillStyle(0x006064, 1).fillRect(682, 116, 14, 34);
  sanctumArt.fillStyle(0xb71c1c, 1).fillRect(701, 122, 12, 28);
  sanctumArt.fillStyle(0xe65100, 1).fillRect(718, 118, 14, 32);

  // Esferas de mana flutuando no ar com brilho
  sanctumArt.fillStyle(0x00e5ff, 0.25).fillCircle(500, 100, 14);
  sanctumArt.fillStyle(0x00e5ff, 0.85).fillCircle(500, 100, 5);
  sanctumArt.fillStyle(0xe040fb, 0.25).fillCircle(430, 70, 12);
  sanctumArt.fillStyle(0xe040fb, 0.85).fillCircle(430, 70, 4);

  // 2. O ARQUIMAGO ALQUIMISTA ATRÁS DO BALCÃO
  const mageSprite = scene.add.sprite(225, 142, 'mage_master')
    .play('mage_master')
    .setScale(2.2);

  scene.tweens.add({
    targets: mageSprite,
    y: 138,
    duration: 1100,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // Balão de Diálogo de Pergaminho Místico (Imagem 1 & 4)
  const speechBubble = scene.add.graphics();
  const drawSpeechBubble = () => {
    speechBubble.clear();
    // Pergaminho místico com borda violeta / ouro
    speechBubble.fillStyle(0xf5ebd6, 0.98).fillRoundedRect(310, 82, 310, 96, 10);
    speechBubble.lineStyle(2, 0x6a1b9a).strokeRoundedRect(310, 82, 310, 96, 10);
    speechBubble.lineStyle(1, 0xc5a059, 0.7).strokeRoundedRect(313, 85, 304, 90, 8);

    // Ponta do balão apontando para o Mago
    speechBubble.fillStyle(0xf5ebd6, 1).fillTriangle(310, 130, 286, 138, 310, 146);
    speechBubble.lineStyle(2, 0x6a1b9a).lineBetween(310, 130, 286, 138);
    speechBubble.lineStyle(2, 0x6a1b9a).lineBetween(286, 138, 310, 146);
  };
  drawSpeechBubble();

  const mageTitleTxt = scene.add.text(326, 92, 'ARQUIMAGO ALQUIMISTA (MESTRE)', textStyle('#4a148c', 11, 'bold'));
  const mageSpeechTxt = scene.add.text(326, 110, '“Beba dos meus elixires e seu poder ecoará em cada batalha!”', {
    ...textStyle('#2c1b10', 10.5, 'normal'),
    lineSpacing: 3,
    wordWrap: { width: 280, useAdvancedWrap: true }
  });

  // 3. O BALCÃO DE MOGNO MÍSTICO (y: 195..248)
  const counterArt = scene.add.graphics();
  counterArt.fillStyle(0x28122e, 1).fillRect(0, 196, 960, 52);
  counterArt.fillStyle(0x562363, 1).fillRect(0, 196, 960, 6); // Brilho de mogno polido
  counterArt.lineStyle(2, 0x15071a).strokeRect(0, 196, 960, 52);

  // Runas arcanas gravadas no topo do balcão
  counterArt.lineStyle(1, 0xba68c8, 0.4);
  for (let rx = 30; rx < 960; rx += 80) {
    counterArt.fillStyle(0x7c4dff, 0.8).fillCircle(rx, 204, 2.5);
  }

  // Itens em cima do Balcão:
  // A) O GRIMÓRIO ABERTO COM RUNAS DOURADAS (Referência direta à Imagem 4!)
  counterArt.fillStyle(0x3e1818, 1).fillRect(76, 172, 48, 26); // Capa de couro
  counterArt.fillStyle(0xf5ecd0, 1).fillRoundedRect(80, 170, 20, 24, 2); // Página esquerda
  counterArt.fillStyle(0xf5ecd0, 1).fillRoundedRect(102, 170, 20, 24, 2); // Página direita
  // Runas desenhadas nas páginas
  counterArt.fillStyle(0x7c4dff, 0.8);
  counterArt.fillRect(83, 174, 14, 2); counterArt.fillRect(83, 178, 12, 2); counterArt.fillRect(83, 182, 14, 2);
  counterArt.fillRect(105, 174, 14, 2); counterArt.fillRect(105, 178, 11, 2); counterArt.fillRect(105, 182, 13, 2);

  // B) Frasco de ensaio com poção verde borbulhante e vapores
  counterArt.fillStyle(0x00e676, 0.9).fillCircle(740, 182, 10);
  counterArt.fillStyle(0xffffff, 0.7).fillRect(738, 166, 4, 10);

  // C) Almofariz e pilão com ervas trituradas
  counterArt.fillStyle(0x37474f, 1).fillCircle(805, 184, 10);
  counterArt.fillStyle(0x76ff03, 1).fillCircle(805, 183, 6);
  counterArt.fillStyle(0xb0bec5, 1).fillRect(809, 172, 4, 16);

  // 4. PLACA DE MADEIRA PENDURADA NO TOPO (TÍTULO DO SANTUÁRIO — IMAGEM 4)
  const signGfx = scene.add.graphics();
  signGfx.lineStyle(2, 0x7c4dff, 0.8);
  signGfx.lineBetween(380, 0, 380, 24);
  signGfx.lineBetween(580, 0, 580, 24);

  signGfx.fillStyle(0x22132e, 0.96).fillRoundedRect(330, 16, 300, 44, 8);
  signGfx.lineStyle(2.5, 0x6a1b9a).strokeRoundedRect(330, 16, 300, 44, 8);
  signGfx.lineStyle(1.2, 0xba68c8).strokeRoundedRect(334, 20, 292, 36, 6);
  signGfx.fillStyle(0x00e5ff, 1).fillCircle(342, 28, 2.5).fillCircle(618, 28, 2.5);

  const signTitle = scene.add.text(480, 38, '🔮 SANTUÁRIO ALQUIMISTA 🔮', {
    ...textStyle('#e1bee7', 15), fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);

  // 5. ABAS DE NAVEGAÇÃO ENTRE LOJAS NO TOPO ESQUERDO
  const forgeTabBtn = scene.add.rectangle(85, 28, 110, 28, 0x3d2215)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const forgeTabTxt = scene.add.text(85, 28, '⚔ FORJA REAL', textStyle('#e0c088', 10.5)).setOrigin(0.5);

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

  const mageTabBtn = scene.add.rectangle(205, 28, 110, 28, 0x6a1b9a)
    .setStrokeStyle(1.5, 0xffca28);
  const mageTabTxt = scene.add.text(205, 28, '🔮 SANTUÁRIO', textStyle('#ffffff', 10.5)).setOrigin(0.5);

  // 6. PAINEL DE OURO DO JOGADOR NO TOPO DIREITO
  const goldPouchGfx = scene.add.graphics();
  goldPouchGfx.fillStyle(0x1e150f, 0.96).fillRoundedRect(720, 16, 130, 32, 6);
  goldPouchGfx.lineStyle(2, 0xffca28).strokeRoundedRect(720, 16, 130, 32, 6);
  const coinSprite = scene.add.sprite(738, 32, 'gold_coin').play('gold_coin').setScale(1.2);
  const goldValTxt = scene.add.text(758, 32, `${getGold()}G`, textStyle('#ffd740', 13)).setOrigin(0, 0.5);

  // Botão Sair [ESC]
  const closeQuickBtn = scene.add.rectangle(905, 32, 70, 30, 0x5c241b)
    .setStrokeStyle(1.5, 0xc5a059)
    .setInteractive({ useHandCursor: true });
  const closeQuickTxt = scene.add.text(905, 32, '✕ SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);
  closeQuickBtn.on('pointerover', () => closeQuickBtn.setFillStyle(0x8e2a1b));
  closeQuickBtn.on('pointerout', () => closeQuickBtn.setFillStyle(0x5c241b));
  closeQuickBtn.on('pointerdown', () => exitSubMenu(scene));

  menuContainer.add([
    sanctumArt, mageSprite, speechBubble, mageTitleTxt, mageSpeechTxt,
    counterArt, signGfx, signTitle,
    forgeTabBtn, forgeTabTxt, mageTabBtn, mageTabTxt,
    goldPouchGfx, coinSprite, goldValTxt,
    closeQuickBtn, closeQuickTxt
  ]);

  // 7. SHOWCASE DOS 4 STATUS: CARTAS DE PERGAMINHO MÍSTICO (x: 30, 260, 490, 720)
  const statusUpgrades = getStatusUpgrades();
  const statusKeys = ['maxHp', 'moveSpeed', 'magnet', 'wisdom'];
  const currentGold = getGold();

  const statusDialogues = {
    maxHp: '“O Elixir da Vitalidade do Titã! Cada gota fortalece seu coração para aguentar os golpes mais rudes.”',
    moveSpeed: '“A Poção de Agilidade das Brisas! Seus passos ficarão velozes como o vento entre as árvores.”',
    magnet: '“O Fluido Magnético Arcano! Atrai as moedas de prata e relíquias distantes diretamente até você.”',
    wisdom: '“A Essência da Sabedoria Ancestral! Amplia seu aprendizado acelerando a obtenção de novos níveis!”'
  };

  const cardW = 210;
  const cardH = 266;
  const startY = 250;
  const cardLefts = [30, 260, 490, 720];

  statusKeys.forEach((key, idx) => {
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
      cardGfx.fillStyle(0x000000, 0.4).fillCircle(cx, startY + 5, 5);
      cardGfx.fillStyle(isMax ? 0xffca28 : 0x7c4dff, 1).fillCircle(cx, startY + 4, 3.5);
      cardGfx.fillStyle(0xffffff, 0.8).fillCircle(cx, startY + 4, 1.2);

      // Corpo de pergaminho da carta
      cardGfx.fillStyle(hover ? 0xfff8e7 : (isMax ? 0xfff3cf : 0xf2e4c9), 0.98)
        .fillRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
      // Moldura externa mística
      cardGfx.lineStyle(2, hover ? 0xffca28 : (isMax ? 0xffc107 : 0x6a1b9a))
        .strokeRoundedRect(left, startY + 8, cardW, cardH - 8, 8);
      // Filete interno decorativo
      cardGfx.lineStyle(1, hover ? 0xffd54f : (isMax ? 0xffca28 : 0xba68c8), 0.6)
        .strokeRoundedRect(left + 3, startY + 11, cardW - 6, cardH - 14, 6);

      // Rebites nos 4 cantos da carta
      const corners = [
        [left + 8, startY + 16],
        [left + cardW - 8, startY + 16],
        [left + 8, startY + cardH - 8],
        [left + cardW - 8, startY + cardH - 8]
      ];
      corners.forEach(([rx, ry]) => {
        cardGfx.fillStyle(0x7c4dff, 0.8).fillCircle(rx, ry, 1.8);
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

      // Gemas / Pips de Nível (1 a 5)
      const pipsW = maxLvl * 16;
      const pipsStartX = cx - pipsW / 2 + 4;
      for (let p = 0; p < maxLvl; p++) {
        const px = pipsStartX + p * 16;
        const activePip = p < lvl;
        cardGfx.fillStyle(activePip ? 0x00e5ff : 0x2e1c3b, 1).fillRect(px, startY + 114, 11, 8);
        cardGfx.lineStyle(1, activePip ? 0xffffff : 0x5c3b70).strokeRect(px, startY + 114, 11, 8);
      }
    };
    drawCard(false);

    // Ícone da Poção
    const icon = scene.add.image(cx, startY + 54, cfg.icon).setScale(1.4);

    // Nome do Status
    const nameTxt = scene.add.text(cx, startY + 92, cfg.name, {
      ...textStyle(isMax ? '#794b02' : '#2c1b10', 12),
      fontFamily: 'Georgia, serif'
    }).setOrigin(0.5);
    fitTextToBox(nameTxt, cardW - 16, 18, 9.5);

    // Nível Textual
    const lvlBadgeTxt = scene.add.text(cx, startY + 132, isMax ? 'PODER MÁXIMO ★' : `NÍVEL ${lvl} / ${maxLvl}`, textStyle(isMax ? '#e65100' : '#4a148c', 9.5)).setOrigin(0.5);

    // Descrições de Nível
    const levelDescs = cfg.levels || [];
    const descStr = isMax
      ? `★ Efeito Completo:
${levelDescs[lvl - 1] || ''}`
      : `Atual: ${levelDescs[lvl - 1] || ''}
Próximo: ${levelDescs[lvl] || ''}`;
    const descTxt = scene.add.text(cx, startY + 172, descStr, {
      ...textStyle('#3d2817', 9.5, 'normal'),
      align: 'center',
      lineSpacing: 3,
      wordWrap: { width: cardW - 20, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(descTxt, cardW - 18, 64, 8.5);

    // Botão de Ação no Rodapé
    const btnX = cx, btnY = startY + cardH - 26, btnW = cardW - 24, btnH = 34;
    let actionBtn, actionTxt;

    if (isMax) {
      actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, 0x2e2314).setStrokeStyle(1.5, 0xffca28);
      actionTxt = scene.add.text(btnX, btnY, 'COMPLETO ★', textStyle('#ffd740', 10.5)).setOrigin(0.5);
    } else {
      const cost = cfg.costs ? (cfg.costs[lvl - 1] || 15) : 15;
      const canAfford = currentGold >= cost;

      actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, canAfford ? 0x4a148c : 0x2e1c3b)
        .setStrokeStyle(2, canAfford ? 0xba68c8 : 0x4a2e5c)
        .setInteractive({ useHandCursor: true });
      actionTxt = scene.add.text(btnX, btnY, `AUMENTAR (${cost}G)`, textStyle(canAfford ? '#ffffff' : '#8c7b6b', 10.5)).setOrigin(0.5);
      fitTextToBox(actionTxt, btnW - 8, btnH - 6, 8.5);

      actionBtn.on('pointerdown', () => {
        if (!canAfford) {
          sound.playShieldBlock();
          floatText(scene, btnX, btnY - 20, 'OURO INSUFICIENTE!', '#ff5252');
          return;
        }
        if (spendGold(cost)) {
          const nextLvl = lvl + 1;
          setStatusUpgradeLevel(key, nextLvl);
          sound.playBuy();
          showMageShopMenu(scene);
          floatText(scene, btnX, btnY - 24, `${cfg.name} NÍVEL ${nextLvl}!`, '#7fe7ff');
        }
      });
    }

    // Zona Interativa da Carta (Atualiza Diálogo do Arquimago!)
    const cardHit = scene.add.rectangle(cx, startY + cardH / 2, cardW, cardH, 0x000000, 0)
      .setInteractive({ useHandCursor: true });

    cardHit.on('pointerover', () => {
      drawCard(true);
      mageSpeechTxt.setText(statusDialogues[key] || '“Um elixir de grande sabedoria!”');
    });
    cardHit.on('pointerout', () => {
      drawCard(false);
      mageSpeechTxt.setText('“Beba dos meus elixires e seu poder ecoará em cada batalha!”');
    });

    menuContainer.add([cardGfx, icon, nameTxt, lvlBadgeTxt, descTxt, actionBtn, actionTxt, cardHit]);
  });

  // 8. TECLA DE ATALHO ESC & TAB
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

    if (typeof window === 'undefined') return false;
    const hasTouch = (
      'ontouchstart' in window ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0)
    );
    const isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return hasTouch && (isCoarse || isMobileUA || window.innerWidth <= 1024);
  }

  init() {
    if (!this.scene) return;

    // Container principal fixado na câmera (setScrollFactor 0) e sob profundidade de HUD
    this.container = this.scene.add.container(0, 0).setDepth(2400).setScrollFactor(0);

    // Gráficos do Joystick: Linha de tensão, Base Rúnica Fixa e Pino Central Nobre
    this.lineGraphics = this.scene.add.graphics();
    this.baseGraphics = this.scene.add.graphics();
    this.knobGraphics = this.scene.add.graphics();

    this.container.add([this.lineGraphics, this.baseGraphics, this.knobGraphics]);

    this.drawBase(false);
    this.drawKnob(false);

    // Ouvintes de Toque com suporte a Multi-Touch
    this.setupTouchListeners();

    // Detecção dinâmica de primeiro toque para telas touch híbridas
    if (typeof window !== 'undefined') {
      const onFirstTouch = () => {
        if (typeof getJoystickMode === 'function' && getJoystickMode() !== 'disabled') {
          this.isMobile = true;
          this.updateVisibility();
        }
      };
      window.addEventListener('touchstart', onFirstTouch, { once: true, passive: true });
    }

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
    if (this.visible === show) return;
    this.visible = show;
    if (this.container) this.container.setVisible(show);
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
  makeSheet(this, 'blacksmith_master', 44, 44, 2, drawBlacksmithMaster);
  makeSheet(this, 'mage_master', 44, 44, 2, drawMageMaster);
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
    blacksmith_master: { fps: 3, frames: 2 },
    mage_master: { fps: 3, frames: 2 }
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

  // Tecla ESPAÇO para Golpe/Ação manual imediata no Desktop
  scene.input.keyboard.on('keydown-SPACE', () => {
    if (gameState === 'PLAYING' && !pauseModal && !draftModal) {
      if (typeof triggerPlayerAction === 'function') {
        triggerPlayerAction(scene);
      }
    }
  });

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



