Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)
$bmp = New-Object System.Drawing.Bitmap $img

# The image is 448x448. In 3x3 or grid:
# Let's find where alpha > 0
Write-Host "Image size: $($img.Width)x$($img.Height)"
# Let's check standard Tiny Swords tile sizes (usually 64 or 128 or 144)
for ($y = 0; $y -lt 448; $y += 32) {
    $line = ""
    for ($x = 0; $x -lt 448; $x += 32) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.A -gt 0) { $line += "#" } else { $line += "." }
    }
    Write-Host ("{0:D3}: {1}" -f $y, $line)
}
$img.Dispose()
$bmp.Dispose()
