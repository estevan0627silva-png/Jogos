Add-Type -AssemblyName System.Drawing

$mc = [System.Drawing.Bitmap]::FromFile("scratch\piece_mc.png")
for ($y = 0; $y -le 4; $y++) {
    $line = ""
    for ($x = 0; $x -lt 64; $x += 2) {
        $c = $mc.GetPixel($x, $y)
        if ($c.R -lt 50) { $line += "X" } # dark notch (22,28,46)
        elseif ($c.R -lt 130) { $line += "-" } # shadow (117,81,81)
        else { $line += " " } # wood
    }
    Write-Host ("Row {0:D2}: {1}" -f $y, $line)
}
$mc.Dispose()
