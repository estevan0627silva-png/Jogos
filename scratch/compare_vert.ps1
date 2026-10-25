Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)

Write-Host "Comparing TC bottom (Y=127) vs MC top (Y=192):"
for ($x = 192; $x -lt 256; $x += 4) {
    $c1 = $bmp.GetPixel($x, 127)
    $c2 = $bmp.GetPixel($x, 192)
    Write-Host ("X={0}: TC(127)=({1},{2},{3}) vs MC(192)=({4},{5},{6})" -f $x, $c1.R, $c1.G, $c1.B, $c2.R, $c2.G, $c2.B)
}

Write-Host "`nComparing MC bottom (Y=255) vs BC top (Y=320):"
for ($x = 192; $x -lt 256; $x += 4) {
    $c1 = $bmp.GetPixel($x, 255)
    $c2 = $bmp.GetPixel($x, 320)
    Write-Host ("X={0}: MC(255)=({1},{2},{3}) vs BC(320)=({4},{5},{6})" -f $x, $c1.R, $c1.G, $c1.B, $c2.R, $c2.G, $c2.B)
}

$bmp.Dispose()
