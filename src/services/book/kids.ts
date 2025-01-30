import { BookKidsEvent, BookKidsEventCreationAttributes } from "../../models/book/kids";
import { KidsEvent } from "../../models/event/kids";


export class KidsBookingService {
  async createBooking (data: BookKidsEventCreationAttributes) {
    const event = await KidsEvent.findByPk(data.kidsEventId);
    if (!event) throw new Error("Event not found");
    return await BookKidsEvent.create(data);
  }
  
  async getAllBookings() {
    return await BookKidsEvent.findAll();
  }

  async getBookingById(id: string) {
    const booking = await BookKidsEvent.findByPk(id);
    if (!booking) throw new Error("Booking not found");
    return booking;
  }

  async updateBooking(id: string, data: BookKidsEventCreationAttributes) {
    const event = await KidsEvent.findByPk(data.kidsEventId);
    if (!event) throw new Error("Event not found");

    const booking = await BookKidsEvent.findByPk(id);
    if (!booking) throw new Error("Booking not found");

    await booking.update(data);
    return booking;
  }

  async deleteBooking(id: string) {
    const deleted = await BookKidsEvent.destroy({ where: { id } });
    if (!deleted) throw new Error("Booking not found");
  }
}