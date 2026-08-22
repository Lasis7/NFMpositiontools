import * as fs from 'fs';
import { parseLine } from '../general/parseline';
import { AllAxles } from '../shared/types';

function writeToFile(
  xyz: { [key: string]: number },
  axis: AllAxles,
  spacing: number,
  amount: number,
) {
  fs.appendFileSync(
    'code.txt',
    `Generated ${amount} spikes (axis: ${axis}):\n`,
  );

  fs.appendFileSync('code.txt', '\n');

  for (let i = 0; i < amount; i++) {
    xyz[axis] += spacing;
    // If y-axis was returned as 0, it won't be included in the codeline written to code.txt
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
  fs.appendFileSync('code.txt', '\n');
  console.log('Generating completed');
}

export function generateSpike(
  codeline: string,
  axis: AllAxles,
  spacing: number,
  amount: number,
) {
  if (amount < 1) {
    console.error('Amount needs to be atleast 1');
    // If given amount is invalid, end here
    return;
  } else {
    const xyz = parseLine(codeline);
    // If parseLine returns -1, the given codeline was invalid
    if (xyz === -1) {
      return console.error('Invalid codeline');
    }
    switch (axis) {
      case 'x':
        writeToFile(xyz, 'x', spacing, amount);
        break;
      case 'y':
        writeToFile(xyz, 'y', spacing, amount);
        break;
      case 'z':
        writeToFile(xyz, 'z', spacing, amount);
        break;
      default:
        // If given axis is invalid
        console.error('Please use appropriate axis');
    }
  }
}
