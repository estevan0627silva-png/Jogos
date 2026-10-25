Add-Type -AssemblyName System.Drawing

$mc = [System.Drawing.Bitmap]::FromFile("scratch\piece_mc.png")
Write-Host "mc size: $($mc.Width)x$($mc.Height)"

for ($y = 0; $y -lt 64; $y++) {
    $line = ""
    for ($x = 0; $x -lt 64; $x += 2) {
        $c = $mc.GetPixel($x, $y)
        if ($c.R -lt 50) { $line += "=" }
        elseif ($c.R -lt 120) { $line += "-" }
        elseif ($c.R -gt 160) { $line += "#" }
        else { $line += " " }
    }
    Write-Host ("{0:D2}: {1}" -f $y, $line)
}
$mc.Dispose()
