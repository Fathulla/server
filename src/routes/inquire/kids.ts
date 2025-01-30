import { Router } from "express";
import { InquireKidsEvent } from "../../models/inquire/kids";

const router = Router();

router.post("/", async (req, res): Promise<any> => {
  try {
    // Создание записи
    const newBooking = await InquireKidsEvent.create(req.body);
    res.status(201).json(newBooking);
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await InquireKidsEvent.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get booking by ID
router.get("/:id", async (req, res): Promise<any> => {
  try {
    const booking = await InquireKidsEvent.findOne({
      where: { id: req.params.id },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ error });
  }
});

// Update booking
router.put("/:id", async (req, res): Promise<any> => {
  try {
    const { id } = req.params;
    const {
      firstName,
      email,
      phoneNumber,
      eventDate,
      peopleNumber,
      masterclass,
      showType,
    } = req.body;

    const updatedBooking = await InquireKidsEvent.update(
      {
        firstName,
        email,
        phoneNumber,
        eventDate,
        peopleNumber,
        masterclass,
        showType,
      },
      {
        where: { id },
        returning: true, // Возвращаем обновленную запись
      }
    );

    if (updatedBooking[0] === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(updatedBooking[1][0]); // Возвращаем обновленную запись
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error });
  }
});

// Delete booking
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await InquireKidsEvent.destroy({
      where: { id: req.params.id },
    });

    if (deleted) {
      res.status(204).send(); // Успешно удалено
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error });
  }
});

export default router;
