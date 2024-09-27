import Router from "express";
import authRoutes from "../controllers/auth";
const router = Router();

router.use("/auth", authRoutes);

export default router;
