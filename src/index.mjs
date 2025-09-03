//index.mjs;
import express from "express";
import authRoutes from "./routes/auth/auth.route.js";
import profileRoutes from "./routes/profile/profile.route.js";
import errorHandler from "./middlewares/errorHandler.js";
import { hashPassword } from "./utils/auth/hashPassword.js";
import { jwtConfig } from "./config/jwtConfig.js";

const PORT = 3000;

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send(
    `<h1 style='color:red'>Express server active</h1><p>Hola que tal soy un parrafado</p>`
  );
});

app.use(errorHandler);

console.log(hashPassword('gonzalillo', jwtConfig.SECRET_SALT));//e40f3e0638876806f2ecc80c554c1bd052f029eebfc98ca5676a6b8afaa65e57

// app.listen(PORT, () => {console.log(`Local server running on: http://localhost:${PORT}`);});