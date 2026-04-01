// Importa os dados das categorias e o gerador de carrosséis
import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';

// Executa quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Recupera nome e imagem do perfil ativo do localStorage (se existirem)
    const nomePerfil = localStorage.getItem('perfilAtivoNome');
    const imagemPerfil = localStorage.getItem('perfilAtivoImagem');

    // Se ambos estiverem presentes, atualiza elementos da navbar com as informações do perfil
    if (nomePerfil && imagemPerfil) {
        const kidsLink = document.querySelector('.kids-link'); // elemento que mostra o nome do perfil
        const profileIcon = document.querySelector('.profile-icon'); // ícone/avatar do perfil
        
        if (kidsLink) kidsLink.textContent = nomePerfil; // insere o nome no texto do link
        if (profileIcon) profileIcon.src = imagemPerfil; // atualiza a imagem do avatar
    }

    // Seleciona o container principal onde os carrosséis serão inseridos
    const container = document.getElementById('main-content');
    
    
    // Se o container existir, itera sobre as categorias e monta cada carrossel
    if (container) {
        categories.forEach(category => {
            // Cria um DOM para o carrossel da categoria atual
            const carousel = createCarousel(category);
            // Anexa o carrossel ao container principal
            container.appendChild(carousel);
        });
    }
});
