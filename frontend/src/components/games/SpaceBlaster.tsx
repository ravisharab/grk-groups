
import { useEffect, useRef, useState } from 'react';
import { Gamepad2, X } from 'lucide-react';

type Target = {
  id: number;
  x: number;
  y: number;
  speed: number;
};

type Shot = {
  id: number;
  x: number;
  y: number;
};

const GAME_TIME = 45;

type SpaceBlasterProps = {
  onClose: () => void;
};

export default function SpaceBlaster({
  onClose,
}: SpaceBlasterProps) {
  const open = true;
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [time, setTime] = useState(GAME_TIME);
  const [shipX, setShipX] = useState(50);
  const [targets, setTargets] = useState<Target[]>([]);
  const [shots, setShots] = useState<Shot[]>([]);

  const nextId = useRef(0);
  const lastFire = useRef(0);
  const playingRef = useRef(false);
  const shipRef = useRef(50);
  const targetsRef = useRef<Target[]>([]);
  const shotsRef = useRef<Shot[]>([]);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const timeRef = useRef(GAME_TIME);

  function move(direction: number) {
    shipRef.current = Math.max(
      5,
      Math.min(95, shipRef.current + direction * 6)
    );
    setShipX(shipRef.current);
  }

  function fire() {
    if (!playingRef.current) return;

    const now = performance.now();
    if (now - lastFire.current < 180) return;

    lastFire.current = now;

    const shot: Shot = {
      id: nextId.current++,
      x: shipRef.current,
      y: 85,
    };

    shotsRef.current = [...shotsRef.current, shot];
    setShots([...shotsRef.current]);
  }

  function startGame() {
    nextId.current = 0;
    lastFire.current = 0;
    shipRef.current = 50;
    targetsRef.current = [];
    shotsRef.current = [];
    scoreRef.current = 0;
    livesRef.current = 3;
    timeRef.current = GAME_TIME;
    playingRef.current = true;

    setShipX(50);
    setTargets([]);
    setShots([]);
    setScore(0);
    setLives(3);
    setTime(GAME_TIME);
    setPlaying(true);
  }

  useEffect(() => {
    if (!open || !playing) return;

    let frame = 0;
    let last = performance.now();
    let spawnElapsed = 0;

    function tick(now: number) {
      if (!playingRef.current) return;

      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      timeRef.current = Math.max(
        0,
        timeRef.current - dt
      );

      spawnElapsed += dt;

      if (spawnElapsed >= 1.5) {
        spawnElapsed = 0;

        targetsRef.current.push({
          id: nextId.current++,
          x: 8 + Math.random() * 84,
          y: -8,

          // Falling bots are 15% faster
          speed: 13.8 + Math.random() * 4.6,
        });
      }

      shotsRef.current.forEach(shot => {
        shot.y -= dt * 135;
      });

      targetsRef.current.forEach(target => {
        target.y += dt * target.speed;
      });

      const hitTargets = new Set<number>();
      const hitShots = new Set<number>();

      for (const target of targetsRef.current) {
        for (const shot of shotsRef.current) {
          if (
            hitTargets.has(target.id) ||
            hitShots.has(shot.id)
          ) {
            continue;
          }

          if (
            Math.abs(target.x - shot.x) < 7 &&
            Math.abs(target.y - shot.y) < 7
          ) {
            hitTargets.add(target.id);
            hitShots.add(shot.id);
            scoreRef.current += 10;
          }
        }
      }

      let missed = 0;

      targetsRef.current = targetsRef.current.filter(
        target => {
          if (hitTargets.has(target.id)) {
            return false;
          }

          if (target.y > 100) {
            missed++;
            return false;
          }

          return true;
        }
      );

      shotsRef.current = shotsRef.current.filter(
        shot =>
          !hitShots.has(shot.id) &&
          shot.y > -10
      );

      livesRef.current = Math.max(
        0,
        livesRef.current - missed
      );

      setTargets([...targetsRef.current]);
      setShots([...shotsRef.current]);
      setScore(scoreRef.current);
      setLives(livesRef.current);
      setTime(Math.ceil(timeRef.current));

      if (
        livesRef.current <= 0 ||
        timeRef.current <= 0
      ) {
        playingRef.current = false;
        setPlaying(false);
        return;
      }

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [open, playing]);

  useEffect(() => {
    if (!open || !playing) return;

    function onKeyDown(e: KeyboardEvent) {
      const element = e.target as HTMLElement;

      if (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(
          element.tagName
        )
      ) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        move(-1);
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        move(1);
      }

      if (e.code === 'Space') {
        e.preventDefault();
        fire();
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () =>
      window.removeEventListener(
        'keydown',
        onKeyDown
      );
  }, [open, playing]);

  function closeGame() {
  playingRef.current = false;
  setPlaying(false);
  onClose();
}

  return (
    <div className="fixed bottom-5 right-5 z-[100]">
      {open && (
        <div
          role="dialog"
          aria-label="GRK Kids Space Blaster"
          className="mb-3 flex max-h-[85dvh] w-[min(380px,calc(100vw-40px))] flex-col overflow-hidden rounded-3xl border border-violet-400/30 bg-[#081329] text-white shadow-2xl"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-violet-700 to-blue-700 p-4">
            <div className="flex items-center gap-2">
              <Gamepad2 />
              <h2 className="text-lg font-black">
                GRK Kids Arcade
              </h2>
            </div>

            <button
              type="button"
              onClick={closeGame}
              aria-label="Close game"
              className="rounded-full p-2 hover:bg-white/20"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex justify-between px-4 py-3 text-sm font-bold">
            <span>⭐ {score}</span>
            <span>{'❤️'.repeat(lives)}</span>
            <span>⏱ {time}s</span>
          </div>

          <div
            className="relative mx-3 h-[280px] overflow-hidden rounded-xl bg-[radial-gradient(ellipse_at_bottom,#173873,#060d20_75%)] touch-none"
            onPointerDown={e => {
              if (!playingRef.current) return;

              const rect =
                e.currentTarget.getBoundingClientRect();

              const x =
                ((e.clientX - rect.left) /
                  rect.width) *
                100;

              shipRef.current = Math.max(
                5,
                Math.min(95, x)
              );

              setShipX(shipRef.current);
              fire();
            }}
          >
            {targets.map(target => (
              <div
                key={target.id}
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-3xl"
                style={{
                  left: `${target.x}%`,
                  top: `${target.y}%`,
                }}
              >
                👾
              </div>
            ))}

            {shots.map(shot => (
              <div
                key={shot.id}
                className="pointer-events-none absolute h-5 w-1 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee]"
                style={{
                  left: `${shot.x}%`,
                  top: `${shot.y}%`,
                }}
              />
            ))}

            <div
              className="pointer-events-none absolute bottom-2 -translate-x-1/2 text-4xl"
              style={{
                left: `${shipX}%`,
              }}
            >
              🚀
            </div>

            {!playing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#06152f]/85 text-center">
                <div className="mb-3 text-5xl">
                  🚀 👾
                </div>

                <h3 className="mb-3 text-2xl font-black">
                  {time === GAME_TIME &&
                  score === 0
                    ? 'SPACE BLASTER'
                    : 'GAME OVER!'}
                </h3>

                <p className="mb-5">
                  {time === GAME_TIME &&
                  score === 0
                    ? 'Blast the aliens and earn points!'
                    : `Final Score: ${score}`}
                </p>

                <button
                  type="button"
                  onClick={startGame}
                  className="rounded-xl bg-amber-400 px-7 py-3 font-bold text-slate-950 hover:bg-amber-300"
                >
                  {time === GAME_TIME &&
                  score === 0
                    ? 'Start Game'
                    : 'Play Again'}
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-3 p-4">
            <button
              type="button"
              onClick={() => move(-1)}
              className="rounded-xl bg-violet-700 px-5 py-3 font-bold hover:bg-violet-600"
            >
              ◀
            </button>

            <button
              type="button"
              onClick={fire}
              className="rounded-xl bg-amber-400 px-7 py-3 font-black text-slate-950 hover:bg-amber-300"
            >
              ⚡ FIRE
            </button>

            <button
              type="button"
              onClick={() => move(1)}
              className="rounded-xl bg-violet-700 px-5 py-3 font-bold hover:bg-violet-600"
            >
              ▶
            </button>
          </div>

          <p className="pb-4 text-center text-xs text-slate-300">
            Arrow keys to move • Space to shoot
          </p>
        </div>
      )}
    </div>
  );
}
