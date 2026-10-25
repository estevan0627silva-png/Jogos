$lines = Get-Content 'JS_Teste/src/art/uiAssets.js'
for ($i = 0; $i -lt 55; $i++) {
    if ($lines[$i] -match '^\s*"([^"]+)":\s*"data:image/([^;]+);base64,([A-Za-z0-9+/=]+)') {
        $key = $matches[1]
        $b64Len = $matches[3].Length
        Write-Output "[$($i + 1)] $key (len $b64Len)"
    } else {
        Write-Output "[$($i + 1)] $($lines[$i])"
    }
}
