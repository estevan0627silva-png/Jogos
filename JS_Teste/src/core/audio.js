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

const XP_SCALE = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51];

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

    this.xpComboIndex = 0;
    this.lastXpCollectTime = 0;

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

    this.xpComboIndex = 0;
    this.lastXpCollectTime = 0;
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

  // Disparo / Labareda do Cajado de Fogo ou despertar ardente dos olhos do Golem
  playFireStaff() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(320, now + 0.22);
    filter.Q.setValueAtTime(3, now);
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.42, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(this.sfxGain);
    noise.start(now);
    noise.stop(now + 0.22);

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(65, now + 0.2);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Sussurro arcano suave e etéreo (Intangibilidade / Mist Form do Mago Sombrio)
  playArcaneMist() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;

    // Camada tonal: onda senoidal mística descendente (440Hz -> 180Hz)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.35);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.35);

    // Camada de névoa: ruído suave filtrado em passa-banda (sussurro de vento místico)
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.getNoiseBuffer();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + 0.35);
    filter.Q.setValueAtTime(2.2, now);
    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.001, now);
    nGain.gain.linearRampToValueAtTime(0.18, now + 0.05);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(this.sfxGain);
    noise.start(now);
    noise.stop(now + 0.35);
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

  // Tilintar cristalino de moeda (Si5 -> Mi6)
  playCoin() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    [987.77, 1318.51].forEach((freq, i) => {
      const t = now + i * 0.055;
      const dur = i === 0 ? 0.06 : 0.18;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.24, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);
    });
  }

  // Coleta de Orbe de XP (cristal místico suave)
  playXpOrb() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const nowMs = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    if (nowMs - this.lastXpCollectTime < 450) {
      this.xpComboIndex = (this.xpComboIndex + 1) % XP_SCALE.length;
    } else {
      this.xpComboIndex = 0;
    }
    this.lastXpCollectTime = nowMs;
    const baseFreq = XP_SCALE[this.xpComboIndex];
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.25, now + 0.07);
    gain.gain.setValueAtTime(0.20, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Fanfarra de Level Up (harpa ascendente em Ré Maior / Lá Maior)
  playLevelUp() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const notes = [587.33, 739.99, 880.00, 1174.66]; // Ré5, Fá#5, Lá5, Ré6
    notes.forEach((freq, i) => {
      const t = now + i * 0.06;
      const dur = i === notes.length - 1 ? 0.28 : 0.14;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.30, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);
    });
  }

  // Trombeta Real de Conquista Desbloqueada (Achievement)
  playAchievement() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // Dó5, Mi5, Sol5, Dó6
    notes.forEach((freq, i) => {
      const t = now + i * 0.075;
      const dur = i === notes.length - 1 ? 0.36 : 0.14;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);
    });
  }

  // Impacto de dano quando o Cavaleiro perde 1 Coração (mas ainda sobrevive!)
  playPlayerHurt() {
    if (this.muted || !this.ensureContext()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(95, now + 0.18);
    gain.gain.setValueAtTime(0.32, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.18);
  }
}

const sound = new SoundSystem();

// =============================================================================
