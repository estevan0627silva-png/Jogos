$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$brain = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227'
$shotGameplay = "$brain\screen_gameplay_fixed.png"
$shotLevelUp = "$brain\screen_levelup_fixed.png"

$urlGameplay = 'file:///f:/programação de jogos/Jogos/test_gameplay.html'
$urlLevelUp = 'file:///f:/programação de jogos/Jogos/test_levelup.html'

Write-Output "Capturing gameplay screenshot..."
$p1 = Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shotGameplay`"", "--window-size=960,540", "--virtual-time-budget=4000", "`"$urlGameplay`"" -Wait -PassThru
Write-Output "Gameplay exit code: $($p1.ExitCode)"

Write-Output "Capturing levelup screenshot..."
$p2 = Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$shotLevelUp`"", "--window-size=960,540", "--virtual-time-budget=4000", "`"$urlLevelUp`"" -Wait -PassThru
Write-Output "LevelUp exit code: $($p2.ExitCode)"

if (Test-Path $shotGameplay) {
    Write-Output "FOUND: $shotGameplay ($( (Get-Item $shotGameplay).Length ) bytes)"
} else {
    Write-Output "NOT FOUND: $shotGameplay"
}

if (Test-Path $shotLevelUp) {
    Write-Output "FOUND: $shotLevelUp ($( (Get-Item $shotLevelUp).Length ) bytes)"
} else {
    Write-Output "NOT FOUND: $shotLevelUp"
}
