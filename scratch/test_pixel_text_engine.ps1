$html = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script src="lib/phaser.min.js"></script>
    <script src="src/art/fontAssets.js"></script>
    <script src="src/art/kibyraFontMap.js"></script>
</head>
<body style="margin:0; background:#1a1008; color:#fff;">
<div id="err" style="color:red; font-size:16px;"></div>
<div id="game"></div>
<script>
window.onerror = function(msg, url, line, col, err) {
    document.getElementById('err').innerText = 'ERROR: ' + msg + ' at ' + line + '\n' + (err ? err.stack : '');
};

const fontImages = {};
for (const k in FONT_SHEETS_BASE64) {
    const img = new Image();
    img.src = FONT_SHEETS_BASE64[k];
    fontImages[k] = img;
}

function getPaletteName(colorStr) {
    if (!colorStr) return 'yellow';
    const c = String(colorStr).toLowerCase();
    if (c.includes('ffca28') || c.includes('ffd700') || c.includes('ffeb3b') || c.includes('ffc107') || c.includes('yellow') || c.includes('gold')) {
        return 'yellow';
    }
    if (c.includes('2c1b10') || c.includes('8d5524') || c.includes('d6c8aa') || c.includes('a89260') || c.includes('a8987b') || c.includes('cd7f32') || c.includes('7a7265') || c.includes('brown')) {
        return 'brown';
    }
    return 'grey';
}

let _pixelTextId = 0;

class PixelText extends Phaser.GameObjects.Image {
    constructor(scene, x, y, text = '', style = {}) {
        _pixelTextId++;
        const textureKey = '__pixel_text_' + _pixelTextId;
        const canvasTex = scene.textures.createCanvas(textureKey, 32, 32);
        super(scene, x, y, textureKey);
        
        this.canvasTexture = canvasTex;
        this.canvas = canvasTex.canvas;
        this.ctx = canvasTex.context;
        this.textureKey = textureKey;
        this._text = String(text != null ? text : '');
        this.style = Object.assign({
            fontSize: '16px',
            color: '#ffffff',
            align: 'left',
            lineSpacing: 4
        }, style);
        
        this.renderText();
        scene.add.existing(this);
    }
    
    get text() { return this._text; }
    set text(val) { this.setText(val); }
    
    setText(newText) {
        const str = String(newText != null ? newText : '');
        if (str === this._text) return this;
        this._text = str;
        this.renderText();
        return this;
    }
    
    setColor(newColor) {
        this.style.color = newColor;
        this.renderText();
        return this;
    }
    
    setFontSize(newSize) {
        this.style.fontSize = typeof newSize === 'number' ? (newSize + 'px') : newSize;
        this.renderText();
        return this;
    }
    
    renderText() {
        if (!this.canvasTexture || !this._text) {
            if (this.canvasTexture) {
                this.canvasTexture.setSize(1, 1);
                this.canvasTexture.refresh();
            }
            return;
        }
        
        const fontSize = parseInt(String(this.style.fontSize).replace('px', ''), 10) || 16;
        const scale = Math.max(0.4, Math.min(2.5, fontSize / 22));
        const palette = getPaletteName(this.style.color);
        
        const u1 = fontImages['font_u1_' + palette] || fontImages['font_u1_yellow'];
        const u2 = fontImages['font_u2_' + palette] || fontImages['font_u2_yellow'];
        const sheets = [u1, u2];
        
        const lines = this._text.split('\n');
        const lineHeight = Math.round(26 * scale + (this.style.lineSpacing || 0));
        
        // Measure lines with NFD normalization
        let maxW = 0;
        const lineMetrics = lines.map(line => {
            let lineW = 0;
            for (let i = 0; i < line.length; i++) {
                const norm = line[i].normalize('NFD');
                const baseCh = norm[0];
                const code = (baseCh === 'c' && norm.includes('\u0327')) ? 231 : ((baseCh === 'C' && norm.includes('\u0327')) ? 199 : baseCh.charCodeAt(0));
                const glyph = KIBYRA_FONT_CODES[code] || KIBYRA_FONT_CODES[32];
                lineW += glyph ? Math.round(glyph[5] * scale) : Math.round(8 * scale);
            }
            if (lineW > maxW) maxW = lineW;
            return lineW;
        });
        
        const padX = 2;
        const padY = 2;
        const totalW = Math.max(1, maxW + padX * 2);
        const totalH = Math.max(1, lines.length * lineHeight + padY * 2);
        
        this.canvasTexture.setSize(totalW, totalH);
        const ctx = this.ctx;
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, totalW, totalH);
        
        const colorLower = String(this.style.color || '').toLowerCase();
        let tintR = 1, tintG = 1, tintB = 1;
        let needsTint = false;
        if (colorLower.includes('ff5252') || colorLower.includes('f44336') || colorLower.includes('red')) {
            needsTint = true; tintR = 1.0; tintG = 0.28; tintB = 0.28;
        } else if (colorLower.includes('4caf50') || colorLower.includes('81c784') || colorLower.includes('green')) {
            needsTint = true; tintR = 0.35; tintG = 1.0; tintB = 0.45;
        } else if (colorLower.includes('7fe7ff') || colorLower.includes('29b6f6') || colorLower.includes('cyan')) {
            needsTint = true; tintR = 0.45; tintG = 0.9; tintB = 1.0;
        } else if (colorLower.includes('b388ff') || colorLower.includes('purple')) {
            needsTint = true; tintR = 0.75; tintG = 0.5; tintB = 1.0;
        }
        
        lines.forEach((line, lineIdx) => {
            let curX = padX;
            if (this.style.align === 'center') {
                curX = padX + Math.floor((maxW - lineMetrics[lineIdx]) / 2);
            } else if (this.style.align === 'right') {
                curX = padX + (maxW - lineMetrics[lineIdx]);
            }
            const curY = padY + lineIdx * lineHeight;
            
            for (let i = 0; i < line.length; i++) {
                const rawCh = line[i];
                const norm = rawCh.normalize('NFD');
                const baseCh = norm[0];
                const isCedilla = norm.includes('\u0327');
                const isTilde = norm.includes('\u0303');
                const isAcute = norm.includes('\u0301');
                const isCirc = norm.includes('\u0302');
                
                let code = baseCh.charCodeAt(0);
                if (isCedilla && (baseCh === 'c' || baseCh === 'C')) {
                    code = (baseCh === 'C') ? 199 : 231;
                } else if (isTilde && (baseCh === 'n' || baseCh === 'N')) {
                    code = (baseCh === 'N') ? 209 : 241;
                }
                
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
                    
                    // Draw acute accent if needed
                    if (isAcute) {
                        ctx.fillStyle = (palette === 'yellow') ? '#ffd700' : (palette === 'brown' ? '#8d5524' : '#ffffff');
                        ctx.fillRect(curX + Math.round(sw * scale * 0.45), curY + yOff - Math.round(3 * scale), Math.round(3 * scale), Math.round(3 * scale));
                    } else if (isTilde && baseCh !== 'n' && baseCh !== 'N') {
                        // Tilde over A or O (Ã, Õ)
                        const tildeGlyph = KIBYRA_FONT_CODES[126];
                        if (tildeGlyph) {
                            ctx.drawImage(sheets[1], tildeGlyph[1], tildeGlyph[2], tildeGlyph[3], tildeGlyph[4], curX + Math.round(2 * scale), curY + yOff - Math.round(5 * scale), Math.round(tildeGlyph[3] * scale * 0.7), Math.round(tildeGlyph[4] * scale * 0.6));
                        }
                    }
                }
                curX += adv;
            }
        });
        
        if (needsTint) {
            const imgData = ctx.getImageData(0, 0, totalW, totalH);
            const data = imgData.data;
            for (let p = 0; p < data.length; p += 4) {
                if (data[p + 3] > 20 && (data[p] + data[p + 1] + data[p + 2]) > 70) {
                    data[p] = Math.min(255, Math.round(data[p] * tintR));
                    data[p + 1] = Math.min(255, Math.round(data[p + 1] * tintG));
                    data[p + 2] = Math.min(255, Math.round(data[p + 2] * tintB));
                }
            }
            ctx.putImageData(imgData, 0, 0);
        }
        
        this.canvasTexture.refresh();
        this.setSize(totalW, totalH);
        this.updateDisplayOrigin();
    }
    
    destroy(fromScene) {
        if (this.canvasTexture && this.scene && this.scene.textures) {
            this.scene.textures.remove(this.textureKey);
        }
        super.destroy(fromScene);
    }
}

// Test game
const config = {
    type: Phaser.AUTO,
    width: 650,
    height: 380,
    parent: 'game',
    backgroundColor: '#1a1008',
    scene: {
        create() {
            // Test with Portuguese words containing accents: ÁUDIO, SANTUÁRIO, MISSÃO, GLÓRIA, REINICIAR
            new PixelText(this, 325, 40, 'A JORNADA DO CAVALEIRO', { fontSize: '26px', color: '#ffd700' }).setOrigin(0.5);
            new PixelText(this, 325, 85, 'CONTINUAR JORNADA [P]', { fontSize: '18px', color: '#ffffff' }).setOrigin(0.5);
            new PixelText(this, 325, 125, 'ÁUDIO: ATIVADO [M]', { fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);
            new PixelText(this, 325, 165, 'TEMPO: 40s • PRATA: 150 • OURO: 320', { fontSize: '15px', color: '#d6c8aa' }).setOrigin(0.5);
            new PixelText(this, 325, 205, 'FORJA DO FERREIRO: ESPADA REAL', { fontSize: '17px', color: '#ffd700' }).setOrigin(0.5);
            new PixelText(this, 325, 245, 'REINICIAR MISSÃO', { fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);
            new PixelText(this, 325, 280, 'ESCUDO SAGRADO: [BLOQUEADO - 250 OURO]', { fontSize: '15px', color: '#ff5252' }).setOrigin(0.5);
            new PixelText(this, 325, 315, 'SANTUÁRIO DO MAGO: +20% DANO MÁGICO', { fontSize: '15px', color: '#7fe7ff' }).setOrigin(0.5);
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

[System.IO.File]::WriteAllText("JS_Teste\test_pixel_text_engine.html", $html, [System.Text.Encoding]::UTF8)

$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$shot = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\test_pixel_text_engine.png'
$url = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_pixel_text_engine.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shot`"", "--window-size=960,540", "--virtual-time-budget=2000", "`"$url`"" -Wait -NoNewWindow
