$lines = Get-Content 'JS_Teste/src/art/uiAssets.js'
$keys = @()
$lineNum = 0
foreach ($line in $lines) {
    $lineNum++
    if ($line -match '^\s*"([^"]+)":') {
        $k = $matches[1]
        $keys += [PSCustomObject]@{ Key = $k; Line = $lineNum }
    }
}
$keys | Group-Object Key | ForEach-Object {
    if ($_.Count -gt 1) {
        Write-Output "DUPLICATE: $($_.Name) ($($_.Count) times) at lines $(($_.Group | ForEach-Object { $_.Line }) -join ', ')"
    } else {
        Write-Output "OK: $($_.Name) at line $($_.Group[0].Line)"
    }
}
