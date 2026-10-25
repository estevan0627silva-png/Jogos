Add-Type -AssemblyName System.Drawing

$img1 = [System.Drawing.Bitmap]::FromFile("C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u1_yellow.png")
Write-Host "font_u1_yellow size: $($img1.Width) x $($img1.Height)"
$cellW = $img1.Width / 8
$cellH = $img1.Height / 8
Write-Host "Grid: 8x8, Cell: $cellW x $cellH"
$img1.Dispose()

$img2 = [System.Drawing.Bitmap]::FromFile("C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u2_yellow.png")
Write-Host "font_u2_yellow size: $($img2.Width) x $($img2.Height)"
$img2.Dispose()

# Let's inspect files inside one of the folders:
$files = Get-ChildItem "scratch\extracted_fonts\*\u*-fonts\u*-1\u*-1-yellow\u*-1" | Select-Object -First 10 Name
Write-Host "Sample files in u-1-yellow:"
$files | ForEach-Object { Write-Host $_.Name }
