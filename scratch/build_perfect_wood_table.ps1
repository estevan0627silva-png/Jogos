Add-Type -AssemblyName System.Drawing

$tableSrc = [System.Drawing.Bitmap]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)

$targetW = 560
$targetH = 460
$dest = New-Object System.Drawing.Bitmap $targetW, $targetH
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::None

# 1. Authentic Tiny Swords Wood Palette:
# Base plank: (155, 98, 83)
# Dark wood shade: (138, 84, 72)
# Highlight wood grain: (168, 120, 92)
# Soft highlight grain: (182, 134, 102)
# Plank groove shadow: (92, 58, 52)
# Plank groove dark line: (68, 42, 38)
# Plank groove highlight: (174, 126, 96)

# Table frame parameters:
$leftW = 84
$rightW = 84
$topH = 85
$botH = 103

# Inner wood rectangle:
# X from leftW to (targetW - rightW)
# Y from topH to (targetH - botH)
# Inner W = 560 - 168 = 392 px
# Inner H = 460 - 188 = 272 px

# Let's create the inner tabletop with 4 full, beautiful horizontal planks:
# Plank height = 272 / 4 = 68 pixels per plank!
# Plank 0: Y = 85 to 152 (height 68)
# Plank 1: Y = 153 to 220 (height 68)
# Plank 2: Y = 221 to 288 (height 68)
# Plank 3: Y = 289 to 356 (height 68)

# To ensure authentic Tiny Swords texture, we sample the authentic wood grain from WoodTable.png:
# In WoodTable.png, MC is at (192, 192, 64, 64).
# Rows 10..54 of MC contain pure authentic wood grain without any seams.
# Let's sample continuous grain and generate procedural variation so each plank is distinct and natural:

$rng = New-Object System.Random 42

for ($y = 0; $y -lt $targetH; $y++) {
    for ($x = 0; $x -lt $targetW; $x++) {
        # Base background fill with wood base color
        $dest.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 155, 98, 83))
    }
}

# Draw natural horizontal wood planks in the interior:
# For each of the 4 planks:
$plankH = 68
for ($p = 0; $p -lt 4; $p++) {
    $pStartY = 85 + ($p * $plankH)
    $pEndY = $pStartY + $plankH - 1
    
    # Generate wood grain bands for this plank
    # Each plank has 2-3 gentle horizontal grain bands of highlight (168, 120, 92) and soft shade (138, 84, 72)
    $waveOffset1 = $rng.NextDouble() * 10
    $waveOffset2 = $rng.NextDouble() * 10
    $bandCenter1 = $pStartY + 18 + ($rng.NextDouble() * 8)
    $bandCenter2 = $pStartY + 42 + ($rng.NextDouble() * 8)
    
    for ($py = $pStartY; $py -le $pEndY; $py++) {
        for ($px = 20; $px -lt ($targetW - 20); $px++) {
            # Wood grain formula: gentle low-frequency horizontal flow with micro-grain
            $wave1 = [Math]::Sin(($px * 0.015) + $waveOffset1) * 6
            $wave2 = [Math]::Sin(($px * 0.025) + $waveOffset2) * 5
            
            $dist1 = [Math]::Abs($py - ($bandCenter1 + $wave1))
            $dist2 = [Math]::Abs($py - ($bandCenter2 + $wave2))
            
            if ($dist1 -lt 4.0 -or $dist2 -lt 4.0) {
                # Highlight grain
                $dest.SetPixel($px, $py, [System.Drawing.Color]::FromArgb(255, 168, 120, 92))
            } elseif ($dist1 -lt 7.0 -or $dist2 -lt 7.0) {
                # Soft highlight
                $dest.SetPixel($px, $py, [System.Drawing.Color]::FromArgb(255, 160, 108, 88))
            } elseif ($py -gt ($pEndY - 6)) {
                # Bottom shadow of the plank before the seam
                $dest.SetPixel($px, $py, [System.Drawing.Color]::FromArgb(255, 138, 86, 74))
            } else {
                # Base wood
                $dest.SetPixel($px, $py, [System.Drawing.Color]::FromArgb(255, 155, 98, 83))
            }
        }
    }
    
    # Draw plank seam groove at the bottom of the plank (except bottom-most plank which meets the frame)
    if ($p -lt 3) {
        $seamY = $pEndY
        for ($px = 44; $px -lt ($targetW - 44); $px++) {
            # Seam groove line (2 pixels: dark groove + soft shadow)
            $dest.SetPixel($px, $seamY - 1, [System.Drawing.Color]::FromArgb(255, 92, 58, 52))
            $dest.SetPixel($px, $seamY,     [System.Drawing.Color]::FromArgb(255, 68, 42, 38))
            $dest.SetPixel($px, $seamY + 1, [System.Drawing.Color]::FromArgb(255, 174, 126, 96)) # highlight edge
        }
    }
}

# Also draw subtle plank seam at top meeting point (Y=84)
for ($px = 44; $px -lt ($targetW - 44); $px++) {
    $dest.SetPixel($px, 84, [System.Drawing.Color]::FromArgb(255, 68, 42, 38))
    $dest.SetPixel($px, 85, [System.Drawing.Color]::FromArgb(255, 174, 126, 96))
}

# Now overlay the authentic Tiny Swords frame:
# Left border (ML) without inner wood overwrite:
# In ML (X=44..127, Y=192..255): X=44..72 is the border and drop shadow.
# Let's tile the left carved border (width 28):
for ($y = 85; $y -lt ($targetH - 103); $y += 64) {
    $drawH = [Math]::Min(64, ($targetH - 103 - $y))
    # Draw left border slice (X=44..74, width 30)
    $g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle 0, $y, 30, $drawH), 44, 192, 30, $drawH, [System.Drawing.GraphicsUnit]::Pixel)
    # Draw right border slice (X=374..403, width 30)
    $g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle ($targetW - 30), $y, 30, $drawH), 374, 192, 30, $drawH, [System.Drawing.GraphicsUnit]::Pixel)
}

# Left inner drop shadow (soft blending from border into wood):
for ($y = 85; $y -lt ($targetH - 103); $y++) {
    for ($i = 0; $i -lt 14; $i++) {
        $alpha = (14 - $i) / 16.0 * 0.4
        $c = $dest.GetPixel(30 + $i, $y)
        $r = [Math]::Max(0, [int]($c.R * (1 - $alpha)))
        $gCol = [Math]::Max(0, [int]($c.G * (1 - $alpha)))
        $b = [Math]::Max(0, [int]($c.B * (1 - $alpha)))
        $dest.SetPixel(30 + $i, $y, [System.Drawing.Color]::FromArgb(255, $r, $gCol, $b))
    }
    # Right inner drop shadow
    for ($i = 0; $i -lt 14; $i++) {
        $alpha = (14 - $i) / 16.0 * 0.4
        $c = $dest.GetPixel($targetW - 31 - $i, $y)
        $r = [Math]::Max(0, [int]($c.R * (1 - $alpha)))
        $gCol = [Math]::Max(0, [int]($c.G * (1 - $alpha)))
        $b = [Math]::Max(0, [int]($c.B * (1 - $alpha)))
        $dest.SetPixel($targetW - 31 - $i, $y, [System.Drawing.Color]::FromArgb(255, $r, $gCol, $b))
    }
}

# Top Edge:
# Tile TC border across width
# Note: TC has top border in Y=49..72 (height 24).
for ($x = 84; $x -lt ($targetW - 84); $x += 64) {
    $drawW = [Math]::Min(64, ($targetW - 84 - $x))
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

$out = "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\table_perfect.png"
$dest.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$dest.Dispose()
$tableSrc.Dispose()
Write-Host "Created $out"
