import { CSSProperties, useMemo } from "react";

interface WaveMarqueeProps {
  speedSeconds?: number; // scroll speed in seconds
  amplitudePx?: number; // wave height in px
  tightnessSeconds?: number; // negative number; tighter wave if more negative
  repeats?: number; // how many times to duplicate the sequence
  className?: string;
}

const TEXT_SEQUENCE = [
  "SUSTAINABLE",
  "SIMPLE",
  "ELEGANT",
  "BEAUTIFUL",
  "INNOVATIVE",
];

export function WaveMarquee({
  speedSeconds = 21,
  amplitudePx = 22,
  tightnessSeconds = -0.06,
  repeats = 2,
  className = "",
}: WaveMarqueeProps) {
  const styleVars = useMemo(() => ({
    "--scroll-speed": `${speedSeconds}s`,
    "--amplitude": `${amplitudePx}px`,
    "--tightness": `${tightnessSeconds}s`,
  }) as CSSProperties, [speedSeconds, amplitudePx, tightnessSeconds]);

  let charIndex = 0;
  const blocks = [] as JSX.Element[];
  for (let r = 0; r < repeats; r++) {
    TEXT_SEQUENCE.forEach((word) => {
      // letters
      for (let i = 0; i < word.length; i++) {
        blocks.push(
          <span key={`${r}-${word}-${i}-${charIndex}`} className="wave-char font-display text-white text-2xl md:text-3xl font-extrabold" style={{ ["--i" as any]: charIndex } as CSSProperties}>
            {word[i]}
          </span>
        );
        charIndex++;
      }
      // space, divider, space
      blocks.push(
        <span key={`${r}-${word}-space-a-${charIndex}`} className="wave-space" style={{ ["--i" as any]: charIndex } as CSSProperties}>&nbsp;</span>
      );
      charIndex++;
      blocks.push(
        <span key={`${r}-${word}-divider-${charIndex}`} className="wave-char divider text-glacier/70 text-2xl md:text-3xl font-extrabold" style={{ ["--i" as any]: charIndex } as CSSProperties}>〰</span>
      );
      charIndex++;
      blocks.push(
        <span key={`${r}-${word}-space-b-${charIndex}`} className="wave-space" style={{ ["--i" as any]: charIndex } as CSSProperties}>&nbsp;</span>
      );
      charIndex++;
    });
  }

  return (
    <div className={`wave-container ${className}`} style={styleVars}>
      {/* Scoped CSS for the wave marquee */}
      <style>{`
        .wave-container{position:relative;width:100%;overflow:hidden}
        .wave-track{display:inline-flex;white-space:nowrap;will-change:transform;animation:wave-scroll-right var(--scroll-speed) linear infinite}
        .wave-char{display:inline-block;animation:wave-float 1.5s ease-in-out infinite alternate;animation-delay:calc(var(--i) * var(--tightness))}
        .wave-space{display:inline-block;width:1rem;animation:wave-float 1.5s ease-in-out infinite alternate;animation-delay:calc(var(--i) * var(--tightness))}
        @keyframes wave-scroll-right{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
        @keyframes wave-float{0%{transform:translateY(var(--amplitude))}100%{transform:translateY(calc(var(--amplitude) * -1))}}
      `}</style>
      <div className="wave-track">{blocks}</div>
    </div>
  );
}

export default WaveMarquee;
