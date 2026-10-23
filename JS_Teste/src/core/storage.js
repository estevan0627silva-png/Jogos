// GERENCIADOR DE PERSISTÊNCIA & UPGRADES (StorageManager / Facade Pattern)
// Encapsula acesso ao localStorage, validações e dados salvos de forma centralizada.
// =============================================================================
const StorageManager = {
  _mem: {},

  safeGet(key) {
    try {
      if (typeof localStorage !== 'undefined') {
        const val = localStorage.getItem(key);
        if (val !== null && val !== undefined) return val;
      }
    } catch (e) {}
    return this._mem[key] !== undefined ? this._mem[key] : null;
  },

  safeSet(key, val) {
    this._mem[key] = String(val);
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, String(val));
      }
    } catch (e) {}
  },
  getHighScores() {
    const defaults = [{ name: 'ART', score: 40 }, { name: 'LAN', score: 28 }, { name: 'GWE', score: 18 }];
    try {
      const data = this.safeGet(STORAGE_KEY);
      return data ? JSON.parse(data) : defaults;
    } catch {
      return defaults;
    }
  },

  saveHighScore(name, score) {
    const scores = this.getHighScores();
    scores.push({ name: name.toUpperCase().slice(0, 3) || '???', score });
    scores.sort((a, b) => b.score - a.score);
    const topScores = scores.slice(0, 5);
    try {
      this.safeSet(STORAGE_KEY, JSON.stringify(topScores));
    } catch {}
    return topScores;
  },

  getBestScore() {
    return this.getHighScores()[0]?.score ?? 0;
  },

  getGold() {
    try {
      const raw = this.safeGet(STORAGE_GOLD_KEY);
      return raw ? Math.max(0, parseInt(raw, 10) || 0) : 0;
    } catch {
      return 0;
    }
  },

  setGold(total) {
    const val = Math.max(0, Math.floor(total));
    try {
      this.safeSet(STORAGE_GOLD_KEY, String(val));
    } catch {}
    if (hudGoldText && hudGoldText.active) {
      hudGoldText.setText(`${val}`);
    }
    return val;
  },

  addGold(amount) {
    const current = this.getGold();
    return this.setGold(current + amount);
  },

  consolidateSilverToGold() {
    const earnedGold = Math.floor(runSilver / 3);
    const savedSilver = runSilver;
    runGold = earnedGold;
    this.addGold(earnedGold);
    lastRunSummary = {
      survivalTime,
      silverCollected: savedSilver,
      runSilver: savedSilver,
      earnedGold,
      goldFromSilver: earnedGold,
      totalGoldEarned: earnedGold,
      totalGold: this.getGold(),
      newTotalGold: this.getGold()
    };
    runSilver = 0;
    return lastRunSummary;
  },

  getUpgrades() {
    const defaults = {
      bow: { unlocked: true, level: 1 },
      sword: { unlocked: true, level: 1 },
      shield: { unlocked: true, level: 1 },
      axe: { unlocked: false, level: 1 },
      firestaff: { unlocked: false, level: 1 },
      starterWeapon: 'bow'
    };
    try {
      const raw = this.safeGet(STORAGE_UPGRADES_KEY);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      const res = { ...defaults };
      Object.keys(defaults).forEach(k => {
        if (k === 'starterWeapon') {
          res[k] = parsed[k] && defaults[parsed[k]] ? parsed[k] : defaults[k];
        } else {
          res[k] = {
            unlocked: Boolean(parsed[k]?.unlocked ?? defaults[k].unlocked),
            level: 1
          };
        }
      });
      return res;
    } catch {
      return defaults;
    }
  },

  saveUpgrades(up) {
    try {
      this.safeSet(STORAGE_UPGRADES_KEY, JSON.stringify(up));
    } catch {}
    return up;
  },

  getWeaponLevel(type) {
    return runWeaponLevels[type] || 1;
  },

  getUnlockedWeaponPool() {
    const up = this.getUpgrades();
    const pool = [];
    ['bow', 'sword', 'shield', 'axe', 'firestaff'].forEach(k => {
      if (up[k]?.unlocked) pool.push(k);
    });
    return pool.length > 0 ? pool : ['bow'];
  },

  getStatusUpgrades() {
    const defaults = { maxHp: 1, moveSpeed: 1, magnet: 1, wisdom: 1 };
    try {
      const raw = this.safeGet(STORAGE_STATUS_KEY);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      return {
        maxHp: Phaser.Math.Clamp(parsed.maxHp ?? 1, 1, STATUS_CATALOG.maxHp.maxLevel),
        moveSpeed: Phaser.Math.Clamp(parsed.moveSpeed ?? 1, 1, STATUS_CATALOG.moveSpeed.maxLevel),
        magnet: Phaser.Math.Clamp(parsed.magnet ?? 1, 1, STATUS_CATALOG.magnet.maxLevel),
        wisdom: Phaser.Math.Clamp(parsed.wisdom ?? 1, 1, STATUS_CATALOG.wisdom.maxLevel)
      };
    } catch {
      return defaults;
    }
  },

  saveStatusUpgrades(st) {
    try {
      this.safeSet(STORAGE_STATUS_KEY, JSON.stringify(st));
    } catch {}
    return st;
  },

  getStatusLevel(key) {
    return this.getStatusUpgrades()[key] || 1;
  },

  getMagnetRadius() {
    const lvl = this.getStatusLevel('magnet');
    return STATUS_CATALOG.magnet.values[lvl - 1] || 90;
  },

  getPlayerMaxHp() {
    const lvl = this.getStatusLevel('maxHp');
    return STATUS_CATALOG.maxHp.values[lvl - 1] || 1;
  },

  getPlayerMoveSpeed() {
    const lvl = this.getStatusLevel('moveSpeed');
    return STATUS_CATALOG.moveSpeed.values[lvl - 1] || PLAYER_SPEED;
  },

  getWisdomMultiplier() {
    const lvl = this.getStatusLevel('wisdom');
    return STATUS_CATALOG.wisdom.values[lvl - 1] || 1.0;
  },

  getWisdomBonusDuration() {
    const lvl = this.getStatusLevel('wisdom');
    return [0, 0.6, 1.2, 1.8, 2.5][lvl - 1] || 0;
  },

  getXpRequiredForLevel(lvl) {
    const xpTable = [6, 12, 20, 32, 48, 68, 95, 130, 175, 230];
    if (lvl - 1 < xpTable.length) return xpTable[lvl - 1];
    return 230 + (lvl - xpTable.length) * 65;
  },

  getAchievementsData() {
    const defaults = {
      unlocked: {},
      stats: { goblins: 0, warriors: 0, mages: 0, reflected: 0 }
    };
    try {
      const raw = this.safeGet(STORAGE_ACHIEVEMENTS_KEY);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      return {
        unlocked: parsed.unlocked || {},
        stats: {
          goblins: parsed.stats?.goblins || 0,
          warriors: parsed.stats?.warriors || 0,
          mages: parsed.stats?.mages || 0,
          reflected: parsed.stats?.reflected || 0
        }
      };
    } catch {
      return defaults;
    }
  },

  saveAchievementsData(data) {
    try {
      this.safeSet(STORAGE_ACHIEVEMENTS_KEY, JSON.stringify(data));
    } catch {}
    return data;
  },

  recordAchievementProgress(scene, statKey, amount = 1) {
    const data = this.getAchievementsData();
    if (data.stats[statKey] === undefined) return;
    data.stats[statKey] += amount;

    const newlyUnlocked = [];
    ACHIEVEMENTS_CATALOG.forEach(ach => {
      if (ach.stat === statKey && !data.unlocked[ach.id] && data.stats[statKey] >= ach.target) {
        data.unlocked[ach.id] = true;
        newlyUnlocked.push(ach);
      }
    });

    this.saveAchievementsData(data);

    newlyUnlocked.forEach((ach, idx) => {
      this.addGold(ach.rewardGold || 0);
      if (scene) {
        scene.time.delayedCall(idx * 1800, () => showAchievementToast(scene, ach));
      }
    });
  },

  isGameFullscreen(scene) {
    return Boolean((scene && scene.scale && scene.scale.isFullscreen) || (typeof document !== 'undefined' && document.fullscreenElement));
  },

  updateFullscreenIcons(scene) {
    const fs = this.isGameFullscreen(scene);
    if (hudFullscreenIcon && hudFullscreenIcon.active) {
      hudFullscreenIcon.setFrame(fs ? 1 : 0);
    }
  },

  toggleFullscreen(scene) {
    if (!scene || !scene.scale) return;
    try {
      if (scene.scale.isFullscreen) {
        scene.scale.stopFullscreen();
      } else {
        scene.scale.startFullscreen();
      }
    } catch (err) {
      const targetEl = (typeof document !== 'undefined' && document.getElementById('game-container')) || document.documentElement;
      if (typeof document !== 'undefined') {
        if (!document.fullscreenElement && targetEl && targetEl.requestFullscreen) {
          targetEl.requestFullscreen().catch(() => {});
        } else if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
    }
    scene.time.delayedCall(60, () => {
      if (scene.scale) scene.scale.refresh();
      if (scene.cameras && scene.cameras.main) {
        scene.cameras.main.setViewport(0, 0, GAME_WIDTH, GAME_HEIGHT);
        scene.cameras.main.setRoundPixels(true);
      }
    });
  },

  getJoystickMode() {
    try {
      const mode = this.safeGet(STORAGE_JOYSTICK_KEY);
      if (mode === 'enabled' || mode === 'disabled') return mode;
      // No computador (desktop / laptop), o padrÃ£o Ã© SEMPRE desativado!
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        const ua = (navigator.userAgent || navigator.vendor || window.opera || '').toLowerCase();
        const isMobile = /android|iphone|ipod|blackberry|iemobile|opera mini|mobile/i.test(ua);
        const isIPad = /ipad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        if (isMobile || isIPad) return 'enabled';
      }
      return 'disabled';
    } catch {
      return 'disabled';
    }
  },

  setJoystickMode(mode) {
    try {
      this.safeSet(STORAGE_JOYSTICK_KEY, mode);
    } catch {}
  }
};

// Aliases para compatibilidade total com o restante do jogo
function getHighScores() { return StorageManager.getHighScores(); }
function saveHighScore(name, score) { return StorageManager.saveHighScore(name, score); }
const getBestScore = () => StorageManager.getBestScore();
function getGold() { return StorageManager.getGold(); }
function setGold(total) { return StorageManager.setGold(total); }
function addGold(amount) { return StorageManager.addGold(amount); }
function spendGold(amount) {
  if (getGold() < amount) return false;
  addGold(-amount);
  return true;
}
function consolidateSilverToGold() { return StorageManager.consolidateSilverToGold(); }
function getUpgrades() { return StorageManager.getUpgrades(); }
function saveUpgrades(up) { return StorageManager.saveUpgrades(up); }
function getWeaponLevel(type) { return StorageManager.getWeaponLevel(type); }
function getUnlockedWeaponPool() { return StorageManager.getUnlockedWeaponPool(); }
function getStatusUpgrades() { return StorageManager.getStatusUpgrades(); }
function saveStatusUpgrades(st) { return StorageManager.saveStatusUpgrades(st); }
function setStatusUpgradeLevel(key, lvl) {
  const current = StorageManager.getStatusUpgrades();
  current[key] = lvl;
  StorageManager.saveStatusUpgrades(current);
  return current;
}
function getStatusLevel(key) { return StorageManager.getStatusLevel(key); }
function getMagnetRadius() { return StorageManager.getMagnetRadius(); }
function getPlayerMaxHp() { return StorageManager.getPlayerMaxHp(); }
function getPlayerMoveSpeed() { return StorageManager.getPlayerMoveSpeed(); }
function getWisdomMultiplier() { return StorageManager.getWisdomMultiplier(); }
function getWisdomBonusDuration() { return StorageManager.getWisdomBonusDuration(); }
function getXpRequiredForLevel(lvl) { return StorageManager.getXpRequiredForLevel(lvl); }
function getAchievementsData() { return StorageManager.getAchievementsData(); }
function saveAchievementsData(data) { return StorageManager.saveAchievementsData(data); }
function recordAchievementProgress(scene, statKey, amount = 1) { return StorageManager.recordAchievementProgress(scene, statKey, amount); }
function isGameFullscreen(scene) { return StorageManager.isGameFullscreen(scene); }
function updateFullscreenIcons(scene) { return StorageManager.updateFullscreenIcons(scene); }
function toggleFullscreen(scene) { return StorageManager.toggleFullscreen(scene); }
function getJoystickMode() { return StorageManager.getJoystickMode(); }
function setJoystickMode(mode) { return StorageManager.setJoystickMode(mode); }

// Desacoplamento da tecla ESC com Tela Cheia nativa do navegador
if (typeof document !== 'undefined') {
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      lastFullscreenExitTime = Date.now();
    }
    if (typeof updateFullscreenIcons === 'function') {
      updateFullscreenIcons();
    }
  });
}

// =============================================================================
