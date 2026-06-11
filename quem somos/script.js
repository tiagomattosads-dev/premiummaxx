// ==========================================
// OBSERVADOR DE SCROLL (ANIMAÇÕES FADE-UP)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Configuração do radar
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Dispara quando 15% do elemento entra na tela
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Entrou na tela: mostra!
                entry.target.classList.add('is-visible');
            } else {
                // Saiu da tela: esconde de novo! (O efeito que você pediu)
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Caça todos os elementos que têm a classe 'fade-up' e liga o radar neles
    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach(el => scrollObserver.observe(el));
});