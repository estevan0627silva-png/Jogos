Copy-Item "scratch\padlock\Sprites\Small Square Padlock - GREY - 0000.png" "JS_Teste\assets\ui\ui_padlock.png" -Force
Copy-Item "scratch\padlock\Small Square Padlock - GREY - Spritesheet.png" "JS_Teste\assets\ui\ui_padlock_sheet.png" -Force

# Also generate a base64 string for uiAssets.js fallback
$bytes = [System.IO.File]::ReadAllBytes((Resolve-Path "JS_Teste\assets\ui\ui_padlock.png").Path)
$b64 = [System.Convert]::ToBase64String($bytes)
Set-Content -Path "scratch\padlock_b64.txt" -Value $b64
Write-Host "Copied padlock assets. Base64 length: $($b64.Length)"
