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
    unlockedDefault: true,
    unlockCost: 0,
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
    unlockCost: 25,
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
    unlockCost: 45,
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
