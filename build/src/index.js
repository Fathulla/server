"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
const bookKidsEventModel_1 = require("./models/book-event-models/bookKidsEventModel");
const bookPrivateEventModel_1 = require("./models/book-event-models/bookPrivateEventModel");
const kidsEventModel_1 = require("./models/event-models/kidsEventModel");
const privateEventModel_1 = require("./models/event-models/privateEventModel");
const bookKidsEventRoutes_1 = __importDefault(require("./routes/book-events-routes/bookKidsEventRoutes"));
const bookPrivateEventRoutes_1 = __importDefault(require("./routes/book-events-routes/bookPrivateEventRoutes"));
const kidsEventRoutes_1 = __importDefault(require("./routes/event-routes/kidsEventRoutes"));
const privateEventRoutes_1 = __importDefault(require("./routes/event-routes/privateEventRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv.config();
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));
app.use(express_1.default.json());
const PORT = process.env.PORT || "3000";
// Database connection
const sequelize = new sequelize_1.Sequelize({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
});
(0, privateEventModel_1.initPrivateEventModel)(sequelize);
(0, kidsEventModel_1.initKidsEventModel)(sequelize);
(0, bookPrivateEventModel_1.initBookPrivateEventModel)(sequelize);
(0, bookKidsEventModel_1.initBookKidsEventModel)(sequelize);
sequelize
    .sync({ force: false }) // force: true пересоздаёт таблицы, если они существуют
    .then(() => console.log("Models synchronized with the database"))
    .catch((err) => console.error("Error synchronizing models:", err));
sequelize
    .authenticate()
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error:", err));
//todo: may be should fix path to upload
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "./uploads")));
// Routes
app.use("/api/events/private", privateEventRoutes_1.default);
app.use("/api/events/kids", kidsEventRoutes_1.default);
app.use("/api/book/private", bookPrivateEventRoutes_1.default);
app.use("/api/book/kids", bookKidsEventRoutes_1.default);
app.listen(Number(PORT), "0.0.0.0", () => console.log(`server started on port: ${PORT}`));
