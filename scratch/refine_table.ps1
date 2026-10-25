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
$cSeamDark = [System.Drawing.Color]::FromArgb(255, 68, 42, 38)
$cSeamShadow = [System.Drawing.Color]::FromArgb(255, 100, 64, 56)
$cSeamLight = [System.Drawing.Color]::FromArgb(255, 176, 128, 96)

# 1. Fill base wood
for ($y = 0; $y -lt $targetH; $y++) {
    for ($x = 0; $x -lt $targetW; $x++) {
        $dest.SetPixel($x, $y, $cBase)
    }
}

# The wood interior runs from Y = 25 to Y = 415 (Height = 390 px)
# Let's create 6 horizontal planks across the entire height:
$plankCount = 6
$plankH = 65
$startY = 25

$rng = New-Object System.Random 54321

for ($p = 0; $p -lt $plankCount; $p++) {
    $pTop = $startY + ($p * $plankH)
    $pBot = $pTop + $plankH - 1
    
    $freq1 = 0.010 + ($rng.NextDouble() * 0.005)
    $freq2 = 0.020 + ($rng.NextDouble() * 0.005)
    $phase1 = $rng.NextDouble() * 30
    $phase2 = $rng.NextDouble() * 30
    $yCenter1 = $pTop + 16 + ($rng.NextDouble() * 8)
    $yCenter2 = $pTop + 40 + ($rng.NextDouble() * 8)
    
    for ($y = [Math]::Max(0, $pTop); $y -le [Math]::Min($targetH - 1, $pBot); $y++) {
        for ($x = 0; $x -lt $targetW; $x++) {
            $w1 = [Math]::Sin(($x * $freq1) + $phase1) * 6.5
            $w2 = [Math]::Sin(($x * $freq2) + $phase2) * 4.5
            
            $d1 = [Math]::Abs($y - ($yCenter1 + $w1))
            $d2 = [Math]::Abs($y - ($yCenter2 + $w2))
            
            if ($d1 -lt 3.5 -or $d2 -lt 3.5) {
                $dest.SetPixel($x, $y, $cLight)
            } elseif ($d1 -lt 6.0 -or $d2 -lt 6.0) {
                if (($x + $y) % 2 -eq 0) {
                    $dest.SetPixel($x, $y, $cLight)
                } else {
                    $dest.SetPixel($x, $y, $cBase)
                }
            } elseif ($y -gt ($pBot - 4)) {
                $dest.SetPixel($x, $y, $cDark)
            } else {
                $dest.SetPixel($x, $y, $cBase)
            }
        }
    }
    
    # Seam between planks
    if ($p -lt ($plankCount - 1) -and ($pBot + 1) -lt $targetH) {
        for ($x = 0; $x -lt $targetW; $x++) {
            $dest.SetPixel($x, $pBot - 1, $cSeamShadow)
            $dest.SetPixel($x, $pBot,     $cSeamDark)
            $dest.SetPixel($x, $pBot + 1, $cSeamLight)
        }
    }
}

# 2. Left & Right carved borders from WoodTable.png:
# Left border: X=44..72 (width 28)
for ($y = 0; $y -lt $targetH; $y += 64) {
    $drawH = [Math]::Min(64, ($targetH - $y))
    $g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle 0, $y, 28, $drawH), 44, 192, 28, $drawH, [System.Drawing.GraphicsUnit]::Pixel)
    $g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle ($targetW - 28), $y, 28, $drawH), 376, 192, 28, $drawH, [System.Drawing.GraphicsUnit]::Pixel)
}

# 3. Top carved rim:
# In TC: wood rim is Y=49..73 (height 24). Metal bracket in TL is at Y=43..73 (height 30).
for ($x = 40; $x -lt ($targetW - 40); $x += 64) {
    $drawW = [Math]::Min(64, ($targetW - 40 - $x))
    $g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle $x, 6, $drawW, 24), 192, 49, $drawW, 24, [System.Drawing.GraphicsUnit]::Pixel)
}

# 4. Bottom carved rim and skirt:
# In BC: starts at Y=386, down to Y=422 (height 37).
$botY = $targetH - 37
for ($x = 40; $x -lt ($targetW - 40); $x += 64) {
    $drawW = [Math]::Min(64, ($targetW - 40 - $x))
    $g.DrawImage($tableSrc, (New-Object System.Drawing.Rectangle $x, $botY, $drawW, 37), 192, 386, $drawW, 37, [System.Drawing.GraphicsUnit]::Pixel)
}

# 5. Corners: Metal brackets only!
# TL corner bracket: X=44..84, Y=43..80
# We only draw pixels from TL if they are metal bracket (B > R or near corner) or transparent
for ($cy = 0; $cy -lt 40; $cy++) {
    for ($cx = 0; $cx -lt 40; $cx++) {
        $c = $tableSrc.GetPixel(44 + $cx, 43 + $cy)
        # Metal bracket or outer border:
        if ($c.A -gt 0 -and ($cx -lt 28 -or $cy -lt 24 -or $c.B -gt $c.R)) {
            $dest.SetPixel($cx, $cy, $c)
        }
    }
}

# TR corner bracket: X=364..403, Y=43..80
for ($cy = 0; $cy -lt 40; $cy++) {
    for ($cx = 0; $cx -lt 40; $cx++) {
        $c = $tableSrc.GetPixel(364 + $cx, 43 + $cy)
        if ($c.A -gt 0 -and ($cx -ge 12 -or $cy -lt 24 -or $c.B -gt $c.R)) {
            $dest.SetPixel(($targetW - 40 + $cx), $cy, $c)
        }
    }
}

# BL corner bracket and foot: X=44..84, Y=383..422
for ($cy = 0; $cy -lt 39; $cy++) {
    for ($cx = 0; $cx -lt 40; $cx++) {
        $c = $tableSrc.GetPixel(44 + $cx, 383 + $cy)
        if ($c.A -gt 0 -and ($cx -lt 28 -or $cy -ge 15 -or $c.B -gt $c.R)) {
            $dest.SetPixel($cx, ($targetH - 39 + $cy), $c)
        }
    }
}

# BR corner bracket and foot: X=364..403, Y=383..422
for ($cy = 0; $cy -lt 39; $cy++) {
    for ($cx = 0; $cx -lt 40; $cx++) {
        $c = $tableSrc.GetPixel(364 + $cx, 383 + $cy)
        if ($c.A -gt 0 -and ($cx -ge 12 -or $cy -ge 15 -or $c.B -gt $c.R)) {
            $dest.SetPixel(($targetW - 40 + $cx), ($targetH - 39 + $cy), $c)
        }
    }
}

# 6. Smooth inner drop shadows framing the table:
# Top drop shadow:
for ($x = 28; $x -lt ($targetW - 28); $x++) {
    for ($i = 0; $i -lt 8; $i++) {
        $alpha = (8 - $i) / 8.0 * 0.35
        $c = $dest.GetPixel($x, 30 + $i)
        $r = [Math]::Max(0, [int]($c.R * (1 - $alpha)))
        $gCol = [Math]::Max(0, [int]($c.G * (1 - $alpha)))
        $b = [Math]::Max(0, [int]($c.B * (1 - $alpha)))
        $dest.SetPixel($x, 30 + $i, [System.Drawing.Color]::FromArgb(255, $r, $gCol, $b))
    }
}

# Left & Right drop shadows:
for ($y = 28; $y -lt ($targetH - 36); $y++) {
    for ($i = 0; $i -lt 10; $i++) {
        $alpha = (10 - $i) / 10.0 * 0.30
        # Left
        $c = $dest.GetPixel(28 + $i, $y)
        $r = [Math]::Max(0, [int]($c.R * (1 - $alpha)))
        $gCol = [Math]::Max(0, [int]($c.G * (1 - $alpha)))
        $b = [Math]::Max(0, [int]($c.B * (1 - $alpha)))
        $dest.SetPixel(28 + $i, $y, [System.Drawing.Color]::FromArgb(255, $r, $gCol, $b))
        # Right
        $c2 = $dest.GetPixel($targetW - 29 - $i, $y)
        $r2 = [Math]::Max(0, [int]($c2.R * (1 - $alpha)))
        $g2 = [Math]::Max(0, [int]($c2.G * (1 - $alpha)))
        $b2 = [Math]::Max(0, [int]($c2.B * (1 - $alpha)))
        $dest.SetPixel($targetW - 29 - $i, $y, [System.Drawing.Color]::FromArgb(255, $r2, $g2, $b2))
    }
}

# Make transparent outside corners
for ($y = 0; $y -lt 6; $y++) {
    for ($x = 40; $x -lt ($targetW - 40); $x++) {
        $dest.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
    }
}

$g.Dispose()

$out = "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\table_perfect_v4.png"
$dest.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$dest.Dispose()
$tableSrc.Dispose()
Write-Host "Created $out"
