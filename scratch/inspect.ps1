$lines = Get-Content 'JS_Teste\src\ui\menus.js'
for ($i=160; $i -le 175; $i++) {
  Write-Output "[$i] $($lines[$i])"
}
