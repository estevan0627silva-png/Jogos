$b64 = Get-Content "scratch\new_table_b64.txt" -Raw
$b64 = $b64.Trim()

$uiAssetsPath = "JS_Teste\src\art\uiAssets.js"
$lines = [System.IO.File]::ReadAllLines($uiAssetsPath)

for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match '^\s*"ui_wood_table":\s*"data:image/png;base64,') {
        $lines[$i] = '  "ui_wood_table": "data:image/png;base64,' + $b64 + '",'
        Write-Host "Updated line $($i+1)"
        break
    }
}

[System.IO.File]::WriteAllLines($uiAssetsPath, $lines)
Write-Host "uiAssets.js updated with new wood table base64."
