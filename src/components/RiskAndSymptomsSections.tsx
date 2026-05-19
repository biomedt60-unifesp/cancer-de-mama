import { GoAlertFill, GoSearch } from 'react-icons/go';
import { List, ListItem } from './List';
import { Section } from './Section';
import { Typography } from './Typography';

export default function RiskAndSymptomsSections() {
  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:col-span-2 sm:grid-cols-2 sm:gap-6">
      <Section
        title="Fatores de risco"
        variant="pink"
        span="auto"
        icon={<GoAlertFill />}
        iconLabel="Fatores de risco"
      >
        <List>
          <ListItem>Histórico familiar</ListItem>
          <ListItem>Idade avançada</ListItem>
          <ListItem>Ingestão de bebida alcoólica</ListItem>
          <ListItem>Exposição à radiação</ListItem>
          <ListItem>Exposição a substâncias cancerígenas</ListItem>
          <ListItem>Saúde hormonal e reprodutiva</ListItem>
          <ListItem>Sedentarismo</ListItem>
        </List>
      </Section>

      <Section
        title="Sintomas e sinais"
        variant="pink"
        span="auto"
        icon={<GoSearch />}
        iconLabel="Sintomas e sinais"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <List>
            <ListItem>Surgimento de nódulos ou caroços nos seios, pescoço ou axila</ListItem>
            <ListItem>Vermelhidão ou descamação</ListItem>
            <ListItem>Saída de líquido do mamilo (sem estar amamentando)</ListItem>
            <ListItem>
              Mama com aspecto de casca de laranja (enrugada e retraída) e inchada
            </ListItem>
          </List>
          <Typography variant="secondary" className="text-[0.85rem] leading-snug sm:text-[0.88rem]">
            A presença de sintomas não confirma o câncer de mama. Procure um profissional de saúde
            para avaliação adequada.
          </Typography>
        </div>
      </Section>
    </div>
  );
}
