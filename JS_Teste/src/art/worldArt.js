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

