import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../config/authConfig';
import { Shield } from 'lucide-react';
import { LocalLogin } from './LocalLogin';

export function Login() {
  const { instance } = useMsal();
  const [error, setError] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);
  const isRedirectEnabled = import.meta.env.PROD;

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      if (isRedirectEnabled) {
        await instance.loginRedirect(loginRequest);
      } else {
        await instance.loginPopup(loginRequest);
      }
    } catch (error: any) {
      console.error('Error during login:', error);
      setError(error.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Security Awareness Training
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the training
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <LocalLogin />
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Azure AD Login</h3>
            {error && (
              <div className="rounded-md bg-red-50 p-4 mb-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in with Microsoft'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}