$catPath = "JS_Teste/src/config/catalogs.js"
$lines = [System.IO.File]::ReadAllLines($catPath, [System.Text.Encoding]::UTF8)

for ($i = 0; $i -lt $lines.Length; $i++) {
    $l = $lines[$i]
    if ($l -match "^\s*axe:\s*\{") {
        # update unlockCost in axe
        for ($j = $i; $j -lt ($i + 10); $j++) {
            if ($lines[$j] -match "unlockCost:\s*\d+,") {
                $lines[$j] = "    unlockCost: 40,"
                break
            }
        }
    } elseif ($l -match "^\s*firestaff:\s*\{") {
        # update unlockCost in firestaff
        for ($j = $i; $j -lt ($i + 10); $j++) {
            if ($lines[$j] -match "unlockCost:\s*\d+,") {
                $lines[$j] = "    unlockCost: 20,"
                break
            }
        }
    } elseif ($l -match "^\s*moveSpeed:\s*\{" -or $l -match "^\s*magnet:\s*\{" -or $l -match "^\s*wisdom:\s*\{") {
        # update costs array
        for ($j = $i; $j -lt ($i + 10); $j++) {
            if ($lines[$j] -match "costs:\s*\[.*?\],") {
                $lines[$j] = "    costs: [10, 20, 40, 80, 160, 0],"
                break
            }
        }
    }
}

# Update maxHp levels descriptions
$content = ($lines -join "`r`n")
$oldLevels = @'
    levels: [
      '3 Corações de Vida (Vigor inicial honrado do Cavaleiro).',
      '4 Corações de Vida (+1 Coração — 4 golpes suportados).',
      '5 Corações de Vida (Sangue de Dragão — 5 Corações).',
      '6 Corações de Vida (Imortalidade Rubra — 6 Corações supremos)!'
    ]
'@

$newLevels = @'
    levels: [
      '1 Coração de Vida (Aspecto hardcore inicial de sobrevivência).',
      '2 Corações de Vida (+1 Coração — 2 golpes suportados).',
      '3 Corações de Vida (+2 Corações — 3 golpes suportados).',
      '4 Corações de Vida (+3 Corações — 4 golpes suportados).',
      '5 Corações de Vida (+4 Corações — 5 golpes suportados).',
      '6 Corações de Vida (Imortalidade Rubra — 6 Corações supremos)!'
    ]
'@

$content = $content.Replace($oldLevels, $newLevels)
[System.IO.File]::WriteAllText($catPath, $content, [System.Text.Encoding]::UTF8)
Write-Output "catalogs.js updated with GDD v1.0 numbers!"
