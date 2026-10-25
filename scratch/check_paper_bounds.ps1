Add-Type -AssemblyName System.Drawing
$reg = [System.Drawing.Bitmap]::FromFile("JS_Teste\assets\ui\paper_regular.png")
Write-Output "Source paper_regular: $($reg.Width) x $($reg.Height)"

$midX = [int]($reg.Width / 2)
$topY = -1
$botY = -1
for ($y = 0; $y -lt $reg.Height; $y++) {
    $c = $reg.GetPixel($midX, $y)
    if ($c.A -gt 10) {
        if ($topY -eq -1) { $topY = $y }
        $botY = $y
    }
}
Write-Output "paper_regular non-transparent Y: $topY to $botY"

$bmp = [System.Drawing.Bitmap]::FromFile("C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\assembled_paper_reg.png")
Write-Output "Assembled paper_reg: $($bmp.Width) x $($bmp.Height)"
$midX2 = [int]($bmp.Width / 2)
$topY2 = -1
$botY2 = -1
for ($y = 0; $y -lt $bmp.Height; $y++) {
    $c = $bmp.GetPixel($midX2, $y)
    if ($c.A -gt 10) {
        if ($topY2 -eq -1) { $topY2 = $y }
        $botY2 = $y
    }
}
Write-Output "Assembled paper_reg non-transparent Y: $topY2 to $botY2"

$reg.Dispose()
$bmp.Dispose()
