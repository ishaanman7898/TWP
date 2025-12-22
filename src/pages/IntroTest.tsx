import { useEffect, useRef, useState } from 'react';

export default function IntroTest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js';
    script.async = true;
    script.onload = () => setGsapLoaded(true);
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!gsapLoaded || !containerRef.current) return;
    // @ts-expect-error - GSAP loaded from CDN
    const gsap = window.gsap;
    if (!gsap) return;

    const container = containerRef.current;
    const loadingLetters = container.querySelectorAll('.thrive__letter');
    const headingStart = container.querySelector('.thrive__h1-start');
    const headingEnd = container.querySelector('.thrive__h1-end');
    const punchout = container.querySelector('.thrive-punchout');
    const coverImageExtra = container.querySelectorAll('.thrive__cover-image-extra');
    const overlay = container.querySelector('.thrive-overlay');

    const tl = gsap.timeline({
      defaults: { ease: 'expo.inOut' },
      onComplete: () => setAnimationComplete(true)
    });

    // 1. Letters slide up
    tl.from(loadingLetters, { yPercent: 100, stagger: 0.025, duration: 1.25 });

    // 2. Punchout expands width and height
    tl.fromTo(punchout, { width: 0, height: 0 }, { width: '12vw', height: '10vw', duration: 1.25 }, '+=0.2');

    // 3. Letters spread
    tl.fromTo(headingStart, { x: '0em' }, { x: '-0.05em', duration: 1.25 }, '<');
    tl.fromTo(headingEnd, { x: '0em' }, { x: '0.05em', duration: 1.25 }, '<');

    // 4. Fade images to reveal the site behind
    tl.to(coverImageExtra[0], { opacity: 0, duration: 0.4 }, '+=0.3');
    tl.to(coverImageExtra[1], { opacity: 0, duration: 0.4 }, '+=0.3');

    // 5. Expand punchout to fullscreen
    tl.to(punchout, { width: '100vw', height: '100vh', duration: 2 }, '+=0.3');

    // 6. Fade letters
    tl.to(loadingLetters, { opacity: 0, duration: 1 }, '<0.3');

    // 7. Fade overlay
    tl.to(overlay, { opacity: 0, duration: 0.8 }, '-=0.6');
  }, [gsapLoaded]);

  return (
    <div className="min-h-screen bg-black relative font-sans overflow-hidden">
      {/* THE ACTUAL SITE - COMPLETELY STATIONARY */}
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-white text-6xl font-bold mb-4">Your Site Content</h1>
          <p className="text-white/60 text-xl">Stationary background</p>
          <video className="mt-8 w-full max-w-2xl mx-auto rounded-lg" autoPlay muted loop playsInline>
            <source src="https://quygevwkhlggdifdqqto.supabase.co/storage/v1/object/public/WebsiteLink/HeroVideo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* INTRO OVERLAY */}
      <section 
        ref={containerRef} 
        className={`fixed inset-0 z-[9999] ${animationComplete ? 'pointer-events-none opacity-0' : ''}`}
      >
        {/* Grey overlay - solid background */}
        <div className="thrive-overlay absolute inset-0 bg-neutral-500" />

        {/* PUNCHOUT - this is the hole that shows the site, with images on top */}
        <div 
          className="thrive-punchout absolute z-20"
          style={{ 
            width: 0, 
            height: 0,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'hidden',
            backgroundColor: 'transparent'
          }}
        >
          {/* Images that sit in the punchout */}
          <img 
            className="thrive__cover-image-extra absolute inset-0 w-full h-full" 
            style={{ zIndex: 2, objectFit: 'cover' }} 
            src="/ThriveSocial.png" 
            alt="" 
          />
          <img 
            className="thrive__cover-image-extra absolute inset-0 w-full h-full" 
            style={{ zIndex: 1, objectFit: 'cover' }} 
            src="/ThriveSocial.png" 
            alt="" 
          />
        </div>

        {/* Text on top of everything */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <h1 
            className="thrive__h1 whitespace-nowrap flex justify-center items-center text-white font-sans relative" 
            style={{ fontSize: 'clamp(4rem, 15vw, 12rem)', fontWeight: 700, lineHeight: 1 }}
          >
            <div className="thrive__h1-start flex justify-end" style={{ width: '1.8em', overflow: 'hidden' }}>
              <span className="thrive__letter inline-block">T</span>
              <span className="thrive__letter inline-block">h</span>
              <span className="thrive__letter inline-block">r</span>
            </div>

            {/* Empty space for the punchout */}
            <div style={{ width: '12vw' }} />

            <div className="thrive__h1-end flex justify-start" style={{ width: '1.5em', overflow: 'hidden' }}>
              <span className="thrive__letter inline-block">i</span>
              <span className="thrive__letter inline-block">v</span>
              <span className="thrive__letter inline-block">e</span>
            </div>
          </h1>
        </div>
      </section>

      {animationComplete && (
        <button 
          onClick={() => window.location.reload()} 
          className="fixed bottom-8 right-8 z-[10000] bg-white text-black px-6 py-3 rounded-full font-bold"
        >
          Restart
        </button>
      )}
    </div>
  );
}