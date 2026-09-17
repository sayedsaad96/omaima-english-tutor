'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'li';
  /** Stagger delay in milliseconds. */
  delay?: number;
  variant?: 'up' | 'scale' | 'fade';
}

/** Scroll-reveal without an animation library. Renders visible content immediately when reduced motion is preferred. */
export function Reveal({ children, className = '', as = 'div', delay = 0, variant = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as 'div';
  const variantClass = variant === 'scale' ? 'reveal-scale' : variant === 'fade' ? 'reveal-fade' : '';
  const style = delay > 0 ? ({ transitionDelay: `${delay}ms` } as CSSProperties) : undefined;

  return (
    <Tag ref={ref} style={style} className={`reveal ${variantClass} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
