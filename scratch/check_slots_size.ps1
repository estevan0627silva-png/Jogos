Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Image]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable_Slots.png").Path)
Write-Host "WoodTable_Slots size: $($img.Width) x $($img.Height)"
$img.Dispose()
