
import { useState } from 'react';
import type { FormEvent } from 'react';

import {
  PackagePlus,
  Save,
  X,
  LoaderCircle,
  AlertCircle,
} from 'lucide-react';

import {
  createProduct,
  updateProduct,
  generateSlug,
} from '../../lib/fashionService';

import type {
  FashionCategory,
  FashionProduct,
  FashionProductInput,
} from '../../types/fashion';

interface ProductFormProps {
  categories: FashionCategory[];
  product?: FashionProduct | null;
  onSaved: (product: FashionProduct) => void;
  onCancel: () => void;
}

const subcategories: Record<string, string[]> = {
  men: [
    'Kurta',
    'Sherwani',
    'Kurta Pajama',
    'Dhoti',
    'Nehru Jacket',
    'Shirt',
    'T-Shirt',
    'Jeans',
    'Trousers',
    'Casual Wear',
    'Other',
  ],

  women: [
    'Saree',
    'Silk Saree',
    'Lehenga',
    'Kurti',
    'Salwar Kameez',
    'Anarkali',
    'Churidar',
    'Dress',
    'Top',
    'Jeans',
    'Casual Wear',
    'Other',
  ],

  kids: [
    'Pattu Pavadai',
    'Lehenga',
    'Kurta Pajama',
    'Sherwani',
    'Frock',
    'Dhoti Set',
    'T-Shirt',
    'Shirt',
    'Jeans',
    'Party Wear',
    'Casual Wear',
    'Other',
  ],

  jewellery: [
    'Necklace',
    'Earrings',
    'Bangles',
    'Bracelet',
    'Ring',
    'Anklet',
    'Pendant',
    'Mangalsutra',
    'Temple Jewellery',
    'Bridal Jewellery',
    'Fashion Jewellery',
    'Other',
  ],
};

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

const occasions = [
  'Wedding',
  'Festival',
  'Party',
  'Casual',
  'Office',
  'Daily Wear',
  'Birthday',
  'Engagement',
  'Special Occasion',
  'All Occasions',
];

const materials = [
  'Cotton',
  'Silk',
  'Pure Silk',
  'Silk Blend',
  'Banarasi Silk',
  'Kanchipuram Silk',
  'Georgette',
  'Chiffon',
  'Linen',
  'Rayon',
  'Polyester',
  'Velvet',
  'Denim',
  'Gold',
  'Silver',
  'Gold Plated',
  'Alloy',
  'Artificial Jewellery',
];

function getErrorMessage(error: unknown): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error
  ) {
    return String(error.message);
  }

  return 'Unable to save product.';
}

export default function ProductForm({
  categories,
  product,
  onSaved,
  onCancel,
}: ProductFormProps) {

  const [name, setName] =
    useState(product?.name ?? '');

  const [categoryId, setCategoryId] =
    useState(
      String(
        product?.category_id ??
        categories[0]?.id ??
        ''
      )
    );

  const [subcategory, setSubcategory] =
    useState(product?.subcategory ?? '');

  const [sku, setSku] =
    useState(product?.sku ?? '');

  const [description, setDescription] =
    useState(product?.description ?? '');

  const [wearType, setWearType] =
    useState(product?.wear_type ?? '');

  const [material, setMaterial] =
    useState(product?.material ?? '');

  const [occasion, setOccasion] =
    useState(product?.occasion ?? '');

  const [price, setPrice] =
    useState(
      product ? String(product.price) : ''
    );

  const [discountPrice, setDiscountPrice] =
    useState(
      product?.discount_price != null
        ? String(product.discount_price)
        : ''
    );

  const [currency, setCurrency] =
    useState(product?.currency ?? 'USD');

  const [featured, setFeatured] =
    useState(product?.is_featured ?? false);

  const [published, setPublished] =
    useState(product?.is_published ?? false);

  const [sample, setSample] =
    useState(product?.is_sample ?? true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState('');

  const selectedCategory = categories.find(
    category =>
      String(category.id) === categoryId
  );

  const availableSubcategories =
    subcategories[selectedCategory?.slug ?? ''] ??
    ['Other'];

  const inputClass =
    'w-full rounded-xl border border-amber-400/30 ' +
    'bg-[#06152f] px-4 py-3 text-white ' +
    'outline-none focus:border-amber-400 ' +
    'disabled:opacity-50';

  const labelClass =
    'mb-2 block text-sm font-medium text-amber-300';

  const regularAmount = Number(price);

  const discountAmount =
    discountPrice.trim() === ''
      ? null
      : Number(discountPrice);

  const discountPercentage =
    regularAmount > 0 &&
    discountAmount !== null &&
    discountAmount >= 0 &&
    discountAmount <= regularAmount
      ? Math.round(
          ((regularAmount - discountAmount) /
            regularAmount) * 100
        )
      : 0;

  // Generate a unique product SKU

  function handleGenerateSku() {
    const prefix =
      selectedCategory?.slug
        .substring(0, 3)
        .toUpperCase() ?? 'PRD';

    const suffix = crypto
      .randomUUID()
      .replace(/-/g, '')
      .substring(0, 12)
      .toUpperCase();

    setSku(`GRK-${prefix}-${suffix}`);
  }

  // Save product

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (saving) return;

    setError('');

    if (!name.trim()) {
      setError('Product name is required.');
      return;
    }

    if (!selectedCategory) {
      setError('Select a valid category.');
      return;
    }

    if (!subcategory.trim()) {
      setError('Subcategory is required.');
      return;
    }

    if (!sku.trim()) {
      setError('Product SKU is required.');
      return;
    }

    if (
      price.trim() === '' ||
      !Number.isFinite(regularAmount) ||
      regularAmount < 0 ||
      regularAmount > 99999999.99
    ) {
      setError('Enter a valid product price.');
      return;
    }

    if (
      discountAmount !== null &&
      (
        !Number.isFinite(discountAmount) ||
        discountAmount < 0 ||
        discountAmount > regularAmount
      )
    ) {
      setError(
        'Discount price must be between zero and the regular price.'
      );
      return;
    }

    const normalizedSku =
      sku.trim().toUpperCase();

    const slug =
      product?.slug ??
      generateSlug(
        `${name}-${normalizedSku}`
      );

    if (!slug) {
      setError('Unable to generate product URL.');
      return;
    }

    const productData: FashionProductInput = {
      category_id: Number(categoryId),

      name: name.trim(),

      slug,

      sku: normalizedSku,

      description:
        description.trim() || null,

      subcategory: subcategory.trim(),

      wear_type: wearType || null,

      material: material.trim() || null,

      occasion: occasion || null,

      price: regularAmount,

      discount_price: discountAmount,

      currency,

      cover_image:
        product?.cover_image ?? null,

      is_featured: featured,

      is_published: published,

      is_sample: sample,
    };

    setSaving(true);

    try {
      const savedProduct = product
        ? await updateProduct(
            product.id,
            productData
          )
        : await createProduct(productData);

      onSaved(savedProduct);

    } catch (err) {
      setError(getErrorMessage(err));

    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-2xl border border-amber-400/30 bg-[#102747] p-6 text-white">

      {/* Header */}

      <div className="flex items-center justify-between gap-4">

        <div className="flex items-center gap-3">

          <PackagePlus
            size={30}
            className="text-amber-400"
          />

          <div>

            <h2 className="text-2xl font-bold text-amber-400">
              {product
                ? 'Edit Product'
                : 'Add New Product'}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              GRK Fashion Product Management
            </p>

          </div>

        </div>

        <button
          type="button"
          aria-label="Close product form"
          disabled={saving}
          onClick={onCancel}
          className="rounded-lg p-2 text-slate-400 hover:bg-white/10"
        >
          <X size={24} />
        </button>

      </div>

      {/* Error message */}

      {error && (

        <div
          role="alert"
          className="mt-6 flex items-center gap-3 rounded-xl bg-red-500/10 p-4 text-red-400"
        >
          <AlertCircle size={20} />
          {error}
        </div>

      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-8"
      >

        {/* Basic product information */}

        <div>

          <h3 className="mb-5 text-lg font-bold text-amber-400">
            Basic Information
          </h3>

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <label
                htmlFor="product-name"
                className={labelClass}
              >
                Product Name *
              </label>

              <input
                id="product-name"
                value={name}
                required
                maxLength={200}
                disabled={saving}
                onChange={e =>
                  setName(e.target.value)
                }
                placeholder="Royal Wedding Sherwani"
                className={inputClass}
              />

            </div>

            <div>

              <label
                htmlFor="product-category"
                className={labelClass}
              >
                Category *
              </label>

              <select
                id="product-category"
                value={categoryId}
                required
                disabled={saving}
                onChange={e => {
                  setCategoryId(e.target.value);
                  setSubcategory('');
                }}
                className={inputClass}
              >

                <option value="">
                  Select Category
                </option>

                {categories.map(category => (

                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>

                ))}

              </select>

            </div>

            <div>

              <label
                htmlFor="product-subcategory"
                className={labelClass}
              >
                Subcategory *
              </label>

              <input
                id="product-subcategory"
                list="product-subcategories"
                value={subcategory}
                required
                disabled={saving}
                onChange={e =>
                  setSubcategory(e.target.value)
                }
                placeholder="Select or enter subcategory"
                className={inputClass}
              />

              <datalist id="product-subcategories">

                {availableSubcategories.map(item => (
                  <option
                    key={item}
                    value={item}
                  />
                ))}

              </datalist>

            </div>

            <div>

              <label
                htmlFor="product-sku"
                className={labelClass}
              >
                Product SKU *
              </label>

              <div className="flex gap-2">

                <input
                  id="product-sku"
                  value={sku}
                  required
                  disabled={saving}
                  onChange={e =>
                    setSku(
                      e.target.value.toUpperCase()
                    )
                  }
                  placeholder="GRK-MEN-001"
                  className={inputClass}
                />

                <button
                  type="button"
                  disabled={saving}
                  onClick={handleGenerateSku}
                  className="rounded-xl border border-amber-400/40 px-4 text-sm font-semibold text-amber-400 hover:bg-amber-400 hover:text-slate-950"
                >
                  Generate
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* Product description */}

        <div>

          <label
            htmlFor="product-description"
            className={labelClass}
          >
            Product Description
          </label>

          <textarea
            id="product-description"
            value={description}
            rows={5}
            disabled={saving}
            onChange={e =>
              setDescription(e.target.value)
            }
            placeholder="Describe the product, design, quality and special features..."
            className={inputClass}
          />

        </div>

        {/* Fashion details */}

        <div className="border-t border-white/10 pt-6">

          <h3 className="mb-5 text-lg font-bold text-amber-400">
            Fashion Details
          </h3>

          <div className="grid gap-5 md:grid-cols-3">

            <div>

              <label
                htmlFor="product-wear"
                className={labelClass}
              >
                Wear Type
              </label>

              <select
                id="product-wear"
                value={wearType}
                disabled={saving}
                onChange={e =>
                  setWearType(e.target.value)
                }
                className={inputClass}
              >

                <option value="">
                  Select Wear Type
                </option>

                {wearTypes.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}

              </select>

            </div>

            <div>

              <label
                htmlFor="product-material"
                className={labelClass}
              >
                Material
              </label>

              <input
                id="product-material"
                list="fashion-materials"
                value={material}
                disabled={saving}
                onChange={e =>
                  setMaterial(e.target.value)
                }
                placeholder="Select or enter material"
                className={inputClass}
              />

              <datalist id="fashion-materials">

                {materials.map(item => (
                  <option key={item} value={item} />
                ))}

              </datalist>

            </div>

            <div>

              <label
                htmlFor="product-occasion"
                className={labelClass}
              >
                Occasion
              </label>

              <select
                id="product-occasion"
                value={occasion}
                disabled={saving}
                onChange={e =>
                  setOccasion(e.target.value)
                }
                className={inputClass}
              >

                <option value="">
                  Select Occasion
                </option>

                {occasions.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}

              </select>

            </div>

          </div>

        </div>

        {/* Pricing */}

        <div className="border-t border-white/10 pt-6">

          <h3 className="mb-5 text-lg font-bold text-amber-400">
            Product Pricing
          </h3>

          <div className="grid gap-5 md:grid-cols-3">

            <div>

              <label
                htmlFor="product-currency"
                className={labelClass}
              >
                Currency
              </label>

              <select
                id="product-currency"
                value={currency}
                disabled={saving}
                onChange={e =>
                  setCurrency(e.target.value)
                }
                className={inputClass}
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
              </select>

            </div>

            <div>

              <label
                htmlFor="product-price"
                className={labelClass}
              >
                Regular Price *
              </label>

              <input
                id="product-price"
                type="number"
                min="0"
                max="99999999.99"
                step="0.01"
                required
                value={price}
                disabled={saving}
                onChange={e =>
                  setPrice(e.target.value)
                }
                placeholder="129.99"
                className={inputClass}
              />

            </div>

            <div>

              <label
                htmlFor="product-discount"
                className={labelClass}
              >
                Discount Price
              </label>

              <input
                id="product-discount"
                type="number"
                min="0"
                step="0.01"
                value={discountPrice}
                disabled={saving}
                onChange={e =>
                  setDiscountPrice(e.target.value)
                }
                placeholder="99.99"
                className={inputClass}
              />

            </div>

          </div>

          {discountPercentage > 0 && (

            <div className="mt-5 rounded-xl border border-green-400/20 bg-green-500/10 p-4">

              <p className="font-semibold text-green-400">
                Customer Savings: {discountPercentage}% OFF
              </p>

            </div>

          )}

        </div>

        {/* Publishing options */}

        <div className="border-t border-white/10 pt-6">

          <h3 className="mb-5 text-lg font-bold text-amber-400">
            Publishing Options
          </h3>

          <div className="space-y-4">

            <label className="flex items-start gap-3 rounded-xl bg-[#06152f] p-4">

              <input
                type="checkbox"
                checked={featured}
                disabled={saving}
                onChange={e =>
                  setFeatured(e.target.checked)
                }
                className="mt-1 h-5 w-5 accent-amber-400"
              />

              <div>

                <p className="font-semibold text-white">
                  Featured Product
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Highlight this product in featured collections.
                </p>

              </div>

            </label>

            <label className="flex items-start gap-3 rounded-xl bg-[#06152f] p-4">

              <input
                type="checkbox"
                checked={sample}
                disabled={saving}
                onChange={e =>
                  setSample(e.target.checked)
                }
                className="mt-1 h-5 w-5 accent-amber-400"
              />

              <div>

                <p className="font-semibold text-white">
                  Sample Product
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Mark this product as a demonstration item.
                </p>

              </div>

            </label>

            <label className="flex items-start gap-3 rounded-xl bg-[#06152f] p-4">

              <input
                type="checkbox"
                checked={published}
                disabled={saving}
                onChange={e =>
                  setPublished(e.target.checked)
                }
                className="mt-1 h-5 w-5 accent-amber-400"
              />

              <div>

                <p className="font-semibold text-white">
                  Publish Product
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Make this product available in the public catalogue.
                </p>

              </div>

            </label>

          </div>

        </div>

        {/* Save and cancel buttons */}

        <div className="flex flex-wrap justify-end gap-4 border-t border-white/10 pt-6">

          <button
            type="button"
            disabled={saving}
            onClick={onCancel}
            className="rounded-xl border border-amber-400/40 px-8 py-4 font-semibold text-amber-400"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-200 to-amber-500 px-8 py-4 font-bold text-slate-950 disabled:opacity-50"
          >

            {saving ? (

              <>
                <LoaderCircle
                  size={20}
                  className="animate-spin"
                />
                Saving Product...
              </>

            ) : (

              <>
                <Save size={20} />

                {product
                  ? 'Update Product'
                  : 'Save Product'}

              </>

            )}

          </button>

        </div>

      </form>

    </section>
  );
}
