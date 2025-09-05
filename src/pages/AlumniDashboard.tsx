import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, Search, Filter, MessageCircle, UserPlus } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Define types directly in this file
interface AppUser {
  uid: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  role: 'admin' | 'alumni' | 'student';
  branch: string;
  batchYear: number;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
}

interface FilterOptions {
  branch?: string;
  batchYear?: number;
  role?: 'admin' | 'alumni' | 'student';
  search?: string;
}

const AlumniDashboard: React.FC = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    branch: user?.branch || '',
    search: ''
  });

  useEffect(() => {
    // Mock data for students in the same branch
    const mockStudents: AppUser[] = [
      {
        uid: '1',
        email: 'john.doe@university.edu',
        firstName: 'John',
        lastName: 'Doe',
        role: 'student',
        branch: user?.branch || 'Computer Science',
        batchYear: 2024,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: true
      },
      {
        uid: '2',
        email: 'jane.smith@university.edu',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'student',
        branch: user?.branch || 'Computer Science',
        batchYear: 2023,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: true
      },
      {
        uid: '3',
        email: 'mike.wilson@university.edu',
        firstName: 'Mike',
        lastName: 'Wilson',
        role: 'student',
        branch: user?.branch || 'Computer Science',
        batchYear: 2025,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: true
      }
    ];

    setStudents(mockStudents);
    setLoading(false);
  }, [user]);

  const handleFilterChange = (key: keyof FilterOptions, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredStudents = students.filter(student => {
    if (filters.search && !`${student.firstName} ${student.lastName}`.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.batchYear && student.batchYear !== filters.batchYear) {
      return false;
    }
    return true;
  });

  const handleMentorshipRequest = (studentId: string) => {
    // In a real app, this would send a mentorship request
    console.log('Sending mentorship request to student:', studentId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Alumni Dashboard</h1>
          <p className="text-gray-400">Connect with students from {user?.branch} branch</p>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-primary-500/10 rounded-lg">
                <Users className="w-6 h-6 text-primary-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-white">{students.length}</p>
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
                <p className="text-2xl font-bold text-white">3</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <UserPlus className="w-6 h-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Pending Requests</p>
                <p className="text-2xl font-bold text-white">2</p>
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
                  placeholder="Search students by name..."
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
                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
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

        {/* Students Directory */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Students Directory ({filteredStudents.length})</h2>
            <p className="text-sm text-gray-400">Connect with students from your branch</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div key={student.uid} className="bg-slate-700 rounded-lg p-6 hover:bg-slate-600 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {student.firstName} {student.lastName}
                    </h3>
                    <p className="text-gray-400 text-sm">{student.email}</p>
                    <p className="text-primary-400 text-sm">Batch {student.batchYear}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-500" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Branch:</span>
                    <span className="text-white">{student.branch}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      student.emailVerified 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {student.emailVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-600">
                  <button
                    onClick={() => handleMentorshipRequest(student.uid)}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Mentorship Request</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">No students found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AlumniDashboard;
