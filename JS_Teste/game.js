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
  goblin:  { hp: 1, speed: 1.15, w: 16, h: 20 },
  warrior: { hp: 2, speed: 0.88, w: 20, h: 26 },
  elf:     { hp: 1, speed: 0.85, w: 16, h: 24 }
};
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
let enemies, trees, items, playerArrows, enemyArrows, slashes;
let hudContainer, hudGloryText, hudBestText;
let hudItemIcon, hudItemName, hudItemTime, hudItemBar, hudHornIcon;
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

  // --- TRILHA SONORA (BGM) ---
  startBGM() {
    if (this.bgmPlaying) return;
    if (!this.ensureContext()) return;
    this.bgmPlaying = true;
    this.currentStep = 0;
    this.nextStepTime = this.ctx.currentTime + 0.05;
    this.scheduleBGM();
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
      this.bgmGain.gain.setValueAtTime(0.14, this.ctx.currentTime);
    }
  }

  scheduleBGM() {
    if (!this.bgmPlaying || !this.ctx) return;
    if (this.nextStepTime < this.ctx.currentTime) {
      this.nextStepTime = this.ctx.currentTime + 0.05;
    }
    const lookahead = 0.25;
    const stepDur = 0.23; // ritmo de marcha heróica (~130 BPM)

    while (this.nextStepTime < this.ctx.currentTime + lookahead) {
      this.playBGMStep(this.currentStep, this.nextStepTime, stepDur);
      this.nextStepTime += stepDur;
      this.currentStep = (this.currentStep + 1) % 32;
    }

    this.bgmTimer = setTimeout(() => this.scheduleBGM(), 50);
  }

  playBGMStep(step, time, dur) {
    if (this.muted) return;

    // 1. Melodia (onda triangular aveludada com filtro retrô)
    const note = BGM_MELODY[step];
    if (note > 0) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note, time);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, time);
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.32, time + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur * 0.9);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.bgmGain);
      osc.start(time);
      osc.stop(time + dur * 0.95);
    }

    // 2. Baixo pulsante (sawtooth com filtro passa-baixas quente)
    const bass = BGM_BASS[step];
    if (bass > 0) {
      const bOsc = this.ctx.createOscillator();
      const bGain = this.ctx.createGain();
      const bFilter = this.ctx.createBiquadFilter();
      bOsc.type = 'sawtooth';
      bOsc.frequency.setValueAtTime(bass, time);
      bFilter.type = 'lowpass';
      bFilter.frequency.setValueAtTime(400, time);
      bGain.gain.setValueAtTime(0.001, time);
      bGain.gain.linearRampToValueAtTime(0.28, time + 0.01);
      bGain.gain.exponentialRampToValueAtTime(0.001, time + dur * 0.85);
      bOsc.connect(bFilter);
      bFilter.connect(bGain);
      bGain.connect(this.bgmGain);
      bOsc.start(time);
      bOsc.stop(time + dur * 0.9);
    }

    // 3. Percussão retrô (bumbo nos tempos fortes, caixa nos contratempos)
    if (step % 4 === 0) {
      const kick = this.ctx.createOscillator();
      const kGain = this.ctx.createGain();
      kick.type = 'sine';
      kick.frequency.setValueAtTime(110, time);
      kick.frequency.exponentialRampToValueAtTime(30, time + 0.07);
      kGain.gain.setValueAtTime(0.3, time);
      kGain.gain.exponentialRampToValueAtTime(0.001, time + 0.07);
      kick.connect(kGain);
      kGain.connect(this.bgmGain);
      kick.start(time);
      kick.stop(time + 0.07);
    } else if (step % 4 === 2) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer();
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, time);
      filter.Q.setValueAtTime(1.8, time);
      const sGain = this.ctx.createGain();
      sGain.gain.setValueAtTime(0.16, time);
      sGain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
      noise.connect(filter);
      filter.connect(sGain);
      sGain.connect(this.bgmGain);
      noise.start(time);
      noise.stop(time + 0.06);
    }
  }

  // --- EFEITOS SONOROS (SFX) ---

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

function drawKnightBanner(r) {
  r(C.red, 10, 1, 5, 2); r(C.red, 9, 2, 6, 2); r(C.darkRed, 14, 3, 3, 2);
  r(C.steel, 9, 4, 7, 6); r(C.steelLight, 10, 4, 3, 2);
  r(C.steelDark, 9, 9, 7, 1);
  r(C.outline, 11, 7, 4, 1); r(C.outline, 12, 8, 2, 2);
  r(C.darkRed, 5, 10, 4, 14); r(C.red, 6, 12, 3, 10);
  r(C.steel, 6, 10, 4, 3); r(C.steelLight, 7, 10, 2, 1);
  r(C.steel, 15, 10, 4, 3); r(C.steelLight, 16, 10, 2, 1);
  r(C.steel, 9, 10, 7, 8);
  r(C.blue, 10, 10, 5, 8);
  r(C.gold, 12, 11, 1, 6); r(C.gold, 11, 13, 3, 1);
  r(C.woodDark, 9, 17, 7, 2); r(C.gold, 12, 17, 1, 2);
  r(C.steelDark, 6, 13, 3, 4); r(C.steel, 6, 17, 3, 2);
  r(C.steelDark, 16, 13, 3, 4); r(C.steel, 16, 17, 3, 2);
  r(C.steelLight, 19, 4, 2, 17); r(C.steel, 20, 4, 1, 17);
  r(C.gold, 17, 10, 5, 2);
  r(C.woodDark, 19, 8, 2, 2);
  r(C.gold, 19, 7, 2, 1);
  r(C.steelDark, 9, 19, 3, 6); r(C.steelLight, 9, 20, 1, 3);
  r(C.steelDark, 13, 19, 3, 6); r(C.steelLight, 13, 20, 1, 3);
  r(C.woodDark, 8, 24, 4, 2); r(C.woodDark, 13, 24, 4, 2);
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
  makeSheet(this, 'tree', 48, 64, 1, drawTree);
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

  // Limpa todos os listeners de teclado ao encerrar/reiniciar a cena (evita duplicação)
  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
    scene.input.keyboard.removeAllListeners();
  });

  // Animações de caminhada (2 quadros) — criadas uma única vez
  const fps = { knight: 10, goblin: 12, warrior: 6, elf: 8 };
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

  // Grupos físicos
  enemies = scene.physics.add.group();
  trees = scene.physics.add.group({ immovable: true });
  items = scene.physics.add.group();
  playerArrows = scene.physics.add.group();
  enemyArrows = scene.physics.add.group();
  slashes = scene.physics.add.group();

  // Árvores iniciais espalhadas
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

  // Colisões do jogador (separação customizada nas árvores impede empurrar/carregar árvores)
  scene.physics.add.overlap(player, trees, (p, t) => separatePlayerFromTree(p, t));
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

  // Árvores servem de cobertura: bloqueiam flechas (som só quando visível na tela)
  const hitTree = (arrow, tree) => {
    if (!arrow.active) return;
    if (arrow.x > 0 && arrow.x < 800 && tree.x < 810) {
      sound.playWoodHit();
      hitFx.explode(4, arrow.x, arrow.y);
    }
    arrow.destroy();
  };
  scene.physics.add.overlap(playerArrows, trees, hitTree);
  scene.physics.add.overlap(enemyArrows, trees, hitTree);

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
  trees.setVelocityX(-scrollSpeed);
}

function updateGameplay(scene, time, dt) {
  // 1. Mundo rolando: chão, estrada e árvores andam JUNTOS (nada desliza)
  const worldSpeed = enemySpeed * 0.6;
  ground.tilePositionX += worldSpeed * dt;
  road.tilePositionX += worldSpeed * dt;
  forestTop.tilePositionX += worldSpeed * 0.9 * dt;    // fundo: um pouco mais lento
  forestBottom.tilePositionX += worldSpeed * 1.3 * dt; // frente: mais rápido (parallax)
  trees.setVelocityX(-worldSpeed);
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

  // 3. Inimigos balançando enquanto andam
  enemies.getChildren().forEach(e => e.setAngle(Math.sin(time * 0.015 + e.phase) * 5));

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

  // 5. Limpeza do que saiu da tela (.slice() evita pular itens ao destruir)
  const cull = (group, isOut) => group.getChildren().slice().forEach(s => { if (isOut(s)) removeEntity(s); });
  cull(enemies, s => s.x < -60);
  cull(trees, s => s.x < -60);
  cull(items, s => s.x < -60);
  cull(playerArrows, s => s.x < 0 || s.x > 800);
  cull(enemyArrows, s => s.x < -40 || s.y < 0 || s.y > 620);
}

// Impede o jogador de atravessar o tronco E impede que a árvore seja movida/carregada
function separatePlayerFromTree(p, t) {
  if (!p.active || !t.active) return;
  if (t.lockedY !== undefined) t.y = t.lockedY;
  t.body.velocity.y = 0;

  const pb = p.body, tb = t.body;
  const ox = Math.min(pb.right, tb.right) - Math.max(pb.left, tb.left);
  const oy = Math.min(pb.bottom, tb.bottom) - Math.max(pb.top, tb.top);
  if (ox <= 0 || oy <= 0) return;

  // Se o jogador ficar prensado entre o limite esquerdo da tela e a árvore,
  // desliza o cavaleiro verticalmente para contornar o tronco sem nunca carregar a árvore
  if (pb.left <= 16 && pb.center.x <= tb.center.x) {
    const slideDir = pb.center.y < tb.center.y ? -1 : 1;
    p.y = Phaser.Math.Clamp(p.y + slideDir * (oy + 2), 106, 539);
  } else if (ox < oy) {
    p.x = Phaser.Math.Clamp(p.x + (pb.center.x < tb.center.x ? -ox : ox), 8, 792);
  } else {
    p.y = Phaser.Math.Clamp(p.y + (pb.center.y < tb.center.y ? -oy : oy), 106, 539);
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
    shadows.fillEllipse(s.x, feet - 2, s.displayWidth * 0.7, 8);
  };

  trees.getChildren().forEach(t => {
    if (t.lockedY !== undefined) t.y = t.lockedY;
    shadeEntity(t);
  });

  if (gameState === 'PLAYING' || gameState === 'PAUSED') {
    shadeEntity(player);
    items.getChildren().forEach(shadeEntity);
    enemies.getChildren().forEach(e => {
      shadeEntity(e);
      if (e.chargeRing && e.chargeRing.active) {
        e.chargeRing.setPosition(e.x - 12, e.y).setDepth(e.depth + 2);
      }
      // Desenha barra de vida/armadura para inimigos com mais de 1 HP
      if (e.active && e.maxHp > 1) {
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
// SPAWNS
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
  sound.startBGM();

  const every = (delay, fn) => scene.time.addEvent({ delay, loop: true, callback: () => gameState === 'PLAYING' && fn() });
  every(1000, () => {
    survivalTime++;
    if (hudGloryText) hudGloryText.setText(`${survivalTime}s`);
    if (survivalTime > getBestScore() && hudBestText) {
      hudBestText.setText(`${survivalTime}s`);
    }
  });
  // Progressão balanceada com teto de velocidade e limite mínimo de spawn
  every(4000, () => {
    enemySpeed = Math.min(MAX_ENEMY_SPEED, enemySpeed + 14);
    spawnDelay = Math.max(MIN_SPAWN_DELAY, spawnDelay - 55);
    enemies.getChildren().forEach(e => {
      if (e.active && e.enemyType) e.setVelocityX(-enemySpeed * ENEMIES[e.enemyType].speed);
    });
  });
  every(5000, () => spawnItem(scene));
  every(900, () => spawnTree());

  const nextEnemy = () => {
    if (gameState !== 'PLAYING') return;
    spawnEnemy(scene);
    scene.time.delayedCall(spawnDelay, nextEnemy);
  };
  nextEnemy();
}

function spawnEnemy(scene) {
  const roll = Math.random();
  const type = roll < 0.45 ? 'goblin' : roll < 0.75 ? 'warrior' : 'elf';
  const cfg = ENEMIES[type];

  // Evita nascer exatamente em cima de outro inimigo recém-gerado
  let y = Phaser.Math.Between(130, 520);
  for (let i = 0; i < 5; i++) {
    const candidate = Phaser.Math.Between(130, 520);
    const stacked = enemies.getChildren().some(e => e.x > 770 && Math.abs(e.y - candidate) < 34);
    if (!stacked) { y = candidate; break; }
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

// Árvores nascem fora da estrada e sem encostar umas nas outras
function spawnTree(x = 880) {
  for (let i = 0; i < 6; i++) {
    const y = Phaser.Math.Between(150, 510);
    const onRoad = y > 255 && y < 365;
    const crowded = trees.getChildren().some(t => Math.abs(t.x - x) < 110 && Math.abs(t.y - y) < 100);
    if (onRoad || crowded) continue;
    const tree = trees.create(x, y, 'tree');
    tree.setImmovable(true);
    tree.body.pushable = false;
    tree.lockedY = y;
    tree.body.setSize(12, 14).setOffset(18, 46); // colisão firme no tronco
    return;
  }
}

// Item flutua e pulsa para chamar atenção (evita nascer preso em tronco de árvore)
function spawnItem(scene) {
  const type = Phaser.Utils.Array.GetRandom(['bow', 'shield', 'sword']);
  let y = Phaser.Math.Between(140, 510);
  for (let i = 0; i < 6; i++) {
    const candidate = Phaser.Math.Between(140, 510);
    const nearTree = trees.getChildren().some(t => Math.abs(t.x - 860) < 95 && Math.abs((t.y + 20) - candidate) < 48);
    if (!nearTree) { y = candidate; break; }
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
  if (obj.chargeRing && obj.chargeRing.active) obj.chargeRing.destroy();
  obj.destroy();
}

function damageEnemy(scene, enemy, dmg = 1) {
  if (!enemy || !enemy.active) return;
  enemy.hp = (enemy.hp ?? 1) - dmg;
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

    // 2. Impacto corpo a corpo quebra o escudo em uma Onda de Choque Sagrada!
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
      if (e.active && Phaser.Math.Distance.Between(player.x, player.y, e.x, e.y) <= 135) {
        killEnemy(e);
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
// NOVO HUD MEDIEVAL EM PIXEL ART (SEM EMOJIS, 4 MÓDULOS SEPARADOS)
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
  hudItemTime = scene.add.text(485, 33, '', textStyle('#ffca28', 11)).setOrigin(0, 0.5);
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
  };

  soundHitArea.on('pointerover', () => drawSoundBtn(true));
  soundHitArea.on('pointerout', () => drawSoundBtn(false));
  soundHitArea.on('pointerdown', toggleAudio);

  scene.input.keyboard.on('keydown-M', () => {
    if (gameState === 'GAMEOVER') return; // evita mutar enquanto digita iniciais com M
    sound.toggleMute();
    if (hudHornIcon) hudHornIcon.setFrame(sound.isMuted() ? 1 : 0);
    if (pauseModal && pauseModal.updateAudio) pauseModal.updateAudio();
  });

  hudContainer.add([soundBtnBg, hudHornIcon, soundHitArea]);
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
  const barW = 92;
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
// MENU PRINCIPAL (TELA INICIAL COM CAVALEIRO HERÓICO)
// -----------------------------------------------------------------------------
function showMainMenu(scene) {
  if (menuContainer) menuContainer.destroy();
  menuContainer = createModal(scene, 'A JORNADA DO CAVALEIRO', 520, '★ CRÔNICAS DE SOBREVIVÊNCIA ★', 520);

  // Sombra e ilustração do Cavaleiro Heróico com respiração animada
  const pedShadow = scene.add.graphics().fillStyle(0x000000, 0.4).fillEllipse(400, 240, 64, 14);
  const heroBanner = scene.add.image(400, 182, 'knight_banner').setScale(1.4);
  scene.tweens.add({
    targets: heroBanner,
    y: 178,
    duration: 1200,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

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

  const startBtn = createButton(scene, 400, 285, 'COMEÇAR O JOGO', launchGame, 280, 46);
  const recordsBtn = createButton(scene, 400, 345, 'RECORDES', () => {
    clearMenuKeys();
    sound.ensureContext();
    showRecordsMenu(scene);
  }, 280, 46);
  const settingsBtn = createButton(scene, 400, 405, 'CONFIGURAÇÕES', () => {
    clearMenuKeys();
    sound.ensureContext();
    showSettingsMenu(scene);
  }, 280, 46);

  const hint1 = scene.add.text(400, 480, 'Mover: WASD ou Setas   |   Pausa: ESC   |   Áudio: M', textStyle('#a8987b', 11)).setOrigin(0.5);
  const hint2 = scene.add.text(400, 508, 'Pressione ESPAÇO ou ENTER para iniciar', textStyle('#c5a059', 11)).setOrigin(0.5);

  menuContainer.add([pedShadow, heroBanner, ...startBtn, ...recordsBtn, ...settingsBtn, hint1, hint2]);

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