
import { useState } from 'react';
import {
  Gamepad2,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import SpaceBlaster from './games/SpaceBlaster';
import ChessGame from './games/ChessGame';

type GameType = 'space' | 'chess' | null;

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

  // Space Blaster Game
  if (activeGame === 'space') {
    return (
      <SpaceBlaster onClose={backToMenu} />
    );
  }

  // Chess Game
  if (activeGame === 'chess') {
    return (
      <ChessGame onClose={backToMenu} />
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-[100]">

      {open && (
        <div
          role="dialog"
          aria-label="GRK Kids Gaming Zone"
          className="mb-3 max-h-[85dvh] w-[min(400px,calc(100vw-40px))] overflow-y-auto rounded-3xl border border-amber-400/30 bg-[#081329] text-white shadow-2xl"
        >

          {/* Header */}

          <div className="flex items-center justify-between border-b border-amber-400/20 bg-[#102747] p-4">

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
                Have fun while developing your skills!
              </p>

            </div>

            {/* Space Blaster Card */}

            <button
              type="button"
              onClick={() => setActiveGame('space')}
              className="group flex w-full items-center gap-4 rounded-2xl border border-violet-400/30 bg-[#102747] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/20"
            >

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-700 to-blue-700 text-4xl">
                🚀
              </div>

              <div className="min-w-0 flex-1">

                <h3 className="text-lg font-black">
                  Space Blaster
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-300">
                  Shoot falling aliens and earn points.
                </p>

                <p className="mt-2 text-xs font-semibold text-violet-300">
                  Action & Reflexes
                </p>

                <div className="mt-3 flex items-center gap-2 text-sm font-bold text-violet-300">
                  Play Now
                  <ArrowRight size={15} />
                </div>

              </div>

            </button>

            {/* Chess Academy Card */}

            <button
              type="button"
              onClick={() => setActiveGame('chess')}
              className="group flex w-full items-center gap-4 rounded-2xl border border-amber-400/30 bg-[#102747] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20"
            >

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-600 text-5xl text-[#081329]">
                ♞
              </div>

              <div className="min-w-0 flex-1">

                <h3 className="text-lg font-black">
                  Chess Academy
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-300">
                  Challenge the computer or play with a friend.
                </p>

                <p className="mt-2 text-xs font-semibold text-amber-300">
                  Strategy & Logical Thinking
                </p>

                <div className="mt-3 flex items-center gap-2 text-sm font-bold text-amber-300">
                  Play Now
                  <ArrowRight size={15} />
                </div>

              </div>

            </button>

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

      {/* Main Floating Button */}

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
