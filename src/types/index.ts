export interface User {
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

export interface BranchMetrics {
  studentCount: number;
  alumniCount: number;
  adminCount: number;
}

export interface BranchYearMetrics {
  studentCount: number;
  alumniCount: number;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  sendEmailVerification: () => Promise<void>;
}

export interface SignUpData {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  role: 'alumni' | 'student';
  branch: string;
  batchYear: number;
}

export interface FilterOptions {
  branch?: string;
  batchYear?: number;
  role?: 'admin' | 'alumni' | 'student';
  search?: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalAlumni: number;
  totalAdmins: number;
  recentSignups: number;
}

export interface VideoCarouselItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  ctaText: string;
  ctaLink: string;
}
