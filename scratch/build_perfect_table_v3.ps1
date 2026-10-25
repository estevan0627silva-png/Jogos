Add-Type -AssemblyName System.Drawing

$tableSrc = [System.Drawing.Bitmap]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)

$targetW = 560
$targetH = 460
$dest = New-Object System.Drawing.Bitmap $targetW, $targetH
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::None

# Palette:
$cBase = [System.Drawing.Color]::FromArgb(255, 155, 98, 83)
$cDark = [System.Drawing.Color]::FromArgb(255, 138, 84, 72)
$cLight = [System.Drawing.Color]::FromArgb(255, 166, 116, 90)
$cBright = [System.Drawing.Color]::FromArgb(255, 178, 130, 98)
$cSeamDark = [System.Drawing.Color]::FromArgb(255, 68, 42, 38)
$cSeamShadow = [System.Drawing.Color]::FromArgb(255, 100, 64, 56)
$cSeamLight = [System.Drawing.Color]::FromArgb(255, 176, 128, 96)

# 1. Fill entire inside area with wood base
for ($y = 0; $y -lt $targetH; $y++) {
    for ($x = 0; $x -lt $targetW; $x++) {
        $dest.SetPixel($x, $y, $cBase)
    }
}

# The table interior runs from Y = 60 to Y = 370 (Height = 310 px)
# Let's create 5 horizontal planks, each ~62 px tall:
$plankCount = 5
$plankH = 62
$startY = 60

$rng = New-Object System.Random 12345

for ($p = 0; $p -lt $plankCount; $p++) {
    $pTop = $startY + ($p * $plankH)
    $pBot = $pTop + $plankH - 1
    
    # Grain curves for this plank
    $freq1 = 0.012 + ($rng.NextDouble() * 0.006)
    $freq2 = 0.022 + ($rng.NextDouble() * 0.008)
    $phase1 = $rng.NextDouble() * 20
    $phase2 = $rng.NextDouble() * 20
    $yCenter1 = $pTop + 16 + ($rng.NextDouble() * 6)
    $yCenter2 = $pTop + 38 + ($rng.NextDouble() * 8)
    
    for ($y = $pTop; $y -le $pBot; $y++) {
        for ($x = 30; $x -lt ($targetW - 30); $x++) {
            $w1 = [Math]::Sin(($x * $freq1) + $phase1) * 7.0
            $w2 = [Math]::Sin(($x * $freq2) + $phase2) * 5.0
            
            $d1 = [Math]::Abs($y - ($yCenter1 + $w1))
            $d2 = [Math]::Abs($y - ($yCenter2 + $w2))
            
            if ($d1 -lt 3.5 -or $d2 -lt 3.5) {
                $dest.SetPixel($x, $y, $cLight)
            } elseif ($d1 -lt 6.0 -or $d2 -lt 6.0) {
                # Pixel-art dither between light and base
                if (($x + $y) % 2 -eq 0) {
                    $dest.SetPixel($x, $y, $cLight)
                } else {
                    $dest.SetPixel($x, $y, $cBase)
                }
            } elseif ($y -gt ($pBot - 5)) {
                # Bottom of plank shadow
                $dest.SetPixel($x, $y, $cDark)
            } else {
                $dest.SetPixel($x, $y, $cBase)
            }
        }
    }
    
    # Seam between planks
    if ($p -lt ($plankCount - 1)) {
        for ($x = 30; $x -lt ($targetW - 30); $x++) {
            $dest.SetPixel($x, $pBot - 1, $cSeamShadow)
            $dest.SetPixel($x, $pBot,     $cSeamDark)
            $dest.SetPixel($x, $pBot + 1, $cSeamLight)
        }
    }
}

# 2. Authentic Carved Frames:
# In WoodTable.png:
# Top wood rim in TC is from Y=49 to Y=74. (25 px high)
# Top rim in TL is from Y=43 to Y=74 (metal bracket extends up to 43).
# Top rim in TR is from Y=43 to Y=74.

# Tile Top carved rim (Y=49..74, H=26) across width:
for ($x = 74; $x -lt ($targetW - 74); $x += 64) {
    $drawW = [Math]::Min(64, ($targetW - 74 - $x))
    $g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle $x, 6, $drawW, 26), 192, 49, $drawW, 26, [System.Drawing.GraphicsUnit]::Pixel)
}

# Tile Left carved border (X=44..74, W=30) down height (from Y=65 to Y=370):
for ($y = 65; $y -lt ($targetH - 95); $y += 64) {
    $drawH = [Math]::Min(64, ($targetH - 95 - $y))
    $g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle 0, $y, 30, $drawH), 44, 192, 30, $drawH, [System.Drawing.GraphicsUnit]::Pixel)
}

# Tile Right carved border (X=374..403, W=30) down height (from Y=65 to Y=370):
for ($y = 65; $y -lt ($targetH - 95); $y += 64) {
    $drawH = [Math]::Min(64, ($targetH - 95 - $y))
    $g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle ($targetW - 30), $y, 30, $drawH), 374, 192, 30, $drawH, [System.Drawing.GraphicsUnit]::Pixel)
}

# Tile Bottom carved rim and skirt (BC: Y=356..422, H=67) across width:
$botY = $targetH - 95
for ($x = 74; $x -lt ($targetW - 74); $x += 64) {
    $drawW = [Math]::Min(64, ($targetW - 74 - $x))
    $g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle $x, $botY, $drawW, 67), 192, 356, $drawW, 67, [System.Drawing.GraphicsUnit]::Pixel)
}

# Corners:
# TL: metal bracket and corner wood (X=44..74, Y=43..74, W=30, H=32)
$g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle 0, 0, 74, 65), 44, 43, 74, 65, [System.Drawing.GraphicsUnit]::Pixel)

# TR: metal bracket and corner wood (X=374..403, Y=43..74)
$g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle ($targetW - 74), 0, 74, 65), 330, 43, 74, 65, [System.Drawing.GraphicsUnit]::Pixel)

# BL: bottom-left foot, metal bracket, corner wood (BL: X=44..118, Y=356..422)
$g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle 0, $botY, 74, 67), 44, 356, 74, 67, [System.Drawing.GraphicsUnit]::Pixel)

# BR: bottom-right foot, metal bracket, corner wood (BR: X=330..403, Y=356..422)
$g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle ($targetW - 74), $botY, 74, 67), 330, 356, 74, 67, [System.Drawing.GraphicsUnit]::Pixel)

# Inner drop shadow under top rim (soft shading at Y=32..42):
for ($x = 30; $x -lt ($targetW - 30); $x++) {
    for ($i = 0; $i -lt 10; $i++) {
        $alpha = (10 - $i) / 10.0 * 0.35
        $c = $dest.GetPixel($x, 32 + $i)
        $r = [Math]::Max(0, [int]($c.R * (1 - $alpha)))
        $gCol = [Math]::Max(0, [int]($c.G * (1 - $alpha)))
        $b = [Math]::Max(0, [int]($c.B * (1 - $alpha)))
        $dest.SetPixel($x, 32 + $i, [System.Drawing.Color]::FromArgb(255, $r, $gCol, $b))
    }
}

# Left & Right inner drop shadows:
for ($y = 35; $y -lt ($targetH - 45); $y++) {
    for ($i = 0; $i -lt 12; $i++) {
        $alpha = (12 - $i) / 12.0 * 0.35
        # Left
        $c = $dest.GetPixel(30 + $i, $y)
        $r = [Math]::Max(0, [int]($c.R * (1 - $alpha)))
        $gCol = [Math]::Max(0, [int]($c.G * (1 - $alpha)))
        $b = [Math]::Max(0, [int]($c.B * (1 - $alpha)))
        $dest.SetPixel(30 + $i, $y, [System.Drawing.Color]::FromArgb(255, $r, $gCol, $b))
        # Right
        $c2 = $dest.GetPixel($targetW - 31 - $i, $y)
        $r2 = [Math]::Max(0, [int]($c2.R * (1 - $alpha)))
        $g2 = [Math]::Max(0, [int]($c2.G * (1 - $alpha)))
        $b2 = [Math]::Max(0, [int]($c2.B * (1 - $alpha)))
        $dest.SetPixel($targetW - 31 - $i, $y, [System.Drawing.Color]::FromArgb(255, $r2, $g2, $b2))
    }
}

$g.Dispose()

$out = "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\table_perfect_v3.png"
$dest.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$dest.Dispose()
$tableSrc.Dispose()
Write-Host "Created $out"
