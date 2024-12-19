import { UserModel } from "../postgres/postgres.js";

export const addUser = async (req, res, next) => {
    try {
        const { firstName, lastName, timezone, isActive } = req.body;

        if (!firstName || !lastName || !timezone) {
            const error = new Error("First Name, Last Name, and Timezone are required");
            error.name = "Validation Error";
            throw error;
        }

        const user = await UserModel.create({ firstName, lastName, timezone, isActive });
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};
export const getUserId = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find the user by primary key
        const user = await UserModel.findByPk(id);

        // If the user is not found, throw a 404 error
        if (!user) {
            const error = new Error("User not found");
            error.status = 404; // Add a status code for proper error handling
            throw error;
        }

        // If user is found, send user details as response
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.findAll();

        // Check if users exist
        if (!users || users.length === 0) {
            const error = new Error("No users found");
            error.status = 404;
            throw error;
        }

        res.status(200).json(users);
    } catch (error) {
      
        next(error);
    }
};



export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, timezone, isActive } = req.body;

        const user = await UserModel.findByPk(id);

        if (!user) {
            const error = new Error("User not found");
            error.name = "Not Found";
            throw error;
        }

        await user.update({ firstName, lastName, timezone, isActive });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findByPk(id);

        if (!user) {
            const error = new Error("User not found");
            error.name = "Not Found";
            throw error;
        }

        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};
