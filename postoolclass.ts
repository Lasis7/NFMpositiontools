import * as fs from 'fs';

export function emptyFile() {
  fs.writeFileSync('code.txt', '');
  console.log('File emptied');
}

function parseLine(codeline: string) {
  const codeObj: { [key: string]: number } = {
    pieceNumber: 0,
    x: 0,
    y: 0,
    z: 0,
    angle: 0,
  };
  const numbers = codeline.match(/-?\d+/g);
  const xyz = numbers?.map((i) => Number(i));
  if (xyz?.length === 4) {
    Object.keys(codeObj).forEach((key, index) => {
      if (key !== 'z' && key !== 'angle') {
        codeObj[key] = xyz[index];
      } else if (key === 'angle') {
        codeObj[key] = xyz[index - 1];
      }
    });
    return codeObj;
  } else if (xyz?.length === 5) {
    Object.keys(codeObj).forEach((key, index) => {
      codeObj[key] = xyz[index];
    });
    return codeObj;
  } else {
    return -1;
  }
}

export function generateSpike(
  codeline: string,
  axis: string,
  spacing: number,
  amount: number
) {
  if (amount < 0) {
    return console.log('Amount needs to be a positive number');
  } else {
    const xyz = parseLine(codeline);
    if (xyz === -1) {
      console.log('invalid line');
      return;
    }
    switch (axis) {
      case 'x':
        fs.appendFileSync(
          'code.txt',
          `Generated ${amount} spikes (axis: ${axis}):\n`
        );

        fs.appendFileSync('code.txt', '\n');

        for (let i = 0; i < amount; i++) {
          xyz.x += spacing;
          fs.appendFileSync(
            'code.txt',
            `set(${xyz.pieceNumber},${xyz.x},${xyz.y},${xyz.z},${xyz.angle})\n`
          );
        }
        fs.appendFileSync('code.txt', '\n');
        console.log('Generating completed');
        break;
      case 'y':
        fs.appendFileSync(
          'code.txt',
          `Generated ${amount} spikes (axis: ${axis}):\n`
        );

        fs.appendFileSync('code.txt', '\n');

        for (let i = 0; i < amount; i++) {
          xyz.y += spacing;
          fs.appendFileSync(
            'code.txt',
            `set(${xyz.pieceNumber},${xyz.x},${xyz.y},${xyz.z},${xyz.angle})\n`
          );
        }
        fs.appendFileSync('code.txt', '\n');
        console.log('Generating completed');
        break;
      case 'z':
        fs.appendFileSync(
          'code.txt',
          `Generated ${amount} spikes (axis: ${axis}):\n`
        );

        fs.appendFileSync('code.txt', '\n');

        for (let i = 0; i < amount; i++) {
          xyz.z += spacing;
          fs.appendFileSync(
            'code.txt',
            `set(${xyz.pieceNumber},${xyz.x},${xyz.y},${xyz.z},${xyz.angle})\n`
          );
        }
        fs.appendFileSync('code.txt', '\n');
        console.log('Generating completed');
        break;
      default:
        console.log('Please use appropriate axis');
    }
  }
}
