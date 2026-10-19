# 📜 Notas de Atualização (Changelog) — A Jornada do Cavaleiro

Todas as alterações notáveis deste projeto serão documentadas neste arquivo, seguindo o padrão [Semantic Versioning](https://semver.org/) e [Keep a Changelog](https://keepachangelog.com/).

---

## [v1.6.0] — 2026-10-19
### 🗿 Título da Versão: **Combat Overhaul, Stone Golem & Refined Touch Controls**

### 📝 Descrição (GitHub Release & Commit):
> Boss Golem aos 60s com ejeção física e despertar de Mini-Golems conforme o HP, defesa do Mago com esquiva/teletransporte contra projéteis, movimentação em zigue-zague dos Goblins, sistema de vida padronizado em Corações/Hits, progressão infinita de armas com balanceamento, escalonamento de tamanho e Knockback da Espada, joystick virtual ancorado com toggle nas configurações e remoção do botão de ação.

### 🚀 O que mudou (22 Diretrizes Implementadas):
- **🧙 Defesa e Mecânicas do Mago Sombrio:**
  - **Imunidade a Projéteis:** O Mago agora ignora totalmente dano ao ser atingido por projéteis (flechas, bumerangues e bolas de fogo).
  - **Teletransporte Instantâneo de Esquiva:** Ao colidir com projéteis, o Mago emite faíscas arcanas e som de bloqueio místico, teletransportando-se imediatamente para uma coordenada segura aleatória no campo de batalha com aviso tático de *"ESQUIVA / TELEPORTE!"*. Dano corpo a corpo com a espada permanece eficaz contra ele.
  - **Spawn Raro:** Peso do Mago reduzido no pool de inimigos para ~8% de spawn rate, conferindo presença imponente e estratégica.
  - **Bloqueio de Progressão Pré-Boss:** O Mago só é adicionado ao pool de geração após a primeira derrota do Boss (\`bossDefeated === true\`).
- **🗿 Boss Fight do Golem de Pedra & Mini-Golems:**
  - **Surgimento Pontual aos 60s & Calibração de HP:** O Golem Ancestral agora desperta exatamente aos 60 segundos de partida (`BOSS_TRIGGER_TIME = 60`) com vida calibrada em 50 HP (fase de fúria aos ≤18 HP), proporcionando uma batalha intensa de 24 a 32 segundos sem se tornar uma esponja de dano.
  - **Pausa de Inimigos Comuns:** Durante toda a Boss Fight, a geração de monstros comuns fica suspensa; a arena é povoada exclusivamente pelo Golem e seus Mini-Golems.
  - **Ejeção Física com Salto do Torso:** Mini-Golems saltam fisicamente do peito do Boss em um arco parabólico com emissão de estilhaços de pedra e recuo no corpo do Golem, criando o efeito visual de lascarem da sua carcaça.
  - **Spawn Dinâmico & Teto Máximo de Mini-Golems:** O número de Mini-Golems expelidos escala com o dano sofrido pelo Chefão, com um **cap estrito de no máximo 5 Mini-Golems simultâneos na arena** e ciclo de ataque em fúria ajustado para 3.4s, prevenindo saturação da tela (*body block* fatal).
  - **Estado Inerte "Inconsciente/Pedra" & Gestão de Timers:** Ao aterrissarem, os Mini-Golems assumem o frame 2 com olhos fechados/apagados e corpo imóvel, sem ferir o jogador enquanto repousam no chão por 1.1s a 1.3s com limpeza garantida de `dormantTimer` ao serem derrotados.
  - **Transição e Despertar Ameaçador com Correção de Áudio:** Implementação do método sintetizado nativo `playFireStaff()` na classe `SoundSystem` (`audio.js`) e chamada defensiva em `boss.js`, corrigindo a causa raiz do crash `TypeError: sound.playFireStaff is not a function` ao despertar os Mini-Golems.
  - **Knockback Suave Exclusivo da Espada (Fim do Teleporte e Marcha Ré):** Remoção de repulsão no eixo X de todos os projéteis em `damageEnemy` e substituição da manipulação instantânea de velocidade (`velocity.x += kb * 4`) por interpolação suave via `Tween` (`Quad.easeOut`, 110ms) exclusiva para o golpe da Espada Vorpal. O monstro é empurrado com peso e amortecimento sem andar de costas.
  - **Blindagem de Teletransporte & Limites de Pista:** Coordenadas de fuga do Mago fixadas em [380, 740] (eliminando risco de culling fora da tela) e zigue-zague dos Goblins delimitado em [130, 520].
  - **Refatoração & Limpeza de Código Morto:** Purga de ~215 linhas de funções legadas obsoletas em `weapons.js` e correção de regressão de dano e dispersão do Escudo Nv.6+.
- **👺 IA e Trajetória dos Inimigos:**
  - **Movimentação em Zigue-Zague dos Goblins:** Os Goblins agora avançam em trajetórias senoidais oscilantes no eixo Y, tornando a aproximação mais dinâmica e imprevisível.
- **❤️ Padronização de Vida em Corações / Hits:**
  - **Vida Baseada em Corações/Hits:** Substituída a vida linear por corações discretos (3 corações base, expandíveis até 6 corações no Santuário do Mago).
  - **Dano Padronizado de 1 Hit:** Qualquer colisão com monstros ou projéteis subtrai rigorosamente 1 Coração, garantindo 1320ms de tempo de invulnerabilidade limpa (i-frames).
  - **UI de Vida com Ícones de Coração:** Substituição da barra por ícones de coração em Pixel Art no HUD que esvaziam para silhuetas de ferro ao sofrer dano.
- **🕹️ Controles Mobile e Joystick Virtual Aprimorado:**
  - **Joystick Virtual Ancorado:** Base do joystick agora é fixa e ancorada no canto inferior esquerdo (\`x: 110, y: 485\`), eliminando deslocamento flutuante indesejado ao tocar na tela.
  - **Configuração no Menu:** Novo botão *"JOYSTICK VIRTUAL: [AUTO / ATIVADO / DESATIVADO]"* adicionado ao Menu de Configurações, com persistência local em \`localStorage\`.
  - **Remoção do Botão de Ação:** O botão de ação tátil da direita foi permanentemente removido da tela, mantendo o visual limpo e fluido com ataque automático em cadência nativa.
- **⚔️ Balanceamento, Progressão Infinita e Escalonamento da Espada:**
  - **Nível Infinito de Armas:** Removida a barreira de nível 5; armas continuam acumulando níveis indefinidamente durante a partida, com fórmulas de dano contínuas e descrições dinâmicas nas cartas de Level Up.
  - **Dano Inicial Calibrado:** Nível 1 das armas de projétil inicia com poder reduzido, incentivando a evolução progressiva através de XP.
  - **Curva de Pacing Rebalanceada:** 0 a 20s suave com aparições pontuais de goblins; após a vitória do Boss, escalonamento agressivo com ondas densas.
  - **Escalonamento e Knockback da Espada:** A Espada Vorpal agora aumenta sua área de impacto (hitbox) a cada nível e empurra os inimigos com força de Knockback proporcional (\`22 + (lvl - 1) * 16\`).

---

## [v1.5.0] — 2026-10-19
### 📱 Título da Versão: **Mobile Web Touch & Virtual Joystick System**

### 📝 Descrição (GitHub Release & Commit):
> Suporte completo a dispositivos móveis no navegador web com Joystick Virtual analógico dinâmico de estética medieval integrada, isolamento real Multi-Touch por pointerId, botão dedicado de Ação/Ataque, atalho de Pausa rápida no HUD e prevenção nativa de comportamentos indesejados no navegador (scroll, pull-to-refresh e pinch zoom).

### 🚀 O que mudou:
- **Detecção Automática de Dispositivos Móveis (Web Mobile):**
  - Identificação precisa combinando touch capabilities (\`ontouchstart\`, \`maxTouchPoints > 0\`), media query \`(pointer: coarse)\` e detecção dinâmica do primeiro toque na tela (sem necessidade de recarregar a página em notebooks touch ou emuladores).
  - Ocultação automática em PCs desktop com mouse e teclado tradicionais, preservando a tela 100% limpa.
- **Mecânica do Joystick Virtual Analógico & Suporte Multi-Touch:**
  - Base flutuante dinâmica na lateral esquerda que surge sob o polegar do jogador (\`maxRadius = 54px\`, \`deadzone = 6px\`), retornando suavemente ao centro e à posição de repouso por interpolação senoidal ao soltar.
  - Movimentação analógica de 360° com modulação de velocidade proporcional à inclinação do pino (creeping x corrida total) respeitando rigorosamente a velocidade máxima do herói.
  - Rastreamento isolado de múltiplos toques por \`pointer.id\`, permitindo mover o personagem com o polegar esquerdo enquanto golpeia ou usa botões com o polegar direito.
- **Botão de Ação Tátil & Atalho de Pausa no HUD:**
  - Botão de Ação dedicado na lateral inferior direita (\`x: 695, y: 475\`) para disparo manual imediato ou postura de guarda/impulso defensivo.
  - Novo botão de Pausa rápida no HUD (\`x: 658, y: 34\`) para pausar a partida com um único toque sem depender da tecla \`ESC\` física em smartphones.
  - Tecla \`[ESPAÇO]\` mapeada no Desktop para disparar a mesma ação manual imediata.
- **Identidade Visual Medieval & Harmonia com o HUD:**
  - Base rúnica em ferro forjado e ouro envelhecido (\`0xc5a059\`) com marcadores cardeais e preenchimento em obsidiana translúcida.
  - Pino central estilizado como broquel nobre com cabochão de rubi radiante que se ilumina ao ser inclinado e emite uma linha de energia dourada conectada à base.
- **Prevenção de Gestos do Navegador:**
  - Inclusão de \`touch-action: none;\`, \`overscroll-behavior: none;\` e bloqueio de pull-to-refresh no \`style.css\` e meta tag de viewport com \`maximum-scale=1.0, user-scalable=no, viewport-fit=cover\`.

---

## [v1.4.0] — 2026-10-19
### 🏛️ Título da Versão: **Modular Architecture & Separation of Concerns**

### 📝 Descrição (GitHub Release & Commit):
> Desmembramento e modularização completa do monólito (7.450+ linhas) em uma arquitetura limpa, desacoplada e escalável composta por 21 submódulos distribuídos em pastas de domínio sob \`src/\` (Config, Core, Art, Combat, World, UI e Main). Preservação integral de 100% da mecânica, física, balanceamento e pixel art procedural com zero regressão e compatibilidade nativa imediata via script tags (suporta execução direta offline via \`file:///\`, servidores estáticos e GitHub Pages sem bundlers).

### 🚀 O que mudou:
- **Separação de Responsabilidades (SRP) & Arquitetura de Pastas:**
  - Código desmembrado em 21 arquivos modulares em \`src/\`:
    - \`src/config/\`: \`constants.js\`, \`palette.js\`, \`catalogs.js\` (constantes globais, paleta de cores e catálogos de armas/status/conquistas).
    - \`src/core/\`: \`events.js\`, \`state.js\`, \`storage.js\`, \`audio.js\` (EventBus, estado global de partida, persistência local e síntese de áudio chiptune).
    - \`src/art/\`: \`drawHelpers.js\`, \`characterArt.js\`, \`itemArt.js\`, \`worldArt.js\` (motores de rasterização e spritesheets procedurais de personagens, itens, cenários e vila).
    - \`src/combat/\`: \`weapons.js\`, \`combatManager.js\`, \`lootManager.js\` (estratégias de armas, colisões, dano e gerenciamento de esferas de XP e moedas).
    - \`src/world/\`: \`director.js\`, \`enemies.js\`, \`boss.js\` (diretor de ondas, spawns de hordas, IA de atiradores e boss fight do Golem Ancestral).
    - \`src/ui/\`: \`hud.js\`, \`modals.js\`, \`menus.js\` (HUD in-game, modais de draft e confirmação, e telas completas de menu, forja, mago e recordes).
    - \`src/main.js\`: Ciclo de vida principal da cena Phaser (\`preload\`, \`create\`, \`update\`) e instanciação do jogo.
- **Mapeamento de Dependências e Ordem de Carregamento Topológica:**
  - Carregamento ordenado e linear no \`index.html\`, garantindo resolução de dependências sem colisões ou ciclos.
  - Suporte total a carregamento padrão em navegadores locais sem necessidade de servidor HTTP ativo ou módulos ES6 restritivos por política CORS local.
- **Zero Regressão & Preservação Total:**
  - Todos os 199 símbolos e funções originais preservados com fidelidade exata.
  - Sincronização e atualização do arquivo unificado \`game.js\` para a versão \`v1.4.0\`.

---

## [v1.3.0] — 2026-10-19
### 🎨 Título da Versão: **Art & Architecture Overhaul**

### 📝 Descrição (GitHub Release & Commit):
> Refatoração profunda da arquitetura do jogo em microssistemas modulares e desacoplados (EventBus/Observer Pattern, Strategy Pattern para armas e Facade para persistência), eliminação de código morto/inutilizado e refinamento técnico de Pixel Art e VFX com foco em legibilidade, fluidez e estética medieval de alto nível.

### 🚀 O que mudou:
- **Arquitetura & Clean Code (SOLID):**
  - Implementado `GameEventBus` para desacoplar combate, áudio, partículas visuais, conquistas e recompensas.
  - Implementado `WeaponStrategies` e `WeaponSystem` (Open-Closed Principle), permitindo adicionar e balancear armas de forma isolada sem alterar o loop principal.
  - Implementado `StorageManager` (Facade Pattern) para centralizar e proteger todo o acesso a `localStorage` (ouro, recordes, conquistas e poções).
  - Removido código morto e variáveis fantasmas (`currentShopTab`, `trees`, método não utilizado `playPowerup`).
- **Redução de Poluição Visual (VFX):**
  - **Projéteis do Cajado de Fogo:** Redesenhados como cometas ígneos aerodinâmicos com núcleo solar penetrante; taxa de partículas de rastro reduzida em 65% e explosão em área otimizada e limpa.
  - **Projéteis do Inimigo Elfo:** Removida a esteira de estrelas estelares ofuscantes; telegraph pré-disparo simplificado para um brilho esmeralda sutil e direto.
- **Refinamento do Mago Inimigo:**
  - **Orbe Arcano:** Geometria 100% arredondada e esférica com gradiente volumétrico 3D, núcleo abissal curvo e reflexo especular (eliminado o aspecto quadrado).
  - **Visual do Personagem:** Nova vestimenta com corte de sobretudo longo estilizado (*trench coat* arcano), gola alta levantada, peitoral abotoado, cinto com fivela e caimento em "A" com fenda central fluida.
- **Cenário & Texturas:**
  - **Gramado da Floresta:** Redução de tufos densos de 15 para 7 elementos menores e assimétricos, eliminando padrões repetitivos na rolagem.
  - **Chão da Vila:** Calçamento clareado com tons nobres de cantaria e arenito, substituindo a grade quadriculada escura por um padrão orgânico e entrelaçado de lajotas e paralelepípedos (*cobblestone*).
- **Metadados:** Adicionadas constantes de versão `GAME_VERSION`, `VERSION_TITLE` e `VERSION_DESC`, exibidas na capa do jogo.

---

## [v1.2.0] — 2026-10-18
### ⚔️ Título da Versão: **In-Game Weapon Evolution & Boss Fight**
### 📝 Descrição:
- Introdução de progressão de nível dentro da partida via XP (Nível 1 básico a Nível 5 muito forte).
- Modal de Draft tático com 3 cartas de evolução e suporte a atalhos de teclado `[1]`, `[2]`, `[3]`.
- Primeira Boss Fight aos 120s: Golem Ancestral de Pedra com ataques telados e barra de vida dedicada.
- Duas novas armas de combate: Machado Bumerangue e Cajado de Fogo.

---

## [v1.1.0] — 2026-10-16
### 🛡️ Título da Versão: **The Forge, Sanctuary & Royal Vault**
### 📝 Descrição:
- Loja da Forja do Ferreiro para desbloqueio de novas armas com Ouro acumulado.
- Santuário do Mago com 4 poções permanentes de atributos (Vida, Velocidade, Raio do Ímã e Sabedoria XP).
- Sistema de Conquistas Reais com recompensas em Ouro.
- Motor de áudio chiptune 100% procedural com Web Audio API.

---

## [v1.0.0] — 2026-10-14
### 👑 Título da Versão: **Initial Release — A Jornada do Cavaleiro**
### 📝 Descrição:
- Versão inicial do jogo de sobrevivência arcade em Pixel Art.
- Mecânicas de corrida contínua, reflexão com escudo e combate contra goblins, guerreiros e arqueiros elfos.
- Tábula de Recordes local.
