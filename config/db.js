import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let pool;

const createTcpPool = async (config = {}) => {
  if (!pool) {
    const dbConfig = {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ...config,
      // If you're using a private IP, you might need to use the socketPath
      // socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    };

    try {
      pool = await mysql.createPool(dbConfig);
      console.log("Connected to the database successfully.");
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw error;
    }
  }
  return pool;
};

const closePool = async () => {
  if (pool) {
    await pool.end();
    pool = null;
    console.log("Database connection pool closed.");
  }
};

export { createTcpPool, closePool };
