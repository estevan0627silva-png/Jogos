Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)

# We want a clean 552 x 444 table (or 560 x 460)
# Let's inspect the clean plank row without the repeated notch
$mc = New-Object System.Drawing.Bitmap 64, 64
$gMc = [System.Drawing.Graphics]::FromImage($mc)
$gMc.DrawImage($src, 0, 0, (New-Object System.Drawing.Rectangle 192, 192, 64, 64), [System.Drawing.GraphicsUnit]::Pixel)
$gMc.Dispose()

# Let's see what pixels are in rows 0, 1, 2 of $mc
Write-Host "Row 0 of MC:"
for ($x = 0; $x -lt 64; $x += 4) {
    $c = $mc.GetPixel($x, 0)
    Write-Host ("X={0}: ({1},{2},{3})" -f $x, $c.R, $c.G, $c.B)
}

$mc.Dispose()
$src.Dispose()
