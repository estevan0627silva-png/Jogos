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

function Build-Tight3Slice([System.Drawing.Bitmap]$src, [int]$targetW, [int]$targetH, [int]$srcLeftX, [int]$srcLeftW, [int]$srcMidX, [int]$srcMidW, [int]$srcRightX, [int]$srcRightW, [int]$srcY, [int]$srcH, [int]$destCapW) {
    $out = New-Object System.Drawing.Bitmap($targetW, $targetH)
    $g = [System.Drawing.Graphics]::FromImage($out)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half

    $dcw = $destCapW
    $dmw = $targetW - ($dcw * 2)

    # Left
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, 0, $dcw, $targetH)), (New-Object System.Drawing.Rectangle($srcLeftX, $srcY, $srcLeftW, $srcH)), [System.Drawing.GraphicsUnit]::Pixel)
    # Mid
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle($dcw, 0, $dmw, $targetH)), (New-Object System.Drawing.Rectangle($srcMidX, $srcY, $srcMidW, $srcH)), [System.Drawing.GraphicsUnit]::Pixel)
    # Right
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle(($targetW - $dcw), 0, $dcw, $targetH)), (New-Object System.Drawing.Rectangle($srcRightX, $srcY, $srcRightW, $srcH)), [System.Drawing.GraphicsUnit]::Pixel)

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

# 1. Load Sources
$srcPaperReg = [System.Drawing.Bitmap]::FromFile("JS_Teste\assets\ui\paper_regular.png")
$srcPaperSpec = [System.Drawing.Bitmap]::FromFile("JS_Teste\assets\ui\paper_special.png")
$srcRibbonYellow = [System.Drawing.Bitmap]::FromFile("JS_Teste\assets\ui\ribbon_big_yellow.png")
$srcBarBig = [System.Drawing.Bitmap]::FromFile("JS_Teste\assets\ui\bar_big_base.png")
$srcBarSmall = [System.Drawing.Bitmap]::FromFile("JS_Teste\assets\ui\bar_small_base.png")
$srcWoodTable = [System.Drawing.Bitmap]::FromFile("JS_Teste\assets\ui\wood_table.png")

# 2. Build Tight Assets
# paper_reg: LeftX: 12, MidX: 128, RightX: 256, W: 52, MidW: 64; TopY: 20, MidY: 128, BotY: 256, H: 44, MidH: 64
$bmpPaperReg = Build-Tight9Slice $srcPaperReg 240 330 12 128 256 52 64 20 128 256 44 64 36 36

# paper_spec: LeftX: 10, MidX: 128, RightX: 256, W: 54, MidW: 64; TopY: 20, MidY: 128, BotY: 256, H: 44, MidH: 64
$bmpPaperSpec = Build-Tight9Slice $srcPaperSpec 240 330 10 128 256 54 64 20 128 256 44 64 36 36

# ribbon_yellow: Left: 30 (W 98), Mid: 192 (W 64), Right: 320 (W 96), Y: 22, H: 88
$bmpRibbonYellow = Build-Tight3Slice $srcRibbonYellow 560 64 30 98 192 64 320 96 22 88 70

# wood panels: LeftX: 44, MidX: 192, RightX: 338, W: 64, MidW: 64; TopY: 44, MidY: 192, BotY: 358, H: 64, MidH: 64
$bmpHudTime = Build-Tight9Slice $srcWoodTable 188 48 44 192 338 64 64 44 192 358 64 64 14 14
$bmpHudSilver = Build-Tight9Slice $srcWoodTable 88 48 44 192 338 64 64 44 192 358 64 64 14 14
$bmpHudWeapon = Build-Tight9Slice $srcWoodTable 226 48 44 192 338 64 64 44 192 358 64 64 14 14
$bmpHudRecord = Build-Tight9Slice $srcWoodTable 108 48 44 192 338 64 64 44 192 358 64 64 14 14

# XP Bar: Left: 40 (W 24), Mid: 128 (W 64), Right: 256 (W 24), Y: 9, H: 50
$bmpBarXp = Build-Tight3Slice $srcBarBig 932 16 40 24 128 64 256 24 9 50 16

# Timer Bar: Left: 49 (W 14), Mid: 128 (W 64), Right: 256 (W 14), Y: 22, H: 18
$bmpBarTimer = Build-Tight3Slice $srcBarSmall 54 12 49 14 128 64 256 14 22 18 10

# Save visual proof
$brain = "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227"
$bmpPaperReg.Save("$brain\assembled_paper_reg_tight.png")
$bmpPaperSpec.Save("$brain\assembled_paper_spec_tight.png")
$bmpRibbonYellow.Save("$brain\assembled_ribbon_yellow_tight.png")
$bmpHudTime.Save("$brain\assembled_hud_time_tight.png")
$bmpHudWeapon.Save("$brain\assembled_hud_weapon_tight.png")

# Build dictionary
$dict = @{
    "ui_paper_regular" = Bitmap-ToBase64 $bmpPaperReg
    "ui_paper_special" = Bitmap-ToBase64 $bmpPaperSpec
    "ui_ribbon_big_yellow" = Bitmap-ToBase64 $bmpRibbonYellow
    "ui_bar_xp_base" = Bitmap-ToBase64 $bmpBarXp
    "ui_bar_timer_base" = Bitmap-ToBase64 $bmpBarTimer
    "ui_hud_panel_time" = Bitmap-ToBase64 $bmpHudTime
    "ui_hud_panel_silver" = Bitmap-ToBase64 $bmpHudSilver
    "ui_hud_panel_weapon" = Bitmap-ToBase64 $bmpHudWeapon
    "ui_hud_panel_record" = Bitmap-ToBase64 $bmpHudRecord
}

# Cleanup Bitmaps
$srcPaperReg.Dispose(); $srcPaperSpec.Dispose(); $srcRibbonYellow.Dispose()
$srcBarBig.Dispose(); $srcBarSmall.Dispose(); $srcWoodTable.Dispose()
$bmpPaperReg.Dispose(); $bmpPaperSpec.Dispose(); $bmpRibbonYellow.Dispose()
$bmpBarXp.Dispose(); $bmpBarTimer.Dispose(); $bmpHudTime.Dispose(); $bmpHudSilver.Dispose()
$bmpHudWeapon.Dispose(); $bmpHudRecord.Dispose()

# Now update uiAssets.js
$uiPath = "JS_Teste/src/art/uiAssets.js"
$lines = [System.IO.File]::ReadAllLines($uiPath, [System.Text.Encoding]::UTF8)
$updatedLines = New-Object System.Collections.Generic.List[string]

foreach ($line in $lines) {
    $matched = $false
    foreach ($k in $dict.Keys) {
        if ($line -match "^\s*`"$k`":") {
            $updatedLines.Add("  `"$k`": `"$($dict[$k])`",")
            $matched = $true
            break
        }
    }
    if (-not $matched) {
        $updatedLines.Add($line)
    }
}

[System.IO.File]::WriteAllLines($uiPath, $updatedLines, [System.Text.Encoding]::UTF8)
Write-Output "PIXEL-PERFECT ASSETS GENERATED & INTEGRATED SUCCESSFULLY!"
