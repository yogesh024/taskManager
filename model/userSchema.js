import { DataTypes } from "sequelize";
import { TaskModel } from "../postgres/postgres.js"; 

export const createUserModel = (sequelize) => {
    const UserModel = sequelize.define('User', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        timezone: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, 
    {
        tableName: 'users',
        timestamps: true,
        underscored: true,
    }
);
      // One-to-many relationship: A user can have multiple tasks
    //   UserModel.hasMany(TaskModel, {
    //     foreignKey: 'assignedTo', // This will create a foreign key on TaskModel
    //     sourceKey: 'id',
    // });

    return UserModel;
};
