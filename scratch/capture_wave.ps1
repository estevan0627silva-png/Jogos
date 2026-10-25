$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$brain = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227'

$htmlWave = @"
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
                triggerHorde(scene, 1);
            }, 300);
        }
    }, 400);
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_wave.html", $htmlWave, [System.Text.Encoding]::UTF8)
$shotWave = "$brain\test_screen_wave_alert.png"
$urlWave = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_wave.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shotWave`"", "--window-size=960,540", "--virtual-time-budget=2000", "`"$urlWave`"" -Wait -NoNewWindow
Write-Output "Wave alert captured: $shotWave"
