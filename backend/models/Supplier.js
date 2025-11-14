import { getDB } from "../config/db.js";

export class Supplier {
  static collection() {
    return getDB().collection("products");
  }

  static async findById(id) {
    // if (!mongodb.ObjectId.isValid(id)) {
    //   throw new Error("Invalid supplier ID");
    // }
    // return await this.collection().findOne({
    //   _id: new ObjectId(id),
    // });
    const { ObjectId } = await import("mongodb");
    return (await this.collection()) / findOne({ _id: new ObjectId(id) });
  }

  static async create(supplierData) {
    const supplier = {
      ...supplierData,
      created_at: new Date(),
      // updated_at: new Date(),
    };

    return await this.collection().insertOne(supplier);
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
