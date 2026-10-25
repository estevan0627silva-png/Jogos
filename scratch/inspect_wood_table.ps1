Add-Type -AssemblyName System.Drawing
$wt = [System.Drawing.Bitmap]::FromFile("JS_Teste\assets\ui\wood_table.png")
Write-Output "wood_table: $($wt.Width) x $($wt.Height)"
$minX = 999; $maxX = -1; $minY = 999; $maxY = -1
for ($y = 0; $y -lt $wt.Height; $y++) {
    for ($x = 0; $x -lt $wt.Width; $x++) {
        if ($wt.GetPixel($x, $y).A -gt 10) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
Write-Output "wood_table non-transparent: X from $minX to $maxX, Y from $minY to $maxY"
$wt.Dispose()
