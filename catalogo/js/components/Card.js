// Importa utilitários usados pelo componente
import { getYouTubeId, getRandomMatchScore, getRandomDuration, getRandomAgeBadge } from '../utils.js';

// Cria um cartão de filme/serie a partir do objeto `item`
export function createCard(item) {
    // Cria o elemento raiz do cartão e aplica a classe CSS
    const card = document.createElement('div');
    card.className = 'movie-card';

    // Se houver progresso (porcentagem), adiciona classe para exibir barra
    if (item.progress) {
        card.classList.add('has-progress');
    }

    // Cria o elemento de imagem do poster
    const img = document.createElement('img');
    img.src = item.img; // src aponta para a imagem do item
    img.alt = `Movie cover`; // texto alternativo básico

    // Cria um iframe que poderá reproduzir o trailer do YouTube
    const iframe = document.createElement('iframe');
    iframe.frameBorder = "0"; // remove borda padrão do iframe
    iframe.allow = "autoplay; encrypted-media"; // permissões necessárias para autoplay

    // Extrai o id do YouTube para montar a URL de embed quando necessário
    const videoId = getYouTubeId(item.youtube);

    // Insere o iframe antes da imagem para que o vídeo fique abaixo no stack e possa subir quando ativado
    card.appendChild(iframe);
    card.appendChild(img);

    // Gera um badge de idade aleatório (utilitário que retorna {text, class})
    const ageBadge = getRandomAgeBadge();

    // Cria a área de detalhes que aparece ao passar o mouse sobre o cartão
    const details = document.createElement('div');
    details.className = 'card-details';

    /*
      Monta o HTML interno dos detalhes:
      - botões de ação (play, adicionar, like)
      - indicadores (match score, idade, duração, resolução)
      - tags de gênero/descrição
      Note: usa funções utilitárias para preencher alguns valores dinamicamente.
    */
    details.innerHTML = `
        <div class="details-buttons">
            <div class="left-buttons">
                <button class="btn-icon btn-play-icon"><i class="fas fa-play" style="margin-left:2px;"></i></button>
                ${item.progress ? '<button class="btn-icon"><i class="fas fa-check"></i></button>' : '<button class="btn-icon"><i class="fas fa-plus"></i></button>'}
                <button class="btn-icon"><i class="fas fa-thumbs-up"></i></button>
            </div>
            <div class="right-buttons">
                <button class="btn-icon"><i class="fas fa-chevron-down"></i></button>
            </div>
        </div>
        <div class="details-info">
            <span class="match-score">${getRandomMatchScore()}% relevante</span>
            <span class="age-badge ${ageBadge.class}">${ageBadge.text}</span>
            <span class="duration">${getRandomDuration(item.progress)}</span>
            <span class="resolution">HD</span>
        </div>
        <div class="details-tags">
            <span>Drama</span>
            <span>Mistério</span>
            <span>Romance</span>
        </div>
    `;
    // Anexa o bloco de detalhes ao cartão
    card.appendChild(details);

    // Se houver progresso, cria a barra (container + valor) e aplica largura conforme percentagem
    if (item.progress) {
        const pbContainer = document.createElement('div');
        pbContainer.className = 'progress-bar-container';
        const pbValue = document.createElement('div');
        pbValue.className = 'progress-value';
        pbValue.style.width = `${item.progress}%`; // define visualmente o progresso
        pbContainer.appendChild(pbValue);
        card.appendChild(pbContainer);
    }

    // Variável para controlar o timeout antes de iniciar o autoplay do vídeo
    let playTimeout;

    // Ao entrar com o mouse sobre o cartão
    card.addEventListener('mouseenter', () => {
        // Calcula posição para ajustar origem da transformação e evitar corte nas bordas
        const rect = card.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        if (rect.left < 100) {
            // Se o cartão estiver próximo à borda esquerda, altera a origem para a esquerda
            card.classList.add('origin-left');
        } else if (rect.right > windowWidth - 100) {
            // Se estiver próximo à borda direita, altera origem para a direita
            card.classList.add('origin-right');
        }

        // Inicia um timeout (pequeno delay) antes de carregar o iframe para evitar carregamentos desnecessários
        playTimeout = setTimeout(() => {
            // Monta a URL do embed do YouTube com parâmetros para autoplay mudo e loop
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}`;
            // Marca iframe e imagem com classes para controle visual (ex: opacidade, z-index)
            iframe.classList.add('playing');
            img.classList.add('playing-video');
        }, 600); // 600ms de delay
    });

    // Ao sair com o mouse do cartão
    card.addEventListener('mouseleave', () => {
        // Cancela o timeout caso ainda não tenha sido executado
        clearTimeout(playTimeout);
        // Remove classes e limpa src do iframe para parar o vídeo
        iframe.classList.remove('playing');
        img.classList.remove('playing-video');
        iframe.src = ""; // limpa para parar o carregamento/execução
        // Remove classes de origem usadas para corrigir clipping
        card.classList.remove('origin-left');
        card.classList.remove('origin-right');
    });

    // Retorna o elemento DOM completo do cartão
    return card;
}
