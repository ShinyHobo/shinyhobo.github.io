# powershell -ExecutionPolicy Bypass -File script.ps1
for(;;) {
    $content = (wget https://robertsspaceindustries.com/roadmap).Content
    if($content.Contains("Currently down for maintenance")) {
        echo "Down"
		Start-Sleep -s 15
    } else {
        [console]::beep(500, 500)
        echo "==> Up"
		Start-Sleep -s 1
    }
}