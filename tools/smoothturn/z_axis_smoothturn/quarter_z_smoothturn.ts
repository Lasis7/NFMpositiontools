import * as fs from 'fs';
import { parseLine } from '../../general/parseline';
import { xvalues, zvalues } from '../../shared/initialZSmoothValues';
import { handleWriteToFile } from './shared_z';
import { zDir } from '../../shared/types';

function writeToFile(xyz: { [key: string]: number }, direction: zDir) {
  fs.appendFileSync(
    'code.txt',
    `generated a smooth turn, direction ${direction}\n`,
  );

  fs.appendFileSync('code.txt', '\n');

  handleWriteToFile(xyz, xvalues, zvalues, direction);
}

export function generateQuarterzSmoothTurn(codeline: string, direction: zDir) {
  const xyz = parseLine(codeline);

  if (xyz === -1) {
    return console.error('Invalid codeline');
  }

  switch (direction) {
    case 'fr':
      writeToFile(xyz, 'fr');
      break;
    case 'fl':
      writeToFile(xyz, 'fl');
      break;
    case 'br':
      writeToFile(xyz, 'br');
      break;
    case 'bl':
      writeToFile(xyz, 'bl');
  }
  fs.appendFileSync('code.txt', '\n');
  console.log('Generating completed');
}
