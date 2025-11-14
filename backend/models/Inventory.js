import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export class Inventory {
  static collection() {
    return getDB().collection("inventory");
  }

  static toObjectId(id) {
    return new ObjectId(id);
  }

  static toObjectIdArray(ids = []) {
    return ids.map((id) => new ObjectId(id));
  }

  static async findByProductId(product_id) {
    const pid =
      typeof product_id === "string" ? this.toObjectId(product_id) : product_id;
    return await this.collection().findOne({ product_id: pid });
  }

  static async create(data) {
    const item = {
      ...data,
      product_id:
        typeof data.product_id === "string"
          ? this.toObjectId(data.product_id)
          : data.product_id,
      updated_at: new Date(),
      last_restocked: data.last_restocked || null,
    };

    return await this.collection().insertOne(item);
  }

  static async update(product_id, updates) {
    const pid =
      typeof product_id === "string" ? this.toObjectId(product_id) : product_id;

    if (updates.stock_quantity && updates.stock_quantity > 0) {
      updates.last_restocked = new Date();
    }

    updates.updated_at = new Date();

    return await this.collection().updateOne(
      { product_id: pid },
      { $set: updates }
    );
  }

  static async delete(product_id) {
    const pid =
      typeof product_id === "string" ? this.toObjectId(product_id) : product_id;
    return await this.collection().deleteOne({ product_id: pid });
  }
}
