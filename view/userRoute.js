import express from "express";
import { addUser,getUserId,getAllUsers ,updateUser,deleteUser } from "../controller/userController.js";
const app=express();

const userRoute=express.Router();
app.use(userRoute);

// user routes

userRoute.post("/users", addUser);
userRoute.get("/users/:id", getUserId);
userRoute.get("/usersall", getAllUsers);

userRoute.put("/users/:id", updateUser);

userRoute.delete("/users/:id", deleteUser);



export default userRoute;