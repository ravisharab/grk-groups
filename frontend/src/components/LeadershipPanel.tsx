
import { useState } from 'react';
import { Sparkles, Users } from 'lucide-react';

type TeamMember = {
  name: string;
  role: string;
  image: string;
  initials: string;
  qualities: string[];
};

const teamMembers: TeamMember[] = [
  {
    name: 'Ganta Ravi Kumar',
    role: 'Founder',
    image: '/leadership/ravi.jpg',
    initials: 'GR',
    qualities: ['Visionary', 'Innovative', 'Driven'],
  },
  {
    name: 'Manasa Mamidla',
    role: 'Chief Executive Officer',
    image: '/leadership/manasa.jpg',
    initials: 'MM',
    qualities: ['Leadership', 'Strategic', 'Dedicated'],
  },
  {
    name: 'Suhan Nanda Ramana Ganta',
    role: 'Junior Innovation Ambassador',
    image: '/leadership/suhan.jpg',
    initials: 'SG',
    qualities: ['Curiosity', 'Imagination', 'Exploration'],
  },
  {
    name: 'Sanvika Sri Ganta',
    role: 'Junior Creative Ambassador',
    image: '/leadership/Sanvika.jpg',
    initials: 'SS',
    qualities: ['Creativity', 'Kindness', 'Imagination'],
  },
];

function MemberPhoto({ member }: { member: TeamMember }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="
        mb-4 flex h-20 w-20 shrink-0 items-center
        justify-center overflow-hidden rounded-full
        border-[3px] border-amber-300
        bg-[#1d3858]
        shadow-lg shadow-amber-500/20
        transition-transform duration-300
        group-hover:scale-110
        sm:h-24 sm:w-24
      "
    >
      {imageError ? (
        <span className="text-xl font-black text-amber-300">
          {member.initials}
        </span>
      ) : (
        <img
          src={member.image}
          alt={`Portrait of ${member.name}`}
          loading="lazy"
          onError={() => setImageError(true)}
          className="h-full w-full object-cover object-center"
        />
      )}
    </div>
  );
}

export default function LeadershipPanel() {
  return (
    <section className="rounded-[2rem] border border-amber-300/20 bg-[#06152f] p-5 text-white shadow-2xl sm:p-7">
      <div className="mb-8 text-center">
        <div className="mb-3 flex items-center justify-center gap-2 text-amber-300">
          <Users size={20} />

          <span className="text-xs font-bold uppercase tracking-[0.2em]">
            GRK Groups
          </span>
        </div>

        <h3 className="text-2xl font-black sm:text-3xl">
          Meet Our Team
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          The people and next generation behind our vision.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {teamMembers.map(member => (
          <article
            key={member.name}
            className="
              group flex min-w-0 flex-col items-center
              rounded-2xl border border-white/10
              bg-[#102747] p-3 text-center
              transition-all duration-300
              hover:-translate-y-1
              hover:border-amber-300/60
              hover:shadow-lg hover:shadow-amber-500/10
              sm:p-5
            "
          >
            <MemberPhoto member={member} />

            <h4 className="text-sm font-bold leading-5 text-white sm:text-base">
              {member.name}
            </h4>

            <p className="mt-2 min-h-10 text-xs font-semibold leading-5 text-amber-300">
              {member.role}
            </p>

            <div className="mt-3 h-px w-12 bg-amber-300/40" />

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {member.qualities.map(quality => (
                <span
                  key={quality}
                  className="
                    rounded-full border border-white/10
                    bg-white/5 px-2.5 py-1
                    text-[11px] text-slate-200
                  "
                >
                  {quality}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-center gap-2 border-t border-white/10 pt-5 text-center">
        <Sparkles size={15} className="text-amber-300" />

        <p className="text-xs font-medium tracking-widest text-slate-400">
          OUR PEOPLE • OUR FUTURE
        </p>
      </div>
    </section>
  );
}
