# 📜 Notas de Atualização (Changelog) — A Jornada do Cavaleiro

Todas as alterações notáveis deste projeto serão documentadas neste arquivo, seguindo o padrão [Semantic Versioning](https://semver.org/) e [Keep a Changelog](https://keepachangelog.com/).

---

## [v2.1.0] — 2026-10-20
### 🌟 Título da Versão: **Evolução Exponencial: Atributos Fortes & Redesign Nobre dos Cards de Power Up**

### 📝 Descrição (GitHub Release & Commit):
> Mega atualização das mecânicas de evolução: progressão multiplicativa/exponencial com Atributo Forte exclusivo por arma (Espada: Área, Machado: Knockback, Arco: Cadência, Cajado: Área de Explosão, Escudo: Duração), tetos assintóticos de segurança contra bugs a 60 FPS, e redesign visual dos cards de Level Up eliminando poluição numérica técnica em favor de badges e descrições temáticas de alta fantasia.

### 🚀 O que mudou:
- **🎴 Redesign Nobre dos Cards de Level Up (Eliminação de Poluição Numérica):**
  - **Remoção de Rótulos Burocráticos:** Eliminadas todas as sequências técnicas como `NV. 1 ➔ NV. 2`, `(500ms, 1 dano, 0 knockback)` e `(+24% de raio e alcance)`.
  - **Badges Heróicos Exclusivos por Nível:** Cada estágio de cada arma agora exibe um badge de conquista estilizado em ouro/ciano (`[ CORTE NOBRE ]`, `[ FIO EXPANDIDO ]`, `[ TEMPESTADE DE FLECHAS ★ ]`, `[ FÚRIA DOS TITÃS ★ ]`, `[ CATACLISMO SOLAR ★ ]`, `[ ÉGIDE ETERNA ★ ]`).
  - **Narrativa e Sensação de Combate:** As descrições das cartas agora focam puramente no sentimento e impacto tático do combate, permitindo ao jogador escolher pela fantasia e efeito prático na arena.
  - **Pergaminhos e Relíquias Estilizados:** Badges dos pergaminhos atualizados (`[ DISPARO DUPLO ]`, `[ LEQUE DE DISPAROS ]`, `[ EXPANSÃO MÍSTICA ]`, `[ CADÊNCIA FULMINANTE ]`) e cartas de itens com nomes nobres (`[ EXTENSÃO TEMPORAL ]`, `[ ARSENAL REAL ]`, `[ RESTAURAÇÃO VITAL ]`).
- **📈 Progressão Exponencial Multiplicativa com Atributos Fortes:**
  - **⚔️ Espada Vorpal (Atributo Forte: Área / Tamanho):**
    - Escala multiplicativa de **+28% por nível** ($1.00\times \rightarrow 1.28\times \rightarrow 1.64\times \rightarrow 2.10\times \rightarrow 2.68\times$). No Nível 5, o semicírculo de corte cobre quase metade da tela frontal.
    - Modo Infinito (`Lvl > 5`): Crescimento atenuado com Hard Cap em $3.60\times$, prevenindo estouro de tela ou tunneling de colisão.
  - **🪓 Machado Bumerangue (Atributo Forte: Knockback / Repulsão Física):**
    - Repulsão multiplicativa de **+50% por nível** ($30\text{px} \rightarrow 45\text{px} \rightarrow 68\text{px} \rightarrow 102\text{px} \rightarrow 152\text{px}$). No Nível 5, monstros atingidos voam para a retaguarda com impacto sísmico.
    - Modo Infinito (`Lvl > 5`): Hard Cap seguro em $220\text{px}$ para manter os inimigos dentro do espaço visível da arena.
    - Duração dinâmica adaptativa em `applySmoothKnockback()` (`safeDuration = Math.min(190, 115 + Math.round(distance * 0.35))`) para que repulsões pesadas deslizem com desaceleração cúbica sem estalos bruscos.
  - **🏹 Arco Real (Atributo Forte: Velocidade de Ataque / Cadência):**
    - Redução exponencial de **20% no delay por nível** ($500\text{ms} \rightarrow 400\text{ms} \rightarrow 320\text{ms} \rightarrow 256\text{ms} \rightarrow 205\text{ms}$). A frequência salta de 2.0 para quase 5 flechas por segundo no Nv. 5.
    - Modo Infinito (`Lvl > 5`): Floor mínimo seguro travado em $100\text{ms}$ (10 disparos/s = 1 disparo a cada 6 frames a 60 FPS), garantindo zero congelamento de garbage collector ou sobrecarga de entidades.
  - **🔥 Cajado de Fogo (Atributo Forte: Tamanho / Área de Explosão):**
    - Raio de explosão multiplica **+27% por nível** ($45\text{px} \rightarrow 57\text{px} \rightarrow 72\text{px} \rightarrow 92\text{px} \rightarrow 117\text{px}$). A área da poça de fogo cresce +576% no Nível 5, incendiando o solo em um mar colossal de fogo.
    - Modo Infinito (`Lvl > 5`): Hard Cap seguro de $160\text{px}$ de raio ($320\text{px}$ de diâmetro).
  - **🛡️ Escudo Sagrado (Atributo Forte: Duração / Uptime):**
    - Duração base multiplica **+35% por nível** ($4.8\text{s} \rightarrow 6.5\text{s} \rightarrow 8.7\text{s} \rightarrow 11.8\text{s} \rightarrow 16.0\text{s}$). O herói ganha mais do triplo de proteção celestial contínua no Nv. 5.
    - Modo Infinito (`Lvl > 5`): Hard Cap de $24.0\text{s}$ base.
    - Duração das demais armas (Arco, Espada, Machado, Cajado) segue escala multiplicativa suave de +12% por nível ($6.0\text{s} \rightarrow 9.4\text{s}$ no Nv. 5, teto de 18.0s).
- **🛡️ Confiabilidade & Zero Regressão:**
  - Validação completa de sintaxe e dependências em todos os 25 módulos e no bundle `game.js`.

---

## [v2.0.0] — 2026-10-20
### ⚔️ Título da Versão: **A Lâmina Vorpal & O Rastreador da Floresta (The Vorpal Blade & Forest Scout Update)**

### 📝 Descrição (GitHub Release & Commit):
> Grande marco v2.0: Reformulação do combate da Espada Vorpal (lâmina única persistente, corte procedural aerodinâmico em 5 camadas e slashes múltiplos em leque 180°), correção da causa raiz de congelamento de animações no boot, nos golpes e no draft de level-up; introdução do novo inimigo Goblin Rastreador ágil com IA de zigue-zague vetorial; layout vertical anti-sobreposição no menu pós-derrota; e rebalanceamento da densidade de ondas desde os primeiros segundos da partida.

### 🚀 O que mudou:
- **🔄 Correção Raiz do Congelamento de Animações (Bug A):**
  - **Sincronização de Ciclo de Vida e Boot:** Em `startGameplay()`, a física (`physics.resume()`), tempo (`time.paused = false`) e o gerenciador de animações (`scene.anims.resumeAll()`, `anims.paused = false`) são destravados de forma imperativa. O jogador e entidades spawnadas iniciam loops de caminhada contínuos (`repeat: -1`) sem risco de corrida de estado.
  - **Isolamento de Flash de Dano e Hitstop:** Em `damageEnemy()` e `playerHit()`, o flash de impacto utiliza `setTintFill(0xffffff)` e `clearTint()` isoladamente, sem alterar ou resetar a máquina de estados de animação dos sprites. No retorno do `triggerHitstop()`, `scene.anims.paused = false` é garantido.
  - **Retomada Estrita do Draft de Level-Up e Pausa:** Ao fechar o modal de escolha de cartas (`selectCard`) ou despausar (`resumeGame`), `scene.anims.resumeAll()` e `anims.paused = false` são aplicados no nível da cena, e todos os sprites ativos têm seu `resume()` ou reprodução com `repeat: -1` reestabelecidos.
- **📐 Layout Vertical Anti-Sobreposição no Menu de Derrota (Bug B):**
  - **Eliminação de Clipping e Colisão de Hitbox:** O modal de líderes e resumo pós-morte (`showLeaderboard`) foi reformulado com o padrão `verticalStackLayout`.
  - **Espaçamento e Separação Visual:** As 5 linhas de recordes foram compactadas para 36px de passo (`top + 98 + i * 36`). O botão premiado **"✦ DOBRAR OURO DA EXPEDIÇÃO (+XG) ✦"** foi posicionado isolado em `top + 296` (altura 36px), enquanto os botões primários de ação ("⚔ NOVA JORNADA" e "FORJA") foram posicionados em `top + 352` (altura 38px), garantindo uma folga vertical de 19px sem qualquer sobreposição visual ou de cliques.
- **👺 Novo Inimigo: Goblin Rastreador Ágil (Goblin Scout):**
  - **Arte Procedural Exclusiva (22x22):** Renderizado com bandana carmesim esvoaçante na testa, adagas duplas polidas e silhueta aerodinâmica compacta em [characterArt.js](file:///f:/programação de jogos/Jogos/JS_Teste/src/art/characterArt.js).
  - **Velocidade e Trajetória Evasiva:** Velocidade 32% superior à do goblin comum (`speed: 1.48`). Movimenta-se em zigue-zague sinusoidal dinâmico relativo ao vetor do jogador:
    $$V_{\text{final}} = \vec{u}_{\text{fwd}} \times \text{speed} + \vec{u}_{\text{perp}} \times (\sin(time \times 0.0065 + \text{phase}) \times 80)$$
    Ultrapassa linhas de frente, esquiva-se de flechas retas e pressiona o jogador com agilidade.
- **🌊 Rebalanceamento de Densidade Inicial e Escalonamento de Ondas:**
  - **Engajamento Imediato:** Intervalo inicial entre ondas (`spawnDelay`) reduzido de 1300ms para **900ms** (+44% de frequência inicial) e tamanho dos bandos iniciais aumentou para 1-2 inimigos imediatos.
  - **Curva Agressiva:** Aceleração a cada 4.5s reduz o delay até 380ms e aumenta os grupos para 3 a 5 inimigos em fases avançadas.
  - **Cap de Segurança:** Limite dinâmico de segurança (`12 + floor(survivalTime / 12)`, máx 28) garante alta intensidade sem comprometer os 60 FPS estáveis.

---

## [v1.9.0] — 2026-10-20
### ⚔️ Título da Versão: **Reformulação do Combate da Espada Vorpal: Lâmina Única Persistente, Crescente Curvada Procedural em 5 Camadas, Disparo Múltiplo Escalonado e Progressão de +24% por Nível**

### 📝 Descrição (GitHub Release & Commit):
> Eliminação completa do artefato de duplicação visual de lâminas ao coletar o pergaminho Multi-Shot, ancoragem de exatamente uma lâmina física no cavaleiro com escala contida, substituição do arco em bloco primitivo por uma curva crescente aerodinâmica em 5 camadas com fio de navalha, distribuição espacial escalonada de múltiplos cortes no cone frontal de 180° e progressão de área e hitbox de +24% por nível.

### 🚀 O que mudou:
- **🗡️ Ancoragem de Lâmina Única Persistente (`swordBlade`):**
  - **Eliminação de Duplicatas Visuais:** O cavaleiro agora empunha rigorosamente **uma única lâmina persistente** (`swordBlade`). Nunca mais são instanciadas réplicas da espada ao equipar o Pergaminho de Disparo Múltiplo (`scroll_multishot`) ou subir de nível.
  - **Curva de Escala Contida:** A escala física da lâmina empunhada segue a fórmula `Clamp(1.0 + (Lvl - 1) * 0.05, 1.0, 1.25)`, mantendo proporções nobres e elegantes sem poluir a visão do jogador.
  - **Postura Natural & Animação de Golpe:** A espada repousa com ângulo de descanso natural de **25°** e, ao atacar, executa um golpe fluído de -65° a 125° em 150ms (`Cubic.easeOut`), retornando ao repouso. O sprite de corte (`slash`) nunca mais carrega sprites filhos obsoletos.
- **🌊 Curva Procedural de Corte e Estética de Vento Cortante (`slash_arc`):**
  - **Textura Crescente em 5 Camadas (64x88):** Substituição do arco circular rústico por uma lâmina de vento cônica em curvas Bezier com pontas afiadas:
    1. Halo etéreo externo profundo (`rgba(0, 119, 182, 0.28)`)
    2. Halo de aço ciano luminoso (`rgba(77, 208, 225, 0.65)`)
    3. Lâmina cristalina de energia (`rgba(128, 222, 234, 0.90)`)
    4. Núcleo incandescente de energia branca pura (`rgba(255, 255, 255, 1.0)`)
    5. Gume de navalha de alto contraste na borda externa de impacto (`#ffffff`, 1.8px)
  - **Filtro Pixel Art Puro:** Renderização procedural com `NEAREST` filter e ciclo de vida dinâmico de 160ms com estiramento frontal (`scaleX * 1.15`), desvanecimento `Quad.easeOut` e descarte limpo de memória.
- **📐 Escalonamento Espacial Estrito para Cortes Múltiplos (180° Frontal):**
  - Múltiplos cortes agora se espalham em diferentes alturas Y e ângulos angulares calculados:
    - 1 Corte: `0°`, `offX: 32`, `offY: 0`
    - 2 Cortes: `[-16°, +16°]`, `offX: 32`, `offY: [-16, +16]`
    - 3 Cortes: `[0°, -26°, +26°]`, `offX: [34, 30, 30]`, `offY: [0, -26, +26]`
    - 4 Cortes: `[-34°, -12°, +12°, +34°]`, com offsets escalonados
    - 5+ Cortes: Distribuição simétrica suave no cone frontal.
  - **Trava de Segurança:** Estritamente contido em `[-90°, +90°]` e `offX >= 12`, proibindo qualquer nascimento de corte nas costas do herói.
- **📈 Progressão Agressiva de Área e Hitbox (+24% por Nível):**
  - Fórmula matemática: $\text{Scale}(Lvl) = \text{Base} \times (1.0 + (Lvl - 1) \times 0.24)$.
  - Sincronização rigorosa entre o sprite visual e a hitbox do Arcade Physics (`52 * scale`, `76 * scale`).
  - Catálogo de Armas (`catalogs.js`) atualizado para refletir com exatidão os incrementos: Nv.1 (1.00x), Nv.2 (1.24x), Nv.3 (1.48x), Nv.4 (1.72x) e Nv.5 (1.96x).

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
  - **Causa Raiz:** O tracking de acerto anterior (`e.lastProjId`) era armazenado na entidade inimiga (`e`). Quando múltiplos machados ou projéteis colidiam com o Boss de grande porte (88x88), cada machado alternava o `lastProjId` no mesmo frame ou frames consecutivos, gerando um "liquidificador de dano" de 60 acertos por segundo que derretia o Boss instantaneamente.
  - **Correção com Trava de Duplo Hit (Ida e Volta):** Cada projétil bumerangue agora possui seus próprios conjuntos isolados de rastreamento (`hitEnemiesOut` e `hitEnemiesBack`). O projétil aplica rigorosamente no máximo **1 hit na ida** e no máximo **1 hit na volta** por inimigo (totalizando no máximo 2 instâncias de dano por arremesso), preservando o desafio e a vida do Boss e de qualquer inimigo.
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
