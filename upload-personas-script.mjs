#!/usr/bin/env node

/**
 * Script para fazer upload das imagens de personas para Vercel Blob Storage
 * e gerar um arquivo JSON com o mapeamento das URLs
 */

import { put } from '@vercel/blob';
import { readdir } from 'fs/promises';
import { readFileSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Token do Vercel Blob Storage (mesmo do script anterior)
const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

if (!BLOB_READ_WRITE_TOKEN) {
  console.error('❌ Erro: BLOB_READ_WRITE_TOKEN não está definido nas variáveis de ambiente');
  process.exit(1);
}

// Diretório base das personas
const PERSONAS_DIR = join(__dirname, '02-pesquisa/personas');

/**
 * Busca recursivamente todos os arquivos de imagem
 */
async function findImageFiles(dir, fileList = []) {
  const files = await readdir(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = join(dir, file.name);
    
    if (file.isDirectory()) {
      await findImageFiles(fullPath, fileList);
    } else if (file.name.match(/\.(webp|png|jpg|jpeg|gif|svg)$/i)) {
      fileList.push(fullPath);
    }
  }
  
  return fileList;
}

/**
 * Faz upload de um arquivo para o Vercel Blob Storage
 */
async function uploadFile(filePath) {
  try {
    const fileContent = readFileSync(filePath);
    const relativePath = relative(__dirname, filePath);
    
    // Mantém a estrutura de pastas no blob storage
    const blobPath = `personas/${relativePath.replace('02-pesquisa/personas/', '')}`;
    
    console.log(`📤 Uploading: ${relativePath}`);
    
    const blob = await put(blobPath, fileContent, {
      access: 'public',
      token: BLOB_READ_WRITE_TOKEN,
    });
    
    console.log(`✅ Uploaded: ${blob.url}`);
    
    return {
      localPath: relativePath,
      blobUrl: blob.url,
      blobPath: blobPath,
      fileName: filePath.split('/').pop()
    };
  } catch (error) {
    console.error(`❌ Erro ao fazer upload de ${filePath}:`, error.message);
    throw error;
  }
}

/**
 * Função principal
 */
async function main() {
  console.log('🚀 Iniciando upload das imagens de personas...\n');
  
  // Encontra todas as imagens
  const imageFiles = await findImageFiles(PERSONAS_DIR);
  console.log(`📁 Encontradas ${imageFiles.length} imagens\n`);
  
  // Faz upload de todas as imagens
  const results = [];
  
  for (const filePath of imageFiles) {
    try {
      const result = await uploadFile(filePath);
      results.push(result);
      
      // Pequeno delay para não sobrecarregar a API
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Falha ao processar ${filePath}`);
    }
  }
  
  // Cria objeto de mapeamento
  const mapping = results.reduce((acc, item) => {
    acc[item.localPath] = item.blobUrl;
    return acc;
  }, {});
  
  // Salva o resultado em JSON
  const outputFile = join(__dirname, 'resultado-upload-personas.json');
  writeFileSync(
    outputFile,
    JSON.stringify({
      timestamp: new Date().toISOString(),
      totalFiles: results.length,
      mapping: mapping,
      details: results
    }, null, 2)
  );
  
  console.log('\n✅ Upload concluído!');
  console.log(`📄 Resultados salvos em: ${outputFile}`);
  console.log(`📊 Total de arquivos: ${results.length}`);
}

main().catch(console.error);
