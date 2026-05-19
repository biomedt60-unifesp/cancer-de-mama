import { FaInfo } from 'react-icons/fa';
import { Section } from './Section';
import TextHighlight from './TextHighlight';
import { Typography } from './Typography';

const base = import.meta.env.BASE_URL;

export default function WhatIsSection() {
  return (
    <Section title="O que é?" icon={<FaInfo />} iconLabel="O que é?">
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Typography>
          O câncer de mama é uma doença em que células da mama passam a crescer e se multiplicar de
          forma descontrolada e anormal. Essas células deixam de exercer suas funções normais e, se
          não forem tratadas, podem <TextHighlight>invadir outras partes do corpo.</TextHighlight>{' '}
          se não forem tratadas.
        </Typography>
        <Typography>
          O câncer de mama representa o{' '}
          <TextHighlight>segundo tipo de câncer mais comum </TextHighlight>na população feminina
          brasileira e representa cerca de <TextHighlight>30% dos casos</TextHighlight>.
        </Typography>
      </div>
      <figure className="m-0 flex shrink-0 items-center justify-center self-center">
        <img
          src={`${base}assets/drop.svg`}
          alt="Ilustração estilizada de mama em formato de gota, com coração e destaque de autocuidado."
          decoding="async"
          className="block size-40 max-w-full sm:size-48"
        />
      </figure>
    </Section>
  );
}
