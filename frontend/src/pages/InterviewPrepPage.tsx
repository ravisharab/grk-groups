import { systemDesignQuestions } from '../data/interview/systemDesignQuestions';
import { useState } from 'react';
import { GraduationCap, Search, X, BookOpen, Languages, CheckCircle2 } from 'lucide-react';
import TechnologyCard from '../components/interview/TechnologyCard';
import { technologies } from '../data/interview/technologies';
import { javaQuestions } from '../data/interview/javaQuestions';
import { awsQuestions } from '../data/interview/awsQuestions';
import { kafkaQuestions } from '../data/interview/kafkaQuestions';
import { dockerQuestions } from '../data/interview/dockerQuestions';
import { springBootQuestions } from '../data/interview/springBootQuestions';
import { kubernetesQuestions } from "../data/interview/kubernetesQuestions";

import type { InterviewQuestion } from '../types/interview';

const questionBanks: Record<string, InterviewQuestion[]> = {
  java: javaQuestions,
  aws: awsQuestions,
  kafka: kafkaQuestions,
  docker: dockerQuestions,
  'spring-boot': springBootQuestions,
  kubernetes: kubernetesQuestions,
  'system-design': systemDesignQuestions,
  springboot: springBootQuestions,
};
const availableCount = (slug: string) => (questionBanks[slug] ?? []).filter(q => q.isPublished).length;

export default function InterviewPrepPage() {
  const [search, setSearch] = useState('');
  const query = search.trim().toLowerCase();
  const filteredTechnologies = technologies.filter(t => [t.name, t.description, ...t.topics].some(value => value.toLowerCase().includes(query)));
  const totalQuestions = technologies.reduce((sum, t) => sum + t.targetQuestions, 0);
  const totalAvailable = technologies.reduce((sum, t) => sum + availableCount(t.slug), 0);
  const stats = [
    { value: totalQuestions.toLocaleString(), label: 'Planned Questions' },
    { value: totalAvailable.toLocaleString(), label: 'Available Questions' },
    { value: technologies.length, label: 'Technologies' },
    { value: 2, label: 'Languages' },
  ];
  return (
    <main className="min-h-screen bg-[#06152f] px-4 pb-28 pt-24 text-white sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-7xl">
        <header className="text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-amber-300"><GraduationCap size={18} /> RAVITECH ACADEMY</div>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl lg:text-4xl">Technical <span className="text-amber-300">Interview Preparation</span></h1>
          <p className="mt-1 text-sm text-slate-300">Detailed answers in English &amp; Telugu</p>
        </header>
        <section aria-label="Academy statistics" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {stats.map(stat => <div key={stat.label} className="rounded-xl border border-amber-400/20 bg-[#102747] px-2 py-2 text-center"><p className="text-xl font-black text-amber-300 sm:text-2xl">{stat.value}</p><p className="text-xs text-slate-300">{stat.label}</p></div>)}
        </section>
        <section id="interview-technologies" className="mt-5 scroll-mt-28">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold">Choose Your Technology</h2>
            <div className="flex items-center gap-2 rounded-xl border border-amber-400/30 bg-[#102747] px-3 py-2 sm:w-80">
              <Search size={18} className="shrink-0 text-amber-300" />
              <input type="search" aria-label="Search technologies and topics" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Java, Kafka, Docker..." className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400" />
              {search && <button type="button" aria-label="Clear search" onClick={() => setSearch('')}><X size={18} /></button>}
            </div>
          </div>
          {filteredTechnologies.length > 0 ? <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4">{filteredTechnologies.map(technology => <TechnologyCard key={technology.slug} technology={technology} availableQuestions={availableCount(technology.slug)} />)}</div> : <div className="rounded-xl border border-white/10 bg-[#102747] p-8 text-center"><p>No technologies found.</p><button type="button" onClick={() => setSearch('')} className="mt-3 text-sm font-bold text-amber-300">Clear Search</button></div>}
          {search && <p className="mt-2 text-xs text-slate-400">Showing {filteredTechnologies.length} of {technologies.length} technologies</p>}
        </section>
        <section aria-label="Learning features" className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-300">
          <span className="flex items-center gap-2"><BookOpen size={16} className="text-amber-300" /> Detailed Answers</span>
          <span className="flex items-center gap-2"><Languages size={16} className="text-amber-300" /> English &amp; Telugu</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-300" /> Saved Study Progress</span>
        </section>
        <footer className="mt-5 text-center text-xs font-bold tracking-widest text-amber-300">READ. LEARN. PRACTICE. SUCCEED.<p className="mt-2 text-[10px] text-slate-400">POWERED BY RAVITECH GLOBAL</p></footer>
      </div>
    </main>
  );
}
