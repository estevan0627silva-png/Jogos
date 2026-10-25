$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$brain = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227'

# 1. Pause Menu Capture
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
            if (menuContainer) {
                menuContainer.destroy();
                menuContainer = null;
            }
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
[System.IO.File]::WriteAllText("JS_Teste\test_pause_v.html", $htmlPause, [System.Text.Encoding]::UTF8)
$shotPause = "$brain\test_screen_pause_perfect.png"
$urlPause = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_pause_v.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shotPause`"", "--window-size=960,540", "--virtual-time-budget=4000", "`"$urlPause`"" -Wait -NoNewWindow
Write-Output "Pause menu captured: $shotPause"

# 2. Settings Menu Capture
$htmlSettings = @"
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
            showSettingsMenu(scene);
        }
    }, 600);
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_settings_v.html", $htmlSettings, [System.Text.Encoding]::UTF8)
$shotSettings = "$brain\test_screen_settings_perfect.png"
$urlSettings = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_settings_v.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shotSettings`"", "--window-size=960,540", "--virtual-time-budget=4000", "`"$urlSettings`"" -Wait -NoNewWindow
Write-Output "Settings menu captured: $shotSettings"

# 3. Records Menu Capture
$htmlRecords = @"
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
            showRecordsMenu(scene);
        }
    }, 600);
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_records_v.html", $htmlRecords, [System.Text.Encoding]::UTF8)
$shotRecords = "$brain\test_screen_records_perfect.png"
$urlRecords = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_records_v.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shotRecords`"", "--window-size=960,540", "--virtual-time-budget=4000", "`"$urlRecords`"" -Wait -NoNewWindow
Write-Output "Records menu captured: $shotRecords"
