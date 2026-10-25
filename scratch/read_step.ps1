$lines = Get-Content 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\.system_generated\logs\transcript.jsonl'
$target = $lines | Where-Object { $_ -match 'test_screen_gameplay\.png' }
foreach ($t in $target) {
    Write-Output $t
}
