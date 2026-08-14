import * as fs from 'fs';
import { parseLine } from '../general/parseline';

function writeToFile(
  xyz: { [key: string]: number },
  axis: string,
  spacing: number,
  amount: number
) {
  fs.appendFileSync(
    'code.txt',
    `Generated ${amount} spikes (axis: ${axis}):\n`
  );

  fs.appendFileSync('code.txt', '\n');

  for (let i = 0; i < amount; i++) {
    xyz[axis] += spacing;
    // If z-axis was returned as 0, it won't be included in the codeline written to code.txt
    if (xyz.z === 0) {
      fs.appendFileSync(
        'code.txt',
        `set(${xyz.pieceNumber},${xyz.x},${xyz.y},${xyz.angle})\n`
      );
    } else {
      fs.appendFileSync(
        'code.txt',
        `set(${xyz.pieceNumber},${xyz.x},${xyz.y},${xyz.z},${xyz.angle})\n`
      );
    }
  }
  fs.appendFileSync('code.txt', '\n');
  console.log('Generating completed');
}

export function generateSpike(
  codeline: string,
  axis: string,
  spacing: number,
  amount: number
) {
  if (amount < 1) {
    console.log('Amount needs to be atleast 1');
    // If given amount is invalid, end here
    return;
  } else {
    const xyz = parseLine(codeline);
    // If parseLine returns -1, the given codeline was invalid
    if (xyz === -1) {
      console.log('invalid codeline');
      return;
    }
    // I used cases to determine which axis the parts are placed on based on user input (axis-parameter)
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
        console.log('Please use appropriate axis');
    }
  }
}
