import { useRef, useCallback, useEffect, useState } from "react";

const useHorizontalScroll = (scrollDistance = 150) => {
  const scrollRef = useRef(null);
  const targetRef = useRef(null);
  const [boundaries, setBoundaries] = useState({ canScrollLeft: false, canScrollRight: false });

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const update = () => {
      // Fit complete desktop cards to the actual shared container width.
      // Narrower layouts retain their existing CSS-defined card counts.
      if (window.matchMedia("(min-width: 1200px)").matches &&
          container.querySelector(":scope > .product-container")) {
        const gap = parseFloat(getComputedStyle(container).columnGap) || 0;
        const count = Math.max(1, Math.floor((container.clientWidth + gap) / (248 + gap)));
        const width = (container.clientWidth - gap * (count - 1)) / count;
        const value = `${width}px`;
        if (container.style.getPropertyValue("--carousel-card-width") !== value) {
          container.style.setProperty("--carousel-card-width", value);
        }
      } else {
        container.style.removeProperty("--carousel-card-width");
      }
      const canScrollLeft = container.scrollLeft > 1;
      const canScrollRight = container.scrollLeft + container.clientWidth < container.scrollWidth - 1;
      setBoundaries((previous) =>
        previous.canScrollLeft === canScrollLeft && previous.canScrollRight === canScrollRight
          ? previous
          : { canScrollLeft, canScrollRight },
      );
    };
    const resizeObserver = new ResizeObserver(update);
    const resetTarget = () => { targetRef.current = null; };
    const observeSizes = () => {
      resetTarget();
      resizeObserver.disconnect();
      resizeObserver.observe(container);
      Array.from(container.children).forEach((child) => resizeObserver.observe(child));
      update();
    };
    // Products arrive asynchronously and can replace loading/error messages.
    const mutationObserver = new MutationObserver(observeSizes);
    mutationObserver.observe(container, { childList: true });
    container.addEventListener("scroll", update, { passive: true });
    ["scrollend", "pointerdown", "touchstart", "wheel"].forEach((event) =>
      container.addEventListener(event, resetTarget, { passive: true }),
    );
    observeSizes();
    return () => {
      ["scrollend", "pointerdown", "touchstart", "wheel"].forEach((event) =>
        container.removeEventListener(event, resetTarget),
      );
      container.removeEventListener("scroll", update);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const scroll = useCallback(
    (direction) => {
      const container = scrollRef.current;
      if (!container) return;
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

      const cards = Array.from(container.children).filter((child) =>
        child.matches(".category-item, .product-container"),
      );
      if (!cards.length) {
        container.scrollBy({ left: direction === "left" ? -scrollDistance : scrollDistance, behavior });
        return;
      }
      const containerLeft = container.getBoundingClientRect().left + container.clientLeft;
      const positions = cards.map((card) =>
        card.getBoundingClientRect().left - containerLeft + container.scrollLeft,
      );
      const currentPosition = targetRef.current ?? container.scrollLeft;
      const nearest = positions.reduce((best, position, index) =>
        Math.abs(position - currentPosition) < Math.abs(positions[best] - currentPosition) ? index : best,
      0);
      const next = Math.max(0, Math.min(cards.length - 1, nearest + (direction === "left" ? -1 : 1)));
      targetRef.current = positions[next];
      container.scrollTo({ left: positions[next], behavior });
    },
    [scrollDistance],
  );

  return { scrollRef, scroll, ...boundaries };
};

export default useHorizontalScroll;
