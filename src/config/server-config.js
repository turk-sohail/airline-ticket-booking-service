const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const FLIGHT_SERVICE_URI = process.env.FLIGHT_SERVICE_URI;
const EXCHANGE_NAME = process.env.EXCHANGE_NAME;
const BINDING_KEY = process.env.BINDING_KEY;
const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = process.env.QUEUE_NAME;

module.exports = {
  PORT,
  FLIGHT_SERVICE_URI,
  EXCHANGE_NAME,
  BINDING_KEY,
  RABBITMQ_URL,
  QUEUE_NAME,
};
