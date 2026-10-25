Add-Type -AssemblyName System.Drawing

function Build-Tight9Slice([System.Drawing.Bitmap]$src, [int]$targetW, [int]$targetH, [int]$srcLeftX, [int]$srcMidX, [int]$srcRightX, [int]$srcCornerW, [int]$srcMidW, [int]$srcTopY, [int]$srcMidY, [int]$srcBotY, [int]$srcCornerH, [int]$srcMidH, [int]$destCornerW, [int]$destCornerH) {
    $out = New-Object System.Drawing.Bitmap($targetW, $targetH)
    $g = [System.Drawing.Graphics]::FromImage($out)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half

    $dcw = $destCornerW
    $dch = $destCornerH
    $dmw = $targetW - ($dcw * 2)
    $dmh = $targetH - ($dch * 2)

    # Center
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle($dcw, $dch, $dmw, $dmh)), (New-Object System.Drawing.Rectangle($srcMidX, $srcMidY, $srcMidW, $srcMidH)), [System.Drawing.GraphicsUnit]::Pixel)

    # Top & Bot edges
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle($dcw, 0, $dmw, $dch)), (New-Object System.Drawing.Rectangle($srcMidX, $srcTopY, $srcMidW, $srcCornerH)), [System.Drawing.GraphicsUnit]::Pixel)
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle($dcw, ($targetH - $dch), $dmw, $dch)), (New-Object System.Drawing.Rectangle($srcMidX, $srcBotY, $srcMidW, $srcCornerH)), [System.Drawing.GraphicsUnit]::Pixel)

    # Left & Right edges
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, $dch, $dcw, $dmh)), (New-Object System.Drawing.Rectangle($srcLeftX, $srcMidY, $srcCornerW, $srcMidH)), [System.Drawing.GraphicsUnit]::Pixel)
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle(($targetW - $dcw), $dch, $dcw, $dmh)), (New-Object System.Drawing.Rectangle($srcRightX, $srcMidY, $srcCornerW, $srcMidH)), [System.Drawing.GraphicsUnit]::Pixel)

    # 4 Corners
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, 0, $dcw, $dch)), (New-Object System.Drawing.Rectangle($srcLeftX, $srcTopY, $srcCornerW, $srcCornerH)), [System.Drawing.GraphicsUnit]::Pixel)
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle(($targetW - $dcw), 0, $dcw, $dch)), (New-Object System.Drawing.Rectangle($srcRightX, $srcTopY, $srcCornerW, $srcCornerH)), [System.Drawing.GraphicsUnit]::Pixel)
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, ($targetH - $dch), $dcw, $dch)), (New-Object System.Drawing.Rectangle($srcLeftX, $srcBotY, $srcCornerW, $srcCornerH)), [System.Drawing.GraphicsUnit]::Pixel)
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle(($targetW - $dcw), ($targetH - $dch), $dcw, $dch)), (New-Object System.Drawing.Rectangle($srcRightX, $srcBotY, $srcCornerW, $srcCornerH)), [System.Drawing.GraphicsUnit]::Pixel)

    $g.Dispose()
    return $out
}

function Bitmap-ToBase64([System.Drawing.Bitmap]$bmp) {
    $ms = New-Object System.IO.MemoryStream
    $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $bytes = $ms.ToArray()
    $ms.Dispose()
    return "data:image/png;base64," + [System.Convert]::ToBase64String($bytes)
}

# Build 260x48 weapon panel
$srcWoodTable = [System.Drawing.Bitmap]::FromFile("JS_Teste\assets\ui\wood_table.png")
$bmpHudWeapon = Build-Tight9Slice $srcWoodTable 260 48 44 192 338 64 64 44 192 358 64 64 14 14
$b64Weapon = Bitmap-ToBase64 $bmpHudWeapon
$srcWoodTable.Dispose()
$bmpHudWeapon.Dispose()

# Update uiAssets.js
$uiPath = "JS_Teste/src/art/uiAssets.js"
$lines = [System.IO.File]::ReadAllLines($uiPath, [System.Text.Encoding]::UTF8)
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match '^\s*"ui_hud_panel_weapon":') {
        $lines[$i] = "  `"ui_hud_panel_weapon`": `"$b64Weapon`","
    }
}
[System.IO.File]::WriteAllLines($uiPath, $lines, [System.Text.Encoding]::UTF8)
Write-Output "ui_hud_panel_weapon updated to 260x48 in uiAssets.js"

# Update hud.js
$hudPath = "JS_Teste/src/ui/hud.js"
$hLines = [System.IO.File]::ReadAllLines($hudPath, [System.Text.Encoding]::UTF8)
for ($i = 0; $i -lt $hLines.Length; $i++) {
    $l = $hLines[$i]
    if ($l -match "gloryLabel = scene\.add\.text") {
        $hLines[$i] = '  const gloryLabel = scene.add.text(42, 22, "GL\u00d3RIA & VIDA", textStyle("#a89260", 9)).setOrigin(0, 0.5);'
    } elseif ($l -match "itemBg = scene\.add\.image\(306, 10, 'ui_hud_panel_weapon'\)") {
        $hLines[$i] = '  const itemBg = scene.add.image(306, 10, "ui_hud_panel_weapon").setOrigin(0, 0).setDisplaySize(260, 48);'
    } elseif ($l -match "bestBg = scene\.add\.image\(\d+, 10, 'ui_hud_panel_record'\)") {
        $hLines[$i] = '  const bestBg = scene.add.image(574, 10, "ui_hud_panel_record").setOrigin(0, 0).setDisplaySize(108, 48);'
    } elseif ($l -match "crown = scene\.add\.image\(\d+, 34, 'hud_crown'\)") {
        $hLines[$i] = '  const crown = scene.add.image(590, 34, "hud_crown");'
    } elseif ($l -match "bestLabel = scene\.add\.text\(\d+, \d+, 'RECORDE'") {
        $hLines[$i] = '  const bestLabel = scene.add.text(606, 22, "RECORDE", textStyle("#a89260", 9)).setOrigin(0, 0.5);'
    } elseif ($l -match "hudBestText = scene\.add\.text\(\d+, \d+,") {
        $hLines[$i] = '  hudBestText = scene.add.text(606, 36, `${getBestScore()}s`, textStyle("#ffca28", 15)).setOrigin(0, 0.5);'
    } elseif ($l -match "badge1 = scene\.add\.image\(\d+, 25, 'scroll_multishot'\)") {
        $hLines[$i] = '  const badge1 = scene.add.image(504, 25, "scroll_multishot").setScale(0.70).setVisible(false);'
    } elseif ($l -match "txt1 = scene\.add\.text\(\d+, 39, '', textStyle\('#b388ff', 8\)\)") {
        $hLines[$i] = '  const txt1 = scene.add.text(504, 39, "", textStyle("#b388ff", 8)).setOrigin(0.5, 0.5).setVisible(false);'
    } elseif ($l -match "badge2 = scene\.add\.image\(\d+, 25, 'scroll_growth'\)") {
        $hLines[$i] = '  const badge2 = scene.add.image(538, 25, "scroll_growth").setScale(0.70).setVisible(false);'
    } elseif ($l -match "txt2 = scene\.add\.text\(\d+, 39, '', textStyle\('#b388ff', 8\)\)") {
        $hLines[$i] = '  const txt2 = scene.add.text(538, 39, "", textStyle("#b388ff", 8)).setOrigin(0.5, 0.5).setVisible(false);'
    } elseif ($l -match "hudScrollBadges\[0\]\.setX\(\d+\)") {
        $hLines[$i] = '    hudScrollBadges[0].setX(518);'
    } elseif ($l -match "hudScrollTexts\[0\]\.setX\(\d+\)") {
        $hLines[$i] = '    hudScrollTexts[0].setX(518);'
    }
}
[System.IO.File]::WriteAllLines($hudPath, $hLines, [System.Text.Encoding]::UTF8)
Write-Output "hud.js updated with 260px weapon box & clean unicode labels!"

# Update modals.js title text to unicode escape
$modPath = "JS_Teste/src/ui/modals.js"
$mLines = [System.IO.File]::ReadAllLines($modPath, [System.Text.Encoding]::UTF8)
for ($i = 0; $i -lt $mLines.Length; $i++) {
    if ($mLines[$i] -match "titleTxt = scene\.add\.text\(GAME_WIDTH / 2, 44,") {
        $mLines[$i] = '  const titleTxt = scene.add.text(GAME_WIDTH / 2, 44, "\u2694 SUBIU PARA O N\u00cdVEL " + runLevel + "! \u2694", {'
    }
}
[System.IO.File]::WriteAllLines($modPath, $mLines, [System.Text.Encoding]::UTF8)
Write-Output "modals.js titleTxt updated with pure unicode escape!"
