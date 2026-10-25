$content = [System.IO.File]::ReadAllText("JS_Teste\src\ui\menus.js", [System.Text.Encoding]::UTF8)

# 1. Update Blacksmith Menu weapon cards
$oldBlacksmithCardBlock = @'
    const nameTxt = scene.add.text(cx, startY + 92, cfg.name, {
      ...parchmentTitleStyle(isStarter ? '#8c4e03' : (isUnlocked ? '#2c1b10' : '#5c4938'), 12.5, 'bold'),
      align: 'center'
    }).setOrigin(0.5);
    fitTextToBox(nameTxt, cardW - 16, 18, 9.5);

    const badgeBg = scene.add.rectangle(cx, startY + 114, cardW - 24, 18, isStarter ? 0x2e5c26 : (isUnlocked ? 0x3d2919 : 0x221a14))
      .setStrokeStyle(1, isStarter ? 0x76ff03 : (isUnlocked ? 0xc5a059 : 0x6e5233));
    const badgeTxt = scene.add.text(cx, startY + 114, weaponArchetypes[key] || 'ARMA REAL', {
      ...roundedTextStyle(isStarter ? '#b9f6ca' : (isUnlocked ? '#ffe082' : '#a8987b'), 9, 'bold'),
      align: 'center'
    }).setOrigin(0.5);

    const descStr = weaponStyles[key] || cfg.forgeLore || '';
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
    let actionBtn, actionTxt;

    if (!isUnlocked) {
      const cost = cfg.unlockCost || 25;
      const canAfford = getGold() >= cost;

      actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, canAfford ? 0x246b3d : 0x3b2c22)
        .setStrokeStyle(2, canAfford ? 0xffca28 : 0x6e5846)
        .setInteractive({ useHandCursor: canAfford });

      actionTxt = scene.add.text(btnX, btnY, FORJAR (G), {
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
        curr.starterWeapon = key;
        saveUpgrades(curr);
        sound.playItemCollect();
        sound.playCoin();
        showBlacksmithMenu(scene);
        floatText(scene, btnX, btnY - 24, ${cfg.name} FORJADA!, '#ffd740');
      });
    } else {
      actionBtn = scene.add.rectangle(btnX, btnY, btnW, btnH, isStarter ? 0x1f4724 : 0x543217)
        .setStrokeStyle(2, isStarter ? 0xffca28 : 0xc5a059)
        .setInteractive({ useHandCursor: true });

      actionTxt = scene.add.text(btnX, btnY, isStarter ? ' EM USO' : 'EQUIPAR', {
        ...roundedTextStyle(isStarter ? '#ffd740' : '#ffffff', 11, 'bold'),
        align: 'center'
      }).setOrigin(0.5);
      fitTextToBox(actionTxt, btnW - 8, btnH - 6, 8.5);

      actionBtn.on('pointerover', () => {
        actionBtn.setFillStyle(isStarter ? 0x27592e : 0x6d401e);
        if (!isStarter) actionTxt.setColor('#ffd740');
      });
      actionBtn.on('pointerout', () => {
        actionBtn.setFillStyle(isStarter ? 0x1f4724 : 0x543217);
        actionTxt.setColor(isStarter ? '#ffd740' : '#ffffff');
      });

      actionBtn.on('pointerdown', () => {
        sound.playButtonClick();
        const curr = getUpgrades();
        curr.starterWeapon = key;
        saveUpgrades(curr);
        showBlacksmithMenu(scene);
        floatText(scene, btnX, btnY - 24, ${cfg.name} SER SUA INICIAL!, '#7fe7ff');
      });
    }

    menuContainer.add([cardGfx, cardHit, icon, nameTxt, badgeBg, badgeTxt, descTxt, actionBtn, actionTxt]);
'@

Write-Output "Checking if oldBlacksmithCardBlock is found..."
Write-Output ($content.Contains($oldBlacksmithCardBlock))
