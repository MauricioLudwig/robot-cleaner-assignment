import { Direction, ICommand, ICoordinate, ICleanTiles } from './definitions';

export class Robot {
  cleanTiles: ICleanTiles = {};

  constructor(
    public currentPosition: ICoordinate,
    public commands: ICommand[]
  ) {
    const { x, y } = currentPosition;
    this.cleanTiles[y] = { [x]: true };
  }

  sweep(): void {
    this.commands.forEach((command) => {
      this.traverseFloor(command);
    });
  }

  traverseFloor({ direction, steps }: ICommand): void {
    for (let i = 1; i <= steps; i++) {
      const position = { ...this.currentPosition };

      switch (direction) {
        case Direction.North:
          position.y++;
          break;
        case Direction.East:
          position.x++;
          break;
        case Direction.South:
          position.y--;
          break;
        case Direction.West:
          position.x--;
          break;
      }

      if (Robot.isOutOfBounds(position)) {
        break;
      }

      this.currentPosition = { ...position };
      this.savePosition(position);
    }
  }

  static isOutOfBounds({ x, y }: ICoordinate) {
    return [x, y].some((o) => o > 100000 || o < -100000);
  }

  savePosition({ x, y }: ICoordinate): void {
    if (!this.cleanTiles[y]) {
      this.cleanTiles[y] = {};
    }

    this.cleanTiles[y][x] = true;
  }

  get numberOfCleanTiles(): number {
    return Object.values(this.cleanTiles)
      .map((o) => Object.keys(o))
      .flat().length;
  }
}
