// Importa a função que cria os cartões individuais (cada filme/série)
import { createCard } from './Card.js';

// Cria um carrossel (seção deslizante) para uma categoria fornecida
// Recebe um objeto `category` com propriedades como `title` e `items`.
export function createCarousel(category) {
    // Elemento raiz do carrossel (contêiner da seção inteira)
    const section = document.createElement('div');
    section.className = 'slider-section';

    // Cabeçalho que contém título da categoria e indicadores/controles
    const header = document.createElement('div');
    header.className = 'slider-header';

    // Elemento de título (ex: "Séries", "Para você")
    const title = document.createElement('h2');
    title.className = 'slider-title';
    // Define o texto do título com o valor recebido na categoria
    title.innerText = category.title;

    // Área para indicadores (pontos, botões, contador, conforme CSS/JS adicional)
    const indicators = document.createElement('div');
    indicators.className = 'slider-indicators';

    // Monta o header: adiciona título e indicadores ao cabeçalho
    header.appendChild(title);
    header.appendChild(indicators);
    // Anexa o cabeçalho à seção raiz
    section.appendChild(header);

    // Cria a linha que conterá os cartões (fila de filmes)
    const row = document.createElement('div');
    row.className = 'movie-row';

    // Para cada item da categoria, cria um cartão e o adiciona à linha
    category.items.forEach(item => {
        // `createCard` constrói o DOM do cartão a partir do objeto `item`
        const card = createCard(item);
        // Anexa o cartão à linha de filmes
        row.appendChild(card);
    });

    // Anexa a linha (com todos os cartões) à seção
    section.appendChild(row);

    // Retorna o nó DOM completo da seção para ser inserido na página
    return section;
}
