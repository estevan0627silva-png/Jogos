$html = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script src="lib/phaser.min.js"></script>
    <script src="src/art/fontAssets.js"></script>
</head>
<body style="margin:0; background:#1a1008; color:#fff;">
<div id="err" style="color:red; font-size:18px;"></div>
<div id="game"></div>
<script>
window.onerror = function(msg, url, line, col, err) {
    document.getElementById('err').innerText = 'ERROR: ' + msg + ' at ' + line + '\n' + (err ? err.stack : '');
};

const preloadedImgs = {};
let loadedCount = 0;
const keys = Object.keys(FONT_SHEETS_BASE64);

for (const k of keys) {
    const img = new Image();
    img.src = FONT_SHEETS_BASE64[k];
    preloadedImgs[k] = img;
    img.onload = () => {
        loadedCount++;
        if (loadedCount === keys.length) {
            initGame();
        }
    };
}

const xmlString = `<?xml version="1.0"?>
<font>
  <info face="Kibyra" size="32" />
  <common lineHeight="28" base="22" scaleW="256" scaleH="256" pages="1" />
  <pages>
    <page id="0" file="font_u1_yellow" />
  </pages>
  <chars count="4">
    <char id="65" x="71" y="39" width="18" height="22" xoffset="0" yoffset="0" xadvance="20" page="0" />
    <char id="66" x="103" y="39" width="18" height="22" xoffset="0" yoffset="0" xadvance="20" page="0" />
    <char id="67" x="135" y="39" width="18" height="22" xoffset="0" yoffset="0" xadvance="20" page="0" />
    <char id="32" x="0" y="0" width="0" height="0" xoffset="0" yoffset="0" xadvance="8" page="0" />
  </chars>
</font>`;

function initGame() {
    const config = {
        type: Phaser.AUTO,
        width: 600,
        height: 300,
        parent: 'game',
        backgroundColor: '#23160c',
        scene: {
            create() {
                try {
                    this.textures.addImage('font_u1_yellow', preloadedImgs.font_u1_yellow);
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
                    const frame = this.textures.get('font_u1_yellow').frames['__BASE'];
                    const fontData = Phaser.GameObjects.BitmapText.ParseXMLBitmapFont(xmlDoc, frame);
                    this.cache.bitmapFont.add('kibyra_yellow', fontData);
                    
                    this.add.bitmapText(300, 150, 'kibyra_yellow', 'A B C A B C', 32).setOrigin(0.5);
                    document.getElementById('err').innerText = 'SUCCESS! BITMAPTEXT RENDERED!';
                } catch(e) {
                    document.getElementById('err').innerText = 'ERROR: ' + e.message + '\n' + e.stack;
                }
            }
        }
    };
    new Phaser.Game(config);
}
</script>
</body>
</html>
"@

[System.IO.File]::WriteAllText("JS_Teste\test_bitmap_font.html", $html, [System.Text.Encoding]::UTF8)

$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$shot = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\test_bitmap_font.png'
$url = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_bitmap_font.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shot`"", "--window-size=960,540", "--virtual-time-budget=2000", "`"$url`"" -Wait -NoNewWindow
