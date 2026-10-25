# 1. combatManager.js
$cmPath = "JS_Teste\src\combat\combatManager.js"
$cm = [System.IO.File]::ReadAllText((Resolve-Path $cmPath).Path)
$cm = $cm.Replace("hitFx.explode(10, x, y);`r`n    );`r`n    }`r`n    if (enemyType", "hitFx.explode(10, x, y);`r`n    if (enemyType")
$cm = $cm.Replace("hitFx.explode(10, x, y);`n    );`n    }`n    if (enemyType", "hitFx.explode(10, x, y);`n    if (enemyType")
[System.IO.File]::WriteAllText((Resolve-Path $cmPath).Path, $cm)
Write-Host "Fixed combatManager.js"

# 2. main.js
$mPath = "JS_Teste\src\main.js"
$m = [System.IO.File]::ReadAllText((Resolve-Path $mPath).Path)
$m = $m.Replace("damageEnemy(scene, e, s.dmg || 1);`r`n      );`r`n      }`r`n      // Regra 22:", "damageEnemy(scene, e, s.dmg || 1);`r`n      // Regra 22:")
$m = $m.Replace("damageEnemy(scene, e, s.dmg || 1);`n      );`n      }`n      // Regra 22:", "damageEnemy(scene, e, s.dmg || 1);`n      // Regra 22:")
[System.IO.File]::WriteAllText((Resolve-Path $mPath).Path, $m)
Write-Host "Fixed main.js"

# 3. modals.js
$mdPath = "JS_Teste\src\ui\modals.js"
$md = [System.IO.File]::ReadAllText((Resolve-Path $mdPath).Path)
$md = $md.Replace("if (scene && scene.anims && player && player.active) {`r`n      );`r`n      }`r`n      if (scene.anims.exists('anim_vfx_levelup_text'))", "if (scene && scene.anims && player && player.active) {`r`n      if (scene.anims.exists('anim_vfx_levelup_text'))")
$md = $md.Replace("if (scene && scene.anims && player && player.active) {`n      );`n      }`n      if (scene.anims.exists('anim_vfx_levelup_text'))", "if (scene && scene.anims && player && player.active) {`n      if (scene.anims.exists('anim_vfx_levelup_text'))")
[System.IO.File]::WriteAllText((Resolve-Path $mdPath).Path, $md)
Write-Host "Fixed modals.js"
