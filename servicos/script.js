// =======================================================
// GSAP + LENIS: PÁGINA DE SERVIÇOS (AUDITORIA INDEPENDENTE)
// =======================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. REGISTRA O SCROLLTRIGGER DO GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 2. INICIALIZA A LENIS (SCROLL SUAVE AMANTEIGADO)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de aceleração suave da Apple
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
    });

    // Sincroniza a Lenis com o GSAP para as animações não tremerem
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);


    // =======================================================
    // ANIMAÇÃO 1 E 2: REVEAL (LETRA POR LETRA SNAP) + SCROLL LATERAL
    // =======================================================
    
    // 1. O Robô Simplificado: Apenas UMA camada de letra
    function wrapTextReveal(el) {
        const childNodes = Array.from(el.childNodes);
        el.innerHTML = ''; 
        childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const words = node.textContent.split(/(\s+)/); 
                words.forEach(word => {
                    if (word.trim().length > 0) {
                        const wordSpan = document.createElement('span');
                        wordSpan.className = 'wordWrapper';
                        
                        // Cria apenas a Letra Cinza
                        for (let i = 0; i < word.length; i++) {
                            const charSpan = document.createElement('span');
                            charSpan.className = 'charBase';
                            charSpan.textContent = word[i]; 
                            wordSpan.appendChild(charSpan);
                        }
                        el.appendChild(wordSpan);
                    } else {
                        el.appendChild(document.createTextNode(word)); 
                    }
                });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                wrapTextReveal(node); 
                el.appendChild(node);
            }
        });
    }

    // Aciona o Robô
    document.querySelectorAll('.revealText').forEach(wrapTextReveal);

    // 2. A Coreografia do GSAP
    const hSection = document.querySelector('.horizontalScrollSection');
    const hTrack = document.querySelector('.hScrollTrack');
    const p1Chars = document.querySelectorAll('.hScrollPanel:nth-child(1) .charBase');
    const p2Chars = document.querySelectorAll('.hScrollPanel:nth-child(2) .charBase');

    if (hSection && hTrack) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: hSection,
                start: "top top",
                end: "+=350%", 
                pin: true,
                scrub: 1, 
                invalidateOnRefresh: true
            }
        });

        // FASE 1: Acende as letras do Painel 1 (Muda do Cinza para o Preto seco ou Gradiente)
        if(p1Chars.length) {
            tl.to(p1Chars, {
                // A MÁGICA REPLICADA: Agora o painel 1 também reconhece o gradiente!
                color: (index, element) => element.closest('.highlightGradient') ? 'transparent' : '#111111',
                duration: 0.01, 
                stagger: { amount: 1 } 
            });
        }

        // FASE 2: Desliza a tela para a esquerda
        tl.to(hTrack, {
            x: () => -(window.innerWidth),
            ease: 'none',
            duration: 1.5 
        });

        // FASE 3: Acende as letras do Painel 2 
        if(p2Chars.length) {
            tl.to(p2Chars, {
                // A MÁGICA: Se a letra estiver dentro do gradiente, ela fica transparente (revelando o fundo). Senão, fica preta!
                color: (index, element) => element.closest('.highlightGradient') ? 'transparent' : '#111111',
                duration: 0.01, // O Snap!
                stagger: { amount: 1 }
            });
        }
    }

    // =======================================================
    // ANIMAÇÃO 3: PINNED SHOWCASE (Carrossel Vertical com Texto Fixo)
    // =======================================================
    const showcaseSection = document.querySelector('.pinnedShowcaseSection');
    const images = gsap.utils.toArray('.stackImg');
    const texts = gsap.utils.toArray('.stackTextBlock');

    if (showcaseSection && images.length > 0 && texts.length > 0) {
        
        // 1. Configura as posições de largada (Mudamos para 120 para criar o GAP!)
        gsap.set(images, { yPercent: 120, opacity: 0 }); 
        gsap.set(images[0], { yPercent: 0, opacity: 1 }); 
        
        gsap.set(texts, { autoAlpha: 0 }); 
        gsap.set(texts[0], { autoAlpha: 1 });

        // 2. Trava a Seção INTEIRA na tela (AGORA DINÂMICA!)
        const tlShowcase = gsap.timeline({
            scrollTrigger: {
                trigger: showcaseSection,
                start: "center center", 
                
                // A MÁGICA: Calcula o tamanho do scroll multiplicando a quantidade de imagens!
                // 150% de scroll para cada carta garante um ritmo constante em qualquer página.
                end: () => "+=" + (images.length * 50) + "%", 
                
                pin: true,
                scrub: 1, 
                invalidateOnRefresh: true
            }
        });

        // 3. O Loop com a nova distância
        for (let i = 0; i < images.length - 1; i++) {
            
            const label = `step${i}`;
            
            tlShowcase
                // A imagem atual sobe para -120% (Criando o gap na parte de cima)
                .to(images[i], { yPercent: -120, opacity: 0, duration: 1, ease: "power1.inOut" }, label)
                // A nova imagem vem lá do 120% (Criando o gap na parte de baixo)
                .fromTo(images[i+1], { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: "power1.inOut" }, label)
                
                .to(texts[i], { autoAlpha: 0, duration: 0.5 }, label)
                .to(texts[i+1], { autoAlpha: 1, duration: 0.5 }, `${label}+=0.5`);
        }
    }
});

// =======================================================
// MOTOR V8: CARROSSEL INFINITO (AUTO-SCROLL + DRAG)
// =======================================================
    const sdSlider = document.querySelector('.sdCardsCarousel');
    const sdTrack = document.querySelector('.sdCardsTrack');

    if (sdSlider && sdTrack) {
        // 1. Clona os cartões para garantir o loop infinito
        const sdCards = Array.from(sdTrack.children);
        sdCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            sdTrack.appendChild(clone);
        });

        // 2. Variáveis do Motor
        let isDownSd = false;
        let isHoveredSd = false;
        let isDraggingSd = false;
        let startXSd;
        let scrollLeftSd;
        const speedSd = 0.8; // Velocidade do auto-scroll (ajuste se quiser mais rápido)

        // 3. O Auto-Scroll Loop
        function autoScrollSd() {
            if (!isDownSd && !isHoveredSd) {
                sdSlider.scrollLeft += speedSd;
                if (sdSlider.scrollLeft >= sdTrack.scrollWidth / 2) {
                    sdSlider.scrollLeft = 0;
                }
            }
            requestAnimationFrame(autoScrollSd);
        }
        autoScrollSd();

        // 4. Pausar quando passar o mouse
        sdSlider.addEventListener('mouseenter', () => isHoveredSd = true);
        sdSlider.addEventListener('mouseleave', () => {
            isHoveredSd = false;
            isDownSd = false;
            sdSlider.style.cursor = 'grab';
            sdSlider.classList.remove('is-dragging'); // DESLIGA O ESCUDO
        });

        // 5. O Sistema de Arraste (Mãozinha e Escudo)
        sdSlider.style.cursor = 'grab';

        sdSlider.addEventListener('mousedown', (e) => {
            isDownSd = true;
            isDraggingSd = false;
            sdSlider.style.cursor = 'grabbing';
            sdSlider.classList.add('is-dragging'); // LIGA O ESCUDO ANTI-SELEÇÃO!
            startXSd = e.pageX - sdSlider.offsetLeft;
            scrollLeftSd = sdSlider.scrollLeft;
        });

        sdSlider.addEventListener('mouseup', () => {
            isDownSd = false;
            sdSlider.style.cursor = 'grab';
            sdSlider.classList.remove('is-dragging'); // DESLIGA O ESCUDO
        });

        sdSlider.addEventListener('mousemove', (e) => {
            if (!isDownSd) return;
            e.preventDefault();
            const x = e.pageX - sdSlider.offsetLeft;
            const walk = (x - startXSd) * 1.5;
            
            if (Math.abs(walk) > 5) isDraggingSd = true;

            let newScrollLeft = scrollLeftSd - walk;

            // Loop bidirecional manual
            if (newScrollLeft <= 0) {
                newScrollLeft += sdTrack.scrollWidth / 2;
                startXSd = e.pageX - sdSlider.offsetLeft;
                scrollLeftSd = newScrollLeft;
            } else if (newScrollLeft >= sdTrack.scrollWidth / 2) {
                newScrollLeft -= sdTrack.scrollWidth / 2;
                startXSd = e.pageX - sdSlider.offsetLeft;
                scrollLeftSd = newScrollLeft;
            }

            sdSlider.scrollLeft = newScrollLeft;
        });

        // 6. Prevenções Vitais de UX
        sdSlider.addEventListener('click', (e) => {
            if (isDraggingSd) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        // Evita que o navegador tente arrastar o ícone ou o texto como um arquivo fantasma
        sdSlider.querySelectorAll('.sdDarkCard, h3, p, svg').forEach(el => {
            el.addEventListener('dragstart', (e) => e.preventDefault());
        });
    }

    // =======================================================
    // ANIMAÇÃO SMOOTH DE SCROLL (REVEAL BIDIRECIONAL)
    // =======================================================
    
    // 1. Elementos ESTÁTICOS (Estes PODEM sofrer o transform translateY)
    const elementsToReveal = document.querySelectorAll(`
        .sdPainLeft h2, 
        .sdPainRight p, 
        .sdCombinedImage, 
        .sdCombinedText h2, 
        .sdCombinedText p, 
        .sdDarkCard, 
        .ctaImageBlock, 
        .ctaTextBlock,
        .blogHeader
        /* APAGAMOS O .blogGrid DAQUI! */
    `);

    elementsToReveal.forEach(el => {
        el.classList.add('reveal-on-scroll');
    });

    // 2. Cria o Olheiro (Observer)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" 
    });

    // 3. Manda o Olheiro vigiar os elementos estáticos
    elementsToReveal.forEach(el => revealObserver.observe(el));

    // 4. A SOLUÇÃO DEFINITIVA: O Carrossel ganha apenas o Fade-In puro!
    const blogGrid = document.querySelector('.blogGrid');
    if (blogGrid) {
        blogGrid.classList.add('reveal-opacity-only');
        revealObserver.observe(blogGrid);
    }

    // =======================================================
    // MOTOR DE SCROLL SUAVE AMANTEIGADO (LENIS)
    // =======================================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // A famosa curva de aceleração da Apple
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false, // Deixa o touch nativo do celular em paz (melhor para UX)
    });

    // O loop infinito que mantém o scroll rodando a 60fps
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);