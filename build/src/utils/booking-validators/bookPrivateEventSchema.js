"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookPrivateEventsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.bookPrivateEventsSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(1).required(),
    lastName: joi_1.default.string().min(1).required(),
    email: joi_1.default.string().email().required(),
    phoneNumber: joi_1.default.string()
        .pattern(/^[+]?[\d\s-]{7,15}$/)
        .required(),
    eventDate: joi_1.default.date().iso().required(),
    companyName: joi_1.default.string().min(1).required(),
    startTime: joi_1.default.string()
        .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
        .required(), // HH:mm
    endTime: joi_1.default.string()
        .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
        .required(), // HH:mm
    eventType: joi_1.default.string().min(1).required(),
    peopleNumber: joi_1.default.number().integer().min(1).required(),
    additionalInformation: joi_1.default.string().allow("").optional(),
});
