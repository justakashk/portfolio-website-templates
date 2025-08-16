  // AOS animations
    AOS.init({ duration: 700, once: true, offset: 80 });

    // Persisted theme toggle
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const stored = localStorage.getItem('theme');

    function setTheme(mode){
      document.documentElement.setAttribute('data-bs-theme', mode);
      localStorage.setItem('theme', mode);
    }

    // Initialize theme: stored -> system -> light
    if(stored){ setTheme(stored); }
    else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){ setTheme('dark'); }

    themeToggle.addEventListener('click', ()=>{
      const current = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
      setTheme(current);
    });

    // Back to top
    const backToTop = document.getElementById('backToTop');
    backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
    window.addEventListener('scroll', () => {
      backToTop.style.display = window.scrollY > 500 ? 'inline-flex' : 'none';
    });

    // Active nav highlighting via IntersectionObserver
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navbar .nav-link');
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          navLinks.forEach(l=>l.classList.remove('active'));
          const active = document.querySelector(`#navbar .nav-link[href='#${entry.target.id}']`);
          active && active.classList.add('active');
        }
      })
    }, {rootMargin: '-40% 0px -55% 0px', threshold: 0});
    sections.forEach(s=>obs.observe(s));

    // Simple contact form UX (front-end only)
    document.getElementById('contactForm').addEventListener('submit', function(e){
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const og = btn.innerHTML;
      btn.disabled = true; btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending…';
      setTimeout(()=>{
        btn.disabled = false; btn.innerHTML = og;
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3';
        toast.setAttribute('role','alert');
        toast.innerHTML = '<div class="d-flex"><div class="toast-body">Message queued! I\'ll get back to you soon.</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>';
        document.body.appendChild(toast);
        new bootstrap.Toast(toast, { delay: 3000 }).show();
      }, 900);
    });

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();