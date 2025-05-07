const fs = require('fs');
const assert = require('assert');

eval(fs.readFileSync('code.js')+'');

dm = [[]];
assert(tsp_ls(dm) == 0);

dm = [[0]];
assert(tsp_ls(dm) == 0);

dm = [[0,0,0],
      [0,0,0],
      [0,0,0]];
assert(tsp_ls(dm) == 0);

dm = [[0,1,2],
      [1,0,2],
      [2,2,0]];
assert(tsp_ls(dm) >= 3);

// https://people.sc.fsu.edu/~jburkardt/datasets/tsp/tsp.html
dm = [[0,3,4,2,7],
      [3,0,4,6,3],
      [4,4,0,5,8],
      [2,6,5,0,6],
      [7,3,8,6,0]];
assert(tsp_ls(dm) >= 13);

// Test 1: All cities equally spaced
dm = [[0,1,1,1],
      [1,0,1,1],
      [1,1,0,1],
      [1,1,1,0]];
assert(tsp_ls(dm) == 3);

// Test 2: Larger symmetric matrix (6 cities)
dm = [[0,2,9,10,1,4],
      [2,0,6,4,3,8],
      [9,6,0,8,7,3],
      [10,4,8,0,5,6],
      [1,3,7,5,0,2],
      [4,8,3,6,2,0]];
assert(tsp_ls(dm) >= 12);

// Test 3: Very asymnetric layout
dm = [[0, 5, 100, 100],
      [5, 0, 1,   1],
      [100, 1, 0,  2],
      [100, 1, 2,  0]];
assert(tsp_ls(dm) <= 108);