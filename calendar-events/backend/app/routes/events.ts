import express from "express";

import * as eventController from "../controllers/events/event.js";
import * as userController from "../controllers/users/users.js";

const router = express.Router();

// Users route
router.get("/users", userController.fetchAllUsers);

// Events route
router.post("/", eventController.addEvents);
router.get("/", eventController.fetchAllEvents);
router.patch("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

export default router;
