import * as fs from 'fs';
import { parseLine } from '../../general/parseline';
import { xvalues, zvalues } from '../../shared/initialZSmoothValues';
import { XYAxles } from '../../shared/types';
import { zDirections } from '../../shared/directions';
import { zDir } from '../../shared/types';

function generateFullValues(array: number[], axis: XYAxles) {
  const copy = [...array];

  axis === 'x' ? copy.push(1060) : copy.push(0);

  let quarterReversed = array.toReversed();

  if (axis === 'z') {
    quarterReversed = quarterReversed.map((num) => -Math.abs(num));
  }

  const halfturn = [...copy, ...quarterReversed];
  const quarter = array.map((num) => -Math.abs(num));
  const fullArray = [...halfturn, ...quarter];
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

  if (direction === 'fr') {
    for (let i = 0; i < fullValuesx.length; i++) {
      xyz.x += fullValuesx[i];
      xyz.z += fullValuesz[i];
      xyz.angle -= 4;

      if (xyz.y === 0) {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.z},${xyz.angle})\n`,
        );
      } else {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.y},${xyz.z},${xyz.angle})\n`,
        );
      }
    }
  } else if (direction === 'fl') {
    for (let i = 0; i < fullValuesx.length; i++) {
      xyz.x -= fullValuesx[i];
      xyz.z += fullValuesz[i];
      xyz.angle += 4;

      if (xyz.y === 0) {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.z},${xyz.angle})\n`,
        );
      } else {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.y},${xyz.z},${xyz.angle})\n`,
        );
      }
    }
  } else if (direction === 'br') {
    for (let i = 0; i < fullValuesx.length; i++) {
      xyz.x -= fullValuesx[i];
      xyz.z -= fullValuesz[i];
      xyz.angle -= 4;

      if (xyz.y === 0) {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.z},${xyz.angle})\n`,
        );
      } else {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.y},${xyz.z},${xyz.angle})\n`,
        );
      }
    }
    // direction === bl
  } else {
    for (let i = 0; i < fullValuesx.length; i++) {
      xyz.x += fullValuesx[i];
      xyz.z -= fullValuesz[i];
      xyz.angle += 4;

      if (xyz.y === 0) {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.z},${xyz.angle})\n`,
        );
      } else {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.y},${xyz.z},${xyz.angle})\n`,
        );
      }
    }
  }
}

export function generatethreeQuarterzSmoothTurn(
  codeline: string,
  direction: zDir,
) {
  if (zDirections.includes(direction)) {
    return console.error('Direction must be fr, fl, br or br');
  }
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
