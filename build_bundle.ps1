$srcFiles = @(
    "JS_Teste/src/config/constants.js",
    "JS_Teste/src/config/palette.js",
    "JS_Teste/src/config/catalogs.js",
    "JS_Teste/src/core/events.js",
    "JS_Teste/src/core/state.js",
    "JS_Teste/src/core/storage.js",
    "JS_Teste/src/core/audio.js",
    "JS_Teste/src/core/platformBridge.js",
    "JS_Teste/src/art/drawHelpers.js",
    "JS_Teste/src/art/characterArt.js",
    "JS_Teste/src/art/itemArt.js",
    "JS_Teste/src/art/worldArt.js",
    "JS_Teste/src/art/uiAssets.js",
    "JS_Teste/src/art/vfxAssets.js",
    "JS_Teste/src/art/fontAssets.js",
    "JS_Teste/src/art/kibyraFontMap.js",
    "JS_Teste/src/art/pixelFont.js",
    "JS_Teste/src/combat/weapons.js",
    "JS_Teste/src/combat/combatManager.js",
    "JS_Teste/src/combat/lootManager.js",
    "JS_Teste/src/world/director.js",
    "JS_Teste/src/world/enemies.js",
    "JS_Teste/src/world/boss.js",
    "JS_Teste/src/ui/hud.js",
    "JS_Teste/src/ui/modals.js",
    "JS_Teste/src/ui/menus.js",
    "JS_Teste/src/ui/virtualJoystick.js",
    "JS_Teste/src/main.js"
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $scriptDir) { $scriptDir = "Jogos" }

$bundle = ""
foreach ($f in $srcFiles) {
    $fullPath = Join-Path $scriptDir $f
    if (Test-Path $fullPath) {
        $text = [System.IO.File]::ReadAllText($fullPath, [System.Text.Encoding]::UTF8)
        $bundle += "`r`n// --- BUNDLE FILE: $f ---`r`n" + $text + "`r`n"
    } else {
        Write-Error "File not found: $fullPath"
    }
}

$outPath = Join-Path $scriptDir "JS_Teste/game.js"
[System.IO.File]::WriteAllText($outPath, $bundle, [System.Text.Encoding]::UTF8)
Write-Host "JS_Teste/game.js successfully bundled! Total length: $($bundle.Length) chars"
