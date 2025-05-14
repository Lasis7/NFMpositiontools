import { generateSpike, emptyFile } from './tools/spike';

/*
To run functions, uncomment them (ctrl + /) and use the line below in the terminal
*/

// npx tsx main.ts

/*
Please use the provided emptyFile function to empty the text file, or manually delete the file to reset it.
For whatever reason manually removing the codelines from the file breaks the structure of the new generated code after
*/

// emptyFile();

generateSpike('set(37,-17488,103188,90)', 'y', 1200, 7);
