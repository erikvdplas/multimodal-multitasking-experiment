import _ from 'lodash'

export const COLORS = ['red', 'blue', 'green', 'yellow'];

export const GRID_DIMENSION = 4;
const GRID_SIZE = 200;
const BLOCK_SIZE = GRID_SIZE / GRID_DIMENSION;

export const randomGrid = () => Array(GRID_DIMENSION * GRID_DIMENSION)
  .fill(0)
  .map(() => _.sample(COLORS));

function GridCanvas(grid, rotation) {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', GRID_SIZE);
  canvas.setAttribute('height', GRID_SIZE);

  if (!grid) {
    grid = randomGrid();
  }

  canvas.draw = () => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, GRID_SIZE, GRID_SIZE);

    ctx.translate(GRID_SIZE / 2, GRID_SIZE / 2);
    ctx.rotate(canvas.rotation);
    ctx.translate(-GRID_SIZE / 2, -GRID_SIZE / 2);

    for (var i = 0; i < GRID_DIMENSION; i++) {
      for (var j = 0; j < GRID_DIMENSION; j++) {
        ctx.beginPath();
        ctx.rect(i * BLOCK_SIZE, j * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        ctx.fillStyle = canvas.grid[i * GRID_DIMENSION + j];
        ctx.fill();
      }
    }

    ctx.resetTransform();
    ctx.restore();
  };

  canvas.grid = grid;
  canvas.rotation = rotation || 0;
  canvas.draw();

  return canvas;
}

export default GridCanvas;
