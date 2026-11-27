
import { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Shirt,
  Sparkles,
  Baby,
  Gem,
  Search,
} from 'lucide-react';

type Category = 'Men' | 'Women' | 'Kids' | 'Jewellery';

const collections = [
  {
    name: 'Men' as Category,
    image: '/fashion/men/cover.jpg',
    description: 'Traditional & Regular Wear',
    details: 'Discover timeless styles for modern men.',
    icon: Shirt,
    subcategories: [
      'Traditional Wear',
      'Regular Wear',
      'Kurta Sets',
      'Sherwani',
      'Dhoti',
      'Shirts',
      'T-Shirts',
      'Jeans',
      'Wedding Wear',
    ],
  },
  {
    name: 'Women' as Category,
    image: '/fashion/women/cover.jpg',
    description: 'Traditional & Regular Wear',
    details: 'Celebrate elegance in every outfit.',
    icon: Sparkles,
    subcategories: [
      'Traditional Wear',
      'Regular Wear',
      'Silk Sarees',
      'Lehengas',
      'Salwar Suits',
      'Kurtis',
      'Blouses',
      'Casual Dresses',
      'Party Wear',
    ],
  },
  {
    name: 'Kids' as Category,
    image: '/fashion/kids/cover.jpg',
    description: 'Traditional & Regular Wear',
    details: 'Beautiful fashion for little stars.',
    icon: Baby,
    subcategories: [
      'Traditional Wear',
      'Regular Wear',
      'Boys',
      'Girls',
      'Pattu Dresses',
      'Kurta Sets',
      'Frocks',
      'Casual Sets',
      'Party Wear',
    ],
  },
  {
    name: 'Jewellery' as Category,
    image: '/fashion/jewellery/cover.jpg',
    description: 'Traditional & Contemporary',
    details: 'Timeless beauty in every detail.',
    icon: Gem,
    subcategories: [
      'Temple Jewellery',
      'Bridal Jewellery',
      'Necklaces',
      'Earrings & Jhumkas',
      'Bangles & Bracelets',
      'Rings',
      'Anklets',
      "Men's Jewellery",
      "Kids' Jewellery",
      'Imitation Jewellery',
    ],
  },
];

export default function FashionPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category | 'All'>('All');

  const [selectedSubcategory, setSelectedSubcategory] =
    useState('All');

  const [search, setSearch] = useState('');

  const activeCollection = collections.find(
    collection => collection.name === selectedCategory
  );

  const filteredCollections = collections.filter(
    collection => {
      const matchesCategory =
        selectedCategory === 'All' ||
        collection.name === selectedCategory;

      const searchableText = [
        collection.name,
        collection.description,
        collection.details,
        ...collection.subcategories,
      ].join(' ').toLowerCase();

      return (
        matchesCategory &&
        searchableText.includes(search.toLowerCase().trim())
      );
    }
  );

  function selectCategory(category: Category | 'All') {
    setSelectedCategory(category);
    setSelectedSubcategory('All');
    setSearch('');
  }

  return (
    <main className="min-h-screen bg-[#06152f] text-white">

      {/* Fashion Hero Section */}

      <section className="px-6 pb-10 pt-36 text-center">

        <p className="mb-4 text-xs font-bold tracking-[0.4em] text-amber-400">
          A DIVISION OF GRK GROUPS
        </p>

        <h1 className="text-5xl font-black tracking-wider text-amber-400 md:text-7xl">
          GRK FASHION
        </h1>

        <h2 className="mt-5 text-2xl font-semibold md:text-4xl">
          Celebrate Tradition. Embrace Style.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
          Discover beautiful Indian traditional clothing,
          contemporary fashion and elegant jewellery
          for every generation and every occasion.
        </p>

      </section>

      {/* Category Navigation */}

      <section className="mx-auto max-w-7xl px-6">

        <div className="flex flex-wrap justify-center gap-3">

         {(['All', 'Men', 'Women', 'Kids', 'Jewellery'] as const).map(category => (

            <button
              type="button"
              key={category}
              aria-pressed={selectedCategory === category}
              onClick={() => selectCategory(category)}
              className={`rounded-full border px-6 py-3
                text-sm font-bold transition-all duration-300
                ${
                  selectedCategory === category
                    ? 'border-amber-400 bg-gradient-to-r from-amber-200 to-amber-500 text-slate-950 shadow-lg shadow-amber-400/20'
                    : 'border-amber-400/30 bg-[#102747] text-amber-300 hover:border-amber-400'
                }`}
            >
              {category === 'All'
                ? 'All Collections'
                : category}
            </button>

          ))}

        </div>

        {/* Search Bar */}

        <div className="relative mx-auto mt-8 max-w-lg">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400"
          />

          <input
            type="search"
            aria-label="Search fashion collections"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search sarees, kurtas, jewellery..."
            className="w-full rounded-full border border-amber-400/30 bg-[#102747] py-3 pl-12 pr-5 text-sm text-white outline-none placeholder:text-slate-400 focus:border-amber-400"
          />

        </div>

      </section>

      {/* All Collections */}

      {selectedCategory === 'All' && (

        <section className="mx-auto max-w-7xl px-6 pb-20 pt-12">

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {filteredCollections.map(collection => {

              const Icon = collection.icon;

              return (

                <button
                  type="button"
                  key={collection.name}
                  onClick={() => selectCategory(collection.name)}
                  className="group overflow-hidden rounded-2xl border border-amber-400/30 bg-[#102747] text-left shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-400 hover:shadow-amber-400/20"
                >

                  {/* Model Photograph */}

                  <div className="relative aspect-[3/4] overflow-hidden">

                    <img
                      src={collection.image}
                      alt={`${collection.name} fashion promotional model`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#06152f] via-transparent to-transparent" />

                    <div className="absolute bottom-5 left-5">

                      <Icon
                        size={26}
                        className="mb-2 text-amber-300"
                      />

                      <h3 className="text-3xl font-black text-white">
                        {collection.name}
                      </h3>

                    </div>

                  </div>

                  {/* Collection Information */}

                  <div className="p-5">

                    <p className="text-sm font-bold text-amber-300">
                      {collection.description}
                    </p>

                    <p className="mt-2 text-xs leading-6 text-slate-400">
                      {collection.details}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">

                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        Explore Collection
                      </span>

                      <ArrowRight
                        size={18}
                        className="text-amber-400 transition-transform group-hover:translate-x-1"
                      />

                    </div>

                  </div>

                </button>

              );
            })}

          </div>

          {filteredCollections.length === 0 && (
            <p className="py-12 text-center text-slate-400">
              No matching collections found.
            </p>
          )}

        </section>

      )}

      {/* Selected Collection */}

      {activeCollection && (

        <section className="mx-auto max-w-7xl px-6 pb-20 pt-12">

          <button
            type="button"
            onClick={() => selectCategory('All')}
            className="mb-8 flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-200"
          >
            <ArrowLeft size={18} />
            Back to All Collections
          </button>

          <div className="grid overflow-hidden rounded-3xl border border-amber-400/30 bg-[#102747] md:grid-cols-2">

            {/* Collection Model */}

            <div className="overflow-hidden">

              <img
                src={activeCollection.image}
                alt={`${activeCollection.name} fashion collection`}
                className="h-full max-h-[650px] w-full object-cover object-top"
              />

            </div>

            {/* Collection Details */}

            <div className="p-6 md:p-10">

              <p className="text-xs font-bold tracking-[0.3em] text-amber-400">
                GRK FASHION COLLECTION
              </p>

              <h2 className="mt-4 text-4xl font-black text-amber-400">
                {activeCollection.name}
              </h2>

              <p className="mt-3 text-lg text-white">
                {activeCollection.description}
              </p>

              <p className="mt-4 text-sm text-slate-300">
                {activeCollection.details}
              </p>

              <h3 className="mb-4 mt-8 text-lg font-bold text-amber-300">
                Explore Categories
              </h3>

              <div className="flex flex-wrap gap-3">

                {[
                  'All',
                  ...activeCollection.subcategories,
                ]
                  .filter(item =>
                    item === 'All' ||
                    item.toLowerCase().includes(
                      search.toLowerCase().trim()
                    )
                  )
                  .map(item => (

                    <button
                      type="button"
                      key={item}
                      aria-pressed={
                        selectedSubcategory === item
                      }
                      onClick={() =>
                        setSelectedSubcategory(item)
                      }
                      className={`rounded-xl border px-4 py-3 text-xs font-semibold transition-all
                        ${
                          selectedSubcategory === item
                            ? 'border-amber-400 bg-amber-400 text-slate-950'
                            : 'border-amber-400/30 bg-[#06152f] text-amber-300 hover:border-amber-400'
                        }`}
                    >
                      {item}
                    </button>

                  ))}

              </div>

              {/* Future Product Catalogue */}

              <div className="mt-8 rounded-2xl border border-amber-400/20 bg-[#06152f] p-6 text-center">

                <Sparkles
                  size={28}
                  className="mx-auto mb-3 text-amber-400"
                />

                <h3 className="text-lg font-bold text-amber-300">

                  {selectedSubcategory === 'All'
                    ? `${activeCollection.name} Collection`
                    : selectedSubcategory}

                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Our exclusive product catalogue is
                  coming soon. Stay tuned for beautiful
                  designs and exciting collections.
                </p>

                <a
                  href="/#contact"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-200 to-amber-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:scale-105"
                >
                  Enquire Now
                  <ArrowRight size={16} />
                </a>

              </div>

            </div>

          </div>

        </section>

      )}

      {/* Promotional Image Disclosure */}

      <p className="px-6 pb-8 text-center text-xs text-slate-500">
        AI-generated promotional imagery.
        Actual product designs and availability may vary.
      </p>

      {/* Fashion Footer Banner */}

      <section className="border-t border-amber-400/20 bg-[#102747] px-6 py-12 text-center">

        <h2 className="text-2xl font-black tracking-widest text-amber-400">
          GRK FASHION
        </h2>

        <p className="mt-3 text-sm text-slate-300">
          Tradition • Quality • Elegance • Style
        </p>

        <p className="mt-4 text-xs text-slate-400">
          A proud division of GRK Groups
        </p>

      </section>

    </main>
  );
}
