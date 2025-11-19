import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export class Order {
  static collection() {
    return getDB().collection("orders");
  }

  static toObjectId(id) {
    return new ObjectId(id);
  }

  static toObjectIdArray(ids = []) {
    return ids.map((id) => new ObjectId(id));
  }

  static async create(orderData) {
    const order = {
      ...orderData,
      order_date: new Date(),
      updated_at: new Date(),
      //customer_id: orderData.customer_id || null
    };

    return await this.collection().insertOne(order);

    //enums not sure where/how to place thisw
    //const ORDER_STATUS = ['pending', 'processing', 'completed', 'cancelled'];
    //const PAYMENT_STATUS = ['pending', 'paid', 'failed'];
  }

  static async update(order_id, updates) {
    const oid =
      typeof order_id === "string" ? this.toObjectId(order_id) : order_id;

    updates.updated_at = new Date();
    return await this.collection().updateOne(
      { order_id: oid },
      { $set: updates }
    );
  }

  static async delete(order_id) {
    const oid =
      typeof order_id === "string" ? this.toObjectId(order_id) : order_id;
    return await this.collection().deleteOne({ order_id: oid });
  }

  static async getAll() {
    return await this.collection().find().toArray();
  }

  static async findByOrderId(order_id) {
    const oid =
      typeof order_id === "string" ? this.toObjectId(order_id) : order_id;
    return await this.collection().findOne({ order_id: oid });
  }

  // to filter orders for specific customer
  static async findByCustomerId(customer_id) {
    const cid =
      typeof customer_id === "string"
        ? this.toObjectId(customer_id)
        : customer_id;
    return await this.collection().find({ customer_id: cid }).toArray();
  }
}
