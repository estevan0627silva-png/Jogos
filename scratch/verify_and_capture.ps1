$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$brain = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227'

# 1. Death / Initials Screen (showInitials)
$htmlDeath = @"
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
            survivalTime = 142;
            runSilver = 85;
            runGold = 28;
            lastRunSummary = {
                silverCollected: 85,
                goldFromSilver: 28,
                totalGoldEarned: 28,
                newTotalGold: 140
            };
            if (menuContainer) { menuContainer.destroy(); menuContainer = null; }
            showInitials(scene);
        }
    }, 600);
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_death.html", $htmlDeath, [System.Text.Encoding]::UTF8)
$shotDeath = "$brain\test_screen_death_fixed.png"
$urlDeath = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_death.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shotDeath`"", "--window-size=960,540", "--virtual-time-budget=3000", "`"$urlDeath`"" -Wait -NoNewWindow
Write-Output "Death screen captured: $shotDeath"

# 2. Pause Menu Screen (pauseGame)
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
            if (menuContainer) { menuContainer.destroy(); menuContainer = null; }
            startGameplay(scene);
            setTimeout(() => {
                pauseGame(scene);
            }, 600);
        }
    }, 600);
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_pause.html", $htmlPause, [System.Text.Encoding]::UTF8)
$shotPause = "$brain\test_screen_pause_fixed.png"
$urlPause = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_pause.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shotPause`"", "--window-size=960,540", "--virtual-time-budget=3500", "`"$urlPause`"" -Wait -NoNewWindow
Write-Output "Pause menu captured: $shotPause"

# 3. Blacksmith Shop Screen (showBlacksmithMenu) with Padlock
$htmlSmith = @"
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
            showBlacksmithMenu(scene);
        }
    }, 600);
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_smith.html", $htmlSmith, [System.Text.Encoding]::UTF8)
$shotSmith = "$brain\test_screen_smith_padlock.png"
$urlSmith = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_smith.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shotSmith`"", "--window-size=960,540", "--virtual-time-budget=3000", "`"$urlSmith`"" -Wait -NoNewWindow
Write-Output "Blacksmith shop captured: $shotSmith"

# 4. In-Game Gameplay with HUD Padlock on locked Backpack
$htmlHud = @"
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
        }
    }, 600);
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_hud.html", $htmlHud, [System.Text.Encoding]::UTF8)
$shotHud = "$brain\test_screen_hud_padlock.png"
$urlHud = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_hud.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shotHud`"", "--window-size=960,540", "--virtual-time-budget=3000", "`"$urlHud`"" -Wait -NoNewWindow
Write-Output "In-Game HUD captured: $shotHud"
