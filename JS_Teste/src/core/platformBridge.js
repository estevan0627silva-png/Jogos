// =============================================================================
// PLATFORM BRIDGE — ADAPTER UNIVERSAL DE PUBLICAÇÃO WEB
// Suporte unificado para:
// - Itch.io / GameJolt / Offline Local (Zero dependências, 100% autônomo)
// - CrazyGames (SDK v3: gameplayStart, gameplayStop, Midroll, Rewarded Ads)
// - Poki (SDK v2: gameplayStart, gameplayStop, commercialBreak, rewardedBreak)
// =============================================================================

class PlatformBridgeController {
  constructor() {
    this.platform = 'STANDALONE'; // 'STANDALONE', 'CRAZYGAMES', 'POKI'
    this.initialized = false;
    this.initPromise = null;
    this.lastMidrollTime = 0;
    this.gameLaunchTime = Date.now();
    this.minMidrollInterval = 150000; // Mínimo de 150s (2.5 min) entre midrolls (QA Compliant)
    this.initialBufferTime = 90000;   // Sem anúncios nos primeiros 90s de jogo
    this.rewardedUsedInRun = false;
    this.isShowingAd = false;
    this.loadingFinished = false;

    this.detectPlatform();
    this.init();
  }

  detectPlatform() {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search || '');
    const forced = urlParams.get('platform') || urlParams.get('sdk');
    const hostname = window.location.hostname || '';

    if (forced === 'poki' || hostname.includes('poki.com') || hostname.includes('poki-gdn.com')) {
      this.platform = 'POKI';
    } else if (
      forced === 'crazygames' ||
      hostname.includes('crazygames.com') ||
      hostname.includes('1001juegos.com') ||
      hostname.includes('gameflare.com')
    ) {
      this.platform = 'CRAZYGAMES';
    } else {
      this.platform = 'STANDALONE'; // Itch.io, Newgrounds, dev local
    }

    console.log(`[PlatformBridge] Plataforma detectada: ${this.platform}`);
  }

  // Inicializa o SDK específico de forma assíncrona e segura
  async init() {
    if (this.initialized) return true;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve) => {
      try {
        if (this.platform === 'POKI') {
          this.initPoki(resolve);
        } else if (this.platform === 'CRAZYGAMES') {
          this.initCrazyGames(resolve);
        } else {
          // Modo Standalone / Itch.io: pronto imediatamente
          this.initialized = true;
          resolve(true);
        }
      } catch (err) {
        console.warn('[PlatformBridge] Falha ao iniciar SDK da plataforma, usando fallback Standalone:', err);
        this.platform = 'STANDALONE';
        this.initialized = true;
        resolve(true);
      }
    });

    return this.initPromise;
  }

  initPoki(resolve) {
    const onPokiReady = () => {
      this.initialized = true;
      if (this.loadingFinished && typeof window.PokiSDK !== 'undefined') {
        try { window.PokiSDK.gameLoadingFinished(); } catch (e) {}
      }
      resolve(true);
    };

    if (typeof window.PokiSDK !== 'undefined') {
      window.PokiSDK.init()
        .then(() => {
          console.log('[PlatformBridge] PokiSDK inicializado com sucesso.');
          onPokiReady();
        })
        .catch(() => {
          console.warn('[PlatformBridge] PokiSDK inicializado com adblocker ou restrição.');
          onPokiReady();
        });
      return;
    }

    // Carregamento dinâmico do script Poki se estiver no domínio Poki
    const script = document.createElement('script');
    script.src = 'https://game-cdn.poki.com/scripts/v2/poki-sdk.js';
    script.onload = () => {
      if (typeof window.PokiSDK !== 'undefined') {
        window.PokiSDK.init()
          .then(() => onPokiReady())
          .catch(() => onPokiReady());
      } else {
        onPokiReady();
      }
    };
    script.onerror = () => {
      console.warn('[PlatformBridge] Não foi possível carregar PokiSDK, fallback ativado.');
      this.platform = 'STANDALONE';
      this.initialized = true;
      resolve(true);
    };
    document.head.appendChild(script);
  }

  initCrazyGames(resolve) {
    const onCrazyReady = () => {
      this.initialized = true;
      if (this.loadingFinished && window.CrazyGames?.SDK?.game?.loadingStop) {
        try { window.CrazyGames.SDK.game.loadingStop(); } catch (e) {}
      }
      resolve(true);
    };

    if (typeof window.CrazyGames !== 'undefined' && window.CrazyGames.SDK) {
      window.CrazyGames.SDK.init()
        .then(() => {
          console.log('[PlatformBridge] CrazyGames SDK v3 inicializado.');
          onCrazyReady();
        })
        .catch((err) => {
          console.warn('[PlatformBridge] CrazyGames SDK falhou ao inicializar:', err);
          onCrazyReady();
        });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.crazygames.com/crazygames-sdk-v3.js';
    script.onload = () => {
      if (typeof window.CrazyGames !== 'undefined' && window.CrazyGames.SDK) {
        window.CrazyGames.SDK.init()
          .then(() => onCrazyReady())
          .catch(() => onCrazyReady());
      } else {
        onCrazyReady();
      }
    };
    script.onerror = () => {
      console.warn('[PlatformBridge] Não foi possível carregar CrazyGames SDK, fallback ativado.');
      this.platform = 'STANDALONE';
      this.initialized = true;
      resolve(true);
    };
    document.head.appendChild(script);
  }

  // ---------------------------------------------------------------------------
  // SINAIS DE CARREGAMENTO (Loading Life Cycle - Poki & CrazyGames QA)
  // ---------------------------------------------------------------------------
  loadingStart() {
    try {
      if (this.platform === 'CRAZYGAMES' && window.CrazyGames?.SDK?.game?.loadingStart) {
        window.CrazyGames.SDK.game.loadingStart();
      }
    } catch (e) {
      console.warn('[PlatformBridge] loadingStart erro:', e);
    }
  }

  loadingStop() {
    this.loadingFinished = true;
    try {
      if (this.platform === 'POKI' && typeof window.PokiSDK !== 'undefined') {
        window.PokiSDK.gameLoadingFinished();
      } else if (this.platform === 'CRAZYGAMES' && window.CrazyGames?.SDK?.game?.loadingStop) {
        window.CrazyGames.SDK.game.loadingStop();
      }
    } catch (e) {
      console.warn('[PlatformBridge] loadingStop erro:', e);
    }
  }

  // ---------------------------------------------------------------------------
  // TELEMETRIA E CICLO DE JOGABILIDADE (Obrigatórios para Poki e CrazyGames)
  // ---------------------------------------------------------------------------
  gameplayStart() {
    try {
      if (this.platform === 'POKI' && typeof window.PokiSDK !== 'undefined') {
        window.PokiSDK.gameplayStart();
      } else if (this.platform === 'CRAZYGAMES' && window.CrazyGames?.SDK?.game) {
        window.CrazyGames.SDK.game.gameplayStart();
      }
    } catch (e) {
      console.warn('[PlatformBridge] gameplayStart erro:', e);
    }
  }

  gameplayStop() {
    try {
      if (this.platform === 'POKI' && typeof window.PokiSDK !== 'undefined') {
        window.PokiSDK.gameplayStop();
      } else if (this.platform === 'CRAZYGAMES' && window.CrazyGames?.SDK?.game) {
        window.CrazyGames.SDK.game.gameplayStop();
      }
    } catch (e) {
      console.warn('[PlatformBridge] gameplayStop erro:', e);
    }
  }

  // ---------------------------------------------------------------------------
  // ANÚNCIOS MIDROLL (INTERSTITIAL ENTRE PARTIDAS)
  // ---------------------------------------------------------------------------
  canShowMidroll() {
    if (this.platform === 'STANDALONE') return false;
    const now = Date.now();
    // Protege o jogador na primeira partida (90s de buffer) e impõe cooldown de 150s
    if (now - this.gameLaunchTime < this.initialBufferTime) return false;
    if (now - this.lastMidrollTime < this.minMidrollInterval) return false;
    return true;
  }

  showMidroll(scene, onComplete) {
    const finish = () => {
      this.isShowingAd = false;
      this.restoreAudioAndPhysics(scene);
      if (typeof onComplete === 'function') onComplete();
    };

    if (!this.canShowMidroll()) {
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    this.isShowingAd = true;
    this.pauseAudioAndPhysics(scene);
    this.lastMidrollTime = Date.now();

    try {
      if (this.platform === 'POKI' && typeof window.PokiSDK !== 'undefined') {
        window.PokiSDK.commercialBreak()
          .then(() => finish())
          .catch(() => finish());
      } else if (this.platform === 'CRAZYGAMES' && window.CrazyGames?.SDK?.ad) {
        window.CrazyGames.SDK.ad.requestAd('midroll', {
          adStarted: () => { /* Som e física já pausados */ },
          adFinished: () => finish(),
          adError: () => finish()
        });
      } else {
        finish();
      }
    } catch (err) {
      console.warn('[PlatformBridge] Erro ao exibir Midroll:', err);
      finish();
    }
  }

  // ---------------------------------------------------------------------------
  // ANÚNCIOS REWARDED (VÍDEOS COM RECOMPENSA VOLUNTÁRIA)
  // ---------------------------------------------------------------------------
  showRewarded(scene, { onReward, onDismiss, onError }) {
    const handleReward = () => {
      if (typeof onReward === 'function') onReward();
    };

    const finish = () => {
      this.isShowingAd = false;
      this.restoreAudioAndPhysics(scene);
      if (typeof onDismiss === 'function') onDismiss();
    };

    this.isShowingAd = true;
    this.pauseAudioAndPhysics(scene);

    // Em modo Standalone/Itch.io (onde não há rede de anúncios), concede a recompensa imediatamente para permitir testes completos
    if (this.platform === 'STANDALONE') {
      console.log('[PlatformBridge] Standalone: recompensa concedida diretamente.');
      handleReward();
      finish();
      return;
    }

    try {
      if (this.platform === 'POKI' && typeof window.PokiSDK !== 'undefined') {
        window.PokiSDK.rewardedBreak()
          .then((success) => {
            if (success) handleReward();
            finish();
          })
          .catch((err) => {
            console.warn('[PlatformBridge] Poki rewarded erro:', err);
            if (typeof onError === 'function') onError(err);
            finish();
          });
      } else if (this.platform === 'CRAZYGAMES' && window.CrazyGames?.SDK?.ad) {
        window.CrazyGames.SDK.ad.requestAd('rewarded', {
          adStarted: () => { /* Som e física já pausados */ },
          adFinished: () => {
            handleReward();
            finish();
          },
          adError: (err) => {
            console.warn('[PlatformBridge] CrazyGames rewarded erro:', err);
            if (typeof onError === 'function') onError(err);
            finish();
          }
        });
      } else {
        handleReward();
        finish();
      }
    } catch (err) {
      console.warn('[PlatformBridge] Erro ao invocar rewarded ad:', err);
      if (typeof onError === 'function') onError(err);
      finish();
    }
  }

  // ---------------------------------------------------------------------------
  // PAUSA DE FÍSICA E SILENCIAMENTO DE ÁUDIO (Exigência de QA de todas as plataformas)
  // ---------------------------------------------------------------------------
  pauseAudioAndPhysics(scene) {
    if (typeof sound !== 'undefined' && sound.muteForAd) {
      sound.muteForAd();
    }
    if (scene && scene.physics) {
      scene.physics.pause();
    }
    if (scene && scene.time) {
      scene.time.paused = true;
    }
  }

  restoreAudioAndPhysics(scene) {
    if (typeof sound !== 'undefined' && sound.unmuteAfterAd) {
      sound.unmuteAfterAd();
    }
    // Restaura a física e timers apenas se a partida ainda estiver em andamento
    if (typeof gameState !== 'undefined' && gameState === 'PLAYING') {
      if (scene && scene.physics) {
        scene.physics.resume();
      }
      if (scene && scene.time) {
        scene.time.paused = false;
      }
    }
  }
}

// Instância singleton global do PlatformBridge
const PlatformBridge = new PlatformBridgeController();
if (typeof window !== 'undefined') {
  window.PlatformBridge = PlatformBridge;
}
