import cors from "cors";
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import appRoutes from "./routes/events.routes";
import { auth } from "./middlewares/auth.middleware";

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

app.use("/auth", authRoutes);
app.use("/events", auth, appRoutes);

(function startServer() {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server listening in port: ${port}`));
})();
