// routes/trains.js
import express from "express";
import verifyApiKey from "../middlewares/verifyApiKey.js";
import {
  addTrainDetails,
  searchTrainByRoute,
  searchTrains,
} from "../controllers/trains.js";

const router = express.Router();

router.post("/add-train", verifyApiKey, addTrainDetails);
router.get("/search", searchTrains);
router.get("/search-by-route", searchTrainByRoute);

export default router;
