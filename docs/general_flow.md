# General flow

## The general structure of this project is quite simple:

- `main.ts`: run functions (I might add some kind of function that handles running other functions at some point)
- `code.txt`: generated code goes here
- `docs/`: documentation, visualization
- `tools/`: functions, helper functions, shared data

## Tools/:

- `tools/general`: general helper functions used by multiple files
- `tools/shared`: data shared by multiple values, such as initial coordinates and ts-types
- `tools/[toolname]`: each tool separated to individual folders
