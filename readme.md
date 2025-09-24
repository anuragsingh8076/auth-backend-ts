# Firebase Auth Backend

A **Node.js + TypeScript backend** for authentication using Firebase.  
Supports **email/password signup & signin**, **Google Sign-In**, **session cookies**, and **email verification links**.  

---

## Features

- **Email & Password Authentication**
- **Google Sign-In**
- **Session Management with Cookies**
- **Email Verification Link Generation**
- **Protected Routes Example**
- **CORS & Security Headers Configured**

---

## File Structure

auth-backend-ts/
│
├─ src/
│ ├─ config/
│ │ └─ firebase.ts # Firebase initialization
│ │
│ ├─ controllers/
│ │ └─ authController.ts # Handles signup, signin, Google signin, signout, email verification
│ │
│ ├─ routes/
│ │ ├─ authRoutes.ts # Authentication routes
│ │ └─ protectedRoutes.ts # Example of protected routes
│ │
│ ├─ utils/
│ │ └─ validator.ts # Email validation utility
│ │
│ └─ index.ts # Express server entry point
│
├─ .env # Environment variables
├─ package.json
├─ tsconfig.json
└─ serviceAccountKey.json # Firebase service account

yaml
Copy code

---

## Setup

1. **Clone the repository**

```bash
git clone https://github.com/anuragsingh8076/firebase-auth-backend.git
cd firebase-auth-backend
Install dependencies

bash
Copy code
npm install
Configure environment variables

Create a .env file with:

ini
Copy code
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
PORT=4000
SESSION_COOKIE_NAME=session
SESSION_EXPIRE_DAYS=14

SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
Start the development server

bash
Copy code
npm run dev
Server runs on: http://localhost:4000

API Endpoints
Auth Routes (/api/auth)
Method	Endpoint	Description
POST	/signup	Create user with email/password
POST	/signin	Sign in user with email/password
POST	/google-signin	Sign in using Google ID token
POST	/signout	Sign out user (clears session cookie)
POST	/generate-email-verification	Generate email verification link

Protected Routes (/api/...)
Example route to test authentication with session cookie

Usage
Test API with Postman or frontend app

Send JSON body for signup/signin:

json
Copy code
{
  "email": "user@example.com",
  "password": "password123",
  "displayName": "John Doe" // optional for signup
}
For Google Sign-In, send:

json
Copy code
{
  "idToken": "<GOOGLE_ID_TOKEN>"
}
Notes
Ensure serviceAccountKey.json is in the project root.

Cookies are HTTP-only and secure in production.

CORS is configured for http://localhost:3000 by default.

Author
Anurag Singh