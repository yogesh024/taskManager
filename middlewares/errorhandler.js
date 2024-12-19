import { ValidationError } from "sequelize";

// Global error handling middleware
export const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err instanceof ValidationError) {
        const validationErrors = err.errors.map((e) => e.message);
        return res.status(400).json({
            error: "Validation error",
            details: validationErrors
        });
    }

    if (err.name === "Not Found") {
        return res.status(404).json({
            error: "Not found",
            message: err.message
        });
    }
    if (err.name === "Validation Error") {
        return res.status(400).json({
            error: "Validation error",
            message: err.message
        });
    }

    res.status(500).json({
        error: "Internal server error",
        message: "An unexpected error occurred. Please try again later."
    });
};
