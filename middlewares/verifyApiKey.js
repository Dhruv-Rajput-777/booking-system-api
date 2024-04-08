const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  const validApiKey = "dummy-api-key";

  if (apiKey === validApiKey) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized: Invalid API key." });
  }
};

export default verifyApiKey;
