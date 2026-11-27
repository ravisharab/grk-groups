
import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Images,
  Boxes,
  Eye,
  EyeOff,
  Package,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  LoaderCircle,
} from 'lucide-react';

import {
  getCategories,
  getAdminProducts,
  deleteProduct,
  publishProduct,
} from '../../lib/fashionService';

import type {
  FashionCategory,
  FashionProduct,
} from '../../types/fashion';

import ProductForm from './ProductForm';
import ProductImageUpload from './ProductImageUpload';
import ProductVariants from './ProductVariants';

type ManagerView =
  | 'list'
  | 'create'
  | 'edit'
  | 'images'
  | 'inventory';

interface ProductManagerProps {
  onProductsChanged?: () => void;
}

function getErrorMessage(error: unknown): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error
  ) {
    return String(error.message);
  }

  return 'An unexpected error occurred.';
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

export default function ProductManager({
  onProductsChanged,
}: ProductManagerProps) {

  const [products, setProducts] =
    useState<FashionProduct[]>([]);

  const [categories, setCategories] =
    useState<FashionCategory[]>([]);

  const [view, setView] =
    useState<ManagerView>('list');

  const [selectedProduct, setSelectedProduct] =
    useState<FashionProduct | null>(null);

  const [search, setSearch] = useState('');

  const [categoryFilter, setCategoryFilter] =
    useState('all');

  const [statusFilter, setStatusFilter] =
    useState('all');

  const [loading, setLoading] =
    useState(true);

  const [busy, setBusy] =
    useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load products and categories

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [productData, categoryData] =
        await Promise.all([
          getAdminProducts(),
          getCategories(),
        ]);

      setProducts(productData);
      setCategories(categoryData);

      setSelectedProduct(previous =>
        previous
          ? productData.find(
              item => item.id === previous.id
            ) ?? null
          : null
      );

    } catch (err) {
      setError(getErrorMessage(err));

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  // Return to product list

  function backToList() {
    setView('list');
    setSelectedProduct(null);
    setError('');
  }

  // Open create product form

  function openCreate() {
    setSelectedProduct(null);
    setError('');
    setSuccess('');
    setView('create');
  }

  // Open selected product section

  function openProduct(
    product: FashionProduct,
    nextView: ManagerView
  ) {
    setSelectedProduct(product);
    setError('');
    setSuccess('');
    setView(nextView);
  }

  // Product created or updated

  function handleProductSaved(
    product: FashionProduct
  ) {
    const isNew = view === 'create';

    setProducts(previous => {
      const exists = previous.some(
        item => item.id === product.id
      );

      return exists
        ? previous.map(item =>
            item.id === product.id
              ? product
              : item
          )
        : [product, ...previous];
    });

    setSelectedProduct(product);

    setSuccess(
      isNew
        ? 'Product created successfully. You can now upload photographs.'
        : 'Product updated successfully.'
    );

    setView(isNew ? 'images' : 'list');

    onProductsChanged?.();
  }

  // Refresh after image or inventory changes

  async function handleDetailsChanged() {
    await loadData();
    onProductsChanged?.();
  }

  // Publish or unpublish product

  async function handlePublish(
    product: FashionProduct
  ) {
    if (busy) return;

    const nextStatus = !product.is_published;

    if (nextStatus && !product.cover_image) {
      setError(
        'Upload a cover photograph before publishing this product.'
      );
      return;
    }

    setBusy(true);
    setError('');
    setSuccess('');

    try {
      const updated = await publishProduct(
        product.id,
        nextStatus
      );

      setProducts(previous =>
        previous.map(item =>
          item.id === updated.id
            ? updated
            : item
        )
      );

      setSuccess(
        nextStatus
          ? 'Product published successfully.'
          : 'Product unpublished successfully.'
      );

      onProductsChanged?.();

    } catch (err) {
      setError(getErrorMessage(err));

    } finally {
      setBusy(false);
    }
  }

  // Delete product

  async function handleDelete(
    product: FashionProduct
  ) {
    if (busy) return;

    const confirmed = window.confirm(
      `Permanently delete "${product.name}"? ` +
      'This action cannot be undone.'
    );

    if (!confirmed) return;

    setBusy(true);
    setError('');
    setSuccess('');

    try {
      await deleteProduct(product.id);

      setProducts(previous =>
        previous.filter(
          item => item.id !== product.id
        )
      );

      setSuccess(
        'Product deleted successfully.'
      );

      onProductsChanged?.();

    } catch (err) {
      setError(getErrorMessage(err));

    } finally {
      setBusy(false);
    }
  }

  // Get category name

  function getCategoryName(
    categoryId: number
  ): string {
    return categories.find(
      category => category.id === categoryId
    )?.name ?? 'Unknown';
  }

  // Filter products

  const filteredProducts = products.filter(
    product => {
      const keyword = search
        .trim()
        .toLowerCase();

      const searchableText = [
        product.name,
        product.sku,
        product.subcategory,
        product.material ?? '',
        getCategoryName(product.category_id),
      ].join(' ').toLowerCase();

      const matchesSearch =
        searchableText.includes(keyword);

      const matchesCategory =
        categoryFilter === 'all' ||
        String(product.category_id) ===
          categoryFilter;

      const matchesStatus =
        statusFilter === 'all' ||
        (
          statusFilter === 'published' &&
          product.is_published
        ) ||
        (
          statusFilter === 'draft' &&
          !product.is_published
        ) ||
        (
          statusFilter === 'sample' &&
          product.is_sample
        );

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    }
  );

  const publishedCount = products.filter(
    product => product.is_published
  ).length;

  const selectedCategorySlug =
    categories.find(
      category =>
        category.id ===
        selectedProduct?.category_id
    )?.slug ?? 'men';

  const inputClass =
    'w-full rounded-xl border border-amber-400/30 ' +
    'bg-[#06152f] px-4 py-3 text-white ' +
    'outline-none focus:border-amber-400';

  const actionClass =
    'flex items-center justify-center gap-2 ' +
    'rounded-lg border border-amber-400/20 ' +
    'px-3 py-2 text-xs font-medium ' +
    'text-amber-400 hover:bg-amber-400 ' +
    'hover:text-slate-950 disabled:opacity-50';

  return (
    <section className="mt-10 text-white">

      {/* Success notification */}

      {success && (
        <div
          role="status"
          className="mb-5 flex items-center gap-3 rounded-xl bg-green-500/10 p-4 text-green-400"
        >
          <CheckCircle size={20} />
          {success}
        </div>
      )}

      {/* Error notification */}

      {error && (
        <div
          role="alert"
          className="mb-5 flex items-center gap-3 rounded-xl bg-red-500/10 p-4 text-red-400"
        >
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* Back navigation */}

      {view !== 'list' && (
        <button
          type="button"
          onClick={backToList}
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-200"
        >
          <ArrowLeft size={18} />
          Back to Products
        </button>
      )}

      {/* Create or edit product */}

      {(view === 'create' ||
        view === 'edit') && (

        <ProductForm
          key={selectedProduct?.id ?? 'new'}
          categories={categories}
          product={
            view === 'edit'
              ? selectedProduct
              : null
          }
          onSaved={handleProductSaved}
          onCancel={backToList}
        />

      )}

      {/* Product photograph management */}

      {view === 'images' &&
        selectedProduct && (

        <div className="space-y-5">

          <ProductImageUpload
            key={selectedProduct.id}
            productId={selectedProduct.id}
            productName={selectedProduct.name}
            coverImage={selectedProduct.cover_image}
            onImagesChanged={() => {
              void handleDetailsChanged();
            }}
          />

          <button
            type="button"
            onClick={() =>
              setView('inventory')
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-4 font-bold text-slate-950"
          >
            <Boxes size={20} />
            Continue to Inventory
          </button>

        </div>

      )}

      {/* Inventory management */}

      {view === 'inventory' &&
        selectedProduct && (

        <ProductVariants
          key={selectedProduct.id}
          productId={selectedProduct.id}
          productName={selectedProduct.name}
          categorySlug={selectedCategorySlug}
          onVariantsChanged={() => {
            onProductsChanged?.();
          }}
        />

      )}

      {/* Product list */}

      {view === 'list' && (

        <div className="rounded-2xl border border-amber-400/30 bg-[#102747] p-6">

          {/* Dashboard header */}

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>

              <h2 className="text-2xl font-bold text-amber-400">
                Product Management
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Manage your GRK Fashion collections.
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              <button
                type="button"
                title="Refresh products"
                aria-label="Refresh products"
                disabled={loading || busy}
                onClick={() => void loadData()}
                className="rounded-xl border border-amber-400/30 p-3 text-amber-400 disabled:opacity-50"
              >
                <RefreshCw
                  size={20}
                  className={
                    loading ? 'animate-spin' : ''
                  }
                />
              </button>

              <button
                type="button"
                disabled={
                  loading ||
                  busy ||
                  categories.length === 0
                }
                onClick={openCreate}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-200 to-amber-500 px-5 py-3 font-bold text-slate-950 disabled:opacity-50"
              >
                <Plus size={20} />
                Add New Product
              </button>

            </div>

          </div>

          {/* Product statistics */}

          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

            {[
              {
                label: 'Total Products',
                value: products.length,
              },
              {
                label: 'Published',
                value: publishedCount,
              },
              {
                label: 'Draft Products',
                value:
                  products.length - publishedCount,
              },
              {
                label: 'Collections',
                value: categories.length,
              },
            ].map(stat => (

              <div
                key={stat.label}
                className="rounded-xl border border-amber-400/20 bg-[#06152f] p-4"
              >

                <p className="text-3xl font-black text-amber-400">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {stat.label}
                </p>

              </div>

            ))}

          </div>

          {/* Search and filters */}

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-4 text-amber-400"
              />

              <input
                aria-label="Search products"
                value={search}
                onChange={event =>
                  setSearch(event.target.value)
                }
                placeholder="Search name or SKU..."
                className={`${inputClass} pl-11`}
              />

            </div>

            <select
              aria-label="Filter by collection"
              value={categoryFilter}
              onChange={event =>
                setCategoryFilter(event.target.value)
              }
              className={inputClass}
            >

              <option value="all">
                All Collections
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

            <select
              aria-label="Filter by status"
              value={statusFilter}
              onChange={event =>
                setStatusFilter(event.target.value)
              }
              className={inputClass}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="sample">Sample Products</option>
            </select>

          </div>

          <p className="mt-5 text-sm text-slate-400">
            Showing {filteredProducts.length} of{' '}
            {products.length} products
          </p>

          {/* Product cards */}

          {loading ? (

            <div className="flex items-center justify-center gap-3 py-20 text-amber-400">

              <LoaderCircle
                size={25}
                className="animate-spin"
              />

              Loading products...

            </div>

          ) : filteredProducts.length === 0 ? (

            <div className="mt-6 rounded-xl border border-dashed border-amber-400/30 py-16 text-center">

              <Package
                size={48}
                className="mx-auto text-amber-400"
              />

              <h3 className="mt-4 text-xl font-bold text-amber-400">
                {products.length === 0
                  ? 'No Products Yet'
                  : 'No Matching Products'}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {products.length === 0
                  ? 'Create your first GRK Fashion product.'
                  : 'Try changing your search or filters.'}
              </p>

              {products.length === 0 &&
                categories.length > 0 && (

                <button
                  type="button"
                  disabled={busy}
                  onClick={openCreate}
                  className="mt-6 rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950"
                >
                  Add First Product
                </button>

              )}

            </div>

          ) : (

            <div className="mt-6 grid gap-5 lg:grid-cols-2">

              {filteredProducts.map(product => (

                <article
                  key={product.id}
                  className="overflow-hidden rounded-2xl border border-amber-400/20 bg-[#06152f] p-4"
                >

                  <div className="flex gap-4">

                    {product.cover_image ? (

                      <img
                        src={product.cover_image}
                        alt={product.name}
                        loading="lazy"
                        className="h-32 w-24 shrink-0 rounded-xl object-cover"
                      />

                    ) : (

                      <div className="flex h-32 w-24 shrink-0 items-center justify-center rounded-xl bg-white/5">

                        <Images
                          size={30}
                          className="text-slate-500"
                        />

                      </div>

                    )}

                    <div className="min-w-0 flex-1">

                      <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                        {getCategoryName(
                          product.category_id
                        )}
                      </p>

                      <h3 className="mt-2 break-words text-lg font-bold text-white">
                        {product.name}
                      </h3>

                      <p className="mt-1 break-all text-xs text-slate-400">
                        SKU: {product.sku}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-2">

                        <span className="text-lg font-bold text-amber-400">

                          {formatPrice(
                            product.discount_price ??
                              product.price,
                            product.currency
                          )}

                        </span>

                        {product.discount_price != null &&
                          product.discount_price <
                            product.price && (

                          <span className="text-sm text-slate-500 line-through">

                            {formatPrice(
                              product.price,
                              product.currency
                            )}

                          </span>

                        )}

                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">

                        <span className={
                          product.is_published
                            ? 'rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-400'
                            : 'rounded-full bg-white/10 px-2 py-1 text-xs text-slate-400'
                        }>
                          {product.is_published
                            ? 'Published'
                            : 'Draft'}
                        </span>

                        {product.is_sample && (
                          <span className="rounded-full bg-blue-500/10 px-2 py-1 text-xs text-blue-400">
                            Sample
                          </span>
                        )}

                        {product.is_featured && (
                          <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs text-amber-400">
                            Featured
                          </span>
                        )}

                      </div>

                    </div>

                  </div>

                  {/* Product actions */}

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">

                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        openProduct(product, 'edit')
                      }
                      className={actionClass}
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        openProduct(product, 'images')
                      }
                      className={actionClass}
                    >
                      <Images size={15} />
                      Photos
                    </button>

                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        openProduct(product, 'inventory')
                      }
                      className={actionClass}
                    >
                      <Boxes size={15} />
                      Inventory
                    </button>

                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        void handlePublish(product)
                      }
                      className={actionClass}
                    >

                      {product.is_published ? (
                        <EyeOff size={15} />
                      ) : (
                        <Eye size={15} />
                      )}

                      {product.is_published
                        ? 'Unpublish'
                        : 'Publish'}

                    </button>

                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        void handleDelete(product)
                      }
                      className="flex items-center gap-2 rounded-lg border border-red-400/30 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>

      )}

    </section>
  );
}
