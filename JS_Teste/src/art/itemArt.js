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
