// ==========================================
// PRELOADER (TELA DE CARREGAMENTO)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById('premiumPreloader');
  const preloaderBar = document.getElementById('preloaderBar');
  const preloaderPercent = document.getElementById('preloaderPercent');

  if (preloader) {
    // Verifica na "memória curta" do navegador se ele já viu o preloader hoje
    const hasVisited = sessionStorage.getItem('premiumPreloaderShown');

    if (!hasVisited) {
      // A MÁGICA DO TRAVAMENTO ABSOLUTO: Trava o Body E o HTML
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      let progress = 0;
      const duration = 5000; // 5 segundos totais
      const intervalTime = 30; // Atualiza a cada 30 milissegundos
      const step = (100 / (duration / intervalTime));

      const progressInterval = setInterval(() => {
        progress += step;

        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);

          // Quando chega no 100%, dá uma micropausa e some com o preloader
          setTimeout(() => {
            preloader.classList.add('is-hidden');

            // Libera o scroll do Body E do HTML
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            sessionStorage.setItem('premiumPreloaderShown', 'true'); // Grava que ele já viu
          }, 400);
        }

        // Atualiza a barra e o texto na tela
        preloaderBar.style.width = `${progress}%`;

        let currentPercent = `${Math.floor(progress)}%`;
        preloaderPercent.textContent = currentPercent;

        // A MÁGICA: Envia o número em tempo real para o CSS criar o reflexo!
        preloaderPercent.setAttribute('data-percent', currentPercent);

      }, intervalTime);

    } else {
      // Se ele já visitou o site nesta sessão, esconde o preloader instantaneamente
      preloader.style.display = 'none';
    }
  }
});

// ==========================================
// 0. COMPONENTE HEADER (ARQUITETURA TIPO REACT)
// ==========================================
const headerComponent = `
  <header class="siteHeader">
    
    <div class="topBar">
      <div class="container">
        <ul class="topBarLinks">
          <li><a href="#" class="openModalTrigger"><img src="/img/comentario-alt.svg" alt=""> Fale conosco</a></li>
          <li><a href="#"><img src="/img/terra-americas.svg" alt="">PT-BR</a></li>
          <li><a href="#"><img src="/img/user.svg" alt="">Área do Cliente</a></li>
          <li><a href="#"><img src="/img/pasta.svg" alt="">Acesso Interno</a></li>
        </ul>
      </div>
    </div>

    <div class="mainHeader">
      <div class="container mainHeaderFlex">
        
        <div class="logo">
          <a href="/index.html"><img src="/img/identidade visual/logo.svg" alt="Premium Maxx"></a>
        </div>

        <nav class="mainNav">
          <ul>
            <li><a href="/quem somos/index.html">quem somos</a></li>
            <li class="hasDropdown">
              <a href="#">serviços
                <svg class="setinha" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </a>
              <div class="megaMenu">
                <div class="megaMenuContainer">
                  <div class="megaMenuSidebar">
                    <button class="megaTab active" data-target="paneAuditoria">Auditoria Independente</button>
                    <button class="megaTab" data-target="paneTributaria">Consultoria Tributária</button>
                    <button class="megaTab" data-target="panePlanejamento">Planejamento Tributário</button>
                    <button class="megaTab" data-target="paneEmpresarial">Consultoria Empresarial</button>
                    <button class="megaTab" data-target="paneContabilidade">Contabilidade</button>
                  </div>
                  
                  <div class="megaMenuContent">
                    <div class="megaPane active" id="paneAuditoria">
                      <div class="paneGrid">
                        <a href="/servicos/auditoria-independente/exame-das-demonstracoes-financeiras.html">Exame das Demonstrações Financeiras</a>
                        <a href="/servicos/auditoria-independente/revisao-limitada-das-demonstracoes.html">Revisão Limitada das Demonstrações</a>
                        <a href="/servicos/auditoria-independente/procedimentos-previamente-acordados.html">Procedimentos Previamente Acordados</a>
                        <a href="/servicos/auditoria-independente/due-diligence.html">Due-Diligence</a>
                        <a href="/servicos/auditoria-independente/elaboracao-de-laudo-contabil.html">Elaboração de Laudo Contábil</a>
                        <a href="/servicos/auditoria-independente/inventario-fisico.html">Inventário Físico</a>
                      </div>
                    </div>
                    <div class="megaPane" id="paneTributaria">
                      <div class="paneGrid">
                        <a href="/servicos/consultoria-tributaria/tax-compliance.html">Tax Compliance (ECD, ECF, EFD, SPED)</a>
                        <a href="/servicos/consultoria-tributaria/transfer-pricing.html">Transfer Pricing / Thin Capitalization</a>
                        <a href="/servicos/consultoria-tributaria/atendimento-as-consultas-fiscais.html">Atendimento às consultas fiscais</a>
                        <a href="/servicos/consultoria-tributaria/beneficios-fiscais.html">Benefícios Fiscais</a>
                        <a href="/servicos/consultoria-tributaria/assessoria-em-defesa-administrativa.html">Assessoria em Defesa Administrativa</a>
                        <a href="/servicos/consultoria-tributaria/assessoria-tributaria-a-pessoa-fisica.html">Assessoria Tributária à Pessoa Física</a>
                        <a href="/servicos/consultoria-tributaria/assessoria-fiscal-em-repetro.html">Assessoria Fiscal em Repetro</a>
                      </div>
                    </div>
                    <div class="megaPane" id="panePlanejamento">
                      <div class="paneGrid">
                        <a href="/servicos/planejamento-tributario/estrategias-de-reducao-de-carga-tributaria.html">Estratégias de redução de carga tributária</a>
                        <a href="/servicos/planejamento-tributario/recuperacao-e-utilizacao-de-creditos-fiscais.html">Recuperação e utilização de Créditos Fiscais</a>
                      </div>
                    </div>
                    <div class="megaPane" id="paneEmpresarial">
                      <div class="paneGrid">
                        <a href="/servicos/consultoria-empresarial/gestao-de-processos.html">Gestão de Processos</a>
                        <a href="/servicos/consultoria-empresarial/estruturas-e-controles-empresariais.html">Estruturas e controles empresariais</a>
                      </div>
                    </div>
                    <div class="megaPane" id="paneContabilidade">
                      <div class="paneGrid">
                        <a href="/servicos/contabilidade/terceirizacao-da-contabilidade.html">Terceirização da Contabilidade</a>
                        <a href="/servicos/contabilidade/terceirizacao-fiscal.html">Terceirização Fiscal</a>
                        <a href="/servicos/contabilidade/terceirizacao-da-folha-de-pagamento.html">Terceirização da Folha de Pagamento</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li><a href="#" class="openDevModalTrigger">carreiras</a></li>
            <li><a href="#" class="openDevModalTrigger">temas atuais</a></li>
          </ul>
        </nav>

        <div class="globalSpotlight">
          <input type="text" placeholder="o que está procurando?">
          <button type="button"><img src="/img/procurar.svg" alt="Buscar"></button>
        </div>

        <button class="btnMenuMobile" id="btnMenuToggle">
            <span class="palito"></span>
            <span class="palito"></span>
            <span class="palito"></span>
        </button>

      </div> <div class="searchOverlay" id="searchOverlay">
        <div class="container">
          <div class="panelSearchWrapper">
            <input type="text" id="panelSearchInput" placeholder=" ">
            <img src="/img/procurar.svg" alt="Buscar" class="panelSearchIcon">
          </div>
          <div class="searchSuggestions" id="searchSuggestions">
            <h3>Você pode estar procurando sobre...</h3>
            <div class="carouselContainer" id="carouselContainer">
              <div class="searchCard active"><div class="cardContent">Título de algum artigo ou serviço...</div></div>
              <div class="searchCard"><div class="cardContent">Título de algum artigo ou serviço...</div></div>
              <div class="searchCard"><div class="cardContent">Título de algum artigo ou serviço...</div></div>
              <div class="searchCard"><div class="cardContent">Título de algum artigo ou serviço...</div></div>
              <div class="searchCard"><div class="cardContent">Título de algum artigo ou serviço...</div></div>
            </div>
          </div>
        </div>
      </div>
    </div> <div class="menuMobileOverlay" id="menuMobileOverlay">
        
        <div class="menuPainel ativo" id="painel-principal">
            <ul class="menuMobileItens">
                <li><a href="/quem-somos/index.html">QUEM SOMOS</a></li>
                <li class="abre-submenu" data-alvo="painel-servicos">
                    SERVIÇOS 
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="seta"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </li>
                <li><a href="#" class="openDevModalTrigger">CARREIRAS</a></li>
                <li><a href="#" class="openDevModalTrigger">TEMAS ATUAIS</a></li>
            </ul>
            <div class="menuMobileCta">
                <a href="#" class="btnCyan openModalTrigger">Fale com um Sócio</a>
            </div>
        </div>

        <div class="menuPainel" id="painel-servicos">
            <div class="topoPainel flex-between">
                <h3 class="tituloPainel">SERVIÇOS</h3>
                <button class="btnVoltarPequeno" data-alvo="painel-principal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="iconeVoltar"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    VOLTAR
                </button>
            </div>
            
            <ul class="menuMobileItens">
                <li class="abre-submenu" data-alvo="painel-auditoria">
                    Auditoria Independente
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="seta"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </li>
                <li class="abre-submenu" data-alvo="painel-tributaria">
                    Consultoria Tributária
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="seta"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </li>
                <li class="abre-submenu" data-alvo="painel-planejamento">
                    Planejamento Tributário
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="seta"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </li>
                <li class="abre-submenu" data-alvo="painel-empresarial">
                    Consultoria Empresarial
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="seta"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </li>
                <li class="abre-submenu" data-alvo="painel-contabilidade">
                    Contabilidade (BPO)
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="seta"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </li>
            </ul>
        </div>

    </div>
  </header> `;

function renderGlobalHeader() {
  const placeholder = document.getElementById('header-placeholder');
  if (placeholder) {
    placeholder.innerHTML = headerComponent;
    initHeaderLogic();
  }
}

// Executa a montagem instantaneamente
renderGlobalHeader();

// ==========================================
// 0.2 COMPONENTE FOOTER (RODAPÉ GLOBAL)
// =======================================3===
const footerComponent = `
  <footer class="siteFooter">
    <div class="container">

      <div class="footerTop">
        <div class="footerBrand">
          <img src="/img/identidade visual/logo.svg" alt="Premium Maxx" class="footerLogo">
          <p>Especialistas multifuncionais entregando excelência, governança e transparência para o mercado corporativo
            e de capitais.</p>
        </div>

        <div class="footerLinksGroup">
          <h4>Navegação</h4>
          <ul>
            <li><a href="#">Quem Somos</a></li>
            <li><a href="#">Nossos Serviços</a></li>
            <li><a href="#" class="openDevModalTrigger">Carreiras</a></li>
            <li><a href="#" class="openDevModalTrigger">Temas Atuais</a></li>
          </ul>
        </div>

        <div class="footerLinksGroup">
          <h4>Nossas Soluções</h4>
          <ul>
            <li><a href="/servicos/auditoria-independente/index.html" target="_blank">Auditoria Independente</a></li>
            <li><a href="/servicos/consultoria-tributaria/index.html" target="_blank">Consultoria Tributária</a></li>
            <li><a href="/servicos/planejamento-tributario/index.html" target="_blank">Planejamento Tributário</a></li>
            <li><a href="/servicos/consultoria-empresarial/index.html" target="_blank">Consultoria Empresarial</a></li>
            <li><a href="/servicos/contabilidade/index.html" target="_blank">Contabilidade</a></li>
          </ul>
        </div>

        <div class="footerContact">
          <h4>Fale com um Sócio</h4>
          <p class="contactEmail">contato@premiummaxx.com.br</p>
          <p class="contactPhone">+55 11 0000-0000</p>

          <div class="socialLinks">
            <a href="#" aria-label="LinkedIn">In</a>
            <a href="#" aria-label="Instagram">Ig</a>
            <a href="#" aria-label="YouTube">Yt</a>
          </div>
        </div>
      </div>

      <div class="footerBottom">
        <p>&copy; 2026 Premium Maxx. Todos os direitos reservados.</p>
        <div class="footerLegal">
          <a href="#">Política de Privacidade</a>
          <a href="#">Termos de Uso</a>
        </div>
      </div>

    </div>
  </footer>
`;

function renderGlobalFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) {
    placeholder.innerHTML = footerComponent;
  }
}

// Executa a montagem do rodapé instantaneamente
renderGlobalFooter();

// ==========================================
// LÓGICA DO HEADER
// ==========================================
function initHeaderLogic() {

  // Elementos do Cabeçalho com o NOVO NOME
  const headerSearchBtn = document.querySelector('.globalSpotlight button');
  const headerSearchInput = document.querySelector('.globalSpotlight input');
  const headerBtnIcon = document.querySelector('.globalSpotlight button img');
  const siteHeader = document.querySelector('.siteHeader');

  // Elementos do Painel
  const searchOverlay = document.getElementById('searchOverlay');
  const panelInput = document.getElementById('panelSearchInput');
  const searchSuggestions = document.getElementById('searchSuggestions');

  const btnMenuMobile = document.getElementById('btnMenuToggle');
  const menuMobileOverlay = document.getElementById('menuMobileOverlay');
  const paineis = document.querySelectorAll('.menuPainel');
  const botoesAbreSubmenu = document.querySelectorAll('.abre-submenu');
  const botoesVoltar = document.querySelectorAll('.btnVoltarPequeno');
  const bodyCorpo = document.body;

  if (btnMenuMobile && menuMobileOverlay) {
    btnMenuMobile.addEventListener('click', () => {
      btnMenuMobile.classList.toggle('ativo');
      menuMobileOverlay.classList.toggle('ativo');

      if (menuMobileOverlay.classList.contains('ativo')) {
        bodyCorpo.style.overflow = 'hidden';
      } else {
        bodyCorpo.style.overflow = '';
        setTimeout(() => {
          paineis.forEach(painel => painel.classList.remove('ativo', 'escondido-esquerda'));
          document.getElementById('painel-principal').classList.add('ativo');
        }, 400);
      }
    });

    botoesAbreSubmenu.forEach(botao => {
      botao.addEventListener('click', () => {
        const painelAlvo = document.getElementById(botao.getAttribute('data-alvo'));
        const painelAtual = botao.closest('.menuPainel');
        if (painelAlvo && painelAtual) {
          painelAtual.classList.remove('ativo');
          painelAtual.classList.add('escondido-esquerda');
          painelAlvo.classList.add('ativo');
        }
      });
    });

    botoesVoltar.forEach(botao => {
      botao.addEventListener('click', () => {
        const painelAlvo = document.getElementById(botao.getAttribute('data-alvo'));
        const painelAtual = botao.closest('.menuPainel');
        if (painelAlvo && painelAtual) {
          painelAtual.classList.remove('ativo');
          painelAlvo.classList.remove('escondido-esquerda');
          painelAlvo.classList.add('ativo');
        }
      });
    });
  }

  let isSearchOpen = false;
  let autoSlideInterval;

  // 1. ABRIR/FECHAR O PAINEL DE PESQUISA
  if (headerSearchInput && headerSearchBtn) {
    function toggleSearch() {
      isSearchOpen = !isSearchOpen;

      if (isSearchOpen) {
        document.querySelectorAll('.hasDropdown').forEach(dropdown => dropdown.classList.remove('open'));
        searchOverlay.classList.add('open');
        siteHeader.classList.add('headerSearchActive');
        headerBtnIcon.src = '/img/close.svg';
        panelInput.value = '';
        searchSuggestions.style.display = 'block';
        setTimeout(() => panelInput.focus(), 400);
        startSlide();
      } else {
        searchOverlay.classList.remove('open');
        siteHeader.classList.remove('headerSearchActive');
        headerBtnIcon.src = '/img/procurar.svg';
        stopSlide();
      }
    }

    headerSearchInput.addEventListener('click', toggleSearch);
    headerSearchBtn.addEventListener('click', toggleSearch);
  }

  // 2. LÓGICA DE DIGITAÇÃO
  if (panelInput) {
    panelInput.addEventListener('input', (e) => {
      if (e.target.value.trim().length > 0) {
        searchSuggestions.style.display = 'none';
        stopSlide();
      } else {
        searchSuggestions.style.display = 'block';
        startSlide();
      }
    });
  }

  // 3. LÓGICA DO CARROSSEL
  const carouselContainer = document.getElementById('carouselContainer');
  if (carouselContainer) {
    const originalCards = Array.from(document.querySelectorAll('.searchCard'));
    const totalOriginal = originalCards.length;

    originalCards.forEach(card => {
      let clone = card.cloneNode(true);
      clone.classList.remove('active');
      carouselContainer.appendChild(clone);
    });

    [...originalCards].reverse().forEach(card => {
      let clone = card.cloneNode(true);
      clone.classList.remove('active');
      carouselContainer.prepend(clone);
    });

    const allCards = document.querySelectorAll('.searchCard');
    let currentIndex = totalOriginal;

    allCards.forEach(c => c.classList.remove('active'));
    allCards[currentIndex].classList.add('active');
    carouselContainer.style.scrollBehavior = 'auto';
    allCards[currentIndex].scrollIntoView({ block: 'nearest', inline: 'center' });
    carouselContainer.style.scrollBehavior = 'smooth';

    let isWheelOnCooldown = false;
    let isAnimating = false;

    function moveToNextCard() {
      if (isAnimating) return;
      allCards[currentIndex].classList.remove('active');
      currentIndex++;
      allCards[currentIndex].classList.add('active');
      allCards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

      if (currentIndex >= totalOriginal * 2) {
        isAnimating = true;
        setTimeout(() => {
          carouselContainer.style.scrollBehavior = 'auto';
          allCards[currentIndex].classList.remove('active');
          currentIndex -= totalOriginal;
          allCards[currentIndex].classList.add('active');
          allCards[currentIndex].scrollIntoView({ block: 'nearest', inline: 'center' });
          void carouselContainer.offsetWidth;
          carouselContainer.style.scrollBehavior = 'smooth';
          isAnimating = false;
        }, 400);
      }
    }

    function moveToPrevCard() {
      if (isAnimating) return;
      allCards[currentIndex].classList.remove('active');
      currentIndex--;
      allCards[currentIndex].classList.add('active');
      allCards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

      if (currentIndex < totalOriginal) {
        isAnimating = true;
        setTimeout(() => {
          carouselContainer.style.scrollBehavior = 'auto';
          allCards[currentIndex].classList.remove('active');
          currentIndex += totalOriginal;
          allCards[currentIndex].classList.add('active');
          allCards[currentIndex].scrollIntoView({ block: 'nearest', inline: 'center' });
          void carouselContainer.offsetWidth;
          carouselContainer.style.scrollBehavior = 'smooth';
          isAnimating = false;
        }, 400);
      }
    }

    carouselContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (isWheelOnCooldown || isAnimating) return;
      isWheelOnCooldown = true;
      if (e.deltaY > 0 || e.deltaX > 0) {
        moveToNextCard();
        stopSlide();
      } else {
        moveToPrevCard();
        stopSlide();
      }
      setTimeout(() => {
        isWheelOnCooldown = false;
        startSlide();
      }, 500);
    }, { passive: false });

    function startSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(moveToNextCard, 3000);
    }

    function stopSlide() {
      clearInterval(autoSlideInterval);
    }

    carouselContainer.addEventListener('mouseenter', () => carouselContainer.classList.add('hoverMode'));
    carouselContainer.addEventListener('mouseleave', () => carouselContainer.classList.remove('hoverMode'));
    allCards.forEach(card => {
      card.addEventListener('mouseenter', stopSlide);
      card.addEventListener('mouseleave', startSlide);
    });
  }

  // 4. LÓGICA DO MEGA MENU
  const dropdownToggles = document.querySelectorAll('.hasDropdown > a');
  const hasDropdowns = document.querySelectorAll('.hasDropdown');
  const megaTabs = document.querySelectorAll('.megaTab');
  const megaPanes = document.querySelectorAll('.megaPane');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parentLi = toggle.parentElement;
      if (isSearchOpen) toggleSearch();
      hasDropdowns.forEach(dropdown => {
        if (dropdown !== parentLi) dropdown.classList.remove('open');
      });
      parentLi.classList.toggle('open');
    });
  });

  document.addEventListener('click', (e) => {
    hasDropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
    });
  });

  megaTabs.forEach(tab => {
    tab.addEventListener('mouseenter', () => {
      megaTabs.forEach(t => t.classList.remove('active'));
      megaPanes.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // 5. EFEITO MÁQUINA DE ESCREVER NO PLACEHOLDER
  const frasesBusca = [
    "Emissão de notas fiscais de aluguel...",
    "Isenções de ganho de capital...",
    "Empresas do Simples na Reforma Tributária..."
  ];

  let fraseAtual = 0;
  let letraAtual = 0;
  let apagando = false;

  function animarPlaceholder() {
    if (!panelInput) return;
    if (document.activeElement === panelInput && panelInput.value.length > 0) {
      setTimeout(animarPlaceholder, 1000);
      return;
    }
    const texto = frasesBusca[fraseAtual];
    panelInput.setAttribute('placeholder', texto.substring(0, letraAtual));

    let velocidade = apagando ? 30 : 60;
    if (!apagando && letraAtual === texto.length) {
      apagando = true;
      velocidade = 2000;
    } else if (apagando && letraAtual === 0) {
      apagando = false;
      fraseAtual = (fraseAtual + 1) % frasesBusca.length;
      velocidade = 500;
    } else {
      if (apagando) letraAtual--;
      else letraAtual++;
    }
    setTimeout(animarPlaceholder, velocidade);
  }
  animarPlaceholder();

  // =======================================================
  // 8. HEADER INTELIGENTE (AGORA PROTEGIDO AQUI DENTRO)
  // =======================================================
  const siteHeaderWrapper = document.querySelector('.siteHeader');
  const topBarEl = document.querySelector('.topBar');
  const mainHeaderEl = document.querySelector('.mainHeader');
  const stickySection = document.querySelector('.stickyScrollSpace');

  if (siteHeaderWrapper && mainHeaderEl) {
    window.addEventListener('scroll', () => {
      const topBarHeight = topBarEl ? topBarEl.offsetHeight : 40;

      if (window.scrollY > topBarHeight) {
        if (!mainHeaderEl.classList.contains('is-fixed')) {
          siteHeaderWrapper.style.paddingBottom = `${mainHeaderEl.offsetHeight}px`;
          mainHeaderEl.classList.add('is-fixed');
        }
      } else {
        if (mainHeaderEl.classList.contains('is-fixed')) {
          mainHeaderEl.classList.remove('is-fixed');
          siteHeaderWrapper.style.paddingBottom = '0px';
        }
      }

      if (stickySection) {
        const spaceRect = stickySection.getBoundingClientRect();
        if (spaceRect.top <= 0 && spaceRect.bottom > 100) {
          mainHeaderEl.classList.add('is-hidden');
        } else {
          mainHeaderEl.classList.remove('is-hidden');
        }
      }
    });
  }

} // <--- FIM DO INIT HEADER LOGIC


// =======================================================
// 6. LÓGICA DAS SEÇÕES DE SERVIÇOS (SLIDE INFINITO PERFEITO)
// =======================================================
const serviceSections = document.querySelectorAll('.premiumServiceSection');

serviceSections.forEach(section => {
  const rootData = section.querySelector('.catRootData');
  const titleEl = section.querySelector('.dynTitle');
  const descEl = section.querySelector('.dynDesc');
  const dynBtn = section.querySelector('.dynBtn');
  const prevBtn = section.querySelector('.pPrev');
  const nextBtn = section.querySelector('.pNext');
  const thumbsTrack = section.querySelector('.premiumThumbsTrack');
  const wrapper = section.querySelector('.premiumThumbsWrapper');
  const premiumBg = section.querySelector('.premiumBg');
  const defaultBgImage = premiumBg.style.backgroundImage;
  const originalThumbs = Array.from(section.querySelectorAll('.pThumb'));
  const totalOriginal = originalThumbs.length;
  const visibleLimit = Math.min(totalOriginal, 5);

  originalThumbs.forEach(thumb => {
    const clone = thumb.cloneNode(true);
    clone.classList.remove('active');
    thumbsTrack.appendChild(clone);
  });

  const allThumbs = Array.from(section.querySelectorAll('.pThumb'));
  const cardStep = 210;
  let currentItem = 0;
  let isAnimating = false;

  function applyVisuals(item, instant = false) {
    let currentMaxWidth;
    if (item === 0 || item === 'phantom_capa') {
      currentMaxWidth = (visibleLimit * 190) + ((visibleLimit - 1) * 20);
    } else {
      currentMaxWidth = 230 + ((visibleLimit - 1) * 190) + ((visibleLimit - 1) * 20);
    }

    if (instant) {
      thumbsTrack.style.transition = 'none';
      wrapper.style.transition = 'none';
    } else {
      thumbsTrack.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      wrapper.style.transition = 'max-width 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    wrapper.style.maxWidth = `${currentMaxWidth}px`;

    let trackPosItem = item;
    if (item === 'phantom_capa') trackPosItem = totalOriginal + 1;
    else if (item === 0) trackPosItem = 1;

    const offset = (trackPosItem - 1) * cardStep;
    thumbsTrack.style.transform = `translateX(-${offset}px)`;

    if (instant) void thumbsTrack.offsetWidth;

    if (item === 0 || item === 'phantom_capa') {
      titleEl.textContent = rootData.dataset.title;
      descEl.textContent = rootData.dataset.desc;
      dynBtn.classList.add('hidden');
      allThumbs.forEach(t => t.classList.remove('active'));
      premiumBg.style.backgroundImage = defaultBgImage;
    } else {
      const dataIndex = item - 1;
      const activeDataThumb = originalThumbs[dataIndex];
      titleEl.textContent = activeDataThumb.dataset.title;
      descEl.textContent = activeDataThumb.dataset.desc;
      dynBtn.href = activeDataThumb.dataset.link;
      dynBtn.classList.remove('hidden');

      allThumbs.forEach(t => t.classList.remove('active'));
      allThumbs[dataIndex].classList.add('active');
      allThumbs[dataIndex + totalOriginal].classList.add('active');
      premiumBg.style.backgroundImage = activeDataThumb.style.backgroundImage;
    }
  }

  nextBtn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    if (currentItem === totalOriginal) {
      currentItem = 0;
      applyVisuals('phantom_capa');
      setTimeout(() => {
        applyVisuals(0, true);
        isAnimating = false;
      }, 600);
    } else {
      currentItem++;
      applyVisuals(currentItem);
      setTimeout(() => { isAnimating = false; }, 600);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    if (currentItem === 0) {
      currentItem = totalOriginal;
      applyVisuals('phantom_capa', true);
      setTimeout(() => {
        applyVisuals(currentItem);
        setTimeout(() => { isAnimating = false; }, 600);
      }, 20);
    } else {
      currentItem--;
      applyVisuals(currentItem);
      setTimeout(() => { isAnimating = false; }, 600);
    }
  });

  allThumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      if (isAnimating) return;
      currentItem = (index % totalOriginal) + 1;
      applyVisuals(currentItem);
    });
  });

  applyVisuals(0, true);
});

// =======================================================
// 7. CONVERSOR DE SCROLL (EFEITO MAGNÉTICO E SMOOTHZINHO)
// =======================================================
const stickySpace = document.querySelector('.stickyScrollSpace');
const horizontalWrapper = document.querySelector('.servicesHorizontalWrapper');
const premiumSections = document.querySelectorAll('.premiumServiceSection');

if (stickySpace && horizontalWrapper && premiumSections.length > 0) {
  function updateMagneticScroll() {
    const spaceRect = stickySpace.getBoundingClientRect();
    let activeIndex = 0;
    if (spaceRect.top <= 0) {
      const scrolledPast = Math.abs(spaceRect.top);
      const totalScrollable = stickySpace.offsetHeight - window.innerHeight;
      const progress = Math.min(scrolledPast / totalScrollable, 1);
      activeIndex = Math.round(progress * (premiumSections.length - 1));
    }
    premiumSections.forEach((sec, index) => {
      sec.style.transform = `translateX(-${activeIndex * 100}%)`;
      if (index === activeIndex) sec.classList.add('is-active');
      else sec.classList.remove('is-active');
    });
  }
  window.addEventListener('scroll', updateMagneticScroll);
  updateMagneticScroll();
}

// =======================================================
// 0.3 COMPONENTE MODAL DE CONTATO INTELIGENTE (GLOBAL)
// =======================================================
const modalComponent = `
    <div class="glassModal" id="contactGlassModal">
      <div class="glassModalContent">
        <button class="closeModalBtn" id="closeContactModal">&times;</button>

        <div class="formProgress">
          <div class="progressBar" id="formProgressBar"></div>
        </div>

        <form id="premiumContactForm" class="typeformStyle">

          <div class="formStep active" data-step="1">
            <h3>Selecione o escopo do serviço que sua empresa necessita:</h3>
            
            <div class="inputGroup">
              <label class="fieldLabel">1. Categoria do Serviço</label>
              <div class="customDropdown" id="categoryDropdown">
                <div class="dropdownHeader" id="categoryHeader">Selecione a categoria... <span class="arrow">▼</span></div>
                <ul class="dropdownList">
                  <li data-value="Auditoria Independente">Auditoria Independente</li>
                  <li data-value="Consultoria Tributária">Consultoria Tributária</li>
                  <li data-value="Planejamento Tributário">Planejamento Tributário</li>
                  <li data-value="Consultoria Empresarial">Consultoria Empresarial e Governança</li>
                  <li data-value="Contabilidade">Contabilidade</li>
                </ul>
              </div>
              <input type="hidden" id="leadCategory" required>
            </div>

            <div class="inputGroup" id="subitemGroup" style="display: none; margin-top: 20px;">
              <label class="fieldLabel">Subitem Específico</label>
              <div class="customDropdown" id="subitemDropdown">
                <div class="dropdownHeader" id="subitemHeader">Selecione o escopo detalhado... <span class="arrow">▼</span></div>
                <ul class="dropdownList" id="subitemList">
                  </ul>
              </div>
              <input type="hidden" id="leadSubitem" required>
            </div>

            <button type="button" class="btnCyan stepNextBtn" id="btnNextStep1" style="margin-top: 25px;" disabled>Continuar</button>
          </div>

          <div class="formStep" data-step="2">
            <h3>2. Qual o ano (ou anos) objeto da revisão patrimonial/fiscal?</h3>
            <p style="color: #a0a0a0; font-size: 0.85rem; margin-bottom: 20px; margin-top: -5px;">Você pode selecionar múltiplas opções de acordo com a sua demanda.</p>
            
            <div class="yearsGrid">
              <label class="yearCheckboxLabel"><input type="checkbox" name="reviewYears" value="2026"> 2026</label>
              <label class="yearCheckboxLabel"><input type="checkbox" name="reviewYears" value="2025"> 2025</label>
              <label class="yearCheckboxLabel"><input type="checkbox" name="reviewYears" value="2024"> 2024</label>
              <label class="yearCheckboxLabel"><input type="checkbox" name="reviewYears" value="2023"> 2023</label>
              <label class="yearCheckboxLabel"><input type="checkbox" name="reviewYears" value="2022"> 2022</label>
              <label class="yearCheckboxLabel"><input type="checkbox" name="reviewYears" value="Anteriores"> Anteriores</label>
            </div>

            <div class="stepActions" style="margin-top: 30px;">
              <button type="button" class="btnBack stepPrevBtn">Voltar</button>
              <button type="button" class="btnCyan stepNextBtn" id="btnNextStep2" disabled>Continuar</button>
            </div>
          </div>

          <div class="formStep" data-step="3">
            <h3>3. Descreva brevemente o cenário ou desafio atual:</h3>
            <div class="inputGroup">
              <textarea id="problemDescription" placeholder="Ex: Detalhes sobre inconsistências levantadas, objetivos da reestruturação ou escopo exigido por investidores..." required></textarea>
            </div>
            <div class="stepActions">
              <button type="button" class="btnBack stepPrevBtn">Voltar</button>
              <button type="button" class="btnCyan stepNextBtn">Continuar</button>
            </div>
          </div>

          <div class="formStep" data-step="4">
            <h3>4. Qual é a Razão Social ou Nome Fantasia da empresa?</h3>
            <div class="inputGroup">
              <input type="text" id="companyName" placeholder="Digite aqui o nome da empresa..." required>
            </div>
            <div class="stepActions">
              <button type="button" class="btnBack stepPrevBtn">Voltar</button>
              <button type="button" class="btnCyan stepNextBtn">Continuar</button>
            </div>
          </div>

          <div class="formStep" data-step="5">
            <h3>5. Informe o CNPJ da empresa:</h3>
            <div class="inputGroup">
              <input type="text" id="companyCNPJ" placeholder="00.000.000/0000-00" required>
            </div>
            <div class="stepActions">
              <button type="button" class="btnBack stepPrevBtn">Voltar</button>
              <button type="button" class="btnCyan stepNextBtn">Continuar</button>
            </div>
          </div>

          <div class="formStep" data-step="6">
            <h3>6. Como se chama o profissional responsável por essa solicitação?</h3>
            <div class="inputGroup">
              <input type="text" id="professionalName" placeholder="Seu nome completo..." required>
            </div>
            <div class="stepActions">
              <button type="button" class="btnBack stepPrevBtn">Voltar</button>
              <button type="button" class="btnCyan stepNextBtn">Continuar</button>
            </div>
          </div>

          <div class="formStep" data-step="7">
            <h3>7. Informe o CPF do solicitante responsável:</h3>
            <div class="inputGroup">
              <input type="text" id="professionalCPF" placeholder="000.000.000-00" required>
            </div>
            <div class="stepActions">
              <button type="button" class="btnBack stepPrevBtn">Voltar</button>
              <button type="button" class="btnCyan stepNextBtn">Continuar</button>
            </div>
          </div>

          <div class="formStep" data-step="8">
            <h3>8. Qual o melhor e-mail corporativo para contato?</h3>
            <div class="inputGroup">
              <input type="email" id="professionalEmail" placeholder="seu.nome@empresa.com.br" required>
            </div>
            <div class="stepActions">
              <button type="button" class="btnBack stepPrevBtn">Voltar</button>
              <button type="button" class="btnCyan stepNextBtn">Continuar</button>
            </div>
          </div>

          <div class="formStep" data-step="9">
            <h3>9. E o número de celular ou WhatsApp para retorno?</h3>
            <div class="inputGroup">
              <input type="tel" id="professionalPhone" placeholder="(00) 00000-0000" required>
            </div>
            <div class="stepActions">
              <button type="button" class="btnBack stepPrevBtn">Voltar</button>
              <button type="submit" class="btnCyan">Solicitar Parecer Técnico</button>
            </div>
          </div>

          <div class="formStep successStep" data-step="10">
            <svg viewBox="0 0 24 24" fill="none" stroke="#03FAD5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h3>Proposta em processamento!</h3>
            <p>Nossos sócios seniores já estão revisando a sua pré-demanda estruturada.</p>
          </div>

        </form>
      </div>
    </div>
`;

// Base de dados relacional para o filtro cirúrgico
const subitemsData = {
  "Auditoria Independente": [
    "Exame das Demonstrações Financeiras",
    "Revisão Limitada das Demonstrações",
    "Procedimentos Previamente Acordados (PPA)",
    "Due-Diligence",
    "Elaboração de Laudo Contábil",
    "Inventário Físico"
  ],
  "Consultoria Tributária": [
    "Estratégias de Redução de Carga Tributária",
    "Recuperação e Utilização de Créditos Fiscais",
    "Tax Compliance (ECD, ECF, EFD, SPED)",
    "Transfer Pricing / Thin Capitalization",
    "Atendimento às Consultas Fiscais",
    "Benefícios Fiscais",
    "Assessoria em Defesa Administrativa",
    "Assessoria Tributária à Pessoa Física",
    "Assessoria Fiscal em Repetro"
  ],

  "Planejamento Tributário": [
    "Estratégias de redução de carga tributária",
    "Recuperação e utilização de Créditos Fiscais"
  ],

  "Consultoria Empresarial": [
    "Gestão de Processos",
    "Estruturas e Controles Empresariais"
  ],
  "Contabilidade": [
    "Terceirização da Contabilidade",
    "Terceirização Fiscal",
    "Terceirização da Folha de Pagamento"
  ]
};

function renderGlobalModal() {
  if (!document.getElementById('contactGlassModal')) {
    document.body.insertAdjacentHTML('beforeend', modalComponent);
    initModalLogic();
  }
}

function initModalLogic() {
  const modal = document.getElementById('contactGlassModal');
  const form = document.getElementById('premiumContactForm');
  const steps = Array.from(form.querySelectorAll('.formStep'));
  const progressBar = document.getElementById('formProgressBar');

  const catDropdown = document.getElementById('categoryDropdown');
  const catHeader = document.getElementById('categoryHeader');
  const catInput = document.getElementById('leadCategory');

  const subGroup = document.getElementById('subitemGroup');
  const subDropdown = document.getElementById('subitemDropdown');
  const subHeader = document.getElementById('subitemHeader');
  const subList = document.getElementById('subitemList');
  const subInput = document.getElementById('leadSubitem');
  const btnNext1 = document.getElementById('btnNextStep1');

  // Abre/Fecha Dropdown de Categoria (CORRIGIDO PARA is-open)
  catHeader.addEventListener('click', (e) => {
    e.stopPropagation();
    catDropdown.classList.toggle('is-open');
    subDropdown.classList.remove('is-open');
  });

  // Evento ao clicar em uma categoria principal
  catDropdown.querySelectorAll('.dropdownList li').forEach(li => {
    li.addEventListener('click', (e) => {
      e.stopPropagation();
      const selectedCat = li.getAttribute('data-value');
      catHeader.innerHTML = `${selectedCat} <span class="arrow">▼</span>`;
      catHeader.classList.add('has-value');
      catInput.value = selectedCat;
      catDropdown.classList.remove('is-open');

      subInput.value = "";
      subHeader.innerHTML = `Selecione o escopo detalhado... <span class="arrow">▼</span>`;
      subHeader.classList.remove('has-value');
      btnNext1.disabled = true;

      subList.innerHTML = "";
      const subitems = subitemsData[selectedCat] || [];

      subitems.forEach(item => {
        const itemLi = document.createElement('li');
        itemLi.setAttribute('data-value', item);
        itemLi.textContent = item;

        itemLi.addEventListener('click', (ev) => {
          ev.stopPropagation();
          subHeader.innerHTML = `${item} <span class="arrow">▼</span>`;
          subHeader.classList.add('has-value');
          subInput.value = item;
          subDropdown.classList.remove('is-open');
          btnNext1.disabled = false;
        });

        subList.appendChild(itemLi);
      });

      subGroup.style.display = "block";
    });
  });

  // Abre/Fecha Dropdown de Subitem (CORRIGIDO PARA is-open)
  subHeader.addEventListener('click', (e) => {
    e.stopPropagation();
    subDropdown.classList.toggle('is-open');
    catDropdown.classList.remove('is-open');
  });

  // Fecha dropdowns se clicar fora
  document.addEventListener('click', () => {
    catDropdown.classList.remove('is-open');
    subDropdown.classList.remove('is-open');
  });

  // Validação mecânica dos Checkboxes de Anos
  const checkboxes = form.querySelectorAll('input[name="reviewYears"]');
  const btnNext2 = document.getElementById('btnNextStep2');
  checkboxes.forEach(chk => {
    chk.addEventListener('change', () => {
      const checkedCount = form.querySelectorAll('input[name="reviewYears"]:checked').length;
      btnNext2.disabled = checkedCount === 0;
    });
  });

  // Formatação do Celular
  const phoneInput = document.getElementById('professionalPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 11) val = val.slice(0, 11);
      let formatted = val;
      if (val.length > 2) formatted = `(${val.slice(0, 2)}) ${val.slice(2)}`;
      if (val.length > 6) {
        if (val.length === 11) formatted = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
        else formatted = `(${val.slice(0, 2)}) ${val.slice(2, 6)}-${val.slice(6)}`;
      }
      e.target.value = formatted;
    });
  }

  // Formatação e Bloqueio de Letras no CNPJ (00.000.000/0000-00)
  const cnpjInput = document.getElementById('companyCNPJ');
  if (cnpjInput) {
    cnpjInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, ''); // Remove tudo o que não for número (letras caem aqui)
      if (val.length > 14) val = val.slice(0, 14); // Limita estritamente ao tamanho do CNPJ

      let formatted = val;
      if (val.length > 2) formatted = `${val.slice(0, 2)}.${val.slice(2)}`;
      if (val.length > 5) formatted = `${val.slice(0, 2)}.${val.slice(2, 5)}.${val.slice(5)}`;
      if (val.length > 8) formatted = `${val.slice(0, 2)}.${val.slice(2, 5)}.${val.slice(5, 8)}/${val.slice(8)}`;
      if (val.length > 12) formatted = `${val.slice(0, 2)}.${val.slice(2, 5)}.${val.slice(5, 8)}/${val.slice(8, 12)}-${val.slice(12)}`;

      e.target.value = formatted;
    });
  }

  // Formatação e Bloqueio de Letras no CPF (000.000.000-00)
  const cpfInput = document.getElementById('professionalCPF');
  if (cpfInput) {
    cpfInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, ''); // Remove letras e caracteres especiais
      if (val.length > 11) val = val.slice(0, 11); // Limita ao tamanho real do CPF

      let formatted = val;
      if (val.length > 3) formatted = `${val.slice(0, 3)}.${val.slice(3)}`;
      if (val.length > 6) formatted = `${val.slice(0, 3)}.${val.slice(3, 6)}.${val.slice(6)}`;
      if (val.length > 9) formatted = `${val.slice(0, 3)}.${val.slice(3, 6)}.${val.slice(6, 9)}-${val.slice(9)}`;

      e.target.value = formatted;
    });
  }

  // Navegação
  let currentStep = 1;
  const totalSteps = steps.length - 1;

  function updateFormState() {
    steps.forEach((step, idx) => {
      step.classList.toggle('active', idx === (currentStep - 1));
      if (idx === (currentStep - 1)) {
        const firstInput = step.querySelector('input:not([type="hidden"]), textarea');
        if (firstInput) setTimeout(() => firstInput.focus(), 250);
      }
    });
    const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressBar.style.width = `${progressPercent}%`;
  }

  form.querySelectorAll('.stepNextBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const currentStepEl = steps[currentStep - 1];
      const fields = currentStepEl.querySelectorAll('input[required], textarea[required]');
      let valid = true;

      fields.forEach(f => {
        if (!f.value) { valid = false; f.style.borderColor = "#ff4d4d"; }
        else { f.style.borderColor = "rgba(255,255,255,0.1)"; }
      });

      if (valid && currentStep < totalSteps) {
        currentStep++;
        updateFormState();
      }
    });
  });

  form.querySelectorAll('.stepPrevBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateFormState();
      }
    });
  });

  // Avançar com o "Enter"
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (e.target.tagName === 'TEXTAREA') return;
      e.preventDefault();
      const currentStepEl = steps[currentStep - 1];
      const nextBtn = currentStepEl.querySelector('.stepNextBtn');
      if (nextBtn && !nextBtn.disabled) {
        nextBtn.click();
      }
    }
  });

  function closeAndResetModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.closeModalBtn').forEach(b => {
    b.addEventListener('click', closeAndResetModal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeAndResetModal();
  });

  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('openModalTrigger') || e.target.closest('.openModalTrigger')) {
      e.preventDefault();
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      currentStep = 1;
      form.reset();
      subGroup.style.display = "none";
      btnNext1.disabled = true;
      btnNext2.disabled = true;
      catHeader.innerHTML = `Selecione a categoria... <span class="arrow">▼</span>`;
      catHeader.classList.remove('has-value');
      subHeader.innerHTML = `Selecione o escopo detalhado... <span class="arrow">▼</span>`;
      subHeader.classList.remove('has-value');
      updateFormState();
    }
  });

  // Envio final
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedYears = Array.from(form.querySelectorAll('input[name="reviewYears"]:checked')).map(c => c.value);

    const leadData = {
      categoria: document.getElementById('leadCategory').value,
      subitem: document.getElementById('leadSubitem').value,
      anosRevisao: selectedYears,
      descricao: document.getElementById('problemDescription').value,
      empresa: document.getElementById('companyName').value,
      cnpj: document.getElementById('companyCNPJ').value,
      profissional: document.getElementById('professionalName').value,
      cpf: document.getElementById('professionalCPF').value,
      email: document.getElementById('professionalEmail').value,
      celular: document.getElementById('professionalPhone').value
    };

    console.log("Premium Maxx Lead Capturado:", leadData);

    currentStep = steps.length;
    updateFormState();
    progressBar.style.width = "100%";

    setTimeout(() => {
      // Abre o WhatsApp e fecha a tela atual
      window.open("https://wa.me/5511000000000?text=Olá,%20gostaria%20de%20falar%20com%20um%20especialista.", "_blank");
      closeAndResetModal();
    }, 3500);
  });
}

// Inicia o motor
renderGlobalModal();

// =======================================================
// 0.4 COMPONENTE MODAL DE DESENVOLVIMENTO (EM BREVE)
// =======================================================
const devModalComponent = `
    <div class="glassModal" id="devGlassModal">
      <div class="glassModalContent" style="text-align: center; max-width: 450px; padding: 60px 40px;">
        <button class="closeModalBtn" id="closeDevModal">&times;</button>
        
        <svg viewBox="0 0 24 24" fill="none" stroke="#03FAD5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 64px; height: 64px; margin-bottom: 24px;">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        
        <h3 style="color: #ffffff; font-size: 26px; margin-bottom: 16px;">Área em Desenvolvimento</h3>
        <p style="color: #b3b3b3; font-size: 16px; line-height: 1.6; margin-bottom: 35px;">Nossos especialistas estão a preparar uma área exclusiva com novos conteúdos. Novidades em breve!</p>
        
        <button class="btnCyan" id="btnOkDev" style="width: 100%;">Entendi</button>
      </div>
    </div>
`;

function renderDevModal() {
  if (!document.getElementById('devGlassModal')) {
    document.body.insertAdjacentHTML('beforeend', devModalComponent);

    const devModal = document.getElementById('devGlassModal');
    const closeBtn = document.getElementById('closeDevModal');
    const okBtn = document.getElementById('btnOkDev');

    // Função de fechamento suave
    function closeDev() {
      devModal.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeDev);
    okBtn.addEventListener('click', closeDev);

    // Fecha ao clicar fora da caixa
    devModal.addEventListener('click', (e) => {
      if (e.target === devModal) closeDev();
    });

    // Escuta global pelo clique nos links do menu e rodapé
    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('openDevModalTrigger') || e.target.closest('.openDevModalTrigger')) {
        e.preventDefault();
        devModal.classList.add('is-open');
        document.body.style.overflow = 'hidden'; // Trava o scroll do site
      }
    });
  }
}

// Inicia o motor do Modal de Desenvolvimento
renderDevModal();


// =======================================================
// MOTOR UNIFICADO DO CARROSSEL INFINITO DRAGGABLE
// =======================================================
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector('.blogGrid');
  const track = document.querySelector('.blogTrack');

  if (slider && track) {
    // 1. Clona os cartões originais e joga no final da pista para criar o loop
    const cards = Array.from(track.children);
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true'); // Acessibilidade: leitores de tela ignoram
      track.appendChild(clone);
    });


    // =======================================================

    // 2. Variáveis do Motor
    let isDown = false;
    let isHovered = false;
    let isDragging = false;
    let startX;
    let scrollLeft;
    let animationId;
    const speed = 1.2; // Velocidade do auto-scroll constante

    // 3. A Mágica do Auto-Scroll Constante e Infinito
    function autoScroll() {
      if (!isDown && !isHovered) {
        slider.scrollLeft += speed;
        // Se o scroll passou da metade (fim dos originais), reseta imperceptivelmente pro 0
        if (slider.scrollLeft >= track.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    }
    autoScroll(); // Dá a partida no motor!

    // 4. Pausar ao passar o mouse
    slider.addEventListener('mouseenter', () => isHovered = true);
    slider.addEventListener('mouseleave', () => {
      isHovered = false;
      isDown = false; // Solta o card se o mouse sair da tela
      slider.style.cursor = 'grab';
      slider.classList.remove('is-dragging'); // UX: Desliga a classe de arraste
    });

    // 5. O Sistema de Arraste Blindado com Mãozinha
    slider.style.cursor = 'grab';

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      isDragging = false;
      slider.style.cursor = 'grabbing';
      slider.classList.add('is-dragging'); // UX: Classe CSS anti-seleção
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.style.cursor = 'grab';
      slider.classList.remove('is-dragging');
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;

      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5; // Multiplicador de sensibilidade do arraste

      // Se moveu mais que 5px, confirma que é um arrasto e não um clique
      if (Math.abs(walk) > 5) isDragging = true;

      let newScrollLeft = scrollLeft - walk;

      // === LOOP BIDIRECIONAL BLINDADO PARA O REFLEXO ===
      // Se o usuário arrastar muito pra trás, o reflexo CSS precisa do loop blindado
      if (newScrollLeft <= 0) {
        newScrollLeft += track.scrollWidth / 2;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = newScrollLeft;
      } else if (newScrollLeft >= track.scrollWidth / 2) {
        newScrollLeft -= track.scrollWidth / 2;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = newScrollLeft;
      }

      slider.scrollLeft = newScrollLeft;
    });

    // 6. Prevenções Vitais de UX
    // Evita que o usuário abra o artigo sem querer ao soltar o clique do arrasto
    slider.addEventListener('click', (e) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
      }
    });

    // Evita que o navegador tente abrir a "imagem fantasma" ao arrastar
    slider.querySelectorAll('a, img').forEach(el => {
      el.addEventListener('dragstart', (e) => e.preventDefault());
    });
  }
});