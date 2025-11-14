import { getDB } from "../config/db.js";
import bcrypt from "bcrypt";

export class Admin {
  static collection() {
    return getDB().collection("admins");
  }

  static async findByEmail(email) {
    return await this.collection().findOne({ email });
  }

  static async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const admin = { ...data, password: hashedPassword, created_at: new Date() };
    return await this.collection().insertOne(admin);
  }

  static async update(id, updates) {
    const { ObjectId } = await import("mongodb");
    return this.collection().updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
  }

  static async getAll() {
    return await this.collection().find().toArray();
  } //May remove later on

  static async findById(id) {
    const { ObjectId } = await import("mongodb");
    return this.collection().findOne({ _id: new ObjectId(id) });
  }
}
