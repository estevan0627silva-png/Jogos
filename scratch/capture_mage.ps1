$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$brain = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227'

$htmlMage = @"
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
            showMageShopMenu(scene);
        }
    }, 600);
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_mage.html", $htmlMage, [System.Text.Encoding]::UTF8)
$shotMage = "$brain\test_screen_mage_padlock.png"
$urlMage = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_mage.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shotMage`"", "--window-size=960,540", "--virtual-time-budget=3000", "`"$urlMage`"" -Wait -NoNewWindow
Write-Output "Mage shop captured: $shotMage"
