import Container from "./Container";
import GridCanvas, { COLORS, GRID_DIMENSION, randomGrid } from "./GridCanvas";
import _ from 'lodash';

const ROTATION_OPTIONS = Array(3).fill(0).map((v, idx) => (idx + 1) * Math.PI / 2);

export default function GridTest() {
  const firstGridCanvas = GridCanvas();
  const secondGridCanvas = GridCanvas();

  const container = Container([
    firstGridCanvas, secondGridCanvas
  ]);

  container.classList = ['grid-container'];

  container.refresh = () => {
    firstGridCanvas.grid = randomGrid();
    const secondGrid = firstGridCanvas.grid;
    firstGridCanvas.draw();

    container.isMatch = true;

    if (Math.random() > 0.5) {
      const changedGridIdx = Math.floor(Math.random() * (GRID_DIMENSION * GRID_DIMENSION));
      secondGrid[changedGridIdx] = _.sample(_.without(COLORS, secondGrid[changedGridIdx]));

      container.isMatch = false;
    }

    secondGridCanvas.grid = secondGrid;
    secondGridCanvas.rotation = _.sample(ROTATION_OPTIONS);
    secondGridCanvas.draw();
  };

  container.start = () => {
    container.refresh()
  };

  return container;
}
