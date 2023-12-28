const express = require("express")
const router = express.Router()
const todosController=require("../controller/todosController")

router.get("/getAll",todosController.getAllTodos)
router.get("/:id", todosController.getTodoById)
router.post("/create", todosController.createNewTodo)
router.delete("/:id",todosController.deleteTodo)
router.put("/updateCompleted/:id",todosController.updateTodoCompleted)
router.put("/updateTodo/:id",todosController.updateTodo)

module.exports = router

