# 1. Update catalogs.js
$catPath = "JS_Teste\src\config\catalogs.js"
$cat = [System.IO.File]::ReadAllText($catPath, [System.Text.Encoding]::UTF8)

$oldShieldBlock = "  shield: {`r`n    name: 'ESCUDO SAGRADO',`r`n    category: 'BALUARTE SAGRADO',`r`n    icon: 'item_shield',`r`n    unlockedDefault: true,`r`n    unlockCost: 0,"
$newShieldBlock = "  shield: {`r`n    name: 'ESCUDO SAGRADO',`r`n    category: 'BALUARTE SAGRADO',`r`n    icon: 'item_shield',`r`n    unlockedDefault: false,`r`n    unlockCost: 30,"

if ($cat.Contains($oldShieldBlock)) {
    $cat = $cat.Replace($oldShieldBlock, $newShieldBlock)
} else {
    # Unix newlines fallback
    $oldShieldBlock2 = "  shield: {\n    name: 'ESCUDO SAGRADO',\n    category: 'BALUARTE SAGRADO',\n    icon: 'item_shield',\n    unlockedDefault: true,\n    unlockCost: 0,"
    $newShieldBlock2 = "  shield: {\n    name: 'ESCUDO SAGRADO',\n    category: 'BALUARTE SAGRADO',\n    icon: 'item_shield',\n    unlockedDefault: false,\n    unlockCost: 30,"
    $cat = $cat.Replace($oldShieldBlock2, $newShieldBlock2)
}
[System.IO.File]::WriteAllText($catPath, $cat, [System.Text.Encoding]::UTF8)
Write-Output "catalogs.js updated!"

# 2. Update storage.js
$storPath = "JS_Teste\src\core\storage.js"
$stor = [System.IO.File]::ReadAllText($storPath, [System.Text.Encoding]::UTF8)
$oldStor = "shield: { unlocked: true, level: 1 },"
$newStor = "shield: { unlocked: false, level: 1 },"
$stor = $stor.Replace($oldStor, $newStor)
[System.IO.File]::WriteAllText($storPath, $stor, [System.Text.Encoding]::UTF8)
Write-Output "storage.js updated!"
