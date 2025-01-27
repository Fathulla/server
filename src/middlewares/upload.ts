import multer from "multer";
import path from "path";
import fs from "fs";

// Путь к папке, где будут храниться изображения
const uploadPath = path.join(__dirname, "..", "uploads");

// Проверяем, существует ли папка, если нет - создаем её
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Настройка multer для сохранения в папку uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);  // Указываем путь к папке
  },
  filename: (req, file, cb) => {
    // Создаем уникальное имя для файла, чтобы избежать перезаписи
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname);
  }
});

export const upload = multer({ storage });
