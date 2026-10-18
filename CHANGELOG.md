# 📋 Histórico de Versões (Changelog)

Todas as alterações deste projeto estão documentadas aqui seguindo o padrão de Versionamento Semântico.

---

## [v0.2.0] - 2026-10-18
### ✨ Adicionado
- **Item de Arma (Power-up Amarelo)**:
  - Duração de 6 segundos.
  - Disparo automático de tiros a cada 180ms para a direita.
  - Colisão laser vs. obstáculo eliminando ambos com `.destroy()`.
- **Item de Escudo (Power-up Ciano)**:
  - Absorve 1 colisão fatal com triângulo.
  - Indicador visual em contorno ciano acompanhando o jogador no `update()`.
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
