const fs = require('fs');
const path = require('path');

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2300}-\u{23FF}\u{2B50}\u{2728}\u{2705}\u{274C}\u{25C0}\u{25B6}\u{2190}-\u{21FF}\u{2794}\u{2694}\u{2692}\u{1F3C6}\u{1F52E}\u{1F451}\u{1F4B0}\u{2715}\u{2716}\u{2713}\u{2714}\u{2734}\u{2733}\u{2726}\u{2605}\u{2606}]/u;

function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) scan(full);
    else if (full.endsWith('.js')) {
      const c = fs.readFileSync(full, 'utf8');
      const lines = c.split('\n');
      lines.forEach((l, idx) => {
        if (emojiRegex.test(l)) {
          console.log(`${full}:${idx + 1}: ${l.trim()}`);
        }
      });
    }
  }
}

scan('JS_Teste/src');
