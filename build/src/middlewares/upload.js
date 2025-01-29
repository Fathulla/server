"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Путь к папке, где будут храниться изображения
const uploadPath = path_1.default.join(__dirname, "..", "uploads");
// Проверяем, существует ли папка, если нет - создаем её
if (!fs_1.default.existsSync(uploadPath)) {
    fs_1.default.mkdirSync(uploadPath);
}
// Настройка multer для сохранения в папку uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath); // Указываем путь к папке
    },
    filename: (req, file, cb) => {
        // Создаем уникальное имя для файла, чтобы избежать перезаписи
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extname = path_1.default.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname);
    }
});
exports.upload = (0, multer_1.default)({ storage });
