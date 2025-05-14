import * as fs from 'fs';

export function emptyFile() {
  fs.writeFileSync('code.txt', '');
  console.log('File emptied');
}

function parseLine(codeline: string) {
  // Object, where the coordinates are saved
  const codeObj: { [key: string]: number } = {
    pieceNumber: 0,
    x: 0,
    y: 0,
    z: 0,
    angle: 0,
  };
  // match-method returns all the numbers from the given codeline in an array
  const numbers = codeline.match(/-?\d+/g);

  const xyz = numbers?.map((i) => Number(i));
  // if codeline has 4 digits
  if (xyz?.length === 4) {
    // Loop through codeObj, one key and index per cycle
    Object.keys(codeObj).forEach((key, index) => {
      /*
      We want to make sure different states of the loop are separated, because only z-axis is problematic here (should remain as 0).
      This is because we are dealing with a codeline that doesn't have z-axis at all
      */
      if (key !== 'z' && key !== 'angle') {
        codeObj[key] = xyz[index];
      } else if (key === 'angle') {
        /* 
        Have to do index - 1 because it is too big here. z-key was skipped, but the index kept increasing. 
        Without decreasing it by 1 it would be 4, while xyz-array goes up to 3
        */
        codeObj[key] = xyz[index - 1];
      }
    });
    return codeObj;
  } else if (xyz?.length === 5) {
    // Here the indexes work perfectly, no need for statetracking
    Object.keys(codeObj).forEach((key, index) => {
      codeObj[key] = xyz[index];
    });
    return codeObj;
  } else {
    return -1;
  }
}

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
    xyz.axis += spacing;
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
      console.log('invalid line');
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
