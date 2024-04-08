// routes/auth.js
import express from "express";
import passport from "passport";

import { registerUser, loginUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", passport.authenticate("local"), loginUser);

export default router;
