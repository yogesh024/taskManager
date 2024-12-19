import express from 'express';
import { connection } from './postgres/postgres.js';
import router from './view/routes.js';
import userRoute from './view/userRoute.js';
import { errorHandler } from './middlewares/errorhandler.js';

const app=express();
app.use(express.json());

app.use("/api", router);
app.use("/api/users", userRoute);


app.use(errorHandler)


const PORT=8080;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})

connection();
