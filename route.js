import { Router } from "express";

const todosrouter = Router();

todosrouter.get("/todos/", (req, res)=>{
    console.log("Get request received for /todos/");
    res.send("Get all todos");
})

todosrouter.post("/todos/", (req, res)=>{
    res.send("Create a new todo");
})

export default todosrouter;