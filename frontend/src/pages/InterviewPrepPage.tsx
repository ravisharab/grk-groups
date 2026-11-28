
import { useState } from 'react';

import {
  GraduationCap,
  Headphones,
  BookOpen,
  Code2,
  Search,
  Globe,
  Brain,
  Trophy,
  Sparkles,
  CheckCircle2,
  Layers,
  X,
} from 'lucide-react';

import TechnologyCard from '../components/interview/TechnologyCard';

import { technologies } from '../data/interview/technologies';

export default function InterviewPrepPage() {
  const [search, setSearch] = useState('');

  const totalQuestions = technologies.reduce(
    (total, technology) =>
      total + technology.targetQuestions,
    0
  );

  const filteredTechnologies = technologies.filter(
    technology => {
      const query = search.trim().toLowerCase();

      return (
        technology.name.toLowerCase().includes(query) ||
        technology.description.toLowerCase().includes(query) ||
        technology.topics.some(topic =>
          topic.toLowerCase().includes(query)
        )
      );
    }
  );

  const features = [
    {
      icon: Headphones,
      title: 'Detailed Explanations',
      description:
        'Listen to instructor-style technical explanations.',
      color: 'text-amber-400',
    },
    {
      icon: BookOpen,
      title: 'Detailed Answers',
      description:
        'Understand concepts with comprehensive explanations.',
      color: 'text-blue-400',
    },
    {
      icon: Code2,
      title: 'Practical Coding',
      description:
        'Learn through code examples and enterprise scenarios.',
      color: 'text-green-400',
    },
    {
      icon: Globe,
      title: 'Multilingual Learning',
      description:
        'Planned English, Telugu and Hindi narration.',
      color: 'text-purple-400',
    },
    {
      icon: Brain,
      title: 'Mock Interviews',
      description:
        'Practice technical questions and strengthen confidence.',
      color: 'text-pink-400',
    },
    {
      icon: Trophy,
      title: 'Study Progress',
      description:
        'Track your learning and bookmark important questions.',
      color: 'text-orange-400',
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#06152f] pb-28 text-white">

      {/* HERO SECTION */}

      <section className="relative isolate overflow-hidden px-5 pb-16 pt-28 sm:pt-32">

        {/* Background Glow */}

        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/15 blur-[120px]" />

        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl text-center">

          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-amber-400/40 bg-gradient-to-br from-[#18365c] to-[#06152f] shadow-2xl shadow-amber-500/10">

            <GraduationCap
              size={52}
              className="text-amber-300"
            />

          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-2 text-xs font-bold tracking-widest text-amber-300">

            <Sparkles size={15} />

            GRK TECH ACADEMY

          </div>

          <h1 className="text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">

            Master Your Next

            <span className="mt-2 block bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">

              Technical Interview

            </span>

          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">

            Prepare for technical interviews with detailed
            questions, practical coding examples, real-world
            architecture scenarios and instructor-style
            Detailed explanations.

          </p>

          <p className="mt-5 text-sm font-bold tracking-[0.2em] text-amber-300 sm:text-base">

            READ. LISTEN. PRACTICE. SUCCEED.

          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            {[
              'Beginner Friendly',
              'Senior Developer',
              'Technical Lead',
              'Solution Architect',
            ].map(level => (

              <span
                key={level}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200"
              >

                <CheckCircle2
                  size={15}
                  className="text-amber-300"
                />

                {level}

              </span>

            ))}

          </div>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById('interview-technologies')
                ?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
            }
            className="mt-9 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 px-8 py-4 font-black text-[#06152f] shadow-xl shadow-amber-500/20 transition hover:-translate-y-1 hover:shadow-amber-500/40"
          >

            Start Learning

          </button>

        </div>

      </section>

      {/* PLATFORM STATISTICS */}

      <section className="mx-auto max-w-7xl px-5">

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

          {[
            {
              icon: BookOpen,
              value: `${totalQuestions.toLocaleString()}+`,
              label: 'Planned Questions',
            },
            {
              icon: Layers,
              value: technologies.length,
              label: 'Technologies',
            },
            {
              icon: Globe,
              value: '3',
              label: 'Planned Languages',
            },
            {
              icon: Headphones,
              value: '24/7',
              label: 'Self-paced Learning',
            },
          ].map(stat => {

            const Icon = stat.icon;

            return (

              <div
                key={stat.label}
                className="rounded-2xl border border-amber-400/20 bg-gradient-to-br from-[#102747] to-[#081b36] p-5 text-center shadow-xl"
              >

                <Icon
                  size={25}
                  className="mx-auto mb-3 text-amber-300"
                />

                <p className="text-3xl font-black text-amber-300 sm:text-4xl">

                  {stat.value}

                </p>

                <p className="mt-2 text-xs text-slate-300 sm:text-sm">

                  {stat.label}

                </p>

              </div>

            );

          })}

        </div>

      </section>

      {/* TECHNOLOGY SECTION */}

      <section
        id="interview-technologies"
        className="mx-auto max-w-7xl scroll-mt-28 px-5 py-20"
      >

        <div className="mb-10 text-center">

          <p className="text-xs font-bold tracking-[0.3em] text-amber-300">

            EXPLORE TECHNOLOGIES

          </p>

          <h2 className="mt-3 text-3xl font-black sm:text-5xl">

            Choose Your

            <span className="text-amber-300">
              {' '}Learning Path
            </span>

          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">

            Explore interview preparation topics from
            foundational programming to enterprise-level
            distributed system architecture.

          </p>

        </div>

        {/* SEARCH */}

        <div className="mx-auto mb-5 flex max-w-3xl items-center gap-3 rounded-2xl border border-amber-400/30 bg-[#102747] px-5 py-4 shadow-xl focus-within:border-amber-400">

          <Search
            size={22}
            className="shrink-0 text-amber-300"
          />

          <input
            type="search"
            aria-label="Search technologies and topics"
            value={search}
            onChange={event =>
              setSearch(event.target.value)
            }
            placeholder="Search Java, Kafka, Lambda, Docker..."
            className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-slate-400 sm:text-base"
          />

          {search && (

            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearch('')}
              className="rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white"
            >

              <X size={20} />

            </button>

          )}

        </div>

        <p className="mb-6 text-center text-xs text-slate-400">

          Showing {filteredTechnologies.length} of{' '}
          {technologies.length} technologies

        </p>

        {/* TECHNOLOGY CARDS */}

        {filteredTechnologies.length > 0 ? (

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {filteredTechnologies.map(technology => (

              <TechnologyCard
                key={technology.slug}
                technology={technology}
              />

            ))}

          </div>

        ) : (

          <div className="rounded-3xl border border-white/10 bg-[#102747] p-12 text-center">

            <Search
              size={45}
              className="mx-auto mb-4 text-slate-500"
            />

            <h3 className="text-xl font-bold text-white">

              No technologies found

            </h3>

            <p className="mt-2 text-sm text-slate-400">

              Try searching for Java, AWS, Kafka or another topic.

            </p>

            <button
              type="button"
              onClick={() => setSearch('')}
              className="mt-5 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-[#06152f]"
            >

              Clear Search

            </button>

          </div>

        )}

      </section>

      {/* PLATFORM FEATURES */}

      <section className="border-y border-amber-400/10 bg-[#0a1d39] px-5 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">

            <p className="text-xs font-bold tracking-[0.3em] text-amber-300">

              OUR LEARNING VISION

            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">

              More Than Just

              <span className="text-amber-300">
                {' '}Interview Questions
              </span>

            </h2>

            <p className="mt-4 text-sm text-slate-400">

              Features planned for the GRK Tech Academy platform.

            </p>

          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {features.map(feature => {

              const Icon = feature.icon;

              return (

                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-[#102747] p-6 transition hover:border-amber-400/30 hover:bg-[#153154]"
                >

                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#06152f]">

                    <Icon
                      size={28}
                      className={feature.color}
                    />

                  </div>

                  <h3 className="text-lg font-bold">

                    {feature.title}

                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">

                    {feature.description}

                  </p>

                </div>

              );

            })}

          </div>

        </div>

      </section>

      {/* VOICE LEARNING BANNER */}

      <section className="mx-auto max-w-7xl px-5 py-16">

        <div className="relative overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-[#18365c] to-[#06152f] p-8 text-center shadow-2xl sm:p-14">

          <Headphones
            size={65}
            className="mx-auto mb-5 text-amber-300"
          />

          <p className="text-xs font-bold tracking-[0.25em] text-amber-300">

            VOICE-ENABLED LEARNING

          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-5xl">

            Your Personal

            <span className="text-amber-300">
              {' '}Technical Instructor
            </span>

          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">

            Our upcoming voice learning experience will
            explain technical concepts using natural
            narration, practical examples and
            interview-focused guidance.

          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            {[
              'English',
              'తెలుగు',
              'हिन्दी',
              'Adjustable Speed',
              'Podcast Mode',
            ].map(item => (

              <span
                key={item}
                className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-200"
              >

                {item}

              </span>

            ))}

          </div>

          <p className="mt-6 text-xs text-slate-400">

            Voice learning features are under development.

          </p>

        </div>

      </section>

      {/* ACADEMY BRANDING */}

      <section className="px-5 pb-8 text-center">

        <GraduationCap
          size={32}
          className="mx-auto mb-3 text-amber-300"
        />

        <p className="text-sm font-bold tracking-widest text-amber-300">

          GRK TECH ACADEMY

        </p>

        <p className="mt-2 text-xs tracking-wider text-slate-500">

          POWERED BY GRK GROUPS

        </p>

      </section>

    </main>
  );
}
