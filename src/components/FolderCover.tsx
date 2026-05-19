import { FaGraduationCap } from 'react-icons/fa6';

const base = import.meta.env.BASE_URL;

export default function FolderCover() {
  return (
    <header className="print-cover relative overflow-hidden border-b-0 bg-brand-600 px-4 pt-[max(1.25rem,env(safe-area-inset-top))] pb-5 text-white sm:px-7 sm:pt-[1.65rem] sm:pb-6">
      <div className="flex w-full flex-col items-center gap-4 text-center sm:grid sm:grid-cols-[auto_1fr] sm:items-center sm:gap-x-6 sm:gap-y-[0.85rem] sm:text-left">
        <figure className="m-0 shrink-0 overflow-visible sm:order-0">
          <div className="relative flex h-44 w-40 items-end justify-center sm:h-56 sm:w-48">
            <div
              className="absolute bottom-0 size-36 rounded-full bg-accent-coral sm:size-44"
              aria-hidden="true"
            />
            <img
              src={`${base}assets/hero.png`}
              alt="Ilustração de mulher em autocuidado, abraçando-se, com laço rosa de conscientização."
              width={240}
              height={240}
              decoding="async"
              className="relative z-10 block h-full w-auto max-w-none object-contain object-bottom"
            />
          </div>
        </figure>

        <div className="flex w-full min-w-0 flex-col items-center gap-3 sm:items-start">
          <h1 className="m-0 max-w-[14ch] text-[clamp(2rem,9vw,2.75rem)] leading-[1.05] font-extrabold tracking-[-0.02em] sm:max-w-none sm:text-[4.5rem] sm:leading-[1.02]">
            Câncer de mama
          </h1>
          <hr className="mx-auto my-0 h-0.5 w-11 border-0 bg-white/88 sm:mx-0" />
          <p className="m-0 max-w-[22ch] text-[0.92rem] font-semibold leading-[1.45] opacity-96 sm:max-w-[18rem] sm:text-[clamp(0.88rem,2.4vw,1.05rem)]">
            Informações essenciais para prevenção e cuidado
          </p>
          <p className="m-0 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-[8px] bg-brand-50 px-2.5 py-2 text-[0.68rem] leading-snug text-brand-600 sm:justify-start sm:gap-[0.45rem] sm:py-[0.4rem] sm:pr-3 sm:pl-[0.55rem] sm:text-[0.76rem]">
            <FaGraduationCap className="size-4 shrink-0 sm:size-[1.1rem]" aria-hidden="true" />
            <span className="text-center font-semibold sm:text-left">
              <strong className="font-extrabold">Projeto de Extensão</strong>
              <span className="mx-[0.2rem] font-normal opacity-55" aria-hidden="true">
                |
              </span>
              UNIFESP · Biomedicina
            </span>
          </p>
        </div>
      </div>
    </header>
  );
}
