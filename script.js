/* =========================================================
   Ganga Raju — Portfolio Script
   Handles: mobile nav, smooth scroll active-link tracking,
   scroll-reveal, back-to-top, current year, contact form
   validation + mailto send, project filtering.
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Mobile navigation ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked (mobile)
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') &&
          !navMenu.contains(e.target) &&
          !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ---------- 2. Smooth scrolling (CSS handles most; JS covers older browsers / offset) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
          const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- 3. Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
    let currentId = sections[0]?.id;
    const scrollPos = window.scrollY + navHeight + 20;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  if (sections.length) {
    setActiveLink();
    window.addEventListener('scroll', setActiveLink, { passive: true });
  }

  /* ---------- 4. Scroll-reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('in-view'));
  } else {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ---------- 5. Back-to-top button ---------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 480);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- 6. Current year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 7. Contact form validation + mailto ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    const fields = {
      name: { input: document.getElementById('cf-name'), error: document.getElementById('err-name') },
      email: { input: document.getElementById('cf-email'), error: document.getElementById('err-email') },
      subject: { input: document.getElementById('cf-subject'), error: document.getElementById('err-subject') },
      message: { input: document.getElementById('cf-message'), error: document.getElementById('err-message') },
    };
    const formNote = document.getElementById('formNote');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateField = (key) => {
      const { input, error } = fields[key];
      let message = '';

      if (!input.value.trim()) {
        message = 'This field is required.';
      } else if (key === 'email' && !emailPattern.test(input.value.trim())) {
        message = 'Enter a valid email address.';
      }

      error.textContent = message;
      input.closest('.form-row').classList.toggle('invalid', Boolean(message));
      return !message;
    };

    Object.keys(fields).forEach(key => {
      fields[key].input.addEventListener('blur', () => validateField(key));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const results = Object.keys(fields).map(validateField);
      const allValid = results.every(Boolean);

      if (!allValid) {
        formNote.textContent = 'Please fix the highlighted fields.';
        return;
      }

      // EDIT: Replace with your real email, or swap this block for a
      // Formspree/EmailJS integration (see README "Contact form" section).
      const to = 'your.email@example.com';
      const name = fields.name.input.value.trim();
      const email = fields.email.input.value.trim();
      const subject = fields.subject.input.value.trim();
      const message = fields.message.input.value.trim();

      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoLink;
      formNote.textContent = 'Opening your email client to send this message…';
      form.reset();
    });
  }

  /* ---------- 8. Resume download links ---------- */
  // The href already points at assets/resume.pdf with the `download` attribute,
  // so no extra JS is required for the download itself. This just warns in the
  // console if the placeholder file has not been replaced, to help during setup.
  ['resumeBtnHero', 'resumeBtnMain'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', (e) => {
        fetch(btn.getAttribute('href'), { method: 'HEAD' })
          .then(res => {
            if (!res.ok) throw new Error('missing');
          })
          .catch(() => {
            console.warn('resume.pdf not found yet — add your resume to assets/resume.pdf');
          });
      });
    }
  });

  /* ---------- 9. Project filtering ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const filterEmpty = document.getElementById('filterEmpty');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      projectCards.forEach(card => {
        const categories = card.dataset.category.split(' ');
        const show = filter === 'all' || categories.includes(filter);
        card.style.display = show ? '' : 'none';
        if (show) visibleCount += 1;
      });

      if (filterEmpty) filterEmpty.hidden = visibleCount !== 0;
    });
  });

});
