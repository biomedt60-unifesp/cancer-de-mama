import type { ReactNode } from 'react';

type BadgeSize = 'sm' | 'md';

type BadgeProps = {
  children: ReactNode;
  size?: BadgeSize;
  'aria-label'?: string;
};

const base =
  'inline-flex shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600';

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'size-10 [&_svg]:size-5',
  md: 'size-12 [&_svg]:size-6',
};

export function Badge({ children, size = 'md', 'aria-label': ariaLabel }: BadgeProps) {
  return (
    <span
      className={`${base} ${sizeStyles[size]}`}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      {children}
    </span>
  );
}
