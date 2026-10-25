Add-Type -AssemblyName System.Drawing
$img1 = [System.Drawing.Image]::FromFile((Resolve-Path "scratch\padlock\Small Square Padlock - GREY - Spritesheet.png").Path)
Write-Host "Spritesheet: $($img1.Width)x$($img1.Height)"
$img1.Dispose()

$img0 = [System.Drawing.Image]::FromFile((Resolve-Path "scratch\padlock\Sprites\Small Square Padlock - GREY - 0000.png").Path)
Write-Host "Frame 0: $($img0.Width)x$($img0.Height)"
$img0.Dispose()
