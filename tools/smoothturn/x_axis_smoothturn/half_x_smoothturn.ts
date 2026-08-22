import * as fs from 'fs';
import { parseLine } from '../../general/parseline';
import { xvalues, zvalues } from '../../shared/initialXSmoothValues';
import { XYAxles } from '../../shared/types';
import { xDirections } from '../../shared/directions';
import { xDir } from '../../shared/types';

function generateFullValues(array: number[], axis: XYAxles) {
  const copy = [...array];

  axis === 'z' ? copy.push(1060) : copy.push(0);

  let reversed = array.toReversed();

  if (axis === 'x') {
    reversed = reversed.map((num) => -Math.abs(num));
  }

  const fullArray = [...copy, ...reversed];
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

  if (direction === 'rl') {
    for (let i = 0; i < fullValuesx.length; i++) {
      xyz.x += fullValuesx[i];
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
  } else if (direction === 'rr') {
    for (let i = 0; i < fullValuesx.length; i++) {
      xyz.x += fullValuesx[i];
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
  } else if (direction === 'll') {
    for (let i = 0; i < fullValuesx.length; i++) {
      xyz.x -= fullValuesx[i];
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
    // direction === lr
  } else {
    for (let i = 0; i < fullValuesx.length; i++) {
      xyz.x -= fullValuesx[i];
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
  }
}

export function generateHalfxSmoothTurn(codeline: string, direction: xDir) {
  if (xDirections.includes(direction)) {
    return console.error('Direction must be rl, rr, ll or lr');
  }
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
