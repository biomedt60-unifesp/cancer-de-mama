import type { ReactNode } from 'react';

type TextHighlightProps = {
  children: ReactNode;
};

export default function TextHighlight({ children }: TextHighlightProps) {
  return <strong className="font-bold text-brand-600">{children}</strong>;
}
