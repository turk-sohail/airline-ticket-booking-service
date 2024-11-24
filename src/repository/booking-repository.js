const { Booking } = require("../models");

class BookingRepository {
  async create(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      console.log("error create booking", error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const booking = await Booking.update(data, {
        where: {
          id,
        },
        returning: true,
      });
      return booking;
    } catch (error) {
      console.log("error update booking", error);
      throw error;
    }
  }
}

module.exports = {
  BookingRepository,
};
