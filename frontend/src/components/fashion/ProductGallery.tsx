
import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  X,
  ImageOff,
  RotateCcw,
} from 'lucide-react';

import type {
  FashionProductImage,
} from '../../types/fashion';

interface ProductGalleryProps {
  productName: string;
  coverImage?: string | null;
  images: FashionProductImage[];
}

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  label: string;
}

const viewLabels: Record<string, string> = {
  front: 'Front View',
  back: 'Back View',
  side: 'Side View',
  model: 'Model Appearance',
  detail: 'Close-up Detail',
  lifestyle: 'Lifestyle View',
  other: 'Product View',
};

export default function ProductGallery({
  productName,
  coverImage,
  images,
}: ProductGalleryProps) {

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const [zoom, setZoom] = useState(1);

  const [fullscreen, setFullscreen] =
    useState(false);

  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  // ========================================
  // PREPARE PRODUCT PHOTOGRAPHS
  // ========================================

  const galleryImages = useMemo(() => {

    const result: GalleryImage[] = [];

    const seenUrls = new Set<string>();

    // Display the cover photograph first

    if (coverImage) {

      result.push({
        id: 'cover',
        url: coverImage,
        alt: productName,
        label: 'Cover View',
      });

      seenUrls.add(coverImage);
    }

    // Add remaining product photographs

    const sortedImages = [...images].sort(
      (a, b) =>
        a.display_order - b.display_order
    );

    sortedImages.forEach(image => {

      if (
        !image.image_url ||
        seenUrls.has(image.image_url)
      ) {
        return;
      }

      result.push({
        id: image.id,
        url: image.image_url,
        alt:
          image.alt_text ||
          `${productName} - ${image.view_type}`,
        label:
          viewLabels[image.view_type] ||
          'Product View',
      });

      seenUrls.add(image.image_url);

    });

    return result;

  }, [coverImage, images, productName]);

  const imageCount = galleryImages.length;

  const activeIndex =
    imageCount > 0
      ? Math.min(selectedIndex, imageCount - 1)
      : 0;

  const activeImage =
    galleryImages[activeIndex];

  // ========================================
  // RESET IMAGE ZOOM
  // ========================================

  function resetZoom() {
    setZoom(1);
    setPosition({
      x: 50,
      y: 50,
    });
  }

  // ========================================
  // SELECT PHOTOGRAPH
  // ========================================

  function selectImage(index: number) {
    setSelectedIndex(index);
    resetZoom();
  }

  function previousImage() {

    if (imageCount <= 1) return;

    setSelectedIndex(previous =>
      (previous - 1 + imageCount) %
      imageCount
    );

    resetZoom();
  }

  function nextImage() {

    if (imageCount <= 1) return;

    setSelectedIndex(previous =>
      (previous + 1) % imageCount
    );

    resetZoom();
  }

  // ========================================
  // IMAGE ZOOM CONTROLS
  // ========================================

  function zoomIn() {
    setZoom(previous =>
      Math.min(previous + 0.25, 3)
    );
  }

  function zoomOut() {
    setZoom(previous =>
      Math.max(previous - 0.25, 1)
    );
  }

  // ========================================
  // FULLSCREEN KEYBOARD NAVIGATION
  // ========================================

  useEffect(() => {

    if (!fullscreen) return;

    function handleKeyDown(
      event: KeyboardEvent
    ) {

      if (event.key === 'Escape') {
        setFullscreen(false);
        setZoom(1);
      }

      if (
        event.key === 'ArrowRight' &&
        imageCount > 1
      ) {
        event.preventDefault();

        setSelectedIndex(previous =>
          (previous + 1) % imageCount
        );

        setZoom(1);
        setPosition({ x: 50, y: 50 });
      }

      if (
        event.key === 'ArrowLeft' &&
        imageCount > 1
      ) {
        event.preventDefault();

        setSelectedIndex(previous =>
          (previous - 1 + imageCount) %
          imageCount
        );

        setZoom(1);
        setPosition({ x: 50, y: 50 });
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {

      window.removeEventListener(
        'keydown',
        handleKeyDown
      );

      document.body.style.overflow =
        previousOverflow;

    };

  }, [fullscreen, imageCount]);

  // ========================================
  // NO PHOTOGRAPHS AVAILABLE
  // ========================================

  if (!activeImage) {

    return (
      <div className="flex aspect-[3/4] flex-col items-center justify-center rounded-2xl border border-amber-400/20 bg-[#102747] text-slate-400">

        <ImageOff
          size={55}
          className="text-amber-400"
        />

        <h3 className="mt-5 font-bold text-amber-400">
          Photograph Coming Soon
        </h3>

        <p className="mt-2 text-sm">
          Product photographs are not available yet.
        </p>

      </div>
    );
  }

  const controlClass =
    'flex h-11 w-11 items-center justify-center ' +
    'rounded-xl border border-amber-400/30 ' +
    'bg-[#102747] text-amber-400 ' +
    'hover:bg-amber-400 hover:text-slate-950 ' +
    'disabled:cursor-not-allowed disabled:opacity-40';

  // ========================================
  // GALLERY INTERFACE
  // ========================================

  return (
    <section className="text-white">

      {/* Main photograph */}

      <div className="relative overflow-hidden rounded-2xl border border-amber-400/30 bg-[#102747]">

        <div
          className={`relative aspect-[3/4] overflow-hidden ${
            zoom > 1
              ? 'cursor-crosshair'
              : 'cursor-zoom-in'
          }`}
          onMouseMove={event => {

            if (zoom <= 1) return;

            const bounds =
              event.currentTarget
                .getBoundingClientRect();

            setPosition({
              x:
                ((event.clientX - bounds.left) /
                  bounds.width) * 100,

              y:
                ((event.clientY - bounds.top) /
                  bounds.height) * 100,
            });
          }}
        >

          <img
            key={activeImage.id}
            src={activeImage.url}
            alt={activeImage.alt}
            draggable={false}
            className="h-full w-full select-none object-contain transition-transform duration-200"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin:
                `${position.x}% ${position.y}%`,
            }}
          />

        </div>

        {/* Photograph label */}

        <span className="absolute left-4 top-4 rounded-lg bg-black/70 px-3 py-2 text-xs font-semibold text-white">

          {activeImage.label}

        </span>

        {/* Fullscreen button */}

        <button
          type="button"
          title="View fullscreen"
          aria-label="View fullscreen"
          onClick={() => {
            resetZoom();
            setFullscreen(true);
          }}
          className="absolute right-4 top-4 rounded-xl bg-black/70 p-3 text-amber-400 hover:bg-black"
        >
          <Maximize size={22} />
        </button>

        {/* Previous photograph */}

        {imageCount > 1 && (

          <button
            type="button"
            aria-label="Previous photograph"
            onClick={previousImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white hover:bg-black"
          >
            <ChevronLeft size={24} />
          </button>

        )}

        {/* Next photograph */}

        {imageCount > 1 && (

          <button
            type="button"
            aria-label="Next photograph"
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white hover:bg-black"
          >
            <ChevronRight size={24} />
          </button>

        )}

        {/* Photograph count */}

        <span className="absolute bottom-4 right-4 rounded-full bg-black/70 px-4 py-2 text-xs font-semibold">

          {activeIndex + 1} / {imageCount}

        </span>

      </div>

      {/* Zoom controls */}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">

        <button
          type="button"
          aria-label="Zoom out"
          title="Zoom out"
          disabled={zoom <= 1}
          onClick={zoomOut}
          className={controlClass}
        >
          <ZoomOut size={21} />
        </button>

        <span className="min-w-20 rounded-xl bg-[#102747] px-4 py-3 text-center font-semibold text-amber-400">

          {Math.round(zoom * 100)}%

        </span>

        <button
          type="button"
          aria-label="Zoom in"
          title="Zoom in"
          disabled={zoom >= 3}
          onClick={zoomIn}
          className={controlClass}
        >
          <ZoomIn size={21} />
        </button>

        <button
          type="button"
          aria-label="Reset zoom"
          title="Reset zoom"
          onClick={resetZoom}
          className={controlClass}
        >
          <RotateCcw size={20} />
        </button>

        <button
          type="button"
          aria-label="Open fullscreen gallery"
          title="Fullscreen"
          onClick={() => {
            resetZoom();
            setFullscreen(true);
          }}
          className={controlClass}
        >
          <Maximize size={20} />
        </button>

      </div>

      {/* Photograph thumbnails */}

      {imageCount > 1 && (

        <div className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-5">

          {galleryImages.map((image, index) => (

            <button
              key={image.id}
              type="button"
              aria-label={`View ${image.label}`}
              aria-pressed={activeIndex === index}
              onClick={() => selectImage(index)}
              className="group text-center"
            >

              <div className={
                activeIndex === index
                  ? 'overflow-hidden rounded-xl border-2 border-amber-400 bg-[#102747]'
                  : 'overflow-hidden rounded-xl border-2 border-transparent bg-[#102747] hover:border-amber-400/50'
              }>

                <img
                  src={image.url}
                  alt={image.alt}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform group-hover:scale-105"
                />

              </div>

              <p className={
                activeIndex === index
                  ? 'mt-2 text-xs font-semibold text-amber-400'
                  : 'mt-2 text-xs text-slate-400'
              }>

                {image.label}

              </p>

            </button>

          ))}

        </div>

      )}

      {/* Fullscreen photograph viewer */}

      {fullscreen && (

        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen product gallery"
          className="fixed inset-0 z-[9999] flex flex-col bg-black/95 p-4"
        >

          {/* Fullscreen header */}

          <div className="flex items-center justify-between gap-4">

            <div>

              <h3 className="font-bold text-white md:text-xl">
                {productName}
              </h3>

              <p className="mt-1 text-sm text-slate-400">

                {activeImage.label}
                {' · '}
                {activeIndex + 1} / {imageCount}

              </p>

            </div>

            <button
              type="button"
              autoFocus
              aria-label="Close fullscreen gallery"
              onClick={() => {
                setFullscreen(false);
                resetZoom();
              }}
              className="rounded-xl bg-white/10 p-3 text-white hover:bg-white/20"
            >
              <X size={26} />
            </button>

          </div>

          {/* Fullscreen photograph */}

          <div className="relative mt-4 flex min-h-0 flex-1 items-center justify-center overflow-auto">

            <img
              src={activeImage.url}
              alt={activeImage.alt}
              draggable={false}
              className="max-h-full max-w-full object-contain transition-transform duration-200"
              style={{
                transform: `scale(${zoom})`,
              }}
            />

            {imageCount > 1 && (

              <>

                <button
                  type="button"
                  aria-label="Previous fullscreen photograph"
                  onClick={previousImage}
                  className="fixed left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                >
                  <ChevronLeft size={30} />
                </button>

                <button
                  type="button"
                  aria-label="Next fullscreen photograph"
                  onClick={nextImage}
                  className="fixed right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                >
                  <ChevronRight size={30} />
                </button>

              </>

            )}

          </div>

          {/* Fullscreen zoom controls */}

          <div className="mt-4 flex items-center justify-center gap-3">

            <button
              type="button"
              aria-label="Zoom out fullscreen"
              disabled={zoom <= 1}
              onClick={zoomOut}
              className={controlClass}
            >
              <ZoomOut size={22} />
            </button>

            <span className="min-w-20 text-center font-semibold text-amber-400">

              {Math.round(zoom * 100)}%

            </span>

            <button
              type="button"
              aria-label="Zoom in fullscreen"
              disabled={zoom >= 3}
              onClick={zoomIn}
              className={controlClass}
            >
              <ZoomIn size={22} />
            </button>

            <button
              type="button"
              aria-label="Reset fullscreen zoom"
              onClick={resetZoom}
              className={controlClass}
            >
              <RotateCcw size={20} />
            </button>

          </div>

          <p className="mt-4 text-center text-xs text-slate-400">
            Use arrow keys to browse photographs.
            Press ESC to close.
          </p>

        </div>

      )}

    </section>
  );
}
