import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes";

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

app.get("/", (_req, res) => res.send("Firebase Auth Backend is running"));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
