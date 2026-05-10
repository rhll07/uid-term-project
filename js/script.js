document.addEventListener('DOMContentLoaded', () => {

  /* ── Theme Toggle ── */
  const themeBtn = document.getElementById('theme-toggle');
  const html     = document.documentElement;
  const saved    = localStorage.getItem('welnezia-theme') || 'light';

  const moonSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" pointer-events="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  const sunSVG  = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" pointer-events="none"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('welnezia-theme', theme);
    if (themeBtn) themeBtn.innerHTML = theme === 'light' ? moonSVG : sunSVG;
  }

  applyTheme(saved);
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      applyTheme(html.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    });
  }

  /* ── Hamburger Menu ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  const openSVG  = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" pointer-events="none"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  const closeSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" pointer-events="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  if (hamburger && mobileMenu) {
    hamburger.innerHTML = openSVG;

    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.innerHTML = isOpen ? closeSVG : openSVG;
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.innerHTML = openSVG;
      });
    });

    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        mobileMenu.classList.remove('open');
        hamburger.innerHTML = openSVG;
      }
    });
  }

/* ── BMR Calculator – Nutrition Page ── */
const calcBtn = document.getElementById('calcBtn');
if (calcBtn) {
  calcBtn.addEventListener('click', function () {
    const age = parseFloat(document.getElementById('calcAge').value);
    const weight = parseFloat(document.getElementById('calcWeight').value);
    const height = parseFloat(document.getElementById('calcHeight').value);
    const activity = parseFloat(document.getElementById('calcActivity').value);
    const gender = document.querySelector('input[name="calcGender"]:checked').value;

    if (!age || !weight || !height || !activity) {
      alert('Please fill in all fields.');
      return;
    }

    let bmr = gender === 'male'
      ? (10 * weight + 6.25 * height - 5 * age + 5)
      : (10 * weight + 6.25 * height - 5 * age - 161);

    const tdee = Math.round(bmr * activity);
    bmr = Math.round(bmr);

    const protein = Math.round((tdee * 0.30) / 4);
    const carbs   = Math.round((tdee * 0.45) / 4);
    const fat     = Math.round((tdee * 0.25) / 9);

    document.getElementById('calcResult').style.display = 'block';
    document.getElementById('tdeeVal').textContent   = tdee + ' kcal/day';
    document.getElementById('proteinVal').textContent = protein;
    document.getElementById('carbsVal').textContent   = carbs;
    document.getElementById('fatVal').textContent     = fat;
  });
}
  /* ── Form Validation - Contact Page ── */
  const form = document.getElementById('contactForm');

  if (form) {
    var showError = function(id, msg) {
      var el = document.getElementById(id + 'Err');
      if (el) { el.textContent = msg; el.style.display = msg ? 'block' : 'none'; }
    };

    var nameInput  = document.getElementById('name');
    var emailInput = document.getElementById('email');

    if (nameInput) {
      nameInput.addEventListener('input', function() {
        showError('name', /^[A-Za-z\s]{2,}$/.test(nameInput.value) ? '' : 'Enter a valid name (letters only, min 2 chars).');
      });
    }
    if (emailInput) {
      emailInput.addEventListener('input', function() {
        showError('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value) ? '' : 'Enter a valid email address.');
      });
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var ok = true;
      if (!nameInput  || !/^[A-Za-z\s]{2,}$/.test(nameInput.value))           { showError('name',  'Enter a valid name.');  ok = false; }
      if (!emailInput || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) { showError('email', 'Enter a valid email.'); ok = false; }
      if (ok) {
        form.innerHTML =
          '<div style="text-align:center;padding:2rem;">' +
          '<div style="font-size:3rem;">&#10003;</div>' +
          '<h2 style="margin:1rem 0 0.5rem;">Message Sent!</h2>' +
          '<p style="color:var(--text-muted);">We will get back to you soon.</p>' +
          '</div>';
      }
    });
  }

  /* ── Scroll-reveal cards ── */
  var cards = document.querySelectorAll('.card');
  if ('IntersectionObserver' in window && cards.length) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    cards.forEach(function(card) {
      card.style.opacity    = '0';
      card.style.transform  = 'translateY(24px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(card);
    });
  }

});