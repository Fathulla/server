import { Router } from "express";
import { BookKidsEvent } from "../../models/book-event-models/bookKidsEventModel";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const newBooking = await BookKidsEvent.create(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating kids event booking:", error);
    res.status(400).json({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await BookKidsEvent.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching kids event bookings:", error);
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const booking = await BookKidsEvent.findByPk(req.params.id);
    if (booking) {
      res.status(200).json(booking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    console.error("Error fetching kids event booking:", error);
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req, res): Promise<any> => {
  try {
    const booking = await BookKidsEvent.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    await booking.update(req.body);
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error updating kids event booking:", error);
    res.status(400).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await BookKidsEvent.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    console.error("Error deleting kids event booking:", error);
    res.status(500).json({ error });
  }
});

export default router