$code = [System.IO.File]::ReadAllText("JS_Teste\game.js")
$parens = 0
$braces = 0
$brackets = 0
$inStr = $false
$strChar = ''
$inLineComm = $false
$inBlockComm = $false
$len = $code.Length

for ($i = 0; $i -lt $len; $i++) {
  $c = $code[$i]
  $next = if ($i + 1 -lt $len) { $code[$i+1] } else { '' }

  if ($inLineComm) {
    if ($c -eq "
") { $inLineComm = $false }
    continue
  }
  if ($inBlockComm) {
    if ($c -eq '*' -and $next -eq '/') { $inBlockComm = $false; $i++ }
    continue
  }
  if ($inStr) {
    if ($c -eq '\') { $i++; continue }
    if ($c -eq $strChar) { $inStr = $false }
    continue
  }

  if ($c -eq '/' -and $next -eq '/') { $inLineComm = $true; $i++; continue }
  if ($c -eq '/' -and $next -eq '*') { $inBlockComm = $true; $i++; continue }
  if ($c -eq '"' -or $c -eq "'" -or $c -eq '') {
    $inStr = $true
    $strChar = $c
    continue
  }

  if ($c -eq '(') { $parens++ }
  elseif ($c -eq ')') { $parens-- }
  elseif ($c -eq '{') { $braces++ }
  elseif ($c -eq '}') { $braces-- }
  elseif ($c -eq '[') { $brackets++ }
  elseif ($c -eq ']') { $brackets-- }
}

Write-Output "Balance check: parens=$parens, braces=$braces, brackets=$brackets"
