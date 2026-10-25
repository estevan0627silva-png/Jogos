$dir = (Get-ChildItem -Directory "scratch\extracted_fonts\*\u*-fonts\u*-1\u*-1-yellow").FullName
Get-ChildItem -Recurse $dir | Where-Object { -not $_.PSIsContainer } | Select-Object -First 20 Name, Length
