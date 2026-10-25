$raw = [System.IO.File]::ReadAllText((Resolve-Path "JS_Teste\src\combat\combatManager.js").Path)
if ($raw.Contains("`r`n")) { Write-Host "combatManager.js is CRLF" } else { Write-Host "combatManager.js is LF" }
