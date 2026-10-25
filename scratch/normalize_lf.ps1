Get-ChildItem -Path "JS_Teste\src" -Recurse -Filter "*.js" | ForEach-Object {
    $text = [System.IO.File]::ReadAllText($_.FullName)
    $text = $text.Replace("`r`n", "`n")
    [System.IO.File]::WriteAllText($_.FullName, $text)
}
Write-Host "Normalized all src/*.js line endings to LF."
