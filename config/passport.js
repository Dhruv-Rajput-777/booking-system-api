// config/passport.js
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/user.js"; 

// Custom LocalStrategy that uses contact_number instead of username
const CustomLocalStrategy = new LocalStrategy(
  {
    usernameField: "contact_number", 
    passwordField: "password",
  },
  async (contact_number, password, done) => {
    try {
      const user = await User.findOne({ where: { contact_number } });
      if (!user) {
        return done(null, false, { message: "Incorrect contact number." });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

export default function passportConfig(passport) {
  passport.use(CustomLocalStrategy);

  passport.serializeUser((user, done) => {
    // console.log("Serializing user:", user);
    done(null, user.uniqno);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}
