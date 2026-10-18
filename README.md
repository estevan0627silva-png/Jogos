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
| **Silenciar / Ativar Som** | Tecla `M` ou Botão no HUD (`Corneta Medieval`) |
| **Iniciar Partida / Confirmar** | `Barra de Espaço`, `Enter` ou Clique do Mouse |
| **Voltar ao Menu Principal** | Botão `VOLTAR AO MENU` ou `MENU INICIAL` |

---

## 🏰 Menu Principal Medieval

O jogo conta com uma tela de título rica em atmosfera e *game feel*:
- **Retrato do Cavaleiro**: Ilustração em pixel art do herói com armadura polida, espada e animação suave de respiração.
- **Começar o Jogo**: Transição limpa para a batalha, revelando o HUD e dando início à trilha sonora.
- **Recordes**: Consulta rápida ao Top 5 Campeões do Reino com medalhas de ouro, prata e bronze.
- **Configurações**: Controle interativo de áudio (ativar/mutar com feedback sonoro) e *Pergaminho de Combate* com dicas essenciais para sobrevivência.

---

## 🛡️ HUD Modular em Pixel Art (Sem Emojis)

O painel de jogo foi totalmente reformulado em 4 módulos visuais independentes com molduras medievais de carvalho e ouro:
1. **Painel de Glória (Superior Esquerdo)**: Ícone em pixel art da **Ampulheta Mística** com o tempo de sobrevivência em segundos.
2. **Slot de Equipamento (Centro Superior)**: Moldura de ferro forjado que exibe o ícone da arma em uso (`ARCO REAL`, `ESCUDO DE AÇO`, `ESPADA VORPAL`) e uma **barra gráfica de duração** dinâmica com preenchimento em tempo real que fica rubra nos 2 segundos finais.
3. **Painel de Recorde (Superior Direito)**: Ícone da **Coroa Imperial de Ouro e Rubis** com a maior marca do reino.
4. **Medalhão de Áudio (Extremo Direito)**: Botão de alternância com ícone de corneta de guerra medieval.

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
- O maior recorde histórico é exibido no HUD superior (`RECORDE: Xs`) durante as partidas.
- Ao final, o jogador pode escolher entre reiniciar de imediato (**`NOVA JORNADA`**) ou retornar ao **`MENU INICIAL`**.

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
