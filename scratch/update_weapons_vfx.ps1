$weapPath = "JS_Teste\src\combat\weapons.js"
$weap = [System.IO.File]::ReadAllText($weapPath, [System.Text.Encoding]::UTF8)

$oldLine = ".setScale(Math.max(0.65, radius / 44))"
$newLine = ".setScale(Math.max(0.75, (radius * 1.8) / 96))"
$weap = $weap.Replace($oldLine, $newLine)

[System.IO.File]::WriteAllText($weapPath, $weap, [System.Text.Encoding]::UTF8)
Write-Output "weapons.js updated!"
