import type { ReactNode } from 'react';

type TypographyVariant = 'primary' | 'secondary' | 'accent' | 'muted' | 'emphasis';

type TypographyProps = {
  children: ReactNode;
  variant?: TypographyVariant;
  className?: string;
  as?: 'p' | 'div';
};

const base = 'm-0 leading-relaxed';

const variantStyles: Record<TypographyVariant, string> = {
  primary: 'text-[0.98rem] font-semibold text-neutral-700 max-sm:text-[0.92rem]',
  secondary: 'text-[0.9rem] text-brand-600 italic max-sm:text-[0.85rem]',
  accent: 'text-[0.95rem] text-brand-600 max-sm:text-[0.9rem]',
  muted: 'text-[0.9rem] font-semibold text-neutral-700 max-sm:text-[0.85rem]',
  emphasis: 'text-[0.95rem] font-extrabold text-brand-600 max-sm:text-[0.9rem]',
};

export function Typography({
  children,
  variant = 'primary',
  className = '',
  as: Component = 'p',
}: TypographyProps) {
  return (
    <Component className={`${base} ${variantStyles[variant]} ${className}`}>{children}</Component>
  );
}
