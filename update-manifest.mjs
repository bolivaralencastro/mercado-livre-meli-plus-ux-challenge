import fs from 'fs/promises';
import path from 'path';

const RESULTADO_UPLOAD = 'resultado-upload.json';
const CASES_MANIFEST = 'app-web/src/lib/cases-manifest.json';

async function atualizarManifest() {
  console.log('📝 Iniciando atualização do cases-manifest.json...\n');

  // Ler os arquivos
  const uploadData = JSON.parse(await fs.readFile(RESULTADO_UPLOAD, 'utf-8'));
  const manifest = JSON.parse(await fs.readFile(CASES_MANIFEST, 'utf-8'));

  // Criar um mapa de URLs por slug e fileName para acesso rápido
  const urlMap = new Map();
  uploadData.forEach(item => {
    const key = `${item.slug}/${item.fileName}`;
    urlMap.set(key, item.url);
  });

  console.log(`✅ Carregados ${uploadData.length} URLs do Vercel Blob Storage`);
  console.log(`📦 Manifest contém ${manifest.cases.length} cases\n`);

  // Atualizar as URLs no manifest
  let urlsAtualizadas = 0;
  let urlsNaoEncontradas = 0;

  manifest.cases.forEach(caseItem => {
    caseItem.images.forEach(image => {
      const key = `${caseItem.slug}/${image.fileName}`;
      const vercelUrl = urlMap.get(key);
      
      if (vercelUrl) {
        image.url = vercelUrl;
        urlsAtualizadas++;
      } else {
        console.warn(`⚠️  URL não encontrada para: ${key}`);
        urlsNaoEncontradas++;
      }
    });
  });

  // Atualizar baseUrl
  manifest.baseUrl = "https://smolljrfjqknp6nm.public.blob.vercel-storage.com/cases";
  manifest.generatedAt = new Date().toISOString();

  // Salvar o manifest atualizado
  await fs.writeFile(
    CASES_MANIFEST,
    JSON.stringify(manifest, null, 2),
    'utf-8'
  );

  console.log('\n✅ Atualização concluída!');
  console.log(`📊 Estatísticas:`);
  console.log(`   - URLs atualizadas: ${urlsAtualizadas}`);
  console.log(`   - URLs não encontradas: ${urlsNaoEncontradas}`);
  console.log(`   - Base URL atualizada para: ${manifest.baseUrl}`);
  console.log(`\n📄 Arquivo salvo: ${CASES_MANIFEST}`);
}

// Executar
atualizarManifest().catch(error => {
  console.error('❌ Erro ao atualizar manifest:', error);
  process.exit(1);
});
