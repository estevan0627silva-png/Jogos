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
    const proto = Phaser.GameObjects.Text.prototype;
    const methods = Object.getOwnPropertyNames(proto).filter(m => typeof proto[m] === 'function');
    document.getElementById('out').innerText = 'Methods: ' + methods.join(', ');
});
</script>
</body>
</html>
"@

[System.IO.File]::WriteAllText("JS_Teste\test_text_proto.html", $html, [System.Text.Encoding]::UTF8)

$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$shot = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\test_text_proto.png'
$url = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_text_proto.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shot`"", "--window-size=960,540", "--virtual-time-budget=2000", "`"$url`"" -Wait -NoNewWindow
