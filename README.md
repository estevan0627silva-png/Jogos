# ⚔️ A Jornada do Cavaleiro (Knight's Quest) - Pixel Art Edition

Jogo de ação e sobrevivência em **Pixel Art 16-bit** com temática de fantasia medieval, desenvolvido em **JavaScript Vanilla** e **Phaser 3** (carregado via CDN), sem necessidade de bundlers ou arquivos externos.

---

## 🕹️ Como Jogar

1. Abra o arquivo `JS_Teste/index.html` em qualquer navegador web moderno.
2. Controle o **Cavaleiro** através da floresta mística e sobreviva às hordas de inimigos pelo maior tempo possível.
3. Colete relíquias e armas lendárias pelo caminho para virar o jogo a seu favor!

### ⌨️ Controles

| Ação | Teclas |
| :--- | :--- |
| **Mover Cavaleiro** | `W`, `A`, `S`, `D` ou Setas Direcionais |
| **Mover na Diagonal** | Combinação de duas direções (vetor normalizado) |
| **Silenciar / Ativar Som** | Tecla `M` ou Botão no HUD (`🔊 SOM / 🔇 MUDO`) |
| **Iniciar / Reiniciar** | `Barra de Espaço`, `Enter` ou Clique do Mouse |

---

## 🌲 Inimigos da Floresta

- 🧌 **Goblins**: Criaturas verdes, ágeis e velozes que avançam em bandos para cercar o cavaleiro.
- 🛡️ **Guerreiros Sombrios**: Soldados pesados com elmos de chifres e armaduras negras impenetráveis.
- 🧝 **Elfos Arqueiros**: Mestres da arquearia que disparam flechas mágicas de longa distância em direção ao herói!

---

## ⚔️ Arsenal Medieval (Power-ups)

- 🏹 **Arco e Flecha (Loot Dourado)**:
  - Dura **6 segundos**.
  - Dispara rajadas rápidas de flechas a cada 320ms, aniquilando inimigos na tela e interceptando flechas élficas.
- 🛡️ **Escudo de Aço (Loot Ciano/Azul)**:
  - Dura até **8 segundos** (com contagem regressiva no HUD).
  - Posiciona-se fisicamente ao lado do herói e absorve **1 golpe fatal** (corpo a corpo ou flecha).
- 🗡️ **Espada Vorpal (Loot Prateado)**:
  - Dura **6 segundos**.
  - Desfere sequências de golpes de espada em arco (*Slash*) à queima-roupa na frente do cavaleiro, fatiando inimigos e rebatendo projéteis instantaneamente!

---

## 🎵 Trilha Sonora & Efeitos Sonoros Chiptune (100% Sintetizados)

O jogo conta com um motor de áudio procedural construído com a **Web Audio API** nativa do navegador (sem arquivos `.mp3` ou dependências externas):
- **Trilha Sonora da Aventura (BGM)**: Marcha épica medieval em Lá menor (Am) com sequenciador lookahead de 3 canais sincronizados em tempo real (flauta/alaúde melódico, contrabaixo pulsante e percussão retrô).
- **Efeitos Sonoros de Combate (SFX)**:
  - `Arco`: Estalo da corda e silvo de disparo rápido.
  - `Elfo`: Flecha arcana sibilante e brilhante.
  - `Espada`: Golpe cortante com ressonância metálica.
  - `Impacto/Derrota`: Estalo retrô com distorção crocante (*crunch*).
  - `Escudo de Ferro`: Ressonância maciça de aço ("CLANG!") ao bloquear ataques e rebater flechas.
  - `Árvores`: Baque de madeira ao reter flechas como cobertura.
  - `Itens`: Jingle ascendente triunfante ao coletar relíquias.
  - `Game Over`: Marcha fúnebre solene em tons menores e estrondo grave.
- **Controle de Volume e Mute**: Botão interativo no HUD e tecla `M` para silenciar ou ativar a qualquer instante.

---

## 🏆 Tábula dos Heróis (Sistema de Recordes Arcade)

- Ao tombar em batalha, o jogo solicita o registro das **3 iniciais maiúsculas** do cavaleiro diretamente pelo teclado.
- Registra e exibe o **Top 5 Campeões do Reino** em uma moldura medieval em madeira nobre e bronze, com persistência no `localStorage`.
- O maior recorde histórico é exibido no HUD superior (`👑 RECORDE: Xs`) durante as partidas.

---

## 📁 Estrutura do Projeto

```text
Jogos/
├── .gitignore          # Arquivos ignorados pelo Git
├── CHANGELOG.md        # Histórico de versões (SemVer)
├── README.md           # Documentação completa da aventura
└── JS_Teste/
    ├── index.html      # Página web e importação do Phaser 3 CDN
    ├── style.css       # Centralização do canvas e estilo da janela
    └── game.js         # Toda a lógica: gerador de pixel art, física, inimigos e combate
```

---

## 🔒 Privacidade

Projeto pessoal e 100% privado mantido localmente.
