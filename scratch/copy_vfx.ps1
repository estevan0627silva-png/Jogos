$base = "..\IMAGENS\ASSETs\Super Pixel Effects Gigapack (Free Version) v3.1.0\Super Pixel Effects Gigapack (Free Version)\spritesheet"

Copy-Item (Join-Path $base "Fantasy Spells\spell_absorb_001\spell_absorb_001_large_violet\spritesheet.png") "JS_Teste\assets\vfx\vfx_absorb.png" -Force
Copy-Item (Join-Path $base "Fantasy Spells\spell_haste_001\spell_haste_001_large_green\spritesheet.png") "JS_Teste\assets\vfx\vfx_haste.png" -Force
Copy-Item (Join-Path $base "Impacts\directional_impact_002\directional_impact_002_large_white\spritesheet.png") "JS_Teste\assets\vfx\vfx_impact_sword.png" -Force
Copy-Item (Join-Path $base "Smoke Bursts\stylized_skull_smoke_burst_001\stylized_skull_smoke_burst_001_large_white\spritesheet.png") "JS_Teste\assets\vfx\vfx_skull_burst.png" -Force

Get-ChildItem "JS_Teste\assets\vfx" | Select-Object Name, Length
