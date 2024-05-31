import express from "express";
import productosRoutes from "./routes/productos.routes.js";
import authRoutes from "./routes/auth.routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use("/api", productosRoutes);
app.use("/api", authRoutes);

export default app;
