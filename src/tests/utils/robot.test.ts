import { Direction, ICommand } from '../../utils/definitions';
import { Robot } from '../../utils/robot';

describe('test suites for ascertaining the correct position following traversal', () => {
  test('should not exceed boundary nor clean more tiles than necessary', () => {
    const origin = { x: 99998, y: 0 };
    const commands: ICommand[] = [
      {
        direction: Direction.East,
        steps: 1000,
      },
    ];
    const robot = new Robot(origin, commands);
    robot.sweep();

    expect(robot.numberOfCleanTiles).toBe(3);
    expect(robot.currentPosition).toEqual({
      x: 100000,
      y: 0,
    });
  });

  test('should not exceed boundary nor clean more tiles than necessary, regardless of direction', () => {
    const origin = { x: 99998, y: 0 };
    const commands: ICommand[] = [
      {
        direction: Direction.East,
        steps: 10e6,
      },
      {
        direction: Direction.West,
        steps: 10e6,
      },
    ];
    const robot = new Robot(origin, commands);
    robot.sweep();

    expect(robot.numberOfCleanTiles).toBe(200001);
    expect(robot.currentPosition).toEqual({
      x: -100000,
      y: 0,
    });
  });
});

describe('test suites for isOutOfBounds method', () => {
  test('should return true for x/y values exceeding grid size', () => {
    expect(
      Robot.isOutOfBounds({
        x: 100001,
        y: 0,
      })
    ).toBeTruthy();

    expect(
      Robot.isOutOfBounds({
        x: -100001,
        y: 0,
      })
    );

    expect(
      Robot.isOutOfBounds({
        x: 0,
        y: 100001,
      })
    ).toBeTruthy();

    expect(
      Robot.isOutOfBounds({
        x: 0,
        y: -100001,
      })
    );

    expect(
      Robot.isOutOfBounds({
        x: 150000,
        y: 200000,
      })
    ).toBeTruthy();
  });

  test('should return false for x/y values within grid size', () => {
    expect(
      Robot.isOutOfBounds({
        x: 100000,
        y: 100000,
      })
    ).toBeFalsy();

    expect(
      Robot.isOutOfBounds({
        x: -100000,
        y: -100000,
      })
    ).toBeFalsy();

    expect(
      Robot.isOutOfBounds({
        x: 0,
        y: 0,
      })
    ).toBeFalsy();
  });
});

describe('test suites for savePosition method', () => {
  test('should create new nested objects when missing', () => {
    const origin = { x: 0, y: 0 };
    const robot = new Robot(origin, []);

    robot.savePosition({ x: 0, y: 1 });
    robot.savePosition({ x: 0, y: 2 });
    robot.savePosition({ x: 1, y: 2 });

    expect(robot.cleanTiles).toMatchObject({
      1: {
        0: true,
      },
      2: {
        0: true,
        1: true,
      },
    });
  });
});

describe('test suites for number of clean tiles returned', () => {
  test('should return 4', () => {
    const origin = { x: 10, y: 22 };
    const commands: ICommand[] = [
      {
        direction: Direction.East,
        steps: 2,
      },
      {
        direction: Direction.North,
        steps: 1,
      },
    ];
    const robot = new Robot(origin, commands);
    robot.sweep();

    expect(robot.numberOfCleanTiles).toBe(4);
  });

  test('should return 100', () => {
    const origin = { x: 0, y: 0 };
    const commands: ICommand[] = [
      {
        direction: Direction.East,
        steps: 99,
      },
      {
        direction: Direction.West,
        steps: -99,
      },
    ];
    const robot = new Robot(origin, commands);
    robot.sweep();

    expect(robot.numberOfCleanTiles).toBe(100);
  });

  test('should return 1', () => {
    const origin = { x: 100000, y: 0 };
    const commands: ICommand[] = [
      {
        direction: Direction.East,
        steps: 1990,
      },
    ];
    const robot = new Robot(origin, commands);
    robot.sweep();

    expect(robot.numberOfCleanTiles).toBe(1);
  });

  test('should return 5', () => {
    const origin = { x: 0, y: 0 };
    const commands: ICommand[] = [
      {
        direction: Direction.North,
        steps: 1,
      },
      {
        direction: Direction.South,
        steps: 1,
      },
      {
        direction: Direction.West,
        steps: 1,
      },
      {
        direction: Direction.East,
        steps: 1,
      },
      {
        direction: Direction.East,
        steps: 1,
      },
      {
        direction: Direction.West,
        steps: 1,
      },
      {
        direction: Direction.South,
        steps: 1,
      },
      {
        direction: Direction.North,
        steps: 1,
      },
    ];
    const robot = new Robot(origin, commands);
    robot.sweep();

    expect(robot.numberOfCleanTiles).toBe(5);
  });
});
