// ==========================================
// MOTOR DE INTERNACIONALIZAÇÃO (i18n) TURBINADO MAX
// ==========================================
function changeLanguage(lang) {
  localStorage.setItem('premiumMaxxLang', lang);

  const langTextMap = { pt: 'PT-BR', en: 'EN-US', es: 'ES' };
  const currentLangText = document.getElementById('currentLangText');
  if (currentLangText) currentLangText.textContent = langTextMap[lang];

  const currentLangTextMobile = document.getElementById('currentLangTextMobile');
  if (currentLangTextMobile) currentLangTextMobile.textContent = langTextMap[lang];

  // 5. LÓGICA DO MENU MOBILE (BANDEIRAS E CORES)
  document.querySelectorAll('.lang-opt').forEach(el => {
    if(el.getAttribute('data-lang') === lang) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // 1. Traduz Textos Normais no HTML
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) element.innerHTML = i18n[lang][key]; 
  });

  // 2. Traduz Placeholders de Input
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (i18n[lang] && i18n[lang][key]) element.setAttribute('placeholder', i18n[lang][key]);
  });

  // 3. O TRUQUE NINJA: Envia a tradução para o CSS
  if (i18n[lang] && i18n[lang].dev_css_msg) {
    document.querySelectorAll('.homeBlogSection, .searchSuggestions').forEach(el => {
      el.setAttribute('data-dev-msg', i18n[lang].dev_css_msg);
    });
  }

  

  // 4. A NOVA MÁGICA: Traduz os Títulos e Descrições Ocultos dos Cartões!
  document.querySelectorAll('[data-i18n-title]').forEach(element => {
    const key = element.getAttribute('data-i18n-title');
    if (i18n[lang] && i18n[lang][key]) element.setAttribute('data-title', i18n[lang][key]);
  });
  document.querySelectorAll('[data-i18n-desc]').forEach(element => {
    const key = element.getAttribute('data-i18n-desc');
    if (i18n[lang] && i18n[lang][key]) element.setAttribute('data-desc', i18n[lang][key]);
  });

  // 5. Atualiza o texto na tela para o cartão que JÁ ESTÁ visível no momento do clique
  document.querySelectorAll('.premiumServiceSection').forEach(sec => {
    const activeThumb = sec.querySelector('.pThumb.active') || sec.querySelector('.catRootData');
    if (activeThumb) {
      sec.querySelector('.dynTitle').textContent = activeThumb.getAttribute('data-title');
      sec.querySelector('.dynDesc').textContent = activeThumb.getAttribute('data-desc');
    }
  });

  
}

// ==========================================
// INICIALIZADOR DO IDIOMA (MEMÓRIA PERSISTENTE)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Busca o idioma na memória do navegador. Se for a primeira visita, define 'pt' como padrão.
  const savedLang = localStorage.getItem('premiumMaxxLang') || 'pt';
  
  // Roda o motor de tradução automaticamente antes mesmo do usuário piscar!
  changeLanguage(savedLang);
});

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
      const duration = 3000; // 3 segundos totais
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
          <li><a href="#" class="openModalTrigger"><img src="/img/comentario-alt.svg" alt=""> <span data-i18n="top_fale">Fale conosco</span></a></li>
          
          <li class="langSelector">
             <a id="currentLangBtn"><img src="/img/terra-americas.svg" alt=""><span id="currentLangText">PT-BR</span></a>
             <ul class="langDropdown">
                <li onclick="changeLanguage('pt')"><a>PT-BR</a></li>
                <li onclick="changeLanguage('en')"><a>EN-US</a></li>
                <li onclick="changeLanguage('es')"><a>ES</a></li>
             </ul>
          </li>
          
          <li><a href="#"><img src="/img/user.svg" alt=""><span data-i18n="top_cliente">Área do Cliente</span></a></li>
          <li><a href="#"><img src="/img/pasta.svg" alt=""><span data-i18n="top_interno">Acesso Interno</span></a></li>
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
            <li><a href="/quem somos/index.html" data-i18n="nav_quem_somos">quem somos</a></li>
            <li><a href="#" class="openDevModalTrigger" data-i18n="nav_carreiras">carreiras</a></li>
            <li><a href="https://premiummaxx.blog.br/"  data-i18n="nav_temas" target="_blank" >temas atuais</a></li>
            
            <!-- O SERVIÇOS E O MEGA MENU AGORA FICAM AQUI NO FINAL -->
            <li class="hasDropdown">
              <a href="#"><span data-i18n="nav_servicos">serviços</span>
                <svg class="setinha" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </a>
              <div class="megaMenu">
                <div class="megaMenuContainer">
                  <div class="megaMenuSidebar">
                    <a href="/servicos/auditoria-independente/index.html" class="megaTab active" data-target="paneAuditoria" data-i18n="cat_auditoria">Auditoria Independente</a>
                    <a href="/servicos/consultoria-tributaria/index.html" class="megaTab" data-target="paneTributaria" data-i18n="cat_tributaria">Consultoria Tributária</a>
                    <a href="/servicos/planejamento-tributario/index.html" class="megaTab" data-target="panePlanejamento" data-i18n="cat_planejamento">Planejamento Tributário</a>
                    <a href="/servicos/consultoria-empresarial/index.html" class="megaTab" data-target="paneEmpresarial" data-i18n="cat_empresarial">Consultoria Empresarial</a>
                    <a href="/servicos/contabilidade/index.html" class="megaTab" data-target="paneContabilidade" data-i18n="cat_contabilidade">Contabilidade</a>
                    <a class="megaTab" data-target="paneOutrasSolucoes" data-i18n="cat_outras" style="cursor: default;">Outras Soluções</a>
                  </div>
                  
                  <div class="megaMenuContent">
                    <div class="megaPane active" id="paneAuditoria">
                      <div class="paneGrid">
                        <a href="/servicos/auditoria-independente/exame-das-demonstracoes-financeiras.html" data-i18n="menu_aud_1">Exame das Demonstrações Financeiras</a>
                        <a href="/servicos/auditoria-independente/revisao-limitada-das-demonstracoes.html" data-i18n="menu_aud_2">Revisão Limitada das Demonstrações</a>
                        <a href="/servicos/auditoria-independente/procedimentos-previamente-acordados.html" data-i18n="menu_aud_3">Procedimentos Previamente Acordados</a>
                        <a href="/servicos/auditoria-independente/due-diligence.html" data-i18n="menu_aud_4">Due-Diligence</a>
                        <a href="/servicos/auditoria-independente/elaboracao-de-laudo-contabil.html" data-i18n="menu_aud_5">Elaboração de Laudo Contábil</a>
                        <a href="/servicos/auditoria-independente/inventario-fisico.html" data-i18n="menu_aud_6">Inventário Físico</a>
                      </div>
                    </div>
                    <div class="megaPane" id="paneTributaria">
                      <div class="paneGrid">
                        <a href="/servicos/consultoria-tributaria/tax-compliance.html" data-i18n="menu_tri_1">Tax Compliance (ECD, ECF, EFD, SPED)</a>
                        <a href="/servicos/consultoria-tributaria/transfer-pricing.html" data-i18n="menu_tri_2">Transfer Pricing / Thin Capitalization</a>
                        <a href="/servicos/consultoria-tributaria/atendimento-as-consultas-fiscais.html" data-i18n="menu_tri_3">Atendimento às consultas fiscais</a>
                        <a href="/servicos/consultoria-tributaria/beneficios-fiscais.html" data-i18n="menu_tri_4">Benefícios Fiscais</a>
                        <a href="/servicos/consultoria-tributaria/assessoria-em-defesa-administrativa.html" data-i18n="menu_tri_5">Assessoria em Defesa Administrativa</a>
                        <a href="/servicos/consultoria-tributaria/assessoria-tributaria-a-pessoa-fisica.html" data-i18n="menu_tri_6">Assessoria Tributária à Pessoa Física</a>
                        <a href="/servicos/consultoria-tributaria/assessoria-fiscal-em-repetro.html" data-i18n="menu_tri_7">Assessoria Fiscal em Repetro</a>
                        <a href="/servicos/consultoria-tributaria/ifrs-18.html" data-i18n="menu_tri_8">Adequação à IFRS 18</a>
                        <a href="/servicos/consultoria-tributaria/reforma-tributaria-ibs-cbs.html" data-i18n="menu_tri_9">IBS e CBS (Reforma Tributária)</a>
                      </div>
                    </div>
                    <div class="megaPane" id="panePlanejamento">
                      <div class="paneGrid">
                        <a href="/servicos/planejamento-tributario/estrategias-de-reducao-de-carga-tributaria.html" data-i18n="menu_pla_1">Estratégias de redução de carga tributária</a>
                        <a href="/servicos/planejamento-tributario/recuperacao-e-utilizacao-de-creditos-fiscais.html" data-i18n="menu_pla_2">Recuperação e utilização de Créditos Fiscais</a>
                      </div>
                    </div>
                    <div class="megaPane" id="paneEmpresarial">
                      <div class="paneGrid">
                        <a href="/servicos/consultoria-empresarial/gestao-de-processos.html" data-i18n="menu_emp_1">Gestão de Processos</a>
                        <a href="/servicos/consultoria-empresarial/estruturas-e-controles-empresariais.html" data-i18n="menu_emp_2">Estruturas e controles empresariais</a>
                      </div>
                    </div>
                    <div class="megaPane" id="paneContabilidade">
                      <div class="paneGrid">
                        <a href="/servicos/contabilidade/terceirizacao-da-contabilidade.html" data-i18n="menu_con_1">Terceirização da Contabilidade</a>
                        <a href="/servicos/contabilidade/terceirizacao-fiscal.html" data-i18n="menu_con_2">Terceirização Fiscal</a>
                        <a href="/servicos/contabilidade/terceirizacao-da-folha-de-pagamento.html" data-i18n="menu_con_3">Terceirização da Folha de Pagamento</a>
                      </div>
                    </div>
                  <div class="megaPane" id="paneOutrasSolucoes">
                    <div class="paneGrid">
                      <a href="/servicos/auditoria-especial.html" data-i18n="menu_out_1">Auditoria Especial</a>
                      <a href="/servicos/holding-familiar.html" data-i18n="menu_out_2">Holding Familiar</a>
                      <a href="/servicos/abertura-de-empresas.html" data-i18n="menu_out_3">Abertura de Empresas</a>
                      <a href="/servicos/locacao-de-mao-de-obra.html" data-i18n="menu_out_4">Locação de Mão de Obra (Loan Staff)</a>
                      <a href="/servicos/valuation.html" data-i18n="menu_out_5">Valuation</a>
                      <a href="/servicos/analise-de-contratos.html" data-i18n="menu_out_6">Análise de Contratos</a>
                      <a href="/servicos/assessoria-em-ipo.html" data-i18n="menu_out_7">Assessoria em IPO</a>
                      <a href="/servicos/direito-creditorio.html" data-i18n="menu_out_8">Direito Creditório</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>

        <div class="globalSpotlight">
          <input type="text" placeholder="o que está procurando?" data-i18n-placeholder="search_default">
          <button type="button"><img src="/img/procurar.svg" alt="Buscar"></button>
        </div>

        <button class="btnMenuMobile" id="btnMenuToggle">
            <span class="palito"></span>
            <span class="palito"></span>
            <span class="palito"></span>
        </button>

      </div> 
      
      <div class="searchOverlay" id="searchOverlay">
        <div class="container">
          <div class="panelSearchWrapper">
            <input type="text" id="panelSearchInput" placeholder=" ">
            <img src="/img/procurar.svg" alt="Buscar" class="panelSearchIcon">
          </div>
          <!-- A CAIXA QUE TINHA SUMIDO ESTÁ AQUI DE VOLTA: -->
          <div class="searchSuggestions" id="searchSuggestions">
            <h3 data-i18n="search_title">Você pode estar procurando sobre...</h3>
            <div class="carouselContainer" id="carouselContainer">
              
              <!-- Cartão 1: Due Diligence -->
              <a href="/servicos/auditoria-independente/due-diligence.html" class="searchCard active" style="background-image: url('/img/servicos/due-diligence.webp'); background-size: cover; background-position: center;">
                <div class="cardContent" data-i18n="menu_aud_4">Due-Diligence</div>
              </a>
              
              <!-- Cartão 2: Redução de Carga Tributária -->
              <a href="/servicos/planejamento-tributario/estrategias-de-reducao-de-carga-tributaria.html" class="searchCard" style="background-image: url('/img/servicos/estratégias-de-redução-de-carga-tributária.webp'); background-size: cover; background-position: center;">
                <div class="cardContent" data-i18n="menu_pla_1">Estratégias de redução de carga tributária</div>
              </a>
              
              <!-- Cartão 3: Gestão de Processos -->
              <a href="/servicos/consultoria-empresarial/gestao-de-processos.html" class="searchCard" style="background-image: url('/img/servicos/gestao-de-processos.webp'); background-size: cover; background-position: center;">
                <div class="cardContent" data-i18n="menu_emp_1">Gestão de Processos</div>
              </a>
              
              <!-- Cartão 4: Terceirização Contábil -->
              <a href="/servicos/contabilidade/terceirizacao-da-contabilidade.html" class="searchCard" style="background-image: url('/img/servicos/terceirizacao-contabilidade.webp'); background-size: cover; background-position: center;">
                <div class="cardContent" data-i18n="menu_con_1">Terceirização da Contabilidade</div>
              </a>
              
              <!-- Cartão 5: Artigos do Blog (Link Externo) -->
              <a href="https://premiummaxx.blog.br/" target="_blank" class="searchCard" style="background-image: url('/img/placeholder-1.jpg'); background-size: cover; background-position: center;">
                <div class="cardContent" data-i18n="nav_temas">Temas Atuais</div>
              </a>

            </div>
          </div>
        </div>
      </div>

      <div class="menuMobileOverlay" id="menuMobileOverlay">
        
        <div class="menuPainel ativo" id="painel-principal">
            <ul class="menuMobileItens">
                <li><a href="/quem somos/index.html" data-i18n="nav_quem_somos">QUEM SOMOS</a></li>
                <li><a href="#" class="openDevModalTrigger" data-i18n="nav_carreiras">CARREIRAS</a></li>
                <li><a href="https://premiummaxx.blog.br/" data-i18n="nav_temas" target="_blank">TEMAS ATUAIS</a></li>
                
                <!-- O SERVIÇOS AGORA FICA AQUI NO FINAL DO MOBILE -->
                <li class="abre-submenu" data-alvo="painel-servicos">
                    <span data-i18n="nav_servicos">SERVIÇOS</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="seta"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </li>
            </ul>
            
            <div class="menuMobileCta">
                <a href="#" class="btnCyan openModalTrigger" data-i18n="footer_contact">Fale com um Sócio</a>
            </div>

            <div class="menuMobileSecondary">
                <a href="#" class="openModalTrigger"><img src="/img/comentario-alt.svg" alt=""> <span data-i18n="top_fale">Fale conosco</span></a>
                
                <div class="langSelectorMobile">
                    <div class="langLabelMobile">
                        <img src="/img/terra-americas.svg" alt=""> <span data-i18n="mobile_lang">Escolha um idioma</span>
                    </div>
                    <div class="langOptionsMobile">
                        <span onclick="changeLanguage('pt')" class="lang-opt" data-lang="pt">
                            <img src="https://flagcdn.com/br.svg" class="flag-icon" alt="BR"> PT-BR
                        </span>
                        <span onclick="changeLanguage('en')" class="lang-opt" data-lang="en">
                            <img src="https://flagcdn.com/us.svg" class="flag-icon" alt="US"> EN-US
                        </span>
                        <span onclick="changeLanguage('es')" class="lang-opt" data-lang="es">
                            <img src="https://flagcdn.com/es.svg" class="flag-icon" alt="ES"> ES
                        </span>
                    </div>
                </div>

                <a href="#"><img src="/img/user.svg" alt=""><span data-i18n="top_cliente">Área do Cliente</span></a>
                <a href="#"><img src="/img/pasta.svg" alt=""><span data-i18n="top_interno">Acesso Interno</span></a>
            </div>
        </div>

        <div class="menuPainel" id="painel-servicos">
            <div class="topoPainel flex-between">
                <h3 class="tituloPainel" data-i18n="nav_servicos">SERVIÇOS</h3>
                <button class="btnVoltarPequeno" data-alvo="painel-principal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="iconeVoltar"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    VOLTAR
                </button>
            </div>
            
            <ul class="menuMobileItens">
                <li class="item-dividido">
                    <a href="/servicos/auditoria-independente/index.html" class="link-categoria" data-i18n="cat_auditoria">Auditoria Independente</a>
                    <div class="abre-submenu hitbox-seta" data-alvo="painel-auditoria">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="seta"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </div>
                </li>

                <li class="item-dividido">
                    <a href="/servicos/consultoria-tributaria/index.html" class="link-categoria" data-i18n="cat_tributaria">Consultoria Tributária</a>
                    <div class="abre-submenu hitbox-seta" data-alvo="painel-tributaria">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="seta"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </div>
                </li>

                <li class="item-dividido">
                    <a href="/servicos/planejamento-tributario/index.html" class="link-categoria" data-i18n="cat_planejamento">Planejamento Tributário</a>
                    <div class="abre-submenu hitbox-seta" data-alvo="painel-planejamento">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="seta"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </div>
                </li>

                <li class="item-dividido">
                    <a href="/servicos/consultoria-empresarial/index.html" class="link-categoria" data-i18n="cat_empresarial">Consultoria Empresarial</a>
                    <div class="abre-submenu hitbox-seta" data-alvo="painel-empresarial">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="seta"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </div>
                </li>

                <li class="item-dividido">
                    <a href="/servicos/contabilidade/index.html" class="link-categoria" data-i18n="cat_contabilidade">Contabilidade</a>
                    <div class="abre-submenu hitbox-seta" data-alvo="painel-contabilidade">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="seta"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </div>
                </li>

                <li class="item-dividido">
                  <a class="link-categoria" data-i18n="cat_outras" style="cursor: default;">Outras Soluções</a>
                    <div class="abre-submenu hitbox-seta" data-alvo="painel-outras-solucoes">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="seta"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </div>
                </li>
            </ul>
        </div>

        <div class="menuPainel" id="painel-auditoria">
            <div class="topoPainel flex-between">
                <h3 class="tituloPainel" data-i18n="cat_auditoria">AUDITORIA</h3>
                <button class="btnVoltarPequeno" data-alvo="painel-servicos">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="iconeVoltar"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    VOLTAR
                </button>
            </div>
            <ul class="menuMobileLinksFinais">
                <li><a href="/servicos/auditoria-independente/exame-das-demonstracoes-financeiras.html" data-i18n="menu_aud_1">Exame das Demonstrações Financeiras</a></li>
                <li><a href="/servicos/auditoria-independente/revisao-limitada-das-demonstracoes.html" data-i18n="menu_aud_2">Revisão Limitada das Demonstrações</a></li>
                <li><a href="/servicos/auditoria-independente/procedimentos-previamente-acordados.html" data-i18n="menu_aud_3">Procedimentos Previamente Acordados</a></li>
                <li><a href="/servicos/auditoria-independente/due-diligence.html" data-i18n="menu_aud_4">Due-Diligence</a></li>
                <li><a href="/servicos/auditoria-independente/elaboracao-de-laudo-contabil.html" data-i18n="menu_aud_5">Elaboração de Laudo Contábil</a></li>
                <li><a href="/servicos/auditoria-independente/inventario-fisico.html" data-i18n="menu_aud_6">Inventário Físico</a></li>
            </ul>
        </div>

        <div class="menuPainel" id="painel-tributaria">
            <div class="topoPainel flex-between">
                <h3 class="tituloPainel" data-i18n="cat_tributaria">TRIBUTÁRIA</h3>
                <button class="btnVoltarPequeno" data-alvo="painel-servicos">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="iconeVoltar"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    VOLTAR
                </button>
            </div>
            <ul class="menuMobileLinksFinais">
                <li><a href="/servicos/consultoria-tributaria/tax-compliance.html" data-i18n="menu_tri_1">Tax Compliance (ECD, ECF, EFD, SPED)</a></li>
                <li><a href="/servicos/consultoria-tributaria/transfer-pricing.html" data-i18n="menu_tri_2">Transfer Pricing / Thin Capitalization</a></li>
                <li><a href="/servicos/consultoria-tributaria/atendimento-as-consultas-fiscais.html" data-i18n="menu_tri_3">Atendimento às consultas fiscais</a></li>
                <li><a href="/servicos/consultoria-tributaria/beneficios-fiscais.html" data-i18n="menu_tri_4">Benefícios Fiscais</a></li>
                <li><a href="/servicos/consultoria-tributaria/assessoria-em-defesa-administrativa.html" data-i18n="menu_tri_5">Assessoria em Defesa Administrativa</a></li>
                <li><a href="/servicos/consultoria-tributaria/assessoria-tributaria-a-pessoa-fisica.html" data-i18n="menu_tri_6">Assessoria Tributária à Pessoa Física</a></li>
                <li><a href="/servicos/consultoria-tributaria/assessoria-fiscal-em-repetro.html" data-i18n="menu_tri_7">Assessoria Fiscal em Repetro</a></li>
            </ul>
        </div>

        <div class="menuPainel" id="painel-planejamento">
            <div class="topoPainel flex-between">
                <h3 class="tituloPainel" data-i18n="cat_planejamento">PLANEJAMENTO</h3>
                <button class="btnVoltarPequeno" data-alvo="painel-servicos">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="iconeVoltar"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    VOLTAR
                </button>
            </div>
            <ul class="menuMobileLinksFinais">
                <li><a href="/servicos/planejamento-tributario/estrategias-de-reducao-de-carga-tributaria.html" data-i18n="menu_pla_1">Estratégias de redução de carga tributária</a></li>
                <li><a href="/servicos/planejamento-tributario/recuperacao-e-utilizacao-de-creditos-fiscais.html" data-i18n="menu_pla_2">Recuperação e utilização de Créditos Fiscais</a></li>
            </ul>
        </div>

        <div class="menuPainel" id="painel-empresarial">
            <div class="topoPainel flex-between">
                <h3 class="tituloPainel" data-i18n="cat_empresarial">EMPRESARIAL</h3>
                <button class="btnVoltarPequeno" data-alvo="painel-servicos">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="iconeVoltar"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    VOLTAR
                </button>
            </div>
            <ul class="menuMobileLinksFinais">
                <li><a href="/servicos/consultoria-empresarial/gestao-de-processos.html" data-i18n="menu_emp_1">Gestão de Processos</a></li>
                <li><a href="/servicos/consultoria-empresarial/estruturas-e-controles-empresariais.html" data-i18n="menu_emp_2">Estruturas e controles empresariais</a></li>
            </ul>
        </div>

        <div class="menuPainel" id="painel-contabilidade">
            <div class="topoPainel flex-between">
                <h3 class="tituloPainel" data-i18n="cat_contabilidade">CONTABILIDADE</h3>
                <button class="btnVoltarPequeno" data-alvo="painel-servicos">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="iconeVoltar"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    VOLTAR
                </button>
            </div>
            <ul class="menuMobileLinksFinais">
                <li><a href="/servicos/contabilidade/terceirizacao-da-contabilidade.html" data-i18n="menu_con_1">Terceirização da Contabilidade</a></li>
                <li><a href="/servicos/contabilidade/terceirizacao-fiscal.html" data-i18n="menu_con_2">Terceirização Fiscal</a></li>
                <li><a href="/servicos/contabilidade/terceirizacao-da-folha-de-pagamento.html" data-i18n="menu_con_3">Terceirização da Folha de Pagamento</a></li>
            </ul>
        </div>

        <div class="menuPainel" id="painel-outras-solucoes">
            <div class="topoPainel flex-between">
                <h3 class="tituloPainel" data-i18n="cat_outras">OUTRAS SOLUÇÕES</h3>
                <button class="btnVoltarPequeno" data-alvo="painel-servicos">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="iconeVoltar"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    VOLTAR
                </button>
            </div>
            <ul class="menuMobileLinksFinais">
                <li><a href="/servicos/auditoria-especial.html" data-i18n="menu_out_1">Auditoria Especial</a></li>
                <li><a href="/servicos/holding-familiar.html" data-i18n="menu_out_2">Holding Familiar</a></li>
                <li><a href="/servicos/abertura-de-empresas.html" data-i18n="menu_out_3">Abertura de Empresas</a></li>
                <li><a href="/servicos/locacao-de-mao-de-obra.html" data-i18n="menu_out_4">Locação de Mão de Obra (Loan Staff)</a></li>
                <li><a href="/servicos/valuation.html" data-i18n="menu_out_5">Valuation</a></li>
                <li><a href="/servicos/analise-de-contratos.html" data-i18n="menu_out_6">Análise de Contratos</a></li>
                <li><a href="/servicos/assessoria-em-ipo.html" data-i18n="menu_out_7">Assessoria em IPO</a></li>
                <li><a href="/servicos/direito-creditorio.html" data-i18n="menu_out_8">Direito Creditório</a></li>
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
// ==========================================
const footerComponent = `
 <footer class="siteFooter">
    <div class="container">

      <div class="footerTop">
        <div class="footerBrand">
          <img src="/img/identidade visual/logo.svg" alt="Premium Maxx" class="footerLogo">
          <p data-i18n="footer_desc">Especialistas multifuncionais entregando excelência, governança e transparência para o mercado corporativo e de capitais.</p>
        </div>

        <div class="footerLinksGroup">
          <h4 data-i18n="footer_nav">Navegação</h4>
          <ul>
            <li><a href="/quem somos/index.html" data-i18n="nav_quem_somos">Quem Somos</a></li>
            <li><a href="/index.html" data-i18n="nav_servicos">Nossos Serviços</a></li>
            <li><a href="#" class="openDevModalTrigger" data-i18n="nav_carreiras">Carreiras</a></li>
            <li><a href="#" class="openDevModalTrigger" data-i18n="nav_temas">Temas Atuais</a></li>
          </ul>
        </div>

        <div class="footerLinksGroup">
          <h4 data-i18n="footer_solutions">Nossas Soluções</h4>
          <ul>
            <li><a href="/servicos/auditoria-independente/index.html" data-i18n="cat_auditoria">Auditoria Independente</a></li>
            <li><a href="/servicos/consultoria-tributaria/index.html" data-i18n="cat_tributaria">Consultoria Tributária</a></li>
            <li><a href="/servicos/planejamento-tributario/index.html" data-i18n="cat_planejamento">Planejamento Tributário</a></li>
            <li><a href="/servicos/consultoria-empresarial/index.html" data-i18n="cat_empresarial">Consultoria Empresarial</a></li>
            <li><a href="/servicos/contabilidade/index.html" data-i18n="cat_contabilidade">Contabilidade</a></li>
          </ul>
        </div>

        <div class="footerContact">
          <h4 data-i18n="footer_contact">Fale com um Sócio</h4>
          <p class="contactEmail">jorge@premiummaxx.com.br</p>
          <p class="contactPhone">+55 21 99300-2165</p>

          <div class="socialLinks">
            <a href="https://www.instagram.com/premiummaxx/" aria-label="Instagram" target="_blank">
              <img src="/img/instagram.svg" alt="Instagram" style="width: 18px; transition: all 0.3s ease;">
            </a>
            
            <!-- Novo ícone do WhatsApp adicionado -->
            <a href="https://wa.me/5521993002165" aria-label="WhatsApp" target="_blank">
              <img src="/img/whatsapp.svg" alt="WhatsApp" style="width: 18px; transition: all 0.3s ease; filter: brightness(0) invert(1);">
            </a>
          </div>
        </div>
      </div>

      <div class="footerBottom">
        <p data-i18n="footer_rights">&copy; 2026 Premium Maxx. Todos os direitos reservados.</p>
        <div class="footerLegal">
          <a href="#" data-i18n="footer_privacy">Política de Privacidade</a>
          <a href="#" data-i18n="footer_terms">Termos de Uso</a>
        </div>
      </div>

    </div>
  </footer>
  <style>
    /* Inverte a cor do SVG para preto quando o botão de fundo ficar ciano no hover */
    .socialLinks a:hover img {
      filter: brightness(0);
    }
  </style>
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
// LÓGICA DO HEADER E GLOBAL SPOTLIGHT
// ==========================================
function initHeaderLogic() {
  const headerSearchBtn = document.querySelector('.globalSpotlight button');
  const headerSearchInput = document.querySelector('.globalSpotlight input');
  const headerBtnIcon = document.querySelector('.globalSpotlight button img');
  const siteHeader = document.querySelector('.siteHeader');

  const searchOverlay = document.getElementById('searchOverlay');
  const panelInput = document.getElementById('panelSearchInput');
  const searchSuggestions = document.getElementById('searchSuggestions');

  const btnMenuMobile = document.getElementById('btnMenuToggle');
  const menuMobileOverlay = document.getElementById('menuMobileOverlay');
  const paineis = document.querySelectorAll('.menuPainel');
  const botoesAbreSubmenu = document.querySelectorAll('.abre-submenu');
  const botoesVoltar = document.querySelectorAll('.btnVoltarPequeno');
  const bodyCorpo = document.body;

  // Lógica do Menu Mobile
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
        if(searchSuggestions) searchSuggestions.style.display = 'block';
        setTimeout(() => panelInput.focus(), 400);
      } else {
        searchOverlay.classList.remove('open');
        siteHeader.classList.remove('headerSearchActive');
        headerBtnIcon.src = '/img/procurar.svg';
      }
    }

    headerSearchInput.addEventListener('click', toggleSearch);
    headerSearchBtn.addEventListener('click', toggleSearch);
  }

  // =======================================================
  // 2 e 3. LÓGICA DE PESQUISA HÍBRIDA (SERVIÇOS + WP API)
  // =======================================================
  const carouselContainer = document.getElementById('carouselContainer');
  const searchTitle = document.querySelector('.searchSuggestions h3');
  
  let defaultZeroStateHTML = "";
  let searchTimeout;
  let autoSlideInterval;
  let isSearchAnimating = false;
  let isWheelOnCooldown = false;

  // --- A NOSSA MINI BASE DE DADOS LOCAL DE SERVIÇOS ---
  // Aqui mapeamos os arquivos HTML físicos que você tem nas pastas
  const localServicesDB = [
    { id: "menu_aud_1", title: "Exame das Demonstrações Financeiras", url: "/servicos/auditoria-independente/exame-das-demonstracoes-financeiras.html", img: "/img/servicos/exame-das-demonstrações-financeiras.webp" },
    { id: "menu_aud_2", title: "Revisão Limitada das Demonstrações", url: "/servicos/auditoria-independente/revisao-limitada-das-demonstracoes.html", img: "/img/servicos/revisão-limitada.webp" },
    { id: "menu_aud_3", title: "Procedimentos Previamente Acordados", url: "/servicos/auditoria-independente/procedimentos-previamente-acordados.html", img: "/img/servicos/Procedimentos-Previamente-Acordados.webp" },
    { id: "menu_aud_4", title: "Due-Diligence", url: "/servicos/auditoria-independente/due-diligence.html", img: "/img/servicos/due-diligence.webp" },
    { id: "menu_aud_5", title: "Elaboração de Laudo Contábil", url: "/servicos/auditoria-independente/elaboracao-de-laudo-contabil.html", img: "/img/servicos/laudo-contabil.webp" },
    { id: "menu_tri_1", title: "Tax Compliance", url: "/servicos/consultoria-tributaria/tax-compliance.html", img: "/img/servicos/tax-compliance.webp" },
    { id: "menu_tri_2", title: "Transfer Pricing", url: "/servicos/consultoria-tributaria/transfer-pricing.html", img: "/img/servicos/transfer-pricing.webp" },
    { id: "menu_tri_3", title: "Consultas Fiscais", url: "/servicos/consultoria-tributaria/atendimento-as-consultas-fiscais.html", img: "/img/servicos/Atendimento-às-Consultas-Fiscais.webp" },
    { id: "menu_tri_4", title: "Benefícios Fiscais", url: "/servicos/consultoria-tributaria/beneficios-fiscais.html", img: "/img/servicos/beneficios-fiscais.webp" },
    { id: "menu_tri_5", title: "Defesa Administrativa", url: "/servicos/consultoria-tributaria/assessoria-em-defesa-administrativa.html", img: "/img/servicos/defesa.webp" },
    { id: "menu_pla_1", title: "Redução de carga tributária", url: "/servicos/planejamento-tributario/estrategias-de-reducao-de-carga-tributaria.html", img: "/img/servicos/estratégias-de-redução-de-carga-tributária.webp" },
    { id: "menu_pla_2", title: "Recuperação de Créditos", url: "/servicos/planejamento-tributario/recuperacao-e-utilizacao-de-creditos-fiscais.html", img: "/img/servicos/creditos-fiscais.webp" },
    { id: "menu_emp_1", title: "Gestão de Processos", url: "/servicos/consultoria-empresarial/gestao-de-processos.html", img: "/img/servicos/gestao-de-processos.webp" },
    { id: "menu_emp_2", title: "Estruturas e controles", url: "/servicos/consultoria-empresarial/estruturas-e-controles-empresariais.html", img: "/img/servicos/estruturas-e-controles-empresariais.webp" },
    { id: "menu_con_1", title: "Terceirização da Contabilidade", url: "/servicos/contabilidade/terceirizacao-da-contabilidade.html", img: "/img/servicos/terceirizacao-contabilidade.webp" },
    { id: "menu_con_2", title: "Terceirização Fiscal", url: "/servicos/contabilidade/terceirizacao-fiscal.html", img: "/img/servicos/terceirizacao-fiscal.webp" },
    { id: "menu_con_3", title: "Terceirização da Folha", url: "/servicos/contabilidade/terceirizacao-da-folha-de-pagamento.html", img: "/img/servicos/terceirizacao-da-folha-de-pagamento.webp" },
    { id: "menu_out_1", title: "Auditoria Especial", url: "/servicos/auditoria-especial.html", img: "/img/placeholder-1.jpg" },
    { id: "menu_out_2", title: "Holding Familiar", url: "/servicos/holding-familiar.html", img: "/img/placeholder-2.jpg" },
    { id: "menu_out_3", title: "Abertura de Empresas", url: "/servicos/abertura-de-empresas.html", img: "/img/placeholder-3.jpg" },
    { id: "menu_out_4", title: "Locação de Mão de Obra", url: "/servicos/locacao-de-mao-de-obra.html", img: "/img/placeholder-1.jpg" },
    { id: "menu_out_5", title: "Valuation", url: "/servicos/valuation.html", img: "/img/placeholder-2.jpg" },
    { id: "menu_out_6", title: "Análise de Contratos", url: "/servicos/analise-de-contratos.html", img: "/img/placeholder-3.jpg" },
    { id: "menu_out_7", title: "Assessoria em IPO", url: "/servicos/assessoria-em-ipo.html", img: "/img/placeholder-1.jpg" },
    { id: "menu_out_8", title: "Direito Creditório", url: "/servicos/direito-creditorio.html", img: "/img/placeholder-2.jpg" }
  ];

  if (panelInput && carouselContainer) {
    
    // 1. CARREGAMENTO DO ESTADO ZERO (4 Serviços + 3 Artigos do Blog)
    const staticServices = `
      <a href="/servicos/auditoria-independente/due-diligence.html" class="searchCard active" style="width: 260px; max-width: 260px; flex: 0 0 260px; background-image: url('/img/servicos/due-diligence.webp'); background-size: cover; background-position: center;">
        <div class="cardContent"><span data-i18n="menu_aud_4">Due-Diligence</span></div>
      </a>
      <a href="/servicos/planejamento-tributario/estrategias-de-reducao-de-carga-tributaria.html" class="searchCard" style="width: 260px; max-width: 260px; flex: 0 0 260px; background-image: url('/img/servicos/estratégias-de-redução-de-carga-tributária.webp'); background-size: cover; background-position: center;">
        <div class="cardContent"><span data-i18n="menu_pla_1">Estratégias de redução de carga tributária</span></div>
      </a>
      <a href="/servicos/consultoria-empresarial/gestao-de-processos.html" class="searchCard" style="width: 260px; max-width: 260px; flex: 0 0 260px; background-image: url('/img/servicos/gestao-de-processos.webp'); background-size: cover; background-position: center;">
        <div class="cardContent"><span data-i18n="menu_emp_1">Gestão de Processos</span></div>
      </a>
      <a href="/servicos/contabilidade/terceirizacao-da-contabilidade.html" class="searchCard" style="width: 260px; max-width: 260px; flex: 0 0 260px; background-image: url('/img/servicos/terceirizacao-contabilidade.webp'); background-size: cover; background-position: center;">
        <div class="cardContent"><span data-i18n="menu_con_1">Terceirização da Contabilidade</span></div>
      </a>
    `;

    carouselContainer.innerHTML = `
      <div style="width: 100%; display: flex; align-items: center; justify-content: center; height: 320px;">
         <span style="color: #03FAD5; font-size: 16px; font-weight: 500; letter-spacing: 1px;">Carregando sugestões...</span>
      </div>
    `;

    fetch("https://premiummaxx.blog.br/wp-json/wp/v2/posts?_embed&per_page=3")
      .then(res => res.json())
      .then(posts => {
          let blogCards = "";
          posts.forEach(post => {
              let imageUrl = "/img/placeholder-1.jpg"; 
              if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url) {
                  imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
              }
              let title = post.title.rendered.replace(/<[^>]+>/g, '');
              
              blogCards += `
                <a href="${post.link}" target="_blank" class="searchCard" style="width: 260px; max-width: 260px; flex: 0 0 260px; background-image: url('${imageUrl}'); background-size: cover; background-position: center;">
                  <div class="cardContent"><span>${title}</span></div>
                </a>
              `;
          });
          
          defaultZeroStateHTML = staticServices + blogCards;
          carouselContainer.innerHTML = defaultZeroStateHTML;
          changeLanguage(localStorage.getItem('premiumMaxxLang') || 'pt'); 
          setupCarouselPhysics();
      })
      .catch(err => {
          defaultZeroStateHTML = staticServices;
          carouselContainer.innerHTML = defaultZeroStateHTML;
          changeLanguage(localStorage.getItem('premiumMaxxLang') || 'pt');
          setupCarouselPhysics();
      });

    // =======================================================
    // O NOVO MOTOR HÍBRIDO (LOCAL + WORDPRESS)
    // =======================================================
    panelInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      const queryLower = query.toLowerCase();
      
      clearTimeout(searchTimeout); 

      if (query.length === 0) {
        if(searchTitle) searchTitle.textContent = "Você pode estar procurando sobre...";
        carouselContainer.innerHTML = defaultZeroStateHTML;
        setupCarouselPhysics();
        return;
      }

      if(searchTitle) searchTitle.textContent = "Buscando serviços e artigos...";
      carouselContainer.innerHTML = `
        <div style="width: 100%; display: flex; align-items: center; justify-content: center; height: 320px;">
           <span style="color: #03FAD5; font-size: 18px; font-weight: 500; letter-spacing: 1px;">Consultando a base de dados...</span>
        </div>
      `;
      clearInterval(autoSlideInterval);

      searchTimeout = setTimeout(() => {
        
        // 1. Pesquisa na Base Local (Ficheiros HTML)
        const matchedServices = localServicesDB.filter(srv => srv.title.toLowerCase().includes(queryLower));

        // 2. Pesquisa Externa (Blog WordPress)
        fetch(`https://premiummaxx.blog.br/wp-json/wp/v2/posts?search=${encodeURIComponent(query)}&_embed&per_page=6`)
        .then(res => res.json())
        .then(posts => {
          
          // Se não encontrou nem serviço local nem artigo no blog
          if(posts.length === 0 && matchedServices.length === 0) {
             if(searchTitle) searchTitle.textContent = "Nenhum resultado encontrado.";
             carouselContainer.innerHTML = `
              <div style="width: 100%; display: flex; align-items: center; justify-content: center; height: 320px;">
                <span style="color: #b3b3b3; font-size: 16px;">Não encontramos resultados para "${query}". Tente outro termo.</span>
              </div>
             `;
             return;
          }

          if(searchTitle) searchTitle.textContent = "Resultados encontrados:";
          
          // Constrói o HTML combinando os dois mundos
          let combinedHTML = "";
          let cardIndex = 0;

          // A) Injeta primeiro os Serviços Institucionais
          matchedServices.forEach(srv => {
            const isActive = cardIndex === 0 ? "active" : "";
            combinedHTML += `
              <a href="${srv.url}" class="searchCard ${isActive}" style="width: 260px; max-width: 260px; flex: 0 0 260px; background-image: url('${srv.img}'); background-size: cover; background-position: center;">
                <div class="cardContent"><span data-i18n="${srv.id}">${srv.title}</span></div>
              </a>
            `;
            cardIndex++;
          });

          // B) Injeta depois os Artigos do Blog
          posts.forEach(post => {
            let imageUrl = "/img/placeholder-1.jpg"; 
            if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url) {
                imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
            }
            let title = post.title.rendered.replace(/<[^>]+>/g, '');
            const isActive = cardIndex === 0 ? "active" : ""; // Caso só encontre blog e nenhum serviço
            
            combinedHTML += `
              <a href="${post.link}" target="_blank" class="searchCard ${isActive}" style="width: 260px; max-width: 260px; flex: 0 0 260px; background-image: url('${imageUrl}'); background-size: cover; background-position: center;">
                <div class="cardContent"><span>${title}</span></div>
              </a>
            `;
            cardIndex++;
          });

          // Renderiza tudo na ecrã de uma vez
          carouselContainer.innerHTML = combinedHTML; 
          
          // Aplica a tradução nativa caso os serviços encontrados precisem mudar para EN/ES
          changeLanguage(localStorage.getItem('premiumMaxxLang') || 'pt');
          
          // Ativa a física magnética do carrossel
          setupCarouselPhysics();
        })
        .catch(err => {
            console.error(err);
            if(searchTitle) searchTitle.textContent = "Erro na busca.";
            carouselContainer.innerHTML = `
              <div style="width: 100%; display: flex; align-items: center; justify-content: center; height: 320px;">
                <span style="color: #ff4d4d; font-size: 16px;">Ocorreu um erro de conexão.</span>
              </div>
            `;
        });
      }, 600);
    });
  }

  // =========================================================
  // 3. FUNÇÃO QUE CONSTROI A FÍSICA DO CARROSSEL INFINITO
  // =========================================================
  function setupCarouselPhysics() {
    clearInterval(autoSlideInterval); 

    const originalCards = Array.from(carouselContainer.querySelectorAll('.searchCard:not([aria-hidden="true"])'));
    const totalOriginal = originalCards.length;

    // A Mágica do Loop: Só duplica se houverem mais de 2 cartões (evita bizarrices visuais)
    if (totalOriginal > 2) {
      originalCards.forEach(card => {
        let clone = card.cloneNode(true);
        clone.classList.remove('active');
        clone.setAttribute('aria-hidden', 'true');
        carouselContainer.appendChild(clone);
      });

      [...originalCards].reverse().forEach(card => {
        let clone = card.cloneNode(true);
        clone.classList.remove('active');
        clone.setAttribute('aria-hidden', 'true');
        carouselContainer.prepend(clone);
      });

      const allCards = carouselContainer.querySelectorAll('.searchCard');
      let currentIndex = totalOriginal; 

      allCards.forEach(c => c.classList.remove('active'));
      if(allCards[currentIndex]) allCards[currentIndex].classList.add('active');
      
      carouselContainer.style.scrollBehavior = 'auto';
      if(allCards[currentIndex]) allCards[currentIndex].scrollIntoView({ block: 'nearest', inline: 'center' });
      carouselContainer.style.scrollBehavior = 'smooth';

      function moveToNextCard() {
        if (isSearchAnimating) return;
        if(allCards[currentIndex]) allCards[currentIndex].classList.remove('active');
        currentIndex++;
        if(allCards[currentIndex]) {
            allCards[currentIndex].classList.add('active');
            allCards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }

        if (currentIndex >= totalOriginal * 2) {
          isSearchAnimating = true;
          setTimeout(() => {
            carouselContainer.style.scrollBehavior = 'auto';
            if(allCards[currentIndex]) allCards[currentIndex].classList.remove('active');
            currentIndex -= totalOriginal;
            if(allCards[currentIndex]) {
                allCards[currentIndex].classList.add('active');
                allCards[currentIndex].scrollIntoView({ block: 'nearest', inline: 'center' });
            }
            void carouselContainer.offsetWidth; 
            carouselContainer.style.scrollBehavior = 'smooth';
            isSearchAnimating = false;
          }, 400);
        }
      }

      function moveToPrevCard() {
        if (isSearchAnimating) return;
        if(allCards[currentIndex]) allCards[currentIndex].classList.remove('active');
        currentIndex--;
        if(allCards[currentIndex]) {
            allCards[currentIndex].classList.add('active');
            allCards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }

        if (currentIndex < totalOriginal) {
          isSearchAnimating = true;
          setTimeout(() => {
            carouselContainer.style.scrollBehavior = 'auto';
            if(allCards[currentIndex]) allCards[currentIndex].classList.remove('active');
            currentIndex += totalOriginal;
            if(allCards[currentIndex]) {
                allCards[currentIndex].classList.add('active');
                allCards[currentIndex].scrollIntoView({ block: 'nearest', inline: 'center' });
            }
            void carouselContainer.offsetWidth;
            carouselContainer.style.scrollBehavior = 'smooth';
            isSearchAnimating = false;
          }, 400);
        }
      }

      if (!carouselContainer.dataset.listenersBound) {
          carouselContainer.dataset.listenersBound = "true";

          carouselContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (isWheelOnCooldown || isSearchAnimating) return;
            isWheelOnCooldown = true;
            if (e.deltaY > 0 || e.deltaX > 0) { moveToNextCard(); clearInterval(autoSlideInterval); } 
            else { moveToPrevCard(); clearInterval(autoSlideInterval); }
            setTimeout(() => { 
                isWheelOnCooldown = false; 
                autoSlideInterval = setInterval(moveToNextCard, 3000); 
            }, 500);
          }, { passive: false });

          carouselContainer.addEventListener('mouseenter', () => {
            carouselContainer.classList.add('hoverMode');
            clearInterval(autoSlideInterval);
          });
          
          carouselContainer.addEventListener('mouseleave', () => {
            carouselContainer.classList.remove('hoverMode');
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(moveToNextCard, 3000);
          });

          let isDown = false;
          let startX;
          let scrollLeft;
          
          carouselContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            carouselContainer.style.cursor = 'grabbing';
            startX = e.pageX - carouselContainer.offsetLeft;
            scrollLeft = carouselContainer.scrollLeft;
            clearInterval(autoSlideInterval);
          });
          
          carouselContainer.addEventListener('mouseup', () => {
            isDown = false;
            carouselContainer.style.cursor = 'auto';
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(moveToNextCard, 3000);
          });

          carouselContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carouselContainer.offsetLeft;
            const walk = (x - startX) * 1.5; 
            carouselContainer.scrollLeft = scrollLeft - walk;
          });

          carouselContainer.addEventListener('dragstart', (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'IMG') e.preventDefault();
          });
      }

      autoSlideInterval = setInterval(moveToNextCard, 3000);
    }
  }

  // =======================================================
  // 4. LÓGICA DO MEGA MENU
  // =======================================================
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
      if(document.getElementById(targetId)) document.getElementById(targetId).classList.add('active');
    });
  });

  // =======================================================
  // 5. EFEITO MÁQUINA DE ESCREVER NO PLACEHOLDER
  // =======================================================
  let fraseAtual = 0;
  let letraAtual = 0;
  let apagando = false;

  function animarPlaceholder() {
    if (!panelInput) return;
    if (document.activeElement === panelInput && panelInput.value.length > 0) {
      setTimeout(animarPlaceholder, 1000);
      return;
    }
    
    const lang = localStorage.getItem('premiumMaxxLang') || 'pt';
    const frasesGlobais = [
      i18n[lang]?.search_ph_1 || "Emissão de notas fiscais de aluguel...",
      i18n[lang]?.search_ph_2 || "Isenções de ganho de capital...",
      i18n[lang]?.search_ph_3 || "Empresas do Simples na Reforma Tributária..."
    ];

    const texto = frasesGlobais[fraseAtual];
    if (texto) {
        panelInput.setAttribute('placeholder', texto.substring(0, letraAtual));
    }

    let velocidade = apagando ? 30 : 60;
    if (!apagando && texto && letraAtual === texto.length) {
      apagando = true;
      velocidade = 2000;
    } else if (apagando && letraAtual === 0) {
      apagando = false;
      fraseAtual = (fraseAtual + 1) % frasesGlobais.length;
      velocidade = 500;
    } else {
      if (apagando) letraAtual--;
      else letraAtual++;
    }
    setTimeout(animarPlaceholder, velocidade);
  }
  animarPlaceholder();

  // =======================================================
  // 8. HEADER INTELIGENTE
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

} // <--- FIM DA FUNÇÃO initHeaderLogic()


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
            <h3 data-i18n="mod_step1_title">Selecione o escopo do serviço que sua empresa necessita:</h3>
            
            <div class="inputGroup">
              <label class="fieldLabel" data-i18n="mod_step1_label1">1. Categoria do Serviço</label>
              <div class="customDropdown" id="categoryDropdown">
                <div class="dropdownHeader" id="categoryHeader"><span class="header-text" data-i18n="mod_step1_cat_ph">Selecione a categoria...</span> <span class="arrow">▼</span></div>
                <ul class="dropdownList">
                  <li data-value="Auditoria Independente" data-i18n="cat_auditoria">Auditoria Independente</li>
                  <li data-value="Consultoria Tributária" data-i18n="cat_tributaria">Consultoria Tributária</li>
                  <li data-value="Planejamento Tributário" data-i18n="cat_planejamento">Planejamento Tributário</li>
                  <li data-value="Consultoria Empresarial" data-i18n="cat_empresarial">Consultoria Empresarial</li>
                  <li data-value="Contabilidade" data-i18n="cat_contabilidade">Contabilidade</li>
                  <li data-value="Outras Soluções" data-i18n="cat_outras">Outras Soluções</li>
                </ul>
              </div>
              <input type="hidden" id="leadCategory" required>
            </div>

            <div class="inputGroup" id="subitemGroup" style="display: none; margin-top: 20px;">
              <label class="fieldLabel" data-i18n="mod_step1_label2">Subitem Específico</label>
              <div class="customDropdown" id="subitemDropdown">
                <div class="dropdownHeader" id="subitemHeader"><span class="header-text" data-i18n="mod_step1_sub_ph">Selecione o escopo detalhado...</span> <span class="arrow">▼</span></div>
                <ul class="dropdownList" id="subitemList">
                  </ul>
              </div>
              <input type="hidden" id="leadSubitem" required>
            </div>

            <button type="button" class="btnCyan stepNextBtn" id="btnNextStep1" style="margin-top: 25px;" disabled data-i18n="mod_btn_next">Continuar</button>
          </div>

          <div class="formStep" data-step="2">
            <h3 data-i18n="mod_step2_title">2. Qual o ano (ou anos) objeto da revisão patrimonial/fiscal?</h3>
            <p style="color: #a0a0a0; font-size: 0.85rem; margin-bottom: 20px; margin-top: -5px;" data-i18n="mod_step2_desc">Você pode selecionar múltiplas opções de acordo com a sua demanda.</p>
            
            <div class="yearsGrid">
              <label class="yearCheckboxLabel"><input type="checkbox" name="reviewYears" value="2026"> 2026</label>
              <label class="yearCheckboxLabel"><input type="checkbox" name="reviewYears" value="2025"> 2025</label>
              <label class="yearCheckboxLabel"><input type="checkbox" name="reviewYears" value="2024"> 2024</label>
              <label class="yearCheckboxLabel"><input type="checkbox" name="reviewYears" value="2023"> 2023</label>
              <label class="yearCheckboxLabel"><input type="checkbox" name="reviewYears" value="2022"> 2022</label>
              <label class="yearCheckboxLabel"><input type="checkbox" name="reviewYears" value="Anteriores"> <span data-i18n="mod_step2_prev">Anteriores</span></label>
            </div>

            <div class="stepActions" style="margin-top: 30px;">
              <button type="button" class="btnBack stepPrevBtn" data-i18n="mod_btn_back">Voltar</button>
              <button type="button" class="btnCyan stepNextBtn" id="btnNextStep2" disabled data-i18n="mod_btn_next">Continuar</button>
            </div>
          </div>

          <div class="formStep" data-step="3">
            <h3 data-i18n="mod_step3_title">3. Descreva brevemente o cenário ou desafio atual:</h3>
            <div class="inputGroup">
              <textarea id="problemDescription" placeholder="Ex: Detalhes sobre inconsistências levantadas, objetivos da reestruturação ou escopo exigido por investidores..." data-i18n-placeholder="mod_step3_ph" required></textarea>
            </div>
            <div class="stepActions">
              <button type="button" class="btnBack stepPrevBtn" data-i18n="mod_btn_back">Voltar</button>
              <button type="button" class="btnCyan stepNextBtn" data-i18n="mod_btn_next">Continuar</button>
            </div>
          </div>

          <div class="formStep" data-step="4">
            <h3 data-i18n="mod_step4_title">4. Qual é a Razão Social ou Nome Fantasia da empresa?</h3>
            <div class="inputGroup">
              <input type="text" id="companyName" placeholder="Digite aqui o nome da empresa..." data-i18n-placeholder="mod_step4_ph" required>
            </div>
            <div class="stepActions">
              <button type="button" class="btnBack stepPrevBtn" data-i18n="mod_btn_back">Voltar</button>
              <button type="button" class="btnCyan stepNextBtn" data-i18n="mod_btn_next">Continuar</button>
            </div>
          </div>

          <!-- O NOVO PASSO: NOME DO PROFISSIONAL (Antigo passo 6, agora é o 5) -->
          <div class="formStep" data-step="5">
            <h3 data-i18n="mod_step5_title">5. Como se chama o profissional responsável por essa solicitação?</h3>
            <div class="inputGroup">
              <input type="text" id="professionalName" placeholder="Seu nome completo..." data-i18n-placeholder="mod_step5_ph" required>
            </div>
            <div class="stepActions">
              <button type="button" class="btnBack stepPrevBtn" data-i18n="mod_btn_back">Voltar</button>
              <button type="button" class="btnCyan stepNextBtn" data-i18n="mod_btn_next">Continuar</button>
            </div>
          </div>

          <!-- O NOVO PASSO INTELIGENTE: CNPJ OU CPF UNIFICADOS (Passo 6) -->
          <div class="formStep" data-step="6">
            <h3 data-i18n="mod_step6_title">6. Informe o CNPJ:</h3>
            <div class="inputGroup">
              <input type="text" id="leadDocument" placeholder="00.000.000/0000-00" data-i18n-placeholder="mod_step6_ph" required>
            </div>
            <div class="stepActions">
              <button type="button" class="btnBack stepPrevBtn" data-i18n="mod_btn_back">Voltar</button>
              <button type="button" class="btnCyan stepNextBtn" data-i18n="mod_btn_next">Continuar</button>
            </div>
          </div>

          <div class="formStep" data-step="7">
            <h3 data-i18n="mod_step7_title">7. Qual o melhor e-mail corporativo para contato?</h3>
            <div class="inputGroup">
              <!-- ATENÇÃO: type="email" garante a validação nativa e a nossa customizada -->
              <input type="email" id="professionalEmail" placeholder="seu.nome@empresa.com.br" data-i18n-placeholder="mod_step7_ph" required>
            </div>
            <div class="stepActions">
              <button type="button" class="btnBack stepPrevBtn" data-i18n="mod_btn_back">Voltar</button>
              <button type="button" class="btnCyan stepNextBtn" data-i18n="mod_btn_next">Continuar</button>
            </div>
          </div>

          <div class="formStep" data-step="8">
            <h3 data-i18n="mod_step8_title">8. E o número de celular ou WhatsApp para retorno?</h3>
            <div class="inputGroup">
              <input type="tel" id="professionalPhone" placeholder="(00) 00000-0000" required>
            </div>
            <div class="stepActions">
              <button type="button" class="btnBack stepPrevBtn" data-i18n="mod_btn_back">Voltar</button>
              <button type="submit" class="btnCyan" data-i18n="mod_btn_submit">Solicitar Parecer Técnico</button>
            </div>
          </div>

          <div class="formStep successStep" data-step="9">
            <svg viewBox="0 0 24 24" fill="none" stroke="#03FAD5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h3 data-i18n="mod_step9_title">Proposta em processamento!</h3>
            <p data-i18n="mod_step9_desc">Nossos sócios seniores já estão revisando a sua pré-demanda estruturada.</p>
          </div>

        </form>
      </div>
    </div>
`;

// Base de dados relacional turbinada com as chaves de tradução
const subitemsData = {
  "Auditoria Independente": [
    { text: "Exame das Demonstrações Financeiras", i18n: "menu_aud_1" },
    { text: "Revisão Limitada das Demonstrações", i18n: "menu_aud_2" },
    { text: "Procedimentos Previamente Acordados (PPA)", i18n: "menu_aud_3" },
    { text: "Due-Diligence", i18n: "menu_aud_4" },
    { text: "Elaboração de Laudo Contábil", i18n: "menu_aud_5" },
    { text: "Inventário Físico", i18n: "menu_aud_6" }
  ],
  "Consultoria Tributária": [
    { text: "Tax Compliance (ECD, ECF, EFD, SPED)", i18n: "menu_tri_1" },
    { text: "Transfer Pricing / Thin Capitalization", i18n: "menu_tri_2" },
    { text: "Atendimento às consultas fiscais", i18n: "menu_tri_3" },
    { text: "Benefícios Fiscais", i18n: "menu_tri_4" },
    { text: "Assessoria em Defesa Administrativa", i18n: "menu_tri_5" },
    { text: "Assessoria Tributária à Pessoa Física", i18n: "menu_tri_6" },
    { text: "Assessoria Fiscal em Repetro", i18n: "menu_tri_7" }
  ],
  "Planejamento Tributário": [
    { text: "Estratégias de redução de carga tributária", i18n: "menu_pla_1" },
    { text: "Recuperação e utilização de Créditos Fiscais", i18n: "menu_pla_2" }
  ],
  "Consultoria Empresarial": [
    { text: "Gestão de Processos", i18n: "menu_emp_1" },
    { text: "Estruturas e controles empresariais", i18n: "menu_emp_2" }
  ],
  "Contabilidade": [
    { text: "Terceirização da Contabilidade", i18n: "menu_con_1" },
    { text: "Terceirização Fiscal", i18n: "menu_con_2" },
    { text: "Terceirização da Folha de Pagamento", i18n: "menu_con_3" }
  ],
  "Outras Soluções": [
    { text: "Auditoria Especial", i18n: "menu_out_1" },
    { text: "Holding Familiar", i18n: "menu_out_2" },
    { text: "Abertura de Empresas", i18n: "menu_out_3" },
    { text: "Locação de Mão de Obra (Loan Staff)", i18n: "menu_out_4" },
    { text: "Valuation", i18n: "menu_out_5" },
    { text: "Análise de Contratos", i18n: "menu_out_6" },
    { text: "Assessoria em IPO", i18n: "menu_out_7" },
    { text: "Direito Creditório", i18n: "menu_out_8" }
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

  // Abre/Fecha Dropdown de Categoria
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
      const i18nKey = li.getAttribute('data-i18n'); 
      
      catHeader.innerHTML = `<span class="header-text" data-i18n="${i18nKey}">${li.textContent}</span> <span class="arrow">▼</span>`;
      catHeader.classList.add('has-value');
      catInput.value = selectedCat;
      catDropdown.classList.remove('is-open');

      subInput.value = "";
      subHeader.innerHTML = `<span class="header-text" data-i18n="mod_step1_sub_ph">Selecione o escopo detalhado...</span> <span class="arrow">▼</span>`;
      subHeader.classList.remove('has-value');
      btnNext1.disabled = true;

      subList.innerHTML = "";
      const subitems = subitemsData[selectedCat] || [];

      subitems.forEach(item => {
        const itemLi = document.createElement('li');
        itemLi.setAttribute('data-value', item.text);
        itemLi.setAttribute('data-i18n', item.i18n); 
        itemLi.textContent = item.text;

        itemLi.addEventListener('click', (ev) => {
          ev.stopPropagation();
          subHeader.innerHTML = `<span class="header-text" data-i18n="${item.i18n}">${itemLi.textContent}</span> <span class="arrow">▼</span>`;
          subHeader.classList.add('has-value');
          subInput.value = item.text;
          subDropdown.classList.remove('is-open');
          btnNext1.disabled = false;
        });

        subList.appendChild(itemLi);
      });

      subGroup.style.display = "block";
      changeLanguage(localStorage.getItem('premiumMaxxLang') || 'pt');
    });
  });

  // Abre/Fecha Dropdown de Subitem
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

  // =========================================================
  // MÁSCARAS E FILTROS DE DIGITAÇÃO (BLINDAGEM)
  // =========================================================
  
  // 1. MÁSCARA ESTRITA DE CNPJ (Exatamente 14 dígitos)
  const docInput = document.getElementById('leadDocument');
  if (docInput) {
    docInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, ''); // Arranca tudo que não for número
      if (val.length > 14) val = val.slice(0, 14); // Trava no limite do CNPJ

      let formatted = val;
      if (val.length > 2) formatted = `${val.slice(0, 2)}.${val.slice(2)}`;
      if (val.length > 5) formatted = `${val.slice(0, 2)}.${val.slice(2, 5)}.${val.slice(5)}`;
      if (val.length > 8) formatted = `${val.slice(0, 2)}.${val.slice(2, 5)}.${val.slice(5, 8)}/${val.slice(8)}`;
      if (val.length > 12) formatted = `${val.slice(0, 2)}.${val.slice(2, 5)}.${val.slice(5, 8)}/${val.slice(8, 12)}-${val.slice(12)}`;

      e.target.value = formatted;
    });
  }

  // 2. FILTRO DE NOME DO PROFISSIONAL (Bloqueia números e símbolos)
  const nameInput = document.getElementById('professionalName');
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      // Aceita apenas letras (maiúsculas/minúsculas), acentuação e espaços
      e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    });
  }

  // 3. FILTRO DE NOME DA EMPRESA (Permite letras, números e pontuação básica)
  const companyInput = document.getElementById('companyName');
  if (companyInput) {
    companyInput.addEventListener('input', (e) => {
      // Permite letras, números, espaços, pontos, traços e & (Ex: Empresa & Cia 123 Ltda.)
      e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ0-9\s\.\-\&]/g, '');
    });
  }

  // 4. Formatação do Celular
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

  // =========================================================
  // VALIDAÇÃO CÍVICA (BARRANDO OS CURIOSOS "329")
  // =========================================================
  form.querySelectorAll('.stepNextBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const currentStepEl = steps[currentStep - 1];
      const fields = currentStepEl.querySelectorAll('input[required], textarea[required]');
      let allFieldsValidInThisStep = true;

      fields.forEach(f => {
        let isThisFieldValid = false;
        const val = f.value.trim();

        if (!val) {
          isThisFieldValid = false; // Vazio não passa!
        } else if (f.id === 'leadDocument') {
          // Extrai só os números para contar
          const digits = val.replace(/\D/g, '');
          // AGORA SÓ PASSA SE TIVER EXATAMENTE 14 DÍGITOS (CNPJ)
          isThisFieldValid = (digits.length === 14);
        } else if (f.type === 'email') {
          // Expressão Regular rigorosa para validar se tem @ e um domínio válido
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          isThisFieldValid = emailRegex.test(val);
        } else if (f.type === 'tel') {
          // O telefone precisa ter pelo menos 10 dígitos com o DDD
          const digits = val.replace(/\D/g, '');
          isThisFieldValid = digits.length >= 10;
        } else {
          // Os outros campos (textos normais) passam só de não estarem vazios
          isThisFieldValid = true;
        }

        // Feedback Visual de Erro ou Acerto
        if (!isThisFieldValid) {
          allFieldsValidInThisStep = false;
          f.style.borderColor = "#ff4d4d"; // Fica vermelhão se errar!
        } else {
          f.style.borderColor = "rgba(255,255,255,0.2)"; // Volta ao cinza calmo
        }
      });

      // Só avança para a próxima tela se TUDO na tela atual for aprovado pelo tribunal
      if (allFieldsValidInThisStep && currentStep < totalSteps) {
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
      
      // Aqui foi inserido as etiquetas para quando o Modal for resetado!
      catHeader.innerHTML = `<span class="header-text" data-i18n="mod_step1_cat_ph">Selecione a categoria...</span> <span class="arrow">▼</span>`;
      catHeader.classList.remove('has-value');
      subHeader.innerHTML = `<span class="header-text" data-i18n="mod_step1_sub_ph">Selecione o escopo detalhado...</span> <span class="arrow">▼</span>`;
      subHeader.classList.remove('has-value');
      
      // Reseta a cor vermelha de erro se o usuário abrir o modal de novo
      form.querySelectorAll('input, textarea').forEach(f => f.style.borderColor = "rgba(255,255,255,0.2)");

      changeLanguage(localStorage.getItem('premiumMaxxLang') || 'pt');
      updateFormState();
    }
  });

  // =========================================================
  // ENVIO FINAL (DISPARO DE E-MAIL PARA O JORGE)
  // =========================================================
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedYears = Array.from(form.querySelectorAll('input[name="reviewYears"]:checked')).map(c => c.value);
    const empresaNome = document.getElementById('companyName').value;

    // Estruturamos os dados e ativamos o design premium do FormSubmit
    const leadData = {
      _subject: `Novo Lead Premium Maxx - ${empresaNome}`, // Assunto automático bonito
      _template: "box", // A MÁGICA: Transforma a tabela crua num cartão limpo e profissional!
      Categoria: document.getElementById('leadCategory').value,
      Subitem: document.getElementById('leadSubitem').value,
      "Anos de Revisao": selectedYears.length > 0 ? selectedYears.join(", ") : "Nenhum selecionado",
      Descricao: document.getElementById('problemDescription').value,
      Empresa: empresaNome,
      Profissional: document.getElementById('professionalName').value,
      CNPJ: document.getElementById('leadDocument').value, // Renomeado para CNPJ
      Email: document.getElementById('professionalEmail').value,
      Celular: document.getElementById('professionalPhone').value
    };

    console.log("Processando envio de e-mail...");

    currentStep = steps.length;
    updateFormState();
    progressBar.style.width = "100%";

    fetch("https://formsubmit.co/ajax/jorge@premiumbravo.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(leadData)
    })
    .then(response => response.json())
    .then(data => {
      console.log("E-mail entregue com sucesso!", data);
      setTimeout(() => { closeAndResetModal(); }, 4000);
    })
    .catch(error => {
      console.error("Erro na comunicação com o servidor de e-mail:", error);
      setTimeout(() => { closeAndResetModal(); }, 4000);
    });
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
        
        <h3 style="color: #ffffff; font-size: 26px; margin-bottom: 16px;" data-i18n="dev_modal_title">Área em Desenvolvimento</h3>
        <p style="color: #b3b3b3; font-size: 16px; line-height: 1.6; margin-bottom: 35px;" data-i18n="dev_modal_desc">Nossos especialistas estão a preparar uma área exclusiva com novos conteúdos. Novidades em breve!</p>
        
        <button class="btnCyan" id="btnOkDev" style="width: 100%;" data-i18n="dev_modal_btn">Entendi</button>
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


// ==========================================
// ACORDEÃO DA SEÇÃO DE LÍDERES
// ==========================================
function toggleLeaderCard(clickedElement) {
    // Se clicar no cartão que já está aberto, não faz nada
    if (clickedElement.classList.contains('active')) return;

    // Busca todos os cartões dentro do acordeão
    const cards = document.querySelectorAll('.hlAccCard');

    // Remove a classe 'active' de todos
    cards.forEach(card => {
        card.classList.remove('active');
    });

    // Adiciona a classe 'active' apenas no clicado
    clickedElement.classList.add('active');
}

// =======================================================
// MOTOR DE INTEGRAÇÃO WORDPRESS (HEADLESS CMS)
// =======================================================
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Verifica se a página atual tem o placeholder (para não rodar script à toa)
    const blogPlaceholder = document.getElementById('blog-placeholder');
    if (!blogPlaceholder) return;

    // 2. URL Base do seu WordPress (já com a requisição da API Rest nativa)
    // O parâmetro _embed garante que a imagem de capa (featured image) venha junto.
    // O parâmetro per_page=5 limita para os 5 últimos artigos.
    const WP_API_URL = "https://premiummaxx.blog.br/wp-json/wp/v2/posts?_embed&per_page=5";

    // 3. Monta o esqueleto base da seção (Skeleton Loading)
    blogPlaceholder.innerHTML = `
        <section class="homeBlogSection">
            <div class="container blogContainer">
                <div class="blogHeader">
                    <h2 data-i18n="blog_section_title">Outras matérias</h2>
                    <p data-i18n="blog_section_desc">Acompanhe nossas análises técnicas sobre as últimas movimentações do mercado de capitais e governança corporativa.</p>
                </div>
                <div class="blogGrid">
                    <div class="blogTrack" id="wp-blog-track">
                        <!-- Skeletons (efeito de carregamento premium) -->
                        ${Array(5).fill(`
                            <div class="blogCard" style="pointer-events: none; opacity: 0.6; animation: pulse 1.5s infinite;">
                                <div class="blogImageWrapper" style="background: #1a1a1a;"></div>
                                <div class="blogContent">
                                    <span class="blogCategory" style="background: #333; color: transparent; border-radius: 4px; width: 80px; display: inline-block;">Categoria</span>
                                    <h3 style="background: #333; color: transparent; border-radius: 4px; height: 24px; margin-bottom: 10px;">Carregando titulo...</h3>
                                    <p style="background: #222; color: transparent; border-radius: 4px; height: 60px;">Carregando resumo do artigo...</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>
        <style>
            @keyframes pulse {
                0% { opacity: 0.6; }
                50% { opacity: 0.3; }
                100% { opacity: 0.6; }
            }
        </style>
    `;

    // 4. Executa as traduções da estrutura base do título imediatamente
    changeLanguage(localStorage.getItem('premiumMaxxLang') || 'pt');

    // 5. Função de busca (Fetch) ao WordPress
    fetch(WP_API_URL)
        .then(response => {
            if (!response.ok) throw new Error("Erro ao acessar a API do WordPress");
            return response.json();
        })
        .then(posts => {
            const track = document.getElementById('wp-blog-track');
            track.innerHTML = ""; // Limpa os skeletons
            
            // Se o WordPress não retornou nada
            if (posts.length === 0) {
                track.innerHTML = `<p style="color: #fff; text-align: center; width: 100%;">Nenhum artigo publicado ainda.</p>`;
                return;
            }

            // 6. Montagem Dinâmica dos Cartões
            posts.forEach(post => {
                // Tenta extrair a imagem de capa. Se não tiver, usa o placeholder cinza padrão
                let imageUrl = "../img/placeholder-1.jpg"; 
                if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url) {
                    imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
                }

                // Tenta extrair a categoria primária
                let categoryName = "Insights";
                if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && post._embedded['wp:term'][0][0]) {
                    categoryName = post._embedded['wp:term'][0][0].name;
                }

                // Limpa o resumo (excerpt) que o WP manda com tags <p> e limita o tamanho
                let excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '').trim();
                if (excerpt.length > 130) excerpt = excerpt.substring(0, 130) + "...";

                // Monta o Card HTML igualzinho você construiu no Vanilla
                const cardHTML = `
                    <a href="${post.link}" class="blogCard" target="_blank" rel="noopener noreferrer">
                        <div class="blogImageWrapper">
                            <img src="${imageUrl}" alt="${post.title.rendered}" class="blogImg">
                        </div>
                        <div class="blogContent">
                            <span class="blogCategory">${categoryName}</span>
                            <h3>${post.title.rendered}</h3>
                            <p>${excerpt}</p>
                            <span class="blogReadMore"><span data-i18n="blog_read_more">Ler artigo</span> &rarr;</span>
                        </div>
                    </a>
                `;
                
                // Joga o cartão dentro da pista (track)
                track.insertAdjacentHTML('beforeend', cardHTML);
            });

            // 7. Re-aplica as traduções do botão "Ler artigo"
            changeLanguage(localStorage.getItem('premiumMaxxLang') || 'pt');
            
            // 8. Reinicializa o motor de Carrossel Infinito para os novos cards
            initInfiniteCarousel();

        })
        .catch(error => {
            console.error("Falha ao carregar o blog do WordPress:", error);
            const track = document.getElementById('wp-blog-track');
            track.innerHTML = `<p style="color: #fff; text-align: center; width: 100%;">Não foi possível carregar as matérias no momento. Tente novamente mais tarde.</p>`;
        });
});

// =======================================================
// ENCAPSULAMENTO DO CARROSSEL (Para rodar após o Fetch)
// =======================================================
function initInfiniteCarousel() {
  const slider = document.querySelector('.blogGrid');
  const track = document.querySelector('.blogTrack');

  if (slider && track) {
    const cards = Array.from(track.children);
    
    // Só clona se houver pelo menos 3 artigos, senão não tem motivo para loop
    if(cards.length > 2) {
        cards.forEach(card => {
          const clone = card.cloneNode(true);
          clone.setAttribute('aria-hidden', 'true'); 
          track.appendChild(clone);
        });
    }

    let isDown = false;
    let isHovered = false;
    let isDragging = false;
    let startX;
    let scrollLeft;
    let animationId;
    const speed = 1.2; 

    // Cancela a animação anterior se houver (para evitar aceleração do carrossel no reload)
    if(window.blogCarouselAnimationId) cancelAnimationFrame(window.blogCarouselAnimationId);

    function autoScroll() {
      if (!isDown && !isHovered && cards.length > 2) {
        slider.scrollLeft += speed;
        if (slider.scrollLeft >= track.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
      window.blogCarouselAnimationId = requestAnimationFrame(autoScroll);
    }
    
    if(cards.length > 2) {
       autoScroll(); 
    }

    slider.addEventListener('mouseenter', () => isHovered = true);
    slider.addEventListener('mouseleave', () => {
      isHovered = false;
      isDown = false; 
      slider.style.cursor = 'grab';
      slider.classList.remove('is-dragging'); 
    });

    slider.style.cursor = 'grab';

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      isDragging = false;
      slider.style.cursor = 'grabbing';
      /* A classe 'is-dragging' foi removida daqui! Não bloqueamos o clique de imediato. */
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
      const walk = (x - startX) * 1.5; 
      
      /* A MÁGICA: Só bloqueia o clique (adiciona is-dragging) se o mouse arrastar mais de 5 pixels */
      if (Math.abs(walk) > 5) {
          isDragging = true;
          slider.classList.add('is-dragging'); 
      }
      let newScrollLeft = scrollLeft - walk;

      if(cards.length > 2) {
          if (newScrollLeft <= 0) {
            newScrollLeft += track.scrollWidth / 2;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = newScrollLeft;
          } else if (newScrollLeft >= track.scrollWidth / 2) {
            newScrollLeft -= track.scrollWidth / 2;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = newScrollLeft;
          }
      }
      slider.scrollLeft = newScrollLeft;
    });

    slider.addEventListener('click', (e) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
      }
    });

    slider.querySelectorAll('a, img').forEach(el => {
      el.addEventListener('dragstart', (e) => e.preventDefault());
    });
  }
}