const fs = require('fs');

let hud = fs.readFileSync('JS_Teste/src/ui/hud.js', 'utf8');

const target = `const subtitleTextStyle = (color = '#d6c8aa', size = 11.5) => ({
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

const addition = `const subtitleTextStyle = (color = '#d6c8aa', size = 11.5) => ({
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
});

const parchmentTitleStyle = (color = '#2c1b10', size = 12.5, weight = 'bold') => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: SERIF_TITLE_FONT,
  stroke: 'transparent',
  strokeThickness: 0,
  shadow: null
});

const parchmentBodyStyle = (color = '#1f130b', size = 11, weight = 'normal') => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: ROUNDED_FONT,
  stroke: 'transparent',
  strokeThickness: 0,
  shadow: null
});`;

// Normalize line endings
const normHud = hud.replace(/\r\n/g, '\n');
const normTarget = target.replace(/\r\n/g, '\n');
const normAddition = addition.replace(/\r\n/g, '\n');

if (normHud.includes(normTarget)) {
  const updated = normHud.replace(normTarget, normAddition);
  fs.writeFileSync('JS_Teste/src/ui/hud.js', updated, 'utf8');
  console.log('Successfully added parchment styles to hud.js');
} else {
  console.log('Target not found in hud.js');
}
