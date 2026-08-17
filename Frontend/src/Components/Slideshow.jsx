import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * Slideshow / Hero Carousel
 *
 * Usage:
 *   <Slideshow slides={slides} />
 *
 * Each slide: { image, eyebrow, title, subtitle, ctaText, ctaLink }
 * If no `slides` prop is passed, DEFAULT_SLIDES below is used so the
 * component renders out of the box — swap in your own images/copy.
 */

const DEFAULT_SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "New Arrivals",
    title: "Stories worth staying up for",
    subtitle: "This week's freshest releases, handpicked for your shelf.",
    ctaText: "Shop new arrivals",
    ctaLink: "#new-arrivals",
  },
  {
    image:
      "https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "Limited Time",
    title: "Up to 40% off bestsellers",
    subtitle: "Award-winning titles at prices too good to shelve.",
    ctaText: "View the sale",
    ctaLink: "#sale",
  },
  {
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1600&auto=format&fit=crop",
    eyebrow: "Curated Collection",
    title: "Books for every kind of reader",
    subtitle: "From page-turning thrillers to quiet Sunday reads.",
    ctaText: "Explore collections",
    ctaLink: "#collections",
  },
];

const AUTOPLAY_MS = 5000;

const Slideshow = ({ slides = DEFAULT_SLIDES, autoplay = true }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const timerRef = useRef(null);

  const total = slides.length;

  const goTo = useCallback(
    (index) => {
      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || isPaused || total <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, AUTOPLAY_MS);

    return () => clearInterval(timerRef.current);
  }, [autoplay, isPaused, total]);

  // Keyboard navigation when the slideshow is focused
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  // Touch / swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const SWIPE_THRESHOLD = 50;

    if (deltaX > SWIPE_THRESHOLD) prev();
    else if (deltaX < -SWIPE_THRESHOLD) next();

    touchStartX.current = null;
  };

  if (!slides || total === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-lg mb-10 group outline-none"
      style={{ aspectRatio: "16 / 6" }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured promotions"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={index !== current}
          >
            <img
              src={slide.image}
              alt={slide.title || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* Gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

            {/* Slide content */}
            <div className="absolute inset-0 flex items-center">
              <div className="px-6 sm:px-10 md:px-16 max-w-xl">
                {slide.eyebrow && (
                  <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-300 mb-2">
                    {slide.eyebrow}
                  </span>
                )}
                {slide.title && (
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                    {slide.title}
                  </h2>
                )}
                {slide.subtitle && (
                  <p className="text-sm sm:text-base text-gray-200 mb-4 max-w-md">
                    {slide.subtitle}
                  </p>
                )}
                {slide.ctaText && (
                  <a
                    href={slide.ctaLink || "#"}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium px-5 py-2.5 rounded-full transition-colors"
                  >
                    {slide.ctaText}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === current}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slideshow;