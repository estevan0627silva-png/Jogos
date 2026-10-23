const fs = require('fs');

let c = fs.readFileSync('JS_Teste/src/ui/menus.js', 'utf8');

// 1. Settings Menu Buttons & Strokes
c = c.replace(
  `const audioToggleBtn = scene.add.rectangle(cx - 125, 128, 230, 32, sound.isMuted() ? 0x8e1b1b : 0x247a46)\n    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });\n  const audioToggleTxt = scene.add.text(cx - 125, 128, sound.isMuted() ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]', textStyle('#ffffff', 11))\n    .setOrigin(0.5);`,
  `const audioToggleBtn = scene.add.rectangle(cx - 125, 128, 230, 32, sound.isMuted() ? 0x8e1b1b : 0x247a46)\n    .setStrokeStyle(2, 0xc5a059).setInteractive({ useHandCursor: true });\n  const audioToggleTxt = scene.add.text(cx - 125, 128, sound.isMuted() ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]', buttonTextStyle('#ffffff', 11))\n    .setOrigin(0.5);`
);

c = c.replace(
  `const fsToggleBtn = scene.add.rectangle(cx + 125, 128, 230, 32, isGameFullscreen(scene) ? 0x247a46 : 0x6e3d1b)\n    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });\n  const fsToggleTxt = scene.add.text(cx + 125, 128, isGameFullscreen(scene) ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]', textStyle('#ffffff', 11))\n    .setOrigin(0.5);`,
  `const fsToggleBtn = scene.add.rectangle(cx + 125, 128, 230, 32, isGameFullscreen(scene) ? 0x247a46 : 0x6e3d1b)\n    .setStrokeStyle(2, 0xc5a059).setInteractive({ useHandCursor: true });\n  const fsToggleTxt = scene.add.text(cx + 125, 128, isGameFullscreen(scene) ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]', buttonTextStyle('#ffffff', 11))\n    .setOrigin(0.5);`
);

c = c.replace(
  `const joyToggleBtn = scene.add.rectangle(cx, 168, 480, 30, getJoyColor())\n    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });\n  const joyToggleTxt = scene.add.text(cx, 168, getJoyLabel(), textStyle('#ffffff', 11))\n    .setOrigin(0.5);`,
  `const joyToggleBtn = scene.add.rectangle(cx, 168, 480, 30, getJoyColor())\n    .setStrokeStyle(2, 0xc5a059).setInteractive({ useHandCursor: true });\n  const joyToggleTxt = scene.add.text(cx, 168, getJoyLabel(), buttonTextStyle('#ffffff', 11))\n    .setOrigin(0.5);`
);

// 2. Achievements Menu close button & reward text
c = c.replace(
  `const closeQuickBtn = scene.add.rectangle(850, 48, 78, 28, 0x5c241b)\n    .setStrokeStyle(1.5, 0xc5a059)\n    .setInteractive({ useHandCursor: true });\n  const closeQuickTxt = scene.add.text(850, 48, '✕ SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);`,
  `const closeQuickBtn = scene.add.rectangle(850, 48, 78, 28, 0x5c241b)\n    .setStrokeStyle(2, 0xc5a059)\n    .setInteractive({ useHandCursor: true });\n  const closeQuickTxt = scene.add.text(850, 48, 'SAIR', buttonTextStyle('#ffeb3b', 11)).setOrigin(0.5);`
);

c = c.replace(
  `isDone ? '★ CONCLUÍDO' : \`+\${ach.rewardGold}G\``,
  `isDone ? 'CONCLUÍDO' : \`+\${ach.rewardGold}G\``
);

// 3. Main Menu Title & Subtitle without crumbly duplicated stroke
const oldMainTitleBlock = `  const titleShadow = scene.add.text(482, 44, 'A JORNADA DO CAVALEIRO', {\n    ...textStyle('#060403', 28), fontFamily: 'Georgia, serif'\n  }).setOrigin(0.5);\n  const titleMain = scene.add.text(480, 42, 'A JORNADA DO CAVALEIRO', {\n    ...textStyle('#ffca28', 28), fontFamily: 'Georgia, serif'\n  }).setOrigin(0.5);\n  const subtitleTxt = scene.add.text(480, 75, '★ CRÔNICAS DE ELDÓRIA • ROGUELITE DE AÇÃO ★', textStyle('#e0c088', 11.5)).setOrigin(0.5);`;

const newMainTitleBlock = `  const titleMain = scene.add.text(480, 43, 'A JORNADA DO CAVALEIRO', titleTextStyle('#ffca28', 28)).setOrigin(0.5);\n  const subtitleTxt = scene.add.text(480, 74, 'CRÔNICAS DE ELDÓRIA - ROGUELITE DE AÇÃO', subtitleTextStyle('#e0c088', 11.5)).setOrigin(0.5);`;

// Normalize line endings for replacement
c = c.replace(oldMainTitleBlock.replace(/\n/g, '\r\n'), newMainTitleBlock.replace(/\n/g, '\r\n'));
c = c.replace(oldMainTitleBlock, newMainTitleBlock);

// Remove titleShadow from menuContainer.add in showMainMenu
c = c.replace('headerBanner, titleShadow, titleMain, subtitleTxt,', 'headerBanner, titleMain, subtitleTxt,');

// Main Menu Action Buttons (remove emojis)
c = c.replace("'⚔ COMEÇAR JORNADA'", "'COMEÇAR JORNADA'");
c = c.replace("'⚒ FORJA DO FERREIRO'", "'FORJA DO FERREIRO'");
c = c.replace("'🔮 SANTUÁRIO DO MAGO'", "'SANTUÁRIO DO MAGO'");
c = c.replace("'🏆 CONQUISTAS DO REINO'", "'CONQUISTAS DO REINO'");

// 4. Blacksmith Menu (remove emojis, fix strokes to 2, use buttonTextStyle & titleTextStyle)
c = c.replace(
  `const signTitle = scene.add.text(480, 36, '⚔ A FORJA REAL ⚔', {\n    ...textStyle('#ffca28', 16), fontFamily: 'Georgia, serif'\n  }).setOrigin(0.5);`,
  `const signTitle = scene.add.text(480, 36, 'A FORJA REAL', titleTextStyle('#ffca28', 16)).setOrigin(0.5);`
);
c = c.replace(
  `const signTitle = scene.add.text(480, 36, '⚔ A FORJA REAL ⚔', {\r\n    ...textStyle('#ffca28', 16), fontFamily: 'Georgia, serif'\r\n  }).setOrigin(0.5);`,
  `const signTitle = scene.add.text(480, 36, 'A FORJA REAL', titleTextStyle('#ffca28', 16)).setOrigin(0.5);`
);

c = c.replace(
  `const forgeTabBtn = scene.add.rectangle(85, 28, 110, 28, 0x8d5524)\n    .setStrokeStyle(1.5, 0xffca28);\n  const forgeTabTxt = scene.add.text(85, 28, '⚔ FORJA REAL', textStyle('#ffffff', 10.5)).setOrigin(0.5);`,
  `const forgeTabBtn = scene.add.rectangle(85, 28, 110, 28, 0x8d5524)\n    .setStrokeStyle(2, 0xffca28);\n  const forgeTabTxt = scene.add.text(85, 28, 'FORJA REAL', buttonTextStyle('#ffffff', 10.5)).setOrigin(0.5);`
);
c = c.replace(
  `const forgeTabBtn = scene.add.rectangle(85, 28, 110, 28, 0x8d5524)\r\n    .setStrokeStyle(1.5, 0xffca28);\r\n  const forgeTabTxt = scene.add.text(85, 28, '⚔ FORJA REAL', textStyle('#ffffff', 10.5)).setOrigin(0.5);`,
  `const forgeTabBtn = scene.add.rectangle(85, 28, 110, 28, 0x8d5524)\r\n    .setStrokeStyle(2, 0xffca28);\r\n  const forgeTabTxt = scene.add.text(85, 28, 'FORJA REAL', buttonTextStyle('#ffffff', 10.5)).setOrigin(0.5);`
);

c = c.replace(
  `const mageTabBtn = scene.add.rectangle(205, 28, 110, 28, 0x22132e)\n    .setStrokeStyle(1.5, 0x7c4dff)\n    .setInteractive({ useHandCursor: true });\n  const mageTabTxt = scene.add.text(205, 28, '🔮 SANTUÁRIO', textStyle('#ce93d8', 10.5)).setOrigin(0.5);`,
  `const mageTabBtn = scene.add.rectangle(205, 28, 110, 28, 0x22132e)\n    .setStrokeStyle(2, 0x7c4dff)\n    .setInteractive({ useHandCursor: true });\n  const mageTabTxt = scene.add.text(205, 28, 'SANTUÁRIO', buttonTextStyle('#ce93d8', 10.5)).setOrigin(0.5);`
);
c = c.replace(
  `const mageTabBtn = scene.add.rectangle(205, 28, 110, 28, 0x22132e)\r\n    .setStrokeStyle(1.5, 0x7c4dff)\r\n    .setInteractive({ useHandCursor: true });\r\n  const mageTabTxt = scene.add.text(205, 28, '🔮 SANTUÁRIO', textStyle('#ce93d8', 10.5)).setOrigin(0.5);`,
  `const mageTabBtn = scene.add.rectangle(205, 28, 110, 28, 0x22132e)\r\n    .setStrokeStyle(2, 0x7c4dff)\r\n    .setInteractive({ useHandCursor: true });\r\n  const mageTabTxt = scene.add.text(205, 28, 'SANTUÁRIO', buttonTextStyle('#ce93d8', 10.5)).setOrigin(0.5);`
);

c = c.replace(
  `const closeQuickBtn = scene.add.rectangle(905, 32, 70, 30, 0x5c241b)\n    .setStrokeStyle(1.5, 0xc5a059)\n    .setInteractive({ useHandCursor: true });\n  const closeQuickTxt = scene.add.text(905, 32, '✕ SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);`,
  `const closeQuickBtn = scene.add.rectangle(905, 32, 70, 30, 0x5c241b)\n    .setStrokeStyle(2, 0xc5a059)\n    .setInteractive({ useHandCursor: true });\n  const closeQuickTxt = scene.add.text(905, 32, 'SAIR', buttonTextStyle('#ffeb3b', 11)).setOrigin(0.5);`
);
c = c.replace(
  `const closeQuickBtn = scene.add.rectangle(905, 32, 70, 30, 0x5c241b)\r\n    .setStrokeStyle(1.5, 0xc5a059)\r\n    .setInteractive({ useHandCursor: true });\r\n  const closeQuickTxt = scene.add.text(905, 32, '✕ SAIR', textStyle('#ffeb3b', 11)).setOrigin(0.5);`,
  `const closeQuickBtn = scene.add.rectangle(905, 32, 70, 30, 0x5c241b)\r\n    .setStrokeStyle(2, 0xc5a059)\r\n    .setInteractive({ useHandCursor: true });\r\n  const closeQuickTxt = scene.add.text(905, 32, 'SAIR', buttonTextStyle('#ffeb3b', 11)).setOrigin(0.5);`
);

// Blacksmith archetypes without degree symbol or emojis
c = c.replace("axe: 'GIRO 360°',", "axe: 'GIRO 360 GRAUS',");
c = c.replace("axe: 'Corte giratório duplo devastador que atinge múltiplos inimigos em 360°.'", "axe: 'Corte giratório duplo devastador que atinge múltiplos inimigos em 360 graus.'");
c = c.replace("axe: 'Corte giratório duplo devastador que atinge múltiplos inimigos em 360 graus.'", "axe: 'Corte giratório duplo devastador que atinge múltiplos inimigos em 360 graus.'");

// Blacksmith weapon card title and action button texts
c = c.replace(
  `const nameTxt = scene.add.text(cx, startY + 92, cfg.name, {\n      ...textStyle(isStarter ? '#794b02' : (isUnlocked ? '#2c1b10' : '#6b5443'), 12),\n      fontFamily: 'Georgia, serif'\n    }).setOrigin(0.5);`,
  `const nameTxt = scene.add.text(cx, startY + 92, cfg.name, titleTextStyle(isStarter ? '#794b02' : (isUnlocked ? '#2c1b10' : '#6b5443'), 12)).setOrigin(0.5);`
);
c = c.replace(
  `const nameTxt = scene.add.text(cx, startY + 92, cfg.name, {\r\n      ...textStyle(isStarter ? '#794b02' : (isUnlocked ? '#2c1b10' : '#6b5443'), 12),\r\n      fontFamily: 'Georgia, serif'\r\n    }).setOrigin(0.5);`,
  `const nameTxt = scene.add.text(cx, startY + 92, cfg.name, titleTextStyle(isStarter ? '#794b02' : (isUnlocked ? '#2c1b10' : '#6b5443'), 12)).setOrigin(0.5);`
);

c = c.replace(
  `actionTxt = scene.add.text(btnX, btnY, \`FORJAR (\${cost}G)\`, textStyle(canAfford ? '#ffffff' : '#8c7b6b', 10.5)).setOrigin(0.5);`,
  `actionTxt = scene.add.text(btnX, btnY, \`FORJAR (\${cost}G)\`, buttonTextStyle(canAfford ? '#ffffff' : '#8c7b6b', 10.5)).setOrigin(0.5);`
);
c = c.replace(
  `actionTxt = scene.add.text(btnX, btnY, isStarter ? '★ EM USO' : 'EQUIPAR', textStyle(isStarter ? '#ffd740' : '#ffffff', 10.5)).setOrigin(0.5);`,
  `actionTxt = scene.add.text(btnX, btnY, isStarter ? 'EM USO' : 'EQUIPAR', buttonTextStyle(isStarter ? '#ffd740' : '#ffffff', 10.5)).setOrigin(0.5);`
);

// 5. Mage Shop (remove emojis, fix strokes to 2, use buttonTextStyle & titleTextStyle)
c = c.replace(
  `const signTitle = scene.add.text(480, 38, '🔮 SANTUÁRIO ALQUIMISTA 🔮', {\n    ...textStyle('#e1bee7', 15), fontFamily: 'Georgia, serif'\n  }).setOrigin(0.5);`,
  `const signTitle = scene.add.text(480, 38, 'SANTUÁRIO ALQUIMISTA', titleTextStyle('#e1bee7', 15)).setOrigin(0.5);`
);
c = c.replace(
  `const signTitle = scene.add.text(480, 38, '🔮 SANTUÁRIO ALQUIMISTA 🔮', {\r\n    ...textStyle('#e1bee7', 15), fontFamily: 'Georgia, serif'\r\n  }).setOrigin(0.5);`,
  `const signTitle = scene.add.text(480, 38, 'SANTUÁRIO ALQUIMISTA', titleTextStyle('#e1bee7', 15)).setOrigin(0.5);`
);

c = c.replace(
  `const forgeTabBtn = scene.add.rectangle(85, 28, 110, 28, 0x3d2215)\n    .setStrokeStyle(1.5, 0xc5a059)\n    .setInteractive({ useHandCursor: true });\n  const forgeTabTxt = scene.add.text(85, 28, '⚔ FORJA REAL', textStyle('#e0c088', 10.5)).setOrigin(0.5);`,
  `const forgeTabBtn = scene.add.rectangle(85, 28, 110, 28, 0x3d2215)\n    .setStrokeStyle(2, 0xc5a059)\n    .setInteractive({ useHandCursor: true });\n  const forgeTabTxt = scene.add.text(85, 28, 'FORJA REAL', buttonTextStyle('#e0c088', 10.5)).setOrigin(0.5);`
);
c = c.replace(
  `const forgeTabBtn = scene.add.rectangle(85, 28, 110, 28, 0x3d2215)\r\n    .setStrokeStyle(1.5, 0xc5a059)\r\n    .setInteractive({ useHandCursor: true });\r\n  const forgeTabTxt = scene.add.text(85, 28, '⚔ FORJA REAL', textStyle('#e0c088', 10.5)).setOrigin(0.5);`,
  `const forgeTabBtn = scene.add.rectangle(85, 28, 110, 28, 0x3d2215)\r\n    .setStrokeStyle(2, 0xc5a059)\r\n    .setInteractive({ useHandCursor: true });\r\n  const forgeTabTxt = scene.add.text(85, 28, 'FORJA REAL', buttonTextStyle('#e0c088', 10.5)).setOrigin(0.5);`
);

c = c.replace(
  `const mageTabBtn = scene.add.rectangle(205, 28, 110, 28, 0x6a1b9a)\n    .setStrokeStyle(1.5, 0xffca28);\n  const mageTabTxt = scene.add.text(205, 28, '🔮 SANTUÁRIO', textStyle('#ffffff', 10.5)).setOrigin(0.5);`,
  `const mageTabBtn = scene.add.rectangle(205, 28, 110, 28, 0x6a1b9a)\n    .setStrokeStyle(2, 0xffca28);\n  const mageTabTxt = scene.add.text(205, 28, 'SANTUÁRIO', buttonTextStyle('#ffffff', 10.5)).setOrigin(0.5);`
);
c = c.replace(
  `const mageTabBtn = scene.add.rectangle(205, 28, 110, 28, 0x6a1b9a)\r\n    .setStrokeStyle(1.5, 0xffca28);\r\n  const mageTabTxt = scene.add.text(205, 28, '🔮 SANTUÁRIO', textStyle('#ffffff', 10.5)).setOrigin(0.5);`,
  `const mageTabBtn = scene.add.rectangle(205, 28, 110, 28, 0x6a1b9a)\r\n    .setStrokeStyle(2, 0xffca28);\r\n  const mageTabTxt = scene.add.text(205, 28, 'SANTUÁRIO', buttonTextStyle('#ffffff', 10.5)).setOrigin(0.5);`
);

c = c.replace(
  `const nameTxt = scene.add.text(cx, startY + 92, cfg.name, {\n      ...textStyle(isMax ? '#794b02' : '#2c1b10', 12),\n      fontFamily: 'Georgia, serif'\n    }).setOrigin(0.5);`,
  `const nameTxt = scene.add.text(cx, startY + 92, cfg.name, titleTextStyle(isMax ? '#794b02' : '#2c1b10', 12)).setOrigin(0.5);`
);
c = c.replace(
  `const nameTxt = scene.add.text(cx, startY + 92, cfg.name, {\r\n      ...textStyle(isMax ? '#794b02' : '#2c1b10', 12),\r\n      fontFamily: 'Georgia, serif'\r\n    }).setOrigin(0.5);`,
  `const nameTxt = scene.add.text(cx, startY + 92, cfg.name, titleTextStyle(isMax ? '#794b02' : '#2c1b10', 12)).setOrigin(0.5);`
);

c = c.replace(
  `const lvlBadgeTxt = scene.add.text(cx, startY + 132, isMax ? 'PODER MÁXIMO ★' : \`NÍVEL \${lvl} / \${maxLvl}\`, textStyle(isMax ? '#e65100' : '#4a148c', 9.5)).setOrigin(0.5);`,
  `const lvlBadgeTxt = scene.add.text(cx, startY + 132, isMax ? 'PODER MÁXIMO' : \`NÍVEL \${lvl} / \${maxLvl}\`, buttonTextStyle(isMax ? '#e65100' : '#4a148c', 9.5)).setOrigin(0.5);`
);
c = c.replace(
  `? \`★ Efeito Completo:\\n\${levelDescs[lvl - 1] || ''}\``,
  `? \`Efeito Completo:\\n\${levelDescs[lvl - 1] || ''}\``
);
c = c.replace(
  `? \`★ Efeito Completo:\\r\\n\${levelDescs[lvl - 1] || ''}\``,
  `? \`Efeito Completo:\\r\\n\${levelDescs[lvl - 1] || ''}\``
);

c = c.replace(
  `actionTxt = scene.add.text(btnX, btnY, 'COMPLETO ★', textStyle('#ffd740', 10.5)).setOrigin(0.5);`,
  `actionTxt = scene.add.text(btnX, btnY, 'COMPLETO', buttonTextStyle('#ffd740', 10.5)).setOrigin(0.5);`
);
c = c.replace(
  `actionTxt = scene.add.text(btnX, btnY, \`AUMENTAR (\${cost}G)\`, textStyle(canAfford ? '#ffffff' : '#8c7b6b', 10.5)).setOrigin(0.5);`,
  `actionTxt = scene.add.text(btnX, btnY, \`AUMENTAR (\${cost}G)\`, buttonTextStyle(canAfford ? '#ffffff' : '#8c7b6b', 10.5)).setOrigin(0.5);`
);

// Global cleanup of any remaining ★, ⚔, 🔮, ⚒, 🏆, ✕
c = c.replace(/★/g, '');
c = c.replace(/⚔/g, '');
c = c.replace(/🔮/g, '');
c = c.replace(/⚒/g, '');
c = c.replace(/🏆/g, '');
c = c.replace(/✕/g, '');

fs.writeFileSync('JS_Teste/src/ui/menus.js', c, 'utf8');
console.log('Cleaned menus.js successfully');
