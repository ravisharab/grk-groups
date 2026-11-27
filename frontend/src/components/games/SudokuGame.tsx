
import { useEffect, useState } from 'react';

import {
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  CheckCircle,
  Timer,
  Eraser,
  Grid3X3,
} from 'lucide-react';

type Difficulty =
  | 'beginner'
  | 'easy'
  | 'medium'
  | 'hard';

interface SudokuGameProps {
  onClose: () => void;
}

interface Puzzle {
  size: number;
  initial: number[];
  solution: number[];
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] =
      [result[j], result[i]];
  }

  return result;
}

// Validate a number against Sudoku rules

function isValid(
  board: number[],
  index: number,
  value: number,
  size: number
): boolean {

  const boxSize = Math.sqrt(size);

  const row = Math.floor(index / size);
  const col = index % size;

  for (let i = 0; i < size; i++) {

    if (
      board[row * size + i] === value ||
      board[i * size + col] === value
    ) {
      return false;
    }
  }

  const startRow =
    Math.floor(row / boxSize) * boxSize;

  const startCol =
    Math.floor(col / boxSize) * boxSize;

  for (let r = 0; r < boxSize; r++) {
    for (let c = 0; c < boxSize; c++) {

      if (
        board[
          (startRow + r) * size +
          startCol + c
        ] === value
      ) {
        return false;
      }
    }
  }

  return true;
}

// Count solutions to ensure uniqueness

function countSolutions(
  board: number[],
  size: number,
  limit = 2
): number {

  const index = board.indexOf(0);

  if (index === -1) return 1;

  let count = 0;

  for (let value = 1; value <= size; value++) {

    if (!isValid(board, index, value, size)) {
      continue;
    }

    board[index] = value;

    count += countSolutions(
      board,
      size,
      limit - count
    );

    board[index] = 0;

    if (count >= limit) break;
  }

  return count;
}

// Generate a valid Sudoku puzzle

function generatePuzzle(
  difficulty: Difficulty
): Puzzle {

  const size =
    difficulty === 'beginner' ? 4 : 9;

  const boxSize = Math.sqrt(size);

  const range = Array.from(
    { length: boxSize },
    (_, i) => i
  );

  const rows = shuffle(range).flatMap(
    group =>
      shuffle(range).map(
        row => group * boxSize + row
      )
  );

  const columns = shuffle(range).flatMap(
    group =>
      shuffle(range).map(
        col => group * boxSize + col
      )
  );

  const numbers = shuffle(
    Array.from(
      { length: size },
      (_, i) => i + 1
    )
  );

  const solution = rows.flatMap(row =>
    columns.map(col =>

      numbers[
        (
          boxSize * (row % boxSize) +
          Math.floor(row / boxSize) +
          col
        ) % size
      ]

    )
  );

  const initial = [...solution];

  const removalTarget = {
    beginner: 7,
    easy: 35,
    medium: 45,
    hard: 52,
  }[difficulty];

  const positions = shuffle(
    Array.from(
      { length: size * size },
      (_, i) => i
    )
  );

  let removed = 0;

  for (const index of positions) {

    if (removed >= removalTarget) break;

    const previous = initial[index];

    initial[index] = 0;

    if (
      countSolutions([...initial], size) === 1
    ) {
      removed++;
    } else {
      initial[index] = previous;
    }
  }

  return {
    size,
    initial,
    solution,
  };
}

export default function SudokuGame({
  onClose,
}: SudokuGameProps) {

  const [difficulty, setDifficulty] =
    useState<Difficulty>('beginner');

  const [puzzle, setPuzzle] =
    useState(() => generatePuzzle('beginner'));

  const [board, setBoard] =
    useState<number[]>(() => [...puzzle.initial]);

  const [selected, setSelected] =
    useState<number | null>(null);

  const [seconds, setSeconds] = useState(0);

  const [hints, setHints] = useState(3);

  const [showErrors, setShowErrors] =
    useState(false);

  const [message, setMessage] = useState('');

  const completed = board.every(
    (value, index) =>
      value === puzzle.solution[index]
  );

  useEffect(() => {

    if (completed) return;

    const timer = window.setInterval(() => {
      setSeconds(previous => previous + 1);
    }, 1000);

    return () => window.clearInterval(timer);

  }, [completed]);

  function newGame(level: Difficulty) {

    const next = generatePuzzle(level);

    setDifficulty(level);
    setPuzzle(next);
    setBoard([...next.initial]);
    setSelected(null);
    setSeconds(0);
    setHints(3);
    setShowErrors(false);
    setMessage('');
  }

  function resetGame() {
    setBoard([...puzzle.initial]);
    setSelected(null);
    setSeconds(0);
    setHints(3);
    setShowErrors(false);
    setMessage('');
  }

  function enterNumber(value: number) {

    if (
      selected === null ||
      puzzle.initial[selected] !== 0 ||
      completed
    ) {
      return;
    }

    setBoard(previous =>
      previous.map((number, index) =>
        index === selected ? value : number
      )
    );

    setShowErrors(false);
    setMessage('');
  }

  function useHint() {

    if (hints <= 0 || completed) return;

    const index =
      selected !== null &&
      board[selected] !== puzzle.solution[selected]
        ? selected
        : board.findIndex(
            (value, i) =>
              value !== puzzle.solution[i]
          );

    if (index === -1) return;

    setBoard(previous =>
      previous.map((value, i) =>
        i === index
          ? puzzle.solution[index]
          : value
      )
    );

    setSelected(index);
    setHints(previous => previous - 1);
    setShowErrors(false);
    setMessage('Hint applied!');
  }

  function checkAnswer() {

    setShowErrors(true);

    const mistakes = board.filter(
      (value, index) =>
        value !== 0 &&
        value !== puzzle.solution[index]
    ).length;

    setMessage(
      completed
        ? 'Congratulations! You solved Sudoku!'
        : mistakes > 0
          ? `${mistakes} incorrect answers. Try again!`
          : 'All entered numbers are correct!'
    );
  }

  // Keyboard support

  useEffect(() => {

    function handleKey(event: KeyboardEvent) {

      if (
        selected === null ||
        puzzle.initial[selected] !== 0 ||
        completed ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      ) {
        return;
      }

      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const number = Number(event.key);

      let value: number | null = null;

      if (number >= 1 && number <= puzzle.size) {
        value = number;
      }

      if (
        event.key === 'Backspace' ||
        event.key === 'Delete'
      ) {
        value = 0;
      }

      if (value === null) return;

      event.preventDefault();

      setBoard(previous =>
        previous.map((item, index) =>
          index === selected ? value! : item
        )
      );

      setShowErrors(false);
      setMessage('');
    }

    window.addEventListener('keydown', handleKey);

    return () =>
      window.removeEventListener(
        'keydown',
        handleKey
      );

  }, [selected, puzzle, completed]);

  const boxSize = Math.sqrt(puzzle.size);

  const minutes = Math.floor(seconds / 60);

  const time =
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds % 60).padStart(2, '0')}`;

  const buttonClass =
    'flex items-center justify-center gap-2 ' +
    'rounded-xl border border-amber-400/30 ' +
    'bg-[#102747] px-4 py-3 text-sm ' +
    'font-bold text-amber-300 ' +
    'hover:bg-amber-400/10 disabled:opacity-40';

  return (

    <div className="fixed inset-0 z-[1000] overflow-y-auto bg-[#06152f] p-4 text-white">

      <div className="mx-auto max-w-2xl pb-8">

        <button
          onClick={onClose}
          className={buttonClass}
        >
          <ArrowLeft size={18} />
          Back to Games
        </button>

        <div className="my-6 text-center">

          <Grid3X3
            size={45}
            className="mx-auto text-amber-400"
          />

          <h1 className="mt-3 text-4xl font-black text-amber-400">
            GRK Sudoku
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Train Your Brain • Improve Your Logic
          </p>

        </div>

        {/* Difficulty levels */}

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

          {(
            [
              'beginner',
              'easy',
              'medium',
              'hard',
            ] as Difficulty[]
          ).map(level => (

            <button
              key={level}
              onClick={() => newGame(level)}
              className={
                difficulty === level
                  ? 'rounded-xl bg-amber-400 p-3 font-bold capitalize text-slate-950'
                  : `${buttonClass} capitalize`
              }
            >
              {level}
            </button>

          ))}

        </div>

        {/* Game statistics */}

        <div className="my-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#102747] p-4">

          <span className="flex items-center gap-2 text-amber-300">
            <Timer size={20} />
            {time}
          </span>

          <span className="text-sm">
            {puzzle.size} × {puzzle.size}
          </span>

          <span className="flex items-center gap-2 text-amber-300">
            <Lightbulb size={18} />
            {hints} Hints
          </span>

        </div>

        {/* Sudoku board */}

        <div
          className="mx-auto grid max-w-[500px] overflow-hidden rounded-lg border-2 border-amber-400"
          style={{
            gridTemplateColumns:
              `repeat(${puzzle.size}, minmax(0, 1fr))`,
          }}
        >

          {board.map((value, index) => {

            const row =
              Math.floor(index / puzzle.size);

            const col =
              index % puzzle.size;

            const fixed =
              puzzle.initial[index] !== 0;

            const incorrect =
              showErrors &&
              value !== 0 &&
              value !== puzzle.solution[index];

            return (

              <button
                key={index}
                type="button"
                aria-label={`Row ${row + 1}, column ${col + 1}, ${value || 'empty'}`}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
                className={`aspect-square border border-slate-600 text-lg font-bold sm:text-2xl ${
                  selected === index
                    ? 'bg-amber-400 text-slate-950'
                    : incorrect
                      ? 'bg-red-900 text-red-300'
                      : fixed
                        ? 'bg-[#183451] text-white'
                        : 'bg-[#102747] text-amber-300 hover:bg-slate-700'
                }`}
                style={{
                  borderRightWidth:
                    (col + 1) % boxSize === 0
                      ? '2px'
                      : '1px',

                  borderBottomWidth:
                    (row + 1) % boxSize === 0
                      ? '2px'
                      : '1px',

                  borderRightColor:
                    (col + 1) % boxSize === 0
                      ? '#d4af37'
                      : undefined,

                  borderBottomColor:
                    (row + 1) % boxSize === 0
                      ? '#d4af37'
                      : undefined,
                }}
              >
                {value || ''}
              </button>

            );
          })}

        </div>

        {/* Number keypad */}

        <div
          className="mx-auto mt-5 grid max-w-[500px] gap-1 sm:gap-2"
          style={{
            gridTemplateColumns:
              `repeat(${puzzle.size}, minmax(0, 1fr))`,
          }}
        >

          {Array.from(
            { length: puzzle.size },
            (_, index) => index + 1
          ).map(number => (

            <button
              key={number}
              onClick={() => enterNumber(number)}
              disabled={
                selected === null ||
                puzzle.initial[selected] !== 0 ||
                completed
              }
              className="aspect-square rounded-lg bg-amber-400 text-lg font-black text-slate-950 hover:bg-amber-300 disabled:opacity-40"
            >
              {number}
            </button>

          ))}

        </div>

        {/* Game controls */}

        <div className="mt-6 grid grid-cols-2 gap-3">

          <button
            onClick={() => enterNumber(0)}
            className={buttonClass}
          >
            <Eraser size={18} />
            Erase
          </button>

          <button
            onClick={useHint}
            disabled={hints === 0 || completed}
            className={buttonClass}
          >
            <Lightbulb size={18} />
            Hint
          </button>

          <button
            onClick={checkAnswer}
            className={buttonClass}
          >
            <CheckCircle size={18} />
            Check Answer
          </button>

          <button
            onClick={resetGame}
            className={buttonClass}
          >
            <RotateCcw size={18} />
            Reset
          </button>

        </div>

        <button
          onClick={() => newGame(difficulty)}
          className="mt-4 w-full rounded-xl bg-amber-400 p-4 font-bold text-slate-950"
        >
          Generate New Puzzle
        </button>

        {(message || completed) && (

          <div
            aria-live="polite"
            className="mt-5 rounded-xl border border-amber-400/30 bg-[#102747] p-5 text-center font-bold text-amber-300"
          >

            {completed
              ? `🎉 Congratulations! Completed in ${time}!`
              : message}

          </div>

        )}

        <p className="mt-6 text-center text-xs text-slate-400">
          Fill each row, column and box without
          repeating a number.
        </p>

        <p className="mt-4 text-center text-xs tracking-widest text-slate-500">
          POWERED BY GRK GROUPS
        </p>

      </div>

    </div>
  );
}
