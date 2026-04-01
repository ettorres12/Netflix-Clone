document.addEventListener('DOMContentLoaded', function () {
    const profileLinks = document.querySelectorAll('a.profile');

    profileLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            try {
                e.preventDefault();

                const imgEl = this.querySelector('img');
                const captionEl = this.querySelector('figcaption');

                const profile = {
                    name: captionEl ? captionEl.textContent.trim() : '',
                    img: imgEl ? imgEl.getAttribute('src') : ''
                };

                localStorage.setItem('activeProfile', JSON.stringify(profile));

            } catch (err) {
                console.error('Erro ao salvar perfil ativo:', err);
            }

            const href = this.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
        });
    });
});