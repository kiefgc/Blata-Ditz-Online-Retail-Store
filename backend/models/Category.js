import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export class Category {
  static collection() {
    return getDB().collection("categories");
  }

  static async getAll() {
    return await this.collection().find().toArray();
  }

  static async findById(id) {
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }

  static async create(data) {
    const result = await this.collection().insertOne({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return result;
  }

  static async update(id, updates) {
    const result = await this.collection().updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updates,
          updated_at: new Date(),
        },
      }
    );
    return result;
  }

  static async delete(id) {
    return await this.collection().deleteOne({ _id: new ObjectId(id) });
  }
}
