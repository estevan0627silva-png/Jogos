Add-Type -AssemblyName System.Drawing

$mc = [System.Drawing.Bitmap]::FromFile("scratch\piece_mc.png")
Write-Host "mc size: $($mc.Width) x $($mc.Height)"

# Inspect horizontal seams / plank borders in mc
for ($y = 0; $y -lt $mc.Height; $y++) {
    $darkCount = 0
    $avgR = 0; $avgG = 0; $avgB = 0
    for ($x = 0; $x -lt $mc.Width; $x++) {
        $c = $mc.GetPixel($x, $y)
        $avgR += $c.R; $avgG += $c.G; $avgB += $c.B
        if ($c.R -lt 100 -and $c.G -lt 70) { $darkCount++ }
    }
    $avgR = [math]::Round($avgR / $mc.Width)
    $avgG = [math]::Round($avgG / $mc.Width)
    $avgB = [math]::Round($avgB / $mc.Width)
    if ($darkCount -gt 10 -or ($y % 8 -eq 0)) {
        Write-Host ("Y={0:D2}: Avg=({1},{2},{3}) DarkPixels={4}" -f $y, $avgR, $avgG, $avgB, $darkCount)
    }
}
$mc.Dispose()
