import { TaskModel, UserModel } from "../postgres/postgres.js";
// Get all tasks
export const getAllTasks = async (req, res,next) => {
    try {
        const tasks = await TaskModel.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

// Get a task by ID
export const getTaskById = async (req, res,next) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findByPk(id);

        if (!task) {
            const error = new Error("Task not found");
            error.name = "Not Found";
            throw error;
            // return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

export const getTasksWithUserDetails = async (req, res, next) => {
    try {
        const tasks = await TaskModel.findAll({
            include: {
                model: UserModel, // Include the UserModel
                attributes: ['id', 'firstName', 'lastName', 'timezone', 'isActive'], // Specify the fields to include
            },
            attributes: ['id', 'title', 'description', 'status', 'timezone', 'createdAt', 'updatedAt', 'assignedTo'], // Specify task fields
        });

        if (tasks.length === 0) {
            return res.status(404).json({ error: "No tasks found" });
        }

        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};



// Create a new task
export const createTask = async (req, res,next) => {
    try {
        const { title, description,assignedTo, status } = req.body;

        if (!title || !status|| !assignedTo) {
            const error = new Error("Title , status and assignedTo are required");
            error.name = "Validation Error";
            throw error;
            // return res.status(400).json({ error: "Title and status are required" });
        }
        const user =await UserModel.findByPk(assignedTo);
        if (!user) {
            const error = new Error("Assigned user not found");
            error.name = "NotFoundError";
            throw error;
        }
        const task = await TaskModel.create({ 
             title,
             description, 
             status,
             timezone:user.timezone,
             assignedTo,
             });
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};


// Update a task
export const updateTask = async (req, res,next) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const task = await TaskModel.findByPk(id);

        if (!task) {
            const error = new Error("Task not found");
            error.name = "Not Found";
            throw error;
            // return res.status(404).json({ error: "Task not found" });
        }

        await task.update({ title, description, status });
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

// Delete a task
export const deleteTask = async (req, res,next) => {
    try {
        const { id } = req.params;

        const task = await TaskModel.findByPk(id);

        if (!task) {
            const error=new Error("Task not found");
            error.name="Not Found"
            throw error;
        }

        await task.destroy();
        res.status(200).json({message:"Task deleted sucessfully"});
    } catch (error) {
        next(error);
    }
};
