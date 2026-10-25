$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$brain = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227'
$shotPause = "$brain\test_screen_pause.png"
$url = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_pause.html"

Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shotPause`"", "--window-size=960,540", "--virtual-time-budget=4000", "`"$url`"" -Wait -NoNewWindow

Write-Output "Done. Exists: $(Test-Path $shotPause)"
