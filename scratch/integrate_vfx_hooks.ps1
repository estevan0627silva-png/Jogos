$ErrorActionPreference = "Stop"

# 1. weapons.js -> createFirePool sprite
$wPath = 'JS_Teste\src\combat\weapons.js'
$wLines = [System.IO.File]::ReadAllLines($wPath, [System.Text.Encoding]::UTF8)
for ($i = 570; $i -lt 588; $i++) {
  if ($wLines[$i].Contains("graphics: scene.add.graphics().setDepth(-4)")) {
    $wLines[$i] = "    graphics: scene.add.graphics().setDepth(-4),"
    $insertLine = "    sprite: (scene.anims && scene.anims.exists('anim_vfx_fire_loop')) ? scene.add.sprite(x, y - 8, 'vfx_fire_loop').play('anim_vfx_fire_loop').setDepth(y - 1).setScale(0.65) : null"
    $list = New-Object System.Collections.Generic.List[string]
    for ($j = 0; $j -le $i; $j++) { $list.Add($wLines[$j]) }
    $list.Add($insertLine)
    for ($j = $i + 1; $j -lt $wLines.Length; $j++) { $list.Add($wLines[$j]) }
    [System.IO.File]::WriteAllLines($wPath, $list.ToArray(), [System.Text.Encoding]::UTF8)
    Write-Output "Integrated fire pool sprite in weapons.js!"
    break
  }
}

# 2. main.js -> slashes overlap enemies impact
$mainPath = 'JS_Teste\src\main.js'
$mainText = [System.IO.File]::ReadAllText($mainPath, [System.Text.Encoding]::UTF8)
$oldSlashDamage = "damageEnemy(scene, e, s.dmg || 1);"
$newSlashDamage = @"
damageEnemy(scene, e, s.dmg || 1);
      if (scene.anims && scene.anims.exists('anim_vfx_impact_sword')) {
        const imp = scene.add.sprite(e.x, e.y, 'vfx_impact_sword').play('anim_vfx_impact_sword').setDepth(e.y + 3).setScale(0.85);
        imp.once('animationcomplete', () => { if (imp && imp.active) imp.destroy(); });
      }
"@
if ($mainText.Contains($oldSlashDamage)) {
  $mainText = $mainText.Replace($oldSlashDamage, $newSlashDamage)
  [System.IO.File]::WriteAllText($mainPath, $mainText, [System.Text.Encoding]::UTF8)
  Write-Output "Integrated sword impact VFX in main.js!"
}

# 3. combatManager.js -> skull burst on enemy kill
$cmPath = 'JS_Teste\src\combat\combatManager.js'
$cmText = [System.IO.File]::ReadAllText($cmPath, [System.Text.Encoding]::UTF8)
$oldEnemyKillVfx = "events.on(GameEvents.ENEMY_KILLED, ({ x, y, enemyType }) => {`r`n    hitFx.explode(10, x, y);"
$oldEnemyKillVfxLF = "events.on(GameEvents.ENEMY_KILLED, ({ x, y, enemyType }) => {`n    hitFx.explode(10, x, y);"
$newEnemyKillVfx = @"
events.on(GameEvents.ENEMY_KILLED, ({ scene, x, y, enemyType }) => {
    hitFx.explode(10, x, y);
    if (scene && scene.anims && scene.anims.exists('anim_vfx_skull_burst')) {
      const skull = scene.add.sprite(x, y, 'vfx_skull_burst').setScale(0.85).play('anim_vfx_skull_burst').setDepth(y + 2);
      skull.once('animationcomplete', () => { if (skull && skull.active) skull.destroy(); });
    }
"@
if ($cmText.Contains("hitFx.explode(10, x, y);")) {
  $cmText = $cmText.Replace($oldEnemyKillVfx, $newEnemyKillVfx)
  $cmText = $cmText.Replace($oldEnemyKillVfxLF, $newEnemyKillVfx)
  [System.IO.File]::WriteAllText($cmPath, $cmText, [System.Text.Encoding]::UTF8)
  Write-Output "Integrated skull burst VFX in combatManager.js!"
}

# 4. lootManager.js -> absorb VFX on magnet orb
$lmPath = 'JS_Teste\src\combat\lootManager.js'
$lmText = [System.IO.File]::ReadAllText($lmPath, [System.Text.Encoding]::UTF8)
$oldOrbCollect = "hitFx.explode(4, ox, oy);`r`n  removeEntity(orb);"
$oldOrbCollectLF = "hitFx.explode(4, ox, oy);`n  removeEntity(orb);"
$newOrbCollect = @"
hitFx.explode(4, ox, oy);
  if (orb.magnetized && scene && scene.anims && scene.anims.exists('anim_vfx_absorb')) {
    const abs = scene.add.sprite(player.x, player.y, 'vfx_absorb').play('anim_vfx_absorb').setScale(0.6).setDepth(player.depth + 1);
    abs.once('animationcomplete', () => { if (abs && abs.active) abs.destroy(); });
  }
  removeEntity(orb);
"@
if ($lmText.Contains("hitFx.explode(4, ox, oy);")) {
  $lmText = $lmText.Replace($oldOrbCollect, $newOrbCollect)
  $lmText = $lmText.Replace($oldOrbCollectLF, $newOrbCollect)
  [System.IO.File]::WriteAllText($lmPath, $lmText, [System.Text.Encoding]::UTF8)
  Write-Output "Integrated absorb VFX in lootManager.js!"
}

# 5. modals.js -> haste and level up text VFX on card apply
$modalsPath = 'JS_Teste\src\ui\modals.js'
$modalsText = [System.IO.File]::ReadAllText($modalsPath, [System.Text.Encoding]::UTF8)
$oldCardApply = "card.apply(scene);`r`n    pendingLevelUps = Math.max(0, pendingLevelUps - 1);"
$oldCardApplyLF = "card.apply(scene);`n    pendingLevelUps = Math.max(0, pendingLevelUps - 1);"
$newCardApply = @"
card.apply(scene);
    if (scene && scene.anims && player && player.active) {
      if (scene.anims.exists('anim_vfx_haste')) {
        const haste = scene.add.sprite(player.x, player.y - 10, 'vfx_haste').play('anim_vfx_haste').setScale(0.8).setDepth(player.depth + 2);
        haste.once('animationcomplete', () => { if (haste && haste.active) haste.destroy(); });
      }
      if (scene.anims.exists('anim_vfx_levelup_text')) {
        const lvlText = scene.add.sprite(player.x, player.y - 48, 'vfx_levelup_text').play('anim_vfx_levelup_text').setScale(0.65).setDepth(2600);
        lvlText.once('animationcomplete', () => { if (lvlText && lvlText.active) lvlText.destroy(); });
      }
    }
    pendingLevelUps = Math.max(0, pendingLevelUps - 1);
"@
if ($modalsText.Contains("card.apply(scene);")) {
  $modalsText = $modalsText.Replace($oldCardApply, $newCardApply)
  $modalsText = $modalsText.Replace($oldCardApplyLF, $newCardApply)
  [System.IO.File]::WriteAllText($modalsPath, $modalsText, [System.Text.Encoding]::UTF8)
  Write-Output "Integrated haste & levelup text VFX in modals.js!"
}

Write-Output "All 5 VFX hooks integrated successfully!"
