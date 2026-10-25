$content = [System.IO.File]::ReadAllText('JS_Teste/game.js', [System.Text.Encoding]::UTF8)
$pos = 595705
$start = [Math]::Max(0, $pos - 150)
$len = [Math]::Min($content.Length - $start, 300)
Write-Output $content.Substring($start, $len)
