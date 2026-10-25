$base = (Get-ChildItem -Directory "scratch\extracted_fonts\*\u*-fonts").FullName
Write-Host "Base: $base"

$destDir = "JS_Teste\assets\ui"

Copy-Item (Get-ChildItem -Recurse $base -Filter "*u*-1.png").FullName "$destDir\font_u1_yellow.png" -Force
Copy-Item (Get-ChildItem -Recurse $base -Filter "*u*-2.png").FullName "$destDir\font_u2_yellow.png" -Force

Copy-Item (Get-ChildItem -Recurse $base -Filter "*u*-1-grey.png").FullName "$destDir\font_u1_grey.png" -Force
Copy-Item (Get-ChildItem -Recurse $base -Filter "*u*-2-grey.png").FullName "$destDir\font_u2_grey.png" -Force

Copy-Item (Get-ChildItem -Recurse $base -Filter "*u*-1-brown.png").FullName "$destDir\font_u1_brown.png" -Force
Copy-Item (Get-ChildItem -Recurse $base -Filter "*u*-2-brown.png").FullName "$destDir\font_u2_brown.png" -Force

Write-Host "Copied all 6 font sheets to $destDir!"
Get-ChildItem "$destDir\font_*.png" | Select-Object Name, Length
