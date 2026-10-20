// =============================================================================

// Schema Unificado de Status de Armas:
// damage, area, attackRate, knockback, projectiles
const WEAPON_SCHEMAS = {
  sword: {
    damage: 1,
    area: 1.0,
    attackRate: 480,
    knockback: 28, // knockback ativo
    projectiles: 1
  },
  bow: {
    damage: 1,
    area: 1.0,
    attackRate: 500,
    knockback: 0, // estritamente 0 para projéteis
    projectiles: 1
  },
  axe: {
    damage: 1,
    area: 1.0,
    attackRate: 560,
    knockback: 28, // knockback ativo que escala com o nível
    projectiles: 1
  },
  firestaff: {
    damage: 1,
    area: 45, // raio de explosão e poça de fogo
    attackRate: 600,
    knockback: 0, // estritamente 0 para projéteis
    projectiles: 1
  },
  shield: {
    damage: 1,
    area: 1.0,
    attackRate: 0,
    knockback: 0,
    projectiles: 0
  }
};

function getWeaponStats(type, lvl = 1) {
  const base = WEAPON_SCHEMAS[type] || { damage: 1, area: 1.0, attackRate: 500, knockback: 0, projectiles: 1 };
  const stats = {
    damage: base.damage,
    area: base.area,
    attackRate: base.attackRate,
    knockback: base.knockback,
    projectiles: base.projectiles
  };

  const effectiveLvl = Math.max(1, lvl);

  // 1. Progressão Exponencial com Atributos Fortes e Guardrails de Engine
  if (type === 'sword') {
    // ATRIBUTO FORTE: Área / Tamanho (Escala +28% multiplicativo por nível até Nv. 5)
    if (effectiveLvl <= 5) {
      stats.area = Math.pow(1.28, effectiveLvl - 1);
    } else {
      stats.area = Math.min(3.60, Math.pow(1.28, 4) * (1 + 0.05 * (effectiveLvl - 5)));
    }
  } else if (type === 'bow') {
    // ATRIBUTO FORTE: Cadência (+25% disparos por segundo por nível -> delay reduz 20% por nível)
    // Teto de segurança absoluto: 100ms (10 flechas/s a 60 FPS para estabilidade de engine)
    stats.attackRate = Math.max(100, Math.round(500 * Math.pow(0.80, effectiveLvl - 1)));
  } else if (type === 'axe') {
    // ATRIBUTO FORTE: Knockback (+50% de repulsão por nível até Nv. 5)
    // Teto de segurança absoluto: 220px (evita arremesso para fora da tela de 800px)
    if (effectiveLvl <= 5) {
      stats.knockback = Math.round(30 * Math.pow(1.50, effectiveLvl - 1));
    } else {
      stats.knockback = Math.min(220, Math.round(30 * Math.pow(1.50, 4) + (effectiveLvl - 5) * 12));
    }
  } else if (type === 'firestaff') {
    // ATRIBUTO FORTE: Raio de Explosão e Poça (+27% no raio por nível -> área multiplica exponencialmente)
    // Teto de segurança absoluto: raio de 160px
    if (effectiveLvl <= 5) {
      stats.area = Math.round(45 * Math.pow(1.27, effectiveLvl - 1));
    } else {
      stats.area = Math.min(160, Math.round(45 * Math.pow(1.27, 4) + (effectiveLvl - 5) * 6));
    }
  }

  // 2. Sistema de Pergaminhos: Aplica bônus do pergaminho exclusivo escolhido
  const msLvl = (chosenScroll === 'multishot') ? (scrollLevels.multishot || 0) : 0;
  const grLvl = (chosenScroll === 'growth') ? (scrollLevels.growth || 0) : 0;
  const asLvl = (chosenScroll === 'attackspeed') ? (scrollLevels.attackspeed || 0) : 0;

  if (msLvl > 0) {
    stats.projectiles += msLvl;
  }

  if (grLvl > 0) {
    const growthMult = 1.0 + grLvl * 0.22;
    stats.area *= growthMult;
  }

  if (asLvl > 0) {
    const asMult = 1.0 + asLvl * 0.18;
    if (stats.attackRate > 0) {
      stats.attackRate = Math.max(90, Math.round(stats.attackRate / asMult));
    }
  }

  return stats;
}

const WeaponStrategies = {
  bow: {
    id: 'bow',
    name: BUFF_NAMES.bow,
    baseDuration: BUFF_TIME.bow,
    getDuration(lvl, bonusDur, wisdomDur) {
      const l = Math.max(1, lvl);
      const baseDur = Math.min(18.0, this.baseDuration * Math.pow(1.12, l - 1));
      return Number(baseDur.toFixed(1)) + wisdomDur + bonusDur;
    },
    getAttackRate(lvl) {
      return getWeaponStats('bow', lvl).attackRate;
    },
    attack({ player, arrows, nextProjId }) {
      sound.playBow();
      const lvl = getWeaponLevel('bow');
      const stats = getWeaponStats('bow', lvl);

      const count = stats.projectiles;
      let spreads = [0];
      if (count === 2) spreads = [-0.10, 0.10];
      else if (count === 3) spreads = [-0.18, 0, 0.18];
      else if (count === 4) spreads = [-0.24, -0.08, 0.08, 0.24];
      else if (count >= 5) {
        spreads = [];
        const step = 0.56 / (count - 1);
        for (let i = 0; i < count; i++) {
          spreads.push(-0.28 + i * step);
        }
      }

      const spd = 620;
      const dmg = stats.damage;
      const pierce = 1;
      const arrowKey = 'arrow_player';
      const arrowScale = 0.95 * stats.area;

      spreads.forEach(ang => {
        const arrow = arrows.create(player.x + 20, player.y + 2, arrowKey);
        arrow.setScale(arrowScale);
        arrow.body.setSize(18, 6);
        arrow.dmg = dmg;
        arrow.knockback = 0; // Projéteis: 0 knockback
        arrow.pierceCount = pierce;
        arrow.projId = nextProjId();
        arrow.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
        arrow.rotation = ang;
      });
    }
  },
  sword: {
    id: 'sword',
    name: BUFF_NAMES.sword,
    baseDuration: BUFF_TIME.sword,
    getDuration(lvl, bonusDur, wisdomDur) {
      const l = Math.max(1, lvl);
      const baseDur = Math.min(18.0, this.baseDuration * Math.pow(1.12, l - 1));
      return Number(baseDur.toFixed(1)) + wisdomDur + bonusDur;
    },
    getAttackRate(lvl) {
      return getWeaponStats('sword', lvl).attackRate;
    },
    onEquip({ swordBlade }) {
      if (swordBlade) {
        swordBlade.setVisible(true);
        swordBlade.setAngle(25);
      }
    },
    onUnequip({ swordBlade }) {
      if (swordBlade) {
        swordBlade.setVisible(false);
      }
    },
    attack({ scene, player, arrows, slashes, fx, nextProjId }) {
      slashes.getChildren().slice().forEach(old => old.destroy());
      sound.playSword();
      const lvl = getWeaponLevel('sword');
      const stats = getWeaponStats('sword', lvl);

      // 1. Swing da lâmina única e persistente empunhada pelo cavaleiro (elimina duplicatas visuais)
      if (swordBlade && swordBlade.active) {
        scene.tweens.killTweensOf(swordBlade);
        swordBlade.setAngle(-65);
        scene.tweens.add({
          targets: swordBlade,
          angle: 125,
          duration: 150,
          ease: 'Cubic.easeOut',
          onComplete: () => {
            if (swordBlade && swordBlade.active && buff && buff.type === 'sword') {
              swordBlade.setAngle(25);
            }
          }
        });
      }

      // SOMENTE Tamanho/Área escala com nível da espada (+ bônus de Crescimento)
      const scale = 0.80 * stats.area;
      const dmg = stats.damage;
      const knockback = stats.knockback;
      const swingId = nextProjId();

      // Multiplicação de Slashes pelo Pergaminho Multi-Shot (180° Frontal Escalável)
      const numSlashes = Math.max(1, stats.projectiles || 1);
      let slashConfigs = [];

      if (numSlashes === 1) {
        slashConfigs = [{ deg: 0, offX: 32, offY: 0 }];
      } else if (numSlashes === 2) {
        slashConfigs = [
          { deg: -16, offX: 32, offY: -16 },
          { deg: 16, offX: 32, offY: 16 }
        ];
      } else if (numSlashes === 3) {
        slashConfigs = [
          { deg: 0, offX: 34, offY: 0 },
          { deg: -26, offX: 30, offY: -26 },
          { deg: 26, offX: 30, offY: 26 }
        ];
      } else if (numSlashes === 4) {
        slashConfigs = [
          { deg: -34, offX: 28, offY: -32 },
          { deg: -12, offX: 34, offY: -12 },
          { deg: 12, offX: 34, offY: 12 },
          { deg: 34, offX: 28, offY: 32 }
        ];
      } else {
        const maxAngle = 72;
        const step = (maxAngle * 2) / (numSlashes - 1);
        for (let i = 0; i < numSlashes; i++) {
          const deg = -maxAngle + i * step;
          const progress = (i / (numSlashes - 1)) * 2 - 1;
          const offY = Math.round(progress * 36);
          const offX = Math.round(34 - Math.abs(progress) * 8);
          slashConfigs.push({ deg, offX, offY });
        }
      }

      // Trava rígida de 180° frontal: estritamente [-90°, +90°], proibido qualquer golpe nas costas
      slashConfigs.forEach(cfg => {
        cfg.deg = Phaser.Math.Clamp(cfg.deg, -90, 90);
        cfg.offX = Math.max(12, cfg.offX);
      });

      slashConfigs.forEach(cfg => {
        const ang = Phaser.Math.DegToRad(cfg.deg);
        const posX = player.x + cfg.offX;
        const posY = player.y + cfg.offY;

        const slash = slashes.create(posX, posY, 'slash_arc');
        slash.setScale(scale);
        slash.rotation = ang;
        slash.offsetX = cfg.offX;
        slash.offsetY = cfg.offY;
        slash.body.setSize(Math.round(52 * scale), Math.round(76 * scale));
        slash.body.setOffset(Math.round(6 * scale), Math.round(6 * scale));
        slash.slashId = swingId;
        slash.dmg = dmg;
        slash.knockback = knockback;

        scene.tweens.add({
          targets: slash,
          scaleX: scale * 1.15,
          alpha: { from: 1.0, to: 0.0 },
          duration: 160,
          ease: 'Quad.easeOut',
          onComplete: () => {
            if (slash && slash.active) slash.destroy();
          }
        });

        fx.sparks.explode(4, posX, posY);
      });

      if (numSlashes > 1) {
        fx.holy.explode(6, player.x + 28, player.y);
      }
    }
  },
  shield: {
    id: 'shield',
    name: BUFF_NAMES.shield,
    baseDuration: BUFF_TIME.shield,
    getDuration(lvl, bonusDur, wisdomDur) {
      const l = Math.max(1, lvl);
      const baseDur = (l <= 5)
        ? 4.8 * Math.pow(1.35, l - 1)
        : Math.min(24.0, 4.8 * Math.pow(1.35, 4) + (l - 5) * 1.5);
      return Number(baseDur.toFixed(1)) + wisdomDur + bonusDur;
    },
    getAttackRate() { return 0; },
    attack() { /* O escudo é defensivo/reativo a impactos */ },
    onEquip({ shieldSprite, shieldAura, player, fx }) {
      shieldSprite.setVisible(true);
      if (shieldAura) {
        shieldAura.setVisible(true);
        if (player) {
          shieldAura.setPosition(Math.round(player.x), Math.round(player.y));
          fx.holy.explode(10, player.x, player.y);
        }
      }
    },
    onUnequip({ shieldSprite, shieldAura }) {
      shieldSprite.setVisible(false);
      if (shieldAura) shieldAura.setVisible(false);
    }
  },
  axe: {
    id: 'axe',
    name: BUFF_NAMES.axe,
    baseDuration: BUFF_TIME.axe,
    getDuration(lvl, bonusDur, wisdomDur) {
      const l = Math.max(1, lvl);
      const baseDur = Math.min(18.0, this.baseDuration * Math.pow(1.12, l - 1));
      return Number(baseDur.toFixed(1)) + wisdomDur + bonusDur;
    },
    getAttackRate(lvl) {
      return getWeaponStats('axe', lvl).attackRate;
    },
    attack({ player, arrows, nextProjId }) {
      sound.playSword();
      const lvl = getWeaponLevel('axe');
      const stats = getWeaponStats('axe', lvl);

      const count = stats.projectiles;
      let angles = [0];
      if (count === 2) angles = [-0.15, 0.15];
      else if (count === 3) angles = [-0.24, 0, 0.24];
      else if (count === 4) angles = [-0.30, -0.10, 0.10, 0.30];
      else if (count >= 5) angles = [-0.36, -0.18, 0, 0.18, 0.36];

      const scale = 0.85 * stats.area;
      const dmg = stats.damage;
      const spd = 500;

      angles.forEach(ang => {
        const axe = arrows.create(player.x + 18, player.y, 'axe_proj');
        axe.setScale(scale);
        axe.body.setSize(20, 20);
        axe.isBoomerang = true;
        axe.pierceCount = 99;
        axe.returning = false;
        axe.hitEnemiesOut = new Set();
        axe.hitEnemiesBack = new Set();
        axe.dmg = dmg;
        axe.knockback = stats.knockback; // Machado: SOMENTE Knockback escala por nível
        axe.projId = nextProjId();

        axe.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
        axe.body.setAccelerationX(-680);
      });
    }
  },
  firestaff: {
    id: 'firestaff',
    name: BUFF_NAMES.firestaff,
    baseDuration: BUFF_TIME.firestaff,
    getDuration(lvl, bonusDur, wisdomDur) {
      const l = Math.max(1, lvl);
      const baseDur = Math.min(18.0, this.baseDuration * Math.pow(1.12, l - 1));
      return Number(baseDur.toFixed(1)) + wisdomDur + bonusDur;
    },
    getAttackRate(lvl) {
      return getWeaponStats('firestaff', lvl).attackRate;
    },
    attack({ player, arrows, nextProjId }) {
      sound.playFireStaff();
      const lvl = getWeaponLevel('firestaff');
      const stats = getWeaponStats('firestaff', lvl);

      const count = stats.projectiles;
      let angles = [0];
      if (count === 2) angles = [-0.14, 0.14];
      else if (count === 3) angles = [-0.22, 0, 0.22];
      else if (count === 4) angles = [-0.28, -0.10, 0.10, 0.28];
      else if (count >= 5) angles = [-0.34, -0.17, 0, 0.17, 0.34];

      // REGRA CRÍTICA: Não aumenta o tamanho da bola de fogo voando, apenas a explosão e poça!
      const projScale = 0.85;
      const blastRadius = Math.round(stats.area);
      const dmg = stats.damage;
      const spd = 480;

      angles.forEach(ang => {
        const fb = arrows.create(player.x + 22, player.y, 'fireball_proj');
        fb.setScale(projScale);
        fb.body.setSize(18, 12);
        fb.isFireball = true;
        fb.blastRadius = blastRadius;
        fb.dmg = dmg;
        fb.knockback = 0; // Projéteis: knockback estritamente 0
        fb.projId = nextProjId();

        fb.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
        fb.rotation = ang;
      });
    }
  }
};

const WeaponSystem = {
  strategies: WeaponStrategies,
  get(type) {
    return this.strategies[type];
  },
  getDuration(type) {
    const s = this.get(type);
    if (!s) return BUFF_TIME[type] || 6.0;
    return s.getDuration(getWeaponLevel(type), runBonusDuration, getWisdomBonusDuration());
  },
  getAttackRate(type) {
    const s = this.get(type);
    if (!s) return ATTACK_RATE[type] || 0;
    return s.getAttackRate(getWeaponLevel(type));
  },
  equip(scene, type, announce = true) {
    const s = this.get(type);
    const sameType = buff.type === type;
    const dur = this.getDuration(type);
    const lvl = getWeaponLevel(type);

    buff = {
      type,
      timeLeft: dur,
      maxTime: dur,
      nextAttack: sameType ? buff.nextAttack : 0
    };

    if (s && s.onEquip) {
      s.onEquip({ shieldSprite, shieldAura, swordBlade, player, fx: { holy: holyFx } });
    } else {
      shieldSprite.setVisible(false);
      if (shieldAura) shieldAura.setVisible(false);
      if (swordBlade) swordBlade.setVisible(false);
    }
    if (type !== 'sword' && swordBlade) {
      swordBlade.setVisible(false);
    }

    if (announce && player) {
      floatText(scene, player.x, player.y - 24, `${BUFF_NAMES[type]} NV.${lvl}!`, '#ffca28');
    }
    events.emit(GameEvents.BUFF_EQUIPPED, { type, level: lvl, duration: dur });
    updateItemHUD();
  },
  end() {
    const prevType = buff.type;
    const s = this.get(prevType);
    if (s && s.onUnequip) {
      s.onUnequip({ shieldSprite, shieldAura, swordBlade });
    } else {
      shieldSprite.setVisible(false);
      if (shieldAura) shieldAura.setVisible(false);
      if (swordBlade) swordBlade.setVisible(false);
    }
    buff = { type: null, timeLeft: 0, maxTime: 0, nextAttack: 0 };
    if (playerBuffBar) playerBuffBar.clear();
    events.emit(GameEvents.BUFF_ENDED, { type: prevType });
  },
  update(scene, time, dt) {
    if (!buff.type) return;
    buff.timeLeft -= dt;
    if (buff.timeLeft <= 0) {
      this.end();
      return;
    }
    const s = this.get(buff.type);
    if (!s) return;
    const rate = s.getAttackRate(getWeaponLevel(buff.type));
    if (rate && time > buff.nextAttack) {
      s.attack({
        scene,
        player,
        arrows: playerArrows,
        slashes,
        fx: { sparks: sparksFx, holy: holyFx, ember: emberFx, hit: hitFx },
        getLevel: getWeaponLevel,
        nextProjId: () => ++slashCounter
      });
      buff.nextAttack = time + rate;
    }
  }
};

function getWeaponDuration(type) {
  return WeaponSystem.getDuration(type);
}

function equipWeaponBuff(scene, type, announce = true) {
  WeaponSystem.equip(scene, type, announce);
}

function collectItem(scene, item) {
  sound.playItemCollect();
  equipWeaponBuff(scene, item.lootType, true);
  removeEntity(item);
}

function endBuff() {
  WeaponSystem.end();
}

function createFirePool(scene, x, y, radius, dmg) {
  const pool = {
    x,
    y,
    radius: Math.max(26, radius * 0.85),
    dmg: 1, // 1 de dano por pulso
    duration: 3.0, // 3 segundos no chão
    elapsed: 0,
    tickCooldown: 0.35, // pulso a cada 0.35s
    tickTimer: 0.1,
    graphics: scene.add.graphics().setDepth(-4) // Desenha no chão (abaixo dos personagens, acima da estrada)
  };
  activeFirePools.push(pool);
}

function updateFirePools(scene, dt) {
  if (!activeFirePools.length) return;
  for (let i = activeFirePools.length - 1; i >= 0; i--) {
    const p = activeFirePools[i];
    p.elapsed += dt;
    const curWorldSpeed = typeof worldSpeed !== 'undefined' ? worldSpeed : ((enemySpeed || 195) * 0.6);
    p.x -= curWorldSpeed * dt;
    p.tickTimer -= dt;

    p.graphics.clear();
    const progress = p.elapsed / p.duration;
    const alpha = Math.max(0, 1 - progress);
    const pulse = 1 + Math.sin(p.elapsed * 12) * 0.08;
    const curRad = p.radius * pulse;

    // Círculo externo de brasas
    p.graphics.fillStyle(0xd84315, alpha * 0.35);
    p.graphics.fillCircle(p.x, p.y, curRad);

    // Círculo médio de fogo
    p.graphics.fillStyle(0xff7043, alpha * 0.55);
    p.graphics.fillCircle(p.x, p.y, curRad * 0.65);

    // Núcleo incandescente
    p.graphics.fillStyle(0xffeb3b, alpha * 0.75);
    p.graphics.fillCircle(p.x, p.y, curRad * 0.3);

    // Borda rúnica
    p.graphics.lineStyle(2, 0xffa000, alpha * 0.8);
    p.graphics.strokeCircle(p.x, p.y, curRad);

    if (Math.random() < 0.25) {
      emberFx.emitParticleAt(
        p.x + Phaser.Math.Between(-curRad * 0.7, curRad * 0.7),
        p.y + Phaser.Math.Between(-curRad * 0.5, curRad * 0.5),
        1
      );
    }

    // Aplica dano contínuo SOMENTE a inimigos que pisarem no fogo (NUNCA ao jogador!)
    if (p.tickTimer <= 0) {
      p.tickTimer = p.tickCooldown;
      enemies.getChildren().forEach(e => {
        if (e.active && Phaser.Math.Distance.Between(p.x, p.y, e.x, e.y) <= curRad) {
          damageEnemy(scene, e, p.dmg);
          hitFx.explode(2, e.x, e.y);
        }
      });
    }

    if (p.elapsed >= p.duration || p.x < -100) {
      p.graphics.destroy();
      activeFirePools.splice(i, 1);
    }
  }
}

function clearFirePools() {
  activeFirePools.forEach(p => {
    if (p.graphics && p.graphics.destroy) p.graphics.destroy();
  });
  activeFirePools = [];
}

function explodeFireball(scene, x, y, radius, dmg) {
  sound.playEarthSmash();
  emberFx.explode(10, x, y);
  hitFx.explode(6, x, y);

  const blastOuter = scene.add.circle(x, y, 10, 0xff7043, 0.40)
    .setStrokeStyle(2, 0xffeb3b, 0.85).setDepth(1550);
  const blastInner = scene.add.circle(x, y, 6, 0xffffff, 0.65)
    .setStrokeStyle(1.5, 0xffca28, 0.9).setDepth(1551);

  scene.tweens.add({
    targets: blastOuter,
    radius,
    alpha: 0,
    duration: 220,
    ease: 'Cubic.easeOut',
    onComplete: () => blastOuter.destroy()
  });
  scene.tweens.add({
    targets: blastInner,
    radius: Math.round(radius * 0.60),
    alpha: 0,
    duration: 160,
    ease: 'Cubic.easeOut',
    onComplete: () => blastInner.destroy()
  });

  // Cria poça de fogo circular no solo que queima apenas inimigos
  createFirePool(scene, x, y, radius, dmg);

  enemies.getChildren().slice().forEach(e => {
    if (e.active && Phaser.Math.Distance.Between(x, y, e.x, e.y) <= radius) {
      if (e.enemyType === 'dark_mage' && e.isShieldActive) return;
      damageEnemy(scene, e, dmg);
    }
  });
  enemyArrows.getChildren().slice().forEach(a => {
    if (a.active && Phaser.Math.Distance.Between(x, y, a.x, a.y) <= radius * 0.9) {
      a.destroy();
    }
  });
}


function triggerPlayerAction(scene) {
  if (!player || !player.active || gameState !== 'PLAYING') return;
  if (!buff || !buff.type) return;
  const s = WeaponSystem.get(buff.type);
  if (s && s.attack) {
    s.attack({
      scene,
      player,
      arrows: playerArrows,
      slashes,
      fx: { sparks: sparksFx, holy: holyFx, ember: emberFx, hit: hitFx },
      getLevel: getWeaponLevel,
      nextProjId: () => ++slashCounter
    });
  }
}


// --- BUNDLE FILE: JS_Teste/src/combat/combatManager.js ---
// =============================================================================
// GERENCIADOR DE COMBATE, DANO, COLISÕES E EVENTOS DE COMBATE
// =============================================================================
// COMBATE, DROPS DE XP/PRATA, LEVEL UP & ARMAS REBALANCEADAS (NV. 1 A 5)
