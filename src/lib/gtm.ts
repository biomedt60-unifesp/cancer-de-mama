import type { QuizChoice } from '../data/quizQuestions';

export const GTM_EVENTS = {
  SCROLL_DEPTH: 'scroll_depth',
  EXTERNAL_LINK_CLICK: 'external_link_click',
  UBS_CLICK: 'ubs_click',
  QUIZ_START: 'quiz_start',
  QUIZ_ANSWER: 'quiz_answer',
  QUIZ_COMPLETE: 'quiz_complete',
} as const;

const SCROLL_THRESHOLDS = [25, 50, 75, 90, 100] as const;

type GtmEventParams = Record<string, string | number | boolean>;

function pushToDataLayer(payload: GtmEventParams) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

export function trackEvent(event: string, params?: GtmEventParams) {
  pushToDataLayer({ event, ...params });
}

export function trackScrollDepth(percent: number) {
  trackEvent(GTM_EVENTS.SCROLL_DEPTH, { percent_scrolled: percent });
}

export function trackExternalLinkClick(url: string, linkText: string) {
  trackEvent(GTM_EVENTS.EXTERNAL_LINK_CLICK, {
    link_url: url,
    link_text: linkText,
  });
}

export function trackUbsClick(ubsId: string, ubsName: string, phoneNumber: string) {
  trackEvent(GTM_EVENTS.UBS_CLICK, {
    ubs_id: ubsId,
    ubs_name: ubsName,
    phone_number: phoneNumber,
  });
}

export function trackQuizStart(questionTotal: number) {
  trackEvent(GTM_EVENTS.QUIZ_START, { question_total: questionTotal });
}

export function trackQuizAnswer(params: {
  questionId: number;
  questionNumber: number;
  questionTotal: number;
  choice: QuizChoice;
  isCorrect: boolean;
  correctAnswer: Exclude<QuizChoice, 'unsure'>;
}) {
  trackEvent(GTM_EVENTS.QUIZ_ANSWER, {
    question_id: params.questionId,
    question_number: params.questionNumber,
    question_total: params.questionTotal,
    choice: params.choice,
    is_correct: params.isCorrect,
    correct_answer: params.correctAnswer,
  });
}

export function trackQuizComplete(params: {
  score: number;
  total: number;
  percent: number;
  unsureCount: number;
}) {
  trackEvent(GTM_EVENTS.QUIZ_COMPLETE, {
    score: params.score,
    question_total: params.total,
    percent_correct: params.percent,
    unsure_count: params.unsureCount,
  });
}

export function initScrollDepthTracking() {
  const fired = new Set<number>();

  const getScrollPercent = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return 100;
    return Math.min(100, Math.round((window.scrollY / docHeight) * 100));
  };

  const checkScroll = () => {
    const percent = getScrollPercent();
    for (const threshold of SCROLL_THRESHOLDS) {
      if (percent >= threshold && !fired.has(threshold)) {
        fired.add(threshold);
        trackScrollDepth(threshold);
      }
    }
  };

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();

  return () => window.removeEventListener('scroll', checkScroll);
}
