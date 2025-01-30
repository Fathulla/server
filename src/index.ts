import express from "express";
import { Sequelize } from "sequelize";
import path from "path";
import * as dotenv from "dotenv";
import bookKidsEventRoutes from "./routes/book/kids";
import bookPrivateEventRoutes from "./routes/book/private";
import inquirePrivateEventRoutes from "./routes/inquire/private";
import inquireKidsEventRoutes from "./routes/inquire/kids";
import kidsEventRoutes from "./routes/events/kids";
import privateEventRoutes from "./routes/events/private";
import cors from "cors";
import { initBookKidsEventModel } from "./models/book/kids";
import { initBookPrivateEventModel } from "./models/book/private";
import { initInquireKidsEventModel } from "./models/inquire/kids";
import { initInquirePrivateEventModel } from "./models/inquire/private";
import { initKidsEventModel } from "./models/event/kids";
import { initPrivateEventModel } from "./models/event/private";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || "5000";

// Database connection
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
});

initBookKidsEventModel(sequelize);
initBookPrivateEventModel(sequelize);
initInquireKidsEventModel(sequelize);
initInquirePrivateEventModel(sequelize);
initKidsEventModel(sequelize);
initPrivateEventModel(sequelize);

sequelize
  .sync({ force: false }) // force: true пересоздаёт таблицы, если они существуют
  .then(() => console.log("Models synchronized with the database"))
  .catch((err) => console.error("Error synchronizing models:", err));

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// Routes
app.use("/events/private", privateEventRoutes);
app.use("/events/kids", kidsEventRoutes);
app.use("/book/private", bookPrivateEventRoutes);
app.use("/book/kids/", bookKidsEventRoutes);
app.use("/inquire/private", inquirePrivateEventRoutes);
app.use("/inquire/kids/", inquireKidsEventRoutes);

app.listen(Number(PORT), "0.0.0.0", () =>
  console.log(`server started on port: ${PORT}`)
);
