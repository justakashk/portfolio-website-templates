// Init AOS
    AOS.init({ duration: 700, once: true, offset: 80 });

    // Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Theme toggle with localStorage
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme){ html.setAttribute('data-bs-theme', savedTheme); updateToggleIcon(savedTheme); }
    function updateToggleIcon(theme){
      themeToggle.innerHTML = theme === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-bs-theme', next);
      localStorage.setItem('theme', next);
      updateToggleIcon(next);
    });

    // Project search
    const search = document.getElementById('projectSearch');
    const cards = Array.from(document.querySelectorAll('#projectGrid .project'));
    search.addEventListener('input', () => {
      const q = search.value.toLowerCase().trim();
      cards.forEach(card => {
        const text = (card.innerText + ' ' + (card.dataset.tags || '')).toLowerCase();
        card.style.display = text.includes(q) ? '' : 'none';
      });
    });

    // Contact form validation (client-side only demo)
    const form = document.getElementById('contactForm');
    const alertEl = document.getElementById('formAlert');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if(!form.checkValidity()){
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
      }
      // Demo submit (replace with your endpoint or Formspree)
      alertEl.classList.remove('d-none');
      form.reset();
      form.classList.remove('was-validated');
      setTimeout(()=>alertEl.classList.add('d-none'), 4000);
    });
  