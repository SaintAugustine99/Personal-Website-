// src/components/SpatialGrid.js
// Spatial partitioning grid for efficient particle neighbor lookups
// Reduces O(n^2) complexity to approximately O(n) for connection checks

/**
 * SpatialGrid class for spatial partitioning
 * Divides the canvas into cells and tracks which particles are in each cell
 * This allows efficient neighbor lookups - only checking particles in nearby cells
 */
class SpatialGrid {
  /**
   * @param {number} canvasWidth - Canvas width
   * @param {number} canvasHeight - Canvas height
   * @param {number} cellSize - Size of each grid cell (should be >= maxDistance for connections)
   */
  constructor(canvasWidth, canvasHeight, cellSize = 100) {
    this.cellSize = cellSize;
    this.cols = Math.ceil(canvasWidth / cellSize);
    this.rows = Math.ceil(canvasHeight / cellSize);
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    // 2D array of cells, each cell contains array of particle indices
    this.grid = [];
    this.clear();
  }

  /**
   * Clear all cells
   */
  clear() {
    this.grid = [];
    for (let i = 0; i < this.cols * this.rows; i++) {
      this.grid[i] = [];
    }
  }

  /**
   * Resize the grid when canvas dimensions change
   * @param {number} canvasWidth - New canvas width
   * @param {number} canvasHeight - New canvas height
   */
  resize(canvasWidth, canvasHeight) {
    this.cols = Math.ceil(canvasWidth / this.cellSize);
    this.rows = Math.ceil(canvasHeight / this.cellSize);
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.clear();
  }

  /**
   * Get the cell index for a given position
   * @param {number} x - X position
   * @param {number} y - Y position
   * @returns {{cellX: number, cellY: number}} Cell coordinates
   */
  getCellCoords(x, y) {
    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);
    return {
      cellX: Math.max(0, Math.min(cellX, this.cols - 1)),
      cellY: Math.max(0, Math.min(cellY, this.rows - 1))
    };
  }

  /**
   * Get the flat index for a cell
   * @param {number} cellX - Cell X coordinate
   * @param {number} cellY - Cell Y coordinate
   * @returns {number} Flat array index
   */
  getCellIndex(cellX, cellY) {
    return cellY * this.cols + cellX;
  }

  /**
   * Insert all particles into the grid
   * @param {Array} particles - Array of Particle objects
   */
  populate(particles) {
    this.clear();

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      const { cellX, cellY } = this.getCellCoords(particle.x, particle.y);

      // Store grid position on particle for quick access
      particle.gridX = cellX;
      particle.gridY = cellY;

      const cellIndex = this.getCellIndex(cellX, cellY);
      this.grid[cellIndex].push(i);
    }
  }

  /**
   * Get all potential neighbor particles for a given particle
   * Returns particles in the same cell and all 8 adjacent cells
   * @param {number} particleIndex - Index of the particle in the particles array
   * @param {Array} particles - Array of all particles
   * @returns {Array<number>} Array of particle indices that are potential neighbors
   */
  getNeighborIndices(particleIndex, particles) {
    const particle = particles[particleIndex];
    const neighbors = [];

    // Check the 3x3 grid of cells centered on the particle's cell
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const checkX = particle.gridX + dx;
        const checkY = particle.gridY + dy;

        // Skip cells outside the grid
        if (checkX < 0 || checkX >= this.cols || checkY < 0 || checkY >= this.rows) {
          continue;
        }

        const cellIndex = this.getCellIndex(checkX, checkY);
        const cellParticles = this.grid[cellIndex];

        // Add all particles in this cell (except self)
        for (let i = 0; i < cellParticles.length; i++) {
          const neighborIndex = cellParticles[i];
          // Only add neighbors with higher indices to avoid duplicate pairs
          if (neighborIndex > particleIndex) {
            neighbors.push(neighborIndex);
          }
        }
      }
    }

    return neighbors;
  }
}

export default SpatialGrid;
