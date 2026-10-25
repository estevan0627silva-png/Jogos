Add-Type -AssemblyName System.Drawing

$ml = [System.Drawing.Bitmap]::FromFile("scratch\piece_ml.png")
Write-Host "ml size: $($ml.Width)x$($ml.Height)"
for ($x = 0; $x -lt $ml.Width; $x += 4) {
    $c = $ml.GetPixel($x, 32)
    Write-Host ("X={0:D2}: R={1}, G={2}, B={3}, A={4}" -f $x, $c.R, $c.G, $c.B, $c.A)
}
$ml.Dispose()
