# 📜 Notas de Atualização (Changelog) — A Jornada do Cavaleiro

Todas as alterações notáveis deste projeto serão documentadas neste arquivo, seguindo o padrão [Semantic Versioning](https://semver.org/) e [Keep a Changelog](https://keepachangelog.com/).

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
