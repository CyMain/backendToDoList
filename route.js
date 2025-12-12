import { Router } from "express";
import { getCurrentDate } from "./utils.js";

//Create Router
const todosrouter = Router();

//Sample Data for use
let todos = [
    {
        id: 1,
        title: "Learn ExpressJS",
        desc:"Follow that one video",
        tag:"learning",
        dateCreated: "2024-06-01",
        completed: true,
    },
    {
        id: 2,
        title: "Build a ToDo List App",
        tag:"coding",
        dateCreated: "2024-06-01",
        completed: false
    },
    {
        id: 3,
        title: "Test the App",
        desc:"Test using Postman.",
        tag:"coding",
        dateCreated: "2024-06-01",
        completed: true
    }
]

//HANDLERS
const getTagsHandler = ()=>{
    const tags = []
    todos.forEach(todo => {
        if (!tags.includes(todo.tag)){
            tags.push(todo.tag);
        }
    });
    return tags;
}
const todosFilterHandler = (req, res)=>{
    let {key, completed} = req.query;
    console.log("Search Key:", key);
    let filteredTodos = todos;
    if (key) {
        key = key.toLowerCase();
        filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase().includes(key) || (todo.desc && todo.desc.toLowerCase().includes(key)))
    }
    if (completed){
        filteredTodos = filteredTodos.filter(todo => todo.completed === (completed === 'true'))
    }
    console.log(filteredTodos)
    res.json({list:filteredTodos, tags:getTagsHandler()});
}

//GET Routes
todosrouter.get("/todos/:category/", (req, res)=>{
    const category = req.params.category;
    let {key, completed} = req.query||"";
    let filteredTodos = todos
    if (category){
        filteredTodos = filteredTodos.filter(todo => todo.tag === category)||todos;
        //If category doesn't exist, I need to return a 404 error.
    }
    if (key){
        key = key.toLowerCase();
        filteredTodos = filteredTodos.filter(todo =>
            todo.title.toLowerCase().includes(key) || (todo.desc && todo.desc.toLowerCase().includes(key))
        )
    }
    if (completed){
        filteredTodos = filteredTodos.filter(todo => todo.completed === (completed === 'true'))
    }
    console.log(`End result:${{list:filteredTodos, tags:getTagsHandler()}}`)
    res.json({list:filteredTodos, tags:getTagsHandler()});
})
todosrouter.get("/todos/", todosFilterHandler);


//POST Routes
todosrouter.post("/todos/", (req, res)=>{
    console.log(req.body)
    const {newTitle, newDesc, newTag} = req.body;
    //Logic to add todo to database will go here.
    const newTodo = {
        id: todos.length + 1,
        title: newTitle,
        desc: newDesc,
        tag: newTag||"none",
        dateCreated: getCurrentDate(),
        completed: false,
    }
    todos.push(newTodo);
    console.log("New Todo to be added:", newTodo);
    console.log(`On the date: ${new Date().toISOString().split('T')[0]}`)
    res.json({message: "New Todo received", todo: newTodo, currentList: todos});
})

//PUT Routes
todosrouter.put("/todos/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const {updatedTitle, updatedDesc, updatedTag, updatedCompleted} = req.body;
    let todoFound = false;
    todos.forEach(todo => {
        if (todo.id === id){
            todoFound = true;
            todo.title = updatedTitle ? updatedTitle : todo.title
            todo.desc = updatedDesc ? updatedDesc : todo.desc
            todo.tag = updatedTag ? updatedTag : todo.tag
            todo.completed = updatedCompleted ? updatedCompleted : todo.completed
            
        }
    });
    if (!todoFound){
        res.status(404).json({message: `Todo with id ${id} not found.`});
    }else{
        console.log(`Todo with id ${id} updated.`);
            res.json({
                message: `Todo with id ${id} updated.`,
                updatedTodo: todos.find(todo=>todo.id === id),
                currentList: todos});
    }
})

//DELETE Routes
todosrouter.delete("/todos/:id", (req, res)=>{
        const id = parseInt(req.params.id);
        const filteredTodos = todos.filter(todo => todo.id !== id);
        todos = filteredTodos
        console.log(`Todo with id ${id} deleted.`);
        res.json({message: `Todo with id ${id} deleted.`, currentList: todos});

    }
)

export default todosrouter;