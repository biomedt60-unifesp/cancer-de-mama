import type { ReactNode } from 'react';
import { SectionTitle } from './SectionTitle';

type SectionVariant = 'default' | 'pink';

type SectionProps = {
  title: string;
  children: ReactNode;
  variant?: SectionVariant;
  /** `full` = ocupa a linha inteira do grid pai; `auto` = uma coluna (ex.: par lado a lado) */
  span?: 'full' | 'auto';
  icon?: ReactNode;
  iconLabel?: string;
};

const base =
  'print-avoid-break flex min-w-0 flex-col gap-4 rounded-lg border border-brand-100 px-4 py-4 sm:gap-5 sm:px-6 sm:py-6';

const spanStyles: Record<NonNullable<SectionProps['span']>, string> = {
  full: 'sm:col-span-2',
  auto: '',
};

const variantStyles: Record<SectionVariant, string> = {
  default: 'bg-surface',
  pink: 'bg-brand-10',
};

const titleVariants: Record<SectionVariant, 'primary' | 'secondary'> = {
  default: 'primary',
  pink: 'secondary',
};

export function Section({
  children,
  title,
  variant = 'default',
  span = 'full',
  icon,
  iconLabel,
}: SectionProps) {
  return (
    <section className={`${base} ${variantStyles[variant]} ${spanStyles[span]}`}>
      <SectionTitle variant={titleVariants[variant]} icon={icon} iconLabel={iconLabel}>
        {title}
      </SectionTitle>
      <div className="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-6">
        {children}
      </div>
    </section>
  );
}
