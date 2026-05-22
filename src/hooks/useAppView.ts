import { useCallback, useEffect, useState } from 'react';

export type AppView = 'folder' | 'quiz';

function getViewFromHash(): AppView {
  return window.location.hash === '#quiz' ? 'quiz' : 'folder';
}

export function useAppView() {
  const [view, setView] = useState<AppView>(getViewFromHash);

  useEffect(() => {
    const sync = () => setView(getViewFromHash());
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const goToQuiz = useCallback(() => {
    window.location.hash = 'quiz';
    setView('quiz');
  }, []);

  const goToFolder = useCallback(() => {
    const { pathname, search } = window.location;
    window.history.replaceState(null, '', `${pathname}${search}`);
    setView('folder');
  }, []);

  return { view, goToQuiz, goToFolder };
}
