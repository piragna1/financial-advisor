//index.mjs;
import express from "express";
import authRoutes from "./routes/auth/auth.route.js";
import profileRoutes from "./routes/profile/profile.route.js";
import errorHandler from "./middlewares/errorHandler.js";

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
