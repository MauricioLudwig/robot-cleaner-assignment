export enum Direction {
  East = 'E',
  West = 'W',
  South = 'S',
  North = 'N',
}

export interface ICoordinate {
  x: number;
  y: number;
}

export interface ICommand {
  direction: Direction;
  steps: number;
}

export interface ICleanTiles {
  [key: number]: {
    [key: number]: boolean;
  };
}
