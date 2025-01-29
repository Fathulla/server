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
const bookKidsEventModel_1 = require("../../models/book-event-models/bookKidsEventModel");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBooking = yield bookKidsEventModel_1.BookKidsEvent.create(req.body);
        res.status(201).json(newBooking);
    }
    catch (error) {
        console.error("Error creating kids event booking:", error);
        res.status(400).json({ error });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield bookKidsEventModel_1.BookKidsEvent.findAll();
        res.status(200).json(bookings);
    }
    catch (error) {
        console.error("Error fetching kids event bookings:", error);
        res.status(500).json({ error });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield bookKidsEventModel_1.BookKidsEvent.findByPk(req.params.id);
        if (booking) {
            res.status(200).json(booking);
        }
        else {
            res.status(404).json({ message: "Booking not found" });
        }
    }
    catch (error) {
        console.error("Error fetching kids event booking:", error);
        res.status(500).json({ error });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield bookKidsEventModel_1.BookKidsEvent.findByPk(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        yield booking.update(req.body);
        res.status(200).json(booking);
    }
    catch (error) {
        console.error("Error updating kids event booking:", error);
        res.status(400).json({ error });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield bookKidsEventModel_1.BookKidsEvent.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: "Booking not found" });
        }
    }
    catch (error) {
        console.error("Error deleting kids event booking:", error);
        res.status(500).json({ error });
    }
}));
exports.default = router;
