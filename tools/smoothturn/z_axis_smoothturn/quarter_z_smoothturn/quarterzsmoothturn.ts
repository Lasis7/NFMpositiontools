import * as fs from 'fs';
import { parseLine } from '../../../general/parseline';

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
    for (let i = 0; i < xvalues.length; i++) {
      xyz.x += xvalues[i];
      xyz.z += zvalues[i];
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
    for (let i = 0; i < xvalues.length; i++) {
      xyz.x -= xvalues[i];
      xyz.z += zvalues[i];
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
    for (let i = 0; i < xvalues.length; i++) {
      xyz.x -= xvalues[i];
      xyz.z -= zvalues[i];
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
    for (let i = 0; i < xvalues.length; i++) {
      xyz.x += xvalues[i];
      xyz.z -= zvalues[i];
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

export function generateQuarterzSmoothTurn(
  codeline: string,
  direction: string
) {
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
