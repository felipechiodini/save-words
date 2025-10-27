#!/bin/bash

# Nome da pasta que você quer compactar (por padrão, o diretório atual)
FOLDER=${1:-$(pwd)}

# Nome do arquivo ZIP com data (ex: myproject_2025-10-27.zip)
DATE=$(date +%Y-%m-%d)
ZIP_NAME="${FOLDER}_${DATE}.zip"

# Compacta, ignorando a pasta .git
echo "🔄 Compactando pasta '$FOLDER' em '$ZIP_NAME'..."

echo "zip -r "$ZIP_NAME" "$FOLDER" -x "*/.git/*""

zip -r "$ZIP_NAME" "$FOLDER" -x "*/.git/*"

# Mensagem final
if [ $? -eq 0 ]; then
    echo "✅ Arquivo criado com sucesso: $ZIP_NAME"
else
    echo "❌ Erro ao criar o ZIP."
fi
