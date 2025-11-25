import { getDB } from "../config/db.js";
import fs from "fs";
import path from "path";

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
      in_stock: false,
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

  static async delete(id) {
    const _id = await this.toObjectId(id);
    const db = getDB();

    const product = await this.collection().findOne({ _id });
    if (!product) return { status: "not_found" };

    const orderDetail = await db
      .collection("order_details")
      .findOne({ product_id: _id });

    if (orderDetail) {
      const activeStatuses = ["pending", "processing"];
      const order = await db.collection("orders").findOne({
        _id: orderDetail.order_id,
        order_status: { $in: activeStatuses },
      });

      if (order) {
        return { status: "has_active_orders" };
      }
    }

    if (product.image) {
      try {
        const imagePath = path.join(process.cwd(), product.image);
        await fs.promises.unlink(imagePath);
      } catch (err) {
        console.error("Failed to delete image: ", err);
      }
    }

    await db.collection("inventory").deleteMany({ product_id: _id });

    const result = await this.collection().deleteOne({ _id });

    return { status: "deleted", result };
  }

  static async findById(id) {
    const _id = await this.toObjectId(id);
    return await this.collection().findOne({ _id });
  }

  static async findByCategoryId(categoryId) {
    const objectId = new ObjectId(categoryId);
    return this.collection().find({ category_ids: objectId }).toArray();
  }

  static async getAll(filters = {}) {
    return await this.collection().find(filters).toArray();
  }
}
