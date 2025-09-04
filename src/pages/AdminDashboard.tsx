import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Users, GraduationCap, UserCheck, TrendingUp, Search, Filter, Download } from 'lucide-react';
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

interface DashboardStats {
  totalStudents: number;
  totalAlumni: number;
  totalAdmins: number;
  recentSignups: number;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalAlumni: 0,
    totalAdmins: 0,
    recentSignups: 0
  });
  const [students, setStudents] = useState<AppUser[]>([]);
  const [alumni, setAlumni] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    branch: user?.branch || '',
    search: ''
  });

  useEffect(() => {
    // In a real app, this would fetch data from Firestore
    // For now, we'll use mock data
    setStats({
      totalStudents: 150,
      totalAlumni: 89,
      totalAdmins: 3,
      recentSignups: 12
    });

    // Mock data for students and alumni
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
      }
    ];

    const mockAlumni: AppUser[] = [
      {
        uid: '3',
        email: 'alex.johnson@university.edu',
        firstName: 'Alex',
        lastName: 'Johnson',
        role: 'alumni',
        branch: user?.branch || 'Computer Science',
        batchYear: 2020,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailVerified: true
      }
    ];

    setStudents(mockStudents);
    setAlumni(mockAlumni);
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

  const filteredAlumni = alumni.filter(alumnus => {
    if (filters.search && !`${alumnus.firstName} ${alumnus.lastName}`.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.batchYear && alumnus.batchYear !== filters.batchYear) {
      return false;
    }
    return true;
  });

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
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage students and alumni for {user?.branch} branch</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-primary-500/10 rounded-lg">
                <GraduationCap className="w-6 h-6 text-primary-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Students</p>
                <p className="text-2xl font-bold text-white">{stats.totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <UserCheck className="w-6 h-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Alumni</p>
                <p className="text-2xl font-bold text-white">{stats.totalAlumni}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Admins</p>
                <p className="text-2xl font-bold text-white">{stats.totalAdmins}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Recent Signups</p>
                <p className="text-2xl font-bold text-white">{stats.recentSignups}</p>
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
                  placeholder="Search by name..."
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

        {/* Students Section */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Students ({filteredStudents.length})</h2>
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Batch Year</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.uid} className="border-b border-dark-700 hover:bg-dark-700/50">
                    <td className="py-3 px-4 text-white">
                      {student.firstName} {student.lastName}
                    </td>
                    <td className="py-3 px-4 text-gray-400">{student.email}</td>
                    <td className="py-3 px-4 text-gray-400">{student.batchYear}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        student.emailVerified 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {student.emailVerified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alumni Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Alumni ({filteredAlumni.length})</h2>
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Batch Year</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlumni.map((alumnus) => (
                  <tr key={alumnus.uid} className="border-b border-dark-700 hover:bg-dark-700/50">
                    <td className="py-3 px-4 text-white">
                      {alumnus.firstName} {alumnus.lastName}
                    </td>
                    <td className="py-3 px-4 text-gray-400">{alumnus.email}</td>
                    <td className="py-3 px-4 text-gray-400">{alumnus.batchYear}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        alumnus.emailVerified 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {alumnus.emailVerified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
