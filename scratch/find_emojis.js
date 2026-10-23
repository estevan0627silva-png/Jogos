const fs = require('fs');
const path = require('path');

function findEmojisAndSymbols(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      findEmojisAndSymbols(full);
    } else if (full.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        // match non-ASCII characters that are not accented letters (á, é, í, ó, ú, ç, ã, õ, etc.)
        const nonAscii = line.match(/[^\x00-\x7F]/g);
        if (nonAscii) {
          const latinRegex = /[áàâãéèêíïóôõúüçñÁÀÂÃÉÈÊÍÏÓÔÕÚÜÇÑºª]/;
          const allowedPunctuation = /["'“”•—–-]/;
          const symbols = nonAscii.filter(c => !latinRegex.test(c) && !allowedPunctuation.test(c));
          if (symbols.length > 0) {
            console.log(`${full}:${idx + 1} -> ${symbols.join(' ')} | ${line.trim().slice(0, 100)}`);
          }
        }
      });
    }
  }
}

findEmojisAndSymbols('JS_Teste/src');
