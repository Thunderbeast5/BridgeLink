import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const VerifyEmailPage: React.FC = () => {
  const { user, sendEmailVerification } = useAuth();
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.emailVerified) {
      navigate(`/${user.role}/dashboard`);
    }
  }, [user, navigate]);

  const handleResendEmail = async () => {
    setIsResending(true);
    setError('');
    setResendSuccess(false);

    try {
      await sendEmailVerification();
      setResendSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please sign in first</h1>
          <Link to="/login" className="btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative w-16 h-16">
                <img src="/Logo/b.png" alt="BridgeLink" className="w-full h-full" />
                <img 
                  src="/Logo/hat-1.png" 
                  alt="Hat" 
                  className="absolute -top-2 -left-2 w-18 h-18 animate-bounce-slow" 
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white">Verify your email</h2>
            <p className="mt-2 text-gray-400">
              We've sent a verification link to your email address
            </p>
          </div>

          <div className="card text-center">
            <div className="mb-6">
              <Mail className="w-16 h-16 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Check your inbox
              </h3>
              <p className="text-gray-400 mb-4">
                We sent a verification link to:
              </p>
              <p className="text-primary-400 font-medium break-all">
                {user.email}
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-dark-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">What to do next:</h4>
                <ol className="text-sm text-gray-400 space-y-1 text-left">
                  <li>1. Check your email inbox</li>
                  <li>2. Look for an email from BridgeLink</li>
                  <li>3. Click the verification link</li>
                  <li>4. Return here and refresh the page</li>
                </ol>
              </div>

              {resendSuccess && (
                <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-400 text-sm">Verification email sent successfully!</span>
                </div>
              )}

              {error && (
                <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResending ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <RefreshCw className="w-5 h-5" />
                  )}
                  <span>{isResending ? 'Sending...' : 'Resend verification email'}</span>
                </button>

                <button
                  onClick={() => window.location.reload()}
                  className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  I've verified my email
                </button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-dark-700">
              <p className="text-sm text-gray-400">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="text-primary-400 hover:text-primary-300 underline disabled:opacity-50"
                >
                  try again
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VerifyEmailPage;

