// ESTADO (Inclui Estado de XP e Níveis Isolados por Partida)
// =============================================================================
let player, shieldSprite, shieldAura, cursors, keys;
let ground, road, forestTop, forestBottom, shadows, hitFx, dustFx, sparksFx, debrisFx, holyFx, emberFx, playerBuffBar, enemyHpBars;
let enemies, obstacles, items, playerArrows, enemyArrows, slashes, xpOrbs;
let hudContainer, hudGloryText, hudSilverText, hudGoldText, hudBestText, hudHearts = [];
let hudItemIcon, hudItemName, hudItemTime, hudItemBar, hudHornIcon, hudFullscreenIcon;
let hudXpBar, hudXpText, hudLevelText;
let activeBoss, bossSpawned, bossDefeated, bossHudContainer, bossHpBar, bossHpText, bossFilterOverlay;
let villageDecor, coins, menuContainer, pauseModal, draftModal;
let gameState, survivalTime, runSilver = 0, runGold = 0, lastRunSummary = null;
let playerHp = 1, playerMaxHp = 1, playerInvulnerable = false;
let runXp = 0, runLevel = 1, xpToNextLevel = 6, pendingLevelUps = 0;
let runWeaponLevels = { bow: 1, sword: 1, shield: 1, axe: 1, firestaff: 1 };
let runBonusDuration = 0;
let enemySpeed, spawnDelay, buff, slashCounter = 0;

// =============================================================================
