import inquirer from 'inquirer';
import { Direction, ICoordinate, ICommand } from './definitions';

export class InputHelper {
  numberOfCommands: number | null = null;
  origin: ICoordinate | null = null;
  commands: ICommand[] = [];

  async getNumberOfCommands(): Promise<void> {
    const { numberOfCommands } = await inquirer.prompt([
      {
        type: 'number',
        name: 'numberOfCommands',
        message:
          'Input the number of commands the robot is expected to execute (x), where x represents an integer:',
      },
    ]);
    this.numberOfCommands = numberOfCommands;
  }

  async getOrigin(): Promise<void> {
    const { origin } = await inquirer.prompt([
      {
        type: 'input',
        name: 'origin',
        message:
          'Input the starting coordinates (x y), where x & y represent integers:',
      },
    ]);
    this.origin = this.parseCoordinate(origin);
  }

  async getCommands(): Promise<void> {
    const size = this.numberOfCommands as number;

    for (let i = 1; i <= size; i++) {
      const { command } = await inquirer.prompt([
        {
          type: 'input',
          name: 'command',
          message: `Input command (c x), where c is in range {E, W, S, N} and x represents an integer (command ${i} of ${size}):`,
        },
      ]);
      this.commands.push(this.parseCommand(command));
    }
  }

  getInput(): { startingCoordinate: ICoordinate; commands: ICommand[] } {
    return {
      startingCoordinate: this.origin as ICoordinate,
      commands: this.commands,
    };
  }

  private parseCoordinate(value: string): ICoordinate {
    const [x, y] = value.trim().split(' ').map(Number);
    return { x, y };
  }

  private parseCommand(value: string): ICommand {
    const [d, s] = value.trim().split(' ');

    let direction;

    switch (d.toUpperCase()) {
      case Direction.East:
        direction = Direction.East;
        break;
      case Direction.West:
        direction = Direction.West;
        break;
      case Direction.South:
        direction = Direction.South;
        break;
      case Direction.North:
        direction = Direction.North;
        break;
      default:
        throw new Error(`${d} did not match any case.`);
    }

    return {
      direction,
      steps: parseInt(s),
    };
  }
}
