// =============================================================================
// INIMIGOS: SPAWN DE HORDAS E MECÂNICAS DE DISPARO (ELFO E MAGO SOMBRIO)
// =============================================================================
function spawnEnemy(scene, forcedType, customY) {
  const roll = Math.random();
  let type = forcedType;
  if (!type) {
    if (activeBoss && activeBoss.active) {
      // Regra 6: Durante a Boss Fight, gera exclusivamente Mini-Golems
      type = 'mini_golem';
    } else if (bossDefeated) {
      // Pós-Boss: Magos (8%), Mini-Golems ágeis em bandos (24%), Goblins (28%), Guerreiros (22%), Elfos (18%)
      type = roll < 0.08 ? 'dark_mage' : (roll < 0.32 ? 'mini_golem' : (roll < 0.60 ? 'goblin' : (roll < 0.82 ? 'warrior' : 'elf')));
    } else if (survivalTime >= 40) {
      // Fase pré-boss avançada: Mini-Golems velozes (22%), Goblins (32%), Guerreiros (26%), Elfos (20%)
      type = roll < 0.22 ? 'mini_golem' : (roll < 0.54 ? 'goblin' : (roll < 0.80 ? 'warrior' : 'elf'));
    } else if (survivalTime >= 20) {
      // A partir dos 20 segundos de sobrevivência: 20% de Mini-Golems ágeis com zigue-zague!
      type = roll < 0.20 ? 'mini_golem' : (roll < 0.58 ? 'goblin' : (roll < 0.82 ? 'warrior' : 'elf'));
    } else {
      // Curva inicial suave (< 20s): predominantemente goblins simples e guerreiros
      type = roll < 0.80 ? 'goblin' : 'warrior';
    }
  }
  const cfg = ENEMIES[type] || ENEMIES.goblin;

  // Evita nascer exatamente em cima de outro inimigo recém-gerado
  let y = customY ?? Phaser.Math.Between(130, 520);
  if (customY === undefined) {
    for (let i = 0; i < 6; i++) {
      const candidate = Phaser.Math.Between(130, 520);
      const stacked = enemies.getChildren().some(e => !e.isBoss && e.x > 760 && Math.abs(e.y - candidate) < 36);
      if (!stacked) { y = candidate; break; }
    }
  }

  const enemy = enemies.create(860, y, type, 0);
  enemy.play({ key: type, startFrame: Phaser.Math.Between(0, 1) }).setFlipX(true);
  enemy.body.setSize(cfg.w, cfg.h);
  enemy.setVelocityX(-enemySpeed * cfg.speed);
  enemy.phase = Math.random() * 10;
  enemy.baseY = y;
  enemy.enemyType = type;
  // Blindagem de Spawns Naturais: Mini-Golems gerados fora da ejeção do chefe nascem imediatamente no estado 'ACTIVE'
  if (type === 'mini_golem') {
    enemy.golemState = 'ACTIVE';
    enemy.play('mini_golem');
  }
  // Escalonamento suave de vida de guerreiros e magos em partidas longas (> 90s)
  const hpBonus = (survivalTime >= 95 && (type === 'warrior' || type === 'dark_mage')) ? 1 : 0;
  enemy.maxHp = cfg.hp + hpBonus;
  enemy.hp = enemy.maxHp;

  if (type === 'elf') {
    enemy.shootTimer = scene.time.delayedCall(650, () => {
      if (!enemy.active || gameState !== 'PLAYING') return;
      elfShoot(scene, enemy);
      enemy.shootTimer = scene.time.addEvent({
        delay: 1700,
        loop: true,
        callback: () => elfShoot(scene, enemy)
      });
    });
  } else if (type === 'dark_mage') {
    enemy.shootTimer = scene.time.delayedCall(750, () => {
      if (!enemy.active || gameState !== 'PLAYING') return;
      mageShoot(scene, enemy);
      enemy.shootTimer = scene.time.addEvent({
        delay: 2200,
        loop: true,
        callback: () => mageShoot(scene, enemy)
      });
    });
  }
}

// =============================================================================
// PRIMEIRA BOSS FIGHT: GOLEM ANCESTRAL DE PEDRA (AOS 120 SEGUNDOS)
// =============================================================================

function elfShoot(scene, elf) {
  if (!elf.active || !player || !player.active || gameState !== 'PLAYING') return;
  if (elf.x > 790 || elf.x < player.x + 25) return;

  elf.setTint(0xa7ffeb);
  if (elf.chargeRing && elf.chargeRing.active) elf.chargeRing.destroy();
  const chargeRing = scene.add.circle(elf.x - 10, elf.y, 8, 0x26a69a, 0.22)
    .setStrokeStyle(1.5, 0x69f0ae, 0.75).setDepth(elf.depth + 2);
  elf.chargeRing = chargeRing;

  scene.tweens.add({
    targets: chargeRing,
    scale: { from: 1.2, to: 0.3 },
    alpha: { from: 0.8, to: 0 },
    duration: 320,
    onComplete: () => { if (chargeRing.active) chargeRing.destroy(); }
  });

  scene.time.delayedCall(320, () => {
    if (!elf.active || !player || !player.active || !player.body || gameState !== 'PLAYING') return;
    elf.clearTint();
    sound.playElfShot();
    const arrow = enemyArrows.create(elf.x - 14, elf.y, 'arrow_elf');
    arrow.body.setSize(8, 8);
    arrow.rotation = scene.physics.moveToObject(arrow, player, 360);
  });
}

function mageShoot(scene, mage) {
  if (!mage.active || !player || !player.active || gameState !== 'PLAYING') return;
  if (mage.x > 790 || mage.x < player.x + 20) return;

  mage.setTint(0x7fe7ff);
  if (mage.chargeRing && mage.chargeRing.active) mage.chargeRing.destroy();
  const chargeRing = scene.add.circle(mage.x - 10, mage.y - 4, 15, 0x7fe7ff, 0.32)
    .setStrokeStyle(2, 0xc36bff).setDepth(mage.depth + 2);
  mage.chargeRing = chargeRing;

  scene.tweens.add({
    targets: chargeRing,
    scale: { from: 1.4, to: 0.25 },
    alpha: { from: 0.95, to: 0 },
    duration: 380,
    onComplete: () => { if (chargeRing.active) chargeRing.destroy(); }
  });

  scene.time.delayedCall(380, () => {
    if (!mage.active || !player || !player.active || gameState !== 'PLAYING') return;
    mage.clearTint();
    sound.playElfShot();
    const baseAngle = Phaser.Math.Angle.Between(mage.x - 12, mage.y, player.x, player.y);
    [-0.30, 0, 0.30].forEach(spread => {
      const orb = enemyArrows.create(mage.x - 12, mage.y, 'orb_enemy');
      orb.body.setSize(10, 10);
      const ang = baseAngle + spread;
      const spd = 255;
      orb.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
    });
  });
}

// INTANGIBILIDADE ARCANA DO MAGO SOMBRIO (Forma de Partículas / Mist Form)
// Substitui o teletransporte confuso: dissolve-se em névoa espectral, deixando projéteis atravessarem
function becomeIntangibleMage(scene, mage) {
  if (!mage || !mage.active || mage.isIntangible || mage.intangibleCooldown) return false;

  mage.isIntangible = true;

  // Explode partículas arcanas púrpuras
  if (holyFx) holyFx.explode(14, mage.x, mage.y);
  if (sparksFx) sparksFx.explode(8, mage.x, mage.y);
  sound.playArcaneMist();
  floatText(scene, mage.x, mage.y - 20, 'INTANGÍVEL!', '#b388ff');

  // Tween visual: reduz alpha para 0.22 (aspecto fantasmagórico translúcido) durante 700ms
  scene.tweens.add({
    targets: mage,
    alpha: 0.22,
    duration: 120,
    ease: 'Linear'
  });

  mage.intangibleTimer = scene.time.delayedCall(700, () => {
    if (!mage || !mage.active) return;

    // Nova explosão suave de partículas arcanas na rematerialização
    if (holyFx) holyFx.explode(10, mage.x, mage.y);
    if (sparksFx) sparksFx.explode(6, mage.x, mage.y);

    scene.tweens.add({
      targets: mage,
      alpha: 1.0,
      duration: 180,
      ease: 'Linear'
    });

    mage.isIntangible = false;
    mage.intangibleCooldown = true;

    // Cooldown de 2.8 segundos antes de poder ficar intangível novamente (janela justa para o jogador acertá-lo!)
    mage.cooldownTimer = scene.time.delayedCall(2800, () => {
      if (mage && mage.active) {
        mage.intangibleCooldown = false;
      }
    });
  });

  return true;
}

// Fallback mantido por compatibilidade
function teleportMage(scene, mage) {
  return becomeIntangibleMage(scene, mage);
}
