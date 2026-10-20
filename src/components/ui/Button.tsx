import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Shared pill CTA primitive. Renders the same visual clusters the bespoke
 * buttons/links used, so adopting it must not change appearance. Call sites
 * that differ structurally from this vocabulary (e.g. `hidden lg:inline-flex`
 * header CTA, nav items, spans) stay bespoke on purpose.
 */
type Variant = 'primary' | 'secondary' | 'secondaryInk' | 'inverse';
type Size = 'sm' | 'md' | 'lg';

/** Static colors per variant (hover/focus live in variantHover). */
const variantColors: Record<Variant, string> = {
  primary: 'bg-[var(--primary)] text-white',
  secondary: 'border-2 border-[var(--border)] bg-[var(--surface)]',
  secondaryInk: 'border-2 border-[var(--ink)] bg-[var(--surface)]',
  inverse: 'bg-white text-[var(--primary)]',
};

const variantHover: Record<
  Variant,
  { hover: string; enabledHover: string; focus: string }
> = {
  primary: {
    hover: 'hover:brightness-110',
    enabledHover: 'enabled:hover:brightness-110',
    focus: 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]',
  },
  secondary: {
    hover: 'hover:border-[var(--primary)] hover:text-[var(--primary-text)]',
    enabledHover:
      'enabled:hover:border-[var(--primary)] enabled:hover:text-[var(--primary-text)]',
    focus: 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]',
  },
  secondaryInk: {
    hover: 'hover:border-[var(--primary)] hover:text-[var(--primary-text)]',
    enabledHover:
      'enabled:hover:border-[var(--primary)] enabled:hover:text-[var(--primary-text)]',
    focus: 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]',
  },
  inverse: {
    hover: 'hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]',
    enabledHover: 'enabled:hover:-translate-y-0.5 enabled:hover:shadow-[var(--shadow-lift)]',
    focus: 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
  },
};

const sizes: Record<Size, string> = {
  sm: 'min-h-[44px] px-5 py-2.5 text-sm font-semibold',
  md: 'min-h-[52px] px-7 py-3 text-base font-bold',
  lg: 'min-h-[56px] px-8 py-4 text-lg font-bold',
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  /** Shine sweep decoration (CSS class). */
  shine?: boolean;
  /** Scale micro-interaction on click. */
  press?: boolean;
  /** Soft drop shadow (primary CTAs on hero/teaser surfaces). */
  softShadow?: boolean;
  /**
   * For buttons that can be disabled: hover states move under `enabled:` and
   * the disabled cursor/opacity join the output. Disables the explicit
   * focus-visible ring, matching the original bespoke disabled-capable buttons.
   */
  allowsDisabled?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

export function Button({
  variant = 'primary',
  size = 'md',
  shine = false,
  press = false,
  softShadow = false,
  allowsDisabled = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const hover = allowsDisabled
    ? `${variantHover[variant].enabledHover} disabled:cursor-not-allowed disabled:opacity-40`
    : `${variantHover[variant].hover} ${variantHover[variant].focus}`;
  const classes = `inline-flex items-center justify-center gap-2 rounded-full transition ${variantColors[variant]} ${hover} ${
    shine ? 'btn-shine ' : ''
  }${press ? 'btn-press ' : ''}${softShadow ? 'shadow-[var(--shadow-soft)] ' : ''}${
    sizes[size]
  } ${className}`.trim();

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
