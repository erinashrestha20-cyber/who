(function () {
  let offsetMs = 0;
  const THEMES = CLOCK_CONFIG.themes;
  const THEME_COLORS = {
    morning: { accent: '#ffe28d', glow: 'rgba(255, 226, 141, 0.30)' },
    afternoon: { accent: '#69d7ff', glow: 'rgba(105, 215, 255, 0.30)' },
    evening: { accent: '#d89dff', glow: 'rgba(216, 157, 255, 0.28)' },
    night: { accent: '#6be6ff', glow: 'rgba(107, 230, 255, 0.22)' }
  };
  let lastThemeKey = null;

  const root = document.getElementById('clock-root');
  const greeting = document.getElementById('greeting');
  const timeDisplay = document.getElementById('time-display');
  const periodLabel = document.getElementById('period-label');
  const offsetBadge = document.getElementById('offset-badge');

  function createDateElement() {
    if (!document.getElementById('date-display')) {
      const dateNode = document.createElement('div');
      dateNode.id = 'date-display';
      dateNode.textContent = '';
      periodLabel.insertAdjacentElement('afterend', dateNode);
    }
  }

  function applyGreeting(key) {
    const greetingText = THEMES[key].greeting.replace('{name}', CLOCK_CONFIG.username);
    greeting.textContent = greetingText;
  }

  function getThemeKey(hour) {
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 20) return 'evening';
    return 'night';
  }

  function formatDate(now) {
    return now.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function applyTheme(key) {
    const theme = THEMES[key];
    const colors = THEME_COLORS[key];
    root.style.backgroundImage =
      `linear-gradient(rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.14)), ${theme.bgImage}`;
    document.documentElement.style.setProperty('--accent', colors.accent);
    document.documentElement.style.setProperty('--shadow', colors.glow);
  }

  function tick() {
    const now = new Date(Date.now() + offsetMs);
    const h24 = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const isPM = h24 >= 12;
    const h12 = h24 % 12 || 12;

    timeDisplay.textContent =
      String(h12).padStart(2, '0') + ':' +
      String(m).padStart(2, '0') + ':' +
      String(s).padStart(2, '0');

    periodLabel.textContent = isPM ? 'PM' : 'AM';
    document.getElementById('date-display').textContent = formatDate(now);

    const themeKey = getThemeKey(h24);
    if (themeKey !== lastThemeKey) {
      lastThemeKey = themeKey;
      applyTheme(themeKey);
      applyGreeting(themeKey);
    }
  }

  function scheduleTick() {
    tick();
    setTimeout(scheduleTick, 1000 - (Date.now() % 1000));
  }

  function updateBadge() {
    offsetBadge.style.display = offsetMs !== 0 ? 'block' : 'none';
  }

  function applyStyle() {
    const styleKey = CLOCK_CONFIG.defaultStyle;
    const className = styleKey === 'rainbow-glow' ? 'rainbow-glow' : 'soft-fade';
    timeDisplay.classList.add(className);
  }

  createDateElement();
  applyStyle();
  updateBadge();
  scheduleTick();

  const toggle = document.getElementById('ampm-toggle');
  toggle.addEventListener('click', () => {
    toggle.textContent = toggle.textContent === 'AM' ? 'PM' : 'AM';
  });

  document.getElementById('correct-btn').addEventListener('click', () => {
    const now = new Date(Date.now() + offsetMs);
    const h24 = now.getHours();
    const isPM = h24 >= 12;
    const h12 = h24 % 12 || 12;

    document.getElementById('inp-h').value = h12;
    document.getElementById('inp-m').value = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('inp-s').value = String(now.getSeconds()).padStart(2, '0');
    toggle.textContent = isPM ? 'PM' : 'AM';
    document.getElementById('time-input-row').style.display = 'flex';
  });

  document.getElementById('confirm-btn').addEventListener('click', () => {
    const hRaw = parseInt(document.getElementById('inp-h').value, 10);
    const mRaw = parseInt(document.getElementById('inp-m').value, 10);
    const sRaw = parseInt(document.getElementById('inp-s').value, 10);

    if (
      isNaN(hRaw) || hRaw < 1 || hRaw > 12 ||
      isNaN(mRaw) || mRaw < 0 || mRaw > 59 ||
      isNaN(sRaw) || sRaw < 0 || sRaw > 59
    ) {
      alert('Please enter a valid time.');
      return;
    }

    const isPM = toggle.textContent === 'PM';
    let h24 = hRaw % 12;
    if (isPM) h24 += 12;

    const now = new Date();
    const target = new Date(now);
    target.setHours(h24, mRaw, sRaw, 0);

    offsetMs = target - now;
    updateBadge();
    document.getElementById('time-input-row').style.display = 'none';
    tick();
  });

  document.getElementById('cancel-btn').addEventListener('click', () => {
    document.getElementById('time-input-row').style.display = 'none';
  });

  document.getElementById('reset-btn').addEventListener('click', () => {
    offsetMs = 0;
    lastThemeKey = null;
    updateBadge();
    tick();
  });
})();