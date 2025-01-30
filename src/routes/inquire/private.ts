import { Router } from "express";
import { InquirePrivateEvent } from "../../models/inquire/private";
import { InquirePrivateEventsSchema } from "../../utils/booking-validators/bookPrivateEventSchema";

const router = Router();

router.post("/", async (req, res): Promise<any> => {
  try {
    // Валидация данных с помощью Joi
    const { error, value } = InquirePrivateEventsSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    // Создание записи
    const newBooking = await InquirePrivateEvent.create(value);
    res.status(201).json(newBooking);
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await InquirePrivateEvent.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get booking by ID
router.get("/:id", async (req, res): Promise<any> => {
  try {
    const booking = await InquirePrivateEvent.findOne({
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
      lastName,
      email,
      phoneNumber,
      eventDate,
      companyName,
      startTime,
      endTime,
      eventType,
      peopleNumber,
      additionalInformation,
    } = req.body;

    const updatedBooking = await InquirePrivateEvent.update(
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        eventDate,
        companyName,
        startTime,
        endTime,
        eventType,
        peopleNumber,
        additionalInformation,
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
    const deleted = await InquirePrivateEvent.destroy({
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
