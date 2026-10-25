Add-Type -AssemblyName System.IO.Compression.FileSystem

$zipPath = 'C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\.user_uploaded\media_1792939365588_ad36ed13.zip'
$archive = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
$archive.Entries | Select-Object FullName, Length
$archive.Dispose()
