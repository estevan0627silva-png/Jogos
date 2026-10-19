// SISTEMA DE EVENTOS DESACOPLADO (Observer Pattern / EventBus)
// Permite que combate, áudio, interface, conquistas e drops reajam a eventos do jogo
// sem dependência cíclica ou chamadas diretas rígidas.
// =============================================================================
const GameEvents = {
  // Jogador
  PLAYER_HIT: 'player:hit',
  PLAYER_HEALED: 'player:healed',
  PLAYER_DIED: 'player:died',
  // Combate & Projéteis
  ENEMY_DAMAGED: 'enemy:damaged',
  ENEMY_KILLED: 'enemy:killed',
  SHIELD_REFLECT: 'shield:reflect',
  SHIELD_SHOCKWAVE: 'shield:shockwave',
  // Chefão
  BOSS_SPAWNED: 'boss:spawned',
  BOSS_DAMAGED: 'boss:damaged',
  BOSS_DEFEATED: 'boss:defeated',
  // Progressão, Drops & Inventário
  XP_GAINED: 'xp:gained',
  LEVEL_UP: 'player:levelup',
  COIN_COLLECTED: 'coin:collected',
  ITEM_COLLECTED: 'item:collected',
  BUFF_EQUIPPED: 'buff:equipped',
  BUFF_ENDED: 'buff:ended',
  // Conquistas
  ACHIEVEMENT_PROGRESS: 'achievement:progress'
};

class GameEventBus {
  constructor() {
    this.listeners = new Map();
  }
  on(event, fn) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(fn);
    return () => this.off(event, fn);
  }
  once(event, fn) {
    const wrapper = (payload) => {
      this.off(event, wrapper);
      fn(payload);
    };
    return this.on(event, wrapper);
  }
  off(event, fn) {
    const set = this.listeners.get(event);
    if (set) {
      set.delete(fn);
      if (set.size === 0) this.listeners.delete(event);
    }
  }
  emit(event, payload) {
    const set = this.listeners.get(event);
    if (set) {
      for (const fn of Array.from(set)) {
        try {
          fn(payload);
        } catch (err) {
          console.error('[EventBus] Erro ao disparar evento ' + event + ':', err);
        }
      }
    }
  }
  clear() {
    this.listeners.clear();
  }
}
const events = new GameEventBus();

// =============================================================================
