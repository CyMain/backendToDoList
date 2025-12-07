import { Router } from "express";

//Create Router
const todosrouter = Router();

//Sample Data for use
const todos = [
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
const todosFilterHandler = (req, res)=>{
    let {key, completed} = req.query;
    console.log("Search Key:", key);
    let filteredTodos = todos;
    if (key) {
        filteredTodos = filteredTodos.filter(todo =>{
            return todo.title.includes(key) || (todo.desc && todo.desc.includes(key));
        })
    }
    if (completed){
        filteredTodos = filteredTodos.filter(todo => todo.completed === (completed === 'true'))
    }
    res.json(filteredTodos);
}

//GET Routes
todosrouter.get("/todos/", todosFilterHandler);
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
    res.json(filteredTodos)
})

//POST Routes
todosrouter.post("/todos/", (req, res)=>{
    console.log(req.body)
    const {newTitle, newDesc, newTag} = req.body;
    //Logic to add todo to database will go here.
    const newTodo = {
        id: todos.length + 1,
        title: newTitle,
        desc: newDesc,
        tag: newTag||"None",
        dateCreated: new Date().toISOString().split('T')[0],
        completed: false,
    }
    todos.push(newTodo);
    console.log("New Todo to be added:", newTodo);
    console.log(`On the date: ${new Date().toISOString().split('T')[0]}`)
    res.json({message: "New Todo received", todo: newTodo, currentList: todos});
})

export default todosrouter;