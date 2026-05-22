import { FaArrowRight, FaLightbulb } from 'react-icons/fa6';

type KnowledgeQuizButtonProps = {
  onClick: () => void;
};

export default function KnowledgeQuizButton({ onClick }: KnowledgeQuizButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="print:hidden group inline-flex w-full min-w-0 cursor-pointer items-center justify-center gap-3 rounded-xl bg-brand-600 px-4 py-3 text-white shadow-[0_4px_14px_#d81b6040] transition-[transform,box-shadow,background-color] hover:bg-brand-700 hover:shadow-[0_6px_20px_#ad145750] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:w-auto sm:justify-start"
    >
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition-colors group-hover:bg-white/28 [&_svg]:size-5"
        aria-hidden="true"
      >
        <FaLightbulb />
      </span>

      <span className="text-[0.92rem] font-extrabold leading-snug">Teste seus conhecimentos</span>

      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[0.78rem] font-bold transition-colors group-hover:bg-white/25 sm:ml-1">
        Começar
        <FaArrowRight
          className="size-3 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
