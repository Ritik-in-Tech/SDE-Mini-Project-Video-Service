import express from "express";
import uploadRouter from "./routes/videoRoutes.js";
import { createTcpPool, closePool } from "./config/db.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", uploadRouter);

app.get("/", (req, res) => {
  res.json({ msg: "SDE microservice api" });
});

const startServer = async () => {
  try {
    await createTcpPool();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();

process.on("SIGINT", async () => {
  await closePool();
  console.log("Server shutting down...");
  process.exit(0);
});
