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
- **Tela Inicial & HUD**:
  - Painel de boas-vindas com botão `INICIAR JOGO` e instruções na abertura da página.
  - HUD superior com contagem de tempo de sobrevivência e status dinâmico dos power-ups em tempo real.
- **Arma (Círculo Amarelo)**:
  - Dura **6 segundos**.
  - Dispara rajadas de projéteis frontais a cada 320ms (cadência balanceada).
  - Projéteis são limitados ao campo visual (destroem-se na borda da tela para não eliminar inimigos antes de surgirem).
- **Escudo (Círculo Ciano)**:
  - Dura até **8 segundos** (com contador regressivo no HUD).
  - Absorve **1 colisão fatal**, destruindo o obstáculo que colidiu e mantendo o jogador vivo.
- **Painel de Fim de Jogo & Recordes Arcade (Fliperama)**:
  - Congela a física no momento do impacto.
  - Solicita as **iniciais do jogador (exatamente 3 letras)** via teclado em caixas estilizadas.
  - Apresenta a **Tabela Top 5 (Hall da Fama)** com medalhas, pontuações salvas via `localStorage` e botão `JOGAR NOVAMENTE`.

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
