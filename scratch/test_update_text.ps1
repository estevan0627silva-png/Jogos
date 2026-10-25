$html = @"
<!DOCTYPE html>
<html>
<head>
    <script src="lib/phaser.min.js"></script>
</head>
<body>
<pre id="out"></pre>
<script>
window.addEventListener('load', () => {
    document.getElementById('out').innerText = Phaser.GameObjects.Text.prototype.updateText.toString();
});
</script>
</body>
</html>
"@

[System.IO.File]::WriteAllText("JS_Teste\test_update_text.html", $html, [System.Text.Encoding]::UTF8)

$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$shot = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\test_update_text.png'
$url = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_update_text.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shot`"", "--window-size=960,540", "--virtual-time-budget=2000", "`"$url`"" -Wait -NoNewWindow
