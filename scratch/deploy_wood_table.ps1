Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\table_perfect_v4.png"
$destPath = "JS_Teste\assets\ui\ui_wood_table.png"

Copy-Item $srcPath $destPath -Force

$bytes = [System.IO.File]::ReadAllBytes($destPath)
$b64 = [System.Convert]::ToBase64String($bytes)

# Save base64 to scratch for insertion
Set-Content -Path "scratch\new_table_b64.txt" -Value $b64

Write-Host "Updated $destPath. Base64 length: $($b64.Length)"
