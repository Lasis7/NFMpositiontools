import * as fs from 'fs';
import { parseLine } from '../../general/parseline';
import { xvalues, zvalues } from '../../shared/initialXSmoothValues';
import { handleWriteToFile } from './shared_x';
import { XYAxes } from '../../shared/types';
import { xDir } from '../../shared/types';

function generateFullValues(array: number[], axis: XYAxes) {
  const copy = [...array];

  axis === 'z' ? copy.push(1060) : copy.push(0);

  let quarterReversed = array.toReversed();

  if (axis === 'x') {
    quarterReversed = quarterReversed.map((num) => -Math.abs(num));
  }

  const halfturn = [...copy, ...quarterReversed];
  const quarter = array.map((num) => -Math.abs(num));
  const fullArray = [...halfturn, ...quarter];
  return fullArray;
}

function writeToFile(xyz: { [key: string]: number }, direction: xDir) {
  fs.appendFileSync(
    'code.txt',
    `generated a smooth turn, direction ${direction}\n`,
  );

  fs.appendFileSync('code.txt', '\n');

  const fullValuesx = generateFullValues(xvalues, 'x');
  const fullValuesz = generateFullValues(zvalues, 'z');

  handleWriteToFile(xyz, fullValuesx, fullValuesz, direction);
}

export function generatethreeQuarterxSmoothTurn(
  codeline: string,
  direction: xDir,
) {
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
