import * as fs from 'fs';
import { parseLine } from '../../general/parseline';
import { xvalues, zvalues } from '../../shared/initialXSmoothValues';
import { handleWriteToFile } from './shared_x';
import { xDir } from '../../shared/types';

export function writeToFile(xyz: { [key: string]: number }, direction: xDir) {
  fs.appendFileSync(
    'code.txt',
    `generated a smooth turn, direction ${direction}\n`,
  );

  fs.appendFileSync('code.txt', '\n');

  handleWriteToFile(xyz, xvalues, zvalues, direction);
}

export function generateQuarterxSmoothTurn(codeline: string, direction: xDir) {
  const xyz = parseLine(codeline);

  if (xyz === -1) {
    return console.error('Invalid codeline');
  }

  switch (direction) {
    case 'rl':
      writeToFile(xyz, 'rl');
      break;
    case 'rr':
      writeToFile(xyz, 'rr');
      break;
    case 'll':
      writeToFile(xyz, 'll');
      break;
    case 'lr':
      writeToFile(xyz, 'lr');
  }
  fs.appendFileSync('code.txt', '\n');
  console.log('Generating completed');
}
