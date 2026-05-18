const APPS = [
  { key: 'tiktok', label: 'TikTok / Reels', weight: 1.2 },
  { key: 'x', label: 'X / Threads', weight: 1.0 },
  { key: 'youtube', label: 'YouTube Shorts', weight: 1.1 },
  { key: 'reddit', label: 'Reddit', weight: 0.8 },
  { key: 'messages', label: 'Messages checking', weight: 0.45 }
];

const DAILY_GOAL = 150;
const MAX_SCROLL = 360;
const HISTORY_SEED = [
  { label: 'Mon', minutes: 312 },
  { label: 'Tue', minutes: 241 },
  { label: 'Wed', minutes: 210 },
  { label: 'Thu', minutes: 142 },
  { label: 'Fri', minutes: 125 },
  { label: 'Sat', minutes: 285 },
  { label: 'Sun', minutes: 0, empty: true }
];

const state = {
  usage: Object.fromEntries(APPS.map(app => [app.key, Number(localStorage.getItem(`usage:${app.key}`) || 0)])),
  healing: Number(localStorage.getItem('healing') || 0),
  timerId: null,
  secondsLeft: 1500,
  focusTotalSeconds: 1500
};

const sliders = document.querySelector('#sliders');
const form = document.querySelector('#usageForm');
const resetBtn = document.querySelector('#resetBtn');
const brain = document.querySelector('#brain');
const brainPet = document.querySelector('#brainPet');
const statePets = document.querySelectorAll('.statePet');
const segments = document.querySelector('#segments');
const scoreNumber = document.querySelector('#scoreNumber');
const statusPill = document.querySelector('#statusPill');
const diagnosis = document.querySelector('#diagnosis');
const totalMinutes = document.querySelector('#totalMinutes');
const goalFill = document.querySelector('#goalFill');
const goalKnob = document.querySelector('#goalKnob');
const goalDelta = document.querySelector('#goalDelta');
const shareText = document.querySelector('#shareText');
const shareHealth = document.querySelector('#shareHealth');
const shareHealthBad = document.querySelector('#shareHealthBad');
const shareMinutes = document.querySelector('#shareMinutes');
const shareTotal = document.querySelector('#shareTotal');
const copyShare = document.querySelector('#copyShare');
const copyStatus = document.querySelector('#copyStatus');
const historyChart = document.querySelector('#historyChart');
const bestDayText = document.querySelector('#bestDayText');
const focusMinutes = document.querySelector('#focusMinutes');
const timer = document.querySelector('#timer');
const focusRing = document.querySelector('#focusRing');
const startFocus = document.querySelector('#startFocus');
const stopFocus = document.querySelector('#stopFocus');

function formatMinutes(minutes) {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins ? `${hours}h ${mins}m` : `${hours}h`;
}

function initSliders() {
  sliders.innerHTML = '';
  APPS.forEach(app => {
    const wrap = document.createElement('div');
    wrap.className = 'slider';
    wrap.innerHTML = `
      <label for="${app.key}"><span>${app.label}</span><span id="${app.key}Value">${formatMinutes(state.usage[app.key])}</span></label>
      <input id="${app.key}" type="range" min="0" max="180" step="5" value="${state.usage[app.key]}" />
    `;
    sliders.appendChild(wrap);

    const input = wrap.querySelector('input');
    input.addEventListener('input', () => {
      state.usage[app.key] = Number(input.value);
      document.querySelector(`#${app.key}Value`).textContent = formatMinutes(Number(input.value));
      render();
    });
  });
}

function getMetrics() {
  const minutes = APPS.reduce((sum, app) => sum + state.usage[app.key], 0);
  const rawRot = APPS.reduce((sum, app) => sum + state.usage[app.key] * app.weight, 0);
  const rot = Math.max(0, Math.round(rawRot - state.healing));
  const health = Math.max(0, Math.min(100, Math.round(100 - rot / 3)));
  return { minutes, rot, health };
}

function getMood(health) {
  if (health >= 70) {
    return {
      state: 'default',
      label: 'Okay-ish',
      alt: `Happy brain pet at ${health}/100 health`,
      src: 'assets/mascots/brain-pet-default.png',
      text: 'Too much scroll rots focus. <em>Recover to rebuild your brain.</em>'
    };
  }
  if (health >= 50) {
    return {
      state: 'medium',
      label: 'Bored',
      alt: `Bored serious brain pet at ${health}/100 health`,
      src: 'assets/mascots/brain-pet-medium.png',
      text: 'Focus is getting crispy. <em>One break can pull this back.</em>'
    };
  }
  return {
    state: 'low',
    label: 'Overloaded',
    alt: `Sad crying brainrot brain pet at ${health}/100 health`,
    src: 'assets/mascots/brain-pet-low.png',
    text: 'Critical rot detected. <em>Put the rectangle down.</em>'
  };
}

function readHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem('history') || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem('history');
    return [];
  }
}

function saveUsage() {
  APPS.forEach(app => localStorage.setItem(`usage:${app.key}`, state.usage[app.key]));
  localStorage.setItem('healing', state.healing);

  const { minutes, health, rot } = getMetrics();
  const today = new Date().toISOString().slice(0, 10);
  const history = readHistory().filter(item => item.date !== today);
  history.unshift({ date: today, minutes, health, rot });
  localStorage.setItem('history', JSON.stringify(history.slice(0, 7)));
  renderHistory();
}

function renderSegments(health) {
  const active = Math.round((health / 100) * 12);
  segments.innerHTML = Array.from({ length: 12 }, (_, index) => {
    const on = index < active;
    const warn = on && health < 55;
    return `<span class="${on ? 'on' : ''} ${warn ? 'warn' : ''}"></span>`;
  }).join('');
}

function render() {
  const { minutes, health } = getMetrics();
  const mood = getMood(health);
  const goalPercent = Math.min(100, Math.round((minutes / MAX_SCROLL) * 100));
  const remaining = Math.max(0, DAILY_GOAL - minutes);
  const share = `My brain is ${health}/100 after ${formatMinutes(minutes)} of scrolling today. ${health < 55 ? 'Send focus.' : 'Still alive.'}`;

  totalMinutes.textContent = formatMinutes(minutes);
  goalFill.style.width = `${goalPercent}%`;
  goalKnob.style.left = `${goalPercent}%`;
  goalDelta.textContent = remaining ? `${formatMinutes(remaining)} to reach your goal.` : 'Goal passed. Recovery recommended.';

  brain.className = `brainMascot ${mood.state}`;
  brain.setAttribute('aria-label', mood.alt);
  brainPet.src = mood.src;
  statePets.forEach(pet => {
    pet.src = mood.src;
  });
  scoreNumber.textContent = health;
  statusPill.textContent = mood.label;
  statusPill.style.borderColor = health < 55 ? 'var(--coral)' : 'rgba(155, 231, 163, .55)';
  statusPill.style.color = health < 55 ? 'var(--coral)' : 'var(--sage)';
  diagnosis.innerHTML = mood.text;

  shareHealth.textContent = health;
  shareHealthBad.textContent = health;
  shareMinutes.textContent = `${formatMinutes(minutes)} scrolled`;
  shareTotal.textContent = formatMinutes(minutes);
  shareText.textContent = share;
  renderSegments(health);
}

function getChartData() {
  const saved = readHistory();
  if (!saved.length) return HISTORY_SEED;

  const labels = ['Today', '1d', '2d', '3d', '4d', '5d', '6d'];
  const rows = saved.map((item, index) => ({
    label: labels[index] || item.date.slice(5),
    minutes: item.minutes
  }));

  return [...rows, ...HISTORY_SEED].slice(0, 7).reverse();
}

function renderHistory() {
  const data = getChartData();
  const best = data.filter(item => !item.empty).reduce((winner, item) => {
    if (!winner || item.minutes < winner.minutes) return item;
    return winner;
  }, null);

  historyChart.innerHTML = data.map(item => {
    const height = item.empty ? 48 : Math.max(26, Math.round((item.minutes / MAX_SCROLL) * 130));
    const good = item.minutes <= DAILY_GOAL && !item.empty;
    const value = item.empty ? '?' : formatMinutes(item.minutes);
    return `
      <div class="bar ${good ? 'good' : ''}">
        <strong>${value}</strong>
        <i style="height:${height}px"></i>
        <span>${item.label}</span>
      </div>
    `;
  }).join('');

  bestDayText.textContent = best ? formatMinutes(best.minutes) : 'No saves yet';
}

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

function setTimerButtons(isRunning) {
  startFocus.disabled = isRunning;
  stopFocus.disabled = !isRunning;
  startFocus.setAttribute('aria-disabled', String(isRunning));
  stopFocus.setAttribute('aria-disabled', String(!isRunning));
}

function stopTimer() {
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = null;
  setTimerButtons(false);
}

function setTimerProgress() {
  const progress = state.focusTotalSeconds
    ? Math.round((state.secondsLeft / state.focusTotalSeconds) * 100)
    : 100;
  focusRing.style.setProperty('--progress', `${progress}%`);
}

form.addEventListener('submit', event => {
  event.preventDefault();
  saveUsage();
  copyStatus.textContent = 'Saved today.';
});

resetBtn.addEventListener('click', () => {
  APPS.forEach(app => {
    state.usage[app.key] = 0;
    localStorage.setItem(`usage:${app.key}`, 0);
  });
  state.healing = 0;
  localStorage.setItem('healing', 0);
  initSliders();
  render();
});

copyShare.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(shareText.textContent);
    copyStatus.textContent = 'Copied.';
  } catch {
    copyStatus.textContent = 'Copy failed. Select the text manually.';
  }
});

startFocus.addEventListener('click', () => {
  stopTimer();
  const minutes = Math.max(5, Math.min(60, Number(focusMinutes.value || 25)));
  state.focusTotalSeconds = minutes * 60;
  state.secondsLeft = state.focusTotalSeconds;
  timer.textContent = formatTime(state.secondsLeft);
  setTimerProgress();
  setTimerButtons(true);

  state.timerId = setInterval(() => {
    state.secondsLeft -= 1;
    timer.textContent = formatTime(state.secondsLeft);
    setTimerProgress();

    if (state.secondsLeft <= 0) {
      stopTimer();
      state.healing += minutes * 2;
      saveUsage();
      render();
      copyStatus.textContent = `Recovered ${minutes * 2} brain points.`;
    }
  }, 1000);
});

stopFocus.addEventListener('click', () => {
  stopTimer();
  state.secondsLeft = Number(focusMinutes.value || 25) * 60;
  state.focusTotalSeconds = state.secondsLeft;
  timer.textContent = formatTime(state.secondsLeft);
  setTimerProgress();
});

focusMinutes.addEventListener('input', () => {
  if (state.timerId) return;
  state.secondsLeft = Number(focusMinutes.value || 25) * 60;
  state.focusTotalSeconds = state.secondsLeft;
  timer.textContent = formatTime(state.secondsLeft);
  setTimerProgress();
});

initSliders();
render();
renderHistory();
timer.textContent = formatTime(Number(focusMinutes.value || 25) * 60);
setTimerProgress();
setTimerButtons(false);
