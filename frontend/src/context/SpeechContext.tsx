
import {
  createContext,
  useContext,
} from 'react';

import type { ReactNode } from 'react';

import useSpeech from '../hooks/useSpeech';

type SpeechContextType = ReturnType<typeof useSpeech>;

const SpeechContext =
  createContext<SpeechContextType | null>(null);

interface SpeechProviderProps {
  children: ReactNode;
}

export function SpeechProvider({
  children,
}: SpeechProviderProps) {

  const speech = useSpeech();

  return (
    <SpeechContext.Provider value={speech}>
      {children}
    </SpeechContext.Provider>
  );
}

export function useGlobalSpeech() {

  const context = useContext(SpeechContext);

  if (!context) {
    throw new Error(
      'useGlobalSpeech must be used within SpeechProvider'
    );
  }

  return context;
}
