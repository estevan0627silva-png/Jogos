// =============================================================================
// A JORNADA DO CAVALEIRO — Pixel Art Edition (Phaser 3)
// Ordem: Config → Ajustes → Estado → Recordes → Arte → Cena → Spawns →
//        Combate → Interface
// =============================================================================

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  backgroundColor: '#5b8a3c',
  physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
  scene: { preload, create, update }
};

const game = new Phaser.Game(config);

// =============================================================================
// AJUSTES DO JOGO (mude aqui para balancear)
// =============================================================================
const PLAYER_SPEED = 280;
const BUFF_TIME = { bow: 6, shield: 9, sword: 6 };   // duração de cada item (s)
const ATTACK_RATE = { bow: 340, sword: 280 };        // intervalo entre ataques (ms)
const BUFF_NAMES = { bow: 'ARCO REAL', shield: 'ESCUDO DE AÇO', sword: 'ESPADA VORPAL' };
const ENEMIES = {                                    // vida, velocidade relativa e hitbox
  goblin:     { hp: 1, speed: 1.15, w: 16, h: 20 },
  warrior:    { hp: 2, speed: 0.88, w: 20, h: 26 },
  elf:        { hp: 1, speed: 0.85, w: 16, h: 24 },
  mini_golem: { hp: 1, speed: 0.96, w: 18, h: 20 }
};
const BOSS_TRIGGER_TIME = 60;                        // segundo em que o Golem de Pedra desperta
const BOSS_MAX_HP = 40;                              // vida total do Boss Golem Ancestral
const MAX_ENEMY_SPEED = 380;                         // teto máximo justo de velocidade
const MIN_SPAWN_DELAY = 500;                         // intervalo mínimo de spawn (ms)
const STORAGE_KEY = 'knight_quest_highscores';

// Paleta de cores da pixel art
const C = {
  outline: 0x1a1410, white: 0xffffff, yellow: 0xffeb3b, bone: 0xe8dcc0,
  steel: 0xc9ced8, steelDark: 0x8a909c, steelLight: 0xf2f4f8,
  iron: 0x454852, ironDark: 0x26272e,
  red: 0xd83a3a, darkRed: 0x8e1b1b, eye: 0xff3030,
  blue: 0x2f6fd6, gold: 0xf2c14e, skin: 0xf1c27d,
  wood: 0x9c6b3a, woodDark: 0x5c3a1b, rag: 0x7a5230, boot: 0x4e342e,
  gob: 0x9ccc65, gobDark: 0x5f8f2f,
  elfHair: 0xf7e27a, elfTunic: 0x26a69a, elfCloak: 0x00574b,
  purple: 0xc36bff, cyan: 0x7fe7ff,
  leaf: 0x2f6e35, leafLight: 0x47a04a, leafDark: 0x1d4a22
};

// =============================================================================
// ESTADO
// =============================================================================
let player, shieldSprite, cursors, keys;
let ground, road, forestTop, forestBottom, shadows, hitFx, dustFx, playerBuffBar, enemyHpBars;
let enemies, obstacles, trees, items, playerArrows, enemyArrows, slashes;
let hudContainer, hudGloryText, hudBestText;
let hudItemIcon, hudItemName, hudItemTime, hudItemBar, hudHornIcon;
let activeBoss, bossSpawned, bossDefeated, bossHudContainer, bossHpBar, bossHpText, bossFilterOverlay;
let menuContainer, pauseModal;
let gameState, survivalTime, enemySpeed, spawnDelay, buff, slashCounter = 0;

// =============================================================================
// RECORDES (salvos no navegador com localStorage)
// =============================================================================
function getHighScores() {
  const defaults = [{ name: 'ART', score: 40 }, { name: 'LAN', score: 28 }, { name: 'GWE', score: 18 }];
  if (typeof localStorage === 'undefined') return defaults;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return defaults;
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : defaults;
  } catch (err) {
    console.warn('Dados de recordes corrompidos, restaurando padrão:', err);
    return defaults;
  }
}

function saveHighScore(name, score) {
  const scores = getHighScores();
  scores.push({ name, score });
  scores.sort((a, b) => b.score - a.score);
  const top = scores.slice(0, 5);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(top));
  }
  return top;
}

const getBestScore = () => getHighScores()[0]?.score ?? 0;

// =============================================================================
// SISTEMA DE ÁUDIO CHIPTUNE (Web Audio API nativa — 100% sintetizado, sem arquivos)
// =============================================================================
const BGM_MELODY = [
  // Compasso 1 (Am) - Marcha heroica do cavaleiro
  440.00, 0, 523.25, 587.33, 659.25, 0, 523.25, 440.00,
  // Compasso 2 (F) - Perigos da floresta
  349.23, 392.00, 440.00, 493.88, 523.25, 0, 493.88, 440.00,
  // Compasso 3 (Dm) - Embate com os inimigos
  587.33, 0, 698.46, 659.25, 587.33, 523.25, 493.88, 392.00,
  // Compasso 4 (E / Am) - Vitória e bravura
  440.00, 493.88, 523.25, 493.88, 415.30, 0, 440.00, 0
];

const BGM_BASS = [
  // Am
  110.00, 110.00, 164.81, 110.00, 110.00, 110.00, 164.81, 110.00,
  // F
  87.31, 87.31, 130.81, 87.31, 87.31, 87.31, 130.81, 87.31,
  // Dm
  73.42, 73.42, 110.00, 73.42, 73.42, 73.42, 110.00, 73.42,
  // E / Am
  82.41, 82.41, 123.47, 82.41, 82.41, 103.83, 110.00, 164.81
];

// Tema Medieval do Menu Principal (Harpa & Alaúde Real em Lá Dórico/Menor)
const MENU_MELODY = [
  // Compasso 1 (Am) - O Reino ao Horizonte
  329.63, 440.00, 523.25, 659.25, 587.33, 523.25, 493.88, 0,
  // Compasso 2 (G / Em) - Brisa nas Montanhas
  392.00, 493.88, 587.33, 493.88, 440.00, 392.00, 329.63, 0,
  // Compasso 3 (F / Dm) - As Três Relíquias Sagradas
  349.23, 440.00, 523.25, 698.46, 659.25, 587.33, 523.25, 493.88,
  // Compasso 4 (E / Am) - O Juramento do Cavaleiro
  440.00, 329.63, 415.30, 493.88, 440.00, 0, 440.00, 0
];

const MENU_BASS = [
  110.00, 0, 164.81, 0, 110.00, 0, 164.81, 0,
  98.00,  0, 146.83, 0, 82.41,  0, 123.47, 0,
  87.31,  0, 130.81, 0, 73.42,  0, 110.00, 0,
  82.41,  0, 123.47, 0, 110.00, 0, 110.00, 0
];

// Tema Tenso da Boss Fight (Golem Ancestral de Pedra — Ré Menor Harmônico / Frígio)
const BOSS_MELODY = [
  // Compasso 1 (Dm) - O Despertar do Colosso
  293.66, 311.13, 293.66, 0, 440.00, 466.16, 440.00, 0,
  // Compasso 2 (Gm / Bb) - Fúria da Terra
  392.00, 440.00, 466.16, 554.37, 587.33, 0, 554.37, 466.16,
  // Compasso 3 (A7) - Ameaça Implacável
  440.00, 349.23, 329.63, 293.66, 329.63, 349.23, 440.00, 554.37,
  // Compasso 4 (Dm) - Esmagamento Sísmico
  587.33, 0, 466.16, 440.00, 349.23, 329.63, 293.66, 0
];

const BOSS_BASS = [
  73.42, 73.42, 110.00, 73.42, 73.42, 77.78, 73.42, 110.00,
  98.00, 98.00, 116.54, 98.00, 98.00, 98.00, 116.54, 98.00,
  82.41, 82.41, 110.00, 82.41, 82.41, 87.31, 110.00, 138.59,
  73.42, 110.00, 73.42, 77.78, 73.42, 65.41, 73.42, 110.00
];

class SoundSystem {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.bgmGain = null;
    this.muted = false;
    this.noiseBuffer = null;
    this.bgmTimer = null;
    this.bgmPlaying = false;
    this.bgmMode = 'battle';
    this.nextStepTime = 0;
    this.currentStep = 0;

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          if (this.ctx && this.ctx.state === 'running') this.ctx.suspend();
        } else {
          if (this.ctx && this.ctx.state === 'suspended' && this.bgmPlaying) this.ctx.resume();
        }
      });

      // Destrava o AudioContext do navegador no primeiro clique ou tecla na tela de menu
      const unlockAudio = () => {
        if (gameState === 'MENU' && !this.bgmPlaying) {
          this.startMenuBGM();
        } else if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      };
      window.addEventListener('pointerdown', unlockAudio);
      window.addEventListener('keydown', unlockAudio);
    }
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return true;
  }

  isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.7, this.ctx.currentTime);
    }
    return this.muted;
  }

  getNoiseBuffer() {
    if (!this.ctx) return null;
    if (!this.noiseBuffer) {
      const len = Math.floor(this.ctx.sampleRate * 0.4);
      const buffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      this.noiseBuffer = buffer;
    }
    return this.noiseBuffer;
  }

  // --- TRILHA SONORA (BGM DE BATALHA, MENU & BOSS FIGHT) ---
  startBGM(mode = 'battle') {
    if (this.bgmPlaying && this.bgmMode === mode) return;
    if (!this.ensureContext()) return;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
    this.bgmMode = mode;
    this.bgmPlaying = true;
    this.currentStep = 0;
    if (this.bgmGain && !this.muted) {
      const vol = mode === 'menu' ? 0.12 : (mode === 'boss' ? 0.16 : 0.14);
      this.bgmGain.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
    this.nextStepTime = this.ctx.currentTime + 0.05;
    this.scheduleBGM();
  }

  startMenuBGM() {
    this.startBGM('menu');
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmGain && this.ctx && !this.muted) {
      this.bgmGain.gain.setValueAtTime(0.14, this.ctx.currentTime);
    }
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  pauseBGM() {
    if (this.bgmGain && this.ctx && !this.muted) {
      this.bgmGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    }
  }

  resumeBGM() {
    if (this.bgmGain && this.ctx && !this.muted) {
      const vol = this.bgmMode === 'boss' ? 0.16 : 0.14;
      this.bgmGain.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  scheduleBGM() {
    if (!this.bgmPlaying || !this.ctx) return;
    if (this.nextStepTime < this.ctx.currentTime) {
      this.nextStepTime = this.ctx.currentTime + 0.05;
    }
    const lookahead = 0.25;
    const stepDur = this.bgmMode === 'menu' ? 0.34 : (this.bgmMode === 'boss' ? 0.175 : 0.23);

    while (this.nextStepTime < this.ctx.currentTime + lookahead) {
      this.playBGMStep(this.currentStep, this.nextStepTime, stepDur);
      this.nextStepTime += stepDur;
      this.currentStep = (this.currentStep + 1) % 32;
    }

    this.bgmTimer = setTimeout(() => this.scheduleBGM(), 50);
  }

  playBGMStep(step, time, dur) {
    if (this.muted) return;
    const isMenu = this.bgmMode === 'menu';
    const isBoss = this.bgmMode === 'boss';
    const melodyArr = isMenu ? MENU_MELODY : (isBoss ? BOSS_MELODY : BGM_MELODY);
    const bassArr = isMenu ? MENU_BASS : (isBoss ? BOSS_BASS : BGM_BASS);

    // 1. Melodia (harpa no menu; square agressivo no Boss; triangle heróico na batalha)
    const note = melodyArr[step];
    if (note > 0) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      osc.type = isBoss ? 'square' : 'triangle';
      osc.frequency.setValueAtTime(note, time);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isMenu ? 1700 : (isBoss ? 1900 : 2200), time);
      const noteDur = isMenu ? dur * 1.45 : dur * 0.9;
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(isMenu ? 0.28 : (isBoss ? 0.24 : 0.32), time + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, time + noteDur);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.bgmGain);
      osc.start(time);
      osc.stop(time + noteDur + 0.02);
    }

    // 2. Baixo (bordão de alaúde no menu; sawtooth pesado no combate e Boss)
    const bass = bassArr[step];
    if (bass > 0) {
      const bOsc = this.ctx.createOscillator();
      const bGain = this.ctx.createGain();
      const bFilter = this.ctx.createBiquadFilter();
      bOsc.type = isMenu ? 'sine' : 'sawtooth';
      bOsc.frequency.setValueAtTime(bass, time);
      bFilter.type = 'lowpass';
      bFilter.frequency.setValueAtTime(isMenu ? 320 : (isBoss ? 520 : 400), time);
      const bassDur = isMenu ? dur * 1.7 : dur * 0.85;
      bGain.gain.setValueAtTime(0.001, time);
      bGain.gain.linearRampToValueAtTime(isMenu ? 0.30 : (isBoss ? 0.34 : 0.28), time + 0.012);
      bGain.gain.exponentialRampToValueAtTime(0.001, time + bassDur);
      bOsc.connect(bFilter);
      bFilter.connect(bGain);
      bGain.connect(this.bgmGain);
      bOsc.start(time);
      bOsc.stop(time + bassDur + 0.02);
    }

    // 3. Percussão retrô (intensa na Boss Fight; marcha durante o combate normal)
    if (!isMenu) {
      if (step % 4 === 0 || (isBoss && step % 4 === 1)) {
        const kick = this.ctx.createOscillator();
        const kGain = this.ctx.createGain();
        kick.type = 'sine';
        kick.frequency.setValueAtTime(isBoss ? 125 : 110, time);
        kick.frequency.exponentialRampToValueAtTime(28, time + 0.075);
        kGain.gain.setValueAtTime(isBoss ? 0.36 : 0.3, time);
        kGain.gain.exponentialRampToValueAtTime(0.001, time + 0.075);
        kick.connect(kGain);
        kGain.connect(this.bgmGain);
        kick.start(time);
        kick.stop(time + 0.075);
      } else if (step % 4 === 2) {
        const noise = this.ctx.createBufferSource();
        noise.buffer = this.getNoiseBuffer();
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(isBoss ? 1100 : 1400, time);
        filter.Q.setValueAtTime(1.8, time);
        const sGain = this.ctx.createGain();
        sGain.gain.setValueAtTime(isBoss ? 0.22 : 0.16, time);
        sGain.gain.exponentialRampToValueAtTime(0.001, time + 0.065);
        noise.connect(filter);
        filter.connect(sGain);
        sGain.connect(this.bgmGain);
        noise.start(time);
        noise.stop(time + 0.065);
      }
    }
  }

  // --- EFEITOS SONOROS (SFX) ---

  // Estrondo sísmico de impacto do Golem de Pedra (rocha batendo no chão / Soco Colossal)
  playEarthSmash() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(24, now + 0.32);
    gain.gain.setValueAtTime(0.48, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.32);

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(520, now);
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.45, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(this.sfxGain);
    noise.start(now);
    noise.stop(now + 0.28);
  }

  // Disparo de flecha pelo jogador (corda do arco vibrando + silvo)
  playBow() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.1);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.1);

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.Q.setValueAtTime(3, now);
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.25, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(this.sfxGain);
    noise.start(now);
    noise.stop(now + 0.08);
  }

  // Flecha mágica dos elfos (assobio místico)
  playElfShot() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.14);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  // Golpe de espada (corte sibilante + ressonância metálica da lâmina)
  playSword() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2600, now);
    filter.frequency.exponentialRampToValueAtTime(450, now + 0.12);
    filter.Q.setValueAtTime(2, now);
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.5, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(this.sfxGain);
    noise.start(now);
    noise.stop(now + 0.12);

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(780, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.11);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.11);
  }

  // Morte/acerto em inimigo (impacto retrô com crunch)
  playEnemyHit() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.12);

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, now);
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.35, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(this.sfxGain);
    noise.start(now);
    noise.stop(now + 0.08);
  }

  // Bloqueio do escudo / desvio de golpe (impacto metálico ressonante "CLANG!")
  playShieldBlock() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    [520, 1080].forEach(f => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.32);
    });

    const click = this.ctx.createOscillator();
    const cGain = this.ctx.createGain();
    click.type = 'square';
    click.frequency.setValueAtTime(1400, now);
    click.frequency.exponentialRampToValueAtTime(180, now + 0.04);
    cGain.gain.setValueAtTime(0.4, now);
    cGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    click.connect(cGain);
    cGain.connect(this.sfxGain);
    click.start(now);
    click.stop(now + 0.04);
  }

  // Coleta de item (arpeggio ascendente brilhante de conquista)
  playItemCollect() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const notes = [659.25, 830.61, 987.77, 1318.51]; // Mi5, Sol#5, Si5, Mi6
    notes.forEach((freq, i) => {
      const t = now + i * 0.045;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.14);
    });
  }

  // Flecha bate em tronco de árvore (som sordo de madeira)
  playWoodHit() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.06);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  // O Cavaleiro tombou (Game Over dramático com notas menores descendentes e baque)
  playGameOver() {
    if (this.muted || !this.ensureContext()) return;
    this.stopBGM();
    const now = this.ctx.currentTime;
    const notes = [293.66, 261.63, 233.08, 220.00]; // Ré4, Dó4, Sib3, Lá3
    notes.forEach((freq, i) => {
      const t = now + i * 0.16;
      const dur = i === notes.length - 1 ? 0.6 : 0.18;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, t);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);
    });

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, now);
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.45, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(this.sfxGain);
    noise.start(now);
    noise.stop(now + 0.5);
  }

  // Clique de confirmação na interface
  playButtonClick() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1050, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.04);
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.04);
  }
}

const sound = new SoundSystem();

// =============================================================================
// ARTE: FERRAMENTAS DE PIXEL ART
// Cada "pixel" do desenho vira um bloco 2x2. Antes das cores, o desenho é
// carimbado 4 vezes deslocado em cor escura — isso cria o contorno de 1px.
// =============================================================================
function drawPixels(g, ox, oy, draw, frame = 0) {
  const pass = (dx, dy, outline) => draw((color, x, y, w, h) =>
    g.fillStyle(outline ? C.outline : color).fillRect(ox + x * 2 + dx, oy + y * 2 + dy, w * 2, h * 2), frame);
  pass(-1, 0, true); pass(1, 0, true); pass(0, -1, true); pass(0, 1, true); // contorno
  pass(0, 0, false);                                                         // cores
}

// Gera uma folha de sprites (quadros lado a lado) e registra cada quadro
function makeSheet(scene, key, w, h, frames, draw) {
  const g = scene.make.graphics({ add: false });
  for (let f = 0; f < frames; f++) drawPixels(g, f * w, 0, draw, f);
  g.generateTexture(key, w * frames, h);
  g.destroy();
  const tex = scene.textures.get(key);
  for (let f = 0; f < frames; f++) tex.add(f, 0, f * w, 0, w, h);
}

// Item coletável: aura brilhante + disco escuro + borda dourada + ícone
function makeItem(scene, key, glow, drawIcon) {
  const g = scene.make.graphics({ add: false });
  g.fillStyle(glow, 0.2).fillCircle(16, 16, 16);
  g.fillStyle(glow, 0.35).fillCircle(16, 16, 13);
  g.fillStyle(0x2a1d12).fillCircle(16, 16, 11);
  g.lineStyle(2, C.gold).strokeCircle(16, 16, 11);
  drawPixels(g, 7, 5, drawIcon);
  g.fillStyle(C.white).fillRect(24, 5, 2, 2); // brilho
  g.generateTexture(key, 32, 32);
  g.destroy();
}

// =============================================================================
// ARTE: DESENHOS (r = cor, x, y, largura, altura — em pixels do desenho)
// Todos olham para a direita; inimigos são espelhados com setFlipX.
// =============================================================================
function drawKnight(r, f) {
  r(C.red, 6, 1, 3, 1); r(C.red, 5, 2, 4, 1);             // pluma
  r(C.steel, 4, 3, 6, 4); r(C.steelLight, 5, 3, 2, 1);   // elmo
  r(C.outline, 7, 5, 3, 1);                              // viseira
  r(C.steel, 3, 7, 8, 5);                                // armadura
  r(C.blue, 5, 7, 5, 5);                                 // tabardo azul
  r(C.gold, 7, 8, 1, 3); r(C.gold, 6, 9, 3, 1);          // cruz dourada
  r(C.woodDark, 3, 11, 8, 1);                            // cinto
  r(C.steelDark, 11, 8, 2, 3);                           // braço
  const leg = (x, up) => { r(C.steelDark, x, 12, 2, up ? 1 : 2); r(C.woodDark, x, up ? 13 : 14, 3, 1); };
  leg(4, f === 0); leg(8, f === 1);                      // pernas alternam
}

function drawGoblin(r, f) {
  r(C.gob, 2, 2, 2, 2); r(C.gob, 10, 2, 2, 2);           // orelhas pontudas
  r(C.gob, 4, 2, 6, 5); r(C.gobDark, 4, 6, 6, 1);        // cabeça
  r(C.yellow, 6, 4, 1, 1); r(C.yellow, 8, 4, 1, 1);      // olhos
  r(C.gobDark, 10, 5, 1, 1);                             // nariz
  r(C.white, 7, 6, 2, 1);                                // dentes
  r(C.rag, 4, 7, 6, 4); r(C.woodDark, 4, 9, 6, 1);       // trapos e cinto
  r(C.gob, 10, 8, 1, 2);                                 // braço
  r(C.steelLight, 11, 5, 1, 3); r(C.woodDark, 11, 8, 1, 1); // adaga
  const leg = (x, up) => r(C.gobDark, x, 11, 2, up ? 1 : 2);
  leg(5, f === 0); leg(8, f === 1);
}

function drawWarrior(r, f) {
  r(C.darkRed, 3, 8, 2, 7);                              // capa
  r(C.bone, 3, 1, 1, 3); r(C.bone, 4, 3, 1, 1);          // chifre esquerdo
  r(C.bone, 13, 1, 1, 3); r(C.bone, 12, 3, 1, 1);        // chifre direito
  r(C.iron, 5, 2, 7, 6); r(C.steelDark, 6, 2, 3, 1);     // elmo
  r(C.outline, 7, 5, 5, 1); r(C.eye, 9, 5, 1, 1); r(C.eye, 11, 5, 1, 1); // olhos vermelhos
  r(C.iron, 5, 8, 8, 6);                                 // armadura
  r(C.steelDark, 4, 8, 3, 2); r(C.steelDark, 11, 8, 3, 2); // ombreiras
  r(C.red, 8, 10, 2, 2); r(C.ironDark, 5, 13, 8, 1);     // brasão e cinto
  r(C.steel, 15, 2, 1, 9); r(C.darkRed, 14, 11, 3, 1); r(C.woodDark, 15, 12, 1, 2); // espada
  r(C.ironDark, 13, 11, 2, 2);                           // mão
  const leg = (x, up) => r(C.ironDark, x, 14, 2, up ? 2 : 3);
  leg(6, f === 0); leg(10, f === 1);
}

function drawElf(r, f) {
  r(C.elfCloak, 3, 6, 2, 6);                             // capa
  r(C.elfHair, 4, 1, 6, 3); r(C.elfHair, 3, 3, 2, 4);    // cabelo
  r(C.skin, 6, 3, 4, 3);                                 // rosto
  r(C.skin, 5, 4, 1, 1); r(C.skin, 4, 3, 1, 1);          // orelha pontuda
  r(C.outline, 8, 4, 1, 1);                              // olho
  r(C.elfTunic, 5, 6, 5, 5); r(C.gold, 5, 9, 5, 1);      // túnica e cinto
  r(C.skin, 10, 7, 2, 1);                                // braço
  r(C.wood, 12, 2, 1, 1); r(C.wood, 13, 3, 1, 7); r(C.wood, 12, 10, 1, 1); // arco
  r(C.white, 12, 3, 1, 7);                               // corda
  const leg = (x, up) => r(C.boot, x, 11, 2, up ? 2 : 3);
  leg(5, f === 0); leg(8, f === 1);
}

function drawTree(r) {
  r(C.woodDark, 10, 19, 4, 11); r(C.wood, 10, 19, 1, 11); r(C.woodDark, 8, 29, 8, 1); // tronco
  r(C.leafDark, 5, 2, 14, 3); r(C.leafDark, 3, 5, 18, 16); r(C.leafDark, 2, 8, 20, 10); // copa
  r(C.leaf, 6, 3, 12, 13); r(C.leaf, 4, 6, 16, 10); r(C.leaf, 3, 9, 18, 6);
  r(C.leafLight, 7, 4, 5, 2); r(C.leafLight, 5, 7, 3, 2); r(C.leafLight, 14, 6, 3, 2); // brilhos
}

function drawRock(r, f) {
  // 1. Sombra e base arredondada (estreita na base, sem linha reta chapada)
  r(C.ironDark, 4, 10, 8, 1);  // base inferior curvada
  r(C.ironDark, 3, 9, 10, 1);   // transição inferior
  r(C.ironDark, 2, 7, 12, 2);   // base sombreada

  // 2. Corpo rochoso médio arredondado (ardósia/granito)
  r(C.iron, 2, 4, 12, 3);
  r(C.iron, 1, 5, 1, 3);        // curvatura esquerda
  r(C.iron, 14, 5, 1, 3);       // curvatura direita

  // 3. Meia-luz e relevo superior arredondado
  r(C.steelDark, 3, 2, 10, 3);
  r(C.steelDark, 2, 3, 1, 2);
  r(C.steelDark, 13, 3, 1, 2);

  // 4. Domo superior e brilho zenital esférico
  r(C.steel, 4, 1, 8, 2);
  r(C.steelLight, 6, 1, 4, 1);  // ponto alto de luz
  r(C.white, 7, 2, 2, 1);       // brilho especular sutil

  // 5. Fissuras e veios minerais escuros
  r(C.ironDark, 6, 4, 1, 3);
  r(C.ironDark, 7, 6, 2, 1);
  r(C.ironDark, 11, 6, 1, 2);

  // Frame 1: Versão com Musgo de Fantasia Medieval (Frame 0 é a pedra lisa arredondada)
  if (f === 1) {
    r(C.leafDark, 2, 3, 3, 2);
    r(C.leaf, 3, 3, 2, 2);
    r(C.leafLight, 3, 2, 1, 1);

    r(C.leafDark, 9, 2, 4, 2);
    r(C.leaf, 10, 2, 3, 1);
    r(C.leafLight, 11, 1, 2, 1);

    r(C.leafDark, 1, 6, 2, 2);
    r(C.leaf, 1, 7, 1, 1);
    r(C.leafDark, 13, 6, 2, 2);
    r(C.leaf, 13, 7, 1, 1);
  }
}

function drawShieldIcon(r) {
  r(C.gold, 1, 1, 7, 6); r(C.gold, 2, 7, 5, 2); r(C.gold, 3, 9, 3, 1);
  r(C.blue, 2, 2, 5, 5); r(C.blue, 3, 7, 3, 1);
  r(C.white, 4, 2, 1, 6); r(C.white, 2, 4, 5, 1);
}

function drawBowIcon(r) {
  r(C.wood, 3, 1, 2, 1); r(C.wood, 5, 2, 1, 1); r(C.wood, 6, 3, 1, 5); r(C.wood, 5, 8, 1, 1); r(C.wood, 3, 9, 2, 1);
  r(C.white, 3, 2, 1, 7);                                // corda
  r(C.bone, 1, 5, 6, 1); r(C.steelLight, 7, 4, 1, 3);    // flecha
  r(C.red, 1, 4, 1, 1); r(C.red, 1, 6, 1, 1);            // penas
}

function drawSwordIcon(r) {
  r(C.steelLight, 4, 1, 1, 6); r(C.steel, 5, 2, 1, 5);   // lâmina
  r(C.gold, 2, 7, 5, 1);                                 // guarda
  r(C.woodDark, 4, 8, 2, 2); r(C.gold, 4, 10, 2, 1);     // cabo e pomo
}

function drawBlade(r) {                                  // espada usada no golpe
  r(C.steelLight, 2, 1, 1, 12); r(C.steel, 3, 2, 1, 11);
  r(C.gold, 1, 13, 4, 1); r(C.woodDark, 2, 14, 2, 3); r(C.gold, 2, 17, 2, 1);
}

const arrowDrawer = (feather, tip) => (r) => {
  r(feather, 1, 1, 2, 1); r(feather, 1, 3, 2, 1); r(feather, 2, 2, 1, 1); // penas
  r(C.wood, 3, 2, 7, 1);                                                   // haste
  r(tip, 10, 1, 1, 3); r(tip, 11, 2, 1, 1);                                // ponta
};

// Ícones de Pixel Art para o novo HUD
function drawHourglass(r) {
  r(C.woodDark, 1, 0, 8, 1); r(C.wood, 2, 1, 6, 1);
  r(C.woodDark, 1, 11, 8, 1); r(C.wood, 2, 10, 6, 1);
  r(C.cyan, 2, 2, 6, 2);
  r(C.cyan, 3, 4, 4, 3);
  r(C.cyan, 2, 7, 6, 3);
  r(C.gold, 3, 3, 4, 1);
  r(C.yellow, 4, 4, 2, 3);
  r(C.gold, 3, 8, 4, 2);
  r(C.white, 2, 2, 1, 1); r(C.white, 2, 9, 1, 1);
}

function drawCrown(r) {
  r(C.gold, 1, 6, 9, 2);
  r(C.woodDark, 1, 8, 9, 1);
  r(C.gold, 1, 3, 1, 3);
  r(C.gold, 3, 2, 1, 4);
  r(C.gold, 5, 1, 1, 5);
  r(C.gold, 7, 2, 1, 4);
  r(C.gold, 9, 3, 1, 3);
  r(C.gold, 2, 5, 7, 1);
  r(C.red, 5, 3, 1, 1);
  r(C.blue, 3, 4, 1, 1);
  r(C.blue, 7, 4, 1, 1);
  r(C.white, 5, 1, 1, 1);
}

function drawHorn(r, f) {
  r(C.gold, 1, 3, 2, 2);
  r(C.gold, 3, 2, 3, 4);
  r(C.gold, 6, 1, 3, 6);
  r(C.gold, 9, 0, 2, 8);
  r(C.woodDark, 10, 1, 1, 6);
  if (f === 0) {
    r(C.cyan, 12, 1, 1, 2);
    r(C.cyan, 13, 3, 1, 2);
    r(C.cyan, 12, 5, 1, 2);
  } else {
    r(C.red, 2, 0, 2, 2); r(C.red, 4, 2, 2, 2);
    r(C.red, 6, 4, 2, 2); r(C.red, 8, 6, 2, 2);
  }
}

// Cavaleiro Heróico para a Capa (equipado com Arco Real nas costas, Escudo de Aço e Espada Vorpal)
function drawKnightBanner(r) {
  // Arco Real e aljava presos às costas (visíveis sobre o ombro esquerdo)
  r(C.wood, 4, 3, 2, 1); r(C.wood, 3, 4, 1, 5); r(C.gold, 4, 2, 1, 1);
  r(C.white, 5, 4, 1, 5); // corda do arco
  r(C.woodDark, 6, 5, 2, 4); r(C.red, 6, 3, 1, 2); r(C.red, 8, 4, 1, 1); // aljava e penas das flechas

  // Pluma e Elmo Real
  r(C.red, 10, 1, 5, 2); r(C.red, 9, 2, 6, 2); r(C.darkRed, 14, 3, 3, 2);
  r(C.steel, 9, 4, 7, 6); r(C.steelLight, 10, 4, 3, 2);
  r(C.steelDark, 9, 9, 7, 1);
  r(C.outline, 11, 7, 4, 1); r(C.outline, 12, 8, 2, 2);

  // Capa esvoaçante e Armadura
  r(C.darkRed, 4, 10, 5, 14); r(C.red, 5, 12, 4, 10);
  r(C.steel, 6, 10, 4, 3); r(C.steelLight, 7, 10, 2, 1);
  r(C.steel, 15, 10, 4, 3); r(C.steelLight, 16, 10, 2, 1);
  r(C.steel, 9, 10, 7, 8);
  r(C.blue, 10, 10, 5, 8);
  r(C.gold, 12, 11, 1, 6); r(C.gold, 11, 13, 3, 1);
  r(C.woodDark, 9, 17, 7, 2); r(C.gold, 12, 17, 1, 2);

  // Braços
  r(C.steelDark, 6, 13, 3, 4); r(C.steel, 6, 17, 3, 2);
  r(C.steelDark, 16, 13, 3, 4); r(C.steel, 16, 17, 3, 2);

  // Escudo de Aço Sagrado empunhado no braço esquerdo
  r(C.gold, 2, 12, 6, 6); r(C.gold, 3, 18, 4, 2);
  r(C.blue, 3, 13, 4, 5); r(C.blue, 4, 18, 2, 1);
  r(C.white, 4, 13, 2, 5); r(C.cyan, 3, 15, 4, 1);

  // Espada Vorpal erguida na mão direita
  r(C.steelLight, 19, 3, 2, 16); r(C.cyan, 19, 3, 1, 14); r(C.steel, 20, 4, 1, 15);
  r(C.gold, 17, 10, 6, 2);
  r(C.woodDark, 19, 8, 2, 2);
  r(C.gold, 19, 7, 2, 1);

  // Grevas e Botas
  r(C.steelDark, 9, 19, 3, 6); r(C.steelLight, 9, 20, 1, 3);
  r(C.steelDark, 13, 19, 3, 6); r(C.steelLight, 13, 20, 1, 3);
  r(C.woodDark, 8, 24, 4, 2); r(C.woodDark, 13, 24, 4, 2);
}

// Boss 1: Golem Ancestral de Pedra (64x64 — Colosso com musgo, cara de mau, núcleo rúnico e punhos gigantes)
function drawBossGolem(r, f) {
  // 1. Ombros gigantescos e silhueta superior de granito/ardósia
  r(C.ironDark, 4, 6, 24, 7);
  r(C.iron, 5, 5, 22, 6);
  r(C.steelDark, 6, 4, 20, 4);

  // 2. Cabeça de pedra maciça encravada entre os ombros
  r(C.ironDark, 10, 3, 12, 8);
  r(C.iron, 11, 4, 10, 7);
  r(C.steelDark, 12, 3, 8, 2);

  // Sobrancelhas franzidas de pedra ("cara de mau")
  r(C.ironDark, 11, 5, 4, 2);
  r(C.ironDark, 17, 5, 4, 2);

  // Olhos brilhantes furiosos (magma rúnico)
  r(C.red, 12, 7, 2, 1); r(C.eye, 12, 6, 2, 1); r(C.yellow, 13, 6, 1, 1);
  r(C.red, 18, 7, 2, 1); r(C.eye, 18, 6, 2, 1); r(C.yellow, 18, 6, 1, 1);

  // Boca/fenda sombria rachada
  r(C.outline, 13, 9, 6, 1);
  r(C.darkRed, 14, 10, 4, 1);

  // 3. Peito e Núcleo Rúnico no centro do tórax
  r(C.ironDark, 7, 12, 18, 10);
  r(C.iron, 8, 13, 16, 8);
  r(C.steelDark, 9, 13, 14, 3);
  r(C.darkRed, 14, 14, 4, 4);
  r(C.red, 15, 14, 2, 4); r(C.red, 14, 15, 4, 2);
  r(C.yellow, 15, 15, 2, 2);
  r(C.darkRed, 13, 13, 1, 2); r(C.darkRed, 18, 13, 1, 2);
  r(C.darkRed, 12, 17, 2, 1); r(C.darkRed, 18, 17, 2, 1);

  // 4. Tufos de musgo ancestral nos ombros e cabeça
  r(C.leafDark, 4, 3, 5, 3); r(C.leaf, 5, 3, 3, 2); r(C.leafLight, 6, 2, 2, 1);
  r(C.leafDark, 23, 3, 5, 3); r(C.leaf, 24, 3, 3, 2); r(C.leafLight, 24, 2, 2, 1);
  r(C.leafDark, 13, 1, 6, 2); r(C.leaf, 14, 1, 4, 1); r(C.leafLight, 15, 0, 2, 1);

  // 5. Braços e Punhos Colossais de Pedra
  const armY = f === 0 ? 0 : -1;
  r(C.ironDark, 2, 12 + armY, 6, 9); r(C.iron, 3, 13 + armY, 4, 7);
  r(C.steelDark, 1, 21 + armY, 8, 7); r(C.ironDark, 0, 23 + armY, 10, 4); r(C.iron, 2, 24 + armY, 6, 2);

  r(C.ironDark, 24, 12 - armY, 6, 9); r(C.iron, 25, 13 - armY, 4, 7);
  r(C.steelDark, 23, 21 - armY, 8, 7); r(C.ironDark, 22, 23 - armY, 10, 4);

  // 6. Pernas de pilar rochoso
  const legL = f === 0 ? 0 : 2;
  const legR = f === 1 ? 0 : 2;
  r(C.ironDark, 9, 22, 5, 6 + legL); r(C.iron, 10, 22, 3, 5 + legL); r(C.steelDark, 7, 27 + legL, 8, 3);
  r(C.ironDark, 18, 22, 5, 6 + legR); r(C.iron, 19, 22, 3, 5 + legR); r(C.steelDark, 17, 27 + legR, 8, 3);
}

// Mini Golem de Pedra ("Filhotinhos" do Boss — 28x28)
function drawMiniGolem(r, f) {
  // 1. Tufo de musgo no topo da cabeça
  r(C.leafDark, 5, 0, 4, 2); r(C.leaf, 6, 0, 2, 1); r(C.leafLight, 6, 1, 1, 1);

  // 2. Corpo arredondado de rocha viva
  r(C.ironDark, 3, 2, 8, 2);
  r(C.ironDark, 2, 4, 10, 6);
  r(C.iron, 3, 3, 8, 7);
  r(C.steelDark, 4, 3, 6, 3);

  // 3. Olhos bravos luminosos e boca invocada
  r(C.ironDark, 3, 4, 3, 1); r(C.ironDark, 8, 4, 3, 1);
  r(C.red, 4, 5, 2, 2); r(C.yellow, 4, 5, 1, 1);
  r(C.red, 8, 5, 2, 2); r(C.yellow, 9, 5, 1, 1);
  r(C.outline, 5, 8, 4, 1);
  r(C.darkRed, 6, 9, 2, 1);

  // 4. Bracinhos e perninhas de pedra
  const armOff = f === 0 ? 0 : 1;
  r(C.steelDark, 1, 6 + armOff, 2, 3);
  r(C.steelDark, 11, 7 - armOff, 2, 3);

  const legL = f === 0 ? 1 : 2;
  const legR = f === 1 ? 1 : 2;
  r(C.ironDark, 3, 10, 3, legL); r(C.steelDark, 3, 10 + legL, 3, 1);
  r(C.ironDark, 8, 10, 3, legR); r(C.steelDark, 8, 10 + legR, 3, 1);
}

// Cenário (chão, estrada, florestas das bordas) e efeitos
function makeWorldTextures(scene) {
  const g = scene.make.graphics({ add: false });
  const rnd = Phaser.Math.Between;
  const pick = Phaser.Utils.Array.GetRandom;

  // Grama com tufos e flores (repete infinitamente)
  g.fillStyle(0x5b8a3c).fillRect(0, 0, 128, 128);
  for (let i = 0; i < 50; i++) {
    const x = rnd(2, 122), y = rnd(2, 120);
    g.fillStyle(pick([0x4c7a33, 0x6d9e48])).fillRect(x, y, 2, 4).fillRect(x + 2, y + 2, 2, 2);
  }
  for (let i = 0; i < 6; i++) g.fillStyle(pick([0xf5e663, 0xffffff, 0xe57373])).fillRect(rnd(4, 122), rnd(4, 122), 2, 2);
  g.generateTexture('ground', 128, 128);

  // Estrada de terra com pedrinhas
  g.clear().fillStyle(0x9b7b4f).fillRect(0, 0, 64, 80);
  g.fillStyle(0x7a5f3b).fillRect(0, 0, 64, 4).fillRect(0, 76, 64, 4);
  for (let i = 0; i < 12; i++) g.fillStyle(pick([0xb89a6c, 0x6e5434])).fillRect(rnd(0, 60), rnd(8, 70), 3, 2);
  g.generateTexture('road', 64, 80);

  // Floresta ao fundo (topo da tela). Copas repetidas em -128/0/128 para emendar sem corte
  g.clear().fillStyle(0x16331a).fillRect(0, 0, 128, 70);
  g.fillStyle(C.woodDark).fillRect(16, 60, 8, 50).fillRect(60, 60, 8, 46).fillRect(100, 60, 8, 50);
  [-128, 0, 128].forEach(o => {
    g.fillStyle(C.leafDark).fillCircle(o + 20, 62, 26).fillCircle(o + 64, 70, 24).fillCircle(o + 104, 60, 26);
    g.fillStyle(C.leaf).fillCircle(o + 14, 54, 14).fillCircle(o + 58, 62, 12).fillCircle(o + 98, 52, 14);
  });
  g.generateTexture('forest_top', 128, 110);

  // Arbustos em primeiro plano (base da tela)
  g.clear().fillStyle(C.leafDark).fillRect(0, 44, 128, 36);
  [-128, 0, 128].forEach(o => {
    g.fillStyle(C.leafDark).fillCircle(o + 20, 36, 26).fillCircle(o + 66, 44, 26).fillCircle(o + 108, 34, 26);
    g.fillStyle(C.leaf).fillCircle(o + 16, 30, 12).fillCircle(o + 62, 38, 12).fillCircle(o + 104, 28, 12);
  });
  g.generateTexture('forest_bottom', 128, 80);

  // Rastro do golpe de espada (meia-lua)
  g.clear();
  g.lineStyle(12, C.cyan, 0.35).beginPath().arc(4, 36, 32, -1.15, 1.15).strokePath();
  g.lineStyle(5, C.white, 1).beginPath().arc(4, 36, 32, -0.95, 0.95).strokePath();
  g.generateTexture('slash_arc', 48, 72);

  // Chão craquelado / rachado pelo impacto das rochas arremessadas pelo Boss Golem
  g.clear();
  g.fillStyle(0x3a2818, 0.78).fillEllipse(28, 20, 52, 26);
  g.fillStyle(0x22160d, 0.92).fillEllipse(28, 20, 40, 18);
  g.fillStyle(0x140d07, 1);
  g.fillRect(26, 18, 3, 3).fillRect(22, 14, 4, 2).fillRect(17, 11, 5, 2).fillRect(12, 9, 5, 1);
  g.fillRect(29, 17, 4, 3).fillRect(33, 13, 5, 2).fillRect(38, 11, 4, 2).fillRect(42, 8, 5, 1);
  g.fillRect(25, 21, 3, 4).fillRect(20, 24, 5, 2).fillRect(14, 26, 6, 2).fillRect(9, 27, 5, 1);
  g.fillRect(30, 21, 4, 3).fillRect(34, 23, 6, 2).fillRect(40, 25, 5, 2).fillRect(45, 26, 4, 1);
  g.fillStyle(C.ironDark).fillRect(10, 15, 3, 2).fillRect(42, 17, 3, 2).fillRect(24, 7, 2, 2).fillRect(32, 29, 3, 2);
  g.fillStyle(C.steelDark).fillRect(11, 15, 1, 1).fillRect(43, 17, 1, 1).fillRect(33, 29, 1, 1);
  g.generateTexture('cracked_ground', 56, 40);

  // Faísca usada nas explosões de partículas
  g.clear().fillStyle(C.white).fillRect(0, 0, 4, 4);
  g.generateTexture('spark', 4, 4);
  g.destroy();
}

// =============================================================================
// CENA: PRELOAD — cria todas as texturas (só na primeira vez)
// =============================================================================
function preload() {
  if (this.textures.exists('knight')) return;
  makeSheet(this, 'knight', 32, 32, 2, drawKnight);
  makeSheet(this, 'goblin', 28, 28, 2, drawGoblin);
  makeSheet(this, 'warrior', 36, 36, 2, drawWarrior);
  makeSheet(this, 'elf', 32, 32, 2, drawElf);
  makeSheet(this, 'mini_golem', 28, 28, 2, drawMiniGolem);
  makeSheet(this, 'boss_golem', 64, 64, 2, drawBossGolem);
  makeSheet(this, 'tree', 48, 64, 1, drawTree);
  makeSheet(this, 'rock', 32, 26, 2, drawRock);
  makeSheet(this, 'shield_worn', 18, 22, 1, drawShieldIcon);
  makeSheet(this, 'sword_blade', 12, 40, 1, drawBlade);
  makeSheet(this, 'arrow_player', 26, 10, 1, arrowDrawer(C.blue, C.steelLight));
  makeSheet(this, 'arrow_elf', 26, 10, 1, arrowDrawer(C.elfCloak, C.purple));
  makeSheet(this, 'hud_hourglass', 22, 26, 1, drawHourglass);
  makeSheet(this, 'hud_crown', 24, 22, 1, drawCrown);
  makeSheet(this, 'hud_horn', 30, 20, 2, drawHorn);
  makeSheet(this, 'knight_banner', 48, 56, 1, drawKnightBanner);
  makeItem(this, 'item_bow', 0xffe082, drawBowIcon);
  makeItem(this, 'item_shield', 0x80deea, drawShieldIcon);
  makeItem(this, 'item_sword', 0xffffff, drawSwordIcon);
  makeWorldTextures(this);
}

// =============================================================================
// CENA: CREATE — monta camadas, grupos, jogador, colisões e HUD
// =============================================================================
function create(data) {
  const scene = this;
  sound.stopBGM();
  gameState = 'MENU';
  survivalTime = 0;
  enemySpeed = 200;
  spawnDelay = 1250;
  buff = { type: null, timeLeft: 0, nextAttack: 0 };
  activeBoss = null;
  bossSpawned = false;
  bossDefeated = false;

  // Limpa todos os listeners de teclado ao encerrar/reiniciar a cena (evita duplicação)
  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
    scene.input.keyboard.removeAllListeners();
  });

  // Animações de caminhada (2 quadros) — criadas uma única vez
  const fps = { knight: 10, goblin: 12, warrior: 6, elf: 8, mini_golem: 10, boss_golem: 5 };
  Object.entries(fps).forEach(([key, frameRate]) => {
    if (!scene.anims.exists(key)) {
      scene.anims.create({ key, frameRate, repeat: -1, frames: [{ key, frame: 0 }, { key, frame: 1 }] });
    }
  });

  // Camadas do cenário, de trás para frente
  ground = scene.add.tileSprite(400, 300, 800, 600, 'ground').setDepth(-10);
  road = scene.add.tileSprite(400, 330, 800, 80, 'road').setDepth(-9);
  forestTop = scene.add.tileSprite(400, 55, 800, 110, 'forest_top').setDepth(-5);
  shadows = scene.add.graphics().setDepth(-2);
  forestBottom = scene.add.tileSprite(400, 560, 800, 80, 'forest_bottom').setDepth(1000);
  bossFilterOverlay = scene.add.rectangle(400, 300, 800, 600, 0x240b06, 0).setDepth(1800);

  // Grupos físicos
  enemies = scene.physics.add.group();
  obstacles = trees = scene.physics.add.group({ immovable: true });
  items = scene.physics.add.group();
  playerArrows = scene.physics.add.group();
  enemyArrows = scene.physics.add.group();
  slashes = scene.physics.add.group();

  // Árvores iniciais nas bordas (as rochas agora só surgem arremessadas pelo Boss Golem)
  for (let x = 320; x <= 800; x += 120) spawnTree(x);

  // Jogador (limitado à área entre as florestas)
  scene.physics.world.setBounds(0, 95, 800, 455);
  player = scene.physics.add.sprite(160, 330, 'knight', 0);
  player.body.setSize(16, 22).setOffset(8, 8);
  player.setCollideWorldBounds(true);
  player.setVisible(false); // Oculto enquanto estiver nos menus
  shieldSprite = scene.add.image(0, 0, 'shield_worn').setVisible(false);

  // Controles
  cursors = scene.input.keyboard.createCursorKeys();
  keys = scene.input.keyboard.addKeys('W,A,S,D');

  pauseModal = null;
  enemyHpBars = scene.add.graphics().setDepth(2400);
  playerBuffBar = scene.add.graphics().setDepth(2500);

  // Tecla ESC para pausar ou despausar a aventura
  scene.input.keyboard.on('keydown-ESC', () => handleEscPress(scene));

  // Partículas de poeira nos passos do cavaleiro
  dustFx = scene.add.particles(0, 0, 'spark', {
    lifespan: 320,
    speedX: { min: -70, max: -20 },
    speedY: { min: -18, max: 6 },
    scale: { start: 1.0, end: 0 },
    alpha: { start: 0.45, end: 0 },
    tint: [0xd6c8aa, 0xb89a6c, 0x9b7b4f],
    emitting: false
  }).setDepth(5);

  // Partículas para impactos e mortes
  hitFx = scene.add.particles(0, 0, 'spark', {
    lifespan: 400, speed: { min: 60, max: 180 }, scale: { start: 1.5, end: 0 },
    tint: [0xffffff, 0xffca28, 0xff7043], emitting: false
  }).setDepth(1500);

  createHUD(scene);

  // Colisões do jogador (separação suave nos obstáculos sem trancos ou cuspidas)
  scene.physics.add.overlap(player, obstacles, (p, o) => separatePlayerFromObstacle(p, o));
  scene.physics.add.overlap(player, enemies, (p, e) => playerHit(scene, e));
  scene.physics.add.overlap(player, enemyArrows, (p, a) => playerHit(scene, a));
  scene.physics.add.overlap(player, items, (p, i) => collectItem(scene, i));

  // Combate (só atinge inimigos visíveis na tela; suporta múltiplos pontos de vida)
  scene.physics.add.overlap(playerArrows, enemies, (a, e) => {
    if (e.x < 800 && a.active && e.active) {
      a.destroy();
      damageEnemy(scene, e, 1);
    }
  });
  scene.physics.add.overlap(slashes, enemies, (s, e) => {
    if (e.x < 800 && s.active && e.active && e.lastSlashId !== s.slashId) {
      e.lastSlashId = s.slashId;
      damageEnemy(scene, e, 2); // Espada Vorpal corta armadura pesada de uma vez
    }
  });
  scene.physics.add.overlap(slashes, enemyArrows, (s, a) => { sound.playShieldBlock(); a.destroy(); });
  scene.physics.add.overlap(playerArrows, enemyArrows, (a, b) => { sound.playShieldBlock(); a.destroy(); b.destroy(); });

  // Obstáculos (árvores e rochas) servem de cobertura: bloqueiam flechas
  const hitObstacle = (arrow, obs) => {
    if (!arrow.active) return;
    if (arrow.x > 0 && arrow.x < 800 && obs.x < 810) {
      if (obs.obstacleType === 'rock') {
        sound.playShieldBlock();
        hitFx.explode(6, arrow.x, arrow.y);
      } else {
        sound.playWoodHit();
        hitFx.explode(4, arrow.x, arrow.y);
      }
    }
    arrow.destroy();
  };
  scene.physics.add.overlap(playerArrows, obstacles, hitObstacle);
  scene.physics.add.overlap(enemyArrows, obstacles, hitObstacle);

  if (data && data.autoStart) {
    startGameplay(scene);
  } else {
    showMainMenu(scene);
  }
}

// =============================================================================
// CENA: UPDATE — roda a cada frame
// =============================================================================
function update(time, delta) {
  const dt = delta / 1000;
  if (gameState === 'PLAYING') updateGameplay(this, time, dt);
  else if (gameState === 'MENU') updateMenuBackground(dt);
  sortAndShade();
}

// Fundo rolando suavemente no menu inicial (efeito vivo de viagem)
function updateMenuBackground(dt) {
  const scrollSpeed = 35;
  ground.tilePositionX += scrollSpeed * dt;
  road.tilePositionX += scrollSpeed * dt;
  forestTop.tilePositionX += scrollSpeed * 0.85 * dt;
  forestBottom.tilePositionX += scrollSpeed * 1.25 * dt;
  obstacles.setVelocityX(-scrollSpeed);
}

function updateGameplay(scene, time, dt) {
  // 1. Mundo rolando: chão, estrada e obstáculos andam JUNTOS (nada desliza)
  const worldSpeed = enemySpeed * 0.6;
  ground.tilePositionX += worldSpeed * dt;
  road.tilePositionX += worldSpeed * dt;
  forestTop.tilePositionX += worldSpeed * 0.9 * dt;    // fundo: um pouco mais lento
  forestBottom.tilePositionX += worldSpeed * 1.3 * dt; // frente: mais rápido (parallax)
  obstacles.setVelocityX(-worldSpeed);
  items.setVelocityX(-worldSpeed);

  // 2. Cavaleiro: 8 direções com velocidade normalizada, SEMPRE olhando para a frente
  let dirX = 0, dirY = 0;
  if (cursors.left.isDown || keys.A.isDown) dirX -= 1;
  if (cursors.right.isDown || keys.D.isDown) dirX += 1;
  if (cursors.up.isDown || keys.W.isDown) dirY -= 1;
  if (cursors.down.isDown || keys.S.isDown) dirY += 1;
  player.setVelocity(dirX, dirY).body.velocity.normalize().scale(PLAYER_SPEED);
  player.setFlipX(false);                                               // sempre olhando para o caminho à frente
  player.anims.timeScale = dirX > 0 ? 1.5 : (dirX < 0 ? 0.85 : 1);      // ritmo dos passos (avanço vs recuo)
  player.setAngle(Math.sin(time * 0.02) * 3);                           // balanço dos passos

  // Poeira sutil nos passos do cavaleiro
  if (Math.random() < 0.28) {
    dustFx.emitParticleAt(player.x - 6, player.y + 14, 1);
  }

  // 3. Inimigos balançando enquanto andam + Movimentação do Boss Golem na arena
  enemies.getChildren().forEach(e => {
    if (!e.isBoss) e.setAngle(Math.sin(time * 0.015 + e.phase) * 5);
  });

  if (activeBoss && activeBoss.active) {
    if (!activeBoss.isLunging) {
      activeBoss.setAngle(Math.sin(time * 0.008) * 2.2);
      if (activeBoss.entering) {
        if (activeBoss.x <= 685) {
          activeBoss.x = 685;
          activeBoss.setVelocityX(0);
          activeBoss.entering = false;
          activeBoss.setVelocityY(68);
        }
      } else {
        activeBoss.x = 685;
        activeBoss.setVelocityX(0);
        if (activeBoss.y <= 170) activeBoss.setVelocityY(72);
        else if (activeBoss.y >= 480) activeBoss.setVelocityY(-72);
      }
    }
  }

  // 4. Item ativo: conta o tempo e ataca na cadência certa
  if (buff.type) {
    buff.timeLeft -= dt;
    if (buff.timeLeft <= 0) endBuff();
    else if (time > buff.nextAttack && ATTACK_RATE[buff.type]) {
      if (buff.type === 'bow') shootArrow();
      if (buff.type === 'sword') swingSword(scene);
      buff.nextAttack = time + ATTACK_RATE[buff.type];
    }
  }
  updateItemHUD();

  // 5. Limpeza do que saiu da tela (.slice() evita pular itens ao destruir; Boss nunca some!)
  const cull = (group, isOut) => group.getChildren().slice().forEach(s => { if (isOut(s)) removeEntity(s); });
  cull(enemies, s => !s.isBoss && s.x < -60);
  cull(obstacles, s => s.x < -60);
  cull(items, s => s.x < -60);
  cull(playerArrows, s => s.x < 0 || s.x > 800);
  cull(enemyArrows, s => s.x < -40 || s.y < 0 || s.y > 620);
}

// Impede o jogador de atravessar obstáculos e resolve prensamento de forma suave (sem trancos ou cuspidas)
function separatePlayerFromObstacle(p, obs) {
  if (!p.active || !obs.active) return;
  if (obs.lockedY !== undefined) obs.y = obs.lockedY;
  obs.body.velocity.y = 0;

  const pb = p.body, ob = obs.body;
  const ox = Math.min(pb.right, ob.right) - Math.max(pb.left, ob.left);
  const oy = Math.min(pb.bottom, ob.bottom) - Math.max(pb.top, ob.top);
  if (ox <= 0 || oy <= 0) return;

  // Direção do desvio: respeita a intenção do jogador (W/S) ou desvia pelo lado mais próximo do centro
  let slideDir = (keys.W.isDown || cursors.up.isDown) ? -1 :
                 (keys.S.isDown || cursors.down.isDown) ? 1 :
                 (pb.center.y < ob.center.y ? -1 : 1);
  if (p.y <= 112) slideDir = 1;
  else if (p.y >= 533) slideDir = -1;

  // 1. Jogador espremido contra a borda esquerda pelo obstáculo que avança
  if (pb.left <= 18 && pb.center.x <= ob.center.x) {
    // Espreme e empurra aos poucos para o lado de forma suave (sem teleportar/cuspir o jogador)
    const squeezeStep = Math.min(oy, 2.4);
    p.y = Phaser.Math.Clamp(p.y + slideDir * squeezeStep, 106, 539);
    p.x = Math.max(16, pb.width / 2);
  } else if (ox < oy) {
    // 2. Colisão horizontal padrão
    if (pb.center.x < ob.center.x) {
      p.x = Phaser.Math.Clamp(p.x - ox, 16, 792);
      // Leve arredondamento suave ao encostar na frente do obstáculo
      if (oy > 2) p.y = Phaser.Math.Clamp(p.y + slideDir * Math.min(oy, 1.4), 106, 539);
    } else {
      p.x = Phaser.Math.Clamp(p.x + ox, 16, 792);
    }
  } else {
    // 3. Colisão vertical padrão
    p.y = Phaser.Math.Clamp(p.y + (pb.center.y < ob.center.y ? -oy : oy), 106, 539);
  }
  pb.updateFromGameObject();
}

// Profundidade por altura (quem está mais embaixo fica na frente) + sombras + barras de HP
function sortAndShade() {
  shadows.clear().fillStyle(0x000000, 0.28);
  enemyHpBars.clear();

  const shadeEntity = (s) => {
    if (!s || !s.active || !s.visible) return;
    const feet = s.groundY ?? s.y + s.displayHeight / 2;
    s.setDepth(feet);
    shadows.fillEllipse(s.x, feet - 2, s.displayWidth * 0.7, s.isBoss ? 14 : 8);
  };

  obstacles.getChildren().forEach(o => {
    if (o.lockedY !== undefined) o.y = o.lockedY;
    if (o.crackDecal && o.crackDecal.active) {
      o.crackDecal.setPosition(o.x, o.y + 6);
    }
    shadeEntity(o);
  });

  if (gameState === 'PLAYING' || gameState === 'PAUSED') {
    shadeEntity(player);
    items.getChildren().forEach(shadeEntity);
    enemies.getChildren().forEach(e => {
      shadeEntity(e);
      if (e.chargeRing && e.chargeRing.active) {
        e.chargeRing.setPosition(e.x - 12, e.y).setDepth(e.depth + 2);
      }
      // Desenha barra de vida/armadura para inimigos comuns com mais de 1 HP (Boss usa o HUD dedicado)
      if (e.active && !e.isBoss && e.maxHp > 1) {
        const bw = 22, bh = 4;
        const bx = Math.round(e.x - bw / 2);
        const by = Math.round(e.y - e.displayHeight / 2 - 8);
        enemyHpBars.fillStyle(0x0e0b08, 0.9).fillRect(bx - 1, by - 1, bw + 2, bh + 2);
        enemyHpBars.fillStyle(0x2a1d17, 0.9).fillRect(bx, by, bw, bh);
        const pct = Phaser.Math.Clamp(e.hp / e.maxHp, 0, 1);
        const hpColor = e.hp < e.maxHp ? 0xff5252 : 0xffca28;
        enemyHpBars.fillStyle(hpColor, 1).fillRect(bx, by, Math.round(bw * pct), bh);
      }
    });
  }

  playerArrows.getChildren().forEach(a => a.setDepth(a.y + 16));
  enemyArrows.getChildren().forEach(a => a.setDepth(a.y + 16));

  // Escudo e golpe de espada acompanham o cavaleiro (sempre voltados para a frente)
  if (player && player.visible) {
    shieldSprite.setPosition(player.x + 12, player.y + 4).setDepth(player.depth + 1);
  }
  slashes.getChildren().forEach(s => {
    s.setPosition(player.x + 30, player.y).setDepth(player.depth + 3);
    if (s.blade && s.blade.active) {
      s.blade.setPosition(player.x + 8, player.y + 4).setDepth(player.depth + 2);
    }
  });
}

// =============================================================================
// SPAWNS & BOSS FIGHT (60 SEGUNDOS)
// =============================================================================
function startGameplay(scene) {
  gameState = 'PLAYING';
  if (player) {
    player.setPosition(160, 330).setFlipX(false).setVisible(true);
    player.play('knight');
  }
  if (playerBuffBar) playerBuffBar.clear();
  if (enemyHpBars) enemyHpBars.clear();
  if (hudContainer) hudContainer.setVisible(true);
  sound.startBGM('normal');

  const every = (delay, fn) => scene.time.addEvent({ delay, loop: true, callback: () => gameState === 'PLAYING' && fn() });
  every(1000, () => {
    survivalTime++;
    if (hudGloryText) hudGloryText.setText(`${survivalTime}s`);
    if (survivalTime > getBestScore() && hudBestText) {
      hudBestText.setText(`${survivalTime}s`);
    }
    if (survivalTime === BOSS_TRIGGER_TIME && !bossSpawned) {
      startBossFight(scene);
    }
  });

  // Progressão balanceada com teto de velocidade e limite mínimo de spawn
  every(4000, () => {
    enemySpeed = Math.min(MAX_ENEMY_SPEED, enemySpeed + 14);
    spawnDelay = Math.max(MIN_SPAWN_DELAY, spawnDelay - 55);
    enemies.getChildren().forEach(e => {
      if (e.active && !e.isBoss && e.enemyType && ENEMIES[e.enemyType]) {
        e.setVelocityX(-enemySpeed * ENEMIES[e.enemyType].speed);
      }
    });
  });

  // Relíquias e árvores das bordas (rochas não nascem mais aleatoriamente — são ataques do Golem!
  every(4600, () => spawnItem(scene));
  every(900, () => spawnTree());

  const nextEnemy = () => {
    if (gameState !== 'PLAYING') return;
    spawnEnemy(scene);
    const currentDelay = (activeBoss && activeBoss.active) ? Math.max(980, spawnDelay + 220) : spawnDelay;
    scene.time.delayedCall(currentDelay, nextEnemy);
  };
  nextEnemy();
}

function spawnEnemy(scene, forcedType, customY) {
  const roll = Math.random();
  let type = forcedType;
  if (!type) {
    if (activeBoss && activeBoss.active) {
      // Durante a Boss Fight, os filhotinhos (mini_golem) aparecem junto aos outros inimigos
      type = roll < 0.45 ? 'mini_golem' : roll < 0.70 ? 'goblin' : roll < 0.86 ? 'warrior' : 'elf';
    } else {
      type = roll < 0.45 ? 'goblin' : roll < 0.75 ? 'warrior' : 'elf';
    }
  }
  const cfg = ENEMIES[type];

  // Evita nascer exatamente em cima de outro inimigo recém-gerado
  let y = customY ?? Phaser.Math.Between(130, 520);
  if (customY === undefined) {
    for (let i = 0; i < 5; i++) {
      const candidate = Phaser.Math.Between(130, 520);
      const stacked = enemies.getChildren().some(e => !e.isBoss && e.x > 770 && Math.abs(e.y - candidate) < 34);
      if (!stacked) { y = candidate; break; }
    }
  }

  const enemy = enemies.create(860, y, type, 0);
  enemy.play({ key: type, startFrame: Phaser.Math.Between(0, 1) }).setFlipX(true);
  enemy.body.setSize(cfg.w, cfg.h);
  enemy.setVelocityX(-enemySpeed * cfg.speed);
  enemy.phase = Math.random() * 10; // cada um balança num ritmo diferente
  enemy.enemyType = type;
  enemy.maxHp = cfg.hp;
  enemy.hp = cfg.hp;

  if (type === 'elf') {
    enemy.shootTimer = scene.time.addEvent({ delay: 1850, loop: true, callback: () => elfShoot(scene, enemy) });
  }
}

// =============================================================================
// PRIMEIRA BOSS FIGHT: GOLEM ANCESTRAL DE PEDRA (AOS 60 SEGUNDOS)
// =============================================================================
function registerBossTelegraph(boss, obj) {
  if (!boss || !obj) return obj;
  if (!boss.activeTelegraphs) boss.activeTelegraphs = [];
  boss.activeTelegraphs.push(obj);
  return obj;
}

function clearBossTelegraphs(boss) {
  if (!boss || !boss.activeTelegraphs) return;
  boss.activeTelegraphs.forEach(t => {
    if (t && t.active) {
      if (t.scene && t.scene.tweens) t.scene.tweens.killTweensOf(t);
      t.destroy();
    }
  });
  boss.activeTelegraphs = [];
}

function startBossFight(scene) {
  bossSpawned = true;
  sound.startBGM('boss');
  sound.playEarthSmash();
  scene.cameras.main.shake(480, 0.011);

  // Filtro dramático de tensão no cenário + tint nas camadas do mundo
  if (bossFilterOverlay) {
    scene.tweens.add({ targets: bossFilterOverlay, alpha: 0.24, duration: 1000 });
  }
  ground.setTint(0xd0a28c);
  road.setTint(0xd8ae98);
  forestTop.setTint(0x9e8278);
  forestBottom.setTint(0x9e8278);

  floatText(scene, 400, 128, '⚠ CHEFÃO: GOLEM ANCESTRAL DE PEDRA! ⚠', '#ff5252');

  // Cria o Boss Golem de Pedra (64x64 — imenso, musgoso e não desaparece da arena)
  const boss = enemies.create(875, 325, 'boss_golem', 0);
  boss.play('boss_golem').setFlipX(true);
  boss.body.setSize(46, 54).setOffset(9, 6);
  boss.setImmovable(true);
  boss.body.pushable = false;
  boss.isBoss = true;
  boss.enemyType = 'boss_golem';
  boss.maxHp = BOSS_MAX_HP;
  boss.hp = BOSS_MAX_HP;
  boss.entering = true;
  boss.isLunging = false;
  boss.attackCount = 0;
  boss.activeTelegraphs = [];
  boss.setVelocityX(-115);
  activeBoss = boss;

  // Exibe a Barra de Vida do Boss no HUD
  if (bossHudContainer) {
    bossHudContainer.setVisible(true).setAlpha(0);
    scene.tweens.add({ targets: bossHudContainer, alpha: 1, duration: 550 });
  }
  updateBossHUD();

  // Garante uma relíquia para o jogador enfrentar o Golem e invoca os primeiros filhotinhos
  if (!buff.type) spawnItem(scene);
  spawnEnemy(scene, 'mini_golem', 220);
  spawnEnemy(scene, 'mini_golem', 430);

  // Ciclo de ataques do Boss (alternando Arremesso de Rochas e Soco Colossal com alerta vermelho prévio)
  boss.attackTimer = scene.time.addEvent({
    delay: 2800,
    loop: true,
    callback: () => {
      if (gameState !== 'PLAYING' || !boss.active || boss.entering || boss.isLunging) return;
      boss.attackCount++;
      // Invoca um filhotinho de pedra ("mini_golem") para acompanhar os ataques
      spawnEnemy(scene, 'mini_golem', Phaser.Math.Clamp(boss.y + Phaser.Math.Between(-90, 90), 140, 510));

      if (boss.attackCount % 2 === 1) {
        bossThrowRocks(scene, boss);
      } else {
        bossColossalPunch(scene, boss);
      }
    }
  });
}

// GOLPE 1: Arremesso de Rochas com Alerta Vermelho -> Chão Craquelado + Rocha como Escudo/Obstáculo
function bossThrowRocks(scene, boss) {
  if (!boss || !boss.active || gameState !== 'PLAYING') return;
  const rockCount = boss.hp <= boss.maxHp * 0.5 ? 3 : 2;

  for (let i = 0; i < rockCount; i++) {
    scene.time.delayedCall(i * 260, () => {
      if (!boss || !boss.active || !player || !player.active || gameState !== 'PLAYING') return;

      // Calcula área de queda com mira próxima ao cavaleiro
      const tx = i === 0
        ? Phaser.Math.Clamp(player.x + Phaser.Math.Between(-25, 65), 145, 555)
        : Phaser.Math.Clamp(player.x + Phaser.Math.Between(-85, 110), 145, 555);
      const ty = i === 0
        ? Phaser.Math.Clamp(player.y + Phaser.Math.Between(-35, 35), 140, 505)
        : Phaser.Math.Clamp(player.y + Phaser.Math.Between(-105, 105), 140, 505);
      const variant = Math.random() < 0.55 ? 1 : 0; // com musgo ou lisa

      // 1. ALERTA VERMELHO NO CHÃO (950ms antes do impacto para o jogador desviar)
      const alertRing = registerBossTelegraph(
        boss,
        scene.add.circle(tx, ty, 30, 0xff1744, 0.20).setStrokeStyle(2.5, 0xff5252, 0.95).setDepth(ty - 1)
      );
      const innerPulse = registerBossTelegraph(
        boss,
        scene.add.circle(tx, ty, 8, 0xff5252, 0.48).setDepth(ty)
      );
      const crossH = registerBossTelegraph(
        boss,
        scene.add.rectangle(tx, ty, 44, 2, 0xff8a80, 0.85).setDepth(ty)
      );
      const crossV = registerBossTelegraph(
        boss,
        scene.add.rectangle(tx, ty, 2, 32, 0xff8a80, 0.85).setDepth(ty)
      );

      scene.tweens.add({
        targets: innerPulse,
        radius: 30,
        alpha: { from: 0.55, to: 0.85 },
        duration: 950,
        ease: 'Quad.easeIn'
      });
      scene.tweens.add({
        targets: alertRing,
        alpha: { from: 0.25, to: 0.7 },
        duration: 190,
        yoyo: true,
        repeat: 4
      });

      // 2. Boss prepara o braço e lança a rocha pelo ar em parábola
      boss.setTint(0xffab91);
      scene.time.delayedCall(220, () => {
        if (!boss || !boss.active || gameState !== 'PLAYING') return;
        boss.clearTint();

        const flyingRock = registerBossTelegraph(
          boss,
          scene.add.image(boss.x - 22, boss.y - 18, 'rock', variant).setDepth(1600).setScale(1.18)
        );

        scene.tweens.add({
          targets: flyingRock,
          x: tx,
          y: ty,
          angle: 360,
          scale: { from: 1.38, to: 1.0 },
          duration: 730,
          ease: 'Sine.easeIn',
          onComplete: () => {
            [alertRing, innerPulse, crossH, crossV, flyingRock].forEach(o => { if (o && o.active) o.destroy(); });
            if (gameState !== 'PLAYING' || !boss.active) return;

            // 3. IMPACTO NO CHÃO: tremor, som sísmico, chão craquelado e rocha vira escudo/obstáculo!
            sound.playEarthSmash();
            scene.cameras.main.shake(170, 0.006);
            hitFx.explode(10, tx, ty);

            // Se o cavaleiro não desviou do alerta vermelho, sofre o impacto da queda
            if (player && player.active && Phaser.Math.Distance.Between(player.x, player.y, tx, ty) <= 30) {
              playerHit(scene, { active: true, isBossAttack: true, x: tx, y: ty, destroy: () => {} });
            }

            // Cria o chão craquelado + rocha sólida como escudo/obstáculo
            spawnBossRockAt(scene, tx, ty, variant);
          }
        });
      });
    });
  }
}

// GOLPE 2: Soco Colossal ("Soco Bem Grande") com Alerta Vermelho em Faixa Horizontal
function bossColossalPunch(scene, boss) {
  if (!boss || !boss.active || gameState !== 'PLAYING') return;
  boss.isLunging = true;
  boss.setVelocity(0, 0);

  // Alinha suavemente a faixa do soco próximo à altura atual
  const laneY = Phaser.Math.Clamp(
    player && player.active ? Phaser.Math.Linear(boss.y, player.y, 0.55) : boss.y,
    170,
    480
  );
  boss.y = laneY;
  const laneH = 74;
  const laneW = 560;
  const laneCenterX = 395;

  // 1. ALERTA VERMELHO NA FAIXA DO SOCO (880ms de aviso prévio para o jogador sair da linha)
  const warnZone = registerBossTelegraph(
    boss,
    scene.add.rectangle(laneCenterX, laneY, laneW, laneH, 0xff1744, 0.22)
      .setStrokeStyle(2.5, 0xff5252, 0.95)
      .setDepth(laneY - 2)
  );
  const warnCore = registerBossTelegraph(
    boss,
    scene.add.rectangle(laneCenterX, laneY, laneW, 14, 0xff5252, 0.38)
      .setDepth(laneY - 1)
  );
  const warnText = registerBossTelegraph(
    boss,
    scene.add.text(410, laneY, '<<< SOCO COLOSSAL! DESVIE! <<<', {
      ...textStyle('#ff8a80', 13),
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5).setDepth(1550)
  );

  boss.setTint(0xff7043);
  scene.tweens.add({
    targets: [warnZone, warnCore],
    alpha: { from: 0.18, to: 0.62 },
    duration: 175,
    yoyo: true,
    repeat: 4
  });

  // 2. EXECUÇÃO DO SOCO COLOSSAL APÓS O ALERTA VERMELHO
  scene.time.delayedCall(880, () => {
    [warnZone, warnCore, warnText].forEach(o => { if (o && o.active) o.destroy(); });
    if (!boss || !boss.active || gameState !== 'PLAYING') return;

    boss.clearTint();
    sound.playEarthSmash();
    scene.cameras.main.shake(280, 0.012);

    // Onda de impacto do punho gigante rasgando a faixa
    const fistWave = registerBossTelegraph(
      boss,
      scene.add.rectangle(boss.x - 36, laneY, 76, laneH - 8, 0xffab91, 0.75)
        .setStrokeStyle(3, 0xffca28, 1)
        .setDepth(laneY + 4)
    );
    scene.tweens.add({
      targets: fistWave,
      x: 155,
      scaleX: 1.5,
      alpha: { from: 0.9, to: 0 },
      duration: 240,
      ease: 'Cubic.easeOut',
      onComplete: () => { if (fistWave && fistWave.active) fistWave.destroy(); }
    });

    // Investida veloz do Golem com o punho à frente e retorno à posição de guarda
    scene.tweens.add({
      targets: boss,
      x: 205,
      duration: 220,
      ease: 'Back.easeIn',
      onUpdate: () => {
        if (gameState === 'PLAYING' && boss.active && Math.random() < 0.65) {
          hitFx.explode(4, boss.x - 24, boss.y + 16);
        }
      },
      onComplete: () => {
        if (!boss || !boss.active) return;
        hitFx.explode(16, boss.x - 20, boss.y);
        scene.tweens.add({
          targets: boss,
          x: 685,
          duration: 460,
          ease: 'Sine.easeOut',
          onComplete: () => {
            if (!boss || !boss.active) return;
            boss.isLunging = false;
            boss.setVelocityY(Math.random() < 0.5 ? 72 : -72);
          }
        });
      }
    });
  });
}

// Cria o Chão Craquelado ("cracked_ground") + a Rocha sólida que fica como escudo/obstáculo
function spawnBossRockAt(scene, x, y, variant = 1) {
  const crack = scene.add.image(x, y + 6, 'cracked_ground').setDepth(-8).setAlpha(0.95);
  const rock = obstacles.create(x, y, 'rock', variant);
  rock.setImmovable(true);
  rock.body.pushable = false;
  rock.lockedY = y;
  rock.groundY = y + 7;
  rock.obstacleType = 'rock';
  rock.crackDecal = crack;
  rock.body.setSize(20, 14).setOffset(6, 8);
  rock.setVelocityX(-150); // acompanha o movimento da estrada e funciona como escudo
}

function updateBossHUD() {
  if (!bossHpBar || !bossHpText) return;
  bossHpBar.clear();
  if (!activeBoss || !activeBoss.active) return;

  const hp = Math.max(0, activeBoss.hp);
  const maxHp = activeBoss.maxHp || BOSS_MAX_HP;
  const pct = Phaser.Math.Clamp(hp / maxHp, 0, 1);

  const bx = 252, by = 78, bw = 296, bh = 9;
  bossHpBar.fillStyle(0x0c0907, 1).fillRect(bx, by, bw, bh);
  bossHpBar.lineStyle(1, 0x5c3a21).strokeRect(bx, by, bw, bh);

  const fillColor = pct <= 0.35 ? 0xff1744 : pct <= 0.65 ? 0xff5252 : 0xd83a3a;
  const fillW = Math.max(0, Math.round((bw - 2) * pct));
  if (fillW > 0) {
    bossHpBar.fillStyle(fillColor, 1).fillRect(bx + 1, by + 1, fillW, bh - 2);
    bossHpBar.fillStyle(0xff8a80, 0.55).fillRect(bx + 1, by + 1, fillW, 2);
  }
  bossHpText.setText(`${hp}/${maxHp}`);
}

function defeatBoss(scene, boss) {
  if (!boss) return;
  if (boss.attackTimer) boss.attackTimer.remove();
  clearBossTelegraphs(boss);

  const bx = boss.x, by = boss.y;
  activeBoss = null;
  bossDefeated = true;

  sound.playEarthSmash();
  sound.playEnemyHit();
  scene.cameras.main.flash(260, 255, 215, 110);
  scene.cameras.main.shake(450, 0.014);
  hitFx.explode(36, bx, by);
  removeEntity(boss);

  // Elimina mini golems restantes na onda de choque da derrota do mestre
  enemies.getChildren().slice().forEach(e => {
    if (e.active && e.enemyType === 'mini_golem') killEnemy(e);
  });

  if (bossHudContainer) {
    scene.tweens.add({
      targets: bossHudContainer,
      alpha: 0,
      duration: 500,
      onComplete: () => bossHudContainer.setVisible(false)
    });
  }

  // Restaura o filtro do cenário e a música heroica da jornada
  if (bossFilterOverlay) {
    scene.tweens.add({ targets: bossFilterOverlay, alpha: 0, duration: 900 });
  }
  ground.clearTint();
  road.clearTint();
  forestTop.clearTint();
  forestBottom.clearTint();
  sound.startBGM('normal');

  floatText(scene, 400, 150, '★ GOLEM ANCESTRAL DERROTADO! ★', '#ffca28');
  spawnItem(scene);
}

// Elfo brilha e concentra energia (360ms de aviso justo) antes de disparar
function elfShoot(scene, elf) {
  if (!elf.active || !player || !player.active || gameState !== 'PLAYING') return;
  if (elf.x > 780 || elf.x < player.x + 140) return; // distância mínima justa de reação

  elf.setTint(0xff80ff);
  if (elf.chargeRing && elf.chargeRing.active) elf.chargeRing.destroy();
  const chargeRing = scene.add.circle(elf.x - 12, elf.y, 12, 0xc36bff, 0.35)
    .setStrokeStyle(1.5, 0xffeb3b).setDepth(elf.depth + 2);
  elf.chargeRing = chargeRing;

  scene.tweens.add({
    targets: chargeRing,
    scale: { from: 1.3, to: 0.2 },
    alpha: { from: 0.9, to: 0 },
    duration: 360,
    onComplete: () => { if (chargeRing.active) chargeRing.destroy(); }
  });

  scene.time.delayedCall(360, () => {
    if (!elf.active || !player || !player.active || !player.body || gameState !== 'PLAYING') return;
    elf.clearTint();
    sound.playElfShot();
    const arrow = enemyArrows.create(elf.x - 14, elf.y, 'arrow_elf');
    arrow.body.setSize(8, 8);
    arrow.rotation = scene.physics.moveToObject(arrow, player, 360);
  });
}

// Árvores nascem na vegetação fora da estrada
function spawnTree(x = 880) {
  for (let i = 0; i < 6; i++) {
    const y = Phaser.Math.Between(150, 510);
    const onRoad = y > 265 && y < 395;
    const crowded = obstacles.getChildren().some(o => Math.abs(o.x - x) < 110 && Math.abs(o.y - y) < 90);
    if (onRoad || crowded) continue;
    const tree = obstacles.create(x, y, 'tree');
    tree.setImmovable(true);
    tree.body.pushable = false;
    tree.lockedY = y;
    tree.obstacleType = 'tree';
    tree.body.setSize(12, 14).setOffset(18, 46); // colisão firme no tronco
    return;
  }
}

// Item flutua e pulsa para chamar atenção (evita nascer dentro de obstáculos)
function spawnItem(scene) {
  const type = Phaser.Utils.Array.GetRandom(['bow', 'shield', 'sword']);
  let y = Phaser.Math.Between(140, 510);
  for (let i = 0; i < 6; i++) {
    const candidate = Phaser.Math.Between(140, 510);
    const nearObstacle = obstacles.getChildren().some(o => Math.abs(o.x - 860) < 90 && Math.abs(o.y - candidate) < 42);
    if (!nearObstacle) { y = candidate; break; }
  }
  const item = items.create(860, y, 'item_' + type);
  item.lootType = type;
  item.groundY = y + 18; // sombra fica no chão enquanto o item flutua
  scene.tweens.add({ targets: item, y: y - 8, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
  scene.tweens.add({ targets: item, scale: 1.12, duration: 400, yoyo: true, repeat: -1 });
}

// =============================================================================
// COMBATE
// =============================================================================
function removeEntity(obj) {
  if (!obj || !obj.active) return;
  obj.scene.tweens.killTweensOf(obj);
  if (obj.shootTimer) obj.shootTimer.remove();
  if (obj.attackTimer) obj.attackTimer.remove();
  if (obj.activeTelegraphs) clearBossTelegraphs(obj);
  if (obj.chargeRing && obj.chargeRing.active) obj.chargeRing.destroy();
  if (obj.crackDecal && obj.crackDecal.active) obj.crackDecal.destroy();
  obj.destroy();
}

function damageEnemy(scene, enemy, dmg = 1) {
  if (!enemy || !enemy.active) return;
  enemy.hp = (enemy.hp ?? 1) - dmg;

  if (enemy.isBoss) {
    updateBossHUD();
    if (enemy.hp <= 0) {
      defeatBoss(scene, enemy);
    } else {
      sound.playShieldBlock();
      hitFx.explode(8, enemy.x - 16, enemy.y);
      enemy.setTint(0xffca28);
      scene.time.delayedCall(120, () => {
        if (enemy && enemy.active) enemy.clearTint();
      });
    }
    return;
  }

  if (enemy.hp <= 0) {
    killEnemy(enemy);
  } else {
    // Inimigo de armadura absorveu o primeiro impacto
    sound.playShieldBlock();
    hitFx.explode(7, enemy.x, enemy.y);
    enemy.x = Math.min(785, enemy.x + 22);
    enemy.setTint(0xffca28);
    scene.time.delayedCall(140, () => {
      if (enemy && enemy.active) enemy.clearTint();
    });
  }
}

function killEnemy(enemy) {
  if (!enemy || !enemy.active) return;
  sound.playEnemyHit();
  hitFx.explode(12, enemy.x, enemy.y);
  removeEntity(enemy);
}

function collectItem(scene, item) {
  buff = { type: item.lootType, timeLeft: BUFF_TIME[item.lootType], nextAttack: 0 };
  shieldSprite.setVisible(buff.type === 'shield');
  sound.playItemCollect();
  floatText(scene, item.x, item.y - 20, BUFF_NAMES[buff.type] + '!', '#ffca28');
  removeEntity(item);
}

function endBuff() {
  buff = { type: null, timeLeft: 0, nextAttack: 0 };
  shieldSprite.setVisible(false);
  if (playerBuffBar) playerBuffBar.clear();
}

function shootArrow() {
  sound.playBow();
  const arrow = playerArrows.create(player.x + 20, player.y + 2, 'arrow_player');
  arrow.body.setSize(18, 6);
  arrow.setVelocityX(750);
}

// Espada gira no punho do cavaleiro + rastro em meia-lua (sempre voltada para a frente)
function swingSword(scene) {
  sound.playSword();
  const slash = slashes.create(player.x + 30, player.y, 'slash_arc');
  slash.body.setSize(36, 60);
  slash.slashId = ++slashCounter;
  slash.blade = scene.add.image(player.x, player.y, 'sword_blade').setOrigin(0.5, 0.78);

  slash.on('destroy', () => {
    if (slash.blade && slash.blade.active) slash.blade.destroy();
  });

  scene.tweens.add({ targets: slash.blade, angle: { from: -60, to: 120 }, duration: 150, ease: 'Cubic.easeOut' });
  scene.tweens.add({
    targets: slash, alpha: { from: 1, to: 0 }, duration: 200,
    onComplete: () => slash.destroy()
  });
}

function playerHit(scene, hazard) {
  if (gameState !== 'PLAYING' || !hazard.active) return;

  if (buff.type === 'shield') {
    // 1. Flechas inimigas são rebatidas sem quebrar o escudo!
    if (enemyArrows.contains(hazard)) {
      sound.playShieldBlock();
      hitFx.explode(8, hazard.x, hazard.y);
      floatText(scene, player.x, player.y - 28, 'FLECHA REBATIDA!', '#7fe7ff');
      hazard.destroy();
      return;
    }

    // 2. Impacto corpo a corpo ou golpe do Boss quebra o escudo em uma Onda de Choque Sagrada!
    endBuff();
    sound.playShieldBlock();
    scene.cameras.main.flash(160, 120, 220, 255);
    scene.cameras.main.shake(180, 0.008);
    floatText(scene, player.x, player.y - 32, 'ONDA DE CHOQUE!', '#7fe7ff');

    const wave = scene.add.circle(player.x, player.y, 16, 0x7fe7ff, 0.35)
      .setStrokeStyle(3, 0xffffff).setDepth(1600);
    scene.tweens.add({
      targets: wave,
      radius: 135,
      alpha: 0,
      duration: 320,
      ease: 'Cubic.easeOut',
      onComplete: () => wave.destroy()
    });

    enemies.getChildren().slice().forEach(e => {
      if (e.active && Phaser.Math.Distance.Between(player.x, player.y, e.x, e.y) <= 145) {
        if (e.isBoss) {
          damageEnemy(scene, e, 4);
        } else {
          killEnemy(e);
        }
      }
    });
    enemyArrows.getChildren().slice().forEach(a => {
      if (a.active && Phaser.Math.Distance.Between(player.x, player.y, a.x, a.y) <= 135) {
        a.destroy();
      }
    });
    return;
  }
  gameOver(scene);
}

function gameOver(scene) {
  gameState = 'GAMEOVER';
  if (playerBuffBar) playerBuffBar.clear();
  if (enemyHpBars) enemyHpBars.clear();
  if (activeBoss) clearBossTelegraphs(activeBoss);
  if (pauseModal) {
    pauseModal.destroy();
    pauseModal = null;
  }
  sound.stopBGM();
  sound.playGameOver();
  if (hudContainer) hudContainer.setVisible(false);
  scene.physics.pause();
  scene.time.removeAllEvents();
  scene.tweens.pauseAll();
  [player, ...enemies.getChildren()].forEach(s => s.anims.pause());
  player.setTint(0xff5555);
  hitFx.explode(20, player.x, player.y);
  scene.cameras.main.shake(300, 0.012);
  scene.time.delayedCall(700, () => showInitials(scene)); // pausa curta para ver o que te acertou
}

// =============================================================================
// INTERFACE (HUD MODULAR, MENUS MEDIEVAIS, RECORDES E CONFIGURAÇÕES)
// =============================================================================
const textStyle = (color, size = 17, weight = 'bold') => ({
  fontSize: size + 'px',
  fontStyle: weight,
  color,
  fontFamily: 'Courier New, monospace'
});

function floatText(scene, x, y, msg, color) {
  const t = scene.add.text(x, y, msg, { ...textStyle(color, 15), stroke: '#000000', strokeThickness: 4 })
    .setOrigin(0.5).setDepth(1500);
  scene.tweens.add({ targets: t, y: y - 40, alpha: 0, duration: 900, onComplete: () => t.destroy() });
}

// -----------------------------------------------------------------------------
// NOVO HUD MEDIEVAL EM PIXEL ART (SEM EMOJIS, 4 MÓDULOS + BARRA DE VIDA DO BOSS)
// -----------------------------------------------------------------------------
function createHUD(scene) {
  hudContainer = scene.add.container(0, 0).setDepth(2000).setVisible(false);

  // 1. PAINEL DE GLÓRIA (Tempo Sobrevivido) — Canto Superior Esquerdo
  const gloryBg = scene.add.graphics();
  gloryBg.fillStyle(0x16120e, 0.94).fillRoundedRect(12, 10, 160, 48, 6);
  gloryBg.lineStyle(2, 0xc5a059).strokeRoundedRect(12, 10, 160, 48, 6);
  const hourglass = scene.add.image(30, 34, 'hud_hourglass');
  const gloryLabel = scene.add.text(50, 17, 'GLÓRIA', textStyle('#a89260', 10));
  hudGloryText = scene.add.text(50, 28, '0s', textStyle('#f5e6c8', 19));
  hudContainer.add([gloryBg, hourglass, gloryLabel, hudGloryText]);

  // 2. PAINEL DE RELÍQUIA / EQUIPAMENTO ATIVO — Centro Superior
  const itemBg = scene.add.graphics();
  itemBg.fillStyle(0x16120e, 0.94).fillRoundedRect(275, 10, 235, 48, 6);
  itemBg.lineStyle(2, 0xc5a059).strokeRoundedRect(275, 10, 235, 48, 6);

  const slotFrame = scene.add.graphics();
  slotFrame.fillStyle(0x221a14, 1).fillRoundedRect(283, 16, 36, 36, 4);
  slotFrame.lineStyle(1, 0x8d5524).strokeRoundedRect(283, 16, 36, 36, 4);

  hudItemIcon = scene.add.image(301, 34, 'item_bow').setVisible(false);
  hudItemName = scene.add.text(328, 16, 'SEM RELÍQUIA', textStyle('#7a7265', 12));
  hudItemBar = scene.add.graphics();
  // Centralizado na área direita interna do painel (entre o fim da barra em 442 e a borda em 506)
  hudItemTime = scene.add.text(474, 35.5, '', textStyle('#ffca28', 11)).setOrigin(0.5, 0.5);
  hudContainer.add([itemBg, slotFrame, hudItemIcon, hudItemName, hudItemBar, hudItemTime]);

  // 3. PAINEL DE RECORDE DO REINO — Canto Superior Direito
  const bestBg = scene.add.graphics();
  bestBg.fillStyle(0x16120e, 0.94).fillRoundedRect(525, 10, 185, 48, 6);
  bestBg.lineStyle(2, 0xc5a059).strokeRoundedRect(525, 10, 185, 48, 6);
  const crown = scene.add.image(547, 34, 'hud_crown');
  const bestLabel = scene.add.text(572, 17, 'RECORDE', textStyle('#a89260', 10));
  hudBestText = scene.add.text(572, 28, `${getBestScore()}s`, textStyle('#ffca28', 19));
  hudContainer.add([bestBg, crown, bestLabel, hudBestText]);

  // 4. BOTÃO DE SOM RÁPIDO — Extremo Superior Direito
  const soundBtnBg = scene.add.graphics();
  const drawSoundBtn = (hover = false) => {
    soundBtnBg.clear();
    soundBtnBg.fillStyle(hover ? 0x2e241c : 0x16120e, 0.94).fillRoundedRect(725, 10, 48, 48, 6);
    soundBtnBg.lineStyle(2, hover ? 0xffca28 : 0xc5a059).strokeRoundedRect(725, 10, 48, 48, 6);
  };
  drawSoundBtn(false);

  hudHornIcon = scene.add.image(749, 34, 'hud_horn', sound.isMuted() ? 1 : 0);
  const soundHitArea = scene.add.rectangle(749, 34, 48, 48, 0x000000, 0)
    .setInteractive({ useHandCursor: true });

  const toggleAudio = () => {
    sound.toggleMute();
    sound.playButtonClick();
    hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
    if (menuContainer && menuContainer.updateMenuHorn) menuContainer.updateMenuHorn();
  };

  soundHitArea.on('pointerover', () => drawSoundBtn(true));
  soundHitArea.on('pointerout', () => drawSoundBtn(false));
  soundHitArea.on('pointerdown', toggleAudio);

  scene.input.keyboard.on('keydown-M', () => {
    if (gameState === 'GAMEOVER') return; // evita mutar enquanto digita iniciais com M
    sound.toggleMute();
    if (hudHornIcon) hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
    if (pauseModal && pauseModal.updateAudio) pauseModal.updateAudio();
    if (menuContainer && menuContainer.updateMenuHorn) menuContainer.updateMenuHorn();
  });

  hudContainer.add([soundBtnBg, hudHornIcon, soundHitArea]);

  // 5. BARRA DE VIDA DO CHEFÃO (Oculta até os 60s da Boss Fight)
  bossHudContainer = scene.add.container(0, 0).setVisible(false);
  const bossBg = scene.add.graphics();
  bossBg.fillStyle(0x160d0b, 0.94).fillRoundedRect(236, 62, 328, 30, 5);
  bossBg.lineStyle(2, 0xd83a3a).strokeRoundedRect(236, 62, 328, 30, 5);
  const bossTitle = scene.add.text(252, 65, 'GOLEM ANCESTRAL DE PEDRA', textStyle('#ff8a80', 10));
  bossHpText = scene.add.text(548, 65, `${BOSS_MAX_HP}/${BOSS_MAX_HP}`, textStyle('#ffca28', 10)).setOrigin(1, 0);
  bossHpBar = scene.add.graphics();
  bossHudContainer.add([bossBg, bossTitle, bossHpBar, bossHpText]);
  hudContainer.add(bossHudContainer);
}

// Atualiza o slot e a barra de duração gráfica do item ativo
function updateItemHUD() {
  if (!buff.type) {
    hudItemIcon.setVisible(false);
    hudItemName.setText('SEM RELÍQUIA').setColor('#7a7265');
    hudItemTime.setText('');
    hudItemBar.clear();
    if (playerBuffBar) playerBuffBar.clear();
    return;
  }

  const texKey = buff.type === 'shield' ? 'shield_worn' : 'item_' + buff.type;
  hudItemIcon.setTexture(texKey).setVisible(true);

  const names = { bow: 'ARCO REAL', shield: 'ESCUDO DE AÇO', sword: 'ESPADA VORPAL' };
  hudItemName.setText(names[buff.type] || 'RELÍQUIA').setColor('#7fe7ff');

  const remaining = Math.max(0, buff.timeLeft);
  hudItemTime.setText(`${remaining.toFixed(1)}s`);

  const maxTime = BUFF_TIME[buff.type] || 6;
  const pct = Phaser.Math.Clamp(remaining / maxTime, 0, 1);
  const barW = 114;
  const barH = 7;
  const barX = 328;
  const barY = 32;

  hudItemBar.clear();
  hudItemBar.fillStyle(0x100e0b, 1).fillRect(barX, barY, barW, barH);
  hudItemBar.lineStyle(1, 0x4a3b2c).strokeRect(barX, barY, barW, barH);

  // Barra fica rubra nos 2 segundos finais
  const barColor = remaining <= 2 ? 0xd83a3a : (buff.type === 'shield' ? 0x26a69a : 0xf2c14e);
  hudItemBar.fillStyle(barColor, 1).fillRect(barX + 1, barY + 1, Math.max(0, (barW - 2) * pct), barH - 2);

  // Barrinha flutuante de duração sobre o cavaleiro (overhead buff bar)
  if (playerBuffBar && player && player.visible && (gameState === 'PLAYING' || gameState === 'PAUSED')) {
    playerBuffBar.clear();
    const pW = 32;
    const pH = 5;
    const pX = Math.round(player.x - pW / 2);
    const pY = Math.round(player.y - 25);

    // Contorno e fundo escuro
    playerBuffBar.fillStyle(0x0e0b08, 0.95).fillRect(pX - 1, pY - 1, pW + 2, pH + 2);
    playerBuffBar.fillStyle(0x221a14, 0.95).fillRect(pX, pY, pW, pH);

    // Cor por tipo com alerta vermelho em <= 1.8s
    const overheadColor = remaining <= 1.8 ? 0xff3030 : (
      buff.type === 'shield' ? 0x7fe7ff : (buff.type === 'bow' ? 0xffeb3b : 0xffffff)
    );
    const fillW = Math.max(0, Math.round(pW * pct));
    playerBuffBar.fillStyle(overheadColor, 1).fillRect(pX, pY, fillW, pH);
  }
}

// -----------------------------------------------------------------------------
// BOTÕES NOBRES MEDIEVAIS EM CARVALHO & OURO
// -----------------------------------------------------------------------------
function createButton(scene, x, y, label, onClick, w = 260, h = 46) {
  const btn = scene.add.rectangle(x, y, w, h, 0x6e3d1b).setStrokeStyle(2, 0xc5a059).setInteractive({ useHandCursor: true });
  const txt = scene.add.text(x, y, label, { ...textStyle('#ffffff', 15), fontFamily: 'Georgia, serif' }).setOrigin(0.5);

  btn.on('pointerover', () => {
    btn.setFillStyle(0x945324);
    btn.setStrokeStyle(2, 0xffeb3b);
    txt.setColor('#ffeb3b');
  });
  btn.on('pointerout', () => {
    btn.setFillStyle(0x6e3d1b);
    btn.setStrokeStyle(2, 0xc5a059);
    txt.setColor('#ffffff');
  });
  btn.once('pointerdown', () => {
    sound.playButtonClick();
    onClick();
  });
  return [btn, txt];
}

// -----------------------------------------------------------------------------
// FÁBRICA UNIFICADA DE JANELAS E MODAIS MEDIEVAIS
// -----------------------------------------------------------------------------
function createModal(scene, titleText, height, subtitleText = '', width = 520) {
  const left = (800 - width) / 2;
  const top = (600 - height) / 2;
  const overlay = scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.72);

  const frame = scene.add.graphics();
  frame.fillStyle(0x16120e, 0.97).fillRoundedRect(left, top, width, height, 14);
  frame.lineStyle(3, 0x8d5524).strokeRoundedRect(left, top, width, height, 14);
  frame.lineStyle(1.5, 0xc5a059).strokeRoundedRect(left + 4, top + 4, width - 8, height - 8, 11);

  // Rebites ornamentais nos 4 cantos
  const rOff = 14;
  [
    [left + rOff, top + rOff],
    [left + width - rOff, top + rOff],
    [left + rOff, top + height - rOff],
    [left + width - rOff, top + height - rOff]
  ].forEach(([rx, ry]) => {
    frame.fillStyle(0xc5a059, 1).fillCircle(rx, ry, 3.5);
    frame.fillStyle(0x3a2818, 1).fillCircle(rx, ry, 1.5);
  });

  const titleShadow = scene.add.text(402, top + 37, titleText, { ...textStyle('#080604', 24), fontFamily: 'Georgia, serif' }).setOrigin(0.5);
  const title = scene.add.text(400, top + 35, titleText, { ...textStyle('#ffca28', 24), fontFamily: 'Georgia, serif' }).setOrigin(0.5);

  const children = [overlay, frame, titleShadow, title];
  if (subtitleText) {
    const sub = scene.add.text(400, top + 65, subtitleText, textStyle('#c5a059', 12)).setOrigin(0.5);
    frame.lineStyle(1, 0xc5a059, 0.5).lineBetween(left + 60, top + 80, left + width - 60, top + 80);
    children.push(sub);
  }

  return scene.add.container(0, 0, children).setDepth(3000);
}

function restartScene(scene, autoStart = false) {
  if (pauseModal) {
    pauseModal.destroy();
    pauseModal = null;
  }
  if (menuContainer) {
    menuContainer.destroy();
    menuContainer = null;
  }
  sound.stopBGM();
  scene.physics.resume();
  scene.time.paused = false;
  scene.scene.restart({ autoStart });
}

// -----------------------------------------------------------------------------
// MENU PRINCIPAL DE TELA COMPLETA (CAPA DE JOGO 800x600)
// -----------------------------------------------------------------------------
function showMainMenu(scene) {
  if (menuContainer) menuContainer.destroy();
  sound.startMenuBGM();

  menuContainer = scene.add.container(0, 0).setDepth(3000);
  const art = scene.add.graphics();

  // 1. CÉU CREPUSCULAR DO REINO (Degradê em faixas de Pixel Art)
  const skyBands = [
    [0, 55, 0x090d1c],
    [55, 50, 0x121b36],
    [105, 45, 0x1f2247],
    [150, 45, 0x38234a],
    [195, 40, 0x5e2f3d],
    [235, 35, 0x8c492b],
    [270, 30, 0xb86b35]
  ];
  skyBands.forEach(([y, h, color]) => art.fillStyle(color, 1).fillRect(0, y, 800, h));

  // Estrelas e Constelação da Espada no céu
  const starCoords = [
    [55, 30], [115, 65], [180, 28], [260, 48], [340, 25], [440, 42], [510, 70],
    [690, 35], [750, 68], [85, 118], [155, 102], [295, 95], [480, 108], [735, 115]
  ];
  starCoords.forEach(([sx, sy], i) => {
    art.fillStyle(i % 3 === 0 ? 0xffeb3b : 0xffffff, 0.85).fillRect(sx, sy, i % 2 === 0 ? 3 : 2, i % 2 === 0 ? 3 : 2);
  });
  // Linhas de constelação estilo mapa astral
  art.lineStyle(1, 0x7fe7ff, 0.22);
  art.lineBetween(55, 30, 115, 65);
  art.lineBetween(115, 65, 180, 28);
  art.lineBetween(180, 28, 260, 48);

  // Lua Cheia Dourada atrás do Castelo Real
  art.fillStyle(0xffca28, 0.12).fillCircle(610, 145, 76);
  art.fillStyle(0xffca28, 0.24).fillCircle(610, 145, 54);
  art.fillStyle(0xfff3c4, 0.96).fillCircle(610, 145, 36);
  art.fillStyle(0xf2c14e, 0.45).fillCircle(622, 136, 8).fillCircle(598, 154, 11);

  // 2. CORDILHEIRA DE MONTANHAS & CASTELO DO REINO AO HORIZONTE
  // Montanhas distantes
  art.fillStyle(0x1b152b, 1);
  art.fillTriangle(-20, 285, 130, 155, 290, 285);
  art.fillTriangle(190, 285, 355, 170, 510, 285);
  art.fillTriangle(430, 285, 605, 140, 770, 285);
  art.fillTriangle(640, 285, 760, 180, 840, 285);

  // Face iluminada das montanhas
  art.fillStyle(0x2c2240, 1);
  art.fillTriangle(130, 155, 210, 285, 290, 285);
  art.fillTriangle(355, 170, 430, 285, 510, 285);

  // Silhueta Imperial do Castelo do Reino (no topo da montanha direita, x: 545..675)
  const cx = 555, cy = 148;
  art.fillStyle(0x120d1d, 1);
  art.fillRect(cx, cy + 32, 110, 65);          // muralha principal
  art.fillRect(cx - 12, cy + 16, 24, 80);      // torre oeste
  art.fillRect(cx + 98, cy + 16, 24, 80);      // torre leste
  art.fillRect(cx + 35, cy - 12, 40, 108);     // torre de menagem central
  art.fillRect(cx + 18, cy + 6, 18, 90);       // torre interna esquerda
  art.fillRect(cx + 74, cy + 6, 18, 90);       // torre interna direita

  // Telhados cônicos reais e ameias
  art.fillStyle(0x2f6fd6, 1);
  art.fillTriangle(cx - 16, cy + 16, cx, cy - 6, cx + 16, cy + 16);
  art.fillTriangle(cx + 94, cy + 16, cx + 110, cy - 6, cx + 126, cy + 16);
  art.fillTriangle(cx + 30, cy - 12, cx + 55, cy - 44, cx + 80, cy - 12);

  // Estandartes reais vermelhos e dourados no topo das torres
  art.lineStyle(2, 0xc5a059, 1);
  art.lineBetween(cx + 55, cy - 44, cx + 55, cy - 58);
  art.fillStyle(0xd83a3a, 1).fillTriangle(cx + 55, cy - 58, cx + 73, cy - 53, cx + 55, cy - 48);

  // Janelas iluminadas e portão do castelo
  art.fillStyle(0xffeb3b, 0.95);
  art.fillRect(cx + 51, cy - 2, 8, 14);
  art.fillRect(cx + 46, cy + 20, 6, 10);
  art.fillRect(cx + 58, cy + 20, 6, 10);
  art.fillRect(cx - 3, cy + 28, 6, 10);
  art.fillRect(cx + 107, cy + 28, 6, 10);
  // Portão em arco do castelo
  art.fillStyle(0x3a2414, 1).fillRect(cx + 45, cy + 58, 20, 32);
  art.fillStyle(0xffa726, 0.7).fillRect(cx + 49, cy + 64, 12, 24);

  // 3. COLINAS VERDES, FLORESTA E O CAMINHO REAL SINUOSO (Com Elementos de Mapa)
  art.fillStyle(0x16331a, 1).fillRect(0, 265, 800, 335);
  // Colina intermediária
  art.fillStyle(0x1f4724, 1);
  art.fillEllipse(210, 340, 560, 150);
  art.fillEllipse(620, 355, 520, 140);
  // Colina frontal
  art.fillStyle(0x2a5c2f, 1);
  art.fillEllipse(400, 495, 920, 270);

  // O Caminho Sinuoso saindo do Castelo até o Primeiro Plano
  const roadPolys = [
    // Trecho distante (saindo do portão do castelo)
    { y1: 242, y2: 285, x1L: 602, x1R: 618, x2L: 520, x2R: 552 },
    // Curva média pelas colinas
    { y1: 285, y2: 345, x1L: 520, x1R: 552, x2L: 370, x2R: 425 },
    // Curva chegando ao cavaleiro
    { y1: 345, y2: 430, x1L: 370, x1R: 425, x2L: 285, x2R: 380 },
    // Primeiro plano largo da estrada
    { y1: 430, y2: 600, x1L: 285, x1R: 380, x2L: 160, x2R: 470 }
  ];
  roadPolys.forEach(s => {
    art.fillStyle(0x6e5233, 1).fillPoints([
      { x: s.x1L - 5, y: s.y1 }, { x: s.x1R + 5, y: s.y1 },
      { x: s.x2R + 7, y: s.y2 }, { x: s.x2L - 7, y: s.y2 }
    ], true);
    art.fillStyle(0x9b7b4f, 1).fillPoints([
      { x: s.x1L, y: s.y1 }, { x: s.x1R, y: s.y1 },
      { x: s.x2R, y: s.y2 }, { x: s.x2L, y: s.y2 }
    ], true);
  });

  // Elementos de Mapa Cartográfico sobre o Caminho (trilha tracejada + marcos de jornada)
  const mapWaypoints = [
    [325, 515], [332, 465], [342, 415], [382, 368],
    [438, 332], [495, 304], [545, 276], [592, 252]
  ];
  mapWaypoints.forEach(([wx, wy], idx) => {
    art.fillStyle(0xf5e6c8, 0.75).fillCircle(wx, wy, 3);
    if (idx === 3 || idx === 6) {
      // Marco de Batalha no Caminho (estilo mapa de RPG)
      art.lineStyle(1.5, 0xffca28, 0.9).strokeCircle(wx, wy, 7);
      art.fillStyle(0xd83a3a, 0.9).fillCircle(wx, wy, 3.5);
    }
  });

  // Placa de Madeira na Encruzilhada ("REINO ⬆")
  art.fillStyle(0x4a2e16, 1).fillRect(438, 350, 5, 26);
  art.fillStyle(0x8d5524, 1).fillRect(422, 346, 36, 12);
  art.lineStyle(1, 0xc5a059, 0.8).strokeRect(422, 346, 36, 12);

  // Pedestal Rochoso Heróico no Primeiro Plano Esquerdo (onde está o Cavaleiro)
  art.fillStyle(0x1f2126, 1).fillEllipse(215, 455, 195, 56);
  art.fillStyle(0x373a42, 1).fillEllipse(215, 446, 180, 46);
  art.fillStyle(0x525763, 1).fillEllipse(215, 440, 155, 34);
  art.fillStyle(0x000000, 0.45).fillEllipse(215, 436, 86, 18); // sombra do herói

  // Sombra do Inimigo Derrotado e das Árvores
  art.fillStyle(0x000000, 0.38).fillEllipse(358, 472, 56, 14);
  art.fillStyle(0x000000, 0.35).fillEllipse(72, 430, 62, 14);
  art.fillStyle(0x000000, 0.35).fillEllipse(485, 315, 42, 10);

  menuContainer.add(art);

  // 4. ELEMENTOS VIVOS DO CENÁRIO (Árvores, Rochas Lisa/Musgo, Inimigo Derrotado e Cavaleiro)
  const treeFar = scene.add.image(485, 290, 'tree').setScale(0.75);
  const treeLeft = scene.add.image(68, 390, 'tree').setScale(1.25);
  const treeRight = scene.add.image(748, 360, 'tree').setScale(1.1);
  const rockMossy = scene.add.image(135, 462, 'rock', 1).setScale(1.25);
  const rockSmooth = scene.add.image(418, 492, 'rock', 0).setScale(1.1);
  const rockFar = scene.add.image(468, 368, 'rock', 1).setScale(0.85);

  // Inimigo Derrotado no Caminho (Guerreiro caído + flecha do Arco Real cravada)
  const defeatedEnemy = scene.add.image(356, 465, 'warrior', 0)
    .setAngle(84).setFlipX(true).setScale(1.25).setTint(0x9ea89e);
  const stuckArrow = scene.add.image(348, 452, 'arrow_player')
    .setAngle(52).setScale(1.15);
  const defeatedGoblin = scene.add.image(392, 444, 'goblin', 0)
    .setAngle(-78).setScale(1.05).setTint(0x889988);

  // O Cavaleiro Heróico em Destaque (com Espada Vorpal, Escudo de Aço e Arco Real)
  const heroSprite = scene.add.image(215, 378, 'knight_banner').setScale(2.15);
  scene.tweens.add({
    targets: heroSprite,
    y: 372,
    duration: 1300,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // Vitrine das 3 Relíquias Sagradas na base esquerda (Espada, Arco e Escudo)
  const relicsBox = scene.add.graphics();
  relicsBox.fillStyle(0x14100c, 0.88).fillRoundedRect(42, 492, 330, 54, 8);
  relicsBox.lineStyle(1.5, 0xc5a059, 0.9).strokeRoundedRect(42, 492, 330, 54, 8);

  const rBow = scene.add.image(76, 519, 'item_bow').setScale(0.95);
  const rBowTxt = scene.add.text(98, 519, 'ARCO', textStyle('#ffe082', 11)).setOrigin(0, 0.5);
  const rShield = scene.add.image(168, 519, 'item_shield').setScale(0.95);
  const rShieldTxt = scene.add.text(190, 519, 'ESCUDO', textStyle('#7fe7ff', 11)).setOrigin(0, 0.5);
  const rSword = scene.add.image(272, 519, 'item_sword').setScale(0.95);
  const rSwordTxt = scene.add.text(294, 519, 'ESPADA', textStyle('#ffffff', 11)).setOrigin(0, 0.5);

  // 5. BRASÃO DE TÍTULO NO TOPO E PAINEL DE COMANDOS À DIREITA
  const headerBanner = scene.add.graphics();
  headerBanner.fillStyle(0x14100c, 0.90).fillRoundedRect(105, 16, 590, 82, 10);
  headerBanner.lineStyle(2.5, 0x8d5524, 1).strokeRoundedRect(105, 16, 590, 82, 10);
  headerBanner.lineStyle(1.2, 0xc5a059, 0.9).strokeRoundedRect(110, 21, 580, 72, 8);

  const titleShadow = scene.add.text(402, 46, 'A JORNADA DO CAVALEIRO', {
    ...textStyle('#060403', 27), fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);
  const titleMain = scene.add.text(400, 44, 'A JORNADA DO CAVALEIRO', {
    ...textStyle('#ffca28', 27), fontFamily: 'Georgia, serif'
  }).setOrigin(0.5);
  const subtitleTxt = scene.add.text(400, 75, '★ CRÔNICAS DO REINO & SOBREVIVÊNCIA ★', textStyle('#e0c088', 11)).setOrigin(0.5);

  // Botão rápido de Som no canto superior direito da Capa
  const menuSoundBg = scene.add.graphics();
  const drawMenuSound = (hover = false) => {
    menuSoundBg.clear();
    menuSoundBg.fillStyle(hover ? 0x2e241c : 0x14100c, 0.92).fillRoundedRect(722, 22, 52, 52, 8);
    menuSoundBg.lineStyle(2, hover ? 0xffca28 : 0xc5a059).strokeRoundedRect(722, 22, 52, 52, 8);
  };
  drawMenuSound(false);
  const menuHorn = scene.add.image(748, 48, 'hud_horn', sound.isMuted() ? 1 : 0);
  const menuSoundHit = scene.add.rectangle(748, 48, 52, 52, 0x000000, 0).setInteractive({ useHandCursor: true });
  menuContainer.updateMenuHorn = () => {
    if (menuHorn && menuHorn.active) menuHorn.setFrame(sound.isMuted() ? 1 : 0);
  };
  menuSoundHit.on('pointerover', () => drawMenuSound(true));
  menuSoundHit.on('pointerout', () => drawMenuSound(false));
  menuSoundHit.on('pointerdown', () => {
    sound.toggleMute();
    sound.playButtonClick();
    if (!sound.isMuted()) sound.startMenuBGM();
    menuContainer.updateMenuHorn();
    if (hudHornIcon) hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
  });

  // Painel de Ações à Direita (Deixa a arte do Reino e do Cavaleiro livre!)
  const menuPanel = scene.add.graphics();
  menuPanel.fillStyle(0x14100c, 0.90).fillRoundedRect(442, 272, 326, 274, 12);
  menuPanel.lineStyle(2.5, 0x8d5524, 1).strokeRoundedRect(442, 272, 326, 274, 12);
  menuPanel.lineStyle(1.2, 0xc5a059, 0.85).strokeRoundedRect(447, 277, 316, 264, 9);

  const crownIcon = scene.add.image(525, 304, 'hud_crown').setScale(0.95);
  const bestBannerTxt = scene.add.text(545, 304, `RECORDE DO REINO: ${getBestScore()}s`, textStyle('#ffca28', 13)).setOrigin(0, 0.5);
  menuPanel.lineStyle(1, 0xc5a059, 0.4).lineBetween(468, 324, 742, 324);

  const clearMenuKeys = () => {
    scene.input.keyboard.off('keydown-SPACE', onKeyStart);
    scene.input.keyboard.off('keydown-ENTER', onKeyStart);
  };

  const launchGame = () => {
    clearMenuKeys();
    sound.ensureContext();
    menuContainer.destroy();
    menuContainer = null;
    startGameplay(scene);
  };

  const startBtn = createButton(scene, 605, 362, 'COMEÇAR O JOGO', launchGame, 276, 46);
  const recordsBtn = createButton(scene, 605, 420, 'RECORDES', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showRecordsMenu(scene);
  }, 276, 46);
  const settingsBtn = createButton(scene, 605, 478, 'CONFIGURAÇÕES', () => {
    clearMenuKeys();
    sound.ensureContext();
    sound.startMenuBGM();
    showSettingsMenu(scene);
  }, 276, 46);

  const startHint = scene.add.text(605, 522, '[ESPAÇO] ou [ENTER] para iniciar', textStyle('#c5a059', 11)).setOrigin(0.5);

  // Faixa de Rodapé Completa
  const footerBg = scene.add.rectangle(400, 578, 800, 32, 0x0c0907, 0.92);
  const footerLine = scene.add.graphics().lineStyle(1, 0x8d5524, 0.8).lineBetween(0, 562, 800, 562);
  const footerTxt = scene.add.text(400, 578, 'Mover: WASD ou Setas   |   Pausar: ESC   |   Alternar Áudio: M', textStyle('#d6c8aa', 11)).setOrigin(0.5);

  menuContainer.add([
    treeFar, rockFar,
    defeatedGoblin, defeatedEnemy, stuckArrow,
    treeLeft, treeRight, rockMossy, rockSmooth,
    heroSprite,
    relicsBox, rBow, rBowTxt, rShield, rShieldTxt, rSword, rSwordTxt,
    headerBanner, titleShadow, titleMain, subtitleTxt,
    menuSoundBg, menuHorn, menuSoundHit,
    menuPanel, crownIcon, bestBannerTxt,
    ...startBtn, ...recordsBtn, ...settingsBtn, startHint,
    footerBg, footerLine, footerTxt
  ]);

  function onKeyStart(e) {
    if (gameState !== 'MENU') return;
    if (e.code === 'Space' || e.code === 'Enter') {
      sound.playButtonClick();
      launchGame();
    }
  }
  scene.input.keyboard.once('keydown-SPACE', onKeyStart);
  scene.input.keyboard.once('keydown-ENTER', onKeyStart);
}

// -----------------------------------------------------------------------------
// TELA DE RECORDES (TÁBULA DOS CAMPEÕES)
// -----------------------------------------------------------------------------
function showRecordsMenu(scene) {
  if (menuContainer) menuContainer.destroy();
  menuContainer = createModal(scene, 'TÁBULA DOS CAMPEÕES', 520, 'Os maiores guerreiros imortalizados pelas eras', 520);

  const scores = getHighScores();
  const ranks = ['1º LUGAR', '2º LUGAR', '3º LUGAR', '4º LUGAR', '5º LUGAR'];
  const colors = ['#ffca28', '#e8e8e8', '#cd7f32', '#d6c8aa', '#a8987b'];

  scores.forEach((entry, i) => {
    const rowY = 175 + i * 50;
    const rowBg = scene.add.graphics();
    rowBg.fillStyle(i === 0 ? 0x2e2314 : 0x1d1611, 0.9).fillRoundedRect(170, rowY - 18, 460, 38, 4);
    rowBg.lineStyle(1, i === 0 ? 0xc5a059 : 0x4a3b2c).strokeRoundedRect(170, rowY - 18, 460, 38, 4);

    const rankTxt = scene.add.text(190, rowY, ranks[i], textStyle(colors[i], 12)).setOrigin(0, 0.5);
    const nameTxt = scene.add.text(370, rowY, entry.name, textStyle('#ffffff', 18)).setOrigin(0.5);
    const scoreTxt = scene.add.text(595, rowY, `${entry.score}s de glória`, textStyle(colors[i], 14)).setOrigin(1, 0.5);

    menuContainer.add([rowBg, rankTxt, nameTxt, scoreTxt]);
  });

  menuContainer.add(createButton(scene, 400, 485, 'VOLTAR AO MENU', () => showMainMenu(scene), 260, 44));
}

// -----------------------------------------------------------------------------
// TELA DE CONFIGURAÇÕES (ÁUDIO E PERGAMINHO DE COMBATE)
// -----------------------------------------------------------------------------
function showSettingsMenu(scene) {
  if (menuContainer) menuContainer.destroy();
  menuContainer = createModal(scene, 'CONFIGURAÇÕES DO REINO', 520, 'Ajustes sonoros e pergaminho de batalha', 520);

  // Seção 1: Áudio
  const audioBox = scene.add.graphics();
  audioBox.fillStyle(0x221a13, 0.9).fillRoundedRect(170, 132, 460, 82, 6);
  audioBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(170, 132, 460, 82, 6);

  const audioTitle = scene.add.text(190, 146, 'ÁUDIO & EFEITOS SONOROS', textStyle('#ffca28', 12));
  const audioHint = scene.add.text(190, 192, 'Atalho rápido: pressione a tecla M durante o jogo', textStyle('#a8987b', 11));

  const audioToggleBtn = scene.add.rectangle(510, 172, 180, 36, sound.isMuted() ? 0x8e1b1b : 0x247a46)
    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });
  const audioToggleTxt = scene.add.text(510, 172, sound.isMuted() ? 'ÁUDIO: MUTADO' : 'ÁUDIO: ATIVADO', textStyle('#ffffff', 13))
    .setOrigin(0.5);

  audioToggleBtn.on('pointerdown', () => {
    sound.toggleMute();
    sound.playButtonClick();
    audioToggleBtn.setFillStyle(sound.isMuted() ? 0x8e1b1b : 0x247a46);
    audioToggleTxt.setText(sound.isMuted() ? 'ÁUDIO: MUTADO' : 'ÁUDIO: ATIVADO');
    if (hudHornIcon) hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
  });

  // Seção 2: Pergaminho de Dicas
  const guideBox = scene.add.graphics();
  guideBox.fillStyle(0x1d1611, 0.9).fillRoundedRect(170, 226, 460, 215, 6);
  guideBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(170, 226, 460, 215, 6);

  const guideTitle = scene.add.text(400, 244, 'PERGAMINHO DE COMBATE', textStyle('#ffca28', 13)).setOrigin(0.5);
  const guideLines = [
    '• Árvores protegem contra todas as flechas (cobertura).',
    '• Guerreiros de Armadura exigem 2 flechas ou 1 golpe de espada.',
    '• O Escudo de Aço rebate flechas e explode em Onda de Choque.',
    '• A Espada Vorpal corta armaduras e projéteis à queima-roupa.',
    '• Elfos concentram energia mágica antes de disparar.',
    '• Pressione ESC a qualquer momento para pausar a partida.'
  ];
  const guideTexts = guideLines.map((txt, i) =>
    scene.add.text(190, 270 + i * 26, txt, { ...textStyle('#d6c8aa', 12, 'normal'), lineSpacing: 4 })
  );

  menuContainer.add([
    audioBox, audioTitle, audioHint, audioToggleBtn, audioToggleTxt,
    guideBox, guideTitle, ...guideTexts,
    ...createButton(scene, 400, 495, 'VOLTAR AO MENU', () => showMainMenu(scene), 260, 44)
  ]);
}

// -----------------------------------------------------------------------------
// SISTEMA DE PAUSA (ESC)
// -----------------------------------------------------------------------------
function handleEscPress(scene) {
  if (gameState === 'PLAYING') {
    pauseGame(scene);
  } else if (gameState === 'PAUSED') {
    resumeGame(scene);
  } else if (gameState === 'MENU' && menuContainer) {
    showMainMenu(scene);
  }
}

function pauseGame(scene) {
  if (gameState !== 'PLAYING') return;
  gameState = 'PAUSED';
  scene.physics.pause();
  scene.time.paused = true;
  scene.tweens.pauseAll();
  [player, ...enemies.getChildren()].forEach(s => {
    if (s && s.anims) s.anims.pause();
  });
  if (player && player.body) {
    player.setVelocity(0, 0);
  }
  sound.pauseBGM();
  sound.playButtonClick();
  showPauseModal(scene);
}

function resumeGame(scene) {
  if (gameState !== 'PAUSED') return;
  if (pauseModal) {
    pauseModal.destroy();
    pauseModal = null;
  }
  gameState = 'PLAYING';
  scene.physics.resume();
  scene.time.paused = false;
  scene.tweens.resumeAll();
  [player, ...enemies.getChildren()].forEach(s => {
    if (s && s.anims) s.anims.resume();
  });
  sound.resumeBGM();
  sound.playButtonClick();
}

function showPauseModal(scene) {
  if (pauseModal) pauseModal.destroy();

  const height = 430;
  const top = (600 - height) / 2;
  pauseModal = createModal(scene, 'JOGO PAUSADO', height, '★ JORNADA EM ESPERA ★', 480);

  // Status de sobrevivência e relíquia
  const statsBox = scene.add.graphics();
  statsBox.fillStyle(0x221a13, 0.9).fillRoundedRect(190, top + 92, 420, 62, 6);
  statsBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(190, top + 92, 420, 62, 6);

  const timeTxt = scene.add.text(210, top + 107, `TEMPO EM COMBATE: ${survivalTime}s`, textStyle('#ffca28', 13));
  const relicName = buff.type ? `${BUFF_NAMES[buff.type]} (${Math.max(0, buff.timeLeft).toFixed(1)}s)` : 'Nenhuma';
  const relicColor = buff.type ? '#7fe7ff' : '#8c8272';
  const relicTxt = scene.add.text(210, top + 130, `RELÍQUIA ATIVA: ${relicName}`, textStyle(relicColor, 13));

  const continueBtn = createButton(scene, 400, top + 182, 'CONTINUAR JORNADA [ESC]', () => resumeGame(scene), 280, 40);

  const audioBtn = scene.add.rectangle(400, top + 232, 280, 40, sound.isMuted() ? 0x8e1b1b : 0x247a46)
    .setStrokeStyle(1.5, 0xc5a059).setInteractive({ useHandCursor: true });
  const audioTxt = scene.add.text(400, top + 232, sound.isMuted() ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]', textStyle('#ffffff', 13))
    .setOrigin(0.5);

  const updateAudioUI = () => {
    audioBtn.setFillStyle(sound.isMuted() ? 0x8e1b1b : 0x247a46);
    audioTxt.setText(sound.isMuted() ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]');
    if (hudHornIcon) hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
  };

  audioBtn.on('pointerdown', () => {
    sound.toggleMute();
    sound.playButtonClick();
    updateAudioUI();
  });

  pauseModal.updateAudio = updateAudioUI;

  const restartBtn = createButton(scene, 400, top + 282, 'REINICIAR MISSÃO', () => restartScene(scene, true), 280, 40);
  const menuBtn = createButton(scene, 400, top + 332, 'MENU PRINCIPAL', () => restartScene(scene, false), 280, 40);
  const footerHint = scene.add.text(400, top + 390, 'Pressione ESC para retornar à aventura', textStyle('#a8987b', 11)).setOrigin(0.5);

  pauseModal.add([
    statsBox, timeTxt, relicTxt,
    ...continueBtn,
    audioBtn, audioTxt,
    ...restartBtn,
    ...menuBtn,
    footerHint
  ]);
}

// -----------------------------------------------------------------------------
// GAME OVER (INICIAIS E REGISTRO)
// -----------------------------------------------------------------------------
function showInitials(scene) {
  let name = '', done = false;
  const modal = createModal(scene, 'O CAVALEIRO TOMBOU', 430, '', 480);
  const info = scene.add.text(400, 175, `Tempo de bravura em combate: ${survivalTime}s\n\nDigite suas 3 iniciais de honra:`,
    { ...textStyle('#e8dcbe', 15), align: 'center', lineSpacing: 5 }).setOrigin(0.5);

  const inputBg = scene.add.graphics();
  inputBg.fillStyle(0x0e0b08, 0.95).fillRoundedRect(260, 220, 280, 56, 6);
  inputBg.lineStyle(2, 0xc5a059).strokeRoundedRect(260, 220, 280, 56, 6);
  inputBg.lineStyle(1, 0x4a3b2c).strokeRoundedRect(263, 223, 274, 50, 4);

  const placeholder = scene.add.text(400, 248, 'EX: ART', {
    ...textStyle('#736148', 24),
    fontStyle: 'bold',
    fontFamily: 'Courier New, monospace'
  }).setOrigin(0.5);

  const display = scene.add.text(400, 248, '', {
    ...textStyle('#ffca28', 30),
    fontStyle: 'bold',
    fontFamily: 'Courier New, monospace'
  }).setOrigin(0.5);

  const cursor = scene.add.text(465, 248, '|', { ...textStyle('#ffca28', 26) }).setOrigin(0.5);
  const cursorTween = scene.tweens.add({
    targets: cursor,
    alpha: { from: 1, to: 0 },
    duration: 500,
    yoyo: true,
    repeat: -1
  });

  const inputHint = scene.add.text(400, 290, '⌨️ Digite 3 letras no teclado', textStyle('#a8987b', 12)).setOrigin(0.5);

  const updateDisplay = () => {
    if (name.length === 0) {
      placeholder.setVisible(true);
      display.setText('');
      cursor.setVisible(true).setX(465);
    } else {
      placeholder.setVisible(false);
      display.setText(name.padEnd(3, '_').split('').join(' '));
      cursor.setVisible(name.length < 3).setX(400 + (name.length - 1) * 22 + 16);
    }
  };
  updateDisplay();

  const onKey = (e) => {
    if (e.key === 'Backspace') {
      name = name.slice(0, -1);
      sound.playButtonClick();
    } else if (e.key === 'Enter') {
      return submit();
    } else if (/^[a-zA-Z]$/.test(e.key) && name.length < 3) {
      name += e.key.toUpperCase();
      sound.playButtonClick();
    }
    updateDisplay();
  };

  const submit = () => {
    if (done) return;
    done = true;
    sound.playButtonClick();
    cursorTween.stop();
    scene.input.keyboard.off('keydown', onKey);
    modal.destroy();
    const finalName = name.padEnd(3, 'A');
    showLeaderboard(scene, saveHighScore(finalName, survivalTime), finalName);
  };

  modal.add([
    info, inputBg, placeholder, display, cursor, inputHint,
    ...createButton(scene, 400, 350, 'CONFIRMAR HONRA', submit, 260, 46)
  ]);
  scene.input.keyboard.on('keydown', onKey);
}

function showLeaderboard(scene, topScores, currentName) {
  const modal = createModal(scene, 'CAMPEÕES DO REINO', 470, '', 480);
  let marked = false;

  topScores.forEach((entry, i) => {
    const isMine = !marked && entry.name === currentName && entry.score === survivalTime;
    if (isMine) marked = true;
    const rankLabel = ['1º', '2º', '3º', '4º', '5º'][i];
    modal.add(scene.add.text(400, 160 + i * 40, `${rankLabel}   ${entry.name}   —   ${entry.score}s de glória`,
      { ...textStyle(isMine ? '#ffca28' : '#e8dcbe', 17), fontStyle: isMine ? 'bold' : 'normal' }).setOrigin(0.5));
  });

  let restarting = false;
  const finishAndRestart = (autoStart) => {
    if (restarting) return;
    restarting = true;
    scene.input.keyboard.off('keydown-SPACE', onQuickRestart);
    scene.input.keyboard.off('keydown-ENTER', onQuickRestart);
    modal.destroy();
    restartScene(scene, autoStart);
  };

  const onQuickRestart = () => {
    sound.playButtonClick();
    finishAndRestart(true);
  };

  modal.add(createButton(scene, 285, 420, 'NOVA JORNADA', () => finishAndRestart(true), 200, 44));
  modal.add(createButton(scene, 515, 420, 'MENU INICIAL', () => finishAndRestart(false), 200, 44));

  scene.time.delayedCall(200, () => {
    if (!restarting) {
      scene.input.keyboard.once('keydown-SPACE', onQuickRestart);
      scene.input.keyboard.once('keydown-ENTER', onQuickRestart);
    }
  });
}