$hudLines = [System.IO.File]::ReadAllLines('JS_Teste/src/ui/hud.js', [System.Text.Encoding]::UTF8)
$panelLines = [System.IO.File]::ReadAllLines('scratch/hud_panels.txt', [System.Text.Encoding]::UTF8)
$xpLines = [System.IO.File]::ReadAllLines('scratch/xp_frame.txt', [System.Text.Encoding]::UTF8)

$result = New-Object System.Collections.Generic.List[string]

# Copy up to line 214 (index 214)
for ($i = 0; $i -lt 215; $i++) {
    $result.Add($hudLines[$i])
}

# Insert new panels
foreach ($pl in $panelLines) {
    $result.Add($pl)
}

# Find xpFrame in hudLines
$xpIndex = -1
for ($i = 274; $i -lt $hudLines.Length; $i++) {
    if ($hudLines[$i] -match 'const xpFrame = scene\.add\.graphics') {
        $xpIndex = $i
        break
    }
}

if ($xpIndex -eq -1) {
    Write-Error "xpFrame not found!"
    exit 1
}

# Copy between line 275 and xpIndex
for ($i = 275; $i -lt ($xpIndex - 1); $i++) {
    $result.Add($hudLines[$i])
}

# Insert new xp frame
foreach ($xl in $xpLines) {
    $result.Add($xl)
}

# Find after xpFrame
$afterXpIndex = -1
for ($i = $xpIndex; $i -lt $hudLines.Length; $i++) {
    if ($hudLines[$i] -match 'hudXpBar = scene\.add\.graphics\(\);') {
        $afterXpIndex = $i
        break
    }
}

for ($i = $afterXpIndex; $i -lt $hudLines.Length; $i++) {
    $result.Add($hudLines[$i])
}

[System.IO.File]::WriteAllLines('JS_Teste/src/ui/hud.js', $result, [System.Text.Encoding]::UTF8)
Write-Output "hud.js successfully patched! Total lines: $($result.Count)"
