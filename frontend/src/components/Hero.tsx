import FounderBadge from './FounderBadge';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[850px]
                 items-center overflow-hidden bg-[#06152f]
                 px-6 pb-28 pt-44 text-white lg:px-12"
    >
      <div
        className="absolute inset-0 -z-20
                   bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/grk-skyline.png')",
        }}
      />

      <div className="absolute inset-0 -z-10
                      bg-gradient-to-r from-[#06152f]
                      via-[#06152f]/95 to-[#06152f]/35" />

      <div className="grk-float pointer-events-none
                      absolute right-[10%] top-[20%]
                      -z-10 h-72 w-72 rounded-full
                      bg-blue-500/20 blur-3xl" />

      <div className="grk-float-slow pointer-events-none
                      absolute bottom-0 left-0 -z-10
                      h-80 w-80 rounded-full
                      bg-amber-400/10 blur-3xl" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl grk-reveal">

          <div className="mb-8 inline-flex items-center gap-3
                          rounded-full border border-amber-300/40
                          bg-white/10 px-5 py-3
                          text-xs font-bold tracking-widest
                          text-amber-200 backdrop-blur-xl">
            <Sparkles size={17} />
            BUILD • INNOVATE • GROW
          </div>

          <p className="mb-4 text-sm font-bold uppercase
                        tracking-[0.45em] text-amber-300">
            Welcome to
          </p>

          <h1 className="mb-7 text-6xl font-black leading-[1.05]
                         tracking-tight sm:text-7xl lg:text-8xl">
            <span className="text-white">GRK</span>
            <br />
            <span className="grk-gold-text">
              GROUPS
            </span>
          </h1>

          <h2 className="mb-5 max-w-2xl text-2xl
                         font-semibold md:text-3xl">
            Building Digital Solutions for Your Business
          </h2>

          <p className="mb-10 max-w-xl text-lg
                        leading-8 text-slate-300">
            Transforming ambitious ideas into exceptional
            digital experiences with modern technology,
            creative thinking and dependable solutions.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="grk-gold-button inline-flex items-center
                         gap-3 rounded-full px-8 py-4
                         font-bold text-slate-950"
            >
              Get Started <ArrowRight size={20} />
            </a>

            <a
              href="#services"
              className="inline-flex items-center gap-3
                         rounded-full border border-white/40
                         bg-white/10 px-8 py-4
                         font-semibold backdrop-blur-xl
                         transition-all duration-300
                         hover:-translate-y-1
                         hover:bg-white/20"
            >
              Explore Services <ArrowUpRight size={20} />
            </a>
          </div>

          <div className="mt-16 grid max-w-2xl gap-5
                          border-t border-white/20 pt-8
                          sm:grid-cols-3">
            {[
              { icon: ShieldCheck, text: 'Reliable Solutions' },
              { icon: Zap, text: 'Innovative Thinking' },
              { icon: TrendingUp, text: 'Growth Oriented' },
            ].map(item => {
              const Icon = item.icon;

              return (
                <div
                  key={item.text}
                  className="flex items-center gap-3"
                >
                  <Icon
                    size={23}
                    className="shrink-0 text-amber-300"
                  />
                  <span className="text-sm font-medium">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute
                      inset-x-0 bottom-0 h-28
                      bg-gradient-to-t from-[#06152f]/60
                      to-transparent" />
        <FounderBadge />
    </section>
  );
}
