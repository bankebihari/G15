import express from "express"
import dotenv from "dotenv"
import connectdatabase from "./config/Database.js";
import AuthRoute from "./Routes/AuthRoutes.js"
import cors from "cors"
import CategoryRoute from "./Routes/CategoryRoute.js"
import ProductRoute from "./Routes/ProductRoute.js"


const app=express();

dotenv.config();


app.use(cors())
app.use(express.json())


app.use("/api/v1/auth",AuthRoute);
app.use("/api/v1/category",CategoryRoute);
app.use("/api/v1/product",ProductRoute);

connectdatabase();













app.listen(process.env.PORT,()=>{
    console.log(`server is working on on port ${process.env.PORT}`)
})






