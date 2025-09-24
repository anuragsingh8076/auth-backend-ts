import { Request, Response, NextFunction } from "express";
import admin from "../config/firebase";
import { error } from "console";


const cookieName = process.env.SESSION_COOKIE_NAME || "session"

export interface AuthenticatedRequest extends Request {
   user? : admin.auth.DecodedIdToken;
   
}


export async function firebaseAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const sessionCookie = req.cookies?.[cookieName];
    const authorization = req.headers.authorization || "";
    const bearer = authorization.startsWith("Bearer ") ? authorization.split("Bearer ")[1] : null;
    const idToken = bearer || (req.body?.idToken as string) || (req.query?.idToken as string);

    if (sessionCookie) {
      const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
      req.user = decodedClaims
      return next();
    }
    if (idToken) {
      const decoded = await admin.auth().verifyIdToken(idToken);
      req.user = decoded;
      return next();
    }

    return res.status(401).json({ message: "Unauthorized"})

  } catch (err) {
    console.error("auth middleware error:", err)
    return res.status(401).json({ message: "Invalid or expired token"})
  }
}