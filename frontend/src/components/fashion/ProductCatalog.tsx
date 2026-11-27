
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ShoppingBag,
  PackageSearch,
  RefreshCw,
  LoaderCircle,
  AlertCircle,
} from 'lucide-react';

import {
  getCategories,
  getPublishedProducts,
} from '../../lib/fashionService';

import type {
  FashionCategory,
  FashionProduct,
} from '../../types/fashion';

import ProductCard from './ProductCard';

import ProductFilters, {
  DEFAULT_FASHION_FILTERS,
} from './ProductFilters';

import type {
  FashionFilters,
} from './ProductFilters';

interface ProductCatalogProps {
  initialCategorySlug?: string;
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error
  ) {
    return String(error.message);
  }

  return 'Unable to load fashion products.';
}

// ==========================================
// PRODUCT SELLING PRICE
// ==========================================

function getSellingPrice(
  product: FashionProduct
): number {
  return product.discount_price !== null
    ? Number(product.discount_price)
    : Number(product.price);
}

// ==========================================
// DISCOUNT PERCENTAGE
// ==========================================

function getDiscountPercentage(
  product: FashionProduct
): number {

  const regularPrice = Number(product.price);
  const sellingPrice = getSellingPrice(product);

  if (regularPrice <= 0) return 0;

  return (
    (regularPrice - sellingPrice) /
    regularPrice
  ) * 100;
}

// ==========================================
// PRICE RANGE FILTER
// ==========================================

function matchesPriceRange(
  product: FashionProduct,
  filters: FashionFilters
): boolean {

  if (
    filters.priceRange === 'all' ||
    filters.currency === 'all'
  ) {
    return true;
  }

  const price = getSellingPrice(product);

  const limits =
    filters.currency === 'INR'
      ? [2000, 4000, 8000]
      : [25, 50, 100];

  switch (filters.priceRange) {

    case 'under25':
      return price < limits[0];

    case '25to50':
      return (
        price >= limits[0] &&
        price < limits[1]
      );

    case '50to100':
      return (
        price >= limits[1] &&
        price < limits[2]
      );

    case 'over100':
      return price >= limits[2];

    default:
      return true;
  }
}

// ==========================================
// MAIN PRODUCT CATALOGUE
// ==========================================

export default function ProductCatalog({
  initialCategorySlug,
}: ProductCatalogProps) {

  const [products, setProducts] =
    useState<FashionProduct[]>([]);

  const [categories, setCategories] =
    useState<FashionCategory[]>([]);

  const [filters, setFilters] =
    useState<FashionFilters>({
      ...DEFAULT_FASHION_FILTERS,
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  // ========================================
  // LOAD SUPABASE DATA
  // ========================================

  const loadCatalog = useCallback(async () => {

    setLoading(true);
    setError('');

    try {

      const [categoryData, productData] =
        await Promise.all([
          getCategories(),
          getPublishedProducts(),
        ]);

      const activeCategoryIds = new Set(
        categoryData.map(
          category => category.id
        )
      );

      const publishedProducts =
        productData.filter(
          product =>
            product.is_published &&
            activeCategoryIds.has(
              product.category_id
            )
        );

      setCategories(categoryData);
      setProducts(publishedProducts);

    } catch (err) {

      setError(getErrorMessage(err));

    } finally {

      setLoading(false);

    }

  }, []);

  useEffect(() => {
    void loadCatalog();
  }, [loadCatalog]);

  // ========================================
  // INITIAL CATEGORY SELECTION
  // ========================================

  useEffect(() => {

    if (categories.length === 0) return;

    const category = categories.find(
      item =>
        item.slug.toLowerCase() ===
        initialCategorySlug?.toLowerCase()
    );

    setFilters(previous => ({
      ...previous,
      categoryId: category
        ? String(category.id)
        : 'all',
      subcategory: 'all',
    }));

  }, [categories, initialCategorySlug]);

  // ========================================
  // CATEGORY LOOKUP
  // ========================================

  const categoryMap = useMemo(() => {

    return new Map(
      categories.map(category => [
        category.id,
        category.name,
      ])
    );

  }, [categories]);

  // ========================================
  // DYNAMIC SUBCATEGORIES
  // ========================================

  const subcategories = useMemo(() => {

    const categoryProducts =
      filters.categoryId === 'all'
        ? products
        : products.filter(
            product =>
              String(product.category_id) ===
              filters.categoryId
          );

    return Array.from(
      new Set(
        categoryProducts
          .map(product => product.subcategory)
          .filter(Boolean)
      )
    ).sort((a, b) =>
      a.localeCompare(b)
    );

  }, [products, filters.categoryId]);

  // ========================================
  // SEARCH AND FILTER PRODUCTS
  // ========================================

  const filteredProducts = useMemo(() => {

    const keyword = filters.search
      .trim()
      .toLowerCase();

    const result = products.filter(product => {

      const searchableText = [
        product.name,
        product.sku,
        product.description ?? '',
        product.subcategory,
        product.material ?? '',
        product.wear_type ?? '',
        product.occasion ?? '',
        categoryMap.get(
          product.category_id
        ) ?? '',
      ].join(' ').toLowerCase();

      const matchesSearch =
        searchableText.includes(keyword);

      const matchesCategory =
        filters.categoryId === 'all' ||
        String(product.category_id) ===
          filters.categoryId;

      const matchesSubcategory =
        filters.subcategory === 'all' ||
        product.subcategory ===
          filters.subcategory;

      const matchesWearType =
        filters.wearType === 'all' ||
        product.wear_type?.toLowerCase() ===
          filters.wearType.toLowerCase();

      const matchesCurrency =
        filters.currency === 'all' ||
        product.currency === filters.currency;

      const matchesFeatured =
        !filters.featuredOnly ||
        product.is_featured;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubcategory &&
        matchesWearType &&
        matchesCurrency &&
        matchesFeatured &&
        matchesPriceRange(product, filters)
      );

    });

    // ======================================
    // SORT PRODUCTS
    // ======================================

    return result.sort((a, b) => {

      switch (filters.sortBy) {

        case 'priceAsc':
          if (filters.currency !== 'all') {
            return (
              getSellingPrice(a) -
              getSellingPrice(b)
            );
          }
          break;

        case 'priceDesc':
          if (filters.currency !== 'all') {
            return (
              getSellingPrice(b) -
              getSellingPrice(a)
            );
          }
          break;

        case 'nameAsc':
          return a.name.localeCompare(b.name);

        case 'nameDesc':
          return b.name.localeCompare(a.name);

        case 'discount':
          return (
            getDiscountPercentage(b) -
            getDiscountPercentage(a)
          );

        case 'newest':
        default:
          break;
      }

      return (
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
      );

    });

  }, [products, filters, categoryMap]);

  // ========================================
  // RESET FILTERS
  // ========================================

  function resetFilters() {
    setFilters({
      ...DEFAULT_FASHION_FILTERS,
    });
  }

  // ========================================
  // CUSTOMER CATALOGUE UI
  // ========================================

  return (
    <section
      id="fashion-catalog"
      className="mx-auto max-w-7xl px-4 py-12 text-white sm:px-6 lg:px-8"
    >

      {/* Catalogue heading */}

      <div className="mb-8 text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/30 bg-[#102747]">

          <ShoppingBag
            size={30}
            className="text-amber-400"
          />

        </div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
          Discover Your Style
        </p>

        <h2 className="mt-3 text-3xl font-black text-amber-400 md:text-4xl">
          GRK Fashion Catalogue
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
          Explore traditional elegance,
          contemporary fashion and beautiful
          jewellery for every occasion.
        </p>

      </div>

      {/* Refresh catalogue */}

      <div className="mb-5 flex justify-end">

        <button
          type="button"
          disabled={loading}
          onClick={() => void loadCatalog()}
          className="flex items-center gap-2 rounded-xl border border-amber-400/30 px-4 py-3 text-sm font-medium text-amber-400 hover:bg-amber-400/10 disabled:opacity-50"
        >

          <RefreshCw
            size={16}
            className={
              loading ? 'animate-spin' : ''
            }
          />

          Refresh Catalogue

        </button>

      </div>

      {/* Error state */}

      {error && (

        <div
          role="alert"
          className="mb-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-6"
        >

          <div className="flex items-center gap-3 text-red-400">

            <AlertCircle size={24} />

            <h3 className="font-bold">
              Unable to Load Catalogue
            </h3>

          </div>

          <p className="mt-3 text-sm text-slate-300">
            {error}
          </p>

          <button
            type="button"
            disabled={loading}
            onClick={() => void loadCatalog()}
            className="mt-5 rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 disabled:opacity-50"
          >
            Try Again
          </button>

        </div>

      )}

      {/* Loading state */}

      {loading ? (

        <div className="rounded-2xl border border-amber-400/20 bg-[#102747] py-20 text-center">

          <LoaderCircle
            size={42}
            className="mx-auto animate-spin text-amber-400"
          />

          <p className="mt-5 font-semibold text-amber-400">
            Loading Fashion Collections...
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Discovering the latest products.
          </p>

        </div>

      ) : !error && (

        <>

          {/* Product filters */}

          <ProductFilters
            categories={categories}
            subcategories={subcategories}
            filters={filters}
            onChange={setFilters}
            totalProducts={products.length}
            filteredCount={
              filteredProducts.length
            }
          />

          {/* Empty product catalogue */}

          {filteredProducts.length === 0 ? (

            <div className="mt-8 rounded-2xl border border-dashed border-amber-400/30 bg-[#102747] px-6 py-20 text-center">

              <PackageSearch
                size={55}
                className="mx-auto text-amber-400"
              />

              <h3 className="mt-5 text-2xl font-bold text-amber-400">

                {products.length === 0
                  ? 'New Collections Coming Soon'
                  : 'No Matching Products'}

              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">

                {products.length === 0
                  ? 'We are preparing beautiful fashion collections. Please check back soon.'
                  : 'Try a different search or adjust your filters to discover more products.'}

              </p>

              {products.length > 0 && (

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950"
                >
                  Explore All Products
                </button>

              )}

            </div>

          ) : (

            /* Responsive product grid */

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {filteredProducts.map(product => (

                <ProductCard
                  key={product.id}
                  product={product}
                  categoryName={
                    categoryMap.get(
                      product.category_id
                    )
                  }
                />

              ))}

            </div>

          )}

          {/* Sample catalogue disclosure */}

          {products.some(
            product => product.is_sample
          ) && (

            <div className="mt-10 rounded-xl border border-amber-400/20 bg-[#102747] p-5 text-center">

              <p className="text-sm leading-relaxed text-slate-400">
                Products marked as samples are
                demonstration items. Images,
                prices and inventory may be
                illustrative and do not represent
                confirmed merchandise availability.
              </p>

            </div>

          )}

        </>

      )}

    </section>
  );
}
