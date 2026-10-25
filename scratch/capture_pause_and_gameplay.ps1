$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$brain = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227'

# 1. Capture Pause Menu
$htmlPause = @"
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
            survivalTime = 120;
            runSilver = 45;
            if (menuContainer) { menuContainer.destroy(); menuContainer = null; }
            startGameplay(scene);
            setTimeout(() => {
                pauseGame(scene);
            }, 500);
        }
    }, 600);
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_pause.html", $htmlPause, [System.Text.Encoding]::UTF8)
$shotPause = "$brain\test_screen_pause_new.png"
$urlPause = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_pause.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shotPause`"", "--window-size=960,540", "--virtual-time-budget=3500", "`"$urlPause`"" -Wait -NoNewWindow
Write-Output "Pause menu captured: $shotPause"

# 2. Capture Gameplay with Cajado equipped & locked backpack (Padlock only, NO "BLOQ")
$htmlGame = @"
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
                equipWeaponBuff(scene, 'firestaff', false);
            }, 600);
        }
    }, 600);
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_game.html", $htmlGame, [System.Text.Encoding]::UTF8)
$shotGame = "$brain\test_screen_gameplay_cajado.png"
$urlGame = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_game.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shotGame`"", "--window-size=960,540", "--virtual-time-budget=3500", "`"$urlGame`"" -Wait -NoNewWindow
Write-Output "Gameplay with cajado captured: $shotGame"
