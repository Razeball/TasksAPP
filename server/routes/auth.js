import { Router } from "express";
import {
  changeUser,
  login,
  register,
  updateUser,
} from "../controllers/authController.js";
import passport from "passport";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post(
  "/check",
  passport.authenticate("jwt", { session: false }),
  changeUser
);
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  updateUser
);
export default router;
