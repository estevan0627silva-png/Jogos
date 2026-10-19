// SISTEMA MODULAR DE ARMAS (Open-Closed Principle / Strategy Pattern)
// Cada arma encapsula suas taxas de disparo, duração e comportamento de ataque,
// permitindo ajustar ou adicionar novas armas sem modificar o loop central do jogo.
// =============================================================================
const WeaponStrategies = {
  bow: {
    id: 'bow',
    name: BUFF_NAMES.bow,
    baseDuration: BUFF_TIME.bow,
    attackRates: [520, 420, 350, 280, 220],
    getDuration(lvl, bonusDur, wisdomDur) {
      return this.baseDuration + (lvl - 1) * 0.75 + wisdomDur + bonusDur;
    },
    getAttackRate(lvl) {
      return this.attackRates[lvl - 1] || 520;
    },
    attack({ player, arrows, nextProjId }) {
      sound.playBow();
      const lvl = getWeaponLevel('bow');
      const spreads = {
        1: [0],
        2: [0],
        3: [-0.09, 0.09],
        4: [-0.18, 0, 0.18],
        5: [-0.28, -0.14, 0, 0.14, 0.28]
      }[lvl] || [0];

      const spd = lvl === 1 ? 560 : (lvl === 2 ? 670 : 760);
      const dmg = lvl >= 4 ? 2 : 1;
      const pierce = lvl >= 5 ? 3 : (lvl >= 4 ? 2 : 1);
      const arrowKey = lvl >= 4 ? 'arrow_gold' : 'arrow_player';

      spreads.forEach(ang => {
        const arrow = arrows.create(player.x + 20, player.y + 2, arrowKey);
        arrow.body.setSize(18, 6);
        arrow.dmg = dmg;
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
    attackRates: [480, 400, 330, 265, 210],
    getDuration(lvl, bonusDur, wisdomDur) {
      return this.baseDuration + (lvl - 1) * 0.75 + wisdomDur + bonusDur;
    },
    getAttackRate(lvl) {
      return this.attackRates[lvl - 1] || 480;
    },
    attack({ scene, player, arrows, slashes, fx, nextProjId }) {
      slashes.getChildren().slice().forEach(old => old.destroy());
      sound.playSword();
      const lvl = getWeaponLevel('sword');
      const scales = [0.72, 0.96, 1.20, 1.45, 1.72];
      const damages = [1, 1, 2, 3, 4];
      const scale = scales[lvl - 1] || 0.72;
      const offsetX = Math.round(24 + (lvl - 1) * 7);

      const slash = slashes.create(player.x + offsetX, player.y, 'slash_arc');
      slash.setScale(scale);
      slash.offsetX = offsetX;
      slash.body.setSize(Math.round(36 * scale), Math.round(58 * scale));
      slash.slashId = nextProjId();
      slash.dmg = damages[lvl - 1] || 1;
      slash.blade = scene.add.image(player.x, player.y, 'sword_blade')
        .setOrigin(0.5, 0.78)
        .setScale(0.82 + (lvl - 1) * 0.18);

      fx.sparks.explode(5, player.x + offsetX, player.y);

      slash.on('destroy', () => {
        if (slash.blade && slash.blade.active) slash.blade.destroy();
      });

      scene.tweens.add({ targets: slash.blade, angle: { from: -65, to: 125 }, duration: 150, ease: 'Cubic.easeOut' });
      scene.tweens.add({
        targets: slash, alpha: { from: 1, to: 0 }, duration: 190,
        onComplete: () => slash.destroy()
      });

      // Nv 5 (Máximo): Dispara Onda de Vento Cortante Perfurante!
      if (lvl >= 5) {
        const waveProj = arrows.create(player.x + 34, player.y, 'arrow_player');
        waveProj.setTint(0x7fe7ff);
        waveProj.setScale(1.45);
        waveProj.body.setSize(22, 14);
        waveProj.dmg = 3;
        waveProj.pierceCount = 4;
        waveProj.projId = nextProjId();
        waveProj.setVelocityX(720);
        fx.holy.explode(8, player.x + 34, player.y);
      }
    }
  },
  shield: {
    id: 'shield',
    name: BUFF_NAMES.shield,
    baseDuration: BUFF_TIME.shield,
    attackRates: [],
    getDuration(lvl, bonusDur, wisdomDur) {
      return this.baseDuration + (lvl - 1) * 1.65 + wisdomDur + bonusDur;
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
    attackRates: [600, 500, 420, 340, 270],
    getDuration(lvl, bonusDur, wisdomDur) {
      return this.baseDuration + (lvl - 1) * 0.75 + wisdomDur + bonusDur;
    },
    getAttackRate(lvl) {
      return this.attackRates[lvl - 1] || 600;
    },
    attack({ player, arrows, nextProjId }) {
      sound.playSword();
      const lvl = getWeaponLevel('axe');
      const angles = {
        1: [0],
        2: [0],
        3: [-0.16, 0.16],
        4: [-0.24, 0, 0.24],
        5: [-0.32, -0.11, 0.11, 0.32]
      }[lvl] || [0];

      const scales = [0.82, 0.96, 1.05, 1.18, 1.32];
      const damages = [1, 1, 2, 2, 3];

      angles.forEach(ang => {
        const axe = arrows.create(player.x + 18, player.y, 'axe_proj');
        axe.setScale(scales[lvl - 1] || 0.82);
        axe.body.setSize(20, 20);
        axe.isBoomerang = lvl >= 2;
        axe.pierceCount = lvl === 1 ? 2 : 99;
        axe.returning = false;
        axe.dmg = damages[lvl - 1] || 1;
        axe.projId = nextProjId();

        const spd = 460 + (lvl - 1) * 40;
        axe.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
        axe.body.setAccelerationX(-680);
      });
    }
  },
  firestaff: {
    id: 'firestaff',
    name: BUFF_NAMES.firestaff,
    baseDuration: BUFF_TIME.firestaff,
    attackRates: [650, 540, 450, 360, 285],
    getDuration(lvl, bonusDur, wisdomDur) {
      return this.baseDuration + (lvl - 1) * 0.75 + wisdomDur + bonusDur;
    },
    getAttackRate(lvl) {
      return this.attackRates[lvl - 1] || 650;
    },
    attack({ player, arrows, nextProjId }) {
      sound.playBow();
      const lvl = getWeaponLevel('firestaff');
      const angles = {
        1: [0],
        2: [0],
        3: [-0.13, 0.13],
        4: [-0.15, 0.15],
        5: [-0.24, 0, 0.24]
      }[lvl] || [0];

      const radii = [42, 58, 74, 92, 115];
      const damages = [1, 1, 2, 3, 4];
      const scales = [0.85, 1.0, 1.12, 1.25, 1.40];

      angles.forEach(ang => {
        const fb = arrows.create(player.x + 22, player.y, 'fireball_proj');
        fb.setScale(scales[lvl - 1] || 0.85);
        fb.body.setSize(18, 12);
        fb.isFireball = true;
        fb.blastRadius = radii[lvl - 1] || 42;
        fb.dmg = damages[lvl - 1] || 1;
        fb.projId = nextProjId();

        const spd = 440 + (lvl - 1) * 35;
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
      s.onEquip({ shieldSprite, shieldAura, player, fx: { holy: holyFx } });
    } else {
      shieldSprite.setVisible(false);
      if (shieldAura) shieldAura.setVisible(false);
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
      s.onUnequip({ shieldSprite, shieldAura });
    } else {
      shieldSprite.setVisible(false);
      if (shieldAura) shieldAura.setVisible(false);
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
function _original_unused_getWeaponDuration(type) {
  const base = BUFF_TIME[type] || 6.0;
  const wisdomAdd = getWisdomBonusDuration();
  const lvl = getWeaponLevel(type);
  if (type === 'shield') {
    return base + (lvl - 1) * 1.65 + wisdomAdd + runBonusDuration;
  }
  return base + (lvl - 1) * 0.75 + wisdomAdd + runBonusDuration;
}

// Cadência rebalanceada: Nv.1 é lento/básico, acelerando drasticamente até o Nv.5!
function getWeaponAttackRate(type) {
  const lvl = getWeaponLevel(type);
  if (type === 'bow') return [520, 420, 350, 280, 220][lvl - 1] || 520;
  if (type === 'sword') return [480, 400, 330, 265, 210][lvl - 1] || 480;
  if (type === 'axe') return [600, 500, 420, 340, 270][lvl - 1] || 600;
  if (type === 'firestaff') return [650, 540, 450, 360, 285][lvl - 1] || 650;
  return ATTACK_RATE[type] || 0;
}

function equipWeaponBuff(scene, type, announce = true) {
  WeaponSystem.equip(scene, type, announce);
}
function _legacy_equipWeaponBuff(scene, type, announce = true) {
  const sameType = buff.type === type;
  const dur = getWeaponDuration(type);
  const lvl = getWeaponLevel(type);
  buff = {
    type,
    timeLeft: dur,
    maxTime: dur,
    nextAttack: sameType ? buff.nextAttack : 0
  };
  shieldSprite.setVisible(buff.type === 'shield');
  if (shieldAura) {
    shieldAura.setVisible(buff.type === 'shield');
    if (buff.type === 'shield' && player) {
      shieldAura.setPosition(Math.round(player.x), Math.round(player.y));
      holyFx.explode(10, player.x, player.y);
    }
  }
  if (announce && player) {
    floatText(scene, player.x, player.y - 24, `${BUFF_NAMES[type]} NV.${lvl}!`, '#ffca28');
  }
  updateItemHUD();
}

function collectItem(scene, item) {
  sound.playItemCollect();
  equipWeaponBuff(scene, item.lootType, true);
  removeEntity(item);
}

function endBuff() {
  WeaponSystem.end();
}
function _legacy_endBuff() {
  buff = { type: null, timeLeft: 0, maxTime: 0, nextAttack: 0 };
  shieldSprite.setVisible(false);
  if (shieldAura) shieldAura.setVisible(false);
  if (playerBuffBar) playerBuffBar.clear();
}

// ARMA 1: Arco Real (Nv.1 fraco com 1 flecha lenta -> Nv.5 Tempestade Imperial com 5 flechas perfurantes!)
function shootArrow() {
  sound.playBow();
  const lvl = getWeaponLevel('bow');
  const spreads = {
    1: [0],
    2: [0],
    3: [-0.09, 0.09],
    4: [-0.18, 0, 0.18],
    5: [-0.28, -0.14, 0, 0.14, 0.28]
  }[lvl] || [0];

  const spd = lvl === 1 ? 560 : (lvl === 2 ? 670 : 760);
  const dmg = lvl >= 4 ? 2 : 1;
  const pierce = lvl >= 5 ? 3 : (lvl >= 4 ? 2 : 1);
  const arrowKey = lvl >= 4 ? 'arrow_gold' : 'arrow_player';

  spreads.forEach(ang => {
    const arrow = playerArrows.create(player.x + 20, player.y + 2, arrowKey);
    arrow.body.setSize(18, 6);
    arrow.dmg = dmg;
    arrow.pierceCount = pierce;
    arrow.projId = ++slashCounter;
    arrow.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
    arrow.rotation = ang;
  });
}

// ARMA 2: Espada Vorpal (Nv.1 corte curto e 1 dano -> Nv.5 Colosso Vorpal 4 dano + Onda Perfurante!)
function swingSword(scene) {
  slashes.getChildren().slice().forEach(old => old.destroy());
  sound.playSword();
  const lvl = getWeaponLevel('sword');
  const scales = [0.72, 0.96, 1.20, 1.45, 1.72];
  const damages = [1, 1, 2, 3, 4];
  const scale = scales[lvl - 1] || 0.72;
  const offsetX = Math.round(24 + (lvl - 1) * 7);

  const slash = slashes.create(player.x + offsetX, player.y, 'slash_arc');
  slash.setScale(scale);
  slash.offsetX = offsetX;
  slash.body.setSize(Math.round(36 * scale), Math.round(58 * scale));
  slash.slashId = ++slashCounter;
  slash.dmg = damages[lvl - 1] || 1;
  slash.blade = scene.add.image(player.x, player.y, 'sword_blade')
    .setOrigin(0.5, 0.78)
    .setScale(0.82 + (lvl - 1) * 0.18);

  sparksFx.explode(5, player.x + offsetX, player.y);

  slash.on('destroy', () => {
    if (slash.blade && slash.blade.active) slash.blade.destroy();
  });

  scene.tweens.add({ targets: slash.blade, angle: { from: -65, to: 125 }, duration: 150, ease: 'Cubic.easeOut' });
  scene.tweens.add({
    targets: slash, alpha: { from: 1, to: 0 }, duration: 190,
    onComplete: () => slash.destroy()
  });

  // Nv 5 (Máximo): Dispara Onda de Vento Cortante Perfurante!
  if (lvl >= 5) {
    const waveProj = playerArrows.create(player.x + 34, player.y, 'arrow_player');
    waveProj.setTint(0x7fe7ff);
    waveProj.setScale(1.45);
    waveProj.body.setSize(22, 14);
    waveProj.dmg = 3;
    waveProj.pierceCount = 4;
    waveProj.projId = ++slashCounter;
    waveProj.setVelocityX(720);
    holyFx.explode(8, player.x + 34, player.y);
  }
}

// ARMA 4 (Desbloqueável no Ferreiro): Machado Bumerangue (Nv.1 1 machado lento -> Nv.5 4 machados gigantes!)
function throwAxe(scene) {
  sound.playSword();
  const lvl = getWeaponLevel('axe');
  const angles = {
    1: [0],
    2: [0],
    3: [-0.16, 0.16],
    4: [-0.24, 0, 0.24],
    5: [-0.32, -0.11, 0.11, 0.32]
  }[lvl] || [0];

  const scales = [0.82, 0.96, 1.05, 1.18, 1.32];
  const damages = [1, 1, 2, 2, 3];

  angles.forEach(ang => {
    const axe = playerArrows.create(player.x + 18, player.y, 'axe_proj');
    axe.setScale(scales[lvl - 1] || 0.82);
    axe.body.setSize(20, 20);
    axe.isBoomerang = lvl >= 2; // Nv.1 perfura até 2; Nv.2+ perfura ilimitado na ida e volta!
    axe.pierceCount = lvl === 1 ? 2 : 99;
    axe.returning = false;
    axe.dmg = damages[lvl - 1] || 1;
    axe.projId = ++slashCounter;

    const spd = 460 + (lvl - 1) * 40;
    axe.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
    axe.body.setAccelerationX(-680);
  });
}

// ARMA 5 (Desbloqueável no Ferreiro): Cajado de Fogo (Nv.1 explosão curta 1 dano -> Nv.5 Cataclismo Solar!)
function shootFireball(scene) {
  sound.playBow();
  const lvl = getWeaponLevel('firestaff');
  const angles = {
    1: [0],
    2: [0],
    3: [-0.13, 0.13],
    4: [-0.15, 0.15],
    5: [-0.24, 0, 0.24]
  }[lvl] || [0];

  const radii = [42, 58, 74, 92, 115];
  const damages = [1, 1, 2, 3, 4];
  const scales = [0.85, 1.0, 1.12, 1.25, 1.40];

  angles.forEach(ang => {
    const fb = playerArrows.create(player.x + 22, player.y, 'fireball_proj');
    fb.setScale(scales[lvl - 1] || 0.85);
    fb.body.setSize(18, 12);
    fb.isFireball = true;
    fb.blastRadius = radii[lvl - 1] || 42;
    fb.dmg = damages[lvl - 1] || 1;
    fb.projId = ++slashCounter;

    const spd = 440 + (lvl - 1) * 35;
    fb.setVelocity(Math.cos(ang) * spd, Math.sin(ang) * spd);
    fb.rotation = ang;
  });
}

function explodeFireball(scene, x, y, radius, dmg) {
  sound.playEarthSmash();
  emberFx.explode(8, x, y);
  hitFx.explode(5, x, y);

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

  enemies.getChildren().slice().forEach(e => {
    if (e.active && Phaser.Math.Distance.Between(x, y, e.x, e.y) <= radius) {
      damageEnemy(scene, e, dmg);
    }
  });
  enemyArrows.getChildren().slice().forEach(a => {
    if (a.active && Phaser.Math.Distance.Between(x, y, a.x, a.y) <= radius * 0.9) {
      a.destroy();
    }
  });
}

