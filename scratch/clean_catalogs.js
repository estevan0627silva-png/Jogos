const fs = require('fs');

let c = fs.readFileSync('JS_Teste/src/config/catalogs.js', 'utf8');
c = c.replace(/★/g, '');
// Clean up any double spaces left behind by removing ★
c = c.replace(/'\s+'/g, "' '");
c = c.replace(/\s+'\s*,\s*desc/g, "', desc");
fs.writeFileSync('JS_Teste/src/config/catalogs.js', c, 'utf8');
console.log('Cleaned catalogs.js successfully');
