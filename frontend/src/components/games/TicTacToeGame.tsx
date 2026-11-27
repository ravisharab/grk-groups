
import { useEffect, useState } from 'react';

import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  Bot,
  Users,
} from 'lucide-react';

type Player = 'X' | 'O';

type Cell = Player | null;

type Mode = 'computer' | 'friend';

type Difficulty = 'easy' | 'medium' | 'hard';

interface TicTacToeGameProps {
  onClose: () => void;
}

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(board: Cell[]) {

  for (const line of winningLines) {

    const [a, b, c] = line;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return {
        player: board[a] as Player,
        line,
      };
    }
  }

  return null;
}

// Minimax computer algorithm

function minimax(
  board: Cell[],
  maximizing: boolean,
  depth: number
): number {

  const winner = getWinner(board);

  if (winner?.player === 'O') {
    return 10 - depth;
  }

  if (winner?.player === 'X') {
    return depth - 10;
  }

  if (board.every(Boolean)) return 0;

  let best = maximizing
    ? -Infinity
    : Infinity;

  for (let i = 0; i < board.length; i++) {

    if (board[i]) continue;

    board[i] = maximizing ? 'O' : 'X';

    const score = minimax(
      board,
      !maximizing,
      depth + 1
    );

    board[i] = null;

    best = maximizing
      ? Math.max(best, score)
      : Math.min(best, score);
  }

  return best;
}

function computerMove(
  board: Cell[],
  difficulty: Difficulty
): number {

  const available = board
    .map((cell, index) =>
      cell === null ? index : -1
    )
    .filter(index => index !== -1);

  if (available.length === 0) return -1;

  // Easy: random moves

  if (
    difficulty === 'easy' ||
    (
      difficulty === 'medium' &&
      Math.random() < 0.45
    )
  ) {

    return available[
      Math.floor(Math.random() * available.length)
    ];
  }

  // Medium and Hard: strategic moves

  let bestScore = -Infinity;

  let bestMove = available[0];

  for (const index of available) {

    const next = [...board];

    next[index] = 'O';

    const score = minimax(next, false, 0);

    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }

  return bestMove;
}

export default function TicTacToeGame({
  onClose,
}: TicTacToeGameProps) {

  const [board, setBoard] = useState<Cell[]>(
    Array(9).fill(null)
  );

  const [turn, setTurn] = useState<Player>('X');

  const [mode, setMode] =
    useState<Mode>('computer');

  const [difficulty, setDifficulty] =
    useState<Difficulty>('easy');

  const [scores, setScores] = useState({
    X: 0,
    O: 0,
    draw: 0,
  });

  const winner = getWinner(board);

  const draw =
    !winner && board.every(Boolean);

  const finished = Boolean(winner || draw);

  const computerTurn =
    mode === 'computer' &&
    turn === 'O' &&
    !finished;

  function newGame() {
    setBoard(Array(9).fill(null));
    setTurn('X');
  }

  function resetScores() {
    setScores({
      X: 0,
      O: 0,
      draw: 0,
    });

    newGame();
  }

  function changeMode(nextMode: Mode) {
    setMode(nextMode);
    resetScores();
  }

  function changeDifficulty(
    nextDifficulty: Difficulty
  ) {
    setDifficulty(nextDifficulty);
    resetScores();
  }

  function playMove(index: number) {

    if (
      board[index] ||
      finished ||
      computerTurn
    ) {
      return;
    }

    const next = [...board];

    next[index] = turn;

    setBoard(next);

    const result = getWinner(next);

    if (result) {

      setScores(previous => ({
        ...previous,
        [result.player]:
          previous[result.player] + 1,
      }));

    } else if (next.every(Boolean)) {

      setScores(previous => ({
        ...previous,
        draw: previous.draw + 1,
      }));

    } else {

      setTurn(turn === 'X' ? 'O' : 'X');

    }
  }

  // Computer automatically plays O

  useEffect(() => {

    if (!computerTurn) return;

    const timer = window.setTimeout(() => {

      const index = computerMove(
        board,
        difficulty
      );

      if (index === -1) return;

      const next = [...board];

      next[index] = 'O';

      setBoard(next);

      const result = getWinner(next);

      if (result) {

        setScores(previous => ({
          ...previous,
          O: previous.O + 1,
        }));

      } else if (next.every(Boolean)) {

        setScores(previous => ({
          ...previous,
          draw: previous.draw + 1,
        }));

      } else {

        setTurn('X');

      }

    }, 450);

    return () => window.clearTimeout(timer);

  }, [board, computerTurn, difficulty]);

  const buttonClass =
    'flex items-center justify-center gap-2 ' +
    'rounded-xl border border-amber-400/30 ' +
    'bg-[#102747] px-4 py-3 font-bold ' +
    'text-amber-300 hover:bg-amber-400/10';

  const playerX =
    mode === 'computer' ? 'You (X)' : 'Player X';

  const playerO =
    mode === 'computer'
      ? 'Computer (O)'
      : 'Player O';

  const status = winner
    ? winner.player === 'X'
      ? `${playerX} Wins!`
      : `${playerO} Wins!`
    : draw
      ? "It's a Draw!"
      : computerTurn
        ? 'Computer is thinking...'
        : turn === 'X'
          ? `${playerX}'s Turn`
          : `${playerO}'s Turn`;

  return (

    <div className="fixed inset-0 z-[1000] overflow-y-auto bg-[#06152f] p-4 text-white">

      <div className="mx-auto max-w-xl pb-8">

        <button
          onClick={onClose}
          className={buttonClass}
        >
          <ArrowLeft size={18} />
          Back to Games
        </button>

        <div className="my-6 text-center">

          <div className="text-5xl">
            <span className="text-blue-400">X</span>
            <span className="text-amber-400">O</span>
          </div>

          <h1 className="mt-3 text-4xl font-black text-amber-400">
            GRK Tic-Tac-Toe
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Think Smart • Play Smart
          </p>

        </div>

        {/* Game modes */}

        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={() => changeMode('computer')}
            className={
              mode === 'computer'
                ? 'flex items-center justify-center gap-2 rounded-xl bg-amber-400 p-3 font-bold text-slate-950'
                : buttonClass
            }
          >
            <Bot size={20} />
            vs Computer
          </button>

          <button
            onClick={() => changeMode('friend')}
            className={
              mode === 'friend'
                ? 'flex items-center justify-center gap-2 rounded-xl bg-amber-400 p-3 font-bold text-slate-950'
                : buttonClass
            }
          >
            <Users size={20} />
            Two Players
          </button>

        </div>

        {/* Computer difficulty */}

        {mode === 'computer' && (

          <div className="mt-4 grid grid-cols-3 gap-2">

            {(
              ['easy', 'medium', 'hard'] as Difficulty[]
            ).map(level => (

              <button
                key={level}
                onClick={() =>
                  changeDifficulty(level)
                }
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

        )}

        {/* Scoreboard */}

        <div className="my-6 grid grid-cols-3 gap-3">

          <div className="rounded-xl bg-[#102747] p-4 text-center">

            <p className="text-xs text-blue-300">
              {playerX}
            </p>

            <p className="mt-2 text-3xl font-black text-blue-400">
              {scores.X}
            </p>

          </div>

          <div className="rounded-xl bg-[#102747] p-4 text-center">

            <p className="text-xs text-slate-300">
              Draws
            </p>

            <p className="mt-2 text-3xl font-black">
              {scores.draw}
            </p>

          </div>

          <div className="rounded-xl bg-[#102747] p-4 text-center">

            <p className="text-xs text-amber-300">
              {playerO}
            </p>

            <p className="mt-2 text-3xl font-black text-amber-400">
              {scores.O}
            </p>

          </div>

        </div>

        {/* Game status */}

        <div
          aria-live="polite"
          className={`mb-5 flex items-center justify-center gap-2 rounded-xl p-4 text-center text-xl font-bold ${
            winner
              ? 'bg-green-500/20 text-green-400'
              : 'bg-[#102747] text-amber-300'
          }`}
        >

          {winner && <Trophy size={25} />}

          {status}

        </div>

        {/* Tic-Tac-Toe board */}

        <div className="mx-auto grid max-w-[380px] grid-cols-3 gap-3">

          {board.map((cell, index) => (

            <button
              key={index}
              type="button"
              aria-label={`Row ${Math.floor(index / 3) + 1}, column ${index % 3 + 1}, ${cell || 'empty'}`}
              disabled={
                Boolean(cell) ||
                finished ||
                computerTurn
              }
              onClick={() => playMove(index)}
              className={`aspect-square rounded-2xl border-2 text-5xl font-black transition-all sm:text-7xl ${
                winner?.line.includes(index)
                  ? 'border-green-400 bg-green-900/60'
                  : 'border-amber-400/30 bg-[#102747]'
              } ${
                cell === 'X'
                  ? 'text-blue-400'
                  : 'text-amber-400'
              } enabled:hover:scale-105 enabled:hover:border-amber-400`}
            >
              {cell}
            </button>

          ))}

        </div>

        {/* Game controls */}

        <div className="mt-7 grid grid-cols-2 gap-3">

          <button
            onClick={newGame}
            className="rounded-xl bg-amber-400 p-4 font-bold text-slate-950"
          >
            New Game
          </button>

          <button
            onClick={resetScores}
            className={buttonClass}
          >
            <RotateCcw size={18} />
            Reset Scores
          </button>

        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Get three matching symbols in a row,
          column or diagonal to win.
        </p>

        <p className="mt-4 text-center text-xs tracking-widest text-slate-500">
          POWERED BY GRK GROUPS
        </p>

      </div>

    </div>
  );
}
