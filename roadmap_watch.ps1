# powershell -ExecutionPolicy Bypass -File roadmap_watch.ps1
$userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:21.0) Gecko/20100101 Firefox/21.0"
$header = @{"accept"="text/html"}
for(;;) {
    $content = (wget https://robertsspaceindustries.com/roadmap -UserAgent $userAgent -Headers $header).Content
    if($content.Contains("Currently down for maintenance")) {
        echo "Down"
		Start-Sleep -s 15
    } else {
        [console]::beep(500, 500)
        echo "==> Up"
		Start-Sleep -s 1
    }
}