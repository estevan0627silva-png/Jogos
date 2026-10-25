Add-Type -AssemblyName System.Drawing

$tableSrc = [System.Drawing.Bitmap]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)
$slotsSrc = [System.Drawing.Bitmap]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable_Slots.png").Path)

$targetW = 560
$targetH = 460
$dest = New-Object System.Drawing.Bitmap $targetW, $targetH
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::None

# The inner wood surface of WoodTable_Slots is 192x192.
# Let's crop the center 160x160 of WoodTable_Slots (excluding its outer rounded bevel)
$innerCrop = New-Object System.Drawing.Rectangle 16, 16, 160, 160

# We can also create a continuous horizontal plank texture from WoodTable.png without the repeating black notch:
# In WoodTable.png:
# MC is at (192, 192, 64, 64).
# In MC, if we replace any pixel in rows 0..4 where R < 50 with the clean seam color (117, 81, 81) or wood (155, 98, 83):
$cleanMc = New-Object System.Drawing.Bitmap 64, 64
$gMc = [System.Drawing.Graphics]::FromImage($cleanMc)
$gMc.DrawImage($tableSrc, 0, 0, (New-Object System.Drawing.Rectangle 192, 192, 64, 64), [System.Drawing.GraphicsUnit]::Pixel)
$gMc.Dispose()

for ($y = 0; $y -le 4; $y++) {
    for ($x = 0; $x -lt 64; $x++) {
        $c = $cleanMc.GetPixel($x, $y)
        if ($c.R -lt 70) {
            # Replace dark notch with subtle plank seam shadow
            $cleanMc.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 117, 81, 81))
        }
    }
}

# Also at the bottom of cleanMc (rows 60..63), replace any dark notch
for ($y = 60; $y -lt 64; $y++) {
    for ($x = 0; $x -lt 64; $x++) {
        $c = $cleanMc.GetPixel($x, $y)
        if ($c.R -lt 70) {
            $cleanMc.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 117, 81, 81))
        }
    }
}

# Clean ML (middle left) and Clean MR (middle right)
$cleanMl = New-Object System.Drawing.Bitmap 84, 64
$gMl = [System.Drawing.Graphics]::FromImage($cleanMl)
$gMl.DrawImage($tableSrc, 0, 0, (New-Object System.Drawing.Rectangle 44, 192, 84, 64), [System.Drawing.GraphicsUnit]::Pixel)
$gMl.Dispose()
for ($y = 0; $y -le 4; $y++) {
    for ($x = 0; $x -lt 84; $x++) {
        $c = $cleanMl.GetPixel($x, $y)
        if ($x -gt 24 -and $c.R -lt 70 -and $c.A -gt 200) {
            $cleanMl.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 117, 81, 81))
        }
    }
}

$cleanMr = New-Object System.Drawing.Bitmap 84, 64
$gMr = [System.Drawing.Graphics]::FromImage($cleanMr)
$gMr.DrawImage($tableSrc, 0, 0, (New-Object System.Drawing.Rectangle 320, 192, 84, 64), [System.Drawing.GraphicsUnit]::Pixel)
$gMr.Dispose()
for ($y = 0; $y -le 4; $y++) {
    for ($x = 0; $x -lt 84; $x++) {
        $c = $cleanMr.GetPixel($x, $y)
        if ($x -lt 60 -and $c.R -lt 70 -and $c.A -gt 200) {
            $cleanMr.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 117, 81, 81))
        }
    }
}

# Now assemble table of 560x460:
# Left width: 84
# Right width: 84
# Center width: 560 - 168 = 392 px
# Top height: 85
# Bottom height: 103
# Middle height: 460 - 188 = 272 px
# 272 / 64 = 4.25 rows

# Fill middle rows
$midH = $targetH - 85 - 103
$midW = $targetW - 84 - 84

# Draw clean planks in center
for ($y = 85; $y -lt ($targetH - 103); $y += 64) {
    $drawH = [Math]::Min(64, ($targetH - 103 - $y))
    
    # Left edge
    $g.DrawImage($cleanMl, (New-Object System.Drawing.Rectangle 0, $y, 84, $drawH), 0, 0, 84, $drawH, [System.Drawing.GraphicsUnit]::Pixel)
    
    # Center tiles
    for ($x = 84; $x -lt ($targetW - 84); $x += 64) {
        $drawW = [Math]::Min(64, ($targetW - 84 - $x))
        $g.DrawImage($cleanMc, (New-Object System.Drawing.Rectangle $x, $y, $drawW, $drawH), 0, 0, $drawW, $drawH, [System.Drawing.GraphicsUnit]::Pixel)
    }
    
    # Right edge
    $g.DrawImage($cleanMr, (New-Object System.Drawing.Rectangle ($targetW - 84), $y, 84, $drawH), 0, 0, 84, $drawH, [System.Drawing.GraphicsUnit]::Pixel)
}

# Top Edge:
for ($x = 84; $x -lt ($targetW - 84); $x += 64) {
    $drawW = [Math]::Min(64, ($targetW - 84 - $x))
    # TC in src: X=192, Y=49, W=64, H=79.
    # In table, draw at Y=6, H=79
    $g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle $x, 6, $drawW, 79), 192, 49, $drawW, 79, [System.Drawing.GraphicsUnit]::Pixel)
}

# Bottom Edge:
$botY = $targetH - 103
for ($x = 84; $x -lt ($targetW - 84); $x += 64) {
    $drawW = [Math]::Min(64, ($targetW - 84 - $x))
    $g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle $x, $botY, $drawW, 103), 192, 320, $drawW, 103, [System.Drawing.GraphicsUnit]::Pixel)
}

# Corners (TL, TR, BL, BR):
# TL: X=44, Y=43, W=84, H=85
$g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle 0, 0, 84, 85), 44, 43, 84, 85, [System.Drawing.GraphicsUnit]::Pixel)
# TR: X=320, Y=43, W=84, H=85
$g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle ($targetW - 84), 0, 84, 85), 320, 43, 84, 85, [System.Drawing.GraphicsUnit]::Pixel)
# BL: X=44, Y=320, W=84, H=103
$g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle 0, $botY, 84, 103), 44, 320, 84, 103, [System.Drawing.GraphicsUnit]::Pixel)
# BR: X=320, Y=320, W=84, H=103
$g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle ($targetW - 84), $botY, 84, 103), 320, 320, 84, 103, [System.Drawing.GraphicsUnit]::Pixel)

$g.Dispose()

$dest.Save("C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\table_v2.png", [System.Drawing.Imaging.ImageFormat]::Png)

$cleanMc.Dispose()
$cleanMl.Dispose()
$cleanMr.Dispose()
$dest.Dispose()
$tableSrc.Dispose()
$slotsSrc.Dispose()
Write-Host "Created table_v2.png"
