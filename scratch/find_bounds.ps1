Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)
$bmp = New-Object System.Drawing.Bitmap $img

# Let's check non-empty regions by columns and rows
function Get-Bounds($minX, $maxX, $minY, $maxY) {
    $x1 = $maxX; $x2 = $minX; $y1 = $maxY; $y2 = $minY
    for ($y = $minY; $y -lt $maxY; $y++) {
        for ($x = $minX; $x -lt $maxX; $x++) {
            if ($bmp.GetPixel($x, $y).A -gt 10) {
                if ($x -lt $x1) { $x1 = $x }
                if ($x -gt $x2) { $x2 = $x }
                if ($y -lt $y1) { $y1 = $y }
                if ($y -gt $y2) { $y2 = $y }
            }
        }
    }
    return [PSCustomObject]@{ X1=$x1; Y1=$y1; X2=$x2; Y2=$y2; W=($x2-$x1+1); H=($y2-$y1+1) }
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

Write-Host "TL: $($tl.X1),$($tl.Y1) to $($tl.X2),$($tl.Y2) -> $($tl.W)x$($tl.H)"
Write-Host "TC: $($tc.X1),$($tc.Y1) to $($tc.X2),$($tc.Y2) -> $($tc.W)x$($tc.H)"
Write-Host "TR: $($tr.X1),$($tr.Y1) to $($tr.X2),$($tr.Y2) -> $($tr.W)x$($tr.H)"

Write-Host "ML: $($ml.X1),$($ml.Y1) to $($ml.X2),$($ml.Y2) -> $($ml.W)x$($ml.H)"
Write-Host "MC: $($mc.X1),$($mc.Y1) to $($mc.X2),$($mc.Y2) -> $($mc.W)x$($mc.H)"
Write-Host "MR: $($mr.X1),$($mr.Y1) to $($mr.X2),$($mr.Y2) -> $($mr.W)x$($mr.H)"

Write-Host "BL: $($bl.X1),$($bl.Y1) to $($bl.X2),$($bl.Y2) -> $($bl.W)x$($bl.H)"
Write-Host "BC: $($bc.X1),$($bc.Y1) to $($bc.X2),$($bc.Y2) -> $($bc.W)x$($bc.H)"
Write-Host "BR: $($br.X1),$($br.Y1) to $($br.X2),$($br.Y2) -> $($br.W)x$($br.H)"

$img.Dispose()
$bmp.Dispose()
