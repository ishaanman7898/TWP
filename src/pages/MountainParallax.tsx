import { useEffect, useRef } from "react";
import "../mountain-parallax.css";

export default function MountainParallax() {
  const fgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = fgRef.current;
      if (!el) return;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      // Move foreground at slower speed than scroll for a clear parallax effect
      const offset = scrollY * -0.3; // adjust strength: more negative = stronger upward drift
      el.style.setProperty("--mountain-parallax-y", `${offset}px`);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="mountain-page-root">
      <main className="mountain-main">
        <section className="mountain-hero">
          <div className="mountain-bg" aria-hidden="true" />
          <div className="mountain-overlay" aria-hidden="true" />

          <div className="mountain-heading">
            <h1>Glacier Heights</h1>
            <p>
              A simple parallax experiment: the distant ridge stays anchored while the
              foreground rises and falls as you scroll.
            </p>
          </div>

          <div ref={fgRef} className="mountain-fg-wrap">
            <img
              src="/mountain2.png"
              alt="Foreground cutout of Glacier mountain"
              className="mountain-fg-image"
            />
          </div>
        </section>

        <section className="mountain-content">
          <h2>Scroll to explore</h2>
          <p>
            Keep scrolling to feel the separation between the background ridge
            (rendered from <code>mountain1.jpg</code>) and the foreground cutout
            (<code>mountain2.png</code>). The hero section stays pinned while the
            content moves, and the foreground image subtly shifts at a different
            speed for a parallax effect.
          </p>
          <div className="mountain-spacer" />
        </section>
      </main>
    </div>
  );
}
