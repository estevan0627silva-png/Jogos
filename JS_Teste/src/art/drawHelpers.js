// ARTE: FERRAMENTAS DE PIXEL ART
// Cada "pixel" lógico vira um bloco 2x2. Antes das cores, o desenho é
// carimbado 4 vezes deslocado em cor escura — isso cria o contorno de 1px.
// Utilitários de desenho: r.dither (xadrez sub-pixel), r.shine (especular) e r.bevel (3D).
// =============================================================================
function drawPixels(g, ox, oy, draw, frame = 0) {
  const pass = (dx, dy, outline) => {
    const r = (color, x, y, w = 1, h = 1) => {
      g.fillStyle(outline ? C.outline : color).fillRect(
        ox + x * 2 + dx,
        oy + y * 2 + dy,
        w * 2,
        h * 2
      );
    };

    // Dithering 16-bit: padrão xadrez 1x1 sub-pixel para gradientes suaves de metal/tecido/terreno
    r.dither = (colorA, colorB, x, y, w = 1, h = 1, invert = false) => {
      if (outline) {
        g.fillStyle(C.outline).fillRect(ox + x * 2 + dx, oy + y * 2 + dy, w * 2, h * 2);
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

    // Borda chanfrada 3D para moedas, botões e medalhões
    r.bevel = (highlightColor, shadowColor, x, y, w, h) => {
      if (outline) {
        g.fillStyle(C.outline).fillRect(ox + x * 2 + dx, oy + y * 2 + dy, w * 2, h * 2);
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

  pass(-1, 0, true);
  pass(1, 0, true);
  pass(0, -1, true);
  pass(0, 1, true); // contorno escuro 4-pass
  pass(0, 0, false); // cores e detalhes
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
