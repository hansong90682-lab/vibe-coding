document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('vibeCard');
  const quoteBox = document.getElementById('quoteBox');
  const vibeBtn = document.getElementById('vibeButton');
  const glow1 = document.querySelector('.glow-1');
  const glow2 = document.querySelector('.glow-2');
  const glow3 = document.querySelector('.glow-3');

  // Quotes and vibe themes
  const vibeThemes = [
    {
      quote: '"코딩 문법을 타이핑하는 시대에서, 직관과 아이디어를 지휘(Orchestrate)하는 시대로."',
      author: '— Andrej Karpathy (전 테슬라 AI 디렉터)',
      glows: ['#4f46e5', '#06b6d4', '#d946ef'],
      btnGradient: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 50%, #06b6d4 100%)'
    },
    {
      quote: '"이제 코딩은 프로그래머의 전유물이 아닌, 모든 창작자의 모국어가 되고 있습니다."',
      author: '— AI 페어 프로그래밍 에세이 중',
      glows: ['#ec4899', '#8b5cf6', '#3b82f6'],
      btnGradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)'
    },
    {
      quote: '"세부 구현에 에너지를 쏟기보다, 무엇을 만들고 싶은가에 집중하세요."',
      author: '— 바이브 코딩 마인드셋',
      glows: ['#10b981', '#06b6d4', '#6366f1'],
      btnGradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #6366f1 100%)'
    },
    {
      quote: '"Vibe is all you need: 당신의 감각과 방향성만 명확하다면 나머지는 AI가 채웁니다."',
      author: '— Vibe Coding Manifesto',
      glows: ['#f59e0b', '#ef4444', '#ec4899'],
      btnGradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)'
    }
  ];

  let currentThemeIndex = 0;

  // 3D Card Tilt & Glow Tracking for all cards
  const cards = document.querySelectorAll('.card');
  cards.forEach((cardItem) => {
    cardItem.addEventListener('mousemove', (e) => {
      const rect = cardItem.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      cardItem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      cardItem.style.setProperty('--mouse-x', `${x}px`);
      cardItem.style.setProperty('--mouse-y', `${y}px`);
    });

    cardItem.addEventListener('mouseleave', () => {
      cardItem.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });

  // Cycle vibe themes
  vibeBtn.addEventListener('click', () => {
    currentThemeIndex = (currentThemeIndex + 1) % vibeThemes.length;
    const theme = vibeThemes[currentThemeIndex];

    // Animate quote change
    quoteBox.style.opacity = '0';
    quoteBox.style.transform = 'translateY(8px)';

    setTimeout(() => {
      quoteBox.querySelector('.quote-text').textContent = theme.quote;
      quoteBox.querySelector('.quote-author').textContent = theme.author;
      quoteBox.style.opacity = '1';
      quoteBox.style.transform = 'translateY(0)';
    }, 200);

    // Update ambient colors
    glow1.style.background = `radial-gradient(circle, ${theme.glows[0]} 0%, rgba(0,0,0,0) 70%)`;
    glow2.style.background = `radial-gradient(circle, ${theme.glows[1]} 0%, rgba(0,0,0,0) 70%)`;
    glow3.style.background = `radial-gradient(circle, ${theme.glows[2]} 0%, rgba(0,0,0,0) 70%)`;
    vibeBtn.style.background = theme.btnGradient;
  });

  // Hamburger Menu Interaction
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  const toggleMenu = (open) => {
    if (!hamburgerBtn || !navMenu) return;
    const shouldOpen = open !== undefined ? open : !navMenu.classList.contains('open');
    if (shouldOpen) {
      navMenu.classList.add('open');
      hamburgerBtn.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    } else {
      navMenu.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  };

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggleMenu(false);
      }
    });

    // Auto-close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        toggleMenu(false);
      }
    });
  }

  // Smooth Navigation & ScrollSpy
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = [
    { id: '#home', el: document.getElementById('home') },
    { id: '#about', el: document.getElementById('about') },
    { id: '#differences', el: document.getElementById('differences') }
  ];

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      // Close mobile menu when a nav link is clicked
      toggleMenu(false);

      if (targetId === '#home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
        return;
      }

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });

        navLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // ScrollSpy using scroll event
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 160;

    let currentSectionId = '#home';

    sections.forEach(({ id, el }) => {
      if (el) {
        // Calculate absolute top offset in document
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        if (scrollPos >= top) {
          currentSectionId = id;
        }
      }
    });

    navLinks.forEach((link) => {
      if (link.getAttribute('href') === currentSectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // Hero pagination dots interactive click
  const heroDots = document.querySelectorAll('.hero-dot');
  heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      heroDots.forEach((d) => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });
});


