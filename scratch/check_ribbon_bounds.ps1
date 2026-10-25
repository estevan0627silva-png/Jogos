Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\assembled_ribbon_yellow.png")
Write-Output "Ribbon Size: $($bmp.Width) x $($bmp.Height)"
# Scan central vertical column
$midX = [int]($bmp.Width / 2)
$topY = -1
$botY = -1
for ($y = 0; $y -lt $bmp.Height; $y++) {
    $c = $bmp.GetPixel($midX, $y)
    if ($c.A -gt 10) {
        if ($topY -eq -1) { $topY = $y }
        $botY = $y
    }
}
Write-Output "Central column non-transparent: Y from $topY to $botY (height = $($botY - $topY + 1))"
$bmp.Dispose()
