$path = "JS_Teste\src\config\catalogs.js"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

$startAnchor = "maxHp: {"
$startIdx = $content.IndexOf($startAnchor)
$endAnchor = "moveSpeed: {"
$endIdx = $content.IndexOf($endAnchor, $startIdx)

$newMaxHpBlock = @'
maxHp: {
    name: 'ELIXIR DO CORAO DE RUBI (VIDA)',
    shortName: 'VIDA MXIMA',
    potionColor: 0xff5252,
    icon: 'stat_health',
    maxLevel: 6,
    costs: [10, 20, 40, 80, 160, 0],
    values: [1, 2, 3, 4, 5, 6],
    levels: [
      '1 Corao de Vida (Aspecto hardcore inicial de sobrevivncia).',
      '2 Coraes de Vida (+1 Corao - 2 golpes suportados).',
      '3 Coraes de Vida (Vigor honrado do Cavaleiro - 3 golpes).',
      '4 Coraes de Vida (Baluarte de Ao - 4 golpes suportados).',
      '5 Coraes de Vida (Sangue de Drago - 5 golpes suportados).',
      '6 Coraes de Vida (Imortalidade Rubra - 6 Coraes supremos)!'
    ]
  },
  
'@

$content = $content.Substring(0, $startIdx) + $newMaxHpBlock + $content.Substring($endIdx)

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Output "Successfully updated catalogs.js maxHp!"
