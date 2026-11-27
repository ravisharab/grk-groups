
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

import {
  Boxes,
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  AlertCircle,
  Package,
  LoaderCircle,
  X,
} from 'lucide-react';

import {
  getProductVariants,
  saveProductVariant,
  deleteProductVariant,
} from '../../lib/fashionService';

import type {
  FashionProductVariant,
} from '../../types/fashion';

interface ProductVariantsProps {
  productId: string;
  productName: string;
  categorySlug?: string;
  onVariantsChanged?: () => void;
}

const sizeOptions: Record<string, string[]> = {
  men: [
    'XS', 'S', 'M', 'L', 'XL',
    'XXL', '3XL', '4XL', 'Free Size',
  ],

  women: [
    'XS', 'S', 'M', 'L', 'XL',
    'XXL', '3XL', 'Free Size',
  ],

  kids: [
    '0-6 Months',
    '6-12 Months',
    '1-2 Years',
    '3-4 Years',
    '5-6 Years',
    '7-8 Years',
    '9-10 Years',
    '11-12 Years',
    '13-14 Years',
    '15-16 Years',
  ],

  jewellery: [
    'One Size',
    'Adjustable',
    'Ring Size 5',
    'Ring Size 6',
    'Ring Size 7',
    'Ring Size 8',
    'Ring Size 9',
    'Ring Size 10',
    'Bangle 2.2',
    'Bangle 2.4',
    'Bangle 2.6',
    'Bangle 2.8',
    'Bangle 2.10',
  ],
};

const colorOptions = [
  { name: 'Black', code: '#000000' },
  { name: 'White', code: '#FFFFFF' },
  { name: 'Cream', code: '#FFFDD0' },
  { name: 'Gold', code: '#D4AF37' },
  { name: 'Silver', code: '#C0C0C0' },
  { name: 'Red', code: '#DC2626' },
  { name: 'Maroon', code: '#800020' },
  { name: 'Pink', code: '#EC4899' },
  { name: 'Green', code: '#15803D' },
  { name: 'Emerald Green', code: '#046307' },
  { name: 'Royal Blue', code: '#4169E1' },
  { name: 'Navy Blue', code: '#000080' },
  { name: 'Yellow', code: '#EAB308' },
  { name: 'Orange', code: '#F97316' },
  { name: 'Purple', code: '#9333EA' },
  { name: 'Brown', code: '#92400E' },
  { name: 'Beige', code: '#F5F5DC' },
  { name: 'Grey', code: '#808080' },
];

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

export default function ProductVariants({
  productId,
  productName,
  categorySlug = 'men',
  onVariantsChanged,
}: ProductVariantsProps) {

  const [variants, setVariants] =
    useState<FashionProductVariant[]>([]);

  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [colorCode, setColorCode] =
    useState('#D4AF37');

  const [stock, setStock] = useState('0');

  const [available, setAvailable] =
    useState(true);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sizes =
    sizeOptions[categorySlug.toLowerCase()] ??
    ['One Size', 'Free Size'];

  // Load existing variants

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError('');

    getProductVariants(productId)
      .then(data => {
        if (active) setVariants(data);
      })
      .catch(err => {
        if (active) {
          setError(getErrorMessage(err));
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [productId]);

  // Reset form

  function resetForm() {
    setSize('');
    setColor('');
    setColorCode('#D4AF37');
    setStock('0');
    setAvailable(true);
    setEditingId(null);
  }

  // Update selected color

  function handleColorChange(value: string) {
    setColor(value);

    const selected = colorOptions.find(
      item =>
        item.name.toLowerCase() ===
        value.toLowerCase()
    );

    if (selected) {
      setColorCode(selected.code);
    }
  }

  // Save variant

  async function handleSave(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (saving || loading) return;

    setError('');
    setSuccess('');

    const quantity = Number(stock);

    if (!size.trim() || !color.trim()) {
      setError('Size and color are required.');
      return;
    }

    if (
      stock.trim() === '' ||
      !Number.isInteger(quantity) ||
      quantity < 0 ||
      quantity > 2147483647
    ) {
      setError(
        'Enter a valid non-negative whole number.'
      );
      return;
    }

    const duplicate = variants.find(
      item =>
        item.size.toLowerCase() ===
          size.trim().toLowerCase() &&
        item.color.toLowerCase() ===
          color.trim().toLowerCase() &&
        item.id !== editingId
    );

    if (duplicate) {
      setError(
        'This size and color combination already exists. Edit the existing variant instead.'
      );
      return;
    }

    setSaving(true);

    try {
      const saved = await saveProductVariant({
        product_id: productId,
        size: size.trim(),
        color: color.trim(),
        color_code: colorCode,
        stock_quantity: quantity,
        is_available: available,
      });

      setVariants(previous => {
        const exists = previous.some(
          item => item.id === saved.id
        );

        return exists
          ? previous.map(item =>
              item.id === saved.id ? saved : item
            )
          : [...previous, saved];
      });

      setSuccess(
        editingId
          ? 'Inventory updated successfully.'
          : 'Product variant added successfully.'
      );

      resetForm();
      onVariantsChanged?.();

    } catch (err) {
      setError(getErrorMessage(err));

    } finally {
      setSaving(false);
    }
  }

  // Edit existing inventory

  function handleEdit(
    variant: FashionProductVariant
  ) {
    setEditingId(variant.id);
    setSize(variant.size);
    setColor(variant.color);
    setColorCode(
      variant.color_code ?? '#D4AF37'
    );
    setStock(String(variant.stock_quantity));
    setAvailable(variant.is_available);
    setError('');
    setSuccess('');
  }

  // Delete variant

  async function handleDelete(
    variant: FashionProductVariant
  ) {
    if (saving) return;

    const confirmed = window.confirm(
      `Delete ${variant.size} / ${variant.color}?`
    );

    if (!confirmed) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await deleteProductVariant(variant.id);

      setVariants(previous =>
        previous.filter(
          item => item.id !== variant.id
        )
      );

      if (editingId === variant.id) {
        resetForm();
      }

      setSuccess(
        'Product variant deleted successfully.'
      );

      onVariantsChanged?.();

    } catch (err) {
      setError(getErrorMessage(err));

    } finally {
      setSaving(false);
    }
  }

  // Inventory statistics

  const totalStock = variants.reduce(
    (total, item) =>
      total + item.stock_quantity,
    0
  );

  const outOfStock = variants.filter(
    item => item.stock_quantity === 0
  ).length;

  const inputClass =
    'w-full rounded-xl border border-amber-400/30 ' +
    'bg-[#06152f] px-4 py-3 text-white ' +
    'outline-none focus:border-amber-400 ' +
    'disabled:opacity-50';

  return (
    <section className="rounded-2xl border border-amber-400/30 bg-[#102747] p-6 text-white">

      {/* Header */}

      <div className="flex items-center gap-3">

        <Boxes
          size={30}
          className="text-amber-400"
        />

        <div>
          <h2 className="text-2xl font-bold text-amber-400">
            Product Inventory
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            {productName}
          </p>
        </div>

      </div>

      {/* Inventory statistics */}

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">

        {[
          {
            label: 'Total Variants',
            value: variants.length,
          },
          {
            label: 'Total Stock',
            value: totalStock,
          },
          {
            label: 'Out of Stock',
            value: outOfStock,
          },
        ].map(stat => (

          <div
            key={stat.label}
            className="rounded-xl border border-amber-400/20 bg-[#06152f] p-5"
          >

            <p className="text-3xl font-black text-amber-400">
              {stat.value}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              {stat.label}
            </p>

          </div>

        ))}

      </div>

      {/* Notifications */}

      {success && (
        <div
          role="status"
          className="mt-5 flex items-center gap-2 rounded-xl bg-green-500/10 p-4 text-green-400"
        >
          <CheckCircle size={20} />
          {success}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mt-5 flex items-center gap-2 rounded-xl bg-red-500/10 p-4 text-red-400"
        >
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* Inventory table */}

      <div className="mt-8">

        <h3 className="mb-4 text-lg font-bold text-amber-400">
          Existing Variants
        </h3>

        {loading ? (

          <p className="text-sm text-slate-400">
            Loading inventory...
          </p>

        ) : variants.length === 0 ? (

          <div className="rounded-xl border border-white/10 p-8 text-center">

            <Package
              size={38}
              className="mx-auto text-slate-500"
            />

            <p className="mt-3 text-sm text-slate-400">
              No product variants added yet.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left text-sm">

              <thead className="bg-[#06152f] text-amber-400">

                <tr>
                  <th className="p-3">Size</th>
                  <th className="p-3">Color</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>

              </thead>

              <tbody>

                {variants.map(variant => (

                  <tr
                    key={variant.id}
                    className="border-b border-white/10"
                  >

                    <td className="p-3">
                      {variant.size}
                    </td>

                    <td className="p-3">

                      <div className="flex items-center gap-2">

                        <span
                          className="h-5 w-5 shrink-0 rounded-full border border-white/30"
                          style={{
                            backgroundColor:
                              variant.color_code ??
                              '#D4AF37',
                          }}
                        />

                        {variant.color}

                      </div>

                    </td>

                    <td className="p-3 font-semibold">
                      {variant.stock_quantity}
                    </td>

                    <td className="p-3">

                      {!variant.is_available ? (

                        <span className="text-slate-400">
                          Disabled
                        </span>

                      ) : variant.stock_quantity === 0 ? (

                        <span className="text-red-400">
                          Out of Stock
                        </span>

                      ) : variant.stock_quantity <= 5 ? (

                        <span className="text-orange-400">
                          Low Stock
                        </span>

                      ) : (

                        <span className="text-green-400">
                          Available
                        </span>

                      )}

                    </td>

                    <td className="p-3">

                      <div className="flex gap-3">

                        <button
                          type="button"
                          title="Edit inventory"
                          aria-label="Edit inventory"
                          disabled={saving}
                          onClick={() =>
                            handleEdit(variant)
                          }
                          className="text-amber-400 hover:text-amber-200 disabled:opacity-50"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          type="button"
                          title="Delete variant"
                          aria-label="Delete variant"
                          disabled={saving}
                          onClick={() =>
                            handleDelete(variant)
                          }
                          className="text-red-400 hover:text-red-300 disabled:opacity-50"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* Add or edit variant form */}

      <form
        onSubmit={handleSave}
        className="mt-8 border-t border-white/10 pt-6"
      >

        <div className="flex items-center justify-between">

          <h3 className="text-lg font-bold text-amber-400">

            {editingId
              ? 'Edit Product Inventory'
              : 'Add Product Variant'}

          </h3>

          {editingId && (

            <button
              type="button"
              disabled={saving}
              onClick={resetForm}
              className="flex items-center gap-2 text-sm text-slate-400"
            >
              <X size={16} />
              Cancel
            </button>

          )}

        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">

          {/* Size */}

          <div>

            <label
              htmlFor="variant-size"
              className="mb-2 block text-sm text-amber-300"
            >
              Product Size
            </label>

            <input
              id="variant-size"
              list="fashion-size-options"
              value={size}
              required
              disabled={saving || !!editingId}
              onChange={event =>
                setSize(event.target.value)
              }
              placeholder="Select or enter size"
              className={inputClass}
            />

            <datalist id="fashion-size-options">

              {sizes.map(item => (
                <option
                  key={item}
                  value={item}
                />
              ))}

            </datalist>

          </div>

          {/* Color */}

          <div>

            <label
              htmlFor="variant-color"
              className="mb-2 block text-sm text-amber-300"
            >
              Product Color
            </label>

            <input
              id="variant-color"
              list="fashion-color-options"
              value={color}
              required
              disabled={saving || !!editingId}
              onChange={event =>
                handleColorChange(event.target.value)
              }
              placeholder="Select or enter color"
              className={inputClass}
            />

            <datalist id="fashion-color-options">

              {colorOptions.map(item => (
                <option
                  key={item.name}
                  value={item.name}
                />
              ))}

            </datalist>

          </div>

          {/* Color picker */}

          <div>

            <label
              htmlFor="variant-color-code"
              className="mb-2 block text-sm text-amber-300"
            >
              Color Appearance
            </label>

            <div className="flex items-center gap-3">

              <input
                id="variant-color-code"
                type="color"
                value={colorCode}
                disabled={saving}
                onChange={event =>
                  setColorCode(event.target.value)
                }
                className="h-12 w-16 cursor-pointer rounded-lg border border-amber-400/30 bg-[#06152f]"
              />

              <span className="font-mono text-sm text-slate-300">
                {colorCode.toUpperCase()}
              </span>

            </div>

          </div>

          {/* Stock */}

          <div>

            <label
              htmlFor="variant-stock"
              className="mb-2 block text-sm text-amber-300"
            >
              Stock Quantity
            </label>

            <input
              id="variant-stock"
              type="number"
              min="0"
              max="2147483647"
              step="1"
              required
              value={stock}
              disabled={saving}
              onChange={event =>
                setStock(event.target.value)
              }
              className={inputClass}
            />

          </div>

        </div>

        {/* Availability */}

        <label className="mt-6 flex items-center gap-3">

          <input
            type="checkbox"
            checked={available}
            disabled={saving}
            onChange={event =>
              setAvailable(event.target.checked)
            }
            className="h-5 w-5 accent-amber-400"
          />

          <span className="text-sm text-slate-300">
            Enable this product variant
          </span>

        </label>

        {/* Save button */}

        <button
          type="submit"
          disabled={saving || loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-200 to-amber-500 px-6 py-4 font-bold text-slate-950 transition hover:brightness-110 disabled:opacity-50"
        >

          {saving ? (

            <>
              <LoaderCircle
                size={20}
                className="animate-spin"
              />
              Saving Inventory...
            </>

          ) : editingId ? (

            <>
              <CheckCircle size={20} />
              Update Inventory
            </>

          ) : (

            <>
              <Plus size={20} />
              Save Product Variant
            </>

          )}

        </button>

      </form>

    </section>
  );
}
