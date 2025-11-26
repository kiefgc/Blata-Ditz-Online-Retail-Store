import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export class OrderDetails {
  static collection() {
    return getDB().collection("order_details");
  }

  static toObjectId(id) {
    return typeof id === "string" ? new ObjectId(id) : id;
  }

  static async create(orderData) {
    const order = {
      ...orderData,
      order_date: new Date(),
      updated_at: new Date(),
    };

    return await this.collection().insertOne(order);
  }

  static async getById(id) {
    return await this.collection().findOne({ _id: this.toObjectId(id) });
  }

  static async getByOrderId(order_id) {
    return await this.collection()
      .find({ order_id: this.toObjectId(order_id) })
      .toArray();
  }

  static async update(id, updates) {
    updates.updated_at = new Date();
    return await this.collection().updateOne(
      { _id: this.toObjectId(id) },
      { $set: updates }
    );
  }

  static async delete(id) {
    return await this.collection().deleteOne({ _id: this.toObjectId(id) });
  }

  static async getAll() {
    return await this.collection().find().toArray();
  }

  static async findByCustomerId(customer_id) {
    return await this.collection()
      .find({ customer_id: this.toObjectId(customer_id) })
      .toArray();
  }
}

export default OrderDetails;
