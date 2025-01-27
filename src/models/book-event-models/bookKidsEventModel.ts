import { DataTypes, Model, Sequelize } from 'sequelize';

export class BookKidsEvent extends Model {
  public id!: number;
  public firstName!: string;
  public email!: string;
  public phoneNumber!: string;
  public peopleNumber!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initBookKidsEventModel = (sequelize: Sequelize) => {
  BookKidsEvent.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      modelName: 'BookKidsEvent',
      tableName: 'book_kids_event',
    }
  );
};
