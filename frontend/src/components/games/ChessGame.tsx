
import { useEffect, useState } from 'react';
import { Chess } from 'chess.js';
import type { Square, Move } from 'chess.js';
import {
  Gamepad2,
  X,
  RotateCcw,
  Undo2,
  Trophy,
} from 'lucide-react';

type Difficulty = 'easy' | 'medium' | 'hard';
type GameMode = 'computer' | 'two-player';

const PIECES: Record<string, string> = {
  wp: '♙',
  wn: '♘',
  wb: '♗',
  wr: '♖',
  wq: '♕',
  wk: '♔',
  bp: '♟︎',
  bn: '♞',
  bb: '♝',
  br: '♜',
  bq: '♛',
  bk: '♚',
};

const VALUES: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 0,
};

function evaluate(game: Chess): number {
  if (game.isCheckmate()) {
    return game.turn() === 'w' ? 100000 : -100000;
  }

  if (game.isDraw()) return 0;

  let score = 0;

  game.board().forEach((row, r) => {
    row.forEach((piece, c) => {
      if (!piece) return;

      const center =
        14 - Math.abs(r - 3.5) * 2
        - Math.abs(c - 3.5) * 2;

      const value = VALUES[piece.type] + center;

      score += piece.color === 'b'
        ? value
        : -value;
    });
  });

  return score;
}

function minimax(
  game: Chess,
  depth: number,
  alpha: number,
  beta: number
): number {
  if (depth === 0 || game.isGameOver()) {
    return evaluate(game);
  }

  const moves = game.moves();

  if (game.turn() === 'b') {
    let best = -Infinity;

    for (const move of moves) {
      game.move(move);

      best = Math.max(
        best,
        minimax(game, depth - 1, alpha, beta)
      );

      game.undo();

      alpha = Math.max(alpha, best);

      if (beta <= alpha) break;
    }

    return best;
  }

  let best = Infinity;

  for (const move of moves) {
    game.move(move);

    best = Math.min(
      best,
      minimax(game, depth - 1, alpha, beta)
    );

    game.undo();

    beta = Math.min(beta, best);

    if (beta <= alpha) break;
  }

  return best;
}

function computerMove(
  game: Chess,
  difficulty: Difficulty
): string | null {
  const moves = game.moves();

  if (!moves.length) return null;

  if (difficulty === 'easy') {
    return moves[
      Math.floor(Math.random() * moves.length)
    ];
  }

  const depth = difficulty === 'medium' ? 1 : 2;

  let bestScore = -Infinity;
  let bestMove = moves[0];

  for (const move of moves) {
    game.move(move);

    const score = minimax(
      game,
      depth - 1,
      -Infinity,
      Infinity
    );

    game.undo();

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

type ChessGameProps = {
  onClose: () => void;
};

export default function ChessGame({
  onClose,
}: ChessGameProps) {
  const open = true;

  const [game] = useState(() => new Chess());

  const [fen, setFen] = useState(game.fen());

  const [mode, setMode] =
    useState<GameMode>('computer');

  const [difficulty, setDifficulty] =
    useState<Difficulty>('easy');

  const [selected, setSelected] =
    useState<Square | null>(null);

  const [legalMoves, setLegalMoves] =
    useState<Square[]>([]);

  const [history, setHistory] =
    useState<Move[]>([]);

  const [thinking, setThinking] =
    useState(false);

  const [promotion, setPromotion] =
    useState<{
      from: Square;
      to: Square;
    } | null>(null);

  function refresh() {
    setFen(game.fen());
    setHistory(game.history({ verbose: true }));
    setSelected(null);
    setLegalMoves([]);
    setPromotion(null);
  }

  function newGame() {
    game.reset();
    setThinking(false);
    refresh();
  }

  function changeMode(value: GameMode) {
    setMode(value);
    newGame();
  }

  function makeMove(
    from: Square,
    to: Square,
    promote?: 'q' | 'r' | 'b' | 'n'
  ) {
    try {
      game.move({
        from,
        to,
        promotion: promote,
      });

      refresh();
    } catch {
      setSelected(null);
      setLegalMoves([]);
      setPromotion(null);
    }
  }

  function selectSquare(square: Square) {
    if (
      game.isGameOver() ||
      thinking ||
      promotion ||
      (mode === 'computer' && game.turn() === 'b')
    ) {
      return;
    }

    if (selected && legalMoves.includes(square)) {
      const piece = game.get(selected);

      const needsPromotion =
        piece?.type === 'p' &&
        (square[1] === '8' || square[1] === '1');

      if (needsPromotion) {
        setPromotion({
          from: selected,
          to: square,
        });

        return;
      }

      makeMove(selected, square);
      return;
    }

    const piece = game.get(square);

    if (piece && piece.color === game.turn()) {
      if (selected === square) {
        setSelected(null);
        setLegalMoves([]);
        return;
      }

      setSelected(square);

      const moves = game.moves({
        square,
        verbose: true,
      });

      setLegalMoves(
        [...new Set(moves.map(move => move.to))]
      );
    } else {
      setSelected(null);
      setLegalMoves([]);
    }
  }

  useEffect(() => {
    if (
      !open ||
      mode !== 'computer' ||
      game.turn() !== 'b' ||
      game.isGameOver()
    ) {
      setThinking(false);
      return;
    }

    setThinking(true);

    const timer = window.setTimeout(() => {
      const move = computerMove(game, difficulty);

      if (move) {
        game.move(move);
      }

      setFen(game.fen());
      setHistory(game.history({ verbose: true }));
      setSelected(null);
      setLegalMoves([]);
      setThinking(false);
    }, 450);

    return () => window.clearTimeout(timer);
  }, [fen, open, mode, difficulty, game]);

  function undoMove() {
    if (!game.history().length) return;

    game.undo();

    if (
      mode === 'computer' &&
      game.turn() === 'b' &&
      game.history().length
    ) {
      game.undo();
    }

    setThinking(false);
    refresh();
  }

  function closeGame() {
  setThinking(false);
  onClose();
}

  function statusMessage() {
    if (game.isCheckmate()) {
      return game.turn() === 'w'
        ? '🏆 Black wins!'
        : '🏆 White wins!';
    }

    if (game.isStalemate()) {
      return 'Draw — Stalemate';
    }

    if (game.isThreefoldRepetition()) {
      return 'Draw — Repetition';
    }

    if (game.isInsufficientMaterial()) {
      return 'Draw — Insufficient material';
    }

    if (game.isDraw()) {
      return 'Game drawn';
    }

    if (thinking) {
      return '🤖 Computer is thinking...';
    }

    const player =
      game.turn() === 'w' ? 'White' : 'Black';

    return game.isCheck()
      ? `${player} to move — Check!`
      : `${player} to move`;
  }

  const board = game.board();

  const lastMove = history[history.length - 1];

  const capturedByWhite = history
    .filter(move => move.color === 'w' && move.captured)
    .map(move => PIECES[`b${move.captured}`]);

  const capturedByBlack = history
    .filter(move => move.color === 'b' && move.captured)
    .map(move => PIECES[`w${move.captured}`]);

  return (
    <div className="fixed bottom-5 right-5 z-[100]">
      {open && (
        <div
          role="dialog"
          aria-label="GRK Chess Academy"
          className="mb-3 max-h-[85dvh] w-[min(440px,calc(100vw-40px))] overflow-y-auto rounded-3xl border border-amber-400/40 bg-[#081329] text-white shadow-2xl"
        >
          {/* Header */}

          <div className="flex items-center justify-between border-b border-amber-400/20 bg-[#102747] p-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl text-amber-300">
                ♞
              </span>

              <div>
                <h2 className="text-xl font-black text-amber-300">
                  GRK Chess Academy
                </h2>

                <p className="text-xs text-slate-300">
                  Think • Learn • Win
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeGame}
              aria-label="Close chess game"
              className="rounded-full p-2 hover:bg-white/10"
            >
              <X size={22} />
            </button>
          </div>

          <div className="space-y-3 p-4">

            {/* Game mode */}

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => changeMode('computer')}
                className={`rounded-xl px-2 py-3 text-sm font-bold ${
                  mode === 'computer'
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-[#203453] text-white'
                }`}
              >
                🤖 vs Computer
              </button>

              <button
                type="button"
                onClick={() => changeMode('two-player')}
                className={`rounded-xl px-2 py-3 text-sm font-bold ${
                  mode === 'two-player'
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-[#203453] text-white'
                }`}
              >
                👥 Two Players
              </button>
            </div>

            {/* Difficulty levels */}

            {mode === 'computer' && (
              <div className="grid grid-cols-3 gap-2">
                {(['easy', 'medium', 'hard'] as Difficulty[])
                  .map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setDifficulty(level)}
                      className={`rounded-lg py-2 text-xs font-bold capitalize ${
                        difficulty === level
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-[#203453] text-slate-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
              </div>
            )}

            {/* Game status */}

            <div
              aria-live="polite"
              className="rounded-xl border border-white/10 bg-[#102747] p-3 text-center text-sm font-bold text-amber-300"
            >
              {statusMessage()}
            </div>

            {/* Black captured pieces */}

            <div className="flex min-h-8 items-center justify-between">
              <span className="text-xs font-bold text-slate-400">
                {mode === 'computer'
                  ? '🤖 Computer'
                  : 'Black Player'}
              </span>

              <span className="text-xl">
                {capturedByBlack.join(' ')}
              </span>
            </div>

            {/* Chessboard */}

            <div className="grid grid-cols-8 overflow-hidden rounded-lg border-2 border-amber-400">
              {board.map((row, rowIndex) =>
                row.map((piece, colIndex) => {
                  const square = (
                    'abcdefgh'[colIndex] +
                    (8 - rowIndex)
                  ) as Square;

                  const isLight =
                    (rowIndex + colIndex) % 2 === 0;

                  const isSelected =
                    selected === square;

                  const isLegal =
                    legalMoves.includes(square);

                  const isLastMove =
                    lastMove?.from === square ||
                    lastMove?.to === square;

                  const isCheckedKing =
                    game.isCheck() &&
                    piece?.type === 'k' &&
                    piece.color === game.turn();

                  const background =
                    isCheckedKing
                      ? '#ef7777'
                      : isSelected
                        ? '#facc15'
                        : isLastMove
                          ? '#c5ce76'
                          : isLight
                            ? '#f0d9b5'
                            : '#b58863';

                  return (
                    <button
                      key={square}
                      type="button"
                      aria-label={
                        `${square} ${
                          piece
                            ? piece.color + piece.type
                            : 'empty'
                        }`
                      }
                      onClick={() => selectSquare(square)}
                      style={{ backgroundColor: background }}
                      className="relative flex aspect-square min-w-0 items-center justify-center"
                    >
                      {/* Rank labels */}

                      {colIndex === 0 && (
                        <span className="absolute left-0.5 top-0.5 text-[9px] font-bold text-slate-700">
                          {8 - rowIndex}
                        </span>
                      )}

                      {/* File labels */}

                      {rowIndex === 7 && (
                        <span className="absolute bottom-0 right-0.5 text-[9px] font-bold text-slate-700">
                          {'abcdefgh'[colIndex]}
                        </span>
                      )}

                      {/* Chess pieces */}

                      {piece && (
                        <span
                          style={{
                            color:
                              piece.color === 'w'
                                ? '#fffdf4'
                                : '#111827',
                            textShadow:
                              piece.color === 'w'
                                ? '1px 1px 2px #111827, -1px -1px 1px #111827'
                                : '0 1px 1px #ffffff',
                            fontFamily:
                              'Segoe UI Symbol, Arial Unicode MS, serif',
                            fontSize:
                              'clamp(20px, 8vw, 38px)',
                            lineHeight: 1,
                          }}
                          className="relative z-10 select-none"
                        >
                          {PIECES[
                            `${piece.color}${piece.type}`
                          ]}
                        </span>
                      )}

                      {/* Legal move indicators */}

                      {isLegal && (
                        <span
                          className={
                            piece
                              ? 'absolute inset-1 rounded-full border-4 border-green-700/70'
                              : 'absolute h-3 w-3 rounded-full bg-green-800/50'
                          }
                        />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Pawn promotion */}

            {promotion && (
              <div className="rounded-xl border border-amber-400 bg-[#102747] p-3">
                <p className="mb-3 text-center text-sm font-bold text-amber-300">
                  Choose your promotion piece
                </p>

                <div className="grid grid-cols-4 gap-2">
                  {(['q', 'r', 'b', 'n'] as const)
                    .map(piece => (
                      <button
                        key={piece}
                        type="button"
                        onClick={() =>
                          makeMove(
                            promotion.from,
                            promotion.to,
                            piece
                          )
                        }
                        className="rounded-lg bg-amber-400 py-2 text-3xl text-slate-950"
                      >
                        {PIECES[`${game.turn()}${piece}`]}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* White captured pieces */}

            <div className="flex min-h-8 items-center justify-between">
              <span className="text-xs font-bold text-slate-400">
                {mode === 'computer'
                  ? '👤 You — White'
                  : 'White Player'}
              </span>

              <span className="text-xl">
                {capturedByWhite.join(' ')}
              </span>
            </div>

            {/* Game controls */}

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={undoMove}
                disabled={!history.length}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#203453] py-3 text-sm font-bold disabled:opacity-40"
              >
                <Undo2 size={16} />
                Undo Move
              </button>

              <button
                type="button"
                onClick={newGame}
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-400 py-3 text-sm font-bold text-slate-950 hover:bg-amber-300"
              >
                <RotateCcw size={16} />
                New Game
              </button>
            </div>

            {/* Move history */}

            <div className="rounded-xl border border-white/10 bg-[#102747] p-3">
              <div className="mb-2 flex items-center gap-2">
                <Trophy
                  size={15}
                  className="text-amber-300"
                />

                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Move History
                </h3>
              </div>

              <div className="max-h-24 overflow-y-auto text-xs text-slate-300">
                {history.length === 0 ? (
                  <p>No moves yet. Start playing!</p>
                ) : (
                  Array.from(
                    {
                      length: Math.ceil(
                        history.length / 2
                      ),
                    },
                    (_, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-3 gap-2 border-b border-white/5 py-1"
                      >
                        <span>{i + 1}.</span>

                        <span>
                          {history[i * 2]?.san}
                        </span>

                        <span>
                          {history[i * 2 + 1]?.san || ''}
                        </span>
                      </div>
                    )
                  )
                )}
              </div>
            </div>

            <p className="text-center text-xs text-slate-400">
              Select a piece, then choose a highlighted square.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
