# Read menus.js
$path = "JS_Teste\src\ui\menus.js"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# 1. Replace Blacksmith card block
$bsStartAnchor = "const nameTxt = scene.add.text(cx, startY + 92, cfg.name"
$bsEndAnchor = "menuContainer.add([cardGfx, cardHit, icon, nameTxt, badgeBg, badgeTxt, descTxt, actionBtn, actionTxt]);"

$bsStartIdx = $content.IndexOf($bsStartAnchor)
$bsEndIdx = $content.IndexOf($bsEndAnchor, $bsStartIdx) + $bsEndAnchor.Length

if ($bsStartIdx -lt 0 -or $bsEndIdx -le $bsStartIdx) {
  Write-Error "Could not find Blacksmith card block!"
  exit 1
}

$newBsBlock = @'
    const currentLvl = Math.max(1, parseInt(upgrades[key]?.level ?? 1, 10));
    const maxLvl = (cfg.levels && cfg.levels.length) || 5;
    const isMaxLvl = currentLvl >= maxLvl;
    const upgCost = 25 * Math.pow(2, currentLvl - 1);

    const nameTxt = scene.add.text(cx, startY + 90, cfg.name, {
      ...parchmentTitleStyle(isStarter ? '#8c4e03' : (isUnlocked ? '#2c1b10' : '#5c4938'), 12, 'bold'),
      align: 'center',
      wordWrap: { width: cardW - 14, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(nameTxt, cardW - 14, 28, 9.5);

    const badgeBg = scene.add.rectangle(cx, startY + 114, cardW - 24, 18, isStarter ? 0x2e5c26 : (isUnlocked ? 0x3d2919 : 0x221a14))
      .setStrokeStyle(1, isStarter ? 0x76ff03 : (isUnlocked ? 0xc5a059 : 0x6e5233));
    const badgeStr = (weaponArchetypes[key] || 'ARMA REAL') + (isUnlocked ?  \u2022 NV. : '');
    const badgeTxt = scene.add.text(cx, startY + 114, badgeStr, {
      ...roundedTextStyle(isStarter ? '#b9f6ca' : (isUnlocked ? '#ffe082' : '#a8987b'), 8.5, 'bold'),
      align: 'center'
    }).setOrigin(0.5);
    fitTextToBox(badgeTxt, cardW - 28, 16, 8.5);

    const descStr = (isUnlocked && cfg.levels && cfg.levels[currentLvl - 1]?.desc) || weaponStyles[key] || cfg.forgeLore || '';
    const descTxt = scene.add.text(cx, startY + 164, descStr, {
      ...roundedTextStyle('#3d2817', 10, 'normal'),
      align: 'center',
      lineSpacing: 2.5,
      wordWrap: { width: cardW - 20, useAdvancedWrap: true }
    }).setOrigin(0.5);
    fitTextToBox(descTxt, cardW - 18, 76, 8.5);

    const hitZoneH = cardH - 52;
    const cardHit = scene.add.rectangle(cx, startY + 8 + hitZoneH / 2, cardW, hitZoneH, 0x000000, 0)
      .setInteractive({ useHandCursor: true });

    cardHit.on('pointerover', () => {
      drawCard(true);
      smithSpeechTxt.setText(weaponDialogues[key] || '"Excelente escolha, guerreiro!"');
    });
    cardHit.on('pointerout', () => {
      drawCard(false);
      smithSpeechTxt.setText('"O fogo forja o ao! Escolha seu armamento para a batalha."');
    });

    const btnX = cx, btnY = startY + cardH - 24, btnW = cardW - 24, btnH = 34;

    if (!isUnlocked) {
      const cost = cfg.unlockCost || 25;
      const canAfford = getGold() >= cost;

      const actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, canAfford ? 0x246b3d : 0x3b2c22)
        .setStrokeStyle(2, canAfford ? 0xffca28 : 0x6e5846)
        .setInteractive({ useHandCursor: canAfford });

      const actionTxt = scene.add.text(btnX, btnY, FORJAR (G), {
        ...roundedTextStyle(canAfford ? '#ffffff' : '#8c7b6b', 11, 'bold'),
        align: 'center'
      }).setOrigin(0.5);
      fitTextToBox(actionTxt, btnW - 8, btnH - 6, 8.5);

      actionBtn.on('pointerover', () => {
        if (getGold() >= cost) {
          actionBtn.setFillStyle(0x2e854b);
          actionBtn.setStrokeStyle(2, 0xffd740);
          actionTxt.setColor('#ffeb3b');
        } else {
          actionBtn.setFillStyle(0x4a372b);
        }
      });
      actionBtn.on('pointerout', () => {
        const stillAfford = getGold() >= cost;
        actionBtn.setFillStyle(stillAfford ? 0x246b3d : 0x3b2c22);
        actionBtn.setStrokeStyle(2, stillAfford ? 0xffca28 : 0x6e5846);
        actionTxt.setColor(stillAfford ? '#ffffff' : '#8c7b6b');
      });

      actionBtn.on('pointerdown', () => {
        if (getGold() < cost) {
          sound.playShieldBlock();
          floatText(scene, btnX, btnY - 20, 'OURO INSUFICIENTE!', '#ff5252');
          return;
        }
        addGold(-cost);
        const curr = getUpgrades();
        curr[key].unlocked = true;
        curr[key].level = 1;
        curr.starterWeapon = key;
        saveUpgrades(curr);
        sound.playItemCollect();
        sound.playCoin();
        showBlacksmithMenu(scene);
        floatText(scene, btnX, btnY - 24, ${cfg.name} FORJADA!, '#ffd740');
      });

      menuContainer.add([cardGfx, cardHit, icon, nameTxt, badgeBg, badgeTxt, descTxt, actionBtn, actionTxt]);
    } else {
      // Unlocked: Equip button on left, Upgrade button on right
      const equipBtnX = cx - 38;
      const equipBtnW = 68;
      const equipBtnH = 32;

      const actionBtn = scene.add.rectangle(equipBtnX, btnY, equipBtnW, equipBtnH, isStarter ? 0x1f4724 : 0x543217)
        .setStrokeStyle(1.5, isStarter ? 0xffca28 : 0xc5a059)
        .setInteractive({ useHandCursor: !isStarter });

      const actionTxt = scene.add.text(equipBtnX, btnY, isStarter ? 'EM USO' : 'EQUIPAR', {
        ...roundedTextStyle(isStarter ? '#ffd740' : '#ffffff', 10, 'bold'),
        align: 'center'
      }).setOrigin(0.5);
      fitTextToBox(actionTxt, equipBtnW - 6, equipBtnH - 6, 8.5);

      if (!isStarter) {
        actionBtn.on('pointerover', () => {
          actionBtn.setFillStyle(0x6d401e);
          actionTxt.setColor('#ffd740');
        });
        actionBtn.on('pointerout', () => {
          actionBtn.setFillStyle(0x543217);
          actionTxt.setColor('#ffffff');
        });
        actionBtn.on('pointerdown', () => {
          sound.playButtonClick();
          const curr = getUpgrades();
          curr.starterWeapon = key;
          saveUpgrades(curr);
          showBlacksmithMenu(scene);
          floatText(scene, cx, startY + 114, ${cfg.name} SER\u00c1 SUA INICIAL!, '#7fe7ff');
        });
      }

      // Botao Upgrade Permanente (Direita: w = 74, h = 32, x = cx + 37)
      const upgBtnX = cx + 37;
      const upgBtnW = 74;
      const upgBtnH = 32;
      const canAffordUpg = !isMaxLvl && getGold() >= upgCost;

      const upgBtn = scene.add.rectangle(upgBtnX, btnY, upgBtnW, upgBtnH,
        isMaxLvl ? 0x221a14 : (canAffordUpg ? 0x246b3d : 0x3b2c22))
        .setStrokeStyle(1.5, isMaxLvl ? 0x5c4938 : (canAffordUpg ? 0xffca28 : 0x6e5846))
        .setInteractive({ useHandCursor: !isMaxLvl && canAffordUpg });

      const upgTxt = scene.add.text(upgBtnX, btnY, isMaxLvl ? 'NV. MX' : +1 NV (G), {
        ...roundedTextStyle(isMaxLvl ? '#8c7b6b' : (canAffordUpg ? '#ffffff' : '#8c7b6b'), 9.5, 'bold'),
        align: 'center'
      }).setOrigin(0.5);
      fitTextToBox(upgTxt, upgBtnW - 6, upgBtnH - 6, 8);

      if (!isMaxLvl) {
        upgBtn.on('pointerover', () => {
          if (getGold() >= upgCost) {
            upgBtn.setFillStyle(0x2e854b);
            upgTxt.setColor('#ffeb3b');
          } else {
            upgBtn.setFillStyle(0x4a372b);
          }
        });
        upgBtn.on('pointerout', () => {
          const afford = getGold() >= upgCost;
          upgBtn.setFillStyle(afford ? 0x246b3d : 0x3b2c22);
          upgBtn.setStrokeStyle(1.5, afford ? 0xffca28 : 0x6e5846);
          upgTxt.setColor(afford ? '#ffffff' : '#8c7b6b');
        });
        upgBtn.on('pointerdown', () => {
          if (getGold() < upgCost) {
            sound.playShieldBlock();
            floatText(scene, upgBtnX, btnY - 20, 'OURO INSUFICIENTE!', '#ff5252');
            return;
          }
          addGold(-upgCost);
          const curr = getUpgrades();
          curr[key].level = currentLvl + 1;
          saveUpgrades(curr);
          sound.playBuy();
          sound.playCoin();
          showBlacksmithMenu(scene);
          floatText(scene, cx, startY + 114, ${cfg.name} NV.!, '#ffd740');
        });
      }

      menuContainer.add([cardGfx, cardHit, icon, nameTxt, badgeBg, badgeTxt, descTxt, actionBtn, actionTxt, upgBtn, upgTxt]);
    }
'@

$content = $content.Substring(0, $bsStartIdx) + $newBsBlock + $content.Substring($bsEndIdx)

# 2. Replace Mage dividers and card dimensions
$mageDivOld = @'
  // Divisores verticais de ouro exatamente nos pontos mdios entre as cartas (x: 250, 480, 710)
  [250, 480, 710].forEach(divX => {
    tableClothArt.lineStyle(1.5, 0xc5a059, 0.45).lineBetween(divX, 266, divX, 512);
    tableClothArt.fillStyle(0xffca28, 0.85).fillCircle(divX, 388, 3.5);
    tableClothArt.fillStyle(0xffd700, 1).fillCircle(divX, 388, 1.8);
    tableClothArt.lineStyle(1.5, 0xffca28, 0.8).lineBetween(divX - 6, 388, divX + 6, 388);
  });

  // Alvolos / Esteiras para as cartas
  const cardW = 210;
  const cardH = 266;
  const startY = 252;
  const cardLefts = [30, 260, 490, 720];
'@

# We find the divider line and replace through cardLefts
$mStartIdx = $content.IndexOf("[250, 480, 710].forEach(divX => {")
if ($mStartIdx -lt 0) {
  Write-Error "Could not find mage dividers!"
  exit 1
}
$mEndAnchor = "const cardLefts = [30, 260, 490, 720];"
$mEndIdx = $content.IndexOf($mEndAnchor, $mStartIdx) + $mEndAnchor.Length

$newMageSetup = @'
[204, 388, 572, 756].forEach(divX => {
    tableClothArt.lineStyle(1.5, 0xc5a059, 0.45).lineBetween(divX, 266, divX, 512);
    tableClothArt.fillStyle(0xffca28, 0.85).fillCircle(divX, 388, 3.5);
    tableClothArt.fillStyle(0xffd700, 1).fillCircle(divX, 388, 1.8);
    tableClothArt.lineStyle(1.5, 0xffca28, 0.8).lineBetween(divX - 6, 388, divX + 6, 388);
  });

  // Alveolos / Esteiras para as 5 cartas
  const cardW = 168;
  const cardH = 266;
  const startY = 250;
  const cardLefts = [28, 212, 396, 580, 764];
'@

$content = $content.Substring(0, $mStartIdx) + $newMageSetup + $content.Substring($mEndIdx)

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Output "Successfully updated menus.js!"
