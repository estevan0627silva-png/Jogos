const fs = require('fs');

let code = fs.readFileSync('JS_Teste/src/ui/modals.js', 'utf8');

// Replace createButton
const oldCreateBtn = `function createButton(scene, x, y, label, onClick, w = 260, h = 46) {
  const btn = scene.add.rectangle(x, y, w, h, 0x5a3118).setStrokeStyle(2, 0xc5a059).setInteractive({ useHandCursor: true });
  const txt = scene.add.text(x, y, label, { ...textStyle('#ffffff', 14), fontFamily: 'Georgia, serif' }).setOrigin(0.5);
  fitTextToBox(txt, w - 16, h - 8, 10);

  btn.on('pointerover', () => {
    btn.setFillStyle(0x8a4b22);
    btn.setStrokeStyle(2, 0xffeb3b);
    txt.setColor('#ffeb3b');
  });
  btn.on('pointerout', () => {
    btn.setFillStyle(0x5a3118);
    btn.setStrokeStyle(2, 0xc5a059);
    txt.setColor('#ffffff');
  });
  btn.once('pointerdown', () => {
    sound.playButtonClick();
    onClick();
  });
  return [btn, txt];
}`;

const newCreateBtn = `function createButton(scene, x, y, label, onClick, w = 260, h = 46) {
  const btn = scene.add.rectangle(x, y, w, h, 0x5a3118).setStrokeStyle(2, 0xc5a059).setInteractive({ useHandCursor: true });
  const txt = scene.add.text(x, y, label, buttonTextStyle('#ffffff', 13.5)).setOrigin(0.5);
  fitTextToBox(txt, w - 16, h - 8, 10);

  btn.on('pointerover', () => {
    btn.setFillStyle(0x8a4b22);
    btn.setStrokeStyle(2, 0xffeb3b);
    txt.setColor('#ffeb3b');
  });
  btn.on('pointerout', () => {
    btn.setFillStyle(0x5a3118);
    btn.setStrokeStyle(2, 0xc5a059);
    txt.setColor('#ffffff');
  });
  btn.once('pointerdown', () => {
    sound.playButtonClick();
    onClick();
  });
  return [btn, txt];
}`;

// Replace createModal
const oldCreateModal = `function createModal(scene, titleText, height, subtitleText = '', width = 520) {
  const cx = GAME_WIDTH / 2;
  const cy = GAME_HEIGHT / 2;
  const left = cx - width / 2;
  const top = cy - height / 2;
  const overlay = scene.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.76);

  const frame = scene.add.graphics();
  // Fundo em couro / madeira nobre
  frame.fillStyle(0x14100c, 0.98).fillRoundedRect(left, top, width, height, 12);
  // Moldura externa em ferro forjado
  frame.lineStyle(3, 0x3d2b1f).strokeRoundedRect(left, top, width, height, 12);
  // Moldura secundária em ouro nobre
  frame.lineStyle(1.5, 0xc5a059, 0.9).strokeRoundedRect(left + 4, top + 4, width - 8, height - 8, 9);
  // Filete interno delicado
  frame.lineStyle(1, 0x8d5524, 0.5).strokeRoundedRect(left + 8, top + 8, width - 16, height - 16, 7);

  // Rebites de ouro com sombra nos 4 cantos (Image 1 UI Kit)
  const rOff = 14;
  [
    [left + rOff, top + rOff],
    [left + width - rOff, top + rOff],
    [left + rOff, top + height - rOff],
    [left + width - rOff, top + height - rOff]
  ].forEach(([rx, ry]) => {
    frame.fillStyle(0xc5a059, 1).fillCircle(rx, ry, 3.5);
    frame.fillStyle(0x2a1a0e, 1).fillCircle(rx, ry, 1.5);
  });

  // Brasão ornamental / floreio central no topo (Inspirado nas Imagens 1 e 3)
  frame.fillStyle(0xc5a059, 1);
  frame.fillTriangle(cx, top - 8, cx - 18, top + 4, cx + 18, top + 4);
  frame.fillCircle(cx, top - 8, 3.5);
  frame.fillStyle(0x14100c, 1);
  frame.fillCircle(cx, top - 8, 1.5);
  // Asas / floreios laterais do brasão
  frame.lineStyle(2, 0xc5a059, 0.9);
  frame.lineBetween(cx - 22, top + 3, cx - 48, top + 3);
  frame.lineBetween(cx + 22, top + 3, cx + 48, top + 3);
  frame.fillStyle(0xc5a059, 1).fillCircle(cx - 48, top + 3, 2.5).fillCircle(cx + 48, top + 3, 2.5);

  const titleShadow = scene.add.text(cx + 2, top + 32, titleText, { ...textStyle('#080604', 22), fontFamily: 'Georgia, serif' }).setOrigin(0.5);
  const title = scene.add.text(cx, top + 30, titleText, { ...textStyle('#ffca28', 22), fontFamily: 'Georgia, serif' }).setOrigin(0.5);
  fitTextToBox(title, width - 80, 32, 14);
  titleShadow.setFontSize(title.style.fontSize);

  const children = [overlay, frame, titleShadow, title];
  if (subtitleText) {
    const sub = scene.add.text(cx, top + 56, subtitleText, {
      ...textStyle('#c5a059', 11),
      align: 'center',
      wordWrap: { width: width - 60, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(sub, width - 60, 26, 9);
    frame.lineStyle(1, 0xc5a059, 0.45).lineBetween(left + 40, top + 70, left + width - 40, top + 70);
    children.push(sub);
  }

  const container = scene.add.container(0, 0, children).setDepth(3000).setScrollFactor(0);
  activeModal = container;
  container.on('destroy', () => {
    if (activeModal === container) activeModal = null;
  });
  return container;
}`;

const newCreateModal = `function createModal(scene, titleText, height, subtitleText = '', width = 520) {
  const cx = GAME_WIDTH / 2;
  const cy = GAME_HEIGHT / 2;
  const left = cx - width / 2;
  const top = cy - height / 2;
  const overlay = scene.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.76);

  const frame = scene.add.graphics();
  // Fundo em couro / madeira nobre
  frame.fillStyle(0x14100c, 0.98).fillRoundedRect(left, top, width, height, 12);
  // Moldura externa em ferro forjado com espessura uniforme
  frame.lineStyle(2, 0x3d2b1f).strokeRoundedRect(left, top, width, height, 12);
  // Moldura secundária em ouro nobre
  frame.lineStyle(1, 0xc5a059, 0.9).strokeRoundedRect(left + 3, top + 3, width - 6, height - 6, 10);
  // Filete interno sutil
  frame.lineStyle(1, 0x8d5524, 0.4).strokeRoundedRect(left + 6, top + 6, width - 12, height - 12, 8);

  // Rebites de ouro com sombra nos 4 cantos
  const rOff = 14;
  [
    [left + rOff, top + rOff],
    [left + width - rOff, top + rOff],
    [left + rOff, top + height - rOff],
    [left + width - rOff, top + height - rOff]
  ].forEach(([rx, ry]) => {
    frame.fillStyle(0xc5a059, 1).fillCircle(rx, ry, 3.5);
    frame.fillStyle(0x2a1a0e, 1).fillCircle(rx, ry, 1.5);
  });

  // Brasão ornamental central no topo
  frame.fillStyle(0xc5a059, 1);
  frame.fillTriangle(cx, top - 8, cx - 18, top + 4, cx + 18, top + 4);
  frame.fillCircle(cx, top - 8, 3.5);
  frame.fillStyle(0x14100c, 1);
  frame.fillCircle(cx, top - 8, 1.5);
  frame.lineStyle(2, 0xc5a059, 0.9);
  frame.lineBetween(cx - 22, top + 3, cx - 48, top + 3);
  frame.lineBetween(cx + 22, top + 3, cx + 48, top + 3);
  frame.fillStyle(0xc5a059, 1).fillCircle(cx - 48, top + 3, 2.5).fillCircle(cx + 48, top + 3, 2.5);

  // Título e Subtítulo limpos com sombra sólida de 1px/2px (SEM borda esfarelada)
  const title = scene.add.text(cx, top + 30, titleText, titleTextStyle('#ffca28', 22)).setOrigin(0.5);
  fitTextToBox(title, width - 80, 32, 14);

  const children = [overlay, frame, title];
  if (subtitleText) {
    const sub = scene.add.text(cx, top + 56, subtitleText, {
      ...subtitleTextStyle('#c5a059', 11),
      align: 'center',
      wordWrap: { width: width - 60, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(sub, width - 60, 26, 9);
    frame.lineStyle(1, 0xc5a059, 0.45).lineBetween(left + 40, top + 70, left + width - 40, top + 70);
    children.push(sub);
  }

  const container = scene.add.container(0, 0, children).setDepth(3000).setScrollFactor(0);
  activeModal = container;
  container.on('destroy', () => {
    if (activeModal === container) activeModal = null;
  });
  return container;
}`;

// Normalize line endings
let norm = code.replace(/\r\n/g, '\n');
const normOldBtn = oldCreateBtn.replace(/\r\n/g, '\n');
const normNewBtn = newCreateBtn.replace(/\r\n/g, '\n');
const normOldModal = oldCreateModal.replace(/\r\n/g, '\n');
const normNewModal = newCreateModal.replace(/\r\n/g, '\n');

if (norm.includes(normOldBtn)) {
  norm = norm.replace(normOldBtn, normNewBtn);
  console.log('Replaced createButton in modals.js');
} else {
  console.log('oldCreateBtn not found');
}

if (norm.includes(normOldModal)) {
  norm = norm.replace(normOldModal, normNewModal);
  console.log('Replaced createModal in modals.js');
} else {
  console.log('oldCreateModal not found');
}

// Remove emojis and symbols in modals.js
norm = norm.replace(/✦ SUBIU PARA O NÍVEL (\${runLevel})! ✦/g, 'SUBIU PARA O NÍVEL $1!');
norm = norm.replace(/★ JORNADA EM ESPERA ★/g, 'JORNADA EM ESPERA');
norm = norm.replace(/★ CONSOLIDAÇÃO DE FIM DE JORNADA ★/g, 'CONSOLIDAÇÃO DE FIM DE JORNADA');
norm = norm.replace(/✦ DOBRAR OURO DA EXPEDIÇÃO \(\+(\${goldToDouble})G\) ✦/g, 'DOBRAR OURO DA EXPEDIÇÃO (+$1G)');
norm = norm.replace(/✓ OURO DOBRADO COM SUCESSO! \(\+(\${goldToDouble})G\)/g, 'OURO DOBRADO COM SUCESSO! (+$1G)');
norm = norm.replace(/'⚔ NOVA JORNADA'/g, "'NOVA JORNADA'");
norm = norm.replace(/➔/g, '->');
norm = norm.replace(/✦/g, '');
norm = norm.replace(/★/g, '');

// Clean up button texts inside openLevelUpDraft
norm = norm.replace(
  `const pickTxt = scene.add.text(cx, top + cardH - 34, \`ESCOLHER [\${idx + 1}]\`, textStyle('#ffffff', 12)).setOrigin(0.5);`,
  `const pickTxt = scene.add.text(cx, top + cardH - 34, \`ESCOLHER [\${idx + 1}]\`, buttonTextStyle('#ffffff', 12)).setOrigin(0.5);`
);
norm = norm.replace(
  `const subTxt = scene.add.text(GAME_WIDTH / 2, 64, 'ESCOLHA 1 CARTA DE UPGRADE DE ARMA OU ITEM (CLIQUE OU TECLAS [1] [2] [3])', textStyle('#7fe7ff', 11)).setOrigin(0.5);`,
  `const subTxt = scene.add.text(GAME_WIDTH / 2, 64, 'ESCOLHA 1 CARTA DE UPGRADE DE ARMA OU ITEM (CLIQUE OU TECLAS [1] [2] [3])', subtitleTextStyle('#7fe7ff', 11)).setOrigin(0.5);`
);

// Clean up pauseModal button strokes (change 1.5 to 2)
norm = norm.replace(
  `.setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });`,
  `.setStrokeStyle(2, 0xc5a059).setInteractive({ useHandCursor: true });`
);

fs.writeFileSync('JS_Teste/src/ui/modals.js', norm, 'utf8');
console.log('Updated JS_Teste/src/ui/modals.js successfully');
