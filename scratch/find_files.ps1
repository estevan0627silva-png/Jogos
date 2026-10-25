Get-ChildItem -Recurse "scratch\extracted_fonts" | Where-Object { 
    $_.Extension -eq ".txt" -or $_.Extension -eq ".json" -or $_.Name -like "*DoNotForget*" -or $_.Extension -eq ".fnt" -or $_.Extension -eq ".ttf" -or $_.Name -like "*.png" -and $_.Length -gt 2000
} | Select-Object FullName, Length
