
import {
  ArrowUpRight,
  Cloud,
  Code2,
  Database,
  ShieldCheck,
  Smartphone,
  Workflow,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description:
      'Modern, scalable web applications built with React, TypeScript, Java, and Spring Boot.',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description:
      'Cloud-native applications, AWS infrastructure, deployment automation, and modernization.',
  },
  {
    icon: Database,
    title: 'Data Engineering',
    description:
      'Reliable data pipelines, integrations, data processing, and analytics solutions.',
  },
  {
    icon: Workflow,
    title: 'API & Microservices',
    description:
      'Secure REST APIs, microservices architecture, event-driven systems, and integrations.',
  },
  {
    icon: Smartphone,
    title: 'Web & Mobile Experiences',
    description:
      'Responsive, accessible, and intuitive digital experiences for businesses and customers.',
  },
  {
    icon: ShieldCheck,
    title: 'Application Modernization',
    description:
      'Modernizing legacy systems with improved security, reliability, and maintainability.',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#06152f] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-44">
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-amber-300">
            GRK Groups / What We Do
          </p>

          <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
            Technology that
            <span className="block text-amber-300">
              moves business forward.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            From modern applications to cloud infrastructure,
            GRK Groups helps businesses build reliable,
            scalable, and future-ready technology solutions.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#0a1d3b] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="mb-4 font-bold uppercase tracking-widest text-amber-300">
              Our Expertise
            </p>

            <h2 className="text-4xl font-bold md:text-5xl">
              Explore Our Services
            </h2>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {services.map(service => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="
                    group rounded-3xl
                    border border-white/10
                    bg-white/5 p-8
                    transition-all duration-300
                    hover:-translate-y-2
                    hover:border-amber-300/60
                    hover:bg-white/10
                    hover:shadow-2xl
                    hover:shadow-amber-500/10
                  "
                >
                  <div
                    className="
                      mb-7 flex h-16 w-16
                      items-center justify-center
                      rounded-2xl bg-amber-300/10
                      text-amber-300
                      transition-colors
                      group-hover:bg-amber-300
                      group-hover:text-[#06152f]
                    "
                  >
                    <Icon size={30} strokeWidth={1.8} />
                  </div>

                  <h3 className="mb-4 text-2xl font-bold">
                    {service.title}
                  </h3>

                  <p className="leading-7 text-slate-300">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl font-black md:text-5xl">
            Have a project in mind?
          </h2>

          <p className="mt-6 text-lg text-slate-300">
            Let's explore how the right technology can
            support your business goals.
          </p>

          <Link
            to="/#contact"
            className="
              mt-9 inline-flex items-center gap-3
              rounded-full bg-amber-300
              px-8 py-4 font-bold text-[#06152f]
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-amber-200
            "
          >
            Let's Talk
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
