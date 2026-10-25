Add-Type -AssemblyName System.Drawing
$bb = [System.Drawing.Bitmap]::FromFile("JS_Teste\assets\ui\bar_big_base.png")
foreach ($pair in @(@(0, 100), @(128, 192), @(220, 320))) {
    $x0 = $pair[0]; $x1 = $pair[1]
    $minX = 999; $maxX = -1; $minY = 999; $maxY = -1
    for ($y = 0; $y -lt $bb.Height; $y++) {
        for ($x = $x0; $x -lt $x1; $x++) {
            if ($bb.GetPixel($x, $y).A -gt 10) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    Write-Output "Bar big range ($x0..$x1): X from $minX to $maxX, Y from $minY to $maxY"
}
$bb.Dispose()
