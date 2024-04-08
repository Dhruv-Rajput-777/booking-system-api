import dotenv from "dotenv";
dotenv.config();

import express, { urlencoded } from "express";
import sequelize from "./config/db.js";
import session from "express-session";
import passport from "passport";
import passportConfig from "./config/passport.js";
import cors from "cors";


const app = express();

// import routes
import authRoutes from "./routes/auth.js";
import tableRoutes from "./routes/table.js";
import trainRoutes from "./routes/trains.js";
import ticketRoutes from "./routes/ticket.js";

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

// passport middleware
app.use(
  session({
    secret: "ksafjs;alkdfjsalkfj",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// routes
app.use("/auth", authRoutes);
app.use("/", tableRoutes);
app.use("/trains", trainRoutes);
app.use("/ticket", ticketRoutes);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

testConnection();

app.listen(process.env.PORT || 3000, () => console.log("Server Running at port 3000"));
