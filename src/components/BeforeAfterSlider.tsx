import React, { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  description?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage = '/brand/radiant-result.jpg',
  afterImage = '/brand/package-hydrafacial-glow.jfif',
  beforeLabel = 'Before Treatment',
  afterLabel = 'After 3 Sessions (Glow Peel)',
  title = 'Clinical Skin Transformation',
  description = 'Sample results after personalized multi-session protocol for texture refinement and epidermal luminosity.',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-4/3 sm:aspect-16/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-[#C5A059]/25 select-none cursor-ew-resize group"
      >
        {/* "After" Image (Underneath, full container) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={afterImage}
            alt="Skin Nurture After Treatment Result"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/brand/radiant-result.jpg';
            }}
          />
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-[#FAF7F2] text-[11px] font-medium tracking-wider uppercase px-3 py-1 rounded-full border border-white/20">
            {afterLabel}
          </div>
        </div>

        {/* "Before" Image (Clipped by slider position) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div
            className="absolute inset-0 h-full"
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
          >
            <img
              src={beforeImage}
              alt="Skin Nurture Before Treatment Result"
              className="w-full h-full object-cover filter brightness-95"
              onError={(e) => {
                e.currentTarget.src = '/brand/dr-hina-faisal.jfif';
              }}
            />
          </div>
          <div className="absolute bottom-4 left-4 bg-[#0C3B2E]/80 backdrop-blur-md text-[#FAF7F2] text-[11px] font-medium tracking-wider uppercase px-3 py-1 rounded-full border border-[#C5A059]/30">
            {beforeLabel}
          </div>
        </div>

        {/* Divider Line & Circular Gold Handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C5A059] via-white to-[#C5A059] shadow-lg pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-gradient-to-r from-[#C5A059] to-[#E5C378] text-[#0C3B2E] border-2 border-white shadow-xl flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M8 7l-5 5 5 5V7zm8 10l5-5-5-5v10z" />
            </svg>
          </div>
        </div>

        {/* Watermark / Sample label */}
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md text-[#0F4C3A] text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md border border-[#C5A059]/20">
          Sample Clinical Result
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
        <p className="italic">{description}</p>
        <span className="shrink-0 text-[11px] font-medium text-[#C5A059] hidden sm:inline">
          Drag slider to compare
        </span>
      </div>
    </div>
  );
};
