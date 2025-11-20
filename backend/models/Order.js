import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export class Order {
  static collection() {
    return getDB().collection("orders");
  }

  static orderStatuses = ["pending", "processing", "completed", "cancelled"];
  static paymentStatuses = ["pending", "paid", "failed"];

  static toObjectId(id) {
    return typeof id === "string" ? new ObjectId(id) : id;
  }

  // Validate input before creating or updating
  static validate(data) {
    const errors = [];

    if (!data.customer_id) errors.push("Customer ID is required");
    if (!data.order_status || !this.orderStatuses.includes(data.order_status))
      errors.push("Invalid order status");
    if (
      !data.payment_status ||
      !this.paymentStatuses.includes(data.payment_status)
    )
      errors.push("Invalid payment status");
    if (!data.total_amount || data.total_amount <= 0)
      errors.push("Total amount must be a positive number");
    if (!data.payment_method) errors.push("Payment method is required");
    if (!data.shipping_address) errors.push("Shipping address is required");

    return errors;
  }

  static async create(data) {
    const errors = this.validate(data);
    if (errors.length > 0) throw new Error(errors.join(", "));

    const order = {
      ...data,
      customer_id: this.toObjectId(data.customer_id),
      order_date: new Date(),
      updated_at: new Date(),
    };

    const result = await this.collection().insertOne(order);
    return { ...order, _id: result.insertedId };
  }

  static async getById(id) {
    return await this.collection().findOne({ _id: this.toObjectId(id) });
  }

  static async update(id, updates) {
    if (
      updates.order_status &&
      !this.orderStatuses.includes(updates.order_status)
    ) {
      throw new Error("Invalid order status");
    }
    if (
      updates.payment_status &&
      !this.paymentStatuses.includes(updates.payment_status)
    ) {
      throw new Error("Invalid payment status");
    }

    updates.updated_at = new Date();
    return await this.collection().updateOne(
      { _id: this.toObjectId(id) },
      { $set: updates }
    );
  }

  static async deleteOrder(id) {
    const objectId = this.toObjectId(id);

    await getDB()
      .collection("order_details")
      .deleteMany({ order_id: objectId });

    return await this.collection().deleteOne({ _id: objectId });
  }

  static async getAll() {
    return await this.collection().find().toArray();
  }

  static async findByCustomerId(customer_id) {
    return await this.collection()
      .find({ customer_id: this.toObjectId(customer_id) })
      .toArray();
  }

  static async getOrderWithDetails(id) {
    const order = await this.getById(id);
    if (!order) return null;

    const orderDetails = await getDB()
      .collection("order_details")
      .find({ order_id: order._id })
      .toArray();

    return { ...order, order_details: orderDetails };
  }
}
