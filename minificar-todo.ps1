# Script PowerShell para minificar HTML en Windows
# Guardar como: minificar-todo.ps1

Write-Host "🚀 MINIFICANDO TODAS LAS PÁGINAS HTML..." -ForegroundColor Green
Write-Host ""

# Minificar index-mejorado.html → index.html
Write-Host "📄 Minificando index-mejorado.html..." -ForegroundColor Yellow
html-minifier `
  --collapse-whitespace `
  --remove-comments `
  --minify-css true `
  --minify-js true `
  --remove-attribute-quotes `
  --remove-optional-tags `
  --remove-redundant-attributes `
  index-mejorado.html -o index.html

Write-Host "✅ index.html creado" -ForegroundColor Green
Write-Host ""

# Minificar servicios-mejorado.html → servicios.html
Write-Host "📄 Minificando servicios-mejorado.html..." -ForegroundColor Yellow
html-minifier `
  --collapse-whitespace `
  --remove-comments `
  --minify-css true `
  --minify-js true `
  --remove-attribute-quotes `
  --remove-optional-tags `
  --remove-redundant-attributes `
  servicios-mejorado.html -o servicios.html

Write-Host "✅ servicios.html creado" -ForegroundColor Green
Write-Host ""

# Minificar precios-y-zonas-mejorado.html → precios-y-zonas.html
Write-Host "📄 Minificando precios-y-zonas-mejorado.html..." -ForegroundColor Yellow
html-minifier `
  --collapse-whitespace `
  --remove-comments `
  --minify-css true `
  --minify-js true `
  --remove-attribute-quotes `
  --remove-optional-tags `
  --remove-redundant-attributes `
  precios-y-zonas-mejorado.html -o precios-y-zonas.html

Write-Host "✅ precios-y-zonas.html creado" -ForegroundColor Green
Write-Host ""

# Minificar coordinar-envio-mejorado.html → coordinar-envio.html
Write-Host "📄 Minificando coordinar-envio-mejorado.html..." -ForegroundColor Yellow
html-minifier `
  --collapse-whitespace `
  --remove-comments `
  --minify-css true `
  --minify-js true `
  --remove-attribute-quotes `
  --remove-optional-tags `
  --remove-redundant-attributes `
  coordinar-envio-mejorado.html -o coordinar-envio.html

Write-Host "✅ coordinar-envio.html creado" -ForegroundColor Green
Write-Host ""

# Minificar preguntas-frecuentes.html
Write-Host "📄 Minificando preguntas-frecuentes.html..." -ForegroundColor Yellow
html-minifier `
  --collapse-whitespace `
  --remove-comments `
  --minify-css true `
  --minify-js true `
  --remove-attribute-quotes `
  --remove-optional-tags `
  --remove-redundant-attributes `
  preguntas-frecuentes.html -o preguntas-frecuentes-min.html

Write-Host "✅ preguntas-frecuentes-min.html creado" -ForegroundColor Green
Write-Host ""

Write-Host "🎉 ¡TODAS LAS PÁGINAS MINIFICADAS!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Archivos creados:" -ForegroundColor Cyan
Write-Host "  - index.html"
Write-Host "  - servicios.html"
Write-Host "  - precios-y-zonas.html"
Write-Host "  - coordinar-envio.html"
Write-Host "  - preguntas-frecuentes-min.html"
Write-Host ""
Write-Host "✅ Listo para subir a producción!" -ForegroundColor Green
