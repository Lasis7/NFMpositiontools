import * as fs from 'node:fs';

export function emptyFile() {
  fs.writeFileSync('code.txt', '');
  console.log('File emptied');
}
