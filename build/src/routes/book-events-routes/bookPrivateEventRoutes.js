"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookPrivateEventSchema_1 = require("../../utils/booking-validators/bookPrivateEventSchema");
const bookPrivateEventModel_1 = require("../../models/book-event-models/bookPrivateEventModel");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Валидация данных с помощью Joi
        const { error, value } = bookPrivateEventSchema_1.bookPrivateEventsSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        // Создание записи
        const newBooking = yield bookPrivateEventModel_1.BookPrivateEvent.create(value);
        res.status(201).json(newBooking);
    }
    catch (err) {
        console.error("Error creating booking:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// Get all bookings
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield bookPrivateEventModel_1.BookPrivateEvent.findAll();
        res.status(200).json(bookings);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
// Get booking by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield bookPrivateEventModel_1.BookPrivateEvent.findOne({
            where: { id: req.params.id },
        });
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(booking);
    }
    catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).json({ error });
    }
}));
// Update booking
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phoneNumber, eventDate, companyName, startTime, endTime, eventType, peopleNumber, additionalInformation, } = req.body;
        const updatedBooking = yield bookPrivateEventModel_1.BookPrivateEvent.update({
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
        }, {
            where: { id },
            returning: true, // Возвращаем обновленную запись
        });
        if (updatedBooking[0] === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(updatedBooking[1][0]); // Возвращаем обновленную запись
    }
    catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ error });
    }
}));
// Delete booking
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield bookPrivateEventModel_1.BookPrivateEvent.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).send(); // Успешно удалено
        }
        else {
            res.status(404).json({ message: "Booking not found" });
        }
    }
    catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ error });
    }
}));
exports.default = router;
