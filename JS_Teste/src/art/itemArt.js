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

