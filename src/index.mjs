//index.mjs;
import express from "express";
import authRoutes from "./routes/auth/auth.route.js";
import profileRoutes from "./routes/profile/profile.route.js";
import errorHandler from "./middlewares/errorHandler.js";
import { generateToken } from "./utils/auth/token.js";
import { jwtConfig } from "./config/jwtConfig.js";
import { generateSignature } from "./actors/utils/auth/generateSignature.js";
import { verifyToken } from "./utils/auth/verifyToken.js";

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

app.listen(PORT, () => {console.log(`Local server running on: http://localhost:${PORT}`);});

//-------------
{
    const header = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8";
    const paylaod = "eyJzdWIiOiJ1MSIsImlhdCI6NjM3OTkzMzcyMjAsImV4cCI6NjM3OTkzNDA4MjB1";
    //-_xCyoEvRIJJiqHP-zG9J4DJBH-ZWYoeYiCYhz4j0HI
    const signature = generateSignature(`${header}.${paylaod}`,jwtConfig.SECRET_SALT);
    console.log('expected ----->',signature)
}