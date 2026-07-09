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

// ==========================================
// LOOP DA LAVA LAMP (CARTÕES DE CHANCELA)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const lavaCards = document.querySelectorAll('.cIconCard');
    if (lavaCards.length === 0) return;

    let currentIndex = 0;
    let lavaInterval;

    // Função que apaga todos e acende apenas um
    function activateLava(index) {
        lavaCards.forEach(card => card.classList.remove('is-active-lava'));
        lavaCards[index].classList.add('is-active-lava');
    }

    // Função que inicia o relógio de 3 segundos
    function startLavaLoop() {
        lavaInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % lavaCards.length; // Garante que volta para o 0 ao chegar no fim
            activateLava(currentIndex);
        }, 3000); // 3000ms = 3 segundos
    }

    // Função que para o relógio
    function stopLavaLoop() {
        clearInterval(lavaInterval);
    }

    // Dá o pontapé inicial assim que a página carrega
    activateLava(currentIndex);
    startLavaLoop();

    // UX Premium: Se o usuário passar o rato, ele assume o controlo da Lava!
    lavaCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            stopLavaLoop(); // Pausa o loop automático
            currentIndex = index; // O cartão atual passa a ser o que ele está a ver
            activateLava(currentIndex); // Acende o cartão imediatamente
        });
        
        card.addEventListener('mouseleave', () => {
            startLavaLoop(); // Retoma o loop quando o rato sai
        });
    });
});