import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import type { Technology } from '../../types/interview';

interface TechnologyCardProps {
  technology: Technology;
  availableQuestions?: number;
}

export default function TechnologyCard({ technology, availableQuestions = 0 }: TechnologyCardProps) {
  const percentage = Math.min(100, Math.round(100 * availableQuestions / Math.max(1, technology.targetQuestions)));
  return (
    <Link to={`/interview/${technology.slug}`} className={`group flex h-full min-w-0 flex-col rounded-2xl border bg-gradient-to-br p-3 sm:p-4 transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-amber-300 ${technology.gradient} ${technology.border}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#06152f]/80 text-2xl">{technology.icon}</span>
        <span className="text-right text-[10px] font-bold text-amber-300">{availableQuestions > 0 ? 'English & Telugu' : 'Coming Soon'}</span>
      </div>
      <h2 className={`mt-2 text-base font-black sm:text-lg ${technology.color}`}>{technology.name}</h2>
      <p className="mt-1 line-clamp-2 text-xs leading-4 text-slate-300">{technology.description}</p>
      <div className="mt-auto pt-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-300"><BookOpen size={14} className={technology.color} />{availableQuestions} / {technology.targetQuestions} questions</div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-label={`${technology.name} content availability`} aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-amber-400" style={{ width: `${percentage}%` }} /></div>
        <div className={`mt-3 flex items-center justify-between gap-1 text-xs font-bold ${technology.color}`}>
          {availableQuestions > 0 ? 'Start Learning' : 'View Topics'}<ArrowRight size={16} className="shrink-0 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
