const fs = require('fs');

let c = fs.readFileSync('JS_Teste/src/ui/modals.js', 'utf8');
const oldTxt = "const txt = scene.add.text(x, y, label, { ...textStyle('#ffffff', 14), fontFamily: 'Georgia, serif' }).setOrigin(0.5);";
const newTxt = "const txt = scene.add.text(x, y, label, buttonTextStyle('#ffffff', 13.5)).setOrigin(0.5);";

if (c.includes(oldTxt)) {
  c = c.replace(oldTxt, newTxt);
  fs.writeFileSync('JS_Teste/src/ui/modals.js', c, 'utf8');
  console.log('Successfully replaced createButton txt in modals.js');
} else {
  console.log('oldTxt not found in modals.js');
}
