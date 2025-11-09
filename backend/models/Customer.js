import { getDB } from "../config/db.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export class Customer {
  static collection() {
    return getDB().collection("customers");
  }

  static async findByUsernameOrEmail(username, email) {
    return await this.collection().findOne({
      $or: [{ username }, { email }],
    });
  }

  static async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const customer = {
      ...data,
      password: hashedPassword,
      role: "customer",
      created_at: new Date(),
    };
    return await this.collection().insertOne(customer);
  }

  static async findById(id) {
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }
}
