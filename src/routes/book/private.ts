import { Router } from "express";
import { BookPrivateEventController } from "../../controllers/book/private";

const router = Router();

router.post("/", BookPrivateEventController.create);
router.get("/", BookPrivateEventController.getAll);
router.get("/:id", BookPrivateEventController.getOne);
router.put("/:id", BookPrivateEventController.update);
router.delete("/:id", BookPrivateEventController.delete);

export default router;
