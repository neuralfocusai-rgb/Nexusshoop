#!/bin/bash

echo "=== 📁 ESTRUCTURA DE ARCHIVOS ==="
# Excluimos node_modules, .git y carpetas de build para no saturar
find . -maxdepth 3 -type f -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/.next/*" -not -path "*/dist/*" -not -path "*/build/*" -not -path "*/venv/*" | sort

echo -e "\n\n=== 📄 ARCHIVOS CLAVE (RAÍZ Y CONFIGURACIÓN) ==="
# Buscamos archivos importantes de configuración
FILES=("package.json" "vercel.json" "next.config.js" "app.js" "index.html" "spa_template.html" "requirements.txt" "supabase.js" ".env.example")

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "--- INICIO: $file ---"
        cat "$file"
        echo -e "\n--- FIN: $file ---\n"
    fi
done

echo "=== 📄 CÓDIGO FUENTE (JS, PY, HTML) ==="
# Mostramos los primeros 80 renglones de cada archivo de código
find . -maxdepth 3 -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.py" -o -name "*.html" -o -name "*.json" -o -name "*.css" \) -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/.next/*" -not -path "*/dist/*" -not -path "*/build/*" | while read file; do
    # Ignorar package-lock.json que es enorme
    if [[ "$file" == *"package-lock.json"* ]]; then continue; fi
    echo "--- ARCHIVO: $file ---"
    head -n 80 "$file"
    echo -e "\n... (cortado si es muy largo)\n"
done

echo "=== ✅ FIN DEL REPORTE ==="
