$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$brain = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227'
$shotBs = "$brain\test_screen_blacksmith.png"

$htmlBs = @"
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
try {
    localStorage.removeItem('heros_path_upgrades');
} catch(e) {}
window.addEventListener('load', () => {
    setTimeout(() => {
        const scene = window.game ? window.game.scene.scenes[0] : null;
        if (scene) {
            if (typeof addGold === 'function') addGold(150);
            showBlacksmithMenu(scene);
        }
    }, 600);
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_blacksmith.html", $htmlBs, [System.Text.Encoding]::UTF8)

cmd.exe /c "`"$edge`" --headless --screenshot=`"$shotBs`" --window-size=960,540 --virtual-time-budget=3000 `"file:///f:/programação de jogos/Jogos/JS_Teste/test_blacksmith.html`""
Write-Output "Blacksmith captured!"
