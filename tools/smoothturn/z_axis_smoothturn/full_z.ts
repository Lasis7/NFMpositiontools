import * as fs from 'fs';
import { parseLine } from '../../general/parseline';
import { xvalues, zvalues } from '../../shared/initialZSmoothValues';
import { handleWriteToFile } from './shared_z';
import { XYAxes } from '../../shared/types';
import { zDir } from '../../shared/types';

function generateFullValues(array: number[], axis: XYAxes) {
  const copy = [...array];

  axis === 'x' ? copy.push(1060) : copy.push(0);

  let quarterReversed = array.toReversed();

  if (axis === 'z') {
    quarterReversed = quarterReversed.map((num) => -Math.abs(num));
  }

  const halfturn = [...copy, ...quarterReversed];
  const firstQuarter = array.map((num) => -Math.abs(num));
  const threeQuarters = [...halfturn, ...firstQuarter];

  axis === 'x' ? threeQuarters.push(-1060) : threeQuarters.push(0);

  let secondQuarter = array.toReversed();
  console.log(secondQuarter);

  if (axis === 'x') {
    secondQuarter = secondQuarter.map((num) => -Math.abs(num));
  }
  const fullArray = [...threeQuarters, ...secondQuarter];
  return fullArray;
}

function writeToFile(xyz: { [key: string]: number }, direction: zDir) {
  fs.appendFileSync(
    'code.txt',
    `generated a smooth turn, direction ${direction}\n`,
  );

  fs.appendFileSync('code.txt', '\n');

  const fullValuesx = generateFullValues(xvalues, 'x');
  const fullValuesz = generateFullValues(zvalues, 'z');

  handleWriteToFile(xyz, fullValuesx, fullValuesz, direction);
}

export function generateCircle(codeline: string, direction: zDir) {
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
