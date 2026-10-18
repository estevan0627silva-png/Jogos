# ⚔️ A Jornada do Cavaleiro (Knight's Quest) - Pixel Art Edition

Jogo de ação e sobrevivência em **Pixel Art 16-bit** com temática de fantasia medieval, desenvolvido em **JavaScript Vanilla** e **Phaser 3** (carregado via CDN), sem necessidade de bundlers ou arquivos externos.

---

## 🕹️ Como Jogar

- **No Computador (Offline / Sem Instalação)**: Basta descompactar o projeto e dar **dois cliques em `index.html`** (abre instantaneamente no Chrome, Edge, Firefox ou Opera sem precisar de VS Code, Live Server ou qualquer programa extra!).
- **Online (Navegador Web)**: Acesse o link direto do GitHub Pages pelo computador ou celular.
- Controle o **Cavaleiro** através da floresta mística e sobreviva às hordas de inimigos pelo maior tempo possível.
- Colete relíquias e armas lendárias pelo caminho para virar o jogo a seu favor!

### ⌨️ Controles

| Ação | Teclas |
| :--- | :--- |
| **Mover Cavaleiro** | `W`, `A`, `S`, `D` ou Setas Direcionais |
| **Mover na Diagonal** | Combinação de duas direções (vetor normalizado) |
| **Pausar / Despausar Jogo** | Tecla `ESC` |
| **Silenciar / Ativar Som** | Tecla `M` ou Botão no HUD (`Corneta Medieval`) |
| **Iniciar Partida / Confirmar** | `Barra de Espaço`, `Enter` ou Clique do Mouse |
| **Voltar ao Menu Principal** | Botão `VOLTAR AO MENU` ou `MENU INICIAL` |

---

## ⏸️ Sistema de Pausa (Tecla ESC)

A qualquer momento durante o combate, pressionar a tecla `ESC` congela a partida:
- **Pausa Total**: Pausa a física, o relógio de spawn, os tweens e as animações de sprites.
- **Áudio Ambiente Suavizado**: A trilha sonora chiptune reduz para volume atmosférico (~0.04) enquanto o menu de pausa estiver ativo.
- **Menu Nobre de Pausa**: Permite **Continuar a Jornada** (ou tocar `ESC`), **Alternar Som** (Ativado/Mutado), **Reiniciar a Missão** imediatamente ou retornar ao **Menu Principal**.
- Também funciona para retornar ao menu principal caso pressionado nas abas secundárias (Recordes e Configurações).

---

## ⏳ Barrinha Flutuante de Duração (Overhead Buff Bar)

Além do cronômetro detalhado no HUD superior, uma **barra gráfica de duração** posiciona-se diretamente sobre o capacete do cavaleiro:
- Acompanha o personagem em todos os movimentos.
- Exibe o tempo restante com cores temáticas de cada relíquia:
  - 🏹 Dourado para o **Arco Real**
  - 🛡️ Ciano para o **Escudo de Aço**
  - 🗡️ Branco/Prata para a **Espada Vorpal**
- Transiciona para vermelho de alerta nos **1.8 segundos finais**, dando percepção instantânea para o jogador agir antes que o efeito acabe.

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
├── index.html          # Entrada principal (executa com dois cliques ou via GitHub Pages)
├── .gitignore          # Arquivos ignorados pelo Git
├── CHANGELOG.md        # Histórico de versões (SemVer)
├── README.md           # Documentação completa da aventura
└── JS_Teste/
    ├── index.html      # Página web alternativa
    ├── style.css       # Centralização do canvas e estilo da janela
    └── game.js         # Toda a lógica: gerador de pixel art, áudio chiptune, combate e menus
```

---

## 🌐 Como Compartilhar com Amigos

### Método 1: Jogar Online Direto no Navegador (GitHub Pages)
1. No repositório no GitHub, clique na aba **Settings** (Configurações).
2. No menu lateral esquerdo, clique em **Pages**.
3. Em *Build and deployment* > *Branch*, selecione **`main`** (ou `master`) e pasta **`/ (root)`**.
4. Clique em **Save**.
5. Em 1 a 2 minutos, o GitHub disponibilizará um link público direto (ex: `https://seu-usuario.github.io/Jogos/`).
6. Seus amigos só precisam clicar no link pelo computador ou celular para jogar!
*(Nota: No plano gratuito do GitHub, o GitHub Pages requer que o repositório seja Público).*

### Método 2: Mantendo o Repositório 100% PRIVADO (Download do ZIP)
1. No seu repositório no GitHub, vá em **Settings** > **Collaborators** > **Add people**.
2. Adicione os nomes de usuário ou e-mails do GitHub dos seus amigos (eles receberão acesso exclusivo).
3. Eles entram no link do repositório, clicam no botão verde **`<> Code`** e selecionam **`Download ZIP`**.
4. Ao extrair a pasta, basta dar **dois cliques em `index.html`**!
5. O jogo roda instantaneamente em qualquer navegador moderno, **sem precisar de VS Code, sem Live Server e sem instalar nenhum programa**, pois todo o visual e som foram programados nativamente sem dependências de arquivos externos!
