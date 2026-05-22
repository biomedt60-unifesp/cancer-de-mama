import { useEffect } from 'react';
import FolderCover from './components/FolderCover';
import WhatIsSection from './components/WhatIsSection';
import HealthSection from './components/HealthSection';
import FolderBack from './components/FolderBack';
import ObjectiveSection from './components/ObjectiveSection';
import RiskAndSymptomsSections from './components/RiskAndSymptomsSections';
import WhatToDoSection from './components/WhatToDoSection';
import { useAppView } from './hooks/useAppView';
import KnowledgeQuiz from './pages/KnowledgeQuiz';

function FolderContent({ onStartQuiz }: { onStartQuiz: () => void }) {
  return (
    <article className="print-folder w-full overflow-hidden bg-surface max-sm:max-w-none max-sm:rounded-none max-sm:shadow-none sm:mx-auto sm:max-w-[min(var(--folder-max-width),100%)] sm:rounded sm:shadow-[0_2px_0_#e91e6333,0_12px_40px_#ad145780,inset_0_0_0_1px_#ffffff99]">
      <FolderCover />

      <div className="grid min-w-0 gap-4 px-4 pt-4 pb-2 md:grid-cols-2 md:px-6 md:pt-6 *:min-w-0 *:max-w-full">
        <WhatIsSection />

        <RiskAndSymptomsSections />

        <WhatToDoSection />

        <HealthSection />

        <ObjectiveSection onStartQuiz={onStartQuiz} />
      </div>

      <FolderBack />
    </article>
  );
}

export default function App() {
  const { view, goToQuiz, goToFolder } = useAppView();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  if (view === 'quiz') {
    return <KnowledgeQuiz onBack={goToFolder} />;
  }

  return <FolderContent onStartQuiz={goToQuiz} />;
}
