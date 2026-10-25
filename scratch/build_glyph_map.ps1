Add-Type -AssemblyName System.Drawing

$img1 = [System.Drawing.Bitmap]::FromFile("C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u1_yellow.png")
$img2 = [System.Drawing.Bitmap]::FromFile("C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u2_yellow.png")

$dict = New-Object 'System.Collections.Generic.Dictionary[string, int[]]'

$u1Chars = @(
    '0','1','2','3','4','5','6','7',
    '8','9','A','B','C','D','E','F',
    'G','H','I','J','K','L','M','N',
    'O','P','Q','R','S','T','U','V',
    'W','X','Y','Z','a','b','c','d',
    'e','f','g','h','i','j','k','l',
    'm','n','o','p','q','r','s','t',
    'u','v','w','x','y','z','ñ','ç'
)

$u2Chars = @(
    '!','?','¿','@','#','$','&','~',
    ',','"',';',':','/','\','[',']',
    '(',')','{','}','_','-','=','+',
    'x','÷','*','^','%','°','Ñ','ñ',
    'Ç','ç','X','✓','','','',''
)

for ($r = 0; $r -lt 8; $r++) {
    for ($c = 0; $c -lt 8; $c++) {
        $idx = $r * 8 + $c
        $ch = $u1Chars[$idx]
        $cellX = $c * 32
        $cellY = $r * 32
        
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
            $dict[$ch] = [int[]]@(0, ($cellX + $minX), ($cellY + $minY), $w, $h, $adv, $minY)
        }
    }
}

for ($r = 0; $r -lt 8; $r++) {
    for ($c = 0; $c -lt 8; $c++) {
        $idx = $r * 8 + $c
        if ($idx -ge $u2Chars.Length) { continue }
        $ch = $u2Chars[$idx]
        if ([string]::IsNullOrEmpty($ch)) { continue }
        if ($dict.ContainsKey($ch)) { continue }
        
        $cellX = $c * 32
        $cellY = $r * 32
        
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
            $dict[$ch] = [int[]]@(1, ($cellX + $minX), ($cellY + $minY), $w, $h, $adv, $minY)
        }
    }
}

# Add '.' dot
$colonCellX = 3 * 32
$colonCellY = 1 * 32
$minX = 32; $maxX = -1; $minY = 32; $maxY = -1
for ($y = 20; $y -lt 32; $y++) {
    for ($x = 0; $x -lt 32; $x++) {
        if ($img2.GetPixel($colonCellX + $x, $colonCellY + $y).A -gt 20) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
$dict['.'] = [int[]]@(1, ($colonCellX + $minX), ($colonCellY + $minY), ($maxX - $minX + 1), ($maxY - $minY + 1), ($maxX - $minX + 3), $minY)

# Add space
$dict[' '] = [int[]]@(0, 0, 0, 0, 0, 8, 0)

Write-Host "Mapped $($dict.Count) characters!"

$outLines = @("// Kibyra Pixel Font Map", "const KIBYRA_FONT_MAP = {")
foreach ($key in $dict.Keys) {
    $arr = $dict[$key]
    $jsonKey = $key.Replace('\', '\\').Replace('"', '\"')
    $outLines += "  `"$jsonKey`": [$( $arr -join ', ' )],"
}
$outLines += "};"

[System.IO.File]::WriteAllLines("scratch\glyph_map.js", $outLines, [System.Text.Encoding]::UTF8)

$img1.Dispose()
$img2.Dispose()
Write-Host "Done!"
