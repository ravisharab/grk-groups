
import { Link } from 'react-router-dom';

import {
  ArrowRight,
  Headphones,
  BookOpen,
  Code2,
} from 'lucide-react';

import type { Technology } from '../../types/interview';

interface TechnologyCardProps {
  technology: Technology;
}

export default function TechnologyCard({
  technology,
}: TechnologyCardProps) {

  return (

    <Link
      to={`/interview/${technology.slug}`}
      className={`
        group relative flex h-full flex-col
        overflow-hidden rounded-3xl border
        bg-gradient-to-br p-6
        shadow-xl transition-all duration-300
        hover:-translate-y-2 hover:shadow-2xl
        ${technology.gradient}
        ${technology.border}
      `}
    >

      <div className="mb-5 flex items-start justify-between">

        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-[#06152f]/80 text-5xl shadow-lg">

          {technology.icon}

        </div>

        <div className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">

          Bilingual Learning

        </div>

      </div>

      <h2
        className={`text-2xl font-black ${technology.color}`}
      >

        {technology.name}

      </h2>

      <p className="mt-3 text-sm leading-6 text-slate-300">

        {technology.description}

      </p>

      <div className="my-5 flex flex-wrap gap-2">

        {technology.topics.slice(0, 4).map(topic => (

          <span
            key={topic}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
          >

            {topic}

          </span>

        ))}

      </div>

      <div className="mt-auto space-y-3 border-t border-white/10 pt-5">

        <div className="flex items-center gap-2 text-sm text-slate-300">

          <BookOpen
            size={17}
            className={technology.color}
          />

          {technology.targetQuestions} Planned Questions

        </div>

        <div className="flex items-center gap-2 text-sm text-slate-300">

          <Headphones
            size={17}
            className={technology.color}
          />

          Instructor-style Narration

        </div>

        <div className="flex items-center gap-2 text-sm text-slate-300">

          <Code2
            size={17}
            className={technology.color}
          />

          Practical Examples

        </div>

        <div
          className={`flex items-center justify-between pt-3 font-bold ${technology.color}`}
        >

          Start Learning

          <ArrowRight
            size={20}
            className="transition-transform group-hover:translate-x-2"
          />

        </div>

      </div>

    </Link>
  );
}
