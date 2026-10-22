// ARTE: FERRAMENTAS DE PIXEL ART & RENDERIZAÇÃO 64-BIT
// Cada "pixel" lógico opera em grade 2x2 com contornos com iluminação direcional (Luz zenital no topo/esquerda e oclusão de contato na base/direita).
// Utilitários de desenho: r.dither (gradiente sub-pixel), r.shine (especular), r.rim (luz de borda) e r.bevel (volume 3D).
// =============================================================================
function drawPixels(g, ox, oy, draw, frame = 0) {
  const pass = (dx, dy, outline, isLightEdge = false) => {
    const outlineColor = isLightEdge ? (C.outlineSoft || 0x2e241c) : (C.outline || 0x16100c);
    const r = (color, x, y, w = 1, h = 1) => {
      g.fillStyle(outline ? outlineColor : color).fillRect(
        ox + x * 2 + dx,
        oy + y * 2 + dy,
        w * 2,
        h * 2
      );
    };

    // Dithering 64-bit: padrão xadrez 1x1 sub-pixel para gradientes suaves de metal/tecido/terreno
    r.dither = (colorA, colorB, x, y, w = 1, h = 1, invert = false) => {
      if (outline) {
        g.fillStyle(outlineColor).fillRect(ox + x * 2 + dx, oy + y * 2 + dy, w * 2, h * 2);
      } else {
        for (let lx = 0; lx < w; lx++) {
          for (let ly = 0; ly < h; ly++) {
            const px = ox + (x + lx) * 2;
            const py = oy + (y + ly) * 2;
            const flip = ((lx + ly + (invert ? 1 : 0)) % 2 === 0);
            const c1 = flip ? colorA : colorB;
            const c2 = flip ? colorB : colorA;
            g.fillStyle(c1).fillRect(px, py, 1, 1).fillRect(px + 1, py + 1, 1, 1);
            g.fillStyle(c2).fillRect(px + 1, py, 1, 1).fillRect(px, py + 1, 1, 1);
          }
        }
      }
    };

    // Ponto especular (glint de 1 sub-pixel em joias, lâminas e bordas polidas)
    r.shine = (x, y, subX = 0, subY = 0, color = C.white) => {
      if (!outline) {
        g.fillStyle(color).fillRect(ox + x * 2 + subX, oy + y * 2 + subY, 1, 1);
      }
    };

    // Luz de borda / Rim light volumétrica de alta nitidez
    r.rim = (x, y, w = 1, h = 1, color = C.white) => {
      if (!outline) {
        g.fillStyle(color).fillRect(ox + x * 2, oy + y * 2, w * 2, 1);
      }
    };

    // Borda chanfrada 3D para moedas, botões e medalhões
    r.bevel = (highlightColor, shadowColor, x, y, w, h) => {
      if (outline) {
        g.fillStyle(outlineColor).fillRect(ox + x * 2 + dx, oy + y * 2 + dy, w * 2, h * 2);
      } else {
        g.fillStyle(highlightColor)
          .fillRect(ox + x * 2, oy + y * 2, w * 2, 2)
          .fillRect(ox + x * 2, oy + y * 2, 2, h * 2);
        g.fillStyle(shadowColor)
          .fillRect(ox + x * 2, oy + (y + h) * 2 - 2, w * 2, 2)
          .fillRect(ox + (x + w) * 2 - 2, oy + y * 2, 2, h * 2);
      }
    };

    draw(r, frame, r);
  };

  // Contorno Direcional 64-bit (Luz ambiente e Oclusão de Contato):
  // Topo e Esquerda recebem iluminação da copa (outlineSoft); Base e Direita recebem sombra de contato (outline)
  pass(-1, 0, true, true);  // Esquerda: luz suave
  pass(0, -1, true, true);  // Topo: luz suave
  pass(1, 0, true, false);  // Direita: sombra de contato
  pass(0, 1, true, false);  // Base: sombra de contato profunda
  pass(0, 0, false, false); // Cores e detalhes em alta nitidez
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
