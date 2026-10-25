Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)

# 3 columns:
# Col 0 (Left): X=44, W=84
# Col 1 (Center): X=192, W=64
# Col 2 (Right): X=320, W=84

# 3 rows:
# Row 0 (Top): Y=43, H=85
# Row 1 (Mid): Y=192, H=64
# Row 2 (Bot): Y=320, H=103

$colCenterCount = 6 # 6 * 64 = 384 px. Total W = 84 + 384 + 84 = 552 px
$rowMidCount = 4    # 4 * 64 = 256 px. Total H = 85 + 256 + 103 = 444 px

$targetW = 84 + ($colCenterCount * 64) + 84
$targetH = 85 + ($rowMidCount * 64) + 103

Write-Host "Target table size: $targetW x $targetH"

$dest = New-Object System.Drawing.Bitmap $targetW, $targetH
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::None

# 1. Draw Corners
# Top-Left:
$g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, 0, 84, 85), (New-Object System.Drawing.Rectangle 44, 43, 84, 85), [System.Drawing.GraphicsUnit]::Pixel)
# Top-Right:
$rightX = 84 + ($colCenterCount * 64)
$g.DrawImage($src, (New-Object System.Drawing.Rectangle $rightX, 0, 84, 85), (New-Object System.Drawing.Rectangle 320, 43, 84, 85), [System.Drawing.GraphicsUnit]::Pixel)
# Bottom-Left:
$botY = 85 + ($rowMidCount * 64)
$g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, $botY, 84, 103), (New-Object System.Drawing.Rectangle 44, 320, 84, 103), [System.Drawing.GraphicsUnit]::Pixel)
# Bottom-Right:
$g.DrawImage($src, (New-Object System.Drawing.Rectangle $rightX, $botY, 84, 103), (New-Object System.Drawing.Rectangle 320, 320, 84, 103), [System.Drawing.GraphicsUnit]::Pixel)

# 2. Draw Top Edge (Col 1, Row 0) tiled across width
# Note: TC wood starts at Y=49 in src, while bracket in TL starts at Y=43 (diff=6).
# So in dest, TC is drawn at Y=6 to match the top wooden rim, with height 79 (49..127).
for ($c = 0; $c -lt $colCenterCount; $c++) {
    $x = 84 + ($c * 64)
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle $x, 6, 64, 79), (New-Object System.Drawing.Rectangle 192, 49, 64, 79), [System.Drawing.GraphicsUnit]::Pixel)
}

# 3. Draw Bottom Edge (Col 1, Row 2) tiled across width
for ($c = 0; $c -lt $colCenterCount; $c++) {
    $x = 84 + ($c * 64)
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle $x, $botY, 64, 103), (New-Object System.Drawing.Rectangle 192, 320, 64, 103), [System.Drawing.GraphicsUnit]::Pixel)
}

# 4. Draw Middle Rows (Planks)
for ($r = 0; $r -lt $rowMidCount; $r++) {
    $y = 85 + ($r * 64)
    # Left edge (Col 0, Row 1)
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, $y, 84, 64), (New-Object System.Drawing.Rectangle 44, 192, 84, 64), [System.Drawing.GraphicsUnit]::Pixel)
    
    # Center wood (Col 1, Row 1) tiled across columns
    for ($c = 0; $c -lt $colCenterCount; $c++) {
        $x = 84 + ($c * 64)
        $g.DrawImage($src, (New-Object System.Drawing.Rectangle $x, $y, 64, 64), (New-Object System.Drawing.Rectangle 192, 192, 64, 64), [System.Drawing.GraphicsUnit]::Pixel)
    }

    # Right edge (Col 2, Row 1)
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle $rightX, $y, 84, 64), (New-Object System.Drawing.Rectangle 320, 192, 84, 64), [System.Drawing.GraphicsUnit]::Pixel)
}

$g.Dispose()

$testOut = "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\test_table_proper_9slice.png"
$dest.Save($testOut, [System.Drawing.Imaging.ImageFormat]::Png)
$dest.Dispose()
$src.Dispose()
Write-Host "Saved $testOut"
