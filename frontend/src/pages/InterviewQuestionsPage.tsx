import { pythonQuestions } from '../data/interview/pythonQuestions';
import { codingQuestions } from '../data/interview/codingQuestions';
import { systemDesignQuestions } from '../data/interview/systemDesignQuestions';

import { useState, useEffect, useRef } from 'react';

import { Link, useParams } from 'react-router-dom';

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Trophy,
  RotateCcw,
  GraduationCap,
  Target,
} from 'lucide-react';

import QuestionCard from '../components/interview/QuestionCard';

import { javaQuestions } from '../data/interview/javaQuestions';

import { awsQuestions } from '../data/interview/awsQuestions';
import { technologies } from '../data/interview/technologies';
import { kafkaQuestions } from '../data/interview/kafkaQuestions';
import { dockerQuestions } from '../data/interview/dockerQuestions';
import { springBootQuestions } from '../data/interview/springBootQuestions';
import { kubernetesQuestions } from "../data/interview/kubernetesQuestions";

import type {
  InterviewQuestion,
  Technology,
} from '../types/interview';

interface LearningProgress {
  currentQuestionId: string;
  completedIds: string[];
}

const questionBanks: Record<string, InterviewQuestion[]> = {
  python: pythonQuestions,
  java: javaQuestions,
  aws: awsQuestions,
  kafka: kafkaQuestions,
  docker: dockerQuestions,
  'spring-boot': springBootQuestions,
  kubernetes: kubernetesQuestions,
  'system-design': systemDesignQuestions,
  coding: codingQuestions,
};

function loadProgress(
  storageKey: string,
  questions: InterviewQuestion[]
): LearningProgress {

  const defaultProgress: LearningProgress = {
    currentQuestionId: questions[0]?.id ?? '',
    completedIds: [],
  };

  try {

    const saved = localStorage.getItem(storageKey);

    if (!saved) return defaultProgress;

    const parsed = JSON.parse(saved);

    const validIds = new Set(
      questions.map(question => question.id)
    );

    const completedIds: string[] = Array.isArray(
      parsed.completedIds
    )
      ? [...new Set<string>(
          parsed.completedIds.filter(
            (id: string) => validIds.has(id)
          )
        )]
      : [];

    return {
      currentQuestionId: validIds.has(
        parsed.currentQuestionId
      )
        ? parsed.currentQuestionId
        : defaultProgress.currentQuestionId,

      completedIds,
    };

  } catch {

    return defaultProgress;

  }
}

interface LearningSessionProps {
  technology: Technology;
  questions: InterviewQuestion[];
}

function LearningSession({
  technology,
  questions,
}: LearningSessionProps) {

  const storageKey =
    `grk-interview-progress-${technology.slug}`;

  const [progress, setProgress] = useState(
    () => loadProgress(storageKey, questions)
  );

  const [showSummary, setShowSummary] = useState(
    () => questions.length > 0 &&
      progress.completedIds.length === questions.length
  );

  const [showNavigator, setShowNavigator] =
    useState(false);

  const [storageError, setStorageError] =
    useState(false);

  const questionRef = useRef<HTMLElement>(null);

  const totalQuestions = questions.length;

  const currentIndex = Math.max(
    0,
    questions.findIndex(
      question =>
        question.id === progress.currentQuestionId
    )
  );

  const currentQuestion = questions[currentIndex];

  const completedCount = progress.completedIds.length;

  const remainingCount =
    totalQuestions - completedCount;

  const progressPercentage = totalQuestions > 0
    ? Math.round(
        (completedCount / totalQuestions) * 100
      )
    : 0;

  /* Save learning progress */

  useEffect(() => {

    try {

      localStorage.setItem(
        storageKey,
        JSON.stringify(progress)
      );

      setStorageError(false);

    } catch {

      setStorageError(true);

    }

  }, [progress, storageKey]);

  function scrollToQuestion() {

    questionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

  }

  function goToQuestion(index: number) {

    if (index < 0 || index >= totalQuestions) {
      return;
    }

    setProgress(previous => ({
      ...previous,
      currentQuestionId: questions[index].id,
    }));

    setShowSummary(false);

    scrollToQuestion();

  }

  function completeAndNext() {

    if (!currentQuestion) return;

    const completedIds = [
      ...new Set([
        ...progress.completedIds,
        currentQuestion.id,
      ]),
    ];

    const allCompleted =
      completedIds.length === totalQuestions;

    let nextIndex = currentIndex;

    if (!allCompleted) {

      if (currentIndex < totalQuestions - 1) {

        nextIndex = currentIndex + 1;

      } else {

        nextIndex = questions.findIndex(
          question =>
            !completedIds.includes(question.id)
        );

      }

    }

    setProgress({
      completedIds,
      currentQuestionId:
        questions[nextIndex]?.id ??
        currentQuestion.id,
    });

    setShowSummary(allCompleted);

    scrollToQuestion();

  }

  function restartLearning() {

    const confirmed = window.confirm(
      'Restart learning? Your saved progress for this technology will be cleared.'
    );

    if (!confirmed) return;

    setProgress({
      currentQuestionId: questions[0]?.id ?? '',
      completedIds: [],
    });

    setShowSummary(false);

    scrollToQuestion();

  }

  return (

    <main className="min-h-screen bg-[#06152f] px-4 pb-32 pt-32 text-white sm:px-6">

      <div className="mx-auto max-w-5xl">

        {/* Back Navigation */}

        <Link
          to="/interview"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-amber-300 hover:text-amber-100"
        >
          <ArrowLeft size={18} />
          Back to Interview Prep
        </Link>

        {/* Technology Header */}

        <header
          className={`
            rounded-3xl border bg-gradient-to-br
            p-6 shadow-xl sm:p-8
            ${technology.gradient}
            ${technology.border}
          `}
        >

          <div className="flex items-center gap-4">

            <div className="text-5xl">
              {technology.icon}
            </div>

            <div>

              <p className="text-xs font-bold tracking-widest text-amber-300">
                GRK TECH ACADEMY
              </p>

              <h1 className={`mt-2 text-3xl font-black sm:text-5xl ${technology.color}`}>
                {technology.name}
              </h1>

              <p className="mt-2 text-sm text-slate-300">
                Interview Questions & Answers
              </p>

            </div>

          </div>

          <p className="mt-5 leading-7 text-slate-300">
            {technology.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">

            <span className="flex items-center gap-2 rounded-xl bg-[#06152f]/80 px-4 py-3 text-sm">

              <BookOpen
                size={18}
                className="text-amber-300"
              />

              {totalQuestions} Available

            </span>

            <span className="flex items-center gap-2 rounded-xl bg-[#06152f]/80 px-4 py-3 text-sm">

              <Target
                size={18}
                className="text-amber-300"
              />

              {technology.targetQuestions} Planned

            </span>

            <span className="flex items-center gap-2 rounded-xl bg-[#06152f]/80 px-4 py-3 text-sm">

              <GraduationCap
                size={18}
                className="text-amber-300"
              />

              Self-Paced Learning

            </span>

          </div>

        </header>

        {totalQuestions === 0 ? (

          <section className="mt-10 rounded-3xl border border-amber-400/20 bg-[#102747] p-10 text-center">

            <Clock
              size={48}
              className="mx-auto mb-5 text-amber-300"
            />

            <h2 className="text-2xl font-black text-amber-300">
              Learning Content Coming Soon
            </h2>

            <p className="mt-4 text-slate-300">
              Interview questions and answers for
              {' '}{technology.name} are under development.
            </p>

          </section>

        ) : (

          <>

            {/* Learning Statistics */}

            <section className="mt-8 rounded-3xl border border-white/10 bg-[#102747] p-5 sm:p-6">

              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

                <h2 className="text-lg font-bold text-amber-300">
                  Your Learning Progress
                </h2>

                <button
                  type="button"
                  onClick={restartLearning}
                  className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-300 hover:bg-white/10"
                >

                  <RotateCcw size={15} />

                  Restart

                </button>

              </div>

              <div className="grid grid-cols-3 gap-3">

                <div className="rounded-2xl bg-[#06152f] p-3 text-center sm:p-5">

                  <p className="text-2xl font-black text-green-400 sm:text-4xl">
                    {completedCount}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Completed
                  </p>

                </div>

                <div className="rounded-2xl bg-[#06152f] p-3 text-center sm:p-5">

                  <p className="text-2xl font-black text-amber-300 sm:text-4xl">
                    {remainingCount}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Remaining
                  </p>

                </div>

                <div className="rounded-2xl bg-[#06152f] p-3 text-center sm:p-5">

                  <p className="text-2xl font-black text-blue-300 sm:text-4xl">
                    {progressPercentage}%
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Progress
                  </p>

                </div>

              </div>

              <div
                role="progressbar"
                aria-label="Learning progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressPercentage}
                className="mt-5 h-3 overflow-hidden rounded-full bg-slate-700"
              >

                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-500 transition-all duration-500"
                  style={{
                    width: `${progressPercentage}%`,
                  }}
                />

              </div>

              <p className="mt-3 text-center text-xs text-slate-400">

                {storageError
                  ? 'Progress could not be saved on this browser.'
                  : 'Your learning progress is saved automatically on this browser.'}

              </p>

            </section>

            {/* Current Question */}

            <section
              ref={questionRef}
              className="mt-8 scroll-mt-24"
            >

              {showSummary ? (

                <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-[#102747] to-[#06152f] p-8 text-center sm:p-12">

                  <Trophy
                    size={85}
                    className="mx-auto text-amber-300"
                  />

                  <h2 className="mt-6 text-4xl font-black text-amber-300">
                    Congratulations!
                  </h2>

                  <p className="mt-5 text-lg text-slate-200">
                    You have completed all {totalQuestions}
                    {' '}{technology.name} interview questions.
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-4">

                    <button
                      type="button"
                      onClick={() => goToQuestion(0)}
                      className="rounded-xl border border-amber-400/30 px-6 py-3 font-bold text-amber-300"
                    >
                      Review Questions
                    </button>

                    <button
                      type="button"
                      onClick={restartLearning}
                      className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-[#06152f]"
                    >
                      Start Again
                    </button>

                    <Link
                      to="/interview"
                      className="rounded-xl bg-white/10 px-6 py-3 font-bold"
                    >
                      Explore Technologies
                    </Link>

                  </div>

                </div>

              ) : currentQuestion && (

                <>

                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

                    <span className="text-lg font-bold text-amber-300">
                      Question {currentIndex + 1} of {totalQuestions}
                    </span>

                    {progress.completedIds.includes(
                      currentQuestion.id
                    ) && (

                      <span className="flex items-center gap-2 text-sm text-green-400">

                        <CheckCircle2 size={18} />

                        Completed

                      </span>

                    )}

                  </div>

                  <QuestionCard
                    key={currentQuestion.id}
                    question={currentQuestion}
                    index={currentIndex}
                  />

                  {/* Previous and Next Buttons */}

                  <div className="mt-6 grid grid-cols-2 gap-4">

                    <button
                      type="button"
                      disabled={currentIndex === 0}
                      onClick={() =>
                        goToQuestion(currentIndex - 1)
                      }
                      className="flex items-center justify-center gap-2 rounded-xl border border-amber-400/30 bg-[#102747] px-4 py-4 font-bold text-amber-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                    >

                      <ArrowLeft size={20} />

                      Previous

                    </button>

                    <button
                      type="button"
                      onClick={completeAndNext}
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 px-4 py-4 font-bold text-[#06152f] shadow-lg transition hover:brightness-110"
                    >

                      {remainingCount === 0 ||
                       (
                         remainingCount === 1 &&
                         !progress.completedIds.includes(
                           currentQuestion.id
                         )
                       )
                        ? 'Finish'
                        : 'Complete & Next'}

                      <ArrowRight size={20} />

                    </button>

                  </div>

                </>

              )}

            </section>

            {/* Question Navigator */}

            <section className="mt-8 rounded-2xl border border-white/10 bg-[#102747] p-5">

              <button
                type="button"
                aria-expanded={showNavigator}
                onClick={() =>
                  setShowNavigator(previous => !previous)
                }
                className="flex w-full items-center justify-between font-bold text-amber-300"
              >

                Question Navigator

                <span className="text-xs text-slate-300">
                  {showNavigator ? 'Hide' : 'Show All'}
                </span>

              </button>

              {showNavigator && (

                <>

                  <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-10">

                    {questions.map((question, index) => {

                      const isCurrent =
                        index === currentIndex &&
                        !showSummary;

                      const isCompleted =
                        progress.completedIds.includes(
                          question.id
                        );

                      return (

                        <button
                          key={question.id}
                          type="button"
                          title={question.question}
                          aria-label={`Go to question ${index + 1}${isCompleted ? ', completed' : ''}`}
                          aria-current={
                            isCurrent ? 'step' : undefined
                          }
                          onClick={() => goToQuestion(index)}
                          className={`
                            rounded-lg border py-3
                            text-sm font-bold transition
                            ${
                              isCurrent
                                ? 'border-amber-300 bg-amber-400 text-[#06152f]'
                                : isCompleted
                                  ? 'border-green-400/30 bg-green-500/20 text-green-300'
                                  : 'border-white/10 bg-[#06152f] text-slate-300 hover:border-amber-400'
                            }
                          `}
                        >

                          {index + 1}

                        </button>

                      );

                    })}

                  </div>

                  <div className="mt-5 flex flex-wrap justify-center gap-4 text-xs text-slate-400">

                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded bg-amber-400" />
                      Current
                    </span>

                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded bg-green-500" />
                      Completed
                    </span>

                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded border border-white/20 bg-[#06152f]" />
                      Pending
                    </span>

                  </div>

                </>

              )}

            </section>

          </>

        )}

        {/* Topics Covered */}

        <details className="mt-8 rounded-2xl border border-white/10 bg-[#102747] p-5">

          <summary className="cursor-pointer font-bold text-amber-300">
            Topics Covered
          </summary>

          <div className="mt-5 flex flex-wrap gap-3">

            {technology.topics.map(topic => (

              <span
                key={topic}
                className="rounded-xl border border-white/10 bg-[#06152f] px-4 py-3 text-sm text-slate-300"
              >

                {topic}

              </span>

            ))}

          </div>

        </details>

<div className="mt-10 mb-8 flex justify-center">
  <Link
    to="/interview"
    className="inline-flex items-center justify-center gap-3
      rounded-xl border border-amber-400/50
      bg-[#102747] px-6 py-4 font-bold
      text-amber-300 shadow-lg transition-all
      hover:-translate-y-1 hover:bg-[#18365c]"
  >
    ← 🎓 Back to Interview Preparation
  </Link>
</div>

<p className="mt-10 text-center text-xs font-bold tracking-widest text-slate-500">
  GRK TECH ACADEMY
  <br />
  READ. LEARN. PRACTICE. SUCCEED.
</p>

      </div>

    </main>

  );
}

export default function InterviewQuestionsPage() {

  const { technology: slug } = useParams();

  const technology = technologies.find(
    item => item.slug === slug
  );

  if (!technology) {

    return (

      <main className="min-h-screen bg-[#06152f] px-5 pb-20 pt-36 text-center text-white">

        <h1 className="text-3xl font-bold">
          Technology Not Found
        </h1>

        <Link
          to="/interview"
          className="mt-6 inline-flex items-center gap-2 text-amber-300"
        >

          <ArrowLeft size={18} />

          Back to Interview Prep

        </Link>

      </main>

    );

  }

  const questions = (
    questionBanks[technology.slug] ?? []
  ).filter(question => question.isPublished);

  return (

    <LearningSession
      key={technology.slug}
      technology={technology}
      questions={questions}
    />

  );
}
