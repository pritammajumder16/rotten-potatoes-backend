import Router from "express";
import loginRoutes from "./login";
import logoutRoutes from "./logout";
import signupRoutes from "./signup";
import veriyRoutes from "./verify";

const router = Router();

router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/sign-up", signupRoutes);
router.use("/verify", veriyRoutes);

export default router;
