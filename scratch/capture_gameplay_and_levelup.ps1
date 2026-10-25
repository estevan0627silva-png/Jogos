$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$brain = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227'
$shotGameplay = "$brain\test_screen_gameplay.png"
$shotLevelUp = "$brain\test_screen_levelup.png"

# HTML for Gameplay
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
            startGameplay(scene);
        }
    }, 600);
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_gameplay.html", $htmlGame, [System.Text.Encoding]::UTF8)

# HTML for LevelUp
$htmlLvl = @"
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
            startGameplay(scene);
            setTimeout(() => {
                showLevelUpMenu(scene, () => {});
            }, 300);
        }
    }, 600);
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_levelup.html", $htmlLvl, [System.Text.Encoding]::UTF8)

cmd.exe /c "`"$edge`" --headless --screenshot=`"$shotGameplay`" --window-size=960,540 --virtual-time-budget=3000 `"file:///f:/programação de jogos/Jogos/JS_Teste/test_gameplay.html`""
cmd.exe /c "`"$edge`" --headless --screenshot=`"$shotLevelUp`" --window-size=960,540 --virtual-time-budget=3500 `"file:///f:/programação de jogos/Jogos/JS_Teste/test_levelup.html`""

Write-Output "Captured gameplay and levelup!"
