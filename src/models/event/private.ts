import { DataTypes, Model, Sequelize, Optional } from "sequelize";

interface PrivateEventAttributes {
  id: number;
  event_title: string;
  event_subtitle: string;
  title: string;
  paragraph: string;
  motivation: string;
  cost: string;
  date: Date;
  time: Date;
  img: string;
}

interface PrivateEventCreationAttributes
  extends Optional<PrivateEventAttributes, "id"> {}

export class PrivateEvent extends Model<
  PrivateEventAttributes,
  PrivateEventCreationAttributes
> {
  public id!: number;
  public event_title!: string;
  public event_subtitle!: string;
  public title!: string;
  public paragraph!: string;
  public motivation!: string;
  public cost!: string;
  public date!: Date;
  public time!: Date;
  public img!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initPrivateEventModel = (sequelize: Sequelize): void => {
  PrivateEvent.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      event_title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      event_subtitle: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      paragraph: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      motivation: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      cost: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PrivateEvent",
      tableName: "private_event",
      timestamps: true, // Указывает на наличие createdAt и updatedAt
    }
  );
};
