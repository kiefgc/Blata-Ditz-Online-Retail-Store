// models/cart.model.js

import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export class Cart {
  static collection() {
    return getDB().collection("carts");
  }

  static toObjectId(id) {
    return new ObjectId(id);
  }

  // Find cart by customer_id
  static async findByCustomerId(customer_id) {
    return await this.collection().findOne({
      customer_id: this.toObjectId(customer_id),
    });
  }

  // Create empty cart for a user
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

  // Update items array
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

  // Delete a user's entire cart
  static async delete(customer_id) {
    return await this.collection().deleteOne({
      customer_id: this.toObjectId(customer_id),
    });
  }
}
