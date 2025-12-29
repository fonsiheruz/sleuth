/**
 * p5.js — Kandinsky-like composition with a hand-painted animation vibe:
 * watercolor washes, warm paper, wobbly ink, soft shading.
 * Paste into https://editor.p5js.org/
 */

let PALETTE;

function setup() {
  createCanvas(720, 720);
  angleMode(DEGREES);
  pixelDensity(2);
  noLoop();

  PALETTE = {
    paper: color(249, 244, 232),
    paper2: color(243, 236, 223),
    ink: color(35, 30, 28, 170),
    inkSoft: color(35, 30, 28, 90),

    teal: color(78, 156, 155, 170),
    sand: color(214, 184, 127, 170),

    red: color(214, 62, 64, 200),
    pink: color(239, 170, 200, 170),
    purple: color(118, 78, 122, 180),
    yellow: color(242, 216, 110, 190),
    green: color(105, 160, 135, 170),
    blue: color(88, 120, 190, 175),

    soot: color(22, 20, 19, 215),
    orange: color(244, 145, 72, 200),
  };

  randomSeed(9);
  noiseSeed(9);
}

function draw() {
  // warm paper base with subtle variation
  paperWash();

  const cx = width * 0.53;
  const cy = height * 0.49;

  // watercolor diagonal bands (soft edges)
  watercolorBand(-35, width * 0.5, PALETTE.sand);
  watercolorBand(35, width * 0.52, PALETTE.teal);

  // ring (wobbly ink with soft shadow)
  const ringR = width * 0.355;
  const ringW = width * 0.028;
  inkRing(cx, cy, ringR, ringW);

  // clip interior
  push();
  clipCircle(cx, cy, ringR - ringW * 0.65);

  // watercolor discs (layered washes)
  washDisc(cx + 10, cy + 35, width * 0.21, color(90, 110, 90, 120));
  washDisc(cx - 10, cy - 40, width * 0.115, PALETTE.pink);
  washDisc(cx + 30, cy - 25, width * 0.1, PALETTE.red);
  washDisc(cx + 115, cy + 5, width * 0.13, PALETTE.teal);
  washDisc(cx + 155, cy - 40, width * 0.09, PALETTE.purple);
  washDisc(cx + 130, cy + 70, width * 0.09, PALETTE.blue);
  washDisc(cx - 55, cy + 25, width * 0.075, PALETTE.green);
  washDisc(cx + 95, cy + 85, width * 0.16, PALETTE.yellow);

  // tiny dots inside ring
  const dots = [
    [cx - 210, cy - 5, 20, PALETTE.red],
    [cx - 250, cy + 40, 10, PALETTE.blue],
    [cx - 185, cy + 105, 30, color(235, 195, 150, 175)],
    [cx - 45, cy + 135, 26, color(232, 130, 130, 165)],
    [cx + 10, cy + 90, 34, color(205, 55, 55, 190)],
    [cx + 210, cy + 95, 26, color(236, 170, 200, 160)],
    [cx + 225, cy - 10, 18, PALETTE.soot],
    [cx + 90, cy - 160, 14, color(215, 70, 70, 190)],
    [cx + 50, cy + 5, 22, PALETTE.orange],
    [cx + 5, cy + 5, 10, PALETTE.soot],
    [cx + 155, cy - 15, 14, PALETTE.soot],
  ];
  for (const [x, y, d, c] of dots) washDisc(x, y, d, c);

  // target
  paintedTarget(cx + 5, cy + 10, width * 0.078);

  // sketchy construction lines
  constructionLines(cx, cy);

  // hatch marks
  hatches(cx - 210, cy - 25, 3);
  hatches(cx + 175, cy - 85, 3);
  hatches(cx + 190, cy + 110, 2);
  hatches(cx - 140, cy + 125, 2);

  pop(); // unclip

  // a small dot near top inside ring
  washDisc(cx - 20, cy - ringR + 12, 10, color(215, 70, 70, 210));

  // final grain + tiny fiber specks
  addGrain(12000);
  addFibers(140);
}

/* ---------- LOOK HELPERS ---------- */

function paperWash() {
  background(PALETTE.paper);
  // mottled wash
  noStroke();
  for (let i = 0; i < 1400; i++) {
    const x = random(width),
      y = random(height);
    const r = random(8, 30);
    const a = random(4, 12);
    fill(red(PALETTE.paper2), green(PALETTE.paper2), blue(PALETTE.paper2), a);
    ellipse(x, y, r, r);
  }
}

function watercolorBand(theta, bandW, c) {
  push();
  translate(width / 2, height / 2);
  rotate(theta);

  // soft-edged band: stack multiple translucent rectangles with jitter
  for (let i = 0; i < 14; i++) {
    const w = width * 1.7;
    const h = bandW + random(-18, 18);
    const a = 18 + i * 2;
    fill(red(c), green(c), blue(c), a);
    noStroke();
    rectMode(CENTER);
    rect(random(-8, 8), random(-8, 8), w, h, 30);
  }

  // subtle edge darkening like watercolor pooling
  noFill();
  stroke(0, 0, 0, 25);
  strokeWeight(2);
  rectMode(CENTER);
  rect(0, 0, width * 1.7, bandW, 30);

  pop();
}

function washDisc(x, y, d, c) {
  push();
  // watercolor fill by layering blobby ellipses
  noStroke();
  for (let i = 0; i < 18; i++) {
    const rr = d * random(0.78, 1.05);
    const a = map(i, 0, 17, 10, alpha(c));
    fill(red(c), green(c), blue(c), a * 0.75);
    ellipse(
      x + random(-d * 0.03, d * 0.03),
      y + random(-d * 0.03, d * 0.03),
      rr,
      rr
    );
  }

  // soft shading (fake radial gradient)
  for (let i = 0; i < 10; i++) {
    const t = i / 9;
    const rr = lerp(d * 0.95, d * 0.55, t);
    fill(0, 0, 0, 10 * (1 - t));
    ellipse(x + d * 0.06, y + d * 0.06, rr, rr);
  }

  // ink outline, slightly wobbly
  stroke(PALETTE.inkSoft);
  strokeWeight(max(1.1, d * 0.015));
  noFill();
  wobblyEllipse(x, y, d * 0.98, 44, d * 0.015);

  pop();
}

function inkRing(x, y, r, w) {
  push();
  // subtle shadow under ring
  noFill();
  stroke(0, 0, 0, 45);
  strokeWeight(w * 1.05);
  wobblyEllipse(x + 3, y + 4, r * 2, 120, 1.8);

  // main ink ring
  stroke(PALETTE.soot);
  strokeWeight(w);
  wobblyEllipse(x, y, r * 2, 140, 1.6);

  // dry-brush highlights
  stroke(255, 255, 255, 35);
  strokeWeight(w * 0.18);
  for (let k = 0; k < 7; k++) {
    const a0 = random(0, 360);
    const a1 = a0 + random(16, 34);
    arc(x, y, r * 2, r * 2, a0, a1);
  }
  pop();
}

function paintedTarget(x, y, d) {
  push();
  // outer ring
  stroke(PALETTE.ink);
  strokeWeight(d * 0.12);
  noFill();
  wobblyEllipse(x, y, d, 70, 1.0);

  washDisc(x, y, d * 0.72, PALETTE.orange);
  washDisc(x, y, d * 0.4, PALETTE.red);

  // center dot
  noStroke();
  fill(PALETTE.soot);
  ellipse(x, y, d * 0.14, d * 0.14);
  pop();
}

function constructionLines(cx, cy) {
  push();
  stroke(PALETTE.inkSoft);
  strokeWeight(2);
  strokeCap(ROUND);

  const lines = [
    [cx - 290, cy - 20, cx + 270, cy + 95],
    [cx - 250, cy + 120, cx + 275, cy - 15],
    [cx - 240, cy - 110, cx + 200, cy + 155],
    [cx - 200, cy + 60, cx + 285, cy + 10],
    [cx - 140, cy - 170, cx + 60, cy + 200],
    [cx - 10, cy - 210, cx - 90, cy + 210],
    [cx + 40, cy - 200, cx + 210, cy + 170],
    [cx + 170, cy - 150, cx + 140, cy + 210],
  ];

  for (const L of lines) wobblyLine(...L, 1.9);

  // thinner second pass
  stroke(PALETTE.inkSoft);
  strokeWeight(1.2);
  const thin = [
    [cx - 270, cy + 10, cx + 260, cy - 70],
    [cx - 190, cy - 140, cx + 265, cy + 40],
    [cx - 265, cy + 65, cx + 245, cy + 145],
    [cx - 70, cy - 210, cx + 30, cy + 210],
  ];
  for (const L of thin) wobblyLine(...L, 1.5);

  // little cross ticks
  stroke(PALETTE.ink);
  strokeWeight(1.0);
  for (let i = 0; i < 22; i++) {
    const x = cx + random(-240, 240);
    const y = cy + random(-190, 190);
    if (dist(x, y, cx, cy) > width * 0.3) continue;
    const len = random(10, 22);
    wobblyLine(x - len, y, x + len, y, 0.6);
    wobblyLine(x, y - len, x, y + len, 0.6);
  }

  pop();
}

function hatches(x, y, count) {
  push();
  stroke(PALETTE.inkSoft);
  strokeWeight(1.1);
  for (let i = 0; i < count; i++) {
    const dx = i * 6;
    wobblyLine(x + dx, y, x + dx + 22, y - 18, 0.8);
    wobblyLine(x + dx + 5, y + 10, x + dx + 27, y - 8, 0.8);
  }
  pop();
}

/* ---------- GEOMETRY / TEXTURE ---------- */

function wobblyLine(x1, y1, x2, y2, amp) {
  const steps = 26;
  beginShape();
  noFill();
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = lerp(x1, x2, t);
    const y = lerp(y1, y2, t);
    const jx = (noise(x * 0.01, y * 0.01) - 0.5) * amp * 2;
    const jy = (noise(100 + x * 0.01, 100 + y * 0.01) - 0.5) * amp * 2;
    vertex(x + jx, y + jy);
  }
  endShape();
}

function wobblyEllipse(x, y, d, steps, amp) {
  beginShape();
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * 360;
    const rr = d / 2;
    const nx = cos(a) * rr;
    const ny = sin(a) * rr;
    const n = noise((x + nx) * 0.01, (y + ny) * 0.01);
    const wob = (n - 0.5) * amp * 2;
    vertex(x + cos(a) * (rr + wob), y + sin(a) * (rr + wob));
  }
  endShape();
}

function addGrain(n) {
  push();
  noStroke();
  for (let i = 0; i < n; i++) {
    const x = random(width),
      y = random(height);
    const a = random(6, 18);
    fill(0, 0, 0, a);
    rect(x, y, 1, 1);
  }
  pop();
}

function addFibers(n) {
  push();
  stroke(0, 0, 0, 18);
  strokeWeight(1);
  for (let i = 0; i < n; i++) {
    const x = random(width);
    const y = random(height);
    const len = random(20, 80);
    const ang = random(0, 180);
    const x2 = x + cos(ang) * len;
    const y2 = y + sin(ang) * len;
    line(x, y, x2, y2);
  }
  pop();
}

// clip to circle using canvas clip; restored automatically on pop()
function clipCircle(x, y, r) {
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.arc(x, y, r, 0, Math.PI * 2);
  drawingContext.clip();

  // patch pop to restore clip once per pop (safe for this sketch)
  if (!window.__patchedPop) {
    window.__patchedPop = true;
    const _pop = window.pop;
    window.pop = function () {
      try {
        drawingContext.restore();
      } catch (e) {}
      return _pop();
    };
  }
}
