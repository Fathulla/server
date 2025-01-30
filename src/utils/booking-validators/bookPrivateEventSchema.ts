import Joi from "joi";

export const InquirePrivateEventsSchema = Joi.object({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .pattern(/^[+]?[\d\s-]{7,15}$/)
    .required(),
  eventDate: Joi.date().iso().required(),
  companyName: Joi.string().min(1).required(),
  startTime: Joi.string()
    .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .required(), // HH:mm
  endTime: Joi.string()
    .pattern(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .required(), // HH:mm
  eventType: Joi.string().min(1).required(),
  peopleNumber: Joi.number().integer().min(1).required(),
  additionalInformation: Joi.string().allow("").optional(),
});