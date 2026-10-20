// =============================================================================
// SISTEMA DE CONTROLE POR JOYSTICK VIRTUAL MOBILE (FIXO E ANCORADO NA UI)
// =============================================================================

class VirtualJoystick {
  constructor(scene) {
    this.scene = scene;
    this.touchId = null;

    // Posição padrão fixa e ancorada na interface (canto inferior esquerdo)
    this.baseX = 110;
    this.baseY = 485;
    this.knobX = 110;
    this.knobY = 485;

    this.maxRadius = 54;
    this.deadzone = 6;

    // Vetor de direção normalizado (-1 a 1)
    this.vector = { x: 0, y: 0 };
    this.force = 0;
    this.active = false;

    // Detecção inicial de dispositivo móvel ou touch
    this.isMobile = this.detectMobile();
    this.visible = false;

    // Containers e gráficos do Phaser
    this.container = null;
    this.baseGraphics = null;
    this.lineGraphics = null;
    this.knobGraphics = null;

    this.init();
  }

  detectMobile() {
    // Respeita a preferência do usuário salva nas Configurações
    if (typeof getJoystickMode === 'function') {
      const mode = getJoystickMode();
      if (mode === 'enabled') return true;
      if (mode === 'disabled') return false;
    }

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

    // Container principal fixado na câmera (setScrollFactor 0) e sob profundidade de HUD
    this.container = this.scene.add.container(0, 0).setDepth(2400).setScrollFactor(0);

    // Gráficos do Joystick: Linha de tensão, Base Rúnica Fixa e Pino Central Nobre
    this.lineGraphics = this.scene.add.graphics();
    this.baseGraphics = this.scene.add.graphics();
    this.knobGraphics = this.scene.add.graphics();

    this.container.add([this.lineGraphics, this.baseGraphics, this.knobGraphics]);

    this.drawBase(false);
    this.drawKnob(false);

    // Ouvintes de Toque com suporte a Multi-Touch
    this.setupTouchListeners();

    // Detecção dinâmica de primeiro toque para telas touch híbridas
    if (typeof window !== 'undefined') {
      const onFirstTouch = () => {
        if (typeof getJoystickMode === 'function' && getJoystickMode() !== 'disabled') {
          this.isMobile = true;
          this.updateVisibility();
        }
      };
      window.addEventListener('touchstart', onFirstTouch, { once: true, passive: true });
    }

    this.updateVisibility();
  }

  drawBase(isActive = false) {
    const g = this.baseGraphics;
    g.clear();
    const bx = this.baseX;
    const by = this.baseY;
    const r = this.maxRadius;

    // Sombra da base ancorada
    g.fillStyle(0x000000, 0.35);
    g.fillCircle(bx, by + 3, r + 4);

    // Placa de obsidiana rúnica com translucidez agradável
    g.fillStyle(0x120d09, isActive ? 0.62 : 0.42);
    g.fillCircle(bx, by, r);

    // Borda externa de ferro forjado
    g.lineStyle(3, 0x2b221a, isActive ? 0.88 : 0.65);
    g.strokeCircle(bx, by, r);

    // Moldura chanfrada em ouro envelhecido
    g.lineStyle(2, isActive ? 0xffca28 : 0xc5a059, isActive ? 0.95 : 0.70);
    g.strokeCircle(bx, by, r - 2);

    // Aro rúnico interno
    g.lineStyle(1, 0x8a6e30, isActive ? 0.50 : 0.28);
    g.strokeCircle(bx, by, r * 0.55);

    // 4 Marcadores Cardeais de Orientação (Norte, Sul, Leste, Oeste)
    const arrowSize = 6;
    const dist = r - 7;
    const arrowCol = isActive ? 0xffe082 : 0xc5a059;
    const arrowAlpha = isActive ? 0.85 : 0.52;
    g.fillStyle(arrowCol, arrowAlpha);

    g.fillTriangle(bx, by - dist, bx - arrowSize, by - dist + arrowSize, bx + arrowSize, by - dist + arrowSize);
    g.fillTriangle(bx, by + dist, bx - arrowSize, by + dist - arrowSize, bx + arrowSize, by + dist - arrowSize);
    g.fillTriangle(bx - dist, by, bx - dist + arrowSize, by - arrowSize, bx - dist + arrowSize, by + arrowSize);
    g.fillTriangle(bx + dist, by, bx + dist - arrowSize, by - arrowSize, bx + dist - arrowSize, by + arrowSize);

    // Mira cruzada central
    g.lineStyle(1, 0xc5a059, isActive ? 0.30 : 0.16);
    g.lineBetween(bx - 10, by, bx + 10, by);
    g.lineBetween(bx, by - 10, bx, by + 10);
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

    // Broquel de aço e madeira nobre
    g.fillStyle(isActive ? 0x3d3023 : 0x271e16, 0.95);
    g.fillCircle(kx, ky, kr);

    // Borda chanfrada de ouro nobre
    g.lineStyle(2.5, isActive ? 0xffca28 : 0xc5a059, 1);
    g.strokeCircle(kx, ky, kr);

    g.lineStyle(1, isActive ? 0xfff59d : 0x8a6e30, 0.85);
    g.strokeCircle(kx, ky, kr - 2);

    // Cabochão central de Rubi Real
    const gemR = 9;
    const gemColor = isActive ? 0xff3d00 : 0xd32f2f;
    g.fillStyle(gemColor, 1);
    g.fillCircle(kx, ky, gemR);

    // Reflexo especular branco
    g.fillStyle(0xffffff, isActive ? 0.95 : 0.70);
    g.fillCircle(kx - 3, ky - 3, 2.5);

    // Cruz rúnica de ouro
    g.lineStyle(1.5, isActive ? 0xffea00 : 0xffca28, 0.9);
    g.lineBetween(kx - 5, ky, kx + 5, ky);
    g.lineBetween(kx, ky - 5, kx, ky + 5);
  }

  drawConnectorLine() {
    const g = this.lineGraphics;
    g.clear();
    if (!this.active || this.force <= 0.05) return;

    // Arco de energia dourada conectando a base fixa ao pino
    g.lineStyle(2, 0xffca28, Math.min(0.7, this.force * 0.8));
    g.lineBetween(this.baseX, this.baseY, this.knobX, this.knobY);

    g.lineStyle(4, 0xff9800, Math.min(0.4, this.force * 0.45));
    g.lineBetween(this.baseX, this.baseY, this.knobX, this.knobY);
  }

  setupTouchListeners() {
    const scene = this.scene;

    this.onPointerDownHandler = (pointer) => {
      if (typeof gameState !== 'undefined' && gameState !== 'PLAYING') return;
      if (typeof pauseModal !== 'undefined' && pauseModal) return;
      if (typeof draftModal !== 'undefined' && draftModal) return;


      const px = pointer.x;
      const py = pointer.y;

      // Área de ativação: toque próximo à base fixa ancorada (raio de 115px ou canto inferior esquerdo)
      const distFromBase = Phaser.Math.Distance.Between(px, py, this.baseX, this.baseY);
      const inZone = distFromBase <= 115 || (px <= 250 && py >= 350);

      if (inZone && this.touchId === null) {
        this.touchId = pointer.id;
        this.active = true;

        this.processPointerMove(px, py);
        this.drawBase(true);
        this.drawKnob(true);
        this.drawConnectorLine();

        scene.tweens.killTweensOf(this.knobGraphics);
        this.knobGraphics.setScale(1.10);
      }
    });

    this.onPointerMoveHandler = (pointer) => {
      if (this.touchId !== null && pointer.id === this.touchId) {
        this.processPointerMove(pointer.x, pointer.y);
        this.drawKnob(true);
        this.drawConnectorLine();
      }
    });

    this.onPointerUpHandler = (pointer) => {
      if (this.touchId !== null && pointer.id === this.touchId) {
        this.touchId = null;
        this.active = false;
        this.vector.x = 0;
        this.vector.y = 0;
        this.force = 0;

        // Retorna o pino suavemente ao centro da base fixa
        scene.tweens.killTweensOf(this.knobGraphics);
        scene.tweens.add({
          targets: this,
          knobX: this.baseX,
          knobY: this.baseY,
          duration: 120,
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
          }
        });
      }
    };

    scene.input.on('pointerdown', this.onPointerDownHandler);
    scene.input.on('pointermove', this.onPointerMoveHandler);
    scene.input.on('pointerup', this.onPointerUpHandler);
    scene.input.on('pointerupoutside', this.onPointerUpHandler);
  }

  processPointerMove(px, py) {
    const dx = px - this.baseX;
    const dy = py - this.baseY;
    const dist = Math.hypot(dx, dy);

    if (dist < this.deadzone) {
      this.vector.x = 0;
      this.vector.y = 0;
      this.force = 0;
      this.knobX = this.baseX;
      this.knobY = this.baseY;
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

  updateVisibility() {
    this.isMobile = this.detectMobile();
    const inGame = typeof gameState !== 'undefined' && gameState === 'PLAYING';
    const isPausedNow = typeof gameState !== 'undefined' && (gameState === 'PAUSED' || gameState === 'LEVEL_UP');
    const hasModal = (typeof pauseModal !== 'undefined' && !!pauseModal) || (typeof draftModal !== 'undefined' && !!draftModal);
    const shouldShow = this.isMobile && inGame && !isPausedNow && !hasModal;

    this.setVisible(shouldShow);
  }

  setVisible(show) {
    if (this.visible === show) return;
    this.visible = show;
    if (this.container) this.container.setVisible(show);
  }

  update(dt) {
    this.updateVisibility();
  }

  getVector() {
    return this.active ? this.vector : { x: 0, y: 0 };
  }

  destroy() {
    if (this.scene && this.scene.input) {
      if (this.onPointerDownHandler) this.scene.input.off('pointerdown', this.onPointerDownHandler);
      if (this.onPointerMoveHandler) this.scene.input.off('pointermove', this.onPointerMoveHandler);
      if (this.onPointerUpHandler) {
        this.scene.input.off('pointerup', this.onPointerUpHandler);
        this.scene.input.off('pointerupoutside', this.onPointerUpHandler);
      }
    }
    if (this.container) {
      this.container.destroy();
      this.container = null;
    }
  }
}

// Suporte para módulo ou escopo global
if (typeof window !== 'undefined') {
  window.VirtualJoystick = VirtualJoystick;
}
