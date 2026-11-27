
import { Shirt, Sparkles, Baby, Gem } from 'lucide-react';

const collections = [
  {
    name: 'Men',
    description: 'Traditional & Regular Wear',
    details: 'Kurta, Sherwani, Shirts, T-Shirts & Jeans',
    icon: Shirt,
  },
  {
    name: 'Women',
    description: 'Traditional & Regular Wear',
    details: 'Sarees, Lehengas, Kurtis & Dresses',
    icon: Sparkles,
  },
  {
    name: 'Kids',
    description: 'Traditional & Regular Wear',
    details: 'Pattu Dresses, Kurta Sets & Casual Wear',
    icon: Baby,
  },
  {
    name: 'Jewellery',
    description: 'Traditional & Contemporary',
    details: 'Necklaces, Earrings, Bangles & Bridal Sets',
    icon: Gem,
  },
];

export default function FashionPage() {
  return (
    <main className="min-h-screen bg-[#06152f] text-white">

      <section className="px-6 pb-16 pt-32 text-center">

        <p className="mb-4 text-sm font-bold tracking-[0.4em] text-amber-400">
          A DIVISION OF GRK GROUPS
        </p>

        <h1 className="text-5xl font-black tracking-wider text-amber-400 md:text-7xl">
          GRK FASHION
        </h1>

        <h2 className="mt-6 text-2xl font-semibold md:text-4xl">
          Celebrate Tradition. Embrace Style.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-slate-300">
          Discover beautiful Indian traditional clothing,
          contemporary fashion and elegant jewellery
          for every generation and every occasion.
        </p>

        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {collections.map(collection => {
            const Icon = collection.icon;

            return (
              <div
                key={collection.name}
                className="rounded-2xl border border-amber-400/30 bg-[#102747] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/10"
              >

                <Icon
                  size={48}
                  className="mx-auto mb-5 text-amber-400"
                />

                <h3 className="text-2xl font-bold text-amber-400">
                  {collection.name}
                </h3>

                <p className="mt-4 font-medium text-white">
                  {collection.description}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {collection.details}
                </p>

                <p className="mt-6 text-xs font-semibold tracking-widest text-amber-300">
                  COLLECTION COMING SOON
                </p>

              </div>
            );
          })}

        </div>

      </section>

    </main>
  );
}
