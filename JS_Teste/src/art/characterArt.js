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

