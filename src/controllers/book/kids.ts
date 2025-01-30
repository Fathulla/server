import { Request, Response, NextFunction } from "express";
import { KidsBookingService } from "../../services/book/kids";

const kidsBookingService = new KidsBookingService();

export class KidsBookingController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const booking = await kidsBookingService.createBooking(req.body);
      res.status(201).json(booking);
    } catch (error) {
        next(error)
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const bookings = await kidsBookingService.getAllBookings();
      res.status(200).json(bookings);
    } catch (error) {
        next(error)
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const booking = await kidsBookingService.getBookingById(req.params.id);
      res.status(200).json(booking);
    } catch (error) {
        next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedBooking = await kidsBookingService.updateBooking(req.params.id, req.body);
      res.status(200).json(updatedBooking);
    } catch (error) {
        next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await kidsBookingService.deleteBooking(req.params.id);
      res.status(204).send();
    } catch (error) {
        next(error)
    }
  }
}
