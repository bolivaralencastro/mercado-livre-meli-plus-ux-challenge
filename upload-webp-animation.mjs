import { put } from '@vercel/blob';
import fs from 'fs';

const TOKEN = 'vercel_blob_rw_SMOLlJrFJqKNP6nM_UvN9VbRPqzWAVnWXqZQfAy8Noe97ua';

async function uploadWebpAnimation() {
  console.log('🚀 Fazendo upload da animação WebM para Vercel Blob...');
  
  try {
    const filePath = 'src/assets/videos/openbox.webm';
    const fileBuffer = fs.readFileSync(filePath);
    
    const blob = await put('assets/openbox.webm', fileBuffer, {
      access: 'public',
      addRandomSuffix: false,
      token: TOKEN
    });
    
    console.log(`✅ Upload concluído!`);
    console.log(`📍 URL: ${blob.url}`);
    
    fs.writeFileSync('resultado-upload-openbox.json', JSON.stringify({ url: blob.url }, null, 2));
    
  } catch (error) {
    console.error('❌ Erro ao fazer upload:', error.message);
  }
}

uploadWebpAnimation();
