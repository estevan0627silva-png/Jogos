# 📋 Histórico de Versões (Changelog)

Todas as alterações deste projeto estão documentadas aqui seguindo o padrão de Versionamento Semântico.

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
