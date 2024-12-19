import { Sequelize } from "sequelize";
import { createTaskModel } from "../model/taskSchema.js";
import { createUserModel } from "../model/userSchema.js";
import dotenv from 'dotenv';
dotenv.config();

const sequelize=new Sequelize('postgres','postgres', process.env.DB_PASSWORD,{
    host:'localhost',
    dialect:'postgres',
    });
    let TaskModel=null;
    let UserModel=null;
    const connection=async()=>{
        try{
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
            // return sequelize;
            UserModel=await createUserModel(sequelize);
            TaskModel= await createTaskModel(sequelize);
            
            await sequelize.sync();
            console.log("database synced");
            }
            catch(error){
                console.error('Unable to connect to the database:', error);
                }

    }
    export {
        connection,
        TaskModel,
        UserModel
    }