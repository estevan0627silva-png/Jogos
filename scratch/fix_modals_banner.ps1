$path = "JS_Teste/src/ui/modals.js"
$lines = [System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)
$result = New-Object System.Collections.Generic.List[string]

# Copy up to line 252 (index 251)
for ($i = 0; $i -lt 252; $i++) {
    $result.Add($lines[$i])
}

# Add clean banner block
$result.Add('  const overlay = scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x06040a, 0.80);')
$result.Add('  const bannerRibbon = scene.add.image(GAME_WIDTH / 2, 44, "ui_ribbon_big_yellow").setDisplaySize(560, 64);')
$result.Add('')
$result.Add('  const titleTxt = scene.add.text(GAME_WIDTH / 2, 44, `⚔ SUBIU PARA O NÍVEL ${runLevel}! ⚔`, {')
$result.Add('    ...textStyle("#2c1b10", 20),')
$result.Add('    fontFamily: SERIF_TITLE_FONT, stroke: "transparent", strokeThickness: 0, shadow: null')
$result.Add('  }).setOrigin(0.5);')
$result.Add('  const subTxt = scene.add.text(GAME_WIDTH / 2, 86, "ESCOLHA 1 CARTA DE UPGRADE OU ITEM (CLIQUE OU TECLAS [1] [2] [3])", {')
$result.Add('    ...subtitleTextStyle("#e8dcc4", 11.5, "bold"),')
$result.Add('    shadow: { offsetX: 1, offsetY: 1, color: "#000000", blur: 0, fill: true }')
$result.Add('  }).setOrigin(0.5);')
$result.Add('  fitTextToBox(subTxt, 600, 20, 9);')
$result.Add('')
$result.Add('  draftModal.add([overlay, bannerRibbon, titleTxt, subTxt]);')

# Find where 'let chosen = false;' is in $lines
$chosenIdx = -1
for ($i = 252; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match 'let chosen = false;') {
        $chosenIdx = $i
        break
    }
}

for ($i = $chosenIdx; $i -lt $lines.Length; $i++) {
    $result.Add($lines[$i])
}

[System.IO.File]::WriteAllLines($path, $result, [System.Text.Encoding]::UTF8)
Write-Output "modals.js banner block cleaned!"
