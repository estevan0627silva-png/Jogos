Add-Type -AssemblyName System.Drawing

$tableSrc = [System.Drawing.Bitmap]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)

# Metal corner bracket in TL has greenish-teal metal color around RGB(170, 220, 210) or (110, 160, 150)
Write-Host "Finding metal bracket bounds in TL (0..128, 0..128):"
$minX = 999; $maxX = -1; $minY = 999; $maxY = -1
for ($y = 0; $y -lt 128; $y++) {
    for ($x = 0; $x -lt 128; $x++) {
        $c = $tableSrc.GetPixel($x, $y)
        # Metal bracket has high G and B compared to R, or is near teal
        if ($c.A -gt 0 -and $c.B -gt $c.R) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
Write-Host "Metal bracket in TL: X=$minX..$maxX, Y=$minY..$maxY"

# Finding metal bracket in BL (0..128, 300..448)
$minX = 999; $maxX = -1; $minY = 999; $maxY = -1
for ($y = 300; $y -lt 448; $y++) {
    for ($x = 0; $x -lt 128; $x++) {
        $c = $tableSrc.GetPixel($x, $y)
        if ($c.A -gt 0 -and $c.B -gt $c.R) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
Write-Host "Metal bracket in BL: X=$minX..$maxX, Y=$minY..$maxY"

$tableSrc.Dispose()
