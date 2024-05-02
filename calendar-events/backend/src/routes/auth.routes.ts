import axios from "axios";
import express from "express";
import jwt from "jsonwebtoken";

import { getAuthParams, getConfig, getTokenParams } from "../../config";
import { addUser } from "../services/users/users.service";

const router = express.Router();

// Users route
router.get("/url", (_, res) => {
  const config = getConfig();
  const authParams = getAuthParams();

  res.json({
    url: `${config.authUrl}?${authParams}`,
  });
});

router.get("/token", async (req, res) => {
  const config = getConfig();

  const { code } = req.query;

  if (!code) {
    return res
      .status(400)
      .json({ message: "Authorization code must be provided" });
  }

  try {
    // Get all parameters needed to hit authorization server
    const tokenParam = getTokenParams(code);
    // Exchange authorization code for access token (id token is returned here too)
    const {
      data: { id_token },
    } = await axios.post(`${config.tokenUrl}?${tokenParam}`);

    if (!id_token) {
      return res.status(400).json({ message: "Auth error" });
    }

    // Get user info from id token
    const { email, name, picture } = jwt.decode(id_token);

    const user = { name, email, picture };
    // Sign a new token
    const token = jwt.sign({ user }, config.tokenSecret, {
      expiresIn: config.tokenExpiration,
    });

    // Set cookies for user
    res.cookie("token", token, {
      maxAge: config.tokenExpiration,
      secure: true,
      httpOnly: true,
    });

    // You can choose to store user in a DB instead

    const userObj = {
      name: user.name,
      email: user.email,
      created_at: new Date(),
    };

    const _user = addUser(userObj);
    res.json(_user);
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

router.get("/logged_in", (req, res) => {
  const config = getConfig();

  try {
    // Get token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.json({ loggedIn: false });
    }

    const { user } = jwt.verify(token, config.tokenSecret);

    const newToken = jwt.sign({ user }, config.tokenSecret, {
      expiresIn: config.tokenExpiration,
    });

    // Reset token in cookie
    res.cookie("token", newToken, {
      maxAge: config.tokenExpiration,
      httpOnly: true,
    });
    res.json({ loggedIn: true, user });
  } catch (err) {
    res.json({ loggedIn: false });
  }
});

router.post("/logout", (_, res) => {
  // clear cookie
  res.clearCookie("token").json({ message: "Logged out" });
});

export default router;
