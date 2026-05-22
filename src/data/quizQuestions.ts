export type QuizChoice = 'true' | 'false' | 'unsure';

export type QuizQuestion = {
  id: number;
  statement: string;
  correctAnswer: Exclude<QuizChoice, 'unsure'>;
  explanation: string;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    statement: 'Se o nódulo não dói não é câncer',
    correctAnswer: 'false',
    explanation:
      'Nem todo câncer de mama causa dor. Muitos casos, principalmente nos estágios iniciais, apresentam nódulos indolores. Por isso, qualquer alteração nas mamas deve ser avaliada por um profissional de saúde, mesmo sem dor.',
  },
  {
    id: 2,
    statement: 'Jovens não precisam se preocupar com o aparecimento de câncer de mama',
    correctAnswer: 'false',
    explanation:
      'É verdade que a faixa etária de maior risco para o câncer de mama está entre 50 e 69 anos. No entanto, nos últimos anos, observou-se um aumento no número de diagnósticos em mulheres jovens, principalmente naquelas com menos de 40 anos.',
  },
  {
    id: 3,
    statement:
      'O autoexame é o único exame necessário para a garantia da ausência de câncer',
    correctAnswer: 'false',
    explanation:
      'O autoexame tem como objetivo ajudar na identificação de alterações nas mamas, como nódulos maiores, endurecimento ou sangramentos, mas ele não é capaz de diagnosticar tumores pequenos. O exame mais indicado para a detecção precoce é a mamografia, capaz de identificar tumores menores que 1 cm, aumentando as chances de cura. Por isso, o autoexame é importante para o conhecimento do próprio corpo, mas não substitui a realização da mamografia e do acompanhamento médico.',
  },
  {
    id: 4,
    statement: 'Estilo de vida (dieta e exercícios) ajuda a reduzir o risco de câncer de mama.',
    correctAnswer: 'true',
    explanation:
      'A prática de atividade física, a alimentação equilibrada, a redução do consumo de álcool e a não utilização do tabaco ajudam a diminuir o risco de câncer de mama. Esses hábitos auxiliam no controle hormonal, reduzem processos inflamatórios e melhoram o funcionamento do organismo.',
  },
  {
    id: 5,
    statement: 'A amamentação protege contra o câncer de mama',
    correctAnswer: 'true',
    explanation:
      'A amamentação diminui o risco de a mãe desenvolver câncer de mama e, quanto mais prolongado for o período de amamentação, maior é essa proteção. Durante o aleitamento, ocorre a redução de alguns hormônios relacionados ao desenvolvimento desse tipo de câncer. Além disso, a amamentação promove a eliminação e renovação de células mamárias, reduzindo as chances de alterações que podem levar ao câncer de mama.',
  },
  {
    id: 6,
    statement: 'Não há chances de ter câncer de mama se não há histórico familiar',
    correctAnswer: 'false',
    explanation:
      'A maior parte dos diagnósticos de câncer de mama são feitos em mulheres que não têm histórico familiar de câncer de mama. Apenas 5 a 10% das pacientes com câncer de mama têm um câncer de caráter hereditário.',
  },
];

export const CHOICE_LABELS: Record<QuizChoice, string> = {
  true: 'Verdadeiro',
  false: 'Falso',
  unsure: 'Não sei',
};
