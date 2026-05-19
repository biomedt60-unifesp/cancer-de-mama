import { Badge } from './Badge';
import { List, ListItem } from './List';
import { Section } from './Section';
import TextHighlight from './TextHighlight';
import { LuClipboardList, LuStethoscope } from 'react-icons/lu';
import { Typography } from './Typography';

export default function WhatToDoSection() {
  return (
    <Section title="O que fazer?" icon={<LuClipboardList />} iconLabel="O que fazer?">
      <div className="flex w-full min-w-0 flex-col gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-5 sm:flex-row sm:items-stretch sm:gap-6">
          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-3">
            <Typography>
              Diante de qualquer suspeita, é fundamental buscar{' '}
              <TextHighlight>avaliação médica imediata</TextHighlight>. O profissional fará os exames
              necessários para o diagnóstico, confirmando ou descartando a presença da doença.
            </Typography>
            <Typography variant="secondary">
              Mesmo na ausência de sintomas, mulheres entre{' '}
              <TextHighlight>50 e 69 anos</TextHighlight> devem realizar os exames preventivos a cada{' '}
              <TextHighlight>2 anos</TextHighlight>.
            </Typography>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2 border-t border-brand-100 pt-5 sm:flex-2 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
            <div className="flex items-center gap-3">
              <Badge size="sm" aria-label="Exames necessários">
                <LuStethoscope />
              </Badge>
              <Typography className="min-w-0 flex-1">
                <TextHighlight>Exames necessários</TextHighlight>
              </Typography>
            </div>
            <List>
              <ListItem>Mamografia</ListItem>
              <ListItem>Ultrassonografia</ListItem>
              <ListItem>Biópsia</ListItem>
              <ListItem>Exame clínico das mamas (ECM)</ListItem>
              <ListItem>Exames de imagem complementares</ListItem>
            </List>
          </div>
        </div>

        <div className="rounded-lg bg-brand-10 px-4 py-3 sm:py-4">
          <Typography variant="accent" className="font-bold">
            O câncer de mama pode afetar pessoas de qualquer idade e gênero. O diagnóstico precoce
            é essencial para aumentar as chances de cura e permitir tratamentos menos agressivos.
          </Typography>
        </div>
      </div>
    </Section>
  );
}
