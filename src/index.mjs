//index.mjs;
import express from "express";
import authRoutes from "./routes/auth/auth.route.js";
import profileRoutes from "./routes/profile/profile.route.js";
import errorHandler from "./middlewares/errorHandler.js";
import { loginUserController, registerUserController } from "./controllers/authController.mjs";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { getProfile } from "./controllers/profileController.mjs";

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

//-------------------------------------DEBUG PURPOSES BELOW
//-----COMPLETE FLOW (register,login,access to protected route) SIMULATION: register->login->secured route access with valid token
let req = {};
req.body = {
    "name":"Gonzalo",
    "lastName":"Varela Alagna",
    "email":"gvalagna@gmail.com",
    "password":"gvalagnA$4"
}
const token = "";
const user = await registerUserController(req, {});
const email = user.email;
const password = req.body.password;
req.body = {email,password}
const login = await loginUserController(req, {}, (err,req,res)=>{
  if (err) console.error(err.message);
  if(res) console.log(res);
});
req.headers = {};
req.headers.authorization = login.token;
const auth = authMiddleware(req, {}, ()=>{console.log('nnnnnext')});
let getProf = undefined;
if (auth){
  req.userId = user.id;
  getProf = await getProfile(req,{},()=>{console.log('user id gotten')})
}
console.log(getProf)