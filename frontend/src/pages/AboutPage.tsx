import LeadershipPanel from '../components/LeadershipPanel';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Cloud,
  Code2,
  Database,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: BadgeCheck,
    title: 'Quality First',
    description:
      'We focus on clean engineering, maintainable architecture, and reliable solutions.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We explore modern technologies to solve meaningful business challenges.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description:
      'We believe successful solutions begin with understanding people and their goals.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust & Reliability',
    description:
      'We value transparency, security, and long-term relationships.',
  },
];

const technologies = [
  { icon: Code2, name: 'Java & Spring Boot' },
  { icon: Code2, name: 'React & TypeScript' },
  { icon: Cloud, name: 'AWS Cloud' },
  { icon: Database, name: 'Data Engineering' },
  { icon: Rocket, name: 'Microservices & APIs' },
  { icon: ShieldCheck, name: 'Security & DevOps' },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#06152f] text-white">

      {/* HERO SECTION */}
      <section className="relative isolate min-h-[650px] overflow-hidden px-6 pb-24 pt-44">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/grk-skyline.png')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#06152f]/95 via-[#06152f]/85 to-[#06152f]/55" />

        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.3em] text-amber-300">
            Welcome to GRK Groups
          </p>

          <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
            Building Tomorrow.
            <span className="mt-3 block text-amber-300">
              Empowering Today.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-200">
            GRK Groups is focused on creating modern digital
            solutions that connect technology, innovation,
            and business growth.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-7 py-4 font-bold text-[#06152f] transition hover:bg-amber-200"
            >
              Explore Our Services
              <ArrowUpRight size={19} />
            </Link>

            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-4 font-bold text-white transition hover:bg-white/10"
            >
              Contact Us
              <ArrowRight size={19} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="bg-white px-6 py-24 text-slate-900">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-amber-600">
              Who We Are
            </p>

            <h2 className="text-4xl font-black leading-tight md:text-5xl">
              Technology with Purpose.
              <span className="block text-amber-600">
                Solutions with Impact.
              </span>
            </h2>

            <p className="mt-7 text-lg leading-8 text-slate-600">
              GRK Groups is a technology-focused business
              dedicated to developing practical, scalable,
              and innovative digital solutions.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Our focus spans full-stack application development,
              cloud technologies, data engineering, API integration,
              and modernization of business applications.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              We aim to combine strong technical foundations with
              thoughtful design to create experiences that are
              reliable, efficient, and easy to use.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-amber-100/70 blur-2xl" />
             <div className="relative">
             <LeadershipPanel />
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-[#06152f] p-10 shadow-2xl">
              <div className="mb-12 flex items-center gap-3 text-amber-300">
                <Rocket size={34} />
                <span className="text-sm font-bold uppercase tracking-widest">
                  Our Philosophy
                </span>
              </div>

              <p className="text-3xl font-black leading-snug text-white md:text-4xl">
                Think Bigger.
                <span className="block text-amber-300">
                  Build Smarter.
                </span>
                Grow Together.
              </p>

              <div className="mt-12 h-1 w-24 rounded-full bg-amber-300" />

              <p className="mt-7 leading-8 text-slate-300">
                Technology should simplify challenges,
                create opportunities, and support
                sustainable progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="bg-[#091c39] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-amber-300">
              Our Direction
            </p>

            <h2 className="text-4xl font-black md:text-5xl">
              Mission & Vision
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <article className="rounded-3xl border border-white/10 bg-white/5 p-9 transition hover:border-amber-300/50">
              <Target size={42} className="mb-7 text-amber-300" />

              <h3 className="mb-5 text-3xl font-bold">
                Our Mission
              </h3>

              <p className="leading-8 text-slate-300">
                To develop accessible, secure, and scalable
                technology solutions that help businesses
                improve efficiency, embrace innovation,
                and achieve their digital goals.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/5 p-9 transition hover:border-amber-300/50">
              <Rocket size={42} className="mb-7 text-amber-300" />

              <h3 className="mb-5 text-3xl font-bold">
                Our Vision
              </h3>

              <p className="leading-8 text-slate-300">
                To build a trusted technology brand recognized
                for thoughtful innovation, engineering
                excellence, and meaningful business impact.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-white px-6 py-24 text-slate-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-amber-600">
              What Guides Us
            </p>

            <h2 className="text-4xl font-black md:text-5xl">
              Our Core Values
            </h2>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {values.map(value => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-xl"
                >
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 transition group-hover:bg-amber-300 group-hover:text-[#06152f]">
                    <Icon size={28} />
                  </div>

                  <h3 className="mb-4 text-xl font-bold">
                    {value.title}
                  </h3>

                  <p className="leading-7 text-slate-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY EXPERTISE */}
      <section className="bg-[#06152f] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-amber-300">
              Our Capabilities
            </p>

            <h2 className="text-4xl font-black md:text-5xl">
              Technologies We Focus On
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-300">
              Modern technologies and engineering practices
              designed to support evolving business needs.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {technologies.map(technology => {
              const Icon = technology.icon;

              return (
                <div
                  key={technology.name}
                  className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-amber-300/60 hover:bg-white/10"
                >
                  <Icon size={30} className="shrink-0 text-amber-300" />

                  <span className="text-lg font-semibold">
                    {technology.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-gradient-to-r from-amber-200 to-amber-400 px-6 py-20 text-center text-[#06152f]">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl font-black md:text-5xl">
            Let's Build Something Meaningful.
          </h2>

          <p className="mt-6 text-lg leading-8">
            Explore how GRK Groups can help turn your
            technology ideas into practical solutions.
          </p>

          <Link
            to="/#contact"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#06152f] px-8 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-[#102d56]"
          >
            Get In Touch
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
