$path = "JS_Teste\src\world\director.js"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$target = "  const up = getUpgrades();`r`n  if (up.starterWeapon"
$replace = "  // starter weapon check`r`n  if (up.starterWeapon"
if ($content.Contains($target)) {
    $content = $content.Replace($target, $replace)
    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
    Write-Output "Successfully replaced in director.js!"
} else {
    # Check with `n
    $target2 = "  const up = getUpgrades();`n  if (up.starterWeapon"
    $replace2 = "  // starter weapon check`n  if (up.starterWeapon"
    if ($content.Contains($target2)) {
        $content = $content.Replace($target2, $replace2)
        [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
        Write-Output "Successfully replaced with newline in director.js!"
    } else {
        Write-Error "Target not found in director.js"
    }
}
