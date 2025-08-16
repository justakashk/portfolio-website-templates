 // AOS
    AOS.init({ once: true, duration: 700, offset: 60 });

    // Navbar blur on scroll
    const root = document.documentElement;
    const body = document.body;
    window.addEventListener('scroll', () => {
      if(window.scrollY > 10){ body.classList.add('scrolled'); } else { body.classList.remove('scrolled'); }
    });

    // Theme toggle with localStorage
    const themeToggle = document.getElementById('themeToggle');
    const prefer = localStorage.getItem('theme');
    if(prefer){ document.documentElement.setAttribute('data-bs-theme', prefer); updateThemeIcon(); }

    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-bs-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-bs-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon();
    });

    function updateThemeIcon(){
      const current = document.documentElement.getAttribute('data-bs-theme');
      themeToggle.innerHTML = (current === 'dark') ? '<i class="bi bi-sun"></i><span class="d-none d-sm-inline ms-2">Light</span>' : '<i class="bi bi-moon"></i><span class="d-none d-sm-inline ms-2">Dark</span>';
    }

    // Disco overlay toggle
    const discoToggle = document.getElementById('discoToggle');
    discoToggle.addEventListener('click', () => {
      document.body.classList.toggle('disco-on');
    });

    // Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Animate skills bars on reveal
    const bars = document.querySelectorAll('.skill .bar > span');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){ e.target.style.width = e.target.style.getPropertyValue('--w'); }
      });
    }, { threshold: .8 });
    bars.forEach(b => io.observe(b));

    // Portfolio items open in modal
    const portfolioLinks = document.querySelectorAll('.portfolio-thumb');
    const reelModal = document.getElementById('reelModal');
    const reelFrame = document.getElementById('reelFrame');
    portfolioLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const src = link.getAttribute('data-video');
        const modal = new bootstrap.Modal(reelModal);
        reelFrame.src = src + '&autoplay=1';
        modal.show();
      })
    });
    reelModal.addEventListener('hidden.bs.modal', () => { reelFrame.src = ''; });