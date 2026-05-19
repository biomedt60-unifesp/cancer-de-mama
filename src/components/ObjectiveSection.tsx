import { Typography } from './Typography';

const base = import.meta.env.BASE_URL;

export default function ObjectiveSection() {
  return (
    <section className="print-avoid-break flex min-w-0 flex-col items-center gap-4 rounded-lg border border-brand-100 bg-surface px-4 py-4 text-center sm:col-span-2 sm:flex-row sm:items-center sm:gap-6 sm:px-6 sm:py-6 sm:text-left">
      <figure className="m-0 flex shrink-0 items-center justify-center">
        <img
          src={`${base}assets/9.women.png`}
          alt="Ilustração de três mulheres diversas com laço rosa de conscientização ao peito."
          width={320}
          height={240}
          loading="lazy"
          decoding="async"
          className="block h-auto w-[min(220px,72vw)] max-w-full sm:w-52"
        />
      </figure>

      <div className="flex min-w-0 w-full flex-1 flex-col items-center gap-3 sm:items-start">
        <h2 className="m-0 text-[1.05rem] font-extrabold tracking-wide text-brand-600 uppercase sm:text-[1.05rem]">
          Nosso objetivo
        </h2>
        <Typography className="min-w-0 max-w-lg">
          Este material foi elaborado pela <strong>Turma 60 de Biomedicina da UNIFESP</strong> como
          projeto de extensão, para informar e conscientizar a população, especialmente as mulheres,
          sobre a importância da prevenção e do cuidado com a saúde.
        </Typography>
      </div>
    </section>
  );
}
