import dotenv from "dotenv";
import express from "express";
import todosrouter from "./route.js";
dotenv.config();

const cyapp = express();

const PORT = process.env.PORT || 5000;

cyapp.use("/api/", todosrouter)

cyapp.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})