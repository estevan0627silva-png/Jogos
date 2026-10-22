const fs = require('fs');

const changelogEntry = `## [v2.7.0] — 2026-10-22
### 🎨 Título da Versão: **Ateliê do Reino: Interface Medieval Nobre, Cenários de Lojas Imersivas e Balcões dos Mestres**

### 📝 Descrição (GitHub Release & Commit):
> Reformulação gráfica e visual de alto nível da Interface de Usuário (HUD), Menu Principal e Cenários de Lojas (Forja do Ferreiro e Santuário do Mago), inspirada em UI Kits de Dark Fantasy Medieval, lojas temáticas com balcão (estilo Cuphead e Witch Shop) e molduras com floreios vitorianos. Ambientes de loja imersivos com vendedores caracterizados atrás de balcões maciços de carvalho e mogno, placas entalhadas, balões de fala em pergaminho reativos, vitrines de itens pregadas ao balcão com alvéolos circulares ornamentais, medalhões dourados e zero alterações nas regras ou mecânicas funcionais existentes.

### 🚀 O que mudou:
- **⚒️ A Forja do Ferreiro Real (Cenário Imersivo & Balcão de Carvalho):**
  - Cenário de fundo temático completo com parede de cantaria, lareira de pedra com fornalha em brasa ardente (\`#d84315\`, \`#ff6d00\`), chaminé de ferro e racks com suportes de armas (espadas, machados e escudo viking pendurados).
  - Mestre Ferreiro Anvilgar posicionado e animado com sprite em escala 2.2x **atrás do balcão**, executando sutil ciclo de forja e respiração.
  - Balcão de carvalho maciço atravessando horizontalmente todo o cenário com veios de madeira, rebites, bigorna de ferro forjado com lâmina em brasa incandescente e pilha de moedas sobre veludo.
  - Placa entalhada de madeira suspensa por correntes no teto: \`[ ⚔ A FORJA REAL ⚔ ]\`.
  - Balão de diálogo em pergaminho nobre com rabo apontado para o ferreiro, exibindo dinamicamente a lore tática e o arquétipo de cada arma ao passar o mouse.
  - Abas de navegação no topo com alternância rápida entre a Forja Real e o Santuário Alquimista (suporta clique e tecla \`[TAB]\`).
  - Vitrine das 5 armas (Arco, Espada, Escudo, Machado e Cajado) redesenhada como 5 cartas de pergaminho pregadas à face frontal do balcão com pregos de ferro, alvéolos circulares ornamentais com 4 entalhes (UI Kit Dark Fantasy), badges de arquétipo de combate, lore detalhada e botões de aquisição/seleção inicial (\`★ EM USO\`, \`EQUIPAR\`, \`FORJAR\`).
- **🔮 O Santuário do Mago Alquimista (Cenário Místico & Balcão de Mogno):**
  - Parede de pedra obsidiana com runas arcanas entalhadas emitindo luminescência mística em ciano e violeta (\`#7c4dff\`, \`#00e5ff\`).
  - Prateleiras de boticário com frascos de elixires coloridos (rubi, esmeralda, safira), grimórios encadernados e esferas de mana flutuantes no ar.
  - Arquimago Alquimista posicionado e animado **atrás do balcão** de mogno escuro polido.
  - Balcão místico decorado com o Grande Grimório Aberto com runas arcanas gravadas em folhas envelhecidas (referência direta à Witch Shop), frasco de ensaio com elixires borbulhantes e almofariz com ervas místicas trituradas.
  - Placa mística entalhada: \`[ 🔮 SANTUÁRIO ALQUIMISTA 🔮 ]\`.
  - Balão de fala de pergaminho místico reativo que descreve a alquimia e os benefícios permanentes de cada poção ao passar o cursor.
  - Vitrine dos 4 atributos permanentes (Vitalidade do Titã, Agilidade do Vento, Fluido Magnético e Sabedoria Ancestral) apresentada como 4 cartas de pergaminho pregadas com selos de cera arcanos, alvéolos circulares com aura colorida de poção, medidor de 5 gemas/cristais de nível lapidados e botões de infusão com moedas (\`AUMENTAR\`, \`COMPLETO ★\`).
- **👑 Menu Principal Panorâmico 16:9 & Brasão de Título Vitoriano:**
  - Céu crepuscular expandido para 960px com estrelas pixel art, constelações conectadas e lua cheia iluminando as montanhas.
  - Cordilheira com a silhueta do Castelo Real no horizonte com bandeiras e janelas douradas iluminadas.
  - Estrada de pedra dourada sinuosa descendo pelas colinas até a vila de Vale Dourado.
  - Pedestal rochoso com o Cavaleiro Heróico animado em pose nobre no primeiro plano esquerdo.
  - Brasão de Título nobre no topo inspirado em floreios de acanto vitorianos e ribbon real: bordas de ferro forjado, moldura de ouro antigo, rebites com relevo e tipografia serifada reluzente \`A JORNADA DO CAVALEIRO\`.
  - Painel de Ações da Corte / Tábula de Missões à direita com indicadores de Recorde (\`🏆\`) e Tesouro de Ouro (\`💰\`), divisores com diamantes dourados e botões bevelados de carvalho e ouro para Iniciar Jornada, Forja, Santuário, Conquistas, Recordes e Ajustes.
  - Botões rápidos de Som \`[M]\` e Tela Cheia \`[F]\` com moldura dourada e status ativo no topo direito.
- **🛡️ Interface de Jogo (HUD) Dark Fantasy UI Kit:**
  - Painéis superiores (Glória & Vida, Prata da Partida, Relíquia Ativa e Recorde) renovados com molduras duplas de ferro envelhecido e ouro, preenchimento em tom de couro curtido escuro e rebites de ouro nos 4 cantos.
  - Alvéolo circular de relíquia ativa com entalhes ornamentais nas bordas.
  - Barra de Experiência (XP) nobre com cantoneiras metálicas nas extremidades, medalhão de orbe de XP, canaleta com marcas métricas de segmento a cada 20% e preenchimento em degradê esmeralda/ciano místico.
  - Barra de Vida do Chefão com brasão gótico de ferro e espinhos laterais com rubi sangrento.
  - Toasts de Conquista animados estilizados como faixas de pergaminho real com rebites e coroa dourada.
- **📜 Modais e Botões Nobres Unificados:**
  - \`createModal\`: Fábrica de modais atualizada com brasão ornamental central no topo, asas de acanto, bordas chanfradas e rebites dourados.
  - \`createButton\`: Botões bevelados em madeira nobre e ouro com resposta visual de brilho âmbar ao passar o cursor e clique sonoro tátil.
  - Modularização limpa e restauração das funções \`showSettingsMenu\` e \`showRecordsMenu\` em \`menus.js\`.

---

`;

['CHANGELOG.md', 'JS_Teste/CHANGELOG.md'].forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const headerIdx = content.indexOf('## [v');
    if (headerIdx !== -1) {
      const updated = content.slice(0, headerIdx) + changelogEntry + content.slice(headerIdx);
      fs.writeFileSync(file, updated, 'utf8');
      console.log('Updated ' + file + ' successfully');
    }
  }
});
