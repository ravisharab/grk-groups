
import {
  useEffect,
  useState,
} from 'react';

import {
  Link,
  useParams,
} from 'react-router-dom';

import {
  ArrowLeft,
  ChevronRight,
  ShoppingBag,
  Mail,
  Package,
  ShieldCheck,
  AlertCircle,
  LoaderCircle,
  Star,
  CheckCircle,
} from 'lucide-react';

import { supabase } from '../lib/supabase';

import type {
  FashionProduct,
  FashionCategory,
  FashionProductImage,
  FashionProductVariant,
} from '../types/fashion';

import ProductGallery from '../components/fashion/ProductGallery';

function formatPrice(
  amount: number,
  currency: string
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
  }).format(amount);
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error
  ) {
    return String(error.message);
  }

  return 'Unable to load product details.';
}

export default function ProductDetailsPage() {

  const { slug } = useParams<{ slug: string }>();

  const [product, setProduct] =
    useState<FashionProduct | null>(null);

  const [category, setCategory] =
    useState<FashionCategory | null>(null);

  const [images, setImages] =
    useState<FashionProductImage[]>([]);

  const [variants, setVariants] =
    useState<FashionProductVariant[]>([]);

  const [selectedSize, setSelectedSize] =
    useState('');

  const [selectedColor, setSelectedColor] =
    useState('');

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [inventoryError, setInventoryError] =
    useState(false);

  // ========================================
  // LOAD PRODUCT DETAILS
  // ========================================

  useEffect(() => {

    let cancelled = false;

    async function loadProduct() {

      setLoading(true);
      setError('');
      setInventoryError(false);
      setProduct(null);
      setCategory(null);
      setImages([]);
      setVariants([]);
      setSelectedSize('');
      setSelectedColor('');

      try {

        if (!slug) {
          throw new Error('Invalid product URL.');
        }

        const {
          data: productData,
          error: productError,
        } = await supabase
          .from('fashion_products')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .maybeSingle();

        if (productError) {
          throw productError;
        }

        if (!productData) {
          throw new Error(
            'This product is not available.'
          );
        }

        const currentProduct =
          productData as FashionProduct;

        // Load category, images and variants

        const [
          categoryResult,
          imageResult,
          variantResult,
        ] = await Promise.all([

          supabase
            .from('fashion_categories')
            .select('*')
            .eq(
              'id',
              currentProduct.category_id
            )
            .eq('is_active', true)
            .maybeSingle(),

          supabase
            .from('fashion_product_images')
            .select('*')
            .eq(
              'product_id',
              currentProduct.id
            )
            .order('display_order'),

          supabase
            .from('fashion_product_variants')
            .select('*')
            .eq(
              'product_id',
              currentProduct.id
            )
            .eq('is_available', true),

        ]);

        if (categoryResult.error) {
          throw categoryResult.error;
        }

        if (!categoryResult.data) {
          throw new Error(
            'This collection is not available.'
          );
        }

        if (imageResult.error) {
          throw imageResult.error;
        }

        if (cancelled) return;

        const availableVariants = variantResult.error
  ? []
  : (variantResult.data ?? []) as FashionProductVariant[];

        setProduct(currentProduct);

        setCategory(
          categoryResult.data as FashionCategory
        );

       setImages((imageResult.data ?? []) as FashionProductImage[]);

        setVariants(availableVariants);

        setInventoryError(
          Boolean(variantResult.error)
        );

        // Select the first in-stock variant

        const firstVariant =
          availableVariants.find(
            item => item.stock_quantity > 0
          ) ?? availableVariants[0];

        if (firstVariant) {

          setSelectedSize(firstVariant.size);
          setSelectedColor(firstVariant.color);

        }

      } catch (err) {

        if (!cancelled) {
          setError(getErrorMessage(err));
        }

      } finally {

        if (!cancelled) {
          setLoading(false);
        }

      }
    }

    void loadProduct();

    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });

    return () => {
      cancelled = true;
    };

  }, [slug]);

  // ========================================
  // SIZE AND COLOR OPTIONS
  // ========================================

  const sizes = Array.from(
    new Set(
      variants.map(variant => variant.size)
    )
  );

  const colors = Array.from(
    new Map(
      variants
        .filter(
          variant =>
            variant.size === selectedSize
        )
        .map(variant => [
          variant.color,
          {
            name: variant.color,
            code: variant.color_code,
          },
        ])
    ).values()
  );

  const selectedVariant = variants.find(
    variant =>
      variant.size === selectedSize &&
      variant.color === selectedColor
  );

  function handleSizeChange(size: string) {

    setSelectedSize(size);

    const matchingVariants =
      variants.filter(
        variant => variant.size === size
      );

    const nextVariant =
      matchingVariants.find(
        variant =>
          variant.color === selectedColor &&
          variant.stock_quantity > 0
      ) ??
      matchingVariants.find(
        variant => variant.stock_quantity > 0
      ) ??
      matchingVariants[0];

    setSelectedColor(
      nextVariant?.color ?? ''
    );
  }

  // ========================================
  // LOADING SCREEN
  // ========================================

  if (loading) {

    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#06152f] px-5 text-white">

        <LoaderCircle
          size={50}
          className="animate-spin text-amber-400"
        />

        <h2 className="mt-6 text-xl font-bold text-amber-400">
          Loading Product Details...
        </h2>

      </main>
    );
  }

  // ========================================
  // ERROR SCREEN
  // ========================================

  if (error || !product) {

    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#06152f] px-5 text-center text-white">

        <AlertCircle
          size={55}
          className="text-amber-400"
        />

        <h1 className="mt-6 text-3xl font-bold text-amber-400">
          Product Not Available
        </h1>

        <p className="mt-4 text-slate-300">
          {error || 'Product not found.'}
        </p>

        <Link
          to="/fashion"
          className="mt-8 flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950"
        >
          <ArrowLeft size={18} />
          Back to GRK Fashion
        </Link>

      </main>
    );
  }

  // ========================================
  // PRODUCT PRICE CALCULATIONS
  // ========================================

  const regularPrice = Number(product.price);

  const sellingPrice =
    product.discount_price != null
      ? Number(product.discount_price)
      : regularPrice;

  const hasDiscount =
    sellingPrice < regularPrice;

  const savings =
    regularPrice - sellingPrice;

  const discountPercentage =
    regularPrice > 0
      ? Math.round(
          (savings / regularPrice) * 100
        )
      : 0;

  const stockQuantity =
    selectedVariant?.stock_quantity ?? 0;

  // ========================================
  // PRODUCT SPECIFICATIONS
  // ========================================

  const specifications = [
    {
      label: 'Product Name',
      value: product.name,
    },
    {
      label: 'SKU',
      value: product.sku,
    },
    {
      label: 'Collection',
      value: category?.name,
    },
    {
      label: 'Product Type',
      value: product.subcategory,
    },
    {
      label: 'Wear Type',
      value: product.wear_type,
    },
    {
      label: 'Material',
      value: product.material,
    },
    {
      label: 'Occasion',
      value: product.occasion,
    },
    {
      label: 'Currency',
      value: product.currency,
    },
  ].filter(item => Boolean(item.value));

  // ========================================
  // PRODUCT DETAILS INTERFACE
  // ========================================

  return (
    <main className="min-h-screen bg-[#06152f] pb-16 pt-28 text-white">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb navigation */}

        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-400"
        >

          <Link
            to="/"
            className="hover:text-amber-400"
          >
            Home
          </Link>

          <ChevronRight size={15} />

          <Link
            to="/fashion"
            className="hover:text-amber-400"
          >
            GRK Fashion
          </Link>

          <ChevronRight size={15} />

          <span>
            {category?.name}
          </span>

          <ChevronRight size={15} />

          <span className="text-amber-400">
            {product.name}
          </span>

        </nav>

        {/* Back navigation */}

        <Link
          to="/fashion"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-200"
        >
          <ArrowLeft size={18} />
          Back to Collections
        </Link>

        {/* Product layout */}

        <div className="grid items-start gap-10 lg:grid-cols-2">

          {/* Product photographs */}

          <ProductGallery
            key={product.id}
            productName={product.name}
            coverImage={product.cover_image}
            images={images}
          />

          {/* Product information */}

          <section>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
              GRK Fashion · {category?.name}
            </p>

            <h1 className="mt-4 text-4xl font-black text-white md:text-5xl">
              {product.name}
            </h1>

            <p className="mt-3 text-sm text-slate-400">
              SKU: {product.sku}
            </p>

            {/* Featured label */}

            {product.is_featured && (

              <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-400/10 px-3 py-2 text-sm text-amber-400">

                <Star size={17} />
                Featured Collection

              </div>

            )}

            {/* Product prices */}

            <div className="mt-7 flex flex-wrap items-center gap-4">

              <span className="text-4xl font-black text-amber-400">

                {formatPrice(
                  sellingPrice,
                  product.currency
                )}

              </span>

              {hasDiscount && (

                <>

                  <span className="text-xl text-slate-500 line-through">

                    {formatPrice(
                      regularPrice,
                      product.currency
                    )}

                  </span>

                  <span className="rounded-lg bg-red-600 px-3 py-2 text-sm font-bold">

                    {discountPercentage}% OFF

                  </span>

                </>

              )}

            </div>

            {hasDiscount && (

              <p className="mt-3 text-sm font-medium text-green-400">

                You save{' '}

                {formatPrice(
                  savings,
                  product.currency
                )}

              </p>

            )}

            {/* Sample product notice */}

            {product.is_sample && (

              <div className="mt-6 flex gap-3 rounded-xl border border-blue-400/30 bg-blue-500/10 p-4 text-blue-300">

                <AlertCircle
                  size={22}
                  className="shrink-0"
                />

                <div>

                  <p className="font-bold">
                    Sample Product
                  </p>

                  <p className="mt-2 text-sm leading-relaxed">
                    This is a demonstration item.
                    Photographs, pricing and
                    inventory may be illustrative.
                    Not available for purchase.
                  </p>

                </div>

              </div>

            )}

            {/* Short description */}

            <p className="mt-7 leading-relaxed text-slate-300">

              {product.description ||
                'Discover elegance and style with GRK Fashion.'}

            </p>

            {/* Product inventory */}

            <div className="mt-8 space-y-7 border-t border-white/10 pt-7">

              {/* Size selection */}

              {sizes.length > 0 && (

                <div>

                  <h2 className="font-bold text-amber-400">
                    Select Size
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-3">

                    {sizes.map(size => (

                      <button
                        key={size}
                        type="button"
                        aria-pressed={
                          selectedSize === size
                        }
                        onClick={() =>
                          handleSizeChange(size)
                        }
                        className={
                          selectedSize === size
                            ? 'min-w-14 rounded-xl bg-amber-400 px-4 py-3 font-bold text-slate-950'
                            : 'min-w-14 rounded-xl border border-amber-400/30 px-4 py-3 text-white hover:bg-amber-400/10'
                        }
                      >
                        {size}
                      </button>

                    ))}

                  </div>

                </div>

              )}

              {/* Color selection */}

              {colors.length > 0 && (

                <div>

                  <h2 className="font-bold text-amber-400">
                    Select Color
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-3">

                    {colors.map(color => (

                      <button
                        key={color.name}
                        type="button"
                        aria-pressed={
                          selectedColor === color.name
                        }
                        onClick={() =>
                          setSelectedColor(
                            color.name
                          )
                        }
                        className={
                          selectedColor === color.name
                            ? 'flex items-center gap-2 rounded-xl border-2 border-amber-400 bg-amber-400/10 px-4 py-3'
                            : 'flex items-center gap-2 rounded-xl border border-white/20 px-4 py-3 hover:border-amber-400'
                        }
                      >

                        <span
                          className="h-6 w-6 rounded-full border border-white/30"
                          style={{
                            backgroundColor:
                              color.code ||
                              '#64748b',
                          }}
                        />

                        {color.name}

                      </button>

                    ))}

                  </div>

                </div>

              )}

              {/* Stock availability */}

              <div className="rounded-xl border border-white/10 bg-[#102747] p-5">

                <div className="flex items-center gap-3">

                  <Package
                    size={22}
                    className="text-amber-400"
                  />

                  <h2 className="font-bold text-white">
                    {product.is_sample
                      ? 'Sample Inventory'
                      : 'Stock Availability'}
                  </h2>

                </div>

                {inventoryError ? (

                  <p className="mt-3 text-sm text-slate-400">
                    Inventory information is
                    currently unavailable.
                    Please contact us for details.
                  </p>

                ) : variants.length === 0 ? (

                  <p className="mt-3 text-sm text-slate-400">
                    Contact us for available
                    sizes, colors and stock.
                  </p>

                ) : !selectedVariant ? (

                  <p className="mt-3 text-sm text-slate-400">
                    Select a size and color.
                  </p>

                ) : stockQuantity > 0 ? (

                  <p className="mt-3 flex items-center gap-2 text-sm text-green-400">

                    <CheckCircle size={17} />

                    {stockQuantity} units
                    {product.is_sample
                      ? ' (sample stock)'
                      : ' available'}

                  </p>

                ) : (

                  <p className="mt-3 text-sm font-semibold text-red-400">
                    Out of Stock
                  </p>

                )}

              </div>

            </div>

            {/* Customer contact */}

            <div className="mt-8">

              <Link
                to="/#contact"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-200 to-amber-500 px-6 py-4 font-bold text-slate-950 hover:brightness-110"
              >
                <Mail size={21} />
                {product.is_sample
                  ? 'Contact GRK Fashion'
                  : 'Enquire About This Product'}
              </Link>

              <Link
                to="/fashion"
                className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border border-amber-400/30 px-6 py-4 font-semibold text-amber-400 hover:bg-amber-400/10"
              >
                <ShoppingBag size={20} />
                Continue Exploring
              </Link>

            </div>

          </section>

        </div>

        {/* Product description and specifications */}

        <div className="mt-14 grid gap-6 lg:grid-cols-2">

          <section className="rounded-2xl border border-amber-400/20 bg-[#102747] p-7">

            <h2 className="text-2xl font-bold text-amber-400">
              Product Description
            </h2>

            <p className="mt-5 whitespace-pre-line leading-relaxed text-slate-300">

              {product.description ||
                'More product information coming soon.'}

            </p>

            <div className="mt-7 flex items-start gap-3 border-t border-white/10 pt-6">

              <ShieldCheck
                size={25}
                className="shrink-0 text-amber-400"
              />

              <p className="text-sm leading-relaxed text-slate-400">
                Contact GRK Fashion to confirm
                product details, availability
                and purchasing information.
              </p>

            </div>

          </section>

          <section className="rounded-2xl border border-amber-400/20 bg-[#102747] p-7">

            <h2 className="text-2xl font-bold text-amber-400">
              Product Specifications
            </h2>

            <dl className="mt-5">

              {specifications.map(item => (

                <div
                  key={item.label}
                  className="flex justify-between gap-5 border-b border-white/10 py-4"
                >

                  <dt className="text-sm text-slate-400">
                    {item.label}
                  </dt>

                  <dd className="text-right text-sm font-medium text-white">
                    {item.value}
                  </dd>

                </div>

              ))}

            </dl>

          </section>

        </div>

      </div>

    </main>
  );
}
