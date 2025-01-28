import express from "express";
import { Sequelize } from "sequelize";
import path from "path";
import * as dotenv from "dotenv";
import { initBookKidsEventModel } from "./models/book-event-models/bookKidsEventModel";
import { initBookPrivateEventModel } from "./models/book-event-models/bookPrivateEventModel";
import { initKidsEventModel } from "./models/event-models/kidsEventModel";
import { initPrivateEventModel } from "./models/event-models/privateEventModel";
import bookKidsEventRoutes from "./routes/book-events-routes/bookKidsEventRoutes";
import bookPrivateEventRoutes from "./routes/book-events-routes/bookPrivateEventRoutes";
import kidsEventRoutes from "./routes/event-routes/kidsEventRoutes";
import privateEventRoutes from "./routes/event-routes/privateEventRoutes";
import cors from "cors";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

const PORT = process.env.PORT || "3000";

// Database connection
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
});

initPrivateEventModel(sequelize);
initKidsEventModel(sequelize);
initBookPrivateEventModel(sequelize);
initBookKidsEventModel(sequelize);

sequelize
  .sync({ force: false }) // force: true пересоздаёт таблицы, если они существуют
  .then(() => console.log("Models synchronized with the database"))
  .catch((err) => console.error("Error synchronizing models:", err));

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

//todo: may be should fix path to upload
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// Routes
app.use("/api/events/private", privateEventRoutes);
app.use("/api/events/kids", kidsEventRoutes);
app.use("/api/book/private", bookPrivateEventRoutes);
app.use("/api/book/kids", bookKidsEventRoutes);

app.listen(Number(PORT), "0.0.0.0", () =>
  console.log(`server started on port: ${PORT}`)
);
