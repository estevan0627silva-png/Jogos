$files = Get-ChildItem -Recurse "JS_Teste\src" -Filter "*.js"
$total = 0
foreach ($f in $files) {
    $c = (Select-String -Path $f.FullName -Pattern "scene\.add\.text|this\.add\.text").Count
    if ($c -gt 0) {
        Write-Host "$($f.Name): $c"
        $total += $c
    }
}
Write-Host "Total calls: $total"
