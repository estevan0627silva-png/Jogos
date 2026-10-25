$destDir = "JS_Teste\assets\ui"

$u1YellowB64 = [System.Convert]::ToBase64String([System.IO.File]::ReadAllBytes("$destDir\font_u1_yellow.png"))
$u2YellowB64 = [System.Convert]::ToBase64String([System.IO.File]::ReadAllBytes("$destDir\font_u2_yellow.png"))

$u1GreyB64 = [System.Convert]::ToBase64String([System.IO.File]::ReadAllBytes("$destDir\font_u1_grey.png"))
$u2GreyB64 = [System.Convert]::ToBase64String([System.IO.File]::ReadAllBytes("$destDir\font_u2_grey.png"))

$u1BrownB64 = [System.Convert]::ToBase64String([System.IO.File]::ReadAllBytes("$destDir\font_u1_brown.png"))
$u2BrownB64 = [System.Convert]::ToBase64String([System.IO.File]::ReadAllBytes("$destDir\font_u2_brown.png"))

$jsContent = @"
// =============================================================================
// RECURSOS GRÁFICOS DAS FONTES PIXEL ART (KIBYRA UI FONTS)
// BASE64 AUTOSSUFICIENTE PARA CARREGAMENTO 100% OFFLINE E SEGURO
// =============================================================================
const FONT_SHEETS_BASE64 = {
  "font_u1_yellow": "data:image/png;base64,$u1YellowB64",
  "font_u2_yellow": "data:image/png;base64,$u2YellowB64",
  "font_u1_grey": "data:image/png;base64,$u1GreyB64",
  "font_u2_grey": "data:image/png;base64,$u2GreyB64",
  "font_u1_brown": "data:image/png;base64,$u1BrownB64",
  "font_u2_brown": "data:image/png;base64,$u2BrownB64"
};
"@

[System.IO.File]::WriteAllText("JS_Teste\src\art\fontAssets.js", $jsContent, [System.Text.Encoding]::UTF8)
Write-Host "Generated JS_Teste\src\art\fontAssets.js successfully!"
