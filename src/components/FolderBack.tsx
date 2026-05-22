import type { ReactNode } from 'react';
import { LuBookOpen, LuInstagram } from 'react-icons/lu';
import { Typography } from './Typography';

const base = import.meta.env.BASE_URL;

function FooterIcon({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white [&_svg]:size-5"
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

function FooterBlock({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <FooterIcon>{icon}</FooterIcon>
      <div className="flex min-w-0 flex-col gap-1">
        {label}
        {children}
      </div>
    </div>
  );
}

function FooterLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-[0.8rem] font-extrabold leading-snug text-brand-600 sm:text-[0.85rem]">
      {children}
    </span>
  );
}

export default function FolderBack() {
  return (
    <footer className="print-avoid-break mt-2 rounded-t-2xl bg-brand-10 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
        <div className="min-w-0 flex-1">
          <FooterBlock icon={<LuBookOpen />} label={<FooterLabel>Referência:</FooterLabel>}>
            <Typography variant="muted" className="text-[0.85rem] font-normal leading-snug">
              INCA. Câncer de mama: vamos falar sobre isso? 8ª ed., 2023.
            </Typography>
            <Typography variant="muted" className="text-[0.85rem] font-normal leading-snug">
              Para mais informações acesse{' '}
              <a
                href="https://www.inca.gov.br/"
                className="font-semibold text-brand-600 no-underline hover:underline"
              >
                www.inca.gov.br
              </a>
            </Typography>
          </FooterBlock>
        </div>

        <div
          className="hidden w-px shrink-0 self-stretch bg-brand-100 sm:block"
          aria-hidden="true"
        />

        <div className="flex w-full max-w-full shrink-0 items-center justify-between gap-3 md:w-fit md:justify-start">
          <FooterBlock icon={<LuInstagram />} label={<FooterLabel>Instagram:</FooterLabel>}>
            <Typography variant="muted" className="text-[0.85rem] font-normal leading-snug">
              @biomedt60
            </Typography>
          </FooterBlock>
          <img
            src={`${base}assets/unifesp-logo.png`}
            alt="UNIFESP"
            width={120}
            height={52}
            loading="lazy"
            decoding="async"
            className="block h-9 w-20 shrink-0 object-contain sm:h-10 sm:w-24"
          />
        </div>
      </div>

      <div className="mt-5 border-t border-brand-100 pt-5 text-center sm:mt-4 sm:pt-4">
        <p className="m-0 text-[0.85rem] leading-snug font-bold text-neutral-700">
          Material educativo.
          <br />
          Não substitui consulta médica.
        </p>
      </div>
    </footer>
  );
}
