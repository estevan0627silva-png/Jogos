// =============================================================================
// GERENCIADOR DE COMBATE, DANO, COLISÕES E EVENTOS DE COMBATE
// =============================================================================
// COMBATE, DROPS DE XP/PRATA, LEVEL UP & ARMAS REBALANCEADAS (NV. 1 A 5)
// =============================================================================
function removeEntity(obj) {
  if (!obj || !obj.active) return;
  obj.scene.tweens.killTweensOf(obj);
  if (obj.shootTimer) obj.shootTimer.remove();
  if (obj.attackTimer) obj.attackTimer.remove();
  if (obj.dormantTimer) obj.dormantTimer.remove();
  if (obj.shieldTimer) obj.shieldTimer.remove();
  if (obj.shieldCooldownTimer) obj.shieldCooldownTimer.remove();
  if (obj.shieldVisual && obj.shieldVisual.active) obj.shieldVisual.destroy();
  if (obj.barrierSprite && obj.barrierSprite.active) obj.barrierSprite.destroy();
  if (obj.activeTelegraphs) clearBossTelegraphs(obj);
  if (obj.chargeRing && obj.chargeRing.active) obj.chargeRing.destroy();
  if (obj.crackDecal && obj.crackDecal.active) obj.crackDecal.destroy();
  if (obj.speechBubble && obj.speechBubble.active) obj.speechBubble.destroy();
  obj.destroy();
}

// HITSTOP MILIMÉTRICO (Micro-freeze tátil de impacto em golpes pesados)
function triggerHitstop(scene, durationMs = 45) {
  if (!scene || isHitstopping || gameState !== 'PLAYING') return;
  if (!scene.physics || !scene.physics.world) return;

  isHitstopping = true;
  scene.physics.world.isPaused = true;
  if (scene.anims && scene.anims.pauseAll) {
    scene.anims.pauseAll();
  }

  let resumed = false;
  const resume = () => {
    if (resumed) return;
    resumed = true;
    isHitstopping = false;
    if (gameState === 'PLAYING') {
      if (scene && scene.physics && scene.physics.world) {
        scene.physics.world.isPaused = false;
      }
      if (scene && scene.anims && scene.anims.resumeAll) {
        scene.anims.resumeAll();
      }
    }
  };

  if (scene.time && scene.time.delayedCall) {
    scene.time.delayedCall(durationMs, resume);
  }
  setTimeout(resume, durationMs + 25);
}

function damageEnemy(scene, enemy, dmg = 1) {
  if (!enemy || !enemy.active) return;

  // Mini Golem: Na forma inconsciente/inanimada (EJECTING, DORMANT, AWAKENING), é invulnerável a qualquer dano
  if (enemy.enemyType === 'mini_golem' && enemy.golemState !== 'ACTIVE') {
    sound.playShieldBlock();
    if (debrisFx) debrisFx.explode(4, enemy.x, enemy.y);
    return;
  }

  enemy.hp = (enemy.hp ?? 1) - dmg;

  // Faíscas metálicas pontuais para alvos blindados (guerreiros e boss) ou hit normal
  if (enemy.isBoss || enemy.enemyType === 'warrior') {
    sparksFx.explode(8, enemy.x - 12, enemy.y);
  } else if (enemy.enemyType === 'mini_golem') {
    debrisFx.explode(6, enemy.x, enemy.y);
  } else {
    hitFx.explode(7, enemy.x, enemy.y);
  }

  // Flash branco estrito de impacto (65ms) sem ofuscar a visão
  enemy.setTint(0xffffff);
  scene.time.delayedCall(65, () => {
    if (!enemy || !enemy.active) return;
    if (enemy.hp > 0) {
      enemy.setTint(0xffca28);
      scene.time.delayedCall(65, () => {
        if (enemy && enemy.active) enemy.clearTint();
      });
    } else {
      enemy.clearTint();
    }
  });

  if (enemy.isBoss) {
    updateBossHUD();
    if (enemy.hp <= 0) {
      defeatBoss(scene, enemy);
    } else {
      sound.playShieldBlock();
    }
    return;
  }

  if (enemy.hp <= 0) {
    killEnemy(enemy);
  } else {
    sound.playShieldBlock();
    // Projéteis e dano geral não alteram a posição do inimigo (knockback exclusivo da espada)
  }
}

// Empurrão suave exclusivo da espada: interpola a posição X com desaceleração Cubic.easeOut
// e pausa temporariamente a velocidade para evitar conflitos de física ou marcha a ré involuntária
function applySmoothKnockback(scene, enemy, distance = 22, duration = 130) {
  if (!enemy || !enemy.active || enemy.isBoss || enemy.hp <= 0) return;
  if (enemy.enemyType === 'mini_golem' && enemy.golemState !== 'ACTIVE') return;

  const cfg = ENEMIES[enemy.enemyType] || { speed: 1 };
  const baseVx = -Math.max(60, (enemySpeed || 85) * (cfg.speed || 1));
  const currentX = enemy.x;
  const targetX = Math.min(780, currentX + distance);

  scene.tweens.killTweensOf(enemy, ['x']);

  if (enemy.body) {
    enemy.setVelocityX(0);
  }

  scene.tweens.add({
    targets: enemy,
    x: targetX,
    duration: duration,
    ease: 'Cubic.easeOut',
    onUpdate: () => {
      if (enemy && enemy.active && enemy.body) {
        enemy.body.updateFromGameObject();
      }
    },
    onComplete: () => {
      if (!enemy || !enemy.active || enemy.hp <= 0) return;
      if (enemy.enemyType === 'mini_golem' && enemy.golemState !== 'ACTIVE') return;
      if (enemy.body) {
        enemy.body.updateFromGameObject();
        enemy.setVelocityX(baseVx);
      }
    }
  });
}

// =============================================================================
// OUVINTES DE EVENTOS DESACOPLADOS (Observer / Listeners)
// Isola efeitos de áudio, partículas visuais, conquistas e drops da lógica central
// =============================================================================
function setupDecoupledEventListeners(scene) {
  events.clear();

  // 1. ÁUDIO REATIVO
  events.on(GameEvents.ENEMY_KILLED, () => sound.playEnemyHit());









  // 2. EFEITOS VISUAIS (VFX)
  events.on(GameEvents.ENEMY_KILLED, ({ x, y, enemyType }) => {
    hitFx.explode(10, x, y);
    if (enemyType === 'warrior') {
      sparksFx.explode(8, x, y);
      debrisFx.explode(5, x, y);
    } else if (enemyType === 'mini_golem') {
      debrisFx.explode(8, x, y);
      sparksFx.explode(4, x, y);
    } else if (enemyType === 'dark_mage') {
      holyFx.explode(8, x, y);
    }
  });

  // 3. CONQUISTAS DESACOPLADAS
  events.on(GameEvents.ENEMY_KILLED, ({ scene, enemyType }) => {
    if (enemyType === 'goblin') recordAchievementProgress(scene, 'goblins', 1);
    else if (enemyType === 'warrior') recordAchievementProgress(scene, 'warriors', 1);
    else if (enemyType === 'dark_mage') recordAchievementProgress(scene, 'mages', 1);
  });



  // 4. SISTEMA DE LOOT & RECOMPENSAS
  events.on(GameEvents.ENEMY_KILLED, ({ scene, enemyType, x, y, xpValue }) => {
    const dropRates = { dark_mage: 0.72, warrior: 0.62, elf: 0.48, goblin: 0.38, mini_golem: 0.32 };
    const chance = dropRates[enemyType] ?? 0.40;

    spawnXpOrb(scene, x - 6, y, xpValue);

    if (Math.random() < chance) {
      const count = (enemyType === 'dark_mage' || enemyType === 'warrior') && Math.random() < 0.42 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        spawnCoinDrop(scene, x + 8 + i * 10, y);
      }
    }
  });
}

function killEnemy(enemy) {
  if (!enemy || !enemy.active) return;
  const scene = enemy.scene;
  const ex = enemy.x, ey = enemy.y;
  const eType = enemy.enemyType;
  const xpValue = ENEMIES[eType]?.xp ?? 2;

  removeEntity(enemy);

  // Emite evento para que áudio, partículas, conquistas e drops respondam de forma modular
  events.emit(GameEvents.ENEMY_KILLED, {
    scene,
    enemy,
    enemyType: eType,
    x: ex,
    y: ey,
    xpValue
  });
}


function playerHit(scene, hazard) {
  if (gameState !== 'PLAYING' || !hazard.active) return;
  if (hazard.enemyType === 'mini_golem' && hazard.golemState !== 'ACTIVE') return;

  if (buff.type === 'shield') {
    const lvl = getWeaponLevel('shield');

    // 1. ESCUDO SAGRADO REFLETE PROJÉTEIS MANTENDO A COR/ASPECTO NORMAL + CONTABILIZA CONQUISTA!
    if (enemyArrows.contains(hazard)) {
      const hx = hazard.x, hy = hazard.y;
      hazard.destroy();

      sound.playShieldBlock();
      sparksFx.explode(10, hx, hy);
      holyFx.explode(8, hx, hy);
      floatText(scene, player.x, player.y - 28, 'FLECHA REFLETIDA!', '#7fe7ff');
      recordAchievementProgress(scene, 'reflected', 1);
      events.emit(GameEvents.SHIELD_REFLECT, { scene });
      const effectiveLvl = Math.max(1, lvl);
      let spreads = [-0.28, -0.14, 0, 0.14, 0.28];
      if (effectiveLvl === 1 || effectiveLvl === 2) spreads = [0];
      else if (effectiveLvl === 3) spreads = [-0.12, 0.12];
      else if (effectiveLvl === 4) spreads = [-0.20, 0, 0.20];

      spreads.forEach(ang => {
        const reflArrow = playerArrows.create(player.x + 20, player.y, 'arrow_player');
        reflArrow.body.setSize(18, 8);
        reflArrow.dmg = lvl >= 4 ? (lvl >= 6 ? Math.round(2 * (1 + 0.12 * (lvl - 5))) : 2) : 1;
        reflArrow.pierceCount = lvl >= 4 ? 2 : 1;
        reflArrow.projId = ++slashCounter;
        const spd = lvl === 1 ? 620 : 760;
        reflArrow.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
        reflArrow.rotation = ang;
      });
      return;
    }

    // 2. Impacto corpo a corpo ou golpe do Boss quebra o escudo em uma Onda de Choque Sagrada!
    endBuff();
    sound.playShieldBlock();
    scene.cameras.main.flash(160, 120, 220, 255);
    scene.cameras.main.shake(180, 0.008);
    floatText(scene, player.x, player.y - 32, 'ONDA DE CHOQUE!', '#7fe7ff');

    const shockRadius = 95 + (lvl - 1) * 30;
    const bossDmg = lvl <= 5 ? [2, 3, 5, 7, 10][lvl - 1] : 10 + (lvl - 5) * 2;

    holyFx.explode(28, player.x, player.y);
    sparksFx.explode(16, player.x, player.y);

    const wave = scene.add.circle(player.x, player.y, 16, 0x7fe7ff, 0.40)
      .setStrokeStyle(3, 0xffffff).setDepth(1600);
    const innerWave = scene.add.circle(player.x, player.y, 10, 0xffe082, 0.60)
      .setStrokeStyle(2, 0xffffff).setDepth(1601);

    scene.tweens.add({
      targets: [wave, innerWave],
      radius: shockRadius,
      alpha: 0,
      duration: 320,
      ease: 'Cubic.easeOut',
      onComplete: () => {
        if (wave.active) wave.destroy();
        if (innerWave.active) innerWave.destroy();
      }
    });

    enemies.getChildren().slice().forEach(e => {
      if (e.active && Phaser.Math.Distance.Between(player.x, player.y, e.x, e.y) <= shockRadius + 10) {
        if (e.isBoss) {
          damageEnemy(scene, e, bossDmg);
        } else {
          killEnemy(e);
        }
      }
    });
    enemyArrows.getChildren().slice().forEach(a => {
      if (a.active && Phaser.Math.Distance.Between(player.x, player.y, a.x, a.y) <= shockRadius) {
        a.destroy();
      }
    });
    return;
  }

  if (playerInvulnerable) {
    if (enemyArrows.contains(hazard)) hazard.destroy();
    return;
  }

  playerHp = Math.max(0, playerHp - 1);
  updateHeartsHUD();
  triggerHitstop(scene, 55);

  if (playerHp > 0) {
    playerInvulnerable = true;
    if (enemyArrows.contains(hazard)) {
      hazard.destroy();
    } else if (hazard && hazard.active && !hazard.isBoss && !hazard.isBossAttack) {
      killEnemy(hazard);
    }

    sound.playPlayerHurt();
    events.emit(GameEvents.PLAYER_HIT, { scene, hp: playerHp });
    sparksFx.explode(8, player.x, player.y);
    hitFx.explode(14, player.x, player.y);
    player.setTint(0xffffff);
    scene.time.delayedCall(75, () => {
      if (player && player.active) player.clearTint();
    });
    scene.cameras.main.flash(140, 255, 80, 80);
    scene.cameras.main.shake(180, 0.009);
    floatText(scene, player.x, player.y - 30, `-1 CORAÇÃO! (${playerHp}/${playerMaxHp})`, '#ff5252');

    enemyArrows.getChildren().slice().forEach(a => {
      if (a.active && Phaser.Math.Distance.Between(player.x, player.y, a.x, a.y) <= 95) {
        a.destroy();
      }
    });

    scene.tweens.add({
      targets: player,
      alpha: { from: 0.25, to: 1 },
      duration: 110,
      yoyo: true,
      repeat: 5,
      onComplete: () => {
        if (player && player.active) player.setAlpha(1);
        playerInvulnerable = false;
  isHitstopping = false;
      }
    });
    return;
  }

  gameOver(scene);
}

function gameOver(scene) {
  if (gameState === 'GAMEOVER') return;
  if (typeof PlatformBridge !== 'undefined') PlatformBridge.gameplayStop();
  gameState = 'GAMEOVER';
  playerInvulnerable = false;
  isHitstopping = false;
  pendingLevelUps = 0;

  consolidateSilverToGold();
  clearFirePools();

  if (shieldSprite) shieldSprite.setVisible(false);
  if (shieldAura) shieldAura.setVisible(false);
  if (playerBuffBar) playerBuffBar.clear();
  if (enemyHpBars) enemyHpBars.clear();
  if (activeBoss) clearBossTelegraphs(activeBoss);
  if (pauseModal) {
    pauseModal.destroy();
    pauseModal = null;
  }
  if (draftModal) {
    draftModal.destroy();
    draftModal = null;
  }
  sound.stopBGM();
  sound.playGameOver();
  events.emit(GameEvents.PLAYER_DIED, { scene });
  if (hudContainer) hudContainer.setVisible(false);

  scene.physics.pause();
  scene.time.removeAllEvents();
  scene.time.paused = false;
  scene.time.timeScale = 1;

  if (player) {
    scene.tweens.killTweensOf(player);
    player.setAlpha(1).setTint(0xff5555);
    if (player.anims) player.anims.pause();
  }
  enemies.getChildren().forEach(s => {
    scene.tweens.killTweensOf(s);
    if (s.anims) s.anims.pause();
  });
  items.getChildren().forEach(i => scene.tweens.killTweensOf(i));
  coins.getChildren().forEach(c => scene.tweens.killTweensOf(c));
  if (xpOrbs) xpOrbs.getChildren().forEach(o => scene.tweens.killTweensOf(o));

  hitFx.explode(20, player.x, player.y);
  scene.cameras.main.shake(300, 0.012);
  scene.time.delayedCall(700, () => showInitials(scene));
}

