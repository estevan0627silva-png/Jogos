// =============================================================================
// MOTOR DE FONTES PIXEL ART AUTÊNTICO (KIBYRA UI FONTS)
// SUPORTE 100% OFFLINE, BASE64 EMBEDDED, GLYPHS 32x32 COM ESPAÇAMENTO PROPORCIONAL
// PALETAS CONTEXTUAIS: OURO, PRATA, BRONZE, VERDE, VERMELHO, CIANO E ROXO
// =============================================================================

// Folhas de fontes carregadas na memória
const _kibyraImages = {};
let _kibyraInitialized = false;
const _activePixelTexts = new Set();

function initKibyraFonts() {
  if (_kibyraInitialized) return;
  if (typeof FONT_SHEETS_BASE64 === 'undefined') return;
  for (const k in FONT_SHEETS_BASE64) {
    const img = new Image();
    img.onload = () => {
      _activePixelTexts.forEach(pt => {
        if (pt.active) pt.renderText();
      });
    };
    img.src = FONT_SHEETS_BASE64[k];
    _kibyraImages[k] = img;
  }
  _kibyraInitialized = true;
}

// Inicializa imediatamente
initKibyraFonts();

// Normalização de diacríticos e caracteres acentuados
function getCharGlyph(rawCh) {
  if (!rawCh) return (typeof KIBYRA_FONT_CODES !== 'undefined' ? KIBYRA_FONT_CODES[32] : [0, 0, 0, 0, 0, 8, 7]);
  if (rawCh === '•') return [0, 0, 0, 0, 0, 9, 0];
  if (rawCh === '|') return [0, 0, 0, 0, 0, 8, 0];
  if (rawCh === '>' || rawCh === '<') return [0, 0, 0, 0, 0, 9, 0];
  if (rawCh === '—' || rawCh === '–') return (typeof KIBYRA_FONT_CODES !== 'undefined' ? (KIBYRA_FONT_CODES[45] || KIBYRA_FONT_CODES[32]) : null);
  if (rawCh === '“' || rawCh === '”') return (typeof KIBYRA_FONT_CODES !== 'undefined' ? (KIBYRA_FONT_CODES[34] || KIBYRA_FONT_CODES[32]) : null);
  if (rawCh === '‘' || rawCh === '’') return (typeof KIBYRA_FONT_CODES !== 'undefined' ? (KIBYRA_FONT_CODES[39] || KIBYRA_FONT_CODES[32]) : null);
  if (rawCh === 'º' || rawCh === 'ª') return (typeof KIBYRA_FONT_CODES !== 'undefined' ? (KIBYRA_FONT_CODES[186] || KIBYRA_FONT_CODES[176] || KIBYRA_FONT_CODES[32]) : null);
  if (rawCh === '⚔') return (typeof KIBYRA_FONT_CODES !== 'undefined' ? (KIBYRA_FONT_CODES[88] || KIBYRA_FONT_CODES[32]) : null);

  const norm = rawCh.normalize('NFD');
  const baseCh = norm[0];
  const isCedilla = norm.includes('\u0327');
  const isTilde = norm.includes('\u0303');
  let code = baseCh.charCodeAt(0);
  if (isCedilla && (baseCh === 'c' || baseCh === 'C')) {
    code = (baseCh === 'C') ? 199 : 231;
  } else if (isTilde && (baseCh === 'n' || baseCh === 'N')) {
    code = (baseCh === 'N') ? 209 : 241;
  }

  if (typeof KIBYRA_FONT_CODES !== 'undefined' && KIBYRA_FONT_CODES[code]) {
    return KIBYRA_FONT_CODES[code];
  }
  if (typeof KIBYRA_FONT_CODES !== 'undefined' && KIBYRA_FONT_CODES[32]) {
    return KIBYRA_FONT_CODES[32];
  }
  return [0, 0, 0, 0, 0, 8, 7];
}

function measureWordWidth(word, scale) {
  let w = 0;
  for (let i = 0; i < word.length; i++) {
    const glyph = getCharGlyph(word[i]);
    w += Math.round(glyph[5] * scale);
  }
  return w;
}

function wrapTextToLines(rawText, maxWrapWidth, scale) {
  if (!maxWrapWidth || maxWrapWidth <= 0) {
    return rawText.split('\n');
  }
  const spaceW = Math.round(8 * scale);
  const resultLines = [];
  const paragraphs = String(rawText).split('\n');

  for (let p = 0; p < paragraphs.length; p++) {
    const paragraph = paragraphs[p];
    if (paragraph.length === 0) {
      resultLines.push('');
      continue;
    }
    const words = paragraph.split(' ');
    let currentLine = '';
    let currentW = 0;

    for (let w = 0; w < words.length; w++) {
      const word = words[w];
      const wordW = measureWordWidth(word, scale);

      if (currentLine === '') {
        currentLine = word;
        currentW = wordW;
      } else if (currentW + spaceW + wordW <= maxWrapWidth) {
        currentLine += ' ' + word;
        currentW += spaceW + wordW;
      } else {
        resultLines.push(currentLine);
        currentLine = word;
        currentW = wordW;
      }
    }
    if (currentLine !== '') {
      resultLines.push(currentLine);
    }
  }
  return resultLines;
}

// Seleciona paleta e multiplicadores de cor com base no contexto / cor CSS
function resolveFontPalette(colorStr) {
  if (!colorStr) return { sheet: 'yellow', tint: null };
  const c = String(colorStr).toLowerCase().trim();

  // 1. Ouro / Dourado / Amarelo (Títulos, Recordes, Moedas de Ouro, Destaques, Níveis)
  if (c.includes('ffca28') || c.includes('ffd700') || c.includes('ffd740') || c.includes('ffeb3b') || c.includes('ffc107') || c.includes('gold') || c.includes('yellow')) {
    return { sheet: 'yellow', tint: null };
  }
  // 2. Madeira / Bronze / Pergaminho (Fundo da mesa, notas secundárias, dicas)
  if (c.includes('2c1b10') || c.includes('4a2c11') || c.includes('1f130b') || c.includes('1f1208') || c.includes('22140a') || c.includes('8d5524') || c.includes('d6c8aa') || c.includes('c5a059') || c.includes('a89260') || c.includes('a8987b') || c.includes('cd7f32') || c.includes('736148') || c.includes('7a7265') || c.includes('1a0e05') || c.includes('16120e') || c.includes('e0c088') || c.includes('e8dcbe') || c.includes('brown')) {
    return { sheet: 'brown', tint: null };
  }
  // 3. Verde Esmeralda (Vida, Ativado, Equipado, Sucesso, Upgrades de Cura)
  if (c.includes('4caf50') || c.includes('81c784') || c.includes('50fa7b') || c.includes('a5d6a7') || c.includes('green')) {
    return { sheet: 'grey', tint: [0.35, 1.0, 0.45] };
  }
  // 4. Vermelho Carmesim (Bloqueado, Perigo, Mutado, Dano Crítico, Game Over)
  if (c.includes('ff5252') || c.includes('f44336') || c.includes('ff4d4d') || c.includes('ff8a80') || c.includes('ef5350') || c.includes('red')) {
    return { sheet: 'grey', tint: [1.0, 0.28, 0.28] };
  }
  // 5. Ciano / Azul Arcano (Relíquias, Moedas de Prata, Magia, Mana, Tela Cheia)
  if (c.includes('7fe7ff') || c.includes('29b6f6') || c.includes('4fc3f7') || c.includes('80d8ff') || c.includes('e0f7fa') || c.includes('cyan') || c.includes('blue')) {
    return { sheet: 'grey', tint: [0.45, 0.9, 1.0] };
  }
  // 6. Roxo / Violeta Épico (Santuário, Cartas Épicas, Raras, Barreiras)
  if (c.includes('b388ff') || c.includes('ba68c8') || c.includes('c36bff') || c.includes('d084ff') || c.includes('purple') || c.includes('violet')) {
    return { sheet: 'grey', tint: [0.75, 0.5, 1.0] };
  }
  // 7. Prata / Branco (Botões, Textos Gerais de Interface, Labels)
  return { sheet: 'grey', tint: null };
}

let _pixelTextCounter = 0;

/**
 * Componente nativo de Texto Pixel Art de Alto Desempenho para Phaser 3
 */
class PixelText extends Phaser.GameObjects.Image {
  constructor(scene, x, y, text = '', style = {}) {
    _pixelTextCounter++;
    const textureKey = '__pix_txt_' + _pixelTextCounter;
    const canvasTex = scene.textures.createCanvas(textureKey, 32, 32);
    super(scene, x, y, textureKey);
    this.setOrigin(0, 0); // Origem padrão de Text no Phaser 3 é (0, 0)

    this.canvasTexture = canvasTex;
    this.canvas = canvasTex.canvas;
    this.ctx = canvasTex.context;
    this.textureKey = textureKey;
    this._text = String(text != null ? text : '');
    this.style = Object.assign({
      fontSize: '16px',
      color: '#ffffff',
      align: 'left',
      lineSpacing: 4,
      strokeThickness: 0,
      wordWrap: null
    }, style);

    if (style && style.originX !== undefined && style.originY !== undefined) {
      this.setOrigin(style.originX, style.originY);
    }

    _activePixelTexts.add(this);
    this.renderText();
    scene.add.existing(this);
  }

  get text() {
    return this._text;
  }

  set text(val) {
    this.setText(val);
  }

  setText(newText) {
    const str = String(newText != null ? newText : '');
    if (str === this._text) return this;
    this._text = str;
    this.renderText();
    return this;
  }

  setColor(newColor) {
    this.style.color = newColor;
    this.renderText();
    return this;
  }

  setFontSize(newSize) {
    this.style.fontSize = typeof newSize === 'number' ? (newSize + 'px') : newSize;
    this.renderText();
    return this;
  }

  setWordWrapWidth(width) {
    if (!this.style.wordWrap) this.style.wordWrap = {};
    this.style.wordWrap.width = width;
    this.renderText();
    return this;
  }

  setAlign(align) {
    this.style.align = align;
    this.renderText();
    return this;
  }

  setLineSpacing(spacing) {
    this.style.lineSpacing = spacing;
    this.renderText();
    return this;
  }

  setStroke(color, thickness) {
    this.style.stroke = color;
    this.style.strokeThickness = thickness;
    return this;
  }

  setShadow(x, y, color, blur, shadowStroke, shadowFill) {
    return this;
  }

  setFontFamily(family) {
    return this;
  }

  setStyle(style) {
    Object.assign(this.style, style);
    this.renderText();
    return this;
  }

  renderText() {
    if (!this.canvasTexture) return;

    if (!this._text) {
      this.canvasTexture.setSize(1, 1);
      this.canvasTexture.refresh();
      this.setSize(1, 1);
      this.updateDisplayOrigin();
      return;
    }

    initKibyraFonts();

    const fontSize = parseInt(String(this.style.fontSize).replace('px', ''), 10) || 16;
    // Base de glyph do Kibyra é 22px de altura
    const scale = Math.max(0.42, Math.min(2.5, fontSize / 22));
    const palInfo = resolveFontPalette(this.style.color);

    const u1 = _kibyraImages['font_u1_' + palInfo.sheet] || _kibyraImages['font_u1_yellow'];
    const u2 = _kibyraImages['font_u2_' + palInfo.sheet] || _kibyraImages['font_u2_yellow'];
    const sheets = [u1, u2];

    const wrapW = (this.style.wordWrap && this.style.wordWrap.width) ? this.style.wordWrap.width : 0;
    const lines = wrapTextToLines(this._text, wrapW, scale);
    const lineHeight = Math.round(26 * scale + (this.style.lineSpacing || 0));

    // Mede a largura das linhas
    let maxW = 0;
    const lineMetrics = lines.map(line => {
      let lineW = 0;
      for (let i = 0; i < line.length; i++) {
        const glyph = getCharGlyph(line[i]);
        lineW += glyph ? Math.round(glyph[5] * scale) : Math.round(8 * scale);
      }
      if (lineW > maxW) maxW = lineW;
      return lineW;
    });

    const padX = 3;
    const padY = 3;
    const totalW = Math.max(1, maxW + padX * 2);
    const totalH = Math.max(1, lines.length * lineHeight + padY * 2);

    this.canvasTexture.setSize(totalW, totalH);
    const ctx = this.ctx;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, totalW, totalH);

    // Desenha cada linha com alinhamento correto
    lines.forEach((line, lineIdx) => {
      let curX = padX;
      if (this.style.align === 'center') {
        curX = padX + Math.floor((maxW - lineMetrics[lineIdx]) / 2);
      } else if (this.style.align === 'right') {
        curX = padX + (maxW - lineMetrics[lineIdx]);
      }
      const curY = padY + lineIdx * lineHeight;

      for (let i = 0; i < line.length; i++) {
        const rawCh = line[i];

        // Símbolos especiais procedurais
        if (rawCh === '•') {
          ctx.fillStyle = (palInfo.sheet === 'yellow') ? '#ffd700' : (palInfo.sheet === 'brown' ? '#8d5524' : '#ffffff');
          const dSz = Math.max(2, Math.round(3 * scale));
          ctx.fillRect(curX + Math.round(2 * scale), curY + Math.round(11 * scale), dSz, dSz);
          curX += Math.round(9 * scale);
          continue;
        }
        if (rawCh === '|') {
          ctx.fillStyle = (palInfo.sheet === 'yellow') ? '#ffd700' : (palInfo.sheet === 'brown' ? '#8d5524' : '#ffffff');
          const bW = Math.max(2, Math.round(3 * scale));
          const bH = Math.max(8, Math.round(16 * scale));
          ctx.fillRect(curX + Math.round(2 * scale), curY + Math.round(4 * scale), bW, bH);
          curX += Math.round(8 * scale);
          continue;
        }
        if (rawCh === '>') {
          ctx.fillStyle = (palInfo.sheet === 'yellow') ? '#ffd700' : (palInfo.sheet === 'brown' ? '#8d5524' : '#ffffff');
          const aSz = Math.max(2, Math.round(2.5 * scale));
          ctx.fillRect(curX + Math.round(2 * scale), curY + Math.round(8 * scale), aSz, aSz);
          ctx.fillRect(curX + Math.round(5 * scale), curY + Math.round(11 * scale), aSz, aSz);
          ctx.fillRect(curX + Math.round(2 * scale), curY + Math.round(14 * scale), aSz, aSz);
          curX += Math.round(9 * scale);
          continue;
        }
        if (rawCh === '<') {
          ctx.fillStyle = (palInfo.sheet === 'yellow') ? '#ffd700' : (palInfo.sheet === 'brown' ? '#8d5524' : '#ffffff');
          const aSz = Math.max(2, Math.round(2.5 * scale));
          ctx.fillRect(curX + Math.round(5 * scale), curY + Math.round(8 * scale), aSz, aSz);
          ctx.fillRect(curX + Math.round(2 * scale), curY + Math.round(11 * scale), aSz, aSz);
          ctx.fillRect(curX + Math.round(5 * scale), curY + Math.round(14 * scale), aSz, aSz);
          curX += Math.round(9 * scale);
          continue;
        }

        let charForLookup = rawCh;
        if (rawCh === '“' || rawCh === '”') charForLookup = '"';
        else if (rawCh === '‘' || rawCh === '’') charForLookup = "'";
        else if (rawCh === '—' || rawCh === '–') charForLookup = '-';
        else if (rawCh === 'º' || rawCh === 'ª') charForLookup = 'º';
        else if (rawCh === '⚔') charForLookup = 'X';

        const norm = charForLookup.normalize('NFD');
        const baseCh = norm[0];
        const isCedilla = norm.includes('\u0327');
        const isTilde = norm.includes('\u0303');
        const isAcute = norm.includes('\u0301');
        const isCirc = norm.includes('\u0302');
        const isGrave = norm.includes('\u0300');

        let code = baseCh.charCodeAt(0);
        if (charForLookup === 'º') {
          code = 186;
        } else if (isCedilla && (baseCh === 'c' || baseCh === 'C')) {
          code = (baseCh === 'C') ? 199 : 231;
        } else if (isTilde && (baseCh === 'n' || baseCh === 'N')) {
          code = (baseCh === 'N') ? 209 : 241;
        }

        const glyph = (typeof KIBYRA_FONT_CODES !== 'undefined' && KIBYRA_FONT_CODES[code]) ? KIBYRA_FONT_CODES[code] : (typeof KIBYRA_FONT_CODES !== 'undefined' ? KIBYRA_FONT_CODES[32] : null);
        if (!glyph) continue;

        const sheetIdx = glyph[0];
        const sx = glyph[1];
        const sy = glyph[2];
        const sw = glyph[3];
        const sh = glyph[4];
        const adv = Math.round(glyph[5] * scale);
        const yOff = Math.round((glyph[6] - 7) * scale);

        if (sw > 0 && sh > 0 && sheets[sheetIdx]) {
          ctx.drawImage(
            sheets[sheetIdx],
            sx, sy, sw, sh,
            curX, curY + yOff,
            Math.round(sw * scale), Math.round(sh * scale)
          );

          // Acentuação gráfica procedural precisa
          if (isAcute) {
            ctx.fillStyle = (palInfo.sheet === 'yellow') ? '#ffd700' : (palInfo.sheet === 'brown' ? '#8d5524' : '#ffffff');
            ctx.fillRect(curX + Math.round(sw * scale * 0.45), curY + yOff - Math.round(3 * scale), Math.round(3 * scale), Math.round(3 * scale));
          } else if (isTilde && baseCh !== 'n' && baseCh !== 'N') {
            const tildeGlyph = KIBYRA_FONT_CODES[126];
            if (tildeGlyph && sheets[1]) {
              ctx.drawImage(sheets[1], tildeGlyph[1], tildeGlyph[2], tildeGlyph[3], tildeGlyph[4], curX + Math.round(2 * scale), curY + yOff - Math.round(5 * scale), Math.round(tildeGlyph[3] * scale * 0.7), Math.round(tildeGlyph[4] * scale * 0.6));
            }
          } else if (isCirc) {
            ctx.fillStyle = (palInfo.sheet === 'yellow') ? '#ffd700' : (palInfo.sheet === 'brown' ? '#8d5524' : '#ffffff');
            const cX = curX + Math.round(sw * scale * 0.4);
            const cY = curY + yOff - Math.round(4 * scale);
            const sz = Math.round(2.5 * scale);
            ctx.fillRect(cX, cY, sz, sz);
            ctx.fillRect(cX - sz, cY + sz, sz, sz);
            ctx.fillRect(cX + sz, cY + sz, sz, sz);
          } else if (isGrave) {
            ctx.fillStyle = (palInfo.sheet === 'yellow') ? '#ffd700' : (palInfo.sheet === 'brown' ? '#8d5524' : '#ffffff');
            ctx.fillRect(curX + Math.round(sw * scale * 0.35), curY + yOff - Math.round(3 * scale), Math.round(3 * scale), Math.round(3 * scale));
          }
        }
        curX += adv;
      }
    });

    // Aplica colorização/tingimento dinâmico para Verde, Vermelho, Ciano, Roxo
    if (palInfo.tint) {
      const imgData = ctx.getImageData(0, 0, totalW, totalH);
      const data = imgData.data;
      const tR = palInfo.tint[0];
      const tG = palInfo.tint[1];
      const tB = palInfo.tint[2];
      for (let p = 0; p < data.length; p += 4) {
        if (data[p + 3] > 20 && (data[p] + data[p + 1] + data[p + 2]) > 70) {
          data[p] = Math.min(255, Math.round(data[p] * tR));
          data[p + 1] = Math.min(255, Math.round(data[p + 1] * tG));
          data[p + 2] = Math.min(255, Math.round(data[p + 2] * tB));
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }

    this.canvasTexture.refresh();
    if (this.frame) {
      this.frame.setSize(totalW, totalH);
    }
    this.setSize(totalW, totalH);
    this.updateDisplayOrigin();
  }

  destroy(fromScene) {
    _activePixelTexts.delete(this);
    if (this.canvasTexture && this.scene && this.scene.textures) {
      this.scene.textures.remove(this.textureKey);
    }
    super.destroy(fromScene);
  }
}

/**
 * Função de fábrica global para criar textos pixel art
 */
function createPixelText(scene, x, y, text, style = {}) {
  return new PixelText(scene, x, y, text, style);
}

// Hook Global Hi-DPI para Textos Cristalinos em Phaser.GameObjects.GameObjectFactory
if (typeof Phaser !== 'undefined' && Phaser.GameObjects && Phaser.GameObjects.GameObjectFactory) {
  Phaser.GameObjects.GameObjectFactory.prototype.text = function(x, y, text, style) {
    if (style && style.pixelFont === true) {
      return new PixelText(this.scene, x, y, text, style);
    }
    const enhancedStyle = Object.assign({
      resolution: 2
    }, style || {});
    if (!enhancedStyle.padding) {
      enhancedStyle.padding = { left: 2, right: 2, top: 2, bottom: 2 };
    }
    const txtObj = new Phaser.GameObjects.Text(this.scene, x, y, text, enhancedStyle);
    if (enhancedStyle.originX !== undefined && enhancedStyle.originY !== undefined) {
      txtObj.setOrigin(enhancedStyle.originX, enhancedStyle.originY);
    }
    if (txtObj.texture && txtObj.texture.setFilter && typeof Phaser.Textures !== 'undefined') {
      txtObj.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
    }
    const _origUpdateText = txtObj.updateText.bind(txtObj);
    txtObj.updateText = function() {
      const res = _origUpdateText();
      if (this.texture && this.texture.setFilter && typeof Phaser.Textures !== 'undefined') {
        this.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
      }
      return res;
    };
    this.displayList.add(txtObj);
    return txtObj;
  };
  Phaser.GameObjects.GameObjectFactory.prototype.pixelText = function(x, y, text, style) {
    return new PixelText(this.scene, x, y, text, style);
  };
}
