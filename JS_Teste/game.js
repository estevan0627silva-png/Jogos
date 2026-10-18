// =============================================================================
// CONFIGURAÇÕES GLOBAIS
// =============================================================================
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#1e1e1e',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

// =============================================================================
// VARIÁVEIS DE ESTADO
// =============================================================================
let player;
let cursors, wasdKeys;
let obstaclesGroup, lasersGroup, itemsGroup;

let isGameOver = false;
let obstacleSpeed = 220;
let spawnDelay = 1200;
let spawnTimerEvent;

// Estados dos Power-ups
let hasShield = false;
let shieldGraphic = null;
let hasGun = false;
let gunShooterEvent = null;
let gunExpireEvent = null;

// =============================================================================
// CICLO DE VIDA: PRELOAD
// =============================================================================
function preload() {
  // Recursos gráficos são gerados proceduralmente com formas nativas do Phaser
}

// =============================================================================
// CICLO DE VIDA: CREATE
// =============================================================================
function create() {
  // --- Reinicialização do Estado da Partida ---
  isGameOver = false;
  obstacleSpeed = 220;
  spawnDelay = 1200;
  hasShield = false;
  shieldGraphic = null;
  hasGun = false;
  this.physics.resume();

  // --- Jogador ---
  const rect = this.add.rectangle(400, 300, 40, 40, 0x4caf50);
  player = this.physics.add.existing(rect);
  player.body.setCollideWorldBounds(true);

  // --- Controles ---
  cursors = this.input.keyboard.createCursorKeys();
  wasdKeys = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });

  // --- Grupos de Entidades ---
  obstaclesGroup = this.physics.add.group();
  lasersGroup = this.physics.add.group();
  itemsGroup = this.physics.add.group();

  // --- Geração Contínua de Obstáculos ---
  const scheduleNextSpawn = () => {
    if (isGameOver) return;
    spawnTimerEvent = this.time.delayedCall(spawnDelay, () => {
      spawnObstacle.call(this);
      scheduleNextSpawn();
    });
  };
  scheduleNextSpawn();

  // --- Progressão de Dificuldade (A cada 3s) ---
  this.time.addEvent({
    delay: 3000,
    callback: () => {
      if (isGameOver) return;
      obstacleSpeed += 25;                       // Acelera obstáculos
      spawnDelay = Math.max(350, spawnDelay - 80); // Aumenta frequência de surgimento
    },
    loop: true
  });

  // --- Geração Periódica de Itens Coletáveis (A cada 6s) ---
  this.time.addEvent({
    delay: 6000,
    callback: spawnItem,
    callbackScope: this,
    loop: true
  });

  // --- Colisões e Interações ---
  // Jogador vs Obstáculo (verifica escudo antes de dar Game Over)
  this.physics.add.overlap(player, obstaclesGroup, onPlayerHitObstacle, null, this);

  // Jogador vs Item Coletável (concede arma ou escudo)
  this.physics.add.overlap(player, itemsGroup, onCollectItem, null, this);

  // Projéteis da Arma vs Obstáculos (destrói ambos)
  this.physics.add.overlap(lasersGroup, obstaclesGroup, (laser, obstacle) => {
    laser.destroy();
    obstacle.destroy();
  });

  // ---------------------------------------------------------------------------
  // FUNÇÕES AUXILIARES DA CENA
  // ---------------------------------------------------------------------------

  // Instancia um triângulo vermelho na direita com velocidade progressiva
  function spawnObstacle() {
    const randomY = Phaser.Math.Between(40, 560);
    const triangle = this.add.triangle(850, randomY, 0, 15, 30, 0, 30, 30, 0xff3333);
    obstaclesGroup.add(triangle);
    triangle.body.setVelocityX(-obstacleSpeed);
    triangle.body.setAllowGravity(false);
  }

  // Gera item coletável aleatório (Arma = amarelo, Escudo = ciano)
  function spawnItem() {
    if (isGameOver) return;
    const randomY = Phaser.Math.Between(50, 550);
    const type = Phaser.Math.Between(0, 1) === 0 ? 'gun' : 'shield';
    const color = type === 'gun' ? 0xffeb3b : 0x00e5ff;

    const item = this.add.circle(850, randomY, 12, color);
    itemsGroup.add(item);
    item.itemType = type;
    item.body.setVelocityX(-160);
    item.body.setAllowGravity(false);
  }

  // Aplica o efeito do item coletado
  function onCollectItem(playerRef, item) {
    if (item.itemType === 'gun') {
      activateGun(this);
    } else if (item.itemType === 'shield') {
      activateShield(this);
    }
    item.destroy();
  }

  // Ativa modo de tiro contínuo por 6 segundos
  function activateGun(scene) {
    hasGun = true;
    if (gunShooterEvent) gunShooterEvent.remove();
    if (gunExpireEvent) gunExpireEvent.remove();

    // Dispara projéteis automaticamente a cada 180ms
    gunShooterEvent = scene.time.addEvent({
      delay: 180,
      callback: () => {
        if (isGameOver || !hasGun) return;
        const laser = scene.add.rectangle(player.x + 25, player.y, 14, 5, 0xffeb3b);
        lasersGroup.add(laser);
        laser.body.setVelocityX(650);
      },
      loop: true
    });

    // Desativa a arma ao expirar o tempo
    gunExpireEvent = scene.time.delayedCall(6000, () => {
      hasGun = false;
      if (gunShooterEvent) gunShooterEvent.remove();
    });
  }

  // Concede 1 carga de escudo com contorno protetor ciano
  function activateShield(scene) {
    hasShield = true;
    if (!shieldGraphic) {
      shieldGraphic = scene.add.circle(player.x, player.y, 28);
      shieldGraphic.setStrokeStyle(3, 0x00e5ff);
    }
  }

  // Lógica de colisão com obstáculo (ignora a morte se tiver escudo)
  function onPlayerHitObstacle(playerRef, obstacle) {
    if (isGameOver) return;

    if (hasShield) {
      hasShield = false;
      if (shieldGraphic) {
        shieldGraphic.destroy();
        shieldGraphic = null;
      }
      obstacle.destroy(); // Destrói o obstáculo que colidiu sem matar o jogador
      return;
    }

    triggerGameOver.call(this, playerRef);
  }

  // Pausa a partida, exibe menu de fim de jogo e aguarda reinício
  function triggerGameOver(playerRef) {
    if (isGameOver) return;
    isGameOver = true;

    if (spawnTimerEvent) spawnTimerEvent.remove();
    if (gunShooterEvent) gunShooterEvent.remove();
    if (gunExpireEvent) gunExpireEvent.remove();

    this.physics.pause();
    playerRef.fillColor = 0xd32f2f;

    // Interface de Game Over
    this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7);
    this.add.text(400, 240, 'FIM DE JOGO', {
      fontSize: '44px',
      fontStyle: 'bold',
      color: '#ff4444',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    this.add.text(400, 310, 'Pressione ESPAÇO ou CLIQUE para reiniciar', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);

    // Reinício via clique ou tecla Espaço
    const restartGame = () => this.scene.restart();
    this.time.delayedCall(200, () => {
      this.input.keyboard.once('keydown-SPACE', restartGame);
      this.input.once('pointerdown', restartGame);
    });
  }
}

// =============================================================================
// CICLO DE VIDA: UPDATE
// =============================================================================
function update() {
  if (isGameOver) return;

  // --- Movimentação e Normalização Diagonal ---
  const speed = 280;
  player.body.setVelocity(0);
  let dirX = 0;
  let dirY = 0;

  if (cursors.left.isDown || wasdKeys.left.isDown) dirX -= 1;
  if (cursors.right.isDown || wasdKeys.right.isDown) dirX += 1;
  if (cursors.up.isDown || wasdKeys.up.isDown) dirY -= 1;
  if (cursors.down.isDown || wasdKeys.down.isDown) dirY += 1;

  player.body.setVelocity(dirX * speed, dirY * speed);
  player.body.velocity.normalize().scale(speed);

  // --- Seguir Posição do Escudo Visual ---
  if (shieldGraphic && shieldGraphic.active) {
    shieldGraphic.setPosition(player.x, player.y);
  }

  // --- Limpeza de Memória (Garbage Collection) ---
  // Obstáculos fora da tela pela esquerda
  obstaclesGroup.getChildren().forEach((obs) => {
    if (obs.x < -50) obs.destroy();
  });

  // Itens fora da tela pela esquerda
  itemsGroup.getChildren().forEach((item) => {
    if (item.x < -50) item.destroy();
  });

  // Projéteis fora da tela pela direita
  lasersGroup.getChildren().forEach((laser) => {
    if (laser.x > 850) laser.destroy();
  });
}