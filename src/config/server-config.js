const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const FLIGHT_SERVICE_URI = process.env.FLIGHT_SERVICE_URI;

module.exports = {
  PORT,
  FLIGHT_SERVICE_URI,
};
