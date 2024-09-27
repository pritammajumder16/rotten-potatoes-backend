import Router from "express";
import loginRoutes from "./login";
import logoutRoutes from "./logout";
import signupRoutes from "./signup";
import refreshTokenRoutes from "./refreshToken";

const router = Router();

router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/sign-up", signupRoutes);
router.use("/refresh-token", refreshTokenRoutes);

export default router;
