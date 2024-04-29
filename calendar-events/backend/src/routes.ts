import * as controller from "./controllers/events/event.controller";

const express = require("express");
const router = express.Router();

router.post("/", controller.addEvents);
router.get("/", controller.fetchAllEvents);
router.patch("/:id", controller.updateEvent);

module.exports = router;
