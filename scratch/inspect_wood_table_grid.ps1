Add-Type -AssemblyName System.Drawing
$wt = [System.Drawing.Bitmap]::FromFile("JS_Teste\assets\ui\wood_table.png")
# Check 3x3 grid: cols around 0..128, 128..320, 320..448
foreach ($rowPair in @(@(0, 128), @(192, 256), @(320, 448))) {
    $y0 = $rowPair[0]; $y1 = $rowPair[1]
    foreach ($colPair in @(@(0, 128), @(192, 256), @(320, 448))) {
        $x0 = $colPair[0]; $x1 = $colPair[1]
        $minX = 999; $maxX = -1; $minY = 999; $maxY = -1
        for ($y = $y0; $y -lt $y1; $y++) {
            for ($x = $x0; $x -lt $x1; $x++) {
                if ($wt.GetPixel($x, $y).A -gt 10) {
                    if ($x -lt $minX) { $minX = $x }
                    if ($x -gt $maxX) { $maxX = $x }
                    if ($y -lt $minY) { $minY = $y }
                    if ($y -gt $maxY) { $maxY = $y }
                }
            }
        }
        Write-Output "Grid ($x0..$x1, $y0..$y1): X from $minX to $maxX, Y from $minY to $maxY"
    }
}
$wt.Dispose()
