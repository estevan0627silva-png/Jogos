Add-Type -AssemblyName System.Drawing
$baseDir = '..\IMAGENS\ASSETs\Super Pixel Effects Gigapack (Free Version) v3.1.0\Super Pixel Effects Gigapack (Free Version)\spritesheet'
$files = @(
  'Fantasy Spells\spell_absorb_001\spell_absorb_001_large_violet\spell_absorb_001_large_violet.png',
  'Fantasy Spells\spell_haste_001\spell_haste_001_large_green\spell_haste_001_large_green.png',
  'Impacts\directional_impact_002\directional_impact_002_large_white\directional_impact_002_large_white.png',
  'Smoke Bursts\stylized_skull_smoke_burst_001\stylized_skull_smoke_burst_001_large_white\stylized_skull_smoke_burst_001_large_white.png',
  'Symbols\symbol_level_up_text_001\symbol_level_up_text_001_large_yellow\symbol_level_up_text_001_large_yellow.png'
)

foreach ($f in $files) {
  $path = Join-Path $baseDir $f
  if (Test-Path $path) {
    $img = [System.Drawing.Image]::FromFile($path)
    Write-Output "$f : $($img.Width)x$($img.Height)"
    $img.Dispose()
  } else {
    Write-Output "NOT FOUND: $f"
  }
}
