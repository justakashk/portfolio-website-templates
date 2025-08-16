// -------- Utilities & UX --------
    const yearEl = document.getElementById('year'); yearEl.textContent = new Date().getFullYear();

    // Theme toggle (persistent)
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const rootHtml = document.documentElement;

    function applyTheme(theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        themeIcon.className = 'fa-solid fa-sun';
      } else {
        document.documentElement.classList.remove('dark');
        themeIcon.className = 'fa-regular fa-moon';
      }
    }
    // initialize
    const savedTheme = localStorage.getItem('wk_theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
      const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem('wk_theme', newTheme);
      applyTheme(newTheme);
    });

    // Demo modal logic
    const demoBtns = document.querySelectorAll('.demo-btn');
    const demoModalEl = document.getElementById('demoModal');
    const demoModal = new bootstrap.Modal(demoModalEl, {});
    const demoIframe = document.getElementById('demoIframe');
    const demoTitle = document.getElementById('demoModalLabel');
    const openNewTab = document.getElementById('openNewTab');

    demoBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const url = btn.getAttribute('data-demo') || 'https://example.com';
        const name = btn.getAttribute('data-name') || 'Template Demo';
        demoTitle.textContent = name;
        demoIframe.src = url;
        openNewTab.href = url;
        demoModal.show();
      });
    });

    // Clear iframe on modal hide to stop audio/video
    demoModalEl.addEventListener('hidden.bs.modal', () => {
      demoIframe.src = 'about:blank';
    });

    // Simple search filter for templates
    const searchInput = document.getElementById('searchInput');
    const templatesGrid = document.getElementById('templatesGrid');

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      const cards = templatesGrid.querySelectorAll('.col-12');
      cards.forEach(col => {
        const txt = col.innerText.toLowerCase();
        if (!q || txt.includes(q)) col.style.display = '';
        else col.style.display = 'none';
      });
    });

    // Smooth scrolling polyfill/behavior - already enabled via .scroll-smooth class; ensure nav links close collapse
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        const collapse = document.querySelector('.navbar-collapse');
        if (collapse && collapse.classList.contains('show')) {
          new bootstrap.Collapse(collapse, { toggle: true });
        }
      });
    });

    // Accessibility: enable keyboard close on Escape for demo iframe is already default with Bootstrap

    // Progressive enhancement: if JS disabled, Demo buttons are normal links (we used buttons + data-demo)
