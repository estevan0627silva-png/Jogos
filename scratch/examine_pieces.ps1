Add-Type -AssemblyName System.Drawing

$wt = [System.Drawing.Bitmap]::FromFile("JS_Teste\assets\ui\wood_table.png")

# Save each of the 9 pieces
$pieces = @{
    "tl" = @(44, 43, 84, 85)
    "tc" = @(192, 43, 64, 85)
    "tr" = @(320, 43, 84, 85)
    "ml" = @(44, 192, 84, 64)
    "mc" = @(192, 192, 64, 64)
    "mr" = @(320, 192, 84, 64)
    "bl" = @(44, 320, 84, 103)
    "bc" = @(192, 320, 64, 103)
    "br" = @(320, 320, 84, 103)
}

foreach ($k in $pieces.Keys) {
    $rect = $pieces[$k]
    $bmp = New-Object System.Drawing.Bitmap $rect[2], $rect[3]
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $srcR = New-Object System.Drawing.Rectangle $rect[0], $rect[1], $rect[2], $rect[3]
    $dstR = New-Object System.Drawing.Rectangle 0, 0, $rect[2], $rect[3]
    $g.DrawImage($wt, $dstR, $srcR, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $bmp.Save("scratch\piece_$k.png")
    $bmp.Dispose()
}

$wt.Dispose()
Write-Host "Pieces saved to scratch\"
