$woodB64 = (Get-Content "scratch\wood_table_b64.txt" -Raw).Trim()
$padlockB64 = (Get-Content "scratch\padlock_b64.txt" -Raw).Trim()

$content = Get-Content "JS_Teste\src\art\uiAssets.js" -Raw

# Replace ui_wood_table
$woodPattern = '"ui_wood_table":\s*"data:image/png;base64,[^"]+"'
$woodReplacement = '"ui_wood_table": "data:image/png;base64,' + $woodB64 + '",' + "`r`n" + '  "ui_padlock": "data:image/png;base64,' + $padlockB64 + '"'

$newContent = [System.Text.RegularExpressions.Regex]::Replace($content, $woodPattern, $woodReplacement)

# Add ui_padlock to preloadUIAssets if not already present
if ($newContent -notmatch "'ui_padlock'") {
    $preloadTarget = "scene.load.image('ui_paper_regular', 'assets/ui/ui_paper_regular.png');"
    $preloadReplacement = "scene.load.image('ui_paper_regular', 'assets/ui/ui_paper_regular.png');`r`n    scene.load.image('ui_padlock', 'assets/ui/ui_padlock.png');"
    $newContent = $newContent.Replace($preloadTarget, $preloadReplacement)

    $fallbackTarget = "['ui_paper_regular', 'ui_paper_special'"
    $fallbackReplacement = "['ui_padlock', 'ui_paper_regular', 'ui_paper_special'"
    $newContent = $newContent.Replace($fallbackTarget, $fallbackReplacement)
}

Set-Content -Path "JS_Teste\src\art\uiAssets.js" -Value $newContent -NoNewline
Write-Host "Updated JS_Teste\src\art\uiAssets.js successfully."
