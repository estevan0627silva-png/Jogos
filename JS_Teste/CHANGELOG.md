# 📜 Notas de Atualização (Changelog) — A Jornada do Cavaleiro

Todas as alterações notáveis deste projeto serão documentadas neste arquivo, seguindo o padrão [Semantic Versioning](https://semver.org/) e [Keep a Changelog](https://keepachangelog.com/).

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
