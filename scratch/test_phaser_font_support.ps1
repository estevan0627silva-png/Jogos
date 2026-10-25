$html = @"
<!DOCTYPE html>
<html>
<head>
    <script src="lib/phaser.min.js"></script>
</head>
<body>
<div id="out"></div>
<script>
window.addEventListener('load', () => {
    const keys = [];
    if (Phaser.GameObjects.RetroFont) keys.push('RetroFont');
    if (Phaser.GameObjects.BitmapText.ParseRetroFont) keys.push('ParseRetroFont');
    if (Phaser.GameObjects.BitmapText.ParseXMLBitmapFont) keys.push('ParseXMLBitmapFont');
    if (Phaser.Textures.Parsers) keys.push('Parsers');
    document.getElementById('out').innerText = 'Phaser features: ' + keys.join(', ');
});
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("JS_Teste\test_phaser_font.html", $html, [System.Text.Encoding]::UTF8)

$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$shot = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\test_phaser_font.png'
$url = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_phaser_font.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shot`"", "--window-size=960,540", "--virtual-time-budget=2000", "`"$url`"" -Wait -NoNewWindow
