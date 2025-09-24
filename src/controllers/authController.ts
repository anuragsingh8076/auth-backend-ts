import { Request, Response } from "express"

import axios from "axios";


import admin from "../config/firebase"

import { isEmail } from "../utils/validator";




const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY!;

const signUpEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
const signInEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;


 const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "session";
 const expiresIn = Number(process.env.SESSION_EXPIRE_DAYS || 14) * 24 * 60 * 60 * 1000

 export async function signup(req: Request, res: Response) {
  try {
        const { email, password, displayName } = req.body as { email: string; password: string; displayName?: string };
    if (!email || !password || !isEmail(email)) return res.status(400).json({ error: "Valid email and password required" });

    const { data } = await axios.post(signUpEndpoint, { email, password, returnSecureToken: true });

    if (displayName) await admin.auth().updateUser(data.localId, { displayName });

    const sessionCookie = await admin.auth().createSessionCookie(data.idToken, { expiresIn });
    res.cookie(SESSION_COOKIE_NAME, sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" });

    return res.status(201).json({ message: "User created", idToken: data.idToken, refreshToken: data.refreshToken, uid: data.localId });
  } catch (err: any) {
    const message = err.response?.data?.error?.message || err.message;
    return res.status(400).json({ error: message });
  }
 }


 export async function signin(req: Request, res: Response) {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password || !isEmail(email)) return res.status(400).json({ error: "Valid email and password required" });

    const { data } = await axios.post(signInEndpoint, { email, password, returnSecureToken: true });

    const sessionCookie = await admin.auth().createSessionCookie(data.idToken, { expiresIn });
    res.cookie(SESSION_COOKIE_NAME, sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" });

    return res.json({ message: "Signed in", idToken: data.idToken, refreshToken: data.refreshToken, uid: data.localId });
  } catch (err: any) {
    const message = err.response?.data?.error?.message || err.message;
    return res.status(400).json({ error: message });
  }
}




export async function googleSignin(req: Request, res: Response) {
  try {
    const { idToken } = req.body as { idToken: string };
    if (!idToken) return res.status(400).json({ error: "idToken required" });

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

    res.cookie(SESSION_COOKIE_NAME, sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" });
    return res.json({ message: "Google signin successful", uid: decodedToken.uid, decodedToken });
  } catch (err) {
    return res.status(401).json({ error: "Invalid ID token" });
  }
}




export async function signout(_req: Request, res: Response) {
  res.clearCookie(SESSION_COOKIE_NAME);
  return res.json({ message: "Signed out (cookie cleared)" });
}

export async function generateEmailVerificationLink(req: Request, res: Response) {
  try {
    const { email } = req.body as { email: string };
    if (!email || !isEmail(email)) return res.status(400).json({ error: "Valid email required" });

    const link = await admin.auth().generateEmailVerificationLink(email);
    return res.json({ message: "Verification link generated", link });
  } catch {
    return res.status(500).json({ error: "Failed to generate link" });
  }
}

