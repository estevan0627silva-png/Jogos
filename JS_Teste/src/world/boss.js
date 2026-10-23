// =============================================================================
// BOSS FIGHT: GOLEM ANCESTRAL DE PEDRA (ATAQUES, TELEGRAFIAS E CONTROLE)
// =============================================================================
function registerBossTelegraph(boss, obj) {
  if (!boss || !obj) return obj;
  if (!boss.activeTelegraphs) boss.activeTelegraphs = [];
  boss.activeTelegraphs.push(obj);
  return obj;
}

function clearBossTelegraphs(boss) {
  if (!boss || !boss.activeTelegraphs) return;
  boss.activeTelegraphs.forEach(t => {
    if (t && t.active) {
      if (t.scene && t.scene.tweens) t.scene.tweens.killTweensOf(t);
      t.destroy();
    }
  });
  boss.activeTelegraphs = [];
}

function startBossFight(scene) {
  bossSpawned = true;
  sound.startBGM('boss');
  sound.playEarthSmash();
  scene.cameras.main.shake(480, 0.011);

  if (bossFilterOverlay) {
    scene.tweens.add({ targets: bossFilterOverlay, alpha: 0.24, duration: 1000 });
  }
  ground.setTint(0xd0a28c);
  road.setTint(0xd8ae98);
  forestTop.setTint(0x9e8278);
  forestBottom.setTint(0x9e8278);

  floatText(scene, GAME_WIDTH / 2, 134, 'CHEFÃO: GOLEM ANCESTRAL DE PEDRA!', '#ff5252');

  const boss = enemies.create(GAME_WIDTH + 80, 285, 'boss_golem', 0);
  boss.play('boss_golem').setFlipX(true);
  boss.body.setSize(62, 74).setOffset(13, 8);
  boss.setImmovable(true);
  boss.body.pushable = false;
  boss.isBoss = true;
  boss.enemyType = 'boss_golem';
  boss.entityId = ++entityIdCounter;
  boss.maxHp = BOSS_MAX_HP;
  boss.hp = BOSS_MAX_HP;
  boss.entering = true;
  boss.isLunging = false;
  boss.attackCount = 0;
  boss.activeTelegraphs = [];
  boss.setVelocityX(-115);
  activeBoss = boss;

  if (bossHudContainer) {
    bossHudContainer.setVisible(true).setAlpha(0);
    scene.tweens.add({ targets: bossHudContainer, alpha: 1, duration: 550 });
  }
  updateBossHUD();

  if (!buff.type) spawnItem(scene);
  ejectMiniGolemsFromBoss(scene, boss);

  boss.attackTimer = scene.time.addEvent({
    delay: 3400,
    loop: true,
    callback: () => {
      if (gameState !== 'PLAYING' || !boss.active || boss.entering || boss.isLunging) return;
      boss.attackCount++;

      // Ejeção física dinâmica de Mini-Golems diretamente do corpo do Boss
      ejectMiniGolemsFromBoss(scene, boss);

      if (boss.attackCount % 2 === 1) {
        bossThrowRocks(scene, boss);
      } else {
        bossColossalPunch(scene, boss);
      }
    }
  });
}

// EJEÇÃO DINÂMICA DE MINI-GOLEMS DO CORPO DO BOSS:
// Quanto menor a vida do Chefão, maior o número de Mini-Golems expelidos (teto máximo de 5 simultâneos).
// Saltam com física/arco do torso do Boss, caem como pedra inativa, tremem e despertam com olhos vermelhos.
function ejectMiniGolemsFromBoss(scene, boss) {
  if (!boss || !boss.active || gameState !== 'PLAYING') return;

  const currentMiniGolems = enemies.getChildren().filter(e => e.active && e.enemyType === 'mini_golem').length;
  if (currentMiniGolems >= 10) return;

  const hpRatio = (boss.hp ?? BOSS_MAX_HP) / (boss.maxHp || BOSS_MAX_HP);
  let count = 2;
  if (hpRatio <= 0.35) {
    count = Phaser.Math.Between(3, 5);
  } else if (hpRatio <= 0.70) {
    count = Phaser.Math.Between(2, 4);
  } else {
    count = 1;
  }
  count = Math.min(count, 10 - currentMiniGolems);
  if (count <= 0) return;

  sound.playEarthSmash();
  scene.cameras.main.shake(160, 0.006);

  // Recuo visual do torso do Boss ao desprender fragmentos
  scene.tweens.add({
    targets: boss,
    x: boss.x + 6,
    duration: 65,
    yoyo: true,
    repeat: 1
  });

  for (let i = 0; i < count; i++) {
    scene.time.delayedCall(i * 180, () => {
      if (!boss || !boss.active || gameState !== 'PLAYING') return;
      const activeCount = enemies.getChildren().filter(e => e.active && e.enemyType === 'mini_golem').length;
      if (activeCount >= 10) return;

      const originX = boss.x - 22;
      const originY = boss.y - 8;

      if (debrisFx) debrisFx.explode(10, originX, originY);
      if (sparksFx) sparksFx.explode(6, originX, originY);

      const golem = enemies.create(originX, originY, 'mini_golem', 2);
      const cfg = ENEMIES.mini_golem || { w: 18, h: 20, speed: 0.94, hp: 1 };
      golem.body.setSize(cfg.w, cfg.h);
      golem.enemyType = 'mini_golem';
      golem.entityId = ++entityIdCounter;
      golem.maxHp = cfg.hp;
      golem.hp = golem.maxHp;
      golem.setFlipX(true);
      golem.setFrame(2); // Frame 2: Rocha inerte, olhos apagados

      // ESTADO 'EJECTING' (Saindo do corpo do Boss em arco):
      // Física desligada para evitar conflito de velocidade; deslocamento 100% via tweens
      golem.golemState = 'EJECTING';
      if (golem.body) {
        golem.body.moves = false;
      }
      golem.setVelocity(0, 0);

      const targetX = Phaser.Math.Clamp(boss.x - Phaser.Math.Between(70, 320), 160, GAME_WIDTH - 120);
      const targetY = Phaser.Math.Clamp(boss.y + Phaser.Math.Between(-120, 120), 125, 455);

      // Trajetória em arco parabólico simulando desprendimento do corpo do Boss
      scene.tweens.add({
        targets: golem,
        x: targetX,
        duration: 440,
        ease: 'Linear'
      });

      scene.tweens.add({
        targets: golem,
        y: targetY - 45,
        duration: 210,
        ease: 'Quad.easeOut',
        onComplete: () => {
          if (!golem || !golem.active) return;
          scene.tweens.add({
            targets: golem,
            y: targetY,
            duration: 230,
            ease: 'Quad.easeIn',
            onComplete: () => {
              if (!golem || !golem.active) return;
              golem.y = targetY;
              golem.baseY = targetY;

              if (debrisFx) debrisFx.explode(7, golem.x, golem.y + 10);
              sound.playShieldBlock();

              // ESTADO 'DORMANT' (Caído no chão como pedra inerte):
              // Reativa física para ancorar estritamente ao solo da floresta (-worldSpeed); NENHUMA perseguição
              golem.golemState = 'DORMANT';
              golem.setFrame(2);
              if (golem.body) {
                golem.body.moves = true;
                const curWorldSpeed = typeof worldSpeed !== 'undefined' ? worldSpeed : ((enemySpeed || 195) * 0.6);
                golem.setVelocityX(-curWorldSpeed);
                golem.setVelocityY(0);
                golem.body.updateFromGameObject();
              }

              // Transição de despertar após breve momento (1.1s a 1.3s calibrado)
              const dormantTime = Phaser.Math.Between(1100, 1300);
              golem.dormantTimer = scene.time.delayedCall(dormantTime, () => {
                if (!golem || !golem.active || gameState !== 'PLAYING') return;

                // ESTADO 'AWAKENING' (Tremor pré-despertar):
                // Mantém velocidade X sincronizada ao solo e Y zerada. Proibido iniciar perseguição ou mover corpo em direção ao herói.
                golem.golemState = 'AWAKENING';
                golem.setFrame(2);
                if (golem.body) {
                  golem.body.moves = true;
                  const curWorldSpeed = typeof worldSpeed !== 'undefined' ? worldSpeed : ((enemySpeed || 195) * 0.6);
                  golem.setVelocityX(-curWorldSpeed);
                  golem.setVelocityY(0);
                }

                // Animação de tremor pré-despertar (vibração rápida de 3px).
                // Shakes displayOriginX para criar vibração visual sem deslocar a hitbox física em direção ao herói
                const baseOriginX = golem.width * golem.originX;
                scene.tweens.add({
                  targets: golem,
                  displayOriginX: baseOriginX + 3,
                  duration: 40,
                  yoyo: true,
                  repeat: 5,
                  onComplete: () => {
                    if (!golem || !golem.active || gameState !== 'PLAYING') return;
                    golem.setDisplayOrigin(baseOriginX, golem.height * golem.originY);

                    // ESTADO 'ACTIVE' (Desperto e Perseguindo):
                    // Somente agora inicia perseguição ao jogador com olhos vermelhos acesos
                    golem.golemState = 'ACTIVE';
                    golem.setFrame(0);
                    golem.play('mini_golem');
                    if (golem.body) { golem.body.pushable = true; golem.body.setBounce(0.35); }
                    if (debrisFx) debrisFx.explode(8, golem.x, golem.y);
                    if (dustFx) dustFx.explode(6, golem.x, golem.y + 10);
                    sound.playFireStaff();
                    floatText(scene, golem.x, golem.y - 18, 'DESPERTOU!', '#ff5252');

                    const curSpeed = (ENEMIES.mini_golem && ENEMIES.mini_golem.speed) ? (enemySpeed * ENEMIES.mini_golem.speed) : 60;
                    if (player && player.active) {
                      scene.physics.moveToObject(golem, player, curSpeed);
                    } else {
                      golem.setVelocityX(-curSpeed);
                    }
                  }
                });
              });
            }
          });
        }
      });
    });
  }
}

// GOLPE 1: Arremesso de Rochas com Alerta Vermelho -> Chão Craquelado + Rocha como Escudo/Obstáculo
function bossThrowRocks(scene, boss) {
  if (!boss || !boss.active || gameState !== 'PLAYING') return;
  const rockCount = boss.hp <= boss.maxHp * 0.5 ? 3 : 2;

  for (let i = 0; i < rockCount; i++) {
    scene.time.delayedCall(i * 260, () => {
      if (!boss || !boss.active || !player || !player.active || gameState !== 'PLAYING') return;

      const tx = i === 0
        ? Phaser.Math.Clamp(player.x + Phaser.Math.Between(-25, 65), 145, 555)
        : Phaser.Math.Clamp(player.x + Phaser.Math.Between(-85, 110), 145, 555);
      const ty = i === 0
        ? Phaser.Math.Clamp(player.y + Phaser.Math.Between(-35, 35), 140, 505)
        : Phaser.Math.Clamp(player.y + Phaser.Math.Between(-105, 105), 140, 505);
      const variant = Math.random() < 0.55 ? 1 : 0;

      const alertRing = registerBossTelegraph(
        boss,
        scene.add.circle(tx, ty, 30, 0xff1744, 0.20).setStrokeStyle(2.5, 0xff5252, 0.95).setDepth(ty - 1)
      );
      const innerPulse = registerBossTelegraph(
        boss,
        scene.add.circle(tx, ty, 8, 0xff5252, 0.48).setDepth(ty)
      );
      const crossH = registerBossTelegraph(
        boss,
        scene.add.rectangle(tx, ty, 44, 2, 0xff8a80, 0.85).setDepth(ty)
      );
      const crossV = registerBossTelegraph(
        boss,
        scene.add.rectangle(tx, ty, 2, 32, 0xff8a80, 0.85).setDepth(ty)
      );

      scene.tweens.add({
        targets: innerPulse,
        radius: 30,
        alpha: { from: 0.55, to: 0.85 },
        duration: 950,
        ease: 'Quad.easeIn'
      });
      scene.tweens.add({
        targets: alertRing,
        alpha: { from: 0.25, to: 0.7 },
        duration: 190,
        yoyo: true,
        repeat: 4
      });

      boss.setTint(0xffab91);
      scene.time.delayedCall(220, () => {
        if (!boss || !boss.active || gameState !== 'PLAYING') return;
        boss.clearTint();

        const flyingRock = registerBossTelegraph(
          boss,
          scene.add.image(boss.x - 28, boss.y - 22, 'rock', variant).setDepth(1600).setScale(1.18)
        );

        scene.tweens.add({
          targets: flyingRock,
          x: tx,
          y: ty,
          scale: { from: 1.38, to: 1.0 },
          duration: 730,
          ease: 'Sine.easeIn',
          onComplete: () => {
            [alertRing, innerPulse, crossH, crossV, flyingRock].forEach(o => { if (o && o.active) o.destroy(); });
            if (gameState !== 'PLAYING' || !boss.active) return;

            sound.playEarthSmash();
            scene.cameras.main.shake(170, 0.006);
            hitFx.explode(10, tx, ty);

            if (player && player.active && Phaser.Math.Distance.Between(player.x, player.y, tx, ty) <= 30) {
              playerHit(scene, { active: true, isBossAttack: true, x: tx, y: ty, destroy: () => {} });
            }

            spawnBossRockAt(scene, tx, ty, variant);
          }
        });
      });
    });
  }
}

// GOLPE 2: Investida / Soco Colossal Linear com Alerta Vermelho Limpo
function bossColossalPunch(scene, boss) {
  if (!boss || !boss.active || gameState !== 'PLAYING') return;
  boss.isLunging = true;
  boss.setVelocity(0, 0);

  const laneY = boss.y;
  const laneH = 76;
  const laneW = boss.x - 120;
  const laneCenterX = (boss.x + 120) / 2;

  const warnZone = registerBossTelegraph(
    boss,
    scene.add.rectangle(laneCenterX, laneY, laneW, laneH, 0xff1744, 0.22)
      .setStrokeStyle(2.5, 0xff5252, 0.95)
      .setDepth(laneY - 2)
  );
  const warnCore = registerBossTelegraph(
    boss,
    scene.add.rectangle(laneCenterX, laneY, laneW, 14, 0xff5252, 0.42)
      .setDepth(laneY - 1)
  );

  boss.setTint(0xff7043);
  scene.tweens.add({
    targets: [warnZone, warnCore],
    alpha: { from: 0.18, to: 0.65 },
    duration: 160,
    yoyo: true,
    repeat: 4
  });

  const startX = boss.x;
  scene.tweens.add({
    targets: boss,
    x: startX + 18,
    duration: 800,
    ease: 'Sine.easeOut',
    onUpdate: () => { if (boss && boss.body) boss.body.updateFromGameObject(); }
  });

  scene.time.delayedCall(800, () => {
    [warnZone, warnCore].forEach(o => { if (o && o.active) o.destroy(); });
    if (!boss || !boss.active || gameState !== 'PLAYING') return;

    boss.clearTint();
    sound.playEarthSmash();
    scene.cameras.main.shake(260, 0.012);

    const fistWave = registerBossTelegraph(
      boss,
      scene.add.rectangle(boss.x - 36, laneY, 72, laneH - 10, 0xffab91, 0.72)
        .setStrokeStyle(3, 0xffca28, 1)
        .setDepth(laneY + 4)
    );
    scene.tweens.add({
      targets: fistWave,
      x: 155,
      scaleX: 1.4,
      alpha: { from: 0.85, to: 0 },
      duration: 360,
      ease: 'Sine.easeOut',
      onComplete: () => { if (fistWave && fistWave.active) fistWave.destroy(); }
    });

    scene.tweens.add({
      targets: boss,
      x: 210,
      duration: 380,
      ease: 'Quad.easeIn',
      onUpdate: () => {
        if (!boss || !boss.active) return;
        if (boss.body) boss.body.updateFromGameObject();
        if (gameState === 'PLAYING' && Math.random() < 0.55) {
          hitFx.explode(3, boss.x - 26, boss.y + 20);
        }
      },
      onComplete: () => {
        if (!boss || !boss.active) return;
        hitFx.explode(16, boss.x - 24, boss.y);

        scene.tweens.add({
          targets: boss,
          x: 685,
          duration: 460,
          ease: 'Sine.easeOut',
          onUpdate: () => { if (boss && boss.body) boss.body.updateFromGameObject(); },
          onComplete: () => {
            if (!boss || !boss.active) return;
            boss.isLunging = false;
            boss.setVelocityY(Math.random() < 0.5 ? 72 : -72);
          }
        });
      }
    });
  });
}

function spawnBossRockAt(scene, x, y, variant = 1) {
  const crack = scene.add.image(x, y + 6, 'cracked_ground').setDepth(-8).setAlpha(0.95);
  const rock = obstacles.create(x, y, 'rock', variant);
  rock.setImmovable(true);
  rock.body.pushable = false;
  rock.lockedY = y;
  rock.groundY = y + 7;
  rock.obstacleType = 'rock';
  rock.crackDecal = crack;
  rock.body.setSize(20, 14).setOffset(6, 8);
  rock.setVelocityX(-150);
}

function updateBossHUD() {
  if (!bossHpBar || !bossHpText) return;
  bossHpBar.clear();
  if (!activeBoss || !activeBoss.active) return;

  const hp = Math.max(0, activeBoss.hp);
  const maxHp = activeBoss.maxHp || BOSS_MAX_HP;
  const pct = Phaser.Math.Clamp(hp / maxHp, 0, 1);

  const bx = 316, by = 96, bw = 328, bh = 9;
  bossHpBar.fillStyle(0x0c0907, 1).fillRect(bx, by, bw, bh);
  bossHpBar.lineStyle(1, 0x5c3a21).strokeRect(bx, by, bw, bh);

  const fillColor = pct <= 0.35 ? 0xff1744 : pct <= 0.65 ? 0xff5252 : 0xd83a3a;
  const fillW = Math.max(0, Math.round((bw - 2) * pct));
  if (fillW > 0) {
    bossHpBar.fillStyle(fillColor, 1).fillRect(bx + 1, by + 1, fillW, bh - 2);
    bossHpBar.fillStyle(0xff8a80, 0.55).fillRect(bx + 1, by + 1, fillW, 2);
  }
  bossHpText.setText(`${hp}/${maxHp}`);
}

function defeatBoss(scene, boss) {
  if (!boss) return;
  if (boss.attackTimer) boss.attackTimer.remove();
  clearBossTelegraphs(boss);

  const bx = boss.x, by = boss.y;
  activeBoss = null;
  bossDefeated = true;

  sound.playEarthSmash();
  sound.playEnemyHit();
  sound.playCoin();
  scene.cameras.main.flash(260, 255, 215, 110);
  scene.cameras.main.shake(450, 0.014);
  hitFx.explode(36, bx, by);
  removeEntity(boss);

  enemies.getChildren().slice().forEach(e => {
    if (e.active && e.enemyType === 'mini_golem') killEnemy(e);
  });

  if (bossHudContainer) {
    scene.tweens.add({
      targets: bossHudContainer,
      alpha: 0,
      duration: 500,
      onComplete: () => bossHudContainer.setVisible(false)
    });
  }

  if (bossFilterOverlay) {
    scene.tweens.add({ targets: bossFilterOverlay, alpha: 0, duration: 900 });
  }
  ground.clearTint();
  road.clearTint();
  forestTop.clearTint();
  forestBottom.clearTint();
  sound.startBGM('normal');

  floatText(scene, GAME_WIDTH / 2, 150, 'GOLEM DERROTADO! CHUVA DE PRATA & XP!', '#ffca28');
  for (let i = 0; i < 10; i++) {
    spawnCoinDrop(scene, bx + Phaser.Math.Between(-52, 52), by + Phaser.Math.Between(-36, 36), 2);
    spawnXpOrb(scene, bx + Phaser.Math.Between(-56, 56), by + Phaser.Math.Between(-40, 40), 4);
  }
  spawnItem(scene);
}

