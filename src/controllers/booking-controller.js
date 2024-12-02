const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services");

const bookingService = new BookingService();

const create = async (req, res) => {
  try {
    const data = req.body;
    const response = await bookingService.create(data);
    return res.status(StatusCodes.OK).json({
      error: {},
      message: "Successfully completed request",
      data: response,
    });
  } catch (error) {
    console.log("error create booking", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error,
      message: "Something went wrong",
      data: {},
    });
  }
};

const sendDataToQueue = async (req, res) => {
  try {
    return await bookingService.sendToQueue();
  } catch (error) {
    console.log("error sending data to queue", error);
    throw error;
  }
};

module.exports = {
  create,
  sendDataToQueue,
};
