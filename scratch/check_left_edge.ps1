Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)

# Check vertical line of left border
Write-Host "Left border edge across Y:"
for ($y = 40; $y -lt 430; $y += 10) {
    $minX = -1
    for ($x = 0; $x -lt 128; $x++) {
        if ($bmp.GetPixel($x, $y).A -gt 0) {
            $minX = $x
            break
        }
    }
    if ($minX -ge 0) {
        Write-Host ("Y={0:D3}: first non-transparent X={1}" -f $y, $minX)
    }
}
$bmp.Dispose()
