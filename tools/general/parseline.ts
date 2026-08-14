export function parseLine(codeline: string) {
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
    codeObj.pieceNumber = xyz[0];
    codeObj.x = xyz[1];
    codeObj.y = 0;
    codeObj.z = xyz[2];
    codeObj.angle = xyz[3];
    // Loop through codeObj, one key and index per cycle
    // Object.keys(codeObj).forEach((key, index) => {
    //   /*
    //   We want to make sure different states of the loop are separated, because only z-axis is problematic here (should remain as 0).
    //   This is because we are dealing with a codeline that doesn't have z-axis at all
    //   */
    //   if (key !== 'y' && key !== 'angle') {
    //     codeObj[key] = xyz[index];
    //     console.log(codeObj[key]);
    //     console.log(xyz[index]);
    //   } else if (key === 'angle') {
    //     /*
    //     Have to do index - 1 because it is too big here. z-key was skipped, but the index kept increasing.
    //     Without decreasing it by 1 it would be 4, while xyz-array goes up to 3
    //     */
    //     codeObj[key] = xyz[index - 1];
    //   }
    // });
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
