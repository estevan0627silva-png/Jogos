Add-Type -AssemblyName System.Drawing

$tableSrc = [System.Drawing.Bitmap]::FromFile((Resolve-Path "..\IMAGENS\ASSETs\Tiny Swords (Free Pack)\Tiny Swords (Free Pack)\UI Elements\UI Elements\Wood Table\WoodTable.png").Path)

Write-Host "BC (X=224, Y=350..422):"
for ($y = 350; $y -le 422; $y += 2) {
    $c = $tableSrc.GetPixel(224, $y)
    Write-Host ("Y={0:D3}: RGB=({1},{2},{3}) A={4}" -f $y, $c.R, $c.G, $c.B, $c.A)
}
$tableSrc.Dispose()
