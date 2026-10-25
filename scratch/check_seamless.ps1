Add-Type -AssemblyName System.Drawing

$mc = [System.Drawing.Bitmap]::FromFile("scratch\piece_mc.png")
Write-Host "Comparing Left vs Right col of piece_mc:"
for ($y = 0; $y -lt 64; $y += 8) {
    $cl = $mc.GetPixel(0, $y)
    $cr = $mc.GetPixel(63, $y)
    Write-Host ("Y={0:D2}: L=({1},{2},{3}) vs R=({4},{5},{6})" -f $y, $cl.R, $cl.G, $cl.B, $cr.R, $cr.G, $cr.B)
}

Write-Host "`nComparing Top vs Bottom row of piece_mc:"
for ($x = 0; $x -lt 64; $x += 8) {
    $ct = $mc.GetPixel($x, 0)
    $cb = $mc.GetPixel($x, 63)
    Write-Host ("X={0:D2}: T=({1},{2},{3}) vs B=({4},{5},{6})" -f $x, $ct.R, $ct.G, $ct.B, $cb.R, $cb.G, $cb.B)
}
$mc.Dispose()
