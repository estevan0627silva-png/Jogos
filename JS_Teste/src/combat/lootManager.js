// =============================================================================
// GERENCIADOR DE DROPS, XP, MOEDAS E ATRAÇÃO MAGNÉTICA
// =============================================================================
function spawnXpOrb(scene, x, y, xpValue = 2) {
  if (!scene || !xpOrbs) return;
  const targetY = Phaser.Math.Clamp(y + Phaser.Math.Between(-12, 12), 130, 520);
  const orb = xpOrbs.create(x, targetY, 'xp_orb');
  orb.play('xp_orb');
  orb.setScale(xpValue >= 4 ? 1.25 : 1.0);
  orb.body.setSize(28, 28).setOffset(-7, -7);
  orb.groundY = targetY + 7;
  orb.xpValue = xpValue;
  orb.magnetized = false;
  orb.isDropping = true;

  scene.tweens.add({
    targets: orb,
    y: { from: targetY - 12, to: targetY },
    duration: 190,
    ease: 'Quad.easeOut',
    onComplete: () => {
      if (orb && orb.active) orb.isDropping = false;
    }
  });
}

function collectXpOrb(scene, orb) {
  if (!orb || !orb.active) return;
  const ox = orb.x, oy = orb.y;
  const baseXp = orb.xpValue || 2;
  const gained = Math.max(1, Math.round(baseXp * getWisdomMultiplier()));
  sound.playXpOrb();
  hitFx.explode(4, ox, oy);
  removeEntity(orb);
  gainXp(scene, gained);
}

function gainXp(scene, amount) {
  runXp += amount;
  while (runXp >= xpToNextLevel) {
    runXp -= xpToNextLevel; // mantém todo o XP excedente!
    runLevel++;
    xpToNextLevel = getXpRequiredForLevel(runLevel);
    pendingLevelUps++;
  }
  updateXpHUD();

  if (pendingLevelUps > 0 && gameState === 'PLAYING') {
    openLevelUpDraft(scene);
  }
}

// Moeda de Prata: salta do monstro derrotado com física limpa e sem conflito de tween!
function spawnCoinDrop(scene, x, y, silverValue = 1) {
  if (!scene || !coins) return;
  const targetY = Phaser.Math.Clamp(y + Phaser.Math.Between(-10, 14), 130, 520);
  const coin = coins.create(x, targetY, 'silver_coin');
  coin.play('silver_coin');
  coin.body.setSize(28, 28).setOffset(-6, -6);
  coin.groundY = targetY + 8;
  coin.silverValue = silverValue;
  coin.magnetized = false;
  coin.isDropping = true;

  scene.tweens.add({
    targets: coin,
    y: { from: targetY - 14, to: targetY },
    scale: { from: 1.22, to: 1 },
    duration: 210,
    ease: 'Quad.easeOut',
    onComplete: () => {
      if (coin && coin.active) coin.isDropping = false;
    }
  });
}

function collectCoin(scene, coin) {
  if (!coin || !coin.active) return;
  const cx = coin.x, cy = coin.y;
  const val = coin.silverValue || 1;
  runSilver += val;
  if (hudSilverText && hudSilverText.active) {
    hudSilverText.setText(`${runSilver}`);
  }
  sound.playCoin();
  hitFx.explode(6, cx, cy);
  floatText(scene, cx, cy - 16, `+${val} PRATA`, '#e0f7fa');
  removeEntity(coin);
}

