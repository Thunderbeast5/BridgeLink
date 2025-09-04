import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, Search, Filter, MessageCircle, Star, MapPin, Briefcase } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, FilterOptions } from '../types';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [alumni, setAlumni] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    branch: user?.branch || '',
    search: ''
  });

  useEffect(() => {
    // Mock data for alumni in the same branch
    const mockAlumni: User[] = [
      {
        uid: '1',
        email: 'alex.johnson@university.edu',
        firstName: 'Alex',
        lastName: 'Johnson',
        role: 'alumni',
        branch: user?.branch || 'Computer Science',
        batchYear: 2020,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: true
      },
      {
        uid: '2',
        email: 'sarah.williams@university.edu',
        firstName: 'Sarah',
        lastName: 'Williams',
        role: 'alumni',
        branch: user?.branch || 'Computer Science',
        batchYear: 2019,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: true
      },
      {
        uid: '3',
        email: 'david.brown@university.edu',
        firstName: 'David',
        lastName: 'Brown',
        role: 'alumni',
        branch: user?.branch || 'Computer Science',
        batchYear: 2021,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: true
      }
    ];

    setAlumni(mockAlumni);
    setLoading(false);
  }, [user]);

  const handleFilterChange = (key: keyof FilterOptions, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredAlumni = alumni.filter(alumnus => {
    if (filters.search && !`${alumnus.firstName} ${alumnus.lastName}`.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.batchYear && alumnus.batchYear !== filters.batchYear) {
      return false;
    }
    return true;
  });

  const handleMentorshipRequest = (alumnusId: string) => {
    // In a real app, this would send a mentorship request
    console.log('Sending mentorship request to alumnus:', alumnusId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Student Dashboard</h1>
          <p className="text-gray-400">Connect with alumni from {user?.branch} branch</p>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-primary-500/10 rounded-lg">
                <Users className="w-6 h-6 text-primary-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Alumni</p>
                <p className="text-2xl font-bold text-white">{alumni.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <MessageCircle className="w-6 h-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Active Mentorships</p>
                <p className="text-2xl font-bold text-white">1</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Star className="w-6 h-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Featured Alumni</p>
                <p className="text-2xl font-bold text-white">5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search alumni by name..."
                  className="input-field pl-10"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
            </div>
            <div className="lg:w-48">
              <select
                className="input-field"
                value={filters.batchYear || ''}
                onChange={(e) => handleFilterChange('batchYear', e.target.value ? parseInt(e.target.value) : '')}
              >
                <option value="">All Years</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <button className="btn-secondary flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Alumni Directory */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Alumni Directory ({filteredAlumni.length})</h2>
            <p className="text-sm text-gray-400">Connect with successful alumni from your branch</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((alumnus) => (
              <div key={alumnus.uid} className="bg-dark-700 rounded-lg p-6 hover:bg-dark-600 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {alumnus.firstName} {alumnus.lastName}
                    </h3>
                    <p className="text-gray-400 text-sm">{alumnus.email}</p>
                    <p className="text-primary-400 text-sm">Batch {alumnus.batchYear}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-500" />
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Branch:</span>
                    <span className="text-white">{alumnus.branch}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Experience:</span>
                    <span className="text-white">{new Date().getFullYear() - alumnus.batchYear} years</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-400">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Briefcase className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-400">Software Engineer at Google</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-dark-600">
                  <button
                    onClick={() => handleMentorshipRequest(alumnus.uid)}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Request Mentorship</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredAlumni.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No alumni found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
