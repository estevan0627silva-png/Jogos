# 📋 Histórico de Versões (Changelog)

Todas as alterações deste projeto estão documentadas aqui seguindo o padrão de Versionamento Semântico.

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
