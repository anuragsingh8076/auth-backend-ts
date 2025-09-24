
# Firebase Auth Backend

A **Node.js + TypeScript backend** for user authentication using **Firebase**, supporting **email/password signup & signin**, **Google Sign-In**, session cookies, and email verification links.

---

## Features

- Signup with email and password
- Signin with email and password
- Google Sign-In
- Session management using cookies
- Signout (clear session cookie)
- Generate email verification links
- Built with **Express**, **TypeScript**, and **Firebase Admin SDK**
- Secure with **Helmet** and **CORS** support

---

## Tech Stack

- Node.js
- TypeScript
- Express.js
- Firebase (Authentication)
- Axios (for Firebase REST API)
- Cookie-parser (for session cookies)
- Helmet & CORS (security & cross-origin support)

---

## Folder Structure



auth-backend-ts/
│
├─ src/
│ ├─ config/
│ │ └─ firebase.ts # Firebase Admin SDK initialization
│ ├─ controllers/
│ │ └─ authController.ts # Handles signup, signin, Google sign-in, signout, email verification
│ ├─ routes/
│ │ ├─ authRoutes.ts # Routes for authentication endpoints
│ │ └─ protectedRoutes.ts # Routes for authenticated users
│ ├─ utils/
│ │ └─ validator.ts # Email validation utility
│ └─ index.ts # Entry point, Express server setup
│
├─ .env # Environment variables
├─ package.json
├─ tsconfig.json
└─ README.md


---

## Environment Variables (`.env`)

```env
FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
FIREBASE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID

PORT=4000
SESSION_COOKIE_NAME=session
SESSION_EXPIRE_DAYS=14
CORS_ORIGIN=http://localhost:3000
SERVICE_ACCOUNT_PATH=./serviceAccountKey.json

Installation

Clone the repo:

git clone https://github.com/anuragsingh8076/auth-backend-ts.git
cd auth-backend-ts


Install dependencies:

npm install


Create a .env file with your Firebase credentials and configuration.

Start the development server:

npm run dev


Server will run on: http://localhost:4000

API Endpoints
Method	Endpoint	Description
POST	/api/auth/signup	Create a new user (email/password)
POST	/api/auth/signin	Sign in user (email/password)
POST	/api/auth/google-signin	Sign in with Google
POST	/api/auth/signout	Sign out (clear session cookie)
POST	/api/auth/generate-email-verification	Generate Firebase email verification link
Example Request (Postman)

Signup:

POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "displayName": "John Doe"
}


Response:

{
  "message": "User created",
  "idToken": "...",
  "refreshToken": "...",
  "uid": "..."
}

Notes

Make sure serviceAccountKey.json is not pushed to GitHub (add it to .gitignore).

Session cookies are HTTP-only and secure for production environments.

Use Postman or frontend to test the API.

License

MIT © Anurag Singh
