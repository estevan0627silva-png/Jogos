Add-Type -AssemblyName System.Drawing

function Build-SeamlessWoodTable($targetW, $targetH, $outputPath) {
    $src = [System.Drawing.Image]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)
    $dest = New-Object System.Drawing.Bitmap $targetW, $targetH
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::None

    # Grid patch sources in the 448x448 sheet:
    # Corner size: 64x64 (or with overhang: 70x70)
    # Left: 44..128 (84px), Center: 192..256 (64px), Right: 320..404 (84px)
    # Top: 43..127 (84px), Center: 192..256 (64px), Bottom: 320..423 (103px)
    
    # We can crop the 9 standard regions from src:
    # TL: Rect(44, 43, 84, 84)
    # TC: Rect(192, 49, 64, 78)
    # TR: Rect(320, 43, 84, 84)
    # ML: Rect(48, 192, 80, 64)
    # MC: Rect(192, 192, 64, 64)
    # MR: Rect(320, 192, 80, 64)
    # BL: Rect(44, 320, 84, 103)
    # BC: Rect(192, 320, 64, 103)
    # BR: Rect(320, 320, 84, 103)
    
    $cw = 64 # corner render width
    $ch = 64 # corner render height
    $bw = 64 # bottom render height (for skirt)
    
    # Fill background with center texture first
    $mcBrush = New-Object System.Drawing.TextureBrush ($src.Clone((New-Object System.Drawing.Rectangle 192, 192, 64, 64), $src.PixelFormat))
    $g.FillRectangle($mcBrush, 0, 0, $targetW, $targetH)
    $mcBrush.Dispose()

    # Draw Top edge (tiled or stretched)
    $topSrc = New-Object System.Drawing.Rectangle 192, 43, 64, 84
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle $cw, 0, ($targetW - 2*$cw), $ch), $topSrc, [System.Drawing.GraphicsUnit]::Pixel)

    # Draw Bottom edge
    $botSrc = New-Object System.Drawing.Rectangle 192, 320, 64, 103
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle $cw, ($targetH - $bw), ($targetW - 2*$cw), $bw), $botSrc, [System.Drawing.GraphicsUnit]::Pixel)

    # Draw Left edge
    $leftSrc = New-Object System.Drawing.Rectangle 44, 192, 84, 64
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, $ch, $cw, ($targetH - $ch - $bw)), $leftSrc, [System.Drawing.GraphicsUnit]::Pixel)

    # Draw Right edge
    $rightSrc = New-Object System.Drawing.Rectangle 320, 192, 84, 64
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle ($targetW - $cw), $ch, $cw, ($targetH - $ch - $bw)), $rightSrc, [System.Drawing.GraphicsUnit]::Pixel)

    # Draw 4 Corners
    $tlSrc = New-Object System.Drawing.Rectangle 44, 43, 84, 84
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, 0, $cw, $ch), $tlSrc, [System.Drawing.GraphicsUnit]::Pixel)

    $trSrc = New-Object System.Drawing.Rectangle 320, 43, 84, 84
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle ($targetW - $cw), 0, $cw, $ch), $trSrc, [System.Drawing.GraphicsUnit]::Pixel)

    $blSrc = New-Object System.Drawing.Rectangle 44, 320, 84, 103
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, ($targetH - $bw), $cw, $bw), $blSrc, [System.Drawing.GraphicsUnit]::Pixel)

    $brSrc = New-Object System.Drawing.Rectangle 320, 320, 84, 103
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle ($targetW - $cw), ($targetH - $bw), $cw, $bw), $brSrc, [System.Drawing.GraphicsUnit]::Pixel)

    $g.Dispose()
    $dest.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Dispose()
    $src.Dispose()
    Write-Host "Created seamless wood table at $outputPath"
}

Build-SeamlessWoodTable 540 440 "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\test_seamless_wood.png"
