$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$brain = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227'
$shotBs = "$brain\test_screen_blacksmith.png"
$shotMage = "$brain\test_screen_mage.png"

$urlBs = 'file:///f:/programao de jogos/Jogos/JS_Teste/test_blacksmith.html'
$urlMage = 'file:///f:/programao de jogos/Jogos/JS_Teste/test_mage.html'

# Also prepare encoded URLs if path contains special characters
$currentDir = (Get-Location).Path.Replace('\', '/')
$encodedDir = [System.Uri]::EscapeUriString($currentDir)
$urlBs = "file:///" + $encodedDir + "/JS_Teste/test_blacksmith.html"
$urlMage = "file:///" + $encodedDir + "/JS_Teste/test_mage.html"

Write-Output "Capturing Blacksmith from: $urlBs"
$p1 = Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot="$shotBs"", "--window-size=960,540", "--virtual-time-budget=3500", ""$urlBs"" -Wait -PassThru
Write-Output "Blacksmith exit code: "

Write-Output "Capturing Mage from: $urlMage"
$p2 = Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot="$shotMage"", "--window-size=960,540", "--virtual-time-budget=3500", ""$urlMage"" -Wait -PassThru
Write-Output "Mage exit code: "

if (Test-Path $shotBs) {
    Write-Output "FOUND BS: $shotBs (0 bytes)"
}
if (Test-Path $shotMage) {
    Write-Output "FOUND MAGE: $shotMage (0 bytes)"
}
