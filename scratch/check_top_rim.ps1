Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)

Write-Host "Top edge of TL (X=44..127):"
for ($y = 40; $y -le 52; $y++) {
    $line = ""
    for ($x = 44; $x -le 64; $x += 2) {
        $c = $bmp.GetPixel($x, $y)
        $line += if ($c.A -gt 0) { "#" } else { "." }
    }
    Write-Host ("Y={0:D2}: {1}" -f $y, $line)
}

Write-Host "`nTop edge of TC (X=192..255):"
for ($y = 40; $y -le 52; $y++) {
    $line = ""
    for ($x = 192; $x -le 212; $x += 2) {
        $c = $bmp.GetPixel($x, $y)
        $line += if ($c.A -gt 0) { "#" } else { "." }
    }
    Write-Host ("Y={0:D2}: {1}" -f $y, $line)
}

$bmp.Dispose()
