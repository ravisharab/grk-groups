
import { useState } from 'react';
import type { InterviewQuestion } from '../../types/interview';

type ExplanationLanguage = 'en' | 'te' | 'both';

const LANGUAGE_KEY = 'grk-interview-language';

function getSavedLanguage(): ExplanationLanguage {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);

    if (saved === 'en' || saved === 'te' || saved === 'both') {
      return saved;
    }
  } catch {
    // Continue with English if storage is unavailable.
  }

  return 'en';
}

export default function QuestionCard({
  question,
  index,
}: {
  question: InterviewQuestion;
  index: number;
}) {
  const [language, setLanguage] =
    useState<ExplanationLanguage>(getSavedLanguage);

  const languages: {
    value: ExplanationLanguage;
    label: string;
  }[] = [
    { value: 'en', label: 'English' },
    { value: 'te', label: 'తెలుగు' },
    { value: 'both', label: 'Both' },
  ];

  function changeLanguage(value: ExplanationLanguage) {
    setLanguage(value);

    try {
      localStorage.setItem(LANGUAGE_KEY, value);
    } catch {
      // Language selection still works for this card.
    }
  }

  const hasTelugu = Boolean(
    question.detailedAnswerTelugu?.trim()
  );

  const showEnglish =
    language === 'en' ||
    language === 'both' ||
    !hasTelugu;

  const showTelugu =
    language === 'te' || language === 'both';

  return (
    <article className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-[#102747] to-[#081b36] p-6 text-white shadow-2xl sm:p-10">

      {/* Question Number and Difficulty */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-bold tracking-widest text-amber-400">
          QUESTION {String(index + 1).padStart(3, '0')}
        </span>

        <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1 text-xs font-bold uppercase text-amber-300">
          {question.difficulty}
        </span>
      </div>

      {/* Language Selection */}
      <div className="mb-7 rounded-2xl border border-white/10 bg-[#06152f] p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
          Explanation Language
        </p>

        <div
          role="group"
          aria-label="Explanation language"
          className="grid grid-cols-3 gap-2"
        >
          {languages.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={language === item.value}
              onClick={() => changeLanguage(item.value)}
              className={`rounded-xl px-2 py-3 text-sm font-bold transition-all ${
                language === item.value
                  ? 'bg-amber-400 text-[#06152f] shadow-lg'
                  : 'border border-white/10 bg-white/5 text-slate-300 hover:border-amber-400/50 hover:text-amber-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <p className="mt-3 text-xs text-slate-400">
          Learn in your preferred language.
          మీకు నచ్చిన భాషలో నేర్చుకోండి.
        </p>
      </div>

      {/* Topic */}
      <p className="mb-3 text-sm font-semibold text-slate-400">
        {question.topic}
      </p>

      {/* Interview Question */}
      <h2 className="mb-8 text-2xl font-bold leading-relaxed text-white sm:text-3xl">
        {question.question}
      </h2>

      {/* Short Answer */}
      <section className="mb-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5 sm:p-6">
        <h3 className="mb-3 text-lg font-bold text-emerald-300">
          Short Answer
        </h3>

        <p className="whitespace-pre-wrap break-words leading-relaxed text-slate-100">
          {question.shortAnswer}
        </p>
      </section>

      {/* Telugu Availability Notice */}
      {showTelugu && !hasTelugu && (
        <div className="mb-6 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
          <p className="text-sm font-semibold text-amber-300">
            Telugu explanation coming soon.
          </p>

          <p lang="te" className="mt-2 text-sm leading-relaxed text-slate-300">
            ఈ ప్రశ్నకు తెలుగు వివరణ త్వరలో అందుబాటులోకి వస్తుంది.
            ప్రస్తుతానికి English explanation చదవండి.
          </p>
        </div>
      )}

      {/* English Explanation */}
      {showEnglish && (
        <section
          lang="en"
          className="mb-6 rounded-2xl border border-blue-400/20 bg-white/5 p-5 sm:p-6"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-amber-300">
              Detailed Explanation
            </h3>

            <span className="rounded-full bg-blue-400/10 px-3 py-1 text-xs font-bold text-blue-300">
              English
            </span>
          </div>

          <div className="whitespace-pre-wrap break-words text-base leading-8 text-slate-200">
            {question.detailedAnswer}
          </div>
        </section>
      )}

      {/* Telugu Explanation */}
      {showTelugu && hasTelugu && (
        <section
          lang="te"
          className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5 sm:p-6"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-amber-300">
              తెలుగులో వివరణ
            </h3>

            <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
              తెలుగు
            </span>
          </div>

          <div className="whitespace-pre-wrap break-words text-base leading-9 text-slate-100">
            {question.detailedAnswerTelugu}
          </div>
        </section>
      )}

      {/* Footer */}
      <div className="mt-8 border-t border-white/10 pt-5 text-center">
        <p className="text-xs font-bold tracking-widest text-amber-400/70">
          GRK TECH ACADEMY
        </p>

        <p className="mt-2 text-xs text-slate-400">
          Learn. Understand. Practice. Succeed.
        </p>
      </div>

    </article>
  );
}
