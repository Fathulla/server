import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface InquireKidsEventAttributes {
  id: number;
  firstName: string;
  email: string;
  phoneNumber: string;
  eventDate: Date;
  peopleNumber: number;
  masterclass: string;
  showType: string;
}

interface InquireKidsEventCreationAttributes
  extends Optional<InquireKidsEventAttributes, "id"> {}

export class InquireKidsEvent extends Model<
  InquireKidsEventAttributes,
  InquireKidsEventCreationAttributes
> {
  public id!: number;
  public firstName!: string;
  public email!: string;
  public phoneNumber!: string;
  public eventDate!: Date;
  public peopleNumber!: number;
  public masterclass!: string;
  public showType!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initInquireKidsEventModel = (sequelize: Sequelize) => {
  InquireKidsEvent.init(
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
      peopleNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      masterclass: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      showType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "InquireKidsEvent",
      tableName: "inquire_kids_event",
    }
  );
};
