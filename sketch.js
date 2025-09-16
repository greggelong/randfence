// Corrugated panels, randomly placed
// Some angled, some horizontal
let grd;
let panelLength = 150; // length of each panel top edge
let panelHeight = 100; // vertical depth
let angleDeg = 45; // angled panel steepness
let ribDensity = 24; // ribs across panel
let numPanels = 20; // how many panels to draw
let cnv;
function preload() {
  grd = loadImage("g16.png");
}

function setup() {
  cnv = createCanvas(800, 800);
  let cx = (windowWidth - width) / 2;
  let cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);
  grd.resize(width, height);

  drawthem();
}

function touchStarted() {
  drawthem();
}

function drawthem() {
  background(255);
  image(grd, 0, 0);

  for (let i = 0; i < numPanels; i++) {
    let x = random(width - panelLength * 2) + panelLength;
    let y = random(height - panelHeight * 2.3) + 40;

    // 50% chance: angled, 50%: horizontal
    // let ang = random() < 0.5 ? angleDeg : 0;
    // 3 options
    let options = [0, 45, 135];
    let ang = random(options);

    drawPanel(x, y, panelLength, panelHeight, ang, ribDensity);
  }
}

function drawPanel(x, y, len, h, angleDeg, ribs) {
  let a = radians(angleDeg);

  // top edge endpoints
  let topA = createVector(x, y);
  let topB = createVector(x + cos(a) * len, y + sin(a) * len);

  // bottom edge endpoints (shifted downward)
  let botA = createVector(topA.x, topA.y + h);
  let botB = createVector(topB.x, topB.y + h);

  // draw corrugation ribs
  for (let k = 0; k < ribs; k++) {
    let u0 = k / ribs;
    let u1 = (k + 1) / ribs;
    let ta = p5.Vector.lerp(topA, topB, u0);
    let tb = p5.Vector.lerp(topA, topB, u1);
    let ba = p5.Vector.lerp(botA, botB, u0);
    let bb = p5.Vector.lerp(botA, botB, u1);

    let c1 = color(30, 120, 220);
    let c2 = color(10, 70, 160);
    let c = lerpColor(c1, c2, k / ribs);
    if (k % 2 === 0) c = lerpColor(c, color(0, 0, 30), 0.3);

    fill(c);
    quad(ta.x, ta.y, tb.x, tb.y, bb.x, bb.y, ba.x, ba.y);
  }
}
