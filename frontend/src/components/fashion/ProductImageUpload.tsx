
import { useEffect, useRef, useState } from 'react';

import {
  Upload,
  ImagePlus,
  Images,
  Star,
  X,
  CheckCircle,
  AlertCircle,
  LoaderCircle,
} from 'lucide-react';

import {
  getProductImages,
  uploadProductImage,
  addProductImage,
  updateProduct,
} from '../../lib/fashionService';

import type {
  FashionProductImage,
} from '../../types/fashion';

interface ProductImageUploadProps {
  productId: string;
  productName: string;
  coverImage?: string | null;
  onImagesChanged?: () => void;
}

const viewTypes = [
  { value: 'front', label: 'Front View' },
  { value: 'back', label: 'Back View' },
  { value: 'side', label: 'Side View' },
  { value: 'model', label: 'Model Appearance' },
  { value: 'detail', label: 'Close-up Detail' },
  { value: 'lifestyle', label: 'Lifestyle View' },
  { value: 'other', label: 'Other' },
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

export default function ProductImageUpload({
  productId,
  productName,
  coverImage,
  onImagesChanged,
}: ProductImageUploadProps) {

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [images, setImages] =
    useState<FashionProductImage[]>([]);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState<string | null>(null);

  const [viewType, setViewType] =
    useState('front');

  const [altText, setAltText] =
    useState('');

  const [currentCover, setCurrentCover] =
    useState(coverImage ?? null);

  const [makeCover, setMakeCover] =
    useState(!coverImage);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [success, setSuccess] =
    useState('');

  const [error, setError] =
    useState('');

  // Load existing product photographs

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError('');

    getProductImages(productId)
      .then(data => {
        if (active) setImages(data);
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

  // Synchronize cover photograph

  useEffect(() => {
    setCurrentCover(coverImage ?? null);
    setMakeCover(!coverImage);
  }, [coverImage, productId]);

  // Create and clean up local image preview

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl =
      URL.createObjectURL(selectedFile);

    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  // Validate selected photograph

  function handleFileSelection(file?: File) {
    setError('');
    setSuccess('');

    if (!file) return;

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        'Only JPG, PNG and WEBP images are allowed.'
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        'Image size cannot exceed 5 MB.'
      );
      return;
    }

    setSelectedFile(file);
  }

  // Clear selected photograph

  function clearSelection() {
    setSelectedFile(null);
    setAltText('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  // Upload photograph to Supabase

  async function handleUpload() {
    if (!selectedFile || uploading) return;

    setUploading(true);
    setError('');
    setSuccess('');

    let imageSaved = false;

    try {
      const imageUrl =
        await uploadProductImage(
          selectedFile,
          productId
        );

      const nextOrder =
        images.length === 0
          ? 0
          : Math.max(
              ...images.map(
                image => image.display_order
              )
            ) + 1;

      const savedImage =
        await addProductImage({
          product_id: productId,
          image_url: imageUrl,
          alt_text:
            altText.trim() ||
            `${productName} - ${viewType} view`,
          view_type: viewType,
          display_order: nextOrder,
        });

      imageSaved = true;

      setImages(previous => [
        ...previous,
        savedImage,
      ]);

      clearSelection();

      if (makeCover || !currentCover) {
        await updateProduct(productId, {
          cover_image: imageUrl,
        });

        setCurrentCover(imageUrl);
        setMakeCover(false);
      }

      setSuccess(
        'Product photograph uploaded successfully.'
      );

      onImagesChanged?.();

    } catch (err) {
      setError(
        imageSaved
          ? 'Photograph saved, but cover update failed. You can select it as the cover again.'
          : getErrorMessage(err)
      );

      if (imageSaved) {
        onImagesChanged?.();
      }

    } finally {
      setUploading(false);
    }
  }

  // Select an existing image as cover

  async function handleSetCover(
    imageUrl: string
  ) {
    if (uploading) return;

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      await updateProduct(productId, {
        cover_image: imageUrl,
      });

      setCurrentCover(imageUrl);
      setMakeCover(false);

      setSuccess(
        'Cover photograph updated successfully.'
      );

      onImagesChanged?.();

    } catch (err) {
      setError(getErrorMessage(err));

    } finally {
      setUploading(false);
    }
  }

  const inputClass =
    'w-full rounded-xl border border-amber-400/30 ' +
    'bg-[#06152f] px-4 py-3 text-white ' +
    'outline-none focus:border-amber-400';

  return (
    <section className="rounded-2xl border border-amber-400/30 bg-[#102747] p-6 text-white">

      {/* Header */}

      <div className="flex items-center gap-3">

        <Images
          size={28}
          className="text-amber-400"
        />

        <div>
          <h2 className="text-2xl font-bold text-amber-400">
            Product Photographs
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            {productName}
          </p>
        </div>

      </div>

      {/* Success message */}

      {success && (
        <div
          role="status"
          className="mt-5 flex items-center gap-2 rounded-xl bg-green-500/10 p-4 text-green-400"
        >
          <CheckCircle size={20} />
          {success}
        </div>
      )}

      {/* Error message */}

      {error && (
        <div
          role="alert"
          className="mt-5 flex items-center gap-2 rounded-xl bg-red-500/10 p-4 text-red-400"
        >
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* Existing photographs */}

      <div className="mt-6">

        <h3 className="mb-4 font-semibold text-amber-300">
          Existing Photographs ({images.length})
        </h3>

        {loading ? (

          <p className="text-sm text-slate-400">
            Loading photographs...
          </p>

        ) : images.length === 0 ? (

          <div className="rounded-xl border border-white/10 p-8 text-center">

            <ImagePlus
              size={36}
              className="mx-auto text-slate-500"
            />

            <p className="mt-3 text-sm text-slate-400">
              No photographs uploaded yet.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

            {images.map(image => (

              <div
                key={image.id}
                className="overflow-hidden rounded-xl border border-amber-400/20 bg-[#06152f]"
              >

                <div className="relative">

                  <img
                    src={image.image_url}
                    alt={
                      image.alt_text ||
                      productName
                    }
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover"
                  />

                  {currentCover === image.image_url && (

                    <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-amber-400 px-2 py-1 text-xs font-bold text-slate-950">

                      <Star size={12} />
                      Cover

                    </span>

                  )}

                </div>

                <div className="p-3">

                  <p className="text-sm capitalize text-amber-300">
                    {image.view_type} View
                  </p>

                  {currentCover !== image.image_url && (

                    <button
                      type="button"
                      disabled={uploading}
                      onClick={() =>
                        handleSetCover(image.image_url)
                      }
                      className="mt-3 w-full rounded-lg border border-amber-400/30 px-2 py-2 text-xs text-amber-400 hover:bg-amber-400 hover:text-slate-950 disabled:opacity-50"
                    >
                      Set as Cover
                    </button>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Upload section */}

      <div className="mt-8 border-t border-white/10 pt-6">

        <h3 className="mb-4 text-lg font-bold text-amber-400">
          Upload New Photograph
        </h3>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={uploading}
          onChange={event => {
            handleFileSelection(
              event.target.files?.[0]
            );

            event.target.value = '';
          }}
          className="hidden"
        />

        {preview ? (

          <div className="relative mx-auto max-w-xs overflow-hidden rounded-2xl border border-amber-400/30">

            <img
              src={preview}
              alt="Selected product preview"
              className="max-h-96 w-full object-contain"
            />

            <button
              type="button"
              aria-label="Remove selected image"
              disabled={uploading}
              onClick={clearSelection}
              className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white disabled:opacity-50"
            >
              <X size={20} />
            </button>

          </div>

        ) : (

          <button
            type="button"
            disabled={uploading}
            onClick={() =>
              fileInputRef.current?.click()
            }
            className="w-full rounded-2xl border-2 border-dashed border-amber-400/40 bg-[#06152f] p-10 text-center transition hover:border-amber-400"
          >

            <Upload
              size={42}
              className="mx-auto text-amber-400"
            />

            <p className="mt-4 font-semibold text-amber-300">
              Choose Product Photograph
            </p>

            <p className="mt-2 text-sm text-slate-400">
              JPG, PNG, WEBP — Maximum 5 MB
            </p>

          </button>

        )}

        {selectedFile && (

          <p className="mt-3 text-center text-xs text-slate-400">
            {selectedFile.name}
            {' — '}
            {(selectedFile.size / 1024 / 1024)
              .toFixed(2)} MB
          </p>

        )}

        <div className="mt-6 grid gap-5 md:grid-cols-2">

          <div>

            <label
              htmlFor="fashion-image-view"
              className="mb-2 block text-sm text-amber-300"
            >
              Model Appearance
            </label>

            <select
              id="fashion-image-view"
              value={viewType}
              disabled={uploading}
              onChange={event =>
                setViewType(event.target.value)
              }
              className={inputClass}
            >

              {viewTypes.map(view => (

                <option
                  key={view.value}
                  value={view.value}
                >
                  {view.label}
                </option>

              ))}

            </select>

          </div>

          <div>

            <label
              htmlFor="fashion-image-alt"
              className="mb-2 block text-sm text-amber-300"
            >
              Image Description
            </label>

            <input
              id="fashion-image-alt"
              type="text"
              value={altText}
              disabled={uploading}
              onChange={event =>
                setAltText(event.target.value)
              }
              placeholder="Describe the product photograph"
              className={inputClass}
            />

          </div>

        </div>

        <label className="mt-5 flex cursor-pointer items-center gap-3">

          <input
            type="checkbox"
            checked={makeCover}
            disabled={uploading}
            onChange={event =>
              setMakeCover(event.target.checked)
            }
            className="h-5 w-5 accent-amber-400"
          />

          <span className="text-sm text-slate-300">
            Set as main product cover photograph
          </span>

        </label>

        <button
          type="button"
          disabled={!selectedFile || uploading || loading}
          onClick={handleUpload}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-200 to-amber-500 px-6 py-4 font-bold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >

          {uploading ? (

            <>
              <LoaderCircle
                size={20}
                className="animate-spin"
              />
              Uploading Photograph...
            </>

          ) : (

            <>
              <Upload size={20} />
              Upload Photograph
            </>

          )}

        </button>

      </div>

    </section>
  );
}
