import { useMemo, useEffect } from "react";
import "../osmo-crisp.css";
import { products } from "@/data/products";

const OSMO_ELECTROLYTE_IDS = ["su-el-1", "su-el-2", "su-el-3", "su-el-4", "su-el-5"];

export default function OsmoElectrolytes() {
  const slides = useMemo(
    () =>
      products
        .filter(
          (p) =>
            p.groupName === "Surge IV" &&
            OSMO_ELECTROLYTE_IDS.includes(p.id)
        )
        .slice(0, 5),
    []
  );

  useEffect(() => {
    const gsapSrc = "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js";
    const splitTextSrc = "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js";
    const customEaseSrc = "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js";

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(script);
      });

    function initCrispLoadingAnimation() {
      const container = document.querySelector<HTMLElement>(".crisp-header");
      if (!container) return;

      const heading = container.querySelectorAll(".crisp-header__h1");
      const revealImages = container.querySelectorAll(".crisp-loader__group > *");
      const isScaleUp = container.querySelectorAll(".crisp-loader__media");
      const isScaleDown = container.querySelectorAll(
        ".crisp-loader__media .is--scale-down"
      );
      const isRadius = container.querySelectorAll(
        ".crisp-loader__media.is--scaling.is--radius"
      );
      const smallElements = container.querySelectorAll(
        ".crisp-header__top, .crisp-header__p"
      );
      const sliderNav = container.querySelectorAll(
        ".crisp-header__slider-nav > *"
      );

      const { gsap, SplitText, CustomEase } = (window as any);
      if (!gsap || !CustomEase) return;

      if (CustomEase && CustomEase.create) {
        CustomEase.create("slideshow-wipe", "0.625, 0.05, 0, 1");
      }

      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onStart: () => {
          container.classList.remove("is--hidden");
        },
      });

      let split: any | undefined;
      if (heading.length && SplitText) {
        split = new SplitText(heading, {
          type: "words",
          mask: "words",
        });

        gsap.set(split.words, {
          yPercent: 110,
        });
      }

      if (revealImages.length) {
        tl.fromTo(
          revealImages,
          { xPercent: 500 },
          { xPercent: -500, duration: 2.5, stagger: 0.05 }
        );
      }

      if (isScaleDown.length) {
        tl.to(
          isScaleDown,
          {
            scale: 0.5,
            duration: 2,
            stagger: { each: 0.05, from: "edges", ease: "none" },
            onComplete: () => {
              if (isRadius) {
                isRadius.forEach((el) =>
                  el.classList.remove("is--radius")
                );
              }
            },
          },
          "-=0.1"
        );
      }

      if (isScaleUp.length) {
        tl.fromTo(
          isScaleUp,
          { width: "10em", height: "10em" },
          { width: "100vw", height: "100dvh", duration: 2 },
          "< 0.5"
        );
      }

      if (sliderNav.length) {
        tl.from(
          sliderNav,
          {
            yPercent: 150,
            stagger: 0.05,
            ease: "expo.out",
            duration: 1,
          },
          "-=0.9"
        );
      }

      if (split && split.words.length) {
        tl.to(
          split.words,
          {
            yPercent: 0,
            stagger: 0.075,
            ease: "expo.out",
            duration: 1,
          },
          "< 0.1"
        );
      }

      if (smallElements.length) {
        tl.from(
          smallElements,
          {
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.2,
          },
          "< 0.15"
        );
      }

      tl.call(() => {
        container.classList.remove("is--loading");
      }, null, "+=0.45");
    }

    function initSlideShow() {
      const wraps = document.querySelectorAll<HTMLElement>(
        '[data-slideshow="wrap"]'
      );
      const { gsap } = (window as any);
      if (!gsap) return;

      wraps.forEach((el) => {
        const slides = Array.from(
          el.querySelectorAll<HTMLElement>('[data-slideshow="slide"]')
        );
        const inner = Array.from(
          el.querySelectorAll<HTMLElement>('[data-slideshow="parallax"]')
        );
        const thumbs = Array.from(
          el.querySelectorAll<HTMLElement>('[data-slideshow="thumb"]')
        );

        let current = 0;
        const length = slides.length;
        let animating = false;
        const animationDuration = 1.5;

        slides.forEach((slide, index) =>
          slide.setAttribute("data-index", String(index))
        );
        thumbs.forEach((thumb, index) =>
          thumb.setAttribute("data-index", String(index))
        );

        function navigate(direction: number, targetIndex: number | null = null) {
          if (animating) return;
          animating = true;

          const previous = current;
          current =
            targetIndex !== null && targetIndex !== undefined
              ? targetIndex
              : direction === 1
              ? current < length - 1
                ? current + 1
                : 0
              : current > 0
              ? current - 1
              : length - 1;

          const currentSlide = slides[previous];
          const currentInner = inner[previous];
          const upcomingSlide = slides[current];
          const upcomingInner = inner[current];

          gsap
            .timeline({
              defaults: { duration: animationDuration, ease: "slideshow-wipe" },
              onStart() {
                upcomingSlide.classList.add("is--current");
                thumbs[previous].classList.remove("is--current");
                thumbs[current].classList.add("is--current");
              },
              onComplete() {
                currentSlide.classList.remove("is--current");
                animating = false;
              },
            })
            .to(currentSlide, { xPercent: -direction * 100 }, 0)
            .to(currentInner, { xPercent: direction * 75 }, 0)
            .fromTo(
              upcomingSlide,
              { xPercent: direction * 100 },
              { xPercent: 0 },
              0
            )
            .fromTo(
              upcomingInner,
              { xPercent: -direction * 75 },
              { xPercent: 0 },
              0
            );
        }

        thumbs.forEach((thumb) => {
          thumb.addEventListener("click", (event) => {
            const targetIndex = parseInt(
              (event.currentTarget as HTMLElement).getAttribute(
                "data-index"
              ) || "0",
              10
            );
            if (targetIndex === current || animating) return;
            const direction = targetIndex > current ? 1 : -1;
            navigate(direction, targetIndex);
          });
        });
      });
    }

    (async () => {
      try {
        await Promise.all([
          loadScript(gsapSrc),
          loadScript(splitTextSrc),
          loadScript(customEaseSrc),
        ]);
        if ((document as any).fonts?.ready) {
          await (document as any).fonts.ready;
        }
        initCrispLoadingAnimation();
        initSlideShow();
      } catch {
        // If GSAP fails to load, we just skip the intro animation
      }
    })();
  }, []);

  if (!slides.length) {
    return null;
  }

  const mainSlides = slides;

  return (
    <div className="osmo-page-root">
      <main>
        <section
          data-slideshow="wrap"
          className="crisp-header is--loading is--hidden"
        >
          <div className="crisp-header__slider">
            <div className="crisp-header__slider-list">
              {mainSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  data-slideshow="slide"
                  className={
                    "crisp-header__slider-slide" +
                    (index === 0 ? " is--current" : "")
                  }
                >
                  <img
                    className="crisp-header__slider-slide-inner"
                    src={slide.image?.replace(/^public\//, "/")}
                    alt={slide.name}
                    data-slideshow="parallax"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Simple loader using the same layout, reusing electrolyte images */}
          <div className="crisp-loader">
            <div className="crisp-loader__wrap">
              <div className="crisp-loader__groups">
                <div className="crisp-loader__group is--duplicate">
                  {mainSlides.map((slide) => (
                    <div key={`dup-${slide.id}`} className="crisp-loader__single">
                      <div className="crisp-loader__media">
                        <img
                          loading="eager"
                          src={slide.image?.replace(/^public\//, "/")}
                          alt={slide.name}
                          className="crisp-loader__cover-img"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="crisp-loader__group is--relative">
                  {mainSlides.map((slide, idx) => (
                    <div key={`rel-${slide.id}`} className="crisp-loader__single">
                      <div
                        className={
                          "crisp-loader__media" +
                          (idx === 2 ? " is--scaling is--radius" : "")
                        }
                      >
                        <img
                          loading="eager"
                          src={slide.image?.replace(/^public\//, "/")}
                          alt={slide.name}
                          className={
                            "crisp-loader__cover-img" +
                            (idx !== 2 ? " is--scale-down" : "")
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="crisp-loader__fade" />
              <div className="crisp-loader__fade is--duplicate" />
            </div>
          </div>

          <div className="crisp-header__content">
            <div className="crisp-header__top">
              <a
                href="https://www.osmo.supply?utm_source=codepen&utm_medium=pen&utm_campaign=crisp-loading-animation"
                target="_blank"
                rel="noreferrer"
                className="osmo-logo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 110 25"
                  fill="none"
                  className="osmo-logo__svg"
                >
                  <path
                    d="M38.6535 24.1686C42.7849 24.1686 46.4296 22.0917 48.6049 18.9263C49.8544 22.1497 53.0867 24.1686 57.3663 24.1686C60.4495 24.1686 63.0501 23.1833 64.721 21.5632L64.4802 23.6683H69.7007L70.9503 12.7679L73.8514 23.6683H79.0769L81.978 12.7679L83.2268 23.6683H88.4473L87.8882 18.7885C90.0514 22.0313 93.7421 24.1686 97.933 24.1686C104.597 24.1686 110 18.766 110 12.1016C110 5.43732 104.596 0.0346429 97.9314 0.0346429C92.7608 0.0346429 88.3515 3.28785 86.6338 7.85749L85.7903 0.499502H80.0211L76.4625 13.8708L72.904 0.499502H67.1348L66.3243 7.56906C66.226 5.51224 65.3817 3.64878 63.9251 2.29932C62.3017 0.795175 60.0338 0 57.3655 0C54.8656 0 52.7113 0.712193 51.1354 2.06004C49.9737 3.05421 49.2131 4.33761 48.9191 5.76119C46.793 2.32429 42.9919 0.0346429 38.6535 0.0346429C31.9892 0.0346429 26.5865 5.43732 26.5865 12.1016C26.5865 18.766 31.9892 24.1686 38.6535 24.1686ZM97.9314 5.46471C101.597 5.46471 104.568 8.43594 104.568 12.1016C104.568 15.7673 101.597 18.7386 97.9314 18.7386C94.2657 18.7386 91.2945 15.7673 91.2945 12.1016C91.2945 8.43594 94.2657 5.46471 97.9314 5.46471ZM57.3663 5.05786C59.6318 5.05786 61.0223 6.10681 61.0852 7.86393L61.1045 8.39808H66.23L65.7015 13.0128C65.4389 12.5899 65.1271 12.1991 64.7637 11.8438C63.5682 10.6773 61.8151 9.88289 59.552 9.48328L56.501 8.93706C54.4797 8.5729 54.0656 7.94127 54.0656 7.10501C54.0656 6.89554 54.1582 5.05705 57.3663 5.05705V5.05786ZM55.1757 14.0094L58.7705 14.6837C61.0916 15.1293 61.4042 16.0711 61.4042 16.9339C61.4042 18.2963 59.8565 19.1422 57.3647 19.1422C54.4055 19.1422 53.2873 17.4729 53.2285 16.0437L53.2067 15.5128H50.2275C50.5457 14.4308 50.7197 13.2868 50.7197 12.1016C50.7197 12.0452 50.7165 11.9889 50.7157 11.9325C51.7872 12.95 53.2833 13.6598 55.1749 14.0094H55.1757ZM38.6535 5.46471C42.3192 5.46471 45.2904 8.43594 45.2904 12.1016C45.2904 15.7673 42.3192 18.7386 38.6535 18.7386C34.9878 18.7386 32.0166 15.7673 32.0166 12.1016C32.0166 8.43594 34.9878 5.46471 38.6535 5.46471Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16.3506 9.9554L21.6985 4.6075L19.5619 2.47092L14.214 7.81882C13.986 8.04762 13.5953 7.88569 13.5953 7.56262V0H10.5741V9.12397C10.5741 9.92478 9.92476 10.5741 9.12395 10.5741H0V13.5953H7.56261C7.88567 13.5953 8.04761 13.9861 7.8188 14.2141L2.47172 19.5619L4.6083 21.6985L9.95618 16.3506C10.1842 16.1226 10.5749 16.2838 10.5749 16.6068V24.1694H13.5961V15.0455C13.5961 14.2447 14.2454 13.5953 15.0463 13.5953H24.1702V10.5741H16.6076C16.2845 10.5741 16.1226 10.1834 16.3514 9.9554H16.3506Z"
                    fill="currentColor"
                    fillOpacity="0.75"
                  />
                </svg>
              </a>
              <div className="crisp-header__hamburger">
                <div className="crisp-header__hamburger-bar" />
                <div className="crisp-header__hamburger-bar" />
                <div className="crisp-header__hamburger-bar" />
              </div>
            </div>
            <div className="crisp-header__center">
              <h1 className="crisp-header__h1">We just love pixels</h1>
            </div>
            <div className="crisp-header__bottom">
              <div className="crisp-header__slider-nav">
                {mainSlides.map((slide, index) => (
                  <div
                    key={`thumb-${slide.id}`}
                    data-slideshow="thumb"
                    className={
                      "crisp-header__slider-nav-btn" +
                      (index === 0 ? " is--current" : "")
                    }
                  >
                    <img
                      loading="eager"
                      src={slide.image?.replace(/^public\//, "/")}
                      alt={slide.name}
                      className="crisp-loader__cover-img"
                    />
                  </div>
                ))}
              </div>
              <p className="crisp-header__p">
                Crisp Loading Animation by{" "}
                <a
                  href="https://www.osmo.supply?utm_source=codepen&utm_medium=pen&utm_campaign=crisp-loading-animation"
                  target="_blank"
                  rel="noreferrer"
                >
                  Osmo
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
