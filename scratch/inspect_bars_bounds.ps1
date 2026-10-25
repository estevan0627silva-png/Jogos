Add-Type -AssemblyName System.Drawing
foreach ($file in @("bar_big_base.png", "bar_small_base.png")) {
    $bmp = [System.Drawing.Bitmap]::FromFile("JS_Teste\assets\ui\$file")
    $minX = 999; $maxX = -1; $minY = 999; $maxY = -1
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            if ($bmp.GetPixel($x, $y).A -gt 10) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    Write-Output "$file ($($bmp.Width)x$($bmp.Height)): X from $minX to $maxX, Y from $minY to $maxY"
    $bmp.Dispose()
}
