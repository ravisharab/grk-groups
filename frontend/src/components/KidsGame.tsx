
import { useState } from 'react';

import {
  Gamepad2,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import SpaceBlaster from './games/SpaceBlaster';
import ChessGame from './games/ChessGame';
import SudokuGame from './games/SudokuGame';
import TicTacToeGame from './games/TicTacToeGame';

type GameType =
  | 'space'
  | 'chess'
  | 'sudoku'
  | 'tictactoe'
  | null;

interface GameCard {
  id: Exclude<GameType, null>;
  name: string;
  icon: string;
  description: string;
  benefit: string;
  gradient: string;
  border: string;
  textColor: string;
}

const games: GameCard[] = [
  {
    id: 'space',
    name: 'Space Blaster',
    icon: '🚀',
    description:
      'Shoot falling aliens and earn points.',
    benefit: 'Action & Reflexes',
    gradient: 'from-violet-700 to-blue-700',
    border: 'border-violet-400/30 hover:border-violet-400',
    textColor: 'text-violet-300',
  },
  {
    id: 'chess',
    name: 'Chess Academy',
    icon: '♞',
    description:
      'Challenge the computer or play with a friend.',
    benefit: 'Strategy & Logical Thinking',
    gradient: 'from-amber-300 to-amber-600',
    border: 'border-amber-400/30 hover:border-amber-400',
    textColor: 'text-amber-300',
  },
  {
    id: 'sudoku',
    name: 'Sudoku Challenge',
    icon: '🔢',
    description:
      'Solve 4×4 and 9×9 number puzzles with hints.',
    benefit: 'Math & Problem Solving',
    gradient: 'from-emerald-500 to-teal-700',
    border: 'border-emerald-400/30 hover:border-emerald-400',
    textColor: 'text-emerald-300',
  },
  {
    id: 'tictactoe',
    name: 'Tic-Tac-Toe',
    icon: '❌⭕',
    description:
      'Play against the computer or challenge a friend.',
    benefit: 'Strategy & Critical Thinking',
    gradient: 'from-blue-600 to-indigo-700',
    border: 'border-blue-400/30 hover:border-blue-400',
    textColor: 'text-blue-300',
  },
];

export default function KidsGame() {

  const [open, setOpen] = useState(false);

  const [activeGame, setActiveGame] =
    useState<GameType>(null);

  function backToMenu() {
    setActiveGame(null);
    setOpen(true);
  }

  function closeMenu() {
    setActiveGame(null);
    setOpen(false);
  }

  // Space Blaster

  if (activeGame === 'space') {
    return (
      <SpaceBlaster onClose={backToMenu} />
    );
  }

  // Chess Academy

  if (activeGame === 'chess') {
    return (
      <ChessGame onClose={backToMenu} />
    );
  }

  // Sudoku Challenge

  if (activeGame === 'sudoku') {
    return (
      <SudokuGame onClose={backToMenu} />
    );
  }

  // Tic-Tac-Toe

  if (activeGame === 'tictactoe') {
    return (
      <TicTacToeGame onClose={backToMenu} />
    );
  }

  return (

    <div className="fixed bottom-5 right-5 z-[100]">

      {open && (

        <div
          role="dialog"
          aria-label="GRK Kids Gaming Zone"
          className="mb-3 max-h-[75dvh] w-[min(400px,calc(100vw-40px))] overflow-y-auto rounded-3xl border border-amber-400/30 bg-[#081329] text-white shadow-2xl"
        >

          {/* Header */}

          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-amber-400/20 bg-[#102747] p-4">

            <div className="flex items-center gap-3">

              <Gamepad2
                size={32}
                className="text-amber-300"
              />

              <div>

                <h2 className="text-lg font-black text-amber-300">
                  GRK Kids Gaming Zone
                </h2>

                <p className="text-xs text-slate-300">
                  Play • Learn • Explore
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close gaming menu"
              className="rounded-full p-2 hover:bg-white/10"
            >
              <X size={22} />
            </button>

          </div>

          <div className="space-y-4 p-4">

            {/* Welcome Message */}

            <div className="text-center">

              <h3 className="text-xl font-bold">
                Choose Your Game
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Four exciting games to play and learn!
              </p>

            </div>

            {/* Dynamic Game Cards */}

            {games.map(game => (

              <button
                key={game.id}
                type="button"
                onClick={() => setActiveGame(game.id)}
                className={`group flex w-full items-center gap-4 rounded-2xl border bg-[#102747] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${game.border}`}
              >

                <div
                  className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-3xl ${game.gradient}`}
                >
                  {game.icon}
                </div>

                <div className="min-w-0 flex-1">

                  <h3 className="text-lg font-black">
                    {game.name}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-300">
                    {game.description}
                  </p>

                  <p className={`mt-2 text-xs font-semibold ${game.textColor}`}>
                    {game.benefit}
                  </p>

                  <div className={`mt-3 flex items-center gap-2 text-sm font-bold ${game.textColor}`}>
                    Play Now
                    <ArrowRight size={15} />
                  </div>

                </div>

              </button>

            ))}

            {/* Coming Soon */}

            <div className="rounded-xl border border-dashed border-white/20 p-4 text-center">

              <Sparkles
                size={22}
                className="mx-auto mb-2 text-amber-300"
              />

              <p className="text-sm font-bold text-slate-300">
                More Games Coming Soon
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Math Quiz • Memory Game • Word Puzzle
              </p>

            </div>

            {/* Footer */}

            <p className="text-center text-xs tracking-wider text-slate-500">
              POWERED BY GRK GROUPS
            </p>

          </div>

        </div>

      )}

      {/* Floating Gaming Button */}

      <button
        type="button"
        onClick={() =>
          open ? closeMenu() : setOpen(true)
        }
        className="ml-auto flex items-center gap-2 rounded-full border border-amber-300/40 bg-gradient-to-r from-[#102747] to-[#06152f] px-5 py-4 font-bold text-amber-300 shadow-xl transition hover:-translate-y-1"
      >

        {open ? (
          <X size={22} />
        ) : (
          <Gamepad2 size={22} />
        )}

        {open ? 'Close Games' : 'Kids Games'}

      </button>

    </div>
  );
}
