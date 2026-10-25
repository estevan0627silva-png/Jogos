$content = [System.IO.File]::ReadAllText("JS_Teste\src\ui\menus.js", [System.Text.Encoding]::UTF8)
$startIdx = $content.IndexOf("const nameTxt = scene.add.text(cx, startY + 92, cfg.name")
$endAnchor = "menuContainer.add([cardGfx, cardHit, icon, nameTxt, badgeBg, badgeTxt, descTxt, actionBtn, actionTxt]);"
$endIdx = $content.IndexOf($endAnchor, $startIdx) + $endAnchor.Length

Write-Output "startIdx: $startIdx, endIdx: $endIdx"
if ($startIdx -ge 0 -and $endIdx -gt $startIdx) {
  Write-Output "Found block length: " + ($endIdx - $startIdx)
}
