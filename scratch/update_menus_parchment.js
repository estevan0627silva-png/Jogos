const fs = require('fs');

let c = fs.readFileSync('JS_Teste/src/ui/menus.js', 'utf8');

// 1. Blacksmith speech bubble
c = c.replace(
  `const smithTitleTxt = scene.add.text(332, 90, 'MESTRE ANVILGAR (FERREIRO REAL)', textStyle('#5c3722', 11.5, 'bold'));`,
  `const smithTitleTxt = scene.add.text(332, 90, 'MESTRE ANVILGAR (FERREIRO REAL)', parchmentTitleStyle('#4e2814', 12, 'bold'));`
);

c = c.replace(
  `const smithSpeechTxt = scene.add.text(332, 110, '“O fogo forja o aço! Escolha seu armamento para a batalha.”', {\n    ...roundedTextStyle('#24150b', 11, 'normal'),\n    lineSpacing: 3.5,\n    wordWrap: { width: 290, useAdvancedWrap: true }\n  });`,
  `const smithSpeechTxt = scene.add.text(332, 110, '“O fogo forja o aço! Escolha seu armamento para a batalha.”', {\n    ...parchmentBodyStyle('#1f130b', 11, 'normal'),\n    lineSpacing: 3.5,\n    wordWrap: { width: 290, useAdvancedWrap: true }\n  });`
);
c = c.replace(
  `const smithSpeechTxt = scene.add.text(332, 110, '“O fogo forja o aço! Escolha seu armamento para a batalha.”', {\r\n    ...roundedTextStyle('#24150b', 11, 'normal'),\r\n    lineSpacing: 3.5,\r\n    wordWrap: { width: 290, useAdvancedWrap: true }\r\n  });`,
  `const smithSpeechTxt = scene.add.text(332, 110, '“O fogo forja o aço! Escolha seu armamento para a batalha.”', {\r\n    ...parchmentBodyStyle('#1f130b', 11, 'normal'),\r\n    lineSpacing: 3.5,\r\n    wordWrap: { width: 290, useAdvancedWrap: true }\r\n  });`
);

// 2. Blacksmith card title
c = c.replace(
  `const nameTxt = scene.add.text(cx, startY + 92, cfg.name, {\n      ...textStyle(isStarter ? '#794b02' : (isUnlocked ? '#2c1b10' : '#6b5443'), 12, 'bold'),\n      fontFamily: 'Georgia, serif',\n      align: 'center'\n    }).setOrigin(0.5);`,
  `const nameTxt = scene.add.text(cx, startY + 92, cfg.name, {\n      ...parchmentTitleStyle(isStarter ? '#8c4e03' : (isUnlocked ? '#2c1b10' : '#5c4938'), 12.5, 'bold'),\n      align: 'center'\n    }).setOrigin(0.5);`
);
c = c.replace(
  `const nameTxt = scene.add.text(cx, startY + 92, cfg.name, {\r\n      ...textStyle(isStarter ? '#794b02' : (isUnlocked ? '#2c1b10' : '#6b5443'), 12, 'bold'),\r\n      fontFamily: 'Georgia, serif',\r\n      align: 'center'\r\n    }).setOrigin(0.5);`,
  `const nameTxt = scene.add.text(cx, startY + 92, cfg.name, {\r\n      ...parchmentTitleStyle(isStarter ? '#8c4e03' : (isUnlocked ? '#2c1b10' : '#5c4938'), 12.5, 'bold'),\r\n      align: 'center'\r\n    }).setOrigin(0.5);`
);

// 3. Mage speech bubble
c = c.replace(
  `const mageTitleTxt = scene.add.text(332, 90, 'ARQUIMAGO ALQUIMISTA (MESTRE)', textStyle('#4a148c', 11.5, 'bold'));`,
  `const mageTitleTxt = scene.add.text(332, 90, 'ARQUIMAGO ALQUIMISTA (MESTRE)', parchmentTitleStyle('#3a115c', 12, 'bold'));`
);

c = c.replace(
  `const mageSpeechTxt = scene.add.text(332, 110, '“Beba dos meus elixires e seu poder ecoará em cada batalha!”', {\n    ...roundedTextStyle('#221226', 11.5, 'normal'),\n    lineSpacing: 4,\n    wordWrap: { width: 288, useAdvancedWrap: true }\n  });`,
  `const mageSpeechTxt = scene.add.text(332, 110, '“Beba dos meus elixires e seu poder ecoará em cada batalha!”', {\n    ...parchmentBodyStyle('#180d21', 11, 'normal'),\n    lineSpacing: 4,\n    wordWrap: { width: 288, useAdvancedWrap: true }\n  });`
);
c = c.replace(
  `const mageSpeechTxt = scene.add.text(332, 110, '“Beba dos meus elixires e seu poder ecoará em cada batalha!”', {\r\n    ...roundedTextStyle('#221226', 11.5, 'normal'),\r\n    lineSpacing: 4,\r\n    wordWrap: { width: 288, useAdvancedWrap: true }\r\n  });`,
  `const mageSpeechTxt = scene.add.text(332, 110, '“Beba dos meus elixires e seu poder ecoará em cada batalha!”', {\r\n    ...parchmentBodyStyle('#180d21', 11, 'normal'),\r\n    lineSpacing: 4,\r\n    wordWrap: { width: 288, useAdvancedWrap: true }\r\n  });`
);

// 4. Mage card titles: ONLY the item name!
// Add mageItemNames map before statusKeys.forEach
const oldStatusLoop = `statusKeys.forEach((key, idx) => {`;
const newStatusLoop = `const mageItemNames = {
    maxHp: 'ELIXIR DE VIDA',
    moveSpeed: 'POÇÃO DE VELOCIDADE',
    magnet: 'ÍMÃ ARCANO',
    wisdom: 'SABEDORIA ARCANA'
  };

  statusKeys.forEach((key, idx) => {`;

if (c.includes(oldStatusLoop) && !c.includes('const mageItemNames =')) {
  c = c.replace(oldStatusLoop, newStatusLoop);
  console.log('Added mageItemNames map');
}

// Replace mage card title
const oldMageTitleBlock = `    // Nome do Status — 100% CENTRALIZADO\n    const nameTxt = scene.add.text(cx, startY + 92, cfg.name, {\n      ...textStyle(isMax ? '#794b02' : '#2c1b10', 11.5),\n      fontFamily: 'Georgia, serif',\n      align: 'center'\n    }).setOrigin(0.5);`;

const newMageTitleBlock = `    // Nome do Item — APENAS O NOME DO ITEM (100% CENTRALIZADO E NÍTIDO)\n    const itemTitle = mageItemNames[key] || cfg.shortName || cfg.name;\n    const nameTxt = scene.add.text(cx, startY + 92, itemTitle, {\n      ...parchmentTitleStyle(isMax ? '#8c4e03' : '#221226', 13, 'bold'),\n      align: 'center'\n    }).setOrigin(0.5);`;

c = c.replace(oldMageTitleBlock.replace(/\n/g, '\r\n'), newMageTitleBlock.replace(/\n/g, '\r\n'));
c = c.replace(oldMageTitleBlock, newMageTitleBlock);

// 5. Clean stray leading spaces from button/tab texts
c = c.replace(/' FORJA REAL'/g, "'FORJA REAL'");
c = c.replace(/' SANTUÁRIO'/g, "'SANTUÁRIO'");
c = c.replace(/' SAIR'/g, "'SAIR'");
c = c.replace(/' PODER MÁXIMO '/g, "'PODER MÁXIMO'");
c = c.replace(/ Efeito Completo /g, "Efeito Completo:");

fs.writeFileSync('JS_Teste/src/ui/menus.js', c, 'utf8');
console.log('Successfully updated menus.js with parchment styles and item-only titles');
