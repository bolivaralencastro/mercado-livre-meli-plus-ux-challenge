#!/usr/bin/env node

/**
 * Script para atualizar o manifest de personas com URLs do Vercel Blob Storage
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Lê o arquivo de resultado do upload
const uploadResultPath = join(__dirname, 'resultado-upload-personas.json');
const uploadResult = JSON.parse(readFileSync(uploadResultPath, 'utf-8'));

// Cria estrutura de dados organizada por persona
const personasData = {};

Object.entries(uploadResult.mapping).forEach(([localPath, blobUrl]) => {
  // Extrai o nome da persona e o nome da imagem
  // localPath exemplo: "02-pesquisa/personas/ana_paula_santos/ana-dor.webp"
  const pathParts = localPath.split('/');
  const personaName = pathParts[2]; // "ana_paula_santos"
  const imageName = pathParts[3]; // "ana-dor.webp"
  
  if (!personasData[personaName]) {
    personasData[personaName] = {
      slug: personaName,
      images: {}
    };
  }
  
  personasData[personaName].images[imageName] = blobUrl;
});

// Cria o manifest final
const manifest = {
  version: "1.0.0",
  updatedAt: new Date().toISOString(),
  source: "vercel-blob-storage",
  personas: personasData
};

// Salva o manifest
const manifestPath = join(__dirname, 'app-web/src/lib/personas-manifest.json');
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log('✅ Manifest de personas atualizado com sucesso!');
console.log(`📄 Arquivo salvo em: ${manifestPath}`);
console.log(`📊 Total de personas: ${Object.keys(personasData).length}`);
console.log(`📊 Total de imagens: ${Object.values(personasData).reduce((acc, p) => acc + Object.keys(p.images).length, 0)}`);
