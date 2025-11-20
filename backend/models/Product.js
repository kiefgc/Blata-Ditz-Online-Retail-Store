import { getDB } from "../config/db.js";

export class Product {
  static collection() {
    return getDB().collection("products");
  }

  static async toObjectId(id) {
    const { ObjectId } = await import("mongodb");
    return new ObjectId(id);
  }

  static async toObjectIdArray(ids = []) {
    const { ObjectId } = await import("mongodb");
    return ids.map((id) => new ObjectId(id));
  }

  static async create(data) {
    const product = {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      supplier_id: data.supplier_id || null,
    };

    if (product.category_ids && Array.isArray(product.category_ids)) {
      product.category_ids = await this.toObjectIdArray(product.category_ids);
    }

    return await this.collection().insertOne(product);
  }

  static async update(id, updates) {
    const _id = await this.toObjectId(id);

    if (updates.category_ids && Array.isArray(updates.category_ids)) {
      updates.category_ids = await this.toObjectIdArray(updates.category_ids);
    }

    if (!updates.hasOwnProperty("supplier_id")) {
      updates.supplier_id = null;
    }

    updates.updated_at = new Date();

    return await this.collection().updateOne({ _id }, { $set: updates });
  }

  static async findById(id) {
    const _id = await this.toObjectId(id);
    return await this.collection().findOne({ _id });
  }

  static async getAll(filters = {}) {
    return await this.collection().find(filters).toArray();
  }
}
