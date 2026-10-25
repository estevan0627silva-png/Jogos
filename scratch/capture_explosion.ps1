$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$brain = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227'
$shotExp = "$brain\test_screen_explosion.png"

$htmlExp = @"
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
            if (menuContainer) { menuContainer.destroy(); menuContainer = null; }
            startGameplay(scene);
            setTimeout(() => {
                explodeFireball(scene, 480, 270, 48, 1);
            }, 300);
        }
    }, 600);
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_explosion.html", $htmlExp, [System.Text.Encoding]::UTF8)

cmd.exe /c "`"$edge`" --headless --screenshot=`"$shotExp`" --window-size=960,540 --virtual-time-budget=1200 `"file:///f:/programação de jogos/Jogos/JS_Teste/test_explosion.html`""
Write-Output "Explosion captured!"
