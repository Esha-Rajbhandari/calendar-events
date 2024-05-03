import cors from "cors";
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import appRoutes from "./routes/events.js";
import { auth } from "./middlewares/auth.middleware.js";

const app = express();

app.use(
  cors({
    methods: "GET,POST,PATCH,DELETE,OPTIONS",
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", auth, appRoutes);

(function startServer() {
  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Server listening in port: ${port}`));
})();

export default app;
