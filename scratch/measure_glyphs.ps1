Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("C:\Users\estev\.gemini\antigravity\brain\bbbc0ec8-02af-479d-b896-01952918c227\font_u1_yellow.png")

# u-1 is 256x256, 8x8 grid of 32x32 cells.
# Characters:
# Row 0: 0 1 2 3 4 5 6 7
# Row 1: 8 9 A B C D E F
# Row 2: G H I J K L M N
# Row 3: O P Q R S T U V
# Row 4: W X Y Z a b c d
# Row 5: e f g h i j k l
# Row 6: m n o p q r s t
# Row 7: u v w x y z ñ ç

$chars = @(
    '0','1','2','3','4','5','6','7',
    '8','9','A','B','C','D','E','F',
    'G','H','I','J','K','L','M','N',
    'O','P','Q','R','S','T','U','V',
    'W','X','Y','Z','a','b','c','d',
    'e','f','g','h','i','j','k','l',
    'm','n','o','p','q','r','s','t',
    'u','v','w','x','y','z','ñ','ç'
)

Write-Host "Analyzing 64 glyph bounding boxes in font_u1_yellow:"
$glyphMetrics = @{}

for ($row = 0; $row -lt 8; $row++) {
    for ($col = 0; $col -lt 8; $col++) {
        $idx = $row * 8 + $col
        $ch = $chars[$idx]
        $cellX = $col * 32
        $cellY = $row * 32
        
        $minX = 32; $maxX = -1; $minY = 32; $maxY = -1
        for ($y = 0; $y -lt 32; $y++) {
            for ($x = 0; $x -lt 32; $x++) {
                $c = $img.GetPixel($cellX + $x, $cellY + $y)
                if ($c.A -gt 20) {
                    if ($x -lt $minX) { $minX = $x }
                    if ($x -gt $maxX) { $maxX = $x }
                    if ($y -lt $minY) { $minY = $y }
                    if ($y -gt $maxY) { $maxY = $y }
                }
            }
        }
        
        $w = if ($maxX -ge $minX) { $maxX - $minX + 1 } else { 0 }
        $h = if ($maxY -ge $minY) { $maxY - $minY + 1 } else { 0 }
        $glyphMetrics[$ch] = @{
            char = $ch
            cellX = $cellX; cellY = $cellY
            boxX = $minX; boxY = $minY
            w = $w; h = $h
        }
        if ($idx % 8 -eq 0) {
            Write-Host ("Row {0}: '{1}' => w={2}, h={3}, box=({4},{5})" -f $row, $ch, $w, $h, $minX, $minY)
        }
    }
}

$img.Dispose()
Write-Host "Total characters analyzed: $($glyphMetrics.Count)"
