"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPrivateEventModel = exports.PrivateEvent = void 0;
const sequelize_1 = require("sequelize");
class PrivateEvent extends sequelize_1.Model {
}
exports.PrivateEvent = PrivateEvent;
const initPrivateEventModel = (sequelize) => {
    PrivateEvent.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        event_title: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        event_subtitle: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        title: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        paragraph: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        motivation: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        cost: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        img: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'PrivateEvent',
        tableName: 'private_event',
        timestamps: true, // Указывает на наличие createdAt и updatedAt
    });
};
exports.initPrivateEventModel = initPrivateEventModel;
