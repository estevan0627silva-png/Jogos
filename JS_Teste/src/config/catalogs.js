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

// =============================================================================
