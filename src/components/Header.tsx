import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, LogOut, GraduationCap } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    return `/${user.role}/dashboard`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div 
        className="w-full flex justify-center transition-all duration-300"
        style={{ 
          paddingTop: isScrolled ? '1rem' : '1.5rem' 
        }}
      >
        <div className={`transition-all duration-300 ${
          isScrolled 
            ? 'w-full max-w-4xl rounded-2xl bg-black/60 backdrop-blur-lg border border-gray-400/30 shadow-2xl py-2' 
            : 'w-full max-w-7xl bg-transparent'
        }`}>
          <div className={`flex items-center h-12 transition-all duration-300 ${
            isScrolled ? 'px-8' : 'px-8'
          }`}>
            {/* Left side - Brand and Home */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center space-x-3">
                <AnimatedLogo size="md" />
                <span className="text-xl font-bold text-white">BridgeLink</span>
              </Link>
              <Link 
                to="/" 
                className="hidden md:block text-gray-300 hover:text-white transition-colors hover:scale-110 transition-transform duration-200"
              >
                Home
              </Link>
            </div>

            {/* Right side - Navigation */}
            <div className="flex-1 flex justify-end">
              <nav className="hidden md:flex items-center gap-6">
                {user ? (
                  <>
                    <Link to={getDashboardLink()} className="text-gray-300 hover:text-white transition-colors">
                      Dashboard
                    </Link>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="w-4 h-4" />
                        <span className="text-gray-300">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-gray-300 hover:text-white transition-colors hover:scale-110 transition-transform duration-200">
                      Login
                    </Link>
                    <Link to="/signup" className="text-gray-300 hover:text-white transition-colors font-semibold hover:scale-110 transition-transform duration-200">
                      Sign Up
                    </Link>
                  </>
                )}
              </nav>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className={`md:hidden transition-all duration-300 ${
              isScrolled 
                ? 'mt-2 mx-6 rounded-xl bg-black/60 backdrop-blur-lg border border-gray-400/30' 
                : 'mt-4 bg-black/80 backdrop-blur-lg border border-gray-400/30 rounded-xl'
            }`}>
              <div className="px-4 pt-4 pb-4 space-y-2">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {user ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="px-3 py-2 text-sm text-gray-400">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

