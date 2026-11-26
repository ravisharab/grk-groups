
import { useState } from 'react';
import {
  BriefcaseBusiness,
  Code2,
  Cloud,
  GraduationCap,
  X,
} from 'lucide-react';

const skillGroups = [
  {
    title: 'Backend & Architecture',
    skills: [
      'Java',
      'Spring Boot',
      'Microservices',
      'REST APIs',
      'System Design',
      'Distributed Systems',
    ],
  },
  {
    title: 'Frontend Development',
    skills: [
      'React',
      'Angular',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      'AWS',
      'Kubernetes',
      'Docker',
      'Jenkins',
      'CI/CD',
      'OpenShift',
    ],
  },
  {
    title: 'Data & Messaging',
    skills: [
      'Apache Kafka',
      'Redis',
      'Oracle',
      'MySQL',
      'SQL',
      'Hibernate',
    ],
  },
];

export default function FounderBadge() {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);

  const open = hovered || pinned;

  function closeProfile() {
    setHovered(false);
    setPinned(false);
  }

  return (
    <div
      className="fixed bottom-5 left-5 z-[90]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={e => {
        if (e.key === 'Escape') {
          closeProfile();
        }
      }}
    >
      {/* Professional Profile Card */}

      {open && (
        <div className="absolute bottom-full left-0 w-[min(380px,calc(100vw-40px))] pb-3">

          <div
            id="founder-profile"
            className="max-h-[75dvh] overflow-y-auto rounded-3xl border border-amber-400/40 bg-[#06152f] text-white shadow-2xl"
          >

            {/* Profile Header */}

            <div className="relative bg-gradient-to-br from-[#102747] to-[#06152f] p-5">

              <button
                type="button"
                onClick={closeProfile}
                aria-label="Close founder profile"
                className="absolute right-3 top-3 rounded-full p-1.5 text-slate-300 hover:bg-white/10"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-4">

                <img
                  src="/leadership/ravi.jpg"
                  alt="Ganta Ravi Kumar"
                  className="h-16 w-16 shrink-0 rounded-full border-2 border-amber-400 object-cover shadow-lg shadow-amber-400/20"
                />

                <div className="pr-3">

                  <h2 className="text-lg font-black text-amber-300">
                    Ganta Ravi Kumar
                  </h2>

                  <p className="mt-1 text-xs font-semibold text-white">
                    Founder & Senior Software Architect
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    GRK Groups
                  </p>

                </div>

              </div>

            </div>

            <div className="space-y-4 p-4">

              {/* Experience Highlights */}

              <div className="grid grid-cols-2 gap-3">

                <div className="rounded-xl border border-amber-400/20 bg-[#102747] p-3 text-center">

                  <BriefcaseBusiness
                    size={20}
                    className="mx-auto mb-2 text-amber-300"
                  />

                  <p className="text-2xl font-black text-amber-300">
                    15+
                  </p>

                  <p className="mt-1 text-[10px] text-slate-300">
                    Years of Experience
                  </p>

                </div>

                <div className="rounded-xl border border-amber-400/20 bg-[#102747] p-3 text-center">

                  <Cloud
                    size={20}
                    className="mx-auto mb-2 text-amber-300"
                  />

                  <p className="text-lg font-black text-amber-300">
                    Full Stack
                  </p>

                  <p className="mt-1 text-[10px] text-slate-300">
                    Cloud & Architecture
                  </p>

                </div>

              </div>

              {/* Professional Summary */}

              <div>

                <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">

                  <BriefcaseBusiness size={15} />

                  Professional Background

                </h3>

                <p className="text-xs leading-6 text-slate-300">

                  Ganta Ravi Kumar is a Senior Software
                  Architect with over 15 years of experience
                  in enterprise application development,
                  cloud-native architecture, distributed
                  systems and full-stack engineering.

                  He specializes in designing scalable,
                  secure and resilient software solutions
                  using modern technologies and cloud
                  platforms.

                </p>

              </div>

              {/* Technical Expertise */}

              <div className="border-t border-white/10 pt-4">

                <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">

                  <Code2 size={16} />

                  Technical Expertise

                </h3>

                <div className="space-y-4">

                  {skillGroups.map(group => (

                    <div key={group.title}>

                      <p className="mb-2 text-xs font-semibold text-slate-200">
                        {group.title}
                      </p>

                      <div className="flex flex-wrap gap-1.5">

                        {group.skills.map(skill => (

                          <span
                            key={skill}
                            className="rounded-md border border-white/10 bg-[#102747] px-2 py-1 text-[10px] font-medium text-slate-300 transition-colors hover:border-amber-400/50 hover:text-amber-300"
                          >
                            {skill}
                          </span>

                        ))}

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* Education */}

              <div className="border-t border-white/10 pt-4">

                <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">

                  <GraduationCap size={17} />

                  Education

                </h3>

                <p className="text-xs font-semibold text-white">
                  Bachelor of Technology (B.Tech)
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Computer Science & Engineering
                </p>

              </div>

              {/* Founder Vision */}

              <div className="rounded-xl border border-amber-400/20 bg-[#102747] p-3">

                <h3 className="mb-2 text-xs font-bold text-amber-300">
                  Founder’s Vision
                </h3>

                <p className="text-xs italic leading-5 text-slate-300">
                  Building innovative technology solutions,
                  empowering future generations and creating
                  meaningful opportunities through
                  technology and education.
                </p>

              </div>

              {/* Footer */}

              <div className="border-t border-white/10 pt-3 text-center">

                <p className="text-[10px] font-bold tracking-widest text-amber-300">
                  VISIONARY • INNOVATIVE • DRIVEN
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Tiny Founder Badge */}

      <button
        type="button"
        aria-label="View founder professional profile"
        aria-expanded={open}
        aria-controls="founder-profile"
        onClick={() => setPinned(value => !value)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="flex items-center gap-2 rounded-full border border-amber-400/30 bg-[#06152f]/95 p-1.5 pr-4 text-left shadow-lg backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:shadow-amber-400/20"
      >

        <img
          src="/leadership/ravi.jpg"
          alt="GRK Groups Founder"
          className="h-10 w-10 rounded-full border-2 border-amber-400 object-cover"
        />

        <div>

          <p className="text-[11px] font-bold text-white">
            Ganta Ravi Kumar
          </p>

          <p className="text-[10px] font-medium text-amber-300">
            Founder
          </p>

        </div>

      </button>

    </div>
  );
}
