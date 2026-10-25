Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)

Write-Host "Bottom edge of BL (Y=410..425):"
for ($y = 410; $y -le 425; $y++) {
    $line = ""
    for ($x = 44; $x -le 70; $x += 2) {
        $c = $bmp.GetPixel($x, $y)
        $line += if ($c.A -gt 0) { "#" } else { "." }
    }
    Write-Host ("Y={0:D3}: {1}" -f $y, $line)
}

Write-Host "`nBottom edge of BC (Y=410..425):"
for ($y = 410; $y -le 425; $y++) {
    $line = ""
    for ($x = 192; $x -le 218; $x += 2) {
        $c = $bmp.GetPixel($x, $y)
        $line += if ($c.A -gt 0) { "#" } else { "." }
    }
    Write-Host ("Y={0:D3}: {1}" -f $y, $line)
}

$bmp.Dispose()
