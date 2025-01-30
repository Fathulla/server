import { NextFunction, Request, Response } from "express";
import { KidsEventService } from "../../services/event/kids";

export class KidsEventController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await KidsEventService.createEvent(req.body, req.file);
      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await KidsEventService.getAllEvents();
      res.json(events);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await KidsEventService.getEventById(req.params.id);
      event
        ? res.json(event)
        : res.status(404).json({ message: "Event not found" });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedEvent = await KidsEventService.updateEvent(
        req.params.id,
        req.body,
        req.file
      );
      res.status(200).json(updatedEvent);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await KidsEventService.deleteEvent(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
