import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * FooterPromoSlider
 *
 * A compact, split-layout promo carousel.
 *
 * Usage:
 *   <FooterPromoSlider slides={slides} />
 *
 * Each slide:
 * {
 *   image,
 *   tag,
 *   title,
 *   subtitle,
 *   ctaText,
 *   ctaLink
 * }
 */

const DEFAULT_SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop",
    tag: "Staff Picks",
    title: "This month's favorite reads",
    subtitle:
      "Curated by our team — the books we can't stop talking about.",
    ctaText: "See the picks",
    ctaLink: "#staff-picks",
  },
  {
    image:
      "https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=1200&auto=format&fit=crop",
    tag: "Free Shipping",
    title: "Free delivery on orders over ₹100",
    subtitle:
      "Applied automatically at checkout — no code needed.",
    ctaText: "Start shopping",
    ctaLink: "#products",
  },
  {
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200&auto=format&fit=crop",
    tag: "Newsletter",
    title: "Get new releases in your inbox",
    subtitle:
      "Recommendations and early access to sales, once a week.",
    ctaText: "Subscribe",
    ctaLink: "#newsletter",
  },
];

const AUTOPLAY_MS = 6000;

const FooterPromoSlider = ({
  slides = DEFAULT_SLIDES,
  autoplay = true,
}) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(null);
  const timerRef = useRef(null);

  const total = slides?.length || 0;

  // Go to a specific slide
  const goTo = useCallback(
    (index) => {
      if (total === 0) return;

      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

  // Next slide
  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  // Previous slide
  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || isPaused || total <= 1) {
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoplay, isPaused, total]);

  // Touch start
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // Touch end
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const delta =
      e.changedTouches[0].clientX - touchStartX.current;

    if (delta > 50) {
      prev();
    } else if (delta < -50) {
      next();
    }

    touchStartX.current = null;
  };

  // No slides
  if (!slides || total === 0) {
    return null;
  }

  // Prevent invalid current index if slides change
  const safeCurrent = current >= total ? 0 : current;
  const slide = slides[safeCurrent];

  return (
    <div
      className="relative bg-white border border-[#E7DFD1] rounded-2xl overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Shop promotions"
    >
      {/* Main Content */}
      <div className="flex flex-col sm:flex-row items-stretch min-h-[220px]">
        
        {/* Image Side */}
        <div className="sm:w-2/5 h-40 sm:h-auto relative overflow-hidden">
          <img
            key={safeCurrent}
            src={slide.image}
            alt={slide.title || "Promotion"}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        </div>

        {/* Text Side */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-6">
          
          {/* Tag */}
          {slide.tag && (
            <span className="inline-block w-fit text-[11px] font-semibold tracking-widest uppercase text-[#B8863B] bg-[#F4EBDA] px-3 py-1 rounded-full mb-3">
              {slide.tag}
            </span>
          )}

          {/* Title */}
          {slide.title && (
            <h3 className="text-xl sm:text-2xl font-bold text-[#1E2A38] mb-2 leading-snug">
              {slide.title}
            </h3>
          )}

          {/* Subtitle */}
          {slide.subtitle && (
            <p className="text-sm text-gray-600 mb-4 max-w-md">
              {slide.subtitle}
            </p>
          )}

          {/* CTA */}
          {slide.ctaText && (
            <a
              href={slide.ctaLink || "#"}
              className="inline-flex items-center gap-1.5 w-fit text-sm font-semibold text-[#1E2A38] border-b-2 border-[#B8863B] pb-0.5 hover:gap-2.5 transition-all"
            >
              {slide.ctaText}

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>

        {/* Previous / Next Buttons */}
        {total > 1 && (
          <div className="hidden sm:flex flex-col justify-center gap-2 pr-5">
            
            {/* Previous */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous promo"
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#1E2A38] hover:text-[#1E2A38] transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={next}
              aria-label="Next promo"
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#1E2A38] hover:text-[#1E2A38] transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Progress Dots */}
      {total > 1 && (
        <div className="flex justify-center gap-1.5 pb-4">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to promo ${i + 1}`}
              aria-current={i === safeCurrent}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === safeCurrent
                  ? "w-5 bg-[#1E2A38]"
                  : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FooterPromoSlider;