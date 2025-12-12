import dotenv from "dotenv";
import express from "express";
import todosrouter from "./route.js";
import cors from "cors"

//Initializations
dotenv.config();
const cyapp = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(','):[]
const corsOptions = {
    origin:function (origin, callback){
        if(allowedOrigins.length === 0 ||!origin || allowedOrigins.includes(origin)){
            callback(null, true)
        } else{
            console.error(`CORS Blocked: Origin ${origin} not in allowed list.`)
            throw new Error(`Not allowed by CORS.`)
        }
    },
    methods:`GET, HEAD, POST, PATCH, DELETE, PUT`,
    credentials:true,
}

//Routes
cyapp.use(cors(corsOptions));
cyapp.use(express.json());
cyapp.use("/api/", todosrouter)

cyapp.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    console.log(`Allowed CORS Origins: ${allowedOrigins.join(', ')}`)
})