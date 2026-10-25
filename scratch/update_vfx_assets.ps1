$bytes = [System.IO.File]::ReadAllBytes("JS_Teste\assets\vfx\vfx_explosion.png")
$b64 = [Convert]::ToBase64String($bytes)
$dataUri = "data:image/png;base64," + $b64

$vfxPath = "JS_Teste\src\art\vfxAssets.js"
$content = [System.IO.File]::ReadAllText($vfxPath, [System.Text.Encoding]::UTF8)

# 1. Replace the data URI for vfx_explosion
$startKey = '"vfx_explosion": "'
$startIdx = $content.IndexOf($startKey)
if ($startIdx -lt 0) {
    Write-Error "Could not find vfx_explosion in vfxAssets.js"
    exit 1
}
$valStart = $startIdx + $startKey.Length
$valEnd = $content.IndexOf('"', $valStart)

$content = $content.Substring(0, $valStart) + $dataUri + $content.Substring($valEnd)

# 2. Update frameWidth: 96, frameHeight: 96
$oldCfg = "{ key: 'vfx_explosion', frameWidth: 128, frameHeight: 128 }"
$newCfg = "{ key: 'vfx_explosion', frameWidth: 96, frameHeight: 96 }"
$content = $content.Replace($oldCfg, $newCfg)

# 3. Update animation frame count: start: 0, end: 11
$oldAnim = "frames: scene.anims.generateFrameNumbers('vfx_explosion', { start: 0, end: 12 }),"
$newAnim = "frames: scene.anims.generateFrameNumbers('vfx_explosion', { start: 0, end: 11 }),"
$content = $content.Replace($oldAnim, $newAnim)

[System.IO.File]::WriteAllText($vfxPath, $content, [System.Text.Encoding]::UTF8)
Write-Output "Successfully updated vfxAssets.js with new explosion!"
