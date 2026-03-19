// src/components/Particle.js
// Particle class for the Starfield component

/**
 * Particle class - the blueprint for every star
 * Handles particle position, velocity, mouse interaction, and rendering
 */
class Particle {
  /**
   * @param {number} x - Initial x position
   * @param {number} y - Initial y position
   * @param {number} radius - Particle radius
   * @param {string} color - Particle fill color
   * @param {boolean} isConstellation - Whether this is a constellation star (anchored to home position)
   */
  constructor(x, y, radius, color, isConstellation = false) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    // 'home' is the original constellation position
    this.homeX = x;
    this.homeY = y;

    // 'vx'/'vy' is the velocity for the "free-floating" effect
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;

    this.isConstellation = isConstellation;

    // How much the particle is affected by forces
    this.density = Math.random() * 30 + 10;

    // Grid cell indices (updated each frame by SpatialGrid)
    this.gridX = 0;
    this.gridY = 0;
  }

  /**
   * Draw the particle on the canvas
   * @param {CanvasRenderingContext2D} ctx - Canvas 2D context
   */
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  /**
   * Update particle position and apply physics
   * @param {CanvasRenderingContext2D} ctx - Canvas 2D context
   * @param {number} canvasWidth - Canvas width
   * @param {number} canvasHeight - Canvas height
   * @param {Object} mouse - Mouse position and radius { x, y, radius }
   */
  update(ctx, canvasWidth, canvasHeight, mouse) {
    // --- 1. Mouse Interaction (Repulsion) ---
    // This is the "changes trajectory" effect
    if (mouse.x !== null && mouse.y !== null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        // Calculate a force based on how close the mouse is
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (mouse.radius - distance) / mouse.radius;

        // Apply the force, slowed by the particle's "density"
        this.vx -= forceDirectionX * force * (1 / this.density);
        this.vy -= forceDirectionY * force * (1 / this.density);
      }
    }

    // --- 2. Spring Force (For Constellations) ---
    // This pulls the constellation stars back to their "home"
    if (this.isConstellation) {
      let homeDX = this.homeX - this.x;
      let homeDY = this.homeY - this.y;
      this.vx += homeDX * 0.005 * (1 / this.density);
      this.vy += homeDY * 0.005 * (1 / this.density);
    }

    // --- 3. Friction & Movement ---
    // This makes them slow down naturally
    this.vx *= 0.96;
    this.vy *= 0.96;

    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // --- 4. Handle Screen Edges ---
    // This makes the "free-floating" stars wrap around
    if (!this.isConstellation) {
      if (this.x > canvasWidth) this.x = 0;
      if (this.x < 0) this.x = canvasWidth;
      if (this.y > canvasHeight) this.y = 0;
      if (this.y < 0) this.y = canvasHeight;
    }

    this.draw(ctx);
  }
}

export default Particle;
