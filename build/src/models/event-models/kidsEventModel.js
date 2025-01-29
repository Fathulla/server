"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initKidsEventModel = exports.KidsEvent = void 0;
const sequelize_1 = require("sequelize");
class KidsEvent extends sequelize_1.Model {
}
exports.KidsEvent = KidsEvent;
const initKidsEventModel = (sequelize) => {
    KidsEvent.init({
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
        modelName: 'KidsEvent',
        tableName: 'kids_event',
        timestamps: true
    });
};
exports.initKidsEventModel = initKidsEventModel;
