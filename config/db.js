import mongoose from "mongoose";

export let dbInstance = undefined;
const connectDB = async () => {
  try {
    // console.log(process.env.DB_ADMIN);
    const connectionInstance = await mongoose.connect(
      `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@software1.gptczdh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=software1`
    );
    dbInstance = connectionInstance;
    console.log(
      `\n☘️  MongoDB Connected! Db host: ${connectionInstance.connection.host}\n`
    );
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export { connectDB };
