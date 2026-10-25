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
    const fnStr = Phaser.GameObjects.Text.prototype.updateText.toString();
    // Split into 500-char chunks to see all of it
    const pre = document.createElement('pre');
    pre.style.fontSize = '11px';
    pre.style.whiteSpace = 'pre-wrap';
    pre.innerText = fnStr;
    document.body.appendChild(pre);
});
</script>
</body>
</html>
"@

[System.IO.File]::WriteAllText("JS_Teste\test_view_updatetext.html", $html, [System.Text.Encoding]::UTF8)

$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$shot = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\test_view_updatetext.png'
$url = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_view_updatetext.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shot`"", "--window-size=960,540", "--virtual-time-budget=2000", "`"$url`"" -Wait -NoNewWindow
