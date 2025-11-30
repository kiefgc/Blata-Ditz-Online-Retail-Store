import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export class Cart {
  static collection() {
    return getDB().collection("carts");
  }

  static toObjectId(id) {
    return new ObjectId(id);
  }

  static async findByCustomerId(customer_id) {
    return await this.collection().findOne({
      customer_id: this.toObjectId(customer_id),
    });
  }

  static async create(customer_id) {
    const cart = {
      customer_id: this.toObjectId(customer_id),
      items: [],
      created_at: new Date(),
      updated_at: new Date(),
    };

    await this.collection().insertOne(cart);
    return cart;
  }

  static async updateItems(customer_id, items) {
    return await this.collection().updateOne(
      { customer_id: this.toObjectId(customer_id) },
      {
        $set: {
          items,
          updated_at: new Date(),
        },
      }
    );
  }

  static async delete(customer_id) {
    return await this.collection().deleteOne({
      customer_id: this.toObjectId(customer_id),
    });
  }
}
