import express from "express";
import path from "path";
import * as dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/database";
import { errorHandler } from "./middlewares/errorHandler";
import kidsBookingRoutes from "./routes/book/kids";
import privateBookingRoutes from "./routes/book/private";
import kidsEventsRoutes from "./routes/events/kids"
import privateEventsRoutes from "./routes/events/private"


dotenv.config();
const app = express();

app.use(cors());
app.use(errorHandler);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// Routes
app.use("/booking/kids", kidsBookingRoutes);
app.use("/booking/private", privateBookingRoutes);
app.use("/events/private", kidsEventsRoutes);
app.use("/events/private", privateEventsRoutes);


const start = async () => {
  try {
    await connectDB();
    const PORT = parseInt(process.env.PORT || "5000", 10);

    app.listen(PORT, "0.0.0.0", () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1); // Завершаем процесс с ошибкой
  }
};

start();
