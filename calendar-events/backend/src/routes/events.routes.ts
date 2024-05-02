import express from "express";

import * as eventController from "../controllers/events/event.controller";

const router = express.Router();

// Events route
router.post("/", eventController.addEvents);
router.get("/", eventController.fetchAllEvents);
router.patch("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

export default router;
