import { BookPrivateEvent, BookPrivateEventCreationAttributes } from "../../models/book/private";
import { PrivateEvent } from "../../models/event/private";

export class BookPrivateEventService {
  // Создание бронирования
  static async createBooking(data: BookPrivateEventCreationAttributes) {
    const event = await PrivateEvent.findByPk(data.privateEventId);
    if (!event) throw new Error("Event not found");

    return await BookPrivateEvent.create(data);
  }

  // Получить все бронирования
  static async getAllBookings() {
    return await BookPrivateEvent.findAll();
  }

  // Получить одно бронирование
  static async getBookingById(id: string) {
    const booking = await BookPrivateEvent.findByPk(id);
    if (!booking) throw new Error("Booking not found");
    return booking;
  }

  // Обновить бронирование
  static async updateBooking(id: string, data: BookPrivateEventCreationAttributes) {
    const event = await PrivateEvent.findByPk(data.privateEventId);
    if (!event) throw new Error("Event not found");

    const booking = await BookPrivateEvent.findByPk(id);
    if (!booking) throw new Error("Booking not found");

    return await booking.update(data);
  }

  // Удалить бронирование
  static async deleteBooking(id: string) {
    const deleted = await BookPrivateEvent.destroy({ where: { id } });
    if (!deleted) throw new Error("Booking not found");
    return deleted;
  }
}
