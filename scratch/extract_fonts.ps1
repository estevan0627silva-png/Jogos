Add-Type -AssemblyName System.IO.Compression.FileSystem

$zipPath = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\.user_uploaded\media_1792939365588_ad36ed13.zip'
$extractPath = "scratch\extracted_fonts"

if (Test-Path $extractPath) {
    Remove-Item -Recurse -Force $extractPath
}

[System.IO.Compression.ZipFile]::ExtractToDirectory($zipPath, $extractPath)
Write-Host "Extracted to $extractPath"
