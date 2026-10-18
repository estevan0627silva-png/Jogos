# 📋 Histórico de Versões (Changelog)

Todas as alterações deste projeto estão documentadas aqui seguindo o padrão de Versionamento Semântico.

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
