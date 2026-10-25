$html = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script src="lib/phaser.min.js"></script>
</head>
<body style="margin:0; background:#111;">
<div id="game"></div>
<script>
// Test Kibyra glyph drawing
const img = new Image();
img.src = 'assets/ui/font_u1_yellow.png'; // We will copy it
img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    
    // Draw "JORNADA"
    // In u-1: J is row 2 col 3. O is row 3 col 0. R is row 3 col 3. N is row 2 col 5. A is row 1 col 2. D is row 1 col 4.
    const map = {
        'J': [3, 2, 14],
        'O': [0, 3, 18],
        'R': [3, 3, 18],
        'N': [5, 2, 18],
        'A': [2, 1, 18],
        'D': [4, 1, 18]
    };
    
    let x = 10;
    const word = 'JORNADA';
    for (let i = 0; i < word.length; i++) {
        const info = map[word[i]];
        if (info) {
            const col = info[0];
            const row = info[1];
            const w = info[2];
            // Cell in u-1 is 32x32. Glyphs are centered in 32x32, box is ~7..25
            ctx.drawImage(img, col * 32 + 7, row * 32 + 7, w, 22, x, 20, w, 22);
            x += w + 2;
        }
    }
    
    document.body.appendChild(canvas);
    document.body.style.background = '#2a1a0e';
};
</script>
</body>
</html>
"@

[System.IO.File]::WriteAllText("JS_Teste\test_kibyra_draw.html", $html, [System.Text.Encoding]::UTF8)

# Copy font_u1_yellow to assets/ui/font_u1_yellow.png
Copy-Item "C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u1_yellow.png" "JS_Teste\assets\ui\font_u1_yellow.png" -Force

$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$shot = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\test_kibyra_draw.png'
$url = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_kibyra_draw.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shot`"", "--window-size=960,540", "--virtual-time-budget=2000", "`"$url`"" -Wait -NoNewWindow
