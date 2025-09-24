import { Router, Response} from "express"
import { firebaseAuth, AuthenticatedRequest } from "../middleware/auth"



const router = Router();





router.get("/profile", firebaseAuth, (req: AuthenticatedRequest, res: Response) => res.json({ message: "Protected profile", user: req.user }));
router.get("/admin", firebaseAuth, (req: AuthenticatedRequest, res: Response) => res.json({ message: "Admin only area", uid: req.user?.uid }));


export default router;