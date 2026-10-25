$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$tempDir = [System.IO.Path]::Combine($env:TEMP, "edge_debug_" + [System.Guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
$logFile = Join-Path $tempDir "chrome_debug.log"

$url = "file:///f:/programa%C3%A7%C3%A3o%20de%20jogos/Jogos/JS_Teste/test_pause.html"
$args = @(
    "--headless",
    "--enable-logging",
    "--v=1",
    "--user-data-dir=$tempDir",
    "--window-size=960,540",
    "--virtual-time-budget=3500",
    $url
)

Start-Process -FilePath $edge -ArgumentList $args -Wait -NoNewWindow

if (Test-Path $logFile) {
    Get-Content $logFile | Select-String -Pattern "ERROR|CONSOLE|SyntaxError|Uncaught|fail" | ForEach-Object { Write-Host $_ }
}
Remove-Item -Recurse -Force $tempDir -ErrorAction SilentlyContinue
