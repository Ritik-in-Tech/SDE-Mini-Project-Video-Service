import { createTcpPool } from "../config/db.js";

export const insertVideo = async (uniqueId, title, description, videoUrl) => {
  const dbPool = await createTcpPool();

  const insertQuery = `
    INSERT INTO videos (uniqueId, title, description, videoUrl) 
    VALUES (?, ?, ?, ?)
  `;

  try {
    const [result] = await dbPool.execute(insertQuery, [
      uniqueId,
      title,
      description,
      videoUrl,
    ]);
    return result;
  } catch (dbError) {
    console.error("Database error:", dbError);
    throw new Error(`Failed to insert video: ${dbError.message}`);
  }
};
