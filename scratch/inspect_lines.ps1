$lines = Get-Content 'JS_Teste/src/art/uiAssets.js'
Write-Output "Total lines: $($lines.Count)"
foreach ($idx in @(8, 9, 12, 14, 15, 32)) {
    Write-Output "Line $($idx + 1): $($lines[$idx].Substring(0, [Math]::Min(60, $lines[$idx].Length)))"
}
