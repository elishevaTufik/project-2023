const Todos = require("../models/Todos");

const getAllTodos = async (req, res) => {
    const todos = await Todos.find().lean()
    if (!todos?.length) {
        return res.status(400).json({ message: 'Not such Todo' })
    }
    res.json(todos)
}

const getTodoById = async (req, res) => {
    const {id} = req.params
    const todo = await Todos.findById(id).lean()
    if (!todo) {
    return res.status(400).json({ message: 'No todo found' })
    }
    res.json(todo)
}

const createNewTodo = async (req, res) => {
    const {title, tags, completed} = req.body
    console.log(title);
    if (!title || !tags) 
    {
        return res.status(400).json({ message: 'fields are required' })
    }
    const todo = await Todos.create({ title, tags, completed })
    if (todo) 
    {
        return res.status(201).json({ message: 'New todo created' })
    }
    else 
    {
        return res.status(400).json({ message: 'Invalid todo ' })
    }
}

const deleteTodo = async (req, res) => {
    const { id } = req.params
    const todo = await Todos.findById(id)
    if (!todo) 
    {
        return res.status(400).json({ message: 'Todo not found' })
    }
    const result = await todo.deleteOne()
    const reply=`Todo '${result.name}' ID ${result._id} deleted`
    res.json(reply)
    }

const updateTodoCompleted = async (req, res) => {
    const { id } = req.params
    const todo = await Todos.findById(id)
    if (!todo)
    {
        return res.status(400).json({ message: 'todo not found' })
    }
    todo.completed = !todo.completed
    const updatedTodo = await todo.save()
    res.json(`'${updatedTodo.title}' updated`)
    }

const updateTodo = async (req, res) => {
    const { id } = req.params
    const {title, tags}= req.body
    if (!id || !title ) {
    return res.status(400).json({ message: "fields are required" })
    }
    const todos = await Todos.findById(id)
    if (!todos) {
    return res.status(400).json({ message: "Todo not found" })
    }
    todos.title=title
    todos.tags=tags

    const updateTodos = await todos.save()
    res.json(`"${updateTodos.title}" updated`)
    }


module.exports = {
    getAllTodos,
    createNewTodo,
    getTodoById,
    updateTodoCompleted,
    deleteTodo,
    updateTodo
}