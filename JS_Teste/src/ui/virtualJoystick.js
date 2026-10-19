// =============================================================================
// SISTEMA DE CONTROLE POR JOYSTICK VIRTUAL & TOUCH MOBILE (MULTI-TOUCH)
// =============================================================================

class VirtualJoystick {
  constructor(scene) {
    this.scene = scene;
    this.touchId = null;
    this.actionTouchId = null;

    // Posições base ergonômicas (espaço de tela do jogo 800x600)
    this.defaultBaseX = 120;
    this.defaultBaseY = 475;
    this.baseX = this.defaultBaseX;
    this.baseY = this.defaultBaseY;
    this.knobX = this.defaultBaseX;
    this.knobY = this.defaultBaseY;

    this.maxRadius = 54;
    this.deadzone = 6;

    // Vetor de direção normalizado (-1 a 1)
    this.vector = { x: 0, y: 0 };
    this.force = 0;
    this.active = false;
    this.isFloating = true; // Permite posicionamento dinâmico onde o dedão toca

    // Detecção inicial de dispositivo móvel ou touch
    this.isMobile = this.detectMobile();
    this.forceVisible = false;
    this.visible = false;

    // Containers e gráficos do Phaser
    this.container = null;
    this.baseGraphics = null;
    this.lineGraphics = null;
    this.knobGraphics = null;
    this.actionContainer = null;
    this.actionGraphics = null;
    this.actionIcon = null;
    this.actionText = null;

    this.init();
  }

  detectMobile() {
    if (typeof window === 'undefined') return false;
    const hasTouch = (
      'ontouchstart' in window ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0)
    );
    const isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return hasTouch && (isCoarse || isMobileUA || window.innerWidth <= 1024);
  }

  init() {
    if (!this.scene) return;

    // Container principal acima do jogo e abaixo de janelas modais
    this.container = this.scene.add.container(0, 0).setDepth(2400).setScrollFactor(0);

    // 1. Gráficos do Joystick (Linha de energia, Base Rúnica e Pino Central)
    this.lineGraphics = this.scene.add.graphics();
    this.baseGraphics = this.scene.add.graphics();
    this.knobGraphics = this.scene.add.graphics();

    this.container.add([this.lineGraphics, this.baseGraphics, this.knobGraphics]);

    this.drawBase(false);
    this.drawKnob(false);

    // 2. Botão de Ação / Golpe no Lado Direito (x: 695, y: 475)
    this.createActionButton();

    // 3. Ouvintes de Toque e Multi-Touch isolado
    this.setupTouchListeners();

    // 4. Detecção dinâmica de primeiro toque para telas touch no Desktop/Emulador
    if (!this.isMobile && typeof window !== 'undefined') {
      const onFirstTouch = () => {
        this.isMobile = true;
        this.updateVisibility();
        window.removeEventListener('touchstart', onFirstTouch);
      };
      window.addEventListener('touchstart', onFirstTouch, { passive: true });
    }

    this.updateVisibility();
  }

  drawBase(isActive = false) {
    const g = this.baseGraphics;
    g.clear();
    const bx = this.baseX;
    const by = this.baseY;
    const r = this.maxRadius;

    // Sombra externa suave
    g.fillStyle(0x000000, 0.35);
    g.fillCircle(bx, by + 3, r + 4);

    // Placa de fundo de obsidiana translúcida
    g.fillStyle(0x120d09, isActive ? 0.60 : 0.38);
    g.fillCircle(bx, by, r);

    // Anel externo de ferro forjado
    g.lineStyle(3, 0x2b221a, isActive ? 0.85 : 0.65);
    g.strokeCircle(bx, by, r);

    // Aro chanfrado nobre em ouro envelhecido
    g.lineStyle(2, isActive ? 0xffca28 : 0xc5a059, isActive ? 0.90 : 0.65);
    g.strokeCircle(bx, by, r - 2);

    // Aro interno rúnico sutil
    g.lineStyle(1, 0x8a6e30, isActive ? 0.45 : 0.25);
    g.strokeCircle(bx, by, r * 0.55);

    // 4 Marcadores Cardeais de Orientação (Norte, Sul, Leste, Oeste em estilo medieval)
    const arrowSize = 6;
    const dist = r - 7;
    const arrowCol = isActive ? 0xffe082 : 0xc5a059;
    const arrowAlpha = isActive ? 0.85 : 0.50;
    g.fillStyle(arrowCol, arrowAlpha);

    // Norte
    g.fillTriangle(bx, by - dist, bx - arrowSize, by - dist + arrowSize, bx + arrowSize, by - dist + arrowSize);
    // Sul
    g.fillTriangle(bx, by + dist, bx - arrowSize, by + dist - arrowSize, bx + arrowSize, by + dist - arrowSize);
    // Oeste
    g.fillTriangle(bx - dist, by, bx - dist + arrowSize, by - arrowSize, bx - dist + arrowSize, by + arrowSize);
    // Leste
    g.fillTriangle(bx + dist, by, bx + dist - arrowSize, by - arrowSize, bx + arrowSize - arrowSize, by + arrowSize);

    // Eixo cruzado discreto
    g.lineStyle(1, 0xc5a059, isActive ? 0.30 : 0.15);
    g.lineBetween(bx - 12, by, bx + 12, by);
    g.lineBetween(bx, by - 12, bx, by + 12);
  }

  drawKnob(isActive = false) {
    const g = this.knobGraphics;
    g.clear();
    const kx = this.knobX;
    const ky = this.knobY;
    const kr = 24;

    // Sombra do pino central
    g.fillStyle(0x000000, 0.45);
    g.fillCircle(kx, ky + 2, kr + 2);

    // Corpo metálico chanfrado (broquel de aço e carvalho)
    g.fillStyle(isActive ? 0x3d3023 : 0x271e16, 0.95);
    g.fillCircle(kx, ky, kr);

    // Borda nobre em ouro chanfrado com sub-tons
    g.lineStyle(2.5, isActive ? 0xffca28 : 0xc5a059, 1);
    g.strokeCircle(kx, ky, kr);

    g.lineStyle(1, isActive ? 0xfff59d : 0x8a6e30, 0.8);
    g.strokeCircle(kx, ky, kr - 2);

    // Gema Central (Cabochão de Rubi Real)
    const gemR = 9;
    const gemColor = isActive ? 0xff3d00 : 0xd32f2f;
    g.fillStyle(gemColor, 1);
    g.fillCircle(kx, ky, gemR);

    // Brilho especular do cristal
    g.fillStyle(0xffffff, isActive ? 0.95 : 0.70);
    g.fillCircle(kx - 3, ky - 3, 2.5);

    // Cruz rúnica central de ouro
    g.lineStyle(1.5, isActive ? 0xffea00 : 0xffca28, 0.9);
    g.lineBetween(kx - 5, ky, kx + 5, ky);
    g.lineBetween(kx, ky - 5, kx, ky + 5);
  }

  drawConnectorLine() {
    const g = this.lineGraphics;
    g.clear();
    if (!this.active || this.force <= 0.05) return;

    // Arco de energia dourada conectando a base ao pino
    g.lineStyle(2, 0xffca28, Math.min(0.7, this.force * 0.8));
    g.lineBetween(this.baseX, this.baseY, this.knobX, this.knobY);

    g.lineStyle(4, 0xff9800, Math.min(0.4, this.force * 0.45));
    g.lineBetween(this.baseX, this.baseY, this.knobX, this.knobY);
  }

  createActionButton() {
    this.actionContainer = this.scene.add.container(695, 475).setDepth(2400).setScrollFactor(0);
    this.actionGraphics = this.scene.add.graphics();

    const drawBtn = (isPressed = false) => {
      const g = this.actionGraphics;
      g.clear();
      const r = 36;

      // Sombra
      g.fillStyle(0x000000, 0.40);
      g.fillCircle(0, 3, r + 2);

      // Fundo escuro com sutil translucidez
      g.fillStyle(isPressed ? 0x4a1818 : 0x1d140e, isPressed ? 0.95 : 0.82);
      g.fillCircle(0, 0, r);

      // Moldura nobre de ouro
      g.lineStyle(2.5, isPressed ? 0xffeb3b : 0xc5a059, 1);
      g.strokeCircle(0, 0, r);

      g.lineStyle(1, isPressed ? 0xffffff : 0x8a6e30, 0.6);
      g.strokeCircle(0, 0, r - 3);

      // Ícone central: Espadas Cruzadas / Brasão de Ataque
      const iconCol = isPressed ? 0xffeb3b : 0xffca28;
      g.lineStyle(2.5, iconCol, 1);
      g.lineBetween(-12, -12, 12, 12);
      g.lineBetween(12, -12, -12, 12);

      // Empunhaduras das espadas
      g.lineStyle(1.5, 0xffffff, 0.9);
      g.lineBetween(-15, -9, -9, -15);
      g.lineBetween(9, -15, 15, -9);

      // Ponto de brilho solar central
      g.fillStyle(isPressed ? 0xffffff : 0xff7043, 1);
      g.fillCircle(0, 0, 4);
    };

    drawBtn(false);

    this.actionText = this.scene.add.text(0, 44, 'AÇÃO', {
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#c5a059',
      fontFamily: 'Courier New, monospace'
    }).setOrigin(0.5);

    this.actionContainer.add([this.actionGraphics, this.actionText]);
  }

  setupTouchListeners() {
    const scene = this.scene;

    // Multi-Touch: Pointer Down
    scene.input.on('pointerdown', (pointer) => {
      // Bloqueia se o jogo estiver em pausa ou tela de menu/modal
      if (typeof gameState !== 'undefined' && gameState !== 'PLAYING') return;
      if (typeof activeModal !== 'undefined' && activeModal) return;
      if (typeof isPaused !== 'undefined' && isPaused) return;

      const px = pointer.x;
      const py = pointer.y;

      // 1. ZONA DO BOTÃO DE AÇÃO (Lado direito inferior: x > 610, y > 380)
      const actionDist = Phaser.Math.Distance.Between(px, py, 695, 475);
      if (actionDist <= 55 && this.actionTouchId === null) {
        this.actionTouchId = pointer.id;
        this.handleActionDown();
        return;
      }

      // 2. ZONA DO JOYSTICK (Metade esquerda da tela: x < 400, y > 140)
      if (px < 400 && py > 140 && this.touchId === null) {
        this.touchId = pointer.id;
        this.active = true;

        if (this.isFloating) {
          // Posiciona a base exatamente onde o polegar encostou (com margem de segurança)
          this.baseX = Phaser.Math.Clamp(px, 75, 360);
          this.baseY = Phaser.Math.Clamp(py, 180, 540);
        } else {
          this.baseX = this.defaultBaseX;
          this.baseY = this.defaultBaseY;
        }

        this.knobX = px;
        this.knobY = py;

        this.processPointerMove(px, py);
        this.drawBase(true);
        this.drawKnob(true);
        this.drawConnectorLine();

        // Animação de pulso ao tocar
        scene.tweens.killTweensOf(this.knobGraphics);
        this.knobGraphics.setScale(1.12);
      }
    });

    // Multi-Touch: Pointer Move
    scene.input.on('pointermove', (pointer) => {
      if (this.touchId !== null && pointer.id === this.touchId) {
        this.processPointerMove(pointer.x, pointer.y);
        this.drawKnob(true);
        this.drawConnectorLine();
      }
    });

    // Multi-Touch: Pointer Up
    const onPointerUp = (pointer) => {
      // Finaliza botão de ação se for o toque dele
      if (this.actionTouchId !== null && pointer.id === this.actionTouchId) {
        this.actionTouchId = null;
        this.handleActionUp();
      }

      // Finaliza joystick se for o toque dele
      if (this.touchId !== null && pointer.id === this.touchId) {
        this.touchId = null;
        this.active = false;
        this.vector.x = 0;
        this.vector.y = 0;
        this.force = 0;

        // Retorna o pino suavemente ao centro da base
        scene.tweens.killTweensOf(this.knobGraphics);
        scene.tweens.add({
          targets: this,
          knobX: this.baseX,
          knobY: this.baseY,
          duration: 130,
          ease: 'Sine.easeOut',
          onUpdate: () => {
            this.drawKnob(false);
            this.drawConnectorLine();
          },
          onComplete: () => {
            this.knobGraphics.setScale(1.0);
            this.drawBase(false);
            this.drawKnob(false);
            this.drawConnectorLine();

            // Se for base flutuante, retorna suavemente à posição padrão de repouso
            if (this.isFloating && (this.baseX !== this.defaultBaseX || this.baseY !== this.defaultBaseY)) {
              scene.tweens.add({
                targets: this,
                baseX: this.defaultBaseX,
                baseY: this.defaultBaseY,
                knobX: this.defaultBaseX,
                knobY: this.defaultBaseY,
                duration: 250,
                delay: 400,
                ease: 'Sine.easeInOut',
                onUpdate: () => {
                  if (!this.active) {
                    this.drawBase(false);
                    this.drawKnob(false);
                  }
                }
              });
            }
          }
        });
      }
    };

    scene.input.on('pointerup', onPointerUp);
    scene.input.on('pointerupoutside', onPointerUp);
  }

  processPointerMove(px, py) {
    const dx = px - this.baseX;
    const dy = py - this.baseY;
    const dist = Math.hypot(dx, dy);

    if (dist < this.deadzone) {
      this.vector.x = 0;
      this.vector.y = 0;
      this.force = 0;
      this.knobX = px;
      this.knobY = py;
      return;
    }

    const clampedDist = Math.min(dist, this.maxRadius);
    const angle = Math.atan2(dy, dx);

    this.knobX = this.baseX + Math.cos(angle) * clampedDist;
    this.knobY = this.baseY + Math.sin(angle) * clampedDist;

    const normalizedPower = (clampedDist - this.deadzone) / (this.maxRadius - this.deadzone);
    this.force = Phaser.Math.Clamp(normalizedPower, 0, 1);
    this.vector.x = Math.cos(angle) * this.force;
    this.vector.y = Math.sin(angle) * this.force;
  }

  handleActionDown() {
    if (this.actionContainer) {
      this.actionContainer.setScale(0.92);
      if (this.actionGraphics) {
        this.actionGraphics.clear();
        this.actionGraphics.fillStyle(0x5c1d1d, 1).fillCircle(0, 0, 36);
        this.actionGraphics.lineStyle(2.5, 0xffeb3b, 1).strokeCircle(0, 0, 36);
        this.actionGraphics.lineStyle(2.5, 0xffffff, 1);
        this.actionGraphics.lineBetween(-12, -12, 12, 12);
        this.actionGraphics.lineBetween(12, -12, -12, 12);
        this.actionGraphics.fillStyle(0xffea00, 1).fillCircle(0, 0, 5);
      }
    }
    // Dispara a mecânica de ataque manual do jogador
    if (typeof triggerPlayerAction === 'function') {
      triggerPlayerAction(this.scene);
    }
  }

  handleActionUp() {
    if (this.actionContainer) {
      this.scene.tweens.add({
        targets: this.actionContainer,
        scale: 1.0,
        duration: 90,
        ease: 'Back.easeOut'
      });
      if (this.actionGraphics) {
        this.drawActionButtonDefault();
      }
    }
  }

  drawActionButtonDefault() {
    const g = this.actionGraphics;
    if (!g) return;
    g.clear();
    const r = 36;
    g.fillStyle(0x000000, 0.40).fillCircle(0, 3, r + 2);
    g.fillStyle(0x1d140e, 0.82).fillCircle(0, 0, r);
    g.lineStyle(2.5, 0xc5a059, 1).strokeCircle(0, 0, r);
    g.lineStyle(1, 0x8a6e30, 0.6).strokeCircle(0, 0, r - 3);
    g.lineStyle(2.5, 0xffca28, 1);
    g.lineBetween(-12, -12, 12, 12);
    g.lineBetween(12, -12, -12, 12);
    g.lineStyle(1.5, 0xffffff, 0.9);
    g.lineBetween(-15, -9, -9, -15);
    g.lineBetween(9, -15, 15, -9);
    g.fillStyle(0xff7043, 1).fillCircle(0, 0, 4);
  }

  updateVisibility() {
    const inGame = typeof gameState !== 'undefined' && gameState === 'PLAYING';
    const isPausedNow = typeof isPaused !== 'undefined' && isPaused;
    const hasModal = typeof activeModal !== 'undefined' && activeModal;
    const shouldShow = (this.isMobile || this.forceVisible) && inGame && !isPausedNow && !hasModal;

    this.setVisible(shouldShow);
  }

  setVisible(show) {
    if (this.visible === show) return;
    this.visible = show;
    if (this.container) this.container.setVisible(show);
    if (this.actionContainer) this.actionContainer.setVisible(show);
  }

  update(dt) {
    this.updateVisibility();
  }

  getVector() {
    return this.active ? this.vector : { x: 0, y: 0 };
  }

  destroy() {
    if (this.container) {
      this.container.destroy();
      this.container = null;
    }
    if (this.actionContainer) {
      this.actionContainer.destroy();
      this.actionContainer = null;
    }
  }
}

// Suporte para módulo ou escopo global
if (typeof window !== 'undefined') {
  window.VirtualJoystick = VirtualJoystick;
}
