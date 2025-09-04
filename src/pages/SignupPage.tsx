import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, GraduationCap, AlertCircle, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SignUpData } from '../types';

const SignupPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<SignUpData>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    role: (searchParams.get('role') as 'alumni' | 'student') || 'student',
    branch: '',
    batchYear: new Date().getFullYear()
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailDomainError, setEmailDomainError] = useState('');

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const branches = [
    'Computer Science',
    'Information Technology',
    'Electronics and Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Chemical Engineering',
    'Aerospace Engineering',
    'Biotechnology',
    'Business Administration'
  ];

  const validateEmailDomain = (email: string) => {
    const validDomains = ['@edu.in', '@university.edu', '@college.edu'];
    return validDomains.some(domain => email.endsWith(domain));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'email') {
      if (value && !validateEmailDomain(value)) {
        setEmailDomainError('Please use a valid college email domain (@edu.in, @university.edu, @college.edu)');
      } else {
        setEmailDomainError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!validateEmailDomain(formData.email)) {
      setError('Please use a valid college email domain');
      return;
    }

    setLoading(true);

    try {
      await signUp(formData);
      navigate('/verify-email');
    } catch (error: any) {
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

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
            <h2 className="text-3xl font-bold text-white">Create your account</h2>
            <p className="mt-2 text-gray-400">Join the BridgeLink community</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">I am a</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    formData.role === 'student'
                      ? 'border-primary-500 bg-primary-500/10 text-primary-400'
                      : 'border-dark-600 bg-dark-700 text-gray-300 hover:border-dark-500'
                  }`}
                >
                  <GraduationCap className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-medium">Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'alumni' }))}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    formData.role === 'alumni'
                      ? 'border-primary-500 bg-primary-500/10 text-primary-400'
                      : 'border-dark-600 bg-dark-700 text-gray-300 hover:border-dark-500'
                  }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-medium">Alumni</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="input-field"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="middleName" className="block text-sm font-medium text-gray-300 mb-2">
                    Middle Name
                  </label>
                  <input
                    id="middleName"
                    name="middleName"
                    type="text"
                    className="input-field"
                    placeholder="Middle name"
                    value={formData.middleName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="input-field"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  College Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`input-field pl-10 ${emailDomainError ? 'border-red-500' : ''}`}
                    placeholder="your.email@university.edu"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formData.email && !emailDomainError && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                {emailDomainError && (
                  <p className="mt-1 text-sm text-red-400">{emailDomainError}</p>
                )}
              </div>

              {/* Branch and Batch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="branch" className="block text-sm font-medium text-gray-300 mb-2">
                    Branch *
                  </label>
                  <select
                    id="branch"
                    name="branch"
                    required
                    className="input-field"
                    value={formData.branch}
                    onChange={handleInputChange}
                  >
                    <option value="">Select your branch</option>
                    {branches.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="batchYear" className="block text-sm font-medium text-gray-300 mb-2">
                    Batch Year *
                  </label>
                  <input
                    id="batchYear"
                    name="batchYear"
                    type="number"
                    min="2000"
                    max={new Date().getFullYear() + 4}
                    required
                    className="input-field"
                    placeholder="2024"
                    value={formData.batchYear}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    className="input-field pl-10 pr-10"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                    )}
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-400">Must be at least 6 characters</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    className="input-field pl-10 pr-10"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !!emailDomainError}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>

            <div className="text-center">
              <span className="text-gray-400">Already have an account? </span>
              <Link to="/login" className="font-medium text-primary-400 hover:text-primary-300">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignupPage;
