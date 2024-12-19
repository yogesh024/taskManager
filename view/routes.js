import express from "express";

import { getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getTasksWithUserDetails
 } from "../controller/taskController.js";
import { addUser,updateUser,deleteUser } from "../controller/userController.js";
const app=express();

const router=express.Router();
app.use(router);

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);
router.get("/tasksWithUser", getTasksWithUserDetails);

router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

// user routes

router.post("/users", addUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);



export default router;