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
      // Regras 3 e 4: O Mago só aparece após o Boss ser derrotado e com taxa rara (8%)
      type = roll < 0.08 ? 'dark_mage' : (roll < 0.40 ? 'goblin' : (roll < 0.72 ? 'warrior' : 'elf'));
    } else if (survivalTime >= 40) {
      // Fase pré-boss avançada: Goblins, guerreiros e elfos (SEM MAGO)
      type = roll < 0.45 ? 'goblin' : (roll < 0.75 ? 'warrior' : 'elf');
    } else if (survivalTime >= 20) {
      // Fase pré-boss intermediária
      type = roll < 0.52 ? 'goblin' : (roll < 0.84 ? 'warrior' : 'elf');
    } else {
      // Curva inicial suave: predominantemente goblins simples
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

    // Habilidade Periódica: ergue a Barreira Arcana frontal após 1.2s de entrada em campo
    enemy.shieldCooldownTimer = scene.time.delayedCall(1200, () => {
      if (!enemy.active || gameState !== 'PLAYING') return;
      activateMageBarrier(scene, enemy);
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

// BARREIRA ARCANA CURVADA DO MAGO SOMBRIO (Arcane Curved Frontal Barrier)
// Habilidade periódica: ergue uma barreira curvada frontal em pixel art que reflete projéteis de volta
function activateMageBarrier(scene, mage) {
  if (!mage || !mage.active || mage.isShieldActive) return;

  mage.isShieldActive = true;

  if (mage.barrierSprite && mage.barrierSprite.active) {
    mage.barrierSprite.destroy();
  }

  // Cria a barreira em pixel art em frente ao mago (x: mage.x - 16, y: mage.y)
  const barrier = scene.add.sprite(mage.x - 16, mage.y, 'mage_barrier', 0)
    .setDepth(mage.depth + 5);
  barrier.play('mage_barrier');
  mage.barrierSprite = barrier;

  // Pulso místico sutil de energia
  scene.tweens.add({
    targets: barrier,
    scaleX: { from: 0.94, to: 1.08 },
    scaleY: { from: 0.96, to: 1.04 },
    alpha: { from: 0.88, to: 1.0 },
    yoyo: true,
    repeat: -1,
    duration: 250
  });

  sound.playShieldBlock();
  floatText(scene, mage.x, mage.y - 24, 'BARREIRA ARCANA!', '#d084ff');
  if (holyFx) holyFx.explode(8, mage.x - 16, mage.y);

  // A barreira permanece ativa por um curto período (2.0 segundos)
  mage.shieldTimer = scene.time.delayedCall(2000, () => {
    if (!mage || !mage.active) return;
    if (mage.barrierSprite && mage.barrierSprite.active) {
      scene.tweens.add({
        targets: mage.barrierSprite,
        alpha: 0,
        scaleX: 0.5,
        duration: 160,
        onComplete: () => {
          if (mage && mage.barrierSprite) {
            mage.barrierSprite.destroy();
            mage.barrierSprite = null;
          }
        }
      });
    }
    mage.isShieldActive = false;
    mage.shieldCooldown = true;
    if (sparksFx) sparksFx.explode(6, mage.x - 16, mage.y);

    // Cooldown de 3.2 segundos até reativar a barreira periodicamente
    mage.shieldCooldownTimer = scene.time.delayedCall(3200, () => {
      if (mage && mage.active && gameState === 'PLAYING') {
        mage.shieldCooldown = false;
        activateMageBarrier(scene, mage);
      }
    });
  });
}
const activateMageShield = activateMageBarrier;

function reflectMageProjectile(scene, mage, proj) {
  if (!proj || !proj.active) return;

  sound.playShieldBlock();
  if (sparksFx) sparksFx.explode(8, proj.x, proj.y);
  floatText(scene, proj.x, proj.y - 14, 'REFLETIDO!', '#d084ff');

  // Cria projétil inimigo refletido mirando no jogador
  if (player && player.active && enemyArrows) {
    const dx = player.x - proj.x;
    const dy = player.y - proj.y;
    const ang = Math.atan2(dy, dx);
    const spd = 265;
    const ref = enemyArrows.create(proj.x, proj.y, 'arrow_enemy');
    ref.setTint(0xd084ff);
    ref.rotation = ang;
    ref.body.setSize(14, 8);
    ref.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
  }

  proj.destroy();
}

function teleportMage(scene, mage) {
  if (!mage.isShieldActive && !mage.shieldCooldown) {
    activateMageShield(scene, mage);
  }
}
