import { Router } from "express";
import { signup, signin, googleSignin, signout, generateEmailVerificationLink} from "../controllers/authController"



const router = Router();


router.post("/signup", signup)
router.post("/signin", signin)
router.post("/google-signin", googleSignin)
router.post("/signout", signout)
router.post("/generate-email-verification", generateEmailVerificationLink)


export default router;