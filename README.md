# tut1_groupA

### Individual Animated Interpretation of *Wheels of Fortune*  
**Animation Method:** Perlin Noise and Randomness  
**Student:** [你的英文名字]  
**Unikey:** [你的 Unikey]  

---

## How to interact with this work

- Move the mouse over different wheels to enlarge them (hover interaction preserved from group code).
- Watch as the wheels dynamically change their rotation speed over time, driven by Perlin noise.
- Observe the central concentric circles gradually shifting their color hue based on Perlin noise and random values.

---

## Individual approach to animating the group code

For my individual animation, I chose the **Perlin Noise and Randomness** method to animate the group image. I implemented two key dynamic behaviors:

1. **Rotation Speed Animation:**  
   The rotation speed of each wheel is dynamically controlled by Perlin noise. This creates an organic and constantly evolving spinning effect, where each wheel smoothly speeds up and slows down over time.

2. **Color Animation:**  
   The hue of the innermost concentric circle of each wheel is animated using Perlin noise combined with a random per-wheel color shift speed. This results in a continuously evolving color scheme that adds visual richness and variation to the artwork.

---

## How this is unique from other group members

- Unlike the original group version where rotation speeds were fixed, my version introduces **smooth, non-repetitive changes in rotation speed** for each wheel using Perlin noise.
- The **central ring color hue** of each wheel is animated over time, making the visual result more dynamic and alive.
- This approach introduces both temporal and color-based variation, providing a strong contrast with group members using fixed speeds or time-based triggers.

---

## References and inspiration

- [p5.js Reference - noise()](https://p5js.org/reference/#/p5/noise)  
- [p5.js Reference - random()](https://p5js.org/reference/#/p5/random)  
- [p5.js Reference - map()](https://p5js.org/reference/#/p5/map)  
- The concept of using Perlin noise to drive rotation and color shift was inspired by various creative coding examples showcasing organic motion patterns.

---

## Technical explanation of how my code works

### Rotation Speed Animation:

In the `Wheel` class, I added a new `noiseOffset` property for each wheel. This offset is used with p5.js's `noise()` function to generate a smooth noise value every frame:

```js
let noiseValue = noise(this.noiseOffset);
this.rotationSpeed = map(noiseValue, 0, 1, 0.1, 1);
this.angle += this.rotationSpeed;
this.noiseOffset += 0.01;