class Wheel {
  constructor(x, y, baseRadius) {
    this.x = x;
    this.y = y;

    // Base radius for scaling animation
    this.baseRadius = baseRadius;
    this.radius = baseRadius;
    this.targetRadius = baseRadius;

    // Rotation properties with Perlin noise
    this.angle = random(360);
    this.noiseOffset = random(1000); // NEW → 用于 Perlin noise 动态 rotationSpeed

    // Colors
    this.colors = Array.from({ length: 7 }, () => randomColor());
    this.pinkRingColor = randomColor();
    this.yellowSpikesColor = randomColor();
    this.outerCircleColor = randomColor();
    this.dotColor = randomColor();
    this.dotBgColor = randomColor();
    this.finalCircleColor = randomColor();
    this.curvedLineColor = randomColor();
  }

  update() {
    // NEW → 用 Perlin noise 驱动 rotationSpeed
    let noiseValue = noise(this.noiseOffset);
    this.rotationSpeed = map(noiseValue, 0, 1, 0.1, 1);
    this.angle += this.rotationSpeed;
    this.noiseOffset += 0.01;

    // Hover scaling
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.radius) {
      this.targetRadius = this.baseRadius * 1.5;
    } else {
      this.targetRadius = this.baseRadius;
    }
    this.radius = lerp(this.radius, this.targetRadius, 0.4);
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    angleMode(DEGREES);

    // Central concentric circles
    noStroke();
    let radii = [this.radius * 0.37, this.radius * 0.32, this.radius * 0.27, this.radius * 0.22, this.radius * 0.17, this.radius * 0.12, this.radius * 0.07];
    for (let i = 0; i < this.colors.length; i++) {
      fill(this.colors[i]);
      ellipse(0, 0, radii[i] * 2);
    }

    // (其余 display 部分不变，保持原样)
    // Ring background
    let pinkRadius = this.radius * 0.45;
    fill(this.pinkRingColor);
    ellipse(0, 0, pinkRadius * 2);

    // Spikes
    stroke(this.yellowSpikesColor);
    strokeWeight(2);
    let spikes = 50;
    for (let i = 0; i < spikes; i++) {
      let angle = (360 / spikes) * i;
      let x1 = cos(angle) * (pinkRadius - 6);
      let y1 = sin(angle) * (pinkRadius - 6);
      let x2 = cos(angle) * (pinkRadius + 6);
      let y2 = sin(angle) * (pinkRadius + 6);
      line(x1, y1, x2, y2);
    }

    // Outer circle
    noFill();
    stroke(this.outerCircleColor);
    strokeWeight(3);
    ellipse(0, 0, (pinkRadius + 8) * 2);

    // Outer rings with dots
    let dotRings = 6;
    let initialRadius = pinkRadius + 18;
    let ringSpacing = 13;
    for (let ring = 0; ring < dotRings; ring++) {
      let currentRadius = initialRadius + ring * ringSpacing;
      let dotsNum = 80 - ring * 8;
      let dotSize = 7 - ring * 0.7;
      strokeWeight(ringSpacing - 2);
      stroke(this.dotBgColor);
      noFill();
      ellipse(0, 0, currentRadius * 2);
      strokeWeight(0);
      fill(this.dotColor);
      for (let j = 0; j < dotsNum; j++) {
        let angle = (360 / dotsNum) * j;
        ellipse(cos(angle) * currentRadius, sin(angle) * currentRadius, dotSize);
      }
    }

    // Final outer ring
    noFill();
    stroke(this.finalCircleColor);
    strokeWeight(6);
    ellipse(0, 0, (initialRadius + (dotRings - 1) * ringSpacing + 10) * 2);

    // Curved red line
    stroke(this.curvedLineColor);
    strokeWeight(5);
    noFill();
    beginShape();
    vertex(0, 0);
    bezierVertex(30, -20, 60, -30, 90, -60);
    endShape();

    pop();
  }
}

function randomColor() {
  return color(random(255), random(255), random(255));
}