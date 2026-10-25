Add-Type -AssemblyName System.Drawing

$img1 = [System.Drawing.Bitmap]::FromFile("C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u1_yellow.png")
$img2 = [System.Drawing.Bitmap]::FromFile("C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u2_yellow.png")

$dict = New-Object 'System.Collections.Generic.Dictionary[int, int[]]'

$u1Codes = @(
    48, 49, 50, 51, 52, 53, 54, 55,
    56, 57, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78,
    79, 80, 81, 82, 83, 84, 85, 86,
    87, 88, 89, 90, 97, 98, 99, 100,
    101, 102, 103, 104, 105, 106, 107, 108,
    109, 110, 111, 112, 113, 114, 115, 116,
    117, 118, 119, 120, 121, 122, 241, 231
)

for ($i = 0; $i -lt $u1Codes.Length; $i++) {
    $code = $u1Codes[$i]
    $r = [Math]::Floor($i / 8.0)
    $c = $i % 8
    $cellX = [int]($c * 32)
    $cellY = [int]($r * 32)
    
    $minX = 32; $maxX = -1; $minY = 32; $maxY = -1
    for ($y = 0; $y -lt 32; $y++) {
        for ($x = 0; $x -lt 32; $x++) {
            if ($img1.GetPixel($cellX + $x, $cellY + $y).A -gt 20) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    if ($maxX -ge $minX) {
        $w = $maxX - $minX + 1
        $h = $maxY - $minY + 1
        $adv = $w + 2
        $dict[$code] = [int[]]@(0, ($cellX + $minX), ($cellY + $minY), $w, $h, $adv, $minY)
    }
}

$u2Codes = @(
    33, 63, 191, 64, 35, 36, 38, 126,
    44, 34, 59, 58, 47, 92, 91, 93,
    40, 41, 123, 125, 95, 45, 61, 43,
    0, 247, 42, 94, 37, 176, 209, 0,
    199, 0, 0, 10003, 0, 0, 0, 0
)

for ($i = 0; $i -lt $u2Codes.Length; $i++) {
    $code = $u2Codes[$i]
    if ($code -eq 0 -or $dict.ContainsKey($code)) { continue }
    $r = [Math]::Floor($i / 8.0)
    $c = $i % 8
    $cellX = [int]($c * 32)
    $cellY = [int]($r * 32)
    
    $minX = 32; $maxX = -1; $minY = 32; $maxY = -1
    for ($y = 0; $y -lt 32; $y++) {
        for ($x = 0; $x -lt 32; $x++) {
            if ($img2.GetPixel($cellX + $x, $cellY + $y).A -gt 20) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    if ($maxX -ge $minX) {
        $w = $maxX - $minX + 1
        $h = $maxY - $minY + 1
        $adv = $w + 2
        $dict[$code] = [int[]]@(1, ($cellX + $minX), ($cellY + $minY), $w, $h, $adv, $minY)
    }
}

# Add '.' (46) from bottom of colon ':' (58)
$colonData = $dict[58]
if ($colonData) {
    $dotW = $colonData[3]
    $dotH = 6
    $dotSx = $colonData[1]
    $dotSy = $colonData[2] + $colonData[4] - 6
    $dict[46] = [int[]]@(1, $dotSx, $dotSy, $dotW, $dotH, ($dotW + 2), ($colonData[6] + $colonData[4] - 6))
}

# Add space ' ' (32)
$dict[32] = [int[]]@(0, 0, 0, 0, 0, 8, 0)

Write-Host "Mapped glyphs count: $($dict.Count)"

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("// Kibyra Pixel Font Map (char code -> [sheet, sx, sy, sw, sh, adv, yOff])")
$lines.Add("const KIBYRA_FONT_CODES = {")

foreach ($code in $dict.Keys) {
    $arr = $dict[$code]
    $arrStr = $arr -join ', '
    $line = "  " + $code + ": [" + $arrStr + "],"
    $lines.Add($line)
}
$lines.Add("};")

[System.IO.File]::WriteAllLines("JS_Teste\src\art\kibyraFontMap.js", $lines.ToArray(), [System.Text.Encoding]::UTF8)

$img1.Dispose()
$img2.Dispose()
Write-Host "Successfully generated JS_Teste\src\art\kibyraFontMap.js!"
