import { Router } from "express";
import { KidsEventController } from "../../controllers/event/kids";
import { upload } from "../../middlewares/upload";

const router = Router();

router.post("/", upload.single("img"), KidsEventController.create);
router.get("/", KidsEventController.getAll);
router.get("/:id", KidsEventController.getById);
router.put("/:id", upload.single("img"), KidsEventController.update);
router.delete("/:id", KidsEventController.delete);

export default router;
