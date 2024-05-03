import { getConfig } from "../../config";
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const config = getConfig();

  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, config.tokenSecret);

    return next();
  } catch (err) {
    console.error("Error: ", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};
