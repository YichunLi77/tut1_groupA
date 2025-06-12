# Wheels of Fortune – p5.js Rendering

This is the A part of our group work: data generation and rendering structure for Pacita Abad's *Wheels of Fortune*.

## Files

- `index.html`: main HTML entry
- `sketch.js`: p5.js setup & draw loop
- `wheel.js`: Wheel class and pattern drawing
- `style.css`: basic styles

## My Contribution

I created the data and rendering system. Each Wheel has position, rotation, radius, color palette, and pattern style (`dots`, `concentric`, `lines`). This modular design allows easy extension for animation and interaction by other teammates.

## How to Run

1. Clone the repo
2. Open `index.html` in browser


# Rotation Animation – Added by Katherine

I implemented the rotation functionality (part B) for each wheel object. 

## My contribution:
- Adding `angle` and `rotationSpeed` to each `Wheel` instance in `wheel.js`
- Creating an `update()` method to increment the angle on each frame
- Modifying the `draw()` loop in `sketch.js` to call `update()` and enable continuous animation

## How to adjust the rotation speed of each wheel:
```js
// Fixed speed for all wheels (same rotation speed)
this.rotationSpeed = 0.5;

// Random speed for variation between wheels
this.rotationSpeed = random(0.2, 1);
```

---

## C. Hover-Scale Interaction (Smooth Enlarge on Hover)

**Files**

* `wheel.js` — hover detection and smooth scaling logic in `update()` and `display()`

**My Contribution**

I implemented the hover‐scale interaction (part C) to enhance the user experience with a dynamic visual response when hovering over each wheel.

**How it works**

- In the `update()` method of `Wheel`, I compute the distance from the mouse pointer to the wheel center.
- If the pointer is within the wheel radius, I set a larger `targetRadius` (1.5× base radius).
- If not, I reset `targetRadius` back to the base radius.
- I use `lerp()` to smoothly animate `radius` toward `targetRadius`, creating a gradual scaling effect rather than an abrupt jump.

**Core Snippet**

```js
let d = dist(mouseX, mouseY, this.x, this.y);
if (d < this.radius) {
  this.targetRadius = this.baseRadius * 1.5;
} else {
  this.targetRadius = this.baseRadius;
}

this.radius = lerp(this.radius, this.targetRadius, 0.4);

---

## D. Collision Response (Neighbor Displacement)

**Files**

* `sketch.js` — collision logic lives here

**My Contribution**

* Wrote `resolveCollisions()` to:

  1. Compute each hovered wheel’s **outermost ring radius** (`outerA`) and each neighbor’s (`outerB`)
  2. Compare their center‐to‐center distance with `outerA + outerB`
  3. Push overlapping neighbors apart by half the overlap along the normalized direction vector (× 1.1 for a livelier effect)

**Core Snippet**

```js
function draw() {
  background('#2E5F72');

  // 1) Update rotation, hover & radius for all wheels
  for (let w of wheels) {
    w.update();
  }

  // 2) Ripple‐style push using outer ring boundaries
  resolveCollisions();

  // 3) Render all wheels
  for (let w of wheels) {
    w.display();
  }
}

function resolveCollisions() {
  const dotRings    = 6;
  const ringSpacing = 13;
  const extraOffset = 10;

  for (let i = 0; i < wheels.length; i++) {
    const a = wheels[i];
    if (!a.isHovered) continue;  // only the hovered wheel pushes neighbors

    // outer radius for hovered wheel
    const pinkA  = a.radius * 0.45;
    const outerA = pinkA + 18 + (dotRings - 1) * ringSpacing + extraOffset;

    for (let j = 0; j < wheels.length; j++) {
      if (i === j) continue;
      const b = wheels[j];

      // outer radius for neighbor wheel
      const pinkB  = b.radius * 0.45;
      const outerB = pinkB + 18 + (dotRings - 1) * ringSpacing + extraOffset;

      const dx        = b.x - a.x;
      const dy        = b.y - a.y;
      const dist      = sqrt(dx * dx + dy * dy);
      const threshold = outerA + outerB;

      // push apart if overlapping
      if (dist < threshold && dist > 0) {
        const overlap = (threshold - dist) / 2;
        const ux      = dx / dist;
        const uy      = dy / dist;

        // move neighbor outward
        b.x += ux * overlap * 1.1;
        b.y += uy * overlap * 1.1;
      }
    }
  }
}
```
