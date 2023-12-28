
import axios from "axios";

const UserUseHttpRequest= ()=>{

    const deleteUser = async(id,refetch)=>{
        try{
            await axios.delete(`http://localhost:4963/api/users/${id}`)
            refetch()
        }catch(err){
            console.error("connect delete");
        }
    }

    const createUser = async(data,refetch)=>{
        try{
            console.log(data.tags);
            await axios.post('http://localhost:4963/api/users/create',data)
            refetch()
        }catch(err){
            console.error("connect failed");
        }
    }

    const updateUser = async(_id,data,refetch)=>{
        try{
            await axios.put(`http://localhost:4963/api/users/updateuser/${_id}`,data)
            refetch()
        }catch(err){
            console.error("connect failed");
        }
    }

    return{ createUser,deleteUser,updateUser }
}

export default UserUseHttpRequest

