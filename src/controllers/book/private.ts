import { Request, Response, NextFunction } from "express";
import { BookPrivateEventService } from "../../services/book/private";

export class BookPrivateEventController {
  // Создание бронирования
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newBooking = await BookPrivateEventService.createBooking(req.body);
      res.status(201).json(newBooking);
    } catch (error) {
      next(error); // Передаем ошибку в middleware
    }
  }

  // Получить все бронирования
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const bookings = await BookPrivateEventService.getAllBookings();
      res.status(200).json(bookings);
    } catch (error) {
      next(error);
    }
  }

  // Получить одно бронирование
  static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const booking = await BookPrivateEventService.getBookingById(req.params.id);
      res.status(200).json(booking);
    } catch (error) {
      next(error);
    }
  }

  // Обновить бронирование
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedBooking = await BookPrivateEventService.updateBooking(req.params.id, req.body);
      res.status(200).json(updatedBooking);
    } catch (error) {
      next(error);
    }
  }

  // Удалить бронирование
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await BookPrivateEventService.deleteBooking(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
