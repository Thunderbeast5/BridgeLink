# BridgeLink - Phase 1

A comprehensive platform connecting students and alumni across branches and batches, built with React, TypeScript, Tailwind CSS, and Firebase.

## Features

### Phase 1 (Current)
- **Dark, modern UI** inspired by ecell.in/nec and GoDaddy India
- **Video carousel hero section** on landing page
- **Unified authentication** with role-based access (Admin, Alumni, Student)
- **Email verification** with college domain enforcement
- **Role-based dashboards**:
  - **Admin**: Manage students and alumni, view statistics, export data
  - **Alumni**: Browse student directory, send mentorship requests
  - **Student**: Browse alumni directory, request mentorship
- **Responsive design** with mobile-first approach
- **Firebase integration** (Auth, Firestore, Functions)

### Future Phases
- Advanced networking features
- Group management
- Event hosting
- Job postings
- AI-powered matchmaking
- And much more...

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Functions)
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BridgeLink
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication and Firestore
   - Get your Firebase configuration

4. **Configure environment variables**
   - Copy `env.example` to `.env`
   - Add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── LoadingSpinner.tsx
│   └── ProtectedRoute.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── firebase/           # Firebase configuration
│   └── config.ts
├── pages/              # Page components
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── VerifyEmailPage.tsx
│   ├── AdminDashboard.tsx
│   ├── AlumniDashboard.tsx
│   └── StudentDashboard.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Firebase Setup

### Authentication
- Enable Email/Password authentication
- Configure email verification settings

### Firestore Database
The app uses a hybrid data model:

```
/users/{uid} {
  role, branch, batchYear, names, email, timestamps
}

/branches/{branch}/students/{uid}
/branches/{branch}/alumni/{uid}
/branches/{branch}/admins/{uid}

/metrics/branchYear/{branch}_{year} {
  studentCount, alumniCount
}
```

### Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Branch-specific collections
    match /branches/{branch}/{collection}/{userId} {
      allow read: if request.auth != null && 
        (request.auth.token.role == 'admin' || 
         (request.auth.token.branch == branch && 
          ((collection == 'students' && request.auth.token.role == 'alumni') ||
           (collection == 'alumni' && request.auth.token.role == 'student'))));
    }
  }
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email contact@bridgelink.edu or create an issue in the repository.