import express from "express";
import "dotenv/config";
import cors from "cors";

import indexRouter from "./routes/index.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// bootstraps
import connectDb from "./config/db.js";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
await connectDb();

app.use(indexRouter);


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

