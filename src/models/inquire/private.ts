import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface InquirePrivateEventAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  eventDate: Date;
  companyName: string;
  startTime: Date;
  endTime: Date;
  eventType: string;
  peopleNumber: number;
  additionalInformation?: string;
}

interface InquirePrivateEventCreationAttributes
  extends Optional<InquirePrivateEventAttributes, "id"> {}

export class InquirePrivateEvent extends Model<
  InquirePrivateEventAttributes,
  InquirePrivateEventCreationAttributes
> {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phoneNumber!: string;
  public eventDate!: Date;
  public companyName!: string;
  public startTime!: Date;
  public endTime!: Date;
  public eventType!: string;
  public peopleNumber!: number;
  public additionalInformation?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initInquirePrivateEventModel = (sequelize: Sequelize) => {
  InquirePrivateEvent.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      eventType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      peopleNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      additionalInformation: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "InquirePrivateEvent",
      tableName: "inquire_private_event",
    }
  );
};
