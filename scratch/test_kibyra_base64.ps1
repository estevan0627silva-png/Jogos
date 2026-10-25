$html = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script src="lib/phaser.min.js"></script>
    <script src="src/art/fontAssets.js"></script>
    <script src="src/art/kibyraFontMap.js"></script>
</head>
<body style="margin:0; background:#1a1008;">
<div id="game"></div>
<script>
const fontImages = {};
for (const k in FONT_SHEETS_BASE64) {
    const img = new Image();
    img.src = FONT_SHEETS_BASE64[k];
    fontImages[k] = img;
}

function renderPixelText(ctx, text, palette, scale = 1.0) {
    const u1 = fontImages['font_u1_' + palette] || fontImages['font_u1_yellow'];
    const u2 = fontImages['font_u2_' + palette] || fontImages['font_u2_yellow'];
    const sheets = [u1, u2];
    let curX = 0;
    
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        const glyph = KIBYRA_FONT_CODES[code] || KIBYRA_FONT_CODES[32];
        if (!glyph) continue;
        
        const sheetIdx = glyph[0];
        const sx = glyph[1];
        const sy = glyph[2];
        const sw = glyph[3];
        const sh = glyph[4];
        const adv = glyph[5] * scale;
        const yOff = (glyph[6] - 7) * scale;
        
        if (sw > 0 && sh > 0) {
            ctx.drawImage(sheets[sheetIdx], sx, sy, sw, sh, curX, yOff, sw * scale, sh * scale);
        }
        curX += adv;
    }
    return curX;
}

const config = {
    type: Phaser.AUTO,
    width: 700,
    height: 350,
    parent: 'game',
    backgroundColor: '#23160c',
    scene: {
        create() {
            const c = document.createElement('canvas');
            c.width = 660;
            c.height = 300;
            const ctx = c.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            
            ctx.save();
            ctx.translate(20, 20);
            renderPixelText(ctx, 'JORNADA DO CAVALEIRO', 'yellow', 1.0);
            ctx.translate(0, 44);
            renderPixelText(ctx, 'CONTINUAR JORNADA [P]', 'grey', 0.9);
            ctx.translate(0, 38);
            renderPixelText(ctx, 'FORJA DO FERREIRO', 'yellow', 0.85);
            ctx.translate(0, 36);
            renderPixelText(ctx, 'TEMPO: 40s   PRATA: 150   OURO: 320', 'brown', 0.8);
            ctx.translate(0, 34);
            renderPixelText(ctx, 'SANTUARIO DO MAGO - UPGRADE NV. 2', 'grey', 0.75);
            ctx.restore();
            
            this.textures.addCanvas('test_pixel_canvas', c);
            this.add.image(350, 175, 'test_pixel_canvas');
        }
    }
};

window.addEventListener('load', () => {
    // Wait tiny delay for data URIs
    setTimeout(() => { new Phaser.Game(config); }, 100);
});
</script>
</body>
</html>
"@

[System.IO.File]::WriteAllText("JS_Teste\test_kibyra_base64.html", $html, [System.Text.Encoding]::UTF8)

$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$shot = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\test_kibyra_base64.png'
$url = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_kibyra_base64.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shot`"", "--window-size=960,540", "--virtual-time-budget=2000", "`"$url`"" -Wait -NoNewWindow
