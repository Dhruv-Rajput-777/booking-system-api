import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
const registerUser = async (req, res) => {
  const { username, password, contact_number } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      contact_number,
    });
    const token = jwt.sign({ userId: user.id }, "your_secret_key", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
};

const loginUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = jwt.sign({ userId: req.user.id }, "aaslkdfj;slk", {
    expiresIn: "1h",
  });
  res.json({ token });
};

export { registerUser, loginUser };
