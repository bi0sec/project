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
import { useAdminStore } from './store/adminStore';
import { AdminDashboard } from './components/AdminDashboard';
import { UserManagement } from './components/UserManagement';
import { TrainingManagement } from './components/TrainingManagement';
import { Dashboard } from './components/Dashboard';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { accounts } = useMsal();
  const localUser = useLocalAuthStore((state) => state.user);
  return accounts.length > 0 || localUser?.isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const { instance, accounts } = useMsal();
  const { setUser, setIsAuthenticated } = useAuthStore();
  const localUser = useLocalAuthStore((state) => state.user);
  const isAdmin = useAdminStore((state) => state.isAdmin);

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              {isAdmin ? (
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="trainings" element={<TrainingManagement />} />
                </Routes>
              ) : (
                <Navigate to="/" replace />
              )}
            </PrivateRoute>
          }
        />

        {/* User Routes */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="training" element={<TrainingViewer />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="certificate" element={<Certificate />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;