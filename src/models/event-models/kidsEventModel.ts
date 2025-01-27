import { DataTypes, Model, Sequelize } from 'sequelize';

export class KidsEvent extends Model {
  public id!: number;
  public event_title!: string;
  public event_subtitle!: string;
  public title!: string;
  public paragraph!: string;
  public motivation!: string;
  public cost!: string;
  public date!: string;
  public time!: string;
  public img!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initKidsEventModel = (sequelize: Sequelize) => {
  KidsEvent.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      event_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_subtitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paragraph: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      motivation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'KidsEvent',
      tableName: 'kids_event',
    }
  );
};
