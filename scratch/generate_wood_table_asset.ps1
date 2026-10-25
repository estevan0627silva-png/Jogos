Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Image]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)

$targetW = 560
$targetH = 460
$dest = New-Object System.Drawing.Bitmap $targetW, $targetH
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::None

$cw = 80 # corner render width
$ch = 80 # corner render height
$bw = 88 # bottom render height (for skirt)

# Fill center background with wood texture
$mcSrc = New-Object System.Drawing.Rectangle 192, 192, 64, 64
$mcBmp = New-Object System.Drawing.Bitmap 64, 64
$mcG = [System.Drawing.Graphics]::FromImage($mcBmp)
$mcG.DrawImage($src, 0, 0, $mcSrc, [System.Drawing.GraphicsUnit]::Pixel)
$mcG.Dispose()
$mcBrush = New-Object System.Drawing.TextureBrush $mcBmp
$g.FillRectangle($mcBrush, 0, 0, $targetW, $targetH)
$mcBrush.Dispose()
$mcBmp.Dispose()

# Top edge
$topSrc = New-Object System.Drawing.Rectangle 192, 43, 64, 84
$g.DrawImage($src, (New-Object System.Drawing.Rectangle $cw, 0, ($targetW - 2*$cw), $ch), $topSrc, [System.Drawing.GraphicsUnit]::Pixel)

# Bottom edge
$botSrc = New-Object System.Drawing.Rectangle 192, 320, 64, 103
$g.DrawImage($src, (New-Object System.Drawing.Rectangle $cw, ($targetH - $bw), ($targetW - 2*$cw), $bw), $botSrc, [System.Drawing.GraphicsUnit]::Pixel)

# Left edge
$leftSrc = New-Object System.Drawing.Rectangle 44, 192, 84, 64
$g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, $ch, $cw, ($targetH - $ch - $bw)), $leftSrc, [System.Drawing.GraphicsUnit]::Pixel)

# Right edge
$rightSrc = New-Object System.Drawing.Rectangle 320, 192, 84, 64
$g.DrawImage($src, (New-Object System.Drawing.Rectangle ($targetW - $cw), $ch, $cw, ($targetH - $ch - $bw)), $rightSrc, [System.Drawing.GraphicsUnit]::Pixel)

# Corners
$tlSrc = New-Object System.Drawing.Rectangle 44, 43, 84, 84
$g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, 0, $cw, $ch), $tlSrc, [System.Drawing.GraphicsUnit]::Pixel)

$trSrc = New-Object System.Drawing.Rectangle 320, 43, 84, 84
$g.DrawImage($src, (New-Object System.Drawing.Rectangle ($targetW - $cw), 0, $cw, $ch), $trSrc, [System.Drawing.GraphicsUnit]::Pixel)

$blSrc = New-Object System.Drawing.Rectangle 44, 320, 84, 103
$g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, ($targetH - $bw), $cw, $bw), $blSrc, [System.Drawing.GraphicsUnit]::Pixel)

$brSrc = New-Object System.Drawing.Rectangle 320, 320, 84, 103
$g.DrawImage($src, (New-Object System.Drawing.Rectangle ($targetW - $cw), ($targetH - $bw), $cw, $bw), $brSrc, [System.Drawing.GraphicsUnit]::Pixel)

$g.Dispose()

$outPath = "JS_Teste\assets\ui\ui_wood_table.png"
$dest.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$ms = New-Object System.IO.MemoryStream
$dest.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
$b64 = [System.Convert]::ToBase64String($ms.ToArray())
$ms.Dispose()
$dest.Dispose()
$src.Dispose()

Set-Content -Path "scratch\wood_table_b64.txt" -Value $b64
Write-Host "Created seamless ui_wood_table.png ($targetW x $targetH). Base64 length: $($b64.Length)"
