# Firebase Setup Guide for BridgeLink

## Your Firebase Project Details
- **Project Name**: BridgeLink
- **Project ID**: bridgelink-677b8
- **Project Number**: 322497037155
- **Web API Key**: AIzaSyAFMBU5ItDCvEz_sE0vGrg1cUJ4admi-gs

## Required Firebase Services Setup

### 1. Authentication Setup
1. Go to [Firebase Console](https://console.firebase.google.com/project/bridgelink-677b8)
2. Navigate to **Authentication** → **Sign-in method**
3. Enable **Email/Password** authentication
4. Configure email verification settings:
   - Go to **Authentication** → **Templates**
   - Customize the email verification template if needed

### 2. Firestore Database Setup
1. Go to **Firestore Database** in the Firebase Console
2. Click **Create database**
3. Choose **Start in test mode** (we'll update rules later)
4. Select a location (choose closest to your users)

### 3. Deploy Security Rules
1. Go to **Firestore Database** → **Rules**
2. Replace the default rules with the content from `firestore.rules` file
3. Click **Publish**

### 4. Deploy Database Indexes
1. Go to **Firestore Database** → **Indexes**
2. Click **Import from file**
3. Upload the `firestore.indexes.json` file
4. Click **Import**

### 5. Get App ID (if needed)
1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. If you don't have a web app, click **Add app** → **Web**
4. Register your app and get the App ID
5. Update the `VITE_FIREBASE_APP_ID` in your `.env` file

## Environment Variables
Your `.env` file is already configured with:
```env
VITE_FIREBASE_API_KEY=AIzaSyAFMBU5ItDCvEz_sE0vGrg1cUJ4admi-gs
VITE_FIREBASE_AUTH_DOMAIN=bridgelink-677b8.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=bridgelink-677b8
VITE_FIREBASE_STORAGE_BUCKET=bridgelink-677b8.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=322497037155
VITE_FIREBASE_APP_ID=1:322497037155:web:your-app-id
```

## Testing the Setup
1. Start the development server: `npm run dev`
2. Open `http://localhost:5173`
3. Try to sign up with a test email
4. Check the Firebase Console to see if the user appears in Authentication

## Security Rules Overview
The provided `firestore.rules` include:
- Users can only read/write their own data in `/users` collection
- Branch-specific access control for students/alumni directories
- Admin access to all data in their branch
- Metrics collection is read-only for admins

## Next Steps
1. Complete the Firebase setup above
2. Test user registration and authentication
3. Deploy to Firebase Hosting when ready
4. Set up Cloud Functions for advanced features (Phase 2+)
