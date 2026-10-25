$lines = [System.IO.File]::ReadAllLines("JS_Teste/src/ui/modals.js", [System.Text.Encoding]::UTF8)
for ($i = 250; $i -lt 366; $i++) {
    Write-Output "[$($i + 1)] $($lines[$i])"
}
