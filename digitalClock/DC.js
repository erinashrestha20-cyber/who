(function () {
    let offsetMs = 0;

    const THEMES = {
      morning: {
        bg: "linear-gradient(to bottom, rgba(255,216,155,0.6), rgba(25,84,123,0.6)), url('https://images.unsplash.com/photo-1502082553048-f009c37129b9')",
        //bg: 'linear-gradient(160deg, #1a6b9a 0%, #f0a500 100%)',
        greeting: 'Good morning, Shri!'
      },
      afternoon: {
        bg: "linear-gradient(to bottom, rgba(102,126,234,0.6), rgba(118,75,162,0.6)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
        //bg: 'linear-gradient(160deg, #3a7bd5 0%, #9775fa 100%)',
        greeting: 'Good afternoon, Shri !'
      },
      evening: {
        bg: "linear-gradient(to bottom, rgba(255,107,107,0.6), rgba(44,62,80,0.6)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
        //bg: 'linear-gradient(160deg, #c0392b 0%, #2c3e50 100%)',
        greeting: 'Good evening, Shri!'
      },
      night: {
        bg: "linear-gradient(to bottom, rgba(15,32,39,0.7), rgba(32,58,67,0.7)), url('https://images.unsplash.com/photo-1503264116251-35a269479413')",
        //bg: 'linear-gradient(160deg, #0f1b2d 0%, #1a2a4a 100%)',
        greeting: 'Good night, Shri!'
      }
    };

    function getThemeKey(h) {
      if (h >= 5 && h < 12) return 'morning';
      if (h >= 12 && h < 17) return 'afternoon';
      if (h >= 17 && h < 20) return 'evening';
      return 'night';
    }

    let lastThemeKey = null;

    function tick() {
      const now = new Date(Date.now() + offsetMs);
      const h24 = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();

      const isPM = h24 >= 12;
      const h12 = h24 % 12 || 12;

      document.getElementById('time-display').textContent =
        String(h12).padStart(2, '0') + ':' +
        String(m).padStart(2, '0') + ':' +
        String(s).padStart(2, '0');

      document.getElementById('period-label').textContent = isPM ? 'PM' : 'AM';

      const key = getThemeKey(h24);
      if (key !== lastThemeKey) {
        lastThemeKey = key;
        document.getElementById('clock-root').style.background = THEMES[key].bg;
        document.getElementById('greeting').textContent = THEMES[key].greeting;
      }
    }

    function scheduleTick() {
      tick();
      setTimeout(scheduleTick, 1000 - (Date.now() % 1000));
    }
    scheduleTick();

    const toggle = document.getElementById('ampm-toggle');
    toggle.addEventListener('click', function () {
      toggle.textContent = toggle.textContent === 'AM' ? 'PM' : 'AM';
    });

    document.getElementById('correct-btn').addEventListener('click', function () {
      const now = new Date(Date.now() + offsetMs);
      const h24 = now.getHours();
      const h12 = h24 % 12 || 12;
      document.getElementById('inp-h').value = h12;
      document.getElementById('inp-m').value = String(now.getMinutes()).padStart(2, '0');
      document.getElementById('inp-s').value = String(now.getSeconds()).padStart(2, '0');
      toggle.textContent = h24 >= 12 ? 'PM' : 'AM';
      document.getElementById('time-input-row').style.display = 'flex';
    });

    document.getElementById('confirm-btn').addEventListener('click', function () {
      let h = parseInt(document.getElementById('inp-h').value, 10);
      const m = parseInt(document.getElementById('inp-m').value, 10);
      const s = parseInt(document.getElementById('inp-s').value, 10);
      const isPM = toggle.textContent === 'PM';

      if (isNaN(h) || isNaN(m) || isNaN(s) || h < 1 || h > 12 || m > 59 || s > 59) {
        alert('Please enter a valid time (h: 1–12, m/s: 0–59).');
        return;
      }

      if (isPM && h !== 12) h += 12;
      if (!isPM && h === 12) h = 0;

      const target = new Date();
      target.setHours(h, m, s, 0);
      offsetMs = target.getTime() - Date.now();

      document.getElementById('time-input-row').style.display = 'none';
      document.getElementById('offset-badge').style.display = 'inline-block';
      document.getElementById('reset-btn').style.display = 'inline-block';
      lastThemeKey = null;
      tick();
    });

    document.getElementById('cancel-btn').addEventListener('click', function () {
      document.getElementById('time-input-row').style.display = 'none';
    });

    document.getElementById('reset-btn').addEventListener('click', function () {
      offsetMs = 0;
      document.getElementById('offset-badge').style.display = 'none';
      document.getElementById('reset-btn').style.display = 'none';
      lastThemeKey = null;
      tick();
    });
  })();
