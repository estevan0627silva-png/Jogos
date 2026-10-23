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
// 100% CARECA (DOME REDONDO DEFINIDO), ROSTO SÓLIDO SEM FALHAS, GRANDE BARBÃO RUIVO
// E BRAÇOS MUSCULOSOS APOIADOS NO BALCÃO COM MUNHEQUEIRAS (ZERO MARTELO FLUTUANDO)
// =============================================================================
function drawBlacksmithMaster(r, f) {
  const bob = (f === 1 || f === 2) ? 1 : 0;
  const glint = (f === 2) ? 1 : 0;

  // 1. CABEÇA CARECA ROBUSTA (CENTRO EM x: 11.5 — DOME REDONDO, ROSTO SÓLIDO SEM FALHAS)
  // Contorno superior e curvatura do crânio calvo
  r(0x663318, 9, 2 + bob, 6, 1);   // x: 9..14, y: 2 (topo do domo calvo)
  r(0x7a4522, 8, 3 + bob, 8, 1);   // x: 8..15, y: 3 (curvatura da cabeça)
  r(0x8c5731, 7, 4 + bob, 10, 1);  // x: 7..16, y: 4 (têmporas)

  // Preenchimento contínuo e sólido da pele facial (elimina 100% de quaisquer pixels transparentes)
  r(0xc68b59, 7, 4 + bob, 10, 4);  // x: 7..16, y: 4..7 (base de pele totalmente sólida da cabeça e bochechas)

  // Iluminação térmica suave e reflexo especular no topo da careca
  r(0xf1c27d, 9, 3 + bob, 6, 2);   // luz quente no crânio calvo
  r(0xffebd2, 11, 3 + bob, 2, 1);  // ponto alto de brilho especular nítido

  // Orelhas de anão nas laterais (y: 5..7)
  r(0x8c5731, 6, 5 + bob, 1, 3);   // orelha esquerda x: 6
  r(0xc68b59, 6, 6 + bob, 1, 1);   // relevo interno da orelha esquerda
  r(0x8c5731, 17, 5 + bob, 1, 3);  // orelha direita x: 17
  r(0xc68b59, 17, 6 + bob, 1, 1);  // relevo interno da orelha direita

  // Sobrancelhas ruivas grossas e determinadas de ferreiro (y: 5)
  r(0x6a1a08, 8, 5 + bob, 3, 1);   // sobrancelha esquerda base
  r(0xa83810, 8, 5 + bob, 2, 1);
  r(0xc44516, 9, 5 + bob, 1, 1);   // mecha ruiva de destaque
  r(0x6a1a08, 13, 5 + bob, 3, 1);  // sobrancelha direita base
  r(0xa83810, 14, 5 + bob, 2, 1);
  r(0xc44516, 14, 5 + bob, 1, 1);  // mecha ruiva de destaque

  // Olhos expressivos e focados com reflexo vívido (y: 6)
  r(0x1a1410, 8, 6 + bob, 2, 1);   // olho esquerdo
  r(0xffffff, 9, 6 + bob, 1, 1);   // brilho branco no olho esquerdo
  r(0x1a1410, 14, 6 + bob, 2, 1);  // olho direito
  r(0xffffff, 14, 6 + bob, 1, 1);  // brilho branco no olho direito

  // Nariz largo proeminente e bochechas coradas pelo calor da forja (y: 6..7 — 100% preenchido)
  r(0xdf845d, 7, 7 + bob, 3, 1);   // bochecha esquerda corada (x: 7..9)
  r(0xdf845d, 14, 7 + bob, 3, 1);  // bochecha direita corada (x: 14..16)
  r(0x8c5731, 10, 7 + bob, 1, 1);  // sombreamento da asa nasal esquerda
  r(0x8c5731, 13, 7 + bob, 1, 1);  // sombreamento da asa nasal direita
  r(0xc68b59, 11, 6 + bob, 2, 2);  // corpo do nariz largo (x: 11..12, y: 6..7)
  r(0xf1c27d, 11, 6 + bob, 1, 1);  // brilho na ponta do nariz

  // 2. BIGODE IMPONENTE E CURVADO (x: 6..17, y: 8..9)
  r(0x521204, 7, 8 + bob, 10, 2);  // base escura do bigode sobre a boca
  r(0x82260a, 7, 8 + bob, 10, 1);
  r(0xa83810, 8, 8 + bob, 8, 1);
  r(0xdf5a1e, 9, 8 + bob, 6, 1);   // mecha central vívida do bigode
  // Pontas volumosas do bigode curvando para fora nas laterais
  r(0x82260a, 6, 9 + bob, 2, 1);   // ponta esquerda
  r(0xa83810, 6, 9 + bob, 1, 1);
  r(0x82260a, 16, 9 + bob, 2, 1);  // ponta direita
  r(0xa83810, 17, 9 + bob, 1, 1);

  // 3. O GRANDE "BARBÃO" DE ANÃO (x: 4..19, y: 9..24 — MASSIVO, TEXTURIZADO E ÉPICO)
  // y = 9: transição da mandíbula para o barbão (x: 6..17)
  r(0x521204, 6, 9 + bob, 12, 1);
  r(0x82260a, 7, 9 + bob, 10, 1);

  // y = 10..13: expansão em volume máximo sobre o peito (x: 4..19, largura 16!)
  r(0x521204, 5, 10 + bob, 14, 1);
  r(0x82260a, 6, 10 + bob, 12, 1);
  r(0xa83810, 7, 10 + bob, 10, 1);
  r(0xc44516, 8, 10 + bob, 8, 1);

  r(0x521204, 4, 11 + bob, 16, 1);
  r(0x82260a, 5, 11 + bob, 14, 1);
  r(0xa83810, 6, 11 + bob, 12, 1);
  r(0xc44516, 7, 11 + bob, 10, 1);
  r(0xdf5a1e, 9, 11 + bob, 6, 1);   // mecha frontal viva

  r(0x521204, 4, 12 + bob, 16, 1);
  r(0x82260a, 5, 12 + bob, 14, 1);
  r(0xa83810, 6, 12 + bob, 12, 1);
  r(0xc44516, 8, 12 + bob, 8, 1);
  r(0xfa7a28, 10, 12 + bob, 4, 1);  // brilho do fogo nas mechas da barba

  r(0x521204, 4, 13 + bob, 16, 1);
  r(0x82260a, 5, 13 + bob, 14, 1);
  r(0xa83810, 7, 13 + bob, 10, 1);
  r(0xc44516, 8, 13 + bob, 8, 1);

  // y = 14..15: corpo da barba encorpada (x: 5..18)
  r(0x521204, 5, 14 + bob, 14, 2);
  r(0x82260a, 6, 14 + bob, 12, 2);
  r(0xa83810, 7, 14 + bob, 10, 2);
  r(0xc44516, 9, 14 + bob, 6, 2);

  // y = 16..17: tranças laterais com anéis dourados rúnicos
  r(0x521204, 6, 16 + bob, 12, 2);
  r(0x82260a, 7, 16 + bob, 10, 2);
  r(0xa83810, 8, 16 + bob, 8, 2);
  // Anel de ouro na trança esquerda (x: 6..8, y: 16)
  r(0x785600, 6, 16 + bob, 3, 1);
  r(0xffd700, 6, 16 + bob, 2, 1);
  r(0xffeb3b, 7, 16 + bob, 1, 1);
  // Anel de ouro na trança direita (x: 15..17, y: 16)
  r(0x785600, 15, 16 + bob, 3, 1);
  r(0xffd700, 16, 16 + bob, 2, 1);
  r(0xffeb3b, 16, 16 + bob, 1, 1);

  // y = 18: confluência da barba central (x: 7..16)
  r(0x521204, 7, 18 + bob, 10, 1);
  r(0x82260a, 8, 18 + bob, 8, 1);
  r(0xa83810, 9, 18 + bob, 6, 1);
  r(0xc44516, 10, 18 + bob, 4, 1);

  // y = 19: GRANDE ANEL DE FORJA DOURADO PRENDENDO O BARBÃO (x: 8..15)
  r(0x785600, 8, 19 + bob, 8, 1);
  r(0xffd700, 9, 19 + bob, 6, 1);
  r(glint ? 0xffffff : 0xffeb3b, 11, 19 + bob, 2, 1); // brilho no fecho dourado

  // y = 20..22: Ponta volumosa do barbão fluindo sob o grande anel (x: 8..15)
  r(0x521204, 8, 20 + bob, 8, 2);
  r(0x82260a, 9, 20 + bob, 6, 2);
  r(0xa83810, 10, 20 + bob, 4, 2);
  r(0xc44516, 11, 20 + bob, 2, 2);

  // y = 23..24: ponta cônica e majestosa da barba longa (x: 10..13)
  r(0x521204, 10, 23 + bob, 4, 1);
  r(0x82260a, 11, 23 + bob, 2, 1);
  r(0x521204, 11, 24 + bob, 2, 1);

  // 4. OMBROS LARGOS, TÚNICA E AVENTAL DE COURO (ATRÁS DA BARBA)
  // Ombros e mangas de tecido resistente cinza-escuro
  r(0x2d3038, 2, 10 + bob, 4, 4);   // ombro esquerdo x: 2..5, y: 10..13
  r(0x424650, 3, 10 + bob, 3, 3);
  r(0x2d3038, 18, 10 + bob, 4, 4);  // ombro direito x: 18..21, y: 10..13
  r(0x424650, 18, 10 + bob, 3, 3);

  // Avental de couro de forja pesado
  r(0x3e2311, 5, 10 + bob, 14, 11);
  r(0x5c3a1b, 6, 11 + bob, 12, 10);
  // Alças reforçadas de couro com fivelas de latão
  r(0x28160a, 5, 10 + bob, 2, 9);   // alça esquerda
  r(0x28160a, 17, 10 + bob, 2, 9);  // alça direita
  r(0xc5a059, 5, 13 + bob, 2, 1);   // fivela esquerda
  r(0xc5a059, 17, 13 + bob, 2, 1);  // fivela direita

  // Cinto de ferramentas de couro com fivela forjada (y: 21..22)
  r(0x1e1208, 4, 21 + bob, 16, 2);
  r(0x785600, 10, 21 + bob, 4, 2);
  r(0xffd700, 11, 21 + bob, 2, 2);  // fivela dourada

  // 5. BRAÇO ESQUERDO: ANTEBRAÇO MUSCULOSO APOIADO NO BALCÃO COM MUNHEQUEIRA
  r(0x8c5731, 2, 14 + bob, 3, 4);   // x: 2..4, y: 14..17 antebraço musculoso
  r(0xc68b59, 2, 15 + bob, 2, 3);
  r(0xf1c27d, 3, 15 + bob, 1, 2);   // relevo muscular
  r(0x2b180d, 2, 18 + bob, 3, 2);   // munhequeira de couro escuro
  r(0xffca28, 3, 18 + bob, 1, 1);   // rebite de latão na munhequeira
  r(0xc68b59, 2, 20 + bob, 3, 2);   // punho/mão apoiada com firmeza no balcão
  r(0x8c5731, 2, 20 + bob, 1, 2);

  // 6. BRAÇO DIREITO: ANTEBRAÇO MUSCULOSO APOIADO NO BALCÃO (SIMÉTRICO — ZERO MARTELO FLUTUANDO!)
  r(0x8c5731, 19, 14 + bob, 3, 4);  // x: 19..21, y: 14..17 antebraço musculoso
  r(0xc68b59, 20, 15 + bob, 2, 3);
  r(0xf1c27d, 20, 15 + bob, 1, 2);  // relevo muscular
  r(0x2b180d, 19, 18 + bob, 3, 2);  // munhequeira de couro escuro
  r(0xffca28, 20, 18 + bob, 1, 1);  // rebite de latão na munhequeira
  r(0xc68b59, 19, 20 + bob, 3, 2);  // punho/mão apoiada com firmeza no balcão
  r(0x8c5731, 21, 20 + bob, 1, 2);
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

