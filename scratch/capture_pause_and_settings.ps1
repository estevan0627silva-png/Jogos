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
            launchGame();
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
$shotPause = "$brain\test_screen_pause.png"
$uriPause = ([System.Uri](Get-Item "JS_Teste\test_pause.html").FullName).AbsoluteUri
& $edge --headless --screenshot="$shotPause" --window-size=960,540 --virtual-time-budget=3500 "$uriPause"
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
[System.IO.File]::WriteAllText("JS_Teste\test_settings.html", $htmlSettings, [System.Text.Encoding]::UTF8)
$shotSettings = "$brain\test_screen_settings.png"
$uriSettings = ([System.Uri](Get-Item "JS_Teste\test_settings.html").FullName).AbsoluteUri
& $edge --headless --screenshot="$shotSettings" --window-size=960,540 --virtual-time-budget=3000 "$uriSettings"
Write-Output "Settings menu captured: $shotSettings"

# 3. Game Over / Leaderboard Capture
$htmlLeaderboard = @"
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
            const scores = [
                { name: 'HER', score: 62 },
                { name: 'VAL', score: 45 },
                { name: 'ART', score: 30 }
            ];
            showLeaderboard(scene, 'HER', scores, 'JORNADA CONCLUÍDA', { totalGoldEarned: 24, goldFromSilver: 14 });
        }
    }, 600);
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_leaderboard.html", $htmlLeaderboard, [System.Text.Encoding]::UTF8)
$shotLeaderboard = "$brain\test_screen_gameover.png"
$uriLeaderboard = ([System.Uri](Get-Item "JS_Teste\test_leaderboard.html").FullName).AbsoluteUri
& $edge --headless --screenshot="$shotLeaderboard" --window-size=960,540 --virtual-time-budget=3000 "$uriLeaderboard"
Write-Output "Leaderboard captured: $shotLeaderboard"
