import type { ReactNode } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { LuMapPin, LuPhone } from 'react-icons/lu';
import { DisqueSaudeCallout } from './DisqueSaudeCallout';
import { Section } from './Section';
import { Typography } from './Typography';

const ubsUnits = [
  {
    id: 'ubs-vila-mariana',
    name: 'UBS Vila Mariana',
    addressLines: ['Rua Doutor Diogo de Faria, 678', 'Vila Clementino, São Paulo — SP'],
    phone: '(11) 5239-4853',
    tel: '+551152394853',
  },
  {
    id: 'ubs-santa-cruz',
    name: 'UBS Santa Cruz',
    addressLines: ['Rua Santa Cruz, 1191', 'Vila Mariana, São Paulo — SP'],
    phone: '(11) 5084-4295',
    tel: '+551150844295',
  },
] as const;

function UnitDetail({
  icon,
  label,
  children,
  className = '',
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex min-w-0 gap-2 ${className}`}>
      <span className="mt-0.5 shrink-0 text-brand-600">{icon}</span>
      <div className="min-w-0">
        <span className="sr-only">{label}</span>
        {children}
      </div>
    </div>
  );
}

export default function HealthSection() {
  return (
    <Section title="Onde buscar ajuda?" icon={<FaQuestion />} iconLabel="Onde buscar ajuda?">
      <div className="flex w-full min-w-0 flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
          <article
            className="min-w-0 flex-1 rounded-lg border border-brand-100 bg-surface px-4 py-4 sm:px-5 sm:py-5"
            aria-label="Unidades básicas de saúde"
          >
            <ul className="m-0 flex list-none flex-col gap-4 p-0 sm:gap-5">
              {ubsUnits.map((unit, index) => (
                <li
                  key={unit.id}
                  className={index > 0 ? 'border-t border-brand-100 pt-4 sm:pt-5' : undefined}
                >
                  <h4 className="m-0 text-[0.95rem] font-extrabold text-brand-600 sm:text-[1rem]">
                    {unit.name}
                  </h4>
                  <div className="mt-2 flex items-start gap-4 sm:gap-6">
                    <UnitDetail
                      icon={<LuMapPin className="size-4" />}
                      label="Endereço"
                      className="min-w-0 flex-1"
                    >
                      <Typography as="div" className="leading-snug">
                        <address className="not-italic">
                          {unit.addressLines.map((line, lineIndex) => (
                            <span key={line}>
                              {lineIndex > 0 && <br />}
                              {line}
                            </span>
                          ))}
                        </address>
                      </Typography>
                    </UnitDetail>
                    <UnitDetail
                      icon={<LuPhone className="size-4" />}
                      label="Telefone"
                      className="shrink-0"
                    >
                      <a
                        href={`tel:${unit.tel}`}
                        className="text-[0.98rem] font-semibold text-brand-600 whitespace-nowrap no-underline hover:underline max-sm:text-[0.92rem]"
                      >
                        {unit.phone}
                      </a>
                    </UnitDetail>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <div className="flex min-w-0 flex-col gap-3 sm:w-56 sm:shrink-0 sm:justify-center">
            <div className="flex flex-col gap-1">
              <Typography variant="muted" className="text-[0.88rem] sm:text-[0.9rem]">
                Você pode buscar uma unidade de saúde mais próxima de você em:
              </Typography>
              <a
                href="https://buscasaude.prefeitura.sp.gov.br/"
                className="text-[0.88rem] font-semibold text-brand-600 no-underline hover:underline sm:text-[0.9rem]"
              >
                buscasaude.prefeitura.sp.gov.br
              </a>
            </div>
            <DisqueSaudeCallout />
          </div>
        </div>
      </div>
    </Section>
  );
}
