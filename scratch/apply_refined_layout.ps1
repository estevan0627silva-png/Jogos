# 1. Update hud.js panels
$hudPath = "JS_Teste/src/ui/hud.js"
$hudLines = [System.IO.File]::ReadAllLines($hudPath, [System.Text.Encoding]::UTF8)

for ($i = 0; $i -lt $hudLines.Length; $i++) {
    $l = $hudLines[$i]
    if ($l -match "gloryLabel = scene\.add\.text") {
        $hudLines[$i] = '  const gloryLabel = scene.add.text(42, 22, "GLÓRIA & VIDA", textStyle("#a89260", 9)).setOrigin(0, 0.5);'
    } elseif ($l -match "hudGloryText = scene\.add\.text") {
        $hudLines[$i] = '  hudGloryText = scene.add.text(42, 36, "0s", textStyle("#f5e6c8", 13)).setOrigin(0, 0.5);'
    } elseif ($l -match "heart = scene\.add\.image\(96 \+ i \* 14") {
        $hudLines[$i] = '    const heart = scene.add.image(94 + i * 14, 34, "hud_heart", 0).setScale(1.0);'
    } elseif ($l -match "silverIcon = scene\.add\.image") {
        $hudLines[$i] = '  const silverIcon = scene.add.image(226, 34, "silver_coin", 0).setScale(1.2);'
    } elseif ($l -match "silverLabel = scene\.add\.text") {
        $hudLines[$i] = '  const silverLabel = scene.add.text(242, 22, "PRATA", textStyle("#b0bec5", 9)).setOrigin(0, 0.5);'
    } elseif ($l -match "hudSilverText = scene\.add\.text") {
        $hudLines[$i] = '  hudSilverText = scene.add.text(242, 36, "0", textStyle("#e0f7fa", 15)).setOrigin(0, 0.5);'
    } elseif ($l -match "slotFrame = scene\.add\.image\(328") {
        $hudLines[$i] = '  const slotFrame = scene.add.image(326, 34, "ui_wood_slots").setDisplaySize(34, 34);'
    } elseif ($l -match "hudBackpackSlot = scene\.add\.image\(368") {
        $hudLines[$i] = '  hudBackpackSlot = scene.add.image(364, 34, "ui_wood_slots").setDisplaySize(34, 34);'
    } elseif ($l -match "hudBackpackIcon = scene\.add\.image\(368") {
        $hudLines[$i] = '  hudBackpackIcon = scene.add.image(364, 34, "item_bow").setDisplaySize(22, 22).setVisible(false);'
    } elseif ($l -match "hudBackpackLock = scene\.add\.text\(368") {
        $hudLines[$i] = '  hudBackpackLock = scene.add.text(364, 34, "BLOQ.", textStyle("#8d5524", 9)).setOrigin(0.5);'
    } elseif ($l -match "hudItemIcon = scene\.add\.image\(328") {
        $hudLines[$i] = '  hudItemIcon = scene.add.image(326, 34, "item_bow").setDisplaySize(22, 22).setVisible(false);'
    } elseif ($l -match "hudItemName = scene\.add\.text") {
        $hudLines[$i] = '  hudItemName = scene.add.text(388, 22, "SEM ARMA", textStyle("#7a7265", 10)).setOrigin(0, 0.5);'
    } elseif ($l -match "hudItemBarBase = scene\.add\.image") {
        $hudLines[$i] = '  hudItemBarBase = scene.add.image(388, 36, "ui_bar_timer_base").setOrigin(0, 0.5).setDisplaySize(54, 12);'
    } elseif ($l -match "hudItemTime = scene\.add\.text\(450") {
        $hudLines[$i] = '  hudItemTime = scene.add.text(446, 36, "", textStyle("#ffca28", 9.5)).setOrigin(0, 0.5);'
    } elseif ($l -match "badge1 = scene\.add\.image\(494") {
        $hudLines[$i] = '  const badge1 = scene.add.image(486, 25, "scroll_multishot").setScale(0.70).setVisible(false);'
    } elseif ($l -match "txt1 = scene\.add\.text\(494") {
        $hudLines[$i] = '  const txt1 = scene.add.text(486, 39, "", textStyle("#b388ff", 8)).setOrigin(0.5, 0.5).setVisible(false);'
    } elseif ($l -match "badge2 = scene\.add\.image\(518") {
        $hudLines[$i] = '  const badge2 = scene.add.image(512, 25, "scroll_growth").setScale(0.70).setVisible(false);'
    } elseif ($l -match "txt2 = scene\.add\.text\(518") {
        $hudLines[$i] = '  const txt2 = scene.add.text(512, 39, "", textStyle("#b388ff", 8)).setOrigin(0.5, 0.5).setVisible(false);'
    } elseif ($l -match "bestLabel = scene\.add\.text") {
        $hudLines[$i] = '  const bestLabel = scene.add.text(572, 22, "RECORDE", textStyle("#a89260", 9)).setOrigin(0, 0.5);'
    } elseif ($l -match "hudBestText = scene\.add\.text") {
        $hudLines[$i] = '  hudBestText = scene.add.text(572, 36, `${getBestScore()}s`, textStyle("#ffca28", 15)).setOrigin(0, 0.5);'
    } elseif ($l -match "hudScrollBadges\[0\]\.setX\(506\)") {
        $hudLines[$i] = '    hudScrollBadges[0].setX(498);'
    } elseif ($l -match "hudScrollTexts\[0\]\.setX\(506\)") {
        $hudLines[$i] = '    hudScrollTexts[0].setX(498);'
    } elseif ($l -match "hudScrollBadges\[0\]\.setX\(494\)") {
        $hudLines[$i] = '      hudScrollBadges[0].setX(486);'
    } elseif ($l -match "hudScrollTexts\[0\]\.setX\(494\)") {
        $hudLines[$i] = '      hudScrollTexts[0].setX(486);'
    } elseif ($l -match "hudScrollBadges\[1\]\.setX\(518\)") {
        $hudLines[$i] = '      hudScrollBadges[1].setX(512);'
    } elseif ($l -match "hudScrollTexts\[1\]\.setX\(518\)") {
        $hudLines[$i] = '      hudScrollTexts[1].setX(512);'
    } elseif ($l -match "const barX = 394;") {
        $hudLines[$i] = '  const barX = 389;'
    } elseif ($l -match "const barY = 32;") {
        $hudLines[$i] = '  const barY = 33;'
    }
}

[System.IO.File]::WriteAllLines($hudPath, $hudLines, [System.Text.Encoding]::UTF8)
Write-Output "hud.js coordinates updated!"

# 2. Update modals.js banner and cards
$modPath = "JS_Teste/src/ui/modals.js"
$modLines = [System.IO.File]::ReadAllLines($modPath, [System.Text.Encoding]::UTF8)

for ($i = 0; $i -lt $modLines.Length; $i++) {
    $l = $modLines[$i]
    if ($l -match "bannerRibbon = scene\.add\.image\(GAME_WIDTH / 2, \d+, 'ui_ribbon_big_yellow'\)") {
        $modLines[$i] = '  const bannerRibbon = scene.add.image(GAME_WIDTH / 2, 44, "ui_ribbon_big_yellow").setDisplaySize(560, 64);'
    } elseif ($l -match "titleTxt = scene\.add\.text\(GAME_WIDTH / 2, \d+,") {
        $modLines[$i] = '  const titleTxt = scene.add.text(GAME_WIDTH / 2, 44, `⚔ SUBIU PARA O NÍVEL ${runLevel}! ⚔`, {'
    } elseif ($l -match "subTxt = scene\.add\.text\(GAME_WIDTH / 2, \d+,") {
        $modLines[$i] = '  const subTxt = scene.add.text(GAME_WIDTH / 2, 86, "ESCOLHA 1 CARTA DE UPGRADE OU ITEM (CLIQUE OU TECLAS [1] [2] [3])", { ...subtitleTextStyle("#e8dcc4", 11, "bold"), shadow: { offsetX: 1, offsetY: 1, color: "#000000", blur: 0, fill: true } }).setOrigin(0.5);'
    } elseif ($l -match "const cardY = \d+;") {
        $modLines[$i] = '  const cardY = 320;'
    } elseif ($l -match "catTxt = scene\.add\.text\(cx, top \+ \d+,") {
        $modLines[$i] = '    const catTxt = scene.add.text(cx, top + 24, card.category, parchmentTitleStyle("#4a2c11", 11, "bold")).setOrigin(0.5);'
    }
}

[System.IO.File]::WriteAllLines($modPath, $modLines, [System.Text.Encoding]::UTF8)
Write-Output "modals.js coordinates updated!"
