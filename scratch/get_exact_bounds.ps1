Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)

Write-Host "Width: $($bmp.Width), Height: $($bmp.Height)"

# The sprite sheet is 448x448.
# Let's inspect the 3 columns and 3 rows.
# Row 0: Y=0..140
# Row 1: Y=180..260
# Row 2: Y=300..448
# Col 0: X=0..140
# Col 1: X=180..260
# Col 2: X=300..448

function Get-Bounds($xMin, $xMax, $yMin, $yMax) {
    $minX = 999; $maxX = -1; $minY = 999; $maxY = -1
    for ($y = $yMin; $y -lt $yMax; $y++) {
        for ($x = $xMin; $x -lt $xMax; $x++) {
            if ($bmp.GetPixel($x, $y).A -gt 0) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    return @($minX, $minY, ($maxX - $minX + 1), ($maxY - $minY + 1))
}

$tl = Get-Bounds 0 160 0 160
$tc = Get-Bounds 160 280 0 160
$tr = Get-Bounds 280 448 0 160

$ml = Get-Bounds 0 160 160 280
$mc = Get-Bounds 160 280 160 280
$mr = Get-Bounds 280 448 160 280

$bl = Get-Bounds 0 160 280 448
$bc = Get-Bounds 160 280 280 448
$br = Get-Bounds 280 448 280 448

Write-Host "TL: X=$($tl[0]), Y=$($tl[1]), W=$($tl[2]), H=$($tl[3])"
Write-Host "TC: X=$($tc[0]), Y=$($tc[1]), W=$($tc[2]), H=$($tc[3])"
Write-Host "TR: X=$($tr[0]), Y=$($tr[1]), W=$($tr[2]), H=$($tr[3])"

Write-Host "ML: X=$($ml[0]), Y=$($ml[1]), W=$($ml[2]), H=$($ml[3])"
Write-Host "MC: X=$($mc[0]), Y=$($mc[1]), W=$($mc[2]), H=$($mc[3])"
Write-Host "MR: X=$($mr[0]), Y=$($mr[1]), W=$($mr[2]), H=$($mr[3])"

Write-Host "BL: X=$($bl[0]), Y=$($bl[1]), W=$($bl[2]), H=$($bl[3])"
Write-Host "BC: X=$($bc[0]), Y=$($bc[1]), W=$($bc[2]), H=$($bc[3])"
Write-Host "BR: X=$($br[0]), Y=$($br[1]), W=$($br[2]), H=$($br[3])"

$bmp.Dispose()
