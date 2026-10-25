Add-Type -AssemblyName System.Drawing
$rb = [System.Drawing.Bitmap]::FromFile("JS_Teste\assets\ui\ribbon_big_yellow.png")
Write-Output "Ribbon: $($rb.Width) x $($rb.Height)"
# Left chunk: 0..128, Mid chunk: 128..320, Right chunk: 320..448
foreach ($pair in @(@(0, 128), @(192, 256), @(320, 448))) {
    $x0 = $pair[0]; $x1 = $pair[1]
    $minX = 999; $maxX = -1; $minY = 999; $maxY = -1
    for ($y = 0; $y -lt $rb.Height; $y++) {
        for ($x = $x0; $x -lt $x1; $x++) {
            if ($rb.GetPixel($x, $y).A -gt 10) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    Write-Output "Range X ($x0..$x1): X from $minX to $maxX, Y from $minY to $maxY"
}
$rb.Dispose()
