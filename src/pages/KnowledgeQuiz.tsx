import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCircleCheck,
  FaCircleQuestion,
  FaCircleXmark,
  FaSpinner,
} from 'react-icons/fa6';
import {
  CHOICE_LABELS,
  QUIZ_QUESTIONS,
  type QuizChoice,
  type QuizQuestion,
} from '../data/quizQuestions';
import { trackQuizAnswer, trackQuizComplete, trackQuizStart } from '../lib/gtm';

type KnowledgeQuizProps = {
  onBack: () => void;
};

type AnswerRecord = {
  choice: QuizChoice;
  isCorrect: boolean;
};

const CHOICE_META: Record<
  QuizChoice,
  { icon: typeof FaCircleCheck; idleClass: string; activeClass: string }
> = {
  true: {
    icon: FaCircleCheck,
    idleClass:
      'border-emerald-200/80 bg-emerald-50/60 text-[#047857] hover:border-emerald-400 hover:bg-emerald-50 max-lg:border-[#a7f3d0] max-lg:bg-[#d1fae5] max-lg:shadow-[0_2px_10px_rgba(4,120,87,0.1)]',
    activeClass:
      'border-emerald-500 bg-emerald-100 text-[#047857] ring-2 ring-emerald-500/25 max-lg:border-[#047857] max-lg:bg-[#d1fae5] max-lg:shadow-[0_0_0_3px_rgba(4,120,87,0.18)]',
  },
  false: {
    icon: FaCircleXmark,
    idleClass:
      'border-rose-200/80 bg-rose-50/60 text-[#be123c] hover:border-rose-400 hover:bg-rose-50 max-lg:border-[#fecdd3] max-lg:bg-[#ffe4e6] max-lg:shadow-[0_2px_10px_rgba(190,18,60,0.1)]',
    activeClass:
      'border-rose-500 bg-rose-100 text-[#be123c] ring-2 ring-rose-500/25 max-lg:border-[#be123c] max-lg:bg-[#ffe4e6] max-lg:shadow-[0_0_0_3px_rgba(190,18,60,0.16)]',
  },
  unsure: {
    icon: FaCircleQuestion,
    idleClass:
      'border-neutral-300 bg-neutral-100 text-neutral-600 hover:border-neutral-400 hover:bg-neutral-50 max-lg:border-neutral-300 max-lg:bg-neutral-100 max-lg:shadow-[0_2px_10px_rgba(75,85,99,0.1)]',
    activeClass:
      'border-neutral-500 bg-neutral-200 text-neutral-700 ring-2 ring-neutral-400/30 max-lg:border-neutral-600 max-lg:bg-neutral-100 max-lg:shadow-[0_0_0_3px_rgba(75,85,99,0.15)]',
  },
};

function isChoiceCorrect(question: QuizQuestion, choice: QuizChoice) {
  return choice !== 'unsure' && choice === question.correctAnswer;
}

function getFeedbackTitle(question: QuizQuestion, choice: QuizChoice) {
  if (choice === 'unsure') {
    return `A resposta certa é ${CHOICE_LABELS[question.correctAnswer].toLowerCase()}`;
  }
  if (choice === question.correctAnswer) {
    return 'Isso mesmo!';
  }
  return 'Não foi dessa vez';
}

function getResultsMessage(score: number, total: number) {
  const ratio = score / total;
  if (ratio >= 0.85) return 'Excelente! Você demonstrou bastante conhecimento.';
  if (ratio >= 0.5) return 'Bom trabalho! Vale revisar as explicações abaixo.';
  return 'Ótimo começo — as explicações abaixo ajudam a reforçar o que aprendeu.';
}

function getChoiceButtonClass(
  choice: QuizChoice,
  question: QuizQuestion,
  selected: QuizChoice | null,
  answered: boolean
) {
  const meta = CHOICE_META[choice];
  const isSelected = selected === choice;
  const isCorrect = isChoiceCorrect(question, choice);
  const showCorrectHint = answered && isCorrect && selected !== question.correctAnswer;

  if (!answered) {
    return `cursor-pointer ${meta.idleClass}`;
  }

  if (showCorrectHint) {
    return `${meta.activeClass} ring-2`;
  }

  if (isSelected) {
    if (choice === 'unsure') return meta.activeClass;
    return isCorrect
      ? `${meta.activeClass} shadow-sm`
      : 'border-brand-700/40 bg-brand-10 text-brand-800 ring-2 ring-brand-700/20';
  }

  return 'pointer-events-none border-brand-100/80 bg-surface/80 text-neutral-700/45 opacity-55';
}

const PRIMARY_ACTION_CLASS =
  'touch-manipulation inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3.5 text-[0.95rem] font-bold text-white shadow-[0_4px_14px_#d81b6040] transition-[transform,box-shadow,background-color] hover:bg-brand-700 hover:shadow-[0_6px_20px_#ad145750] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600';

const CARD_EXIT_MS = 420;
const RESULTS_LOADING_MS = 650;

type CardPhase = 'idle' | 'exit' | 'results-loading';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function QuizResultsLoading() {
  return (
    <div className="quiz-screen quiz-screen--loading" role="status" aria-live="polite" aria-busy="true">
      <main className="quiz-screen__loading">
        <FaSpinner className="quiz-screen__loading-spinner size-10 text-brand-600" aria-hidden="true" />
        <p className="m-0 text-center text-[0.95rem] font-bold text-brand-700">
          Preparando seu resultado…
        </p>
      </main>
    </div>
  );
}

function AnimatedPercent({ percent }: { percent: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      const timer = window.setTimeout(() => setValue(percent), 0);
      return () => window.clearTimeout(timer);
    }

    let frame = 0;
    const start = performance.now();
    const duration = 750;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(percent * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [percent]);

  return <>{value}%</>;
}

function QuizCardStack({
  phase,
  skipUnderTransition,
  advanceInstant,
  underCard,
  children,
}: {
  phase: CardPhase;
  skipUnderTransition?: boolean;
  advanceInstant?: boolean;
  underCard?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className={`quiz-card-stack ${
        skipUnderTransition ? 'quiz-card-stack--no-under-transition' : ''
      } ${advanceInstant ? 'quiz-card-stack--advance' : ''}`}
    >
      {underCard && (
        <div className="quiz-card-stack__under" aria-hidden="true" inert>
          {underCard}
        </div>
      )}
      <div
        className={`quiz-card-stack__active ${
          phase === 'exit' ? 'quiz-card-stack__active--exit' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function QuizQuestionChoices({
  question,
  selected,
  answered,
  onSelect,
  inert,
}: {
  question: QuizQuestion;
  selected: QuizChoice | null;
  answered: boolean;
  onSelect?: (choice: QuizChoice) => void;
  inert?: boolean;
}) {
  const disabled = inert || !onSelect;

  return (
    <fieldset className="m-0 flex h-full min-h-0 flex-1 flex-col gap-3.5 border-0 p-0">
      <legend className="sr-only">Escolha verdadeiro, falso ou não sei</legend>

      <div className="quiz-choice-grid grid min-h-0 flex-1 grid-cols-2 gap-3.5">
        {(['true', 'false'] as const).map((choice) => {
          const meta = CHOICE_META[choice];
          const Icon = meta.icon;
          const isSelected = selected === choice;

          return (
            <button
              key={choice}
              type="button"
              onClick={disabled ? undefined : () => onSelect(choice)}
              disabled={disabled}
              tabIndex={disabled ? -1 : undefined}
              aria-pressed={isSelected}
              data-choice={choice}
              className={`quiz-choice-btn touch-manipulation flex h-full min-h-[4.75rem] flex-col items-center justify-center gap-2 rounded-xl border-2 px-2.5 py-3 text-center text-[0.95rem] font-extrabold transition-[colors,box-shadow,transform] duration-200 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 max-lg:min-h-[5.5rem] max-lg:gap-2.5 lg:min-h-[5.75rem] lg:rounded-lg lg:py-3 lg:active:scale-100 ${getChoiceButtonClass(choice, question, selected, answered)}`}
            >
              <span
                className={`quiz-choice-btn__icon quiz-choice-btn__icon--${choice} flex shrink-0 items-center justify-center [&_svg]:size-9 max-lg:[&_svg]:size-10 lg:[&_svg]:size-9`}
                aria-hidden="true"
              >
                <Icon />
              </span>
              <span className="quiz-choice-btn__label text-[0.92rem] leading-tight tracking-tight sm:text-[1.05rem]">
                {CHOICE_LABELS[choice]}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={disabled ? undefined : () => onSelect('unsure')}
        disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        aria-pressed={selected === 'unsure'}
        className={`touch-manipulation flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border-2 px-3 py-3 text-[0.9rem] font-bold transition-[colors,box-shadow,transform] duration-200 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 max-lg:shadow-[0_2px_10px_rgba(75,85,99,0.1)] lg:rounded-lg lg:shadow-none lg:active:scale-100 ${getChoiceButtonClass('unsure', question, selected, answered)}`}
      >
        <FaCircleQuestion className="size-5 shrink-0 lg:size-4" aria-hidden="true" />
        Não sei
      </button>
    </fieldset>
  );
}

function QuizFlashcard({
  prompt,
  cardIndex,
  cardTotal,
  flipped,
  correctAnswer,
  front,
  back,
  action,
}: {
  prompt: string;
  cardIndex: number;
  cardTotal: number;
  flipped: boolean;
  correctAnswer?: Exclude<QuizChoice, 'unsure'>;
  front: ReactNode;
  back: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div
      className={`quiz-card-panel ${flipped ? '' : 'quiz-card-panel--front'}`}
      aria-label={flipped ? 'Resposta e explicação' : 'Escolha uma opção'}
    >
      <div className="quiz-card-panel__head">
        <span className="quiz-card-panel__badge">{flipped ? 'Verso' : 'Frente'}</span>
        <span className="quiz-card-panel__meta">
          {cardIndex} / {cardTotal}
        </span>
      </div>

      {!flipped && <p className="quiz-card-panel__kind">Verdadeiro ou falso?</p>}

      {flipped && correctAnswer && (
        <p
          className={`quiz-card-panel__answer-tag quiz-card-panel__answer-tag--${correctAnswer}`}
        >
          {CHOICE_LABELS[correctAnswer]}
        </p>
      )}

      <p className="quiz-card-panel__prompt">&ldquo;{prompt}&rdquo;</p>

      <div className="quiz-card-panel__divider" aria-hidden="true" />

      {flipped ? (
        <div className="quiz-card-panel__revealed">
          <div className="quiz-card-panel__revealed-body">{back}</div>
          {action && <div className="quiz-card-panel__action">{action}</div>}
        </div>
      ) : (
        <div className="quiz-card-panel__choices">{front}</div>
      )}
    </div>
  );
}

function QuizFeedback({
  question,
  choice,
}: {
  question: QuizQuestion;
  choice: QuizChoice;
}) {
  const isCorrect = choice !== 'unsure' && choice === question.correctAnswer;
  const isUnsure = choice === 'unsure';

  return (
    <div
      className={`quiz-card-panel__feedback ${
        isUnsure
          ? 'quiz-card-panel__feedback--neutral'
          : isCorrect
            ? 'quiz-card-panel__feedback--correct'
            : 'quiz-card-panel__feedback--neutral'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
            isUnsure
              ? 'bg-neutral-200 text-neutral-600'
              : isCorrect
                ? 'bg-emerald-100 text-emerald-600'
                : 'bg-brand-100 text-brand-700'
          }`}
          aria-hidden="true"
        >
          {isUnsure ? (
            <FaCircleQuestion className="size-5 shrink-0" />
          ) : isCorrect ? (
            <FaCircleCheck className="size-5 shrink-0" />
          ) : (
            <FaCircleXmark className="size-5 shrink-0" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p
            className={`m-0 text-[1rem] font-extrabold leading-snug ${
              isUnsure ? 'text-neutral-600' : isCorrect ? 'text-emerald-800' : 'text-brand-600'
            }`}
          >
            {getFeedbackTitle(question, choice)}
          </p>
          <p className="mt-2 mb-0 text-[0.92rem] leading-relaxed text-neutral-700">
            {question.explanation}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function KnowledgeQuiz({ onBack }: KnowledgeQuizProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selected, setSelected] = useState<QuizChoice | null>(null);
  const [cardPhase, setCardPhase] = useState<CardPhase>('idle');
  const [skipUnderTransition, setSkipUnderTransition] = useState(false);
  const [advanceInstant, setAdvanceInstant] = useState(false);
  const hasTrackedQuizStart = useRef(false);

  const question = QUIZ_QUESTIONS[index];
  const questionTotal = QUIZ_QUESTIONS.length;
  const nextQuestion = QUIZ_QUESTIONS[index + 1];
  const hasNextQuestion = index < QUIZ_QUESTIONS.length - 1;
  const isFinished = index >= QUIZ_QUESTIONS.length;
  const answered = selected !== null;

  const score = useMemo(
    () => answers.filter((entry) => entry.isCorrect).length,
    [answers]
  );

  const handleSelect = (choice: QuizChoice) => {
    if (answered) return;

    const isCorrect = isChoiceCorrect(question, choice);

    trackQuizAnswer({
      questionId: question.id,
      questionNumber: index + 1,
      questionTotal,
      choice,
      isCorrect,
      correctAnswer: question.correctAnswer,
    });

    setSelected(choice);
    setAnswers((prev) => [...prev, { choice, isCorrect }]);
  };

  useEffect(() => {
    if (hasTrackedQuizStart.current) return;
    hasTrackedQuizStart.current = true;
    trackQuizStart(questionTotal);
  }, [questionTotal]);

  const isLastQuestion = index >= QUIZ_QUESTIONS.length - 1;

  useEffect(() => {
    if (cardPhase !== 'exit') return;
    const timer = window.setTimeout(() => {
      if (isLastQuestion) {
        setCardPhase('results-loading');
        return;
      }
      setAdvanceInstant(true);
      setSelected(null);
      setIndex((prev) => prev + 1);
      setSkipUnderTransition(true);
      setCardPhase('idle');
    }, CARD_EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [cardPhase, isLastQuestion]);

  useEffect(() => {
    if (!advanceInstant) return;
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAdvanceInstant(false));
    });
    return () => cancelAnimationFrame(frame);
  }, [advanceInstant, index]);

  useEffect(() => {
    if (cardPhase !== 'results-loading') return;
    const timer = window.setTimeout(() => {
      setSelected(null);
      setIndex((prev) => prev + 1);
      setCardPhase('idle');
    }, prefersReducedMotion() ? 0 : RESULTS_LOADING_MS);
    return () => window.clearTimeout(timer);
  }, [cardPhase]);

  useEffect(() => {
    if (!skipUnderTransition) return;
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setSkipUnderTransition(false));
    });
    return () => cancelAnimationFrame(frame);
  }, [skipUnderTransition, index]);

  const handleNext = () => {
    if (!answered || cardPhase !== 'idle') return;

    if (prefersReducedMotion()) {
      setSelected(null);
      if (isLastQuestion) {
        setCardPhase('results-loading');
      } else {
        setIndex((prev) => prev + 1);
      }
      return;
    }

    setCardPhase('exit');
  };

  const handleRestart = () => {
    setIndex(0);
    setAnswers([]);
    setSelected(null);
    setCardPhase('idle');
    setSkipUnderTransition(false);
    setAdvanceInstant(false);
    trackQuizStart(questionTotal);
  };

  useEffect(() => {
    if (!isFinished) return;

    const unsureCount = answers.filter((entry) => entry.choice === 'unsure').length;
    const percent = Math.round((score / questionTotal) * 100);

    trackQuizComplete({
      score,
      total: questionTotal,
      percent,
      unsureCount,
    });
    window.scrollTo(0, 0);
  }, [isFinished, answers, score, questionTotal]);

  if (cardPhase === 'results-loading') {
    return <QuizResultsLoading />;
  }

  if (isFinished) {
    const total = QUIZ_QUESTIONS.length;
    const unsureCount = answers.filter((entry) => entry.choice === 'unsure').length;
    const percent = Math.round((score / total) * 100);

    return (
      <div className="print-folder min-h-dvh w-full overflow-hidden bg-surface max-sm:max-w-none max-sm:rounded-none max-sm:shadow-none sm:mx-auto sm:min-h-0 sm:max-w-[min(var(--folder-max-width),100%)] sm:rounded sm:shadow-[0_2px_0_#e91e6333,0_12px_40px_#ad145780,inset_0_0_0_1px_#ffffff99]">
        <header className="bg-brand-600 px-4 pt-[max(1.25rem,env(safe-area-inset-top))] pb-6 text-white sm:px-7 sm:pt-6">
          <h1 className="quiz-results__anim-header m-0 text-[clamp(1.5rem,6vw,2rem)] font-extrabold leading-tight tracking-[-0.02em]">
            Parabéns por participar!
          </h1>
          <p className="quiz-results__anim-subheader mt-2 mb-0 max-w-prose text-[0.95rem] leading-relaxed text-white/92">
            {getResultsMessage(score, total)}
          </p>
        </header>

        <div className="quiz-results flex flex-col gap-5 bg-brand-10/50 px-4 py-5 sm:px-6 sm:py-6">
          <div className="quiz-results__score-card flex flex-col items-center gap-2 px-5 py-5 text-center">
            <p className="quiz-results__score-value m-0 text-[3.5rem] font-extrabold leading-none text-brand-600">
              <AnimatedPercent percent={percent} />
            </p>
            <p className="quiz-results__anim-score-detail m-0 text-[0.95rem] font-bold text-neutral-700">
              {score} de {total} acertos
            </p>
            {unsureCount > 0 && (
              <p className="quiz-results__anim-score-detail m-0 text-[0.85rem] text-neutral-700/80">
                Você marcou &quot;Não sei&quot; em {unsureCount} pergunta
                {unsureCount > 1 ? 's' : ''}.
              </p>
            )}
          </div>

          <ol className="m-0 flex list-none flex-col gap-3 p-0">
            {QUIZ_QUESTIONS.map((item, itemIndex) => {
              const record = answers[itemIndex];
              const wasUnsure = record.choice === 'unsure';
              const icon = wasUnsure ? (
                <FaCircleQuestion className="size-5 shrink-0 text-neutral-600" aria-hidden="true" />
              ) : record.isCorrect ? (
                <FaCircleCheck className="size-5 shrink-0 text-emerald-600" aria-hidden="true" />
              ) : (
                <FaCircleXmark className="size-5 shrink-0 text-brand-700" aria-hidden="true" />
              );

              return (
                <li
                  key={item.id}
                  className="quiz-results__item rounded-xl border border-brand-100 bg-surface px-4 py-3.5 shadow-sm"
                  style={{ animationDelay: `${0.38 + itemIndex * 0.07}s` }}
                >
                  <div className="flex gap-3">
                    {icon}
                    <div className="min-w-0 flex flex-col gap-2">
                      <p className="m-0 text-[0.9rem] font-bold leading-snug text-neutral-700">
                        {item.statement}
                      </p>
                      <p className="m-0 text-[0.85rem] leading-snug text-brand-600">
                        <span className="font-extrabold">Resposta: </span>
                        {CHOICE_LABELS[item.correctAnswer]}
                      </p>
                      {!record.isCorrect && (
                        <p className="m-0 text-[0.85rem] leading-snug text-neutral-700/85">
                          Você marcou: {CHOICE_LABELS[record.choice]}
                        </p>
                      )}
                      <p className="m-0 text-[0.85rem] leading-relaxed text-neutral-700">
                        {item.explanation}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="quiz-results__actions flex flex-col gap-3 md:flex-row">
            <button type="button" onClick={handleRestart} className={PRIMARY_ACTION_CLASS}>
              Refazer
            </button>
            <button
              type="button"
              onClick={onBack}
              className="touch-manipulation inline-flex min-h-12 w-full items-center justify-center rounded-xl border-2 border-brand-600 px-4 py-3.5 text-[0.95rem] font-bold text-brand-600 transition-colors hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              Voltar ao folder
            </button>
          </div>
        </div>
      </div>
    );
  }

  const nextLabel =
    index < QUIZ_QUESTIONS.length - 1 ? 'Próxima pergunta' : 'Ver meu resultado';

  const nextDisabled = !answered || cardPhase !== 'idle';

  const nextButton = (
    <button
      type="button"
      onClick={handleNext}
      disabled={nextDisabled}
      aria-disabled={nextDisabled}
      className={`${PRIMARY_ACTION_CLASS} shadow-none hover:shadow-none disabled:shadow-none disabled:active:scale-100 ${
        answered
          ? 'disabled:cursor-wait disabled:bg-brand-600/55'
          : 'disabled:cursor-not-allowed disabled:bg-brand-600/40 disabled:opacity-70'
      }`}
    >
      {nextLabel}
      <FaArrowRight className="size-3.5" aria-hidden="true" />
    </button>
  );

  return (
    <div className="quiz-screen">
      <button
        type="button"
        onClick={onBack}
        className="quiz-screen__back touch-manipulation inline-flex min-h-12 items-center gap-2.5 px-2 py-2.5 text-[1rem] font-semibold text-brand-600 underline underline-offset-[0.2em] transition-colors hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 lg:min-h-11 lg:gap-2 lg:px-1 lg:py-2 lg:text-[0.9rem]"
      >
        <FaArrowLeft className="size-4 lg:size-3.5" aria-hidden="true" />
        Voltar
      </button>

      <main className="quiz-screen__main">
        <QuizCardStack
          phase={cardPhase}
          skipUnderTransition={skipUnderTransition}
          advanceInstant={advanceInstant}
          underCard={
            hasNextQuestion && nextQuestion ? (
              <QuizFlashcard
                prompt={nextQuestion.statement}
                cardIndex={index + 2}
                cardTotal={QUIZ_QUESTIONS.length}
                flipped={false}
                front={
                  <QuizQuestionChoices
                    question={nextQuestion}
                    selected={null}
                    answered={false}
                    inert
                  />
                }
                back={null}
              />
            ) : undefined
          }
        >
          <QuizFlashcard
            prompt={question.statement}
            cardIndex={index + 1}
            cardTotal={QUIZ_QUESTIONS.length}
            flipped={answered}
            correctAnswer={question.correctAnswer}
            front={
              <QuizQuestionChoices
                question={question}
                selected={selected}
                answered={answered}
                onSelect={handleSelect}
              />
            }
            back={
              answered && selected ? <QuizFeedback question={question} choice={selected} /> : null
            }
            action={nextButton}
          />
        </QuizCardStack>
      </main>

      <footer className="quiz-screen__footer">{nextButton}</footer>
    </div>
  );
}
