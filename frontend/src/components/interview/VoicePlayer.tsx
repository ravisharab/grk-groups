
import { useState } from 'react';

import {
  Headphones,
  Play,
  Pause,
  Square,
  RotateCcw,
  Volume2,
  VolumeX,
  Globe,
  Gauge,
  Mic2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

import {
  useGlobalSpeech,
} from '../../context/SpeechContext';

interface VoicePlayerProps {
  title: string;
  narrationEnglish: string;
  narrationTelugu?: string;
  narrationHindi?: string;
}

const languages = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-IN', label: 'English (India)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'te-IN', label: 'తెలుగు (Telugu)' },
  { value: 'hi-IN', label: 'हिन्दी (Hindi)' },
];

const playbackSpeeds = [
  0.5,
  0.75,
  1,
  1.25,
  1.5,
  1.75,
  2,
];

export default function VoicePlayer({
  title,
  narrationEnglish,
  narrationTelugu,
  narrationHindi,
}: VoicePlayerProps) {

  const speech = useGlobalSpeech();

  const [language, setLanguage] =
    useState('en-US');

  const [voiceURI, setVoiceURI] =
    useState('');

  const isCurrent =
    speech.title === title;

  const isPlaying =
    isCurrent && speech.isPlaying;

  const isPaused =
    isCurrent && speech.isPaused;

  const isCompleted =
    isCurrent && speech.status === 'completed';

  const isActive =
    isPlaying || isPaused;

  const availableVoices =
    speech.getVoicesByLanguage(language);

  const progress =
    isCurrent ? speech.progress : 0;

  function getNarration(): string {

    switch (language) {

      case 'te-IN':
        return narrationTelugu ?? '';

      case 'hi-IN':
        return narrationHindi ?? '';

      default:
        return narrationEnglish;

    }
  }

  const narration = getNarration();

  const hasNarration =
    Boolean(narration.trim());

  const hasCompatibleVoice =
    speech.voices.length === 0 ||
    availableVoices.length > 0;

  function startNarration() {

    if (!hasNarration) return;

    speech.speak(narration, {
      title,
      language,
      rate: speech.rate,
      volume: speech.volume,
      voiceURI: voiceURI || undefined,
    });
  }

  function handlePlayPause() {

    if (isPlaying) {

      speech.pause();

    } else if (isPaused) {

      speech.resume();

    } else {

      startNarration();

    }
  }

  function handleLanguageChange(
    newLanguage: string
  ) {

    if (isActive) {
      speech.stop();
    }

    setLanguage(newLanguage);

    setVoiceURI('');
  }

  if (!speech.supported) {

    return (
      <div className="flex items-center gap-3 rounded-2xl border border-amber-400/20 bg-[#102747] p-5 text-amber-300">

        <AlertCircle
          size={22}
          className="shrink-0"
        />

        <p className="text-sm">
          Voice narration is not supported
          by your current browser.
        </p>

      </div>
    );
  }

  return (

    <section className="overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-[#102747] to-[#06152f] p-5 text-white shadow-xl sm:p-6">

      {/* Player Header */}

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10">

          <Headphones
            size={30}
            className="text-amber-300"
          />

        </div>

        <div className="min-w-0">

          <h3 className="text-lg font-black text-amber-300">

            GRK Voice Learning

          </h3>

          <p className="mt-1 text-xs text-slate-400">

            Your personal technical instructor

          </p>

        </div>

      </div>

      {/* Question Title */}

      <div className="mt-5 rounded-xl bg-black/20 p-4">

        <p className="text-xs font-bold uppercase tracking-widest text-amber-300">

          Instructor Explanation

        </p>

        <p className="mt-2 text-sm font-semibold leading-6">

          {title}

        </p>

      </div>

      {/* Decorative Audio Wave */}

      <div
        aria-hidden="true"
        className="my-6 flex h-12 items-center justify-center gap-1 overflow-hidden"
      >

        {Array.from(
          { length: 36 },
          (_, index) => {

            const height =
              10 +
              Math.abs(
                Math.sin(index * 1.7) *
                Math.cos(index * 0.3)
              ) * 36;

            return (

              <div
                key={index}
                className={`
                  w-1 rounded-full sm:w-1.5
                  ${
                    isPlaying
                      ? 'animate-pulse bg-amber-400'
                      : isCompleted
                        ? 'bg-emerald-400'
                        : 'bg-slate-600'
                  }
                `}
                style={{
                  height: `${height}px`,
                  animationDelay: `${index * 45}ms`,
                }}
              />

            );

          }
        )}

      </div>

      {/* Playback Progress */}

      <div className="mb-5">

        <div
          role="progressbar"
          aria-label="Narration progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="h-2 overflow-hidden rounded-full bg-slate-700"
        >

          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />

        </div>

        <div className="mt-2 flex justify-between text-xs text-slate-400">

          <span>
            {isPlaying
              ? 'Playing'
              : isPaused
                ? 'Paused'
                : isCompleted
                  ? 'Completed'
                  : 'Ready to listen'}
          </span>

          <span>{progress}%</span>

        </div>

      </div>

      {/* Playback Controls */}

      <div className="flex items-center justify-center gap-6">

        <button
          type="button"
          aria-label="Restart narration"
          title="Restart narration"
          disabled={
            !hasNarration ||
            !hasCompatibleVoice
          }
          onClick={startNarration}
          className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:bg-white/10 disabled:opacity-40"
        >

          <RotateCcw size={22} />

        </button>

        <button
          type="button"
          aria-label={
            isPlaying
              ? 'Pause narration'
              : isPaused
                ? 'Resume narration'
                : 'Play narration'
          }
          disabled={
            !hasNarration ||
            !hasCompatibleVoice
          }
          onClick={handlePlayPause}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-amber-500 text-[#06152f] shadow-xl shadow-amber-500/20 transition hover:scale-105 disabled:opacity-40"
        >

          {isPlaying ? (

            <Pause
              size={30}
              fill="currentColor"
            />

          ) : (

            <Play
              size={30}
              fill="currentColor"
            />

          )}

        </button>

        <button
          type="button"
          aria-label="Stop narration"
          title="Stop narration"
          disabled={!isActive}
          onClick={speech.stop}
          className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:bg-red-500/20 hover:text-red-300 disabled:opacity-40"
        >

          <Square size={22} />

        </button>

      </div>

      {/* Language and Speed */}

      <div className="mt-7 grid grid-cols-1 gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">

        <div>

          <label className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-300">

            <Globe
              size={16}
              className="text-amber-300"
            />

            Language

          </label>

          <select
            aria-label="Narration language"
            value={language}
            onChange={event =>
              handleLanguageChange(
                event.target.value
              )
            }
            className="w-full rounded-xl border border-white/10 bg-[#06152f] px-3 py-3 text-sm text-white outline-none focus:border-amber-400"
          >

            {languages.map(item => (

              <option
                key={item.value}
                value={item.value}
                disabled={
                  (
                    item.value === 'te-IN' &&
                    !narrationTelugu?.trim()
                  ) ||
                  (
                    item.value === 'hi-IN' &&
                    !narrationHindi?.trim()
                  )
                }
              >

                {item.label}

              </option>

            ))}

          </select>

        </div>

        <div>

          <label className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-300">

            <Gauge
              size={16}
              className="text-amber-300"
            />

            Playback Speed

          </label>

          <select
            aria-label="Playback speed"
            value={speech.rate}
            onChange={event =>
              speech.changeRate(
                Number(event.target.value)
              )
            }
            className="w-full rounded-xl border border-white/10 bg-[#06152f] px-3 py-3 text-sm text-white outline-none focus:border-amber-400"
          >

            {playbackSpeeds.map(speed => (

              <option
                key={speed}
                value={speed}
              >

                {speed === 1
                  ? '1.0x — Normal'
                  : `${speed}x`}

              </option>

            ))}

          </select>

        </div>

      </div>

      {/* Voice Selection */}

      <div className="mt-4">

        <label className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-300">

          <Mic2
            size={16}
            className="text-amber-300"
          />

          Instructor Voice

        </label>

        <select
          aria-label="Instructor voice"
          value={voiceURI}
          onChange={event => {

            if (isActive) {
              speech.stop();
            }

            setVoiceURI(event.target.value);

          }}
          className="w-full rounded-xl border border-white/10 bg-[#06152f] px-3 py-3 text-sm text-white outline-none focus:border-amber-400"
        >

          <option value="">
            Automatic — Best Available Voice
          </option>

          {availableVoices.map(voice => (

            <option
              key={voice.voiceURI}
              value={voice.voiceURI}
            >

              {voice.name} ({voice.lang})

            </option>

          ))}

        </select>

      </div>

      {/* Volume Control */}

      <div className="mt-6 flex items-center gap-4">

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
          className="text-amber-300"
        >

          {speech.volume === 0 ? (

            <VolumeX size={23} />

          ) : (

            <Volume2 size={23} />

          )}

        </button>

        <input
          type="range"
          aria-label="Narration volume"
          min={0}
          max={1}
          step={0.05}
          value={speech.volume}
          onChange={event =>
            speech.changeVolume(
              Number(event.target.value)
            )
          }
          className="min-w-0 flex-1 cursor-pointer accent-amber-400"
        />

        <span className="w-10 text-right text-xs text-slate-300">

          {Math.round(speech.volume * 100)}%

        </span>

      </div>

      {/* Currently Spoken Section */}

      {isActive && speech.currentText && (

        <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">

          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-300">

            Currently Speaking

          </p>

          <p className="text-sm leading-7 text-amber-100">

            {speech.currentText}

          </p>

        </div>

      )}

      {/* Completed Message */}

      {isCompleted && (

        <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-300">

          <CheckCircle2 size={19} />

          Explanation completed successfully.

        </div>

      )}

      {/* Error Messages */}

      {!hasCompatibleVoice && (

        <p className="mt-4 rounded-xl bg-amber-400/10 p-3 text-xs leading-6 text-amber-300">

          No compatible voice was found for
          this language on your device.
          Please select another language.

        </p>

      )}

      {isCurrent && speech.error && (

        <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-500/10 p-3 text-sm text-red-300">

          <AlertCircle
            size={18}
            className="shrink-0"
          />

          {speech.error}

        </div>

      )}

      <p className="mt-5 text-center text-[11px] leading-5 text-slate-500">

        Powered by GRK Tech Academy · Browser Voice Engine

        <br />

        Speed and volume changes apply from
        the next narration segment.

      </p>

    </section>

  );
}
