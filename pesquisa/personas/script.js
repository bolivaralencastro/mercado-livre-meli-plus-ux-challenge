const data = {
  "personas": [
    {
      "id": "ana_paula_santos",
      "nome": "Ana Paula Santos — Compradora Frequente",
      "descricao_curta": "Mãe de classe média, compra semanalmente no ML, busca praticidade e economia.",
      "identificadores_visuais": {
        "genero": "feminino",
        "faixa_etaria": "35-40",
        "caracteristicas": [
          "cabelos castanhos escuros, lisos, na altura dos ombros",
          "pele morena clara",
          "expressão serena e confiante",
          "camiseta azul acinzentada",
          "fundo interno amarelado com caixas desfocadas"
        ]
      },
      "imagem": "ana_paula_santos.webp"
    },
    {
      "id": "camila_lima",
      "nome": "Camila Lima — Millennial Avaliadora de Benefícios",
      "descricao_curta": "Usuária crítica de serviços digitais, valoriza conveniência, streamings e custo-benefício.",
      "identificadores_visuais": {
        "genero": "feminino",
        "faixa_etaria": "30-35",
        "caracteristicas": [
          "cabelos castanhos ondulados presos em coque",
          "pele clara",
          "expressão leve e amigável",
          "moletom bege claro",
          "ambiente acolhedor com iluminação quente"
        ]
      },
      "imagem": "camila_lima.webp"
    },
    {
      "id": "gabriel_ferreira",
      "nome": "Gabriel Ferreira — Usuário Premium Integrado",
      "descricao_curta": "Jovem tech, usuário intensivo de mobile banking e apps premium, exigente com UX.",
      "identificadores_visuais": {
        "genero": "masculino",
        "faixa_etaria": "25-30",
        "caracteristicas": [
          "cabelos curtos cacheados",
          "pele morena clara",
          "rosto jovem, sorriso suave",
          "camiseta preta minimalista",
          "fundo azul corporativo desfocado"
        ]
      },
      "imagem": "gabriel_ferreira.webp"
    },
    {
      "id": "maria_oliveira",
      "nome": "Maria Oliveira — Usuária Sênior em Busca de Simplicidade",
      "descricao_curta": "Idosa conectada, usa ML e MP para compras e Pix, precisa de interfaces simples.",
      "identificadores_visuais": {
        "genero": "feminino",
        "faixa_etaria": "60-70",
        "caracteristicas": [
          "cabelos grisalhos presos",
          "expressão suave e acolhedora",
          "pele clara com rugas naturais",
          "camiseta bege clara",
          "fundo quente e doméstico"
        ]
      },
      "imagem": "maria_oliveira.webp"
    },
    {
      "id": "ricardo_almeida",
      "nome": "Ricardo Almeida — Empreendedor Analítico",
      "descricao_curta": "Usuário de Mercado Pago e vendedor ocasional, atento a taxas e transparência financeira.",
      "identificadores_visuais": {
        "genero": "masculino",
        "faixa_etaria": "30-35",
        "caracteristicas": [
          "cabelos curtos escuros",
          "barba alinhada",
          "pele parda",
          "camisa social azul escuro",
          "fundo azul moderno com luz natural"
        ]
      },
      "imagem": "ricardo_almeida.webp"
    },
    {
      "id": "thiago_rocha",
      "nome": "Thiago Rocha — Microempreendedor de Baixa Margem",
      "descricao_curta": "Vende acessórios e pequenos produtos, sensível a taxas e custos logísticos.",
      "identificadores_visuais": {
        "genero": "masculino",
        "faixa_etaria": "25-30",
        "caracteristicas": [
          "pele morena",
          "barba curta",
          "boné escuro",
          "camiseta marrom",
          "fundo quente de parede lisa ao ar livre"
        ]
      },
      "imagem": "thiago_rocha.webp"
    }
  ]
};

const container = document.getElementById('slider-container');
const indicatorsContainer = document.getElementById('indicators');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;
const totalSlides = data.personas.length;

function renderPersonas() {
    data.personas.forEach((persona, index) => {
        // Split name and role
        const [name, role] = persona.nome.split(' — ');

        const section = document.createElement('section');
        section.className = 'persona-section';
        section.id = persona.id;

        // Create characteristics list items
        const characteristicsList = persona.identificadores_visuais.caracteristicas
            .map(char => `<li>${char}</li>`)
            .join('');

        section.innerHTML = `
            <div class="persona-image-container">
                <img src="${persona.imagem}" alt="${name}" class="persona-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
                <div class="placeholder-text" style="display: none;">
                    <p>Imagem: ${persona.imagem}</p>
                    <p>(Arquivo não encontrado)</p>
                </div>
            </div>
            <div class="persona-content">
                <div class="persona-header">
                    <h1 class="persona-name">${name}</h1>
                    <h2 class="persona-role">${role || ''}</h2>
                </div>
                
                <div class="persona-description">
                    <p>${persona.descricao_curta}</p>
                </div>

                <div class="persona-details-grid">
                    <div class="detail-card">
                        <h3 class="detail-title">Perfil Demográfico</h3>
                        <ul class="detail-list">
                            <li><strong>Gênero:</strong> &nbsp; ${capitalize(persona.identificadores_visuais.genero)}</li>
                            <li><strong>Faixa Etária:</strong> &nbsp; ${persona.identificadores_visuais.faixa_etaria} anos</li>
                        </ul>
                    </div>
                    <div class="detail-card">
                        <h3 class="detail-title">Características Visuais</h3>
                        <ul class="detail-list">
                            ${characteristicsList}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(section);

        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function updateSlider() {
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update indicators
    document.querySelectorAll('.indicator').forEach((ind, idx) => {
        if (idx === currentIndex) {
            ind.classList.add('active');
        } else {
            ind.classList.remove('active');
        }
    });

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    
    nextBtn.disabled = currentIndex === totalSlides - 1;
    nextBtn.style.opacity = currentIndex === totalSlides - 1 ? '0.5' : '1';
}

function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
        currentIndex = index;
        updateSlider();
    }
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
        updateSlider();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    } else if (e.key === 'ArrowRight') {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateSlider();
        }
    }
});

// Initialize
renderPersonas();
updateSlider();
