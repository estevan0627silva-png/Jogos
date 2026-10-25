$modLines = [System.IO.File]::ReadAllLines('JS_Teste/src/ui/modals.js', [System.Text.Encoding]::UTF8)
$bannerLines = [System.IO.File]::ReadAllLines('scratch/modal_banner.txt', [System.Text.Encoding]::UTF8)

$result = New-Object System.Collections.Generic.List[string]

# Copy up to line 252 (index 252)
for ($i = 0; $i -lt 252; $i++) {
    $result.Add($modLines[$i])
}

# Insert new banner
foreach ($bl in $bannerLines) {
    $result.Add($bl)
}

# Copy from line 269 (index 268) to end, updating cardY if found
for ($i = 268; $i -lt $modLines.Length; $i++) {
    $line = $modLines[$i]
    if ($line -match 'const cardY = 308;') {
        $result.Add('  const cardY = 316;')
    } else {
        $result.Add($line)
    }
}

[System.IO.File]::WriteAllLines('JS_Teste/src/ui/modals.js', $result, [System.Text.Encoding]::UTF8)
Write-Output "modals.js successfully updated! Total lines: $($result.Count)"
