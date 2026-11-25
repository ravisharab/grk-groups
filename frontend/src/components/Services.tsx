
import {
  ArrowUpRight,
  Cloud,
  Code2,
  Database,
  Layers3,
  ShieldCheck,
  Workflow,
} from 'lucide-react';

const services = [
  {
    title: 'Web Development',
    description:
      'Beautiful, responsive and high-performance web applications built for modern businesses.',
    icon: Code2,
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Cloud Solutions',
    description:
      'Scalable cloud architecture, deployment and infrastructure solutions.',
    icon: Cloud,
    gradient: 'from-indigo-500 to-blue-400',
  },
  {
    title: 'IT Consulting',
    description:
      'Technology strategy, solution architecture and digital transformation.',
    icon: Layers3,
    gradient: 'from-violet-500 to-indigo-400',
  },
  {
    title: 'API & Integration',
    description:
      'Reliable REST APIs and integrations that connect business systems.',
    icon: Workflow,
    gradient: 'from-cyan-500 to-teal-400',
  },
  {
    title: 'Data Solutions',
    description:
      'Data processing, reporting and integration for informed decisions.',
    icon: Database,
    gradient: 'from-amber-500 to-orange-400',
  },
  {
    title: 'Application Modernization',
    description:
      'Modernize legacy applications with secure and maintainable technologies.',
    icon: ShieldCheck,
    gradient: 'from-emerald-500 to-teal-400',
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden
                 bg-[#f4f7fc] px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-bold
                        uppercase tracking-[0.3em]
                        text-blue-700">
            Our Expertise
          </p>

          <h2 className="text-4xl font-black
                         tracking-tight text-slate-900
                         md:text-5xl">
            Solutions That Move
            <span className="text-blue-700"> Business Forward</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl
                        text-lg text-slate-600">
            Discover technology solutions designed
            around your business goals.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2
                        lg:grid-cols-3">
          {services.map(service => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="grk-service-card group relative
                           overflow-hidden rounded-3xl
                           border border-blue-100
                           bg-white p-8 shadow-lg"
              >
                <div
                  className={`mb-7 inline-flex rounded-2xl
                              bg-gradient-to-br p-4
                              text-white shadow-lg
                              ${service.gradient}`}
                >
                  <Icon size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mb-4 text-2xl
                               font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mb-8 min-h-20 leading-7
                              text-slate-600">
                  {service.description}
                </p>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2
                             font-bold text-blue-700
                             transition group-hover:gap-4"
                >
                  Explore Service
                  <ArrowUpRight size={19} />
                </a>

                <div
                  className={`absolute inset-x-0 bottom-0
                              h-1 bg-gradient-to-r
                              ${service.gradient}`}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
