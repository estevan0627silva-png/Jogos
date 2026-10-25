$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$brain = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227'

$htmlVfx = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script src="lib/phaser.min.js"></script>
    <script src="game.js"></script>
</head>
<body style="margin:0; background:#000;">
<div id="game-container"></div>
<script>
window.addEventListener('load', () => {
    setTimeout(() => {
        const scene = window.game ? window.game.scene.scenes[0] : null;
        if (scene) {
            if (menuContainer) {
                menuContainer.destroy();
                menuContainer = null;
            }
            startGameplay(scene);

            setTimeout(() => {
                // 1. Spawns skull burst at player.x + 80
                const skull = scene.add.sprite(player.x + 80, player.y, 'vfx_skull_burst').setScale(1.2).play('anim_vfx_skull_burst').setDepth(3000);
                
                // 2. Spawns levelup text and haste aura on player
                const haste = scene.add.sprite(player.x, player.y - 10, 'vfx_haste').play('anim_vfx_haste').setScale(0.9).setDepth(3000);
                const lvlText = scene.add.sprite(player.x + 10, player.y - 48, 'vfx_levelup_text').play('anim_vfx_levelup_text').setScale(0.7).setDepth(3000);

                // 3. Spawns sword impact at player.x + 40
                const imp = scene.add.sprite(player.x + 40, player.y, 'vfx_impact_sword').play('anim_vfx_impact_sword').setScale(1.1).setDepth(3000);
            }, 500);
        }
    }, 600);
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_vfx.html", $htmlVfx, [System.Text.Encoding]::UTF8)
$shotVfx = "$brain\test_screen_vfx_all.png"
$urlVfx = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_vfx.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shotVfx`"", "--window-size=960,540", "--virtual-time-budget=4000", "`"$urlVfx`"" -Wait -NoNewWindow
Write-Output "VFX test captured: $shotVfx"
