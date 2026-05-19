import type { ReactNode } from 'react';
import { Badge } from './Badge';

type SectionTitleVariant = 'primary' | 'secondary';

type SectionTitleProps = {
  children: ReactNode;
  variant?: SectionTitleVariant;
  icon?: ReactNode;
  iconLabel?: string;
};

const hrBase = 'm-0 h-1 w-10 shrink-0 border-0 rounded-full';

const hrVariantStyles: Record<SectionTitleVariant, string> = {
  primary: 'bg-brand-600',
  secondary: 'bg-brand-100',
};

export function SectionTitle({
  children,
  variant = 'primary',
  icon,
  iconLabel,
}: SectionTitleProps) {
  const titleBlock = (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <h2 className="m-0 text-[0.92rem] font-extrabold tracking-wide text-brand-600 uppercase sm:text-[1.05rem]">
        {children}
      </h2>
      <hr className={`${hrBase} ${hrVariantStyles[variant]}`} />
    </div>
  );

  if (!icon) {
    return titleBlock;
  }

  return (
    <div className="flex items-center gap-3">
      <Badge aria-label={iconLabel}>{icon}</Badge>
      {titleBlock}
    </div>
  );
}
