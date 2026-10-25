Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)
Write-Host "Width: $($img.Width), Height: $($img.Height)"
# Let's check some pixel colors around borders and center
$bmp = New-Object System.Drawing.Bitmap $img
Write-Host "Pixel (0,0): $($bmp.GetPixel(0,0))"
Write-Host "Pixel (32,32): $($bmp.GetPixel(32,32))"
Write-Host "Pixel (64,64): $($bmp.GetPixel(64,64))"
Write-Host "Pixel (224,224): $($bmp.GetPixel(224,224))"
$img.Dispose()
$bmp.Dispose()
