import { getDB } from "../config/db.js";
import bcrypt from "bcrypt";

export class Customer {
  static collection() {
    return getDB().collection("customers");
  }

  static async findByUsernameOrEmail(identifier) {
    return this.collection().findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
  }

  static async findByEmail(email) {
    return this.collection().findOne({ email });
  }

  static async findById(id) {
    const { ObjectId } = await import("mongodb");
    return this.collection().findOne({ _id: new ObjectId(id) });
  }

  static async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const customer = {
      ...data,
      password: hashedPassword,
      role: "customer",
      created_at: new Date(),
    };

    return this.collection().insertOne(customer);
  }

  static async update(id, updates) {
    const { ObjectId } = await import("mongodb");
    return this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
  }

  static async delete(id) {
    const { ObjectId } = await import("mongodb");
    return this.collection().deleteOne({ _id: new ObjectId(id) });
  }
}
