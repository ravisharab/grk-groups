
import { Link } from 'react-router-dom';

import {
  ArrowUpRight,
  ImageOff,
  Star,
} from 'lucide-react';

import type {
  FashionProduct,
} from '../../types/fashion';

interface ProductCardProps {
  product: FashionProduct;
  categoryName?: string;
}

function formatPrice(
  amount: number,
  currency: string
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
  }).format(amount);
}

export default function ProductCard({
  product,
  categoryName,
}: ProductCardProps) {

  const hasDiscount =
    product.discount_price !== null &&
    product.discount_price < product.price;

  const sellingPrice = hasDiscount
    ? product.discount_price!
    : product.price;

  const discountPercentage =
    hasDiscount && product.price > 0
      ? Math.round(
          ((product.price - sellingPrice) /
            product.price) * 100
        )
      : 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-amber-400/20 bg-[#102747] transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/60 hover:shadow-xl">

      {/* Product photograph */}

      <Link
        to={`/fashion/product/${product.slug}`}
        className="relative block overflow-hidden bg-[#06152f]"
      >

        {product.cover_image ? (

          <img
            src={product.cover_image}
            alt={product.name}
            loading="lazy"
            className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

        ) : (

          <div className="flex aspect-[3/4] w-full flex-col items-center justify-center text-slate-500">

            <ImageOff size={42} />

            <p className="mt-3 text-sm">
              Photograph Coming Soon
            </p>

          </div>

        )}

        {/* Discount label */}

        {discountPercentage > 0 && (

          <span className="absolute left-3 top-3 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white">

            {discountPercentage}% OFF

          </span>

        )}

        {/* Featured product */}

        {product.is_featured && (

          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-amber-400 px-2 py-1.5 text-xs font-bold text-slate-950">

            <Star size={12} />
            Featured

          </span>

        )}

      </Link>

      {/* Product information */}

      <div className="flex flex-1 flex-col p-5">

        <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">

          {categoryName || 'GRK Fashion'}

          {product.wear_type && (
            ` · ${product.wear_type}`
          )}

        </p>

        <Link
          to={`/fashion/product/${product.slug}`}
          className="mt-2 text-lg font-bold text-white transition hover:text-amber-400"
        >

          {product.name}

        </Link>

        <p className="mt-1 text-sm text-slate-400">

          {product.subcategory}

        </p>

        {product.material && (

          <p className="mt-2 text-xs text-slate-400">

            Material: {product.material}

          </p>

        )}

        {/* Pricing */}

        <div className="mt-4 flex flex-wrap items-center gap-3">

          <span className="text-xl font-bold text-amber-400">

            {formatPrice(
              sellingPrice,
              product.currency
            )}

          </span>

          {hasDiscount && (

            <span className="text-sm text-slate-500 line-through">

              {formatPrice(
                product.price,
                product.currency
              )}

            </span>

          )}

        </div>

        {/* Sample product disclosure */}

        {product.is_sample && (

          <div className="mt-3 rounded-lg border border-blue-400/20 bg-blue-500/10 p-2 text-xs text-blue-300">

            Sample product — illustrative pricing.
            Not currently available for purchase.

          </div>

        )}

        {/* Product details button */}

        <div className="mt-auto pt-5">

          <Link
            to={`/fashion/product/${product.slug}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-200 to-amber-500 px-4 py-3 font-bold text-slate-950 transition hover:brightness-110"
          >

            View Details

            <ArrowUpRight size={17} />

          </Link>

        </div>

      </div>

    </article>
  );
}
