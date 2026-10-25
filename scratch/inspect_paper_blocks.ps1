Add-Type -AssemblyName System.Drawing
$reg = [System.Drawing.Bitmap]::FromFile("JS_Teste\assets\ui\paper_regular.png")
# Check rows 0..64, 128..192, 256..320
foreach ($row in @(0, 128, 256)) {
    foreach ($col in @(0, 128, 256)) {
        $minX = 999; $maxX = -1; $minY = 999; $maxY = -1
        for ($y = $row; $y -lt ($row + 64); $y++) {
            for ($x = $col; $x -lt ($col + 64); $x++) {
                if ($reg.GetPixel($x, $y).A -gt 10) {
                    if ($x -lt $minX) { $minX = $x }
                    if ($x -gt $maxX) { $maxX = $x }
                    if ($y -lt $minY) { $minY = $y }
                    if ($y -gt $maxY) { $maxY = $y }
                }
            }
        }
        Write-Output "Block at ($col, $row): X from $minX to $maxX, Y from $minY to $maxY"
    }
}
$reg.Dispose()
