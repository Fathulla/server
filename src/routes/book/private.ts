import { Router } from "express";
import {
  BookPrivateEvent,
  BookPrivateEventCreationAttributes,
} from "../../models/book/private";
import { PrivateEvent } from "../../models/event/private";

const router = Router();

router.post("/", async (req, res) => {
  const { body }: { body: BookPrivateEventCreationAttributes } = req;
  try {
    const eventId = await PrivateEvent.findByPk(body.privateEventId);

    if (eventId) {
      const newBooking = await BookPrivateEvent.create(req.body);
      res.status(201).json(newBooking);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error creating private event booking:", error);
    res.status(400).json({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await BookPrivateEvent.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching private event bookings:", error);
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const booking = await BookPrivateEvent.findByPk(req.params.id);
    if (booking) {
      res.status(200).json(booking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    console.error("Error fetching private event booking:", error);
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req, res): Promise<any> => {
  const { body }: { body: BookPrivateEventCreationAttributes } = req;

  try {
    const eventId = await PrivateEvent.findByPk(body.privateEventId);
    if (eventId) {
      const booking = await BookPrivateEvent.findByPk(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      await booking.update(req.body);
      res.status(200).json(booking);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error updating private event booking:", error);
    res.status(400).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await BookPrivateEvent.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    console.error("Error deleting private event booking:", error);
    res.status(500).json({ error });
  }
});

export default router;
