// =============================================================================
// CATÁLOGOS DE EQUIPAMENTOS, STATUS E CONQUISTAS
// =============================================================================
const WEAPON_CATALOG = {
  bow: {
    name: 'ARCO REAL',
    icon: 'item_bow',
    unlockedDefault: true,
    unlockCost: 0,
    maxLevel: 5,
    forgeLore: 'Arco de teixo real. Projétil veloz com cadência escalável a cada nível.',
    levels: [
      'Nv.1 (Base): 1 flecha precisa (500ms, 1 dano, 0 knockback).',
      'Nv.2: Corda Tensionada — Cadência aprimorada (410ms, 1 dano).',
      'Nv.3: Fôlego Ágil — Cadência veloz (330ms, 1 dano).',
      'Nv.4: Disparo Rápido — Cadência fulminante (260ms, 1 dano).',
      'Nv.5 (MÁX): Tempestade de Flechas — Cadência máxima a cada 200ms (1 dano)!'
    ]
  },
  sword: {
    name: 'ESPADA VORPAL',
    icon: 'item_sword',
    unlockedDefault: true,
    unlockCost: 0,
    maxLevel: 5,
    forgeLore: 'Lâmina nobre de aço temperado. Possui knockback ativo e área crescente.',
    levels: [
      'Nv.1 (Base): Corte inicial equilibrado (área 1.00x, 1 dano, 480ms, knockback ativo).',
      'Nv.2: Fio Expandido — Área 1.24x (+24% de raio e alcance do corte).',
      'Nv.3: Lâmina Ampla — Área 1.48x (+48% de cobertura de corte frontal).',
      'Nv.4: Fúria Vorpal — Área 1.72x (+72% de área cortante).',
      'Nv.5 (MÁX): Colosso Vorpal — Área 1.96x (+96% de varredura colossal)!'
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
    forgeLore: 'Machado duplo pesado. Corta em arco de retorno com knockback repulsor escalável.',
    levels: [
      'Nv.1 (Base): 1 machado bumerangue (1 dano, 560ms, knockback base 28px).',
      'Nv.2: Impacto Pesado — Knockback 44px (+16px de força de empurrão).',
      'Nv.3: Golpe Sísmico — Knockback 62px (+34px de força de empurrão).',
      'Nv.4: Repulsão Rúnica — Knockback 82px (+54px de força de empurrão).',
      'Nv.5 (MÁX): Fúria dos Titãs — Knockback 105px (arremesso massivo de inimigos)!'
    ]
  },
  firestaff: {
    name: 'CAJADO DE FOGO',
    icon: 'item_firestaff',
    unlockedDefault: false,
    unlockCost: 45,
    maxLevel: 5,
    forgeLore: 'Cetro ardente. Lança orbes solares que explodem e deixam poças de fogo que danificam apenas monstros.',
    levels: [
      'Nv.1 (Base): Orbe solar com explosão e poça de fogo (raio 45px, 1 dano, 600ms, 0 knockback).',
      'Nv.2: Brasa Alastrada — Raio 62px de explosão e poça ardente no chão.',
      'Nv.3: Labareda Intensa — Raio 80px de explosão e poça de fogo contínua.',
      'Nv.4: Inferno Crescente — Raio 100px de explosão e poça de fogo massiva.',
      'Nv.5 (MÁX): Cataclismo Solar — Raio 125px de explosão devastadora e mar de chamas no solo!'
    ]
  }
};

// Catálogo do Sistema de Pergaminhos Arcanos (Escolha Única por partida, até Nível 5)
const SCROLL_CATALOG = {
  multishot: {
    id: 'multishot',
    name: 'DISPARO MÚLTIPLO',
    shortName: 'MULTI-SHOT',
    icon: 'scroll_multishot',
    maxLevel: 5,
    levels: [
      'Nv.1: +1 Projétil / Onda de Vento cortante em todos os ataques.',
      'Nv.2: +2 Projéteis / Ondas cortantes adicionais.',
      'Nv.3: +3 Projéteis / Ondas cortantes em leque.',
      'Nv.4: +4 Projéteis / Saraivada cortante contínua.',
      'Nv.5 (MÁX): +5 Projéteis / Chuva maciça de projéteis e cortes!'
    ]
  },
  growth: {
    id: 'growth',
    name: 'CRESCIMENTO',
    shortName: 'CRESCIMENTO',
    icon: 'scroll_growth',
    maxLevel: 5,
    levels: [
      'Nv.1: +20% de tamanho/área em todos os ataques e poças de fogo.',
      'Nv.2: +40% de tamanho/área em todos os ataques e poças de fogo.',
      'Nv.3: +65% de tamanho/área em todos os ataques e poças de fogo.',
      'Nv.4: +90% de tamanho/área em todos os ataques e poças de fogo.',
      'Nv.5 (MÁX): +120% de tamanho/área titânica em todos os ataques!'
    ]
  },
  attackspeed: {
    id: 'attackspeed',
    name: 'VEL. DE ATAQUE',
    shortName: 'VEL. ATAQUE',
    icon: 'scroll_speed',
    maxLevel: 5,
    levels: [
      'Nv.1: +15% de velocidade de ataque (cadência mais rápida).',
      'Nv.2: +30% de velocidade de ataque em todas as armas.',
      'Nv.3: +45% de velocidade de ataque em todas as armas.',
      'Nv.4: +60% de velocidade de ataque em todas as armas.',
      'Nv.5 (MÁX): +80% de velocidade de ataque frenética!'
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
