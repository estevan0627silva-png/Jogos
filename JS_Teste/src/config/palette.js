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
