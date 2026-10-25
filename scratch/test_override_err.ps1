$html = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script src="lib/phaser.min.js"></script>
    <script src="src/art/fontAssets.js"></script>
    <script src="src/art/kibyraFontMap.js"></script>
</head>
<body style="margin:0; background:#1a1008; color:#fff; font-family:sans-serif;">
<div id="err" style="color:red; font-size:18px;"></div>
<div id="game"></div>
<script>
window.onerror = function(msg, url, line, col, err) {
    document.getElementById('err').innerText = 'ERROR: ' + msg + ' at line ' + line + ':' + col + '\n' + (err ? err.stack : '');
};

const fontImages = {};
for (const k in FONT_SHEETS_BASE64) {
    const img = new Image();
    img.src = FONT_SHEETS_BASE64[k];
    fontImages[k] = img;
}

const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 300,
    parent: 'game',
    backgroundColor: '#1a1008',
    scene: {
        create() {
            try {
                // Test if fontImages are ready
                const img = fontImages['font_u1_yellow'];
                document.getElementById('err').innerText = 'img complete: ' + img.complete + ', w=' + img.naturalWidth;
            } catch(e) {
                document.getElementById('err').innerText = e.message;
            }
        }
    }
};

window.addEventListener('load', () => {
    setTimeout(() => { new Phaser.Game(config); }, 100);
});
</script>
</body>
</html>
"@

[System.IO.File]::WriteAllText("JS_Teste\test_override_err.html", $html, [System.Text.Encoding]::UTF8)

$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$shot = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\test_override_err.png'
$url = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_override_err.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shot`"", "--window-size=960,540", "--virtual-time-budget=2000", "`"$url`"" -Wait -NoNewWindow
