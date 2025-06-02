type Grid = number[][];

// Static puzzle for testing and small project, 
// adding randomness is a different undertaking
// and time not permitted
// 0'S ARE PURPOSELY LEFT IN TO SHOWCASE 'CORRECT' VALUE INDICATOR(GREEN SQUARE)

const samplePuzzle: Grid = [
    [0, 0, 6, 0, 0, 2, 0, 4, 0],
    [0, 2, 0, 0, 6, 0, 0, 0, 0],
    [4, 0, 0, 0, 0, 0, 0, 0, 9],
    [0, 0, 3, 0, 0, 1, 0, 6, 0],
    [1, 0, 0, 7, 0, 6, 0, 0, 3],
    [0, 9, 0, 3, 0, 0, 7, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 8, 0, 0, 5, 0],
    [0, 6, 0, 2, 0, 0, 3, 0, 0],
  ];

// The "0" integers are purposely there for testing
const sampleSolution: Grid = [
    [9, 3, 6, 8, 1, 2, 5, 4, 7],
    [8, 2, 1, 5, 6, 4, 9, 3, 0],
    [4, 5, 7, 6, 3, 9, 2, 1, 9],
    [2, 7, 3, 9, 4, 1, 8, 6, 5],
    [1, 8, 5, 7, 2, 6, 4, 9, 3],
    [6, 9, 4, 3, 5, 8, 7, 2, 1],
    [3, 1, 9, 4, 7, 5, 6, 8, 2],
    [7, 4, 2, 1, 8, 3, 0, 5, 6],
    [5, 6, 8, 2, 9, 7, 3, 0, 4],
  ];

export function getSudokuPuzzle(): Grid {
  return samplePuzzle;
}

export function getSudokuSolution(): Grid {
  return sampleSolution;
}

// Check if userInput matches solution 9x9 grid
export function isPuzzleComplete(puzzle: Grid, userInput: Grid): boolean {
  const solution = getSudokuSolution();
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (puzzle[i][j] === 0 && userInput[i][j] !== solution[i][j]) {
        return false;
      }
    }
  }
  return true;
}
