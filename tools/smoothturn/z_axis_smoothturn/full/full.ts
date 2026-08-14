import * as fs from 'fs';
import { parseLine } from '../../../general/parseline';

function generateFullValues(array: number[], axis: string) {
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

function writeToFile(xyz: { [key: string]: number }, direction: string) {
  fs.appendFileSync(
    'code.txt',
    `generated a smooth turn, direction ${direction}\n`
  );

  fs.appendFileSync('code.txt', '\n');

  const xvalues: number[] = [
    40, 120, 190, 250, 335, 405, 460, 520, 580, 640, 690, 740, 780, 830, 900,
    920, 960, 990, 1020, 1030, 1050, 1050,
  ];
  const zvalues: number[] = [
    1050, 1050, 1040, 1020, 1000, 980, 940, 900, 860, 810, 770, 710, 650, 600,
    560, 490, 430, 360, 290, 220, 150, 77,
  ];

  if (direction === 'fr') {
    const fullValuesx = generateFullValues(xvalues, 'x');
    const fullValuesz = generateFullValues(zvalues, 'z');
    for (let i = 0; i < fullValuesx.length; i++) {
      xyz.x += fullValuesx[i];
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
  } else if (direction === 'fl') {
    const fullValuesx = generateFullValues(xvalues, 'x');
    const fullValuesz = generateFullValues(zvalues, 'z');
    for (let i = 0; i < fullValuesx.length; i++) {
      xyz.x -= fullValuesx[i];
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
  } else if (direction === 'br') {
    const fullValuesx = generateFullValues(xvalues, 'x');
    const fullValuesz = generateFullValues(zvalues, 'z');
    for (let i = 0; i < fullValuesx.length; i++) {
      xyz.x -= fullValuesx[i];
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
  } else {
    const fullValuesx = generateFullValues(xvalues, 'x');
    const fullValuesz = generateFullValues(zvalues, 'z');
    for (let i = 0; i < fullValuesx.length; i++) {
      xyz.x += fullValuesx[i];
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
  }
}

export function generateCircle(codeline: string, direction: string) {
  const directions: string[] = ['fl', 'fr', 'bl', 'br'];
  if (!directions.includes(direction)) {
    return console.log('Direction must be fr, fl, br or br');
  }
  const xyz = parseLine(codeline);

  if (xyz === -1) {
    return console.log('Invalid codeline');
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
