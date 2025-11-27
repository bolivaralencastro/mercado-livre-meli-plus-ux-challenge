import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

// Token do Vercel Blob (mesmo do outro script)
const TOKEN = 'vercel_blob_rw_SMOLlJrFJqKNP6nM_UvN9VbRPqzWAVnWXqZQfAy8Noe97ua'; 

// Caminho dos vídeos
const PASTA_VIDEOS = 'app-web/src/assets/videos'; 

async function uploadVideos() {
  console.log(`🎬 Iniciando upload de vídeos...`);
  
  try {
    const files = fs.readdirSync(PASTA_VIDEOS);
    const videoFiles = files.filter(f => f.endsWith('.webm'));
    
    console.log(`📦 Encontrados ${videoFiles.length} vídeos.`);
    
    const results = [];

    for (let i = 0; i < videoFiles.length; i++) {
      const fileName = videoFiles[i];
      const filePath = path.join(PASTA_VIDEOS, fileName);
      const fileBuffer = fs.readFileSync(filePath);
      const blobPath = `videos/${fileName}`;

      console.log(`[${i + 1}/${videoFiles.length}] 🚀 Subindo: ${fileName}...`);

      try {
        const blob = await put(blobPath, fileBuffer, {
          access: 'public',
          addRandomSuffix: false, 
          token: TOKEN,
          contentType: 'video/webm'
        });
        
        results.push({ 
          fileName,
          url: blob.url 
        });
        
        console.log(`   ✅ ${blob.url}`);
        
      } catch (err) {
        console.error(`❌ ERRO no arquivo ${fileName}:`);
        console.error(err.message);
      }
    }

    fs.writeFileSync('resultado-upload-videos.json', JSON.stringify(results, null, 2));
    console.log(`\n🎉 FINALIZADO! URLs salvas em 'resultado-upload-videos.json'`);
    
    console.log('\n📋 URLs para copiar:');
    results.forEach(r => console.log(`   ${r.fileName}: ${r.url}`));

  } catch (error) {
    console.error(error);
  }
}

uploadVideos();
