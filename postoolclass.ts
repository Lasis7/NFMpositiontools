import * as fs from 'fs';

export function generateSpike(
  x: number,
  y: number,
  z: number,
  angle: number,
  dir: string,
  dist: number,
  amount: number
) {
  if (amount < 0) {
    return console.log('Amount needs to be a positive number!');
  } else {
    let x_updated = x;
    // let y_updated = y;
    // let z_updated = z;
    switch (dir) {
      case 'x':
        fs.appendFileSync('code.txt', `Generated ${amount} spikes:\n`);

        fs.appendFileSync('code.txt', '\n');

        for (let i = 0; i < amount; i++) {
          const x_cord = x_updated + dist;
          x_updated = x_cord;
          fs.appendFileSync(
            'code.txt',
            `set(37,${x_cord},${y},${z},${angle})\n`
          );
        }
        fs.appendFileSync('code.txt', '\n');
    }
  }
}
