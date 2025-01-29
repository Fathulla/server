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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const upload_1 = require("../../middlewares/upload");
const kidsEventModel_1 = require("../../models/event-models/kidsEventModel");
const router = (0, express_1.Router)();
// const uploadsPath = path.resolve(__dirname, "..", "..", 'uploads')
// Create
router.post("/", upload_1.upload.single("img"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, file } = req;
    // Проверяем, был ли файл загружен
    if (!file) {
        res.status(400).json({ message: "Image file is required" });
        return;
    }
    // Проверяем, что все обязательные поля присутствуют
    if (!body.event_title ||
        !body.event_subtitle ||
        !body.title ||
        !body.paragraph ||
        !body.motivation ||
        !body.cost ||
        !body.date ||
        !body.time) {
        // Удаляем файл, если событие не прошло валидацию
        fs_1.default.unlinkSync(file.path); // Обратите внимание, что нужно подключить fs
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        // Формируем URL файла
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
        // Создаем событие в базе данных
        const event = yield kidsEventModel_1.KidsEvent.create(Object.assign(Object.assign({}, body), { img: fileUrl }));
        res.status(201).json(event);
    }
    catch (error) {
        console.error("Error creating event:", error);
        // Удаляем файл, если произошла ошибка при создании события
        if (file)
            fs_1.default.unlinkSync(file.path);
        res.status(500).json({ error: error.message });
    }
}));
// Read all
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield kidsEventModel_1.KidsEvent.findAll();
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
// Read by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield kidsEventModel_1.KidsEvent.findByPk(req.params.id);
        if (event) {
            res.json(event);
        }
        else {
            res.status(404).json({ message: "Event not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
// Update
router.put("/:id", upload_1.upload.single("img"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, file } = req;
        // Ищем событие по ID, чтобы получить старое изображение
        const event = yield kidsEventModel_1.KidsEvent.findOne({
            where: { id: req.params.id }
        });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        // Если было передано новое изображение, удаляем старое
        if (file) {
            const oldImagePath = event.img;
            // Проверяем, существует ли старое изображение, и удаляем его
            if (fs_1.default.existsSync(oldImagePath)) {
                yield fs_1.default.promises.unlink(oldImagePath);
            }
            // Формируем новый путь к изображению
            const newImagePath = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
            body.img = newImagePath; // Обновляем путь к новому изображению в теле запроса
        }
        // Обновляем данные события в базе данных
        const updatedEvent = yield event.update(body);
        res.status(200).json(updatedEvent); // Возвращаем обновленное событие
    }
    catch (error) {
        console.error('Error during update:', error);
        res.status(500).json({ error });
    }
}));
// Delete
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Request ID:', req.params.id); // Логирование ID из URL
        // Ищем событие по ID, чтобы получить путь к изображению
        const event = yield kidsEventModel_1.KidsEvent.findOne({
            where: { id: req.params.id }
        });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        // Пытаемся удалить файл, если он существует
        const imagePath = event.img;
        if (imagePath) {
            // Абсолютный путь к файлу в папке uploads
            const filePath = path_1.default.join(imagePath);
            // Проверяем, существует ли файл
            if (fs_1.default.existsSync(filePath)) {
                yield fs_1.default.promises.unlink(filePath); // Используем асинхронный метод для удаления файла
            }
            else {
                console.log('File does not exist at path:', filePath); // Логируем, если файл не найден
            }
        }
        // Удаляем событие из базы данных
        const deleted = yield kidsEventModel_1.KidsEvent.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).send(); // Успешно удалено
        }
        else {
            res.status(404).json({ message: "Event not found" });
        }
    }
    catch (error) {
        console.error('Error during delete:', error); // Логируем ошибки
        res.status(500).json({ error });
    }
}));
exports.default = router;
