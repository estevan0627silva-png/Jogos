$ErrorActionPreference = "Stop"

# 1. Update modals.js with refined spacing
$mPath = 'JS_Teste\src\ui\modals.js'
$mLines = [System.IO.File]::ReadAllLines($mPath, [System.Text.Encoding]::UTF8)

# Replace lines 428-435 (subtitle and divider line)
for ($i=415; $i -lt 440; $i++) {
  if ($mLines[$i].Contains("const sub = scene.add.text(cx, top + 56")) {
    $mLines[$i] = "    const sub = scene.add.text(cx, top + 58, subtitleText, {"
  }
  if ($mLines[$i].Contains("frame.lineStyle(1, 0xc5a059, 0.45).lineBetween(left + 40, top + 68")) {
    $mLines[$i] = "    frame.lineStyle(1, 0xc5a059, 0.45).lineBetween(left + 40, top + 72, left + width - 40, top + 72);"
  }
}

# Update showPauseModal elements
for ($i=480; $i -lt 610; $i++) {
  if ($mLines[$i].Contains("'ui_hud_panel_weapon').setDisplaySize(410, 50)")) {
    $mLines[$i] = "  const statsPanel = scene.add.image(cx, top + 102, 'ui_hud_panel_weapon').setDisplaySize(410, 48);"
  }
  if ($mLines[$i].Contains("const timeTxt = scene.add.text(cx, top + 84")) {
    $mLines[$i] = "  const timeTxt = scene.add.text(cx, top + 92, ``TEMPO: `${survivalTime}s  |  PRATA: `${runSilver}  |  OURO: `${getGold()}``, textStyle('#ffca28', 11.5, 'bold')).setOrigin(0.5);"
  }
  if ($mLines[$i].Contains("const relicTxt = scene.add.text(cx, top + 104")) {
    $mLines[$i] = "  const relicTxt = scene.add.text(cx, top + 112, ``RELÍQUIA ATIVA: `${relicName}``, textStyle(relicColor, 11, 'bold')).setOrigin(0.5);"
  }
  if ($mLines[$i].Contains("createButton(scene, cx, top + 146, 'CONTINUAR JORNADA [P]'")) {
    $mLines[$i] = "  const continueBtn = createButton(scene, cx, top + 152, 'CONTINUAR JORNADA [P]', () => resumeGame(scene), btnW, btnH);"
  }
  if ($mLines[$i].Contains("createButton(scene, cx, top + 190, sound.isMuted()")) {
    $mLines[$i] = "  const audioBtnGroup = createButton(scene, cx, top + 196, sound.isMuted() ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]', () => {"
  }
  if ($mLines[$i].Contains("createButton(scene, cx, top + 234, isGameFullscreen(scene)")) {
    $mLines[$i] = "  const fsBtnGroup = createButton(scene, cx, top + 240, isGameFullscreen(scene) ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]', () => {"
  }
  if ($mLines[$i].Contains("createButton(scene, cx, top + 278, 'REINICIAR MISSÃO'")) {
    $mLines[$i] = "  const restartBtn = createButton(scene, cx, top + 284, 'REINICIAR MISSÃO', () => restartScene(scene, true, false), btnW, btnH);"
  }
  if ($mLines[$i].Contains("createButton(scene, cx, top + 322, 'MENU PRINCIPAL'")) {
    $mLines[$i] = "  const menuBtn = createButton(scene, cx, top + 328, 'MENU PRINCIPAL', () => restartScene(scene, false, false), btnW, btnH);"
  }
  if ($mLines[$i].Contains("const footerHint = scene.add.text(cx, top + 368")) {
    $mLines[$i] = "  const footerHint = scene.add.text(cx, top + 372, 'Pausar / Retornar: Tecla [P] ou [ESC]', textStyle('#e0c088', 10.5)).setOrigin(0.5);"
  }
}

[System.IO.File]::WriteAllLines($mPath, $mLines, [System.Text.Encoding]::UTF8)
Write-Output "Polished modals.js!"

# 2. Update menus.js with polished showSettingsMenu
$menuPath = 'JS_Teste\src\ui\menus.js'
$menuText = [System.IO.File]::ReadAllText($menuPath, [System.Text.Encoding]::UTF8)

$polishedSettings = @"
function showSettingsMenu(scene) {
  if (menuContainer) menuContainer.destroy();
  const cx = GAME_WIDTH / 2;
  const modalH = 490;
  const top = (GAME_HEIGHT - modalH) / 2;
  menuContainer = createModal(scene, 'CONFIGURAÇÕES DO REINO', modalH, 'Ajustes de áudio, vídeo e joystick de batalha', 580);
  menuContainer.isMainMenu = false;

  // Seção 1: Áudio, Tela Cheia & Controles Mobile
  const audioBox = scene.add.graphics();
  audioBox.fillStyle(0x221a13, 0.94).fillRoundedRect(cx - 260, top + 78, 520, 116, 6);
  audioBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(cx - 260, top + 78, 520, 116, 6);
  audioBox.lineStyle(1, 0xc5a059, 0.6).strokeRoundedRect(cx - 258, top + 80, 516, 112, 4);

  const audioTitle = scene.add.text(cx - 240, top + 88, 'ÁUDIO, TELA CHEIA & JOYSTICK VIRTUAL', textStyle('#ffca28', 11.5));

  // Botão 1: Áudio
  const audioBtnGroup = createButton(scene, cx - 130, top + 124, sound.isMuted() ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]', () => {
    sound.toggleMute();
    updateAudioUI();
  }, 240, 36, sound.isMuted() ? 'ui_btn_red_reg' : 'ui_btn_blue_reg');
  const audioToggleBtn = audioBtnGroup[0];
  const audioToggleTxt = audioBtnGroup[1];

  const updateAudioUI = () => {
    if (!audioToggleBtn.active) return;
    const muted = sound.isMuted();
    audioToggleBtn.baseTexture = muted ? 'ui_btn_red_reg' : 'ui_btn_blue_reg';
    audioToggleBtn.setTexture(audioToggleBtn.baseTexture);
    audioToggleTxt.setText(muted ? 'ÁUDIO: MUTADO [M]' : 'ÁUDIO: ATIVADO [M]');
    if (hudHornIcon) hudHornIcon.setFrame(muted ? 1 : 0);
  };

  // Botão 2: Tela Cheia
  const fsBtnGroup = createButton(scene, cx + 130, top + 124, isGameFullscreen(scene) ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]', () => {
    toggleFullscreen(scene);
    scene.time.delayedCall(80, refreshFsBtn);
  }, 240, 36);
  const fsToggleBtn = fsBtnGroup[0];
  const fsToggleTxt = fsBtnGroup[1];

  const refreshFsBtn = () => {
    if (!fsToggleBtn.active) return;
    const active = isGameFullscreen(scene);
    fsToggleTxt.setText(active ? 'TELA CHEIA: ATIVA [F]' : 'ATIVAR TELA CHEIA [F]');
  };
  menuContainer.updateMenuFullscreen = refreshFsBtn;

  // Botão 3: Ativar Joystick Virtual (Mobile / PC)
  const getJoyLabel = () => {
    const m = typeof getJoystickMode === 'function' ? getJoystickMode() : 'disabled';
    return (m === 'enabled') ? 'JOYSTICK VIRTUAL: [ATIVADO]' : 'JOYSTICK VIRTUAL: [DESATIVADO]';
  };
  const isJoyActive = () => (typeof getJoystickMode === 'function' ? getJoystickMode() : 'disabled') === 'enabled';

  const joyBtnGroup = createButton(scene, cx, top + 166, getJoyLabel(), () => {
    const current = typeof getJoystickMode === 'function' ? getJoystickMode() : 'disabled';
    const next = current === 'enabled' ? 'disabled' : 'enabled';
    if (typeof setJoystickMode === 'function') setJoystickMode(next);
    const active = isJoyActive();
    joyToggleBtn.baseTexture = active ? 'ui_btn_blue_reg' : 'ui_btn_red_reg';
    joyToggleBtn.setTexture(joyToggleBtn.baseTexture);
    joyToggleTxt.setText(getJoyLabel());
    if (virtualJoystick) virtualJoystick.updateVisibility();
  }, 500, 32, isJoyActive() ? 'ui_btn_blue_reg' : 'ui_btn_red_reg');
  const joyToggleBtn = joyBtnGroup[0];
  const joyToggleTxt = joyBtnGroup[1];

  // Seção 2: Pergaminho de Dicas de Combate
  const guideBox = scene.add.graphics();
  guideBox.fillStyle(0x1d1611, 0.94).fillRoundedRect(cx - 260, top + 204, 520, 186, 6);
  guideBox.lineStyle(1.5, 0x8d5524).strokeRoundedRect(cx - 260, top + 204, 520, 186, 6);
  guideBox.lineStyle(1, 0xc5a059, 0.5).strokeRoundedRect(cx - 258, top + 206, 516, 182, 4);

  const guideTitle = scene.add.text(cx, top + 214, 'PERGAMINHO DE COMBATE', textStyle('#ffca28', 12)).setOrigin(0.5);
  const guideLines = [
    '• Mobile (Touch): Joystick Virtual analógico à esquerda para movimentação (ataque automático).',
    '• Inimigos derrotados dropam Moedas de Prata durante a expedição na floresta.',
    '• Ao encerrar a partida, suas Moedas de Prata são convertidas em Ouro Real!',
    '• Visite a Forja do Ferreiro para desbloquear novas armas de combate com seu Ouro.',
    '• Visite o Santuário do Mago para aprimorar seus atributos permanentes.',
    '• O Escudo Sagrado reflete projéteis inimigos enquanto desfere seus ataques.'
  ];
  const guideTexts = guideLines.map((txt, i) =>
    scene.add.text(cx - 240, top + 232 + i * 23, txt, { ...textStyle('#d6c8aa', 10, 'normal'), lineSpacing: 3 })
  );

  menuContainer.add([
    audioBox, audioTitle, ...audioBtnGroup, ...fsBtnGroup, ...joyBtnGroup,
    guideBox, guideTitle, ...guideTexts,
    ...createButton(scene, cx, top + 424, 'VOLTAR', () => exitSubMenu(scene), 260, 38)
  ]);
}
"@

$sStart = "function showSettingsMenu(scene) {"
$sEnd = "...createButton(scene, cx, 442, 'VOLTAR', () => exitSubMenu(scene), 260, 38)" + [Environment]::NewLine + "  ]);" + [Environment]::NewLine + "}"
if (-not $menuText.Contains($sEnd)) {
  $sEnd = "...createButton(scene, cx, 442, 'VOLTAR', () => exitSubMenu(scene), 260, 38)\n  ]);\n}"
}

$sIdx = $menuText.IndexOf($sStart)
$eIdx = $menuText.IndexOf($sEnd, $sIdx) + $sEnd.Length

if ($sIdx -ge 0 -and $eIdx -gt $sIdx) {
  $menuText = $menuText.Substring(0, $sIdx) + $polishedSettings + $menuText.Substring($eIdx)
  [System.IO.File]::WriteAllText($menuPath, $menuText, [System.Text.Encoding]::UTF8)
  Write-Output "Polished menus.js settings!"
} else {
  Write-Warning "Could not find showSettingsMenu in menus.js"
}
