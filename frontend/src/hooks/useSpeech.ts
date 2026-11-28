
import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';

export type SpeechStatus =
  | 'idle'
  | 'playing'
  | 'paused'
  | 'completed'
  | 'error';

export interface SpeechOptions {
  language?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  voiceURI?: string;
  title?: string;
}

function splitText(text: string): string[] {
  const words = text.trim().split(/\s+/);
  const chunks: string[] = [];

  let current = '';

  for (const word of words) {
    const next = current
      ? `${current} ${word}`
      : word;

    if (next.length > 180 && current) {
      chunks.push(current);
      current = word;
    } else {
      current = next;
    }

    if (/[.!?।]$/.test(current) && current.length >= 60) {
      chunks.push(current);
      current = '';
    }
  }

  if (current) {
    chunks.push(current);
  }

  return chunks;
}

export default function useSpeech() {

  const supported =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    'SpeechSynthesisUtterance' in window;

  const [voices, setVoices] = useState<
    SpeechSynthesisVoice[]
  >([]);

  const [status, setStatus] =
    useState<SpeechStatus>('idle');

  const [error, setError] = useState('');

  const [title, setTitle] = useState('');

  const [currentText, setCurrentText] =
    useState('');

  const [progress, setProgress] =
    useState(0);

  const [rate, setRate] =
    useState(1);

  const [volume, setVolume] =
    useState(1);

  const utteranceRef =
    useRef<SpeechSynthesisUtterance | null>(null);

  const sessionRef = useRef(0);

  const rateRef = useRef(1);

  const volumeRef = useRef(1);

  // Load available browser voices.

  useEffect(() => {

    if (!supported) return;

    const synth = window.speechSynthesis;

    function loadVoices() {
      setVoices(synth.getVoices());
    }

    loadVoices();

    synth.addEventListener(
      'voiceschanged',
      loadVoices
    );

    return () => {

      synth.removeEventListener(
        'voiceschanged',
        loadVoices
      );

      sessionRef.current += 1;

      synth.cancel();

      utteranceRef.current = null;

    };

  }, [supported]);

  // Stop current narration.

  const stop = useCallback(() => {

    sessionRef.current += 1;

    if (supported) {
      window.speechSynthesis.cancel();
    }

    utteranceRef.current = null;

    setStatus('idle');

    setProgress(0);

    setCurrentText('');

    setError('');

  }, [supported]);

  // Start narration.

  const speak = useCallback((
    text: string,
    options: SpeechOptions = {}
  ) => {

    if (!supported) {

      setError(
        'Voice narration is not supported by this browser.'
      );

      setStatus('error');

      return;
    }

    if (!text.trim()) {

      setError('No narration is available.');

      setStatus('error');

      return;
    }

    const synth = window.speechSynthesis;

    const session = ++sessionRef.current;

    synth.cancel();

    if (synth.paused) {
      synth.resume();
    }

    const chunks = splitText(text);

    const language =
      options.language ?? 'en-US';

    const availableVoices =
      synth.getVoices();

    const languageVoices =
      availableVoices.filter(voice =>
        voice.lang.toLowerCase().split('-')[0] ===
        language.toLowerCase().split('-')[0]
      );

    const selectedVoice =
      languageVoices.find(
        voice =>
          voice.voiceURI === options.voiceURI
      ) ??
      languageVoices.find(
        voice =>
          voice.lang.toLowerCase() ===
          language.toLowerCase()
      ) ??
      languageVoices[0];

    if (
      availableVoices.length > 0 &&
      !selectedVoice
    ) {

      setError(
        `No compatible voice is installed for ${language}.`
      );

      setStatus('error');

      return;
    }

    rateRef.current = Math.min(
      2,
      Math.max(
        0.5,
        options.rate ?? rateRef.current
      )
    );

    volumeRef.current = Math.min(
      1,
      Math.max(
        0,
        options.volume ?? volumeRef.current
      )
    );

    setRate(rateRef.current);

    setVolume(volumeRef.current);

    setError('');

    setTitle(
      options.title ?? 'Voice Explanation'
    );

    setProgress(0);

    setStatus('playing');

    function playChunk(index: number) {

      if (session !== sessionRef.current) {
        return;
      }

      if (index >= chunks.length) {

        setStatus('completed');

        setProgress(100);

        setCurrentText('');

        utteranceRef.current = null;

        return;
      }

      const utterance =
        new SpeechSynthesisUtterance(
          chunks[index]
        );

      utterance.lang = language;

      utterance.rate = rateRef.current;

      utterance.pitch = Math.min(
        2,
        Math.max(0, options.pitch ?? 1)
      );

      utterance.volume = volumeRef.current;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utteranceRef.current = utterance;

      setCurrentText(chunks[index]);

      utterance.onstart = () => {

        if (session !== sessionRef.current) {
          return;
        }

        setStatus('playing');

      };

      utterance.onend = () => {

        if (session !== sessionRef.current) {
          return;
        }

        setProgress(
          Math.round(
            ((index + 1) / chunks.length) * 100
          )
        );

        playChunk(index + 1);

      };

      utterance.onerror = event => {

        if (session !== sessionRef.current) {
          return;
        }

        utteranceRef.current = null;

        setError(
          `Voice playback failed: ${event.error}`
        );

        setStatus('error');

      };

      synth.speak(utterance);

    }

    playChunk(0);

  }, [supported]);

  // Pause narration.

  const pause = useCallback(() => {

    if (!supported || status !== 'playing') {
      return;
    }

    window.speechSynthesis.pause();

    setStatus('paused');

  }, [supported, status]);

  // Resume narration.

  const resume = useCallback(() => {

    if (!supported || status !== 'paused') {
      return;
    }

    window.speechSynthesis.resume();

    setStatus('playing');

  }, [supported, status]);

  // Change playback speed.

  const changeRate = useCallback(
    (newRate: number) => {

      const safeRate = Math.min(
        2,
        Math.max(0.5, newRate)
      );

      rateRef.current = safeRate;

      setRate(safeRate);

    },
    []
  );

  // Change playback volume.

  const changeVolume = useCallback(
    (newVolume: number) => {

      const safeVolume = Math.min(
        1,
        Math.max(0, newVolume)
      );

      volumeRef.current = safeVolume;

      setVolume(safeVolume);

    },
    []
  );

  // Filter voices by language.

  const getVoicesByLanguage = useCallback(
    (language: string) => {

      const prefix =
        language.toLowerCase().split('-')[0];

      return voices.filter(voice =>
        voice.lang.toLowerCase().split('-')[0]
          === prefix
      );

    },
    [voices]
  );

  return {

    supported,

    voices,

    status,

    error,

    title,

    currentText,

    progress,

    rate,

    volume,

    isPlaying: status === 'playing',

    isPaused: status === 'paused',

    speak,

    pause,

    resume,

    stop,

    changeRate,

    changeVolume,

    getVoicesByLanguage,

  };
}
