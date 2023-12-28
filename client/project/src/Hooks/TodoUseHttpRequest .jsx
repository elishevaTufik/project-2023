
import axios from "axios";

const TodoUseHttpRequest= ()=>{

    const deleteTodo = async(id,refetch)=>{
        try{
            await axios.delete(`http://localhost:4963/api/todos/${id}`)
            refetch()
        }catch(err){
            console.error("connect delete");
        }
    }

    const updateTodoComplete = async(id)=>{
        try{
            await axios.put(`http://localhost:4963/api/todos/updateCompleted/${id}`)
        }catch(err){
            console.error("connect failed");
        }
    }

    const createTodo = async(data,refetch)=>{
        try{
            console.log(data.tags);
            await axios.post('http://localhost:4963/api/todos/create',data)
            refetch()
        }catch(err){
            console.error("connect failed");
        }
    }

    const updateTodo = async(_id,data,refetch)=>{
        try{
            await axios.put(`http://localhost:4963/api/todos/updateTodo/${_id}`,data)
            refetch()
        }catch(err){
            console.error("connect failed");
        }
    }

    return{ updateTodoComplete,createTodo,deleteTodo,updateTodo }
}

export default TodoUseHttpRequest

