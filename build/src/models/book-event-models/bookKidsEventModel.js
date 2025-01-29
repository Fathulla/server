"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBookKidsEventModel = exports.BookKidsEvent = void 0;
const sequelize_1 = require("sequelize");
class BookKidsEvent extends sequelize_1.Model {
}
exports.BookKidsEvent = BookKidsEvent;
const initBookKidsEventModel = (sequelize) => {
    BookKidsEvent.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "First name cannot be empty" },
            },
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: { msg: "Must be a valid email address" },
            },
        },
        phoneNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Phone number cannot be empty" },
            },
        },
        peopleNumber: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: "People number must be an integer" },
                min: { args: [1], msg: "At least one person is required" },
            },
        },
    }, {
        sequelize,
        modelName: 'BookKidsEvent',
        tableName: 'book_kids_event',
    });
};
exports.initBookKidsEventModel = initBookKidsEventModel;
