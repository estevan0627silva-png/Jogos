const fs = require('fs');

const entry = `## [v2.7.1] — 2026-10-23
### Título da Versão: **Tipografia Cristalina: Refinamento de Bordas de Texto, Botões Nobres e Remoção Total de Emojis**

### Descrição (GitHub Release & Commit):
> Eliminação completa dos traços esfarelados e bordas fragmentadas de textos, títulos, subtítulos e botões por meio de renderização limpa com sombras sólidas de 1px/2px. Padronização de bordas de botões com espessuras inteiras uniformes e remoção estrita de todos os emojis e glifos decorativos do jogo.

### O que mudou:
- **Refinamento Tipográfico e Fim das Bordas Fragmentadas:**
  - Reformulação do gerador global de estilos \`textStyle\` para utilizar por padrão \`strokeThickness: 0\` e sombras projetadas sólidas (\`shadow: { offsetX: 1, offsetY: 1, color: '#000000', blur: 0, fill: true }\`), eliminando os artefatos de serrilhado e quebra de contornos decorrentes do filtro pixelado do canvas.
  - Criação de helpers tipográficos dedicados: \`buttonTextStyle\` (letras nítidas para botões), \`titleTextStyle\` (títulos sem duplicidade de traço e com sombra sólida de 2px) e \`subtitleTextStyle\` (subtítulos perfeitamente legíveis sem espessuras borradas).
  - Remoção de duplicidades de textos sobrepostos que causavam choques de traçado nos títulos modais e do menu principal.
  - Limpeza dos avisos flutuantes (\`floatText\`), erradicando o antigo traço grosso de 4px em favor de renderização cristalina com sombra de alto contraste.
- **Acabamento e Bordas Uniformes nos Botões:**
  - Substituição de espessuras fracionárias (\`1.5\`) por traços inteiros sólidos (\`2px\`) em todos os botões do jogo (\`createButton\`, botões de alternância de áudio, tela cheia, joystick, abas da loja e botões de ação de compra/equipamento).
  - As bordas retangulares e chanfradas agora mantêm preenchimento e contorno consistentes sem falhas de interpolação subpixel.
- **Remoção Estrita de Todos os Emojis e Símbolos Decorativos:**
  - Varredura e erradicação de 100% dos emojis e caracteres gráficos no código de interface e gameplay:
    - Espadas (\`⚔\`), picaretas/martelos (\`⚒\`), bolas de cristal (\`🔮\`), troféus (\`🏆\`), coroas (\`👑\`), sacos de moedas (\`💰\`).
    - Estrelas decorativas (\`★\`), faíscas (\`✦\`), setas gráficas (\`➔\`), símbolos de checagem (\`✓\`), triângulos de perigo (\`⚠\`) e cruzes (\`✕\`).
    - Símbolos de graus (\`°\`) nos textos de combate substituídos por grafia por extenso (\`360 graus\`).
  - Nomes de botões e abas ajustados para tipografia clássica nobre: \`COMEÇAR JORNADA\`, \`FORJA DO FERREIRO\`, \`SANTUÁRIO DO MAGO\`, \`CONQUISTAS DO REINO\`, \`A FORJA REAL\`, \`SANTUÁRIO ALQUIMISTA\`, \`SAIR\`, \`EM USO\`, \`CONCLUÍDO\`, etc.

---

`;

['CHANGELOG.md', 'JS_Teste/CHANGELOG.md'].forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const headerIdx = content.indexOf('## [v');
    if (headerIdx !== -1) {
      const updated = content.slice(0, headerIdx) + entry + content.slice(headerIdx);
      fs.writeFileSync(file, updated, 'utf8');
      console.log('Updated ' + file + ' successfully');
    }
  }
});
