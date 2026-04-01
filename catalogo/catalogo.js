// Lê `activeProfile` do localStorage e atualiza o navbar com nome e imagem
document.addEventListener('DOMContentLoaded', () => {
    try {
        const raw = localStorage.getItem('activeProfile');
        if (!raw) return;

        const profile = JSON.parse(raw);

        // Nome do perfil
        const nameEl = document.querySelector('.kids-link');
        if (nameEl && profile.name) {
            nameEl.textContent = profile.name;
        }

        // Avatar do perfil
        const imgEl = document.querySelector('.profile-icon');
        if (imgEl && profile.img) {

            let imgPath = profile.img;

            
            // se a imagem veio da index (assets/...), estamos dentro de /catalogo
            if (!imgPath.startsWith('http') && !imgPath.startsWith('../')) {
                imgPath = '../' + imgPath;
            }

            imgEl.src = imgPath;
            imgEl.alt = profile.name ? `${profile.name} (perfil)` : 'Perfil ativo';
        }

    } catch (err) {
        console.error('Erro ao carregar perfil ativo:', err);
    }
});