import * as fs from 'fs';
import { zDir } from '../../shared/types';

export function handleWriteToFile(
  xyz: { [key: string]: number },
  xvalues: number[],
  zvalues: number[],
  direction: zDir,
) {
  if (direction === 'fr') {
    for (let i = 0; i < xvalues.length; i++) {
      xyz.x += xvalues[i];
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
  } else if (direction === 'fl') {
    for (let i = 0; i < xvalues.length; i++) {
      xyz.x -= xvalues[i];
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
  } else if (direction === 'br') {
    for (let i = 0; i < xvalues.length; i++) {
      xyz.x -= xvalues[i];
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
    // direction === bl
  } else {
    for (let i = 0; i < xvalues.length; i++) {
      xyz.x += xvalues[i];
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
  }
}
