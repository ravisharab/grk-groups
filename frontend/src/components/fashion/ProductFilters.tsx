
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Star,
  X,
} from 'lucide-react';

import type {
  FashionCategory,
} from '../../types/fashion';

// ==========================================
// FILTER TYPES
// ==========================================

export type ProductSort =
  | 'newest'
  | 'priceAsc'
  | 'priceDesc'
  | 'nameAsc'
  | 'nameDesc'
  | 'discount';

export type PriceRange =
  | 'all'
  | 'under25'
  | '25to50'
  | '50to100'
  | 'over100';

export interface FashionFilters {
  search: string;
  categoryId: string;
  subcategory: string;
  wearType: string;
  priceRange: PriceRange;
  currency: string;
  sortBy: ProductSort;
  featuredOnly: boolean;
}

export const DEFAULT_FASHION_FILTERS: FashionFilters = {
  search: '',
  categoryId: 'all',
  subcategory: 'all',
  wearType: 'all',
  priceRange: 'all',
  currency: 'all',
  sortBy: 'newest',
  featuredOnly: false,
};

interface ProductFiltersProps {
  categories: FashionCategory[];
  subcategories: string[];
  filters: FashionFilters;
  onChange: (filters: FashionFilters) => void;
  totalProducts: number;
  filteredCount: number;
}

const wearTypes = [
  'Traditional',
  'Regular',
  'Contemporary',
  'Ethnic',
  'Fusion',
  'Formal',
  'Party Wear',
  'Bridal',
];

export default function ProductFilters({
  categories,
  subcategories,
  filters,
  onChange,
  totalProducts,
  filteredCount,
}: ProductFiltersProps) {

  // Update individual filter

  function updateFilter<
    K extends keyof FashionFilters
  >(
    key: K,
    value: FashionFilters[K]
  ) {
    onChange({
      ...filters,
      [key]: value,
    });
  }

  // Change category and reset subcategory

  function handleCategoryChange(
    categoryId: string
  ) {
    onChange({
      ...filters,
      categoryId,
      subcategory: 'all',
    });
  }

  // Reset all filters

  function resetFilters() {
    onChange({
      ...DEFAULT_FASHION_FILTERS,
    });
  }

  // Change currency and reset price range

  function handleCurrencyChange(
    currency: string
  ) {
    onChange({
      ...filters,
      currency,
      priceRange: 'all',
      sortBy:
        currency === 'all' &&
        (
          filters.sortBy === 'priceAsc' ||
          filters.sortBy === 'priceDesc'
        )
          ? 'newest'
          : filters.sortBy,
    });
  }

  const activeFilterCount = [
    filters.search.trim() !== '',
    filters.categoryId !== 'all',
    filters.subcategory !== 'all',
    filters.wearType !== 'all',
    filters.priceRange !== 'all',
    filters.currency !== 'all',
    filters.sortBy !== 'newest',
    filters.featuredOnly,
  ].filter(Boolean).length;

  const currencySymbol =
    filters.currency === 'INR' ? '₹' : '$';

  const priceOptions =
    filters.currency === 'INR'
      ? [
          {
            value: 'all',
            label: 'All Prices',
          },
          {
            value: 'under25',
            label: 'Under ₹2,000',
          },
          {
            value: '25to50',
            label: '₹2,000 - ₹4,000',
          },
          {
            value: '50to100',
            label: '₹4,000 - ₹8,000',
          },
          {
            value: 'over100',
            label: '₹8,000 and above',
          },
        ]
      : [
          {
            value: 'all',
            label: 'All Prices',
          },
          {
            value: 'under25',
            label: 'Under $25',
          },
          {
            value: '25to50',
            label: '$25 - $50',
          },
          {
            value: '50to100',
            label: '$50 - $100',
          },
          {
            value: 'over100',
            label: '$100 and above',
          },
        ];

  const inputClass =
    'w-full rounded-xl border border-amber-400/30 ' +
    'bg-[#06152f] px-4 py-3 text-white ' +
    'outline-none focus:border-amber-400 ' +
    'disabled:cursor-not-allowed disabled:opacity-50';

  const labelClass =
    'mb-2 block text-sm font-medium text-amber-300';

  return (
    <section className="rounded-2xl border border-amber-400/20 bg-[#102747] p-5 text-white md:p-7">

      {/* Filter header */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div className="flex items-center gap-3">

          <SlidersHorizontal
            size={25}
            className="text-amber-400"
          />

          <h2 className="text-xl font-bold text-amber-400">
            Explore Collections
          </h2>

          {activeFilterCount > 0 && (

            <span className="rounded-full bg-amber-400 px-2 py-1 text-xs font-bold text-slate-950">
              {activeFilterCount}
            </span>

          )}

        </div>

        <button
          type="button"
          onClick={resetFilters}
          disabled={activeFilterCount === 0}
          className="flex items-center gap-2 rounded-lg border border-amber-400/30 px-3 py-2 text-sm text-amber-400 hover:bg-amber-400/10 disabled:opacity-40"
        >

          <RotateCcw size={15} />
          Reset Filters

        </button>

      </div>

      {/* Search bar */}

      <div className="relative mt-6">

        <Search
          size={20}
          className="absolute left-4 top-4 text-amber-400"
        />

        <input
          type="search"
          aria-label="Search fashion products"
          value={filters.search}
          onChange={event =>
            updateFilter(
              'search',
              event.target.value
            )
          }
          placeholder="Search sarees, kurtas, jewellery..."
          className={`${inputClass} pl-12 pr-12`}
        />

        {filters.search && (

          <button
            type="button"
            aria-label="Clear search"
            onClick={() =>
              updateFilter('search', '')
            }
            className="absolute right-4 top-4 text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>

        )}

      </div>

      {/* Category buttons */}

      <div className="mt-6 flex flex-wrap gap-3">

        <button
          type="button"
          aria-pressed={
            filters.categoryId === 'all'
          }
          onClick={() =>
            handleCategoryChange('all')
          }
          className={
            filters.categoryId === 'all'
              ? 'rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950'
              : 'rounded-xl border border-amber-400/30 px-5 py-3 text-amber-300 hover:bg-amber-400/10'
          }
        >
          All Collections
        </button>

        {categories.map(category => (

          <button
            key={category.id}
            type="button"
            aria-pressed={
              filters.categoryId ===
              String(category.id)
            }
            onClick={() =>
              handleCategoryChange(
                String(category.id)
              )
            }
            className={
              filters.categoryId ===
              String(category.id)
                ? 'rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950'
                : 'rounded-xl border border-amber-400/30 px-5 py-3 text-amber-300 hover:bg-amber-400/10'
            }
          >
            {category.name}
          </button>

        ))}

      </div>

      {/* Advanced filters */}

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {/* Subcategory */}

        <div>

          <label
            htmlFor="catalog-subcategory"
            className={labelClass}
          >
            Product Type
          </label>

          <select
            id="catalog-subcategory"
            value={filters.subcategory}
            onChange={event =>
              updateFilter(
                'subcategory',
                event.target.value
              )
            }
            className={inputClass}
          >

            <option value="all">
              All Product Types
            </option>

            {subcategories.map(item => (

              <option key={item} value={item}>
                {item}
              </option>

            ))}

          </select>

        </div>

        {/* Wear type */}

        <div>

          <label
            htmlFor="catalog-wear-type"
            className={labelClass}
          >
            Wear Type
          </label>

          <select
            id="catalog-wear-type"
            value={filters.wearType}
            onChange={event =>
              updateFilter(
                'wearType',
                event.target.value
              )
            }
            className={inputClass}
          >

            <option value="all">
              All Wear Types
            </option>

            {wearTypes.map(item => (

              <option key={item} value={item}>
                {item}
              </option>

            ))}

          </select>

        </div>

        {/* Currency */}

        <div>

          <label
            htmlFor="catalog-currency"
            className={labelClass}
          >
            Currency
          </label>

          <select
            id="catalog-currency"
            value={filters.currency}
            onChange={event =>
              handleCurrencyChange(
                event.target.value
              )
            }
            className={inputClass}
          >

            <option value="all">
              All Currencies
            </option>

            <option value="USD">
              USD ($)
            </option>

            <option value="INR">
              INR (₹)
            </option>

          </select>

        </div>

        {/* Price range */}

        <div>

          <label
            htmlFor="catalog-price"
            className={labelClass}
          >
            Price Range
            {filters.currency !== 'all' &&
              ` (${currencySymbol})`}
          </label>

          <select
            id="catalog-price"
            value={filters.priceRange}
            disabled={
              filters.currency === 'all'
            }
            onChange={event =>
              updateFilter(
                'priceRange',
                event.target.value as PriceRange
              )
            }
            className={inputClass}
          >

            {priceOptions.map(item => (

              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>

            ))}

          </select>

          {filters.currency === 'all' && (

            <p className="mt-2 text-xs text-slate-400">
              Select a currency to filter prices.
            </p>

          )}

        </div>

        {/* Sort options */}

        <div>

          <label
            htmlFor="catalog-sort"
            className={labelClass}
          >
            Sort By
          </label>

          <select
            id="catalog-sort"
            value={filters.sortBy}
            onChange={event =>
              updateFilter(
                'sortBy',
                event.target.value as ProductSort
              )
            }
            className={inputClass}
          >

            <option value="newest">
              Newest Arrivals
            </option>

            <option
              value="priceAsc"
              disabled={
                filters.currency === 'all'
              }
            >
              Price: Low to High
            </option>

            <option
              value="priceDesc"
              disabled={
                filters.currency === 'all'
              }
            >
              Price: High to Low
            </option>

            <option value="nameAsc">
              Name: A to Z
            </option>

            <option value="nameDesc">
              Name: Z to A
            </option>

            <option value="discount">
              Biggest Discount
            </option>

          </select>

        </div>

        {/* Featured products */}

        <div className="flex items-center">

          <label className="flex cursor-pointer items-center gap-3">

            <input
              type="checkbox"
              checked={filters.featuredOnly}
              onChange={event =>
                updateFilter(
                  'featuredOnly',
                  event.target.checked
                )
              }
              className="h-5 w-5 accent-amber-400"
            />

            <Star
              size={18}
              className="text-amber-400"
            />

            <span className="text-sm text-slate-300">
              Featured Products Only
            </span>

          </label>

        </div>

      </div>

      {/* Results summary */}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">

        <p
          aria-live="polite"
          className="text-sm text-slate-300"
        >

          Showing{' '}

          <span className="font-bold text-amber-400">
            {filteredCount}
          </span>

          {' '}of {totalProducts} products

        </p>

        {activeFilterCount > 0 && (

          <button
            type="button"
            onClick={resetFilters}
            className="text-sm text-amber-400 hover:underline"
          >
            Clear all filters
          </button>

        )}

      </div>

    </section>
  );
}
