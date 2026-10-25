$lines = Get-Content "JS_Teste/src/ui/hud.js"
for ($i = 213; $i -lt 275; $i++) {
    Write-Output "[$($i + 1)] $($lines[$i])"
}
