import FolderCover from './components/FolderCover';
import WhatIsSection from './components/WhatIsSection';
import HealthSection from './components/HealthSection';
import FolderBack from './components/FolderBack';
import ObjectiveSection from './components/ObjectiveSection';
import RiskAndSymptomsSections from './components/RiskAndSymptomsSections';
import WhatToDoSection from './components/WhatToDoSection';

export default function App() {
  return (
    <article className="print-folder w-full overflow-hidden bg-surface max-sm:max-w-none max-sm:rounded-none max-sm:shadow-none sm:mx-auto sm:max-w-[min(var(--folder-max-width),100%)] sm:rounded sm:shadow-[0_2px_0_#e91e6333,0_12px_40px_#ad145780,inset_0_0_0_1px_#ffffff99]">
      <FolderCover />

      <div className="grid min-w-0 gap-4 px-4 pt-4 pb-2 sm:grid-cols-2 sm:px-6 sm:pt-6 *:min-w-0 *:max-w-full">
        <WhatIsSection />

        <RiskAndSymptomsSections />

        <WhatToDoSection />

        <HealthSection />

        <ObjectiveSection />
      </div>

      <FolderBack />
    </article>
  );
}
