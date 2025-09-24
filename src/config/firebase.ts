import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();


const serviceAccountPath = path.resolve(__dirname, "..", process.env.SERVICE_ACCOUNT_PATH!);

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(`Service account file not found at path: ${serviceAccountPath}`);
}


const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));


try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log(" Firebase Admin initialized successfully");
} catch (err) {
  console.error(" Firebase initialization error:", err);
  process.exit(1);
}

export default admin;
