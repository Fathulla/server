import { DataTypes, Model, Sequelize } from 'sequelize';

export class BookPrivateEvent extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phoneNumber!: string;
  public eventDate!: string;
  public companyName!: string;
  public startTime!: string;
  public endTime!: string;
  public eventType!: string;
  public peopleNumber!: number;
  public additionalInformation?: string; // Поле опционально

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
          isEmail: true, // Встроенная проверка на корректный email
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[+]?[\d\s-]{7,15}$/, // Пример проверки на номер телефона
        },
      },
      eventDate: {
        type: DataTypes.DATEONLY, // Используем DATEONLY для даты
        allowNull: false,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME, // Используем TIME для времени
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME, // Используем TIME для времени
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
          min: 1, // Минимальное значение
        },
      },
      additionalInformation: {
        type: DataTypes.TEXT,
        allowNull: true, // Поле опционально
      },
    },
    {
      sequelize,
      modelName: 'BookPrivateEvent',
      tableName: 'book_private_event',
    }
  );
};
