// routes/tickets.js
import express from "express";
import { bookTicket, viewTicket } from "../controllers/ticket.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import passport from "passport";

const router = express.Router();

// router.post("/book", isAuthenticated, bookTicket);
// router.post("/view", isAuthenticated, viewTicket);
router.post("/book", bookTicket);
router.post("/view", viewTicket);

export default router;
