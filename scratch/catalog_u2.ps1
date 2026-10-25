Add-Type -AssemblyName System.Drawing

$img1 = [System.Drawing.Bitmap]::FromFile("C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u1_yellow.png")
$img2 = [System.Drawing.Bitmap]::FromFile("C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u2_yellow.png")

# Inspect u-2 cells to identify every character
Write-Host "u-2 cells analysis (8x8):"
for ($r = 0; $r -lt 8; $r++) {
    $line = ""
    for ($c = 0; $c -lt 8; $c++) {
        $cellX = $c * 32
        $cellY = $r * 32
        $count = 0
        for ($y = 0; $y -lt 32; $y++) {
            for ($x = 0; $x -lt 32; $x++) {
                if ($img2.GetPixel($cellX + $x, $cellY + $y).A -gt 20) {
                    $count++
                }
            }
        }
        $line += ("[{0},{1}:{2,3}] " -f $r, $c, $count)
    }
    Write-Host $line
}

$img1.Dispose()
$img2.Dispose()
