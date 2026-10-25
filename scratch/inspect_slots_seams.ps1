Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\woodtable_slots_orig.png")
Write-Host "woodtable_slots size: $($img.Width)x$($img.Height)"

# Inspect vertical line X=96 in woodtable_slots
for ($y = 0; $y -lt $img.Height; $y += 2) {
    $c = $img.GetPixel(96, $y)
    if ($c.R -lt 120 -and $c.A -gt 200) {
        Write-Host ("Y={0:D3}: Seam pixel RGB=({1},{2},{3})" -f $y, $c.R, $c.G, $c.B)
    }
}
$img.Dispose()
