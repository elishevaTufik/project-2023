
import axios from "axios";

const PostUseHttpRequest= ()=>{

    const deletePost = async(id,refetch)=>{
        try{
            await axios.delete(`http://localhost:4963/api/posts/${id}`)
            refetch()
        }catch(err){
            console.error("connect delete");
        }
    }

    const createPost = async(data,refetch)=>{
        try{
            console.log(data.tags);
            await axios.post('http://localhost:4963/api/posts/create',data)
            refetch()
        }catch(err){
            console.error("connect failed");
        }
    }

    const updatePost = async(_id,data,refetch)=>{
        try{
            await axios.put(`http://localhost:4963/api/posts/updatePost/${_id}`,data)
            refetch()
        }catch(err){
            console.error("connect failed");
        }
    }

    return{ createPost,deletePost,updatePost }
}

export default PostUseHttpRequest

