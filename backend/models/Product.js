import { getDB } from "../config/db.js";

export class Product {
  static collection() {
    return getDB().collection("products");
  }

  static async getAll(filters = {}) {
    return await this.collection().find(filters).toArray();
  }

  static async findById(id) {
    const { ObjectId } = await import("mongodb");
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }

  static async create(data) {
    const product = {
      ...data,
      created_at: new Date(),
    };

    return await this.collection().insertOne(product);
  }

  static async update(id, updates) {
    const { ObjectId } = await import("mongodb");
    return await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
  }

  static async delete(id) {
    const { ObjectId } = await import("mongodb");
    return await this.collection().deleteOne({ _id: new ObjectId(id) });
  }
}
