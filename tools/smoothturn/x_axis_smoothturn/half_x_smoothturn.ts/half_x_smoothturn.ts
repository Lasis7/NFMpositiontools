import * as fs from 'fs';
import { parseLine } from '../../../general/parseline';

function generateFullValues(array: number[], axis: string) {
  const copy = [...array];

  axis === 'z' ? copy.push(1060) : copy.push(0);

  let reversed = array.toReversed();

  if (axis === 'x') {
    reversed = reversed.map((num) => -Math.abs(num));
  }

  const fullArray = [...copy, ...reversed];
  return fullArray;
}

function writeToFile(xyz: { [key: string]: number }, direction: string) {
  fs.appendFileSync(
    'code.txt',
    `generated a smooth turn, direction ${direction}\n`
  );

  fs.appendFileSync('code.txt', '\n');

  const zvalues: number[] = [
    40, 120, 190, 250, 335, 405, 460, 520, 580, 640, 690, 740, 780, 830, 900,
    920, 960, 990, 1020, 1030, 1050, 1050,
  ];
  const xvalues: number[] = [
    1050, 1050, 1040, 1020, 1000, 980, 940, 900, 860, 810, 770, 710, 650, 600,
    560, 490, 430, 360, 290, 220, 150, 77,
  ];

  if (direction === 'rl') {
    const fullValuesx = generateFullValues(xvalues, 'x');
    const fullValuesz = generateFullValues(zvalues, 'z');
    for (let i = 0; i < fullValuesx.length; i++) {
      xyz.x += fullValuesx[i];
      xyz.z += fullValuesz[i];
      xyz.angle += 4;

      if (xyz.y === 0) {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.z},${xyz.angle})\n`
        );
      } else {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.y},${xyz.z},${xyz.angle})\n`
        );
      }
    }
  } else if (direction === 'rr') {
    const fullValuesx = generateFullValues(xvalues, 'x');
    const fullValuesz = generateFullValues(zvalues, 'z');
    for (let i = 0; i < fullValuesx.length; i++) {
      xyz.x += fullValuesx[i];
      xyz.z -= fullValuesz[i];
      xyz.angle -= 4;

      if (xyz.y === 0) {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.z},${xyz.angle})\n`
        );
      } else {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.y},${xyz.z},${xyz.angle})\n`
        );
      }
    }
  } else if (direction === 'll') {
    const fullValuesx = generateFullValues(xvalues, 'x');
    const fullValuesz = generateFullValues(zvalues, 'z');
    for (let i = 0; i < fullValuesx.length; i++) {
      xyz.x -= fullValuesx[i];
      xyz.z -= fullValuesz[i];
      xyz.angle += 4;

      if (xyz.y === 0) {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.z},${xyz.angle})\n`
        );
      } else {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.y},${xyz.z},${xyz.angle})\n`
        );
      }
    }
  } else {
    const fullValuesx = generateFullValues(xvalues, 'x');
    const fullValuesz = generateFullValues(zvalues, 'z');
    for (let i = 0; i < fullValuesx.length; i++) {
      xyz.x -= fullValuesx[i];
      xyz.z += fullValuesz[i];
      xyz.angle -= 4;

      if (xyz.y === 0) {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.z},${xyz.angle})\n`
        );
      } else {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.y},${xyz.z},${xyz.angle})\n`
        );
      }
    }
  }
}

export function generateHalfxSmoothTurn(codeline: string, direction: string) {
  const directions: string[] = ['rl', 'rr', 'll', 'lr'];
  if (!directions.includes(direction)) {
    return console.log('Direction must be rl, rr, ll or lr');
  }
  const xyz = parseLine(codeline);

  if (xyz === -1) {
    return console.log('Invalid codeline');
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
