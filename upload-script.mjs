import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

// 👇👇👇 COLE O TOKEN DIRETO AQUI DENTRO DAS ASPAS 👇👇👇
const TOKEN = 'vercel_blob_rw_SMOLlJrFJqKNP6nM_UvN9VbRPqzWAVnWXqZQfAy8Noe97ua'; 

// Caminho das pastas
const PASTA_LOCAL = 'app-web/src/app/pesquisa/Mercado-Livre-Behance'; 

function getFiles(dir) {
  if (!fs.existsSync(dir)) {
    throw new Error(`Pasta não encontrada: ${dir}`);
  }
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}

async function uploadImages() {
  console.log(`🔍 Iniciando com token: ${TOKEN.substring(0, 15)}...`);
  
  try {
    const allFiles = getFiles(PASTA_LOCAL);
    console.log(`📦 Encontrados ${allFiles.length} arquivos.`);
    
    const results = [];
    let count = 0;

    for (const filePath of allFiles) {
      if (path.basename(filePath).startsWith('.')) continue;
      if (filePath.includes('DS_Store')) continue;
      if (filePath.includes('.txt')) continue; // Pulei arquivos de texto (.txt) se houver

      const fileBuffer = fs.readFileSync(filePath);
      const relativePath = path.relative(PASTA_LOCAL, filePath);
      const blobPath = `cases/${relativePath.replace(/\\/g, '/')}`;

      count++;
      console.log(`[${count}/${allFiles.length}] 🚀 Subindo: ${blobPath}...`);

      try {
        const blob = await put(blobPath, fileBuffer, {
          access: 'public',
          addRandomSuffix: false, 
          token: TOKEN // Passando o token explicitamente aqui
        });
        
        results.push({ 
          slug: path.dirname(relativePath),
          fileName: path.basename(relativePath),
          url: blob.url 
        });
        
      } catch (err) {
        console.error(`❌ ERRO FATAL no arquivo ${relativePath}:`);
        console.error(err.message);
        // Se der erro de token de novo, ele vai parar aqui
        if(err.message.includes('Access denied')) return;
      }
    }

    fs.writeFileSync('resultado-upload.json', JSON.stringify(results, null, 2));
    console.log(`\n🎉 FINALIZADO! Confira 'resultado-upload.json'`);

  } catch (error) {
    console.error(error);
  }
}

uploadImages();