
import { useState } from 'react';

import {
  ArrowDown,
  ArrowUpRight,
  Shirt,
  Sparkles,
  Baby,
  Gem,
  ShoppingBag,
} from 'lucide-react';

import ProductCatalog from '../components/fashion/ProductCatalog';

const collections = [
  {
    name: 'Men',
    slug: 'men',
    image: '/fashion/men/cover.jpg',
    icon: Shirt,
    description:
      'Traditional elegance and contemporary styles for every occasion.',
    types: [
      'Kurtas',
      'Sherwanis',
      'Shirts',
      'Casual Wear',
    ],
  },
  {
    name: 'Women',
    slug: 'women',
    image: '/fashion/women/cover.jpg',
    icon: Sparkles,
    description:
      'Discover beautiful ethnic, bridal and modern fashion collections.',
    types: [
      'Sarees',
      'Lehengas',
      'Salwar Suits',
      'Party Wear',
    ],
  },
  {
    name: 'Kids',
    slug: 'kids',
    image: '/fashion/kids/cover.jpg',
    icon: Baby,
    description:
      'Comfortable and stylish outfits for your little ones.',
    types: [
      'Traditional Wear',
      'Party Wear',
      'Casual Wear',
      'Festive Wear',
    ],
  },
  {
    name: 'Jewellery',
    slug: 'jewellery',
    image: '/fashion/jewellery/cover.jpg',
    icon: Gem,
    description:
      'Timeless jewellery inspired by tradition and modern craftsmanship.',
    types: [
      'Necklaces',
      'Earrings',
      'Bangles',
      'Bridal Jewellery',
    ],
  },
];

export default function FashionPage() {

  const [selectedCategory, setSelectedCategory] =
    useState('all');

  function exploreCollection(slug: string) {

    setSelectedCategory(slug);

    document
      .getElementById('fashion-catalog')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  }

  return (
    <main className="min-h-screen bg-[#06152f] pb-16 pt-28 text-white">

      {/* Fashion Hero */}

      <section className="mx-auto max-w-7xl px-4 pb-14 pt-10 text-center sm:px-6 lg:px-8">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-amber-400/40 bg-[#102747]">

          <ShoppingBag
            size={38}
            className="text-amber-400"
          />

        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.4em] text-amber-400">
          A GRK Groups Brand
        </p>

        <h1 className="mt-5 bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-5xl font-black text-transparent md:text-7xl">
          GRK FASHION
        </h1>

        <h2 className="mt-5 text-xl font-light text-white md:text-3xl">
          Tradition Meets Modern Elegance
        </h2>

        <p className="mx-auto mt-6 max-w-3xl leading-relaxed text-slate-300">
          Discover carefully curated fashion
          collections for men, women and kids,
          complemented by timeless jewellery
          inspired by Indian heritage.
        </p>

        <button
          type="button"
          onClick={() => exploreCollection('all')}
          className="mx-auto mt-8 flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-200 to-amber-500 px-8 py-4 font-bold text-slate-950 transition hover:brightness-110"
        >
          Explore All Products
          <ArrowDown size={20} />
        </button>

      </section>

      {/* Fashion Collections */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="mb-10 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Discover Your Style
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Our Fashion Collections
          </h2>

        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {collections.map(collection => {

            const Icon = collection.icon;

            return (
              <article
                key={collection.slug}
                className={`group flex flex-col overflow-hidden rounded-2xl border bg-[#102747] transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 ${
                  selectedCategory === collection.slug
                    ? 'border-amber-400'
                    : 'border-amber-400/20'
                }`}
              >

                {/* Collection photograph */}

                <button
                  type="button"
                  aria-label={`Explore ${collection.name}`}
                  onClick={() =>
                    exploreCollection(collection.slug)
                  }
                  className="relative block w-full overflow-hidden"
                >

                  <img
                    src={collection.image}
                    alt={`${collection.name} fashion collection`}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 flex items-center gap-3">

                    <Icon
                      size={26}
                      className="text-amber-400"
                    />

                    <h3 className="text-3xl font-bold text-white">
                      {collection.name}
                    </h3>

                  </div>

                </button>

                {/* Collection information */}

                <div className="flex flex-1 flex-col p-5">

                  <p className="text-sm leading-relaxed text-slate-300">
                    {collection.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">

                    {collection.types.map(type => (

                      <span
                        key={type}
                        className="rounded-lg border border-amber-400/20 bg-amber-400/5 px-3 py-2 text-xs text-amber-300"
                      >
                        {type}
                      </span>

                    ))}

                  </div>

                  <div className="mt-auto pt-6">

                    <button
                      type="button"
                      onClick={() =>
                        exploreCollection(collection.slug)
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-200 to-amber-500 px-4 py-3 font-bold text-slate-950 hover:brightness-110"
                    >
                      Explore Collection
                      <ArrowUpRight size={18} />
                    </button>

                  </div>

                </div>

              </article>
            );

          })}

        </div>

      </section>

      {/* Dynamic Product Catalogue */}

      <div className="mt-12 border-t border-amber-400/10">

        <div className="[&>#fashion-catalog]:scroll-mt-28">

          <ProductCatalog
            initialCategorySlug={selectedCategory}
          />

        </div>

      </div>

      {/* AI Photograph Disclosure */}

      <section className="mx-auto mt-8 max-w-5xl px-4 text-center">

        <p className="text-xs leading-relaxed text-slate-500">
          Collection photographs may include
          AI-generated fashion imagery for
          demonstration purposes. Sample products
          and illustrative prices do not represent
          confirmed merchandise availability.
        </p>

      </section>

    </main>
  );
}
