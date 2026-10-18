'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface MobileScrollIndicatorProps {
  targetId: string;
  label?: string;
}

export function MobileScrollIndicator({ targetId, label = 'Swipe to scroll' }: MobileScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    const target = document.getElementById(targetId);

    if (!target) {
      return undefined;
    }

    hasInteractedRef.current = false;

    const hideIndicator = () => {
      hasInteractedRef.current = true;
      setIsVisible(false);
    };

    const updateVisibility = () => {
      if (hasInteractedRef.current) {
        setIsVisible(false);
        return;
      }

      const canScroll = target.scrollWidth > target.clientWidth + 12;
      const hasScrolled = target.scrollLeft > 8;

      if (hasScrolled) {
        hideIndicator();
        return;
      }

      setIsVisible(canScroll);
    };

    updateVisibility();

    const resizeObserver = new ResizeObserver(updateVisibility);
    resizeObserver.observe(target);

    target.addEventListener('scroll', updateVisibility, { passive: true });
    target.addEventListener('touchstart', hideIndicator, { passive: true });
    target.addEventListener('pointerdown', hideIndicator, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      resizeObserver.disconnect();
      target.removeEventListener('scroll', updateVisibility);
      target.removeEventListener('touchstart', hideIndicator);
      target.removeEventListener('pointerdown', hideIndicator);
      window.removeEventListener('resize', updateVisibility);
    };
  }, [targetId]);

  return (
    <div
      aria-hidden={!isVisible}
      className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-all duration-300 md:hidden ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.9)] backdrop-blur-md">
        <span>{label}</span>
        <ArrowRight className="size-3.5 text-white" aria-hidden="true" />
      </div>
    </div>
  );
}
