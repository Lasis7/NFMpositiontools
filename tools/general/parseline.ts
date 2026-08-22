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

  const xyz = numbers?.map((i) => Number(i)); // Make sure each value type is number

  // if codeline has 4 digits
  if (xyz?.length === 4) {
    codeObj.pieceNumber = xyz[0];
    codeObj.x = xyz[1];
    codeObj.y = 0;
    codeObj.z = xyz[2];
    codeObj.angle = xyz[3];
    return codeObj;
  } else if (xyz?.length === 5) {
    // Iterate through codeObj keys and assign each value from xyz based on index
    Object.keys(codeObj).forEach((key, index) => {
      codeObj[key] = xyz[index];
    });
    return codeObj;
  } else {
    return -1;
  }
}
