import { InputHelper } from './utils/input-helper';
import { Robot } from './utils/robot';

const run = async () => {
  // get user instructions
  const inputHelper = new InputHelper();
  await inputHelper.getNumberOfCommands();
  await inputHelper.getOrigin();
  await inputHelper.getCommands();

  // initiate sweeping
  const { startingCoordinate, commands } = inputHelper.getInput();
  const robot = new Robot(startingCoordinate, commands);
  robot.sweep();
  console.log(`=> Cleaned: ${robot.numberOfCleanTiles}`);
};

run();
