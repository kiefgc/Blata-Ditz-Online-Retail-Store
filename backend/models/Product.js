import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export class Product {
  static collection() {
    return getDB().collection("products");
  }

  static async getAll(filters = {}) {
    if (filters.category_ids && Array.isArray(filters.category_ids)) {
      filters.category_ids = await this.toObjectIdArray(filters.category_ids);
    }

    return await this.collection().find(filters).toArray();
  }

  static async findById(id) {
    const _id = await this.toObjectId(id);
    return await this.collection().findOne({ _id });
  }

  static async create(data) {
    const product = { ...data, created_at: new Date() };

    if (product.category_ids && Array.isArray(product.category_ids)) {
      product.category_ids = await this.toObjectIdArray(product.category_ids);
    }

    // For when we implement suppliers
    // if (product.supplier_ids && Array.isArray(product.supplier_ids)) {
    //   product.supplier_ids = await this.toObjectIdArray(product.supplier_ids);
    // }

    return await this.collection().insertOne(product);
  }

  static async update(id, updates) {
    const _id = await this.toObjectId(id);

    if (updates.category_ids && Array.isArray(updates.category_ids)) {
      updates.category_ids = await this.toObjectIdArray(updates.category_ids);
    }

    // For when we implement suppliers
    // if (updates.supplier_ids && Array.isArray(updates.supplier_ids)) {
    //   updates.supplier_ids = await this.toObjectIdArray(updates.supplier_ids);
    // }

    updates.updated_at = new Date();

    return await this.collection().updateOne({ _id }, { $set: updates });
  }

  static async delete(id) {
    const _id = await this.toObjectId(id);
    return await this.collection().deleteOne({ _id });
  }

  static async toObjectId(id) {
    return new ObjectId(id);
  }

  static async toObjectIdArray(ids = []) {
    return ids.map((id) => new ObjectId(id));
  }
}
