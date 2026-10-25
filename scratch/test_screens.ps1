$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$artifactDir = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227'
$baseDir = (Get-Item -Path ".").FullName
$jsTestDir = Join-Path $baseDir "JS_Teste"
$htmlFile = Join-Path $jsTestDir "test_screen_runner.html"

function Take-ScreenShot($actionName, $evalJs, $outFile) {
    $html = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script src="lib/phaser.min.js"></script>
    <script src="game.js"></script>
</head>
<body style="margin:0; background:#000;">
<div id="game-container"></div>
<script>
window.addEventListener('load', () => {
    setTimeout(() => {
        try {
            const scene = game.scene.scenes[0];
            $evalJs
        } catch(e) {
            console.error(e);
        }
    }, 1200);
});
</script>
</body>
</html>
"@
    [System.IO.File]::WriteAllText($htmlFile, $html, [System.Text.Encoding]::UTF8)
    $url = "file:///" + $htmlFile.Replace('\', '/')
    $targetPath = Join-Path $artifactDir $outFile
    Start-Process -FilePath $edge -ArgumentList "--headless", "--screenshot=`"$targetPath`"", "--window-size=960,540", "--virtual-time-budget=3500", "`"$url`"" -Wait -NoNewWindow
    Write-Host "Captured $actionName -> $outFile"
}

Take-ScreenShot "Blacksmith" "showBlacksmithMenu(scene);" "screen_blacksmith_font.png"
Take-ScreenShot "Mage" "showMageShopMenu(scene);" "screen_mage_font.png"
Take-ScreenShot "Pause" "startGameplay(scene); scene.time.delayedCall(300, () => { showPauseModal(scene); });" "screen_pause_font.png"
Take-ScreenShot "Settings" "showSettingsMenu(scene);" "screen_settings_font.png"
Take-ScreenShot "Records" "showRecordsMenu(scene);" "screen_records_font.png"
Take-ScreenShot "Achievements" "showAchievementsMenu(scene);" "screen_achievements_font.png"
Take-ScreenShot "LevelUp" "startGameplay(scene); scene.time.delayedCall(300, () => { openLevelUpDraft(scene); });" "screen_levelup_font.png"
Take-ScreenShot "GameOver" "startGameplay(scene); scene.time.delayedCall(300, () => { showInitials(scene); });" "screen_gameover_font.png"
