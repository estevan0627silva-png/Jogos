$base = "..\IMAGENS\ASSETs\Super Pixel Effects Gigapack (Free Version) v3.1.0\Super Pixel Effects Gigapack (Free Version)\spritesheet"

$checks = @(
  "Fantasy Spells\spell_haste_001\spell_haste_001_large_green",
  "Impacts\directional_impact_002\directional_impact_002_large_white",
  "Smoke Bursts\stylized_skull_smoke_burst_001\stylized_skull_smoke_burst_001_large_white",
  "Symbols\symbol_level_up_text_001\symbol_level_up_text_001_large_yellow",
  "Fire\fire_looping_003A\fire_looping_003A_large_orange"
)

foreach ($c in $checks) {
  $txt = Join-Path $base "$c\spritesheet.txt"
  if (Test-Path $txt) {
    $lines = Get-Content $txt
    $first = $lines[0]
    $last = $lines[-1]
    Write-Output "=== $c ==="
    Write-Output "Count: $($lines.Count) frames"
    Write-Output "First: $first"
    Write-Output "Last:  $last"
  } else {
    Write-Output "NOT FOUND: $txt"
  }
}
