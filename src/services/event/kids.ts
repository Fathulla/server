import fs from "fs";
import { KidsEvent, KidsEventCreationAttributes } from "../../models/event/kids";

interface DataType extends KidsEventCreationAttributes {
  host: string
}

export class KidsEventService {
  static async createEvent(data: DataType, file?: Express.Multer.File) {
    if (!file) throw new Error("Image file is required");

    const fileUrl = `https://${data.host}/api/uploads/${file.filename}`;
    return await KidsEvent.create({ ...data, img: fileUrl });
  }

  static async getAllEvents() {
    return await KidsEvent.findAll();
  }

  static async getEventById(id: string) {
    return await KidsEvent.findByPk(id);
  }

  static async updateEvent(id: string, data: DataType, file?: Express.Multer.File) {
    const event = await KidsEvent.findByPk(id);
    if (!event) throw new Error("Event not found");

    if (file) {
      const oldImagePath = event.img;
      if (fs.existsSync(oldImagePath)) {
        await fs.promises.unlink(oldImagePath);
      }
      data.img = `https://${data.host}/api/uploads/${file.filename}`;
    }
    return await event.update(data);
  }

  static async deleteEvent(id: string) {
    const event = await KidsEvent.findByPk(id);
    if (!event) throw new Error("Event not found");

    if (event.img && fs.existsSync(event.img)) {
      await fs.promises.unlink(event.img);
    }

    await KidsEvent.destroy({ where: { id } });
  }
}