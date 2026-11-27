
import { useEffect, useRef, useState } from 'react';

import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Trophy,
  Volume2,
  VolumeX,
  Heart,
  Shield,
  Zap,
} from 'lucide-react';

interface ZombieAttackProps {
  onClose: () => void;
}

type Difficulty = 'easy' | 'medium' | 'hard';

type GameStatus =
  | 'ready'
  | 'playing'
  | 'paused'
  | 'gameover';

type ZombieType =
  | 'normal'
  | 'runner'
  | 'tank'
  | 'boss';

type PowerType =
  | 'health'
  | 'shield'
  | 'rapid';

interface Point {
  x: number;
  y: number;
}

interface Player extends Point {
  health: number;
  angle: number;
  shieldUntil: number;
  rapidUntil: number;
  invincibleUntil: number;
}

interface Zombie extends Point {
  type: ZombieType;
  health: number;
  maxHealth: number;
  speed: number;
  radius: number;
}

interface Bullet extends Point {
  vx: number;
  vy: number;
  life: number;
}

interface PowerUp extends Point {
  type: PowerType;
  life: number;
}

interface GameWorld {
  player: Player;
  zombies: Zombie[];
  bullets: Bullet[];
  powerUps: PowerUp[];
  score: number;
  wave: number;
  spawned: number;
  spawnTimer: number;
  shotTimer: number;
  time: number;
}

const WIDTH = 800;
const HEIGHT = 520;

const STORAGE_KEY = 'grk-zombie-high-score';

const settings = {
  easy: {
    speed: 0.75,
    spawn: 1.3,
    health: 5,
  },
  medium: {
    speed: 1,
    spawn: 0.95,
    health: 4,
  },
  hard: {
    speed: 1.35,
    spawn: 0.65,
    health: 3,
  },
};

const zombieSettings = {
  normal: {
    health: 1,
    speed: 48,
    radius: 17,
    points: 10,
    color: '#86c85b',
  },
  runner: {
    health: 1,
    speed: 100,
    radius: 14,
    points: 20,
    color: '#f59e0b',
  },
  tank: {
    health: 3,
    speed: 30,
    radius: 23,
    points: 40,
    color: '#94a3b8',
  },
  boss: {
    health: 10,
    speed: 38,
    radius: 38,
    points: 150,
    color: '#a78bfa',
  },
};

function distance(a: Point, b: Point) {
  return Math.hypot(
    a.x - b.x,
    a.y - b.y
  );
}

function clamp(
  value: number,
  min: number,
  max: number
) {
  return Math.max(min, Math.min(max, value));
}

function readHighScore() {
  try {
    return Math.max(
      0,
      Number(localStorage.getItem(STORAGE_KEY)) || 0
    );
  } catch {
    return 0;
  }
}

function createWorld(
  difficulty: Difficulty
): GameWorld {

  return {
    player: {
      x: WIDTH / 2,
      y: HEIGHT / 2,
      health: settings[difficulty].health,
      angle: -Math.PI / 2,
      shieldUntil: 0,
      rapidUntil: 0,
      invincibleUntil: 0,
    },

    zombies: [],
    bullets: [],
    powerUps: [],

    score: 0,
    wave: 1,
    spawned: 0,
    spawnTimer: 0,
    shotTimer: 0,
    time: 0,
  };
}

function createZombie(
  type: ZombieType,
  wave: number,
  difficulty: Difficulty
): Zombie {

  const config = zombieSettings[type];

  const side = Math.floor(Math.random() * 4);

  let x = 0;
  let y = 0;

  switch (side) {

    case 0:
      x = Math.random() * WIDTH;
      y = -40;
      break;

    case 1:
      x = WIDTH + 40;
      y = Math.random() * HEIGHT;
      break;

    case 2:
      x = Math.random() * WIDTH;
      y = HEIGHT + 40;
      break;

    default:
      x = -40;
      y = Math.random() * HEIGHT;
  }

  return {
    x,
    y,
    type,

    health: config.health,
    maxHealth: config.health,

    radius: config.radius,

    speed:
      config.speed *
      settings[difficulty].speed *
      Math.min(2.5, 1 + wave * 0.055),
  };
}

function drawCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string
) {

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    radius,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = color;
  ctx.fill();
}

function drawZombie(
  ctx: CanvasRenderingContext2D,
  zombie: Zombie
) {

  const r = zombie.radius;

  ctx.save();

  ctx.translate(zombie.x, zombie.y);

  // Shadow

  ctx.fillStyle = 'rgba(0,0,0,0.25)';

  ctx.beginPath();

  ctx.ellipse(
    0,
    r,
    r,
    r / 3,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();

  // Body

  ctx.fillStyle =
    zombie.type === 'boss'
      ? '#581c87'
      : '#475569';

  ctx.fillRect(
    -r * 0.65,
    r * 0.25,
    r * 1.3,
    r
  );

  // Arms

  ctx.fillStyle =
    zombieSettings[zombie.type].color;

  ctx.fillRect(
    -r * 1.15,
    r * 0.3,
    r * 0.5,
    r * 0.35
  );

  ctx.fillRect(
    r * 0.65,
    r * 0.3,
    r * 0.5,
    r * 0.35
  );

  // Cartoon zombie head

  drawCircle(
    ctx,
    0,
    -r * 0.2,
    r,
    zombieSettings[zombie.type].color
  );

  // Eyes

  drawCircle(
    ctx,
    -r * 0.4,
    -r * 0.4,
    r * 0.26,
    '#ffffff'
  );

  drawCircle(
    ctx,
    r * 0.4,
    -r * 0.4,
    r * 0.26,
    '#ffffff'
  );

  drawCircle(
    ctx,
    -r * 0.35,
    -r * 0.35,
    r * 0.12,
    '#0f172a'
  );

  drawCircle(
    ctx,
    r * 0.45,
    -r * 0.35,
    r * 0.12,
    '#0f172a'
  );

  // Mouth

  ctx.fillStyle = '#334155';

  ctx.fillRect(
    -r * 0.3,
    r * 0.15,
    r * 0.6,
    r * 0.2
  );

  // Boss crown

  if (zombie.type === 'boss') {

    ctx.fillStyle = '#fbbf24';

    ctx.beginPath();

    ctx.moveTo(-r, -r);
    ctx.lineTo(-r, -r * 1.7);
    ctx.lineTo(-r * 0.4, -r * 1.3);
    ctx.lineTo(0, -r * 1.9);
    ctx.lineTo(r * 0.4, -r * 1.3);
    ctx.lineTo(r, -r * 1.7);
    ctx.lineTo(r, -r);

    ctx.closePath();
    ctx.fill();
  }

  // Health bar

  if (zombie.maxHealth > 1) {

    ctx.fillStyle = '#1e293b';

    ctx.fillRect(
      -r,
      r * 1.6,
      r * 2,
      5
    );

    ctx.fillStyle = '#4ade80';

    ctx.fillRect(
      -r,
      r * 1.6,
      r * 2 *
        (zombie.health / zombie.maxHealth),
      5
    );
  }

  ctx.restore();
}

export default function ZombieAttack({
  onClose,
}: ZombieAttackProps) {

  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const keysRef =
    useRef<Set<string>>(new Set());

  const mouseRef =
    useRef<Point | null>(null);

  const firingRef = useRef(false);

  const audioRef =
    useRef<AudioContext | null>(null);

  const [difficulty, setDifficulty] =
    useState<Difficulty>('easy');

  const [status, setStatus] =
    useState<GameStatus>('ready');

  const [muted, setMuted] = useState(true);

  const [highScore, setHighScore] =
    useState(readHighScore);

  const highScoreRef = useRef(highScore);

  const worldRef = useRef<GameWorld>(
    createWorld('easy')
  );

  const [stats, setStats] = useState({
    score: 0,
    wave: 1,
    health: 5,
    shield: false,
    rapid: false,
  });

  function playSound(
    frequency: number,
    duration = 0.08
  ) {

    const audio = audioRef.current;

    if (
      !audio ||
      audio.state !== 'running'
    ) {
      return;
    }

    const oscillator =
      audio.createOscillator();

    const gain = audio.createGain();

    oscillator.type = 'sine';

    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(
      0.035,
      audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audio.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start();

    oscillator.stop(
      audio.currentTime + duration
    );
  }

  async function toggleSound() {

    if (!muted) {
      setMuted(true);
      return;
    }

    try {

      if (!audioRef.current) {
        audioRef.current = new AudioContext();
      }

      await audioRef.current.resume();

      setMuted(false);

    } catch {
      setMuted(true);
    }
  }

  function clearControls() {
    keysRef.current.clear();
    firingRef.current = false;
    mouseRef.current = null;
  }

  function startGame() {

    clearControls();

    worldRef.current =
      createWorld(difficulty);

    setStats({
      score: 0,
      wave: 1,
      health: settings[difficulty].health,
      shield: false,
      rapid: false,
    });

    setStatus('playing');
  }

  function togglePause() {

    clearControls();

    setStatus(previous =>
      previous === 'playing'
        ? 'paused'
        : previous === 'paused'
          ? 'playing'
          : previous
    );
  }

  function saveHighScore(score: number) {

    if (score <= highScoreRef.current) {
      return;
    }

    highScoreRef.current = score;

    setHighScore(score);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        String(score)
      );
    } catch {
      // Continue when storage is unavailable.
    }
  }

  // Keyboard controls

  useEffect(() => {

    const allowedKeys = [
      'w',
      'a',
      's',
      'd',
      'arrowup',
      'arrowdown',
      'arrowleft',
      'arrowright',
      ' ',
    ];

    function keyDown(event: KeyboardEvent) {

      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const key = event.key.toLowerCase();

      if (allowedKeys.includes(key)) {

        if (status !== 'playing') return;

        event.preventDefault();

        keysRef.current.add(key);
      }

      if (
        (key === 'p' || key === 'escape') &&
        !event.repeat
      ) {

        clearControls();

        setStatus(previous =>
          previous === 'playing'
            ? 'paused'
            : previous === 'paused'
              ? 'playing'
              : previous
        );
      }
    }

    function keyUp(event: KeyboardEvent) {

      keysRef.current.delete(
        event.key.toLowerCase()
      );
    }

    function handleBlur() {

      clearControls();

      setStatus(previous =>
        previous === 'playing'
          ? 'paused'
          : previous
      );
    }

    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    window.addEventListener('blur', handleBlur);

    return () => {

      window.removeEventListener(
        'keydown',
        keyDown
      );

      window.removeEventListener(
        'keyup',
        keyUp
      );

      window.removeEventListener(
        'blur',
        handleBlur
      );
    };

  }, [status]);

  // Audio cleanup

  useEffect(() => {

    return () => {

      if (audioRef.current) {

        void audioRef.current.close();

        audioRef.current = null;
      }
    };

  }, []);

  // Main game engine

  useEffect(() => {

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    let animationId = 0;
    let previousTime = 0;
    let lastStatsTime = 0;

    function update(dt: number) {

      const world = worldRef.current;

      const player = world.player;

      world.time += dt;

      const keys = keysRef.current;

      let dx = 0;
      let dy = 0;

      // Movement

      if (
        keys.has('w') ||
        keys.has('arrowup')
      ) dy--;

      if (
        keys.has('s') ||
        keys.has('arrowdown')
      ) dy++;

      if (
        keys.has('a') ||
        keys.has('arrowleft')
      ) dx--;

      if (
        keys.has('d') ||
        keys.has('arrowright')
      ) dx++;

      if (dx !== 0 || dy !== 0) {

        const length = Math.hypot(dx, dy);

        player.x += dx / length * 220 * dt;

        player.y += dy / length * 220 * dt;

        player.angle = Math.atan2(dy, dx);
      }

      player.x = clamp(
        player.x,
        20,
        WIDTH - 20
      );

      player.y = clamp(
        player.y,
        20,
        HEIGHT - 20
      );

      // Mouse aiming or automatic targeting

      const mouse = mouseRef.current;

      if (mouse) {

        player.angle = Math.atan2(
          mouse.y - player.y,
          mouse.x - player.x
        );

      } else if (world.zombies.length > 0) {

        const nearest = world.zombies.reduce(
          (closest, zombie) =>
            distance(player, zombie) <
            distance(player, closest)
              ? zombie
              : closest
        );

        player.angle = Math.atan2(
          nearest.y - player.y,
          nearest.x - player.x
        );
      }

      // Fire energy balls

      world.shotTimer -= dt;

      if (
        (
          keys.has(' ') ||
          firingRef.current
        ) &&
        world.shotTimer <= 0
      ) {

        world.bullets.push({

          x:
            player.x +
            Math.cos(player.angle) * 25,

          y:
            player.y +
            Math.sin(player.angle) * 25,

          vx: Math.cos(player.angle) * 600,

          vy: Math.sin(player.angle) * 600,

          life: 1.5,
        });

        world.shotTimer =
          player.rapidUntil > world.time
            ? 0.09
            : 0.24;

        if (!muted) {
          playSound(480, 0.05);
        }
      }

      // Spawn zombie waves

      const waveTarget =
        5 + world.wave * 3;

      world.spawnTimer -= dt;

      if (
        world.spawned < waveTarget &&
        world.spawnTimer <= 0
      ) {

        let type: ZombieType = 'normal';

        const random = Math.random();

        if (
          world.wave % 5 === 0 &&
          world.spawned === 0
        ) {

          type = 'boss';

        } else if (
          world.wave >= 3 &&
          random < 0.2
        ) {

          type = 'tank';

        } else if (
          world.wave >= 2 &&
          random < 0.45
        ) {

          type = 'runner';
        }

        world.zombies.push(
          createZombie(
            type,
            world.wave,
            difficulty
          )
        );

        world.spawned++;

        world.spawnTimer = Math.max(
          0.25,
          settings[difficulty].spawn -
            world.wave * 0.035
        );
      }

      // Move bullets

      for (const bullet of world.bullets) {

        bullet.x += bullet.vx * dt;
        bullet.y += bullet.vy * dt;

        bullet.life -= dt;
      }

      // Move zombies toward player

      for (const zombie of world.zombies) {

        const angle = Math.atan2(
          player.y - zombie.y,
          player.x - zombie.x
        );

        zombie.x +=
          Math.cos(angle) * zombie.speed * dt;

        zombie.y +=
          Math.sin(angle) * zombie.speed * dt;

        // Player collision

        if (
          distance(player, zombie) <
          zombie.radius + 18
        ) {

          if (
            player.shieldUntil <= world.time &&
            player.invincibleUntil <= world.time
          ) {

            player.health--;

            player.invincibleUntil =
              world.time + 1.5;

            if (!muted) {
              playSound(150, 0.2);
            }
          }

          // Push zombie away

          zombie.x -= Math.cos(angle) * 25;
          zombie.y -= Math.sin(angle) * 25;
        }
      }

      // Bullet collision

      for (const bullet of world.bullets) {

        if (bullet.life <= 0) continue;

        for (const zombie of world.zombies) {

          if (zombie.health <= 0) continue;

          if (
            distance(bullet, zombie) <
            zombie.radius + 5
          ) {

            zombie.health--;

            bullet.life = 0;

            if (zombie.health <= 0) {

              world.score +=
                zombieSettings[zombie.type].points;

              if (!muted) {
                playSound(720, 0.07);
              }

              // Random power-up drop

              if (
                Math.random() < 0.16 ||
                zombie.type === 'boss'
              ) {

                const types: PowerType[] = [
                  'health',
                  'shield',
                  'rapid',
                ];

                world.powerUps.push({

                  x: clamp(
                    zombie.x,
                    20,
                    WIDTH - 20
                  ),

                  y: clamp(
                    zombie.y,
                    20,
                    HEIGHT - 20
                  ),

                  type: types[
                    Math.floor(
                      Math.random() * types.length
                    )
                  ],

                  life: 12,
                });
              }
            }

            break;
          }
        }
      }

      world.zombies = world.zombies.filter(
        zombie => zombie.health > 0
      );

      world.bullets = world.bullets.filter(
        bullet =>
          bullet.life > 0 &&
          bullet.x > -20 &&
          bullet.x < WIDTH + 20 &&
          bullet.y > -20 &&
          bullet.y < HEIGHT + 20
      );

      // Power-ups

      for (const power of world.powerUps) {

        power.life -= dt;

        if (
          power.life > 0 &&
          distance(player, power) < 30
        ) {

          if (power.type === 'health') {

            player.health = Math.min(
              settings[difficulty].health,
              player.health + 1
            );
          }

          if (power.type === 'shield') {

            player.shieldUntil =
              world.time + 8;
          }

          if (power.type === 'rapid') {

            player.rapidUntil =
              world.time + 8;
          }

          power.life = 0;

          if (!muted) {
            playSound(1000, 0.15);
          }
        }
      }

      world.powerUps = world.powerUps.filter(
        power => power.life > 0
      );

      // Next wave

      if (
        world.spawned >= waveTarget &&
        world.zombies.length === 0
      ) {

        world.wave++;

        world.score += 50;

        world.spawned = 0;

        world.spawnTimer = 2;

        if (!muted) {
          playSound(880, 0.25);
        }
      }

      saveHighScore(world.score);

      // Game over

      if (player.health <= 0) {

        player.health = 0;

        clearControls();

        setStatus('gameover');
      }

      // Update React scoreboard

      if (
        world.time - lastStatsTime > 0.1 ||
        player.health <= 0
      ) {

        lastStatsTime = world.time;

        setStats({

          score: world.score,

          wave: world.wave,

          health: player.health,

          shield:
            player.shieldUntil > world.time,

          rapid:
            player.rapidUntil > world.time,
        });
      }
    }

    function draw(
      context: CanvasRenderingContext2D
    ) {

      const world = worldRef.current;

      const player = world.player;

      // Arena background

      context.fillStyle = '#142c25';

      context.fillRect(
        0,
        0,
        WIDTH,
        HEIGHT
      );

      // Arena grid

      context.strokeStyle =
        'rgba(255,255,255,0.05)';

      context.lineWidth = 1;

      for (let x = 0; x < WIDTH; x += 40) {

        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, HEIGHT);
        context.stroke();
      }

      for (let y = 0; y < HEIGHT; y += 40) {

        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(WIDTH, y);
        context.stroke();
      }

      // Power-up icons

      for (const power of world.powerUps) {

        const color =
          power.type === 'health'
            ? '#ef4444'
            : power.type === 'shield'
              ? '#38bdf8'
              : '#fbbf24';

        drawCircle(
          context,
          power.x,
          power.y,
          15,
          color
        );

        context.font = 'bold 20px sans-serif';

        context.textAlign = 'center';

        context.textBaseline = 'middle';

        context.fillStyle = '#ffffff';

        context.fillText(
          power.type === 'health'
            ? '+'
            : power.type === 'shield'
              ? 'S'
              : '⚡',
          power.x,
          power.y
        );
      }

      // Draw zombies

      for (const zombie of world.zombies) {

        drawZombie(context, zombie);
      }

      // Draw energy balls

      for (const bullet of world.bullets) {

        drawCircle(
          context,
          bullet.x,
          bullet.y,
          5,
          '#fde047'
        );
      }

      // Player shield

      if (player.shieldUntil > world.time) {

        drawCircle(
          context,
          player.x,
          player.y,
          32,
          'rgba(56,189,248,0.25)'
        );

        context.strokeStyle = '#38bdf8';

        context.lineWidth = 3;

        context.stroke();
      }

      // Player character

      context.save();

      context.translate(
        player.x,
        player.y
      );

      context.rotate(player.angle);

      if (
        player.invincibleUntil > world.time &&
        Math.floor(world.time * 12) % 2 === 0
      ) {

        context.globalAlpha = 0.45;
      }

      // Energy blaster

      context.fillStyle = '#94a3b8';

      context.fillRect(
        10,
        -6,
        25,
        12
      );

      // Robot body

      drawCircle(
        context,
        0,
        0,
        19,
        '#2563eb'
      );

      context.strokeStyle = '#93c5fd';

      context.lineWidth = 3;

      context.stroke();

      // Robot face

      context.fillStyle = '#bfdbfe';

      context.fillRect(
        -9,
        -12,
        18,
        24
      );

      drawCircle(
        context,
        4,
        -6,
        3,
        '#172554'
      );

      drawCircle(
        context,
        4,
        6,
        3,
        '#172554'
      );

      context.restore();

      // Wave announcement

      if (
        world.spawned === 0 &&
        world.wave > 1
      ) {

        context.fillStyle = '#fbbf24';

        context.font = 'bold 36px sans-serif';

        context.textAlign = 'center';

        context.fillText(
          world.wave % 5 === 0
            ? 'BOSS WAVE!'
            : `WAVE ${world.wave}`,
          WIDTH / 2,
          HEIGHT / 2 - 60
        );
      }
    }

    function frame(timestamp: number) {

      const dt = previousTime
        ? Math.min(
            (timestamp - previousTime) / 1000,
            0.05
          )
        : 0;

      previousTime = timestamp;

      if (status === 'playing') {

        update(dt);
      }

      if (ctx) {
        draw(ctx);
      }

      animationId =
        requestAnimationFrame(frame);
    }

    animationId =
      requestAnimationFrame(frame);

    return () =>
      cancelAnimationFrame(animationId);

  }, [status, difficulty, muted]);

  const controlClass =
    'flex h-14 w-14 touch-none select-none ' +
    'items-center justify-center rounded-xl ' +
    'border border-amber-400/30 bg-[#102747] ' +
    'text-2xl font-bold text-amber-300 ' +
    'active:bg-amber-400 active:text-slate-950';

  function movementButton(
    label: string,
    key: string
  ) {

    return (

      <button
        type="button"
        aria-label={`Move ${key}`}
        className={controlClass}

        onPointerDown={event => {

          event.preventDefault();

          event.currentTarget.setPointerCapture(
            event.pointerId
          );

          mouseRef.current = null;

          keysRef.current.add(key);
        }}

        onPointerUp={() =>
          keysRef.current.delete(key)
        }

        onPointerCancel={() =>
          keysRef.current.delete(key)
        }

        onLostPointerCapture={() =>
          keysRef.current.delete(key)
        }
      >
        {label}
      </button>
    );
  }

  return (

    <div className="fixed inset-0 z-[1000] overflow-y-auto bg-[#06152f] p-3 text-white sm:p-5">

      <div className="mx-auto max-w-5xl pb-8">

        {/* Header */}

        <div className="flex flex-wrap items-center justify-between gap-3">

          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-xl border border-amber-400/30 bg-[#102747] px-4 py-3 font-bold text-amber-300"
          >
            <ArrowLeft size={20} />
            Back to Games
          </button>

          <div className="flex gap-2">

            <button
              onClick={toggleSound}
              aria-label={
                muted ? 'Enable sound' : 'Mute sound'
              }
              className="rounded-xl bg-[#102747] p-3 text-amber-300"
            >

              {muted
                ? <VolumeX size={22} />
                : <Volume2 size={22} />}

            </button>

            <button
              onClick={togglePause}
              disabled={
                status !== 'playing' &&
                status !== 'paused'
              }
              aria-label={
                status === 'paused'
                  ? 'Resume game'
                  : 'Pause game'
              }
              className="rounded-xl bg-[#102747] p-3 text-amber-300 disabled:opacity-40"
            >

              {status === 'paused'
                ? <Play size={22} />
                : <Pause size={22} />}

            </button>

          </div>

        </div>

        {/* Title */}

        <div className="my-5 text-center">

          <div className="text-5xl">
            🧟
          </div>

          <h1 className="mt-2 text-3xl font-black text-amber-400 sm:text-5xl">
            GRK ZOMBIE ATTACK
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Survive • Defend • Level Up
          </p>

        </div>

        {/* Scoreboard */}

        <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">

          {[
            {
              label: 'Score',
              value: stats.score,
            },
            {
              label: 'Wave',
              value: stats.wave,
            },
            {
              label: 'Health',
              value: stats.health,
            },
            {
              label: 'Best Score',
              value: highScore,
            },
          ].map(item => (

            <div
              key={item.label}
              className="rounded-xl border border-amber-400/20 bg-[#102747] p-3 text-center"
            >

              <p className="text-xs text-slate-400">
                {item.label}
              </p>

              <p className="mt-1 text-2xl font-black text-amber-300">
                {item.value}
              </p>

            </div>

          ))}

        </div>

        {/* Active power-ups */}

        <div className="mb-3 flex flex-wrap items-center justify-center gap-4 text-sm">

          <span className="flex items-center gap-2 text-red-400">

            <Heart size={18} fill="currentColor" />

            {stats.health} Lives

          </span>

          {stats.shield && (

            <span className="flex items-center gap-2 text-sky-300">
              <Shield size={18} />
              Shield Active
            </span>

          )}

          {stats.rapid && (

            <span className="flex items-center gap-2 text-yellow-300">
              <Zap size={18} />
              Rapid Fire
            </span>

          )}

        </div>

        {/* Game arena */}

        <div className="relative overflow-hidden rounded-2xl border-2 border-amber-400/40 shadow-2xl">

          <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            aria-label="Zombie Attack game arena"
            className="block h-auto w-full touch-none"

            onPointerMove={event => {

              if (event.pointerType !== 'mouse') {
                return;
              }

              const rect =
                event.currentTarget.getBoundingClientRect();

              mouseRef.current = {

                x:
                  (event.clientX - rect.left) *
                  WIDTH / rect.width,

                y:
                  (event.clientY - rect.top) *
                  HEIGHT / rect.height,
              };
            }}

            onPointerLeave={() => {

              mouseRef.current = null;

              firingRef.current = false;
            }}

            onPointerDown={event => {

              if (status !== 'playing') return;

              event.currentTarget.setPointerCapture(
                event.pointerId
              );

              firingRef.current = true;
            }}

            onPointerUp={() => {
              firingRef.current = false;
            }}

            onPointerCancel={() => {
              firingRef.current = false;
            }}

            onLostPointerCapture={() => {
              firingRef.current = false;
            }}
          />

          {/* Start, pause and game-over screens */}

          {status !== 'playing' && (

            <div className="absolute inset-0 flex items-center justify-center overflow-y-auto bg-[#06152f]/90 p-4 backdrop-blur-sm">

              <div className="w-full max-w-md text-center">

                {status === 'ready' && (

                  <>

                    <h2 className="text-2xl font-black text-amber-400 sm:text-4xl">
                      Ready to Survive?
                    </h2>

                    <p className="my-3 text-xs text-slate-300 sm:text-sm">
                      Defeat cartoon zombies, collect
                      power-ups and survive each wave!
                    </p>

                    <div className="mb-4 grid grid-cols-3 gap-2">

                      {(
                        [
                          'easy',
                          'medium',
                          'hard',
                        ] as Difficulty[]
                      ).map(level => (

                        <button
                          key={level}
                          onClick={() =>
                            setDifficulty(level)
                          }
                          className={`rounded-lg p-2 text-sm font-bold capitalize ${
                            difficulty === level
                              ? 'bg-amber-400 text-slate-950'
                              : 'bg-[#102747] text-amber-300'
                          }`}
                        >
                          {level}
                        </button>

                      ))}

                    </div>

                    <button
                      onClick={startGame}
                      className="mx-auto flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-black text-slate-950"
                    >
                      <Play size={20} />
                      Start Game
                    </button>

                  </>

                )}

                {status === 'paused' && (

                  <>

                    <Pause
                      size={42}
                      className="mx-auto text-amber-400"
                    />

                    <h2 className="my-3 text-3xl font-black text-amber-400">
                      Game Paused
                    </h2>

                    <button
                      onClick={togglePause}
                      className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950"
                    >
                      Resume Game
                    </button>

                  </>

                )}

                {status === 'gameover' && (

                  <>

                    <Trophy
                      size={42}
                      className="mx-auto text-amber-400"
                    />

                    <h2 className="mt-2 text-3xl font-black text-amber-400">
                      Game Over
                    </h2>

                    <p className="my-2 text-lg">
                      Final Score: {stats.score}
                    </p>

                    <p className="mb-3 text-sm text-slate-300">
                      Wave Reached: {stats.wave}
                    </p>

                    <button
                      onClick={startGame}
                      className="mx-auto flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950"
                    >
                      <RotateCcw size={18} />
                      Play Again
                    </button>

                    <button
                      onClick={() => setStatus('ready')}
                      className="mt-2 text-sm text-amber-300 underline"
                    >
                      Change Difficulty
                    </button>

                  </>

                )}

              </div>

            </div>

          )}

        </div>

        {/* Mobile and desktop controls */}

        <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-amber-400/20 bg-[#081329] p-4">

          <div className="flex flex-col items-center gap-1">

            {movementButton('↑', 'arrowup')}

            <div className="flex gap-1">

              {movementButton('←', 'arrowleft')}

              {movementButton('↓', 'arrowdown')}

              {movementButton('→', 'arrowright')}

            </div>

          </div>

          <button
            type="button"
            aria-label="Fire energy blaster"
            className="flex h-24 w-24 touch-none select-none flex-col items-center justify-center rounded-full border-4 border-amber-300 bg-gradient-to-br from-amber-500 to-orange-700 font-black text-white shadow-lg active:scale-95"

            onPointerDown={event => {

              event.preventDefault();

              event.currentTarget.setPointerCapture(
                event.pointerId
              );

              mouseRef.current = null;

              firingRef.current = true;
            }}

            onPointerUp={() => {
              firingRef.current = false;
            }}

            onPointerCancel={() => {
              firingRef.current = false;
            }}

            onLostPointerCapture={() => {
              firingRef.current = false;
            }}
          >
            <Zap size={28} />
            FIRE
          </button>

        </div>

        {/* Instructions */}

        <div className="mt-5 rounded-xl bg-[#102747] p-4 text-center">

          <h3 className="font-bold text-amber-300">
            How to Play
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Desktop: WASD or arrow keys to move.
            Mouse to aim. Space or mouse click to fire.
            Press P to pause.
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Mobile: Use the direction buttons and
            hold FIRE to automatically target
            the nearest zombie.
          </p>

        </div>

        {/* Power-up guide */}

        <div className="mt-4 grid grid-cols-3 gap-2">

          <div className="rounded-xl bg-[#102747] p-3 text-center">

            <Heart className="mx-auto text-red-400" />

            <p className="mt-2 text-xs">
              Health Pack
            </p>

          </div>

          <div className="rounded-xl bg-[#102747] p-3 text-center">

            <Shield className="mx-auto text-sky-400" />

            <p className="mt-2 text-xs">
              8s Shield
            </p>

          </div>

          <div className="rounded-xl bg-[#102747] p-3 text-center">

            <Zap className="mx-auto text-amber-400" />

            <p className="mt-2 text-xs">
              8s Rapid Fire
            </p>

          </div>

        </div>

        <p className="mt-6 text-center text-xs tracking-widest text-slate-500">
          POWERED BY GRK GROUPS
        </p>

      </div>

    </div>
  );
}
