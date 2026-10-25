$content = [System.IO.File]::ReadAllText("JS_Teste\src\ui\menus.js", [System.Text.Encoding]::UTF8)
$mageDivIdx = $content.IndexOf("[250, 480, 710].forEach(divX => {")
$mageCardsIdx = $content.IndexOf("const cardLefts = [30, 260, 490, 720];")
Write-Output "mageDivIdx: $mageDivIdx, mageCardsIdx: $mageCardsIdx"
