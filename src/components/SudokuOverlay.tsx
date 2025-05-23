import React, { useState } from 'react';
import SudokuBoard from './SudokuBoard';
import { getSudokuPuzzle, getSudokuSolution, isPuzzleComplete } from '../utils/SudokuUtil';

// Overlay for onclick
// This component is responsible for event handling like onClick game events

type Props = {
    region: string;
    puzzleId: string;
    onLeave: () => void;
    onSubmit: (region: string, completed: boolean, updatedInput: number[][]) => void;
    onRestart: (region: string) => void; // ✅ add this line
    initialInput: number[][];
};  

export default function SudokuOverlay({ region, puzzleId, onLeave, onSubmit, onRestart, initialInput }: Props) {
    const puzzle = getSudokuPuzzle(puzzleId);
    const solution = getSudokuSolution(puzzleId);
    const [userInput, setUserInput] = useState(initialInput);
    const [submitted, setSubmitted] = useState(false);

    const handleInput = (row: number, col: number, val: number) => {
    // Sanity puzzle check
    if (puzzle[row][col] !== 0 || submitted) return;

    const updated = userInput.map((r, ri) =>
        r.map((v, ci) => (ri === row && ci === col ? val : v))
    );
    setUserInput(updated);
};  

const handleSubmit = () => {
    const complete = isPuzzleComplete(puzzle, userInput); // move here
    setSubmitted(true);
    onSubmit(region, complete, userInput);
};  

const handleRestart = () => {
    setUserInput(Array(9).fill(0).map(() => Array(9).fill(0)));
    setSubmitted(false);
    onRestart(region);
};  
return (
    <div className="overlay">
    <div className="controls">
    <button onClick={onLeave}>{submitted ? 'Continue' : 'Leave'}</button>
    <button onClick={handleSubmit}>Submit</button>
    <button onClick={handleRestart}>Restart</button>
    </div>
        <SudokuBoard
            puzzle={puzzle}
            userInput={userInput}
            solution={submitted ? solution : null}
            onInput={handleInput}
        />
    </div>
  );
}
