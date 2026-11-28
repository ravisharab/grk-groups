
import { useState } from 'react';

import {
  Headphones,
  Play,
  Pause,
  Square,
  X,
  ChevronUp,
  ChevronDown,
  Volume2,
  VolumeX,
  Gauge,
  AudioLines,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

import {
  useGlobalSpeech,
} from '../../context/SpeechContext';

export default function GlobalAudioPlayer() {

  const speech = useGlobalSpeech();

  const [expanded, setExpanded] =
    useState(false);

  const visible =
    speech.supported &&
    speech.status !== 'idle';

  if (!visible) {
    return null;
  }

  const speeds = [
    0.5,
    0.75,
    1,
    1.25,
    1.5,
    1.75,
    2,
  ];

  const statusLabel =
    speech.isPlaying
      ? 'Now Playing'
      : speech.isPaused
        ? 'Paused'
        : speech.status === 'completed'
          ? 'Completed'
          : 'Playback Error';

  function handlePlayPause() {

    if (speech.isPlaying) {

      speech.pause();

    } else if (speech.isPaused) {

      speech.resume();

    }

  }

  function closePlayer() {

    speech.stop();

    setExpanded(false);

  }

  return (

    <aside
      aria-label="Global narration player"
      className="
        fixed bottom-24 left-4 right-4
        z-[95] overflow-hidden rounded-2xl
        border border-amber-400/40
        bg-[#06152f]/95 text-white
        shadow-2xl shadow-black/40
        backdrop-blur-xl
        sm:left-5 sm:right-auto
        sm:w-[420px]
      "
    >

      {/* Header */}

      <div className="flex items-center gap-3 p-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-200 to-amber-500 text-[#06152f]">

          <Headphones size={26} />

        </div>

        <div className="min-w-0 flex-1">

          <div className="flex items-center gap-2">

            {speech.isPlaying && (

              <AudioLines
                size={15}
                className="animate-pulse text-amber-300"
              />

            )}

            <p
              aria-live="polite"
              className="text-[10px] font-bold uppercase tracking-widest text-amber-300"
            >

              {statusLabel}

            </p>

          </div>

          <p
            title={speech.title}
            className="mt-1 truncate text-sm font-bold"
          >

            {speech.title || 'Voice Explanation'}

          </p>

          <p className="mt-1 text-[11px] text-slate-400">

            GRK Voice Learning

          </p>

        </div>

        <button
          type="button"
          aria-label={
            expanded
              ? 'Collapse audio player'
              : 'Expand audio player'
          }
          aria-expanded={expanded}
          onClick={() =>
            setExpanded(previous => !previous)
          }
          className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10"
        >

          {expanded ? (

            <ChevronDown size={20} />

          ) : (

            <ChevronUp size={20} />

          )}

        </button>

        <button
          type="button"
          aria-label="Close audio player and stop narration"
          onClick={closePlayer}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/20 hover:text-red-300"
        >

          <X size={19} />

        </button>

      </div>

      {/* Progress Bar */}

      <div className="px-4">

        <div
          role="progressbar"
          aria-label="Narration progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={speech.progress}
          className="h-1.5 overflow-hidden rounded-full bg-slate-700"
        >

          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-200 to-amber-500 transition-all duration-300"
            style={{
              width: `${speech.progress}%`,
            }}
          />

        </div>

      </div>

      {/* Playback Controls */}

      <div className="flex items-center justify-between gap-3 px-4 py-3">

        <div className="flex items-center gap-1.5 text-xs text-slate-300">

          <Gauge
            size={16}
            className="text-amber-300"
          />

          {speech.rate}x

        </div>

        <div className="flex items-center gap-4">

          <button
            type="button"
            aria-label="Stop narration"
            onClick={closePlayer}
            className="rounded-full bg-white/5 p-2.5 text-slate-300 transition hover:bg-red-500/20"
          >

            <Square size={17} />

          </button>

          {speech.status === 'completed' ? (

            <div
              aria-label="Narration completed"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300"
            >

              <CheckCircle2 size={26} />

            </div>

          ) : (

            <button
              type="button"
              aria-label={
                speech.isPlaying
                  ? 'Pause narration'
                  : 'Resume narration'
              }
              disabled={
                !speech.isPlaying &&
                !speech.isPaused
              }
              onClick={handlePlayPause}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-amber-500 text-[#06152f] shadow-lg transition hover:scale-105 disabled:opacity-40"
            >

              {speech.isPlaying ? (

                <Pause
                  size={22}
                  fill="currentColor"
                />

              ) : (

                <Play
                  size={22}
                  fill="currentColor"
                />

              )}

            </button>

          )}

          <button
            type="button"
            aria-label={
              speech.volume === 0
                ? 'Unmute narration'
                : 'Mute narration'
            }
            onClick={() =>
              speech.changeVolume(
                speech.volume === 0 ? 1 : 0
              )
            }
            className="rounded-full bg-white/5 p-2.5 text-amber-300 transition hover:bg-white/10"
          >

            {speech.volume === 0 ? (

              <VolumeX size={18} />

            ) : (

              <Volume2 size={18} />

            )}

          </button>

        </div>

        <span className="text-xs font-bold text-amber-300">

          {speech.progress}%

        </span>

      </div>

      {/* Playback Error */}

      {speech.error && (

        <div className="mx-4 mb-4 flex items-start gap-2 rounded-xl bg-red-500/10 p-3 text-xs text-red-300">

          <AlertCircle
            size={16}
            className="shrink-0"
          />

          {speech.error}

        </div>

      )}

      {/* Expanded Settings */}

      {expanded && (

        <div className="max-h-[40dvh] space-y-5 overflow-y-auto border-t border-white/10 bg-[#102747]/60 p-4">

          {/* Speed Control */}

          <div>

            <label className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-300">

              <Gauge
                size={16}
                className="text-amber-300"
              />

              Playback Speed

            </label>

            <div className="flex flex-wrap gap-2">

              {speeds.map(speed => (

                <button
                  key={speed}
                  type="button"
                  aria-pressed={speech.rate === speed}
                  onClick={() =>
                    speech.changeRate(speed)
                  }
                  className={`
                    rounded-lg px-3 py-2
                    text-xs font-bold transition
                    ${
                      speech.rate === speed
                        ? 'bg-amber-400 text-[#06152f]'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }
                  `}
                >

                  {speed}x

                </button>

              ))}

            </div>

          </div>

          {/* Volume */}

          <div>

            <div className="mb-3 flex items-center justify-between">

              <label className="flex items-center gap-2 text-xs font-bold text-slate-300">

                <Volume2
                  size={16}
                  className="text-amber-300"
                />

                Volume

              </label>

              <span className="text-xs text-amber-300">

                {Math.round(speech.volume * 100)}%

              </span>

            </div>

            <input
              type="range"
              aria-label="Global narration volume"
              min={0}
              max={1}
              step={0.05}
              value={speech.volume}
              onChange={event =>
                speech.changeVolume(
                  Number(event.target.value)
                )
              }
              className="w-full cursor-pointer accent-amber-400"
            />

          </div>

          {/* Current Narration */}

          {speech.currentText && (

            <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-3">

              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-amber-300">

                Current Narration

              </p>

              <p className="text-sm leading-6 text-slate-200">

                {speech.currentText}

              </p>

            </div>

          )}

          {speech.status === 'completed' && (

            <p className="rounded-xl bg-emerald-400/10 p-3 text-xs text-emerald-300">

              Explanation completed.
              Return to a question to replay it
              or start another explanation.

            </p>

          )}

          <p className="text-center text-[10px] leading-5 text-slate-400">

            Speed and volume changes apply
            from the next narration segment.

          </p>

        </div>

      )}

      <div className="border-t border-white/5 px-3 py-2 text-center text-[9px] font-bold tracking-widest text-slate-500">

        POWERED BY GRK TECH ACADEMY

      </div>

    </aside>

  );
}
