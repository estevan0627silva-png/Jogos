const fs = require('fs');

let code = fs.readFileSync('JS_Teste/src/ui/modals.js', 'utf8');

// Find start and end of createModal
const startIdx = code.indexOf('function createModal(');
const endIdx = code.indexOf('// SISTEMA DE PAUSA', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const newCreateModal = `function createModal(scene, titleText, height, subtitleText = '', width = 520) {
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
}

`;

  const updated = code.slice(0, startIdx) + newCreateModal + code.slice(endIdx);
  fs.writeFileSync('JS_Teste/src/ui/modals.js', updated, 'utf8');
  console.log('Successfully updated createModal in modals.js');
} else {
  console.log('createModal bounds not found!');
}
