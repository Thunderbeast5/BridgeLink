import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="min-h-screen flex items-center justify-center py-16 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
        {/* Futuristic black background with blue glow effects */}
        <div className="absolute inset-0 bg-black">
          {/* Animated particle circles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/6 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute top-10 right-10 w-48 h-48 bg-blue-300/4 rounded-full blur-xl animate-pulse delay-700"></div>
          <div className="absolute bottom-10 left-10 w-56 h-56 bg-blue-500/7 rounded-full blur-2xl animate-pulse delay-300"></div>
          
          {/* Subtle radial glow in center */}
          <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-md w-full mx-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgb(31, 41, 55)', borderRadius: '1.5rem', padding: '2rem 2.5rem', boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.1)', transition: 'all 0.3s ease'}}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Welcome back</h2>
            <p className="text-lg text-gray-300 font-light">Sign in to your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/10 border border-red-500/30 rounded-xl p-3 flex items-center space-x-2 backdrop-blur-sm">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-red-300 text-sm font-light">{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-field text-lg py-4 pl-12 pr-4"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="input-field text-lg py-4 pl-12 pr-12"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center pt-2">
              {/* <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-400 focus:ring-blue-500 border-gray-600 rounded bg-black/60 backdrop-blur-sm"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300 font-light">
                  Remember me
                </label>
              </div> */}

              <div className="text-sm">
                <a href="#" className="font-light  text-blue-400 hover:text-blue-300 transition-all duration-300">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors duration-300 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed py-3"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
            
            <div className="text-center pt-4">
              <span className="text-gray-300 font-light text-sm">Don't have an account? </span>
              <Link to="/signup" className="font-medium text-blue-400 hover:text-blue-300 transition-all duration-300 text-sm">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;

