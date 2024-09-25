import { v4 as uuidv4 } from "uuid";
import { createTcpPool } from "../config/db.js";

export const generateUniqueId = async () => {
  let uniqueId;
  let exists = true;

  try {
    const pool = await createTcpPool();

    while (exists) {
      uniqueId = uuidv4();

      const checkIdQuery =
        "SELECT COUNT(*) AS count FROM videos WHERE uniqueId = ?";

      try {
        const [rows] = await pool.execute(checkIdQuery, [uniqueId]);
        exists = rows[0].count > 0;
      } catch (err) {
        console.error("Database query error:", err);
        console.error("Error code:", err.code);
        console.error("Error number:", err.errno);
        console.error("SQL state:", err.sqlState);
        console.error("SQL message:", err.sqlMessage);
        throw new Error(`Database query error: ${err.message}`);
      }
    }

    return uniqueId;
  } catch (error) {
    console.error("Error in generateUniqueId:", error);
    throw error;
  }
};
