import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface BookPrivateEventAttributes {
  id: number;
  firstName: string;
  email: string;
  phoneNumber: string;
  peopleNumber: number;
  privateEventId: number;
}

export interface BookPrivateEventCreationAttributes
  extends Optional<BookPrivateEventAttributes, "id"> {}

export class BookPrivateEvent extends Model<
  BookPrivateEventAttributes,
  BookPrivateEventCreationAttributes
> {
  public id!: number;
  public firstName!: string;
  public email!: string;
  public phoneNumber!: string;
  public peopleNumber!: number;
  public privateEventId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initBookPrivateEventModel = (sequelize: Sequelize) => {
  BookPrivateEvent.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      privateEventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Private Event Id cannot be empty" },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "First name cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { msg: "Must be a valid email address" },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Phone number cannot be empty" },
        },
      },
      peopleNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "People number must be an integer" },
          min: { args: [1], msg: "At least one person is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "BookPrivateEvent",
      tableName: "book_private_event",
    }
  );
};
