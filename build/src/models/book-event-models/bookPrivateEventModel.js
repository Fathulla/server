"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBookPrivateEventModel = exports.BookPrivateEvent = void 0;
const sequelize_1 = require("sequelize");
class BookPrivateEvent extends sequelize_1.Model {
}
exports.BookPrivateEvent = BookPrivateEvent;
const initBookPrivateEventModel = (sequelize) => {
    BookPrivateEvent.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true, // Встроенная проверка на корректный email
            },
        },
        phoneNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[+]?[\d\s-]{7,15}$/, // Пример проверки на номер телефона
            },
        },
        eventDate: {
            type: sequelize_1.DataTypes.DATEONLY, // Используем DATEONLY для даты
            allowNull: false,
        },
        companyName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        startTime: {
            type: sequelize_1.DataTypes.TIME, // Используем TIME для времени
            allowNull: false,
        },
        endTime: {
            type: sequelize_1.DataTypes.TIME, // Используем TIME для времени
            allowNull: false,
        },
        eventType: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        peopleNumber: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1, // Минимальное значение
            },
        },
        additionalInformation: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true, // Поле опционально
        },
    }, {
        sequelize,
        modelName: 'BookPrivateEvent',
        tableName: 'book_private_event',
    });
};
exports.initBookPrivateEventModel = initBookPrivateEventModel;
