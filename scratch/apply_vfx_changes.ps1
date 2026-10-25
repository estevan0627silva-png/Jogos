# 1. combatManager.js: remove vfx_skull_burst
$cmPath = "JS_Teste\src\combat\combatManager.js"
$cm = [System.IO.File]::ReadAllText((Resolve-Path $cmPath).Path)
$skullRegex = '(?s)if \(scene && scene\.anims && scene\.anims\.exists\(''anim_vfx_skull_burst''\)\) \{.*?\}'
if ($cm -match $skullRegex) {
    $cm = $cm -replace $skullRegex, ''
    [System.IO.File]::WriteAllText((Resolve-Path $cmPath).Path, $cm)
    Write-Host "combatManager.js: removed vfx_skull_burst"
} else {
    Write-Warning "combatManager.js: vfx_skull_burst not matched"
}

# 2. main.js: remove vfx_impact_sword
$mPath = "JS_Teste\src\main.js"
$m = [System.IO.File]::ReadAllText((Resolve-Path $mPath).Path)
$impactRegex = '(?s)if \(scene\.anims && scene\.anims\.exists\(''anim_vfx_impact_sword''\)\) \{.*?\}'
if ($m -match $impactRegex) {
    $m = $m -replace $impactRegex, ''
    [System.IO.File]::WriteAllText((Resolve-Path $mPath).Path, $m)
    Write-Host "main.js: removed vfx_impact_sword"
} else {
    Write-Warning "main.js: vfx_impact_sword not matched"
}

# 3. modals.js: remove vfx_haste
$mdPath = "JS_Teste\src\ui\modals.js"
$md = [System.IO.File]::ReadAllText((Resolve-Path $mdPath).Path)
$hasteRegex = '(?s)if \(scene\.anims\.exists\(''anim_vfx_haste''\)\) \{.*?\}'
if ($md -match $hasteRegex) {
    $md = $md -replace $hasteRegex, ''
    [System.IO.File]::WriteAllText((Resolve-Path $mdPath).Path, $md)
    Write-Host "modals.js: removed vfx_haste"
} else {
    Write-Warning "modals.js: vfx_haste not matched"
}

# 4. director.js: move wave warning to float directly above player
$dirPath = "JS_Teste\src\world\director.js"
$dir = [System.IO.File]::ReadAllText((Resolve-Path $dirPath).Path)
$oldWarn = @"
  if (scene.anims && scene.anims.exists('anim_vfx_warning_yellow')) {
    const warnSprite = scene.add.sprite(GAME_WIDTH / 2, 70, 'vfx_warning_yellow')
      .setDepth(2100)
      .setScale(0.85)
      .play('anim_vfx_warning_yellow');
    scene.time.delayedCall(1600, () => { if (warnSprite && warnSprite.active) warnSprite.destroy(); });
  }
"@
$newWarn = @"
  const wx = (player && player.active) ? player.x : (GAME_WIDTH / 2);
  const wy = (player && player.active) ? (player.y - 48) : 70;
  if (scene.anims && scene.anims.exists('anim_vfx_warning_yellow')) {
    const warnSprite = scene.add.sprite(wx, wy, 'vfx_warning_yellow')
      .setDepth(2600)
      .setScale(0.7)
      .play('anim_vfx_warning_yellow');
    scene.tweens.add({
      targets: warnSprite,
      y: wy - 28,
      alpha: { from: 1, to: 0.8 },
      duration: 1600,
      ease: 'Quad.easeOut',
      onComplete: () => { if (warnSprite && warnSprite.active) warnSprite.destroy(); }
    });
  }
"@

if ($dir.Contains("const warnSprite = scene.add.sprite(GAME_WIDTH / 2, 70, 'vfx_warning_yellow')")) {
    $warnRegex = '(?s)if \(scene\.anims && scene\.anims\.exists\(''anim_vfx_warning_yellow''\)\) \{.*?scene\.time\.delayedCall\(1600,.*?\}\);?\s*\}'
    $dir = [System.Text.RegularExpressions.Regex]::Replace($dir, $warnRegex, $newWarn.Trim())
    # Also adjust floatText position for density hordes to be right over the player
    $dir = $dir.Replace("floatText(scene, GAME_WIDTH / 2, 120, 'HORDA DENSA DE GOBLINS", "floatText(scene, wx, wy - 24, 'HORDA DENSA DE GOBLINS")
    $dir = $dir.Replace("floatText(scene, GAME_WIDTH / 2, 120, 'HORDA MISTA", "floatText(scene, wx, wy - 24, 'HORDA MISTA")
    [System.IO.File]::WriteAllText((Resolve-Path $dirPath).Path, $dir)
    Write-Host "director.js: updated warning alert to float above player"
} else {
    Write-Warning "director.js: warning block pattern not found"
}
