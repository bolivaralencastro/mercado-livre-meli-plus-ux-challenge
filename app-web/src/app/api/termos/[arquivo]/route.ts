import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { arquivo: string } }
) {
  try {
    const arquivo = params.arquivo;
    const filePath = path.join(process.cwd(), 'src', 'app', 'pesquisa', 'termos', arquivo);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Arquivo não encontrado' },
        { status: 404 }
      );
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Erro ao ler arquivo:', error);
    return NextResponse.json(
      { error: 'Erro ao ler arquivo' },
      { status: 500 }
    );
  }
}
