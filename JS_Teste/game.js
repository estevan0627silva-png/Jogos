// 1. Configurações globais do jogo
const config = {
  type: Phaser.AUTO,        // Usa WebGL por padrão; se o navegador não suportar, recorre a Canvas
  width: 800,               // Resolução horizontal em pixels
  height: 600,              // Resolução vertical em pixels
  backgroundColor: '#1e1e1e', // Cor de fundo da área jogável
  physics: {
    default: 'arcade',      // Motor de física 2D leve do Phaser
    arcade: {
      gravity: { y: 0 },    // Sem gravidade vertical (jogo visto de cima)
      debug: false          // Mude para true se quiser ver caixas de colisão e vetores de velocidade
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// Instancia o jogo passando as configurações
const game = new Phaser.Game(config);

// Variáveis para guardar referências que usaremos nas funções abaixo
let player;
let cursors;
let wasdKeys;
// 2. Pré-carregamento de assets
function preload() {
  // Como estamos criando o personagem diretamente via código geométrico (um retângulo),
  // não precisamos carregar nenhuma imagem externa por enquanto.
}
// 3. Montagem inicial da cena
function create() {
  // Cria uma forma geométrica: retângulo verde de 40x40 no centro (x: 400, y: 300)
  const rect = this.add.rectangle(400, 300, 40, 40, 0x4caf50);

  // Injeta o corpo físico da Arcade Physics no retângulo
  // A partir desta linha, 'player' passa a ter a propriedade 'body' (velocidade, colisões, etc.)
  player = this.physics.add.existing(rect);

  // Ativa a colisão automática com os limites da tela (800x600)
  player.body.setCollideWorldBounds(true);

  // Cria atalhos nativos para as 4 setas do teclado
  cursors = this.input.keyboard.createCursorKeys();

  // Mapeia o conjunto de teclas WASD
  wasdKeys = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });
}
// 4. Lógica executada a cada frame
function update() {
  const speed = 280; // Velocidade de deslocamento (pixels por segundo)

  // Zera a velocidade atual a cada frame.
  // Se nenhuma tecla for pressionada, o personagem para imediatamente.
  player.body.setVelocity(0);
  let dirX = 0;
  let dirY = 0;

  // Leitura horizontal (Esquerda / Direita)
  if (cursors.left.isDown || wasdKeys.left.isDown) {
    dirX -= 1; // Pressionou esquerda: subtrai 1
  }
  if (cursors.right.isDown || wasdKeys.right.isDown) {
    dirX += 1; // Pressionou direita: soma 1
  }

  // Leitura vertical (Cima / Baixo)
 if (cursors.up.isDown || wasdKeys.up.isDown) {
    dirY -= 1; // Pressionou cima: subtrai 1 (topo da tela é Y negativo)
  }
  if (cursors.down.isDown || wasdKeys.down.isDown) {
    dirY += 1; // Pressionou baixo: soma 1 (base da tela é Y positivo)
  }

  player.body.setVelocityX(dirX * speed);
  player.body.setVelocityY(dirY * speed);
  // Normalização vetorial:
  // Se o jogador andar na diagonal, mantém a velocidade exatamente em 280,
  // impedindo a vantagem de ~41% de aceleração pela hipotenusa.
  player.body.velocity.normalize().scale(speed);
}