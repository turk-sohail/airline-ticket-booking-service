const { FLIGHT_SERVICE_URI, QUEUE_NAME } = require("../config/server-config");
const { BookingRepository } = require("../repository/booking-repository");
const axios = require("axios");
const RabbitMQ = require("../utils/rmq");
const rmq = new RabbitMQ();
(async () => {
  // Call async functions here
  await rmq.connect();
})();
class BookingService {
  constructor() {
    this.BookingRepository = new BookingRepository();
  }

  async create(data) {
    try {
      const flightId = data.flightId;
      const getFlightUrl = `${FLIGHT_SERVICE_URI}/api/v1/flights/${flightId}`;
      const response = await axios.get(getFlightUrl);
      const flight = response.data.data;
      const flightPrice = flight.price;
      if (data.noOfSeats > flight.noOfSeats) {
        throw new Error("Seats not available");
      }
      const totalCost = flightPrice * data.noOfSeats;
      const bookingPayload = { ...data, totalCost };
      const booking = await this.BookingRepository.create(bookingPayload);
      const updateFlightUrl = `${FLIGHT_SERVICE_URI}/api/v1/flights/${booking.flightId}`;
      await axios.patch(updateFlightUrl, {
        totalSeats: flight.totalSeats - data.noOfSeats,
      });
      const finalBooking = await this.BookingRepository.update(booking.id, {
        status: "Booked",
      });

      return finalBooking;
    } catch (error) {
      console.log("error create booking", error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const booking = await this.BookingRepository.update(id, data);
      return booking;
    } catch (error) {
      console.log("error update booking", error);
      throw error;
    }
  }

  async cancel(id) {
    try {
      const booking = await this.BookingRepository.update(id, {
        status: "Cancelled",
      });
      return booking;
    } catch (error) {
      console.log("error cancel booking", error);
      throw error;
    }
  }

  async sendToQueue() {
    try {
      const emailPayload = {
        subject: "Booking Confirmed",
        recipientEmail: "charo@example.com",
        status: "PENDING",
        notificationTime: "2024-12-02 14:22:03.313 +0500",
        contents: "your booking has been fuccked",
      };
      return await rmq.publish(
        QUEUE_NAME,
        Buffer.from(JSON.stringify(emailPayload))
      );
    } catch (error) {
      console.log("error sending data to queue", error);
      throw error;
    }
  }
}

module.exports = BookingService;
