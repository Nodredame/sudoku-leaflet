import React from 'react';
import './Sudoku.css';

// Game board logic here
// Takes user input and coloring of tiles

type Props = {
    puzzle: number[][];
    userInput: number[][];
    solution: number[][] | null;
    onInput?: (row: number, col: number, val: number) => void;
};

export default function SudokuBoard({ puzzle, userInput, solution, onInput }: Props) {
    return (
    <div className="sudoku-board">
        {puzzle.map((row, i) => (
            <div key={i} className="sudoku-row">
                {row.map((cell, j) => {
                    const base = puzzle[i][j];
                    const userVal = userInput[i][j];
                    const solVal = solution ? solution[i][j] : null;

                    const isEditable = base === 0;
                    let className = 'cell';
                //  Making specific 'grayed' or 'insertable(white)' 
                //  coloring of tiles
                if (base !== 0) {
                        className += ' grey'; 
                    } 
                    else if (!solution) {
                        className += userVal ? ' blue' : ' white';
                    } 
                else {
                    if (userVal === solVal) {
                        className += ' green'; // correct
                    } 
                    else {
                        className += ' red'; // incorrect
                    }
                }             

                return (
                    <div key={j} className={className}>
                    {base === 0 && !solution ? (
                    <input
                        type="text"
                        value={userVal || ''}
                    onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val >= 1 && val <= 9) {
                            onInput?.(i, j, val);
                        }
                        else if (e.target.value === '') {
                            onInput?.(i, j, 0);
                        }
                        }}
                        maxLength={1}
                        style={{
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        border: 'none',
                        fontSize: '18px',
                        background: 'transparent',
                        color: 'black',
                        }}
                    />
                    ) : solution && base === 0 && userVal !== solVal ? (
                        <span>{solVal}</span>
                    ) : (
                    <span>{base || userVal || (solution && solVal) || ''}</span>
                    )}
                </div>
                );              
            })}
        </div>
    ))}
    </div>
    );
}
