const fs = require('fs');

let hud = fs.readFileSync('JS_Teste/src/ui/hud.js', 'utf8');

// Replace textStyle definition
const oldTextStyle = `const textStyle = (color, size = 17, weight = 'bold') => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: SERIF_TITLE_FONT,
  stroke: '#0e0b08',
  strokeThickness: Math.max(2, Math.round(size * 0.16))
});`;

const newTextStyle = `const textStyle = (color, size = 17, weight = 'bold', strokeThickness = 0, strokeColor = '#000000') => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: SERIF_TITLE_FONT,
  stroke: strokeThickness > 0 ? strokeColor : 'transparent',
  strokeThickness: strokeThickness,
  shadow: {
    offsetX: 1,
    offsetY: 1,
    color: '#000000',
    blur: 0,
    stroke: false,
    fill: true
  }
});

const buttonTextStyle = (color = '#ffffff', size = 13, weight = 'bold') => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: SERIF_TITLE_FONT,
  stroke: 'transparent',
  strokeThickness: 0,
  shadow: {
    offsetX: 1,
    offsetY: 1,
    color: '#000000',
    blur: 0,
    stroke: false,
    fill: true
  }
});

const titleTextStyle = (color = '#ffca28', size = 22) => ({
  fontSize: size + 'px',
  fontStyle: 'bold',
  color,
  fontFamily: SERIF_TITLE_FONT,
  stroke: 'transparent',
  strokeThickness: 0,
  shadow: {
    offsetX: 1,
    offsetY: 2,
    color: '#050302',
    blur: 0,
    stroke: false,
    fill: true
  }
});

const subtitleTextStyle = (color = '#d6c8aa', size = 11.5) => ({
  fontSize: size + 'px',
  fontStyle: 'normal',
  color,
  fontFamily: SERIF_TITLE_FONT,
  stroke: 'transparent',
  strokeThickness: 0,
  shadow: {
    offsetX: 1,
    offsetY: 1,
    color: '#000000',
    blur: 0,
    stroke: false,
    fill: true
  }
});`;

// Normalize line endings for replacement
const normHud = hud.replace(/\r\n/g, '\n');
const normOld = oldTextStyle.replace(/\r\n/g, '\n');
const normNew = newTextStyle.replace(/\r\n/g, '\n');

if (normHud.includes(normOld)) {
  hud = normHud.replace(normOld, normNew);
  console.log('Replaced textStyle in hud.js');
} else {
  console.log('oldTextStyle not found in hud.js');
}

// Replace floatText
hud = hud.replace(
  `const t = scene.add.text(Math.round(x), Math.round(y), msg, { ...textStyle(color, 15), stroke: '#000000', strokeThickness: 4 })`,
  `const t = scene.add.text(Math.round(x), Math.round(y), msg, { fontSize: '15px', fontStyle: 'bold', color, fontFamily: SERIF_TITLE_FONT, stroke: 'transparent', strokeThickness: 0, shadow: { offsetX: 1, offsetY: 2, color: '#000000', blur: 0, fill: true } })`
);

// Remove emoji from showAchievementToast
hud = hud.replace('🏆 CONQUISTA: ${ach.title}', 'CONQUISTA: ${ach.title}');

fs.writeFileSync('JS_Teste/src/ui/hud.js', hud, 'utf8');
console.log('Updated JS_Teste/src/ui/hud.js successfully');
