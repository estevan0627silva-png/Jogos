# Update hud.js
$hudLines = [System.IO.File]::ReadAllLines("JS_Teste/src/ui/hud.js", [System.Text.Encoding]::UTF8)

# Replace lines 216..274 (0-based indices 215..273)
$newHudPanelsLines = @(
  "  // 1. PAINEL DE GLÓRIA & VIDA (Tempo + Corações) — Esquerda (x: 14..202)",
  "  const gloryBg = scene.add.image(14, 10, 'ui_hud_panel_time').setOrigin(0, 0).setDisplaySize(188, 48);",
  "  const hourglass = scene.add.image(28, 34, 'hud_hourglass');",
  "  const gloryLabel = scene.add.text(42, 19, 'GLÓRIA & VIDA', textStyle('#a89260', 9)).setOrigin(0, 0.5);",
  "  hudGloryText = scene.add.text(42, 35, '0s', textStyle('#f5e6c8', 13)).setOrigin(0, 0.5);",
  "  hudContainer.add([gloryBg, hourglass, gloryLabel, hudGloryText]);",
  "",
  "  hudHearts = [];",
  "  for (let i = 0; i < 6; i++) {",
  "    const heart = scene.add.image(96 + i * 14, 34, 'hud_heart', 0).setScale(1.0);",
  "    hudHearts.push(heart);",
  "    hudContainer.add(heart);",
  "  }",
  "  updateHeartsHUD();",
  "",
  "  // 2. PAINEL DE PRATA DA PARTIDA — Centro-Esquerda (x: 210..298)",
  "  const silverBg = scene.add.image(210, 10, 'ui_hud_panel_silver').setOrigin(0, 0).setDisplaySize(88, 48);",
  "  const silverIcon = scene.add.image(228, 34, 'silver_coin', 0).setScale(1.2);",
  "  const silverLabel = scene.add.text(244, 19, 'PRATA', textStyle('#b0bec5', 9)).setOrigin(0, 0.5);",
  "  hudSilverText = scene.add.text(244, 35, '0', textStyle('#e0f7fa', 16)).setOrigin(0, 0.5);",
  "  hudContainer.add([silverBg, silverIcon, silverLabel, hudSilverText]);",
  "",
  "  // 3. PAINEL DE RELÍQUIA / EQUIPAMENTO ATIVO — Centro (x: 306..532)",
  "  const itemBg = scene.add.image(306, 10, 'ui_hud_panel_weapon').setOrigin(0, 0).setDisplaySize(226, 48);",
  "",
  "  // Alvéolo circular / medalhão medieval de relíquia (UI Kit)",
  "  const slotFrame = scene.add.image(328, 34, 'ui_wood_slots').setDisplaySize(36, 36);",
  "  hudBackpackSlot = scene.add.image(368, 34, 'ui_wood_slots').setDisplaySize(36, 36);",
  "  hudBackpackIcon = scene.add.image(368, 34, 'item_bow').setDisplaySize(24, 24).setVisible(false);",
  "  hudBackpackLock = scene.add.text(368, 34, 'BLOQ.', textStyle('#8d5524', 9)).setOrigin(0.5);",
  "",
  "  hudItemIcon = scene.add.image(328, 34, 'item_bow').setDisplaySize(24, 24).setVisible(false);",
  "  hudItemName = scene.add.text(392, 20, 'SEM ARMA', textStyle('#7a7265', 10)).setOrigin(0, 0.5);",
  "  hudItemBarBase = scene.add.image(392, 35, 'ui_bar_timer_base').setOrigin(0, 0.5).setDisplaySize(54, 12);",
  "  hudItemBar = scene.add.graphics();",
  "  hudItemTime = scene.add.text(450, 35, '', textStyle('#ffca28', 9.5)).setOrigin(0, 0.5);",
  "  const badge1 = scene.add.image(494, 26, 'scroll_multishot').setScale(0.70).setVisible(false);",
  "  const txt1 = scene.add.text(494, 40, '', textStyle('#b388ff', 8)).setOrigin(0.5, 0.5).setVisible(false);",
  "  const badge2 = scene.add.image(518, 26, 'scroll_growth').setScale(0.70).setVisible(false);",
  "  const txt2 = scene.add.text(518, 40, '', textStyle('#b388ff', 8)).setOrigin(0.5, 0.5).setVisible(false);",
  "  hudScrollBadges = [badge1, badge2];",
  "  hudScrollTexts = [txt1, txt2];",
  "  hudScrollBadge = badge1;",
  "  hudScrollText = txt1;",
  "  hudContainer.add([itemBg, slotFrame, hudItemIcon, hudBackpackSlot, hudBackpackIcon, hudBackpackLock, hudItemName, hudItemBarBase, hudItemBar, hudItemTime, badge1, txt1, badge2, txt2]);",
  "",
  "  // 4. PAINEL DE RECORDE DO REINO (x: 540..648)",
  "  const bestBg = scene.add.image(540, 10, 'ui_hud_panel_record').setOrigin(0, 0).setDisplaySize(108, 48);",
  "  const crown = scene.add.image(556, 34, 'hud_crown');",
  "  const bestLabel = scene.add.text(570, 19, 'RECORDE', textStyle('#a89260', 9)).setOrigin(0, 0.5);",
  "  hudBestText = scene.add.text(570, 35, `${getBestScore()}s`, textStyle('#ffca28', 15)).setOrigin(0, 0.5);",
  "  hudContainer.add([bestBg, crown, bestLabel, hudBestText]);"
)

# Replace lines 215..273
$resultHud = New-Object System.Collections.Generic.List[string]
for ($i = 0; $i -lt 215; $i++) {
    $resultHud.Add($hudLines[$i])
}
foreach ($l in $newHudPanelsLines) {
    $resultHud.Add($l)
}

# Now for remaining lines up to line 334 (which now has shifted index)
# Let's find index where xpFrame starts
$xpIndex = -1
for ($i = 274; $i -lt $hudLines.Length; $i++) {
    if ($hudLines[$i] -match 'const xpFrame = scene\.add\.graphics') {
        $xpIndex = $i
        break
    }
}

if ($xpIndex -ne -1) {
    for ($i = 274; $i -lt ($xpIndex - 1); $i++) {
        $resultHud.Add($hudLines[$i])
    }
    # Add new xp frame
    $resultHud.Add("  // 8. BARRA DE EXPERIÊNCIA (XP) DA PARTIDA — Faixa Horizontal Nobre 16:9 (x: 14..946, y: 61..77)")
    $resultHud.Add("  const xpFrame = scene.add.image(14, 61, 'ui_bar_xp_base').setOrigin(0, 0).setDisplaySize(932, 16);")
    
    # Skip until hudXpBar = scene.add.graphics();
    $afterXpIndex = -1
    for ($i = $xpIndex; $i -lt $hudLines.Length; $i++) {
        if ($hudLines[$i] -match 'hudXpBar = scene\.add\.graphics\(\);') {
            $afterXpIndex = $i
            break
        }
    }
    for ($i = $afterXpIndex; $i -lt $hudLines.Length; $i++) {
        $resultHud.Add($hudLines[$i])
    }
} else {
    Write-Output "ERROR: xpFrame not found!"
}

[System.IO.File]::WriteAllLines("JS_Teste/src/ui/hud.js", $resultHud, [System.Text.Encoding]::UTF8)
Write-Output "hud.js updated successfully! (total lines: $($resultHud.Count))"

# Now update modals.js
$modLines = [System.IO.File]::ReadAllLines("JS_Teste/src/ui/modals.js", [System.Text.Encoding]::UTF8)
$resultMod = New-Object System.Collections.Generic.List[string]

for ($i = 0; $i -lt $modLines.Length; $i++) {
    $line = $modLines[$i]
    if ($line -match "bannerRibbon = scene\.add\.image\(GAME_WIDTH / 2, \d+, 'ui_ribbon_big_yellow'\)") {
        $resultMod.Add("  const bannerRibbon = scene.add.image(GAME_WIDTH / 2, 48, 'ui_ribbon_big_yellow').setDisplaySize(560, 78);")
    } elseif ($line -match "titleTxt = scene\.add\.text\(GAME_WIDTH / 2, \d+,") {
        $resultMod.Add("  const titleTxt = scene.add.text(GAME_WIDTH / 2, 48, ``⚔ SUBIU PARA O NÍVEL `${runLevel}! ⚔``, {")
    } elseif ($line -match "subTxt = scene\.add\.text\(GAME_WIDTH / 2, \d+,") {
        $resultMod.Add("  const subTxt = scene.add.text(GAME_WIDTH / 2, 94, 'ESCOLHA 1 CARTA DE UPGRADE OU ITEM (CLIQUE OU TECLAS [1] [2] [3])', { ...subtitleTextStyle('#e8dcc4', 11.5, 'bold'), shadow: { offsetX: 1, offsetY: 1, color: '#000000', blur: 0, fill: true } }).setOrigin(0.5);")
    } elseif ($line -match "const cardY = \d+;") {
        $resultMod.Add("  const cardY = 316;")
    } else {
        $resultMod.Add($line)
    }
}

[System.IO.File]::WriteAllLines("JS_Teste/src/ui/modals.js", $resultMod, [System.Text.Encoding]::UTF8)
Write-Output "modals.js updated successfully! (total lines: $($resultMod.Count))"
