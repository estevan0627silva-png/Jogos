$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$brain = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227'
$shot = "$brain\test_debug_shot.png"
$url = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_debug.html"
Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shot`"", "--window-size=960,540", "--virtual-time-budget=3500", "`"$url`"" -Wait -NoNewWindow
Write-Host "Screenshot captured to $shot"
