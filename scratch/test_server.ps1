try {
    $res = Invoke-WebRequest -Uri "http://localhost:8080/index.html" -TimeoutSec 2
    Write-Host "Server status: $($res.StatusCode)"
} catch {
    Write-Host "Server is not running on 8080: $($_.Exception.Message)"
}
