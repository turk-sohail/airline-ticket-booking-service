const express = require("express");
const { bookingController } = require("../../controllers");
const router = express.Router();

router.post("/bookings", bookingController.create);
router.get("/send-data", bookingController.sendDataToQueue);

module.exports = router;
