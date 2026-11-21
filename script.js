(() => {
  const DAX_GROUPS = [
    {
      cat: 'core',
      title: 'Core KPIs',
      measures: [
        'Total Net Revenue',
        'Total Gross Sales',
        'Total COGS',
        'Total Net Profit',
        'Profit Margin %',
        'Total Orders',
        'Total Units Sold',
        'Average Order Value',
        'Average Discount %',
        'Total Discount Given'
      ]
    },
    {
      cat: 'time',
      title: 'Time Intelligence',
      measures: [
        'Revenue YTD',
        'Revenue PY',
        'Revenue YoY Variance',
        'Revenue YoY Growth %',
        'Profit YoY Growth %',
        'Revenue MoM Growth %',
        'Running Total Revenue'
      ]
    },
    {
      cat: 'regional',
      title: 'Regional Analysis',
      measures: [
        'Regional Target',
        'Target Attainment %',
        'Target Variance',
        'Region Revenue Rank'
      ]
    },
    {
      cat: 'customer',
      title: 'Customer & Discount Analysis',
      measures: [
        'Active Customers',
        'Repeat Customers',
        'Repeat Customer Rate %',
        'High Discount Orders',
        'High Discount Margin %',
        'Full Price Margin %',
        'Margin Erosion (pp)'
      ]
    }
  ];

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Toast Utility
  const toastEl = document.getElementById('toast');
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast('Copied measure list to clipboard')).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('Copied measure list to clipboard');
    } catch (err) {
      showToast('Copy unavailable in this browser');
    }
    document.body.removeChild(ta);
  }

  // Render DAX Measure Groups
  let activeCat = 'all';
  function renderDaxGroups() {
    const container = document.getElementById('daxContainer');
    if (!container) return;
    const list = activeCat === 'all' ? DAX_GROUPS : DAX_GROUPS.filter(g => g.cat === activeCat);
    container.innerHTML = list.map((group, idx) => `
      <article class="dax-group-card">
        <div class="dax-group-head">
          <h3>${group.title}</h3>
          <button type="button" class="copy-group-btn" data-gidx="${idx}">Copy List</button>
        </div>
        <ul class="dax-pill-list">
          ${group.measures.map(m => `<li>${m}</li>`).join('')}
        </ul>
      </article>
    `).join('');

    container.querySelectorAll('.copy-group-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const grp = list[Number(btn.dataset.gidx)];
        if (grp) copyText(`${grp.title}:\n- ${grp.measures.join('\n- ')}`);
      });
    });
  }

  document.querySelectorAll('.dax-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.dax-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeCat = tab.dataset.cat;
      renderDaxGroups();
    });
  });

  // Initialize Verified Charts (strictly using verified dataset figures)
  function initCharts() {
    if (typeof Chart === 'undefined') return;

    const discCanvas = document.getElementById('discountChart');
    if (discCanvas) {
      new Chart(discCanvas.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['0% (Full Price)', '5%–15% (Standard)', '20%+ (Heavy Discount)'],
          datasets: [{
            label: 'Profit Margin (%)',
            data: [36.0, 27.8, 12.9],
            backgroundColor: ['#0f766e', '#1d4ed8', '#dc2626'],
            borderRadius: 8,
            maxBarThickness: 56
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx) => ` Profit Margin: ${ctx.raw}%` } }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 42,
              ticks: { callback: (v) => v + '%', color: '#475569' },
              grid: { color: '#e2e8f0' }
            },
            x: { ticks: { color: '#0f172a', font: { weight: '600' } }, grid: { display: false } }
          }
        }
      });
    }

    const revCanvas = document.getElementById('revenueChart');
    if (revCanvas) {
      new Chart(revCanvas.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['2024 (Full Year)', '2025 (Full Year)', '2026 YTD (Jan–Oct)'],
          datasets: [{
            label: 'Revenue (₹ Lakhs)',
            data: [93.4, 125.0, 114.0],
            backgroundColor: ['#64748b', '#1d4ed8', '#0f766e'],
            borderRadius: 8,
            maxBarThickness: 56
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx) => ` Revenue: ₹${ctx.raw} Lakh` } }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 145,
              ticks: { callback: (v) => '₹' + v + 'L', color: '#475569' },
              grid: { color: '#e2e8f0' }
            },
            x: { ticks: { color: '#0f172a', font: { weight: '600' } }, grid: { display: false } }
          }
        }
      });
    }
  }

  // Active Navigation Scroll Spy
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link[href^="#"]');
  window.addEventListener('scroll', () => {
    const pos = window.scrollY + 120;
    sections.forEach(sec => {
      if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
        const id = sec.getAttribute('id');
        navItems.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { passive: true });

  // Subtle Scroll Reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(el => {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.95) {
        el.classList.add('animate-ready');
        obs.observe(el);
      }
    });
  }

  renderDaxGroups();
  initCharts();
})();
