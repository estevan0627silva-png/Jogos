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
// Build font images from base64
const fontImages = {};
for (const k in FONT_SHEETS_BASE64) {
    const img = new Image();
    img.src = FONT_SHEETS_BASE64[k];
    fontImages[k] = img;
}

// Color palette mapping
function getFontPalette(colorStr) {
    if (!colorStr) return 'yellow';
    const c = String(colorStr).toLowerCase();
    if (c.includes('ffca28') || c.includes('ffd700') || c.includes('ffeb3b') || c.includes('ffc107') || c.includes('yellow') || c.includes('gold')) {
        return 'yellow';
    }
    if (c.includes('2c1b10') || c.includes('8d5524') || c.includes('d6c8aa') || c.includes('a89260') || c.includes('a8987b') || c.includes('cd7f32') || c.includes('7a7265') || c.includes('brown')) {
        return 'brown';
    }
    return 'grey'; // default for white, light grey, silver, cyan, etc.
}

// Hook Phaser.GameObjects.Text.prototype.updateText
const originalUpdateText = Phaser.GameObjects.Text.prototype.updateText;

Phaser.GameObjects.Text.prototype.updateText = function() {
    // If text is empty, clear
    const text = this._text || '';
    if (!text) {
        this.canvas.width = 1;
        this.canvas.height = 1;
        this.context.clearRect(0, 0, 1, 1);
        this.updateDisplayOrigin();
        this.texture.load(this.canvas);
        return this;
    }

    // Determine scale based on fontSize
    const fontSize = parseInt(String(this.style.fontSize).replace('px', ''), 10) || 16;
    // Kibyra base glyph height is 22px.
    // So scale = fontSize / 22 (clamped between 0.5 and 2.5)
    let scale = Math.max(0.45, Math.min(2.5, fontSize / 22));
    
    // Choose palette
    const palette = getFontPalette(this.style.color);
    const u1 = fontImages['font_u1_' + palette] || fontImages['font_u1_yellow'];
    const u2 = fontImages['font_u2_' + palette] || fontImages['font_u2_yellow'];
    const sheets = [u1, u2];
    
    // Handle multiline
    const lines = text.split('\n');
    const lineHeight = Math.round(24 * scale);
    
    // Calculate total width and height
    let maxW = 0;
    const lineMetrics = lines.map(line => {
        let lineW = 0;
        for (let i = 0; i < line.length; i++) {
            const code = line.charCodeAt(i);
            const glyph = KIBYRA_FONT_CODES[code] || KIBYRA_FONT_CODES[32];
            lineW += glyph ? Math.round(glyph[5] * scale) : Math.round(8 * scale);
        }
        if (lineW > maxW) maxW = lineW;
        return lineW;
    });
    
    const pad = 4;
    const totalW = Math.max(1, maxW + pad * 2);
    const totalH = Math.max(1, lines.length * lineHeight + pad * 2);
    
    this.canvas.width = totalW;
    this.canvas.height = totalH;
    
    const ctx = this.context;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, totalW, totalH);
    
    // Render lines
    lines.forEach((line, lineIdx) => {
        let curX = pad;
        if (this.style.align === 'center') {
            curX = pad + Math.floor((maxW - lineMetrics[lineIdx]) / 2);
        } else if (this.style.align === 'right') {
            curX = pad + (maxW - lineMetrics[lineIdx]);
        }
        
        const curY = pad + lineIdx * lineHeight;
        
        for (let i = 0; i < line.length; i++) {
            const code = line.charCodeAt(i);
            const glyph = KIBYRA_FONT_CODES[code] || KIBYRA_FONT_CODES[32];
            if (!glyph) continue;
            
            const sheetIdx = glyph[0];
            const sx = glyph[1];
            const sy = glyph[2];
            const sw = glyph[3];
            const sh = glyph[4];
            const adv = Math.round(glyph[5] * scale);
            const yOff = Math.round((glyph[6] - 7) * scale);
            
            if (sw > 0 && sh > 0) {
                ctx.drawImage(sheets[sheetIdx], sx, sy, sw, sh, curX, curY + yOff, Math.round(sw * scale), Math.round(sh * scale));
            }
            curX += adv;
        }
    });
    
    this.updateDisplayOrigin();
    this.texture.load(this.canvas);
    return this;
};

// Now test with Phaser!
const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 300,
    parent: 'game',
    backgroundColor: '#1a1008',
    scene: {
        create() {
            this.add.text(300, 40, 'JORNADA DO CAVALEIRO', { fontSize: '24px', color: '#ffd700' }).setOrigin(0.5);
            this.add.text(300, 90, 'CONTINUAR JORNADA [P]', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5);
            this.add.text(300, 135, 'ÁUDIO: ATIVADO [M]', { fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);
            this.add.text(300, 180, 'TEMPO: 40s • PRATA: 150 • OURO: 320', { fontSize: '14px', color: '#d6c8aa' }).setOrigin(0.5);
            this.add.text(300, 225, '1º LUGAR: GUERREIRO DE ELDÓRIA', { fontSize: '15px', color: '#ffd700' }).setOrigin(0.5);
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

[System.IO.File]::WriteAllText("JS_Teste\test_override_text.html", $html, [System.Text.Encoding]::UTF8)

$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$shot = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\test_override_text.png'
$url = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_override_text.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shot`"", "--window-size=960,540", "--virtual-time-budget=2000", "`"$url`"" -Wait -NoNewWindow
