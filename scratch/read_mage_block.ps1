$content = [System.IO.File]::ReadAllText("JS_Teste\src\ui\menus.js", [System.Text.Encoding]::UTF8)
$start = 79700
$len = 700
Write-Output $content.Substring($start, $len)
