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
    forgeLore: 'Arco Élfico da Guarda Real.\nDispara flechas luminosas de alta precisão que atravessam a escuridão e abatem inimigos antes que se aproximem.',
    levels: [
      { badge: 'NV.1 DISPARO CERTEIRO', desc: 'Dano: 0 ➔ 15 | Vel. Ataque: 100% | Duração: 12.0s', toString() { return this.desc; } },
      { badge: 'NV.2 CORDA TENSIONADA', desc: 'Dano: 15 ➔ 18 | Vel. Ataque: 100% ➔ 116% | Duração: 12.0s ➔ 13.4s', toString() { return this.desc; } },
      { badge: 'NV.3 SARAIVADA VELOZ', desc: 'Dano: 18 ➔ 22 | Vel. Ataque: 116% ➔ 135% | Duração: 13.4s ➔ 14.9s', toString() { return this.desc; } },
      { badge: 'NV.4 FUSILAMENTO REAL', desc: 'Dano: 22 ➔ 25 | Vel. Ataque: 135% ➔ 156% | Duração: 14.9s ➔ 16.3s', toString() { return this.desc; } },
      { badge: 'NV.5 TEMPESTADE REAL', desc: 'Dano: 25 ➔ 28 | Vel. Ataque: 156% ➔ 181% | Duração: 16.3s ➔ 17.8s', toString() { return this.desc; } }
    ]
  },
  sword: {
    name: 'ESPADA VORPAL',
    category: 'HERANÇA DE AÇO',
    icon: 'item_sword',
    unlockedDefault: true,
    unlockCost: 0,
    maxLevel: Infinity,
    forgeLore: 'Lâmina Ancestral de Aço Puro.\nDesfere arcos cortantes reluzentes que varrem múltiplos monstros de uma só vez e abrem caminho na horda.',
    levels: [
      { badge: 'NV.1 CORTE NOBRE', desc: 'Dano: 0 ➔ 20 | Tamanho: 100% | Duração: 10.0s', toString() { return this.desc; } },
      { badge: 'NV.2 FIO EXPANDIDO', desc: 'Dano: 20 ➔ 24 | Tamanho: 100% ➔ 126% | Duração: 10.0s ➔ 11.2s', toString() { return this.desc; } },
      { badge: 'NV.3 CORTE COLOSSAL', desc: 'Dano: 24 ➔ 29 | Tamanho: 126% ➔ 152% | Duração: 11.2s ➔ 12.4s', toString() { return this.desc; } },
      { badge: 'NV.4 FÚRIA VORPAL', desc: 'Dano: 29 ➔ 33 | Tamanho: 152% ➔ 178% | Duração: 12.4s ➔ 13.6s', toString() { return this.desc; } },
      { badge: 'NV.5 COLOSSO SUPREMO', desc: 'Dano: 33 ➔ 38 | Tamanho: 178% ➔ 204% | Duração: 13.6s ➔ 14.8s', toString() { return this.desc; } }
    ]
  },
  shield: {
    name: 'ESCUDO SAGRADO',
    category: 'BALUARTE SAGRADO',
    icon: 'item_shield',
    unlockedDefault: false,
    unlockCost: 30,
    maxLevel: Infinity,
    forgeLore: 'Relíquia Dourada dos Paladinos.\nErgue uma barreira divina impenetrável que esmaga inimigos próximos e reflete projéteis de volta aos atacantes.',
    levels: [
      { badge: 'NV.1 ÉGIDE BÁSICA', desc: 'Dano: 0 ➔ 12 | Tamanho: 100% | Duração: 8.0s', toString() { return this.desc; } },
      { badge: 'NV.2 ÉGIDE REFORÇADA', desc: 'Dano: 12 ➔ 15 | Tamanho: 100% ➔ 115% | Duração: 8.0s ➔ 9.0s', toString() { return this.desc; } },
      { badge: 'NV.3 ESPELHO DIVINO', desc: 'Dano: 15 ➔ 17 | Tamanho: 115% ➔ 130% | Duração: 9.0s ➔ 9.9s', toString() { return this.desc; } },
      { badge: 'NV.4 BALUARTE REAL', desc: 'Dano: 17 ➔ 20 | Tamanho: 130% ➔ 145% | Duração: 9.9s ➔ 10.9s', toString() { return this.desc; } },
      { badge: 'NV.5 ÉGIDE ETERNA', desc: 'Dano: 20 ➔ 23 | Tamanho: 145% ➔ 160% | Duração: 10.9s ➔ 11.8s', toString() { return this.desc; } }
    ]
  },
  axe: {
    name: 'MACHADO BUMERANGUE',
    category: 'FORÇA RÚNICA',
    icon: 'item_axe',
    unlockedDefault: false,
    unlockCost: 40,
    maxLevel: Infinity,
    forgeLore: 'Machado de Guerra dos Berserkers.\nGira em um turbilhão brutal de 360 graus ao redor do herói, arremessando hordas inteiras para longe.',
    levels: [
      { badge: 'NV.1 GOLPE RÚNICO', desc: 'Dano: 0 ➔ 22 | Empurrão: 100% | Duração: 10.0s', toString() { return this.desc; } },
      { badge: 'NV.2 IMPACTO PESADO', desc: 'Dano: 22 ➔ 27 | Empurrão: 100% ➔ 135% | Duração: 10.0s ➔ 11.2s', toString() { return this.desc; } },
      { badge: 'NV.3 REPULSÃO SÍSMICA', desc: 'Dano: 27 ➔ 32 | Empurrão: 135% ➔ 170% | Duração: 11.2s ➔ 12.4s', toString() { return this.desc; } },
      { badge: 'NV.4 CHOQUE ESMAGADOR', desc: 'Dano: 32 ➔ 37 | Empurrão: 170% ➔ 205% | Duração: 12.4s ➔ 13.6s', toString() { return this.desc; } },
      { badge: 'NV.5 FÚRIA DOS TITÃS', desc: 'Dano: 37 ➔ 41 | Empurrão: 205% ➔ 240% | Duração: 13.6s ➔ 14.8s', toString() { return this.desc; } }
    ]
  },
  firestaff: {
    name: 'CAJADO DE FOGO',
    category: 'CANALIZAÇÃO SOLAR',
    icon: 'item_firestaff',
    unlockedDefault: false,
    unlockCost: 20,
    maxLevel: Infinity,
    forgeLore: 'Cetro Forjado em Rocha Vulcânica.\nConjura esferas ardentes que explodem ao contato, consumindo grupos inteiros de criaturas em chamas.',
    levels: [
      { badge: 'NV.1 ORBE SOLAR', desc: 'Dano: 0 ➔ 18 | Explosão: 100% | Duração: 10.0s', toString() { return this.desc; } },
      { badge: 'NV.2 BRASA VIVA', desc: 'Dano: 18 ➔ 22 | Explosão: 100% ➔ 122% | Duração: 10.0s ➔ 11.2s', toString() { return this.desc; } },
      { badge: 'NV.3 LABAREDA INTENSA', desc: 'Dano: 22 ➔ 26 | Explosão: 122% ➔ 144% | Duração: 11.2s ➔ 12.4s', toString() { return this.desc; } },
      { badge: 'NV.4 INFERNO VORAZ', desc: 'Dano: 26 ➔ 30 | Explosão: 144% ➔ 166% | Duração: 12.4s ➔ 13.6s', toString() { return this.desc; } },
      { badge: 'NV.5 CATACLISMO SOLAR', desc: 'Dano: 30 ➔ 34 | Explosão: 166% ➔ 188% | Duração: 13.6s ➔ 14.8s', toString() { return this.desc; } }
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
      { badge: 'NV.1 (+1 PROJÉTIL)', desc: 'LV-1: +1 Projétil/Lâmina Extra (Total: +1 em todas as armas).', toString() { return this.desc; } },
      { badge: 'NV.2 (+2 PROJÉTEIS)', desc: 'LV-2: +1 Projétil/Lâmina Extra (Total: +2 em todas as armas).', toString() { return this.desc; } },
      { badge: 'NV.3 (+3 PROJÉTEIS)', desc: 'LV-3: +1 Projétil/Lâmina Extra (Total: +3 em todas as armas).', toString() { return this.desc; } },
      { badge: 'NV.4 (+4 PROJÉTEIS)', desc: 'LV-4: +1 Projétil/Lâmina Extra (Total: +4 em todas as armas).', toString() { return this.desc; } },
      { badge: 'NV.5 (+5 PROJÉTEIS)', desc: 'LV-5: +1 Projétil/Lâmina Extra (Total: +5 em todas as armas)!', toString() { return this.desc; } }
    ]
  },
  growth: {
    id: 'growth',
    name: 'CRESCIMENTO',
    shortName: 'CRESCIMENTO',
    icon: 'scroll_growth',
    maxLevel: 5,
    levels: [
      { badge: 'NV.1 (+22% ÁREA)', desc: 'LV-1: +22% Área de Ataque (Total: +22% em todas as armas).', toString() { return this.desc; } },
      { badge: 'NV.2 (+44% ÁREA)', desc: 'LV-2: +22% Área de Ataque (Total: +44% em todas as armas).', toString() { return this.desc; } },
      { badge: 'NV.3 (+66% ÁREA)', desc: 'LV-3: +22% Área de Ataque (Total: +66% em todas as armas).', toString() { return this.desc; } },
      { badge: 'NV.4 (+88% ÁREA)', desc: 'LV-4: +22% Área de Ataque (Total: +88% em todas as armas).', toString() { return this.desc; } },
      { badge: 'NV.5 (+110% ÁREA)', desc: 'LV-5: +22% Área de Ataque (Total: +110% em todas as armas)!', toString() { return this.desc; } }
    ]
  },
  attackspeed: {
    id: 'attackspeed',
    name: 'VEL. DE ATAQUE',
    shortName: 'VEL. ATAQUE',
    icon: 'scroll_speed',
    maxLevel: 5,
    levels: [
      { badge: 'NV.1 (+18% CADÊNCIA)', desc: 'LV-1: +18% Velocidade de Ataque (Total: +18% Cadência).', toString() { return this.desc; } },
      { badge: 'NV.2 (+36% CADÊNCIA)', desc: 'LV-2: +18% Velocidade de Ataque (Total: +36% Cadência).', toString() { return this.desc; } },
      { badge: 'NV.3 (+54% CADÊNCIA)', desc: 'LV-3: +18% Velocidade de Ataque (Total: +54% Cadência).', toString() { return this.desc; } },
      { badge: 'NV.4 (+72% CADÊNCIA)', desc: 'LV-4: +18% Velocidade de Ataque (Total: +72% Cadência).', toString() { return this.desc; } },
      { badge: 'NV.5 (+90% CADÊNCIA)', desc: 'LV-5: +18% Velocidade de Ataque (Total: +90% Cadência)!', toString() { return this.desc; } }
    ]
  },
  duration: {
    id: 'duration',
    name: 'DURAÇÃO ESTENDIDA',
    shortName: 'DURAÇÃO',
    icon: 'hud_hourglass',
    maxLevel: 10,
    levels: [
      { badge: 'NV.1 (+1.5S DURAÇÃO)', desc: 'LV-1: +1.5s Duração das Armas (Total: +1.5s em campo).', toString() { return this.desc; } },
      { badge: 'NV.2 (+3.0S DURAÇÃO)', desc: 'LV-2: +1.5s Duração das Armas (Total: +3.0s em campo).', toString() { return this.desc; } },
      { badge: 'NV.3 (+4.5S DURAÇÃO)', desc: 'LV-3: +1.5s Duração das Armas (Total: +4.5s em campo).', toString() { return this.desc; } },
      { badge: 'NV.4 (+6.0S DURAÇÃO)', desc: 'LV-4: +1.5s Duração das Armas (Total: +6.0s em campo).', toString() { return this.desc; } },
      { badge: 'NV.5 (+7.5S DURAÇÃO)', desc: 'LV-5: +1.5s Duração das Armas (Total: +7.5s em campo)!', toString() { return this.desc; } }
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
    maxLevel: 6,
    costs: [10, 20, 40, 80, 160, 0],
    values: [1, 2, 3, 4, 5, 6],
    levels: [
      'LV-1: 1 Coração (Suporta 1 golpe)',
      'LV-2: 2 Corações (+1 Vida | 2 golpes)',
      'LV-3: 3 Corações (+1 Vida | 3 golpes)',
      'LV-4: 4 Corações (+1 Vida | 4 golpes)',
      'LV-5: 5 Corações (+1 Vida | 5 golpes)',
      'LV-6: 6 Corações (+1 Vida | 6 golpes)!'
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
      'LV-1: 280 px/s (Velocidade Base)',
      'LV-2: 304 px/s (+24 px/s | +9%)',
      'LV-3: 328 px/s (+24 px/s | +17%)',
      'LV-4: 352 px/s (+24 px/s | +26%)',
      'LV-5: 380 px/s (+28 px/s | +36%)!'
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
      'LV-1: Raio 90 px (Alcance Base)',
      'LV-2: Raio 135 px (+45 px | +50%)',
      'LV-3: Raio 185 px (+50 px | +105%)',
      'LV-4: Raio 240 px (+55 px | +166%)',
      'LV-5: Raio 310 px (+70 px | +244%)!'
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
      'LV-1: XP 100% (Base) | +0.0s Dur.',
      'LV-2: XP 115% (+15%) | +0.6s Dur.',
      'LV-3: XP 130% (+15%) | +1.2s Dur.',
      'LV-4: XP 145% (+15%) | +1.8s Dur.',
      'LV-5: XP 165% (+20%) | +2.5s Dur.!'
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