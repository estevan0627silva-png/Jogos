$menusPath = "JS_Teste\src\ui\menus.js"
$content = [System.IO.File]::ReadAllText($menusPath, [System.Text.Encoding]::UTF8)

$startAnchor = "const currentLvl = Math.max(1, parseInt(upgrades[key]?.level ?? 1, 10));"
$startIdx = $content.IndexOf($startAnchor)

$endAnchor = "menuContainer.add([cardGfx, cardHit, icon, nameTxt, badgeBg, badgeTxt, descTxt, actionBtn, actionTxt, upgBtn, upgTxt]);"
$endIdx = $content.IndexOf($endAnchor, $startIdx)
if ($endIdx -ge 0) {
    # include the closing brace after the add call: "\n    }"
    $closeBraceIdx = $content.IndexOf("}", $endIdx) + 1
    $newBlock = [System.IO.File]::ReadAllText("scratch\new_bs_block.txt", [System.Text.Encoding]::UTF8)

    $content = $content.Substring(0, $startIdx) + $newBlock + $content.Substring($closeBraceIdx)
    [System.IO.File]::WriteAllText($menusPath, $content, [System.Text.Encoding]::UTF8)
    Write-Output "Applied Blacksmith block cleanly!"
} else {
    Write-Error "Could not find endAnchor!"
}
