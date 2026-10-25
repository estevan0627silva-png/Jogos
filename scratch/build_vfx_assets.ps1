$ErrorActionPreference = "Stop"

$vfxDir = "JS_Teste\assets\vfx"
$vfxJsPath = "JS_Teste\src\art\vfxAssets.js"

function Get-Base64($fileName) {
  $path = Join-Path $vfxDir $fileName
  if (-not (Test-Path $path)) { throw "File not found: $path" }
  $bytes = [System.IO.File]::ReadAllBytes($path)
  return "data:image/png;base64," + [Convert]::ToBase64String($bytes)
}

$keys = @(
  @{ key = "vfx_explosion"; file = "vfx_explosion.png"; w = 96; h = 96; frames = 11; rate = 24; hide = $true; repeat = 0 },
  @{ key = "vfx_fire_loop"; file = "vfx_fire_loop.png"; w = 80; h = 128; frames = 4; rate = 12; hide = $false; repeat = -1 },
  @{ key = "vfx_lightning_aura"; file = "vfx_lightning_aura.png"; w = 96; h = 96; frames = 15; rate = 20; hide = $false; repeat = -1 },
  @{ key = "vfx_alert_red"; file = "vfx_alert_red.png"; w = 80; h = 80; frames = 13; rate = 18; hide = $false; repeat = -1 },
  @{ key = "vfx_warning_yellow"; file = "vfx_warning_yellow.png"; w = 80; h = 80; frames = 59; rate = 30; hide = $false; repeat = -1 },
  @{ key = "vfx_levelup_text"; file = "vfx_levelup_text.png"; w = 320; h = 128; frames = 43; rate = 24; hide = $true; repeat = 0 },
  @{ key = "vfx_absorb"; file = "vfx_absorb.png"; w = 128; h = 128; frames = 30; rate = 24; hide = $true; repeat = 0 },
  @{ key = "vfx_haste"; file = "vfx_haste.png"; w = 128; h = 128; frames = 28; rate = 24; hide = $true; repeat = 0 },
  @{ key = "vfx_impact_sword"; file = "vfx_impact_sword.png"; w = 140; h = 50; frames = 6; rate = 20; hide = $true; repeat = 0 },
  @{ key = "vfx_skull_burst"; file = "vfx_skull_burst.png"; w = 64; h = 64; frames = 11; rate = 20; hide = $true; repeat = 0 }
)

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine("// =============================================================================")
[void]$sb.AppendLine("// SUPER PIXEL EFFECTS GIGAPACK - DICIONARIO BASE64 OFICIAL (GDD v1.0)")
[void]$sb.AppendLine("// Suporte universal 100% autossuficiente (Web Server, file://, Itch.io e Mobile)")
[void]$sb.AppendLine("// =============================================================================")
[void]$sb.AppendLine("const SUPER_PIXEL_VFX = {")

for ($i = 0; $i -lt $keys.Count; $i++) {
  $k = $keys[$i]
  $b64 = Get-Base64 $k.file
  $comma = if ($i -lt $keys.Count - 1) { "," } else { "" }
  [void]$sb.AppendLine("  `"$($k.key)`": `"$b64`"$comma")
}

[void]$sb.AppendLine("};")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("function registerSuperPixelVFX(scene) {")
[void]$sb.AppendLine("  if (!scene || !scene.load) return;")
[void]$sb.AppendLine("  const vfxConfigs = [")

for ($i = 0; $i -lt $keys.Count; $i++) {
  $k = $keys[$i]
  $comma = if ($i -lt $keys.Count - 1) { "," } else { "" }
  [void]$sb.AppendLine("    { key: '$($k.key)', frameWidth: $($k.w), frameHeight: $($k.h) }$comma")
}

[void]$sb.AppendLine("  ];")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("  vfxConfigs.forEach(cfg => {")
[void]$sb.AppendLine("    if (scene.textures && !scene.textures.exists(cfg.key)) {")
[void]$sb.AppendLine("      if (typeof SUPER_PIXEL_VFX !== 'undefined' && SUPER_PIXEL_VFX[cfg.key]) {")
[void]$sb.AppendLine("        scene.load.spritesheet(cfg.key, SUPER_PIXEL_VFX[cfg.key], {")
[void]$sb.AppendLine("          frameWidth: cfg.frameWidth,")
[void]$sb.AppendLine("          frameHeight: cfg.frameHeight")
[void]$sb.AppendLine("        });")
[void]$sb.AppendLine("      } else {")
[void]$sb.AppendLine("        scene.load.spritesheet(cfg.key, 'assets/vfx/' + cfg.key + '.png', {")
[void]$sb.AppendLine("          frameWidth: cfg.frameWidth,")
[void]$sb.AppendLine("          frameHeight: cfg.frameHeight")
[void]$sb.AppendLine("        });")
[void]$sb.AppendLine("      }")
[void]$sb.AppendLine("    }")
[void]$sb.AppendLine("  });")
[void]$sb.AppendLine("}")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("function createVFXAnimations(scene) {")
[void]$sb.AppendLine("  if (!scene || !scene.anims) return;")

foreach ($k in $keys) {
  $animKey = "anim_" + $k.key
  [void]$sb.AppendLine("  if (!scene.anims.exists('$animKey') && scene.textures.exists('$($k.key)')) {")
  [void]$sb.AppendLine("    scene.anims.create({")
  [void]$sb.AppendLine("      key: '$animKey',")
  [void]$sb.AppendLine("      frames: scene.anims.generateFrameNumbers('$($k.key)', { start: 0, end: $($k.frames) }),")
  [void]$sb.AppendLine("      frameRate: $($k.rate),")
  if ($k.repeat -eq -1) {
    [void]$sb.AppendLine("      repeat: -1")
  } else {
    [void]$sb.AppendLine("      hideOnComplete: true")
  }
  [void]$sb.AppendLine("    });")
  [void]$sb.AppendLine("  }")
}

[void]$sb.AppendLine("}")

[System.IO.File]::WriteAllText($vfxJsPath, $sb.ToString(), [System.Text.Encoding]::UTF8)
Write-Output "Successfully built vfxAssets.js with all 10 Super Pixel VFX!"
