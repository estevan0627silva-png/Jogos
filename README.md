# 🎮 Geometric Survival 2D (Phaser 3)

Jogo 2D arcade de sobrevivência e reflexos desenvolvido com **JavaScript Vanilla** e **Phaser 3** (carregado via CDN), sem dependência de bundlers ou gerenciadores de pacotes externos.

---

## 🕹️ Como Jogar

1. Abra o arquivo `JS_Teste/index.html` em qualquer navegador moderno.
2. Controle o jogador (quadrado verde) e sobreviva pelo maior tempo possível aos triângulos que avançam da direita para a esquerda.
3. Colete os itens especiais para se defender e destruir os obstáculos!

### ⌨️ Controles

| Ação | Teclas |
| :--- | :--- |
| **Mover Jogador** | `W`, `A`, `S`, `D` ou Setas Direcionais |
| **Mover na Diagonal** | Combinação de duas direções (velocidade uniforme normalizada) |
| **Reiniciar (Game Over)** | `Barra de Espaço` ou Clique com o Mouse |

---

## ⚡ Itens e Mecânicas

- **Triângulos Vermelhos (Obstáculos)**:
  - Surgem continuamente fora da tela à direita em alturas aleatórias.
  - A cada 3 segundos, ganham `+25 px/s` de velocidade e o intervalo entre novos triângulos diminui.
- **Arma (Círculo Amarelo)**:
  - Dura **6 segundos**.
  - Dispara rajadas de projéteis frontais automáticos a cada 180ms.
  - Projéteis destroem os triângulos no impacto.
- **Escudo (Círculo Ciano)**:
  - Cria um campo de força protetor ao redor do jogador.
  - Absorve **1 colisão fatal**, destruindo o obstáculo e mantendo o jogador vivo.
- **Tela de Game Over**:
  - Congela a física no momento do impacto sem escudo.
  - Exibe feedback visual e tela de reinício instantâneo.

---

## 📁 Estrutura do Projeto

```text
Jogos/
├── .gitignore          # Arquivos e pastas ignorados pelo controle de versão
├── CHANGELOG.md        # Histórico detalhado de versões e atualizações
├── README.md           # Documentação geral do jogo
└── JS_Teste/
    ├── index.html      # Página web e importação do Phaser 3 CDN
    ├── style.css       # Centralização do canvas na tela e remoção de scrolls
    └── game.js         # Toda a lógica do jogo (preload, create, update, física e power-ups)
```

---

## 🔒 Privacidade do Repositório

Este projeto é de uso pessoal e privado. Todo o controle de versão com Git/GitHub Desktop está configurado para permanecer local na máquina ou em repositório privado no GitHub.
