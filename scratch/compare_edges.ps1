Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)

Write-Host "Comparing ML right edge (X=127) vs MC left edge (X=192):"
for ($y = 192; $y -lt 256; $y += 4) {
    $c1 = $bmp.GetPixel(127, $y)
    $c2 = $bmp.GetPixel(192, $y)
    Write-Host ("Y={0}: (127)=({1},{2},{3}) vs (192)=({4},{5},{6}) Diff={7}" -f $y, $c1.R, $c1.G, $c1.B, $c2.R, $c2.G, $c2.B, ([math]::Abs($c1.R-$c2.R)+[math]::Abs($c1.G-$c2.G)+[math]::Abs($c1.B-$c2.B)))
}

Write-Host "`nComparing MC right edge (X=255) vs MR left edge (X=320):"
for ($y = 192; $y -lt 256; $y += 4) {
    $c1 = $bmp.GetPixel(255, $y)
    $c2 = $bmp.GetPixel(320, $y)
    Write-Host ("Y={0}: (255)=({1},{2},{3}) vs (320)=({4},{5},{6}) Diff={7}" -f $y, $c1.R, $c1.G, $c1.B, $c2.R, $c2.G, $c2.B, ([math]::Abs($c1.R-$c2.R)+[math]::Abs($c1.G-$c2.G)+[math]::Abs($c1.B-$c2.B)))
}

$bmp.Dispose()
