$base = (Get-ChildItem -Directory "scratch\extracted_fonts\*\u*-fonts").FullName
Write-Host "Base: $base"

# Copy font sheets
Copy-Item (Get-ChildItem -Recurse $base -Filter "*u*-1.png").FullName "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u1_yellow.png"
Copy-Item (Get-ChildItem -Recurse $base -Filter "*u*-1-brown.png").FullName "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u1_brown.png"
Copy-Item (Get-ChildItem -Recurse $base -Filter "*u*-1-grey.png").FullName "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u1_grey.png"

Copy-Item (Get-ChildItem -Recurse $base -Filter "*u*-2.png").FullName "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u2_yellow.png"
Copy-Item (Get-ChildItem -Recurse $base -Filter "*u*-2-brown.png").FullName "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u2_brown.png"
Copy-Item (Get-ChildItem -Recurse $base -Filter "*u*-2-grey.png").FullName "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u2_grey.png"

Copy-Item (Get-ChildItem -Recurse $base -Filter "*u*-3.png").FullName "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u3_yellow.png"
Copy-Item (Get-ChildItem -Recurse $base -Filter "*u*-3-brown.png").FullName "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u3_brown.png"

Copy-Item (Get-ChildItem -Recurse $base -Filter "*u*-4-yellow.png").FullName "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u4_yellow.png"
Copy-Item (Get-ChildItem -Recurse $base -Filter "*u*-logos.png").FullName "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_logos.png"

Write-Host "Copied font samples!"
