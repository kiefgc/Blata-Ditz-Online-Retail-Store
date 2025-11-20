import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export class Order_Details {
  static collection() {
    return getDB().collection("order_details");
  }

  static async getByOrderId(order_id) {
    return await this.collection()
      .find({ order_id: new ObjectId(order_id) })
      .toArray();
  }

  static async create(orderDetailData) {
    const orderDetail = {
      ...orderDetailData,
      order_id: new ObjectId(orderDetailData.order_id),
      //   created_at: new Date(), since order_date is alr part of Order.js ?
    };

    return await this.collection().insertOne(orderDetail);
  }

  static async update(id, updates) {
    return await this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
  }

  static async delete(id) {
    return await this.collection().deleteOne({ _id: new ObjectId(id) });
  }
}
