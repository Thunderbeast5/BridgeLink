import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, GraduationCap, AlertCircle, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Stepper } from '../components/ui/stepper';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface SignUpData {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  role: 'alumni' | 'student';
  branch: string;
  batchYear: number;
}

const NewSignupPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'alumni' | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SignUpData>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
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

  const steps = ['Personal Info', 'Academic Info', 'Account Setup'];

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

  const handleRoleSelection = (role: 'student' | 'alumni') => {
    setSelectedRole(role);
    setFormData(prev => ({ ...prev, role }));
    setCurrentStep(0);
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

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setSelectedRole(null);
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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderRoleSelection = () => (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          What brings you to BridgeLink?
        </h1>
        <p className="text-xl text-gray-300 mb-16 max-w-2xl mx-auto font-light">
          Choose your role to get started with the registration process
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Student Option */}
          <button
            onClick={() => handleRoleSelection('student')}
            className="group relative p-8 bg-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl hover:border-blue-500/50 hover:bg-black/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-400/8 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-inner shadow-blue-500/10"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-black/60 border border-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-500">
                <GraduationCap className="w-8 h-8 text-blue-400 group-hover:text-blue-300" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4 tracking-wide">I'm a Student</h3>
              <p className="text-gray-300 leading-relaxed font-light">
                Find work & manage your academic journey
              </p>
            </div>
          </button>

          {/* Alumni Option */}
          <button
            onClick={() => handleRoleSelection('alumni')}
            className="group relative p-8 bg-black/80 
            
            drop-blur-sm border border-gray-800 rounded-2xl hover:border-blue-500/50 hover:bg-black/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-400/8 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-inner shadow-blue-500/10"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-black/60 border border-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-500">
                <User className="w-8 h-8 text-blue-400 group-hover:text-blue-300" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4 tracking-wide">I'm an Alumni</h3>
              <p className="text-gray-300 leading-relaxed font-light">
                Post opportunities & discover talents
              </p>
            </div>
          </button>
        </div>

        <div className="mt-16">
          <Link to="/login" className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:glow-blue font-light">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="input-field text-xl py-6 px-6"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <input
                id="middleName"
                name="middleName"
                type="text"
                className="input-field text-xl py-6 px-6"
                placeholder="Middle Name"
                value={formData.middleName}
                onChange={handleInputChange}
              />
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="input-field text-xl py-6 px-6"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div className="space-y-6">
            <select
  id="branch"
  name="branch"
  required
  className="input-field text-xl py-6 px-6"
  style={{
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '1rem center',
    backgroundSize: '1.5rem',
    paddingRight: '3rem'
  }}
  value={formData.branch}
  onChange={handleInputChange}
>
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
              <input
                id="batchYear"
                name="batchYear"
                type="number"
                min="2000"
                max={new Date().getFullYear() + 4}
                required
                className="input-field text-xl py-6 px-6"
                placeholder="Batch Year"
                value={formData.batchYear}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Email */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                  <Mail className="h-7 w-7 text-gray-300" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`input-field text-xl py-6 pl-16 pr-6 ${emailDomainError ? 'border-red-500' : ''}`}
                  placeholder="College Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {formData.email && !emailDomainError && (
                  <div className="absolute inset-y-0 right-0 pr-5 flex items-center">
                    <CheckCircle className="h-7 w-7 text-green-500" />
                  </div>
                )}
              </div>
              {emailDomainError && (
                <p className="text-sm text-red-400">{emailDomainError}</p>
              )}

              {/* Password */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                  <Lock className="h-7 w-7 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="input-field text-xl py-6 pl-16 pr-16"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-5 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-7 w-7 text-gray-400 hover:text-gray-300" />
                  ) : (
                    <Eye className="h-7 w-7 text-gray-400 hover:text-gray-300" />
                  )}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                  <Lock className="h-7 w-7 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="input-field text-xl py-6 pl-16 pr-16"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-5 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-7 w-7 text-gray-400 hover:text-gray-300" />
                  ) : (
                    <Eye className="h-7 w-7 text-gray-400 hover:text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        {renderRoleSelection()}
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="min-h-screen flex items-center justify-center py-16 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/4 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl w-full mx-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgb(31, 41, 55)', borderRadius: '1.5rem', padding: '3rem 4rem', boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.1)', transition: 'all 0.3s ease'}}>
          {/* Stepper */}
          <Stepper steps={steps} currentStep={currentStep} className="mb-8" />

          {error && (
            <div className="bg-red-900/10 border border-red-500/30 rounded-xl p-4 flex items-center space-x-2 backdrop-blur-sm">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-300 text-sm font-light">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 mt-8">
              <button
                type="button"
                onClick={handleBack}
                className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-lg">Back</span>
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    (currentStep === 0 && (!formData.firstName || !formData.lastName)) ||
                    (currentStep === 1 && (!formData.branch || !formData.batchYear))
                  }
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                  >
                  <span className="text-lg">Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !!emailDomainError || !formData.email || !formData.password || !confirmPassword}
                  className="text-blue-300 hover:text-blue-400 transition-colors duration-300 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              )}
            </div>
          </form>

          <div className="text-center pt-4">
            <span className="text-gray-300 font-light">Already have an account? </span>
            <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-all duration-300">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewSignupPage;
