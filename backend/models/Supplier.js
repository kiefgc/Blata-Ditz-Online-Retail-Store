import { getDB } from "../config/db.js";

export class Supplier {
  static collection() {
    return getDB().collection("suppliers");
  }

  static async toObjectId(id) {
    const { ObjectId } = await import("mongodb");
    return new ObjectId(id);
  }

  static async toObjectIdArray(ids = []) {
    const { ObjectId } = await import("mongodb");
    return ids.map((id) => new ObjectId(id));
  }

  static async findById(id) {
    const { ObjectId } = await import("mongodb");
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }

  static async create(supplierData) {
    const supplier = {
      ...supplierData,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return await this.collection().insertOne(supplier);
  }

  static async update(id, updates) {
    const { ObjectId } = await import("mongodb");
    updates.updated_at = new Date();
    return await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
  }

  static async delete(id) {
    const { ObjectId } = await import("mongodb");
    return await this.collection().deleteOne({ _id: new ObjectId(id) });
  }

  static async getAll() {
    return await this.collection().find().toArray();
  }

  static async findByEmail(email) {
    return await this.collection().findOne({ email });
  }
}
