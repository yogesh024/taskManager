import { DataTypes } from "sequelize";
import { UserModel } from "../postgres/postgres.js";

export const createTaskModel = async(sequelize) => {
    const TaskModel = sequelize.define('Task', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        timezone: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        assignedTo: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'users',// refer user modal
                key: 'id',
            },
            validate: {
                notNull: { msg: "Task.assignedTo cannot be null" },
            },
        },
    }, 
    {
        tableName: 'tasks', 
        timestamps: true,   
        underscored: true   
    }
);
TaskModel.belongsTo(UserModel, {
    foreignKey: 'assignedTo',
    targetKey: 'id',
    onDelete: 'CASCADE', //it  Ensures tasks are deleted if the user is deleted
});

    return TaskModel;
};

