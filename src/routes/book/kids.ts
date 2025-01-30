import { Router } from "express";
import { KidsBookingController } from "../../controllers/book/kids";

const router = Router();

router.post("/", KidsBookingController.create);
router.get("/", KidsBookingController.getAll);
router.get("/:id", KidsBookingController.getById);
router.put("/:id", KidsBookingController.update);
router.delete("/:id", KidsBookingController.delete);

export default router;
