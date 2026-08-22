import * as fs from 'fs';
import { xDir } from '../../shared/types';

export function handleWriteToFile(
  xyz: { [key: string]: number },
  xvalues: number[],
  zvalues: number[],
  direction: xDir,
) {
  if (direction === 'rl') {
    for (let i = 0; i < xvalues.length; i++) {
      xyz.x += xvalues[i];
      xyz.z += zvalues[i];
      xyz.angle += 4;

      if (xyz.y === 0) {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.z},${xyz.angle})\n`,
        );
      } else {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.z},${xyz.angle},${xyz.y})\n`,
        );
      }
    }
  } else if (direction === 'rr') {
    for (let i = 0; i < xvalues.length; i++) {
      xyz.x += xvalues[i];
      xyz.z -= zvalues[i];
      xyz.angle -= 4;

      if (xyz.y === 0) {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.z},${xyz.angle})\n`,
        );
      } else {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.z},${xyz.angle},${xyz.y})\n`,
        );
      }
    }
  } else if (direction === 'll') {
    for (let i = 0; i < xvalues.length; i++) {
      xyz.x -= xvalues[i];
      xyz.z -= zvalues[i];
      xyz.angle += 4;

      if (xyz.y === 0) {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.z},${xyz.angle})\n`,
        );
      } else {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.z},${xyz.angle},${xyz.y})\n`,
        );
      }
    }
    // direction === lr
  } else {
    for (let i = 0; i < xvalues.length; i++) {
      xyz.x -= xvalues[i];
      xyz.z += zvalues[i];
      xyz.angle -= 4;

      if (xyz.y === 0) {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.z},${xyz.angle})\n`,
        );
      } else {
        fs.appendFileSync(
          'code.txt',
          `set(${xyz.pieceNumber},${xyz.x},${xyz.z},${xyz.angle},${xyz.y})\n`,
        );
      }
    }
  }
}
