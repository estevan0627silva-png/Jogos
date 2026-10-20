# 📋 Histórico de Versões (Changelog)

Todas as alterações deste projeto estão documentadas aqui seguindo o padrão de Versionamento Semântico.

## [v2.3.0] — 2026-10-20
### 🎨 Título da Versão: **Remasterização Visual 64-Bit (Fidelidade Gráfica, Oclusão Volumétrica & Nitidez Consolidada)**

### 📝 Descrição (GitHub Release & Commit):
> Evolução gráfica completa dos 16-bit para 64-bit mantendo 100% da integridade física e alinhamento dos sprites: contorno inteligente sensível à luz (chanfro direcional/rim-light), sistema volumétrico de sombras de contato em 3 camadas com atenuação por altitude, vinheta atmosférica de alta definição, feixes solares volumétricos (Godrays) com blend aditivo e tipografia clássica nítida (Cinzel Serif) com contraste aprimorado.

### 🚀 O que mudou:
- **💎 Sombreador Procedural com Luz Direcional (Rim Light & Bevel 64-bit):**
  - O motor de rasterização procedural `drawPixels` foi reestruturado com lógica de luz ambiente incidente no quadrante superior-esquerdo.
  - Arestas externas superiores e esquerdas agora recebem chanfro suave luminoso (`C.outlineSoft`), enquanto as arestas inferiores e direitas recebem oclusão profunda (`C.outline`).
  - Adicionado helper utilitário de rim-light (`r.rim`) para realces volumétricos reflexivos.
  - **Zero Quebra de Malha:** Preservação estrita das dimensões (32x32, 48x48, 88x88), contagens de quadros de animação e pontos de ancoragem da lâmina da espada, escudo e projéteis.
- **🌑 Oclusão Volumétrica de Solo em 3 Camadas com Altura Dinâmica:**
  - O sistema de sombreamento sob entidades (`sortAndShade`) evoluiu de uma simples elipse dupla plana para um modelo físico de 3 camadas:
    1. *Halo Difuso Ambiente 64-bit:* Projeção ampla e suave que integra a criatura ao bioma.
    2. *Penumbra Suave Intermediária:* Zona de transição que confere peso gravitacional ao corpo.
    3. *Oclusão Nítida de Contato (Ambiente Occlusion):* Núcleo escuro assentando solas, patas e cascos firmemente na grama/terra.
  - Entidades no ar (como Mini-Golems ejetados em arco parabólico) agora escalam a dispersão e atenuação da sombra proporcionalmente à altitude (`altFactor`).
- **☀️ Feixes Solares Volumétricos (Godrays) & Atmosfera Viva:**
  - Geração procedural de texturas de raios solares angulares (`sunbeam_rays`) no dossel da floresta.
  - Renderizados com modo de mesclagem aditiva (`Phaser.BlendModes.ADD`), respiração senoidal de pulso suave e deslocamento por paralaxe relativo à câmera.
- **🌌 Vinheta Suave de Borda HD (Vignette 64-bit):**
  - Nova textura procedural de 800x600 (`vignette_64bit`) com 12 camadas de decaimento radial suave.
  - Fixada na câmera sobrepondo o cenário com blend sutil, concentrando o foco do jogador na arena central e eliminando bordas duras na tela.
- **📜 Tipografia Fantasia Crisp & Alto Contraste:**
  - Padronização de todas as fontes da interface, HUD, popups de dano e cartas de upgrade na família tipográfica clássica *Cinzel / Georgia Serif*.
  - Traçado de contorno protetor escuro (`#0e0b08`) com espessura calibrada para garantir legibilidade instantânea contra qualquer fundo de bioma.
  - Inclusão dos links de pré-carregamento Google Fonts com fallbacks locais 100% funcionais offline.

---

## [v2.2.0] — 2026-10-20
### ⚔️ Título da Versão: **Curva Exponencial Suave & Sistema Rítmico de Hordas Especiais**

### 📝 Descrição (GitHub Release & Commit):
> Calibração da curva inicial (0-20s suave com 1 monstro por vez, foco em farm de XP e zero arqueiros), aceleração exponencial progressiva, e sistema cíclico de Hordas Especiais a partir dos 45s (alternando entre Horda Densa de Goblins e Horda de Rastreadores com Guerreiros a cada 30 segundos com escalonamento dinâmico).

### 🚀 O que mudou:
- **🌱 Início Suave e Cadenciado (0 a 20s):**
  - **1 Monstro por Onda:** O início agora gera estritamente 1 inimigo por pulso (`waveCount = 1`), eliminando a sobrecarga de spawns nos primeiros segundos.
  - **Spawn Delay Calibrado:** `spawnDelay` inicial reajustado para 1150ms (em vez de 450ms).
  - **Zero Arqueiros na Largada:** Apenas Goblins normais (90%) e Guerreiros blindados ocasionais (10%) aparecem nos primeiros 20 segundos. Nenhum Elfo ou Mago atira projéteis no início.
  - **Cap Inicial de Tela:** Limitado a 10 inimigos simultâneos durante os primeiros 20 segundos.
- **📈 Progressão Exponencial em 3 Fases:**
  - **Fase 1 (0-20s):** Curva suave com foco no farm de gemas de XP e aquisição dos primeiros upgrades.
  - **Fase 2 (20-45s):** Transição com aceleração gradual, introdução dos Goblins Rastreadores e raros Elfos (5%).
  - **Fase 3 (45s+):** Escalação exponencial plena com ondas de 3 a 6 monstros e cap de até 55 monstros em tela.
- **🚨 Sistema Rítmico de Hordas Especiais (45s+, a cada 30 segundos):**
  - **Ativação Pontual:** O primeiro evento de horda inicia aos 45 segundos e repete a cada 30 segundos (45s, 75s, 105s, etc.), pausando durante o Boss Golem caso a batalha esteja ativa.
  - **Ciclo Alternado:**
    - **Ciclo Ímpar (45s, 105s...):** *Horda Densa de Goblins* (9 a 19+ Goblins disparados em rápida sucessão por toda a largura do caminho).
    - **Ciclo Par (75s, 135s...):** *Horda de Rastreadores Zigue-zague & Guerreiros Blindados* (mistura balanceada de velocidade e escudo).
  - **Avisos Táticos & Screenshake:** Anúncios visuais (`floatText`) no topo da tela com tremor de câmera e estrondo de terra na chegada de cada horda.

---

## [v1.8.0] — 2026-10-19
### 🛡️ Título da Versão: **Eliminação de Quadrados Pretos, Barreira Arcana Calibrada (1s/2s), Golpe Melee Penetrante & Mini-Golems Invulneráveis Inconscientes**

### 📝 Descrição (GitHub Release & Commit):
> Eliminação definitiva dos quadrados pretos nos ataques/reflexões do Mago Sombrio (substituição de textura ausente por 'orb_enemy' e remoção de círculos primitivos), calibração precisa da Barreira Arcana (duração de 1.0s e recarga de 2.0s), permissão de acerto por ataques corporais (Espada penetra o escudo), e invulnerabilidade absoluta dos Mini-Golems enquanto estiverem inconscientes.

### 🚀 O que mudou:
- **⬛ Fim dos Quadrados Pretos nos Ataques e Reflexões do Mago:**
  - **Causa Raiz 1 (Textura Ausente em Reflexão):** Em `reflectMageProjectile()`, a reflexão utilizava a chave inexistente `'arrow_enemy'`, fazendo o Phaser renderizar um bloco preto de 32x32 como fallback de textura ausente. Corrigido para disparar a orbe mística oficial `'orb_enemy'` e adicionada a textura `'arrow_enemy'` em `preload()`.
  - **Causa Raiz 2 (Artefato de Círculo Primitivo no Cast):** Remoção de `scene.add.circle()` no carregamento de disparo do Mago e do Elfo, substituindo por partículas luminosas (`holyFx` / `sparksFx`), eliminando qualquer artefato poligonal escuro durante a conjuração.
- **⏱️ Calibração da Barreira Arcana (1s Duração / 2s Cooldown):**
  - **Duração Estrita:** A barreira agora permanece erguida por exatamente **1.0 segundo** (1000ms).
  - **Recarga Periódica Estrita:** O tempo de recarga até a próxima ativação automática foi calibrado em **2.0 segundos** (2000ms), repetindo o ciclo ritmado de combate de forma justa e legível.
- **⚔️ Ataques Não-Projéteis (Espada) Atravessam a Barreira:**
  - A barreira arcana reflete exclusivamente projéteis. Golpes corpo a corpo da Espada Vorpal (`slashes`) agora penetram diretamente o escudo e causam dano ao Mago Sombrio mesmo durante a fase ativa da barreira.
- **🗿 Mini-Golems Totalmente Invulneráveis enquanto Inconscientes:**
  - Mini-Golems nos estados `EJECTING`, `DORMANT` e `AWAKENING` não recebem dano e não podem morrer sob nenhuma circunstância.
  - O dano só é permitido quando o Mini-Golem comprovadamente acorda e passa para o estado `ACTIVE` (com olhos vermelhos e perseguição ativa). A barra de vida overhead só é exibida quando despertam.
- **🪓 Correção do Bug de Multi-Hit do Machado/Martelo Bumerangue:**
  - **Causa Raiz:** O tracking anterior (`e.lastProjId`) era armazenado na entidade inimiga (`e`). Quando machados colidiam com a hitbox ampla do Boss (88x88), ocorria alternância de IDs frame a frame gerando até 60 hits por segundo e derrotando o Boss instantaneamente.
  - **Correção com Trava de Duplo Hit (Ida e Volta):** Cada projétil bumerangue rastreia isoladamente os inimigos atingidos (`hitEnemiesOut` e `hitEnemiesBack`). O projétil causa no máximo **1 hit na ida** e **1 hit na volta** por criatura (total de 2 instâncias de dano no máximo por arremesso).
- **Tela Cheia Estrita:** Somente a tecla **`F`** e o botão de maximizar do HUD/menu alternam o modo Tela Cheia.
  - **Remoção Total de Conflitos do `ESC`:** O listener `keydown-ESC` foi inteiramente removido do loop de gameplay, evitando o fechamento involuntário de tela cheia disparar o menu de pausa. Todos os textos de rodapé, tutoriais e botões foram atualizados para `[P]` e `[F]`.

---

## [v1.6.0] — 2026-10-19
### 🗿 Título da Versão: **Combat Overhaul, Stone Golem & Refined Touch Controls**

### 📝 Descrição (GitHub Release & Commit):
> Boss Golem aos 60s com ejeção física e despertar de Mini-Golems conforme o HP, defesa do Mago com esquiva/teletransporte contra projéteis, movimentação em zigue-zague dos Goblins, sistema de vida padronizado em Corações/Hits, progressão infinita de armas com balanceamento, escalonamento de tamanho e Knockback da Espada, joystick virtual ancorado com toggle nas configurações e remoção do botão de ação.

### 🚀 O que mudou (22 Diretrizes Implementadas):
- **🧙 Defesa e Mecânicas do Mago Sombrio:**
  - **Imunidade a Projéteis:** O Mago agora ignora totalmente dano ao ser atingido por projéteis (flechas, bumerangues e bolas de fogo).
  - **Teletransporte Instantâneo de Esquiva:** Ao colidir com projéteis, o Mago teletransporta-se para coordenada segura aleatória no campo de batalha [380, 740] com aviso tático de *"ESQUIVA / TELEPORTE!"*.
  - **Spawn Raro:** Peso reduzido para ~8% de spawn rate.
  - **Bloqueio de Progressão Pré-Boss:** Mago só surge após a primeira derrota do Boss.
- **🗿 Boss Fight do Golem de Pedra & Mini-Golems:**
  - **Surgimento Pontual aos 60s & Calibração de HP:** O Golem desperta exatamente aos 60s com 50 HP (fase de fúria aos ≤18 HP), proporcionando uma batalha ágil e tensa de 24 a 32s.
  - **Pausa de Inimigos Comuns:** Durante a luta contra o Boss, apenas o Golem e Mini-Golems estão presentes.
  - **Ejeção Física do Torso:** Mini-Golems saltam com arco parabólico e estilhaços de pedra do peito do Boss.
  - **Spawn Dinâmico & Teto de 5 Mini-Golems:** Ejeção escala com o HP restante, com cap rígido de 5 Mini-Golems ativos simultaneamente e ciclo de 3.4s em fúria.
  - **Estado Inerte & Despertar com Correção de Áudio:** Mini-Golems caem imóveis por 1.1s a 1.3s com eyes off, tremem e despertam com olhos vermelhos incandescentes. Adicionado método `playFireStaff()` nativo em `SoundSystem` e chamada defensiva em `boss.js`, sanando o crash fatal `TypeError: sound.playFireStaff is not a function`.
  - **Knockback Suave Exclusivo da Espada:** Remoção do deslocamento em X para todos os projéteis (zero knockback de projéteis). Substituída a corrupção de velocidade (`velocity.x += kb * 4`) por um `Tween` amortecido suave (`Quad.easeOut`, 110ms) exclusivo da Espada Vorpal, acabando com o teletransporte e o bug do inimigo andando para trás.
- **👺 IA e Trajetória dos Inimigos:**
  - **Zigue-Zague dos Goblins:** Movimentação senoidal oscilante no eixo Y limitada estritamente ao solo útil [130, 520].
- **❤️ Padronização de Vida em Corações / Hits:**
  - Substituição da barra por ícones de coração em Pixel Art; cada dano subtrai 1 Coração com i-frames generosos.
- **🕹️ Controles Mobile e Joystick Virtual Aprimorado:**
  - Joystick ancorado no canto inferior esquerdo (110, 485), botão de alternância no menu de configurações e remoção total do botão de ação.
- **⚔️ Balanceamento, Progressão Infinita e Escalonamento da Espada:**
  - Progressão infinita além do nível 5 com escalonamento equilibrado (+12% dano, limites de segurança de cadência).
  - Aumento progressivo de tamanho e empurrão proporcional da Espada Vorpal.
  - Purga de ~215 linhas de código legado obsoleto em `weapons.js`.

---

## [v1.2.4] - 2026-10-19 (Efeitos Visuais de Ação 16-bit: Projéteis Detalhados, Rastros de Corte Luminosos, Faíscas Metálicas, Sombras com Oclusão de Contato e Emitters Pré-Alocados)
### ⚔️ Arsenal Refinado do Cavaleiro & Projéteis das 5 Armas
- **Flechas Reais & Flechas de Ouro (`arrow_player`, `arrow_gold`)**: Penas azuis reais/douradas com pontas afiadas de navalha, anel metálico de reforço e esteira translúcida de vento e velocidade. Flechas douradas ativadas nos níveis 4 e 5.
- **Espada Vorpal (`drawBlade` / `slash_arc`)**: Lâmina de aço temperado com runa ciano luminosa e guarda dourada imperial. Arco de corte com gradiente de 4 camadas (aura profunda, ciano mágico, fio luminoso e gume incandescente) acompanhado por centelhas de impacto (`sparksFx`).
- **Machado Bumerangue (`drawAxeProj`)**: Lâmina dupla de meia-lua com gumes reluzentes de alto contraste, núcleo rúnico ciano e rotação fluida contínua em passos de 30 graus com centelhas de vento.
- **Cajado de Fogo & Cataclismo Solar (`drawFireballProj` / `explodeFireball`)**: Esfera solar com núcleo incandescente, labaredas vivas e cauda de brasas com emissão de fagulhas em voo. Detonação com onda de choque concêntrica dupla (núcleo branco-dourado + anel de fogo) e chuva de brasas (`emberFx`).
- **Escudo Sagrado & Onda de Choque Divina (`shield_aura` / `holyFx`)**: Aura rúnica protetora ciano com 4 nós cardeais reluzentes orbitando o herói. Ao quebrar, detona uma onda de choque sagrada dupla com estilhaços cintilantes de luz celestial.

### 🏹 Projéteis Inimigos
- **Flechas Élficas Homogeneizadas (`arrow_elf`)**: Empenamento e ponta cristalina em verde-esmeralda vibrante com rastro luminoso de partículas mágicas, garantindo leitura instantânea mesmo em combates caóticos.
- **Orbes do Mago Sombrio (`drawMageOrb`)**: Singularidade negra do Abismo envolta por anel estroboscópico de magenta e violeta pulsante com centelha espectral no centro.

### 🌑 Sombras Dinâmicas com Oclusão de Contato (`sortAndShade`)
- **Sistema de Duplo Passe (Penumbra + Core)**: Eliminação do aspecto de "disco colado". Cada entidade possui penumbra translúcida suave para dispersão no terreno e núcleo escuro de oclusão de contato que ancora firmemente os pés no solo.
- **Dimensões e Física Proporcionais**:
  - *Cavaleiro*: Penumbra `22x7` e Core `15x4`.
  - *Guerreiro de Ferro*: Penumbra `26x8` e Core `18x5`.
  - *Goblin & Elfa*: Penumbra `18x6` e Core `12x3`.
  - *Mago Sombrio*: Sombra suave deslocada verticalmente simulando levitação mágica.
  - *Gárgula*: Sombra projetada no nível do solo simulando voo rasante em altitude.
  - *Boss Golem Ancestral*: Sombra colossal de monólito titânico (`74x20` / `56x12`).

### 💥 Impactos Físicos, Faíscas & Flash Estrito
- **Sistema de Partículas Especializadas Pré-Alocadas**: 6 emissores permanentes (`dustFx`, `hitFx`, `sparksFx`, `debrisFx`, `holyFx`, `emberFx`) sem nenhuma alocação de memória durante o combate (zero risco de Memory Leak).
  - *`sparksFx`*: Faíscas metálicas velozes de lâminas, armaduras e bloqueios.
  - *`debrisFx`*: Lascas físicas de madeira para impactos em árvores e fragmentos de pedra para rochas com física de gravidade.
  - *`holyFx`*: Estrelas cintilantes sagradas para reflexões do escudo e bênçãos.
  - *`emberFx`*: Fagulhas ardentes para o fogo do cajado.
- **Flash Branco de Dano Estrito**: Impactos acionam um flash branco de 65ms (`0xffffff`) que resolve rapidamente em alívio âmbar/normal, mantendo feedback claro sem fadiga visual.

---

## [v1.2.3] - 2026-10-19 (Modernização de Entidades de Combate 16-bit: Cavaleiro com Ciclo de Corrida de 4 Quadros, 6 Criaturas Ameaçadoras com Silhueta Expressiva e Chefe Golem Ancestral Monumental)
### 🛡️ O Cavaleiro da Alvorada (`drawKnight`, 32x32, 4 frames)
- **Elmo de Aço Polido**: Viseira em T com chanfro metálico de aço temperado, reflexo especular de alto brilho e fresta de olhar heróico.
- **Pluma Real Vermelha Vibrante**: Tecido esvoaçante em 3 tons de carmesim/rubi que balança suavemente acompanhando a passada.
- **Armadura e Heráldica Imperial**: Peitoral de placas de aço espelhado sobre cota de malha, tabardo azul real com a Cruz Dourada Imperial em alto relevo, ombreiras torneadas e cinto de couro com fivela de ouro imperial.
- **Ciclo de Corrida Fluido de 4 Quadros (`knight_run`)**: Animação em 12 FPS com passadas alternadas, impulso e contato ao solo com física e cadência realistas, preservando 100% da caixa de colisão física do jogador (`16x22`, offset `8x8`).

### 👹 Criaturas da Floresta e Inimigos Sombrios
- **Goblin Ladrão (`drawGoblin`, 28x28, 2 frames)**: Pele esverdeada texturizada em 4 tons, orelhas pontudas destacadas com sombra anatômica interna, vestes de couro esfarrapadas, bolsa de saques nas costas e adaga enferrujada com gume polido ameaçador.
- **Guerreiro de Ferro Corrompido (`drawWarrior`, 36x36, 2 frames)**: Couraça pesada de ferro forjado bruto, elmo fechado com chifres afiados de osso curvado, capa carmesim rasgada esvoaçante e espada larga de ferro com runa brilhante de sangue na lâmina.
- **Elfa Arqueira Silvestre (`drawElf`, 32x32, 2 frames)**: Capa esvoaçante em verde-musgo e teal profundo, arco longo de teixo entalhado com empunhadura reforçada, aljava com flechas de ponta de aço, cabelos loiros dourados esvoaçantes e botas de camurça.
- **Mago do Abismo (`drawDarkMage`, 32x32, 2 frames)**: Manto arcano roxo com bordas de runas mágicas luminosas em ciano, capuz sombrio com olhos arcanos espectrais brilhantes e cajado com orbe mágica levitante que pulsa energia mística.
- **Gárgula de Pedra Alada (`drawGargoyle`, 32x32, 2 frames)**: Asas pétreas com articulações marcadas e membranas carmesins, garras de rocha afiadas e olhos vermelhos incandescentes em voo rasante ameaçador.
- **Mini Golem de Pedra (`drawMiniGolem`, 28x28, 2 frames)**: Granito maciço rachado com fissuras de magma carmesim brilhantes, tufo de musgo ancestral no topo da cabeça, punhos de pedra e olhos vermelhos incandescentes com reflexos de calor.

### 🗿 Chefe Golem Ancestral Desperto (`drawBossGolem`, 88x88, 2 frames)
- **Monólito Titânico em Alta Definição**: Sprite monumental com placas tectônicas chanfradas de granito e dithering 16-bit suave.
- **Musgo Ancestral em Camadas**: Vegetação secular cobrindo o crânio e os ombros tectônicos em degradê natural de folhas e musgo dourado.
- **Coração Rúnico e Veios de Magma**: Fornalha elemental central no peitoral esculpido com runas antigas que pulsam entre os quadros de animação, com ramificações incandescentes irradiando para os braços ciclópicos e ombros.
- **Olhos de Fogo Incandescente**: Fendas de calor fundido com núcleo de rubi vivo, reflexos especulares e respiração de calor.
- **Alinhamento e Hitbox Intactos**: Caixa de colisão física estritamente preservada em `62x74` com offset `13x8`, mantendo 100% do balanceamento e ataques da Boss Fight.

---

## [v1.2.2] - 2026-10-19 (Modernização de Cenário 16-bit: Terreno com Relevo, Estrada com Sulcos e Franjas Orgânicas, Parallax Florestal Volumétrico e Estruturas Rústicas da Vila dos Cavaleiros)
### 🌲 Parallax Florestal & Terreno Orgânico ('ground', 'road', 'forest_top', 'forest_bottom')
- **Gramado Medieval (`ground` 128x128)**: Solo verde rico com micro-texturas em dithering suave, tufos volumosos em leque com sombra inferior, pedrinhas 3D incrustadas, folhas caídas de outono e flores silvestres (margaridas, campânulas e miosótis) com contraste equilibrado para máxima legibilidade de combate.
- **Estrada Real de Terra Batida (`road` 64x80)**: Leito de terra batida quente com dois sulcos paralelos de rodas de carroça, caminho central de cascalho compactado e bordas recortadas com dentes de grama orgânicos, eliminando divisões artificiais com a relva.
- **Copas Ancestrais em Parallax (`forest_top` 128x110)**: Troncos espessos de carvalho com casca rugosa e musgo dourado, sustentando copas esféricas volumosas com 4 níveis de iluminação e brilho de luz solar filtrada, com repetições milimétricas em `[-128, 0, 128]` para rolagem horizontal 100% contínua e sem costuras.
- **Arbustos com Bagas Silvestres (`forest_bottom` 128x80)**: Moitas densas em primeiro plano com sombras na base, ramagens espinhosas e bagas silvestres carmesins cintilantes.

### 🏰 A Vila dos Cavaleiros & Arquitetura Medieval ('village_plaza', 'village_blacksmith', 'village_stable', 'village_house', 'village_wall_v', 'village_gate_tower', 'village_npc')
- **A Praça e Alameda Imperial (`village_plaza` 480x440)**: Pátios calçados com lajotas de cantaria chanfradas e rejunte de argamassa sombreado, alameda central ladeada por meio-fio de pedra, jardineiras com moldura de carvalho e arandelas de tocha acesas.
- **A Forja do Ferreiro (`village_blacksmith` 112x84)**: Telhado cerâmico de terracota sobreposta, fornalha ardente com núcleo incandescente e faíscas brilhantes, chaminé de cantaria com cinzas e bigorna pesada de aço sobre cepo de carvalho com reflexo metálico.
- **O Estábulo Real (`village_stable` 120x84)**: Celeiro de madeira envelhecida com telhado de palha dourada, sótão com ferradura da sorte, cavalo alazão na baia com estrela branca e arreios de couro, fardos de feno e cocho de água límpida brilhante.
- **Chalés de Enxaimel (`village_house` 72x64)**: Alvenaria clássica de madeira e argamassa clara (Fachwerk), alicerce rústico com hera trepadeira, janela iluminada aconchegante e porta de carvalho maciço.
- **Muralha & Torreão do Portão (`village_wall_v` 32x96 e `drawGateTower` 48x96)**: Paliçada de troncos aguçados com abraçadeiras de ferro forjado e rebites dourados, torreão com ameias, tocha viva e estandarte heráldico do Reino.
- **Aldeões Acolhedores (`village_npc` 24x28)**: Roupas camponesas rústicas, gorros de lã e animação acenando com lenço branco para abençoar a jornada do Cavaleiro.

---

## [v1.2.1] - 2026-10-19 (Infraestrutura Gráfica 16-bit: Paleta Expandida de Sub-tons, Primitivas de Desenho com Dithering/Shine/Bevel e Moedas em Alta Definição)
### 🎨 Paleta Expandida de Sub-tons (`const C`)
- **Organização em Rampas de 3 a 4 Cores**: Estruturação cromática com iluminação direta, base e oclusão para todos os materiais essenciais (Aço, Ferro, Ouro, Prata, Rubi, Madeira, Couro, Pele, Vegetação, Magia Arcana, Fogo e Terra).
- **100% de Retrocompatibilidade**: Todas as 24 chaves originais de cor foram preservadas e mantidas com seus valores originais para garantir que nenhum sprite existente apresente regressão visual.

### 🖌️ Primitivas de Desenho Procedural em `drawPixels`
- **`r.dither(colorA, colorB, x, y, w, h, invert)`**: Dithering óptico 16-bit com xadrez sub-pixel 1x1, permitindo gradientes suaves e transições realistas de iluminação.
- **`r.shine(x, y, subX, subY, color)`**: Ponto de reflexo especular de alta precisão (1 sub-pixel) para simular brilho de luz em metais e joias.
- **`r.bevel(highlightColor, shadowColor, x, y, w, h)`**: Chanfro tridimensional procedural para bordas elevadas com luz superior/esquerda e sombra inferior/direita.
- **Silhueta e Contorno Blindados**: Todas as primitivas respeitam integralmente os 4 passes de contorno escuro (`C.outline`), garantindo silhuetas 100% sólidas sem vazamentos.

### 🪙 Demonstração Cirúrgica: Moeda de Ouro e Moeda de Prata 16-bit
- **`drawGoldCoin` (16x16, 2 frames)**: Aro octagonal chanfrado em `goldDeep`, cunhagem rebaixada com dithering `goldLight` / `goldBase`, emblema nobre imperial e ponto de reflexo especular.
- **`drawSilverCoin` (16x16, 2 frames)**: Aro em `silverShadow`/`silverDeep`, textura interna de prata brunida, relevo central e brilho de metal polido.
- **Preservação de Dimensões e Física**: Tamanhos de frame mantidos em 16x16 no TextureManager e lógica de coleta/física do Arcade Physics 100% intocadas.

---

## [v1.2.0] - 2026-10-18 (Sistema Completo de XP e Level Up Roguelike, Draft de 3 Cartas, Menus Temáticos da Forja do Ferreiro & Santuário do Mago, Tábula de Conquistas e Rebalanceamento Gráfico e de Combate)
### 🔮 Sistema de Experiência (XP), Orbes Cintilantes e Barra Modular no HUD (`gainXp` + `xpOrbs` + `updateXpHUD`)
- **Orbes de XP Dinâmicos (`drawXpOrb`, `16x16`, 2 frames)**: Inimigos derrotados dropam orbes arcanos com animação cintilante e pulso gravitacional magnético.
  - *Goblins*: 1 XP.
  - *Guerreiros de Ferro*: 2 XP.
  - *Gárgulas Aladas*: 2 XP.
  - *Magos Sombrios*: 3 XP.
  - *Golem Ancestral (Boss)*: 25 XP.
- **Barra de XP no HUD (`hudXpBar`)**: Integrada no topo da interface (`110, 64, 575x10`), com moldura nobre de carvalho e preenchimento verde esmeralda / ciano, nível atual (`NÍVEL X`) e contador numérico (`XP: Y / Z`).
- **Retenção de Excedente de XP**: Ao subir de nível, qualquer XP excedente é mantido e transferido para o próximo patamar sem desperdício.

### 🃏 Interface de Seleção de Upgrades (RNG Draft Screen de 3 Cartas) (`openLevelUpDraft` + `rollLevelUpCards`)
- **Pausa Automática de Combate**: Ao preencher a barra de XP, o mundo do jogo pausa com segurança (`gameState = 'LEVEL_UP'`), a música diminui suavemente e a fanfarra triunfante de Level Up é executada (`playLevelUp`).
- **Sorteio RNG de 3 Cartas Distintas**: Apresenta exatamente 3 cartas de upgrade nobres com bordas ornamentadas, ícones, categoria e descrição de combate.
- **Controle Flexível**: Seleção imediata por clique com o mouse ou pelas teclas numéricas de atalho `[1]`, `[2]` e `[3]`.
- **Fila de Níveis Pendentes & Invulnerabilidade Justa**: Suporta múltiplos Level Ups acumulados em fila e concede `750ms` de invulnerabilidade ao retornar ao jogo para evitar dano injusto imediato.

### ⚔️ Rebalanceamento Roguelike das Armas em 5 Níveis (`MAX_WEAPON_LEVEL = 5`)
- **Evolução Gradual e Poder Máximo**: Armas começam com cadência e dano comedidos no Nível 1 e tornam-se forças colossais no Nível 5:
  - *Arco Élfico de Caça (`bow`)*: Nv.1 (1 flecha lenta, 1 dano) ➔ Nv.5 (5 flechas quádruplas em leque com perfuração e cadência ultra-rápida).
  - *Espada Larga de Aço (`sword`)*: Nv.1 (corte curto frontal) ➔ Nv.5 (lâmina colossal +60%, dano 4 e 2 ondas de vento cortante).
  - *Escudo Sagrado dos Reis (`shield`)*: Nv.1 (bloqueio frontal básico) ➔ Nv.5 (aura sagrada total, reflexo de até 4 flechas por golpe e onda de choque sísmica).
  - *Machado de Batalha Pesado (`axe`)*: Nv.1 (1 machado bumerangue) ➔ Nv.5 (4 machados gigantes em órbita contínua perfurando todos os inimigos).
  - *Cajado Flamejante Vulcânico (`firestaff`)*: Nv.1 (1 orbe solar pequeno) ➔ Nv.5 (Cataclismo Solar: 3 mega meteoros com 115px de raio e dano em área).

### 🔨 A Forja do Ferreiro Real (`showBlacksmithMenu`)
- **Ambiente Temático de Forja**: Cenário com fornalha incandescente, bigorna de aço e o Mestre Ferreiro animado (`blacksmith_master`) atrás do balcão.
- **Desbloqueio com Ouro Persistente**: Armas avançadas (*Machado Pesado* por `25G` e *Cajado Vulcânico* por `45G`) podem ser comissionadas pelo jogador para entrarem permanentemente no drop da floresta e na seleção de cartas.
- **Seleção de Arma Inicial**: O jogador pode escolher sua arma favorita desbloqueada para iniciar equipado logo nos portões de Vale Dourado.

### 🧙 O Santuário do Mago Alquimista (`showMageShopMenu`)
- **Ambiente Místico com o Arquimago**: Balcão arcano com frascos borbulhantes, ervas raras, runas brilhantes e o Arquimago animado (`mage_master`).
- **Upgrades Exclusivos de Status Permanentes (`STATUS_CATALOG`)**:
  - *Elixir do Coração de Rubi (`maxHp`)*: Vida máxima de 1 a 4 Corações.
  - *Poção dos Ventos Alados (`moveSpeed`)*: Velocidade de corrida de 280 a 380 px/s.
  - *Extrato de Ímã Astral (`magnet`)*: Raio magnético de atração de Orbes de XP e Moedas de Prata de 90px a 310px.
  - *Infusão de Ervas Arcanas (`wisdom`)*: Bônus de ganho de XP (+15% a +65%) e duração prolongada de todas as relíquias (+0.6s a +2.5s).

### 🏆 Tábula de Conquistas do Reino (`showAchievementsMenu` + `ACHIEVEMENTS_CATALOG`)
- **8 Conquistas de Combate com Recompensas em Ouro**:
  - *Caçador de Goblins I (15) & II (60)*
  - *Quebrador de Ferro I (10) & II (40)*
  - *Caçador do Oculto I (8) & II (30)*
  - *Escudo Espelhado I (10) & II (35)*
- **Notificações Visuais em Tempo Real (Toasts)**: Efeito sonoro triunfal (`playAchievement`), painel animado no topo da tela e concessão imediata de Ouro persistente.
- **Tábula de Honra**: Tela dedicada com barras de progresso `X / Alvo`, percentual e selos dourados de honra.

### 🎯 Correção Gráfica de Resolução, Alinhamento de Tela Cheia e Suavidade
- **Eliminação do Aspecto "Torto" em Fullscreen**: Remoção do conflito entre o flexbox do `body` e o `autoCenter: Phaser.Scale.CENTER_BOTH`, ancorando o canvas em container dedicado com margem zero.
- **Fim do Visual "Esfarelado"**: Remoção das rotações sub-pixel contínuas (`setAngle`) em sprites de baixa resolução, ativação estrita de `roundPixels: true`, `antialias: false` e filtro `NEAREST` em todas as texturas procedurais.
- **Director Dinâmico Escalável**: Onda de monstros em levas crescentes (`spawnDirectorWave`) e extensão do clímax do Boss Golem Ancestral para os 120 segundos.

---

## [v1.1.0] - 2026-10-18 (Modo Tela Cheia, Escalonamento Dinâmico 4:3, Economia Prata -> Ouro, Loja de Upgrades em 2 Abas com Status, Correção de Crash e Coleta Magnética)
### 🖥️ Tela Cheia (Fullscreen), Escalonamento Dinâmico e Proporção 4:3 (`config.scale` + `toggleFullscreen`)
- **Ativação de Tela Cheia (`toggleFullscreen`)**: Implementado suporte nativo à Fullscreen API via `scene.scale.toggleFullscreen()` com fallback para `document.documentElement.requestFullscreen()`. Pode ser ativada pela tecla `[F]` (protegida durante a digitação de iniciais no *Game Over*) ou pelos botões clicáveis no HUD (`hud_fullscreen`), Menu Principal, Modal de Pausa e Configurações.
- **Escalonamento Dinâmico de Resolução (`Phaser.Scale.FIT` + `CENTER_BOTH`)**: O mundo do jogo (`GAME_WIDTH = 800`, `GAME_HEIGHT = 600`) redimensiona automaticamente para qualquer monitor ou janela preservando estritamente o **Aspect Ratio 4:3**, sem esticar ou achatar os gráficos, mantendo `image-rendering: pixelated` em [`JS_Teste/style.css`](file:///f:/programação%20de%20jogos/Jogos/JS_Teste/style.css).
- **Ancoragem de UI e Containers (`hudContainer`, `menuContainer`, `createModal`)**: Todos os elementos de interface utilizam coordenadas relativas a `GAME_WIDTH`/`GAME_HEIGHT` e `.setScrollFactor(0)`.

### 🛡️ Correção do Reflexo do Escudo & Economia de Moedas de Prata -> Ouro (`consolidateSilverToGold`)
- **Reflexo Normal de Flechas (`playerHit`)**: Ao bloquear projéteis com o Escudo Sagrado (`buff.type === 'shield'`), as flechas refletidas agora mantêm a textura e o comportamento normais (`arrow_player`) com feedback `✦ REFLETIDO! ✦`, removendo o antigo comportamento de "flechas de ouro" e o ganho instantâneo de ouro por reflexo.
- **Drop de Moedas de Prata na Partida (`silver_coin` / `runSilver`)**: Inimigos derrotados durante a jornada dropam **Moedas de Prata (`drawSilverCoin`)** contabilizadas em tempo real no HUD (`PRATA`).
- **Conversão de Fim de Partida (Prata -> Ouro Persistente)**: Ao encerrar a partida (`gameOver` -> `consolidateSilverToGold`), todas as Moedas de Prata coletadas (somadas ao bônus de sobrevivência e de Boss derrotado) são consolidadas e convertidas em **Ouro persistente (`STORAGE_GOLD_KEY`)** para uso na Loja de Upgrades.

### 🛠️ Correção Definitiva do Crash ao Acessar a Loja de Upgrades Após a Morte (`showShopMenu` + `gameOver`)
- **Causas Raiz Eliminadas**:
  1. Definida a constante global `MAX_WEAPON_LEVEL = 4` (que antes gerava `ReferenceError` ao abrir a loja).
  2. Padronizada a propriedade `levels` em `WEAPON_CATALOG` com validação defensiva `Array.isArray(cfg.levels)` (evitando `TypeError: Cannot read properties of undefined (reading '0')`).
  3. Corrigida a chave de animação do ícone de moeda na loja de `'coin_spin'` (inexistente) para `'gold_coin'`.
  4. Adicionados os métodos `playPowerup()` e `playPlayerHurt()` em `SoundSystem`.
  5. Removido `scene.tweens.pauseAll()` de `gameOver()` e garantido `scene.tweens.resumeAll()` + `scene.time.timeScale = 1` ao abrir `showShopMenu` e `restartScene`, impedindo que os botões da loja ficassem congelados após a morte.

### 📜 Correção de Texto Transbordando no Pop-up de Fim de Partida (`showInitials` & `showLeaderboard`)
- **Bounding Box Interna, WordWrap e Auto-Ajuste (`fitTextToBox`)**: Os modais de *Game Over* (`620x480`) e *Tábula dos Campeões* (`580x450`) agora contam com um painel interno delimitado (`summaryBox`), `wordWrap` configurado para a largura útil e redução automática de `fontSize` caso o texto ultrapasse a caixa, mantendo alinhamento centralizado (`setOrigin(0.5)`).

### 🏪 Loja de Upgrades em 2 Abas (Itens e Status), Sem Sobreposição e com Botão Voltar `[ESC]` (`showShopMenu` + `STATUS_CATALOG`)
- **Divisão em 2 Abas**:
  - **⚔️ UPGRADES DE ITENS (`items`)**: Evolução das 5 relíquias (`Arco Real`, `Espada Vorpal`, `Escudo Sagrado`, `Machado Bumerangue` e `Cajado de Fogo`).
  - **❤️ UPGRADES DE STATUS (`status`)**: Novos atributos permanentes (`STORAGE_STATUS_KEY`) com ícones em pixel art (`stat_magnet`, `stat_health`, `stat_speed`):
    - **Magnetismo Real (`magnet`)**: Aumenta o raio de atração das moedas (`68px` → `200px`).
    - **Coração de Ferro (`maxHp`)**: Aumenta a Vida Máxima do Cavaleiro (`1` → `4` Corações no HUD, com `1.2s` de invulnerabilidade após dano).
    - **Grevas Aladas (`moveSpeed`)**: Aumenta a velocidade de movimento (`195` → `255`).
- **Fim da Sobreposição do Contador de Ouro**: O saldo de Ouro foi reposicionado em uma barra dedicada abaixo do título (`x: 548..740, y: 94..128`), alinhada às abas e totalmente separada do cabeçalho e dos cartões.
- **Botão Visível `VOLTAR / SAIR [ESC]` (`exitSubMenu`)**: Adicionado no topo direito e no rodapé da Loja e de todos os submenus, executando exatamente a mesma função do atalho `ESC`.

### 🧲 Correção da Física e Fluidez na Coleta de Moedas (`spawnCoinDrop` + `updateGameplay`)
- **Atração Magnética Suave**: Removido o tween infinito no eixo Y (`repeat: -1`) que conflitava com `physics.moveToObject` e travava o movimento vertical da moeda. Adicionado `scene.tweens.killTweensOf(c)` ao entrar no raio magnético (`getMagnetRadius()`), hitbox generosa (`28x28`) e coleta instantânea a `< 28px` do herói.

---

## [v1.0.0] - 2026-10-18 (Escudo Reflete Flechas em Ouro, Loja de Upgrades, Novas Armas, Inimigos Bullet-Hell & Correção da Arte das Casas da Vila)
### 🛡️ Escudo Sagrado Reflete Projéteis em Ouro (`playerHit`)
- **Reflexão Dourada Instantânea**: Quando uma flecha ou orbe inimigo (`enemyArrows`) atinge o Escudo Sagrado do Cavaleiro, o projétil é convertido e **refletido para a frente como Flechas de Ouro (`arrow_gold`)** de alto dano (`2 de dano` e perfuração no Nv.4), além de conceder **Ouro imediato (`+2🪙` a `+4🪙`)** com efeito sonoro cristalino e texto flutuante `REFLETIDO EM OURO!`.
- **Onda de Choque Aprimorada**: Colisões corpo a corpo continuam liberando a Onda de Choque Sagrada, cujo raio e dano contra o Boss aumentam conforme o nível do Escudo na Loja.

### 🪙 Economia de Ouro Persistente & Loja de Upgrades (`showShopMenu` + `WEAPON_CATALOG`)
- **Ouro Persistente (`knight_quest_gold_v1`)**: Todo ouro coletado das moedas dropadas por monstros (`+1🪙`), refletido pelo Escudo (`+2🪙` a `+4🪙`) ou conquistado ao derrotar o Golem Boss (`+15🪙` + chuva de moedas) é salvo automaticamente e exibido em tempo real no novo módulo **TESOURO** do HUD, no Menu Principal e no fim da partida.
- **Loja de Upgrades & Arsenal Real (`showShopMenu`)**: Acessível pelo Menu Principal e diretamente na tela de Fim de Jogo (*Game Over*), permitindo desbloquear novas relíquias e evoluir todas as armas até o **Nível 4**:
  - **Arco Real (`bow`, Nv. 1 a 4)**: Evolui para *Multiple Shots* em leque estilo *shotgun* (`1`, `2`, `3` e `4` flechas simultâneas com perfuração) e maior cadência de tiro.
  - **Espada Vorpal (`sword`, Nv. 1 a 4)**: Aumenta o alcance/tamanho da lâmina (`+26%` por nível), acelera o tempo de golpe (`420ms` → `270ms`), eleva o dano (`2` → `4`) e libera uma **Onda de Vento Dourada** no Nv. 4.
  - **Escudo Sagrado (`shield`, Nv. 1 a 4)**: Reflete de `1` a `4` Flechas de Ouro por projétil bloqueado, aumenta o ouro ganho por reflexão e amplia a duração e a Onda de Choque.
  - **Machado Bumerangue (`axe`, Desbloqueável por `25🪙`, Nv. 1 a 4)**: Nova arma! Arremessa de `1` a `4` machados giratórios (`axe_proj`) que avançam, freiam no ar e retornam como bumerangue, atravessando todos os inimigos na ida e na volta.
  - **Cajado de Fogo (`firestaff`, Desbloqueável por `40🪙`, Nv. 1 a 4)**: Nova arma! Dispara de `1` a `3` orbes solares (`fireball_proj`) que explodem no impacto (`explodeFireball`), causando dano em área (AoE) e destruindo projéteis inimigos.

### 🦇 Novos Inimigos Bullet-Hell (`gargoyle` & `dark_mage`)
- **Gárgula Alada (`drawGargoyle`, `32x32`, 2 frames)**: Surge a partir dos `12s` de jogo, voando em trajetória senoidal contínua (`y = baseY + sin(...) * 46`) que exige movimentação vertical constante.
- **Mago Sombrio (`drawDarkMage`, `32x32`, 2 frames, `2 HP`)**: Surge a partir dos `24s` de jogo, conjurando e disparando um **leque Bullet-Hell de 3 Orbes Arcanos (`orb_enemy`)** simultâneos (`-18°`, `0°`, `+18°`) que podem ser esquivados, destruídos pela Espada/Cajado ou refletidos em Ouro pelo Escudo!

### 🎨 Correção Definitiva das Casas da Vila ("Mordidas") e Polimento Geral de Pixel Art (`art_director`)
- **Fim das Casas com Partes Faltando (`drawVillageHouse`, `drawVillageBlacksmith`, `drawVillageStable`)**:
  - Corrigido o loop de telhado da **Casa do Ferreiro** e do **Estábulo**, que antes desenhava um trapézio invertido (`x = 9 + i, w = 44 - i * 2`), deixando buracos triangulares nas laterais do telhado.
  - Corrigido o loop de telhado da **Cabana da Vila (`drawVillageHouse`)**, que antes tinha centro deslocado (`x = 18 - row, w = 12 + row * 2` numa grade `36x32`), cortando a direita e deixando a parede esquerda descoberta.
  - Todas as construções da Vila agora possuem telhados triangulares/trapezoidais sólidos de `2px` de espessura por degrau, beirais completos e paredes maciças sem falhas.
- **Revisão de Contornos e Margens dos Inimigos**: Polimento visual em `drawWarrior`, `drawBossGolem` e `drawMiniGolem` garantindo margem segura de `1px` dentro dos limites do canvas para evitar qualquer recorte brusco nas bordas dos sprites.

---

## [v0.9.9] - 2026-10-18 (Vila de Vale Dourado Completa com Ferreiro, Estábulo e NPCs, Correção de Dano da Espada, Moeda de Ouro Visual & Menu Limpo)
### 🏘️ Vila de Vale Dourado Coesa, Cheia de Vida e Unificada (`spawnStartingVillage` + `art_director`)
- **Pátio Calçado Unificado e Caminho de Paralelepípedos (`village_plaza`, `480x440`)**: Eliminado o aspecto "em pedaços" da vila! Agora o ponto de partida possui uma praça pavimentada contínua que integra todas as construções, canteiros floridos, postes de luz aquecidos e uma avenida central de pedras calçadas com meio-fio levando até o portão.
- **Casa do Ferreiro (`village_blacksmith`, `112x84`)**: Oficina de pedra e carvalho com chaminé fumegante, fornalha incandescente com brasas vivas, **bigorna de aço (`bigorna`)** sobre cepo de madeira e mostruário de armas (escudo e espadas).
- **Casa do Cuidador de Cavalos / Estábulo (`village_stable`, `120x84`)**: Celeiro amplo com telhado de madeira rústica, baia com um **Cavalo (`cavalo`)** marrom de crina escura e estrela branca na testa, fardos de **feno dourado (`feno`)**, cocho de água e ferradura pendurada.
- **Muralha Contínua e Grande Portão da Vila (`village_wall_v` + `village_gate_tower`)**: Perímetro fechado por paliçada vertical contínua conectada às duas Torres do Portão com ameias, brasões reais e tochas acesas.
- **Moradores (NPCs) Dando Tchau e Desejando Boa Sorte (`village_npc`, `24x28`, 2 frames)**: 4 aldeões posicionados na beira do caminho acenando com o braço para o Cavaleiro e exibindo votos de boa sorte (`"Boa sorte!"`, `"Força, Herói!"`, `"Proteja o Reino!"`, `"Vá com luz!"`).

### ⚔️ Correção Definitiva do Bug de Dano Imenso ao Pegar Outra Espada (`code_architect`)
- **Causa Raiz Identificada**: Ao coletar uma segunda Espada enquanto outra já estava ativa, `collectItem` zerava `nextAttack: 0`, disparando um segundo `slash` (`200ms` de duração) simultâneo ao anterior. Como a checagem de colisão usava `e.lastSlashId !== s.slashId`, dois *slashes* ativos alternavam suas IDs no mesmo inimigo a cada frame (60 FPS), causando até **48 de dano em 0,2 segundo** e derretendo o Boss instantaneamente.
- **Tripla Blindagem Aplicada**:
  1. Comparação monotônica estrita `(e.lastSlashId ?? 0) < s.slashId` no overlap de `slashes`.
  2. Limpeza imediata de qualquer `slash` residual antes de criar um novo golpe em `swingSword`.
  3. Preservação da cadência `nextAttack` em `collectItem` ao coletar uma relíquia do mesmo tipo que já está ativa.

### 🪙 Drop Visual de Peça de Ouro nos Monstros Derrotados (`gold_coin`, `16x16`)
- **Moeda Real Cintilante (`drawGoldCoin`, 2 frames)**: Quando derrotados, os monstros agora têm chance de dropar uma peça de ouro no chão (`55%` Guerreiro, `45%` Elfo, `35%` Goblin, `30%` Mini Golem, além de uma chuva de `5 moedas` ao derrotar o Golem Boss).
- **Efeito Puramente Visual (Preparação Roguelike)**: A moeda salta com física de *bounce*, brilha no caminho e pode ser recolhida pelo Cavaleiro com som cristalino (`playCoin`), partículas douradas e texto flutuante `✦ OURO! ✦` (sem contabilização numérica no HUD por enquanto, conforme solicitado).

### 🖼️ Limpeza da Capa do Menu Principal (`showMainMenu`)
- Removidos todos os objetos espalhados pela tela de título (inimigos caídos, flecha cravada, pedras soltas, placa de madeira, pontilhado e caixa inferior de relíquias).
- Mantida uma composição limpa, nobre e focada: **o Castelo ao fundo, o Caminho Real passando pela Vila de Vale Dourado, o Cavaleiro Heróico em primeiro plano e os botões de ação**.

---

## [v0.9.8] - 2026-10-18 (Saída dos Portões da Vila Inicial & Disparo Garantido dos Arqueiros)
### 🏡 A Partida da Vila & O Grande Portão (`spawnStartingVillage`)
- **Largada Imersiva na Vila**: Toda partida agora começa com o Cavaleiro iniciando sua jornada a partir de sua vila natal (*Vale Dourado*), com o cenário exibindo:
  - **Cabanas Rústicas com Chaminé e Fumaça (`village_house`, `72x64`)**: Telhados de palha e carvalho, vigas de sustentação e janelinhas iluminadas nas bordas superior e inferior.
  - **Paliçada de Toras Pontiagudas (`village_fence`, `48x32`)**: Cerca defensiva de madeira reforçada protegendo as laterais do vilarejo.
  - **O Grande Portão da Vila (`village_gate_tower`, `48x96`)**: Duas torres de vigia com ameias, estandartes reais em azul e ouro e tochas acesas flanqueando a estrada.
- **Transição Suave para a Floresta**: O jogador tem controle imediato para correr e se posicionar enquanto as estruturas da vila deslizam suavemente para trás.
- **Spawn de Monstros Após a Travessia**: Os monstros começam a surgir apenas aos `3.5 segundos` de partida, quando o Cavaleiro cruza os portões e adentra a perigosa Floresta Proibida!

### 🏹 Correção do Disparo Garantido dos Arqueiros Élficos (`elfShoot`)
- **Primeiro Disparo Garantido aos 650ms**: Eliminado o atraso e a restrição de distância que impedia os elfos de atirar quando o jogador avançava. Agora, todo arqueiro que surge na tela prepara e dispara sua primeira flecha após `650ms` (logo na entrada da tela), continuando o loop a cada `1700ms` enquanto permanecer vivo.
- **Critério de Linha Justa e Abrangente**: Ajustada a verificação para `elf.x > player.x + 25` e `elf.x <= 790`, garantindo que o arqueiro atire independentemente da posição do cavaleiro no caminho.

---

## [v0.9.7] - 2026-10-18 (Upgrade Artístico do Boss Golem 88x88, Olhos Vermelhos & Investida Linear)
### 🎨 Direção de Arte: Novo Colosso Titânico 88x88 (`drawBossGolem`)
- **Escala Monumental (`88x88` pixels)**: O Golem Ancestral de Pedra foi ampliado de `64x64` para `88x88` (grade `44x44` em escala `2x`), ficando quase 3 vezes maior que o Cavaleiro e muito mais robusto na arena (`hitbox` ajustada para `62x74`).
- **Composição de Pixel Art 16-bit Detalhada**:
  - **Ombros Ciclópicos com Espigões e Rachaduras**: Placas sobrepostas de granito e ardósia com contorno escuro, chanfrados iluminados (`steelLight`) e fissuras tectônicas.
  - **Olhos Vermelhos Incandescentes**: Olhos reestilizados em tons estritamente escarlates e rubros (`darkRed`, `red`, `0xff1744`, `0xff5252`, `0xff8a80`) sob sobrancelhas de rocha pesadas e franzidas em "V" (*cara de mau*), acompanhados pelos Mini Golems também com olhos vermelhos.
  - **Manto de Musgo e Vinhas Pendentes**: Camadas detalhadas de musgo em 3 tons (`leafDark`, `leaf`, `leafLight`) no topo do crânio, ombros e antebraços.
  - **Torso Blindado, Mandíbula Serrilhada e Punhos Gigantes**: Presas de pedra na mandíbula, coração rúnico vermelho irradiando veios pelo peito e manoplas/punhos maciços com nós dos dedos esculpidos.

### 🛠️ Correção da Investida Linear & Limpeza Visual (`bossColossalPunch`)
- **Fim do Teletransporte antes da Investida (`code_architect`)**:
  - Removido o salto instantâneo de coordenada vertical (`boss.y = laneY`); agora o Golem inicia o ataque exatamente da altura (`boss.y`) em que já está caminhando.
  - Substituído o tween brusco (`Back.easeIn` em `220ms`) por uma preparação suave de `18px` durante o aviso seguida de um avanço linear e fluido (`Quad.easeIn` em `380ms`) e retorno contínuo (`Sine.easeOut` em `460ms`), sincronizando o corpo físico (`boss.body.updateFromGameObject()`) a cada quadro.
- **Faixa Vermelha Limpa (Sem Texto)**: Removido o texto de cima da faixa de alerta vermelha, mantendo apenas o indicador luminoso vermelho na área do ataque.

---

## [v0.9.6] - 2026-10-18 (Primeira Boss Fight aos 60s: Golem Ancestral de Pedra, Mini Golems, Chão Craquelado & Alertas de Ataque)
### 🗿 O Primeiro Chefão: Golem Ancestral de Pedra (`boss_golem`, 60s)
- **Aparição aos 60 Segundos (`BOSS_TRIGGER_TIME = 60`)**: Ao atingir 60 segundos de sobrevivência, o Golem Ancestral de Pedra (`64x64`, muito maior que os inimigos comuns) entra na arena com som sísmico e tremor de câmera.
- **Pixel Art de Fantasia Medieval (`drawBossGolem`)**: Titã rochoso desenhado proceduralmente com placas de pedra rachada, tufos de musgo verde nos ombros e cabeça, sobrancelhas franzidas de "cara de mau", olhos rúnicos incandescentes, núcleo energético no peito e punhos colossais.
- **Presença Permanente até a Derrota**: Diferente dos inimigos comuns, o Boss não desaparece pela esquerda da tela (`!s.isBoss` no *cull*); ele patrulha verticalmente a arena (`x = 685`) até seus `40 HP` serem zerados.
- **Barra de Vida do Chefão no HUD (`bossHudContainer` / `updateBossHUD`)**: Painel dedicado no topo central da interface (`GOLEM ANCESTRAL DE PEDRA`) com barra de vida rubra dinâmica e contador numérico (`40/40`).

### 🎯 Golpes com Alerta Vermelho Prévio, Chão Craquelado & Rochas como Escudo
- **Fim do Spawn Aleatório de Rochas**: As rochas arredondadas (lisas e com musgo) não surgem mais aleatoriamente na estrada; agora elas são geradas exclusivamente pelos ataques do Golem de Pedra.
- **Golpe 1 — Arremesso de Rochas + Chão Craquelado (`bossThrowRocks` & `spawnBossRockAt`)**:
  - **Alerta Vermelho (`950ms` antes do impacto)**: Círculo vermelho pulsante com mira no chão avisa exatamente onde cada rocha vai cair para o jogador desviar.
  - **Chão Craquelado (`cracked_ground`) & Rocha-Escudo**: Ao atingir o solo, a rocha causa tremor sísmico, cria uma cratera de **chão rachado/craquelado** sob ela e permanece no cenário como um obstáculo sólido que bloqueia flechas (funcionando como escudo/cobertura) e utiliza o sistema suave anti-aprisionamento.
- **Golpe 2 — Soco Colossal (`bossColossalPunch`)**:
  - **Alerta Vermelho em Faixa Horizontal (`880ms` de aviso)**: O Golem projeta uma faixa retangular vermelha brilhante à sua frente (`<<< SOCO COLOSSAL! DESVIE! <<<`) antes de avançar em alta velocidade com seu punho gigante e onda de impacto.

### 🪨 Filhotinhos de Pedra (`mini_golem`) + Atmosfera e Música de Boss
- **Mini Golems de Pedra (`drawMiniGolem`, `28x28`)**: Durante a Boss Fight, surgem os "filhotinhos" do Golem (criaturas compactas de pedra com musgo na cabeça e olhos brilhantes) acompanhando os demais inimigos da floresta.
- **Filtro Dramático no Cenário (`bossFilterOverlay` + Tints)**: A chegada do Boss aplica um filtro vulcânico/terroso sobre o cenário e as florestas, que se dissipa suavemente quando o Golem é derrotado.
- **Música Tensa de Boss Fight (`BOSS_MELODY`, `BOSS_BASS`, `playEarthSmash`)**: Nova trilha sonora sintetizada em Ré Menor Harmônico / Frígio em andamento acelerado com baixo pesado e bumbo duplo de guerra, além de efeitos sonoros sísmicos de impacto de rocha.

---

## [v0.9.5] - 2026-10-18 (Tela de Capa 800x600, Música de Menu, Rochas Arredondadas & Ajuste de HUD)
### 🎨 Menu Principal de Tela Completa ("Capa de Jogo" 800x600)
- **Cena Épica de Capa (`showMainMenu`)**: Substituído o modal pop-up por uma ilustração completa de tela inteira (`800x600`) digna de capa de RPG medieval:
  - **O Reino ao Horizonte**: Céu crepuscular em degradê com constelações, Lua Cheia dourada, cordilheira de montanhas e a silhueta imperial do **Castelo do Reino** com torres, estandartes e janelas acesas.
  - **Caminho Sinuoso & Elementos de Mapa**: Estrada real que serpenteia dos portões do castelo até o primeiro plano, com trilha cartográfica tracejada, marcos de batalha e placa de encruzilhada.
  - **Cavaleiro com as 3 Relíquias (`drawKnightBanner`)**: O Cavaleiro Heróico agora exibe simultaneamente a **Espada Vorpal** erguida, o **Escudo de Aço** empunhado no braço e o **Arco Real** com aljava nas costas, além de uma vitrine das 3 relíquias na base da capa.
  - **Inimigos Derrotados no Caminho**: Um Guerreiro de Armadura e um Goblin caídos à beira da estrada com uma flecha cravada, contando a história do combate.
- **Trilha Sonora Medieval de Menu (`MENU_MELODY` & `startMenuBGM`)**:
  - Nova composição sintetizada via Web Audio API em Lá Dórico/Menor com timbre suave de harpa/alaúde real (~88 BPM) exclusiva para os menus, transicionando automaticamente para a marcha heróica de batalha ao iniciar o jogo.

### 🪨 Rochas Arredondadas em 2 Versões (`drawRock`)
- **Design Arredondado (Direção de Arte)**: Eliminada a base reta chapada das pedras em favor de um contorno oval/esférico com chanfrado nas bordas inferiores e brilho zenital no topo.
- **Duas Variantes na Mesma Spritesheet (`rock`, 2 frames)**:
  - **Frame 0**: Rocha arredondada **lisa** (mineral polido com fissuras).
  - **Frame 1**: Rocha arredondada **com musgo** (vegetação de fantasia medieval nos relevos).

### ⏱️ Centralização do Contador de Segundos no HUD (`createHUD` / `updateItemHUD`)
- **Alinhamento Harmônico no Painel de Relíquias**: Barra gráfica ampliada para `114px` (`x: 328..442`) e contador numérico reposicionado em `x = 474, y = 35.5` com origem centralizada (`0.5, 0.5`), garantindo margem interna confortável sem nunca encostar na borda direita do painel.

---

## [v0.9.4] - 2026-10-18 (Desvio Suave de Obstáculos & Rochas Medievais no Caminho)
### 🛡️ Física Suave & Fim da "Cuspida" (`separatePlayerFromObstacle`)
- **Deslocamento Gradual e Contínuo**: Substituído o salto instantâneo de posição (`oy + 2`) por um passo de esmagamento suave (`squeezeStep = Math.min(oy, 2.4)` pixels por quadro). O jogador agora sente a pressão física do obstáculo empurrando-o aos poucos para o lado, sem sobressaltos ou perda de controle.
- **Prioridade e Autonomia do Jogador**: Se o jogador estiver pressionando `W` / `Seta Cima` ou `S` / `Seta Baixo`, o sistema direciona o desvio para a direção desejada pelo próprio jogador, permitindo direcionar ativamente a fuga.
- **Proteção Completa contra Empurrar Obstáculos**: Obstáculos mantêm seu eixo vertical travado (`lockedY`) e continuam seu percurso pela tela sem nunca serem parados ou carregados pelo cavaleiro.

### 🪨 Novos Obstáculos: Rochas Medievais com Musgo (`drawRock` & `spawnRock`)
- **Arte em Pixel Art 16-bit**: Novas rochas desenhadas proceduralmente com tons de ardósia mineral, facetas lapidadas iluminadas e tufos de musgo verde de fantasia medieval.
- **Obstáculo no Caminho Central**: As rochas nascem periodicamente no caminho/estrada (`y: 290-370`), preenchendo a área central do mapa e criando percursos dinâmicos de navegação.
- **Cobertura Tática de Combate**: Assim como as árvores, as rochas bloqueiam projéteis de ambos os lados. Flechas que colidem com uma rocha produzem faíscas e o som metálico/mineral de bloqueio (`playShieldBlock`), servindo de escudo estratégico contra arqueiros élficos.
- **Integração Unificada (`obstacles`)**: Árvores e rochas foram unificadas no grupo físico `obstacles`, otimizando a lógica de colisão, culling e renderização de sombras.

---

## [v0.9.3] - 2026-10-18 (Correção de Colisão de Árvores, Postura do Cavaleiro & Polimento de Jogabilidade)
### 🐛 Correções Críticas de Jogabilidade
- **Eliminação do Bug de "Carregar Árvores" (`separatePlayerFromTree`)**:
  - Substituído o solver padrão de colisão física entre jogador e árvores por uma resolução customizada (`separatePlayerFromTree`).
  - As árvores agora possuem eixo vertical travado (`lockedY`) e `pushable = false`, garantindo que **jamais** tenham sua posição ou velocidade alteradas pelo jogador.
  - Quando o cavaleiro fica prensado entre o limite esquerdo da tela e um tronco de árvore em movimento, ele desliza suavemente na vertical para cima ou para baixo ao redor do tronco, permitindo que a árvore siga seu caminho e saia da tela normalmente sem prender o jogador.
- **Postura de Combate Sempre Voltada para a Frente (`flipX = false`)**:
  - Ao recuar para a esquerda (`A` ou `Seta Esquerda`), o cavaleiro agora mantém o olhar, a armadura, o escudo, o arco e os golpes de espada **sempre voltados para a frente (direita)** na direção da estrada e dos inimigos, recuando em passo tático (*kiting*) sem virar de costas para a batalha.
- **Correções Adicionais de Jogabilidade**:
  - **Anel de Concentração Élfica (`chargeRing`)**: Agora acompanha a posição do Elfo em tempo real enquanto ele caminha e é destruído imediatamente caso o Elfo seja abatido durante o carregamento.
  - **Prevenção de Sobreposição de Inimigos (`spawnEnemy`)**: Verificação de distância vertical no momento do spawn impede que dois inimigos nasçam exatamente na mesma coordenada empilhados um sobre o outro.
  - **Prevenção de Relíquias Presas em Troncos (`spawnItem`)**: Os itens agora verificam a posição das árvores próximas ao surgir, evitando nascer dentro da hitbox de um tronco.
  - **Filtro de Áudio Fora da Tela (`hitTree`)**: Flechas que atingem árvores fora dos limites visíveis da tela não disparam mais som ou partículas de madeira desnecessariamente.
  - **Sincronização de Velocidade e Limite de Knockback**: Inimigos ativos na tela sincronizam sua velocidade quando a dificuldade sobe, e o empurrão (*knockback*) nos Guerreiros de Armadura respeita o limite visível da tela (`x <= 785`).

---

## [v0.9.2] - 2026-10-18 (Estabilização Técnica, Nivelamento de Combate & Refinamento Visual)
### 🛠️ Arquitetura & Correção de Bugs (`code_architect`)
- **Prevenção de Duplicação de Listeners no Restart**: Adicionado evento de `SHUTDOWN` da cena para limpar todos os ouvintes de teclado (`removeAllListeners`), eliminando o bug onde pressionar `ESC` ou `M` disparava múltiplos eventos após reiniciar partidas.
- **Proteção contra Dessincronização da Web Audio API**: O agendador `scheduleBGM` agora ressincroniza `nextStepTime` caso a aba tenha ficado em segundo plano, prevenindo travamentos ou rajadas sonoras ao retornar para a aba.
- **Ciclo de Vida Seguro da Espada (`slash.blade`)**: A destruição da lâmina visual agora está vinculada ao evento `destroy` da hitbox do golpe e possui validação de `active`, impedindo erros caso o jogo termine no meio de um ataque.
- **Fábrica Unificada de Modais (`createModal`) e `restartScene`**: Unificada a construção de janelas medievais (molduras duplas, cantos com rebites, sombras de título e divisórias) e transição de cena via `restart({ autoStart })`, enxugando mais de 70 linhas redundantes.

### ⚖️ Nivelamento & Game Design (`gameplay_balancer`)
- **Curva de Dificuldade Justa com Teto (*Hard Cap*)**: Velocidade inicial ajustada para `200`, escalonamento a cada `4s` e teto máximo fixado em `380 px/s` (com intervalo mínimo de spawn de `500ms`), impedindo que inimigos atinjam velocidades impossíveis em partidas longas.
- **Guerreiro de Armadura (Tank de 2 HP)**: Agora possui **2 pontos de vida** e barra de integridade própria acima do elmo. Resiste a 1 flecha com som metálico e recuo, ou é abatido de uma só vez pelo corte da **Espada Vorpal** (2 de dano).
- **Disparo Élfico Legível e Justo**: Tempo de aviso ampliado de `180ms` para `360ms` com anel de concentração mágica visível e distância mínima de segurança (`140px`), garantindo tempo real de reação humana.
- **Rework do Escudo de Aço**: Duração ampliada para `9s`. Agora **rebate flechas inimigas gratuitamente** sem quebrar, e ao colidir contra um inimigo libera uma **Onda de Choque Sagrada** de `135px` que elimina ameaças ao redor.

### 🎨 Direção de Arte & Game Feel (`art_director`)
- **Partículas de Poeira de Caminhada (`dustFx`)**: Emissão sutil de poeira da estrada sob os pés do cavaleiro em movimento.
- **Anel Mágico dos Elfos & Onda de Choque**: Efeitos visuais procedurais para o carregamento de flecha élfica e explosão radial ciano do escudo.
- **Barras de Vida/Armadura de Inimigos (`enemyHpBars`)**: Indicador visual acima de inimigos blindados (pronto para suportar futuros Chefes/Bosses).

---

## [v0.9.1] - 2026-10-18 (Entrada Raiz index.html & Guia de Compartilhamento)
### 🚀 Distribuição & Execução Rápida
- **Arquivo Raiz `index.html`**: Criado ponto de entrada principal na raiz do repositório, permitindo que qualquer pessoa que baixe o projeto execute o jogo instantaneamente com apenas dois cliques, sem necessidade de VS Code, Live Server ou ferramentas de desenvolvedor.
- **Pronto para GitHub Pages**: Estrutura agora 100% compatível com a raiz (`/`) do GitHub Pages para publicação online imediata via link web.
- **Guia de Compartilhamento no README**: Documentadas detalhadamente as duas formas de distribuição para amigos: via link direto (GitHub Pages) ou mantendo o repositório 100% privado (convite de colaboradores e download do ZIP).

---

## [v0.9.0] - 2026-10-18 (Sistema de Pausa ESC & Barra Flutuante de Duração de Habilidade)
### ⏸️ Sistema de Pausa (Tecla ESC)
- **Congelamento Completo de Estado (`pauseGame` / `resumeGame`)**: Pressionar a tecla `ESC` a qualquer momento durante o combate pausa a simulação física do Phaser 3, os timers de spawn, os tweens ativos e as animações do cavaleiro e inimigos sem qualquer dessincronização.
- **Atenuação da Trilha Sonora**: Volume da música de fundo (BGM) reduzido suavemente para nível atmosférico (~0.04) durante a pausa, restaurando o volume épico integral (~0.14) ao retornar.
- **Modal Medieval de Pausa**: Painel nobre em carvalho e bronze contendo:
  1. *Tempo de Combate*: Segundos sobrevividos até o momento do congelamento.
  2. *Relíquia Ativa*: Nome e tempo restante exato da arma/habilidade em uso.
  3. *Continuar Jornada*: Retoma a aventura imediatamente (ou através de outro toque na tecla `ESC`).
  4. *Controle de Áudio*: Alterna o som (Ativado/Mutado) com sincronização em tempo real à tecla `M` e ao ícone de corneta no HUD.
  5. *Reiniciar Missão*: Reinicia a batalha do início sem passar por telas intermediárias.
  6. *Menu Principal*: Retorno direto à tela inicial do cavaleiro.
- **Navegação Intuitiva em Menus**: A tecla `ESC` também retorna ao menu principal caso pressionada enquanto estiver nas telas secundárias de Recordes ou Configurações.

### ⏳ Barra Flutuante de Duração sobre o Cavaleiro (Overhead Buff Bar)
- **Indicador Direto sobre o Personagem**: Adicionada barra gráfica de duração centralizada a ~9px acima da pluma do elmo do cavaleiro, acompanhando sua movimentação em tempo real.
- **Conveniência de Gameplay**: O jogador agora sabe com precisão o tempo restante de seu item sem precisar desviar o olhar para o topo da tela, mantendo o foco total nas esquivas e no combate.
- **Cores Temáticas por Relíquia**:
  - 🏹 **Arco Real**: Preenchimento dourado reluzente (`#ffeb3b`).
  - 🛡️ **Escudo de Aço**: Preenchimento ciano radiante (`#7fe7ff`).
  - 🗡️ **Espada Vorpal**: Preenchimento prateado reluzente (`#ffffff`).
- **Alerta Crítico de Fim de Efeito**: A barra transiciona para vermelho pulsante de emergência (`#ff3030`) nos últimos 1.8 segundos, alertando instantaneamente sobre o término da proteção ou poder.
- **Gerenciamento de Visibilidade**: A barra é limpa imediatamente ao expirar o tempo, ao ter o escudo quebrado por impacto, ou em caso de derrota.

---

## [v0.8.1] - 2026-10-18 (Campo de Entrada & Placeholder de Iniciais)
### ⌨️ Interface & Usabilidade
- **Moldura Visual de Input**: Adicionada caixa de texto estilizada em madeira escura e bordas duplas de bronze/ouro no modal de derrota, deixando claro que há um campo interativo de digitação.
- **Placeholder Temático (`EX: ART`)**: Exibição de placeholder sutil e esmaecido quando o jogador ainda não começou a digitar, indicando claramente a expectativa de 3 letras maiúsculas.
- **Cursor Animado**: Cursor pulsante dourado (`|`) indicando prontidão de escrita.
- **Dica de Digitação**: Adicionada legenda indicativa inferior (`⌨️ Digite 3 letras no teclado`).

---

## [v0.8.0] - 2026-10-18 (Menu Principal Medieval & HUD Modular em Pixel Art)
### 🏰 Menu Principal Medieval & Game Feel
- **Ilustração do Cavaleiro Heróico**: Adicionada imagem em pixel art em destaque do Cavaleiro (`knight_banner`), com animação contínua de respiração/flutuação suave sobre sombra elíptica.
- **Moldura Nobre de Madeira e Bronze**: Caixa central com bordas duplas em bronze e ouro, acabamento de carvalho escuro e rebites metálicos nos quatro cantos.
- **Título Régio**: Tipografia clássica com sombra profunda projetada e estandarte imperial (*"CRÔNICAS DE SOBREVIVÊNCIA"*).
- **Três Telas de Navegação Integradas**:
  1. **Começar o Jogo**: Transição imediata para a jogabilidade, revelando o HUD e iniciando a trilha sonora.
  2. **Tábula dos Campeões (Recordes)**: Exibição do Top 5 com placas nobres, medalhas (Coroa, Prata, Bronze), pontuações em segundos e botão *Voltar ao Menu*.
  3. **Configurações do Reino**: Ajuste interativo de áudio (botão liga/desliga com feedback sonoro) e *Pergaminho de Combate* com dicas táticas (cobertura em árvores, deflexão de flechas com a espada e escudo).
- **Fundo Vivo**: O cenário da floresta rola em marcha lenta ao fundo durante o menu, criando profundidade visual e atmosfera antes da partida.

### 🛡️ HUD Modular em Pixel Art (Sem Emojis)
- **Eliminação Total de Emojis Genéricos**: Substituição de emojis de texto por 4 módulos visuais independentes com texturas de pixel art desenhadas à mão:
  1. **Painel de Glória (Top-Left)**: Placa entalhada com ícone da **Ampulheta Mística** (`hud_hourglass`) e contador de tempo de sobrevivência.
  2. **Slot de Equipamento Central (Top-Center)**: Moldura de ferro e bronze com o ícone da arma em uso (`ARCO REAL`, `ESCUDO DE AÇO`, `ESPADA VORPAL`), nome nobre e **barra gráfica de duração** com preenchimento dinâmico que fica rubra nos 2 segundos finais.
  3. **Painel de Recorde (Top-Right)**: Placa nobre com a **Coroa Imperial de Ouro e Rubis** (`hud_crown`) e pontuação máxima do reino.
  4. **Medalhão de Áudio (Extremo Top-Right)**: Botão compacto com ícone de **Corneta Medieval** (`hud_horn` ativo/mudo) com hover dourado e atalho `M`.
- **Visibilidade Inteligente**: O HUD permanece oculto durante os menus e telas de derrota, aparecendo apenas durante o gameplay ativo.

### 🕹️ Fluxo Arcade de Fim de Jogo
- A tela de derrota agora oferece dois botões: **`NOVA JORNADA`** (reinício imediato para jogar sem pausas) e **`MENU INICIAL`** (retorno à tela de título do cavaleiro).

---

## [v0.7.0] - 2026-10-18 (Trilha Sonora e Efeitos Sonoros Chiptune)
### 🎵 Trilha Sonora & Sequenciador (BGM)
- **Música Procedural Medieval Chiptune**: Trilha de aventura contínua em Lá menor (Am) inspirada em clássicos retrô (estilo *Castlevania*, *Golden Axe*, *Ghosts 'n Goblins* e *Zelda*).
- **Sequenciador Lookahead com Web Audio API**: 3 canais sincronizados diretamente no relógio de hardware do navegador (`AudioContext.currentTime`), com zero travamentos ou descompassos:
  - *Lead melódico*: sintetizador em onda triangular com filtro passa-baixas aveludado tocando a marcha heróica.
  - *Baixo pulsante*: sintetizador em onda sawtooth filtrada com progressão harmônica medieval de 4 compassos (Am → F → Dm → E/Am).
  - *Bateria 8-bit*: bumbo de onda senoidal decadente e caixa/chimbal sintetizados em rajadas de ruído filtrado.
- **Mixagem Equilibrada**: volume da música em segundo plano (~0.14) permitindo que os efeitos sonoros de ação se destaquem com máxima clareza.
- **Ciclo de Vida Musical**: a música começa automaticamente ao clicar em "INICIAR MISSÃO" e cessa no momento da derrota ("O Cavaleiro Tombou").

### 🔊 Efeitos Sonoros 100% Sintetizados (SFX)
- **Disparo de Arco (`playBow`)**: estalo da corda do arco com sweep descendente de frequência combinado a silvo de vento.
- **Flecha dos Elfos (`playElfShot`)**: assobio místico e agudo cintilante em chirp senoidal duplo.
- **Golpe de Espada (`playSword`)**: rajada cortante de ruído em banda com corte sibilante somado à ressonância da lâmina de aço.
- **Morte / Impacto em Inimigo (`playEnemyHit`)**: estalo retrô "crunch" com varredura quadrada descendente e burst de impacto.
- **Bloqueio de Escudo / Deflexão (`playShieldBlock`)**: som metálico ressonante "CLANG!" de aço temperado ao absorver golpe ou rebater projéteis em pleno ar.
- **Impacto em Árvores (`playWoodHit`)**: baque sordo percussivo quando flechas atingem os troncos.
- **Coleta de Item / Buff (`playItemCollect`)**: jingle triunfante em arpeggio ascendente de 4 notas brilhantes (Mi5 → Sol#5 → Si5 → Mi6).
- **Queda do Cavaleiro / Game Over (`playGameOver`)**: frase solene dramática em escala menor descendente com estrondo grave e sombrio.
- **Cliques de Interface (`playButtonClick`)**: feedback auditivo em todos os botões, navegação e digitação das 3 iniciais do recorde.

### 🎛️ Controles & Acessibilidade
- **Botão de Som no HUD**: botão interativo no canto superior direito (`🔊 SOM [M]` / `🔇 MUDO [M]`) com destaque dourado ao passar o mouse.
- **Atalho de Teclado `M`**: alterna mudo/som a qualquer instante da partida (com proteção para não mutar se o jogador digitar 'M' no placar de honra).
- **Pausa Automática em Segundo Plano**: áudio é suspenso se a aba do navegador for minimizada e retoma ao voltar.
- **Zero Arquivos Externos**: 100% sintetizado via Web Audio API, eliminando erros de CORS, arquivos 404 e latência de carregamento.

---

## [v0.6.0] - 2026-10-18 (Reformulação Gráfica)
### 🎨 Visual
- **Sprites animados com contorno**: Cavaleiro, Goblin, Guerreiro Sombrio e Elfo ganharam 2 quadros de caminhada (pernas alternando) e contorno escuro de 1px para destacar do chão.
- **Balanço de passos** em todos os inimigos (cada um num ritmo diferente).
- **Sombras** elípticas sob personagens, árvores e itens.
- **Profundidade (Y-sort)**: quem está mais embaixo na tela aparece na frente — o cavaleiro passa por trás/frente das árvores corretamente.
- **Cenário em camadas**: grama, estrada de terra, floresta ao fundo (topo) e arbustos em primeiro plano (base), todos rolando. Chão e árvores agora andam na **mesma velocidade** (nada desliza).
- **Itens com cara de item**: aura brilhante colorida, borda dourada, flutuação e pulsação. Texto flutuante ao coletar.
- **Golpe de espada real**: a espada gira no punho do cavaleiro com rastro em meia-lua.
- **Feedbacks**: partículas ao matar inimigos, flash ao quebrar escudo, tremor de câmera e pausa curta ao morrer.

### ⚔️ Mecânicas
- **Árvores com colisão no tronco**, sem nascer uma em cima da outra e fora da estrada.
- **Árvores bloqueiam flechas** (suas e dos elfos) — servem de cobertura.
- **Elfos miram no cavaleiro** e piscam em rosa antes de atirar (aviso visual).
- Arco e espada atacam na direção em que o cavaleiro está virado.

### 🐛 Correções
- Clicar em "INICIAR" disparava o início 2 vezes (spawns e timers em dobro).
- A limpeza de entidades pulava itens ao destruir durante o loop.
- Nomes padrão do placar tinham 4 letras (agora 3).

---

## [v0.5.2] - 2026-10-18
### 🏃 Sensação de Movimento & Parallax
- **Chão com Rolagem Contínua (TileSprite)**:
  - Adicionado `TileSprite` texturizado com relva em pixel art. O solo agora se desloca continuamente para a esquerda com base no `worldSpeed`, criando a sensação autêntica de corrida veloz na floresta.
  - Sincronização do movimento de parallax das árvores e arbustos com o delta de frame.
  - Animação de corrida no Cavaleiro (leve oscilação angular de passos com seno temporal).

### 🎯 Correção Física das Flechas
- **Velocidade Imediata Restaurada**:
  - Corrigido o bug onde as flechas (do jogador e dos elfos) ficavam paradas no ar devido à sobrescrita de velocidade pós-adrop.
  - Flechas agora são criadas diretamente via `group.create(...)` e disparam com velocidades reais:
    - Flecha do Cavaleiro: `750 px/s` para a frente.
    - Flecha do Elfo: `420 px/s` para trás.

### 🎨 Polimento Visual & Novos Sprites
- **Guerreiro Sombrio Redesenhado**:
  - Visual imponente de 34x34 pixels com elmo de chifres pontiagudos, olhos vermelhos brilhantes, ombreiras escuras, capa rasgada rubra e espada empunhada.
- **Slash da Espada Renovado**:
  - Efeito cortante em meia-lua curvada com núcleo branco e aura ciana energética, animado via tween suave de expansão e dissipação (`alpha` e `scale`).

---

## [v0.5.1] - 2026-10-18
### 🧹 Refatoração & Simplificação Extrema
- **Redução Drástica de Complexidade**:
  - Código reduzido em mais de 62% (de 1.215 para ~450 linhas), mantendo 100% das mecânicas ativas.
  - Substituição de centenas de linhas de matrizes de caracteres por renderizador geométrico nativo em pixel art via `generateTexture`.
- **Gerenciador Unificado de Buffs (`activeBuff`)**:
  - Eliminação de 9 temporizadores e dezenas de variáveis redundantes para Arco, Escudo e Espada.
  - Controle de tempo e cadência determinístico baseado no `delta` nativo do ciclo `update()`.
- **Limpeza Nativa de Timers**:
  - Adoção de `scene.time.removeAllEvents()`, eliminando chamadas manuais repetitivas e prevenindo vazamentos de memória.
- **Componentização Visual Reutilizável**:
  - Helpers modulares `createModal()` e `createButton()` unificando a estética da Tela Inicial, Registro de Iniciais e Tabela de Recordes.
- **Coleta de Lixo Unificada (`cleanGroup`)**:
  - Função única e limpa para descarte seguro de entidades fora da tela.

---

## [v0.5.0] - 2026-10-18 (Edição Fantasia Medieval Pixel Art)
### 🎨 Visual & Arte Pixel Art
- **Motor Gráfico com Suporte a Pixel Art**:
  - Ativado `pixelArt: true` e renderizador retro 16-bit nativo no Phaser.
  - Geração procedural de texturas pixel a pixel no canvas, sem dependências de downloads externos.
  - Cenário de floresta viva com gramado texturizado e árvores/arbustos em rolagem suave (parallax).
- **Novo Protagonista**:
  - Cavaleiro com elmo prateado, pluma vermelha, túnica azul real e armadura de aço, com espelhamento dinâmico de direção (`flipX`).
- **Novos Inimigos**:
  - **Goblins**: rápidos e ágeis, com pele verde e olhos ferozes.
  - **Guerreiros Sombrios**: blindados, com elmos de chifres e armadura negra.
  - **Elfos Arqueiros**: guerreiros de manto verde que atiram flechas mágicas à distância em direção ao cavaleiro.

### ⚔️ Novas Mecânicas & Arsenal
- **Novo Item: Espada Vorpal (Golpe Slash)**:
  - Ataque corpo a corpo rápido em arco luminoso que fatia inimigos e rebate projéteis à queima-roupa.
- **Arco e Flecha**:
  - Substitui o disparo anterior por flechas de madeira e ponta de aço a cada 320ms por 6s.
- **Escudo Medieval**:
  - Escudo com brasão nobre posicionado fisicamente ao lado do cavaleiro, absorvendo 1 impacto por 8s.
- **Flechas Élficas**:
  - Projéteis inimigos que podem ser bloqueados pelo escudo, cortados com a espada ou desviados.

### 📜 Interface Medieval
- HUD superior temático em madeira nobre e ouro envelhecido (`⚔️ GLÓRIA: Xs` | `👑 RECORDE: Xs`).
- Telas de início, game over e Tábula de Recordes ("Campeões do Reino") com tipografia e molduras medievais.

---

## [v0.4.0] - 2026-10-18
### ✨ Adicionado
- **Escudo com Duração Balanceada (8 segundos)**:
  - O escudo agora possui contagem regressiva visível no HUD (`🛡️ ESCUDO (8s)`).
  - Se o tempo expirar sem impacto, o campo de força desativa naturalmente.
  - Se colidir antes dos 8 segundos, consome a proteção e elimina o triângulo com segurança.
- **Sistema de Iniciais Arcade (Fliperama)**:
  - Ao morrer, exibe tela estilizada para registrar o nome com **exatamente 3 letras maiúsculas**.
  - Digitação interativa via teclado (letras A-Z e tecla Backspace) com 3 caixas visuais estilo fliperama.
- **Tabela de Recordes (Hall da Fama / Leaderboard Top 5)**:
  - Salva e recupera as 5 melhores pontuações via `localStorage`.
  - Exibe ranking ordenado com medalhas (🥇, 🥈, 🥉) e destaque visual na linha do jogador.
  - Indicador do melhor recorde exibido tanto na tela inicial quanto no HUD em tempo de jogo (`👑 RECORDE: Xs`).

---

## [v0.3.1] - 2026-10-18
### 🐛 Correções de Bugs (Fix)
- **Spawn de Entidades Corrigido**:
  - Corrigido problema de perda de contexto do `this` em JavaScript que interrompia a execução do `startGameplay`.
  - Triângulos e itens agora surgem pontualmente assim que a partida é iniciada.
  - Tela inicial melhorada com suporte a múltiplos gatilhos de início (clique no botão, clique na tela, tecla `Espaço` ou tecla `Enter`).
  - Primeiro obstáculo instanciado imediatamente ao iniciar para ação instantânea, e primeiro item coletável garantido aos 3 segundos.

---

## [v0.3.0] - 2026-10-18
### ✨ Adicionado
- **Tela Inicial (Start Screen)**:
  - Painel com design moderno apresentando o título `GEOMETRIC SURVIVAL`, resumo de controles e itens.
  - Botão interativo `INICIAR JOGO` com efeito hover (mudança de cor) e suporte a tecla `Espaço`.
  - Início controlado das mecânicas (spawns e cronômetros só disparam após o clique).
- **HUD Superior Informativo**:
  - Barra superior escura com cronômetro de sobrevivência em tempo real (`TEMPO: Xs`).
  - Indicador dinâmico de status dos power-ups: `🛡️ ESCUDO` e contagem regressiva da `⚡ ARMA (Xs)`.
- **Painel de Game Over Redesenhado**:
  - Card centralizado com cantos arredondados e borda de destaque.
  - Exibição do tempo total de sobrevivência na partida.
  - Botão interativo `JOGAR NOVAMENTE` com feedback hover e atalho na tecla `Espaço`.

### ⚖️ Balanceamento & Ajustes
- **Arma Equilibrada**:
  - Cadência de tiro ajustada de 180ms para 320ms, tornando os disparos mais espaçados e estratégicos.
  - **Limite de Visão (Fog of War)**: Projéteis são destruídos imediatamente ao tocar a borda visível da tela ($x \ge 800$), impedindo que destruam triângulos recém-criados fora do campo visual do jogador.

---

## [v0.2.0] - 2026-10-18
### ✨ Adicionado
- **Item de Arma (Power-up Amarelo)**:
  - Duração de 6 segundos com rajadas automáticas para a direita.
  - Colisão laser vs. obstáculo eliminando ambos com `.destroy()`.
- **Item de Escudo (Power-up Ciano)**:
  - Absorve 1 colisão fatal com triângulo.
  - Indicador visual em contorno ciano acompanhando o jogador.
  - Destruição segura do triângulo sem ativar Game Over.
- **Grupo de Itens**:
  - Geração temporal a cada 6 segundos sorteando Arma ou Escudo.
  - Limpeza de itens e lasers fora da tela para Garbage Collection.

### 🧹 Limpeza & Refatoração
- Redução e síntese dos comentários de código no `game.js`, mantendo resumos objetivos por função.
- Separação modular de blocos: Configurações, Estado, Preload, Create e Update.

---

## [v0.1.0] - 2026-10-18
### ✨ Adicionado
- **Sistema de Game Over**:
  - Pausa imediata da física (`physics.pause()`) no impacto.
  - Feedback visual no jogador (vermelho escuro `0xd32f2f`).
  - Overlay escuro semi-transparente com textos de aviso.
  - Reinício limpo da cena com tecla `Espaço` ou clique do mouse (`scene.restart()`).
- **Progressão de Dificuldade**:
  - Aceleração dos obstáculos (+25 px/s a cada 3s).
  - Aumento da densidade de geração reduzindo o intervalo de spawn (-80ms a cada 3s).

---

## [v0.0.1] - 2026-10-18
### 🚀 Lançamento Inicial
- Criação da janela do jogo (800x600) com Arcade Physics sem gravidade.
- Movimentação do jogador em 8 direções via WASD e Setas do teclado com normalização diagonal.
- Geração inicial de obstáculos triangulares vermelhos à direita.
- Limpeza de memória básica com `.destroy()` ao ultrapassar a borda esquerda.
