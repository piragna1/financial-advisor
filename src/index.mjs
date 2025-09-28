//index.mjs;
import express from "express";
import authRoutes from "./routes/auth/auth.route.js";
import userRoutes from './routes/user/userRoutes.js'

import profileRoutes from "./routes/profile/profile.route.js";

import errorHandler from "./middlewares/errorHandler.js";
import financialProfileRoutes from './routes/financialProfile/financialProfile.route.js'

const PORT = 3000;

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/profiles", profileRoutes);

app.use('/financial-profiles', financialProfileRoutes);



app.use((req, res, next) => {
  console.log("Unhandled route:", req.method, req.url);
  next();
});





app.get("/", (req, res) => {
  res.send(
    `<h1 style='color:red'>Express server active</h1>`
  );
});

app.use(errorHandler);

app.listen(PORT, () => {console.log(`Local server running on: http://localhost:${PORT}`);});
