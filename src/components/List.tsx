import type { ReactNode } from 'react';
import { Badge } from './Badge';

type ListProps = {
  children: ReactNode;
};

type ListItemProps = {
  children: ReactNode;
  icon?: ReactNode;
  iconLabel?: string;
};

const listBase = 'm-0 flex list-none flex-col gap-2 p-0';

const itemBase =
  'flex text-[0.92rem] leading-relaxed font-semibold text-neutral-700 sm:text-[0.98rem]';

const dotMarkerClass =
  'mt-[0.55em] size-[5px] shrink-0 rounded-full bg-brand-600 sm:size-1.5';

export function List({ children }: ListProps) {
  return <ul className={listBase}>{children}</ul>;
}

export function ListItem({ children, icon, iconLabel }: ListItemProps) {
  return (
    <li className={`${itemBase} ${icon ? 'items-center gap-3' : 'gap-2'}`}>
      {icon ? (
        <Badge size="sm" aria-label={iconLabel}>
          {icon}
        </Badge>
      ) : (
        <span className={dotMarkerClass} aria-hidden="true" />
      )}
      <span className="min-w-0 flex-1">{children}</span>
    </li>
  );
}
