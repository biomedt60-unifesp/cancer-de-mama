import { LuPhone } from 'react-icons/lu';
import { Typography } from './Typography';

export function DisqueSaudeCallout() {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-lg bg-brand-10 px-4 py-3">
      <div
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white [&_svg]:size-6"
        aria-hidden="true"
      >
        <LuPhone />
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <Typography variant="emphasis">Também é possível ligar 136</Typography>
        <Typography variant="muted" className="font-normal">
          Disque Saúde
        </Typography>
      </div>
    </div>
  );
}
