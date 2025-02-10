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
        fs.appendFile(
          'code.txt',
          `Generated ${amount} spikes:\n`,
          function () {}
        );

        fs.appendFile('code.txt', '\n', function () {});

        for (let i = 0; i < amount; i++) {
          const x_cord = x_updated + dist;
          x_updated = x_cord;
          fs.appendFile(
            'code.txt',
            `set(37,${x_cord},${y},${z},${angle})\n`,
            function (err) {
              if (err) {
                return console.error(err);
              }
            }
          );
        }
    }
  }
}
