import { getDB } from "../config/db.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

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

  static async getAll() {
    return await this.collection().find().toArray();
  } //May remove later on

  static async findById(id) {
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }
}
