import dotenv from "dotenv";
import express from "express";
import todosrouter from "./route.js";

//Initializations
dotenv.config();
const cyapp = express();
const PORT = process.env.PORT || 5000;

//Routes
cyapp.use(express.json());
cyapp.use("/api/", todosrouter)

cyapp.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})