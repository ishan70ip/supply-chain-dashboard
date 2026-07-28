import { useCallback, useEffect, useState } from 'react';
import { Landing } from './pages/Landing';
import { SignIn } from './pages/SignIn';
import { Dashboard } from './pages/Dashboard';
import { ErrorBoundary } from './components/ErrorBoundary';
import { isAuthenticated, signOut } from './auth';

type Route = 'landing' | 'signin' | 'dashboard';

export default function App() {
  const [route, setRoute] = useState<Route>(() => (isAuthenticated() ? 'dashboard' : 'landing'));

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [route ]);

  const goLanding = useCallback(() => setRoute('landing'), []);
  const goSignIn = useCallback(() => setRoute(isAuthenticated() ? 'dashboard' : 'signin'), []);
  const goDashboard = useCallback(() => setRoute('dashboard'), []);

  const handleSignInSuccess = useCallback(() => setRoute('dashboard'), []);

  const handleSignOut = useCallback(() => {
    signOut();
    setRoute('landing');
  }, []);

  return (
    <ErrorBoundary>
      {route === 'landing' && (
        <Landing onSignIn={goSignIn} onEnterApp={goDashboard} isAuthed={isAuthenticated()} />
      )}
      {route === 'signin' && <SignIn onBack={goLanding} onSuccess={handleSignInSuccess} />}
      {route === 'dashboard' && <Dashboard onSignOut={handleSignOut} onHome={goLanding} />}
    </ErrorBoundary>
  );
}
