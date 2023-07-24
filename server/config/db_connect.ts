// db.ts

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbURI = process.env.DB_URI;
console.log(process.env.DB_URI);
if (!dbURI) {
  throw new Error("Error! no databse to connect");
}
const connectDatabase = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error, "MOngo db connection error");
  }
};

export default connectDatabase;
