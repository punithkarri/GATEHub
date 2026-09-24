import { useState, useEffect } from 'react';
import type { Branch } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { VirtualCalculator } from './components/VirtualCalculator';

import { HomePage } from './pages/HomePage';
import { GateInfoPage } from './pages/GateInfoPage';
import { SyllabusPage } from './pages/SyllabusPage';
import { SubjectDetailPage } from './pages/SubjectDetailPage';
import { PyqExplorerPage } from './pages/PyqExplorerPage';
import { PracticeModePage } from './pages/PracticeModePage';
import { MockTestPage } from './pages/MockTestPage';
import { WhereToStudyPage } from './pages/WhereToStudyPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { RoadmapsPage } from './pages/RoadmapsPage';
import { PlannerPage } from './pages/PlannerPage';
import { RevisionPage } from './pages/RevisionPage';
import { DashboardPage } from './pages/DashboardPage';

export function App() {
  const parseCurrentRoute = () => {
    // 1. Check hash route
    const hash = window.location.hash.replace('#', '');
    if (hash) return hash.startsWith('/') ? hash : '/' + hash;

    // 2. Check path route (stripped of base /GATEHub)
    let path = window.location.pathname;
    if (path.startsWith('/GATEHub')) {
      path = path.replace('/GATEHub', '');
    }
    if (path && path !== '/') return path;

    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(parseCurrentRoute);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch>('CSE');

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(parseCurrentRoute());
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  const renderContent = () => {
    if (currentRoute === '/') {
      return <HomePage onNavigate={navigateTo} />;
    }
    if (currentRoute === '/syllabus') {
      return <SyllabusPage onNavigate={navigateTo} />;
    }
    if (currentRoute === '/subjects') {
      return <SyllabusPage onNavigate={navigateTo} />;
    }
    if (currentRoute.startsWith('/subject/')) {
      const subjectId = currentRoute.replace('/subject/', '');
      return <SubjectDetailPage subjectId={subjectId} onNavigate={navigateTo} />;
    }
    if (currentRoute.startsWith('/pyqs')) {
      return <PyqExplorerPage />;
    }
    if (currentRoute === '/practice') {
      return <PracticeModePage />;
    }
    if (currentRoute === '/mock-tests') {
      return <MockTestPage />;
    }
    if (currentRoute === '/where-to-study') {
      return <WhereToStudyPage />;
    }
    if (currentRoute === '/resources') {
      return <ResourcesPage />;
    }
    if (currentRoute === '/roadmap') {
      return <RoadmapsPage />;
    }
    if (currentRoute === '/planner') {
      return <PlannerPage />;
    }
    if (currentRoute === '/revision') {
      return <RevisionPage />;
    }
    if (currentRoute === '/gate-info') {
      return <GateInfoPage />;
    }
    if (currentRoute === '/dashboard') {
      return <DashboardPage onNavigate={navigateTo} />;
    }
    return <HomePage onNavigate={navigateTo} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 font-sans transition-colors duration-300">
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        selectedBranch={selectedBranch}
        onSelectBranch={setSelectedBranch}
        onToggleCalculator={() => setIsCalculatorOpen(!isCalculatorOpen)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {renderContent()}
      </main>

      <Footer onNavigate={navigateTo} />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigateTo}
      />

      <VirtualCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </div>
  );
}

export default App;
