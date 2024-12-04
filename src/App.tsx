import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { TrainingViewer } from './components/TrainingViewer';
import { Quiz } from './components/Quiz';
import { Certificate } from './components/Certificate';
import { useAuthStore } from './store/authStore';
import { useLocalAuthStore } from './store/localAuthStore';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { accounts } = useMsal();
  const localUser = useLocalAuthStore((state) => state.user);
  return accounts.length > 0 || localUser?.isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const { instance, accounts } = useMsal();
  const { setUser, setIsAuthenticated } = useAuthStore();
  const localUser = useLocalAuthStore((state) => state.user);

  React.useEffect(() => {
    instance.handleRedirectPromise().catch(error => {
      console.error("Redirect error:", error);
    });

    if (accounts.length > 0) {
      setUser({
        id: accounts[0].localAccountId,
        name: accounts[0].name || '',
        email: accounts[0].username,
        completedTraining: false
      });
      setIsAuthenticated(true);
    }
  }, [accounts, instance, setUser, setIsAuthenticated]);

  // If using local authentication
  if (localUser?.isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/training" replace />} />
            <Route
              path="training"
              element={
                <PrivateRoute>
                  <TrainingViewer />
                </PrivateRoute>
              }
            />
            <Route
              path="quiz"
              element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              }
            />
            <Route
              path="certificate"
              element={
                <PrivateRoute>
                  <Certificate />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/training" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <UnauthenticatedTemplate>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </UnauthenticatedTemplate>

      <AuthenticatedTemplate>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/training" replace />} />
            <Route
              path="training"
              element={
                <PrivateRoute>
                  <TrainingViewer />
                </PrivateRoute>
              }
            />
            <Route
              path="quiz"
              element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              }
            />
            <Route
              path="certificate"
              element={
                <PrivateRoute>
                  <Certificate />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/training" replace />} />
          </Route>
        </Routes>
      </AuthenticatedTemplate>
    </BrowserRouter>
  );
}

export default App;