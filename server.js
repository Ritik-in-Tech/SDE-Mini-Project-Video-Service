import express from "express";
import uploadRouter from "./routes/videoRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", uploadRouter);

app.get("/", (req, res) => {
  res.json({ msg: "SDE microservice api" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
