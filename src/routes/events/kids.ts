import { Request, Response, Router } from "express";
import fs from 'fs';
import path from "path";
import { upload } from "../../middlewares/upload";
import { KidsEvent } from "../../models/event/kids";

const router = Router();


// Create
router.post(
  "/",
  upload.single("img"),
  async (req: Request, res: Response): Promise<void> => {
    const { body, file } = req;

    // Проверяем, был ли файл загружен
    if (!file) {
      res.status(400).json({ message: "Image file is required" });
      return;
    }

    // Проверяем, что все обязательные поля присутствуют
    if (
      !body.event_title ||
      !body.event_subtitle ||
      !body.title ||
      !body.paragraph ||
      !body.motivation ||
      !body.cost ||
      !body.date ||
      !body.time
    ) {
      // Удаляем файл, если событие не прошло валидацию
      fs.unlinkSync(file.path); // Обратите внимание, что нужно подключить fs
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    try {
      // Формируем URL файла
      // const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
      const fileUrl = `https://${req.get('host')}/api/uploads/${file.filename}`;


      // Создаем событие в базе данных
      const event = await KidsEvent.create({
        ...body,
        img: fileUrl, // Сохраняем путь к изображению
      });

      res.status(201).json(event);
    } catch (error: any) {
      console.error("Error creating event:", error);
      // Удаляем файл, если произошла ошибка при создании события
      if (file) fs.unlinkSync(file.path);
      res.status(500).json({ error: error.message });
    }
  }
);

// Read all
router.get("/", async (_req, res) => {
  try {
    const events = await KidsEvent.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Read by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await KidsEvent.findByPk(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Update
router.put("/:id", upload.single("img"), async (req: Request, res: Response): Promise<any> => {
  try {
    const { body, file } = req;
    
    // Ищем событие по ID, чтобы получить старое изображение
    const event = await KidsEvent.findOne({
      where: { id: req.params.id }
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Если было передано новое изображение, удаляем старое
    if (file) {
      const oldImagePath = event.img;

      // Проверяем, существует ли старое изображение, и удаляем его
      if (fs.existsSync(oldImagePath)) {
        await fs.promises.unlink(oldImagePath);
      }

      // Формируем новый путь к изображению
      // const newImagePath = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
      const newImagePath = `https://${req.get('host')}/api/uploads/${file.filename}`;
      body.img = newImagePath; // Обновляем путь к новому изображению в теле запроса
    }

    // Обновляем данные события в базе данных
    const updatedEvent = await event.update(body);

    res.status(200).json(updatedEvent); // Возвращаем обновленное событие
  } catch (error) {
    console.error('Error during update:', error);
    res.status(500).json({ error });
  }
});


// Delete
router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    console.log('Request ID:', req.params.id);  // Логирование ID из URL

    // Ищем событие по ID, чтобы получить путь к изображению
    const event = await KidsEvent.findOne({
      where: { id: req.params.id }
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Пытаемся удалить файл, если он существует
    const imagePath = event.img;
    if (imagePath) {
      // Абсолютный путь к файлу в папке uploads
      const filePath = path.join(imagePath);

      // Проверяем, существует ли файл
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);  // Используем асинхронный метод для удаления файла
      } else {
        console.log('File does not exist at path:', filePath);  // Логируем, если файл не найден
      }
    }

    // Удаляем событие из базы данных
    const deleted = await KidsEvent.destroy({
      where: { id: req.params.id },
    });

    if (deleted) {
      res.status(204).send();  // Успешно удалено
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error('Error during delete:', error);  // Логируем ошибки
    res.status(500).json({ error });
  }
});

export default router;
