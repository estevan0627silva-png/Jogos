$gameCode = [System.IO.File]::ReadAllText("JS_Teste\game.js", [System.Text.Encoding]::UTF8)
$jsonString = $gameCode | ConvertTo-Json

$html = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script src="lib/phaser.min.js"></script>
</head>
<body style="background:#222; color:#fff; font-family:monospace; font-size:16px; padding:20px;">
<div id="status">Testing...</div>
<script>
try {
    eval($jsonString);
    document.getElementById('status').innerText = 'game.js 100% OK! window.game: ' + (typeof window.game);
} catch(e) {
    document.getElementById('status').innerText = 'game.js EVAL ERROR: ' + e.message + '\n' + e.stack;
}
</script>
</body>
</html>
"@

[System.IO.File]::WriteAllText("JS_Teste\test_eval_game.html", $html, [System.Text.Encoding]::UTF8)

$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$shot = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\test_eval_game.png'
cmd.exe /c "`"$edge`" --headless --screenshot=`"$shot`" --window-size=960,540 --virtual-time-budget=2000 `"file:///f:/programação de jogos/Jogos/JS_Teste/test_eval_game.html`""
