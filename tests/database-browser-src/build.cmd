call .\node_modules\.bin\webpack --mode=development
move .\dist\dist\bundle.js .\dist\bundle.js
rmdir .\dist\dist
move .\dist ..\database-browser
copy /b/v/y index.html ..\database-browser\index.html