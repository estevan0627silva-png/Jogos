$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$brain = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227'

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
            lastRunSummary = { silverCollected: 72, totalGoldEarned: 24, goldFromSilver: 24 };
            const scores = [
                { name: 'HER', score: 62 },
                { name: 'VAL', score: 45 },
                { name: 'ART', score: 30 },
                { name: 'LEO', score: 20 },
                { name: 'MAX', score: 12 }
            ];
            showLeaderboard(scene, scores, 'HER');
        }
    }, 600);
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_leaderboard.html", $htmlLeaderboard, [System.Text.Encoding]::UTF8)
$shotLeaderboard = "$brain\test_screen_gameover.png"
$urlLeaderboard = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_leaderboard.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shotLeaderboard`"", "--window-size=960,540", "--virtual-time-budget=3000", "`"$urlLeaderboard`"" -Wait -NoNewWindow
Write-Output "Leaderboard captured: $shotLeaderboard"
