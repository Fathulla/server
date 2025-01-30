import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { initBookKidsEventModel } from "../models/book/kids";
import { initBookPrivateEventModel } from "../models/book/private";
import { initKidsEventModel } from "../models/event/kids";
import { initPrivateEventModel } from "../models/event/private";
import { initInquireKidsEventModel } from "../models/inquire/kids";
import { initInquirePrivateEventModel } from "../models/inquire/private";

// Загружаем переменные окружения из .env
dotenv.config();

// Подключение к базе данных
const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: parseInt(process.env.DB_PORT || "5432", 10),
  }
);

// Функция для инициализации моделей
const initModels = () => {
  initBookKidsEventModel(sequelize);
  initBookPrivateEventModel(sequelize);
  initInquireKidsEventModel(sequelize);
  initInquirePrivateEventModel(sequelize);
  initKidsEventModel(sequelize);
  initPrivateEventModel(sequelize);
};

// Функция для старта базы данных
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    initModels(); // Инициализируем модели

    await sequelize.sync({ force: false, alter: true }); 
    console.log("✅ Models synchronized with the database");
  } catch (err) {
    console.error("❌ Database connection error:", err);
    process.exit(1); // Останавливаем сервер в случае ошибки подключения
  }
};

export { sequelize, connectDB };
