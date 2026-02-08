#!/bin/bash

echo "🚀 MINIFICANDO TODAS LAS PÁGINAS HTML..."
echo ""

# Minificar index-mejorado.html → index.html
echo "📄 Minificando index-mejorado.html..."
html-minifier \
  --collapse-whitespace \
  --remove-comments \
  --minify-css true \
  --minify-js true \
  --remove-attribute-quotes \
  --remove-optional-tags \
  --remove-redundant-attributes \
  index-mejorado.html -o index.html

echo "✅ index.html creado"
echo ""

# Minificar servicios-mejorado.html → servicios.html
echo "📄 Minificando servicios-mejorado.html..."
html-minifier \
  --collapse-whitespace \
  --remove-comments \
  --minify-css true \
  --minify-js true \
  --remove-attribute-quotes \
  --remove-optional-tags \
  --remove-redundant-attributes \
  servicios-mejorado.html -o servicios.html

echo "✅ servicios.html creado"
echo ""

# Minificar precios-y-zonas-mejorado.html → precios-y-zonas.html
echo "📄 Minificando precios-y-zonas-mejorado.html..."
html-minifier \
  --collapse-whitespace \
  --remove-comments \
  --minify-css true \
  --minify-js true \
  --remove-attribute-quotes \
  --remove-optional-tags \
  --remove-redundant-attributes \
  precios-y-zonas-mejorado.html -o precios-y-zonas.html

echo "✅ precios-y-zonas.html creado"
echo ""

# Minificar coordinar-envio-mejorado.html → coordinar-envio.html
echo "📄 Minificando coordinar-envio-mejorado.html..."
html-minifier \
  --collapse-whitespace \
  --remove-comments \
  --minify-css true \
  --minify-js true \
  --remove-attribute-quotes \
  --remove-optional-tags \
  --remove-redundant-attributes \
  coordinar-envio-mejorado.html -o coordinar-envio.html

echo "✅ coordinar-envio.html creado"
echo ""

# Minificar preguntas-frecuentes.html (mismo nombre)
echo "📄 Minificando preguntas-frecuentes.html..."
html-minifier \
  --collapse-whitespace \
  --remove-comments \
  --minify-css true \
  --minify-js true \
  --remove-attribute-quotes \
  --remove-optional-tags \
  --remove-redundant-attributes \
  preguntas-frecuentes.html -o preguntas-frecuentes-min.html

echo "✅ preguntas-frecuentes-min.html creado"
echo ""

echo "🎉 ¡TODAS LAS PÁGINAS MINIFICADAS!"
echo ""
echo "📋 Archivos creados:"
echo "  - index.html"
echo "  - servicios.html"
echo "  - precios-y-zonas.html"
echo "  - coordinar-envio.html"
echo "  - preguntas-frecuentes-min.html"
echo ""
echo "💾 Tamaño ahorrado:"
du -h *-mejorado.html preguntas-frecuentes.html | awk '{sum+=$1} END {print "  Originales: " sum " KB"}'
du -h index.html servicios.html precios-y-zonas.html coordinar-envio.html preguntas-frecuentes-min.html 2>/dev/null | awk '{sum+=$1} END {print "  Minificados: " sum " KB"}'
echo ""
echo "✅ Listo para subir a producción!"
