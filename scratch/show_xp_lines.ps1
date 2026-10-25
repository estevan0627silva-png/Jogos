$lines = [System.IO.File]::ReadAllLines("JS_Teste/src/ui/hud.js", [System.Text.Encoding]::UTF8)
for ($i = 330; $i -lt 355; $i++) {
    Write-Output "[$($i + 1)] $($lines[$i])"
}
