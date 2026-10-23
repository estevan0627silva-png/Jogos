const fs = require('fs');

// Update boss.js
let boss = fs.readFileSync('JS_Teste/src/world/boss.js', 'utf8');
boss = boss.replace('⚠ CHEFÃO: GOLEM ANCESTRAL DE PEDRA! ⚠', 'CHEFÃO: GOLEM ANCESTRAL DE PEDRA!');
boss = boss.replace('★ GOLEM DERROTADO! CHUVA DE PRATA & XP! ★', 'GOLEM DERROTADO! CHUVA DE PRATA & XP!');
fs.writeFileSync('JS_Teste/src/world/boss.js', boss, 'utf8');
console.log('Updated boss.js');

// Update director.js
let director = fs.readFileSync('JS_Teste/src/world/director.js', 'utf8');
director = director.replace('★ SAINDO DA VILA DE VALE DOURADO ★', 'SAINDO DA VILA DE VALE DOURADO');
director = director.replace('⚔ PREPARE-SE: ESTRONDO NAS PROFUNDEZAS! ⚔', 'PREPARE-SE: ESTRONDO NAS PROFUNDEZAS!');
fs.writeFileSync('JS_Teste/src/world/director.js', director, 'utf8');
console.log('Updated director.js');
