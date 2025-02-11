import * as fs from 'fs';

export function parseLine(codeline: string) {
  const numbers = codeline.match(/-?\d+/g);
  const xyz = numbers?.map((i) => Number(i));
  return xyz;
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
}

export function generateSpike(
  codeline: string,
  dir: string,
  dist: number,
  amount: number
) {
  if (amount < 0) {
    return console.log('Amount needs to be a positive number');
  } else {
    let pieceNumber: number = 0;
    let x: number = 0;
    let y: number = 0;
    let z: number = 0;
    let angle: number = 0;
    const xyz = parseLine(codeline);
    if (xyz?.length === 4) {
      pieceNumber = xyz[0];
      x = xyz[1];
      y = xyz[2];
      angle = xyz[3];
    } else if (xyz?.length === 5) {
      pieceNumber = xyz[0];
      x = xyz[1];
      y = xyz[2];
      z = xyz[3];
      angle = xyz[4];
    } else {
      console.log('invalid line');
      return;
    }

    // let y_updated = y;
    // let z_updated = z;
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
