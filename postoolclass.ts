import * as fs from 'fs';

export function parseLine(codeline: string) {
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

// if (numbers?.length === 4) {
//   const indexes = [1, 2];
//   const xy: number[] = indexes.map((i) => Number(numbers[i]));
//   xy.push(0);
//   return xy;
// } else if (numbers?.length === 5) {
//   const indexes = [1, 2, 3];
//   const xyz: number[] = indexes.map((i) => Number(numbers[i]));
//   return xyz;
// } else {
//   return -1;
// }

export function generateSpike(
  codeline: string,
  dir: string,
  dist: number,
  amount: number
) {
  if (amount < 0) {
    return console.log('Amount needs to be a positive number');
  } else {
    let pieceNumber = 0;
    let x = 0;
    let y = 0;
    let z = 0;
    let angle = 0;
    const xyz = parseLine(codeline);
    if (xyz === -1) {
      console.log('invalid line');
      return;
    } else {
      pieceNumber = xyz.pieceNumber;
      x = xyz.x;
      y = xyz.y;
      z = xyz.z;
      angle = xyz.angle;
    }
    switch (dir) {
      case 'x':
        fs.appendFileSync('code.txt', `Generated ${amount} spikes:\n`);

        fs.appendFileSync('code.txt', '\n');

        for (let i = 0; i < amount; i++) {
          const x_cord = x + dist;
          x = x_cord;
          fs.appendFileSync(
            'code.txt',
            `set(${pieceNumber},${x_cord},${y},${z},${angle})\n`
          );
        }
        fs.appendFileSync('code.txt', '\n');
    }
  }
}
