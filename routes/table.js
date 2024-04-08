// routes/auth.js
import express from "express";
import User from "../models/user.js";
import Trains from "../models/trains.js";
import Ticket from "../models/ticket.js";

const router = express.Router();

router.get("/get-users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.get("/get-trains", async (req, res) => {
  try {
    const trains = await Trains.findAll();
    res.json(trains);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching trains" });
  }
});

router.get("/get-tickets", async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tickets" });
  }
});

export default router;
