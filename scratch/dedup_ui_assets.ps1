$path = 'JS_Teste/src/art/uiAssets.js'
$lines = [System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)

# Find lines to keep
$keptLines = New-Object System.Collections.Generic.List[string]
$seenKeys = New-Object System.Collections.Generic.HashSet[string]

foreach ($line in $lines) {
    if ($line -match '^\s*"([^"]+)":\s*"data:image') {
        $k = $matches[1]
        if ($seenKeys.Contains($k)) {
            Write-Output "Removing duplicate key: $k"
            continue
        }
        $seenKeys.Add($k) | Out-Null
    }
    $keptLines.Add($line)
}

[System.IO.File]::WriteAllLines($path, $keptLines, [System.Text.Encoding]::UTF8)
Write-Output "Finished. Total lines now: $($keptLines.Count)"
