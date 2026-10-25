Add-Type -AssemblyName System.Drawing

$wt = [System.Drawing.Bitmap]::FromFile("JS_Teste\assets\ui\wood_table.png")

for ($y = 40; $y -lt 360; $y++) {
    $c = $wt.GetPixel(224, $y)
    # Check if this pixel is on a plank seam (seams are dark brown/black around RGB 70,55,50)
    if ($c.R -lt 120 -and $c.G -lt 90) {
        Write-Host ("Seam at Y={0}: R={1}, G={2}, B={3}" -f $y, $c.R, $c.G, $c.B)
    }
}
$wt.Dispose()
